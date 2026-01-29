/**
 * 🚀 ENHANCED REAL-TIME SYNC HOOK
 * React hook for integrating with the enhanced real-time sync service
 * Provides optimistic updates, cross-tab sync, and immediate UI feedback
 */

import { useEffect, useCallback, useState, useRef } from 'react';
import { useAuth } from './AuthContext';
import { 
  enhancedRealTimeSync, 
  ImmediateApprovalUpdate, 
  CourseAccessUpdate,
  UIComponent,
  UIAction,
  OptimisticUpdate
} from '@/services/EnhancedRealTimeSync';
import { logger } from '@/utils/logger';

export interface UseEnhancedRealTimeSyncOptions {
  courseId?: string;
  enableOptimisticUpdates?: boolean;
  enableCrossTabSync?: boolean;
  autoConfirmTimeout?: number;
}

export interface EnhancedRealTimeSyncState {
  isConnected: boolean;
  lastUpdate?: Date;
  optimisticUpdates: OptimisticUpdate[];
  errors: string[];
}

export interface OptimisticUpdateResult {
  updateId: string;
  confirm: (actualStatus: 'approved' | 'pending' | 'rejected') => Promise<void>;
  rollback: (reason?: string) => Promise<void>;
}

/**
 * Hook for enhanced real-time sync functionality
 */
