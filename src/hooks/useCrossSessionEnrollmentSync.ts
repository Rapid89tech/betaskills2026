import { useEffect, useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { crossSessionEnrollmentSync } from '@/services/CrossSessionEnrollmentSync';
import { logger } from '@/utils/logger';

interface EnrollmentSyncData {
  userId: string;
  courseId: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  timestamp: number;
  source: 'payment' | 'admin' | 'webhook' | 'manual';
}

interface CrossSessionSyncState {
  isOnline: boolean;
  lastSync: number | null;
  syncInProgress: boolean;
  queuedUpdates: number;
}

/**
 * Hook for cross-session enrollment synchronization
 * Provides real-time enrollment status updates across multiple browser tabs and devices
 */
export const useCrossSessionEnrollmentSync = (courseId?: string) => {
  const { user } = useAuth();
  const [syncState, setSyncState] = useState<CrossSessionSyncState>({
    isOnline: navigator.onLine,
    lastSync: null,
    syncInProgress: false,
    queuedUpdates: 0
  });
  
  const [enrollmentStatus, setEnrollmentStatus] = useState<{
    status: 'pending' | 'approved' | 'rejected' | null;
    paymentStatus?: 'pending' | 'processing' | 'completed' | 'failed';
    lastUpdated?: number;
  }>({
    status: null
  });

  /**
   * Sync enrollment status across sessions
   */
  const syncEnrollmentStatus = useCallback(async (
    targetCourseId: string,
    status: 'pending' | 'approved' | 'rejected',
    paymentStatus?: 'pending' | 'processing' | 'completed' | 'failed',
    source: 'payment' | 'admin' | 'webhook' | 'manual' = 'manual'
  ) => {
    if (!user) {
      logger.warn('Cannot sync enrollment status: user not authenticated');
      return;
    }

    setSyncState(prev => ({ ...prev, syncInProgress: true }));

    try {
      const syncData: EnrollmentSyncData = {
        userId: user.id,
        courseId: targetCourseId,
        status,
        paymentStatus,
        timestamp: Date.now(),
        source
      };

      await crossSessionEnrollmentSync.syncEnrollmentStatus(syncData);
      
      setSyncState(prev => ({
        ...prev,
        syncInProgress: false,
        lastSync: Date.now()
      }));

      logger.info(`✅ Enrollment status synced across sessions: ${targetCourseId} -> ${status}`);
    } catch (error) {
      logger.error('Error syncing enrollment status:', error);
      setSyncState(prev => ({ ...prev, syncInProgress: false }));
    }
  }, [user]);

  /**
   * Get current enrollment status for a course
   */
  const getEnrollmentStatus = useCallback((targetCourseId: string) => {
    if (!user) return null;
    
    return crossSessionEnrollmentSync.getEnrollmentStatus(user.id, targetCourseId);
  }, [user]);

  /**
   * Force sync with server
   */
  const forceSyncWithServer = useCallback(async () => {
    if (!user) return;

    setSyncState(prev => ({ ...prev, syncInProgress: true }));
    
    try {
      await crossSessionEnrollmentSync.handleOnline();
      setSyncState(prev => ({
        ...prev,
        syncInProgress: false,
        lastSync: Date.now()
      }));
    } catch (error) {
      logger.error('Error forcing sync with server:', error);
      setSyncState(prev => ({ ...prev, syncInProgress: false }));
    }
  }, [user]);

  // Initialize sync for user
  useEffect(() => {
    if (user) {
      crossSessionEnrollmentSync.initializeForUser(user.id);
      logger.info(`🔄 Cross-session sync initialized for user: ${user.id}`);
    }
  }, [user]);

  // Subscribe to enrollment updates
  useEffect(() => {
    const unsubscribe = crossSessionEnrollmentSync.subscribeToUpdates((data) => {
      // Update state if this is for the current user and course
      if (user && data.userId === user.id) {
        if (!courseId || data.courseId === courseId) {
          setEnrollmentStatus({
            status: data.status,
            paymentStatus: data.paymentStatus,
            lastUpdated: data.timestamp
          });

          logger.info(`🔄 Received cross-session update: ${data.courseId} -> ${data.status} (source: ${data.source})`);
        }
      }
    });

    return unsubscribe;
  }, [user, courseId]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setSyncState(prev => ({ ...prev, isOnline: true }));
      crossSessionEnrollmentSync.handleOnline();
    };

    const handleOffline = () => {
      setSyncState(prev => ({ ...prev, isOnline: false }));
      crossSessionEnrollmentSync.handleOffline();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load initial enrollment status for specific course
  useEffect(() => {
    if (user && courseId) {
      const status = getEnrollmentStatus(courseId);
      if (status) {
        setEnrollmentStatus({
          status: status.status,
          paymentStatus: status.paymentStatus,
          lastUpdated: status.timestamp
        });
      }
    }
  }, [user, courseId, getEnrollmentStatus]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Cleanup is handled by the service singleton
    };
  }, []);

  return {
    // Current enrollment status
    enrollmentStatus,
    
    // Sync state
    syncState,
    
    // Actions
    syncEnrollmentStatus,
    getEnrollmentStatus,
    forceSyncWithServer,
    
    // Utilities
    isOnline: syncState.isOnline,
    isSyncing: syncState.syncInProgress,
    lastSync: syncState.lastSync
  };
};

