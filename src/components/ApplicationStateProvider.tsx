import React, { createContext, useContext, useEffect, useState } from 'react';
import { useApplicationState, ApplicationStateHookResult } from '../hooks/useApplicationState';
import { StateSnapshot } from '../services/ApplicationStateManager';

interface ApplicationStateContextValue extends ApplicationStateHookResult {
  isInitialized: boolean;
  initializationError: string | null;
}

const ApplicationStateContext = createContext<ApplicationStateContextValue | null>(null);

export interface ApplicationStateProviderProps {
  children: React.ReactNode;
  autoRestore?: boolean;
  autoSnapshot?: boolean;
  snapshotInterval?: number;
  enableCrossTabSync?: boolean;
  onStateRestored?: (snapshot: StateSnapshot) => void;
  onStateCorrupted?: (errors: string[]) => void;
  onRemoteStateUpdate?: (payload: any) => void;
  onInitializationError?: (error: Error) => void;
}

export const ApplicationStateProvider: React.FC<ApplicationStateProviderProps> = ({
  children,
  autoRestore = true,
  autoSnapshot = true,
  snapshotInterval = 30000,
  enableCrossTabSync = true,
  onStateRestored,
  onStateCorrupted,
  onRemoteStateUpdate,
  onInitializationError
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  const applicationState = useApplicationState({
    autoRestore,
    autoSnapshot,
    snapshotInterval,
    enableCrossTabSync,
    onStateRestored: (snapshot) => {
      setIsInitialized(true);
      onStateRestored?.(snapshot);
    },
    onStateCorrupted: (errors) => {
      console.warn('Application state corrupted:', errors);
      onStateCorrupted?.(errors);
    },
    onRemoteStateUpdate: (payload) => {
      console.log('Remote state update received:', payload);
      onRemoteStateUpdate?.(payload);
    }
  });

  useEffect(() => {
    // Initialize the application state system
    const initializeState = async () => {
      try {
        // Register common validators
        applicationState.registerValidator('userState.userId', (value) => 
          typeof value === 'string' && value.length > 0
        );
        
        applicationState.registerValidator('userState.role', (value) => 
          ['student', 'instructor', 'admin'].includes(value)
        );

        applicationState.registerValidator('route', (value) => 
          typeof value === 'string' && value.startsWith('/')
        );

        // If auto-restore is disabled, we're initialized immediately
        if (!autoRestore) {
          setIsInitialized(true);
        }

        // Create initial snapshot if no restoration occurred
        if (!autoRestore || !applicationState.lastSnapshot) {
          applicationState.createSnapshot();
        }

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown initialization error';
        setInitializationError(errorMessage);
        onInitializationError?.(error instanceof Error ? error : new Error(errorMessage));
        console.error('Failed to initialize application state:', error);
      }
    };

    initializeState();
  }, [applicationState, autoRestore, onInitializationError]);

  // Handle restoration completion when auto-restore is enabled
  useEffect(() => {
    if (autoRestore && !applicationState.isRestoring && !isInitialized && !initializationError) {
      setIsInitialized(true);
    }
  }, [autoRestore, applicationState.isRestoring, isInitialized, initializationError]);

  const contextValue: ApplicationStateContextValue = {
    ...applicationState,
    isInitialized,
    initializationError
  };

  return (
    <ApplicationStateContext.Provider value={contextValue}>
      {children}
    </ApplicationStateContext.Provider>
  );
};

export const useApplicationStateContext = (): ApplicationStateContextValue => {
  const context = useContext(ApplicationStateContext);
  if (!context) {
    throw new Error('useApplicationStateContext must be used within an ApplicationStateProvider');
  }
  return context;
};

// Higher-order component for class components
export function withApplicationState<P extends object>(
  Component: React.ComponentType<P & { applicationState: ApplicationStateContextValue }>
): React.FC<P> {
  return (props: P) => {
    const applicationState = useApplicationStateContext();
    return <Component {...props} applicationState={applicationState} />;
  };
}

export default ApplicationStateProvider;