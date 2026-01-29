import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFastDashboard } from '../useFastDashboard';

// Mock dependencies
vi.mock('../AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'user1', email: 'test@example.com' },
    profile: { role: 'admin', id: 'profile1' }
  })
}));

vi.mock('@/services/FastDataService', () => ({
  fastDataService: {
    getUserEnrollments: vi.fn(),
    getAllEnrollments: vi.fn(),
    getAllUsers: vi.fn(),
    updateEnrollmentStatus: vi.fn(),
    clearCache: vi.fn()
  }
}));

vi.mock('@/services/RealTimeEnrollmentService', () => ({
  realTimeEnrollmentService: {
    subscribeToUserEnrollments: vi.fn(() => vi.fn()),
    subscribeToEnrollments: vi.fn(() => vi.fn())
  }
}));

describe('useFastDashboard Enhanced Error Handling', () => {
  let mockFastDataService: any;

  beforeEach(async () => {
    mockFastDataService = (await import('@/services/FastDataService')).fastDataService;
    vi.clearAllMocks();
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Error Handling', () => {
    it('should handle initial load errors gracefully', async () => {
      const error = new Error('Network connection failed');
      mockFastDataService.getAllEnrollments.mockRejectedValue(error);
      mockFastDataService.getAllUsers.mockRejectedValue(error);
      mockFastDataService.getUserEnrollments.mockRejectedValue(error);

      const { result } = renderHook(() => useFastDashboard());

      // Wait for initial load to complete
      await act(async () => {
        await vi.runAllTimersAsync();
      });

      expect(result.current.error).toBe('Network connection failed');
      expect(result.current.loading).toBe(false);
      expect(result.current.retryCount).toBe(1); // Should have attempted one retry
    });

    it('should clear error state when clearError is called', async () => {
      const error = new Error('Test error');
      mockFastDataService.getAllEnrollments.mockRejectedValue(error);
      mockFastDataService.getAllUsers.mockRejectedValue(error);
      mockFastDataService.getUserEnrollments.mockRejectedValue(error);

      const { result } = renderHook(() => useFastDashboard());

      await act(async () => {
        await vi.runAllTimersAsync();
      });

      expect(result.current.error).toBe('Test error');

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.retryCount).toBe(0);
    });

    it('should handle optimistic updates with rollback on failure', async () => {
      const mockEnrollments = [
        { id: 'enroll1', status: 'pending', user_id: 'user1', course_id: 'course1' }
      ];

      mockFastDataService.getAllEnrollments.mockResolvedValue(mockEnrollments);
      mockFastDataService.getAllUsers.mockResolvedValue([]);
      mockFastDataService.getUserEnrollments.mockResolvedValue([]);
      mockFastDataService.updateEnrollmentStatus.mockRejectedValue(new Error('Update failed'));

      const { result } = renderHook(() => useFastDashboard());

      await act(async () => {
        await vi.runAllTimersAsync();
      });

      // Verify initial state
      expect(result.current.allEnrollments[0].status).toBe('pending');

      // Attempt to approve enrollment (should fail and rollback)
      await act(async () => {
        try {
          await result.current.approveEnrollment('enroll1');
        } catch (error) {
          // Expected to throw
        }
      });

      // Should have rolled back to original status
      expect(result.current.allEnrollments[0].status).toBe('pending');
    });
  });

  describe('Retry Logic', () => {
    it('should implement exponential backoff for retries', async () => {
      let callCount = 0;
      const error = new Error('Temporary failure');
      
      mockFastDataService.getAllEnrollments.mockImplementation(() => {
        callCount++;
        if (callCount <= 2) {
          return Promise.reject(error);
        }
        return Promise.resolve([]);
      });
      
      mockFastDataService.getAllUsers.mockResolvedValue([]);
      mockFastDataService.getUserEnrollments.mockResolvedValue([]);

      const { result } = renderHook(() => useFastDashboard());

      // Initial load should fail and schedule retry
      await act(async () => {
        await vi.runAllTimersAsync();
      });

      expect(result.current.error).toBe('Temporary failure');
      expect(result.current.retryCount).toBe(1);
      expect(result.current.isRetrying).toBe(true);

      // Advance timers to trigger retry
      await act(async () => {
        vi.advanceTimersByTime(2000); // First retry delay
        await vi.runAllTimersAsync();
      });

      expect(result.current.retryCount).toBe(2);

      // Advance timers for second retry (should succeed)
      await act(async () => {
        vi.advanceTimersByTime(4000); // Second retry delay (exponential backoff)
        await vi.runAllTimersAsync();
      });

      expect(result.current.error).toBeNull();
      expect(result.current.retryCount).toBe(0);
      expect(result.current.isRetrying).toBe(false);
    });

    it('should stop retrying after max attempts', async () => {
      const error = new Error('Persistent failure');
      mockFastDataService.getAllEnrollments.mockRejectedValue(error);
      mockFastDataService.getAllUsers.mockRejectedValue(error);
      mockFastDataService.getUserEnrollments.mockRejectedValue(error);

      const { result } = renderHook(() => useFastDashboard());

      // Let all retries complete
      await act(async () => {
        // Initial load
        await vi.runAllTimersAsync();
        
        // First retry
        vi.advanceTimersByTime(2000);
        await vi.runAllTimersAsync();
        
        // Second retry
        vi.advanceTimersByTime(4000);
        await vi.runAllTimersAsync();
        
        // Third retry
        vi.advanceTimersByTime(8000);
        await vi.runAllTimersAsync();
      });

      expect(result.current.error).toBe('Persistent failure');
      expect(result.current.retryCount).toBe(3);
      expect(result.current.isRetrying).toBe(false);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources on unmount', () => {
      const { unmount } = renderHook(() => useFastDashboard());
      
      // Unmount should not throw errors
      expect(() => unmount()).not.toThrow();
    });

    it('should prevent state updates after unmount', async () => {
      const { result, unmount } = renderHook(() => useFastDashboard());
      
      // Start an async operation
      const promise = act(async () => {
        mockFastDataService.getAllEnrollments.mockImplementation(() => 
          new Promise(resolve => setTimeout(() => resolve([]), 1000))
        );
        result.current.refresh();
      });
      
      // Unmount before operation completes
      unmount();
      
      // Complete the operation - should not cause errors
      await act(async () => {
        vi.advanceTimersByTime(1000);
        await promise;
      });
    });
  });
});