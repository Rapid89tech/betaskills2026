import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import ApplicationStateManager from '../ApplicationStateManager';

// Mock BroadcastChannel
class MockBroadcastChannel {
  private listeners: ((event: MessageEvent) => void)[] = [];
  
  constructor(public name: string) {}
  
  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (type === 'message') {
      this.listeners.push(listener);
    }
  }
  
  removeEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (type === 'message') {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    }
  }
  
  postMessage(data: any) {
    // Simulate async message delivery
    setTimeout(() => {
      this.listeners.forEach(listener => {
        listener({ data } as MessageEvent);
      });
    }, 0);
  }
  
  close() {
    this.listeners = [];
  }
}

// Mock sessionStorage
const mockSessionStorage = {
  store: new Map<string, string>(),
  getItem: vi.fn((key: string) => mockSessionStorage.store.get(key) || null),
  setItem: vi.fn((key: string, value: string) => {
    mockSessionStorage.store.set(key, value);
  }),
  removeItem: vi.fn((key: string) => {
    mockSessionStorage.store.delete(key);
  }),
  clear: vi.fn(() => {
    mockSessionStorage.store.clear();
  })
};

describe('ApplicationStateManager', () => {
  let stateManager: ApplicationStateManager;
  
  beforeEach(() => {
    // Reset singleton instance
    (ApplicationStateManager as any).instance = null;
    
    // Mock global objects
    global.BroadcastChannel = MockBroadcastChannel as any;
    global.sessionStorage = mockSessionStorage as any;
    
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        pathname: '/test',
        search: '?param=value'
      },
      writable: true
    });
    
    // Clear mocks
    vi.clearAllMocks();
    mockSessionStorage.store.clear();
    
    const config = {
      enableCrossTabSync: true,
      enableAutoRestore: true,
      maxSnapshots: 5,
      snapshotInterval: 0, // Disable automatic snapshots for tests
      corruptionCheckInterval: 0, // Disable automatic corruption checks for tests
      enableBrowserRefreshRecovery: true
    };
    
    stateManager = ApplicationStateManager.getInstance(config);
  });
  
  afterEach(() => {
    if (stateManager) {
      stateManager.destroy();
    }
    vi.clearAllTimers();
  });

  describe('Initialization', () => {
    it('should create singleton instance', () => {
      const config = {
        enableCrossTabSync: false,
        enableAutoRestore: false,
        maxSnapshots: 10,
        snapshotInterval: 30000,
        corruptionCheckInterval: 60000,
        enableBrowserRefreshRecovery: false
      };
      
      const instance1 = ApplicationStateManager.getInstance(config);
      const instance2 = ApplicationStateManager.getInstance();
      
      expect(instance1).toBe(instance2);
    });

    it('should initialize successfully', async () => {
      const initPromise = stateManager.initialize();
      await expect(initPromise).resolves.toBeUndefined();
    });

    it('should emit initialized event', async () => {
      const initSpy = vi.fn();
      stateManager.on('initialized', initSpy);
      
      await stateManager.initialize();
      
      expect(initSpy).toHaveBeenCalled();
    });
  });

  describe('State Management', () => {
    beforeEach(async () => {
      await stateManager.initialize();
    });

    it('should set and get state', () => {
      const testValue = { test: 'value' };
      stateManager.setState('testKey', testValue);
      
      expect(stateManager.getState('testKey')).toEqual(testValue);
      expect(stateManager.hasState('testKey')).toBe(true);
    });

    it('should remove state', () => {
      stateManager.setState('testKey', 'testValue');
      stateManager.removeState('testKey');
      
      expect(stateManager.hasState('testKey')).toBe(false);
      expect(stateManager.getState('testKey')).toBeUndefined();
    });

    it('should emit state-changed event', () => {
      const changeSpy = vi.fn();
      stateManager.on('state-changed', changeSpy);
      
      stateManager.setState('testKey', 'testValue');
      
      expect(changeSpy).toHaveBeenCalledWith({
        key: 'testKey',
        value: 'testValue'
      });
    });

    it('should emit state-removed event', () => {
      const removeSpy = vi.fn();
      stateManager.on('state-removed', removeSpy);
      
      stateManager.setState('testKey', 'testValue');
      stateManager.removeState('testKey');
      
      expect(removeSpy).toHaveBeenCalledWith({ key: 'testKey' });
    });
  });

  describe('Snapshot Management', () => {
    beforeEach(async () => {
      await stateManager.initialize();
    });

    it('should create snapshot', () => {
      stateManager.setState('user', { id: 1, name: 'Test User' });
      stateManager.setState('preferences', { theme: 'dark' });
      
      const snapshot = stateManager.createSnapshot();
      
      expect(snapshot).toMatchObject({
        timestamp: expect.any(Number),
        route: '/test?param=value',
        version: '1.0.0',
        isValid: true,
        checksum: expect.any(String)
      });
      
      expect(snapshot.userState).toEqual({
        user: { id: 1, name: 'Test User' },
        preferences: { theme: 'dark' }
      });
    });

    it('should limit number of snapshots', () => {
      // Create more snapshots than the limit
      for (let i = 0; i < 10; i++) {
        stateManager.setState('counter', i);
        stateManager.createSnapshot();
      }
      
      const snapshots = stateManager.getAllSnapshots();
      expect(snapshots.length).toBe(5); // maxSnapshots = 5
    });

    it('should emit snapshot-created event', () => {
      const snapshotSpy = vi.fn();
      stateManager.on('snapshot-created', snapshotSpy);
      
      const snapshot = stateManager.createSnapshot();
      
      expect(snapshotSpy).toHaveBeenCalledWith(snapshot);
    });

    it('should restore from valid snapshot', async () => {
      // Set initial state
      stateManager.setState('user', { id: 1, name: 'Test User' });
      stateManager.setState('counter', 42);
      
      const snapshot = stateManager.createSnapshot();
      
      // Change state
      stateManager.setState('user', { id: 2, name: 'Different User' });
      stateManager.setState('counter', 100);
      
      // Restore from snapshot
      await stateManager.restoreFromSnapshot(snapshot);
      
      expect(stateManager.getState('user')).toEqual({ id: 1, name: 'Test User' });
      expect(stateManager.getState('counter')).toBe(42);
    });

    it('should emit state-restored event', async () => {
      const restoreSpy = vi.fn();
      stateManager.on('state-restored', restoreSpy);
      
      const snapshot = stateManager.createSnapshot();
      await stateManager.restoreFromSnapshot(snapshot);
      
      expect(restoreSpy).toHaveBeenCalledWith({
        snapshot,
        source: 'manual'
      });
    });
  });

  describe('State Corruption Detection', () => {
    beforeEach(async () => {
      await stateManager.initialize();
    });

    it('should detect state corruption', () => {
      // Create circular reference to cause corruption
      const circularObj: any = { name: 'test' };
      circularObj.self = circularObj;
      
      stateManager.setState('corrupted', circularObj);
      
      const isCorrupted = stateManager.detectStateCorruption();
      expect(isCorrupted).toBe(true);
    });

    it('should clean up corrupted state', () => {
      // Add valid state
      stateManager.setState('valid', { name: 'valid' });
      
      // Add corrupted state
      const circularObj: any = { name: 'test' };
      circularObj.self = circularObj;
      stateManager.setState('corrupted', circularObj);
      
      stateManager.cleanupCorruptedState();
      
      // Valid state should remain
      expect(stateManager.hasState('valid')).toBe(true);
      // Corrupted state should be removed
      expect(stateManager.hasState('corrupted')).toBe(false);
    });

    it('should emit corruption-detected event', async () => {
      const corruptionSpy = vi.fn();
      stateManager.on('corruption-detected', corruptionSpy);
      
      // Create corrupted state
      const circularObj: any = { name: 'test' };
      circularObj.self = circularObj;
      stateManager.setState('corrupted', circularObj);
      
      // Manually trigger corruption check
      const validationResult = (stateManager as any).validateCurrentState();
      await (stateManager as any).handleStateCorruption(validationResult);
      
      expect(corruptionSpy).toHaveBeenCalled();
    });
  });

  describe('Browser Refresh Recovery', () => {
    beforeEach(async () => {
      await stateManager.initialize();
    });

    it('should store snapshot for refresh recovery', () => {
      stateManager.setState('user', { id: 1, name: 'Test User' });
      stateManager.createSnapshot();
      
      expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
        'app-state-refresh-recovery',
        expect.any(String)
      );
    });

    it('should restore from refresh recovery data', async () => {
      // Simulate stored recovery data
      const recoveryData = {
        snapshot: {
          timestamp: Date.now(),
          route: '/test',
          userState: { user: { id: 1, name: 'Test User' } },
          componentStates: new Map([['counter', 42]]),
          isValid: true,
          version: '1.0.0',
          checksum: 'test-checksum'
        },
        tabId: 'test-tab',
        timestamp: Date.now()
      };
      
      mockSessionStorage.store.set(
        'app-state-refresh-recovery',
        JSON.stringify(recoveryData)
      );
      
      // Create new instance to simulate refresh
      (ApplicationStateManager as any).instance = null;
      const newStateManager = ApplicationStateManager.getInstance({
        enableCrossTabSync: false,
        enableAutoRestore: true,
        maxSnapshots: 5,
        snapshotInterval: 0,
        corruptionCheckInterval: 0,
        enableBrowserRefreshRecovery: true
      });
      
      const restoreSpy = vi.fn();
      newStateManager.on('state-restored', restoreSpy);
      
      await newStateManager.initialize();
      
      expect(restoreSpy).toHaveBeenCalledWith(
        expect.objectContaining({ source: 'browser-refresh' })
      );
      
      newStateManager.destroy();
    });
  });

  describe('State Size Monitoring', () => {
    beforeEach(async () => {
      await stateManager.initialize();
    });

    it('should calculate state size', () => {
      stateManager.setState('small', 'test');
      stateManager.setState('large', { data: 'x'.repeat(1000) });
      
      const size = stateManager.getStateSize();
      expect(size).toBeGreaterThan(1000);
    });

    it('should detect oversized state', () => {
      // Create very large state (over 10MB limit)
      const largeData = 'x'.repeat(11 * 1024 * 1024);
      stateManager.setState('huge', largeData);
      
      const validationResult = (stateManager as any).validateCurrentState();
      expect(validationResult.isValid).toBe(false);
      expect(validationResult.errors).toContain('State size exceeds safe limits');
    });
  });

  describe('Cross-tab Synchronization', () => {
    beforeEach(async () => {
      await stateManager.initialize();
    });

    it('should broadcast state changes', () => {
      const broadcastChannel = (stateManager as any).broadcastChannel;
      const postMessageSpy = vi.spyOn(broadcastChannel, 'postMessage');
      
      stateManager.setState('testKey', 'testValue');
      
      expect(postMessageSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'STATE_UPDATE',
          payload: expect.objectContaining({
            key: 'testKey',
            value: 'testValue'
          })
        })
      );
    });

    it('should synchronize all state across tabs', () => {
      const broadcastChannel = (stateManager as any).broadcastChannel;
      const postMessageSpy = vi.spyOn(broadcastChannel, 'postMessage');
      
      stateManager.setState('key1', 'value1');
      stateManager.setState('key2', 'value2');
      
      stateManager.synchronizeAcrossTabs();
      
      expect(postMessageSpy).toHaveBeenCalledTimes(4); // 2 from setState + 2 from synchronizeAcrossTabs
    });
  });

  describe('Cleanup and Destruction', () => {
    it('should clean up resources on destroy', () => {
      const broadcastChannel = (stateManager as any).broadcastChannel;
      const closeSpy = vi.spyOn(broadcastChannel, 'close');
      
      stateManager.destroy();
      
      expect(closeSpy).toHaveBeenCalled();
      expect(stateManager.getAllSnapshots()).toHaveLength(0);
    });
  });
});