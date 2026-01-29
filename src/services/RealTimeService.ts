/**
 * RealTimeService
 * 
 * Handles WebSocket communication for real-time enrollment updates with:
 * - Auto-reconnection with exponential backoff
 * - Cross-tab synchronization using BroadcastChannel API
 * - Message queuing for offline scenarios
 * - Broadcasting system for admin and student sessions
 * 
 * Requirements: 1.2, 3.2, 6.1, 6.3, 6.4
 */

import { supabase } from '@/integrations/supabase/client';
import { 
  EnrollmentUpdate, 
  EnrollmentUpdateType,
  Enrollment,
  EnrollmentStatus 
} from '@/types/enrollment';
import { 
  ENROLLMENT_CONFIG, 
  WEBSOCKET_EVENTS 
} from '@/constants/enrollment';
import { createEnrollmentUpdate } from '@/utils/enrollment';
import { 
  crossTabSyncService, 
  type CrossTabUpdateCallback,
  type StateConflictCallback,
  type StateConflict,
  type ConflictResolutionStrategy
} from './CrossTabSyncService';

// Callback types for subscriptions
export type EnrollmentUpdateCallback = (update: EnrollmentUpdate) => void;
export type AdminUpdateCallback = (update: EnrollmentUpdate) => void;
export type ConnectionStatusCallback = (connected: boolean) => void;

// Message queue item interface
interface QueuedMessage {
  id: string;
  type: string;
  data: any;
  timestamp: Date;
  retryCount: number;
}

// Connection state interface
interface ConnectionState {
  connected: boolean;
  reconnectAttempts: number;
  lastReconnectTime: Date | null;
  subscriptionActive: boolean;
}

/**
 * RealTimeService Interface
 */
export interface IRealTimeService {
  connect(): Promise<void>;
  disconnect(): void;
  subscribeToEnrollments(callback: EnrollmentUpdateCallback): () => void;
  subscribeToAdminUpdates(callback: AdminUpdateCallback): () => void;
  subscribeToConnectionStatus(callback: ConnectionStatusCallback): () => void;
  broadcastEnrollmentUpdate(update: EnrollmentUpdate): void;
  syncCrossTab(): void;
  isConnected(): boolean;
  getQueuedMessagesCount(): number;
  getCrossTabSyncStatus(): { isActive: boolean; localState: any; activeTabs: number };
  forceCrossTabSync(): void;
}

/**
 * RealTimeService Implementation
 */
export class RealTimeService implements IRealTimeService {
  private static instance: RealTimeService;
  
  // Subscription callbacks
  private enrollmentCallbacks: Set<EnrollmentUpdateCallback> = new Set();
  private adminCallbacks: Set<AdminUpdateCallback> = new Set();
  private connectionCallbacks: Set<ConnectionStatusCallback> = new Set();
  
  // WebSocket/Supabase realtime connection
  private realtimeChannel: any = null;
  private connectionState: ConnectionState = {
    connected: false,
    reconnectAttempts: 0,
    lastReconnectTime: null,
    subscriptionActive: false
  };
  
  // Cross-tab synchronization
  private broadcastChannel: BroadcastChannel | null = null;
  private readonly BROADCAST_CHANNEL_NAME = 'enrollment-realtime-sync';
  
  // Message queuing for offline scenarios
  private messageQueue: QueuedMessage[] = [];
  private readonly MAX_QUEUE_SIZE = 100;
  private readonly QUEUE_STORAGE_KEY = 'enrollment-realtime-queue';
  
  // Reconnection management
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isReconnecting = false;
  
  // Initialization state
  private isInitialized = false;
  
  // Cross-tab synchronization
  private crossTabUnsubscribers: (() => void)[] = [];

  private constructor() {
    this.initializeBroadcastChannel();
    this.loadQueueFromStorage();
    this.setupOnlineOfflineHandlers();
    this.initializeCrossTabSync();
  }

