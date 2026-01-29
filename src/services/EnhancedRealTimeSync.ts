/**
 * 🚀 ENHANCED REAL-TIME SYNC SERVICE
 * Provides immediate status broadcasting, optimistic UI updates, and cross-tab synchronization
 * for card payment success and enrollment status changes
 * 
 * Updated for production compatibility with monitoring integration and performance tracking.
 */

import { logger } from '@/utils/logger';
import { EnrollmentData } from '@/utils/enrollmentPersistence';
import { productionConfigurationEnforcer } from './ProductionConfigurationEnforcer';

export interface ImmediateApprovalUpdate {
  enrollmentId: string;
  userId: string;
  courseId: string;
  approvalType: 'card_payment_automatic' | 'admin_approval' | 'system_automatic';
  timestamp: Date;
  paymentReference?: string;
  accessGranted: boolean;
  source: 'webhook_card_payment' | 'admin_approval' | 'system_automatic';
}

export interface CourseAccessUpdate {
  userId: string;
  courseId: string;
  accessLevel: 'granted' | 'revoked';
  grantedAt: Date;
  source: 'card_payment' | 'admin_approval' | 'manual';
  enrollmentId?: string;
}

export interface UIUpdateInstruction {
  component: UIComponent;
  action: UIAction;
  data: any;
  priority: UpdatePriority;
  timeout: number;
  courseId: string;
  userId: string;
}

export interface OptimisticUpdate {
  id: string;
  courseId: string;
  userId: string;
  expectedStatus: 'approved' | 'pending' | 'rejected';
  timestamp: Date;
  source: string;
  rollbackData?: any;
  confirmed: boolean;
}

export enum UIComponent {
  COURSE_CARD = 'course_card',
  COURSE_GRID = 'course_grid',
  ENROLLMENT_BUTTON = 'enrollment_button',
  PROGRESS_BAR = 'progress_bar',
  NAVIGATION = 'navigation',
  DASHBOARD = 'dashboard',
  PAYMENT_SUCCESS = 'payment_success'
}

export enum UIAction {
  UPDATE_STATUS = 'update_status',
  CHANGE_BUTTON_TEXT = 'change_button_text',
  ENABLE_ACCESS = 'enable_access',
  SHOW_SUCCESS = 'show_success',
  REFRESH_DATA = 'refresh_data',
  ANIMATE_CHANGE = 'animate_change',
  SHOW_CONTINUE_BUTTON = 'show_continue_button'
}

export enum UpdatePriority {
  IMMEDIATE = 'immediate',
  HIGH = 'high',
  NORMAL = 'normal',
  LOW = 'low'
}

export interface BroadcastOptions {
  channels: BroadcastChannel[];
  priority: BroadcastPriority;
  retryAttempts: number;
  timeout: number;
  requireAcknowledgment: boolean;
}

export enum BroadcastChannel {
  LOCAL_STORAGE = 'localStorage',
  BROADCAST_CHANNEL = 'broadcastChannel',
  CUSTOM_EVENT = 'customEvent',
  STORAGE_EVENT = 'storageEvent'
}

export enum BroadcastPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  NORMAL = 'normal',
  LOW = 'low'
}

export interface UIUpdateResult {
  success: boolean;
  updatedComponents: UIComponent[];
  failedComponents: UIComponent[];
  totalUpdateTime: number;
  errors: string[];
}

export interface TabUpdate {
  tabId: string;
  component: UIComponent;
  action: UIAction;
  data: any;
  timestamp: Date;
}

export interface CrossTabSyncResult {
  success: boolean;
  syncedTabs: number;
  failedTabs: number;
  totalSyncTime: number;
  errors: string[];
}

/**
 * Enhanced Real-Time Sync Service for immediate UI updates
 */
export class EnhancedRealTimeSync {
  private static instance: EnhancedRealTimeSync;
  private optimisticUpdates: Map<string, OptimisticUpdate> = new Map();
  private broadcastChannel?: BroadcastChannel;
  private tabId: string;
  private updateQueue: UIUpdateInstruction[] = [];
  private isProcessingQueue = false;

