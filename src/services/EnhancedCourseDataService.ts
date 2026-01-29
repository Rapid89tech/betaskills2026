/**
 * Enhanced Course Data Service with Advanced Caching and Performance Optimizations
 * Implements intelligent caching strategies for frequently accessed course and enrollment data
 */

import { courseDataCache, enrollmentDataCache, userDataCache } from '@/utils/AdvancedCacheManager';
import { databaseQueryOptimizer } from '@/utils/DatabaseQueryOptimizer';
import { fastDataService } from './FastDataService';

export interface EnhancedCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  currency: string;
  instructor: string;
  rating: number;
  students: number;
  image: string;
  isComingSoon?: boolean;
  available: boolean;
  courseId: string;
  enrollmentStatus?: 'enrolled' | 'pending' | 'not_enrolled';
  userProgress?: number;
}

export interface CourseEnrollmentData {
  course: EnhancedCourse;
  enrollment?: any;
  progress?: any;
  isAccessible: boolean;
}

export interface CacheStrategy {
  ttl: number;
  priority: 'high' | 'medium' | 'low';
  preload: boolean;
}

class EnhancedCourseDataService {
  private static instance: EnhancedCourseDataService;
  
  // Cache strategies for different data types
  private cacheStrategies: Record<string, CacheStrategy> = {
    'featured-courses': { ttl: 10 * 60 * 1000, priority: 'high', preload: true }, // 10 minutes
    'all-courses': { ttl: 5 * 60 * 1000, priority: 'high', preload: true }, // 5 minutes
    'user-courses': { ttl: 2 * 60 * 1000, priority: 'medium', preload: false }, // 2 minutes
    'course-details': { ttl: 15 * 60 * 1000, priority: 'medium', preload: false }, // 15 minutes
    'enrollment-status': { ttl: 1 * 60 * 1000, priority: 'high', preload: false }, // 1 minute
    'course-progress': { ttl: 30 * 1000, priority: 'low', preload: false }, // 30 seconds
  };

  static getInstance(): EnhancedCourseDataService {
    if (!EnhancedCourseDataService.instance) {
      EnhancedCourseDataService.instance = new EnhancedCourseDataService();
    }
    return EnhancedCourseDataService.instance;
  }

  /**
   * Get all courses with intelligent caching and performance optimization
   */
  async getAllCourses(options: {
    includeEnrollmentStatus?: boolean;
    userId?: string;
    category?: string;
    useCache?: boolean;
  } = {}): Promise<EnhancedCourse[]> {
    const { includeEnrollmentStatus = false, userId, category, useCache = true } = options;
    const strategy = this.cacheStrategies['all-courses'];
    const cacheKey = `all-courses-${category || 'all'}-${includeEnrollmentStatus}-${userId || 'none'}`;

    if (!useCache) {
      return this.fetchAllCourses(includeEnrollmentStatus, userId, category);
    }

    return courseDataCache.get(
      cacheKey,
      () => this.fetchAllCourses(includeEnrollmentStatus, userId, category),
      strategy?.ttl || 5 * 60 * 1000
    );
  }

  /**
   * Get featured courses with high-priority caching
   */
  async getFeaturedCourses(options: {
    limit?: number;
    includeEnrollmentStatus?: boolean;
    userId?: string;
    useCache?: boolean;
  } = {}): Promise<EnhancedCourse[]> {
    const { limit = 6, includeEnrollmentStatus = false, userId, useCache = true } = options;
    const strategy = this.cacheStrategies['featured-courses'];
    const cacheKey = `featured-courses-${limit}-${includeEnrollmentStatus}-${userId || 'none'}`;

    if (!useCache) {
      return this.fetchFeaturedCourses(limit, includeEnrollmentStatus, userId);
    }

    return courseDataCache.get(
      cacheKey,
      () => this.fetchFeaturedCourses(limit, includeEnrollmentStatus, userId),
      strategy?.ttl || 10 * 60 * 1000
    );
  }

