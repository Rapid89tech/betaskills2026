/**
 * 🧪 ENHANCED REAL-TIME SYNC SERVICE TESTS
 * Comprehensive test suite for the enhanced real-time sync service
 * Tests immediate updates, optimistic updates, cross-tab sync, and rollback mechanisms
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { 
  EnhancedRealTimeSync, 
  ImmediateApprovalUpdate, 
  CourseAccessUpdate,
  UIComponent,
  UIAction,
  UpdatePriority
} from '../EnhancedRealTimeSync';

// Mock BroadcastChannel
class MockBroadcastChannel {
  private listeners: ((event: MessageEvent) => void)[] = [];
  
  constructor(public name: string) {}
  
  postMessage(data: any) {
    // Simulate async message delivery
    setTimeout(() => {
      this.listeners.forEach(listener => {
        listener({ data } as MessageEvent);
      });
    }, 0);
  }
  
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
  
  close() {
    this.listeners = [];
  }
}

// Mock localStorage
const mockLocalStorage = {
  store: new Map<string, string>(),
  getItem: vi.fn((key: string) => mockLocalStorage.store.get(key) || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.store.set(key, value);
    // Simulate storage event
    window.dispatchEvent(new StorageEvent('storage', {
      key,
      newValue: value,
      oldValue: mockLocalStorage.store.get(key) || null
    }));
  }),
  removeItem: vi.fn((key: string) => mockLocalStorage.store.delete(key)),
  clear: vi.fn(() => mockLocalStorage.store.clear())
};

// Mock window.dispatchEvent
const mockDispatchEvent = vi.fn();

describe('EnhancedRealTimeSync', () => {
  let realTimeSync: EnhancedRealTimeSync;
  let originalBroadcastChannel: any;
  let originalLocalStorage: any;
  let originalDispatchEvent: any;

  beforeEach(() => {
    // Setup mocks
    originalBroadcastChannel = global.BroadcastChannel;
    originalLocalStorage = global.localStorage;
    originalDispatchEvent = window.dispatchEvent;

    global.BroadcastChannel = MockBroadcastChannel as any;
    global.localStorage = mockLocalStorage as any;
    window.dispatchEvent = mockDispatchEvent;

    // Clear mocks
    vi.clearAllMocks();
    mockLocalStorage.store.clear();

    // Create fresh instance
    realTimeSync = new EnhancedRealTimeSync();
  });

  afterEach(() => {
    // Restore originals
    global.BroadcastChannel = originalBroadcastChannel;
    global.localStorage = originalLocalStorage;
    window.dispatchEvent = originalDispatchEvent;

    // Cleanup
    realTimeSync.cleanup();
  });

  describe('Immediate Approval Broadcasting', () => {
    it('should broadcast immediate approval update successfully', async () => {
      const update: ImmediateApprovalUpdate = {
        enrollmentId: 'enrollment-123',
        userId: 'user-456',
        courseId: 'course-789',
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        paymentReference: 'payment-ref-123',
        accessGranted: true,
        source: 'webhook_card_payment'
      };

      await realTimeSync.broadcastImmediateApproval(update);

      // Verify localStorage was updated for cross-tab sync
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
      
      // Verify events were dispatched
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'immediate-approval',
          detail: update
        })
      );

      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'enrollment-approved',
          detail: update
        })
      );
    });

    it('should queue UI updates with correct priorities', async () => {
      const update: ImmediateApprovalUpdate = {
        enrollmentId: 'enrollment-123',
        userId: 'user-456',
        courseId: 'course-789',
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        accessGranted: true,
        source: 'webhook_card_payment'
      };

      await realTimeSync.broadcastImmediateApproval(update);

      // Verify UI update events were dispatched
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ui-update-course_card'
        })
      );

      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ui-update-enrollment_button'
        })
      );
    });

    it('should handle broadcast errors gracefully', async () => {
      // Mock localStorage to throw error
      mockLocalStorage.setItem.mockImplementationOnce(() => {
        throw new Error('Storage quota exceeded');
      });

      const update: ImmediateApprovalUpdate = {
        enrollmentId: 'enrollment-123',
        userId: 'user-456',
        courseId: 'course-789',
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        accessGranted: true,
        source: 'webhook_card_payment'
      };

      // Should not throw error
      await expect(realTimeSync.broadcastImmediateApproval(update)).rejects.toThrow();
    });
  });

  describe('Course Access Broadcasting', () => {
    it('should broadcast course access granted successfully', async () => {
      const update: CourseAccessUpdate = {
        userId: 'user-456',
        courseId: 'course-789',
        accessLevel: 'granted',
        grantedAt: new Date(),
        source: 'card_payment',
        enrollmentId: 'enrollment-123'
      };

      await realTimeSync.broadcastCourseAccessGranted(update);

      // Verify events were dispatched
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'course-access-granted',
          detail: update
        })
      );

      // Verify UI updates were queued
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ui-update-course_card'
        })
      );
    });
  });

  describe('Optimistic Updates', () => {
    it('should apply optimistic update successfully', async () => {
      const courseId = 'course-789';
      const userId = 'user-456';
      const expectedStatus = 'approved';

      const updateId = await realTimeSync.applyOptimisticUpdate(
        courseId,
        userId,
        expectedStatus,
        'card_payment'
      );

      expect(updateId).toBeDefined();
      expect(typeof updateId).toBe('string');

      // Verify optimistic update was stored
      const optimisticUpdates = realTimeSync.getOptimisticUpdates();
      expect(optimisticUpdates).toHaveLength(1);
      expect(optimisticUpdates[0].id).toBe(updateId);
      expect(optimisticUpdates[0].courseId).toBe(courseId);
      expect(optimisticUpdates[0].expectedStatus).toBe(expectedStatus);

      // Verify UI updates were dispatched
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ui-update-course_card'
        })
      );
    });

    it('should confirm optimistic update when status matches', async () => {
      const courseId = 'course-789';
      const userId = 'user-456';
      const expectedStatus = 'approved';

      const updateId = await realTimeSync.applyOptimisticUpdate(
        courseId,
        userId,
        expectedStatus,
        'card_payment'
      );

      // Confirm with matching status
      await realTimeSync.confirmOptimisticUpdate(updateId, 'approved');

      // Verify optimistic update was removed
      const optimisticUpdates = realTimeSync.getOptimisticUpdates();
      expect(optimisticUpdates).toHaveLength(0);
    });

    it('should apply correction when optimistic update was wrong', async () => {
      const courseId = 'course-789';
      const userId = 'user-456';
      const expectedStatus = 'approved';

      const updateId = await realTimeSync.applyOptimisticUpdate(
        courseId,
        userId,
        expectedStatus,
        'card_payment'
      );

      // Confirm with different status
      await realTimeSync.confirmOptimisticUpdate(updateId, 'pending');

      // Verify correction UI update was dispatched
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ui-update-course_card',
          detail: expect.objectContaining({
            data: expect.objectContaining({
              status: 'pending',
              correction: true
            })
          })
        })
      );

      // Verify optimistic update was removed
      const optimisticUpdates = realTimeSync.getOptimisticUpdates();
      expect(optimisticUpdates).toHaveLength(0);
    });

    it('should rollback optimistic update successfully', async () => {
      const courseId = 'course-789';
      const userId = 'user-456';
      const expectedStatus = 'approved';

      const updateId = await realTimeSync.applyOptimisticUpdate(
        courseId,
        userId,
        expectedStatus,
        'card_payment'
      );

      // Rollback the update
      await realTimeSync.rollbackOptimisticUpdate(updateId, 'test_rollback');

      // Verify rollback event was dispatched
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'optimistic-update-rollback',
          detail: expect.objectContaining({
            updateId,
            reason: 'test_rollback',
            courseId,
            userId
          })
        })
      );

      // Verify optimistic update was removed
      const optimisticUpdates = realTimeSync.getOptimisticUpdates();
      expect(optimisticUpdates).toHaveLength(0);
    });

    it('should handle automatic rollback on timeout', async () => {
      vi.useFakeTimers();

      const courseId = 'course-789';
      const userId = 'user-456';
      const expectedStatus = 'approved';

      const updateId = await realTimeSync.applyOptimisticUpdate(
        courseId,
        userId,
        expectedStatus,
        'card_payment'
      );

      // Fast-forward time to trigger timeout
      vi.advanceTimersByTime(11000); // 11 seconds (timeout is 10 seconds)

      // Wait for async operations
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify rollback was triggered
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'optimistic-update-rollback',
          detail: expect.objectContaining({
            updateId,
            reason: 'timeout'
          })
        })
      );

      vi.useRealTimers();
    });
  });

  describe('Cross-Tab Synchronization', () => {
    it('should sync enrollment status across tabs successfully', async () => {
      const userId = 'user-456';
      const courseId = 'course-789';
      const status = 'approved';

      const result = await realTimeSync.syncEnrollmentStatusAcrossTabs(
        userId,
        courseId,
        status
      );

      expect(result.success).toBe(true);
      expect(result.errors).toHaveLength(0);

      // Verify localStorage was updated for cross-tab sync
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        `enrollment-sync-${userId}-${courseId}`,
        expect.stringContaining(status)
      );
    });

    it('should handle cross-tab sync errors gracefully', async () => {
      // Mock localStorage to throw error
      mockLocalStorage.setItem.mockImplementationOnce(() => {
        throw new Error('Storage error');
      });

      const userId = 'user-456';
      const courseId = 'course-789';
      const status = 'approved';

      const result = await realTimeSync.syncEnrollmentStatusAcrossTabs(
        userId,
        courseId,
        status
      );

      expect(result.success).toBe(false);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0]).toBe('Storage error');
    });
  });

  describe('UI Update Queue Processing', () => {
    it('should process UI updates in priority order', async () => {
      vi.useFakeTimers();

      // Create updates with different priorities
      const updates = [
        {
          component: UIComponent.COURSE_CARD,
          action: UIAction.UPDATE_STATUS,
          data: { priority: 'low' },
          priority: UpdatePriority.LOW,
          timeout: 1000,
          courseId: 'course-1',
          userId: 'user-1'
        },
        {
          component: UIComponent.ENROLLMENT_BUTTON,
          action: UIAction.CHANGE_BUTTON_TEXT,
          data: { priority: 'immediate' },
          priority: UpdatePriority.IMMEDIATE,
          timeout: 1000,
          courseId: 'course-1',
          userId: 'user-1'
        },
        {
          component: UIComponent.COURSE_GRID,
          action: UIAction.REFRESH_DATA,
          data: { priority: 'high' },
          priority: UpdatePriority.HIGH,
          timeout: 1000,
          courseId: 'course-1',
          userId: 'user-1'
        }
      ];

      // Queue updates (they should be processed in priority order)
      (realTimeSync as any).queueUIUpdates(updates);

      // Advance time to trigger queue processing
      vi.advanceTimersByTime(100);
      await new Promise(resolve => setTimeout(resolve, 0));

      // Verify events were dispatched in priority order
      const dispatchCalls = mockDispatchEvent.mock.calls.filter(call => 
        call[0].type?.startsWith('ui-update-')
      );

      expect(dispatchCalls).toHaveLength(3);
      
      // Check order: IMMEDIATE, HIGH, LOW
      expect(dispatchCalls[0][0].detail.data.priority).toBe('immediate');
      expect(dispatchCalls[1][0].detail.data.priority).toBe('high');
      expect(dispatchCalls[2][0].detail.data.priority).toBe('low');

      vi.useRealTimers();
    });
  });

  describe('Storage Event Handling', () => {
    it('should handle storage events for cross-tab sync', () => {
      const broadcastData = {
        type: 'enrollment-status-sync',
        userId: 'user-456',
        courseId: 'course-789',
        status: 'approved',
        timestamp: new Date().toISOString(),
        tabId: 'other-tab'
      };

      // Simulate storage event from another tab
      const storageEvent = new StorageEvent('storage', {
        key: 'broadcast-123',
        newValue: JSON.stringify(broadcastData),
        oldValue: null
      });

      window.dispatchEvent(storageEvent);

      // Verify UI update was queued
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'ui-update-course_card'
        })
      );
    });

    it('should ignore storage events from same tab', () => {
      const tabId = (realTimeSync as any).tabId;
      const broadcastData = {
        type: 'enrollment-status-sync',
        userId: 'user-456',
        courseId: 'course-789',
        status: 'approved',
        timestamp: new Date().toISOString(),
        tabId // Same tab ID
      };

      // Clear previous dispatch calls
      mockDispatchEvent.mockClear();

      // Simulate storage event from same tab
      const storageEvent = new StorageEvent('storage', {
        key: 'broadcast-123',
        newValue: JSON.stringify(broadcastData),
        oldValue: null
      });

      window.dispatchEvent(storageEvent);

      // Should not process updates from same tab
      expect(mockDispatchEvent).not.toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources properly', () => {
      const optimisticUpdates = realTimeSync.getOptimisticUpdates();
      expect(optimisticUpdates).toHaveLength(0);

      realTimeSync.cleanup();

      // Verify cleanup was successful
      expect(realTimeSync.getOptimisticUpdates()).toHaveLength(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle BroadcastChannel errors gracefully', async () => {
      // Mock BroadcastChannel to throw error
      const originalPostMessage = MockBroadcastChannel.prototype.postMessage;
      MockBroadcastChannel.prototype.postMessage = vi.fn(() => {
        throw new Error('BroadcastChannel error');
      });

      const update: ImmediateApprovalUpdate = {
        enrollmentId: 'enrollment-123',
        userId: 'user-456',
        courseId: 'course-789',
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        accessGranted: true,
        source: 'webhook_card_payment'
      };

      // Should not throw error, should fallback to localStorage
      await expect(realTimeSync.broadcastImmediateApproval(update)).resolves.not.toThrow();

      // Verify localStorage fallback was used
      expect(mockLocalStorage.setItem).toHaveBeenCalled();

      // Restore original method
      MockBroadcastChannel.prototype.postMessage = originalPostMessage;
    });

    it('should handle malformed broadcast messages gracefully', () => {
      // Simulate malformed storage event
      const storageEvent = new StorageEvent('storage', {
        key: 'broadcast-123',
        newValue: 'invalid-json',
        oldValue: null
      });

      // Should not throw error
      expect(() => {
        window.dispatchEvent(storageEvent);
      }).not.toThrow();
    });
  });
});