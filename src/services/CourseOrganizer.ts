/**
 * CourseOrganizer Service
 * 
 * Manages course list prioritization and sorting logic with real-time updates,
 * caching, and performance optimizations for the enrollment system.
 * 
 * This service implements course sorting to prioritize enrolled and pending courses,
 * provides real-time course list reordering based on enrollment status changes,
 * and includes performance optimizations like caching and debouncing.
 */

import { Course } from '@/types/course';
import { 
  Enrollment, 
  EnrollmentStatus, 
  CoursePriority,
  EnrollmentUpdate,
  EnrollmentUpdateType
} from '@/types/enrollment';
import { 
  sortCoursesByEnrollmentPriority,
  hasAccessToContent,
  isPendingApproval
} from '@/utils/enrollment';
import { enrollmentManager, EnrollmentUpdateCallback } from './EnrollmentManager';

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const DEBOUNCE_DELAY = 300; // 300ms

// Course organization callback types
export type CourseListUpdateCallback = (organizedCourses: Course[]) => void;
export type CoursePriorityUpdateCallback = (priorities: CoursePriority[]) => void;

/**
 * CourseOrganizer Interface
 */
export interface ICourseOrganizer {
  organizeCourses(courses: Course[], userId: string): Promise<Course[]>;
  getCoursePriorities(userId: string): Promise<CoursePriority[]>;
  updateCoursePriority(userId: string, courseId: string, enrollmentStatus: 'ENROLLED' | 'PENDING' | 'NONE'): Promise<void>;
  subscribeToRealtimeUpdates(callback: CourseListUpdateCallback): () => void;
  subscribeToPriorityUpdates(callback: CoursePriorityUpdateCallback): () => void;
  clearCache(userId?: string): void;
  destroy(): void;
}

/**
 * Cached course priority data
 */
interface CachedCoursePriorities {
  priorities: CoursePriority[];
  timestamp: number;
  userId: string;
}

/**
 * Cached organized courses data
 */
interface CachedOrganizedCourses {
  courses: Course[];
  timestamp: number;
  userId: string;
  originalCoursesHash: string;
}

/**
 * CourseOrganizer Implementation
 */
export class CourseOrganizer implements ICourseOrganizer {
  private static instance: CourseOrganizer;
  private priorityCache = new Map<string, CachedCoursePriorities>();
  private coursesCache = new Map<string, CachedOrganizedCourses>();
  private courseListCallbacks = new Set<CourseListUpdateCallback>();
  private priorityCallbacks = new Set<CoursePriorityUpdateCallback>();
  private enrollmentUnsubscribe: (() => void) | null = null;
  private debounceTimers = new Map<string, NodeJS.Timeout>();
  private isInitialized = false;

  private constructor() {
    this.initializeRealtimeSubscription();
  }

  static getInstance(): CourseOrganizer {
    if (!CourseOrganizer.instance) {
      CourseOrganizer.instance = new CourseOrganizer();
    }
    return CourseOrganizer.instance;
  }

  /**
   * Initialize real-time subscription for enrollment updates
   */
  private initializeRealtimeSubscription(): void {
    if (this.isInitialized) return;

    try {
      this.enrollmentUnsubscribe = enrollmentManager.subscribeToEnrollmentUpdates(
        this.handleEnrollmentUpdate.bind(this)
      );

      this.isInitialized = true;
      console.log('✅ CourseOrganizer real-time subscription initialized');
    } catch (error) {
      console.error('❌ Failed to initialize CourseOrganizer real-time subscription:', error);
    }
  }

  /**
   * Handle enrollment updates and trigger course reordering
   */
  private handleEnrollmentUpdate(update: EnrollmentUpdate): void {
    try {
      console.log('📋 CourseOrganizer handling enrollment update:', update);

      // Clear cache for the affected user
      this.clearCache(update.userId);

      // Debounce updates to prevent excessive reordering
      this.debounceUpdate(update.userId, () => {
        this.notifyRealtimeUpdates(update);
      });

    } catch (error) {
      console.error('❌ Error handling enrollment update in CourseOrganizer:', error);
    }
  }

  /**
   * Debounce updates to prevent excessive API calls and reordering
   */
  private debounceUpdate(userId: string, callback: () => void): void {
    const existingTimer = this.debounceTimers.get(userId);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    const timer = setTimeout(() => {
      callback();
      this.debounceTimers.delete(userId);
    }, DEBOUNCE_DELAY);

    this.debounceTimers.set(userId, timer);
  }

