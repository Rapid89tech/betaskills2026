import { logger } from '@/utils/logger';

export interface EnrollmentSyncMessage {
  type: 'enrollment_created' | 'enrollment_updated' | 'enrollment_deleted' | 'status_changed' | 'conflict_resolution' | 'heartbeat';
  tabId: string;
  timestamp: string;
  data: {
    enrollmentId?: string;
    courseId?: string;
    userId?: string;
    status?: string;
    enrollment?: any;
    conflict?: {
      type: 'simultaneous_action' | 'data_mismatch' | 'version_conflict';
      description: string;
      resolution: 'merge' | 'overwrite' | 'manual';
    };
  };
}

export interface EnrollmentState {
  enrollments: Record<string, any>;
  lastUpdated: string;
  version: number;
  tabId: string;
}

export interface ConflictResolutionStrategy {
  type: 'last_write_wins' | 'merge' | 'manual' | 'timestamp_based';
  priority: 'local' | 'remote' | 'server';
  timeout: number;
}

export class CrossTabSyncService {
  private static instance: CrossTabSyncService;
  private broadcastChannel: BroadcastChannel | null = null;
  private tabId: string;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private activeTabs: Map<string, number> = new Map();
  private conflictResolutionStrategy: ConflictResolutionStrategy = {
    type: 'timestamp_based',
    priority: 'server',
    timeout: 5000
  };
  private listeners: Map<string, ((message: EnrollmentSyncMessage) => void)[]> = new Map();
  private pendingConflicts: Map<string, EnrollmentSyncMessage[]> = new Map();
  private isOnline: boolean = true;

  private constructor() {
    this.tabId = this.generateTabId();
    this.initializeBroadcastChannel();
    this.setupOnlineStatusListener();
    this.startHeartbeat();
    this.loadPersistedState();
  }

  public static getInstance(): CrossTabSyncService {
    if (!CrossTabSyncService.instance) {
      CrossTabSyncService.instance = new CrossTabSyncService();
    }
    return CrossTabSyncService.instance;
  }

  private initializeBroadcastChannel(): void {
    try {
      this.broadcastChannel = new BroadcastChannel('enrollment-sync');
      
      this.broadcastChannel.onmessage = (event: MessageEvent<EnrollmentSyncMessage>) => {
        this.handleIncomingMessage(event.data);
      };

      logger.info('✅ CrossTabSyncService: BroadcastChannel initialized');
    } catch (error) {
      logger.error('❌ CrossTabSyncService: Failed to initialize BroadcastChannel:', error);
    }
  }

