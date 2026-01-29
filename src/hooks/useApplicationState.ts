import { useState, useEffect, useCallback, useRef } from 'react';
import ApplicationStateManager, { StateSnapshot, ApplicationStateConfig } from '../services/ApplicationStateManager';

interface UseApplicationStateOptions {
  key?: string;
  initialValue?: any;
  enableAutoSnapshot?: boolean;
  snapshotOnChange?: boolean;
}

interface UseApplicationStateReturn<T> {
  value: T;
  setValue: (newValue: T) => void;
  isLoading: boolean;
  error: Error | null;
  createSnapshot: () => StateSnapshot;
  restoreFromSnapshot: (snapshot: StateSnapshot) => Promise<void>;
  isCorrupted: boolean;
  lastSyncTime: number | null;
  stateSize: number;
}

const defaultConfig: ApplicationStateConfig = {
  enableCrossTabSync: true,
  enableAutoRestore: true,
  maxSnapshots: 10,
  snapshotInterval: 30000, // 30 seconds
  corruptionCheckInterval: 60000, // 1 minute
  enableBrowserRefreshRecovery: true
};

let stateManagerInstance: ApplicationStateManager | null = null;

export function useApplicationState<T = any>(
  options: UseApplicationStateOptions = {}
): UseApplicationStateReturn<T> {
  const {
    key,
    initialValue,
    enableAutoSnapshot = false,
    snapshotOnChange = false
  } = options;

  const [value, setValueState] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isCorrupted, setIsCorrupted] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<number | null>(null);
  const [stateSize, setStateSize] = useState(0);

  const stateManagerRef = useRef<ApplicationStateManager | null>(null);

  // Initialize state manager
  useEffect(() => {
    const initializeStateManager = async () => {
      try {
        if (!stateManagerInstance) {
          stateManagerInstance = ApplicationStateManager.getInstance(defaultConfig);
          await stateManagerInstance.initialize();
        }
        stateManagerRef.current = stateManagerInstance;

        // Load initial value if key is provided
        if (key && stateManagerInstance.hasState(key)) {
          const storedValue = stateManagerInstance.getState(key);
          setValueState(storedValue);
        }

        setIsLoading(false);
      } catch (err) {
        setError(err as Error);
        setIsLoading(false);
      }
    };

    initializeStateManager();
  }, [key]);

  // Set up event listeners
  useEffect(() => {
    if (!stateManagerRef.current) return;

    const stateManager = stateManagerRef.current;

    const handleStateChanged = (data: { key: string; value: any }) => {
      if (key && data.key === key) {
        setValueState(data.value);
        setLastSyncTime(Date.now());
      }
    };

    const handleStateRestored = () => {
      if (key && stateManager.hasState(key)) {
        const restoredValue = stateManager.getState(key);
        setValueState(restoredValue);
      }
      setLastSyncTime(Date.now());
    };

    const handleCorruptionDetected = () => {
      setIsCorrupted(true);
      setError(new Error('State corruption detected'));
    };

    const handleCorruptionRecovered = () => {
      setIsCorrupted(false);
      setError(null);
      if (key && stateManager.hasState(key)) {
        const recoveredValue = stateManager.getState(key);
        setValueState(recoveredValue);
      }
    };

    const handleStateSynchronized = () => {
      setLastSyncTime(Date.now());
      if (key && stateManager.hasState(key)) {
        const syncedValue = stateManager.getState(key);
        setValueState(syncedValue);
      }
    };

    // Add event listeners
    stateManager.on('state-changed', handleStateChanged);
    stateManager.on('state-restored', handleStateRestored);
    stateManager.on('corruption-detected', handleCorruptionDetected);
    stateManager.on('corruption-recovered', handleCorruptionRecovered);
    stateManager.on('state-synchronized', handleStateSynchronized);

    // Update state size periodically
    const updateStateSize = () => {
      setStateSize(stateManager.getStateSize());
    };
    updateStateSize();
    const sizeUpdateInterval = setInterval(updateStateSize, 5000);

    return () => {
      stateManager.off('state-changed', handleStateChanged);
      stateManager.off('state-restored', handleStateRestored);
      stateManager.off('corruption-detected', handleCorruptionDetected);
      stateManager.off('corruption-recovered', handleCorruptionRecovered);
      stateManager.off('state-synchronized', handleStateSynchronized);
      clearInterval(sizeUpdateInterval);
    };
  }, [key]);

  // Auto-snapshot functionality
  useEffect(() => {
    if (!enableAutoSnapshot || !stateManagerRef.current) return;

    const interval = setInterval(() => {
      stateManagerRef.current?.createSnapshot();
    }, 30000); // Create snapshot every 30 seconds

    return () => clearInterval(interval);
  }, [enableAutoSnapshot]);

  const setValue = useCallback((newValue: T) => {
    if (!stateManagerRef.current) {
      setValueState(newValue);
      return;
    }

    try {
      if (key) {
        stateManagerRef.current.setState(key, newValue);
      }
      setValueState(newValue);

      // Create snapshot on change if enabled
      if (snapshotOnChange) {
        stateManagerRef.current.createSnapshot();
      }

      setError(null);
    } catch (err) {
      setError(err as Error);
    }
  }, [key, snapshotOnChange]);

  const createSnapshot = useCallback((): StateSnapshot => {
    if (!stateManagerRef.current) {
      throw new Error('State manager not initialized');
    }
    return stateManagerRef.current.createSnapshot();
  }, []);

  const restoreFromSnapshot = useCallback(async (snapshot: StateSnapshot): Promise<void> => {
    if (!stateManagerRef.current) {
      throw new Error('State manager not initialized');
    }

    try {
      await stateManagerRef.current.restoreFromSnapshot(snapshot);
      if (key && stateManagerRef.current.hasState(key)) {
        const restoredValue = stateManagerRef.current.getState(key);
        setValueState(restoredValue);
      }
      setError(null);
      setIsCorrupted(false);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  }, [key]);

  return {
    value,
    setValue,
    isLoading,
    error,
    createSnapshot,
    restoreFromSnapshot,
    isCorrupted,
    lastSyncTime,
    stateSize
  };
}

