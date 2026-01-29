import { CoursePriorityCalculation } from '@/types/unifiedCourse';
import { CoursePriority } from '@/types/enrollment';

/**
 * Course Priority Calculator Service
 * Determines course display order based on enrollment status
 */
export class CoursePriorityCalculator {
  /**
   * Calculate course priorities based on enrollment status
   */
  static calculatePriorities(
    courseIds: string[],
    enrollments: Record<string, string> = {},
    coursePriorities: CoursePriority[] = []
  ): CoursePriorityCalculation[] {
    const priorities: CoursePriorityCalculation[] = [];
    
    // Create a map of existing course priorities for quick lookup
    const priorityMap = new Map<string, CoursePriority>();
    coursePriorities.forEach(priority => {
      priorityMap.set(priority.courseId, priority);
    });

    // Separate courses by enrollment status for better ordering
    const enrolledCourses: string[] = [];
    const pendingCourses: string[] = [];
    const notEnrolledCourses: string[] = [];

    courseIds.forEach((courseId) => {
      const enrollment = this.normalizeEnrollmentStatus(enrollments[courseId]);
      const existingPriority = priorityMap.get(courseId);
      
      // Determine final enrollment status
      let finalStatus = enrollment;
      if (finalStatus === 'NOT_ENROLLED' && existingPriority) {
        // Use existing priority data if available
        finalStatus = existingPriority.enrollmentStatus === 'NONE' ? 'NOT_ENROLLED' : existingPriority.enrollmentStatus;
      }

      // Categorize courses by status
      if (finalStatus === 'ENROLLED') {
        enrolledCourses.push(courseId);
      } else if (finalStatus === 'PENDING') {
        pendingCourses.push(courseId);
      } else {
        notEnrolledCourses.push(courseId);
      }
    });

    // Build priorities with proper ordering
    let displayOrder = 0;

    // Enrolled courses get highest priority
    enrolledCourses.forEach((courseId, index) => {
      priorities.push({
        courseId,
        enrollmentStatus: 'ENROLLED',
        priority: 1,
        displayOrder: displayOrder++
      });
    });

    // Pending courses get second priority
    pendingCourses.forEach((courseId, index) => {
      priorities.push({
        courseId,
        enrollmentStatus: 'PENDING',
        priority: 2,
        displayOrder: displayOrder++
      });
    });

    // Not enrolled courses get lowest priority, maintain original order
    notEnrolledCourses.forEach((courseId, index) => {
      const existingPriority = priorityMap.get(courseId);
      priorities.push({
        courseId,
        enrollmentStatus: 'NOT_ENROLLED',
        priority: existingPriority?.priority || 999,
        displayOrder: displayOrder++
      });
    });

    // Sort by priority, then by display order
    return priorities.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.displayOrder - b.displayOrder;
    });
  }

  /**
   * Normalize enrollment status from different formats
   */
  private static normalizeEnrollmentStatus(status: string | undefined): 'ENROLLED' | 'PENDING' | 'NOT_ENROLLED' {
    if (!status) return 'NOT_ENROLLED';
    
    const normalizedStatus = status.toLowerCase().trim();
    
    switch (normalizedStatus) {
      case 'enrolled':
      case 'approved':
      case 'active':
        return 'ENROLLED';
      case 'pending':
      case 'waiting':
      case 'review':
        return 'PENDING';
      case 'unenrolled':
      case 'rejected':
      case 'inactive':
      case 'none':
      default:
        return 'NOT_ENROLLED';
    }
  }

  /**
   * Convert CoursePriorityCalculation to CoursePriority format for compatibility
   */
  static toCoursePriority(
    calculations: CoursePriorityCalculation[],
    userId: string = 'current-user'
  ): CoursePriority[] {
    return calculations.map(calc => ({
      courseId: calc.courseId,
      userId,
      priority: calc.priority,
      enrollmentStatus: calc.enrollmentStatus === 'NOT_ENROLLED' ? 'NONE' : calc.enrollmentStatus,
      lastUpdated: new Date()
    }));
  }

  /**
   * Get enrollment status indicator for UI display
   */
  static getEnrollmentStatusIndicator(status: 'ENROLLED' | 'PENDING' | 'NOT_ENROLLED') {
    switch (status) {
      case 'ENROLLED':
        return {
          label: 'Enrolled',
          color: 'green',
          bgClass: 'bg-green-500',
          textClass: 'text-green-700',
          borderClass: 'border-green-400',
          ringClass: 'ring-green-400',
          priority: 1,
          icon: 'CheckCircle'
        };
      case 'PENDING':
        return {
          label: 'Pending Approval',
          color: 'yellow',
          bgClass: 'bg-yellow-500',
          textClass: 'text-yellow-700',
          borderClass: 'border-yellow-400',
          ringClass: 'ring-yellow-400',
          priority: 2,
          icon: 'Clock'
        };
      case 'NOT_ENROLLED':
      default:
        return {
          label: 'Available',
          color: 'gray',
          bgClass: 'bg-gray-500',
          textClass: 'text-gray-700',
          borderClass: 'border-gray-400',
          ringClass: 'ring-gray-400',
          priority: 999,
          icon: 'BookOpen'
        };
    }
  }

  /**
   * Check if a course should be highlighted based on enrollment status
   */
  static shouldHighlightCourse(status: 'ENROLLED' | 'PENDING' | 'NOT_ENROLLED'): boolean {
    return status === 'ENROLLED' || status === 'PENDING';
  }

  /**
   * Get courses grouped by enrollment status
   */
  static groupCoursesByStatus(calculations: CoursePriorityCalculation[]) {
    const groups = {
      enrolled: calculations.filter(calc => calc.enrollmentStatus === 'ENROLLED'),
      pending: calculations.filter(calc => calc.enrollmentStatus === 'PENDING'),
      available: calculations.filter(calc => calc.enrollmentStatus === 'NOT_ENROLLED')
    };

    return {
      ...groups,
      hasEnrolled: groups.enrolled.length > 0,
      hasPending: groups.pending.length > 0,
      hasAvailable: groups.available.length > 0,
      totalEnrolled: groups.enrolled.length,
      totalPending: groups.pending.length,
      totalAvailable: groups.available.length
    };
  }
}