  constructor() {
    this.tabId = `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Initialize production monitoring if in production
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    if (isProduction) {
      this.initializeProductionMonitoring();
    }
    
    this.initializeBroadcastChannel();
    this.setupStorageListener();
    this.startQueueProcessor();
  }

  /**
   * Initialize production monitoring integration
   */
  private initializeProductionMonitoring(): void {
    try {
      // Ensure production configuration is enforced
      if (!productionConfigurationEnforcer.isProductionEnforced()) {
        const enforcementResult = productionConfigurationEnforcer.enforceProductionSettings();
        if (!enforcementResult.success) {
          logger.error('Failed to enforce production configuration for real-time sync:', enforcementResult.errors);
        }
      }

      // Get monitoring configuration
      const monitoringConfig = productionConfigurationEnforcer.getMonitoringConfiguration();
      if (monitoringConfig?.performance_monitoring.enabled) {
        logger.info('Production performance monitoring enabled for real-time sync');
        
        // Set up performance tracking flags
        (window as any).__REALTIME_SYNC_MONITORING__ = true;
        (window as any).__REALTIME_SYNC_METRICS__ = {
          broadcastCount: 0,
          optimisticUpdateCount: 0,
          crossTabSyncCount: 0,
          averageProcessingTime: 0
        };
      }

      if (monitoringConfig?.business_monitoring.enabled) {
        logger.info('Production business monitoring enabled for enrollment tracking');
        (window as any).__ENROLLMENT_TRACKING_ENABLED__ = true;
      }

      logger.info('Production monitoring initialized for EnhancedRealTimeSync');
    } catch (error) {
      logger.error('Failed to initialize production monitoring:', error);
    }
  }

  static getInstance(): EnhancedRealTimeSync {
    if (!EnhancedRealTimeSync.instance) {
      EnhancedRealTimeSync.instance = new EnhancedRealTimeSync();
    }
    return EnhancedRealTimeSync.instance;
  }

  /**
   * Initialize broadcast channel for cross-tab communication
   */
  private initializeBroadcastChannel(): void {
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        this.broadcastChannel = new BroadcastChannel('enrollment-updates');
        this.broadcastChannel.addEventListener('message', this.handleBroadcastMessage.bind(this));
        logger.info('BroadcastChannel initialized for cross-tab sync');
      }
    } catch (error) {
      logger.warn('BroadcastChannel not available, falling back to storage events:', error);
    }
  }

  /**
   * Setup storage event listener for cross-tab sync fallback
   */
  private setupStorageListener(): void {
    window.addEventListener('storage', (event) => {
      if (event.key?.startsWith('enrollment-update-')) {
        this.handleStorageUpdate(event);
      }
    });
  }

  /**
   * Start the update queue processor
   */
  private startQueueProcessor(): void {
    setInterval(() => {
      if (!this.isProcessingQueue && this.updateQueue.length > 0) {
        this.processUpdateQueue();
      }
    }, 50); // Process every 50ms for responsive updates
  }

  /**
   * Broadcast immediate approval update across all tabs and components
   */
  async broadcastImmediateApproval(update: ImmediateApprovalUpdate): Promise<void> {
    const startTime = Date.now();
    logger.info('Broadcasting immediate approval update', {
      enrollmentId: update.enrollmentId,
      courseId: update.courseId,
      approvalType: update.approvalType
    });

    // Track production metrics if enabled
    this.trackProductionMetric('broadcast_immediate_approval', startTime);

    try {
      // 1. Create UI update instructions
      const uiUpdates: UIUpdateInstruction[] = [
        {
          component: UIComponent.COURSE_CARD,
          action: UIAction.UPDATE_STATUS,
          data: { status: 'approved', enrollmentId: update.enrollmentId },
          priority: UpdatePriority.IMMEDIATE,
          timeout: 2000,
          courseId: update.courseId,
          userId: update.userId
        },
        {
          component: UIComponent.ENROLLMENT_BUTTON,
          action: UIAction.SHOW_CONTINUE_BUTTON,
          data: { courseId: update.courseId, accessGranted: update.accessGranted },
          priority: UpdatePriority.IMMEDIATE,
          timeout: 2000,
          courseId: update.courseId,
          userId: update.userId
        },
        {
          component: UIComponent.COURSE_GRID,
          action: UIAction.REFRESH_DATA,
          data: { courseId: update.courseId },
          priority: UpdatePriority.HIGH,
          timeout: 3000,
          courseId: update.courseId,
          userId: update.userId
        }
      ];

      // 2. Queue UI updates for processing
      this.queueUIUpdates(uiUpdates);

      // 3. Broadcast across tabs
      await this.broadcastToAllTabs({
        type: 'immediate-approval',
        data: update,
        timestamp: new Date().toISOString(),
        tabId: this.tabId
      });

      // 4. Dispatch local events
      this.dispatchLocalEvents(update);

      const processingTime = Date.now() - startTime;
      logger.info(`Immediate approval broadcast completed in ${processingTime}ms`);

      // Update production metrics
      this.updateProductionMetrics('broadcastCount', processingTime);

    } catch (error) {
      logger.error('Failed to broadcast immediate approval:', error);
      
      // Track production error if monitoring enabled
      this.trackProductionError('broadcast_immediate_approval_failed', error);
      
      // Don't throw error to allow graceful degradation
      // throw error;
    }
  }

  /**
   * Broadcast course access granted update
   */
  async broadcastCourseAccessGranted(update: CourseAccessUpdate): Promise<void> {
    logger.info('Broadcasting course access granted', {
      courseId: update.courseId,
      userId: update.userId,
      accessLevel: update.accessLevel
    });

    try {
      // Create UI update instructions for access granted
      const uiUpdates: UIUpdateInstruction[] = [
        {
          component: UIComponent.COURSE_CARD,
          action: UIAction.ENABLE_ACCESS,
          data: { courseId: update.courseId, accessLevel: update.accessLevel },
          priority: UpdatePriority.IMMEDIATE,
          timeout: 2000,
          courseId: update.courseId,
          userId: update.userId
        },
        {
          component: UIComponent.NAVIGATION,
          action: UIAction.REFRESH_DATA,
          data: { courseId: update.courseId },
          priority: UpdatePriority.NORMAL,
          timeout: 5000,
          courseId: update.courseId,
          userId: update.userId
        }
      ];

      this.queueUIUpdates(uiUpdates);

      // Broadcast to all tabs
      await this.broadcastToAllTabs({
        type: 'course-access-granted',
        data: update,
        timestamp: new Date().toISOString(),
        tabId: this.tabId
      });

      // Dispatch local events
      window.dispatchEvent(new CustomEvent('course-access-granted', {
        detail: update
      }));

    } catch (error) {
      logger.error('Failed to broadcast course access granted:', error);
      throw error;
    }
  }

  /**
   * Apply optimistic UI update for card payment success
   */
  async applyOptimisticUpdate(
    courseId: string,
    userId: string,
    expectedStatus: 'approved' | 'pending' | 'rejected',
    source: string = 'card_payment'
  ): Promise<string> {
    const updateId = `optimistic_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    logger.info('Applying optimistic update', {
      updateId,
      courseId,
      expectedStatus,
      source
    });

    try {
      // Store current state for rollback
      const rollbackData = this.captureCurrentState(courseId, userId);

      // Create optimistic update record
      const optimisticUpdate: OptimisticUpdate = {
        id: updateId,
        courseId,
        userId,
        expectedStatus,
        timestamp: new Date(),
        source,
        rollbackData,
        confirmed: false
      };

      this.optimisticUpdates.set(updateId, optimisticUpdate);

      // Apply optimistic UI changes
      const uiUpdates: UIUpdateInstruction[] = [
        {
          component: UIComponent.COURSE_CARD,
          action: UIAction.UPDATE_STATUS,
          data: { 
            status: expectedStatus, 
            optimistic: true,
            updateId 
          },
          priority: UpdatePriority.IMMEDIATE,
          timeout: 1000,
          courseId,
          userId
        },
        {
          component: UIComponent.ENROLLMENT_BUTTON,
          action: expectedStatus === 'approved' ? UIAction.SHOW_CONTINUE_BUTTON : UIAction.CHANGE_BUTTON_TEXT,
          data: { 
            courseId, 
            optimistic: true,
            updateId,
            text: expectedStatus === 'approved' ? 'Continue Course' : 'Processing...'
          },
          priority: UpdatePriority.IMMEDIATE,
          timeout: 1000,
          courseId,
          userId
        }
      ];

      this.queueUIUpdates(uiUpdates);

      // Set timeout for automatic rollback if not confirmed
      setTimeout(() => {
        if (!optimisticUpdate.confirmed) {
          this.rollbackOptimisticUpdate(updateId, 'timeout');
        }
      }, 10000); // 10 second timeout

      return updateId;

    } catch (error) {
      logger.error('Failed to apply optimistic update:', error);
      throw error;
    }
  }

