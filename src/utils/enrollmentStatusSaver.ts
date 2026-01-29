// 🛡️ ENROLLMENT STATUS SAVER
// This utility ensures enrollment status is immediately saved when enrollment occurs

import { saveEnrollment, saveCourseProgress } from './enrollmentPersistence';
import { logger } from './logger';

export interface EnrollmentData {
  id: string;
  user_id: string;
  user_email?: string;
  course_id: string;
  course_title?: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  approved_at?: string;
  updated_at: string;
  progress: number;
}

/**
 * Immediately save enrollment status to localStorage with multiple backup strategies
 */
export const saveEnrollmentStatus = (enrollmentData: Partial<EnrollmentData>): void => {
  try {
    const enrollment: EnrollmentData = {
      id: enrollmentData.id || `enrollment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user_id: enrollmentData.user_id!,
      user_email: enrollmentData.user_email,
      course_id: enrollmentData.course_id!,
      course_title: enrollmentData.course_title,
      status: enrollmentData.status || 'pending',
      enrolled_at: enrollmentData.enrolled_at || new Date().toISOString(),
      approved_at: enrollmentData.approved_at,
      updated_at: new Date().toISOString(),
      progress: enrollmentData.progress || 0
    };

    // Save using the persistence utility
    saveEnrollment(enrollment);

    // Also save progress if provided
    if (enrollment.progress > 0) {
      saveCourseProgress(enrollment.course_id, enrollment.progress, enrollment.user_id);
    }

    // Dispatch events to notify all components
    window.dispatchEvent(new CustomEvent('enrollment-status-saved', {
      detail: {
        enrollment,
        timestamp: new Date().toISOString()
      }
    }));

    // Also dispatch the standard enrollment events for backward compatibility
    window.dispatchEvent(new CustomEvent('enrollment-created', {
      detail: {
        enrollment,
        timestamp: new Date().toISOString()
      }
    }));

    logger.info(`✅ Enrollment status saved: ${enrollment.course_id} - ${enrollment.status}`);
  } catch (error) {
    logger.error('❌ Error saving enrollment status:', error);
  }
};

/**
 * Update enrollment status (e.g., from pending to approved)
 */
export const updateEnrollmentStatus = (
  courseId: string, 
  newStatus: 'pending' | 'approved' | 'rejected',
  userId: string,
  userEmail?: string
): void => {
  try {
    // Get existing enrollment data
    const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const enrollmentIndex = existingEnrollments.findIndex((e: any) => 
      e.course_id === courseId && (e.user_id === userId || e.user_email === userId)
    );

    if (enrollmentIndex !== -1) {
      // Update existing enrollment
      const updatedEnrollment = {
        ...existingEnrollments[enrollmentIndex],
        status: newStatus,
        updated_at: new Date().toISOString(),
        approved_at: newStatus === 'approved' ? new Date().toISOString() : undefined
      };

      // Save updated enrollment
      saveEnrollment(updatedEnrollment);

      // Dispatch events
      window.dispatchEvent(new CustomEvent('enrollment-status-updated', {
        detail: {
          courseId,
          newStatus,
          userId,
          userEmail,
          enrollment: updatedEnrollment,
          timestamp: new Date().toISOString()
        }
      }));

      logger.info(`✅ Enrollment status updated: ${courseId} - ${newStatus}`);
    } else {
      logger.warn(`⚠️ No existing enrollment found for course ${courseId} and user ${userId}`);
    }
  } catch (error) {
    logger.error('❌ Error updating enrollment status:', error);
  }
};

/**
 * Save course progress immediately
 */
export const saveCourseProgressImmediately = (
  courseId: string, 
  progress: number, 
  userId: string
): void => {
  try {
    // Save progress using persistence utility
    saveCourseProgress(courseId, progress, userId);

    // Dispatch progress update event
    window.dispatchEvent(new CustomEvent('course-progress-saved', {
      detail: {
        courseId,
        progress,
        userId,
        timestamp: new Date().toISOString()
      }
    }));

    logger.info(`✅ Course progress saved: ${courseId} - ${progress}%`);
  } catch (error) {
    logger.error('❌ Error saving course progress:', error);
  }
};

/**
 * Emergency save - save all current enrollment data to multiple locations
 */
export const emergencySaveEnrollments = (userId: string): void => {
  try {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const userEnrollments = enrollments.filter((e: any) => 
      e.user_id === userId || e.user_email === userId
    );

    // Save to multiple backup locations
    localStorage.setItem(`emergency-backup-${userId}-${Date.now()}`, JSON.stringify(userEnrollments));
    localStorage.setItem(`user-enrollments-${userId}`, JSON.stringify(userEnrollments));

    logger.info(`🛡️ Emergency save completed: ${userEnrollments.length} enrollments for user ${userId}`);
  } catch (error) {
    logger.error('❌ Error during emergency save:', error);
  }
};
