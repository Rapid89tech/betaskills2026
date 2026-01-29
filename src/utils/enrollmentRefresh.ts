/**
 * Global enrollment refresh utility
 * Provides centralized functions to refresh enrollment data across all components
 */

import { logger } from './logger';

/**
 * Force refresh all enrollment-related components
 */
export const forceRefreshAllEnrollments = (courseId?: string) => {
  logger.info('🔄 forceRefreshAllEnrollments: Starting global enrollment refresh', { courseId });

  // Dispatch all possible refresh events
  const events = [
    'enrollment-success',
    'force-course-card-refresh', 
    'enrollment-status-refresh',
    'enrollment-created'
  ];

  events.forEach(eventName => {
    const event = new CustomEvent(eventName, {
      detail: {
        courseId,
        timestamp: new Date().toISOString(),
        source: 'forceRefreshAllEnrollments'
      }
    });
    window.dispatchEvent(event);
    logger.info(`✅ Dispatched ${eventName} event`);
  });

  // Also trigger a storage event to refresh localStorage-dependent components
  window.dispatchEvent(new StorageEvent('storage', {
    key: 'enrollments',
    newValue: localStorage.getItem('enrollments'),
    oldValue: localStorage.getItem('enrollments'),
    storageArea: localStorage
  }));

  logger.info('✅ forceRefreshAllEnrollments: Completed global enrollment refresh');
};

/**
 * Refresh enrollment data for a specific course
 */
export const refreshCourseEnrollment = (courseId: string, userId: string) => {
  logger.info('🔄 refreshCourseEnrollment: Refreshing enrollment for course', { courseId, userId });

  // Check if enrollment exists in localStorage
  const enrollmentKeys = [
    `enrollment-${courseId}`,
    `user-enrollment-${userId}-${courseId}`,
    `user-enrollments-${userId}`,
    'enrollments'
  ];

  let enrollmentFound = false;
  for (const key of enrollmentKeys) {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        if (key === 'enrollments' || key.startsWith('user-enrollments-')) {
          const enrollments = JSON.parse(data);
          if (Array.isArray(enrollments)) {
            const enrollment = enrollments.find(e => 
              e.course_id === courseId && 
              (e.user_id === userId || e.user_email === userId)
            );
            if (enrollment) {
              enrollmentFound = true;
              logger.info('✅ Found enrollment in localStorage:', enrollment);
              break;
            }
          }
        } else {
          const enrollment = JSON.parse(data);
          if (enrollment.course_id === courseId && 
              (enrollment.user_id === userId || enrollment.user_email === userId)) {
            enrollmentFound = true;
            logger.info('✅ Found enrollment in localStorage:', enrollment);
            break;
          }
        }
      } catch (error) {
        logger.warn(`Error parsing ${key}:`, error);
      }
    }
  }

  if (enrollmentFound) {
    forceRefreshAllEnrollments(courseId);
  } else {
    logger.warn('❌ No enrollment found in localStorage for course:', courseId);
  }

  return enrollmentFound;
};

/**
 * Set up automatic enrollment refresh after payment
 */
export const setupPostPaymentRefresh = (courseId: string, userId: string) => {
  logger.info('🔄 setupPostPaymentRefresh: Setting up post-payment refresh', { courseId, userId });

  // Set up a polling mechanism to check for enrollment data
  let attempts = 0;
  const maxAttempts = 10;
  const checkInterval = 1000; // 1 second

  const checkForEnrollment = () => {
    attempts++;
    logger.info(`🔍 Checking for enrollment (attempt ${attempts}/${maxAttempts})`);

    const found = refreshCourseEnrollment(courseId, userId);
    
    if (found) {
      logger.info('✅ Enrollment found, stopping checks');
      return;
    }

    if (attempts < maxAttempts) {
      setTimeout(checkForEnrollment, checkInterval);
    } else {
      logger.warn('❌ Max attempts reached, enrollment not found');
      // Force refresh anyway in case data exists but wasn't detected
      forceRefreshAllEnrollments(courseId);
    }
  };

  // Start checking after a short delay
  setTimeout(checkForEnrollment, 500);
};

/**
 * Clean up old enrollment flags and data
 */
export const cleanupOldEnrollmentData = () => {
  logger.info('🧹 cleanupOldEnrollmentData: Cleaning up old enrollment data');

  const now = Date.now();
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

  // Clean up old enrollment success flags
  const allKeys = Object.keys(localStorage);
  const enrollmentSuccessKeys = allKeys.filter(key => key.startsWith('enrollment-success-'));
  
  enrollmentSuccessKeys.forEach(key => {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const successData = JSON.parse(data);
        const successTime = new Date(successData.timestamp).getTime();
        
        if (now - successTime > oneHour) {
          localStorage.removeItem(key);
          logger.info(`🗑️ Removed old enrollment success flag: ${key}`);
        }
      }
    } catch (error) {
      logger.warn(`Error cleaning up ${key}:`, error);
      localStorage.removeItem(key); // Remove corrupted data
    }
  });

  // Clean up old recent payment flags
  const recentPaymentKeys = allKeys.filter(key => key.startsWith('recent-payment-'));
  
  recentPaymentKeys.forEach(key => {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const paymentData = JSON.parse(data);
        const paymentTime = new Date(paymentData.timestamp).getTime();
        
        if (now - paymentTime > oneHour) {
          localStorage.removeItem(key);
          logger.info(`🗑️ Removed old recent payment flag: ${key}`);
        }
      }
    } catch (error) {
      logger.warn(`Error cleaning up ${key}:`, error);
      localStorage.removeItem(key); // Remove corrupted data
    }
  });

  logger.info('✅ cleanupOldEnrollmentData: Cleanup completed');
};

// Set up automatic cleanup on page load
if (typeof window !== 'undefined') {
  // Clean up old data when the utility is loaded
  setTimeout(cleanupOldEnrollmentData, 1000);
  
  // Set up periodic cleanup every 10 minutes
  setInterval(cleanupOldEnrollmentData, 10 * 60 * 1000);
}