  /**
   * Get user's enrolled courses with enrollment-specific caching
   */
  async getUserCourses(userId: string, options: {
    status?: 'approved' | 'pending' | 'rejected';
    includeProgress?: boolean;
    useCache?: boolean;
  } = {}): Promise<CourseEnrollmentData[]> {
    const { status, includeProgress = false, useCache = true } = options;
    const strategy = this.cacheStrategies['user-courses'];
    const cacheKey = `user-courses-${userId}-${status || 'all'}-${includeProgress}`;

    if (!useCache) {
      return this.fetchUserCourses(userId, status, includeProgress);
    }

    return enrollmentDataCache.get(
      cacheKey,
      () => this.fetchUserCourses(userId, status, includeProgress),
      strategy?.ttl || 2 * 60 * 1000
    );
  }

  /**
   * Get course details with extended caching
   */
  async getCourseDetails(courseId: string, options: {
    userId?: string;
    includeEnrollment?: boolean;
    includeProgress?: boolean;
    useCache?: boolean;
  } = {}): Promise<CourseEnrollmentData | null> {
    const { userId, includeEnrollment = false, includeProgress = false, useCache = true } = options;
    const strategy = this.cacheStrategies['course-details'];
    const cacheKey = `course-details-${courseId}-${userId || 'none'}-${includeEnrollment}-${includeProgress}`;

    if (!useCache) {
      return this.fetchCourseDetails(courseId, userId, includeEnrollment, includeProgress);
    }

    return courseDataCache.get(
      cacheKey,
      () => this.fetchCourseDetails(courseId, userId, includeEnrollment, includeProgress),
      strategy?.ttl || 15 * 60 * 1000
    );
  }

  /**
   * Get enrollment status with high-frequency caching
   */
  async getEnrollmentStatus(userId: string, courseId: string, useCache: boolean = true): Promise<{
    isEnrolled: boolean;
    status?: 'approved' | 'pending' | 'rejected';
    enrollmentId?: string;
  }> {
    const strategy = this.cacheStrategies['enrollment-status'];
    const cacheKey = `enrollment-status-${userId}-${courseId}`;

    if (!useCache) {
      return this.fetchEnrollmentStatus(userId, courseId);
    }

    return enrollmentDataCache.get(
      cacheKey,
      () => this.fetchEnrollmentStatus(userId, courseId),
      strategy?.ttl || 1 * 60 * 1000
    );
  }

  /**
   * Batch preload frequently accessed data
   */
  async preloadFrequentData(userId?: string): Promise<void> {
    console.log('🚀 Preloading frequently accessed course data...');
    
    const preloadPromises: Promise<any>[] = [];

    // Preload featured courses (high priority)
    preloadPromises.push(
      this.getFeaturedCourses({ useCache: true }).catch(console.warn)
    );

    // Preload all courses (high priority)
    preloadPromises.push(
      this.getAllCourses({ useCache: true }).catch(console.warn)
    );

    // If user is provided, preload user-specific data
    if (userId) {
      preloadPromises.push(
        this.getUserCourses(userId, { useCache: true }).catch(console.warn)
      );
    }

    await Promise.allSettled(preloadPromises);
    console.log('✅ Course data preloading completed');
  }

  /**
   * Intelligent cache warming based on user behavior
   */
  async warmCache(patterns: {
    popularCourses?: string[];
    userCategories?: string[];
    userId?: string;
  } = {}): Promise<void> {
    const { popularCourses = [], userCategories = [], userId } = patterns;

    console.log('🔥 Warming course data cache...');

    const warmingPromises: Promise<any>[] = [];

    // Warm popular courses
    popularCourses.forEach(courseId => {
      warmingPromises.push(
        this.getCourseDetails(courseId, { userId: userId || undefined, useCache: true }).catch(console.warn)
      );
    });

    // Warm courses by user's preferred categories
    userCategories.forEach(category => {
      warmingPromises.push(
        this.getAllCourses({ category, userId: userId || undefined, useCache: true }).catch(console.warn)
      );
    });

    await Promise.allSettled(warmingPromises);
    console.log('✅ Cache warming completed');
  }

