/**
 * useEnrollmentState Hook
 * 
 * React hook for managing enrollment state with real-time updates
 * and integration with the EnrollmentStateManager service.
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import { useState, useEffect, useCallback } from 'react';
import { enrollmentStateManager, EnrollmentState, ButtonAction } from '@/services/EnrollmentStateManager';
import { EnrollmentStatus, PaymentType, PaymentStatus } from '@/types/enrollment';

// EnrollmentStatusUpdate interface for real-time updates
export interface EnrollmentStatusUpdate {
  enrollmentId: string;
  userId: string;
  courseId: string;
  status: EnrollmentStatus;
  paymentStatus?: PaymentStatus;
  timestamp: Date;
}
import { logger } from '@/utils/logger';

export interface UseEnrollmentStateOptions {
  courseId: string;
  userId?: string;
  isLoggedIn?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export interface UseEnrollmentStateReturn {
  // State
  enrollmentState: EnrollmentState;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createEnrollment: (userEmail: string, courseTitle: string, paymentType?: PaymentType) => Promise<void>;
  approveEnrollment: (enrollmentId: string, approvedBy: string, reason?: string) => Promise<void>;
  rejectEnrollment: (enrollmentId: string, reason: string, rejectedBy: string) => Promise<void>;
  updatePaymentStatus: (enrollmentId: string, paymentStatus: PaymentStatus, transactionId?: string) => Promise<void>;
  checkCourseAccess: () => Promise<boolean>;
  refreshState: () => Promise<void>;
  
  // Utilities
  canEnroll: boolean;
  hasAccess: boolean;
  requiresApproval: boolean;
  buttonText: string;
  buttonAction: ButtonAction;
  isButtonDisabled: boolean;
}

export const useEnrollmentState = (options: UseEnrollmentStateOptions): UseEnrollmentStateReturn => {
  const { courseId, userId, isLoggedIn = false, autoRefresh = true, refreshInterval = 30000 } = options;

  // State
  const [enrollmentState, setEnrollmentState] = useState<EnrollmentState>({
    status: EnrollmentStatus.PENDING,
    requiresApproval: false,
    hasAccess: false,
    canEnroll: false,
    buttonText: "Loading...",
    buttonAction: ButtonAction.SHOW_PENDING,
    isDisabled: true
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load enrollment state
  const loadEnrollmentState = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const state = await enrollmentStateManager.getEnrollmentState(courseId, userId, isLoggedIn);
      setEnrollmentState(state);

      logger.info(`✅ Loaded enrollment state for course ${courseId}:`, state);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load enrollment state';
      setError(errorMessage);
      logger.error('❌ Error loading enrollment state:', err);
    } finally {
      setIsLoading(false);
    }
  }, [courseId, userId, isLoggedIn]);

  // Create new enrollment
  const createEnrollment = useCallback(async (
    userEmail: string, 
    courseTitle: string, 
    paymentType: PaymentType = PaymentType.CARD
  ) => {
    if (!userId) {
      throw new Error('User ID is required to create enrollment');
    }

    try {
      setIsLoading(true);
      setError(null);

      await enrollmentStateManager.createPendingEnrollment(
        courseId,
        userId,
        userEmail,
        courseTitle,
        paymentType
      );

      // Refresh state after creation
      await loadEnrollmentState();

      logger.info(`✅ Created enrollment for course ${courseId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create enrollment';
      setError(errorMessage);
      logger.error('❌ Error creating enrollment:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [courseId, userId, loadEnrollmentState]);

  // Approve enrollment
  const approveEnrollment = useCallback(async (
    enrollmentId: string, 
    approvedBy: string, 
    reason?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      await enrollmentStateManager.approveEnrollment(enrollmentId, approvedBy, reason);

      // Refresh state after approval
      await loadEnrollmentState();

      logger.info(`✅ Approved enrollment ${enrollmentId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to approve enrollment';
      setError(errorMessage);
      logger.error('❌ Error approving enrollment:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [loadEnrollmentState]);

  // Reject enrollment
  const rejectEnrollment = useCallback(async (
    enrollmentId: string, 
    reason: string, 
    rejectedBy: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      await enrollmentStateManager.rejectEnrollment(enrollmentId, reason, rejectedBy);

      // Refresh state after rejection
      await loadEnrollmentState();

      logger.info(`✅ Rejected enrollment ${enrollmentId}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reject enrollment';
      setError(errorMessage);
      logger.error('❌ Error rejecting enrollment:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [loadEnrollmentState]);

  // Update payment status
  const updatePaymentStatus = useCallback(async (
    enrollmentId: string, 
    paymentStatus: PaymentStatus, 
    transactionId?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      await enrollmentStateManager.updatePaymentStatus(enrollmentId, paymentStatus, transactionId);

      // Refresh state after payment update
      await loadEnrollmentState();

      logger.info(`✅ Updated payment status for enrollment ${enrollmentId}: ${paymentStatus}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update payment status';
      setError(errorMessage);
      logger.error('❌ Error updating payment status:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [loadEnrollmentState]);

  // Check course access
  const checkCourseAccess = useCallback(async (): Promise<boolean> => {
    if (!userId) {
      return false;
    }

    try {
      return await enrollmentStateManager.canAccessCourse(courseId, userId);
    } catch (err) {
      logger.error('❌ Error checking course access:', err);
      return false;
    }
  }, [courseId, userId]);

  // Refresh state manually
  const refreshState = useCallback(async () => {
    await loadEnrollmentState();
  }, [loadEnrollmentState]);

  // Handle real-time status updates
  useEffect(() => {
    const handleStatusUpdate = (update: EnrollmentStatusUpdate) => {
      // Only update if this is for our course and user
      if (update.courseId === courseId && update.userId === userId) {
        logger.info(`📡 Received real-time update for course ${courseId}:`, update);
        loadEnrollmentState();
      }
    };

    // Subscribe to status updates
    const unsubscribe = enrollmentStateManager.subscribeToStatusUpdates(handleStatusUpdate);

    // Also listen to DOM events for backward compatibility
    const handleDOMEvent = (event: CustomEvent) => {
      const { courseId: eventCourseId, userId: eventUserId } = event.detail;
      if (eventCourseId === courseId && eventUserId === userId) {
        loadEnrollmentState();
      }
    };

    window.addEventListener('enrollment-status-updated', handleDOMEvent as EventListener);
    window.addEventListener('enrollment-created', handleDOMEvent as EventListener);
    window.addEventListener('payment-completed', handleDOMEvent as EventListener);

    return () => {
      unsubscribe();
      window.removeEventListener('enrollment-status-updated', handleDOMEvent as EventListener);
      window.removeEventListener('enrollment-created', handleDOMEvent as EventListener);
      window.removeEventListener('payment-completed', handleDOMEvent as EventListener);
    };
  }, [courseId, userId, loadEnrollmentState]);

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) {
      return;
    }

    const interval = setInterval(() => {
      loadEnrollmentState();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, loadEnrollmentState]);

  // Initial load
  useEffect(() => {
    loadEnrollmentState();
  }, [loadEnrollmentState]);

  // Handle visibility change to refresh when tab becomes active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadEnrollmentState();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [loadEnrollmentState]);

  return {
    // State
    enrollmentState,
    isLoading,
    error,
    
    // Actions
    createEnrollment,
    approveEnrollment,
    rejectEnrollment,
    updatePaymentStatus,
    checkCourseAccess,
    refreshState,
    
    // Utilities (derived from enrollmentState)
    canEnroll: enrollmentState.canEnroll,
    hasAccess: enrollmentState.hasAccess,
    requiresApproval: enrollmentState.requiresApproval,
    buttonText: enrollmentState.buttonText,
    buttonAction: enrollmentState.buttonAction,
    isButtonDisabled: enrollmentState.isDisabled
  };
};

// Convenience hooks for specific use cases

/**
 * Hook for course card components
 */
export const useCourseCardState = (courseId: string, userId?: string, isLoggedIn?: boolean) => {
  return useEnrollmentState({
    courseId,
    userId,
    isLoggedIn,
    autoRefresh: true,
    refreshInterval: 10000 // More frequent updates for course cards
  });
};

/**
 * Hook for admin dashboard components
 */
export const useAdminEnrollmentState = (courseId: string, userId: string) => {
  return useEnrollmentState({
    courseId,
    userId,
    isLoggedIn: true,
    autoRefresh: true,
    refreshInterval: 5000 // Very frequent updates for admin
  });
};

/**
 * Hook for course access checking
 */
export const useCourseAccess = (courseId: string, userId?: string) => {
  const { hasAccess, checkCourseAccess, isLoading } = useEnrollmentState({
    courseId,
    userId,
    isLoggedIn: !!userId,
    autoRefresh: true
  });

  return {
    hasAccess,
    checkAccess: checkCourseAccess,
    isLoading
  };
};