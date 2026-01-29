import { EventEmitter } from 'events';

export interface StateSnapshot {
  timestamp: number;
  route: string;
  userState: any;
  componentStates: Map<string, any>;
  isValid: boolean;
  version: string;
  checksum: string;
}

export interface StateValidationResult {
  isValid: boolean;
  errors: string[];
  corruptedKeys: string[];
}

export interface CrossTabMessage {
  type: 'STATE_UPDATE' | 'STATE_REQUEST' | 'STATE_RESPONSE' | 'CORRUPTION_DETECTED';
  payload: any;
  timestamp: number;
  tabId: string;
}

export interface ApplicationStateConfig {
  enableCrossTabSync: boolean;
  enableAutoRestore: boolean;
  maxSnapshots: number;
  snapshotInterval: number;
  corruptionCheckInterval: number;
  enableBrowserRefreshRecovery: boolean;
}

class ApplicationStateManager extends EventEmitter {
  private static instance: ApplicationStateManager;
  private config: ApplicationStateConfig;
  private snapshots: StateSnapshot[] = [];
  private currentState: Map<string, any> = new Map();
  private tabId: string;
  private broadcastChannel: BroadcastChannel | null = null;
  private corruptionCheckTimer: NodeJS.Timeout | null = null;
  private snapshotTimer: NodeJS.Timeout | null = null;
  private isInitialized = false;

  private constructor(config: ApplicationStateConfig) {
    super();
    this.config = config;
    this.tabId = this.generateTabId();
    this.setupCrossTabCommunication();
    this.setupPeriodicTasks();
  }

