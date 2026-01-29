import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useApplicationState } from '../useApplicationState';
import { ApplicationStateManager } from '../../services/ApplicationStateManager';

// Mock the ApplicationStateManager
vi.mock('../../services/ApplicationStateManager');

const MockApplicationStateManager = ApplicationStateManager as any;

describe('useApplicationState', () => {
  let mockStateManager: any;

  beforeEach(() => {
    mockStateManager = {
      on: vi.fn(),
      off: vi.fn(),
      createSnapshot: vi.fn(),
      restoreFromSnapshot: vi.fn(),
      restoreFromStorage: vi.fn(),
      cleanupCorruptedState: vi.fn(),
      synchronizeAcrossTabs: vi.fn(),
      registerStateValidator: vi.fn(),
      unregisterStateValidator: vi.fn(),
      getCurrentSnapshot: vi.fn(),
      getStateHealth: vi.fn().mockReturnValue({
        isHealthy: true,
        snapshotCount: 0,
        validationFailures: 0,
        lastSnapshotAge: 0,
        crossTabSyncEnabled: true
      })
    };

    MockApplicationStateManager.getInstance.mockReturnValue(mockStateManager);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useApplicationState());

    expect(result.current.isHealthy).toBe(true);
    expect(result.current.isRestoring).toBe(false);
    expect(result.current.snapshotCount).toBe(0);
    expect(result.current.validationFailures).toBe(0);
    expect(result.current.crossTabSyncEnabled).toBe(true);
  });

  it('should register event listeners on mount', () => {
    renderHook(() => useApplicationState());

    expect(mockStateManager.on).toHaveBeenCalledWith('snapshotCreated', expect.any(Function));
    expect(mockStateManager.on).toHaveBeenCalledWith('stateRestored', expect.any(Function));
    expect(mockStateManager.on).toHaveBeenCalledWith('stateRestorationFailed', expect.any(Function));
    expect(mockStateManager.on).toHaveBeenCalledWith('stateCorruptionDetected', expect.any(Function));
    expect(mockStateManager.on).toHaveBeenCalledWith('remoteStateUpdate', expect.any(Function));
    expect(mockStateManager.on).toHaveBeenCalledWith('corruptedStateCleanedUp', expect.any(Function));
  });

  it('should auto-restore from storage when enabled', async () => {
    mockStateManager.restoreFromStorage.mockResolvedValue(true);

    renderHook(() => useApplicationState({ autoRestore: true }));

    expect(mockStateManager.restoreFromStorage).toHaveBeenCalled();
  });

  it('should not auto-restore when disabled', () => {
    renderHook(() => useApplicationState({ autoRestore: false }));

    expect(mockStateManager.restoreFromStorage).not.toHaveBeenCalled();
  });

  it('should create snapshots', async () => {
    const mockSnapshot = {
      timestamp: Date.now(),
      route: '/test',
      userState: {},
      componentStates: new Map(),
      isValid: true,
      version: '1.0.0',
      checksum: 'test'
    };

    mockStateManager.createSnapshot.mockReturnValue(mockSnapshot);

    const { result } = renderHook(() => useApplicationState());

    await act(async () => {
      const snapshot = result.current.createSnapshot();
      expect(snapshot).toBe(mockSnapshot);
      expect(mockStateManager.createSnapshot).toHaveBeenCalled();
    });
  });

  it('should restore from snapshot', async () => {
    const mockSnapshot = {
      timestamp: Date.now(),
      route: '/test',
      userState: {},
      componentStates: new Map(),
      isValid: true,
      version: '1.0.0',
      checksum: 'test'
    };

    mockStateManager.restoreFromSnapshot.mockResolvedValue();

    const { result } = renderHook(() => useApplicationState());

    await act(async () => {
      await result.current.restoreFromSnapshot(mockSnapshot);
      expect(mockStateManager.restoreFromSnapshot).toHaveBeenCalledWith(mockSnapshot);
    });
  });

  it('should handle restoration errors', async () => {
    const mockSnapshot = {
      timestamp: Date.now(),
      route: '/test',
      userState: {},
      componentStates: new Map(),
      isValid: true,
      version: '1.0.0',
      checksum: 'test'
    };

    const error = new Error('Restoration failed');
    mockStateManager.restoreFromSnapshot.mockRejectedValue(error);

    const { result } = renderHook(() => useApplicationState());

    await act(async () => {
      await expect(result.current.restoreFromSnapshot(mockSnapshot)).rejects.toThrow('Restoration failed');
    });

    expect(result.current.isRestoring).toBe(false);
  });

  it('should restore from storage', async () => {
    mockStateManager.restoreFromStorage.mockResolvedValue(true);

    const { result } = renderHook(() => useApplicationState({ autoRestore: false }));

    await act(async () => {
      const restored = await result.current.restoreFromStorage();
      expect(restored).toBe(true);
      expect(mockStateManager.restoreFromStorage).toHaveBeenCalled();
    });
  });

  it('should cleanup corrupted state', async () => {
    const { result } = renderHook(() => useApplicationState());

    await act(async () => {
      result.current.cleanupCorruptedState();
      expect(mockStateManager.cleanupCorruptedState).toHaveBeenCalled();
    });
  });

  it('should synchronize across tabs', async () => {
    const { result } = renderHook(() => useApplicationState());

    await act(async () => {
      result.current.synchronizeAcrossTabs();
      expect(mockStateManager.synchronizeAcrossTabs).toHaveBeenCalled();
    });
  });

  it('should register and unregister validators', async () => {
    const validator = vi.fn();
    const { result } = renderHook(() => useApplicationState());

    await act(async () => {
      result.current.registerValidator('test', validator);
      expect(mockStateManager.registerStateValidator).toHaveBeenCalledWith('test', validator);

      result.current.unregisterValidator('test');
      expect(mockStateManager.unregisterStateValidator).toHaveBeenCalledWith('test');
    });
  });

  it('should handle snapshot created events', async () => {
    const mockSnapshot = {
      timestamp: Date.now(),
      route: '/test',
      userState: {},
      componentStates: new Map(),
      isValid: true,
      version: '1.0.0',
      checksum: 'test'
    };

    mockStateManager.getCurrentSnapshot.mockReturnValue(mockSnapshot);

    const { result } = renderHook(() => useApplicationState());

    // Simulate snapshot created event
    const snapshotCreatedHandler = mockStateManager.on.mock.calls.find(
      call => call[0] === 'snapshotCreated'
    )?.[1];

    await act(async () => {
      snapshotCreatedHandler?.(mockSnapshot);
    });

    expect(result.current.lastSnapshot).toBe(mockSnapshot);
  });

  it('should handle state restored events', async () => {
    const mockSnapshot = {
      timestamp: Date.now(),
      route: '/test',
      userState: {},
      componentStates: new Map(),
      isValid: true,
      version: '1.0.0',
      checksum: 'test'
    };

    const onStateRestored = vi.fn();
    const { result } = renderHook(() => useApplicationState({ onStateRestored }));

    // Simulate state restored event
    const stateRestoredHandler = mockStateManager.on.mock.calls.find(
      call => call[0] === 'stateRestored'
    )?.[1];

    await act(async () => {
      stateRestoredHandler?.(mockSnapshot);
    });

    expect(result.current.isRestoring).toBe(false);
    expect(onStateRestored).toHaveBeenCalledWith(mockSnapshot);
  });

  it('should handle state corruption events', async () => {
    const onStateCorrupted = vi.fn();
    renderHook(() => useApplicationState({ onStateCorrupted }));

    // Simulate state corruption event
    const stateCorruptedHandler = mockStateManager.on.mock.calls.find(
      call => call[0] === 'stateCorruptionDetected'
    )?.[1];

    const validation = { errors: ['Checksum mismatch'] };

    await act(async () => {
      stateCorruptedHandler?.(validation);
    });

    expect(onStateCorrupted).toHaveBeenCalledWith(validation.errors);
  });

  it('should handle remote state update events', async () => {
    const onRemoteStateUpdate = vi.fn();
    renderHook(() => useApplicationState({ onRemoteStateUpdate }));

    // Simulate remote state update event
    const remoteStateUpdateHandler = mockStateManager.on.mock.calls.find(
      call => call[0] === 'remoteStateUpdate'
    )?.[1];

    const payload = { data: 'test' };

    await act(async () => {
      remoteStateUpdateHandler?.(payload);
    });

    expect(onRemoteStateUpdate).toHaveBeenCalledWith(payload);
  });

  it('should set up auto-snapshot interval when enabled', () => {
    vi.useFakeTimers();

    renderHook(() => useApplicationState({ 
      autoSnapshot: true, 
      snapshotInterval: 1000 
    }));

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(mockStateManager.createSnapshot).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should not set up auto-snapshot when disabled', () => {
    vi.useFakeTimers();

    renderHook(() => useApplicationState({ 
      autoSnapshot: false 
    }));

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(30000);
    });

    expect(mockStateManager.createSnapshot).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should clean up event listeners on unmount', () => {
    const { unmount } = renderHook(() => useApplicationState());

    unmount();

    expect(mockStateManager.off).toHaveBeenCalledWith('snapshotCreated', expect.any(Function));
    expect(mockStateManager.off).toHaveBeenCalledWith('stateRestored', expect.any(Function));
    expect(mockStateManager.off).toHaveBeenCalledWith('stateRestorationFailed', expect.any(Function));
    expect(mockStateManager.off).toHaveBeenCalledWith('stateCorruptionDetected', expect.any(Function));
    expect(mockStateManager.off).toHaveBeenCalledWith('remoteStateUpdate', expect.any(Function));
    expect(mockStateManager.off).toHaveBeenCalledWith('corruptedStateCleanedUp', expect.any(Function));
  });

  it('should throw error when state manager is not initialized', async () => {
    MockApplicationStateManager.getInstance.mockReturnValue(null as any);

    const { result } = renderHook(() => useApplicationState());

    await act(async () => {
      expect(() => result.current.createSnapshot()).toThrow('State manager not initialized');
    });
  });

  it('should update health status when health changes', async () => {
    const unhealthyState = {
      isHealthy: false,
      snapshotCount: 5,
      validationFailures: 3,
      lastSnapshotAge: 1000,
      crossTabSyncEnabled: false
    };

    mockStateManager.getStateHealth.mockReturnValue(unhealthyState);

    const { result } = renderHook(() => useApplicationState());

    // Simulate health status change
    const corruptedStateCleanedUpHandler = mockStateManager.on.mock.calls.find(
      call => call[0] === 'corruptedStateCleanedUp'
    )?.[1];

    await act(async () => {
      corruptedStateCleanedUpHandler?.();
    });

    expect(result.current.isHealthy).toBe(false);
    expect(result.current.snapshotCount).toBe(5);
    expect(result.current.validationFailures).toBe(3);
    expect(result.current.crossTabSyncEnabled).toBe(false);
  });
});