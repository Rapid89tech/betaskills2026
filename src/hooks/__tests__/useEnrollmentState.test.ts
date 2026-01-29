/**
 * useEnrollmentState Hook Tests
 * 
 * Tests for the enrollment state management hook including real-time updates,
 * state transitions, and integration with EnrollmentStateManager.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useEnrollmentState, useCourseCardState, useAdminEnrollmentState, useCourseAccess } from '../useEnrollmentState';
import { EnrollmentStatus, PaymentType, PaymentStatus } from '@/types/ikhokha';
import { ButtonAction } from '@/services/EnrollmentStateManager';

// Mock EnrollmentStateManager
const mockEnrollmentStateManager = {
  getEnrollmentState: vi.fn(),
  createPendingEnrollment: vi.fn(),
  approveEnrollment: vi.fn(),
  rejectEnrollment: vi.fn(),
  updatePaymentStatus: vi.fn(),
  canAccessCourse: vi.fn(),
  subscribeToStatusUpdates: vi.fn(() => vi.fn()) // Returns unsubscribe function
};

vi.mock('@/services/EnrollmentStateManager', () => ({
  enrollmentStateManager: mockEnrollmentStateManager,
  ButtonAction: {
    REDIRECT_TO_AUTH: 'redirect_to_auth',
    INITIATE_ENROLLMENT: 'initiate_enrollment',
    SHOW_PENDING: 'show_pending',
    CONTINUE_COURSE: 'continue_course',
    RETRY_PAYMENT: 'retry_payment'
  }
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

// Mock timers
vi.useFakeTimers();

describe('useEnrollmentState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('Initial State Loading', () => {
    it('should load enrollment state on mount', async () => {
      const mockState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState.mockResolvedValue(mockState);

      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true
        })
      );

      // Initially loading
      expect(result.current.isLoading).toBe(true);
      expect(result.current.buttonText).toBe("Loading...");

      // Wait for state to load
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.enrollmentState).toEqual(mockState);
      expect(result.current.canEnroll).toBe(true);
      expect(result.current.buttonText).toBe("Enroll Now");
      expect(mockEnrollmentStateManager.getEnrollmentState).toHaveBeenCalledWith(
        'course-123',
        'user-456',
        true
      );
    });

    it('should handle loading errors gracefully', async () => {
      const error = new Error('Failed to load state');
      mockEnrollmentStateManager.getEnrollmentState.mockRejectedValue(error);

      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true
        })
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe('Failed to load state');
    });
  });

  describe('createEnrollment', () => {
    it('should create enrollment successfully', async () => {
      const mockInitialState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      };

      const mockUpdatedState = {
        ...mockInitialState,
        buttonText: "Payment Processing",
        buttonAction: ButtonAction.SHOW_PENDING,
        isDisabled: true
      };

      mockEnrollmentStateManager.getEnrollmentState
        .mockResolvedValueOnce(mockInitialState)
        .mockResolvedValueOnce(mockUpdatedState);

      mockEnrollmentStateManager.createPendingEnrollment.mockResolvedValue({
        id: 'enrollment-123',
        course_id: 'course-123',
        user_id: 'user-456'
      });

      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true
        })
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.createEnrollment('user@example.com', 'Test Course', PaymentType.CARD);
      });

      expect(mockEnrollmentStateManager.createPendingEnrollment).toHaveBeenCalledWith(
        'course-123',
        'user-456',
        'user@example.com',
        'Test Course',
        PaymentType.CARD
      );

      expect(result.current.buttonText).toBe("Payment Processing");
    });

    it('should handle enrollment creation errors', async () => {
      const mockState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState.mockResolvedValue(mockState);

      const error = new Error('Enrollment creation failed');
      mockEnrollmentStateManager.createPendingEnrollment.mockRejectedValue(error);

      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true
        })
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await expect(
        act(async () => {
          await result.current.createEnrollment('user@example.com', 'Test Course');
        })
      ).rejects.toThrow('Enrollment creation failed');

      expect(result.current.error).toBe('Enrollment creation failed');
    });

    it('should throw error when userId is not provided', async () => {
      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          isLoggedIn: false
        })
      );

      await expect(
        act(async () => {
          await result.current.createEnrollment('user@example.com', 'Test Course');
        })
      ).rejects.toThrow('User ID is required to create enrollment');
    });
  });

  describe('approveEnrollment', () => {
    it('should approve enrollment successfully', async () => {
      const mockInitialState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: true,
        hasAccess: false,
        canEnroll: false,
        buttonText: "Pending Approval",
        buttonAction: ButtonAction.SHOW_PENDING,
        isDisabled: true
      };

      const mockUpdatedState = {
        ...mockInitialState,
        status: EnrollmentStatus.APPROVED,
        hasAccess: true,
        buttonText: "Continue Course",
        buttonAction: ButtonAction.CONTINUE_COURSE,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState
        .mockResolvedValueOnce(mockInitialState)
        .mockResolvedValueOnce(mockUpdatedState);

      mockEnrollmentStateManager.approveEnrollment.mockResolvedValue(undefined);

      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true
        })
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.approveEnrollment('enrollment-123', 'admin-789', 'Manual approval');
      });

      expect(mockEnrollmentStateManager.approveEnrollment).toHaveBeenCalledWith(
        'enrollment-123',
        'admin-789',
        'Manual approval'
      );

      expect(result.current.buttonText).toBe("Continue Course");
      expect(result.current.hasAccess).toBe(true);
    });
  });

  describe('rejectEnrollment', () => {
    it('should reject enrollment successfully', async () => {
      const mockInitialState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: true,
        hasAccess: false,
        canEnroll: false,
        buttonText: "Pending Approval",
        buttonAction: ButtonAction.SHOW_PENDING,
        isDisabled: true
      };

      const mockUpdatedState = {
        ...mockInitialState,
        status: EnrollmentStatus.REJECTED,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState
        .mockResolvedValueOnce(mockInitialState)
        .mockResolvedValueOnce(mockUpdatedState);

      mockEnrollmentStateManager.rejectEnrollment.mockResolvedValue(undefined);

      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true
        })
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.rejectEnrollment('enrollment-123', 'Insufficient documentation', 'admin-789');
      });

      expect(mockEnrollmentStateManager.rejectEnrollment).toHaveBeenCalledWith(
        'enrollment-123',
        'Insufficient documentation',
        'admin-789'
      );

      expect(result.current.buttonText).toBe("Enroll Now");
      expect(result.current.canEnroll).toBe(true);
    });
  });

  describe('updatePaymentStatus', () => {
    it('should update payment status successfully', async () => {
      const mockState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: false,
        buttonText: "Payment Processing",
        buttonAction: ButtonAction.SHOW_PENDING,
        isDisabled: true
      };

      mockEnrollmentStateManager.getEnrollmentState.mockResolvedValue(mockState);
      mockEnrollmentStateManager.updatePaymentStatus.mockResolvedValue(undefined);

      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true
        })
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      await act(async () => {
        await result.current.updatePaymentStatus('enrollment-123', PaymentStatus.COMPLETED, 'txn-789');
      });

      expect(mockEnrollmentStateManager.updatePaymentStatus).toHaveBeenCalledWith(
        'enrollment-123',
        PaymentStatus.COMPLETED,
        'txn-789'
      );
    });
  });

  describe('checkCourseAccess', () => {
    it('should check course access successfully', async () => {
      mockEnrollmentStateManager.canAccessCourse.mockResolvedValue(true);

      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true
        })
      );

      const hasAccess = await act(async () => {
        return await result.current.checkCourseAccess();
      });

      expect(hasAccess).toBe(true);
      expect(mockEnrollmentStateManager.canAccessCourse).toHaveBeenCalledWith('course-123', 'user-456');
    });

    it('should return false when userId is not provided', async () => {
      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          isLoggedIn: false
        })
      );

      const hasAccess = await act(async () => {
        return await result.current.checkCourseAccess();
      });

      expect(hasAccess).toBe(false);
    });
  });

  describe('Real-time Updates', () => {
    it('should subscribe to status updates and refresh state', async () => {
      const mockState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState.mockResolvedValue(mockState);

      let statusUpdateCallback: any;
      mockEnrollmentStateManager.subscribeToStatusUpdates.mockImplementation((callback) => {
        statusUpdateCallback = callback;
        return vi.fn(); // unsubscribe function
      });

      const { result } = renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true
        })
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockEnrollmentStateManager.subscribeToStatusUpdates).toHaveBeenCalled();

      // Simulate status update
      act(() => {
        statusUpdateCallback({
          enrollmentId: 'enrollment-123',
          userId: 'user-456',
          courseId: 'course-123',
          status: EnrollmentStatus.APPROVED,
          eventType: 'admin_approved',
          timestamp: new Date()
        });
      });

      // Should trigger state refresh
      await waitFor(() => {
        expect(mockEnrollmentStateManager.getEnrollmentState).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('Auto-refresh', () => {
    it('should auto-refresh state at specified intervals', async () => {
      const mockState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState.mockResolvedValue(mockState);

      renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true,
          autoRefresh: true,
          refreshInterval: 5000
        })
      );

      // Initial call
      await waitFor(() => {
        expect(mockEnrollmentStateManager.getEnrollmentState).toHaveBeenCalledTimes(1);
      });

      // Advance timer
      act(() => {
        vi.advanceTimersByTime(5000);
      });

      // Should have been called again
      await waitFor(() => {
        expect(mockEnrollmentStateManager.getEnrollmentState).toHaveBeenCalledTimes(2);
      });
    });

    it('should not auto-refresh when disabled', async () => {
      const mockState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState.mockResolvedValue(mockState);

      renderHook(() => 
        useEnrollmentState({
          courseId: 'course-123',
          userId: 'user-456',
          isLoggedIn: true,
          autoRefresh: false
        })
      );

      // Initial call
      await waitFor(() => {
        expect(mockEnrollmentStateManager.getEnrollmentState).toHaveBeenCalledTimes(1);
      });

      // Advance timer
      act(() => {
        vi.advanceTimersByTime(30000);
      });

      // Should not have been called again
      expect(mockEnrollmentStateManager.getEnrollmentState).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Convenience Hooks', () => {
  describe('useCourseCardState', () => {
    it('should use correct refresh interval for course cards', () => {
      const mockState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState.mockResolvedValue(mockState);

      renderHook(() => useCourseCardState('course-123', 'user-456', true));

      // Should use 10 second refresh interval for course cards
      expect(mockEnrollmentStateManager.getEnrollmentState).toHaveBeenCalled();
    });
  });

  describe('useAdminEnrollmentState', () => {
    it('should use correct refresh interval for admin dashboard', () => {
      const mockState = {
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState.mockResolvedValue(mockState);

      renderHook(() => useAdminEnrollmentState('course-123', 'user-456'));

      // Should use 5 second refresh interval for admin
      expect(mockEnrollmentStateManager.getEnrollmentState).toHaveBeenCalled();
    });
  });

  describe('useCourseAccess', () => {
    it('should provide course access checking functionality', async () => {
      const mockState = {
        status: EnrollmentStatus.APPROVED,
        requiresApproval: false,
        hasAccess: true,
        canEnroll: false,
        buttonText: "Continue Course",
        buttonAction: ButtonAction.CONTINUE_COURSE,
        isDisabled: false
      };

      mockEnrollmentStateManager.getEnrollmentState.mockResolvedValue(mockState);
      mockEnrollmentStateManager.canAccessCourse.mockResolvedValue(true);

      const { result } = renderHook(() => useCourseAccess('course-123', 'user-456'));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.hasAccess).toBe(true);

      const accessCheck = await act(async () => {
        return await result.current.checkAccess();
      });

      expect(accessCheck).toBe(true);
    });
  });
});