  private setupOnlineStatusListener(): void {
    this.isOnline = navigator.onLine;

    window.addEventListener('online', () => {
      this.isOnline = true;
      logger.info('🌐 CrossTabSyncService: Back online, syncing state');
      this.syncWithOtherTabs();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      logger.info('📱 CrossTabSyncService: Gone offline, queuing messages');
    });
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat();
      this.cleanupInactiveTabs();
    }, 10000);
  }

  private sendHeartbeat(): void {
    const message: EnrollmentSyncMessage = {
      type: 'heartbeat',
      tabId: this.tabId,
      timestamp: new Date().toISOString(),
      data: {}
    };

    this.broadcastMessage(message);
    this.updateTabActivity(this.tabId);
  }

  private handleIncomingMessage(message: EnrollmentSyncMessage): void {
    if (message.tabId === this.tabId) return;

    logger.debug('📨 CrossTabSyncService: Received message from tab:', { tabId: message.tabId, type: message.type });
    this.updateTabActivity(message.tabId);

    switch (message.type) {
      case 'heartbeat':
        break;
      case 'enrollment_created':
      case 'enrollment_updated':
      case 'enrollment_deleted':
      case 'status_changed':
        this.handleEnrollmentChange(message);
        break;
      case 'conflict_resolution':
        this.resolveConflict(message, message);
        break;
      default:
        logger.warn('⚠️ CrossTabSyncService: Unknown message type:', message.type);
    }

    this.notifyListeners(message);
  }

  private handleEnrollmentChange(message: EnrollmentSyncMessage): void {
    try {
      const { courseId, userId } = message.data;
      
      if (!courseId || !userId) {
        logger.warn('⚠️ CrossTabSyncService: Invalid enrollment change message');
        return;
      }

      const conflict = this.detectConflict(message);
      if (conflict) {
        logger.warn('⚠️ CrossTabSyncService: Conflict detected, resolving...', conflict);
        this.resolveConflict(conflict, message);
        return;
      }

      this.applyEnrollmentChange(message);
      logger.debug('✅ CrossTabSyncService: Applied enrollment change from tab:', message.tabId);

    } catch (error) {
      logger.error('❌ CrossTabSyncService: Error handling enrollment change:', error);
    }
  }

  private detectConflict(message: EnrollmentSyncMessage): EnrollmentSyncMessage | null {
    const { courseId, userId } = message.data;
    
    if (!courseId || !userId) return null;

    const conflictKey = `${userId}-${courseId}`;
    const existingConflicts = this.pendingConflicts.get(conflictKey);
    
    if (existingConflicts && existingConflicts.length > 0) {
        return {
          type: 'conflict_resolution',
          tabId: this.tabId,
          timestamp: new Date().toISOString(),
          data: {
            conflict: {
              type: 'simultaneous_action',
              description: 'Multiple tabs attempting to modify the same enrollment',
              resolution: 'merge'
            }
          }
        };
    }

    return null;
  }

  private resolveConflict(conflict: EnrollmentSyncMessage, incomingMessage: EnrollmentSyncMessage): void {
    const { conflict: conflictData } = incomingMessage.data;
    
    if (!conflictData) return;

    switch (conflictData.resolution) {
      case 'merge':
        this.resolveByMerge(incomingMessage);
        break;
      case 'overwrite':
        this.resolveByOverwrite(incomingMessage);
        break;
      case 'manual':
        this.resolveByManual(incomingMessage);
        break;
      default:
        logger.warn('⚠️ CrossTabSyncService: Unknown conflict resolution strategy:', conflictData.resolution);
    }
  }

  private resolveByTimestamp(message: EnrollmentSyncMessage): void {
    const { courseId } = message.data;
    if (!courseId) return;
    
    const localState = this.getLocalEnrollmentState();
    const localEnrollment = localState.enrollments[courseId];
    
    if (localEnrollment && localEnrollment.lastModified > new Date(message.timestamp).getTime()) {
      logger.info('🏆 CrossTabSyncService: Local data is newer, keeping local version');
      return;
    }

    this.applyEnrollmentChange(message);
    logger.info('🏆 CrossTabSyncService: Incoming data is newer, applying change');
  }

  private resolveByMerge(message: EnrollmentSyncMessage): void {
    const { courseId, enrollment } = message.data;
    if (!courseId) return;
    
    const localState = this.getLocalEnrollmentState();
    const localEnrollment = localState.enrollments[courseId];
    
    if (!localEnrollment || !enrollment) {
      this.applyEnrollmentChange(message);
      return;
    }

    const mergedEnrollment = {
      ...localEnrollment,
      ...enrollment,
      lastModified: Math.max(localEnrollment.lastModified || 0, new Date(message.timestamp).getTime()),
      mergedFrom: [localEnrollment.tabId || this.tabId, message.tabId]
    };

    this.updateLocalEnrollmentState(courseId, mergedEnrollment);
    logger.info('🔀 CrossTabSyncService: Merged enrollment data');
  }

  private resolveByOverwrite(message: EnrollmentSyncMessage): void {
    this.applyEnrollmentChange(message);
    logger.info('🔄 CrossTabSyncService: Overwritten with incoming data');
  }

  private resolveByManual(message: EnrollmentSyncMessage): void {
    const conflictKey = `${message.data.userId}-${message.data.courseId}`;
    if (!this.pendingConflicts.has(conflictKey)) {
      this.pendingConflicts.set(conflictKey, []);
    }
    
    this.pendingConflicts.get(conflictKey)!.push(message);
    
    window.dispatchEvent(new CustomEvent('enrollment-conflict', {
      detail: {
        conflict: message,
        courseId: message.data.courseId,
        userId: message.data.userId
      }
    }));

    logger.info('👤 CrossTabSyncService: Conflict queued for manual resolution');
  }

  private applyEnrollmentChange(message: EnrollmentSyncMessage): void {
    const { courseId, userId, status, enrollment } = message.data;
    
    if (!courseId || !userId) return;

    const currentState = this.getLocalEnrollmentState();
    
    if (message.type === 'enrollment_deleted') {
      delete currentState.enrollments[courseId];
    } else {
      currentState.enrollments[courseId] = {
        ...enrollment,
        status: status || 'pending',
        lastModified: new Date(message.timestamp).getTime(),
        syncedFromTab: message.tabId
      };
    }

    currentState.lastUpdated = new Date().toISOString();
    currentState.version += 1;
    currentState.tabId = this.tabId;

    this.persistLocalState(currentState);
    this.updateLocalStorageEnrollments(currentState);

    logger.debug('✅ CrossTabSyncService: Applied enrollment change locally');
  }

  private broadcastMessage(message: EnrollmentSyncMessage): void {
    if (!this.broadcastChannel) {
      logger.warn('⚠️ CrossTabSyncService: BroadcastChannel not available');
      return;
    }

    try {
      this.broadcastChannel.postMessage(message);
    } catch (error) {
      logger.error('❌ CrossTabSyncService: Failed to broadcast message:', error);
    }
  }

  private notifyListeners(message: EnrollmentSyncMessage): void {
    const listeners = this.listeners.get(message.type) || [];
    listeners.forEach(listener => {
      try {
        listener(message);
      } catch (error) {
        logger.error('❌ CrossTabSyncService: Error in listener:', error);
      }
    });
  }

  public addListener(messageType: EnrollmentSyncMessage['type'], callback: (message: EnrollmentSyncMessage) => void): () => void {
    if (!this.listeners.has(messageType)) {
      this.listeners.set(messageType, []);
    }
    
    this.listeners.get(messageType)!.push(callback);

    return () => {
      const listeners = this.listeners.get(messageType);
      if (listeners) {
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    };
  }

  public broadcastEnrollmentChange(
    type: 'enrollment_created' | 'enrollment_updated' | 'enrollment_deleted' | 'status_changed',
    courseId: string,
    userId: string,
    enrollment?: any,
    status?: string
  ): void {
    const message: EnrollmentSyncMessage = {
      type,
      tabId: this.tabId,
      timestamp: new Date().toISOString(),
      data: {
        courseId,
        userId,
        status: status || 'pending',
        enrollment
      }
    };

    this.broadcastMessage(message);
    logger.debug('📤 CrossTabSyncService: Broadcasted enrollment change');
  }

  public syncWithOtherTabs(): void {
    if (!this.isOnline) return;

    const message: EnrollmentSyncMessage = {
      type: 'heartbeat',
      tabId: this.tabId,
      timestamp: new Date().toISOString(),
      data: {}
    };

    this.broadcastMessage(message);
  }

  private getLocalEnrollmentState(): EnrollmentState {
    try {
      const stored = localStorage.getItem('enrollment-sync-state');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      logger.error('❌ CrossTabSyncService: Error loading local state:', error);
    }

    return {
      enrollments: {},
      lastUpdated: new Date().toISOString(),
      version: 0,
      tabId: this.tabId
    };
  }

  private persistLocalState(state: EnrollmentState): void {
    try {
      localStorage.setItem('enrollment-sync-state', JSON.stringify(state));
    } catch (error) {
      logger.error('❌ CrossTabSyncService: Error persisting local state:', error);
    }
  }

  private updateLocalStorageEnrollments(state: EnrollmentState): void {
    try {
      const enrollments = Object.values(state.enrollments);
      localStorage.setItem('enrollments', JSON.stringify(enrollments));
    } catch (error) {
      logger.error('❌ CrossTabSyncService: Error updating localStorage enrollments:', error);
    }
  }

  private updateLocalEnrollmentState(courseId: string | undefined, enrollment: any): void {
    if (!courseId) return;
    
    const state = this.getLocalEnrollmentState();
    state.enrollments[courseId] = enrollment;
    state.lastUpdated = new Date().toISOString();
    state.version += 1;
    this.persistLocalState(state);
    this.updateLocalStorageEnrollments(state);
  }

  private loadPersistedState(): void {
    const state = this.getLocalEnrollmentState();
    logger.info('📂 CrossTabSyncService: Loaded persisted state', {
      version: state.version,
      enrollments: Object.keys(state.enrollments).length
    });
  }

  private updateTabActivity(tabId: string): void {
    this.activeTabs.set(tabId, Date.now());
  }

  private cleanupInactiveTabs(): void {
    const now = Date.now();
    const timeout = 30000;

    for (const [tabId, lastActivity] of this.activeTabs) {
      if (now - lastActivity > timeout) {
        this.activeTabs.delete(tabId);
        logger.debug('🧹 CrossTabSyncService: Cleaned up inactive tab:', tabId);
      }
    }
  }

  private generateTabId(): string {
    return `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  public getActiveTabsCount(): number {
    return this.activeTabs.size;
  }

  public getTabId(): string {
    return this.tabId;
  }

  public isTabOnline(): boolean {
    return this.isOnline;
  }

  public getPendingConflicts(): Map<string, EnrollmentSyncMessage[]> {
    return new Map(this.pendingConflicts);
  }

  public resolveManualConflict(conflictKey: string, resolution: 'keep_local' | 'accept_remote' | 'merge'): void {
    const conflicts = this.pendingConflicts.get(conflictKey);
    if (!conflicts || conflicts.length === 0) return;

    const latestConflict = conflicts[conflicts.length - 1];
    
    if (!latestConflict) return;
    
    switch (resolution) {
      case 'keep_local':
        logger.info('👤 CrossTabSyncService: User chose to keep local data');
        break;
      case 'accept_remote':
        this.applyEnrollmentChange(latestConflict);
        logger.info('👤 CrossTabSyncService: User chose to accept remote data');
        break;
      case 'merge':
        this.resolveByMerge(latestConflict);
        logger.info('👤 CrossTabSyncService: User chose to merge data');
        break;
    }

    this.pendingConflicts.delete(conflictKey);
  }

  public destroy(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }
    
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
    }
    
    this.listeners.clear();
    this.activeTabs.clear();
    this.pendingConflicts.clear();
  }
}

export const crossTabSyncService = CrossTabSyncService.getInstance();