  /**
   * Notify subscribers about real-time updates
   */
  private async notifyRealtimeUpdates(update: EnrollmentUpdate): Promise<void> {
    try {
      // Update course priorities
      await this.updateCoursePriority(
        update.userId, 
        update.courseId, 
        this.mapEnrollmentStatusToPriority(update.status)
      );

      // Get updated priorities and notify subscribers
      const priorities = await this.getCoursePriorities(update.userId);
      this.priorityCallbacks.forEach(callback => {
        try {
          callback(priorities);
        } catch (error) {
          console.error('❌ Error in priority update callback:', error);
        }
      });

    } catch (error) {
      console.error('❌ Error notifying real-time updates:', error);
    }
  }

  /**
   * Organize courses by enrollment priority
   */
  async organizeCourses(courses: Course[], userId: string): Promise<Course[]> {
    try {
      // Check cache first
      const cacheKey = `${userId}`;
      const coursesHash = this.generateCoursesHash(courses);
      const cached = this.coursesCache.get(cacheKey);

      if (cached && 
          this.isCacheValid(cached.timestamp) && 
          cached.originalCoursesHash === coursesHash) {
        console.log('📋 Using cached organized courses for user:', userId);
        return cached.courses;
      }

      console.log('📋 Organizing courses for user:', userId);

      // Get course priorities
      const priorities = await this.getCoursePriorities(userId);
      
      // Create priority map for quick lookup
      const priorityMap = new Map<string, CoursePriority>();
      priorities.forEach(priority => {
        priorityMap.set(priority.courseId, priority);
      });

      // Separate courses by enrollment status
      const enrolledCourses: Course[] = [];
      const pendingCourses: Course[] = [];
      const nonEnrolledCourses: Course[] = [];

      courses.forEach(course => {
        const priority = priorityMap.get(course.id);
        
        if (priority) {
          switch (priority.enrollmentStatus) {
            case 'ENROLLED':
              enrolledCourses.push(course);
              break;
            case 'PENDING':
              pendingCourses.push(course);
              break;
            default:
              nonEnrolledCourses.push(course);
              break;
          }
        } else {
          nonEnrolledCourses.push(course);
        }
      });

      // Sort each category by priority and last updated
      const sortedEnrolled = this.sortCoursesByPriority(enrolledCourses, priorityMap);
      const sortedPending = this.sortCoursesByPriority(pendingCourses, priorityMap);

      // Combine in priority order: enrolled, pending, then non-enrolled
      const organizedCourses = [
        ...sortedEnrolled,
        ...sortedPending,
        ...nonEnrolledCourses
      ];

      // Cache the result
      this.coursesCache.set(cacheKey, {
        courses: organizedCourses,
        timestamp: Date.now(),
        userId,
        originalCoursesHash: coursesHash
      });

      console.log('✅ Courses organized successfully:', {
        total: organizedCourses.length,
        enrolled: enrolledCourses.length,
        pending: pendingCourses.length,
        nonEnrolled: nonEnrolledCourses.length
      });

      return organizedCourses;

    } catch (error: any) {
      console.error('❌ Error organizing courses:', error);
      // Return original courses on error
      return courses;
    }
  }

  /**
   * Get course priorities for a user
   */
  async getCoursePriorities(userId: string): Promise<CoursePriority[]> {
    try {
      // Check cache first
      const cacheKey = userId;
      const cached = this.priorityCache.get(cacheKey);

      if (cached && this.isCacheValid(cached.timestamp)) {
        console.log('📋 Using cached course priorities for user:', userId);
        return cached.priorities;
      }

      console.log('📋 Fetching course priorities for user:', userId);

      // Get user enrollments
      const enrollments = await enrollmentManager.getUserEnrollments(userId);

      // Convert enrollments to course priorities
      const priorities: CoursePriority[] = enrollments.map(enrollment => ({
        courseId: enrollment.courseId,
        userId: enrollment.userId,
        priority: this.calculatePriority(enrollment),
        enrollmentStatus: this.mapEnrollmentStatusToPriority(enrollment.status),
        lastUpdated: enrollment.updatedAt
      }));

      // Sort priorities
      const sortedPriorities = sortCoursesByEnrollmentPriority(priorities);

      // Cache the result
      this.priorityCache.set(cacheKey, {
        priorities: sortedPriorities,
        timestamp: Date.now(),
        userId
      });

      console.log('✅ Course priorities fetched successfully:', sortedPriorities.length);

      return sortedPriorities;

    } catch (error: any) {
      console.error('❌ Error getting course priorities:', error);
      return [];
    }
  }

