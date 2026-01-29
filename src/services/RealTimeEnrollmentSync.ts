/**
 * Real-Time Enrollment Synchronization Service
 * 
 * Provides WebSocket-like functionality for real-time enrollment updates
 * across multiple admin sessions and browser tabs.
 * 
 * Requirements: 1.1, 1.2, 2.1, 2.2, 7.3
 */

import { logger } from '@/utils/logger';
import { paymentTypeDetector } from './PaymentTypeDetector';

export interface EnrollmentUpdate {
  id: string;
  userId: string;
  courseId: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentType: 'card' | 'eft' | 'manual';
  timestamp: Date;
  source: 'webhook' | 'admin' | 'system';
  metadata?: any;
}

export interface RealTimeSyncOptions {
  pollInterval: number;
  enableBroadcastChannel: boolean;
  enableStorageEvents: boolean;
  enableCustomEvents: boolean;
}

export interface SyncEventData {
  type: 'enrollment_update' | 'payment_confirmation' | 'status_change';
  enrollment: EnrollmentUpdate;
  sessionId: string;
  timestamp: string;
}

/**
 * Real-Time Enrollment Synchronization Service
 */
export class RealTimeEnrollmentSync {
  private static instance: RealTimeEnrollmentSync;
  private broadcastChannel?: BroadcastChannel;
  private sessionId: string;
  private pollInterval?: NodeJS.Timeout;
  private lastSyncTimestamp: Date;
  private options: RealTimeSyncOptions;
  private listeners: Map<string, Function[]> = new Map();

  constructor(options: Partial<RealTimeSyncOptions> = {}) {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.lastSyncTimestamp = new Date();
    this.options = {
      pollInterval: 5000, // 5 seconds
      enableBroadcastChannel: true,
      enableStorageEvents: true,
      enableCustomEvents: true,
      ...options
    };

    this.initializeSyncMechanisms();
  }

  static getInstance(options?: Partial<RealTimeSyncOptions>): RealTimeEnrollmentSync {
    if (!RealTimeEnrollmentSync.instance) {
      RealTimeEnrollmentSync.instance = new RealTimeEnrollmentSync(options);
    }
    return RealTimeEnrollmentSync.instance;
  }

  /**
   * Initialize synchronization mechanisms
   */
  private initializeSyncMechanisms(): void {
    logger.info('🔄 RealTimeEnrollmentSync: Initializing sync mechanisms', {
      sessionId: this.sessionId,
      options: this.options
    });

    // Initialize BroadcastChannel for cross-tab communication
    if (this.options.enableBroadcastChannel && typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel('enrollment-sync');
        this.broadcastChannel.addEventListener('message', this.handleBroadcastMessage.bind(this));
        logger.info('✅ BroadcastChannel initialized for enrollment sync');
      } catch (error) {
        logger.warn('⚠️ BroadcastChannel initialization failed:', error);
      }
    }

    // Initialize storage event listener for cross-tab sync fallback
    if (this.options.enableStorageEvents) {
      window.addEventListener('storage', this.handleStorageEvent.bind(this));
      logger.info('✅ Storage event listener initialized');
    }

