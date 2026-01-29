/**
 * Data Synchronization Service
 * 
 * Implements server-first data synchronization with offline support.
 * Handles connection status tracking, operation queuing, and timestamp-based
 * conflict resolution for cross-device data consistency.
 * 
 * Requirements: 3.4, 3.5
 */

import { logger } from '@/utils/logger';
import { supabase } from '@/integrations/supabase/client';

/**
 * Represents the current synchronization state
 */
export interface SyncState {
  isOnline: boolean;
  isSyncing: boolean;
  lastSyncTimestamp: string | null;
  pendingOperations: SyncOperation[];
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
}

/**
 * Represents a queued synchronization operation
 */
export interface SyncOperation {
  id: string;
  type: 'enrollment' | 'progress' | 'profile';
  action: 'create' | 'update' | 'delete';
  data: Record<string, unknown>;
  timestamp: string;
  retryCount: number;
}

/**
 * Configuration options for the DataSyncService
 */
export interface DataSyncConfig {
  maxRetries: number;
  retryDelayMs: number;
  syncIntervalMs: number;
  maxQueueSize: number;
  enableAutoSync: boolean;
}

/**
 * Callback type for connection status changes
 */
export type ConnectionChangeCallback = (isOnline: boolean) => void;

/**
 * Callback type for sync state changes
 */
export type SyncStateChangeCallback = (state: SyncState) => void;

const DEFAULT_CONFIG: DataSyncConfig = {
  maxRetries: 3,
  retryDelayMs: 5000,
  syncIntervalMs: 30000,
  maxQueueSize: 100,
  enableAutoSync: true
};

const STORAGE_KEYS = {
  PENDING_OPERATIONS: 'data_sync_pending_operations',
  LAST_SYNC: 'data_sync_last_timestamp',
  SYNC_STATE: 'data_sync_state'
};

/**
 * DataSyncService - Server-first synchronization service
 * 
 * Implements singleton pattern for consistent state management across the application.
 * Provides offline support through operation queuing and timestamp-based conflict resolution.
 */
export class DataSyncService {
  private static instance: DataSyncService;
  
  private state: SyncState;
  private config: DataSyncConfig;
  private connectionListeners: Set<ConnectionChangeCallback> = new Set();
  private stateListeners: Set<SyncStateChangeCallback> = new Set();
  private syncInterval: NodeJS.Timeout | null = null;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private isInitialized: boolean = false;

  private constructor(config: Partial<DataSyncConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.state = {
      isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
      isSyncing: false,
      lastSyncTimestamp: null,
      pendingOperations: [],
      connectionStatus: 'disconnected'
    };
    
    this.loadPersistedState();
    this.setupEventListeners();
    
    logger.info('🔄 DataSyncService: Initialized', {
      config: this.config,
      initialState: this.state
    });
  }

  /**
   * Get the singleton instance of DataSyncService
   */
  static getInstance(config?: Partial<DataSyncConfig>): DataSyncService {
    if (!DataSyncService.instance) {
      DataSyncService.instance = new DataSyncService(config);
    }
    return DataSyncService.instance;
  }

