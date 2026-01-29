/**
 * Test Suite for useRealTimePaymentSync Hooks
 * 
 * Tests React hooks for real-time payment synchronization functionality
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { 
  useRealTimePaymentSync, 
  useRealTimeEnrollmentUpdates,
  useRealTimeAdminUpdates,
  useCrossTabSync
} from '../useRealTimePaymentSync';
import { PaymentStatus, EnrollmentStatus } from '@/types/ikhokha';

// Mock the RealTimePaymentSync service
const mockRealTimePaymentSync = {
  initialize: vi.fn(),
  syncPaymentStatus: vi.fn(),
  syncEnrollmentStatus: vi.fn(),
  subscribeToStatusUpdates: vi.fn(),
  subscribeToUserUpdates: vi.fn(),
  subscribeToAdminUpdates: vi.fn(),
  getHealthStatus: vi.fn(),
  cleanup: vi.fn()
};

// Mock window events
const mockWindowEvents: { [key: string]: EventListener[] } = {};
const mockAddEventListener = vi.fn((type: string, listener: EventListener) => {
  if (!mockWindowEvents[type]) {
    mockWindowEvents[type] = [];
  }
  mockWindowEvents[type].push(listener);
});

const mockRemoveEventListener = vi.fn((type: string, listener: EventListener) => {
  if (mockWindowEvents[type]) {
    const index = mockWindowEvents[type].indexOf(listener);
    if (index > -1) {
      mockWindowEvents[type].splice(index, 1);
    }
  }
});

const mockDispatchEvent = vi.fn((event: Event) => {
  const listeners = mockWindowEvents[event.type] || [];
  listeners.forEach(listener => listener(event));
});

describe('useRealTimePaymentSync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock the service module
    vi.doMock('@/services/RealTimePaymentSync', () => ({
      realTimePaymentSync: mockRealTimePaymentSync
    }));

    // Mock window
    global.window = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: mockDispatchEvent,
    } as any;

    // Setup default mock implementations
    mockRealTimePaymentSync.initialize.mockResolvedValue(undefined);
    mockRealTimePaymentSync.syncPaymentStatus.mockResolvedValue(undefined);
    mockRealTimePaymentSync.syncEnrollmentStatus.mockResolvedValue(undefined);
    mockRealTimePaymentSync.subscribeToStatusUpdates.mockReturnValue(() => {});
    mockRealTimePaymentSync.subscribeToUserUpdates.mockReturnValue(() => {});
    mockRealTimePaymentSync.subscribeToAdminUpdates.mockReturnValue(() => {});
    mockRealTimePaymentSync.getHealthStatus.mockReturnValue({
      initialized: true,
      listenersCount: 0,
      userListenersCount: 0,
      adminListenersCount: 0,
      supabaseConnected: true
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Clear mock events
    Object.keys(mockWindowEvents).forEach(key => {
      mockWindowEvents[key] = [];
    });
  });

  describe('Basic Hook Functionality', () => {
    it('should initialize the service on mount', async () => {
      const { result } = renderHook(() => useRealTimePaymentSync());

      expect(mockRealTimePaymentSync.initialize).toHaveBeenCalled();
      expect(result.current.isConnected).toBe(true);
    });

    it('should provide sync methods', () => {
      const { result } = renderHook(() => useRealTimePaymentSync());

      expect(typeof result.current.syncPaymentStatus).toBe('function');
      expect(typeof result.current.syncEnrollmentStatus).toBe('function');
      expect(typeof result.current.refreshConnection).toBe('function');
    });

    it('should call syncPaymentStatus correctly', async () => {
      const { result } = renderHook(() => useRealTimePaymentSync());

      await act(async () => {
        await result.current.syncPaymentStatus('payment-123', PaymentStatus.COMPLETED);
      });

      expect(mockRealTimePaymentSync.syncPaymentStatus).toHaveBeenCalledWith(
        'payment-123',
        PaymentStatus.COMPLETED
      );
    });

    it('should call syncEnrollmentStatus correctly', async () => {
      const { result } = renderHook(() => useRealTimePaymentSync());

      await act(async () => {
        await result.current.syncEnrollmentStatus('enrollment-123', EnrollmentStatus.APPROVED);
      });

      expect(mockRealTimePaymentSync.syncEnrollmentStatus).toHaveBeenCalledWith(
        'enrollment-123',
        EnrollmentStatus.APPROVED
      );
    });

    it('should handle sync errors', async () => {
      mockRealTimePaymentSync.syncPaymentStatus.mockRejectedValue(new Error('Sync failed'));

      const { result } = renderHook(() => useRealTimePaymentSync());

      await expect(
        result.current.syncPaymentStatus('payment-123', PaymentStatus.COMPLETED)
      ).rejects.toThrow('Sync failed');
    });
  });

  describe('Subscription Management', () => {
    it('should subscribe to status updates', () => {
      renderHook(() => useRealTimePaymentSync());

      expect(mockRealTimePaymentSync.subscribeToStatusUpdates).toHaveBeenCalled();
    });

    it('should subscribe to user updates when userId provided', () => {
      renderHook(() => useRealTimePaymentSync({ userId: 'user-456' }));

      expect(mockRealTimePaymentSync.subscribeToUserUpdates).toHaveBeenCalledWith(
        'user-456',
        expect.any(Function)
      );
    });

    it('should subscribe to admin updates when isAdmin is true', () => {
      renderHook(() => useRealTimePaymentSync({ isAdmin: true }));

      expect(mockRealTimePaymentSync.subscribeToAdminUpdates).toHaveBeenCalled();
    });

    it('should not subscribe to user updates when userId not provided', () => {
      renderHook(() => useRealTimePaymentSync());

      expect(mockRealTimePaymentSync.subscribeToUserUpdates).not.toHaveBeenCalled();
    });

    it('should cleanup subscriptions on unmount', () => {
      const unsubscribeMock = vi.fn();
      mockRealTimePaymentSync.subscribeToStatusUpdates.mockReturnValue(unsubscribeMock);

      const { unmount } = renderHook(() => useRealTimePaymentSync());

      unmount();

      expect(unsubscribeMock).toHaveBeenCalled();
    });
  });

  describe('Event Filtering', () => {
    it('should filter status updates by userId', () => {
      let statusCallback: (update: any) => void;
      mockRealTimePaymentSync.subscribeToStatusUpdates.mockImplementation((callback) => {
        statusCallback = callback;
        return () => {};
      });

      renderHook(() => useRealTimePaymentSync({ userId: 'user-456' }));

      const update = {
        target_user_id: 'user-456',
        course_id: 'course-789',
        enrollment_id: 'enrollment-123'
      };

      act(() => {
        statusCallback(update);
      });

      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'filtered-status-update'
        })
      );
    });

    it('should filter out updates for different users', () => {
      let statusCallback: (update: any) => void;
      mockRealTimePaymentSync.subscribeToStatusUpdates.mockImplementation((callback) => {
        statusCallback = callback;
        return () => {};
      });

      renderHook(() => useRealTimePaymentSync({ userId: 'user-456' }));

      const update = {
        target_user_id: 'different-user',
        course_id: 'course-789',
        enrollment_id: 'enrollment-123'
      };

      act(() => {
        statusCallback(update);
      });

      expect(mockDispatchEvent).not.toHaveBeenCalled();
    });

    it('should filter updates by courseId', () => {
      let statusCallback: (update: any) => void;
      mockRealTimePaymentSync.subscribeToStatusUpdates.mockImplementation((callback) => {
        statusCallback = callback;
        return () => {};
      });

      renderHook(() => useRealTimePaymentSync({ courseId: 'course-789' }));

      const update = {
        target_user_id: 'user-456',
        course_id: 'different-course',
        enrollment_id: 'enrollment-123'
      };

      act(() => {
        statusCallback(update);
      });

      expect(mockDispatchEvent).not.toHaveBeenCalled();
    });
  });

  describe('Health Status', () => {
    it('should return connection status', () => {
      const { result } = renderHook(() => useRealTimePaymentSync());

      expect(result.current.isConnected).toBe(true);
      expect(result.current.healthStatus).toEqual({
        initialized: true,
        listenersCount: 0,
        userListenersCount: 0,
        adminListenersCount: 0,
        supabaseConnected: true
      });
    });

    it('should show disconnected when service not initialized', () => {
      mockRealTimePaymentSync.getHealthStatus.mockReturnValue({
        initialized: false,
        listenersCount: 0,
        userListenersCount: 0,
        adminListenersCount: 0,
        supabaseConnected: false
      });

      const { result } = renderHook(() => useRealTimePaymentSync());

      expect(result.current.isConnected).toBe(false);
    });
  });

  describe('Refresh Connection', () => {
    it('should refresh connection', async () => {
      const { result } = renderHook(() => useRealTimePaymentSync());

      await act(async () => {
        await result.current.refreshConnection();
      });

      expect(mockRealTimePaymentSync.initialize).toHaveBeenCalledTimes(2); // Once on mount, once on refresh
    });

    it('should handle refresh errors', async () => {
      mockRealTimePaymentSync.initialize.mockRejectedValueOnce(new Error('Refresh failed'));

      const { result } = renderHook(() => useRealTimePaymentSync());

      await expect(result.current.refreshConnection()).rejects.toThrow('Refresh failed');
    });
  });
});

describe('useRealTimeEnrollmentUpdates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    global.window = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: mockDispatchEvent,
    } as any;

    mockRealTimePaymentSync.getHealthStatus.mockReturnValue({
      initialized: true,
      supabaseConnected: true
    });
  });

  it('should setup course-specific event listeners', () => {
    renderHook(() => useRealTimeEnrollmentUpdates('course-789', 'user-456'));

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'filtered-status-update',
      expect.any(Function)
    );
  });

  it('should handle course enrollment updates', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    renderHook(() => useRealTimeEnrollmentUpdates('course-789', 'user-456'));

    // Get the event listener
    const listener = mockWindowEvents['filtered-status-update'][0];

    // Simulate event
    const event = new CustomEvent('filtered-status-update', {
      detail: {
        courseId: 'course-789',
        userId: 'user-456',
        status: 'approved'
      }
    });

    act(() => {
      listener(event);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Course enrollment update:', event.detail);
    
    consoleSpy.mockRestore();
  });

  it('should cleanup event listeners on unmount', () => {
    const { unmount } = renderHook(() => useRealTimeEnrollmentUpdates('course-789'));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'filtered-status-update',
      expect.any(Function)
    );
  });
});

describe('useRealTimeAdminUpdates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    global.window = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: mockDispatchEvent,
    } as any;

    mockRealTimePaymentSync.getHealthStatus.mockReturnValue({
      initialized: true,
      supabaseConnected: true
    });
  });

  it('should setup admin event listeners', () => {
    renderHook(() => useRealTimeAdminUpdates());

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'admin-specific-update',
      expect.any(Function)
    );
  });

  it('should handle new EFT enrollment updates', () => {
    renderHook(() => useRealTimeAdminUpdates());

    const listener = mockWindowEvents['admin-specific-update'][0];

    const event = new CustomEvent('admin-specific-update', {
      detail: {
        type: 'new_eft_enrollment',
        enrollmentId: 'enrollment-123',
        userEmail: 'test@example.com',
        courseName: 'Test Course'
      }
    });

    act(() => {
      listener(event);
    });

    expect(mockDispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'new-pending-enrollment'
      })
    );
  });

  it('should handle enrollment approval updates', () => {
    renderHook(() => useRealTimeAdminUpdates());

    const listener = mockWindowEvents['admin-specific-update'][0];

    const event = new CustomEvent('admin-specific-update', {
      detail: {
        type: 'enrollment_requires_approval',
        enrollmentId: 'enrollment-123'
      }
    });

    act(() => {
      listener(event);
    });

    expect(mockDispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'enrollment-needs-approval'
      })
    );
  });
});

describe('useCrossTabSync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    global.window = {
      addEventListener: mockAddEventListener,
      removeEventListener: mockRemoveEventListener,
      dispatchEvent: mockDispatchEvent,
    } as any;
  });

  it('should setup cross-tab sync listeners', () => {
    renderHook(() => useCrossTabSync('user-456'));

    expect(mockAddEventListener).toHaveBeenCalledWith(
      'cross-tab-enrollment-sync',
      expect.any(Function)
    );
  });

  it('should handle cross-tab sync for specific user', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    renderHook(() => useCrossTabSync('user-456'));

    const listener = mockWindowEvents['cross-tab-enrollment-sync'][0];

    const event = new CustomEvent('cross-tab-enrollment-sync', {
      detail: {
        userId: 'user-456',
        data: {
          enrollmentId: 'enrollment-123',
          status: 'approved'
        }
      }
    });

    act(() => {
      listener(event);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Cross-tab sync received:', event.detail.data);
    expect(mockDispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'enrollment-synced-across-tabs'
      })
    );
    
    consoleSpy.mockRestore();
  });

  it('should ignore sync for different users', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    
    renderHook(() => useCrossTabSync('user-456'));

    const listener = mockWindowEvents['cross-tab-enrollment-sync'][0];

    const event = new CustomEvent('cross-tab-enrollment-sync', {
      detail: {
        userId: 'different-user',
        data: { enrollmentId: 'enrollment-123' }
      }
    });

    act(() => {
      listener(event);
    });

    expect(consoleSpy).not.toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should cleanup listeners on unmount', () => {
    const { unmount } = renderHook(() => useCrossTabSync('user-456'));

    unmount();

    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      'cross-tab-enrollment-sync',
      expect.any(Function)
    );
  });
});