/**
 * useAdminApprovalWorkflow Hook Tests
 * 
 * Tests for the React hook that manages admin approval workflow functionality.
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAdminApprovalWorkflow } from '../useAdminApprovalWorkflow';

// Mock the AdminApprovalWorkflow service
const mockAdminApprovalWorkflow = {
  initialize: vi.fn(),
  getPendingEnrollments: vi.fn(),
  getEnrollmentDetails: vi.fn(),
  approveEnrollment: vi.fn(),
  rejectEnrollment: vi.fn(),
  bulkApproveEnrollments: vi.fn(),
  getWorkflowStatistics: vi.fn(),
  subscribeToNewEnrollments: vi.fn(),
  subscribeToEnrollmentProcessed: vi.fn(),
  cleanup: vi.fn()
};

vi.mock('../services/AdminApprovalWorkflow', () => ({
  adminApprovalWorkflow: mockAdminApprovalWorkflow
}));

describe('useAdminApprovalWorkflow', () => {
  const mockEnrollmentData = {
    id: 'enrollment-123',
    user_id: 'user-456',
    user_email: 'student@example.com',
    course_id: 'course-789',
    course_title: 'Test Course',
    payment_type: 'eft' as const,
    payment_status: 'completed',
    amount: 299.99,
    currency: 'ZAR',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  };

  const mockStatistics = {
    pendingCount: 5,
    approvedToday: 3,
    rejectedToday: 1,
    averageApprovalTime: 15
  };

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Setup default mock implementations
    mockAdminApprovalWorkflow.initialize.mockResolvedValue(undefined);
    mockAdminApprovalWorkflow.getPendingEnrollments.mockResolvedValue([mockEnrollmentData]);
    mockAdminApprovalWorkflow.getWorkflowStatistics.mockResolvedValue(mockStatistics);
    mockAdminApprovalWorkflow.subscribeToNewEnrollments.mockReturnValue(() => {});
    mockAdminApprovalWorkflow.subscribeToEnrollmentProcessed.mockReturnValue(() => {});
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Initialization', () => {
    it('should initialize workflow and fetch initial data', async () => {
      const { result } = renderHook(() => useAdminApprovalWorkflow());

      // Wait for initialization
      await waitFor(() => {
        expect(result.current.isRealTimeConnected).toBe(true);
      });

      expect(mockAdminApprovalWorkflow.initialize).toHaveBeenCalled();
      expect(mockAdminApprovalWorkflow.getPendingEnrollments).toHaveBeenCalled();
      expect(mockAdminApprovalWorkflow.getWorkflowStatistics).toHaveBeenCalled();
      expect(result.current.pendingEnrollments).toEqual([mockEnrollmentData]);
      expect(result.current.statistics).toEqual(mockStatistics);
    });

    it('should handle initialization errors', async () => {
      const error = new Error('Initialization failed');
      mockAdminApprovalWorkflow.initialize.mockRejectedValue(error);

      const { result } = renderHook(() => useAdminApprovalWorkflow());

      await waitFor(() => {
        expect(result.current.error).toBe('Initialization failed');
      });

      expect(result.current.isRealTimeConnected).toBe(false);
    });

    it('should setup real-time subscriptions', async () => {
      renderHook(() => useAdminApprovalWorkflow());

      await waitFor(() => {
        expect(mockAdminApprovalWorkflow.subscribeToNewEnrollments).toHaveBeenCalled();
        expect(mockAdminApprovalWorkflow.subscribeToEnrollmentProcessed).toHaveBeenCalled();
      });
    });

    it('should disable real-time updates when option is false', async () => {
      renderHook(() => useAdminApprovalWorkflow({ enableRealTimeUpdates: false }));

      await waitFor(() => {
        expect(mockAdminApprovalWorkflow.initialize).toHaveBeenCalled();
      });

      // Should not setup subscriptions
      expect(mockAdminApprovalWorkflow.subscribeToNewEnrollments).not.toHaveBeenCalled();
      expect(mockAdminApprovalWorkflow.subscribeToEnrollmentProcessed).not.toHaveBeenCalled();
    });
  });

  describe('Pending Enrollments Management', () => {
    it('should refresh pending enrollments', async () => {
      const { result } = renderHook(() => useAdminApprovalWorkflow());

      await waitFor(() => {
        expect(result.current.pendingEnrollments).toEqual([mockEnrollmentData]);
      });

      // Mock new data
      const newEnrollment = { ...mockEnrollmentData, id: 'enrollment-456' };
      mockAdminApprovalWorkflow.getPendingEnrollments.mockResolvedValue([newEnrollment]);

      await act(async () => {
        await result.current.refreshPendingEnrollments();
      });

      expect(result.current.pendingEnrollments).toEqual([newEnrollment]);
    });

    it('should handle fetch errors', async () => {
      const { result } = renderHook(() => useAdminApprovalWorkflow());

      const error = new Error('Fetch failed');
      mockAdminApprovalWorkflow.getPendingEnrollments.mockRejectedValue(error);

      await act(async () => {
        await result.current.refreshPendingEnrollments();
      });

      expect(result.current.error).toBe('Fetch failed');
    });

    it('should select enrollment and fetch details', async () => {
      const mockDetails = {
        ...mockEnrollmentData,
        user_profile: { full_name: 'John Doe' },
        course_details: { description: 'Test course' }
      };

      mockAdminApprovalWorkflow.getEnrollmentDetails.mockResolvedValue(mockDetails);

      const { result } = renderHook(() => useAdminApprovalWorkflow());

      await act(async () => {
        await result.current.selectEnrollment('enrollment-123');
      });

      expect(mockAdminApprovalWorkflow.getEnrollmentDetails).toHaveBeenCalledWith('enrollment-123');
      expect(result.current.selectedEnrollment).toEqual(mockDetails);
    });
  });

  describe('Approval Actions', () => {
    it('should approve enrollment successfully', async () => {
      const mockApprovalResult = {
        success: true,
        enrollmentId: 'enrollment-123',
        message: 'Approved successfully',
        timestamp: new Date(),
        approvedBy: 'admin-123'
      };

      mockAdminApprovalWorkflow.approveEnrollment.mockResolvedValue(mockApprovalResult);

      const { result } = renderHook(() => useAdminApprovalWorkflow());

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.pendingEnrollments).toEqual([mockEnrollmentData]);
      });

      let approvalResult;
      await act(async () => {
        approvalResult = await result.current.approveEnrollment('enrollment-123', 'admin-123', 'Test approval');
      });

      expect(mockAdminApprovalWorkflow.approveEnrollment).toHaveBeenCalledWith(
        'enrollment-123',
        'admin-123',
        'Test approval'
      );
      expect(approvalResult).toEqual(mockApprovalResult);
      
      // Should remove from pending list
      expect(result.current.pendingEnrollments).toEqual([]);
    });

    it('should reject enrollment successfully', async () => {
      const mockRejectionResult = {
        success: true,
        enrollmentId: 'enrollment-123',
        reason: 'Invalid payment proof',
        timestamp: new Date(),
        rejectedBy: 'admin-123'
      };

      mockAdminApprovalWorkflow.rejectEnrollment.mockResolvedValue(mockRejectionResult);

      const { result } = renderHook(() => useAdminApprovalWorkflow());

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.pendingEnrollments).toEqual([mockEnrollmentData]);
      });

      let rejectionResult;
      await act(async () => {
        rejectionResult = await result.current.rejectEnrollment('enrollment-123', 'Invalid payment proof', 'admin-123');
      });

      expect(mockAdminApprovalWorkflow.rejectEnrollment).toHaveBeenCalledWith(
        'enrollment-123',
        'Invalid payment proof',
        'admin-123'
      );
      expect(rejectionResult).toEqual(mockRejectionResult);
      
      // Should remove from pending list
      expect(result.current.pendingEnrollments).toEqual([]);
    });

    it('should handle bulk approval', async () => {
      const enrollmentIds = ['enrollment-1', 'enrollment-2'];
      const mockBulkResult = {
        totalProcessed: 2,
        successful: ['enrollment-1', 'enrollment-2'],
        failed: [],
        timestamp: new Date(),
        approvedBy: 'admin-123'
      };

      mockAdminApprovalWorkflow.bulkApproveEnrollments.mockResolvedValue(mockBulkResult);

      const { result } = renderHook(() => useAdminApprovalWorkflow());

      let bulkResult;
      await act(async () => {
        bulkResult = await result.current.bulkApproveEnrollments(enrollmentIds, 'admin-123');
      });

      expect(mockAdminApprovalWorkflow.bulkApproveEnrollments).toHaveBeenCalledWith(
        enrollmentIds,
        'admin-123'
      );
      expect(bulkResult).toEqual(mockBulkResult);
    });
  });

  describe('Real-time Updates', () => {
    it('should handle new enrollment notifications', async () => {
      let newEnrollmentCallback: (enrollment: any) => void;
      
      mockAdminApprovalWorkflow.subscribeToNewEnrollments.mockImplementation((callback) => {
        newEnrollmentCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => useAdminApprovalWorkflow());

      // Wait for subscription setup
      await waitFor(() => {
        expect(mockAdminApprovalWorkflow.subscribeToNewEnrollments).toHaveBeenCalled();
      });

      const newEnrollment = { ...mockEnrollmentData, id: 'enrollment-new' };

      // Simulate new enrollment notification
      act(() => {
        newEnrollmentCallback!(newEnrollment);
      });

      expect(result.current.pendingEnrollments).toContain(newEnrollment);
      expect(result.current.newEnrollmentCount).toBe(1);
    });

    it('should handle enrollment processed notifications', async () => {
      let processedCallback: (enrollmentId: string, action: string) => void;
      
      mockAdminApprovalWorkflow.subscribeToEnrollmentProcessed.mockImplementation((callback) => {
        processedCallback = callback;
        return () => {};
      });

      const { result } = renderHook(() => useAdminApprovalWorkflow());

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.pendingEnrollments).toEqual([mockEnrollmentData]);
      });

      // Simulate enrollment processed notification
      act(() => {
        processedCallback!('enrollment-123', 'approved');
      });

      // Should remove from pending list
      expect(result.current.pendingEnrollments).toEqual([]);
    });
  });

  describe('Auto-refresh', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should setup auto-refresh by default', async () => {
      renderHook(() => useAdminApprovalWorkflow());

      // Wait for initial setup
      await waitFor(() => {
        expect(mockAdminApprovalWorkflow.getPendingEnrollments).toHaveBeenCalled();
      });

      // Clear the initial calls
      mockAdminApprovalWorkflow.getPendingEnrollments.mockClear();
      mockAdminApprovalWorkflow.getWorkflowStatistics.mockClear();

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(30000); // 30 seconds
      });

      expect(mockAdminApprovalWorkflow.getPendingEnrollments).toHaveBeenCalled();
      expect(mockAdminApprovalWorkflow.getWorkflowStatistics).toHaveBeenCalled();
    });

    it('should disable auto-refresh when option is false', async () => {
      renderHook(() => useAdminApprovalWorkflow({ autoRefresh: false }));

      // Wait for initial setup
      await waitFor(() => {
        expect(mockAdminApprovalWorkflow.getPendingEnrollments).toHaveBeenCalled();
      });

      // Clear the initial calls
      mockAdminApprovalWorkflow.getPendingEnrollments.mockClear();

      // Fast-forward time
      act(() => {
        vi.advanceTimersByTime(30000);
      });

      // Should not have been called again
      expect(mockAdminApprovalWorkflow.getPendingEnrollments).not.toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    it('should cleanup on unmount', async () => {
      const unsubscribe1 = vi.fn();
      const unsubscribe2 = vi.fn();

      mockAdminApprovalWorkflow.subscribeToNewEnrollments.mockReturnValue(unsubscribe1);
      mockAdminApprovalWorkflow.subscribeToEnrollmentProcessed.mockReturnValue(unsubscribe2);

      const { unmount } = renderHook(() => useAdminApprovalWorkflow());

      // Wait for setup
      await waitFor(() => {
        expect(mockAdminApprovalWorkflow.subscribeToNewEnrollments).toHaveBeenCalled();
      });

      unmount();

      expect(unsubscribe1).toHaveBeenCalled();
      expect(unsubscribe2).toHaveBeenCalled();
      expect(mockAdminApprovalWorkflow.cleanup).toHaveBeenCalled();
    });

    it('should provide manual cleanup function', async () => {
      const { result } = renderHook(() => useAdminApprovalWorkflow());

      await waitFor(() => {
        expect(result.current.cleanup).toBeDefined();
      });

      act(() => {
        result.current.cleanup();
      });

      expect(mockAdminApprovalWorkflow.cleanup).toHaveBeenCalled();
    });
  });

  describe('Loading and Error States', () => {
    it('should show loading state during operations', async () => {
      // Make the function hang to test loading state
      let resolvePromise: (value: any) => void;
      const hangingPromise = new Promise(resolve => {
        resolvePromise = resolve;
      });

      mockAdminApprovalWorkflow.getPendingEnrollments.mockReturnValue(hangingPromise);

      const { result } = renderHook(() => useAdminApprovalWorkflow());

      // Should be loading initially
      expect(result.current.isLoading).toBe(true);

      // Resolve the promise
      act(() => {
        resolvePromise!([]);
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('should clear errors on successful operations', async () => {
      const { result } = renderHook(() => useAdminApprovalWorkflow());

      // Set an error first
      const error = new Error('Test error');
      mockAdminApprovalWorkflow.getPendingEnrollments.mockRejectedValueOnce(error);

      await act(async () => {
        await result.current.refreshPendingEnrollments();
      });

      expect(result.current.error).toBe('Test error');

      // Now make it succeed
      mockAdminApprovalWorkflow.getPendingEnrollments.mockResolvedValue([]);

      await act(async () => {
        await result.current.refreshPendingEnrollments();
      });

      expect(result.current.error).toBeNull();
    });
  });
});