  /**
   * Confirm optimistic update when actual status is received
   */
  async confirmOptimisticUpdate(
    updateId: string,
    actualStatus: 'approved' | 'pending' | 'rejected'
  ): Promise<void> {
    const optimisticUpdate = this.optimisticUpdates.get(updateId);
    
    if (!optimisticUpdate) {
      logger.warn(`Optimistic update ${updateId} not found for confirmation`);
      return;
    }

    logger.info('Confirming optimistic update', {
      updateId,
      expectedStatus: optimisticUpdate.expectedStatus,
      actualStatus
    });

    try {
      optimisticUpdate.confirmed = true;

      if (optimisticUpdate.expectedStatus === actualStatus) {
        // Optimistic update was correct, just mark as confirmed
        logger.info(`Optimistic update ${updateId} confirmed successfully`);
      } else {
        // Optimistic update was incorrect, apply correction
        logger.warn(`Optimistic update ${updateId} was incorrect, applying correction`);
        
        const correctionUpdates: UIUpdateInstruction[] = [
          {
            component: UIComponent.COURSE_CARD,
            action: UIAction.UPDATE_STATUS,
            data: { 
              status: actualStatus, 
              optimistic: false,
              correction: true 
            },
            priority: UpdatePriority.IMMEDIATE,
            timeout: 1000,
            courseId: optimisticUpdate.courseId,
            userId: optimisticUpdate.userId
          }
        ];

        this.queueUIUpdates(correctionUpdates);
      }

      // Clean up optimistic update record
      this.optimisticUpdates.delete(updateId);

    } catch (error) {
      logger.error('Failed to confirm optimistic update:', error);
      // Rollback on error
      this.rollbackOptimisticUpdate(updateId, 'confirmation_error');
    }
  }