  /**
   * Invalidate cache when data changes
   */
  invalidateCache(patterns: {
    courseId?: string;
    userId?: string;
    category?: string;
    type?: 'course' | 'enrollment' | 'progress' | 'all';
  }): void {
    const { courseId, userId, category, type = 'all' } = patterns;

    console.log('🧹 Invalidating course data cache...', patterns);

    if (type === 'all' || type === 'course') {
      if (courseId) {
        courseDataCache.clearPattern(`course-details-${courseId}`);
        courseDataCache.clearPattern(`course-${courseId}`);
      }
      if (category) {
        courseDataCache.clearPattern(`courses-${category}`);
      }
      if (!courseId && !category) {
        courseDataCache.clearPattern('all-courses');
        courseDataCache.clearPattern('featured-courses');
      }
    }

    if (type === 'all' || type === 'enrollment') {
      if (userId) {
        enrollmentDataCache.clearPattern(`user-courses-${userId}`);
        enrollmentDataCache.clearPattern(`enrollment-status-${userId}`);
      }
      if (courseId && userId) {
        enrollmentDataCache.clearPattern(`enrollment-status-${userId}-${courseId}`);
      }
    }

    if (type === 'all' || type === 'progress') {
      if (userId) {
        userDataCache.clearPattern(`progress-${userId}`);
      }
    }
  }

  /**
   * Get cache performance statistics
   */
  getCacheStats(): {
    courseCache: any;
    enrollmentCache: any;
    userCache: any;
    recommendations: string[];
  } {
    const courseStats = courseDataCache.getStats();
    const enrollmentStats = enrollmentDataCache.getStats();
    const userStats = userDataCache.getStats();

    const recommendations: string[] = [];

    // Generate recommendations based on cache performance
    if (courseStats.hitRate < 70) {
      recommendations.push('Course cache hit rate is low. Consider increasing TTL or preloading more data.');
    }
    if (enrollmentStats.hitRate < 60) {
      recommendations.push('Enrollment cache hit rate is low. Consider optimizing enrollment data access patterns.');
    }
    if (courseStats.memoryUsage > 20) {
      recommendations.push('Course cache memory usage is high. Consider reducing cache size or implementing more aggressive cleanup.');
    }

    return {
      courseCache: courseStats,
      enrollmentCache: enrollmentStats,
      userCache: userStats,
      recommendations
    };
  }

  /**
   * Private fetch methods
   */
  private async fetchAllCourses(
    includeEnrollmentStatus: boolean,
    userId?: string,
    category?: string
  ): Promise<EnhancedCourse[]> {
    // This would typically fetch from your courses data source
    // For now, using the existing courses data structure
    const { coursesData } = await import('@/data/coursesData');
    let courses = coursesData.map(course => this.transformToCourse(course));

    if (category) {
      courses = courses.filter(course => course.category === category);
    }

    if (includeEnrollmentStatus && userId) {
      // Batch fetch enrollment statuses for better performance
      const enrollmentPromises = courses.map(async course => {
        const status = await this.getEnrollmentStatus(userId, course.id, true);
        return {
          ...course,
          enrollmentStatus: status.isEnrolled 
            ? (status.status === 'approved' ? 'enrolled' : 'pending')
            : 'not_enrolled'
        };
      });

      courses = await Promise.all(enrollmentPromises);
    }

    return courses;
  }

