// Enrollment debugging utilities
import { logger } from './logger';

export const debugEnrollmentData = () => {
  try {
    const enrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
    logger.debug('Raw localStorage enrollments:', enrollments);
    
    enrollments.forEach((enrollment: any, index: number) => {
      logger.debug(`Enrollment ${index}:`, {
        id: enrollment.id,
        user_id: enrollment.user_id,
        userId: enrollment.userId,
        course_id: enrollment.course_id,
        courseId: enrollment.courseId,
        status: enrollment.status,
        title: enrollment.course_title
      });
    });
    
    return enrollments;
  } catch (error) {
    logger.error('Error reading enrollment data:', error);
    return [];
  }
};

export const clearEnrollmentCache = () => {
  logger.info('Clearing enrollment cache...');
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('user-enrollments-') || key.includes('-timestamp')) {
      localStorage.removeItem(key);
      logger.debug(`Removed cache key: ${key}`);
    }
  });
};

export const invalidateUserCache = (userId: string) => {
  logger.info(`Invalidating cache for user: ${userId}`);
  const cacheKey = `user-enrollments-${userId}`;
  localStorage.removeItem(cacheKey);
  localStorage.removeItem(`${cacheKey}-timestamp`);
  
  // Trigger cache refresh event
  window.dispatchEvent(new CustomEvent('cache-invalidated', {
    detail: { userId }
  }));
};

// Add to window for easy debugging in browser console (development only)
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).debugEnrollments = debugEnrollmentData;
  (window as any).clearEnrollmentCache = clearEnrollmentCache;
}