    // Start polling for enrollment updates
    this.startPolling();
  }

  /**
   * Start polling for enrollment updates
   */
  private startPolling(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }

    this.pollInterval = setInterval(() => {
      this.checkForUpdates();
    }, this.options.pollInterval);

    logger.info(`🔄 Polling started with ${this.options.pollInterval}ms interval`);
  }

  /**
   * Stop polling for enrollment updates
   */
  private stopPolling(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = undefined;
      logger.info('⏹️ Polling stopped');
    }
  }

  /**
   * Check for enrollment updates since last sync
   */
  private async checkForUpdates(): Promise<void> {
    try {
      // This would typically query the database for updates since lastSyncTimestamp
      // For now, we'll simulate checking for updates via localStorage
      const updatesKey = 'enrollment-updates';
      const storedUpdates = localStorage.getItem(updatesKey);
      
      if (storedUpdates) {
        const updates = JSON.parse(storedUpdates);
        const newUpdates = updates.filter((update: any) => 
          new Date(update.timestamp) > this.lastSyncTimestamp
        );

        if (newUpdates.length > 0) {
          logger.info(`📥 Found ${newUpdates.length} new enrollment updates`);
          
          for (const update of newUpdates) {
            this.processEnrollmentUpdate(update);
          }
          
          this.lastSyncTimestamp = new Date();
        }
      }
    } catch (error) {
      logger.error('❌ Failed to check for enrollment updates:', error);
    }
  }

  /**
   * Broadcast enrollment update to all sessions
   */
  async broadcastEnrollmentUpdate(update: EnrollmentUpdate): Promise<void> {
    logger.info('📡 Broadcasting enrollment update', {
      enrollmentId: update.id,
      status: update.status,
      paymentType: update.paymentType,
      source: update.source
    });

    const syncData: SyncEventData = {
      type: 'enrollment_update',
      enrollment: update,
      sessionId: this.sessionId,
      timestamp: new Date().toISOString()
    };

    try {
      // Broadcast via BroadcastChannel
      if (this.broadcastChannel) {
        this.broadcastChannel.postMessage(syncData);
        logger.debug('📡 Broadcasted via BroadcastChannel');
      }

      // Broadcast via localStorage for cross-tab sync
      if (this.options.enableStorageEvents) {
        const broadcastKey = `enrollment-broadcast-${Date.now()}`;
        localStorage.setItem(broadcastKey, JSON.stringify(syncData));
        
        // Clean up broadcast key after a short delay
        setTimeout(() => {
          localStorage.removeItem(broadcastKey);
        }, 1000);
        
        logger.debug('📡 Broadcasted via localStorage');
      }

      // Dispatch custom events for local listeners
      if (this.options.enableCustomEvents) {
        this.dispatchCustomEvents(update);
      }

      // Store update for polling mechanism
      this.storeEnrollmentUpdate(update);

    } catch (error) {
      logger.error('❌ Failed to broadcast enrollment update:', error);
    }
  }

  /**
   * Handle card payment enrollment (auto-approve)
   */
  async handleCardPaymentEnrollment(enrollmentData: any): Promise<void> {
    logger.info('💳 Processing card payment enrollment', {
      enrollmentId: enrollmentData.id,
      courseId: enrollmentData.course_id
    });

    const update: EnrollmentUpdate = {
      id: enrollmentData.id,
      userId: enrollmentData.user_id,
      courseId: enrollmentData.course_id,
      status: 'approved',
      paymentType: 'card',
      timestamp: new Date(),
      source: 'webhook',
      metadata: {
        autoApproved: true,
        paymentReference: enrollmentData.payment_ref
      }
    };

    // Broadcast the update immediately
    await this.broadcastEnrollmentUpdate(update);

    // Emit specific card payment event
    this.emit('card-payment-approved', update);
  }

  /**
   * Handle EFT payment enrollment (pending approval)
   */
  async handleEFTPaymentEnrollment(enrollmentData: any): Promise<void> {
    logger.info('🏦 Processing EFT payment enrollment', {
      enrollmentId: enrollmentData.id,
      courseId: enrollmentData.course_id
    });

    const update: EnrollmentUpdate = {
      id: enrollmentData.id,
      userId: enrollmentData.user_id,
      courseId: enrollmentData.course_id,
      status: 'pending',
      paymentType: 'eft',
      timestamp: new Date(),
      source: 'webhook',
      metadata: {
        requiresApproval: true,
        proofOfPayment: enrollmentData.proof_of_payment
      }
    };

    // Broadcast the update
    await this.broadcastEnrollmentUpdate(update);

    // Emit specific EFT payment event
    this.emit('eft-payment-submitted', update);
  }

  /**
   * Handle admin approval/rejection
   */
  async handleAdminStatusChange(
    enrollmentId: string,
    newStatus: 'approved' | 'rejected',
    adminId: string
  ): Promise<void> {
    logger.info('👨‍💼 Processing admin status change', {
      enrollmentId,
      newStatus,
      adminId
    });

    // Get enrollment data (this would typically come from database)
    const enrollmentData = await this.getEnrollmentData(enrollmentId);
    
    if (enrollmentData) {
      const update: EnrollmentUpdate = {
        id: enrollmentId,
        userId: enrollmentData.user_id,
        courseId: enrollmentData.course_id,
        status: newStatus,
        paymentType: enrollmentData.payment_type || 'manual',
        timestamp: new Date(),
        source: 'admin',
        metadata: {
          adminId,
          previousStatus: enrollmentData.status
        }
      };

      // Broadcast the update
      await this.broadcastEnrollmentUpdate(update);

      // Emit specific admin action event
      this.emit('admin-status-change', update);
    }
  }

  /**
   * Subscribe to enrollment updates
   */
  subscribe(eventType: string, callback: Function): () => void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    
    this.listeners.get(eventType)!.push(callback);
    
    logger.debug(`📝 Subscribed to ${eventType} events`);
    
    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(eventType);
      if (callbacks) {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      }
    };
  }

  /**
   * Emit event to subscribers
   */
  private emit(eventType: string, data: any): void {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          logger.error(`❌ Error in ${eventType} callback:`, error);
        }
      });
    }
  }

  /**
   * Handle broadcast messages from other sessions
   */
  private handleBroadcastMessage(event: MessageEvent): void {
    try {
      const syncData: SyncEventData = event.data;
      
      // Ignore messages from this session
      if (syncData.sessionId === this.sessionId) {
        return;
      }

      logger.debug('📥 Received broadcast message', {
        type: syncData.type,
        sessionId: syncData.sessionId
      });

      this.processEnrollmentUpdate(syncData.enrollment);
    } catch (error) {
      logger.error('❌ Failed to handle broadcast message:', error);
    }
  }

  /**
   * Handle storage events for cross-tab sync
   */
  private handleStorageEvent(event: StorageEvent): void {
    if (!event.key?.startsWith('enrollment-broadcast-') || !event.newValue) {
      return;
    }

    try {
      const syncData: SyncEventData = JSON.parse(event.newValue);
      
      // Ignore messages from this session
      if (syncData.sessionId === this.sessionId) {
        return;
      }

      logger.debug('📥 Received storage event', {
        type: syncData.type,
        sessionId: syncData.sessionId
      });

      this.processEnrollmentUpdate(syncData.enrollment);
    } catch (error) {
      logger.error('❌ Failed to handle storage event:', error);
    }
  }

  /**
   * Process enrollment update
   */
  private processEnrollmentUpdate(update: EnrollmentUpdate): void {
    logger.info('🔄 Processing enrollment update', {
      enrollmentId: update.id,
      status: update.status,
      paymentType: update.paymentType
    });

    // Emit general update event
    this.emit('enrollment-update', update);

    // Emit specific events based on update type
    if (update.paymentType === 'card' && update.status === 'approved') {
      this.emit('card-payment-approved', update);
    } else if (update.paymentType === 'eft' && update.status === 'pending') {
      this.emit('eft-payment-submitted', update);
    }

    // Dispatch custom DOM events for UI components
    if (this.options.enableCustomEvents) {
      this.dispatchCustomEvents(update);
    }
  }

  /**
   * Dispatch custom DOM events
   */
  private dispatchCustomEvents(update: EnrollmentUpdate): void {
    const events = [
      'enrollment-real-time-update',
      `enrollment-${update.status}`,
      `payment-${update.paymentType}`,
    ];

    events.forEach(eventName => {
      window.dispatchEvent(new CustomEvent(eventName, {
        detail: update
      }));
    });
  }

  /**
   * Store enrollment update for polling mechanism
   */
  private storeEnrollmentUpdate(update: EnrollmentUpdate): void {
    try {
      const updatesKey = 'enrollment-updates';
      const existingUpdates = JSON.parse(localStorage.getItem(updatesKey) || '[]');
      
      // Add new update
      existingUpdates.push({
        ...update,
        timestamp: update.timestamp.toISOString()
      });
      
      // Keep only last 100 updates
      const recentUpdates = existingUpdates.slice(-100);
      
      localStorage.setItem(updatesKey, JSON.stringify(recentUpdates));
    } catch (error) {
      logger.error('❌ Failed to store enrollment update:', error);
    }
  }

  /**
   * Get enrollment data (mock implementation)
   */
  private async getEnrollmentData(enrollmentId: string): Promise<any> {
    // This would typically query the database
    // For now, return mock data
    return {
      id: enrollmentId,
      user_id: 'user-123',
      course_id: 'course-456',
      status: 'pending',
      payment_type: 'eft'
    };
  }

  /**
   * Sync enrollment status across all sessions
   */
  async syncEnrollmentStatus(
    enrollmentId: string,
    status: 'approved' | 'rejected' | 'pending'
  ): Promise<void> {
    const enrollmentData = await this.getEnrollmentData(enrollmentId);
    
    if (enrollmentData) {
      const update: EnrollmentUpdate = {
        id: enrollmentId,
        userId: enrollmentData.user_id,
        courseId: enrollmentData.course_id,
        status,
        paymentType: enrollmentData.payment_type || 'manual',
        timestamp: new Date(),
        source: 'system'
      };

      await this.broadcastEnrollmentUpdate(update);
    }
  }

  /**
   * Get sync statistics
   */
  getSyncStats(): any {
    return {
      sessionId: this.sessionId,
      lastSyncTimestamp: this.lastSyncTimestamp,
      activeListeners: Array.from(this.listeners.keys()).reduce((acc, key) => {
        acc[key] = this.listeners.get(key)?.length || 0;
        return acc;
      }, {} as Record<string, number>),
      broadcastChannelActive: !!this.broadcastChannel,
      pollingActive: !!this.pollInterval
    };
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    logger.info('🧹 Cleaning up RealTimeEnrollmentSync');
    
    this.stopPolling();
    
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
    }
    
    window.removeEventListener('storage', this.handleStorageEvent.bind(this));
    
    this.listeners.clear();
  }
}

// Export singleton instance
export const realTimeEnrollmentSync = RealTimeEnrollmentSync.getInstance();