  private async fetchFeaturedCourses(
    limit: number,
    includeEnrollmentStatus: boolean,
    userId?: string
  ): Promise<EnhancedCourse[]> {
    const { featuredCourses } = await import('@/data/coursesData');
    let courses = featuredCourses.slice(0, limit).map(course => this.transformToCourse(course));

    if (includeEnrollmentStatus && userId) {
      const enrollmentPromises = courses.map(async course => {
        const status = await this.getEnrollmentStatus(userId, course.id, true);
        return {
          ...course,
          enrollmentStatus: status.isEnrolled 
            ? (status.status === 'approved' ? 'enrolled' : 'pending')
            : 'not_enrolled'
        };
      });

      courses = await Promise.all(enrollmentPromises);
    }

    return courses;
  }

  private async fetchUserCourses(
    userId: string,
    status?: string,
    includeProgress?: boolean
  ): Promise<CourseEnrollmentData[]> {
    const enrollments = await fastDataService.getUserEnrollments(userId);
    const filteredEnrollments = status 
      ? enrollments.filter(e => e.status === status)
      : enrollments;

    const courseDataPromises = filteredEnrollments.map(async enrollment => {
      const courseDetails = await this.getCourseDetails(enrollment.course_id, {
        userId,
        includeEnrollment: true,
        includeProgress: includeProgress,
        useCache: true
      });

      return courseDetails || {
        course: this.createPlaceholderCourse(enrollment.course_id, enrollment.course_title),
        enrollment,
        isAccessible: enrollment.status === 'approved'
      };
    });

    return Promise.all(courseDataPromises);
  }

  private async fetchCourseDetails(
    courseId: string,
    userId?: string,
    includeEnrollment?: boolean,
    includeProgress?: boolean
  ): Promise<CourseEnrollmentData | null> {
    // Fetch course data from your data source
    const { coursesData } = await import('@/data/coursesData');
    const courseData = coursesData.find(c => c.id === courseId || c.courseId === courseId);
    
    if (!courseData) {
      return null;
    }

    const course = this.transformToCourse(courseData);
    let enrollment = undefined;
    let progress = undefined;
    let isAccessible = true;

    if (userId) {
      if (includeEnrollment) {
        enrollment = await fastDataService.getUserEnrollment(userId, courseId);
        isAccessible = enrollment?.status === 'approved' || false;
      }

      if (includeProgress && enrollment?.status === 'approved') {
        // Fetch progress data - this would come from your progress tracking system
        progress = { completed: 0, total: 10, percentage: 0 };
      }
    }

    return {
      course,
      enrollment,
      progress,
      isAccessible
    };
  }

  private async fetchEnrollmentStatus(userId: string, courseId: string): Promise<{
    isEnrolled: boolean;
    status?: 'approved' | 'pending' | 'rejected';
    enrollmentId?: string;
  }> {
    const enrollment = await fastDataService.getUserEnrollment(userId, courseId);
    
    return {
      isEnrolled: !!enrollment,
      status: enrollment?.status as 'approved' | 'pending' | 'rejected' | undefined,
      enrollmentId: enrollment?.id
    };
  }

  private transformToCourse(courseData: any): EnhancedCourse {
    return {
      id: courseData.id || courseData.courseId,
      title: courseData.title,
      description: courseData.description,
      category: courseData.category,
      level: courseData.level,
      duration: courseData.duration,
      price: courseData.price,
      currency: courseData.currency || 'ZAR',
      instructor: courseData.instructor,
      rating: courseData.rating,
      students: courseData.students,
      image: courseData.image,
      isComingSoon: courseData.isComingSoon,
      available: courseData.available !== false,
      courseId: courseData.courseId || courseData.id
    };
  }

  private createPlaceholderCourse(courseId: string, title: string): EnhancedCourse {
    return {
      id: courseId,
      title: title,
      description: 'Course details loading...',
      category: 'General',
      level: 'Beginner',
      duration: 'TBD',
      price: 0,
      currency: 'ZAR',
      instructor: 'TBD',
      rating: 0,
      students: 0,
      image: '/images/placeholder.jpg',
      available: true,
      courseId: courseId
    };
  }
}

export const enhancedCourseDataService = EnhancedCourseDataService.getInstance();