  static getInstance(): RealTimeService {
    if (!RealTimeService.instance) {
      RealTimeService.instance = new RealTimeService();
    }
    return RealTimeService.instance;
  }

  /**
   * Connect to real-time services
   */
  async connect(): Promise<void> {
    if (this.isInitialized && this.connectionState.connected) {
      console.log('🔄 RealTimeService already connected');
      return;
    }

    try {
      console.log('🚀 Connecting RealTimeService...');
      
      await this.initializeRealtimeSubscription();
      this.connectionState.connected = true;
      this.connectionState.reconnectAttempts = 0;
      this.isInitialized = true;
      
      // Process any queued messages
      await this.processQueuedMessages();
      
      // Initialize cross-tab synchronization
      await this.initializeCrossTabSync();
      
      // Notify connection status callbacks
      this.notifyConnectionStatus(true);
      
      console.log('✅ RealTimeService connected successfully');
      
    } catch (error) {
      console.error('❌ Failed to connect RealTimeService:', error);
      this.connectionState.connected = false;
      this.scheduleReconnect();
      throw error;
    }
  }

  /**
   * Disconnect from real-time services
   */
  disconnect(): void {
    console.log('🔌 Disconnecting RealTimeService...');
    
    // Clear reconnection timer
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    // Unsubscribe from Supabase realtime
    if (this.realtimeChannel) {
      this.realtimeChannel.unsubscribe();
      this.realtimeChannel = null;
    }
    
    // Close broadcast channel
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
    
    // Cleanup cross-tab synchronization
    this.cleanupCrossTabSync();
    
    // Update connection state
    this.connectionState.connected = false;
    this.connectionState.subscriptionActive = false;
    this.isReconnecting = false;
    
    // Notify connection status callbacks
    this.notifyConnectionStatus(false);
    
    console.log('✅ RealTimeService disconnected');
  }

  /**
   * Subscribe to enrollment updates
   */
  subscribeToEnrollments(callback: EnrollmentUpdateCallback): () => void {
    this.enrollmentCallbacks.add(callback);
    
    return () => {
      this.enrollmentCallbacks.delete(callback);
    };
  }

  /**
   * Subscribe to admin updates
   */
  subscribeToAdminUpdates(callback: AdminUpdateCallback): () => void {
    this.adminCallbacks.add(callback);
    
    return () => {
      this.adminCallbacks.delete(callback);
    };
  }

  /**
   * Subscribe to connection status changes
   */
  subscribeToConnectionStatus(callback: ConnectionStatusCallback): () => void {
    this.connectionCallbacks.add(callback);
    
    // Immediately notify current status
    callback(this.connectionState.connected);
    
    return () => {
      this.connectionCallbacks.delete(callback);
    };
  }

  /**
   * Broadcast enrollment update to all subscribers and cross-tab
   */
  broadcastEnrollmentUpdate(update: EnrollmentUpdate): void {
    try {
      console.log('📡 Broadcasting enrollment update:', update);
      
      // Notify local subscribers
      this.notifyEnrollmentSubscribers(update);
      
      // Broadcast to other tabs
      this.broadcastToOtherTabs(update);
      
      // Sync via CrossTabSyncService for enhanced synchronization
      crossTabSyncService.syncEnrollmentUpdate(update);
      
      // If offline, queue the message
      if (!this.connectionState.connected) {
        this.queueMessage('enrollment-update', update);
      }
      
    } catch (error) {
      console.error('❌ Error broadcasting enrollment update:', error);
    }
  }

  /**
   * Synchronize state across browser tabs
   */
  syncCrossTab(): void {
    try {
      if (!this.broadcastChannel) {
        console.warn('⚠️ BroadcastChannel not available for cross-tab sync');
        return;
      }
      
      // Send sync request to other tabs
      this.broadcastChannel.postMessage({
        type: 'sync-request',
        timestamp: new Date().toISOString(),
        tabId: this.generateTabId()
      });
      
      // Also request sync via CrossTabSyncService
      crossTabSyncService.requestStateSync();
      
      console.log('🔄 Cross-tab sync requested');
      
    } catch (error) {
      console.error('❌ Error in cross-tab sync:', error);
    }
  }