export const useEnhancedRealTimeSync = (options: UseEnhancedRealTimeSyncOptions = {}) => {
  const { user } = useAuth();
  const [state, setState] = useState<EnhancedRealTimeSyncState>({
    isConnected: true,
    optimisticUpdates: [],
    errors: []
  });
  
  const listenersRef = useRef<(() => void)[]>([]);
  const {
    courseId,
    enableOptimisticUpdates = true,
    enableCrossTabSync = true,
    autoConfirmTimeout = 10000
  } = options;

  /**
   * Broadcast immediate approval update
   */
  const broadcastImmediateApproval = useCallback(async (
    enrollmentId: string,
    targetCourseId: string,
    approvalType: 'card_payment_automatic' | 'admin_approval' | 'system_automatic',
    paymentReference?: string
  ): Promise<void> => {
    if (!user) {
      logger.warn('Cannot broadcast immediate approval: user not authenticated');
      return;
    }

    try {
      const update: ImmediateApprovalUpdate = {
        enrollmentId,
        userId: user.id,
        courseId: targetCourseId,
        approvalType,
        timestamp: new Date(),
        paymentReference,
        accessGranted: true,
        source: approvalType === 'card_payment_automatic' ? 'webhook_card_payment' : 'admin_approval'
      };

      await enhancedRealTimeSync.broadcastImmediateApproval(update);
      
      setState(prev => ({
        ...prev,
        lastUpdate: new Date(),
        errors: []
      }));

      logger.info('Broadcasted immediate approval successfully', {
        enrollmentId,
        courseId: targetCourseId
      });

    } catch (error) {
      logger.error('Failed to broadcast immediate approval:', error);
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, error.message]
      }));
      throw error;
    }
  }, [user]);

  /**
   * Broadcast course access granted
   */
  const broadcastCourseAccessGranted = useCallback(async (
    targetCourseId: string,
    accessLevel: 'granted' | 'revoked' = 'granted',
    source: 'card_payment' | 'admin_approval' | 'manual' = 'card_payment',
    enrollmentId?: string
  ): Promise<void> => {
    if (!user) {
      logger.warn('Cannot broadcast course access: user not authenticated');
      return;
    }

    try {
      const update: CourseAccessUpdate = {
        userId: user.id,
        courseId: targetCourseId,
        accessLevel,
        grantedAt: new Date(),
        source,
        enrollmentId
      };

      await enhancedRealTimeSync.broadcastCourseAccessGranted(update);
      
      setState(prev => ({
        ...prev,
        lastUpdate: new Date(),
        errors: []
      }));

      logger.info('Broadcasted course access granted successfully', {
        courseId: targetCourseId,
        accessLevel
      });

    } catch (error) {
      logger.error('Failed to broadcast course access granted:', error);
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, error.message]
      }));
      throw error;
    }
  }, [user]);

  /**
   * Apply optimistic update for immediate UI feedback
   */
  const applyOptimisticUpdate = useCallback(async (
    targetCourseId: string,
    expectedStatus: 'approved' | 'pending' | 'rejected',
    source: string = 'card_payment'
  ): Promise<OptimisticUpdateResult> => {
    if (!user) {
      throw new Error('Cannot apply optimistic update: user not authenticated');
    }

    if (!enableOptimisticUpdates) {
      throw new Error('Optimistic updates are disabled');
    }

    try {
      const updateId = await enhancedRealTimeSync.applyOptimisticUpdate(
        targetCourseId,
        user.id,
        expectedStatus,
        source
      );

      // Update local state
      setState(prev => ({
        ...prev,
        optimisticUpdates: enhancedRealTimeSync.getOptimisticUpdates(),
        lastUpdate: new Date(),
        errors: []
      }));

      logger.info('Applied optimistic update successfully', {
        updateId,
        courseId: targetCourseId,
        expectedStatus
      });

      return {
        updateId,
        confirm: async (actualStatus: 'approved' | 'pending' | 'rejected') => {
          await enhancedRealTimeSync.confirmOptimisticUpdate(updateId, actualStatus);
          setState(prev => ({
            ...prev,
            optimisticUpdates: enhancedRealTimeSync.getOptimisticUpdates()
          }));
        },
        rollback: async (reason?: string) => {
          await enhancedRealTimeSync.rollbackOptimisticUpdate(updateId, reason || 'manual_rollback');
          setState(prev => ({
            ...prev,
            optimisticUpdates: enhancedRealTimeSync.getOptimisticUpdates()
          }));
        }
      };

    } catch (error) {
      logger.error('Failed to apply optimistic update:', error);
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, error.message]
      }));
      throw error;
    }
  }, [user, enableOptimisticUpdates]);

  /**
   * Sync enrollment status across tabs
   */
  const syncEnrollmentStatusAcrossTabs = useCallback(async (
    targetCourseId: string,
    status: 'approved' | 'pending' | 'rejected'
  ): Promise<void> => {
    if (!user) {
      logger.warn('Cannot sync enrollment status: user not authenticated');
      return;
    }

    if (!enableCrossTabSync) {
      logger.warn('Cross-tab sync is disabled');
      return;
    }

    try {
      const result = await enhancedRealTimeSync.syncEnrollmentStatusAcrossTabs(
        user.id,
        targetCourseId,
        status
      );

      setState(prev => ({
        ...prev,
        lastUpdate: new Date(),
        errors: result.errors
      }));

      logger.info('Synced enrollment status across tabs', {
        courseId: targetCourseId,
        status,
        success: result.success
      });

    } catch (error) {
      logger.error('Failed to sync enrollment status across tabs:', error);
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, error.message]
      }));
      throw error;
    }
  }, [user, enableCrossTabSync]);

  /**
   * Listen for UI updates for specific components
   */
  const listenForUIUpdates = useCallback((
    component: UIComponent,
    callback: (action: UIAction, data: any) => void
  ): (() => void) => {
    const eventName = `ui-update-${component}`;
    
    const handler = (event: CustomEvent) => {
      const { action, data } = event.detail;
      
      // Filter by courseId if specified
      if (courseId && event.detail.courseId !== courseId) {
        return;
      }
      
      // Filter by userId if user is authenticated
      if (user && event.detail.userId !== user.id) {
        return;
      }

      callback(action, data);
    };

    window.addEventListener(eventName, handler as EventListener);
    
    const cleanup = () => {
      window.removeEventListener(eventName, handler as EventListener);
    };
    
    listenersRef.current.push(cleanup);
    return cleanup;
  }, [courseId, user]);

  /**
   * Listen for immediate approval events
   */
  const listenForImmediateApproval = useCallback((
    callback: (update: ImmediateApprovalUpdate) => void
  ): (() => void) => {
    const handler = (event: CustomEvent) => {
      const update = event.detail as ImmediateApprovalUpdate;
      
      // Filter by courseId if specified
      if (courseId && update.courseId !== courseId) {
        return;
      }
      
      // Filter by userId if user is authenticated
      if (user && update.userId !== user.id) {
        return;
      }

      callback(update);
    };

    const events = ['immediate-approval', 'remote-immediate-approval'];
    events.forEach(eventName => {
      window.addEventListener(eventName, handler as EventListener);
    });
    
    const cleanup = () => {
      events.forEach(eventName => {
        window.removeEventListener(eventName, handler as EventListener);
      });
    };
    
    listenersRef.current.push(cleanup);
    return cleanup;
  }, [courseId, user]);

  /**
   * Listen for course access granted events
   */
  const listenForCourseAccessGranted = useCallback((
    callback: (update: CourseAccessUpdate) => void
  ): (() => void) => {
    const handler = (event: CustomEvent) => {
      const update = event.detail as CourseAccessUpdate;
      
      // Filter by courseId if specified
      if (courseId && update.courseId !== courseId) {
        return;
      }
      
      // Filter by userId if user is authenticated
      if (user && update.userId !== user.id) {
        return;
      }

      callback(update);
    };

    window.addEventListener('course-access-granted', handler as EventListener);
    
    const cleanup = () => {
      window.removeEventListener('course-access-granted', handler as EventListener);
    };
    
    listenersRef.current.push(cleanup);
    return cleanup;
  }, [courseId, user]);

  /**
   * Listen for optimistic update rollbacks
   */
  const listenForOptimisticRollbacks = useCallback((
    callback: (data: { updateId: string; reason: string; courseId: string }) => void
  ): (() => void) => {
    const handler = (event: CustomEvent) => {
      const data = event.detail;
      
      // Filter by courseId if specified
      if (courseId && data.courseId !== courseId) {
        return;
      }
      
      // Filter by userId if user is authenticated
      if (user && data.userId !== user.id) {
        return;
      }

      callback(data);
    };

    window.addEventListener('optimistic-update-rollback', handler as EventListener);
    
    const cleanup = () => {
      window.removeEventListener('optimistic-update-rollback', handler as EventListener);
    };
    
    listenersRef.current.push(cleanup);
    return cleanup;
  }, [courseId, user]);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setState(prev => ({
      ...prev,
      errors: []
    }));
  }, []);

  /**
   * Get current optimistic updates
   */
  const getOptimisticUpdates = useCallback(() => {
    return enhancedRealTimeSync.getOptimisticUpdates();
  }, []);

  // Cleanup listeners on unmount
  useEffect(() => {
    return () => {
      listenersRef.current.forEach(cleanup => cleanup());
      listenersRef.current = [];
    };
  }, []);

  // Update optimistic updates state periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        optimisticUpdates: enhancedRealTimeSync.getOptimisticUpdates()
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return {
    // State
    ...state,
    
    // Actions
    broadcastImmediateApproval,
    broadcastCourseAccessGranted,
    applyOptimisticUpdate,
    syncEnrollmentStatusAcrossTabs,
    
    // Listeners
    listenForUIUpdates,
    listenForImmediateApproval,
    listenForCourseAccessGranted,
    listenForOptimisticRollbacks,
    
    // Utilities
    clearErrors,
    getOptimisticUpdates
  };
};