  /**
   * Rollback optimistic update if it fails or times out
   */
  async rollbackOptimisticUpdate(updateId: string, reason: string): Promise<void> {
    const optimisticUpdate = this.optimisticUpdates.get(updateId);
    
    if (!optimisticUpdate) {
      logger.warn(`Optimistic update ${updateId} not found for rollback`);
      return;
    }

    logger.info('Rolling back optimistic update', {
      updateId,
      reason,
      courseId: optimisticUpdate.courseId
    });

    try {
      // Apply rollback UI changes
      const rollbackUpdates: UIUpdateInstruction[] = [
        {
          component: UIComponent.COURSE_CARD,
          action: UIAction.UPDATE_STATUS,
          data: { 
            ...optimisticUpdate.rollbackData,
            rollback: true,
            reason 
          },
          priority: UpdatePriority.HIGH,
          timeout: 2000,
          courseId: optimisticUpdate.courseId,
          userId: optimisticUpdate.userId
        },
        {
          component: UIComponent.ENROLLMENT_BUTTON,
          action: UIAction.CHANGE_BUTTON_TEXT,
          data: { 
            courseId: optimisticUpdate.courseId,
            text: 'Enroll Now',
            rollback: true 
          },
          priority: UpdatePriority.HIGH,
          timeout: 2000,
          courseId: optimisticUpdate.courseId,
          userId: optimisticUpdate.userId
        }
      ];

      this.queueUIUpdates(rollbackUpdates);

      // Dispatch rollback event
      window.dispatchEvent(new CustomEvent('optimistic-update-rollback', {
        detail: {
          updateId,
          reason,
          courseId: optimisticUpdate.courseId,
          userId: optimisticUpdate.userId
        }
      }));

      // Clean up optimistic update record
      this.optimisticUpdates.delete(updateId);

    } catch (error) {
      logger.error('Failed to rollback optimistic update:', error);
    }
  }

