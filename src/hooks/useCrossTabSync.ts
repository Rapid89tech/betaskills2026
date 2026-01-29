import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { crossTabSyncService, EnrollmentSyncMessage } from '@/services/crossTabSyncService';
import { logger } from '@/utils/logger';

export interface CrossTabSyncState {
  isOnline: boolean;
  activeTabsCount: number;
  tabId: string;
  pendingConflicts: Map<string, EnrollmentSyncMessage[]>;
  lastSyncTime: string | null;
  syncStatus: 'idle' | 'syncing' | 'error' | 'conflict';
}

export interface UseCrossTabSyncOptions {
  autoSync?: boolean;
  syncInterval?: number;
  onConflict?: (conflict: EnrollmentSyncMessage) => void;
  onSyncComplete?: () => void;
  onSyncError?: (error: Error) => void;
}

export const useCrossTabSync = (options: UseCrossTabSyncOptions = {}) => {
  const { user } = useAuth();
  const {
    autoSync = true,
    syncInterval = 30000,
    onConflict,
    onSyncComplete,
    onSyncError
  } = options;

  const [syncState, setSyncState] = useState<CrossTabSyncState>({
    isOnline: crossTabSyncService.isTabOnline(),
    activeTabsCount: crossTabSyncService.getActiveTabsCount(),
    tabId: crossTabSyncService.getTabId(),
    pendingConflicts: new Map(),
    lastSyncTime: null,
    syncStatus: 'idle'
  });

  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const listenersRef = useRef<(() => void)[]>([]);

  // Update sync state
  const updateSyncState = useCallback(() => {
    setSyncState(prev => ({
      ...prev,
      isOnline: crossTabSyncService.isTabOnline(),
      activeTabsCount: crossTabSyncService.getActiveTabsCount(),
      pendingConflicts: crossTabSyncService.getPendingConflicts(),
      lastSyncTime: new Date().toISOString()
    }));
  }, []);

  // Sync with other tabs
  const syncWithOtherTabs = useCallback(async () => {
    if (!user) return;

    try {
      setSyncState(prev => ({ ...prev, syncStatus: 'syncing' }));
      
      crossTabSyncService.syncWithOtherTabs();
      updateSyncState();
      
      if (onSyncComplete) {
        onSyncComplete();
      }
      
      logger.info('✅ Cross-tab sync completed');
    } catch (error) {
      logger.error('❌ Cross-tab sync failed:', error);
      setSyncState(prev => ({ ...prev, syncStatus: 'error' }));
      
      if (onSyncError) {
        onSyncError(error as Error);
      }
    }
  }, [user, updateSyncState, onSyncComplete, onSyncError]);

  // Broadcast enrollment change
  const broadcastEnrollmentChange = useCallback((
    type: 'enrollment_created' | 'enrollment_updated' | 'enrollment_deleted' | 'status_changed',
    courseId: string,
    enrollment?: any,
    status?: string
  ) => {
    if (!user) return;

    crossTabSyncService.broadcastEnrollmentChange(type, courseId, user.id, enrollment, status);
    updateSyncState();
    
    logger.info('📤 Broadcasted enrollment change:', type, courseId);
  }, [user, updateSyncState]);

  // Resolve manual conflict
  const resolveConflict = useCallback((
    conflictKey: string,
    resolution: 'keep_local' | 'accept_remote' | 'merge'
  ) => {
    crossTabSyncService.resolveManualConflict(conflictKey, resolution);
    updateSyncState();
    
    logger.info('🔧 Resolved conflict:', conflictKey, resolution);
  }, [updateSyncState]);

  // Handle enrollment sync messages
  const handleEnrollmentMessage = useCallback((message: EnrollmentSyncMessage) => {
    logger.info('📨 Received enrollment message:', message.type, message.data.courseId);
    
    // Update sync state
    updateSyncState();
    
    // Handle specific message types
    switch (message.type) {
      case 'enrollment_created':
      case 'enrollment_updated':
      case 'enrollment_deleted':
      case 'status_changed':
        // Dispatch custom events for components to listen to
        window.dispatchEvent(new CustomEvent('enrollment-sync-update', {
          detail: {
            type: message.type,
            courseId: message.data.courseId,
            userId: message.data.userId,
            enrollment: message.data.enrollment,
            status: message.data.status,
            fromTab: message.tabId
          }
        }));
        break;
        
      case 'conflict_resolution':
        setSyncState(prev => ({ ...prev, syncStatus: 'conflict' }));
        
        if (onConflict && message.data.conflict) {
          onConflict(message);
        }
        
        // Dispatch conflict event
        window.dispatchEvent(new CustomEvent('enrollment-conflict', {
          detail: {
            conflict: message,
            courseId: message.data.courseId,
            userId: message.data.userId
          }
        }));
        break;
    }
  }, [updateSyncState, onConflict]);

  // Setup listeners
  useEffect(() => {
    if (!user) return;

    // Listen for enrollment changes
    const unsubscribeEnrollment = crossTabSyncService.addListener('enrollment_created', handleEnrollmentMessage);
    const unsubscribeUpdate = crossTabSyncService.addListener('enrollment_updated', handleEnrollmentMessage);
    const unsubscribeDelete = crossTabSyncService.addListener('enrollment_deleted', handleEnrollmentMessage);
    const unsubscribeStatus = crossTabSyncService.addListener('status_changed', handleEnrollmentMessage);
    const unsubscribeConflict = crossTabSyncService.addListener('conflict_resolution', handleEnrollmentMessage);

    // Store unsubscribe functions
    listenersRef.current = [
      unsubscribeEnrollment,
      unsubscribeUpdate,
      unsubscribeDelete,
      unsubscribeStatus,
      unsubscribeConflict
    ];

    // Initial sync
    if (autoSync) {
      syncWithOtherTabs();
    }

    // Setup periodic sync
    if (autoSync && syncInterval > 0) {
      syncTimeoutRef.current = setInterval(syncWithOtherTabs, syncInterval);
    }

    // Listen for page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        syncWithOtherTabs();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen for online/offline events
    const handleOnline = () => {
      updateSyncState();
      syncWithOtherTabs();
    };

    const handleOffline = () => {
      updateSyncState();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial state update
    updateSyncState();

    return () => {
      // Cleanup listeners
      listenersRef.current.forEach(unsubscribe => unsubscribe());
      listenersRef.current = [];

      // Clear sync interval
      if (syncTimeoutRef.current) {
        clearInterval(syncTimeoutRef.current);
      }

      // Remove event listeners
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [user, autoSync, syncInterval, syncWithOtherTabs, handleEnrollmentMessage, updateSyncState]);

  // Handle localStorage changes (fallback for browsers without BroadcastChannel)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'enrollments' || event.key === 'enrollment-sync-state') {
        logger.info('💾 localStorage change detected, updating sync state');
        updateSyncState();
        
        // Dispatch storage change event
        window.dispatchEvent(new CustomEvent('enrollment-storage-change', {
          detail: {
            key: event.key,
            newValue: event.newValue,
            oldValue: event.oldValue
          }
        }));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [updateSyncState]);

  // Force sync function
  const forceSync = useCallback(() => {
    syncWithOtherTabs();
  }, [syncWithOtherTabs]);

  // Get conflict details
  const getConflictDetails = useCallback((conflictKey: string) => {
    const conflicts = crossTabSyncService.getPendingConflicts().get(conflictKey);
    return conflicts || [];
  }, []);

  // Clear all conflicts
  const clearAllConflicts = useCallback(() => {
    const conflicts = crossTabSyncService.getPendingConflicts();
    for (const conflictKey of conflicts.keys()) {
      crossTabSyncService.resolveManualConflict(conflictKey, 'keep_local');
    }
    updateSyncState();
  }, [updateSyncState]);

  return {
    // State
    syncState,
    
    // Actions
    broadcastEnrollmentChange,
    resolveConflict,
    forceSync,
    clearAllConflicts,
    
    // Utilities
    getConflictDetails,
    isOnline: syncState.isOnline,
    activeTabsCount: syncState.activeTabsCount,
    tabId: syncState.tabId,
    pendingConflicts: syncState.pendingConflicts,
    lastSyncTime: syncState.lastSyncTime,
    syncStatus: syncState.syncStatus
  };
};