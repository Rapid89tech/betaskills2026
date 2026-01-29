/**
 * Real-Time Enrollment Sync Hook
 * 
 * Provides React hook interface for real-time enrollment synchronization
 * across multiple admin sessions and browser tabs.
 * 
 * Requirements: 1.1, 1.2, 2.1, 2.2, 7.3
 */

import { useEffect, useCallback, useRef } from 'react';
import { realTimeEnrollmentSync, EnrollmentUpdate } from '@/services/RealTimeEnrollmentSync';
import { logger } from '@/utils/logger';

export interface UseRealTimeEnrollmentSyncOptions {
  onEnrollmentUpdate?: (update: EnrollmentUpdate) => void;
  onCardPaymentApproved?: (update: EnrollmentUpdate) => void;
  onEFTPaymentSubmitted?: (update: EnrollmentUpdate) => void;
  onAdminStatusChange?: (update: EnrollmentUpdate) => void;
  enableAutoRefresh?: boolean;
  autoRefreshInterval?: number;
}

export interface RealTimeSyncState {
  isConnected: boolean;
  lastUpdate: Date | null;
  updateCount: number;
  errors: string[];
}

/**
 * Hook for real-time enrollment synchronization
 */
export function useRealTimeEnrollmentSync(options: UseRealTimeEnrollmentSyncOptions = {}) {
  const {
    onEnrollmentUpdate,
    onCardPaymentApproved,
    onEFTPaymentSubmitted,
    onAdminStatusChange,
    enableAutoRefresh = true,
    autoRefreshInterval = 30000
  } = options;

  const syncStateRef = useRef<RealTimeSyncState>({
    isConnected: false,
    lastUpdate: null,
    updateCount: 0,
    errors: []
  });

  const unsubscribersRef = useRef<(() => void)[]>([]);
  const autoRefreshRef = useRef<NodeJS.Timeout>();

  /**
   * Initialize real-time sync
   */
  useEffect(() => {
    logger.info('🔄 useRealTimeEnrollmentSync: Initializing real-time sync');

    // Subscribe to enrollment updates
    if (onEnrollmentUpdate) {
      const unsubscribe = realTimeEnrollmentSync.subscribe('enrollment-update', (update: EnrollmentUpdate) => {
        logger.debug('📥 Enrollment update received in hook:', update);
        syncStateRef.current.lastUpdate = new Date();
        syncStateRef.current.updateCount++;
        onEnrollmentUpdate(update);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    // Subscribe to card payment approvals
    if (onCardPaymentApproved) {
      const unsubscribe = realTimeEnrollmentSync.subscribe('card-payment-approved', (update: EnrollmentUpdate) => {
        logger.debug('💳 Card payment approval received in hook:', update);
        syncStateRef.current.lastUpdate = new Date();
        syncStateRef.current.updateCount++;
        onCardPaymentApproved(update);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    // Subscribe to EFT payment submissions
    if (onEFTPaymentSubmitted) {
      const unsubscribe = realTimeEnrollmentSync.subscribe('eft-payment-submitted', (update: EnrollmentUpdate) => {
        logger.debug('🏦 EFT payment submission received in hook:', update);
        syncStateRef.current.lastUpdate = new Date();
        syncStateRef.current.updateCount++;
        onEFTPaymentSubmitted(update);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    // Subscribe to admin status changes
    if (onAdminStatusChange) {
      const unsubscribe = realTimeEnrollmentSync.subscribe('admin-status-change', (update: EnrollmentUpdate) => {
        logger.debug('👨‍💼 Admin status change received in hook:', update);
        syncStateRef.current.lastUpdate = new Date();
        syncStateRef.current.updateCount++;
        onAdminStatusChange(update);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    syncStateRef.current.isConnected = true;

    // Setup auto-refresh if enabled
    if (enableAutoRefresh) {
      autoRefreshRef.current = setInterval(() => {
        logger.debug('🔄 Auto-refresh triggered');
        // Trigger a general refresh event
        window.dispatchEvent(new CustomEvent('enrollment-auto-refresh', {
          detail: { timestamp: new Date() }
        }));
      }, autoRefreshInterval);
    }

    return () => {
      // Cleanup subscriptions
      unsubscribersRef.current.forEach(unsubscribe => unsubscribe());
      unsubscribersRef.current = [];

      // Cleanup auto-refresh
      if (autoRefreshRef.current) {
        clearInterval(autoRefreshRef.current);
      }

      syncStateRef.current.isConnected = false;
      logger.info('🧹 useRealTimeEnrollmentSync: Cleaned up');
    };
  }, [
    onEnrollmentUpdate,
    onCardPaymentApproved,
    onEFTPaymentSubmitted,
    onAdminStatusChange,
    enableAutoRefresh,
    autoRefreshInterval
  ]);

  /**
   * Broadcast card payment enrollment
   */
  const broadcastCardPayment = useCallback(async (enrollmentData: any) => {
    try {
      await realTimeEnrollmentSync.handleCardPaymentEnrollment(enrollmentData);
      logger.info('💳 Card payment enrollment broadcasted');
    } catch (error) {
      logger.error('❌ Failed to broadcast card payment:', error);
      syncStateRef.current.errors.push(`Card payment broadcast failed: ${error}`);
    }
  }, []);

  /**
   * Broadcast EFT payment enrollment
   */
  const broadcastEFTPayment = useCallback(async (enrollmentData: any) => {
    try {
      await realTimeEnrollmentSync.handleEFTPaymentEnrollment(enrollmentData);
      logger.info('🏦 EFT payment enrollment broadcasted');
    } catch (error) {
      logger.error('❌ Failed to broadcast EFT payment:', error);
      syncStateRef.current.errors.push(`EFT payment broadcast failed: ${error}`);
    }
  }, []);

  /**
   * Broadcast admin status change
   */
  const broadcastStatusChange = useCallback(async (
    enrollmentId: string,
    newStatus: 'approved' | 'rejected',
    adminId: string
  ) => {
    try {
      await realTimeEnrollmentSync.handleAdminStatusChange(enrollmentId, newStatus, adminId);
      logger.info('👨‍💼 Admin status change broadcasted');
    } catch (error) {
      logger.error('❌ Failed to broadcast status change:', error);
      syncStateRef.current.errors.push(`Status change broadcast failed: ${error}`);
    }
  }, []);

  /**
   * Sync enrollment status across sessions
   */
  const syncEnrollmentStatus = useCallback(async (
    enrollmentId: string,
    status: 'approved' | 'rejected' | 'pending'
  ) => {
    try {
      await realTimeEnrollmentSync.syncEnrollmentStatus(enrollmentId, status);
      logger.info('🔄 Enrollment status synced across sessions');
    } catch (error) {
      logger.error('❌ Failed to sync enrollment status:', error);
      syncStateRef.current.errors.push(`Status sync failed: ${error}`);
    }
  }, []);

  /**
   * Get current sync statistics
   */
  const getSyncStats = useCallback(() => {
    return {
      ...syncStateRef.current,
      serviceStats: realTimeEnrollmentSync.getSyncStats()
    };
  }, []);

  /**
   * Clear sync errors
   */
  const clearErrors = useCallback(() => {
    syncStateRef.current.errors = [];
  }, []);

  /**
   * Force refresh all enrollments
   */
  const forceRefresh = useCallback(() => {
    window.dispatchEvent(new CustomEvent('enrollment-force-refresh', {
      detail: { timestamp: new Date(), source: 'manual' }
    }));
  }, []);

  /**
   * Check if sync is healthy
   */
  const isSyncHealthy = useCallback(() => {
    const stats = getSyncStats();
    const timeSinceLastUpdate = stats.lastUpdate 
      ? Date.now() - stats.lastUpdate.getTime() 
      : Infinity;
    
    return stats.isConnected && 
           stats.errors.length === 0 && 
           timeSinceLastUpdate < 60000; // Healthy if updated within last minute
  }, [getSyncStats]);

  return {
    // State
    isConnected: syncStateRef.current.isConnected,
    lastUpdate: syncStateRef.current.lastUpdate,
    updateCount: syncStateRef.current.updateCount,
    errors: syncStateRef.current.errors,
    
    // Actions
    broadcastCardPayment,
    broadcastEFTPayment,
    broadcastStatusChange,
    syncEnrollmentStatus,
    forceRefresh,
    clearErrors,
    
    // Utilities
    getSyncStats,
    isSyncHealthy
  };
}

/**
 * Hook for simplified enrollment update listening
 */
export function useEnrollmentUpdates(callback: (update: EnrollmentUpdate) => void) {
  return useRealTimeEnrollmentSync({
    onEnrollmentUpdate: callback
  });
}

/**
 * Hook for card payment monitoring
 */
export function useCardPaymentMonitoring(callback: (update: EnrollmentUpdate) => void) {
  return useRealTimeEnrollmentSync({
    onCardPaymentApproved: callback
  });
}

/**
 * Hook for EFT payment monitoring
 */
export function useEFTPaymentMonitoring(callback: (update: EnrollmentUpdate) => void) {
  return useRealTimeEnrollmentSync({
    onEFTPaymentSubmitted: callback
  });
}

/**
 * Hook for admin action monitoring
 */
export function useAdminActionMonitoring(callback: (update: EnrollmentUpdate) => void) {
  return useRealTimeEnrollmentSync({
    onAdminStatusChange: callback
  });
}