  static getInstance(config?: ApplicationStateConfig): ApplicationStateManager {
    if (!ApplicationStateManager.instance) {
      if (!config) {
        throw new Error('ApplicationStateManager requires config on first initialization');
      }
      ApplicationStateManager.instance = new ApplicationStateManager(config);
    }
    return ApplicationStateManager.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Attempt to restore from browser refresh
      if (this.config.enableBrowserRefreshRecovery) {
        await this.restoreFromBrowserRefresh();
      }

      // Request state from other tabs if cross-tab sync is enabled
      if (this.config.enableCrossTabSync) {
        await this.requestStateFromOtherTabs();
      }

      this.isInitialized = true;
      this.emit('initialized');
    } catch (error) {
      console.error('Failed to initialize ApplicationStateManager:', error);
      this.emit('initialization-error', error);
    }
  }

  private generateTabId(): string {
    return `tab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private setupCrossTabCommunication(): void {
    if (!this.config.enableCrossTabSync || typeof BroadcastChannel === 'undefined') {
      return;
    }

    try {
      this.broadcastChannel = new BroadcastChannel('app-state-sync');
      this.broadcastChannel.addEventListener('message', this.handleCrossTabMessage.bind(this));
    } catch (error) {
      console.warn('Failed to setup cross-tab communication:', error);
    }
  }

  private setupPeriodicTasks(): void {
    // Setup corruption checking
    if (this.config.corruptionCheckInterval > 0) {
      this.corruptionCheckTimer = setInterval(() => {
        this.checkForCorruption();
      }, this.config.corruptionCheckInterval);
    }

    // Setup automatic snapshots
    if (this.config.snapshotInterval > 0) {
      this.snapshotTimer = setInterval(() => {
        this.createSnapshot();
      }, this.config.snapshotInterval);
    }
  }

  private async handleCrossTabMessage(event: MessageEvent<CrossTabMessage>): Promise<void> {
    const { type, payload, tabId } = event.data;

    // Ignore messages from this tab
    if (tabId === this.tabId) return;

    switch (type) {
      case 'STATE_REQUEST':
        this.sendStateToTab(tabId);
        break;
      case 'STATE_RESPONSE':
        await this.handleStateResponse(payload);
        break;
      case 'STATE_UPDATE':
        await this.handleStateUpdate(payload);
        break;
      case 'CORRUPTION_DETECTED':
        await this.handleCorruptionNotification(payload);
        break;
    }
  }

  private sendStateToTab(requestingTabId: string): void {
    if (!this.broadcastChannel) return;

    const message: CrossTabMessage = {
      type: 'STATE_RESPONSE',
      payload: {
        state: Object.fromEntries(this.currentState),
        snapshot: this.getLatestSnapshot(),
        requestingTabId
      },
      timestamp: Date.now(),
      tabId: this.tabId
    };

    this.broadcastChannel.postMessage(message);
  }

  private async handleStateResponse(payload: any): Promise<void> {
    if (payload.requestingTabId !== this.tabId) return;

    try {
      // Merge state from other tab if it's newer and valid
      const otherSnapshot = payload.snapshot;
      const latestSnapshot = this.getLatestSnapshot();

      if (otherSnapshot && (!latestSnapshot || otherSnapshot.timestamp > latestSnapshot.timestamp)) {
        if (this.validateSnapshot(otherSnapshot).isValid) {
          await this.restoreFromSnapshot(otherSnapshot);
          this.emit('state-synchronized', { source: 'cross-tab' });
        }
      }
    } catch (error) {
      console.error('Failed to handle state response:', error);
    }
  }

  private async handleStateUpdate(payload: any): Promise<void> {
    try {
      // Update local state with changes from other tabs
      const { key, value, timestamp } = payload;
      const currentTimestamp = this.currentState.get(`${key}_timestamp`) || 0;

      if (timestamp > currentTimestamp) {
        this.currentState.set(key, value);
        this.currentState.set(`${key}_timestamp`, timestamp);
        this.emit('state-updated', { key, value, source: 'cross-tab' });
      }
    } catch (error) {
      console.error('Failed to handle state update:', error);
    }
  }

  private async handleCorruptionNotification(payload: any): Promise<void> {
    console.warn('Corruption detected in another tab:', payload);
    
    // Perform local corruption check
    const validationResult = this.validateCurrentState();
    if (!validationResult.isValid) {
      await this.handleStateCorruption(validationResult);
    }
  }

  private async requestStateFromOtherTabs(): Promise<void> {
    if (!this.broadcastChannel) return;

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve();
      }, 2000); // Wait max 2 seconds for response

      const message: CrossTabMessage = {
        type: 'STATE_REQUEST',
        payload: { requestingTabId: this.tabId },
        timestamp: Date.now(),
        tabId: this.tabId
      };

      // Listen for response
      const responseHandler = (event: MessageEvent<CrossTabMessage>) => {
        if (event.data.type === 'STATE_RESPONSE' && 
            event.data.payload.requestingTabId === this.tabId) {
          clearTimeout(timeout);
          this.broadcastChannel?.removeEventListener('message', responseHandler);
          resolve();
        }
      };

      this.broadcastChannel.addEventListener('message', responseHandler);
      this.broadcastChannel.postMessage(message);
    });
  }

  createSnapshot(): StateSnapshot {
    const snapshot: StateSnapshot = {
      timestamp: Date.now(),
      route: window.location.pathname + window.location.search,
      userState: this.getUserState(),
      componentStates: new Map(this.currentState),
      isValid: true,
      version: '1.0.0',
      checksum: this.calculateChecksum(this.currentState)
    };

    this.snapshots.push(snapshot);

    // Limit number of snapshots
    if (this.snapshots.length > this.config.maxSnapshots) {
      this.snapshots = this.snapshots.slice(-this.config.maxSnapshots);
    }

    // Store latest snapshot for browser refresh recovery
    if (this.config.enableBrowserRefreshRecovery) {
      this.storeSnapshotForRefreshRecovery(snapshot);
    }

    this.emit('snapshot-created', snapshot);
    return snapshot;
  }

  private getUserState(): any {
    // Extract user-related state from current state
    const userKeys = ['user', 'auth', 'profile', 'preferences', 'role'];
    const userState: any = {};

    userKeys.forEach(key => {
      if (this.currentState.has(key)) {
        userState[key] = this.currentState.get(key);
      }
    });

    return userState;
  }

  private calculateChecksum(state: Map<string, any>): string {
    const stateString = JSON.stringify(Object.fromEntries(state));
    let hash = 0;
    for (let i = 0; i < stateString.length; i++) {
      const char = stateString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }

  async restoreFromSnapshot(snapshot: StateSnapshot): Promise<void> {
    try {
      const validationResult = this.validateSnapshot(snapshot);
      if (!validationResult.isValid) {
        throw new Error(`Invalid snapshot: ${validationResult.errors.join(', ')}`);
      }

      // Clear current state
      this.currentState.clear();

      // Restore component states
      snapshot.componentStates.forEach((value, key) => {
        this.currentState.set(key, value);
      });

      // Restore user state
      Object.entries(snapshot.userState).forEach(([key, value]) => {
        this.currentState.set(key, value);
      });

      this.emit('state-restored', { snapshot, source: 'manual' });
    } catch (error) {
      console.error('Failed to restore from snapshot:', error);
      this.emit('restore-error', error);
      throw error;
    }
  }

  private validateSnapshot(snapshot: StateSnapshot): StateValidationResult {
    const errors: string[] = [];
    const corruptedKeys: string[] = [];

    // Check basic structure
    if (!snapshot.timestamp || !snapshot.version) {
      errors.push('Missing required snapshot metadata');
    }

    // Validate timestamp
    if (snapshot.timestamp > Date.now() + 60000) { // Allow 1 minute future tolerance
      errors.push('Snapshot timestamp is in the future');
    }

    // Validate checksum if available
    if (snapshot.checksum && snapshot.componentStates) {
      const calculatedChecksum = this.calculateChecksum(snapshot.componentStates);
      if (calculatedChecksum !== snapshot.checksum) {
        errors.push('Snapshot checksum mismatch');
      }
    }

    // Validate component states
    if (snapshot.componentStates) {
      snapshot.componentStates.forEach((value, key) => {
        try {
          JSON.stringify(value); // Test serializability
        } catch {
          corruptedKeys.push(key);
          errors.push(`Component state '${key}' is not serializable`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      corruptedKeys
    };
  }

  detectStateCorruption(): boolean {
    const validationResult = this.validateCurrentState();
    return !validationResult.isValid;
  }

  private validateCurrentState(): StateValidationResult {
    const errors: string[] = [];
    const corruptedKeys: string[] = [];

    // Check for circular references and non-serializable data
    this.currentState.forEach((value, key) => {
      try {
        JSON.stringify(value);
      } catch (error) {
        corruptedKeys.push(key);
        errors.push(`State key '${key}' contains non-serializable data`);
      }
    });

    // Check for suspicious state patterns
    const stateSize = JSON.stringify(Object.fromEntries(this.currentState)).length;
    if (stateSize > 10 * 1024 * 1024) { // 10MB limit
      errors.push('State size exceeds safe limits');
    }

    return {
      isValid: errors.length === 0,
      errors,
      corruptedKeys
    };
  }

  private async checkForCorruption(): Promise<void> {
    const validationResult = this.validateCurrentState();
    if (!validationResult.isValid) {
      await this.handleStateCorruption(validationResult);
    }
  }

  private async handleStateCorruption(validationResult: StateValidationResult): Promise<void> {
    console.warn('State corruption detected:', validationResult);

    // Notify other tabs about corruption
    if (this.broadcastChannel) {
      const message: CrossTabMessage = {
        type: 'CORRUPTION_DETECTED',
        payload: { errors: validationResult.errors, corruptedKeys: validationResult.corruptedKeys },
        timestamp: Date.now(),
        tabId: this.tabId
      };
      this.broadcastChannel.postMessage(message);
    }

    // Clean up corrupted state
    this.cleanupCorruptedState(validationResult.corruptedKeys);

    // Attempt to restore from latest valid snapshot
    const latestSnapshot = this.getLatestValidSnapshot();
    if (latestSnapshot) {
      try {
        await this.restoreFromSnapshot(latestSnapshot);
        this.emit('corruption-recovered', { method: 'snapshot-restore' });
      } catch (error) {
        console.error('Failed to restore from snapshot after corruption:', error);
        await this.resetToCleanState();
      }
    } else {
      await this.resetToCleanState();
    }

    this.emit('corruption-detected', validationResult);
  }

  cleanupCorruptedState(corruptedKeys?: string[]): void {
    if (corruptedKeys) {
      // Remove specific corrupted keys
      corruptedKeys.forEach(key => {
        this.currentState.delete(key);
        this.currentState.delete(`${key}_timestamp`);
      });
    } else {
      // Full cleanup - remove all non-serializable data
      const keysToRemove: string[] = [];
      this.currentState.forEach((value, key) => {
        try {
          JSON.stringify(value);
        } catch {
          keysToRemove.push(key);
        }
      });
      keysToRemove.forEach(key => this.currentState.delete(key));
    }

    this.emit('state-cleaned', { removedKeys: corruptedKeys });
  }

  private async resetToCleanState(): Promise<void> {
    // Keep only essential state
    const essentialKeys = ['user', 'auth', 'route'];
    const essentialState = new Map();

    essentialKeys.forEach(key => {
      if (this.currentState.has(key)) {
        try {
          const value = this.currentState.get(key);
          JSON.stringify(value); // Validate serializability
          essentialState.set(key, value);
        } catch {
          // Skip non-serializable essential state
        }
      }
    });

    this.currentState.clear();
    essentialState.forEach((value, key) => {
      this.currentState.set(key, value);
    });

    this.emit('state-reset', { method: 'clean-slate' });
  }

  private getLatestSnapshot(): StateSnapshot | null {
    return this.snapshots.length > 0 ? this.snapshots[this.snapshots.length - 1] : null;
  }

  private getLatestValidSnapshot(): StateSnapshot | null {
    for (let i = this.snapshots.length - 1; i >= 0; i--) {
      const snapshot = this.snapshots[i];
      if (this.validateSnapshot(snapshot).isValid) {
        return snapshot;
      }
    }
    return null;
  }

  synchronizeAcrossTabs(): void {
    if (!this.broadcastChannel) return;

    // Send current state to all other tabs
    this.currentState.forEach((value, key) => {
      const message: CrossTabMessage = {
        type: 'STATE_UPDATE',
        payload: {
          key,
          value,
          timestamp: Date.now()
        },
        timestamp: Date.now(),
        tabId: this.tabId
      };
      this.broadcastChannel!.postMessage(message);
    });
  }

  private storeSnapshotForRefreshRecovery(snapshot: StateSnapshot): void {
    try {
      const storageKey = 'app-state-refresh-recovery';
      const recoveryData = {
        snapshot,
        tabId: this.tabId,
        timestamp: Date.now()
      };
      sessionStorage.setItem(storageKey, JSON.stringify(recoveryData));
    } catch (error) {
      console.warn('Failed to store snapshot for refresh recovery:', error);
    }
  }

  private async restoreFromBrowserRefresh(): Promise<void> {
    try {
      const storageKey = 'app-state-refresh-recovery';
      const recoveryDataStr = sessionStorage.getItem(storageKey);
      
      if (!recoveryDataStr) return;

      const recoveryData = JSON.parse(recoveryDataStr);
      const { snapshot, timestamp } = recoveryData;

      // Only restore if the snapshot is recent (within 5 minutes)
      if (Date.now() - timestamp > 5 * 60 * 1000) {
        sessionStorage.removeItem(storageKey);
        return;
      }

      if (this.validateSnapshot(snapshot).isValid) {
        await this.restoreFromSnapshot(snapshot);
        this.emit('state-restored', { snapshot, source: 'browser-refresh' });
      }

      // Clean up recovery data
      sessionStorage.removeItem(storageKey);
    } catch (error) {
      console.warn('Failed to restore from browser refresh:', error);
    }
  }

  // Public API methods
  setState(key: string, value: any): void {
    this.currentState.set(key, value);
    this.currentState.set(`${key}_timestamp`, Date.now());

    // Broadcast to other tabs
    if (this.broadcastChannel) {
      const message: CrossTabMessage = {
        type: 'STATE_UPDATE',
        payload: { key, value, timestamp: Date.now() },
        timestamp: Date.now(),
        tabId: this.tabId
      };
      this.broadcastChannel.postMessage(message);
    }

    this.emit('state-changed', { key, value });
  }

  getState(key: string): any {
    return this.currentState.get(key);
  }

  hasState(key: string): boolean {
    return this.currentState.has(key);
  }

  removeState(key: string): void {
    this.currentState.delete(key);
    this.currentState.delete(`${key}_timestamp`);
    this.emit('state-removed', { key });
  }

  getAllSnapshots(): StateSnapshot[] {
    return [...this.snapshots];
  }

  getStateSize(): number {
    return JSON.stringify(Object.fromEntries(this.currentState)).length;
  }

  destroy(): void {
    // Clean up timers
    if (this.corruptionCheckTimer) {
      clearInterval(this.corruptionCheckTimer);
    }
    if (this.snapshotTimer) {
      clearInterval(this.snapshotTimer);
    }

    // Close broadcast channel
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
    }

    // Clear state
    this.currentState.clear();
    this.snapshots = [];
    this.removeAllListeners();
  }
}

export default ApplicationStateManager;