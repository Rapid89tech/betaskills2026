/**
 * Cross-Session Enrollment Synchronization Service
 * 
 * Implements WebSocket-like polling mechanism for real-time enrollment updates
 * across multiple admin sessions and browser tabs. Ensures enrollment changes
 * appear instantly across all admin sessions.
 * 
 * Requirements: 1.1, 1.2, 2.1, 2.2, 7.3
 */

import { logger } from '@/utils/logger';
import { createClient } from '@supabase/supabase-js';

export interface CrossSessionEnrollmentUpdate {
  id: string;
  type: 'enrollment_created' | 'enrollment_approved' | 'enrollment_rejected' | 'payment_confirmed';
  enrollmentId: string;
  userId: string;
  courseId: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentType: 'card' | 'eft' | 'manual';
  timestamp: Date;
  sessionId: string;
  adminId?: string;
  metadata?: any;
}

export interface SyncSession {
  id: string;
  tabId: string;
  lastHeartbeat: Date;
  isActive: boolean;
  subscriptions: string[];
}

export interface SyncOptions {
  pollInterval: number;
  heartbeatInterval: number;
  sessionTimeout: number;
  maxRetries: number;
  enableBroadcastChannel: boolean;
  enableStorageEvents: boolean;
  enableSupabaseRealtime: boolean;
}

export interface SyncStats {
  activeSessions: number;
  totalUpdates: number;
  lastUpdate: Date | null;
  syncLatency: number;
  errors: number;
  uptime: number;
}

/**
 * Cross-Session Enrollment Synchronization Service
 */
export class CrossSessionEnrollmentSync {
  private static instance: CrossSessionEnrollmentSync;
  private sessionId: string;
  private tabId: string;
  private broadcastChannel?: BroadcastChannel;
  private supabaseClient: any;
  private pollInterval?: NodeJS.Timeout;
  private heartbeatInterval?: NodeJS.Timeout;
  private lastSyncTimestamp: Date;
  private options: SyncOptions;
  private isActive: boolean = false;
  private listeners: Map<string, Function[]> = new Map();
  private activeSessions: Map<string, SyncSession> = new Map();
  private updateQueue: CrossSessionEnrollmentUpdate[] = [];
  private stats: SyncStats;
  private retryCount: number = 0;

