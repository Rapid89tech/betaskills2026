import { crossSessionEnrollmentSync } from './CrossSessionEnrollmentSync';
import { enrollmentSessionManager } from './EnrollmentSessionManager';
import { offlineEnrollmentSync } from './OfflineEnrollmentSync';
import { realTimeEnrollmentService } from './RealTimeEnrollmentService';
import { logger } from '@/utils/logger';

interface SyncIntegrationState {
  isInitialized: boolean;
  userId: string | null;
  isOnline: boolean;
  crossSessionActive: boolean;
  sessionManagerActive: boolean;
  offlineSyncActive: boolean;
  realTimeActive: boolean;
  lastSync: number | null;
}

interface EnrollmentUpdateData {
  courseId: string;
  status: 'pending' | 'approved' | 'rejected';
  paymentStatus?: 'pending' | 'processing' | 'completed' | 'failed';
  courseAccess?: boolean;
  source: 'payment' | 'admin' | 'webhook' | 'manual' | 'realtime';
  metadata?: Record<string, any>;
}

/**
 * Enrollment Synchronization Integration Service
 * Coordinates all enrollment synchronization services for seamless cross-session experience
 */
export class EnrollmentSyncIntegration {
  private static instance: EnrollmentSyncIntegration;
  
  private state: SyncIntegrationState = {
    isInitialized: false,
    userId: null,
    isOnline: navigator.onLine,
    crossSessionActive: false,
    sessionManagerActive: false,
    offlineSyncActive: false,
    realTimeActive: false,
    lastSync: null
  };

  private updateListeners: Set<(data: EnrollmentUpdateData) => void> = new Set();
  private stateListeners: Set<(state: SyncIntegrationState) => void> = new Set();
  
  // Service cleanup functions
  private cleanupFunctions: (() => void)[] = [];

  private constructor() {
    this.setupEventListeners();
  }

  static getInstance(): EnrollmentSyncIntegration {
    if (!EnrollmentSyncIntegration.instance) {
      EnrollmentSyncIntegration.instance = new EnrollmentSyncIntegration();
    }
    return EnrollmentSyncIntegration.instance;
  }

  /**
   * Initialize all synchronization services for a user
   */
  async initializeForUser(userId: string): Promise<void> {
    if (this.state.isInitialized && this.state.userId === userId) {
      return;
    }

    try {
      logger.info(`🚀 Initializing enrollment sync integration for user: ${userId}`);

      // Update state
      this.state.userId = userId;
      this.state.isInitialized = true;

      // Initialize cross-session sync
      crossSessionEnrollmentSync.initializeForUser(userId);
      this.state.crossSessionActive = true;

      // Initialize session manager
      await enrollmentSessionManager.initializeForUser(userId);
      this.state.sessionManagerActive = true;

      // Offline sync is always active
      this.state.offlineSyncActive = true;

      // Set up real-time subscriptions
      this.setupRealTimeSubscriptions(userId);
      this.state.realTimeActive = true;

      // Set up cross-service communication
      this.setupCrossServiceCommunication();

      this.state.lastSync = Date.now();
      this.notifyStateChange();

      logger.info(`✅ Enrollment sync integration initialized successfully`);
    } catch (error) {
      logger.error('Error initializing enrollment sync integration:', error);
      throw error;
    }
  }

  /**
   * Update enrollment status across all services
   */
  async updateEnrollmentStatus(data: EnrollmentUpdateData): Promise<void> {
    if (!this.state.isInitialized || !this.state.userId) {
      throw new Error('Sync integration not initialized');
    }

    try {
      logger.info(`🔄 Updating enrollment status: ${data.courseId} -> ${data.status} (source: ${data.source})`);

      // Update through cross-session sync
      if (this.state.crossSessionActive) {
        await crossSessionEnrollmentSync.syncEnrollmentStatus({
          userId: this.state.userId,
          courseId: data.courseId,
          status: data.status,
          paymentStatus: data.paymentStatus,
          timestamp: Date.now(),
          source: data.source
        });
      }

      // Update through session manager
      if (this.state.sessionManagerActive) {
        await enrollmentSessionManager.updateEnrollmentInSession(
          data.courseId,
          data.status,
          data.paymentStatus
        );
      }

      // Queue for offline sync if needed
      if (!this.state.isOnline) {
        offlineEnrollmentSync.queueEnrollmentAction(
          'enrollment_update',
          this.state.userId,
          data.courseId,
          {
            status: data.status,
            paymentStatus: data.paymentStatus,
            courseAccess: data.courseAccess,
            metadata: data.metadata
          },
          data.source === 'payment' ? 'high' : 'medium'
        );
      }

      // Update payment status separately if provided
      if (data.paymentStatus && !this.state.isOnline) {
        offlineEnrollmentSync.queueEnrollmentAction(
          'payment_status_update',
          this.state.userId,
          data.courseId,
          { paymentStatus: data.paymentStatus },
          'high'
        );
      }

      // Update course access if provided
      if (data.courseAccess !== undefined && !this.state.isOnline) {
        offlineEnrollmentSync.queueEnrollmentAction(
          'course_access_update',
          this.state.userId,
          data.courseId,
          { courseAccess: data.courseAccess },
          'high'
        );
      }

      this.state.lastSync = Date.now();
      this.notifyUpdateListeners(data);
      this.notifyStateChange();

      logger.info(`✅ Enrollment status updated successfully across all services`);
    } catch (error) {
      logger.error('Error updating enrollment status:', error);
      throw error;
    }
  }

