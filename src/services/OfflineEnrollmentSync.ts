import { logger } from '@/utils/logger';
import { supabase } from '@/integrations/supabase/client';

interface OfflineEnrollmentAction {
  id: string;
  type: 'enrollment_update' | 'payment_status_update' | 'course_access_update';
  userId: string;
  courseId: string;
  data: {
    status?: 'pending' | 'approved' | 'rejected';
    paymentStatus?: 'pending' | 'processing' | 'completed' | 'failed';
    courseAccess?: boolean;
    metadata?: Record<string, any>;
  };
  timestamp: number;
  retryCount: number;
  maxRetries: number;
  priority: 'high' | 'medium' | 'low';
}

interface OfflineSyncState {
  isOnline: boolean;
  lastSync: number | null;
  queueSize: number;
  syncInProgress: boolean;
  failedActions: number;
}

/**
 * Offline Enrollment Synchronization Service
 * Handles enrollment data synchronization when the user is offline
 * Queues actions and syncs them when connection is restored
 */
export class OfflineEnrollmentSync {
  private static instance: OfflineEnrollmentSync;
  
  private isOnline: boolean = navigator.onLine;
  private syncQueue: OfflineEnrollmentAction[] = [];
  private syncInProgress: boolean = false;
  
  // Storage keys
  private readonly STORAGE_KEYS = {
    SYNC_QUEUE: 'offline_enrollment_sync_queue',
    SYNC_STATE: 'offline_enrollment_sync_state',
    LAST_SYNC: 'offline_enrollment_last_sync'
  };
  
  // Configuration
  private readonly MAX_QUEUE_SIZE = 100;
  private readonly SYNC_RETRY_DELAY = 5000; // 5 seconds
  private readonly MAX_RETRY_ATTEMPTS = 3;
  private readonly SYNC_BATCH_SIZE = 10;
  