  constructor(options: Partial<SyncOptions> = {}) {
    this.sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    this.tabId = `tab_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    this.lastSyncTimestamp = new Date();
    
    this.options = {
      pollInterval: 2000, // 2 seconds for responsive updates
      heartbeatInterval: 10000, // 10 seconds
      sessionTimeout: 30000, // 30 seconds
      maxRetries: 5,
      enableBroadcastChannel: true,
      enableStorageEvents: true,
      enableSupabaseRealtime: true,
      ...options
    };

    this.stats = {
      activeSessions: 0,
      totalUpdates: 0,
      lastUpdate: null,
      syncLatency: 0,
      errors: 0,
      uptime: Date.now()
    };

    this.initializeSupabaseClient();
    this.initializeSyncMechanisms();
  }

  static getInstance(options?: Partial<SyncOptions>): CrossSessionEnrollmentSync {
    if (!CrossSessionEnrollmentSync.instance) {
      CrossSessionEnrollmentSync.instance = new CrossSessionEnrollmentSync(options);
    }
    return CrossSessionEnrollmentSync.instance;
  }

  /**
   * Initialize Supabase client for real-time subscriptions
   */
  private initializeSupabaseClient(): void {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (supabaseUrl && supabaseAnonKey) {
        this.supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
        logger.info('✅ Supabase client initialized for real-time sync');
      } else {
        logger.warn('⚠️ Supabase credentials missing, real-time sync will use polling only');
      }
    } catch (error) {
      logger.error('❌ Failed to initialize Supabase client:', error);
    }
  }

  /**
   * Initialize all synchronization mechanisms
   */
  private async initializeSyncMechanisms(): Promise<void> {
    logger.info('🔄 CrossSessionEnrollmentSync: Initializing sync mechanisms', {
      sessionId: this.sessionId,
      tabId: this.tabId,
      options: this.options
    });

    try {
      // Initialize BroadcastChannel for cross-tab communication
      if (this.options.enableBroadcastChannel && typeof BroadcastChannel !== 'undefined') {
        this.broadcastChannel = new BroadcastChannel('cross-session-enrollment-sync');
        this.broadcastChannel.addEventListener('message', this.handleBroadcastMessage.bind(this));
        logger.info('✅ BroadcastChannel initialized');
      }

      // Initialize storage event listener for cross-tab sync fallback
      if (this.options.enableStorageEvents) {
        window.addEventListener('storage', this.handleStorageEvent.bind(this));
        logger.info('✅ Storage event listener initialized');
      }

      // Initialize Supabase real-time subscriptions
      if (this.options.enableSupabaseRealtime && this.supabaseClient) {
        await this.initializeSupabaseRealtime();
      }

      // Start polling mechanism
      this.startPolling();

      // Start heartbeat mechanism
      this.startHeartbeat();

      // Register this session
      await this.registerSession();

      this.isActive = true;
      this.retryCount = 0;

      // Emit connection event
      this.emit('connected', {
        sessionId: this.sessionId,
        tabId: this.tabId,
        timestamp: new Date()
      });

      logger.info('✅ CrossSessionEnrollmentSync: All sync mechanisms initialized');

    } catch (error) {
      logger.error('❌ Failed to initialize sync mechanisms:', error);
      this.handleConnectionError(error);
    }
  }

  /**
   * Initialize Supabase real-time subscriptions
   */
  private async initializeSupabaseRealtime(): Promise<void> {
    try {
      // Subscribe to enrollment table changes
      this.supabaseClient
        .channel('enrollment-changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'enrollments' 
          }, 
          (payload: any) => {
            this.handleSupabaseEnrollmentChange(payload);
          }
        )
        .subscribe();

      logger.info('✅ Supabase real-time subscription initialized for enrollments');

      // Subscribe to profiles table changes (for user updates)
      this.supabaseClient
        .channel('profile-changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'profiles' 
          }, 
          (payload: any) => {
            this.handleSupabaseProfileChange(payload);
          }
        )
        .subscribe();

      logger.info('✅ Supabase real-time subscription initialized for profiles');

    } catch (error) {
      logger.error('❌ Failed to initialize Supabase real-time:', error);
    }
  }

  /**
   * Start polling mechanism for enrollment updates
   */
  private startPolling(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }

    this.pollInterval = setInterval(async () => {
      try {
        await this.pollForEnrollmentUpdates();
      } catch (error) {
        logger.error('❌ Polling error:', error);
        this.stats.errors++;
        this.handleConnectionError(error);
      }
    }, this.options.pollInterval);

    logger.info(`🔄 Polling started with ${this.options.pollInterval}ms interval`);
  }

  /**
   * Start heartbeat mechanism to maintain session
   */
  private startHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
      this.cleanupInactiveSessions();
    }, this.options.heartbeatInterval);

    logger.debug(`💓 Heartbeat started with ${this.options.heartbeatInterval}ms interval`);
  }

  /**
   * Poll for enrollment updates since last sync
   */
  private async pollForEnrollmentUpdates(): Promise<void> {
    if (!this.supabaseClient) {
      return;
    }

    try {
      const startTime = Date.now();

      // Query for enrollments updated since last sync
      const { data: enrollments, error } = await this.supabaseClient
        .from('enrollments')
        .select(`
          *,
          profiles:user_id (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .gte('updated_at', this.lastSyncTimestamp.toISOString())
        .order('updated_at', { ascending: true });

      if (error) {
        throw error;
      }

      if (enrollments && enrollments.length > 0) {
        logger.debug(`📥 Found ${enrollments.length} enrollment updates via polling`);

        for (const enrollment of enrollments) {
          const update: CrossSessionEnrollmentUpdate = {
            id: `poll_${Date.now()}_${enrollment.id}`,
            type: this.determineUpdateType(enrollment),
            enrollmentId: enrollment.id,
            userId: enrollment.user_id,
            courseId: enrollment.course_id,
            status: enrollment.status,
            paymentType: this.detectPaymentType(enrollment),
            timestamp: new Date(enrollment.updated_at),
            sessionId: this.sessionId,
            metadata: {
              source: 'polling',
              enrollment: enrollment
            }
          };

          await this.processEnrollmentUpdate(update);
        }

        // Update last sync timestamp
        const latestUpdate = enrollments[enrollments.length - 1];
        this.lastSyncTimestamp = new Date(latestUpdate.updated_at);
      }

      // Update sync latency stats
      this.stats.syncLatency = Date.now() - startTime;

    } catch (error) {
      logger.error('❌ Failed to poll for enrollment updates:', error);
      this.stats.errors++;
    }
  }

