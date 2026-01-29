/**
 * 🧪 ENHANCED REAL-TIME SYNC HOOK TESTS
 * Integration tests for the useEnhancedRealTimeSync hook
 * Tests React integration, event handling, and state management
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useEnhancedRealTimeSync } from '../useEnhancedRealTimeSync';
import { enhancedRealTimeSync } from '@/services/EnhancedRealTimeSync';

// Mock the auth context
const mockUser = {
  id: 'user-123',
  email: 'test@example.com'
};

vi.mock('../AuthContext', () => ({
  useAuth: () => ({
    user: mockUser
  })
}));

// Mock the enhanced real-time sync service
vi.mock('@/services/EnhancedRealTimeSync', () => {
  const mockService = {
    broadcastImmediateApproval: vi.fn(),
    broadcastCourseAccessGranted: vi.fn(),
    applyOptimisticUpdate: vi.fn(),
    confirmOptimisticUpdate: vi.fn(),
    rollbackOptimisticUpdate: vi.fn(),
    syncEnrollmentStatusAcrossTabs: vi.fn(),
    getOptimisticUpdates: vi.fn(() => [])
  };

  return {
    enhancedRealTimeSync: mockService,
    UIComponent: {
      COURSE_CARD: 'course_card',
      ENROLLMENT_BUTTON: 'enrollment_button'
    },
    UIAction: {
      UPDATE_STATUS: 'update_status',
      SHOW_CONTINUE_BUTTON: 'show_continue_button'
    }
  };
});

describe('useEnhancedRealTimeSync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Clean up any event listeners
    const events = [
      'ui-update-course_card',
      'ui-update-enrollment_button',
      'immediate-approval',
      'remote-immediate-approval',
      'course-access-granted',
      'optimistic-update-rollback'
    ];
    
    events.forEach(eventName => {
      const listeners = (window as any)._eventListeners?.[eventName] || [];
      listeners.forEach((listener: EventListener) => {
        window.removeEventListener(eventName, listener);
      });
    });
  });

  describe('Initialization', () => {
    it('should initialize with default state', () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync());

      expect(result.current.isConnected).toBe(true);
      expect(result.current.optimisticUpdates).toEqual([]);
      expect(result.current.errors).toEqual([]);
      expect(result.current.lastUpdate).toBeUndefined();
    });

    it('should initialize with custom options', () => {
      const options = {
        courseId: 'course-123',
        enableOptimisticUpdates: false,
        enableCrossTabSync: false
      };

      const { result } = renderHook(() => useEnhancedRealTimeSync(options));

      expect(result.current.isConnected).toBe(true);
    });
  });

  describe('Immediate Approval Broadcasting', () => {
    it('should broadcast immediate approval successfully', async () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync());

      const mockBroadcast = enhancedRealTimeSync.broadcastImmediateApproval as any;
      mockBroadcast.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.broadcastImmediateApproval(
          'enrollment-123',
          'course-456',
          'card_payment_automatic',
          'payment-ref-789'
        );
      });

      expect(mockBroadcast).toHaveBeenCalledWith({
        enrollmentId: 'enrollment-123',
        userId: mockUser.id,
        courseId: 'course-456',
        approvalType: 'card_payment_automatic',
        timestamp: expect.any(Date),
        paymentReference: 'payment-ref-789',
        accessGranted: true,
        source: 'webhook_card_payment'
      });

      expect(result.current.errors).toEqual([]);
      expect(result.current.lastUpdate).toBeDefined();
    });

    it('should handle broadcast errors', async () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync());

      const mockBroadcast = enhancedRealTimeSync.broadcastImmediateApproval as any;
      const error = new Error('Broadcast failed');
      mockBroadcast.mockRejectedValueOnce(error);

      await act(async () => {
        try {
          await result.current.broadcastImmediateApproval(
            'enrollment-123',
            'course-456',
            'card_payment_automatic'
          );
        } catch (e) {
          // Expected to throw
        }
      });

      expect(result.current.errors).toContain('Broadcast failed');
    });

    it('should not broadcast when user is not authenticated', async () => {
      // Mock no user
      vi.mocked(require('../AuthContext').useAuth).mockReturnValueOnce({
        user: null
      });

      const { result } = renderHook(() => useEnhancedRealTimeSync());

      const mockBroadcast = enhancedRealTimeSync.broadcastImmediateApproval as any;

      await act(async () => {
        await result.current.broadcastImmediateApproval(
          'enrollment-123',
          'course-456',
          'card_payment_automatic'
        );
      });

      expect(mockBroadcast).not.toHaveBeenCalled();
    });
  });

  describe('Course Access Broadcasting', () => {
    it('should broadcast course access granted successfully', async () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync());

      const mockBroadcast = enhancedRealTimeSync.broadcastCourseAccessGranted as any;
      mockBroadcast.mockResolvedValueOnce(undefined);

      await act(async () => {
        await result.current.broadcastCourseAccessGranted(
          'course-456',
          'granted',
          'card_payment',
          'enrollment-123'
        );
      });

      expect(mockBroadcast).toHaveBeenCalledWith({
        userId: mockUser.id,
        courseId: 'course-456',
        accessLevel: 'granted',
        grantedAt: expect.any(Date),
        source: 'card_payment',
        enrollmentId: 'enrollment-123'
      });

      expect(result.current.errors).toEqual([]);
      expect(result.current.lastUpdate).toBeDefined();
    });
  });

  describe('Optimistic Updates', () => {
    it('should apply optimistic update successfully', async () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync({
        enableOptimisticUpdates: true
      }));

      const mockApply = enhancedRealTimeSync.applyOptimisticUpdate as any;
      const mockConfirm = vi.fn();
      const mockRollback = vi.fn();
      
      mockApply.mockResolvedValueOnce('update-123');
      enhancedRealTimeSync.confirmOptimisticUpdate = mockConfirm;
      enhancedRealTimeSync.rollbackOptimisticUpdate = mockRollback;

      let optimisticResult: any;

      await act(async () => {
        optimisticResult = await result.current.applyOptimisticUpdate(
          'course-456',
          'approved',
          'card_payment'
        );
      });

      expect(mockApply).toHaveBeenCalledWith(
        'course-456',
        mockUser.id,
        'approved',
        'card_payment'
      );

      expect(optimisticResult.updateId).toBe('update-123');
      expect(typeof optimisticResult.confirm).toBe('function');
      expect(typeof optimisticResult.rollback).toBe('function');

      // Test confirm function
      await act(async () => {
        await optimisticResult.confirm('approved');
      });

      expect(mockConfirm).toHaveBeenCalledWith('update-123', 'approved');

      // Test rollback function
      await act(async () => {
        await optimisticResult.rollback('test_reason');
      });

      expect(mockRollback).toHaveBeenCalledWith('update-123', 'test_reason');
    });

    it('should throw error when optimistic updates are disabled', async () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync({
        enableOptimisticUpdates: false
      }));

      await act(async () => {
        try {
          await result.current.applyOptimisticUpdate('course-456', 'approved');
          expect.fail('Should have thrown error');
        } catch (error) {
          expect(error.message).toBe('Optimistic updates are disabled');
        }
      });
    });
  });

  describe('Cross-Tab Synchronization', () => {
    it('should sync enrollment status across tabs successfully', async () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync({
        enableCrossTabSync: true
      }));

      const mockSync = enhancedRealTimeSync.syncEnrollmentStatusAcrossTabs as any;
      mockSync.mockResolvedValueOnce({
        success: true,
        syncedTabs: 2,
        failedTabs: 0,
        totalSyncTime: 100,
        errors: []
      });

      await act(async () => {
        await result.current.syncEnrollmentStatusAcrossTabs('course-456', 'approved');
      });

      expect(mockSync).toHaveBeenCalledWith(mockUser.id, 'course-456', 'approved');
      expect(result.current.errors).toEqual([]);
    });

    it('should not sync when cross-tab sync is disabled', async () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync({
        enableCrossTabSync: false
      }));

      const mockSync = enhancedRealTimeSync.syncEnrollmentStatusAcrossTabs as any;

      await act(async () => {
        await result.current.syncEnrollmentStatusAcrossTabs('course-456', 'approved');
      });

      expect(mockSync).not.toHaveBeenCalled();
    });
  });

  describe('Event Listeners', () => {
    it('should set up UI update listener correctly', () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync({
        courseId: 'course-123'
      }));

      const mockCallback = vi.fn();

      act(() => {
        result.current.listenForUIUpdates('course_card' as any, mockCallback);
      });

      // Simulate UI update event
      const event = new CustomEvent('ui-update-course_card', {
        detail: {
          action: 'update_status',
          data: { status: 'approved' },
          courseId: 'course-123',
          userId: mockUser.id
        }
      });

      act(() => {
        window.dispatchEvent(event);
      });

      expect(mockCallback).toHaveBeenCalledWith('update_status', { status: 'approved' });
    });

    it('should filter events by courseId', () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync({
        courseId: 'course-123'
      }));

      const mockCallback = vi.fn();

      act(() => {
        result.current.listenForUIUpdates('course_card' as any, mockCallback);
      });

      // Simulate UI update event for different course
      const event = new CustomEvent('ui-update-course_card', {
        detail: {
          action: 'update_status',
          data: { status: 'approved' },
          courseId: 'course-456', // Different course
          userId: mockUser.id
        }
      });

      act(() => {
        window.dispatchEvent(event);
      });

      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should filter events by userId', () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync());

      const mockCallback = vi.fn();

      act(() => {
        result.current.listenForUIUpdates('course_card' as any, mockCallback);
      });

      // Simulate UI update event for different user
      const event = new CustomEvent('ui-update-course_card', {
        detail: {
          action: 'update_status',
          data: { status: 'approved' },
          courseId: 'course-123',
          userId: 'different-user' // Different user
        }
      });

      act(() => {
        window.dispatchEvent(event);
      });

      expect(mockCallback).not.toHaveBeenCalled();
    });

    it('should set up immediate approval listener correctly', () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync({
        courseId: 'course-123'
      }));

      const mockCallback = vi.fn();

      act(() => {
        result.current.listenForImmediateApproval(mockCallback);
      });

      // Simulate immediate approval event
      const update = {
        enrollmentId: 'enrollment-123',
        userId: mockUser.id,
        courseId: 'course-123',
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        accessGranted: true,
        source: 'webhook_card_payment'
      };

      const event = new CustomEvent('immediate-approval', {
        detail: update
      });

      act(() => {
        window.dispatchEvent(event);
      });

      expect(mockCallback).toHaveBeenCalledWith(update);
    });

    it('should clean up event listeners on unmount', () => {
      const { result, unmount } = renderHook(() => useEnhancedRealTimeSync());

      const mockCallback = vi.fn();
      let cleanup: () => void;

      act(() => {
        cleanup = result.current.listenForUIUpdates('course_card' as any, mockCallback);
      });

      // Unmount the hook
      unmount();

      // Simulate event after unmount
      const event = new CustomEvent('ui-update-course_card', {
        detail: {
          action: 'update_status',
          data: { status: 'approved' },
          courseId: 'course-123',
          userId: mockUser.id
        }
      });

      window.dispatchEvent(event);

      // Callback should not be called after unmount
      expect(mockCallback).not.toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should clear errors successfully', () => {
      const { result } = renderHook(() => useEnhancedRealTimeSync());

      // Add some errors to state
      act(() => {
        (result.current as any).setState((prev: any) => ({
          ...prev,
          errors: ['Error 1', 'Error 2']
        }));
      });

      expect(result.current.errors).toHaveLength(2);

      act(() => {
        result.current.clearErrors();
      });

      expect(result.current.errors).toEqual([]);
    });
  });

  describe('State Updates', () => {
    it('should update optimistic updates state periodically', async () => {
      const mockOptimisticUpdates = [
        {
          id: 'update-1',
          courseId: 'course-123',
          userId: mockUser.id,
          expectedStatus: 'approved' as const,
          timestamp: new Date(),
          source: 'card_payment',
          confirmed: false
        }
      ];

      (enhancedRealTimeSync.getOptimisticUpdates as any).mockReturnValue(mockOptimisticUpdates);

      const { result } = renderHook(() => useEnhancedRealTimeSync());

      // Wait for the periodic update
      await waitFor(() => {
        expect(result.current.optimisticUpdates).toEqual(mockOptimisticUpdates);
      }, { timeout: 2000 });
    });
  });
});