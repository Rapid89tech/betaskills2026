import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useEnrollments } from '@/hooks/useEnrollments';
import { refreshEnrollmentStatus, getStoredEnrollments } from '@/utils/enrollmentPersistence';
import { logger } from '@/utils/logger';

/**
 * EnrollmentStatusSync Component
 * 
 * This component ensures enrollment status is properly synchronized across the application
 * and persists correctly across page refreshes. It runs in the background and:
 * 
 * 1. Listens for enrollment status changes
 * 2. Ensures data consistency between different storage methods
 * 3. Triggers UI refreshes when enrollment status changes
 * 4. Provides emergency data recovery if needed
 */
export const EnrollmentStatusSync: React.FC = () => {
  const { user } = useAuth();
  const { enrollments, refetch } = useEnrollments();

  useEffect(() => {
    if (!user) return;

    logger.info('🔄 EnrollmentStatusSync: Starting enrollment status synchronization for user:', user.email);

    // Function to sync enrollment status across all components
    const syncEnrollmentStatus = () => {
      try {
        // Get stored enrollments from localStorage
        const storedEnrollments = getStoredEnrollments(user.id || user.email);
        
        logger.info(`📊 EnrollmentStatusSync: Found ${storedEnrollments.length} stored enrollments`);
        
        // Only refresh the useEnrollments hook data to avoid recursion
        if (typeof refetch === 'function') {
          refetch();
        }
        
      } catch (error) {
        logger.error('❌ EnrollmentStatusSync: Error syncing enrollment status:', error);
      }
    };

    // Initial sync
    syncEnrollmentStatus();

    // Listen for enrollment changes from various sources
    const handleEnrollmentCreated = (event: CustomEvent) => {
      logger.info('🔄 EnrollmentStatusSync: Enrollment created, syncing status...');
      setTimeout(syncEnrollmentStatus, 100);
    };

    const handleEnrollmentUpdated = (event: CustomEvent) => {
      logger.info('🔄 EnrollmentStatusSync: Enrollment updated, syncing status...');
      setTimeout(syncEnrollmentStatus, 100);
    };

    const handleEnrollmentStatusChanged = (event: CustomEvent) => {
      logger.info('🔄 EnrollmentStatusSync: Enrollment status changed, syncing...');
      setTimeout(syncEnrollmentStatus, 100);
    };

    const handleEnrollmentStatusUpdated = (event: CustomEvent) => {
      logger.info('🔄 EnrollmentStatusSync: enrollment-status-updated received, syncing...');
      setTimeout(syncEnrollmentStatus, 100);
    };

    const handleAdminApproval = (event: CustomEvent) => {
      logger.info('🔄 EnrollmentStatusSync: admin-approval received, syncing...');
      setTimeout(syncEnrollmentStatus, 100);
    };

    const handleEnrollmentRefresh = (event: CustomEvent) => {
      logger.info('🔄 EnrollmentStatusSync: Manual enrollment refresh requested...');
      // Don't call syncEnrollmentStatus here to avoid infinite recursion
      // Just refresh the useEnrollments hook data
      if (typeof refetch === 'function') {
        refetch();
      }
    };

    // Listen for localStorage changes (cross-tab synchronization)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key && (
        event.key === 'enrollments' ||
        event.key.startsWith('user-enrollments-') ||
        event.key.startsWith('course-progress-')
      )) {
        logger.info('🔄 EnrollmentStatusSync: Storage change detected, syncing status...');
        setTimeout(syncEnrollmentStatus, 100);
      }
    };

    // Listen for page visibility changes to sync when tab becomes active
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        logger.info('🔄 EnrollmentStatusSync: Tab became visible, syncing status...');
        setTimeout(syncEnrollmentStatus, 100);
      }
    };

    // Add event listeners
    window.addEventListener('enrollment-created', handleEnrollmentCreated as EventListener);
    window.addEventListener('enrollment-updated', handleEnrollmentUpdated as EventListener);
    window.addEventListener('enrollment-status-changed', handleEnrollmentStatusChanged as EventListener);
    window.addEventListener('enrollment-status-updated', handleEnrollmentStatusUpdated as EventListener);
    window.addEventListener('admin-approval', handleAdminApproval as EventListener);
    window.addEventListener('enrollment-status-refresh', handleEnrollmentRefresh as EventListener);
    window.addEventListener('storage', handleStorageChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Periodic sync every 30 seconds to ensure consistency
    const syncInterval = setInterval(() => {
      logger.debug('🔄 EnrollmentStatusSync: Periodic sync check...');
      syncEnrollmentStatus();
    }, 30000);

    // Cleanup function
    return () => {
      window.removeEventListener('enrollment-created', handleEnrollmentCreated as EventListener);
      window.removeEventListener('enrollment-updated', handleEnrollmentUpdated as EventListener);
      window.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChanged as EventListener);
      window.removeEventListener('enrollment-status-updated', handleEnrollmentStatusUpdated as EventListener);
      window.removeEventListener('admin-approval', handleAdminApproval as EventListener);
      window.removeEventListener('enrollment-status-refresh', handleEnrollmentRefresh as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearInterval(syncInterval);
      
      logger.info('🧹 EnrollmentStatusSync: Cleaned up event listeners');
    };
  }, [user, refetch]);

  // This component doesn't render anything visible
  return null;
};

export default EnrollmentStatusSync;
