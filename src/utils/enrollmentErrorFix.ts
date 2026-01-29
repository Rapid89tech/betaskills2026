/**
 * Emergency Enrollment Error Fix
 * 
 * This utility provides fallback functions to prevent enrollment system crashes
 */

import { logger } from './logger';

// Fallback enrollment data structure
export interface FallbackEnrollmentData {
  id: string;
  user_id: string;
  user_email?: string;
  course_id: string;
  course_title?: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  progress: number;
}

/**
 * Safe enrollment status checker that won't crash the app
 */
export const safeGetEnrollmentStatus = (courseId: string, userId: string): string => {
  try {
    if (!courseId || !userId) {
      return 'unenrolled';
    }

    // Check localStorage safely
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    const userEnrollment = enrollments.find((e: any) => 
      e.course_id === courseId && 
      (e.user_id === userId || e.user_email === userId)
    );

    if (userEnrollment) {
      return userEnrollment.status === 'approved' ? 'enrolled' : 
             userEnrollment.status === 'pending' ? 'pending' : 'unenrolled';
    }

    return 'unenrolled';
  } catch (error) {
    logger.error('Error in safeGetEnrollmentStatus:', error);
    return 'unenrolled';
  }
};

/**
 * Safe enrollment creation that won't crash the app
 */
export const safeCreateEnrollment = async (
  courseId: string, 
  courseTitle: string, 
  userId: string, 
  userEmail?: string
): Promise<boolean> => {
  try {
    const enrollmentData: FallbackEnrollmentData = {
      id: `enrollment_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user_id: userId,
      user_email: userEmail || '',
      course_id: courseId,
      course_title: courseTitle || '',
      status: 'pending',
      enrolled_at: new Date().toISOString(),
      progress: 0
    };

    // Save to localStorage safely
    const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    existingEnrollments.push(enrollmentData);
    localStorage.setItem('enrollments', JSON.stringify(existingEnrollments));

    // Dispatch events
    window.dispatchEvent(new CustomEvent('enrollment-success', {
      detail: { 
        courseId, 
        enrollment: enrollmentData,
        timestamp: new Date().toISOString() 
      }
    }));

    logger.info(`Safe enrollment created: ${courseId}`);
    return true;
  } catch (error) {
    logger.error('Error in safeCreateEnrollment:', error);
    return false;
  }
};

/**
 * Initialize safe enrollment system
 */
export const initializeSafeEnrollmentSystem = (): void => {
  try {
    // Ensure localStorage has enrollments array
    if (!localStorage.getItem('enrollments')) {
      localStorage.setItem('enrollments', '[]');
    }

    // Add global error handler for enrollment operations
    window.addEventListener('error', (event) => {
      if (event.message?.includes('enrollment') || event.message?.includes('Enrollment')) {
        logger.error('Enrollment system error caught:', event.error);
        event.preventDefault(); // Prevent the error from crashing the app
      }
    });

    logger.info('Safe enrollment system initialized');
  } catch (error) {
    logger.error('Error initializing safe enrollment system:', error);
  }
};