// Hook for managing multiple state keys
export function useApplicationStateManager() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [snapshots, setSnapshots] = useState<StateSnapshot[]>([]);
  const [isCorrupted, setIsCorrupted] = useState(false);
  const [stateSize, setStateSize] = useState(0);

  const stateManagerRef = useRef<ApplicationStateManager | null>(null);

  useEffect(() => {
    const initializeStateManager = async () => {
      try {
        if (!stateManagerInstance) {
          stateManagerInstance = ApplicationStateManager.getInstance(defaultConfig);
          await stateManagerInstance.initialize();
        }
        stateManagerRef.current = stateManagerInstance;
        setIsInitialized(true);
      } catch (err) {
        setError(err as Error);
      }
    };

    initializeStateManager();
  }, []);

  useEffect(() => {
    if (!stateManagerRef.current) return;

    const stateManager = stateManagerRef.current;

    const handleSnapshotCreated = (snapshot: StateSnapshot) => {
      setSnapshots(stateManager.getAllSnapshots());
    };

    const handleCorruptionDetected = () => {
      setIsCorrupted(true);
    };

    const handleCorruptionRecovered = () => {
      setIsCorrupted(false);
    };

    stateManager.on('snapshot-created', handleSnapshotCreated);
    stateManager.on('corruption-detected', handleCorruptionDetected);
    stateManager.on('corruption-recovered', handleCorruptionRecovered);

    // Update snapshots and state size
    setSnapshots(stateManager.getAllSnapshots());
    const updateStateSize = () => {
      setStateSize(stateManager.getStateSize());
    };
    updateStateSize();
    const sizeUpdateInterval = setInterval(updateStateSize, 5000);

    return () => {
      stateManager.off('snapshot-created', handleSnapshotCreated);
      stateManager.off('corruption-detected', handleCorruptionDetected);
      stateManager.off('corruption-recovered', handleCorruptionRecovered);
      clearInterval(sizeUpdateInterval);
    };
  }, [isInitialized]);

  const createSnapshot = useCallback((): StateSnapshot | null => {
    if (!stateManagerRef.current) return null;
    return stateManagerRef.current.createSnapshot();
  }, []);

  const restoreFromSnapshot = useCallback(async (snapshot: StateSnapshot): Promise<void> => {
    if (!stateManagerRef.current) {
      throw new Error('State manager not initialized');
    }
    await stateManagerRef.current.restoreFromSnapshot(snapshot);
  }, []);

  const synchronizeAcrossTabs = useCallback((): void => {
    if (!stateManagerRef.current) return;
    stateManagerRef.current.synchronizeAcrossTabs();
  }, []);

  const detectCorruption = useCallback((): boolean => {
    if (!stateManagerRef.current) return false;
    return stateManagerRef.current.detectStateCorruption();
  }, []);

  const cleanupCorruptedState = useCallback((): void => {
    if (!stateManagerRef.current) return;
    stateManagerRef.current.cleanupCorruptedState();
  }, []);

  const setState = useCallback((key: string, value: any): void => {
    if (!stateManagerRef.current) return;
    stateManagerRef.current.setState(key, value);
  }, []);

  const getState = useCallback((key: string): any => {
    if (!stateManagerRef.current) return undefined;
    return stateManagerRef.current.getState(key);
  }, []);

  const removeState = useCallback((key: string): void => {
    if (!stateManagerRef.current) return;
    stateManagerRef.current.removeState(key);
  }, []);

  return {
    isInitialized,
    error,
    snapshots,
    isCorrupted,
    stateSize,
    createSnapshot,
    restoreFromSnapshot,
    synchronizeAcrossTabs,
    detectCorruption,
    cleanupCorruptedState,
    setState,
    getState,
    removeState,
    stateManager: stateManagerRef.current
  };
}

export default useApplicationState;