  // Event listeners
  private syncListeners: Set<(state: OfflineSyncState) => void> = new Set();
  private retryTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.loadSyncQueue();
    this.setupEventListeners();
    this.startPeriodicSync();
  }

  static getInstance(): OfflineEnrollmentSync {
    if (!OfflineEnrollmentSync.instance) {
      OfflineEnrollmentSync.instance = new OfflineEnrollmentSync();
    }
    return OfflineEnrollmentSync.instance;
  }

  /**
   * Queue an enrollment action for offline sync
   */
  queueEnrollmentAction(
    type: 'enrollment_update' | 'payment_status_update' | 'course_access_update',
    userId: string,
    courseId: string,
    data: OfflineEnrollmentAction['data'],
    priority: 'high' | 'medium' | 'low' = 'medium'
  ): void {
    // Check queue size limit
    if (this.syncQueue.length >= this.MAX_QUEUE_SIZE) {
      this.removeOldestLowPriorityAction();
    }

    const action: OfflineEnrollmentAction = {
      id: this.generateActionId(),
      type,
      userId,
      courseId,
      data,
      timestamp: Date.now(),
      retryCount: 0,
      maxRetries: this.MAX_RETRY_ATTEMPTS,
      priority
    };

    // Add to queue (high priority items go to front)
    if (priority === 'high') {
      this.syncQueue.unshift(action);
    } else {
      this.syncQueue.push(action);
    }

    this.saveSyncQueue();
    this.notifyStateChange();

    logger.info(`📦 Queued offline action: ${type} for ${courseId} (priority: ${priority})`);

    // Try immediate sync if online
    if (this.isOnline && !this.syncInProgress) {
      this.processSyncQueue();
    }
  }

  /**
   * Process the sync queue
   */
  async processSyncQueue(): Promise<void> {
    if (this.syncInProgress || !this.isOnline || this.syncQueue.length === 0) {
      return;
    }

    this.syncInProgress = true;
    this.notifyStateChange();

    logger.info(`🔄 Processing offline sync queue: ${this.syncQueue.length} actions`);

    try {
      // Process actions in batches
      const batch = this.syncQueue.splice(0, this.SYNC_BATCH_SIZE);
      const results = await Promise.allSettled(
        batch.map(action => this.processAction(action))
      );

      // Handle results
      const failedActions: OfflineEnrollmentAction[] = [];
      
      results.forEach((result, index) => {
        const action = batch[index];
        
        if (result.status === 'rejected') {
          action.retryCount++;
          
          if (action.retryCount < action.maxRetries) {
            failedActions.push(action);
            logger.warn(`⚠️ Action failed, will retry: ${action.id} (attempt ${action.retryCount})`);
          } else {
            logger.error(`❌ Action failed permanently: ${action.id}`);
          }
        } else {
          logger.info(`✅ Action processed successfully: ${action.id}`);
        }
      });

      // Re-queue failed actions
      this.syncQueue.unshift(...failedActions);
      this.saveSyncQueue();

      // Continue processing if there are more actions
      if (this.syncQueue.length > 0) {
        setTimeout(() => this.processSyncQueue(), 1000);
      }

    } catch (error) {
      logger.error('Error processing sync queue:', error);
    } finally {
      this.syncInProgress = false;
      this.notifyStateChange();
    }
  }

  /**
   * Handle online status change
   */
  handleOnline(): void {
    if (this.isOnline) return;
    
    this.isOnline = true;
    this.notifyStateChange();
    
    logger.info('🌐 Connection restored, processing offline queue');
    
    // Process queued actions
    this.processSyncQueue();
  }

  /**
   * Handle offline status change
   */
  handleOffline(): void {
    if (!this.isOnline) return;
    
    this.isOnline = false;
    this.syncInProgress = false;
    this.notifyStateChange();
    
    logger.info('📴 Connection lost, queuing actions for offline sync');
  }

  /**
   * Get current sync state
   */
  getSyncState(): OfflineSyncState {
    return {
      isOnline: this.isOnline,
      lastSync: this.getLastSyncTime(),
      queueSize: this.syncQueue.length,
      syncInProgress: this.syncInProgress,
      failedActions: this.syncQueue.filter(action => action.retryCount > 0).length
    };
  }

  /**
   * Subscribe to sync state changes
   */
  subscribeToSyncState(callback: (state: OfflineSyncState) => void): () => void {
    this.syncListeners.add(callback);
    
    return () => {
      this.syncListeners.delete(callback);
    };
  }

  /**
   * Clear the sync queue
   */
  clearSyncQueue(): void {
    this.syncQueue = [];
    this.saveSyncQueue();
    this.notifyStateChange();
    
    logger.info('🗑️ Offline sync queue cleared');
  }

  /**
   * Get queued actions for a specific course
   */
  getQueuedActionsForCourse(courseId: string): OfflineEnrollmentAction[] {
    return this.syncQueue.filter(action => action.courseId === courseId);
  }

  /**
   * Remove queued actions for a specific course
   */
  removeQueuedActionsForCourse(courseId: string): void {
    const initialLength = this.syncQueue.length;
    this.syncQueue = this.syncQueue.filter(action => action.courseId !== courseId);
    
    if (this.syncQueue.length !== initialLength) {
      this.saveSyncQueue();
      this.notifyStateChange();
      
      logger.info(`🗑️ Removed ${initialLength - this.syncQueue.length} queued actions for course: ${courseId}`);
    }
  }

  /**
   * Force sync now (if online)
   */
  async forceSyncNow(): Promise<void> {
    if (!this.isOnline) {
      throw new Error('Cannot force sync while offline');
    }

    await this.processSyncQueue();
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
    
    this.syncListeners.clear();
    
    logger.info('🧹 Offline sync service cleaned up');
  }

  // Private methods

  private async processAction(action: OfflineEnrollmentAction): Promise<void> {
    try {
      switch (action.type) {
        case 'enrollment_update':
          await this.processEnrollmentUpdate(action);
          break;
        
        case 'payment_status_update':
          await this.processPaymentStatusUpdate(action);
          break;
        
        case 'course_access_update':
          await this.processCourseAccessUpdate(action);
          break;
        
        default:
          throw new Error(`Unknown action type: ${action.type}`);
      }
      
      // Update last sync time
      this.setLastSyncTime(Date.now());
      
    } catch (error) {
      logger.error(`Error processing action ${action.id}:`, error);
      throw error;
    }
  }

  private async processEnrollmentUpdate(action: OfflineEnrollmentAction): Promise<void> {
    const { userId, courseId, data } = action;
    
    const { error } = await supabase
      .from('enrollments')
      .update({
        status: data.status,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (error) {
      throw error;
    }

    logger.info(`✅ Enrollment updated: ${courseId} -> ${data.status}`);
  }

  private async processPaymentStatusUpdate(action: OfflineEnrollmentAction): Promise<void> {
    const { userId, courseId, data } = action;
    
    const { error } = await supabase
      .from('enrollments')
      .update({
        payment_status: data.paymentStatus,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (error) {
      throw error;
    }

    logger.info(`✅ Payment status updated: ${courseId} -> ${data.paymentStatus}`);
  }

  private async processCourseAccessUpdate(action: OfflineEnrollmentAction): Promise<void> {
    const { userId, courseId, data } = action;
    
    const { error } = await supabase
      .from('enrollments')
      .update({
        course_access_granted: data.courseAccess,
        access_granted_at: data.courseAccess ? new Date().toISOString() : null,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('course_id', courseId);

    if (error) {
      throw error;
    }

    logger.info(`✅ Course access updated: ${courseId} -> ${data.courseAccess}`);
  }

  private generateActionId(): string {
    return `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private removeOldestLowPriorityAction(): void {
    // Find and remove the oldest low priority action
    for (let i = this.syncQueue.length - 1; i >= 0; i--) {
      if (this.syncQueue[i].priority === 'low') {
        this.syncQueue.splice(i, 1);
        break;
      }
    }
  }

  private loadSyncQueue(): void {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.SYNC_QUEUE);
      this.syncQueue = data ? JSON.parse(data) : [];
      
      logger.info(`📦 Loaded offline sync queue: ${this.syncQueue.length} actions`);
    } catch (error) {
      logger.error('Error loading sync queue:', error);
      this.syncQueue = [];
    }
  }

  private saveSyncQueue(): void {
    try {
      localStorage.setItem(this.STORAGE_KEYS.SYNC_QUEUE, JSON.stringify(this.syncQueue));
    } catch (error) {
      logger.error('Error saving sync queue:', error);
    }
  }

  private getLastSyncTime(): number | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS.LAST_SYNC);
      return data ? parseInt(data) : null;
    } catch (error) {
      return null;
    }
  }

  private setLastSyncTime(timestamp: number): void {
    try {
      localStorage.setItem(this.STORAGE_KEYS.LAST_SYNC, timestamp.toString());
    } catch (error) {
      logger.error('Error saving last sync time:', error);
    }
  }

  private notifyStateChange(): void {
    const state = this.getSyncState();
    
    this.syncListeners.forEach(callback => {
      try {
        callback(state);
      } catch (error) {
        logger.error('Error in sync state listener:', error);
      }
    });
  }

  private setupEventListeners(): void {
    // Online/offline listeners
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());

    // Page visibility listener
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && this.isOnline) {
        this.processSyncQueue();
      }
    });

    // Beforeunload listener
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }

  private startPeriodicSync(): void {
    // Retry failed actions periodically
    const scheduleRetry = () => {
      this.retryTimer = setTimeout(() => {
        if (this.isOnline && this.syncQueue.length > 0 && !this.syncInProgress) {
          this.processSyncQueue();
        }
        scheduleRetry();
      }, this.SYNC_RETRY_DELAY);
    };

    scheduleRetry();
  }
}

export const offlineEnrollmentSync = OfflineEnrollmentSync.getInstance();