  /**
   * Get enrollment status from the most reliable source
   */
  getEnrollmentStatus(courseId: string): {
    status: 'pending' | 'approved' | 'rejected' | null;
    paymentStatus?: 'pending' | 'processing' | 'completed' | 'failed';
    courseAccess?: boolean;
    lastUpdated?: number;
    source: string;
  } | null {
    if (!this.state.userId) return null;

    // Try cross-session sync first (most up-to-date)
    const crossSessionStatus = crossSessionEnrollmentSync.getEnrollmentStatus(this.state.userId, courseId);
    if (crossSessionStatus) {
      return {
        status: crossSessionStatus.status,
        paymentStatus: crossSessionStatus.paymentStatus,
        lastUpdated: crossSessionStatus.timestamp,
        source: 'cross-session'
      };
    }

    // Try session manager
    const sessionStatus = enrollmentSessionManager.getEnrollmentFromSession(courseId);
    if (sessionStatus) {
      return {
        status: sessionStatus.status,
        paymentStatus: sessionStatus.paymentStatus,
        lastUpdated: sessionStatus.lastUpdated,
        source: 'session'
      };
    }

    return null;
  }

  /**
   * Subscribe to enrollment updates from all sources
   */
  subscribeToEnrollmentUpdates(callback: (data: EnrollmentUpdateData) => void): () => void {
    this.updateListeners.add(callback);
    
    return () => {
      this.updateListeners.delete(callback);
    };
  }

  /**
   * Subscribe to sync integration state changes
   */
  subscribeToStateChanges(callback: (state: SyncIntegrationState) => void): () => void {
    this.stateListeners.add(callback);
    
    return () => {
      this.stateListeners.delete(callback);
    };
  }

  /**
   * Get current sync integration state
   */
  getState(): SyncIntegrationState {
    return { ...this.state };
  }

  /**
   * Handle online status change
   */
  async handleOnline(): Promise<void> {
    this.state.isOnline = true;
    this.notifyStateChange();

    // Notify all services
    await crossSessionEnrollmentSync.handleOnline();
    offlineEnrollmentSync.handleOnline();

    logger.info('🌐 All sync services notified of online status');
  }

  /**
   * Handle offline status change
   */
  handleOffline(): void {
    this.state.isOnline = false;
    this.notifyStateChange();

    // Notify all services
    crossSessionEnrollmentSync.handleOffline();
    offlineEnrollmentSync.handleOffline();

    logger.info('📴 All sync services notified of offline status');
  }

  /**
   * Force sync across all services
   */
  async forceSyncAll(): Promise<void> {
    if (!this.state.isOnline) {
      throw new Error('Cannot force sync while offline');
    }

    try {
      logger.info('🔄 Forcing sync across all services');

      // Force sync offline queue
      await offlineEnrollmentSync.forceSyncNow();

      // Force sync with server
      await crossSessionEnrollmentSync.handleOnline();

      // Sync with other sessions
      await enrollmentSessionManager.syncWithOtherSessions();

      this.state.lastSync = Date.now();
      this.notifyStateChange();

      logger.info('✅ Forced sync completed successfully');
    } catch (error) {
      logger.error('Error during forced sync:', error);
      throw error;
    }
  }

  /**
   * Get sync health status
   */
  getSyncHealth(): {
    overall: 'healthy' | 'warning' | 'error';
    services: {
      crossSession: 'active' | 'inactive' | 'error';
      sessionManager: 'active' | 'inactive' | 'error';
      offlineSync: 'active' | 'inactive' | 'error';
      realTime: 'active' | 'inactive' | 'error';
    };
    details: {
      queuedActions: number;
      lastSync: number | null;
      isOnline: boolean;
    };
  } {
    const offlineSyncState = offlineEnrollmentSync.getSyncState();
    
    const services = {
      crossSession: this.state.crossSessionActive ? 'active' : 'inactive',
      sessionManager: this.state.sessionManagerActive ? 'active' : 'inactive',
      offlineSync: this.state.offlineSyncActive ? 'active' : 'inactive',
      realTime: this.state.realTimeActive ? 'active' : 'inactive'
    } as const;

    const hasErrors = Object.values(services).includes('error');
    const hasInactive = Object.values(services).includes('inactive');
    
    const overall = hasErrors ? 'error' : hasInactive ? 'warning' : 'healthy';

    return {
      overall,
      services,
      details: {
        queuedActions: offlineSyncState.queueSize,
        lastSync: this.state.lastSync,
        isOnline: this.state.isOnline
      }
    };
  }