  /**
   * Handle Supabase real-time enrollment changes
   */
  private async handleSupabaseEnrollmentChange(payload: any): Promise<void> {
    logger.debug('📥 Supabase enrollment change received:', payload);

    try {
      const { eventType, new: newRecord, old: oldRecord } = payload;
      
      let updateType: CrossSessionEnrollmentUpdate['type'];
      let enrollment = newRecord || oldRecord;

      switch (eventType) {
        case 'INSERT':
          updateType = 'enrollment_created';
          break;
        case 'UPDATE':
          if (newRecord.status === 'approved' && oldRecord.status !== 'approved') {
            updateType = 'enrollment_approved';
          } else if (newRecord.status === 'rejected' && oldRecord.status !== 'rejected') {
            updateType = 'enrollment_rejected';
          } else {
            updateType = 'payment_confirmed';
          }
          break;
        default:
          return; // Ignore DELETE events for now
      }

      const update: CrossSessionEnrollmentUpdate = {
        id: `supabase_${Date.now()}_${enrollment.id}`,
        type: updateType,
        enrollmentId: enrollment.id,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
        status: enrollment.status,
        paymentType: this.detectPaymentType(enrollment),
        timestamp: new Date(),
        sessionId: this.sessionId,
        metadata: {
          source: 'supabase_realtime',
          eventType,
          enrollment
        }
      };

      await this.processEnrollmentUpdate(update);

    } catch (error) {
      logger.error('❌ Failed to handle Supabase enrollment change:', error);
      this.stats.errors++;
    }
  }

  /**
   * Handle Supabase real-time profile changes
   */
  private async handleSupabaseProfileChange(payload: any): Promise<void> {
    logger.debug('📥 Supabase profile change received:', payload);

    // Emit profile update event for components that need to refresh user data
    this.emit('profile-updated', {
      userId: payload.new?.id || payload.old?.id,
      profile: payload.new,
      eventType: payload.eventType
    });
  }

  /**
   * Process enrollment update and broadcast to all sessions
   */
  private async processEnrollmentUpdate(update: CrossSessionEnrollmentUpdate): Promise<void> {
    logger.info('🔄 Processing enrollment update', {
      type: update.type,
      enrollmentId: update.enrollmentId,
      status: update.status,
      paymentType: update.paymentType
    });

    try {
      // Add to update queue
      this.updateQueue.push(update);

      // Update stats
      this.stats.totalUpdates++;
      this.stats.lastUpdate = new Date();

      // Broadcast to all sessions
      await this.broadcastUpdate(update);

      // Emit local events
      this.emitLocalEvents(update);

      // Clean up old updates from queue
      this.cleanupUpdateQueue();

    } catch (error) {
      logger.error('❌ Failed to process enrollment update:', error);
      this.stats.errors++;
    }
  }