  /**
   * Check if service is connected
   */
  isConnected(): boolean {
    return this.connectionState.connected;
  }

  /**
   * Get number of queued messages
   */
  getQueuedMessagesCount(): number {
    return this.messageQueue.length;
  }

  /**
   * Private Methods
   */

  /**
   * Initialize Supabase realtime subscription
   */
  private async initializeRealtimeSubscription(): Promise<void> {
    try {
      this.realtimeChannel = supabase
        .channel('enrollment_realtime_updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'enrollments'
          },
          (payload) => {
            this.handleRealtimeUpdate(payload);
          }
        )
        .subscribe((status) => {
          console.log('📡 Realtime subscription status:', status);
          
          if (status === 'SUBSCRIBED') {
            this.connectionState.subscriptionActive = true;
            console.log('✅ Realtime subscription active');
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            this.connectionState.subscriptionActive = false;
            this.connectionState.connected = false;
            console.error('❌ Realtime subscription error:', status);
            this.scheduleReconnect();
          }
        });
        
    } catch (error) {
      console.error('❌ Error initializing realtime subscription:', error);
      throw error;
    }
  }

  /**
   * Handle realtime database updates
   */
  private handleRealtimeUpdate(payload: any): void {
    try {
      console.log('📨 Received realtime update:', payload);
      
      let updateType: EnrollmentUpdateType;
      let enrollment: Enrollment;

      switch (payload.eventType) {
        case 'INSERT':
          updateType = EnrollmentUpdateType.ENROLLMENT_CREATED;
          enrollment = this.mapDatabaseToEnrollment(payload.new);
          break;
          
        case 'UPDATE':
          const oldEnrollment = this.mapDatabaseToEnrollment(payload.old);
          const newEnrollment = this.mapDatabaseToEnrollment(payload.new);
          
          if (oldEnrollment.status !== newEnrollment.status) {
            if (newEnrollment.status === EnrollmentStatus.APPROVED) {
              updateType = EnrollmentUpdateType.ENROLLMENT_APPROVED;
            } else if (newEnrollment.status === EnrollmentStatus.REJECTED) {
              updateType = EnrollmentUpdateType.ENROLLMENT_REJECTED;
            } else {
              return; // Skip other status changes
            }
          } else {
            return; // Skip non-status updates
          }
          
          enrollment = newEnrollment;
          break;
          
        default:
          return; // Skip DELETE and other events
      }

      const update = createEnrollmentUpdate(updateType, enrollment);
      this.broadcastEnrollmentUpdate(update);

    } catch (error) {
      console.error('❌ Error handling realtime update:', error);
    }
  }

  /**
   * Initialize BroadcastChannel for cross-tab communication
   */
  private initializeBroadcastChannel(): void {
    try {
      if (typeof BroadcastChannel === 'undefined') {
        console.warn('⚠️ BroadcastChannel not supported in this browser');
        return;
      }
      
      this.broadcastChannel = new BroadcastChannel(this.BROADCAST_CHANNEL_NAME);
      
      this.broadcastChannel.addEventListener('message', (event) => {
        this.handleBroadcastMessage(event.data);
      });
      
      console.log('✅ BroadcastChannel initialized for cross-tab sync');
      
    } catch (error) {
      console.error('❌ Error initializing BroadcastChannel:', error);
    }
  }

  /**
   * Handle messages from other tabs
   */
  private handleBroadcastMessage(data: any): void {
    try {
      console.log('📨 Received cross-tab message:', data);
      
      switch (data.type) {
        case 'enrollment-update':
          // Notify local subscribers about updates from other tabs
          this.notifyEnrollmentSubscribers(data.update);
          break;
          
        case 'sync-request':
          // Another tab is requesting sync - could respond with current state
          console.log('🔄 Sync request received from another tab');
          break;
          
        case 'connection-status':
          // Another tab is sharing connection status
          console.log('📡 Connection status from another tab:', data.connected);
          break;
          
        default:
          console.log('❓ Unknown cross-tab message type:', data.type);
      }
      
    } catch (error) {
      console.error('❌ Error handling broadcast message:', error);
    }
  }

  /**
   * Broadcast message to other tabs
   */
  private broadcastToOtherTabs(update: EnrollmentUpdate): void {
    try {
      if (!this.broadcastChannel) {
        return;
      }
      
      this.broadcastChannel.postMessage({
        type: 'enrollment-update',
        update,
        timestamp: new Date().toISOString(),
        tabId: this.generateTabId()
      });
      
    } catch (error) {
      console.error('❌ Error broadcasting to other tabs:', error);
    }
  }

  /**
   * Notify enrollment update subscribers
   */
  private notifyEnrollmentSubscribers(update: EnrollmentUpdate): void {
    this.enrollmentCallbacks.forEach(callback => {
      try {
        callback(update);
      } catch (error) {
        console.error('❌ Error in enrollment update callback:', error);
      }
    });

    // Notify admin callbacks for new enrollments
    if (update.type === EnrollmentUpdateType.ENROLLMENT_CREATED) {
      this.adminCallbacks.forEach(callback => {
        try {
          callback(update);
        } catch (error) {
          console.error('❌ Error in admin update callback:', error);
        }
      });
    }
  }

  /**
   * Notify connection status subscribers
   */
  private notifyConnectionStatus(connected: boolean): void {
    this.connectionCallbacks.forEach(callback => {
      try {
        callback(connected);
      } catch (error) {
        console.error('❌ Error in connection status callback:', error);
      }
    });
    
    // Broadcast connection status to other tabs
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({
          type: 'connection-status',
          connected,
          timestamp: new Date().toISOString(),
          tabId: this.generateTabId()
        });
      } catch (error) {
        console.error('❌ Error broadcasting connection status:', error);
      }
    }
  }

  /**
   * Schedule reconnection with exponential backoff
   */
  private scheduleReconnect(): void {
    if (this.isReconnecting || this.connectionState.reconnectAttempts >= ENROLLMENT_CONFIG.MAX_RECONNECT_ATTEMPTS) {
      console.log('⚠️ Max reconnection attempts reached or already reconnecting');
      return;
    }
    
    this.isReconnecting = true;
    this.connectionState.reconnectAttempts++;
    
    const delay = Math.min(
      ENROLLMENT_CONFIG.WEBSOCKET_RECONNECT_DELAY * Math.pow(2, this.connectionState.reconnectAttempts - 1),
      30000 // Max 30 seconds
    );
    
    console.log(`🔄 Scheduling reconnection attempt ${this.connectionState.reconnectAttempts} in ${delay}ms`);
    
    this.reconnectTimer = setTimeout(async () => {
      try {
        this.isReconnecting = false;
        this.connectionState.lastReconnectTime = new Date();
        await this.connect();
      } catch (error) {
        console.error('❌ Reconnection attempt failed:', error);
        this.isReconnecting = false;
        this.scheduleReconnect();
      }
    }, delay);
  }

  /**
   * Queue message for offline scenarios
   */
  private queueMessage(type: string, data: any): void {
    try {
      const message: QueuedMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        type,
        data,
        timestamp: new Date(),
        retryCount: 0
      };
      
      this.messageQueue.push(message);
      
      // Limit queue size
      if (this.messageQueue.length > this.MAX_QUEUE_SIZE) {
        this.messageQueue.shift(); // Remove oldest message
      }
      
      // Save to localStorage
      this.saveQueueToStorage();
      
      console.log(`📥 Message queued (${this.messageQueue.length} total):`, message);
      
    } catch (error) {
      console.error('❌ Error queuing message:', error);
    }
  }

  /**
   * Process queued messages when connection is restored
   */
  private async processQueuedMessages(): Promise<void> {
    if (this.messageQueue.length === 0) {
      return;
    }
    
    console.log(`📤 Processing ${this.messageQueue.length} queued messages...`);
    
    const messagesToProcess = [...this.messageQueue];
    this.messageQueue = [];
    
    for (const message of messagesToProcess) {
      try {
        // Re-broadcast the queued update
        if (message.type === 'enrollment-update') {
          this.notifyEnrollmentSubscribers(message.data);
        }
        
        console.log('✅ Processed queued message:', message.id);
        
      } catch (error) {
        console.error('❌ Error processing queued message:', error);
        
        // Re-queue if retry count is below threshold
        if (message.retryCount < ENROLLMENT_CONFIG.MAX_RETRY_ATTEMPTS) {
          message.retryCount++;
          this.messageQueue.push(message);
        }
      }
    }
    
    // Save updated queue
    this.saveQueueToStorage();
  }

  /**
   * Save message queue to localStorage
   */
  private saveQueueToStorage(): void {
    try {
      localStorage.setItem(this.QUEUE_STORAGE_KEY, JSON.stringify(this.messageQueue));
    } catch (error) {
      console.error('❌ Error saving queue to storage:', error);
    }
  }

  /**
   * Load message queue from localStorage
   */
  private loadQueueFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.QUEUE_STORAGE_KEY);
      if (stored) {
        this.messageQueue = JSON.parse(stored);
        console.log(`📥 Loaded ${this.messageQueue.length} messages from storage`);
      }
    } catch (error) {
      console.error('❌ Error loading queue from storage:', error);
      this.messageQueue = [];
    }
  }

  /**
   * Setup online/offline event handlers
   */
  private setupOnlineOfflineHandlers(): void {
    window.addEventListener('online', () => {
      console.log('🌐 Browser came online - attempting to reconnect...');
      if (!this.connectionState.connected) {
        this.connect().catch(error => {
          console.error('❌ Failed to reconnect after coming online:', error);
        });
      }
    });
    
    window.addEventListener('offline', () => {
      console.log('📴 Browser went offline');
      this.connectionState.connected = false;
      this.notifyConnectionStatus(false);
    });
  }

  /**
   * Generate unique tab ID for cross-tab identification
   */
  private generateTabId(): string {
    return `tab_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * Map database record to Enrollment interface
   */
  private mapDatabaseToEnrollment(data: any): Enrollment {
    return {
      id: data.id,
      userId: data.user_id,
      courseId: data.course_id,
      paymentType: data.payment_type,
      status: data.status,
      paymentStatus: data.payment_status,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      approvedBy: data.approved_by || undefined,
      approvedAt: data.approved_at ? new Date(data.approved_at) : undefined,
      rejectionReason: data.rejection_reason || undefined,
      // Legacy fields for backward compatibility
      user_id: data.user_id,
      user_email: data.user_email,
      course_id: data.course_id,
      course_title: data.course_title,
      enrolled_at: data.created_at,
      completed_at: data.completed_at,
      progress: data.progress || 0
    };
  }

  /**
   * Initialize cross-tab synchronization
   */
  private async initializeCrossTabSync(): Promise<void> {
    try {
      // Initialize CrossTabSyncService if not already done
      await crossTabSyncService.initialize();
      
      // Subscribe to cross-tab enrollment updates
      const crossTabUpdateUnsubscriber = crossTabSyncService.subscribeToUpdates(
        (update: EnrollmentUpdate) => {
          console.log('📨 Received cross-tab enrollment update:', update);
          this.notifyEnrollmentSubscribers(update);
        }
      );
      
      // Subscribe to state conflicts
      const conflictUnsubscriber = crossTabSyncService.subscribeToConflicts(
        (conflict: StateConflict) => {
          console.warn('⚠️ Cross-tab state conflict detected:', conflict);
          this.handleCrossTabConflict(conflict);
        }
      );
      
      this.crossTabUnsubscribers.push(crossTabUpdateUnsubscriber, conflictUnsubscriber);
      
      console.log('✅ Cross-tab synchronization initialized');
      
    } catch (error) {
      console.error('❌ Error initializing cross-tab sync:', error);
    }
  }

  /**
   * Handle cross-tab state conflicts
   */
  private handleCrossTabConflict(conflict: StateConflict): void {
    try {
      console.warn('⚠️ Handling cross-tab conflict for enrollment:', conflict.enrollmentId);
      
      // Auto-resolve using admin priority strategy
      const resolution = crossTabSyncService.resolveConflict(
        conflict, 
        ConflictResolutionStrategy.ADMIN_PRIORITY
      );
      
      console.log('✅ Cross-tab conflict resolved:', resolution);
      
      // Create update for the resolved state
      const update: EnrollmentUpdate = {
        type: EnrollmentUpdateType.ENROLLMENT_APPROVED, // Assume approval for resolved conflicts
        enrollmentId: resolution.id,
        userId: resolution.userId,
        courseId: resolution.courseId,
        status: resolution.status,
        timestamp: resolution.updatedAt,
        enrollment: resolution
      };
      
      // Notify local subscribers
      this.notifyEnrollmentSubscribers(update);
      
    } catch (error) {
      console.error('❌ Error handling cross-tab conflict:', error);
    }
  }

  /**
   * Cleanup cross-tab synchronization
   */
  private cleanupCrossTabSync(): void {
    try {
      // Unsubscribe from cross-tab updates
      this.crossTabUnsubscribers.forEach(unsubscriber => {
        try {
          unsubscriber();
        } catch (error) {
          console.error('❌ Error unsubscribing from cross-tab updates:', error);
        }
      });
      
      this.crossTabUnsubscribers = [];
      
      console.log('✅ Cross-tab synchronization cleaned up');
      
    } catch (error) {
      console.error('❌ Error cleaning up cross-tab sync:', error);
    }
  }

  /**
   * Get cross-tab synchronization status
   */
  getCrossTabSyncStatus(): {
    isActive: boolean;
    localState: any;
    activeTabs: number;
  } {
    try {
      const localState = crossTabSyncService.getLocalState();
      
      return {
        isActive: true,
        localState,
        activeTabs: Object.keys(localState.enrollments).length
      };
      
    } catch (error) {
      console.error('❌ Error getting cross-tab sync status:', error);
      return {
        isActive: false,
        localState: null,
        activeTabs: 0
      };
    }
  }

  /**
   * Force cross-tab state synchronization
   */
  forceCrossTabSync(): void {
    try {
      console.log('🔄 Forcing cross-tab synchronization...');
      crossTabSyncService.requestStateSync();
    } catch (error) {
      console.error('❌ Error forcing cross-tab sync:', error);
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    console.log('🧹 Destroying RealTimeService...');
    
    this.disconnect();
    
    // Clear all callbacks
    this.enrollmentCallbacks.clear();
    this.adminCallbacks.clear();
    this.connectionCallbacks.clear();
    
    // Clear message queue
    this.messageQueue = [];
    
    // Remove from localStorage
    try {
      localStorage.removeItem(this.QUEUE_STORAGE_KEY);
    } catch (error) {
      console.error('❌ Error clearing queue from storage:', error);
    }
    
    // Destroy cross-tab sync service
    try {
      crossTabSyncService.destroy();
    } catch (error) {
      console.error('❌ Error destroying cross-tab sync service:', error);
    }
    
    this.isInitialized = false;
    
    console.log('✅ RealTimeService destroyed');
  }
}

// Export singleton instance
export const realTimeService = RealTimeService.getInstance();

// Export types
export type { IRealTimeService, EnrollmentUpdateCallback, AdminUpdateCallback, ConnectionStatusCallback };