  /**
   * Clean up all services
   */
  cleanup(): void {
    logger.info('🧹 Cleaning up enrollment sync integration');

    // Clean up all services
    crossSessionEnrollmentSync.cleanup();
    enrollmentSessionManager.cleanup();
    offlineEnrollmentSync.cleanup();
    realTimeEnrollmentService.cleanup();

    // Run cleanup functions
    this.cleanupFunctions.forEach(cleanup => {
      try {
        cleanup();
      } catch (error) {
        logger.error('Error in cleanup function:', error);
      }
    });

    // Clear listeners
    this.updateListeners.clear();
    this.stateListeners.clear();
    this.cleanupFunctions = [];

    // Reset state
    this.state = {
      isInitialized: false,
      userId: null,
      isOnline: navigator.onLine,
      crossSessionActive: false,
      sessionManagerActive: false,
      offlineSyncActive: false,
      realTimeActive: false,
      lastSync: null
    };

    logger.info('✅ Enrollment sync integration cleaned up');
  }

  // Private methods

  private setupRealTimeSubscriptions(userId: string): void {
    // Subscribe to user-specific enrollment updates
    const unsubscribeUser = realTimeEnrollmentService.subscribeToUserEnrollments(
      userId,
      (enrollment) => {
        this.handleRealTimeUpdate(enrollment, 'realtime');
      }
    );

    this.cleanupFunctions.push(unsubscribeUser);

    // Subscribe to general enrollment updates
    const unsubscribeGeneral = realTimeEnrollmentService.subscribeToEnrollments(
      (enrollment) => {
        if (enrollment.user_id === userId) {
          this.handleRealTimeUpdate(enrollment, 'realtime');
        }
      }
    );

    this.cleanupFunctions.push(unsubscribeGeneral);
  }

  private setupCrossServiceCommunication(): void {
    // Subscribe to cross-session updates
    const unsubscribeCrossSession = crossSessionEnrollmentSync.subscribeToUpdates((data) => {
      this.handleCrossSessionUpdate(data);
    });

    this.cleanupFunctions.push(unsubscribeCrossSession);

    // Subscribe to session manager updates
    const unsubscribeSession = enrollmentSessionManager.subscribeToSessionChanges((state) => {
      this.handleSessionStateUpdate(state);
    });

    this.cleanupFunctions.push(unsubscribeSession);

    // Subscribe to offline sync state changes
    const unsubscribeOffline = offlineEnrollmentSync.subscribeToSyncState((state) => {
      this.handleOfflineSyncStateUpdate(state);
    });

    this.cleanupFunctions.push(unsubscribeOffline);
  }

  private handleRealTimeUpdate(enrollment: any, source: string): void {
    const updateData: EnrollmentUpdateData = {
      courseId: enrollment.course_id,
      status: enrollment.status,
      paymentStatus: enrollment.payment_status,
      courseAccess: enrollment.course_access_granted,
      source: source as any,
      metadata: {
        enrollmentId: enrollment.id,
        updatedAt: enrollment.updated_at
      }
    };

    this.notifyUpdateListeners(updateData);
  }

  private handleCrossSessionUpdate(data: any): void {
    const updateData: EnrollmentUpdateData = {
      courseId: data.courseId,
      status: data.status,
      paymentStatus: data.paymentStatus,
      source: data.source,
      metadata: {
        timestamp: data.timestamp
      }
    };

    this.notifyUpdateListeners(updateData);
  }

  private handleSessionStateUpdate(state: any): void {
    // Update integration state based on session state
    this.state.lastSync = Date.now();
    this.notifyStateChange();
  }

  private handleOfflineSyncStateUpdate(state: any): void {
    // Update integration state based on offline sync state
    this.notifyStateChange();
  }

  private notifyUpdateListeners(data: EnrollmentUpdateData): void {
    this.updateListeners.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        logger.error('Error in update listener:', error);
      }
    });
  }

  private notifyStateChange(): void {
    this.stateListeners.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        logger.error('Error in state listener:', error);
      }
    });
  }

  private setupEventListeners(): void {
    // Online/offline listeners
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());

    // Page visibility listener
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.forceSyncAll().catch(error => {
          logger.error('Error during visibility sync:', error);
        });
      }
    });

    // Beforeunload listener
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }
}

export const enrollmentSyncIntegration = EnrollmentSyncIntegration.getInstance();