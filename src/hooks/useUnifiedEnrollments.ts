import { useState, useEffect, useCallback, useRef } from 'react';
import { unifiedEnrollmentManager, EnrollmentData } from '@/services/UnifiedEnrollmentManager';
import { EnrollmentMigrationHelpers } from '@/utils/enrollmentDataMigration';
import { logger } from '@/utils/logger';
import { useUser } from '@/hooks/useUser';

/**
 * Unified Enrollments Hook
 * 
 * This hook provides a clean interface for components to access enrollment data
 * through the UnifiedEnrollmentManager, with fallback to legacy localStorage access.
 * 
 * Features:
 * - Automatic data synchronization
 * - Real-time updates across tabs
 * - Offline support with automatic sync when online
 * - Conflict resolution
 * - Loading states and error handling
 */

interface UseUnifiedEnrollmentsOptions {
  userId?: string;
  autoSync?: boolean;
  pollInterval?: number;
}

interface UseUnifiedEnrollmentsReturn {
  enrollments: EnrollmentData[];
  loading: boolean;
  error: string | null;
  isOnline: boolean;
  lastSyncTime: Date | null;
  
  // Actions
  refreshEnrollments: () => Promise<void>;
  updateEnrollmentStatus: (enrollmentId: string, status: 'pending' | 'approved' | 'rejected') => Promise<void>;
  updateEnrollmentProgress: (courseId: string, progress: number) => Promise<void>;
  createEnrollment: (enrollmentData: Partial<EnrollmentData>) => Promise<EnrollmentData>;
  isEnrolledInCourse: (courseId: string) => boolean;
  getEnrollmentForCourse: (courseId: string) => EnrollmentData | null;
  forceSynchronization: () => Promise<void>;
  
  // Statistics (for admin components)
  getStatistics: () => Promise<any>;
}

