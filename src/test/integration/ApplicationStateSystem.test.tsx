import React from 'react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { ApplicationStateProvider, useApplicationStateContext } from '../../components/ApplicationStateProvider';
import { StateHealthMonitor } from '../../components/StateHealthMonitor';
import { ApplicationStateManager } from '../../services/ApplicationStateManager';

// Mock BroadcastChannel
class MockBroadcastChannel {
  private listeners: ((event: MessageEvent) => void)[] = [];
  
  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (type === 'message') {
      this.listeners.push(listener);
    }
  }
  
  postMessage(data: any) {
    const event = new MessageEvent('message', { data });
    this.listeners.forEach(listener => listener(event));
  }
  
  close() {
    this.listeners = [];
  }
}

Object.defineProperty(global, 'BroadcastChannel', {
  value: MockBroadcastChannel,
  writable: true
});

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn()
};

Object.defineProperty(global, 'localStorage', {
  value: mockLocalStorage,
  writable: true
});

// Mock window
Object.defineProperty(global, 'window', {
  value: {
    location: { pathname: '/test' },
    history: { replaceState: vi.fn() },
    addEventListener: vi.fn()
  },
  writable: true
});

// Test component that uses the state context
const TestComponent: React.FC = () => {
  const {
    isHealthy,
    isRestoring,
    isInitialized,
    snapshotCount,
    createSnapshot,
    restoreFromStorage,
    cleanupCorruptedState
  } = useApplicationStateContext();

  return (
    <div>
      <div data-testid="health-status">{isHealthy ? 'healthy' : 'unhealthy'}</div>
      <div data-testid="restoring-status">{isRestoring ? 'restoring' : 'not-restoring'}</div>
      <div data-testid="initialized-status">{isInitialized ? 'initialized' : 'not-initialized'}</div>
      <div data-testid="snapshot-count">{snapshotCount}</div>
      
      <button onClick={() => createSnapshot()} data-testid="create-snapshot">
        Create Snapshot
      </button>
      <button onClick={() => restoreFromStorage()} data-testid="restore-storage">
        Restore from Storage
      </button>
      <button onClick={() => cleanupCorruptedState()} data-testid="cleanup-state">
        Cleanup State
      </button>
    </div>
  );
};