  /**
   * Synchronize enrollment status across all open tabs
   */
  async syncEnrollmentStatusAcrossTabs(
    userId: string,
    courseId: string,
    status: 'approved' | 'pending' | 'rejected'
  ): Promise<CrossTabSyncResult> {
    const startTime = Date.now();
    logger.info('Syncing enrollment status across tabs', {
      userId,
      courseId,
      status
    });

    try {
      const syncData = {
        type: 'enrollment-status-sync',
        userId,
        courseId,
        status,
        timestamp: new Date().toISOString(),
        tabId: this.tabId
      };

      // Broadcast via multiple channels for reliability
      await this.broadcastToAllTabs(syncData);

      // Also store in localStorage for tabs that might miss the broadcast
      const syncKey = `enrollment-sync-${userId}-${courseId}`;
      localStorage.setItem(syncKey, JSON.stringify({
        ...syncData,
        expires: Date.now() + 30000 // 30 seconds
      }));

      const processingTime = Date.now() - startTime;
      
      return {
        success: true,
        syncedTabs: 1, // We can't know exact count, but assume success
        failedTabs: 0,
        totalSyncTime: processingTime,
        errors: []
      };

    } catch (error) {
      logger.error('Failed to sync enrollment status across tabs:', error);
      
      return {
        success: false,
        syncedTabs: 0,
        failedTabs: 1,
        totalSyncTime: Date.now() - startTime,
        errors: [error?.message || 'Unknown error']
      };
    }
  }

