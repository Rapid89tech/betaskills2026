// Utility to clean up conflicting progress data that might cause flashing
import { logger } from './logger';

export const cleanupProgressData = () => {
  try {
    logger.info('🧹 Cleaning up legacy progress data...');
    
    // Get all localStorage keys
    const keys = Object.keys(localStorage);
    
    // Remove only legacy progress-related cache keys (not unified system data)
    const legacyProgressKeys = keys.filter(key => 
      (key.includes('progress') && !key.includes('unified')) || 
      key.includes('legacy-progress') ||
      key.includes('old-progress') ||
      key.includes('conflicting-progress')
    );
    
    legacyProgressKeys.forEach(key => {
      localStorage.removeItem(key);
      logger.debug(`🗑️ Removed legacy key: ${key}`);
    });
    
    // Remove old user-specific caches (but keep unified system data)
    const legacyUserKeys = keys.filter(key => 
      (key.startsWith('user-') && !key.includes('unified')) ||
      (key.startsWith('cache-') && !key.includes('unified'))
    );
    
    legacyUserKeys.forEach(key => {
      localStorage.removeItem(key);
      logger.debug(`🗑️ Removed legacy user key: ${key}`);
    });
    
    logger.info(`✅ Cleaned up ${legacyProgressKeys.length + legacyUserKeys.length} legacy cache entries`);
    return true;
  } catch (error) {
    logger.error('❌ Error cleaning up legacy progress data:', error);
    return false;
  }
};

// Function to clear specific course progress
export const clearCourseProgress = (courseId: string) => {
  try {
    const keys = Object.keys(localStorage);
    const courseKeys = keys.filter(key => key.includes(courseId));
    
    courseKeys.forEach(key => {
      localStorage.removeItem(key);
    });
    
    logger.info(`Cleared progress for course: ${courseId}`);
    return true;
  } catch (error) {
    logger.error(`Error clearing progress for course ${courseId}:`, error);
    return false;
  }
};

// Make these available for debugging only in development
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  (window as any).cleanupProgressData = cleanupProgressData;
  (window as any).clearCourseProgress = clearCourseProgress;
}
