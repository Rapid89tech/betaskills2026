/**
 * Unit tests for ConnectionStatusIndicator component
 * 
 * Tests connection status display, reconnecting state, and data refresh on reconnection
 * Requirements: 7.4, 7.5
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { ConnectionStatusIndicator } from '../ConnectionStatusIndicator';
import { dataSyncService } from '@/services/DataSyncService';

// Mock the auth context
vi.mock('@/hooks/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'test-user-id' },
    profile: null,
    loading: false
  })
}));

// Mock the logger
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn()
  }
}));

describe('ConnectionStatusIndicator Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should not render when connected and not syncing', () => {
    // Mock the state to be connected and not syncing
    vi.spyOn(dataSyncService, 'getState').mockReturnValue({
      isOnline: true,
      isSyncing: false,
      lastSyncTimestamp: null,
      pendingOperations: [],
      connectionStatus: 'connected'
    });

    const { container } = render(<ConnectionStatusIndicator />);
    expect(container.firstChild).toBeNull();
  });

  it('should display offline status when disconnected', () => {
    // Mock the state to be disconnected
    vi.spyOn(dataSyncService, 'getState').mockReturnValue({
      isOnline: false,
      isSyncing: false,
      lastSyncTimestamp: null,
      pendingOperations: [],
      connectionStatus: 'disconnected'
    });

    // Mock onStateChange to immediately call the callback
    vi.spyOn(dataSyncService, 'onStateChange').mockImplementation((callback) => {
      callback(dataSyncService.getState());
      return () => {};
    });

    render(<ConnectionStatusIndicator />);
    
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Connection status: Offline');
    expect(screen.getByText('Offline')).toBeInTheDocument();
  });

  it('should display reconnecting state', () => {
    // Mock the state to be reconnecting
    vi.spyOn(dataSyncService, 'getState').mockReturnValue({
      isOnline: false,
      isSyncing: false,
      lastSyncTimestamp: null,
      pendingOperations: [],
      connectionStatus: 'reconnecting'
    });

    // Mock onStateChange to immediately call the callback
    vi.spyOn(dataSyncService, 'onStateChange').mockImplementation((callback) => {
      callback(dataSyncService.getState());
      return () => {};
    });

    render(<ConnectionStatusIndicator />);
    
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Connection status: Reconnecting...');
    expect(screen.getByText('Reconnecting...')).toBeInTheDocument();
  });

  it('should display syncing state when connected and syncing', () => {
    // Mock the state to be connected and syncing
    vi.spyOn(dataSyncService, 'getState').mockReturnValue({
      isOnline: true,
      isSyncing: true,
      lastSyncTimestamp: null,
      pendingOperations: [],
      connectionStatus: 'connected'
    });

    // Mock onStateChange to immediately call the callback
    vi.spyOn(dataSyncService, 'onStateChange').mockImplementation((callback) => {
      callback(dataSyncService.getState());
      return () => {};
    });

    render(<ConnectionStatusIndicator />);
    
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Connection status: Syncing...');
    expect(screen.getByText('Syncing...')).toBeInTheDocument();
  });

  it('should display pending operations count', () => {
    // Mock the state with pending operations
    vi.spyOn(dataSyncService, 'getState').mockReturnValue({
      isOnline: false,
      isSyncing: false,
      lastSyncTimestamp: null,
      pendingOperations: [
        { id: '1', type: 'enrollment', action: 'create', data: {}, timestamp: '', retryCount: 0 },
        { id: '2', type: 'progress', action: 'update', data: {}, timestamp: '', retryCount: 0 }
      ],
      connectionStatus: 'disconnected'
    });

    // Mock onStateChange to immediately call the callback
    vi.spyOn(dataSyncService, 'onStateChange').mockImplementation((callback) => {
      callback(dataSyncService.getState());
      return () => {};
    });

    render(<ConnectionStatusIndicator />);
    
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should subscribe to state changes on mount', () => {
    const onStateChangeSpy = vi.spyOn(dataSyncService, 'onStateChange');
    
    // Mock the state
    vi.spyOn(dataSyncService, 'getState').mockReturnValue({
      isOnline: false,
      isSyncing: false,
      lastSyncTimestamp: null,
      pendingOperations: [],
      connectionStatus: 'disconnected'
    });

    // Mock onStateChange to return unsubscribe function
    onStateChangeSpy.mockImplementation((callback) => {
      callback(dataSyncService.getState());
      return () => {};
    });

    render(<ConnectionStatusIndicator />);

    // Verify that the component subscribed to state changes
    expect(onStateChangeSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from events on unmount', () => {
    const unsubscribeMock = vi.fn();
    vi.spyOn(dataSyncService, 'onStateChange').mockReturnValue(unsubscribeMock);

    // Mock the state
    vi.spyOn(dataSyncService, 'getState').mockReturnValue({
      isOnline: true,
      isSyncing: false,
      lastSyncTimestamp: null,
      pendingOperations: [],
      connectionStatus: 'connected'
    });

    const { unmount } = render(<ConnectionStatusIndicator />);
    
    unmount();
    
    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