  /**
   * Initialize the sync service and establish connection
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      logger.debug('DataSyncService already initialized');
      return;
    }

    logger.info('🔄 DataSyncService: Starting initialization');

    try {
      // Check initial connection status
      await this.checkConnection();
      
      // Start auto-sync if enabled
      if (this.config.enableAutoSync) {
        this.startAutoSync();
      }

      // Process any pending operations
      if (this.state.isOnline && this.state.pendingOperations.length > 0) {
        await this.processQueue();
      }

      this.isInitialized = true;
      logger.info('✅ DataSyncService: Initialization complete');
    } catch (error) {
      logger.error('❌ DataSyncService: Initialization failed', error);
      throw error;
    }
  }

  /**
   * Sync user data from server (server-first approach)
   * This fetches the latest data from the server and updates local state
   */
  async syncUserData(userId: string): Promise<void> {
    if (!userId) {
      logger.warn('syncUserData called without userId');
      return;
    }

    logger.info('🔄 Syncing user data', { userId });
    
    this.updateState({ isSyncing: true });

    try {
      // Fetch enrollments from server (source of truth)
      const { data: enrollments, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', userId);

      if (enrollmentError) {
        throw enrollmentError;
      }

      // Fetch user progress from server (using module_scores table)
      const { data: progress, error: progressError } = await supabase
        .from('module_scores')
        .select('*')
        .eq('user_id', userId);

      if (progressError) {
        throw progressError;
      }

      // Update last sync timestamp
      const syncTimestamp = new Date().toISOString();
      this.updateState({
        lastSyncTimestamp: syncTimestamp,
        isSyncing: false
      });

      // Persist sync timestamp
      this.persistState();

      // Dispatch sync complete event
      window.dispatchEvent(new CustomEvent('data-sync-complete', {
        detail: {
          userId,
          enrollments,
          progress,
          timestamp: syncTimestamp
        }
      }));

      logger.info('✅ User data synced successfully', {
        userId,
        enrollmentCount: enrollments?.length || 0,
        progressCount: progress?.length || 0
      });

    } catch (error) {
      logger.error('❌ Failed to sync user data', error);
      this.updateState({ isSyncing: false });
      throw error;
    }
  }

  /**
   * Queue an operation for synchronization
   * Operations are queued when offline and processed when connection is restored
   */
  queueOperation(operation: Omit<SyncOperation, 'id' | 'timestamp' | 'retryCount'>): void {
    // Check queue size limit
    if (this.state.pendingOperations.length >= this.config.maxQueueSize) {
      logger.warn('Operation queue full, removing oldest operation');
      this.state.pendingOperations.shift();
    }

    const newOperation: SyncOperation = {
      ...operation,
      id: this.generateOperationId(),
      timestamp: new Date().toISOString(),
      retryCount: 0
    };

    this.state.pendingOperations.push(newOperation);
    this.persistState();
    this.notifyStateChange();

    logger.info('📦 Operation queued', {
      operationId: newOperation.id,
      type: newOperation.type,
      action: newOperation.action,
      queueSize: this.state.pendingOperations.length
    });

    // Try to process immediately if online
    if (this.state.isOnline && !this.state.isSyncing) {
      this.processQueue();
    }
  }

  /**
   * Process the operation queue
   * Processes operations in order, handling failures with retry logic
   */
  async processQueue(): Promise<void> {
    if (this.state.isSyncing || !this.state.isOnline) {
      logger.debug('Cannot process queue: syncing or offline');
      return;
    }

    if (this.state.pendingOperations.length === 0) {
      logger.debug('No pending operations to process');
      return;
    }

    logger.info('🔄 Processing operation queue', {
      queueSize: this.state.pendingOperations.length
    });

    this.updateState({ isSyncing: true });

    const failedOperations: SyncOperation[] = [];

    for (const operation of [...this.state.pendingOperations]) {
      try {
        await this.executeOperation(operation);
        
        // Remove successful operation from queue
        this.state.pendingOperations = this.state.pendingOperations.filter(
          op => op.id !== operation.id
        );
        
        logger.info('✅ Operation processed', { operationId: operation.id });
      } catch (error) {
        logger.error('❌ Operation failed', { operationId: operation.id, error });
        
        operation.retryCount++;
        
        if (operation.retryCount < this.config.maxRetries) {
          failedOperations.push(operation);
        } else {
          logger.error('❌ Operation exceeded max retries, discarding', {
            operationId: operation.id
          });
          
          // Dispatch failure event
          window.dispatchEvent(new CustomEvent('sync-operation-failed', {
            detail: { operation, error }
          }));
        }
      }
    }

    // Update queue with failed operations that can be retried
    this.state.pendingOperations = failedOperations;
    this.persistState();
    
    this.updateState({ isSyncing: false });
    
    logger.info('✅ Queue processing complete', {
      remainingOperations: this.state.pendingOperations.length
    });
  }

  /**
   * Resolve conflict between local and remote data
   * Server data (remote) ALWAYS takes priority for authenticated users (Requirement 3.5)
   * This implements pure server-first synchronization where server is the source of truth
   */
  resolveConflict<T extends { updated_at?: string }>(
    local: T,
    remote: T
  ): T {
    // Server data is always the source of truth for authenticated users
    // This implements Requirement 3.5 - pure server-first approach
    logger.debug('Conflict resolution: Using remote (server) data as source of truth', {
      localTimestamp: local.updated_at,
      remoteTimestamp: remote.updated_at
    });
    return remote;
  }

  /**
   * Subscribe to connection status changes
   * Returns an unsubscribe function
   */
  onConnectionChange(callback: ConnectionChangeCallback): () => void {
    this.connectionListeners.add(callback);
    
    // Immediately notify with current status
    callback(this.state.isOnline);
    
    return () => {
      this.connectionListeners.delete(callback);
    };
  }

  /**
   * Subscribe to sync state changes
   * Returns an unsubscribe function
   */
  onStateChange(callback: SyncStateChangeCallback): () => void {
    this.stateListeners.add(callback);
    
    // Immediately notify with current state
    callback(this.getState());
    
    return () => {
      this.stateListeners.delete(callback);
    };
  }

  /**
   * Attempt to reconnect to the server
   */
  async reconnect(): Promise<void> {
    if (this.state.connectionStatus === 'reconnecting') {
      logger.debug('Already attempting to reconnect');
      return;
    }

    logger.info('🔄 Attempting to reconnect');
    this.updateState({ connectionStatus: 'reconnecting' });

    try {
      await this.checkConnection();
      
      if (this.state.isOnline) {
        logger.info('✅ Reconnection successful');
        
        // Process any pending operations
        await this.processQueue();
        
        // Dispatch reconnection event
        window.dispatchEvent(new CustomEvent('data-sync-reconnected'));
      }
    } catch (error) {
      logger.error('❌ Reconnection failed', error);
      this.scheduleReconnect();
    }
  }

  /**
   * Get the current sync state
   */
  getState(): SyncState {
    return { ...this.state };
  }

  /**
   * Get pending operations count
   */
  getPendingOperationsCount(): number {
    return this.state.pendingOperations.length;
  }

  /**
   * Check if there are pending operations
   */
  hasPendingOperations(): boolean {
    return this.state.pendingOperations.length > 0;
  }

  /**
   * Clear all pending operations
   */
  clearPendingOperations(): void {
    this.state.pendingOperations = [];
    this.persistState();
    this.notifyStateChange();
    logger.info('🗑️ Pending operations cleared');
  }

  /**
   * Clean up resources
   */
  cleanup(): void {
    logger.info('🧹 DataSyncService: Cleaning up');
    
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
    
    this.connectionListeners.clear();
    this.stateListeners.clear();
    
    // Remove event listeners
    if (typeof window !== 'undefined') {
      window.removeEventListener('online', this.handleOnline);
      window.removeEventListener('offline', this.handleOffline);
      window.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
    
    this.isInitialized = false;
  }

  // Private methods

  private setupEventListeners(): void {
    if (typeof window === 'undefined') return;

    // Online/offline listeners
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // Visibility change listener for sync on tab focus
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

    // Before unload - persist state
    window.addEventListener('beforeunload', () => {
      this.persistState();
    });
  }

  private handleOnline = (): void => {
    logger.info('🌐 Connection restored');
    this.updateState({
      isOnline: true,
      connectionStatus: 'connected'
    });
    
    this.notifyConnectionChange(true);
    
    // Process pending operations
    this.processQueue();
    
    // Dispatch event for UI components
    window.dispatchEvent(new CustomEvent('data-sync-online'));
  };

  private handleOffline = (): void => {
    logger.info('📴 Connection lost');
    this.updateState({
      isOnline: false,
      connectionStatus: 'disconnected'
    });
    
    this.notifyConnectionChange(false);
    
    // Dispatch event for UI components
    window.dispatchEvent(new CustomEvent('data-sync-offline'));
  };

  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'visible' && this.state.isOnline) {
      logger.debug('Tab became visible, checking for updates');
      this.processQueue();
    }
  };

