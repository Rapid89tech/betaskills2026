/**
 * Cross-Session Sync Hook
 * 
 * Provides React hook interface for cross-session enrollment synchronization.
 * Ensures enrollment changes appear instantly across all admin sessions.
 * 
 * Requirements: 1.1, 1.2, 2.1, 2.2, 7.3
 */

import { useEffect, useCallback, useRef, useState } from 'react';
import { 
  crossSessionEnrollmentSync, 
  CrossSessionEnrollmentUpdate,
  SyncStats,
  SyncSession
} from '@/services/CrossSessionEnrollmentSync';
import { logger } from '@/utils/logger';

export interface UseCrossSessionSyncOptions {
  onEnrollmentUpdate?: (update: CrossSessionEnrollmentUpdate) => void;
  onCardPaymentApproved?: (update: CrossSessionEnrollmentUpdate) => void;
  onEFTPaymentSubmitted?: (update: CrossSessionEnrollmentUpdate) => void;
  onEnrollmentApproved?: (update: CrossSessionEnrollmentUpdate) => void;
  onEnrollmentRejected?: (update: CrossSessionEnrollmentUpdate) => void;
  onProfileUpdated?: (data: any) => void;
  onConnectionFailed?: (error: any) => void;
  enableAutoRefresh?: boolean;
  autoRefreshInterval?: number;
}

export interface CrossSessionSyncState {
  isConnected: boolean;
  isHealthy: boolean;
  lastUpdate: Date | null;
  updateCount: number;
  activeSessions: number;
  syncLatency: number;
  errors: string[];
  stats: SyncStats | null;
}

/**
 * Hook for cross-session enrollment synchronization
 */
