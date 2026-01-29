import { useState, useEffect, useCallback } from 'react';
import { courseAccessController, CourseAccessResult } from '@/services/CourseAccessController';
import { useAuth } from './AuthContext';
import { logger } from '@/utils/logger';

export interface UseCourseAccessOptions {
  courseId: string;
  autoCheck?: boolean;
  refreshInterval?: number;
}

export interface UseCourseAccessReturn {
  hasAccess: boolean;
  loading: boolean;
  error: string | null;
  accessResult: CourseAccessResult | null;
  checkAccess: () => Promise<void>;
  refreshAccess: () => Promise<void>;
}

/**
 * Hook for managing course access control
 * 
 * Provides real-time course access status based on enrollment and payment status.
 * Integrates with the CourseAccessController to determine if a user can access course content.
 * 
 * Requirements: 2.2, 3.4, 6.4
 */
export function useCourseAccess({ 
  courseId, 
  autoCheck = true, 
  refreshInterval 
}: UseCourseAccessOptions): UseCourseAccessReturn {
  const { user } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessResult, setAccessResult] = useState<CourseAccessResult | null>(null);

  const checkAccess = useCallback(async () => {
    if (!user?.id || !courseId) {
      setHasAccess(false);
      setAccessResult(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      logger.debug('Checking course access', { courseId, userId: user.id });
      
      const result = await courseAccessController.canAccessCourse(courseId, user.id);
      
      setHasAccess(result.hasAccess);
      setAccessResult(result);
      
      if (!result.hasAccess && result.reason) {
        logger.info('Course access denied', { 
          courseId, 
          userId: user.id, 
          reason: result.reason,
          enrollmentStatus: result.enrollmentStatus,
          paymentStatus: result.paymentStatus
        });
      } else if (result.hasAccess) {
        logger.info('Course access granted', { 
          courseId, 
          userId: user.id,
          enrollmentStatus: result.enrollmentStatus,
          paymentStatus: result.paymentStatus
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check course access';
      logger.error('Error checking course access', { courseId, userId: user.id, error: err });
      setError(errorMessage);
      setHasAccess(false);
      setAccessResult(null);
    } finally {
      setLoading(false);
    }
  }, [user?.id, courseId]);

  const refreshAccess = useCallback(async () => {
    // Clear cache before checking to force fresh data
    courseAccessController.clearAllCache();
    await checkAccess();
  }, [checkAccess]);

  // Auto-check access when dependencies change
  useEffect(() => {
    if (autoCheck) {
      checkAccess();
    }
  }, [checkAccess, autoCheck]);

  // Set up refresh interval if specified
  useEffect(() => {
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(() => {
        checkAccess();
      }, refreshInterval);

      return () => clearInterval(interval);
    }
  }, [checkAccess, refreshInterval]);

  // Listen for enrollment status changes
  useEffect(() => {
    const handleEnrollmentUpdate = (event: CustomEvent) => {
      const { enrollment, userId } = event.detail;
      
      // Check if this update affects the current user and course
      if (userId === user?.id && enrollment?.course_id === courseId) {
        logger.debug('Enrollment update detected, refreshing access', { 
          courseId, 
          userId, 
          enrollmentStatus: enrollment.status 
        });
        checkAccess();
      }
    };

    const handleUserEnrollmentChange = (event: CustomEvent) => {
      const { userId, enrollment } = event.detail;
      
      // Check if this update affects the current user and course
      if (userId === user?.id && enrollment?.course_id === courseId) {
        logger.debug('User enrollment change detected, refreshing access', { 
          courseId, 
          userId, 
          enrollmentStatus: enrollment.status 
        });
        checkAccess();
      }
    };

    // Listen for global enrollment events
    window.addEventListener('enrollment-updated', handleEnrollmentUpdate as EventListener);
    window.addEventListener('user-enrollment-changed', handleUserEnrollmentChange as EventListener);

    return () => {
      window.removeEventListener('enrollment-updated', handleEnrollmentUpdate as EventListener);
      window.removeEventListener('user-enrollment-changed', handleUserEnrollmentChange as EventListener);
    };
  }, [user?.id, courseId, checkAccess]);

  return {
    hasAccess,
    loading,
    error,
    accessResult,
    checkAccess,
    refreshAccess
  };
}

/**
 * Hook for managing access to multiple courses
 * 
 * Requirements: 3.4, 6.4
 */
export interface UseMultipleCourseAccessOptions {
  courseIds: string[];
  autoCheck?: boolean;
}

export interface UseMultipleCourseAccessReturn {
  courseAccess: Record<string, CourseAccessResult>;
  loading: boolean;
  error: string | null;
  checkAllAccess: () => Promise<void>;
  refreshAllAccess: () => Promise<void>;
}

export function useMultipleCourseAccess({ 
  courseIds, 
  autoCheck = true 
}: UseMultipleCourseAccessOptions): UseMultipleCourseAccessReturn {
  const { user } = useAuth();
  const [courseAccess, setCourseAccess] = useState<Record<string, CourseAccessResult>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkAllAccess = useCallback(async () => {
    if (!user?.id || courseIds.length === 0) {
      setCourseAccess({});
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      logger.debug('Checking multiple course access', { courseIds, userId: user.id });
      
      const results = await courseAccessController.getUserCourseAccess(user.id, courseIds);
      setCourseAccess(results);
      
      logger.info('Multiple course access checked', { 
        courseIds, 
        userId: user.id, 
        accessCount: Object.values(results).filter(r => r.hasAccess).length 
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check course access';
      logger.error('Error checking multiple course access', { courseIds, userId: user.id, error: err });
      setError(errorMessage);
      setCourseAccess({});
    } finally {
      setLoading(false);
    }
  }, [user?.id, courseIds]);

  const refreshAllAccess = useCallback(async () => {
    // Clear cache before checking to force fresh data
    courseAccessController.clearAllCache();
    await checkAllAccess();
  }, [checkAllAccess]);

  // Auto-check access when dependencies change
  useEffect(() => {
    if (autoCheck) {
      checkAllAccess();
    }
  }, [checkAllAccess, autoCheck]);

  return {
    courseAccess,
    loading,
    error,
    checkAllAccess,
    refreshAllAccess
  };
}

/**
 * Hook for course access with enrollment status details
 * 
 * Provides detailed enrollment and payment status information along with access control.
 * Useful for displaying appropriate UI states and messages.
 * 
 * Requirements: 6.4
 */
export interface UseCourseAccessWithStatusReturn extends UseCourseAccessReturn {
  enrollmentStatus?: string;
  paymentStatus?: string;
  accessReason?: string;
  canRetryPayment: boolean;
  isPendingApproval: boolean;
  isPaymentCompleted: boolean;
}

export function useCourseAccessWithStatus({ 
  courseId, 
  autoCheck = true, 
  refreshInterval 
}: UseCourseAccessOptions): UseCourseAccessWithStatusReturn {
  const baseAccess = useCourseAccess({ courseId, autoCheck, refreshInterval });

  const enrollmentStatus = baseAccess.accessResult?.enrollmentStatus;
  const paymentStatus = baseAccess.accessResult?.paymentStatus;
  const accessReason = baseAccess.accessResult?.reason;

  const canRetryPayment = enrollmentStatus === 'PENDING' && paymentStatus === 'FAILED';
  const isPendingApproval = enrollmentStatus === 'PENDING' && paymentStatus === 'COMPLETED';
  const isPaymentCompleted = paymentStatus === 'COMPLETED';

  return {
    ...baseAccess,
    enrollmentStatus,
    paymentStatus,
    accessReason,
    canRetryPayment,
    isPendingApproval,
    isPaymentCompleted
  };
}