  /**
   * Broadcast update to all sessions
   */
  private async broadcastUpdate(update: CrossSessionEnrollmentUpdate): Promise<void> {
    const broadcastData = {
      type: 'enrollment-update',
      update,
      sessionId: this.sessionId,
      tabId: this.tabId,
      timestamp: new Date().toISOString()
    };

    // Broadcast via BroadcastChannel
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(broadcastData);
        logger.debug('📡 Broadcasted via BroadcastChannel');
      } catch (error) {
        logger.warn('⚠️ BroadcastChannel failed:', error);
      }
    }

    // Broadcast via localStorage for cross-tab sync
    if (this.options.enableStorageEvents) {
      try {
        const storageKey = `enrollment-sync-${Date.now()}-${Math.random()}`;
        localStorage.setItem(storageKey, JSON.stringify(broadcastData));
        
        // Clean up storage key after short delay
        setTimeout(() => {
          localStorage.removeItem(storageKey);
        }, 1000);
        
        logger.debug('📡 Broadcasted via localStorage');
      } catch (error) {
        logger.warn('⚠️ localStorage broadcast failed:', error);
      }
    }
  }

  /**
   * Emit local events for the current session
   */
  private emitLocalEvents(update: CrossSessionEnrollmentUpdate): void {
    // Emit specific event types
    this.emit('enrollment-update', update);
    this.emit(update.type, update);

    // Emit payment-specific events
    if (update.paymentType === 'card' && update.status === 'approved') {
      this.emit('card-payment-approved', update);
    } else if (update.paymentType === 'eft' && update.status === 'pending') {
      this.emit('eft-payment-submitted', update);
    }

    // Emit DOM events for UI components
    const events = [
      'enrollment-real-time-update',
      `enrollment-${update.status}`,
      `payment-${update.paymentType}`,
      'refresh-enrollment-management'
    ];

    events.forEach(eventName => {
      window.dispatchEvent(new CustomEvent(eventName, {
        detail: update
      }));
    });
  }

  /**
   * Handle broadcast messages from other sessions
   */
  private handleBroadcastMessage(event: MessageEvent): void {
    try {
      const { type, update, sessionId, tabId } = event.data;
      
      // Ignore messages from this session
      if (sessionId === this.sessionId || tabId === this.tabId) {
        return;
      }

      logger.debug('📥 Received broadcast message', { type, sessionId, tabId });

      if (type === 'enrollment-update') {
        // Process remote enrollment update
        this.handleRemoteEnrollmentUpdate(update);
      } else if (type === 'session-heartbeat') {
        // Update session registry
        this.updateSessionRegistry(event.data);
      }

    } catch (error) {
      logger.error('❌ Failed to handle broadcast message:', error);
      this.stats.errors++;
    }
  }

  /**
   * Handle storage events for cross-tab sync
   */
  private handleStorageEvent(event: StorageEvent): void {
    if (!event.key?.startsWith('enrollment-sync-') || !event.newValue) {
      return;
    }

    try {
      const data = JSON.parse(event.newValue);
      this.handleBroadcastMessage({ data } as MessageEvent);
    } catch (error) {
      logger.error('❌ Failed to handle storage event:', error);
      this.stats.errors++;
    }
  }

  /**
   * Handle remote enrollment update from another session
   */
  private handleRemoteEnrollmentUpdate(update: CrossSessionEnrollmentUpdate): void {
    logger.debug('🌐 Processing remote enrollment update', {
      type: update.type,
      enrollmentId: update.enrollmentId,
      fromSession: update.sessionId
    });

    // Emit local events for UI components to update
    this.emitLocalEvents(update);

    // Update local stats
    this.stats.totalUpdates++;
    this.stats.lastUpdate = new Date();
  }

  /**
   * Send heartbeat to maintain session
   */
  private sendHeartbeat(): void {
    if (!this.isActive) {
      return;
    }

    const heartbeatData = {
      type: 'session-heartbeat',
      sessionId: this.sessionId,
      tabId: this.tabId,
      timestamp: new Date().toISOString(),
      stats: this.stats
    };

    // Broadcast heartbeat
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(heartbeatData);
      } catch (error) {
        logger.warn('⚠️ Heartbeat broadcast failed:', error);
      }
    }

    // Update local session registry
    this.activeSessions.set(this.sessionId, {
      id: this.sessionId,
      tabId: this.tabId,
      lastHeartbeat: new Date(),
      isActive: true,
      subscriptions: Array.from(this.listeners.keys())
    });
  }

  /**
   * Register this session
   */
  private async registerSession(): Promise<void> {
    const session: SyncSession = {
      id: this.sessionId,
      tabId: this.tabId,
      lastHeartbeat: new Date(),
      isActive: true,
      subscriptions: []
    };

    this.activeSessions.set(this.sessionId, session);
    
    logger.info('📝 Session registered', {
      sessionId: this.sessionId,
      tabId: this.tabId
    });
  }

  /**
   * Update session registry from heartbeat
   */
  private updateSessionRegistry(data: any): void {
    const { sessionId, tabId, timestamp } = data;
    
    this.activeSessions.set(sessionId, {
      id: sessionId,
      tabId: tabId,
      lastHeartbeat: new Date(timestamp),
      isActive: true,
      subscriptions: []
    });

    // Update active sessions count
    this.stats.activeSessions = this.activeSessions.size;
  }

  /**
   * Clean up inactive sessions
   */
  private cleanupInactiveSessions(): void {
    const now = Date.now();
    const timeout = this.options.sessionTimeout;

    for (const [sessionId, session] of this.activeSessions.entries()) {
      if (now - session.lastHeartbeat.getTime() > timeout) {
        this.activeSessions.delete(sessionId);
        logger.debug(`🧹 Cleaned up inactive session: ${sessionId}`);
      }
    }

    this.stats.activeSessions = this.activeSessions.size;
  }

  /**
   * Clean up old updates from queue
   */
  private cleanupUpdateQueue(): void {
    const maxAge = 5 * 60 * 1000; // 5 minutes
    const cutoff = Date.now() - maxAge;

    this.updateQueue = this.updateQueue.filter(update => 
      update.timestamp.getTime() > cutoff
    );
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
          this.stats.errors++;
        }
      });
    }
  }

  /**
   * Determine update type from enrollment data
   */
  private determineUpdateType(enrollment: any): CrossSessionEnrollmentUpdate['type'] {
    if (enrollment.status === 'approved') {
      return 'enrollment_approved';
    } else if (enrollment.status === 'rejected') {
      return 'enrollment_rejected';
    } else if (enrollment.payment_ref || enrollment.proof_of_payment) {
      return 'payment_confirmed';
    } else {
      return 'enrollment_created';
    }
  }

  /**
   * Detect payment type from enrollment data
   */
  private detectPaymentType(enrollment: any): 'card' | 'eft' | 'manual' {
    // Check for card payment indicators
    if (enrollment.payment_ref && 
        (enrollment.payment_ref.toLowerCase().includes('card') ||
         enrollment.payment_ref.toLowerCase().includes('ikhokha') ||
         enrollment.payment_ref.toLowerCase().includes('cc'))) {
      return 'card';
    }

    // Check for EFT payment indicators
    if (enrollment.proof_of_payment || 
        (enrollment.payment_ref && 
         (enrollment.payment_ref.toLowerCase().includes('eft') ||
          enrollment.payment_ref.toLowerCase().includes('transfer') ||
          enrollment.payment_ref.toLowerCase().includes('bank')))) {
      return 'eft';
    }

    return 'manual';
  }

  /**
   * Handle connection errors and retry logic
   */
  private handleConnectionError(error: any): void {
    logger.error('❌ Connection error:', error);
    
    this.isActive = false;
    this.retryCount++;
    this.stats.errors++;
    
    if (this.retryCount <= this.options.maxRetries) {
      const retryDelay = Math.min(1000 * Math.pow(2, this.retryCount), 30000);
      logger.info(`🔄 Retrying connection in ${retryDelay}ms (attempt ${this.retryCount}/${this.options.maxRetries})`);
      
      setTimeout(() => {
        this.initializeSyncMechanisms();
      }, retryDelay);
    } else {
      logger.error('❌ Max retry attempts reached, sync disabled');
      this.emit('connection_failed', { error, retryCount: this.retryCount });
    }
  }

  /**
   * Force sync enrollment status across all sessions
   */
  async forceSyncEnrollmentStatus(
    enrollmentId: string,
    status: 'approved' | 'rejected' | 'pending',
    adminId?: string
  ): Promise<void> {
    logger.info('🔄 Force syncing enrollment status', {
      enrollmentId,
      status,
      adminId
    });

    try {
      // Get enrollment data
      const { data: enrollment, error } = await this.supabaseClient
        .from('enrollments')
        .select('*')
        .eq('id', enrollmentId)
        .single();

      if (error || !enrollment) {
        throw new Error(`Enrollment ${enrollmentId} not found`);
      }

      const update: CrossSessionEnrollmentUpdate = {
        id: `force_sync_${Date.now()}_${enrollmentId}`,
        type: status === 'approved' ? 'enrollment_approved' : 'enrollment_rejected',
        enrollmentId,
        userId: enrollment.user_id,
        courseId: enrollment.course_id,
        status,
        paymentType: this.detectPaymentType(enrollment),
        timestamp: new Date(),
        sessionId: this.sessionId,
        adminId: adminId || 'system',
        metadata: {
          source: 'force_sync',
          enrollment
        }
      };

      await this.processEnrollmentUpdate(update);

    } catch (error) {
      logger.error('❌ Failed to force sync enrollment status:', error);
      throw error;
    }
  }

  /**
   * Get synchronization statistics
   */
  getSyncStats(): SyncStats {
    return {
      ...this.stats,
      uptime: Date.now() - this.stats.uptime,
      activeSessions: this.activeSessions.size
    };
  }

  /**
   * Get active sessions
   */
  getActiveSessions(): SyncSession[] {
    return Array.from(this.activeSessions.values());
  }

  /**
   * Check if sync is healthy
   */
  isSyncHealthy(): boolean {
    const timeSinceLastUpdate = this.stats.lastUpdate 
      ? Date.now() - this.stats.lastUpdate.getTime() 
      : Infinity;
    
    return this.isActive && 
           this.stats.errors < 10 && 
           timeSinceLastUpdate < 60000; // Healthy if updated within last minute
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    logger.info('🧹 Cleaning up CrossSessionEnrollmentSync');
    
    this.isActive = false;
    
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
    
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
    }
    
    window.removeEventListener('storage', this.handleStorageEvent.bind(this));
    
    this.listeners.clear();
    this.activeSessions.clear();
    this.updateQueue.length = 0;
  }
}

// Export singleton instance
export const crossSessionEnrollmentSync = CrossSessionEnrollmentSync.getInstance();