export function useCrossSessionSync(options: UseCrossSessionSyncOptions = {}) {
  const {
    onEnrollmentUpdate,
    onCardPaymentApproved,
    onEFTPaymentSubmitted,
    onEnrollmentApproved,
    onEnrollmentRejected,
    onProfileUpdated,
    onConnectionFailed,
    enableAutoRefresh = true,
    autoRefreshInterval = 30000
  } = options;

  const [syncState, setSyncState] = useState<CrossSessionSyncState>({
    isConnected: false,
    isHealthy: false,
    lastUpdate: null,
    updateCount: 0,
    activeSessions: 0,
    syncLatency: 0,
    errors: [],
    stats: null
  });

  const unsubscribersRef = useRef<(() => void)[]>([]);
  const autoRefreshRef = useRef<NodeJS.Timeout>();
  const updateCountRef = useRef(0);

  /**
   * Initialize cross-session sync
   */
  useEffect(() => {
    logger.info('🔄 useCrossSessionSync: Initializing cross-session sync');

    // Subscribe to enrollment updates
    if (onEnrollmentUpdate) {
      const unsubscribe = crossSessionEnrollmentSync.subscribe('enrollment-update', (update: CrossSessionEnrollmentUpdate) => {
        logger.debug('📥 Enrollment update received in hook:', update);
        updateCountRef.current++;
        setSyncState(prev => ({
          ...prev,
          lastUpdate: new Date(),
          updateCount: updateCountRef.current
        }));
        onEnrollmentUpdate(update);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    // Subscribe to card payment approvals
    if (onCardPaymentApproved) {
      const unsubscribe = crossSessionEnrollmentSync.subscribe('card-payment-approved', (update: CrossSessionEnrollmentUpdate) => {
        logger.debug('💳 Card payment approval received in hook:', update);
        updateCountRef.current++;
        setSyncState(prev => ({
          ...prev,
          lastUpdate: new Date(),
          updateCount: updateCountRef.current
        }));
        onCardPaymentApproved(update);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    // Subscribe to EFT payment submissions
    if (onEFTPaymentSubmitted) {
      const unsubscribe = crossSessionEnrollmentSync.subscribe('eft-payment-submitted', (update: CrossSessionEnrollmentUpdate) => {
        logger.debug('🏦 EFT payment submission received in hook:', update);
        updateCountRef.current++;
        setSyncState(prev => ({
          ...prev,
          lastUpdate: new Date(),
          updateCount: updateCountRef.current
        }));
        onEFTPaymentSubmitted(update);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    // Subscribe to enrollment approvals
    if (onEnrollmentApproved) {
      const unsubscribe = crossSessionEnrollmentSync.subscribe('enrollment_approved', (update: CrossSessionEnrollmentUpdate) => {
        logger.debug('✅ Enrollment approval received in hook:', update);
        updateCountRef.current++;
        setSyncState(prev => ({
          ...prev,
          lastUpdate: new Date(),
          updateCount: updateCountRef.current
        }));
        onEnrollmentApproved(update);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    // Subscribe to enrollment rejections
    if (onEnrollmentRejected) {
      const unsubscribe = crossSessionEnrollmentSync.subscribe('enrollment_rejected', (update: CrossSessionEnrollmentUpdate) => {
        logger.debug('❌ Enrollment rejection received in hook:', update);
        updateCountRef.current++;
        setSyncState(prev => ({
          ...prev,
          lastUpdate: new Date(),
          updateCount: updateCountRef.current
        }));
        onEnrollmentRejected(update);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    // Subscribe to profile updates
    if (onProfileUpdated) {
      const unsubscribe = crossSessionEnrollmentSync.subscribe('profile-updated', (data: any) => {
        logger.debug('👤 Profile update received in hook:', data);
        onProfileUpdated(data);
      });
      unsubscribersRef.current.push(unsubscribe);
    }

    // Subscribe to connection events
    const unsubscribeConnected = crossSessionEnrollmentSync.subscribe('connected', () => {
      logger.info('✅ Cross-session sync connected');
      setSyncState(prev => ({
        ...prev,
        isConnected: true,
        isHealthy: true
      }));
    });
    unsubscribersRef.current.push(unsubscribeConnected);

    // Subscribe to connection failures
    const unsubscribeConnectionFailed = crossSessionEnrollmentSync.subscribe('connection_failed', (error: any) => {
      logger.error('❌ Cross-session sync connection failed:', error);
      setSyncState(prev => ({
        ...prev,
        isConnected: false,
        isHealthy: false,
        errors: [...prev.errors, `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`]
      }));
      
      if (onConnectionFailed) {
        onConnectionFailed(error);
      }
    });
    unsubscribersRef.current.push(unsubscribeConnectionFailed);

    // Setup auto-refresh if enabled
    if (enableAutoRefresh) {
      autoRefreshRef.current = setInterval(() => {
        logger.debug('🔄 Auto-refresh triggered');
        updateSyncStats();
        
        // Trigger a general refresh event
        window.dispatchEvent(new CustomEvent('cross-session-auto-refresh', {
          detail: { timestamp: new Date() }
        }));
      }, autoRefreshInterval);
    }

    // Initial stats update
    updateSyncStats();

    return () => {
      // Cleanup subscriptions
      unsubscribersRef.current.forEach(unsubscribe => unsubscribe());
      unsubscribersRef.current = [];

      // Cleanup auto-refresh
      if (autoRefreshRef.current) {
        clearInterval(autoRefreshRef.current);
      }

      logger.info('🧹 useCrossSessionSync: Cleaned up');
    };
  }, [
    onEnrollmentUpdate,
    onCardPaymentApproved,
    onEFTPaymentSubmitted,
    onEnrollmentApproved,
    onEnrollmentRejected,
    onProfileUpdated,
    onConnectionFailed,
    enableAutoRefresh,
    autoRefreshInterval
  ]);

  /**
   * Update sync statistics
   */
  const updateSyncStats = useCallback(() => {
    try {
      const stats = crossSessionEnrollmentSync.getSyncStats();
      const isHealthy = crossSessionEnrollmentSync.isSyncHealthy();
      
      setSyncState(prev => ({
        ...prev,
        stats,
        isHealthy,
        activeSessions: stats.activeSessions,
        syncLatency: stats.syncLatency
      }));
    } catch (error) {
      logger.error('❌ Failed to update sync stats:', error);
    }
  }, []);

  /**
   * Force sync enrollment status across all sessions
   */
  const forceSyncEnrollmentStatus = useCallback(async (
    enrollmentId: string,
    status: 'approved' | 'rejected' | 'pending',
    adminId?: string
  ) => {
    try {
      await crossSessionEnrollmentSync.forceSyncEnrollmentStatus(enrollmentId, status, adminId);
      logger.info('🔄 Enrollment status synced across sessions');
      updateSyncStats();
    } catch (error) {
      logger.error('❌ Failed to sync enrollment status:', error);
      setSyncState(prev => ({
        ...prev,
        errors: [...prev.errors, `Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`]
      }));
      throw error;
    }
  }, [updateSyncStats]);

  /**
   * Get active sessions
   */
  const getActiveSessions = useCallback((): SyncSession[] => {
    return crossSessionEnrollmentSync.getActiveSessions();
  }, []);

  /**
   * Clear sync errors
   */
  const clearErrors = useCallback(() => {
    setSyncState(prev => ({
      ...prev,
      errors: []
    }));
  }, []);

  /**
   * Force refresh all data
   */
  const forceRefresh = useCallback(() => {
    window.dispatchEvent(new CustomEvent('cross-session-force-refresh', {
      detail: { timestamp: new Date(), source: 'manual' }
    }));
    updateSyncStats();
  }, [updateSyncStats]);

  /**
   * Reconnect sync if disconnected
   */
  const reconnect = useCallback(() => {
    logger.info('🔄 Manually reconnecting cross-session sync');
    // The service will handle reconnection automatically
    updateSyncStats();
  }, [updateSyncStats]);

  return {
    // State
    isConnected: syncState.isConnected,
    isHealthy: syncState.isHealthy,
    lastUpdate: syncState.lastUpdate,
    updateCount: syncState.updateCount,
    activeSessions: syncState.activeSessions,
    syncLatency: syncState.syncLatency,
    errors: syncState.errors,
    stats: syncState.stats,
    
    // Actions
    forceSyncEnrollmentStatus,
    forceRefresh,
    clearErrors,
    reconnect,
    
    // Utilities
    getActiveSessions,
    updateSyncStats
  };
}

/**
 * Hook for simplified enrollment update listening
 */
export function useEnrollmentUpdates(callback: (update: CrossSessionEnrollmentUpdate) => void) {
  return useCrossSessionSync({
    onEnrollmentUpdate: callback
  });
}

/**
 * Hook for card payment monitoring across sessions
 */
export function useCardPaymentMonitoring(callback: (update: CrossSessionEnrollmentUpdate) => void) {
  return useCrossSessionSync({
    onCardPaymentApproved: callback
  });
}

/**
 * Hook for EFT payment monitoring across sessions
 */
export function useEFTPaymentMonitoring(callback: (update: CrossSessionEnrollmentUpdate) => void) {
  return useCrossSessionSync({
    onEFTPaymentSubmitted: callback
  });
}

/**
 * Hook for admin action monitoring across sessions
 */
export function useAdminActionMonitoring(
  onApproved: (update: CrossSessionEnrollmentUpdate) => void,
  onRejected: (update: CrossSessionEnrollmentUpdate) => void
) {
  return useCrossSessionSync({
    onEnrollmentApproved: onApproved,
    onEnrollmentRejected: onRejected
  });
}

/**
 * Hook for sync health monitoring
 */
export function useSyncHealthMonitoring() {
  const { isConnected, isHealthy, stats, errors, reconnect } = useCrossSessionSync();
  
  return {
    isConnected,
    isHealthy,
    stats,
    errors,
    reconnect,
    hasErrors: errors.length > 0
  };
}