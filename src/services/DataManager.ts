import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

export interface EnrollmentData {
  id: string;
  user_id: string;
  user_email?: string;
  course_id: string;
  course_title?: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  approved_at?: string;
  updated_at: string;
  progress: number;
  
  // Sync metadata for conflict resolution
  last_synced?: string;
  sync_version?: number;
  conflict_resolution?: 'local' | 'remote' | 'merged';
}

export interface DataOperation {
  type: 'create' | 'update' | 'delete';
  table: 'enrollments';
  data: any;
  timestamp: string;
  id: string;
}

/**
 * Unified Data Management Layer for Enrollments
 * 
 * Provides a single source of truth for enrollment data with:
 * - Conflict resolution using timestamp-based last-write-wins
 * - Cross-tab synchronization via BroadcastChannel
 * - Offline operation queuing with automatic sync
 * - localStorage event listeners for cross-tab consistency
 * - Enhanced real-time data updates
 */
export class DataManager {
  private static instance: DataManager;
  private broadcastChannel: BroadcastChannel;
  private offlineQueue: DataOperation[] = [];
  private isOnline: boolean = navigator.onLine;
  private syncInProgress: boolean = false;
  private syncRetryCount: number = 0;
  private maxRetryAttempts: number = 3;
  private retryDelay: number = 1000; // Start with 1 second
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private crossTabListeners: Map<string, (data: any) => void> = new Map();

