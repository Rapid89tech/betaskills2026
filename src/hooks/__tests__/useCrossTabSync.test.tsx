/**
 * useCrossTabSync Hook Tests
 * 
 * Tests for the cross-tab synchronization React hook:
 * - Hook initialization and cleanup
 * - State synchronization across tabs
 * - Conflict detection and resolution
 * - Subscription management
 * 
 * Requirements: 6.3, 6.4, 3.2
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { 
  useCrossTabSync, 
  type UseCrossTabSyncOptions 
} from '../useCrossTabSync';
import { 
  EnrollmentStatus,
  EnrollmentUpdateType,
  PaymentType,
  PaymentStatus,
  type Enrollment,
  type EnrollmentUpdate
} from '@/types/enrollment';

// Mock the CrossTabSyncService
vi.mock('@/services/CrossTabSyncService', () => ({
  crossTabSyncService: {
    initialize: vi.fn().mockResolvedValue(undefined),
    destroy: vi.fn(),
    syncEnrollmentUpdate: vi.fn(),
    requestStateSync: vi.fn(),
    subscribeToUpdates: vi.fn().mockReturnValue(() => {}),
    subscribeToConflicts: vi.fn().mockReturnValue(() => {}),
    getLocalState: vi.fn(),
    resolveConflict: vi.fn()
  },
  ConflictResolutionStrategy: {
    LAST_WRITE_WINS: 'last-write-wins',
    MERGE_STATES: 'merge-states',
    ADMIN_PRIORITY: 'admin-priority'
  }
}));

// Mock logger
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn()
  }
}));

// Import the mocked service
import { crossTabSyncService } from '@/services/CrossTabSyncService';

describe('useCrossTabSync', () => {
  // Sample data
  const sampleEnrollment: Enrollment = {
    id: 'enrollment-1',
    userId: 'user-1',
    courseId: 'course-1',
    paymentType: PaymentType.EFT,
    status: EnrollmentStatus.PENDING,
    paymentStatus: PaymentStatus.PENDING,
    createdAt: new Date('2024-01-01T10:00:00Z'),
    updatedAt: new Date('2024-01-01T10:00:00Z'),
    user_id: 'user-1',
    course_id: 'course-1',
    enrolled_at: '2024-01-01T10:00:00Z',
    progress: 0
  };

  const sampleUpdate: EnrollmentUpdate = {
    type: EnrollmentUpdateType.ENROLLMENT_CREATED,
    enrollmentId: 'enrollment-1',
    userId: 'user-1',
    courseId: 'course-1',
    status: EnrollmentStatus.PENDING,
    timestamp: new Date('2024-01-01T10:00:00Z')
  };

  const sampleConflict = {
    enrollmentId: 'enrollment-1',
    localState: sampleEnrollment,
    remoteState: {
      ...sampleEnrollment,
      status: EnrollmentStatus.APPROVED,
      updatedAt: new Date('2024-01-01T10:01:00Z')
    },
    conflictType: 'status' as const
  };

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset mock implementations
    vi.mocked(crossTabSyncService.getLocalState).mockReturnValue({
      enrollments: {},
      lastUpdated: new Date(),
      tabId: 'test-tab',
      version: 0
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Hook Initialization', () => {
    it('should initialize successfully with default options', async () => {
      const { result } = renderHook(() => useCrossTabSync());

      expect(result.current.isInitialized).toBe(false);

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(vi.mocked(crossTabSyncService.initialize)).toHaveBeenCalledTimes(1);
    });

    it('should initialize with custom options', async () => {
      const options: UseCrossTabSyncOptions = {
        autoResolveConflicts: false,
        conflictResolutionStrategy: 'last-write-wins' as any,
        syncOnFocus: false,
        enableLogging: false
      };

      const { result } = renderHook(() => useCrossTabSync(options));

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(vi.mocked(crossTabSyncService.initialize)).toHaveBeenCalledTimes(1);
    });

    it('should handle initialization errors gracefully', async () => {
      vi.mocked(crossTabSyncService.initialize).mockRejectedValueOnce(new Error('Init failed'));

      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        // Should remain uninitialized on error
        expect(result.current.isInitialized).toBe(false);
      });
    });

    it('should cleanup on unmount', async () => {
      const unsubscribeMock = vi.fn();
      vi.mocked(crossTabSyncService.subscribeToUpdates).mockReturnValue(unsubscribeMock);
      vi.mocked(crossTabSyncService.subscribeToConflicts).mockReturnValue(unsubscribeMock);

      const { result, unmount } = renderHook(() => useCrossTabSync());

      // Wait for initialization
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      unmount();

      expect(unsubscribeMock).toHaveBeenCalled();
    });
  });

  describe('State Management', () => {
    it('should provide local state', async () => {
      const mockState = {
        enrollments: { 'user-1-course-1': sampleEnrollment },
        lastUpdated: new Date(),
        tabId: 'test-tab',
        version: 1
      };

      vi.mocked(crossTabSyncService.getLocalState).mockReturnValue(mockState);

      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.localState).toEqual(mockState);
    });

    it('should update last sync time', async () => {
      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      expect(result.current.lastSyncTime).toBeInstanceOf(Date);
    });

    it('should track conflicts', async () => {
      let conflictCallback: any;
      vi.mocked(crossTabSyncService.subscribeToConflicts).mockImplementation((callback) => {
        conflictCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Simulate conflict
      act(() => {
        conflictCallback(sampleConflict);
      });

      expect(result.current.conflicts).toHaveLength(1);
      expect(result.current.conflicts[0]).toEqual(sampleConflict);
    });
  });

  describe('Actions', () => {
    it('should sync now', async () => {
      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      act(() => {
        result.current.syncNow();
      });

      expect(vi.mocked(crossTabSyncService.requestStateSync)).toHaveBeenCalledTimes(1);
    });

    it('should not sync when not initialized', () => {
      const { result } = renderHook(() => useCrossTabSync());

      act(() => {
        result.current.syncNow();
      });

      expect(vi.mocked(crossTabSyncService.requestStateSync)).not.toHaveBeenCalled();
    });

    it('should resolve conflicts', async () => {
      const resolvedEnrollment = {
        ...sampleEnrollment,
        status: EnrollmentStatus.APPROVED
      };

      vi.mocked(crossTabSyncService.resolveConflict).mockReturnValue(resolvedEnrollment);

      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      let resolution: Enrollment;
      act(() => {
        resolution = result.current.resolveConflict(sampleConflict);
      });

      expect(vi.mocked(crossTabSyncService.resolveConflict)).toHaveBeenCalledWith(
        sampleConflict,
        'admin-priority'
      );
      expect(resolution!).toEqual(resolvedEnrollment);
    });

    it('should clear conflicts', async () => {
      let conflictCallback: any;
      vi.mocked(crossTabSyncService.subscribeToConflicts).mockImplementation((callback) => {
        conflictCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => 
        useCrossTabSync({ autoResolveConflicts: false })
      );

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Add conflict
      act(() => {
        conflictCallback(sampleConflict);
      });

      expect(result.current.conflicts).toHaveLength(1);

      // Clear conflicts
      act(() => {
        result.current.clearConflicts();
      });

      expect(result.current.conflicts).toHaveLength(0);
    });
  });

  describe('Auto-Resolution', () => {
    it('should auto-resolve conflicts when enabled', async () => {
      const resolvedEnrollment = {
        ...sampleEnrollment,
        status: EnrollmentStatus.APPROVED
      };

      vi.mocked(crossTabSyncService.resolveConflict).mockReturnValue(resolvedEnrollment);

      let conflictCallback: any;
      vi.mocked(crossTabSyncService.subscribeToConflicts).mockImplementation((callback) => {
        conflictCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => 
        useCrossTabSync({ 
          autoResolveConflicts: true,
          conflictResolutionStrategy: 'admin-priority' as any
        })
      );

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Simulate conflict
      act(() => {
        conflictCallback(sampleConflict);
      });

      // Should have conflict initially
      expect(result.current.conflicts).toHaveLength(1);

      // Wait for auto-resolution
      await waitFor(() => {
        expect(result.current.conflicts).toHaveLength(0);
      }, { timeout: 2000 });

      expect(vi.mocked(crossTabSyncService.resolveConflict)).toHaveBeenCalledWith(
        sampleConflict,
        'admin-priority'
      );
    });

    it('should not auto-resolve when disabled', async () => {
      let conflictCallback: any;
      vi.mocked(crossTabSyncService.subscribeToConflicts).mockImplementation((callback) => {
        conflictCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => 
        useCrossTabSync({ autoResolveConflicts: false })
      );

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Simulate conflict
      act(() => {
        conflictCallback(sampleConflict);
      });

      expect(result.current.conflicts).toHaveLength(1);

      // Wait to ensure no auto-resolution
      await new Promise(resolve => setTimeout(resolve, 1100));

      expect(result.current.conflicts).toHaveLength(1);
      expect(vi.mocked(crossTabSyncService.resolveConflict)).not.toHaveBeenCalled();
    });
  });

  describe('Subscription Management', () => {
    it('should provide subscription methods', async () => {
      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      const updateCallback = vi.fn();
      const conflictCallback = vi.fn();

      const unsubscribeUpdate = result.current.subscribeToUpdates(updateCallback);
      const unsubscribeConflict = result.current.subscribeToConflicts(conflictCallback);

      expect(vi.mocked(crossTabSyncService.subscribeToUpdates)).toHaveBeenCalledWith(updateCallback);
      expect(vi.mocked(crossTabSyncService.subscribeToConflicts)).toHaveBeenCalledWith(conflictCallback);

      expect(typeof unsubscribeUpdate).toBe('function');
      expect(typeof unsubscribeConflict).toBe('function');
    });

    it('should not allow subscriptions when not initialized', () => {
      const { result } = renderHook(() => useCrossTabSync());

      const updateCallback = vi.fn();
      const unsubscribe = result.current.subscribeToUpdates(updateCallback);

      expect(vi.mocked(crossTabSyncService.subscribeToUpdates)).not.toHaveBeenCalled();
      expect(typeof unsubscribe).toBe('function');
    });
  });

  describe('Debug Information', () => {
    it('should provide debug information', async () => {
      const mockState = {
        enrollments: { 'user-1-course-1': sampleEnrollment },
        lastUpdated: new Date(),
        tabId: 'test-tab-123',
        version: 5
      };

      vi.mocked(crossTabSyncService.getLocalState).mockReturnValue(mockState);

      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      const debugInfo = result.current.getDebugInfo();

      expect(debugInfo).toEqual({
        tabId: 'test-tab-123',
        activeTabs: 1, // One enrollment
        pendingConflicts: 0,
        stateVersion: 5
      });
    });

    it('should handle debug info errors gracefully', async () => {
      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Mock getLocalState to throw error after initialization
      vi.mocked(crossTabSyncService.getLocalState).mockImplementation(() => {
        throw new Error('Debug error');
      });

      const debugInfo = result.current.getDebugInfo();

      expect(debugInfo).toEqual({
        tabId: 'unknown',
        activeTabs: 0,
        pendingConflicts: 0,
        stateVersion: 0
      });
    });
  });

  describe('Cross-Tab Updates', () => {
    it('should handle cross-tab updates', async () => {
      let updateCallback: any;
      vi.mocked(crossTabSyncService.subscribeToUpdates).mockImplementation((callback) => {
        updateCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => useCrossTabSync());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Simulate cross-tab update
      act(() => {
        updateCallback(sampleUpdate);
      });

      // Should update last sync time
      expect(result.current.lastSyncTime).toBeInstanceOf(Date);
    });

    it('should prevent duplicate conflicts', async () => {
      let conflictCallback: any;
      vi.mocked(crossTabSyncService.subscribeToConflicts).mockImplementation((callback) => {
        conflictCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => 
        useCrossTabSync({ autoResolveConflicts: false })
      );

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Add same conflict twice
      act(() => {
        conflictCallback(sampleConflict);
        conflictCallback(sampleConflict);
      });

      // Should only have one conflict
      expect(result.current.conflicts).toHaveLength(1);
    });
  });
});