  private async checkConnection(): Promise<void> {
    try {
      // Simple health check using Supabase
      const supabaseUrl =
        (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
        (supabase as any)?.supabaseUrl ||
        'https://jpafcmixtchvtrkhltst.supabase.co';
      const anonKey =
        (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
        (supabase as any)?.supabaseKey ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwYWZjbWl4dGNodnRya2hsdHN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1MzIzODYsImV4cCI6MjA2OTEwODM4Nn0.dR0-DW8_ekftD9DZjGutGuyh4kiPG338NQ367tC8Pcw';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      try {
        const headers: Record<string, string> = {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        };

        await fetch(`${supabaseUrl}/auth/v1/health`, {
          method: 'GET',
          headers,
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }
      
      this.updateState({
        isOnline: true,
        connectionStatus: 'connected'
      });
      
      this.notifyConnectionChange(true);
    } catch (error) {
      logger.warn('Connection check failed', error);
      this.updateState({
        isOnline: false,
        connectionStatus: 'disconnected'
      });
      
      this.notifyConnectionChange(false);
    }
  }

  private async executeOperation(operation: SyncOperation): Promise<void> {
    const { type, action, data } = operation;

    switch (type) {
      case 'enrollment':
        await this.executeEnrollmentOperation(action, data);
        break;
      case 'progress':
        await this.executeProgressOperation(action, data);
        break;
      case 'profile':
        await this.executeProfileOperation(action, data);
        break;
      default:
        throw new Error(`Unknown operation type: ${type}`);
    }
  }

  private async executeEnrollmentOperation(
    action: SyncOperation['action'],
    data: Record<string, unknown>
  ): Promise<void> {
    const id = data.id as string | undefined;
    
    switch (action) {
      case 'create': {
        // Extract only the fields that exist in the enrollments table
        const insertData = {
          user_id: data.user_id as string,
          course_id: data.course_id as string,
          progress: (data.progress as number) || 0,
          enrolled_at: (data.enrolled_at as string) || new Date().toISOString(),
          completed_at: data.completed_at as string | null
        };
        const { error: createError } = await supabase
          .from('enrollments')
          .insert(insertData);
        if (createError) throw createError;
        break;
      }
        
      case 'update': {
        if (!id) throw new Error('Enrollment ID required for update');
        // Extract only updatable fields
        const updateData: Record<string, unknown> = {};
        if (data.progress !== undefined) updateData.progress = data.progress;
        if (data.completed_at !== undefined) updateData.completed_at = data.completed_at;
        
        const { error: updateError } = await supabase
          .from('enrollments')
          .update(updateData)
          .eq('id', id);
        if (updateError) throw updateError;
        break;
      }
        
      case 'delete': {
        if (!id) throw new Error('Enrollment ID required for delete');
        const { error: deleteError } = await supabase
          .from('enrollments')
          .delete()
          .eq('id', id);
        if (deleteError) throw deleteError;
        break;
      }
    }
  }

  private async executeProgressOperation(
    action: SyncOperation['action'],
    data: Record<string, unknown>
  ): Promise<void> {
    const id = data.id as string | undefined;
    
    switch (action) {
      case 'create':
      case 'update': {
        // Use module_scores table for progress tracking
        const progressData = {
          user_id: data.user_id as string,
          course_id: data.course_id as string,
          module_id: data.module_id as number,
          lesson_id: data.lesson_id as number,
          score: (data.score as number) || 0,
          total_points: (data.total_points as number) || 100,
          percentage: data.percentage as number | null,
          grade: data.grade as string | null,
          completed_at: (data.completed_at as string) || new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        const { error } = await supabase
          .from('module_scores')
          .upsert(progressData);
        if (error) throw error;
        break;
      }
        
      case 'delete': {
        if (!id) throw new Error('Progress ID required for delete');
        const { error: deleteError } = await supabase
          .from('module_scores')
          .delete()
          .eq('id', id);
        if (deleteError) throw deleteError;
        break;
      }
    }
  }

  private async executeProfileOperation(
    action: SyncOperation['action'],
    data: Record<string, unknown>
  ): Promise<void> {
    if (action === 'update') {
      const id = data.id as string;
      if (!id) throw new Error('Profile ID required for update');
      
      // Extract only updatable profile fields
      const updateData: Record<string, unknown> = {
        updated_at: new Date().toISOString()
      };
      if (data.first_name !== undefined) updateData.first_name = data.first_name;
      if (data.last_name !== undefined) updateData.last_name = data.last_name;
      if (data.avatar_url !== undefined) updateData.avatar_url = data.avatar_url;
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', id);
      if (error) throw error;
    }
  }

  private startAutoSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    this.syncInterval = setInterval(() => {
      if (this.state.isOnline && this.state.pendingOperations.length > 0) {
        this.processQueue();
      }
    }, this.config.syncIntervalMs);

    logger.debug('Auto-sync started', { intervalMs: this.config.syncIntervalMs });
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    this.reconnectTimeout = setTimeout(() => {
      this.reconnect();
    }, this.config.retryDelayMs);

    logger.debug('Reconnect scheduled', { delayMs: this.config.retryDelayMs });
  }

  private updateState(updates: Partial<SyncState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyStateChange();
  }

  private notifyConnectionChange(isOnline: boolean): void {
    this.connectionListeners.forEach(callback => {
      try {
        callback(isOnline);
      } catch (error) {
        logger.error('Error in connection change callback', error);
      }
    });
  }

  private notifyStateChange(): void {
    const currentState = this.getState();
    this.stateListeners.forEach(callback => {
      try {
        callback(currentState);
      } catch (error) {
        logger.error('Error in state change callback', error);
      }
    });
  }

  private loadPersistedState(): void {
    try {
      // Load pending operations
      const operationsJson = localStorage.getItem(STORAGE_KEYS.PENDING_OPERATIONS);
      if (operationsJson) {
        this.state.pendingOperations = JSON.parse(operationsJson);
        logger.debug('Loaded pending operations', {
          count: this.state.pendingOperations.length
        });
      }

      // Load last sync timestamp
      const lastSync = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      if (lastSync) {
        this.state.lastSyncTimestamp = lastSync;
      }
    } catch (error) {
      logger.error('Failed to load persisted state', error);
    }
  }

  private persistState(): void {
    try {
      localStorage.setItem(
        STORAGE_KEYS.PENDING_OPERATIONS,
        JSON.stringify(this.state.pendingOperations)
      );
      
      if (this.state.lastSyncTimestamp) {
        localStorage.setItem(STORAGE_KEYS.LAST_SYNC, this.state.lastSyncTimestamp);
      }
    } catch (error) {
      logger.error('Failed to persist state', error);
    }
  }

  private generateOperationId(): string {
    return `op_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
}

// Export singleton instance
export const dataSyncService = DataSyncService.getInstance();
