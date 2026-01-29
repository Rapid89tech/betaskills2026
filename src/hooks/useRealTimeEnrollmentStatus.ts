import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { unifiedEnrollmentManager } from '@/services/UnifiedEnrollmentManager';
import { logger } from '@/utils/logger';

/**
 * 🚨 MIGRATED: Real-time Enrollment Status Updates using UnifiedEnrollmentManager
 * This hook provides real-time updates to enrollment status without requiring page refreshes
 * Now uses UnifiedEnrollmentManager instead of direct localStorage access
 */
export const useRealTimeEnrollmentStatus = (courseId: string) => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const checkEnrollmentStatus = async () => {
    if (!user || !courseId) {
      setIsEnrolled(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // 🚨 MIGRATED: Use UnifiedEnrollmentManager instead of localStorage checks
      logger.info(`🔍 Checking enrollment status for ${courseId} via UnifiedEnrollmentManager...`);
      
      const enrolled = await unifiedEnrollmentManager.isUserEnrolledInCourse(user.id, courseId);
      
      setIsEnrolled(enrolled);
      setLoading(false);

      logger.info(`🔍 Real-time enrollment check for ${courseId}: ${enrolled}`);
    } catch (error) {
      logger.error('Error checking enrollment status via UnifiedEnrollmentManager:', error);
      setIsEnrolled(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkEnrollmentStatus();

    // 🚨 MIGRATED: Listen for UnifiedEnrollmentManager events instead of localStorage events
    const handleEnrollmentCreated = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment && enrollment.user_id === user?.id && enrollment.course_id === courseId) {
        logger.info(`🎯 Enrollment created detected for ${courseId} via UnifiedEnrollmentManager, updating status...`);
        setTimeout(checkEnrollmentStatus, 100);
      }
    };

    const handleEnrollmentUpdated = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment && enrollment.user_id === user?.id && enrollment.course_id === courseId) {
        logger.info(`🔄 Enrollment updated detected for ${courseId} via UnifiedEnrollmentManager, updating status...`);
        setTimeout(checkEnrollmentStatus, 100);
      }
    };

    const handleEnrollmentStatusChanged = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment && enrollment.user_id === user?.id && enrollment.course_id === courseId) {
        logger.info(`📄 Enrollment status changed for ${courseId} via UnifiedEnrollmentManager, updating status...`);
        setTimeout(checkEnrollmentStatus, 100);
      }
    };

    const handleSyncCompleted = () => {
      logger.info(`🔄 UnifiedEnrollmentManager sync completed, rechecking enrollment for ${courseId}...`);
      checkEnrollmentStatus();
    };

    // Add UnifiedEnrollmentManager event listeners
    unifiedEnrollmentManager.addEventListener('enrollment-created', handleEnrollmentCreated);
    unifiedEnrollmentManager.addEventListener('enrollment-updated', handleEnrollmentUpdated);
    unifiedEnrollmentManager.addEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);
    unifiedEnrollmentManager.addEventListener('sync-completed', handleSyncCompleted);

    // Keep legacy window event listeners for backward compatibility
    const handleLegacyEnrollmentSuccess = (event: CustomEvent) => {
      const { courseId: eventCourseId } = event.detail;
      if (eventCourseId === courseId) {
        logger.info(`🎯 Legacy enrollment success detected for ${courseId}, updating status...`);
        setTimeout(checkEnrollmentStatus, 100);
      }
    };

    const handleLegacyEnrollmentSubmitted = (event: CustomEvent) => {
      const { courseId: eventCourseId } = event.detail;
      if (eventCourseId === courseId) {
        logger.info(`📄 Legacy enrollment submitted for ${courseId}, checking status...`);
        setTimeout(checkEnrollmentStatus, 100);
      }
    };

    window.addEventListener('enrollment-success', handleLegacyEnrollmentSuccess as EventListener);
    window.addEventListener('enrollment-submitted', handleLegacyEnrollmentSubmitted as EventListener);

    return () => {
      // Remove UnifiedEnrollmentManager event listeners
      unifiedEnrollmentManager.removeEventListener('enrollment-created', handleEnrollmentCreated);
      unifiedEnrollmentManager.removeEventListener('enrollment-updated', handleEnrollmentUpdated);
      unifiedEnrollmentManager.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);
      unifiedEnrollmentManager.removeEventListener('sync-completed', handleSyncCompleted);

      // Remove legacy window event listeners
      window.removeEventListener('enrollment-success', handleLegacyEnrollmentSuccess as EventListener);
      window.removeEventListener('enrollment-submitted', handleLegacyEnrollmentSubmitted as EventListener);
    };
  }, [user, courseId]);

  return {
    isEnrolled,
    loading,
    recheckStatus: checkEnrollmentStatus
  };
};
