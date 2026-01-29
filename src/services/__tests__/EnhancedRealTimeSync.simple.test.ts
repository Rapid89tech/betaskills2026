/**
 * 🧪 ENHANCED REAL-TIME SYNC SERVICE - SIMPLIFIED TESTS
 * Core functionality tests for the enhanced real-time sync service
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { 
  EnhancedRealTimeSync, 
  ImmediateApprovalUpdate, 
  CourseAccessUpdate
} from '../EnhancedRealTimeSync';

// Mock localStorage
const mockLocalStorage = {
  store: new Map<string, string>(),
  getItem: vi.fn((key: string) => mockLocalStorage.store.get(key) || null),
  setItem: vi.fn((key: string, value: string) => {
    mockLocalStorage.store.set(key, value);
  }),
  removeItem: vi.fn((key: string) => mockLocalStorage.store.delete(key)),
  clear: vi.fn(() => mockLocalStorage.store.clear())
};

// Mock window.dispatchEvent
const mockDispatchEvent = vi.fn();

describe('EnhancedRealTimeSync - Core Functionality', () => {
  let realTimeSync: EnhancedRealTimeSync;
  let originalLocalStorage: any;
  let originalDispatchEvent: any;

  beforeEach(() => {
    // Setup mocks
    originalLocalStorage = global.localStorage;
    originalDispatchEvent = window.dispatchEvent;

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
    global.localStorage = originalLocalStorage;
    window.dispatchEvent = originalDispatchEvent;

    // Cleanup
    realTimeSync.cleanup();
  });

  describe('Basic Functionality', () => {
    it('should create instance successfully', () => {
      expect(realTimeSync).toBeDefined();
      expect(typeof realTimeSync.broadcastImmediateApproval).toBe('function');
      expect(typeof realTimeSync.applyOptimisticUpdate).toBe('function');
    });

    it('should handle immediate approval broadcast', async () => {
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
      await expect(realTimeSync.broadcastImmediateApproval(update)).resolves.not.toThrow();

      // Verify events were dispatched
      expect(mockDispatchEvent).toHaveBeenCalled();
    });

    it('should handle course access broadcast', async () => {
      const update: CourseAccessUpdate = {
        userId: 'user-456',
        courseId: 'course-789',
        accessLevel: 'granted',
        grantedAt: new Date(),
        source: 'card_payment'
      };

      // Should not throw error
      await expect(realTimeSync.broadcastCourseAccessGranted(update)).resolves.not.toThrow();

      // Verify events were dispatched
      expect(mockDispatchEvent).toHaveBeenCalled();
    });

    it('should apply optimistic update', async () => {
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
    });

    it('should confirm optimistic update', async () => {
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

    it('should rollback optimistic update', async () => {
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

      // Verify optimistic update was removed
      const optimisticUpdates = realTimeSync.getOptimisticUpdates();
      expect(optimisticUpdates).toHaveLength(0);

      // Verify rollback event was dispatched
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'optimistic-update-rollback'
        })
      );
    });

    it('should sync enrollment status across tabs', async () => {
      const userId = 'user-456';
      const courseId = 'course-789';
      const status = 'approved';

      const result = await realTimeSync.syncEnrollmentStatusAcrossTabs(
        userId,
        courseId,
        status
      );

      expect(result).toBeDefined();
      expect(typeof result.success).toBe('boolean');
      expect(Array.isArray(result.errors)).toBe(true);
    });

    it('should cleanup resources', () => {
      realTimeSync.cleanup();
      
      // Should not throw error
      expect(() => realTimeSync.cleanup()).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', async () => {
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

      // Should not throw error (graceful degradation)
      await expect(realTimeSync.broadcastImmediateApproval(update)).resolves.not.toThrow();
    });

    it('should handle invalid optimistic update IDs', async () => {
      // Should not throw error for non-existent update ID
      await expect(realTimeSync.confirmOptimisticUpdate('invalid-id', 'approved')).resolves.not.toThrow();
      await expect(realTimeSync.rollbackOptimisticUpdate('invalid-id', 'test')).resolves.not.toThrow();
    });
  });

  describe('State Management', () => {
    it('should track optimistic updates correctly', async () => {
      expect(realTimeSync.getOptimisticUpdates()).toHaveLength(0);

      const updateId1 = await realTimeSync.applyOptimisticUpdate('course-1', 'user-1', 'approved', 'test');
      expect(realTimeSync.getOptimisticUpdates()).toHaveLength(1);

      const updateId2 = await realTimeSync.applyOptimisticUpdate('course-2', 'user-1', 'pending', 'test');
      expect(realTimeSync.getOptimisticUpdates()).toHaveLength(2);

      await realTimeSync.confirmOptimisticUpdate(updateId1, 'approved');
      expect(realTimeSync.getOptimisticUpdates()).toHaveLength(1);

      await realTimeSync.rollbackOptimisticUpdate(updateId2, 'test');
      expect(realTimeSync.getOptimisticUpdates()).toHaveLength(0);
    });
  });
});