  private constructor() {
    this.broadcastChannel = new BroadcastChannel('enrollment-sync');
    this.setupEventListeners();
    this.loadOfflineQueue();
    this.startHeartbeat();
    this.setupCrossTabSynchronization();
  }

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  private setupEventListeners(): void {
    // Enhanced online/offline event handling
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncRetryCount = 0; // Reset retry count when back online
      logger.info('Connection restored - processing offline queue');
      this.processOfflineQueue();
      this.broadcastConnectionStatus(true);
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      logger.info('Connection lost - entering offline mode');
      this.broadcastConnectionStatus(false);
    });

    // Enhanced cross-tab updates via BroadcastChannel
    this.broadcastChannel.addEventListener('message', (event) => {
      this.handleCrossTabUpdate(event.data);
    });

    // Enhanced localStorage event listeners for cross-tab consistency
    window.addEventListener('storage', (event) => {
      this.handleStorageEvent(event);
    });

    // Listen for page visibility changes to sync when tab becomes active
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isOnline) {
        this.syncEnrollments().catch(error => 
          logger.error('Failed to sync on visibility change:', error)
        );
      }
    });

    // Listen for beforeunload to ensure offline queue is saved
    window.addEventListener('beforeunload', () => {
      this.saveOfflineQueue();
    });
  }

  private loadOfflineQueue(): void {
    try {
      const queueData = localStorage.getItem('enrollment-offline-queue');
      if (queueData) {
        this.offlineQueue = JSON.parse(queueData);
        logger.info(`Loaded ${this.offlineQueue.length} operations from offline queue`);
      }
    } catch (error) {
      logger.error('Failed to load offline queue:', error);
      this.offlineQueue = [];
    }
  }

  private saveOfflineQueue(): void {
    try {
      localStorage.setItem('enrollment-offline-queue', JSON.stringify(this.offlineQueue));
    } catch (error) {
      logger.error('Failed to save offline queue:', error);
    }
  }

  /**
   * Get enrollments for a specific user with conflict resolution
   */
  async getEnrollments(userId: string): Promise<EnrollmentData[]> {
    try {
      // Get local data
      const localData = this.getLocalEnrollments(userId);
      
      // If offline, return local data only
      if (!this.isOnline) {
        logger.info('Offline mode: returning local enrollments only');
        return localData;
      }

      // Get remote data
      const remoteData = await this.getRemoteEnrollments(userId);
      
      // Resolve conflicts and merge data
      const mergedData = this.resolveConflicts(localData, remoteData);
      
      // Update local storage with merged data
      this.updateLocalEnrollments(userId, mergedData);
      
      return mergedData;
    } catch (error) {
      logger.error('Failed to get enrollments:', error);
      // Fallback to local data
      return this.getLocalEnrollments(userId);
    }
  }

  /**
   * Update enrollment with enhanced conflict resolution and cross-tab sync
   */
  async updateEnrollment(enrollment: EnrollmentData): Promise<void> {
    const timestamp = new Date().toISOString();
    const updatedEnrollment = {
      ...enrollment,
      updated_at: timestamp,
      sync_version: (enrollment.sync_version || 0) + 1
    };

    // Update local storage immediately
    this.updateLocalEnrollment(updatedEnrollment);

    // Enhanced cross-tab broadcasting
    this.broadcastUpdate({
      type: 'enrollment-updated',
      enrollment: updatedEnrollment,
      timestamp,
      operation: 'update'
    });

    // If online, sync to remote
    if (this.isOnline) {
      try {
        await this.syncEnrollmentToRemote(updatedEnrollment);
        logger.info(`Successfully synced enrollment update to remote: ${updatedEnrollment.id}`);
      } catch (error) {
        logger.error('Failed to sync enrollment to remote:', error);
        // Queue for later sync with enhanced metadata
        this.queueOperation({
          type: 'update',
          table: 'enrollments',
          data: updatedEnrollment,
          timestamp,
          id: updatedEnrollment.id
        });
      }
    } else {
      // Queue for later sync when online
      logger.info(`Offline: queuing enrollment update for later sync: ${updatedEnrollment.id}`);
      this.queueOperation({
        type: 'update',
        table: 'enrollments',
        data: updatedEnrollment,
        timestamp,
        id: updatedEnrollment.id
      });
    }
  }

  /**
   * Create enrollment with enhanced cross-tab sync
   */
  async createEnrollment(enrollment: EnrollmentData): Promise<void> {
    const timestamp = new Date().toISOString();
    const newEnrollment = {
      ...enrollment,
      enrolled_at: enrollment.enrolled_at || timestamp,
      updated_at: timestamp,
      sync_version: 1
    };

    // Update local storage immediately
    this.updateLocalEnrollment(newEnrollment);

    // Enhanced cross-tab broadcasting
    this.broadcastUpdate({
      type: 'enrollment-created',
      enrollment: newEnrollment,
      timestamp,
      operation: 'create'
    });

    // If online, sync to remote
    if (this.isOnline) {
      try {
        await this.syncEnrollmentToRemote(newEnrollment);
        logger.info(`Successfully synced new enrollment to remote: ${newEnrollment.id}`);
      } catch (error) {
        logger.error('Failed to sync new enrollment to remote:', error);
        // Queue for later sync
        this.queueOperation({
          type: 'create',
          table: 'enrollments',
          data: newEnrollment,
          timestamp,
          id: newEnrollment.id
        });
      }
    } else {
      // Queue for later sync when online
      logger.info(`Offline: queuing new enrollment for later sync: ${newEnrollment.id}`);
      this.queueOperation({
        type: 'create',
        table: 'enrollments',
        data: newEnrollment,
        timestamp,
        id: newEnrollment.id
      });
    }
  }

  /**
   * Delete enrollment with enhanced cross-tab sync
   */
  async deleteEnrollment(enrollmentId: string): Promise<void> {
    const timestamp = new Date().toISOString();

    // Remove from local storage immediately
    this.removeLocalEnrollment(enrollmentId);

    // Enhanced cross-tab broadcasting
    this.broadcastUpdate({
      type: 'enrollment-deleted',
      enrollmentId,
      timestamp,
      operation: 'delete'
    });

    // If online, sync to remote
    if (this.isOnline) {
      try {
        const { error } = await supabase
          .from('enrollments')
          .delete()
          .eq('id', enrollmentId);

        if (error) throw error;
        
        logger.info(`Successfully deleted enrollment from remote: ${enrollmentId}`);
      } catch (error) {
        logger.error('Failed to delete enrollment from remote:', error);
        // Queue for later sync
        this.queueOperation({
          type: 'delete',
          table: 'enrollments',
          data: { id: enrollmentId },
          timestamp,
          id: enrollmentId
        });
      }
    } else {
      // Queue for later sync when online
      logger.info(`Offline: queuing enrollment deletion for later sync: ${enrollmentId}`);
      this.queueOperation({
        type: 'delete',
        table: 'enrollments',
        data: { id: enrollmentId },
        timestamp,
        id: enrollmentId
      });
    }
  }

  /**
   * Sync all enrollment data between local and remote
   */
  async syncEnrollments(): Promise<void> {
    if (this.syncInProgress || !this.isOnline) {
      return;
    }

    this.syncInProgress = true;
    logger.info('Starting enrollment synchronization...');

    try {
      // Process offline queue first
      await this.processOfflineQueue();

      // Get all local enrollments
      const allLocalEnrollments = this.getAllLocalEnrollments();
      
      // Get all remote enrollments for comparison
      const allRemoteEnrollments = await this.getAllRemoteEnrollments();

      // Resolve conflicts for each user's data
      const userIds = new Set([
        ...allLocalEnrollments.map(e => e.user_id),
        ...allRemoteEnrollments.map(e => e.user_id)
      ]);

      for (const userId of userIds) {
        const localUserEnrollments = allLocalEnrollments.filter(e => e.user_id === userId);
        const remoteUserEnrollments = allRemoteEnrollments.filter(e => e.user_id === userId);
        
        const mergedEnrollments = this.resolveConflicts(localUserEnrollments, remoteUserEnrollments);
        
        // Update local storage
        this.updateLocalEnrollments(userId, mergedEnrollments);
        
        // Sync any local changes to remote
        for (const enrollment of mergedEnrollments) {
          if (enrollment.conflict_resolution === 'local') {
            await this.syncEnrollmentToRemote(enrollment);
          }
        }
      }

      logger.info('Enrollment synchronization completed successfully');
    } catch (error) {
      logger.error('Failed to sync enrollments:', error);
    } finally {
      this.syncInProgress = false;
    }
  }

  /**
   * Resolve conflicts between local and remote data using timestamp-based last-write-wins
   */
  resolveConflicts(localData: EnrollmentData[], remoteData: EnrollmentData[]): EnrollmentData[] {
    const merged = new Map<string, EnrollmentData>();

    // Add all remote data first
    remoteData.forEach(enrollment => {
      merged.set(enrollment.id, {
        ...enrollment,
        conflict_resolution: 'remote'
      });
    });

    // Process local data and resolve conflicts
    localData.forEach(localEnrollment => {
      const remoteEnrollment = merged.get(localEnrollment.id);
      
      if (!remoteEnrollment) {
        // Local-only enrollment
        merged.set(localEnrollment.id, {
          ...localEnrollment,
          conflict_resolution: 'local'
        });
      } else {
        // Conflict resolution using timestamp-based last-write-wins
        const localTimestamp = new Date(localEnrollment.updated_at || localEnrollment.enrolled_at);
        const remoteTimestamp = new Date(remoteEnrollment.updated_at || remoteEnrollment.enrolled_at);
        
        if (localTimestamp > remoteTimestamp) {
          // Local data is newer
          merged.set(localEnrollment.id, {
            ...localEnrollment,
            conflict_resolution: 'local'
          });
        } else if (localTimestamp < remoteTimestamp) {
          // Remote data is newer (already in map)
          merged.set(remoteEnrollment.id, {
            ...remoteEnrollment,
            conflict_resolution: 'remote'
          });
        } else {
          // Same timestamp, merge with preference to higher sync version
          const localVersion = localEnrollment.sync_version || 0;
          const remoteVersion = remoteEnrollment.sync_version || 0;
          
          if (localVersion > remoteVersion) {
            merged.set(localEnrollment.id, {
              ...localEnrollment,
              conflict_resolution: 'local'
            });
          } else {
            merged.set(remoteEnrollment.id, {
              ...remoteEnrollment,
              conflict_resolution: 'remote'
            });
          }
        }
      }
    });

    return Array.from(merged.values());
  }

  private getLocalEnrollments(userId: string): EnrollmentData[] {
    try {
      // Try user-specific cache first
      const userCacheKey = `user-enrollments-${userId}`;
      const userCache = localStorage.getItem(userCacheKey);
      
      if (userCache) {
        const parsed = JSON.parse(userCache);
        return this.normalizeEnrollments(parsed);
      }

      // Fallback to global enrollments
      const globalEnrollments = localStorage.getItem('enrollments');
      if (globalEnrollments) {
        const parsed = JSON.parse(globalEnrollments);
        return this.normalizeEnrollments(parsed.filter((e: any) => e.user_id === userId));
      }

      return [];
    } catch (error) {
      logger.error('Failed to get local enrollments:', error);
      return [];
    }
  }

  private getAllLocalEnrollments(): EnrollmentData[] {
    try {
      const globalEnrollments = localStorage.getItem('enrollments');
      if (globalEnrollments) {
        const parsed = JSON.parse(globalEnrollments);
        return this.normalizeEnrollments(parsed);
      }
      return [];
    } catch (error) {
      logger.error('Failed to get all local enrollments:', error);
      return [];
    }
  }

  private async getRemoteEnrollments(userId: string): Promise<EnrollmentData[]> {
    const fetchFromTable = async (table: string): Promise<any[]> => {
      try {
        // Query by user_id OR user_email to handle both cases
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .or(`user_id.eq.${userId},user_email.eq.${userId}`)
          .order('updated_at', { ascending: false });

        if (!error) {
          return data || [];
        }

        // Fallback: try separate queries if OR fails
        logger.warn('OR query failed, trying separate queries:', { table, error });

        const [byIdResp, byEmailResp] = await Promise.all([
          supabase.from(table).select('*').eq('user_id', userId),
          supabase.from(table).select('*').eq('user_email', userId),
        ]);

        const merged = [...(byIdResp.data || []), ...(byEmailResp.data || [])];
        const unique = merged.filter((e, i, arr) => arr.findIndex(x => x.id === e.id) === i);
        return unique;
      } catch (err) {
        logger.warn('Failed to fetch remote enrollments:', { table, err });
        return [];
      }
    };

    const [lowerRows, upperRows] = await Promise.all([
      fetchFromTable('enrollments'),
      fetchFromTable('Enrollment'),
    ]);

    const byId: Record<string, any> = {};
    const all = [...(lowerRows || []), ...(upperRows || [])];
    for (const row of all) {
      const id = String(row?.id || '');
      if (!id) continue;
      const prev = byId[id];
      if (!prev) {
        byId[id] = row;
        continue;
      }
      const prevTime = Date.parse(String(prev.updated_at || prev.enrolled_at || ''));
      const nextTime = Date.parse(String(row.updated_at || row.enrolled_at || ''));
      if ((Number.isFinite(nextTime) ? nextTime : 0) >= (Number.isFinite(prevTime) ? prevTime : 0)) {
        byId[id] = row;
      }
    }

    return this.normalizeEnrollments(Object.values(byId));
  }

  private async getAllRemoteEnrollments(): Promise<EnrollmentData[]> {
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    return this.normalizeEnrollments(data || []);
  }

  private normalizeEnrollments(enrollments: any[]): EnrollmentData[] {
    return enrollments.map((enrollment) => {
      const rawStatus = String(enrollment.status || 'pending');
      const s = rawStatus.toLowerCase();
      const normalizedStatus = s.includes('approved')
        ? 'approved'
        : (s.includes('reject') ? 'rejected' : (s.includes('pending') ? 'pending' : 'pending'));

      return {
        id: enrollment.id || `enrollment_${Date.now()}_${Math.random()}`,
        user_id: enrollment.user_id || enrollment.userId,
        user_email: enrollment.user_email,
        course_id: enrollment.course_id || enrollment.courseId,
        course_title: enrollment.course_title,
        status: normalizedStatus as any,
        enrolled_at: enrollment.enrolled_at || enrollment.enrollment_date || new Date().toISOString(),
        approved_at: enrollment.approved_at,
        updated_at: enrollment.updated_at || enrollment.enrolled_at || new Date().toISOString(),
        progress: enrollment.progress || 0,
        last_synced: enrollment.last_synced,
        sync_version: enrollment.sync_version || 1,
        conflict_resolution: enrollment.conflict_resolution,
      };
    });
  }

  private updateLocalEnrollments(userId: string, enrollments: EnrollmentData[]): void {
    try {
      // Update user-specific cache
      const userCacheKey = `user-enrollments-${userId}`;
      localStorage.setItem(userCacheKey, JSON.stringify(enrollments));
      localStorage.setItem(`${userCacheKey}-timestamp`, Date.now().toString());

      // Update global enrollments
      const allEnrollments = this.getAllLocalEnrollments();
      const otherUserEnrollments = allEnrollments.filter(e => e.user_id !== userId);
      const updatedAllEnrollments = [...otherUserEnrollments, ...enrollments];
      
      localStorage.setItem('enrollments', JSON.stringify(updatedAllEnrollments));
      
      logger.info(`Updated local enrollments for user ${userId}: ${enrollments.length} enrollments`);
    } catch (error) {
      logger.error('Failed to update local enrollments:', error);
    }
  }

  private updateLocalEnrollment(enrollment: EnrollmentData): void {
    try {
      // Update in user-specific cache
      const userCacheKey = `user-enrollments-${enrollment.user_id}`;
      const userEnrollments = this.getLocalEnrollments(enrollment.user_id);
      const updatedUserEnrollments = userEnrollments.map(e => 
        e.id === enrollment.id ? enrollment : e
      );
      
      // Add if not found
      if (!userEnrollments.find(e => e.id === enrollment.id)) {
        updatedUserEnrollments.push(enrollment);
      }
      
      localStorage.setItem(userCacheKey, JSON.stringify(updatedUserEnrollments));
      localStorage.setItem(`${userCacheKey}-timestamp`, Date.now().toString());

      // Update global enrollments
      const allEnrollments = this.getAllLocalEnrollments();
      const updatedAllEnrollments = allEnrollments.map(e => 
        e.id === enrollment.id ? enrollment : e
      );
      
      // Add if not found
      if (!allEnrollments.find(e => e.id === enrollment.id)) {
        updatedAllEnrollments.push(enrollment);
      }
      
      localStorage.setItem('enrollments', JSON.stringify(updatedAllEnrollments));
      
      logger.info(`Updated local enrollment: ${enrollment.id}`);
    } catch (error) {
      logger.error('Failed to update local enrollment:', error);
    }
  }

  private async syncEnrollmentToRemote(enrollment: EnrollmentData): Promise<void> {
    const { error } = await supabase
      .from('enrollments')
      .upsert({
        id: enrollment.id,
        user_id: enrollment.user_id,
        user_email: enrollment.user_email,
        course_id: enrollment.course_id,
        course_title: enrollment.course_title,
        status: enrollment.status,
        enrolled_at: enrollment.enrolled_at,
        approved_at: enrollment.approved_at,
        updated_at: enrollment.updated_at,
        progress: enrollment.progress
      });

    if (error) {
      throw error;
    }

    // Update sync metadata
    enrollment.last_synced = new Date().toISOString();
    this.updateLocalEnrollment(enrollment);
  }

  private queueOperation(operation: DataOperation): void {
    this.offlineQueue.push(operation);
    this.saveOfflineQueue();
    logger.info(`Queued operation: ${operation.type} ${operation.table} ${operation.id}`);
  }





  /**
   * Enhanced cross-tab synchronization setup
   */
  private setupCrossTabSynchronization(): void {
    // Register for different types of cross-tab events
    this.registerCrossTabListener('enrollment-created', (data) => {
      this.handleRemoteEnrollmentCreated(data);
    });

    this.registerCrossTabListener('enrollment-updated', (data) => {
      this.handleRemoteEnrollmentUpdated(data);
    });

    this.registerCrossTabListener('enrollment-deleted', (data) => {
      this.handleRemoteEnrollmentDeleted(data);
    });

    this.registerCrossTabListener('sync-request', (data) => {
      this.handleSyncRequest(data);
    });

    this.registerCrossTabListener('connection-status', (data) => {
      this.handleConnectionStatusUpdate(data);
    });
  }

  /**
   * Register a cross-tab listener for specific event types
   */
  private registerCrossTabListener(eventType: string, handler: (data: any) => void): void {
    this.crossTabListeners.set(eventType, handler);
  }

  /**
   * Start heartbeat to maintain cross-tab coordination
   */
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.broadcastHeartbeat();
    }, 30000); // Send heartbeat every 30 seconds
  }

  /**
   * Broadcast heartbeat to other tabs
   */
  private broadcastHeartbeat(): void {
    this.broadcastUpdate({
      type: 'heartbeat',
      tabId: this.getTabId(),
      timestamp: new Date().toISOString(),
      isOnline: this.isOnline,
      queueLength: this.offlineQueue.length
    });
  }

  /**
   * Get unique tab identifier
   */
  private getTabId(): string {
    let tabId = sessionStorage.getItem('tab-id');
    if (!tabId) {
      tabId = `tab_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      sessionStorage.setItem('tab-id', tabId);
    }
    return tabId;
  }

  /**
   * Enhanced storage event handling for cross-tab consistency
   */
  private handleStorageEvent(event: StorageEvent): void {
    if (!event.key || !event.newValue) return;

    // Handle different storage keys
    switch (event.key) {
      case 'enrollments':
        this.handleGlobalEnrollmentsUpdate(event.newValue);
        break;
      
      case 'enrollment-offline-queue':
        this.handleOfflineQueueUpdate(event.newValue);
        break;
      
      default:
        // Handle user-specific enrollment caches
        if (event.key.startsWith('user-enrollments-')) {
          this.handleUserEnrollmentsUpdate(event.key, event.newValue);
        }
        break;
    }
  }

  /**
   * Handle global enrollments update from another tab
   */
  private handleGlobalEnrollmentsUpdate(newValue: string): void {
    try {
      const enrollments = JSON.parse(newValue);
      logger.info(`Received global enrollments update from another tab: ${enrollments.length} enrollments`);
      
      // Dispatch event for components to react
      window.dispatchEvent(new CustomEvent('enrollment-storage-update', {
        detail: { 
          enrollments,
          source: 'cross-tab',
          timestamp: new Date().toISOString()
        }
      }));
    } catch (error) {
      logger.error('Failed to handle global enrollments update:', error);
    }
  }

  /**
   * Handle user-specific enrollments update from another tab
   */
  private handleUserEnrollmentsUpdate(key: string, newValue: string): void {
    try {
      const userId = key.replace('user-enrollments-', '');
      const enrollments = JSON.parse(newValue);
      
      logger.info(`Received user enrollments update for ${userId} from another tab: ${enrollments.length} enrollments`);
      
      // Dispatch event for components to react
      window.dispatchEvent(new CustomEvent('user-enrollment-storage-update', {
        detail: { 
          userId,
          enrollments,
          source: 'cross-tab',
          timestamp: new Date().toISOString()
        }
      }));
    } catch (error) {
      logger.error('Failed to handle user enrollments update:', error);
    }
  }

  /**
   * Handle offline queue update from another tab
   */
  private handleOfflineQueueUpdate(newValue: string): void {
    try {
      const queue = JSON.parse(newValue);
      logger.info(`Received offline queue update from another tab: ${queue.length} operations`);
      
      // Merge with local queue (avoid duplicates)
      const existingIds = new Set(this.offlineQueue.map(op => op.id));
      const newOperations = queue.filter((op: DataOperation) => !existingIds.has(op.id));
      
      if (newOperations.length > 0) {
        this.offlineQueue.push(...newOperations);
        logger.info(`Added ${newOperations.length} new operations to local queue`);
      }
    } catch (error) {
      logger.error('Failed to handle offline queue update:', error);
    }
  }

  /**
   * Enhanced cross-tab update handling
   */
  private handleCrossTabUpdate(data: any): void {
    const handler = this.crossTabListeners.get(data.type);
    if (handler) {
      handler(data);
    } else {
      // Fallback to legacy handling
      this.handleLegacyCrossTabUpdate(data);
    }
  }

  /**
   * Legacy cross-tab update handling for backward compatibility
   */
  private handleLegacyCrossTabUpdate(data: any): void {
    if (data.type === 'enrollment-updated') {
      this.updateLocalEnrollment(data.data);
      
      window.dispatchEvent(new CustomEvent('enrollment-cross-tab-update', {
        detail: data
      }));
    }
  }

  /**
   * Handle remote enrollment creation from another tab
   */
  private handleRemoteEnrollmentCreated(data: any): void {
    logger.info('Received enrollment creation from another tab:', data.enrollment?.id);
    
    if (data.enrollment) {
      this.updateLocalEnrollment(data.enrollment);
      
      window.dispatchEvent(new CustomEvent('enrollment-created-cross-tab', {
        detail: {
          enrollment: data.enrollment,
          source: 'cross-tab',
          timestamp: data.timestamp
        }
      }));
    }
  }

  /**
   * Handle remote enrollment update from another tab
   */
  private handleRemoteEnrollmentUpdated(data: any): void {
    logger.info('Received enrollment update from another tab:', data.enrollment?.id);
    
    if (data.enrollment) {
      this.updateLocalEnrollment(data.enrollment);
      
      window.dispatchEvent(new CustomEvent('enrollment-updated-cross-tab', {
        detail: {
          enrollment: data.enrollment,
          source: 'cross-tab',
          timestamp: data.timestamp
        }
      }));
    }
  }

  /**
   * Handle remote enrollment deletion from another tab
   */
  private handleRemoteEnrollmentDeleted(data: any): void {
    logger.info('Received enrollment deletion from another tab:', data.enrollmentId);
    
    if (data.enrollmentId) {
      this.removeLocalEnrollment(data.enrollmentId);
      
      window.dispatchEvent(new CustomEvent('enrollment-deleted-cross-tab', {
        detail: {
          enrollmentId: data.enrollmentId,
          source: 'cross-tab',
          timestamp: data.timestamp
        }
      }));
    }
  }

  /**
   * Handle sync request from another tab
   */
  private handleSyncRequest(data: any): void {
    logger.info('Received sync request from another tab');
    
    if (this.isOnline && !this.syncInProgress) {
      this.syncEnrollments().catch(error => 
        logger.error('Failed to sync on cross-tab request:', error)
      );
    }
  }

  /**
   * Handle connection status update from another tab
   */
  private handleConnectionStatusUpdate(data: any): void {
    logger.info(`Received connection status update from another tab: ${data.isOnline ? 'online' : 'offline'}`);
    
    // If another tab went online and we have queued operations, try to sync
    if (data.isOnline && this.offlineQueue.length > 0 && this.isOnline) {
      setTimeout(() => {
        this.processOfflineQueue();
      }, 1000); // Small delay to avoid conflicts
    }
  }

  /**
   * Broadcast connection status to other tabs
   */
  private broadcastConnectionStatus(isOnline: boolean): void {
    this.broadcastUpdate({
      type: 'connection-status',
      isOnline,
      tabId: this.getTabId(),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Remove enrollment from local storage
   */
  private removeLocalEnrollment(enrollmentId: string): void {
    try {
      // Remove from global enrollments
      const allEnrollments = this.getAllLocalEnrollments();
      const updatedEnrollments = allEnrollments.filter(e => e.id !== enrollmentId);
      localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));

      // Remove from user-specific caches
      const enrollment = allEnrollments.find(e => e.id === enrollmentId);
      if (enrollment) {
        const userCacheKey = `user-enrollments-${enrollment.user_id}`;
        const userEnrollments = this.getLocalEnrollments(enrollment.user_id);
        const updatedUserEnrollments = userEnrollments.filter(e => e.id !== enrollmentId);
        localStorage.setItem(userCacheKey, JSON.stringify(updatedUserEnrollments));
        localStorage.setItem(`${userCacheKey}-timestamp`, Date.now().toString());
      }

      logger.info(`Removed local enrollment: ${enrollmentId}`);
    } catch (error) {
      logger.error('Failed to remove local enrollment:', error);
    }
  }

  /**
   * Enhanced offline queue processing with retry logic
   */
  /**
   * Enhanced offline queue processing with retry logic and operation type handling
   */
  private async processOfflineQueue(): Promise<void> {
    if (this.offlineQueue.length === 0 || !this.isOnline) {
      return;
    }

    logger.info(`Processing ${this.offlineQueue.length} queued operations...`);
    const operations = [...this.offlineQueue];
    const failedOperations: DataOperation[] = [];
    let successCount = 0;

    for (const operation of operations) {
      try {
        if (operation.table === 'enrollments') {
          await this.processQueuedEnrollmentOperation(operation);
          successCount++;
          logger.info(`Processed queued operation: ${operation.type} ${operation.id}`);
        }
      } catch (error) {
        logger.error(`Failed to process queued operation ${operation.id}:`, error);
        
        // Implement exponential backoff for retries
        if (this.syncRetryCount < this.maxRetryAttempts) {
          failedOperations.push(operation);
        } else {
          logger.error(`Max retry attempts reached for operation ${operation.id}, discarding`);
        }
      }
    }

    // Update queue with failed operations
    this.offlineQueue = failedOperations;
    this.saveOfflineQueue();

    // Broadcast queue processing results
    this.broadcastUpdate({
      type: 'queue-processed',
      processed: successCount,
      failed: failedOperations.length,
      timestamp: new Date().toISOString()
    });

    // If there are failed operations, schedule a retry with exponential backoff
    if (failedOperations.length > 0 && this.syncRetryCount < this.maxRetryAttempts) {
      this.syncRetryCount++;
      const delay = this.retryDelay * Math.pow(2, this.syncRetryCount - 1);
      
      logger.info(`Scheduling retry ${this.syncRetryCount}/${this.maxRetryAttempts} in ${delay}ms for ${failedOperations.length} operations`);
      
      setTimeout(() => {
        this.processOfflineQueue();
      }, delay);
    } else if (failedOperations.length === 0) {
      // Reset retry count on successful processing
      this.syncRetryCount = 0;
      logger.info('All queued operations processed successfully');
      
      // Broadcast successful queue completion
      this.broadcastUpdate({
        type: 'queue-completed',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Process different types of queued enrollment operations
   */
  private async processQueuedEnrollmentOperation(operation: DataOperation): Promise<void> {
    switch (operation.type) {
      case 'create':
      case 'update':
        await this.syncEnrollmentToRemote(operation.data);
        break;
      
      case 'delete':
        const { error } = await supabase
          .from('enrollments')
          .delete()
          .eq('id', operation.data.id);
        
        if (error) throw error;
        break;
      
      default:
        throw new Error(`Unknown operation type: ${operation.type}`);
    }
  }

  /**
   * Enhanced broadcast update with better error handling
   */
  private broadcastUpdate(data: any): void {
    try {
      // Add metadata to all broadcasts
      const enhancedData = {
        ...data,
        tabId: this.getTabId(),
        timestamp: data.timestamp || new Date().toISOString()
      };
      
      this.broadcastChannel.postMessage(enhancedData);
      logger.debug('Broadcasted update:', enhancedData.type);
    } catch (error) {
      logger.error('Failed to broadcast update:', error);
    }
  }

  /**
   * Request sync from other tabs
   */
  requestCrossTabSync(): void {
    this.broadcastUpdate({
      type: 'sync-request',
      requestedBy: this.getTabId(),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Get offline queue status
   */
  getOfflineQueueStatus(): {
    length: number;
    operations: DataOperation[];
    isProcessing: boolean;
    retryCount: number;
  } {
    return {
      length: this.offlineQueue.length,
      operations: [...this.offlineQueue],
      isProcessing: this.syncInProgress,
      retryCount: this.syncRetryCount
    };
  }

  /**
   * Clear offline queue (for testing/debugging)
   */
  clearOfflineQueue(): void {
    this.offlineQueue = [];
    this.saveOfflineQueue();
    logger.info('Offline queue cleared');
  }

  /**
   * Enhanced cleanup with proper resource management
   */
  destroy(): void {
    // Clear heartbeat interval
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    // Close broadcast channel
    this.broadcastChannel.close();

    // Clear cross-tab listeners
    this.crossTabListeners.clear();

    // Save offline queue before cleanup
    this.saveOfflineQueue();

    // Remove event listeners
    window.removeEventListener('online', () => {});
    window.removeEventListener('offline', () => {});
    window.removeEventListener('storage', () => {});
    document.removeEventListener('visibilitychange', () => {});
    window.removeEventListener('beforeunload', () => {});

    logger.info('DataManager destroyed and resources cleaned up');
  }
}

// Export singleton instance
export const dataManager = DataManager.getInstance();