  /**
   * Queue UI updates for processing
   */
  private queueUIUpdates(updates: UIUpdateInstruction[]): void {
    // Sort by priority
    const sortedUpdates = updates.sort((a, b) => {
      const priorityOrder = {
        [UpdatePriority.IMMEDIATE]: 0,
        [UpdatePriority.HIGH]: 1,
        [UpdatePriority.NORMAL]: 2,
        [UpdatePriority.LOW]: 3
      };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    this.updateQueue.push(...sortedUpdates);
    logger.debug(`Queued ${updates.length} UI updates, total queue size: ${this.updateQueue.length}`);
  }

  /**
   * Process the UI update queue
   */
  private async processUpdateQueue(): Promise<void> {
    if (this.isProcessingQueue || this.updateQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;
    const startTime = Date.now();

    try {
      const batchSize = 5; // Process in small batches for responsiveness
      const batch = this.updateQueue.splice(0, batchSize);
      
      logger.debug(`Processing UI update batch of ${batch.length} updates`);

      for (const update of batch) {
        try {
          this.executeUIUpdate(update);
        } catch (error) {
          logger.error('Failed to execute UI update:', error, update);
        }
      }

      const processingTime = Date.now() - startTime;
      logger.debug(`Processed UI update batch in ${processingTime}ms`);

    } finally {
      this.isProcessingQueue = false;
    }
  }

  /**
   * Execute a single UI update
   */
  private executeUIUpdate(update: UIUpdateInstruction): void {
    // Dispatch custom event for UI components to listen to
    const eventName = `ui-update-${update.component}`;
    const eventDetail = {
      action: update.action,
      data: update.data,
      courseId: update.courseId,
      userId: update.userId,
      priority: update.priority,
      timestamp: new Date().toISOString()
    };

    window.dispatchEvent(new CustomEvent(eventName, {
      detail: eventDetail
    }));

    // Also dispatch generic UI update event
    window.dispatchEvent(new CustomEvent('ui-update', {
      detail: {
        component: update.component,
        ...eventDetail
      }
    }));

    logger.debug(`Executed UI update for ${update.component}:${update.action}`);
  }

  /**
   * Broadcast message to all tabs
   */
  private async broadcastToAllTabs(data: any): Promise<void> {
    // Try BroadcastChannel first
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(data);
        logger.debug('Broadcasted via BroadcastChannel');
      } catch (error) {
        logger.warn('BroadcastChannel failed:', error);
      }
    }

    // Fallback to localStorage event
    try {
      const broadcastKey = `broadcast-${Date.now()}-${Math.random()}`;
      localStorage.setItem(broadcastKey, JSON.stringify(data));
      
      // Clean up broadcast key after a short delay
      setTimeout(() => {
        localStorage.removeItem(broadcastKey);
      }, 1000);
      
      logger.debug('Broadcasted via localStorage event');
    } catch (error) {
      logger.warn('localStorage broadcast failed:', error);
    }
  }

  /**
   * Handle broadcast messages from other tabs
   */
  private handleBroadcastMessage(event: MessageEvent): void {
    try {
      const { type, data, tabId } = event.data;
      
      // Ignore messages from this tab
      if (tabId === this.tabId) {
        return;
      }

      logger.debug('Received broadcast message', { type, tabId });

      switch (type) {
        case 'immediate-approval':
          this.handleRemoteImmediateApproval(data);
          break;
        case 'course-access-granted':
          this.handleRemoteCourseAccessGranted(data);
          break;
        case 'enrollment-status-sync':
          this.handleRemoteEnrollmentStatusSync(data);
          break;
      }
    } catch (error) {
      logger.error('Failed to handle broadcast message:', error);
    }
  }

  /**
   * Handle storage update events (fallback for cross-tab sync)
   */
  private handleStorageUpdate(event: StorageEvent): void {
    if (!event.newValue || !event.key?.startsWith('broadcast-')) {
      return;
    }

    try {
      const data = JSON.parse(event.newValue);
      this.handleBroadcastMessage({ data } as MessageEvent);
    } catch (error) {
      logger.error('Failed to handle storage update:', error);
    }
  }

  /**
   * Handle remote immediate approval from another tab
   */
  private handleRemoteImmediateApproval(data: ImmediateApprovalUpdate): void {
    // Create UI updates for this tab
    const uiUpdates: UIUpdateInstruction[] = [
      {
        component: UIComponent.COURSE_CARD,
        action: UIAction.UPDATE_STATUS,
        data: { status: 'approved', remote: true },
        priority: UpdatePriority.HIGH,
        timeout: 2000,
        courseId: data.courseId,
        userId: data.userId
      },
      {
        component: UIComponent.ENROLLMENT_BUTTON,
        action: UIAction.SHOW_CONTINUE_BUTTON,
        data: { courseId: data.courseId, remote: true },
        priority: UpdatePriority.HIGH,
        timeout: 2000,
        courseId: data.courseId,
        userId: data.userId
      }
    ];

    this.queueUIUpdates(uiUpdates);
    
    // Dispatch local event
    window.dispatchEvent(new CustomEvent('remote-immediate-approval', {
      detail: data
    }));
  }

  /**
   * Handle remote course access granted from another tab
   */
  private handleRemoteCourseAccessGranted(data: CourseAccessUpdate): void {
    const uiUpdates: UIUpdateInstruction[] = [
      {
        component: UIComponent.COURSE_CARD,
        action: UIAction.ENABLE_ACCESS,
        data: { courseId: data.courseId, remote: true },
        priority: UpdatePriority.HIGH,
        timeout: 2000,
        courseId: data.courseId,
        userId: data.userId
      }
    ];

    this.queueUIUpdates(uiUpdates);
  }

  /**
   * Handle remote enrollment status sync from another tab
   */
  private handleRemoteEnrollmentStatusSync(data: any): void {
    const uiUpdates: UIUpdateInstruction[] = [
      {
        component: UIComponent.COURSE_CARD,
        action: UIAction.UPDATE_STATUS,
        data: { status: data.status, remote: true },
        priority: UpdatePriority.NORMAL,
        timeout: 3000,
        courseId: data.courseId,
        userId: data.userId
      }
    ];

    this.queueUIUpdates(uiUpdates);
  }

  /**
   * Capture current state for rollback purposes
   */
  private captureCurrentState(courseId: string, userId: string): any {
    // This would capture the current UI state for rollback
    // Implementation depends on specific UI components
    return {
      courseId,
      userId,
      timestamp: new Date().toISOString(),
      // Add more state capture as needed
    };
  }

  /**
   * Dispatch local events for immediate approval
   */
  private dispatchLocalEvents(update: ImmediateApprovalUpdate): void {
    // Dispatch multiple events for different components to listen to
    const events = [
      'immediate-approval',
      'enrollment-approved',
      'course-access-granted',
      `course-${update.courseId}-approved`
    ];

    events.forEach(eventName => {
      window.dispatchEvent(new CustomEvent(eventName, {
        detail: update
      }));
    });
  }

  /**
   * Get current optimistic updates (for debugging)
   */
  getOptimisticUpdates(): OptimisticUpdate[] {
    return Array.from(this.optimisticUpdates.values());
  }

  /**
   * Track production metrics for monitoring
   */
  private trackProductionMetric(operation: string, startTime: number): void {
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    if (!isProduction || !(window as any).__REALTIME_SYNC_MONITORING__) {
      return;
    }

    try {
      const processingTime = Date.now() - startTime;
      
      // Log performance metric
      logger.info(`Production metric: ${operation}`, {
        operation,
        processingTime,
        tabId: this.tabId,
        timestamp: new Date().toISOString()
      });

      // Track in global metrics if available
      if ((window as any).__PERFORMANCE_MONITORING_ENABLED__) {
        const event = new CustomEvent('production-metric', {
          detail: {
            service: 'EnhancedRealTimeSync',
            operation,
            processingTime,
            timestamp: new Date().toISOString()
          }
        });
        window.dispatchEvent(event);
      }
    } catch (error) {
      logger.warn('Failed to track production metric:', error);
    }
  }

  /**
   * Update production metrics counters
   */
  private updateProductionMetrics(counter: string, processingTime?: number): void {
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    if (!isProduction || !(window as any).__REALTIME_SYNC_METRICS__) {
      return;
    }

    try {
      const metrics = (window as any).__REALTIME_SYNC_METRICS__;
      
      if (counter in metrics) {
        metrics[counter]++;
      }

      if (processingTime && counter === 'broadcastCount') {
        // Update average processing time
        const currentAvg = metrics.averageProcessingTime || 0;
        const count = metrics.broadcastCount || 1;
        metrics.averageProcessingTime = ((currentAvg * (count - 1)) + processingTime) / count;
      }

      // Dispatch metrics update event
      window.dispatchEvent(new CustomEvent('realtime-sync-metrics-updated', {
        detail: { ...metrics }
      }));
    } catch (error) {
      logger.warn('Failed to update production metrics:', error);
    }
  }

  /**
   * Track production errors for monitoring
   */
  private trackProductionError(operation: string, error: any): void {
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    if (!isProduction || !(window as any).__ERROR_TRACKING_ENABLED__) {
      return;
    }

    try {
      const errorDetails = {
        service: 'EnhancedRealTimeSync',
        operation,
        error: error instanceof Error ? error.message : String(error),
        tabId: this.tabId,
        timestamp: new Date().toISOString()
      };

      logger.error(`Production error: ${operation}`, errorDetails);

      // Dispatch error tracking event
      window.dispatchEvent(new CustomEvent('production-error', {
        detail: errorDetails
      }));
    } catch (trackingError) {
      logger.warn('Failed to track production error:', trackingError);
    }
  }

  /**
   * Get production metrics (for monitoring dashboard)
   */
  getProductionMetrics(): any {
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    if (!isProduction || !(window as any).__REALTIME_SYNC_METRICS__) {
      return null;
    }

    return {
      ...(window as any).__REALTIME_SYNC_METRICS__,
      optimisticUpdatesActive: this.optimisticUpdates.size,
      updateQueueSize: this.updateQueue.length,
      tabId: this.tabId
    };
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
    }
    
    this.optimisticUpdates.clear();
    this.updateQueue.length = 0;
    
    // Clean up production monitoring
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    if (isProduction) {
      delete (window as any).__REALTIME_SYNC_MONITORING__;
      delete (window as any).__REALTIME_SYNC_METRICS__;
    }
    
    logger.info('EnhancedRealTimeSync cleaned up');
  }
}

// Export singleton instance
export const enhancedRealTimeSync = EnhancedRealTimeSync.getInstance();