/**
 * Hook specifically for monitoring enrollment status across sessions
 * Simplified version that only provides status updates
 */
export const useEnrollmentStatusSync = (courseId: string) => {
  const { user } = useAuth();
  const [status, setStatus] = useState<{
    isEnrolled: boolean;
    enrollmentStatus: 'pending' | 'approved' | 'rejected' | null;
    paymentStatus?: 'pending' | 'processing' | 'completed' | 'failed';
    lastUpdated?: number;
  }>({
    isEnrolled: false,
    enrollmentStatus: null
  });

  useEffect(() => {
    if (!user || !courseId) return;

    // Check initial status
    const initialStatus = crossSessionEnrollmentSync.getEnrollmentStatus(user.id, courseId);
    if (initialStatus) {
      setStatus({
        isEnrolled: initialStatus.status === 'approved',
        enrollmentStatus: initialStatus.status,
        paymentStatus: initialStatus.paymentStatus,
        lastUpdated: initialStatus.timestamp
      });
    }

    // Subscribe to updates
    const unsubscribe = crossSessionEnrollmentSync.subscribeToUpdates((data) => {
      if (data.userId === user.id && data.courseId === courseId) {
        setStatus({
          isEnrolled: data.status === 'approved',
          enrollmentStatus: data.status,
          paymentStatus: data.paymentStatus,
          lastUpdated: data.timestamp
        });

        logger.info(`📊 Enrollment status updated: ${courseId} -> enrolled: ${data.status === 'approved'}`);
      }
    });

    return unsubscribe;
  }, [user, courseId]);

  return status;
};

/**
 * Hook for managing multiple course enrollments across sessions
 */
export const useMultiCourseEnrollmentSync = (courseIds: string[]) => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Record<string, {
    isEnrolled: boolean;
    status: 'pending' | 'approved' | 'rejected' | null;
    paymentStatus?: 'pending' | 'processing' | 'completed' | 'failed';
    lastUpdated?: number;
  }>>({});

  useEffect(() => {
    if (!user || courseIds.length === 0) return;

    // Load initial statuses
    const initialEnrollments: typeof enrollments = {};
    courseIds.forEach(courseId => {
      const status = crossSessionEnrollmentSync.getEnrollmentStatus(user.id, courseId);
      initialEnrollments[courseId] = {
        isEnrolled: status?.status === 'approved' || false,
        status: status?.status || null,
        paymentStatus: status?.paymentStatus,
        lastUpdated: status?.timestamp
      };
    });
    setEnrollments(initialEnrollments);

    // Subscribe to updates
    const unsubscribe = crossSessionEnrollmentSync.subscribeToUpdates((data) => {
      if (data.userId === user.id && courseIds.includes(data.courseId)) {
        setEnrollments(prev => ({
          ...prev,
          [data.courseId]: {
            isEnrolled: data.status === 'approved',
            status: data.status,
            paymentStatus: data.paymentStatus,
            lastUpdated: data.timestamp
          }
        }));

        logger.info(`📊 Multi-course enrollment updated: ${data.courseId} -> ${data.status}`);
      }
    });

    return unsubscribe;
  }, [user, courseIds]);

  return enrollments;
};