  /**
   * Update course priority for a user
   */
  async updateCoursePriority(
    userId: string, 
    courseId: string, 
    enrollmentStatus: 'ENROLLED' | 'PENDING' | 'NONE'
  ): Promise<void> {
    try {
      console.log('📋 Updating course priority:', { userId, courseId, enrollmentStatus });

      // Clear cache to force refresh
      this.clearCache(userId);

      // If status is NONE, we don't need to create a priority record
      if (enrollmentStatus === 'NONE') {
        return;
      }

      // Get current priorities
      const priorities = await this.getCoursePriorities(userId);
      
      // Find existing priority or create new one
      let existingPriority = priorities.find(p => p.courseId === courseId);
      
      if (existingPriority) {
        // Update existing priority
        existingPriority.enrollmentStatus = enrollmentStatus;
        existingPriority.lastUpdated = new Date();
        existingPriority.priority = this.calculatePriorityFromStatus(enrollmentStatus);
      } else {
        // Create new priority
        const newPriority: CoursePriority = {
          courseId,
          userId,
          priority: this.calculatePriorityFromStatus(enrollmentStatus),
          enrollmentStatus,
          lastUpdated: new Date()
        };
        priorities.push(newPriority);
      }

      // Re-sort and cache
      const sortedPriorities = sortCoursesByEnrollmentPriority(priorities);
      this.priorityCache.set(userId, {
        priorities: sortedPriorities,
        timestamp: Date.now(),
        userId
      });

      console.log('✅ Course priority updated successfully');

    } catch (error: any) {
      console.error('❌ Error updating course priority:', error);
      throw error;
    }
  }

  /**
   * Subscribe to real-time course list updates
   */
  subscribeToRealtimeUpdates(callback: CourseListUpdateCallback): () => void {
    this.courseListCallbacks.add(callback);
    
    return () => {
      this.courseListCallbacks.delete(callback);
    };
  }

  /**
   * Subscribe to priority updates
   */
  subscribeToPriorityUpdates(callback: CoursePriorityUpdateCallback): () => void {
    this.priorityCallbacks.add(callback);
    
    return () => {
      this.priorityCallbacks.delete(callback);
    };
  }

  /**
   * Clear cache for a specific user or all users
   */
  clearCache(userId?: string): void {
    if (userId) {
      this.priorityCache.delete(userId);
      this.coursesCache.delete(userId);
      console.log('🗑️ Cache cleared for user:', userId);
    } else {
      this.priorityCache.clear();
      this.coursesCache.clear();
      console.log('🗑️ All cache cleared');
    }
  }

  /**
   * Private helper methods
   */

  private sortCoursesByPriority(courses: Course[], priorityMap: Map<string, CoursePriority>): Course[] {
    return courses.sort((a, b) => {
      const aPriority = priorityMap.get(a.id);
      const bPriority = priorityMap.get(b.id);

      if (!aPriority || !bPriority) return 0;

      // First sort by priority number (higher priority first)
      if (aPriority.priority !== bPriority.priority) {
        return bPriority.priority - aPriority.priority;
      }

      // Then sort by most recently updated
      return new Date(bPriority.lastUpdated).getTime() - new Date(aPriority.lastUpdated).getTime();
    });
  }

  private calculatePriority(enrollment: Enrollment): number {
    // Higher numbers = higher priority
    if (enrollment.status === EnrollmentStatus.APPROVED || enrollment.status === EnrollmentStatus.COMPLETED) {
      return 100; // Highest priority for enrolled courses
    } else if (enrollment.status === EnrollmentStatus.PENDING) {
      return 50; // Medium priority for pending courses
    } else {
      return 0; // Lowest priority for rejected/other statuses
    }
  }

  private calculatePriorityFromStatus(status: 'ENROLLED' | 'PENDING' | 'NONE'): number {
    switch (status) {
      case 'ENROLLED':
        return 100;
      case 'PENDING':
        return 50;
      case 'NONE':
      default:
        return 0;
    }
  }

  private mapEnrollmentStatusToPriority(status: EnrollmentStatus): 'ENROLLED' | 'PENDING' | 'NONE' {
    switch (status) {
      case EnrollmentStatus.APPROVED:
      case EnrollmentStatus.COMPLETED:
        return 'ENROLLED';
      case EnrollmentStatus.PENDING:
        return 'PENDING';
      case EnrollmentStatus.REJECTED:
      default:
        return 'NONE';
    }
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < CACHE_DURATION;
  }

  private generateCoursesHash(courses: Course[]): string {
    // Generate a simple hash based on course IDs and their order
    const courseIds = courses.map(c => c.id).join(',');
    return btoa(courseIds).substring(0, 16);
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    // Clear all timers
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();

    // Unsubscribe from enrollment updates
    if (this.enrollmentUnsubscribe) {
      this.enrollmentUnsubscribe();
      this.enrollmentUnsubscribe = null;
    }

    // Clear callbacks
    this.courseListCallbacks.clear();
    this.priorityCallbacks.clear();

    // Clear cache
    this.clearCache();

    this.isInitialized = false;
    console.log('🗑️ CourseOrganizer destroyed');
  }
}

// Export singleton instance
export const courseOrganizer = CourseOrganizer.getInstance();

// Export types
export type { ICourseOrganizer, CourseListUpdateCallback, CoursePriorityUpdateCallback };