describe('Application State System Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset singleton instance
    (ApplicationStateManager as any).instance = null;
  });

  afterEach(() => {
    // Clean up any remaining instances
    const instance = (ApplicationStateManager as any).instance;
    if (instance) {
      instance.destroy();
    }
  });

  describe('ApplicationStateProvider', () => {
    it('should initialize and provide state context', async () => {
      render(
        <ApplicationStateProvider autoRestore={false}>
          <TestComponent />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('initialized-status')).toHaveTextContent('initialized');
      });

      expect(screen.getByTestId('health-status')).toHaveTextContent('healthy');
      expect(screen.getByTestId('restoring-status')).toHaveTextContent('not-restoring');
    });

    it('should handle auto-restore from storage', async () => {
      const mockSnapshot = {
        timestamp: Date.now(),
        route: '/test',
        userState: { userId: '123' },
        componentStates: new Map(),
        isValid: true,
        version: '1.0.0',
        checksum: 'test'
      };

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockSnapshot));

      render(
        <ApplicationStateProvider autoRestore={true}>
          <TestComponent />
        </ApplicationStateProvider>
      );

      // Should start in restoring state
      expect(screen.getByTestId('restoring-status')).toHaveTextContent('restoring');

      // Wait for restoration to complete
      await waitFor(() => {
        expect(screen.getByTestId('initialized-status')).toHaveTextContent('initialized');
      });

      expect(screen.getByTestId('restoring-status')).toHaveTextContent('not-restoring');
    });

    it('should handle restoration errors gracefully', async () => {
      mockLocalStorage.getItem.mockReturnValue('invalid json');

      const onInitializationError = vi.fn();

      render(
        <ApplicationStateProvider 
          autoRestore={true}
          onInitializationError={onInitializationError}
        >
          <TestComponent />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('initialized-status')).toHaveTextContent('initialized');
      });

      // Should still initialize even with restoration error
      expect(screen.getByTestId('health-status')).toHaveTextContent('healthy');
    });

    it('should create snapshots through context', async () => {
      render(
        <ApplicationStateProvider autoRestore={false}>
          <TestComponent />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('initialized-status')).toHaveTextContent('initialized');
      });

      const initialCount = parseInt(screen.getByTestId('snapshot-count').textContent || '0');

      await act(async () => {
        fireEvent.click(screen.getByTestId('create-snapshot'));
      });

      await waitFor(() => {
        const newCount = parseInt(screen.getByTestId('snapshot-count').textContent || '0');
        expect(newCount).toBeGreaterThan(initialCount);
      });
    });

    it('should handle state corruption and cleanup', async () => {
      render(
        <ApplicationStateProvider autoRestore={false}>
          <TestComponent />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('initialized-status')).toHaveTextContent('initialized');
      });

      // Simulate state corruption by triggering cleanup
      await act(async () => {
        fireEvent.click(screen.getByTestId('cleanup-state'));
      });

      // Should remain healthy after cleanup
      expect(screen.getByTestId('health-status')).toHaveTextContent('healthy');
    });
  });

  describe('StateHealthMonitor', () => {
    it('should display health status', async () => {
      render(
        <ApplicationStateProvider autoRestore={false}>
          <StateHealthMonitor showDetails={true} autoHide={false} />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/Application state is healthy/)).toBeInTheDocument();
      });

      expect(screen.getByText(/Snapshots:/)).toBeInTheDocument();
      expect(screen.getByText(/Validation Failures:/)).toBeInTheDocument();
    });

    it('should show recovery actions when unhealthy', async () => {
      render(
        <ApplicationStateProvider autoRestore={false}>
          <StateHealthMonitor showDetails={true} autoHide={false} />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/Application state is healthy/)).toBeInTheDocument();
      });

      // The component should show maintenance actions for healthy state
      expect(screen.getByText('Manual Snapshot')).toBeInTheDocument();
    });

    it('should handle recovery actions', async () => {
      render(
        <ApplicationStateProvider autoRestore={false}>
          <StateHealthMonitor showDetails={true} autoHide={false} />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByText(/Application state is healthy/)).toBeInTheDocument();
      });

      // Click manual snapshot button
      await act(async () => {
        fireEvent.click(screen.getByText('Manual Snapshot'));
      });

      // Should not throw any errors
      expect(screen.getByText(/Application state is healthy/)).toBeInTheDocument();
    });

    it('should auto-hide when healthy', async () => {
      render(
        <ApplicationStateProvider autoRestore={false}>
          <StateHealthMonitor autoHide={true} />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        // Should show minimized indicator
        expect(screen.getByTitle(/Application state is healthy/)).toBeInTheDocument();
      });

      // Should not show detailed view initially
      expect(screen.queryByText(/Snapshots:/)).not.toBeInTheDocument();
    });

    it('should expand when clicked', async () => {
      render(
        <ApplicationStateProvider autoRestore={false}>
          <StateHealthMonitor autoHide={true} showDetails={true} />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        const toggleButton = screen.getByTitle(/Application state is healthy/);
        expect(toggleButton).toBeInTheDocument();
      });

      // Click to expand
      await act(async () => {
        fireEvent.click(screen.getByTitle(/Application state is healthy/));
      });

      // Should show detailed view
      await waitFor(() => {
        expect(screen.getByText(/Snapshots:/)).toBeInTheDocument();
      });
    });
  });

  describe('Cross-tab Synchronization', () => {
    it('should handle cross-tab state updates', async () => {
      const onRemoteStateUpdate = vi.fn();

      render(
        <ApplicationStateProvider 
          autoRestore={false}
          enableCrossTabSync={true}
          onRemoteStateUpdate={onRemoteStateUpdate}
        >
          <TestComponent />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('initialized-status')).toHaveTextContent('initialized');
      });

      // Simulate cross-tab message
      const stateManager = ApplicationStateManager.getInstance();
      const broadcastChannel = (stateManager as any).broadcastChannel;

      if (broadcastChannel) {
        const remoteSnapshot = {
          timestamp: Date.now() + 1000,
          route: '/remote',
          userState: { userId: '456' },
          componentStates: new Map(),
          isValid: true,
          version: '1.0.0',
          checksum: 'remote'
        };

        await act(async () => {
          broadcastChannel.postMessage({
            type: 'STATE_UPDATE',
            payload: remoteSnapshot,
            timestamp: Date.now(),
            tabId: 'different_tab'
          });
        });

        // Should trigger remote state update callback
        await waitFor(() => {
          expect(onRemoteStateUpdate).toHaveBeenCalledWith(remoteSnapshot);
        });
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle context usage outside provider', () => {
      // Mock console.error to avoid test output noise
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useApplicationStateContext must be used within an ApplicationStateProvider');

      consoleSpy.mockRestore();
    });

    it('should handle state corruption events', async () => {
      const onStateCorrupted = vi.fn();

      render(
        <ApplicationStateProvider 
          autoRestore={false}
          onStateCorrupted={onStateCorrupted}
        >
          <TestComponent />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('initialized-status')).toHaveTextContent('initialized');
      });

      // Simulate state corruption
      const stateManager = ApplicationStateManager.getInstance();
      
      await act(async () => {
        stateManager.emit('stateCorruptionDetected', { errors: ['Test corruption'] });
      });

      expect(onStateCorrupted).toHaveBeenCalledWith(['Test corruption']);
    });
  });

  describe('State Persistence', () => {
    it('should save state to storage on snapshot creation', async () => {
      render(
        <ApplicationStateProvider autoRestore={false}>
          <TestComponent />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('initialized-status')).toHaveTextContent('initialized');
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId('create-snapshot'));
      });

      // Should save to localStorage
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        'app_state_backup',
        expect.any(String)
      );
    });

    it('should restore state from storage on demand', async () => {
      const mockSnapshot = {
        timestamp: Date.now(),
        route: '/stored',
        userState: { userId: '789' },
        componentStates: new Map(),
        isValid: true,
        version: '1.0.0',
        checksum: 'stored'
      };

      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockSnapshot));

      render(
        <ApplicationStateProvider autoRestore={false}>
          <TestComponent />
        </ApplicationStateProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('initialized-status')).toHaveTextContent('initialized');
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId('restore-storage'));
      });

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('app_state_backup');
    });
  });
});