export const useUnifiedEnrollments = (
  options: UseUnifiedEnrollmentsOptions = {}
): UseUnifiedEnrollmentsReturn => {
  const { user } = useUser();
  const { userId = user?.id, autoSync = true, pollInterval = 30000 } = options;
  
  const [enrollments, setEnrollments] = useState<EnrollmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSyncTime, setLastSyncTime] = useState<Date | null>(null);
  
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef(false);

  // Initialize the unified enrollment system
  const initializeSystem = useCallback(async () => {
    if (isInitializedRef.current) return;
    
    try {
      await EnrollmentMigrationHelpers.migrateComponentToUnifiedManager('useUnifiedEnrollments');
      isInitializedRef.current = true;
    } catch (error) {
      logger.error('Failed to initialize unified enrollment system:', error);
      setError('Failed to initialize enrollment system');
    }
  }, []);

  // 🚨 MIGRATED: Load enrollments using UnifiedEnrollmentManager exclusively
  const loadEnrollments = useCallback(async (showLoading = true) => {
    if (!userId) {
      setEnrollments([]);
      setLoading(false);
      return;
    }

    if (showLoading) {
      setLoading(true);
    }
    setError(null);

    try {
      // Use UnifiedEnrollmentManager exclusively - no fallback patterns
      const userEnrollments = await unifiedEnrollmentManager.getUserEnrollments(userId);
      
      setEnrollments(userEnrollments);
      setLastSyncTime(new Date());
      logger.info(`Loaded ${userEnrollments.length} enrollments for user ${userId} via UnifiedEnrollmentManager`);
    } catch (error) {
      logger.error('Failed to load enrollments via UnifiedEnrollmentManager:', error);
      setError('Failed to load enrollments');
      setEnrollments([]); // Clear enrollments on error
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // Refresh enrollments
  const refreshEnrollments = useCallback(async () => {
    await loadEnrollments(false);
  }, [loadEnrollments]);

  // 🚨 MIGRATED: Update enrollment status using UnifiedEnrollmentManager exclusively
  const updateEnrollmentStatus = useCallback(async (
    enrollmentId: string, 
    status: 'pending' | 'approved' | 'rejected'
  ) => {
    try {
      // Use UnifiedEnrollmentManager exclusively - no fallback patterns
      await unifiedEnrollmentManager.updateEnrollmentStatus(enrollmentId, status, user?.email);
      
      // Refresh local state
      await refreshEnrollments();
    } catch (error) {
      logger.error('Failed to update enrollment status via UnifiedEnrollmentManager:', error);
      throw error;
    }
  }, [refreshEnrollments, user?.email]);

  // 🚨 MIGRATED: Update enrollment progress using UnifiedEnrollmentManager exclusively
  const updateEnrollmentProgress = useCallback(async (courseId: string, progress: number) => {
    if (!userId) return;
    
    try {
      // Use UnifiedEnrollmentManager exclusively - no fallback patterns
      await unifiedEnrollmentManager.updateEnrollmentProgress(userId, courseId, progress);
      
      // Refresh local state
      await refreshEnrollments();
    } catch (error) {
      logger.error('Failed to update enrollment progress via UnifiedEnrollmentManager:', error);
      throw error;
    }
  }, [userId, refreshEnrollments]);

  // 🚨 MIGRATED: Create new enrollment using UnifiedEnrollmentManager exclusively
  const createEnrollment = useCallback(async (enrollmentData: Partial<EnrollmentData>) => {
    if (!userId) throw new Error('User ID is required');
    
    try {
      const newEnrollmentData = {
        ...enrollmentData,
        user_id: userId,
        user_email: user?.email
      };

      // Use UnifiedEnrollmentManager exclusively - no fallback patterns
      const newEnrollment = await unifiedEnrollmentManager.createEnrollment(newEnrollmentData);
      
      // Refresh local state
      await refreshEnrollments();
      
      return newEnrollment;
    } catch (error) {
      logger.error('Failed to create enrollment via UnifiedEnrollmentManager:', error);
      throw error;
    }
  }, [userId, user?.email, refreshEnrollments]);

  // Check if user is enrolled in a course
  const isEnrolledInCourse = useCallback((courseId: string) => {
    return enrollments.some(enrollment => 
      enrollment.course_id === courseId && enrollment.status === 'approved'
    );
  }, [enrollments]);

  // Get enrollment for a specific course
  const getEnrollmentForCourse = useCallback((courseId: string) => {
    return enrollments.find(enrollment => enrollment.course_id === courseId) || null;
  }, [enrollments]);

  // 🚨 MIGRATED: Force synchronization using UnifiedEnrollmentManager exclusively
  const forceSynchronization = useCallback(async () => {
    try {
      // Use UnifiedEnrollmentManager exclusively - no fallback patterns
      await unifiedEnrollmentManager.forceSynchronization();
      await refreshEnrollments();
    } catch (error) {
      logger.error('Failed to force synchronization via UnifiedEnrollmentManager:', error);
      throw error;
    }
  }, [refreshEnrollments]);

  // 🚨 MIGRATED: Get enrollment statistics using UnifiedEnrollmentManager exclusively
  const getStatistics = useCallback(async () => {
    try {
      // Use UnifiedEnrollmentManager exclusively - no fallback patterns
      return await unifiedEnrollmentManager.getEnrollmentStatistics();
    } catch (error) {
      logger.error('Failed to get enrollment statistics via UnifiedEnrollmentManager:', error);
      throw error;
    }
  }, []);

  // 🚨 MIGRATED: Set up UnifiedEnrollmentManager event listeners for real-time updates
  useEffect(() => {
    const handleEnrollmentCreated = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment && enrollment.user_id === userId) {
        logger.info('Received enrollment created event from UnifiedEnrollmentManager:', enrollment);
        refreshEnrollments();
      }
    };

    const handleEnrollmentUpdated = (event: CustomEvent) => {
      const { enrollment } = event.detail;
      if (enrollment && enrollment.user_id === userId) {
        logger.info('Received enrollment updated event from UnifiedEnrollmentManager:', enrollment);
        refreshEnrollments();
      }
    };

    const handleEnrollmentStatusChanged = (event: CustomEvent) => {
      const { enrollment, userEmail } = event.detail;
      if ((userEmail === user?.email) || (enrollment && enrollment.user_id === userId)) {
        logger.info('Received enrollment status change from UnifiedEnrollmentManager');
        refreshEnrollments();
      }
    };

    const handleSyncCompleted = () => {
      logger.info('UnifiedEnrollmentManager sync completed');
      refreshEnrollments();
    };

    const handleUserEnrollmentsUpdated = (event: CustomEvent) => {
      const { userId: eventUserId } = event.detail;
      if (eventUserId === userId) {
        logger.info('Received user enrollments update from UnifiedEnrollmentManager');
        refreshEnrollments();
      }
    };

    // Add UnifiedEnrollmentManager event listeners exclusively
    unifiedEnrollmentManager.addEventListener('enrollment-created', handleEnrollmentCreated);
    unifiedEnrollmentManager.addEventListener('enrollment-updated', handleEnrollmentUpdated);
    unifiedEnrollmentManager.addEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);
    unifiedEnrollmentManager.addEventListener('sync-completed', handleSyncCompleted);
    unifiedEnrollmentManager.addEventListener('user-enrollments-updated', handleUserEnrollmentsUpdated);

    return () => {
      unifiedEnrollmentManager.removeEventListener('enrollment-created', handleEnrollmentCreated);
      unifiedEnrollmentManager.removeEventListener('enrollment-updated', handleEnrollmentUpdated);
      unifiedEnrollmentManager.removeEventListener('enrollment-status-changed', handleEnrollmentStatusChanged);
      unifiedEnrollmentManager.removeEventListener('sync-completed', handleSyncCompleted);
      unifiedEnrollmentManager.removeEventListener('user-enrollments-updated', handleUserEnrollmentsUpdated);
    };
  }, [refreshEnrollments, user?.email, userId]);

  // Set up online/offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (autoSync) {
        forceSynchronization().catch(console.warn);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [autoSync, forceSynchronization]);

  // Set up polling for automatic sync
  useEffect(() => {
    if (!autoSync || !isOnline) return;

    pollIntervalRef.current = setInterval(() => {
      refreshEnrollments();
    }, pollInterval);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [autoSync, isOnline, pollInterval, refreshEnrollments]);

  // Initialize and load enrollments on mount
  useEffect(() => {
    const initialize = async () => {
      await initializeSystem();
      await loadEnrollments();
    };

    initialize();
  }, [initializeSystem, loadEnrollments]);

  return {
    enrollments,
    loading,
    error,
    isOnline,
    lastSyncTime,
    refreshEnrollments,
    updateEnrollmentStatus,
    updateEnrollmentProgress,
    createEnrollment,
    isEnrolledInCourse,
    getEnrollmentForCourse,
    forceSynchronization,
    getStatistics
  };
};

export default useUnifiedEnrollments;