import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCourseAccess, useMultipleCourseAccess, useCourseAccessWithStatus } from '../useCourseAccess';
import { courseAccessController } from '@/services/CourseAccessController';
import { EnrollmentStatus, PaymentStatus } from '@/types/ikhokha';

// Mock the CourseAccessController
vi.mock('@/services/CourseAccessController', () => ({
  courseAccessController: {
    canAccessCourse: vi.fn(),
    getUserCourseAccess: vi.fn(),
    clearAllCache: vi.fn()
  }
}));

// Mock useAuth hook
const mockUser = { id: 'user-123', email: 'test@example.com' };
vi.mock('../AuthContext', () => ({
  useAuth: () => ({ user: mockUser })
}));

// Mock logger
vi.mock('@/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    error: vi.fn()
  }
}));

describe('useCourseAccess', () => {
  const mockCourseId = 'course-123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return access granted for approved enrollment', async () => {
    const mockAccessResult = {
      hasAccess: true,
      enrollmentStatus: EnrollmentStatus.APPROVED,
      paymentStatus: PaymentStatus.COMPLETED
    };

    vi.mocked(courseAccessController.canAccessCourse).mockResolvedValue(mockAccessResult);

    const { result } = renderHook(() => 
      useCourseAccess({ courseId: mockCourseId })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasAccess).toBe(true);
    expect(result.current.accessResult).toEqual(mockAccessResult);
    expect(result.current.error).toBeNull();
    expect(courseAccessController.canAccessCourse).toHaveBeenCalledWith(mockCourseId, mockUser.id);
  });

  it('should return access denied for pending enrollment', async () => {
    const mockAccessResult = {
      hasAccess: false,
      reason: 'Enrollment pending approval',
      enrollmentStatus: EnrollmentStatus.PENDING,
      paymentStatus: PaymentStatus.PENDING
    };

    vi.mocked(courseAccessController.canAccessCourse).mockResolvedValue(mockAccessResult);

    const { result } = renderHook(() => 
      useCourseAccess({ courseId: mockCourseId })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasAccess).toBe(false);
    expect(result.current.accessResult?.reason).toBe('Enrollment pending approval');
    expect(result.current.error).toBeNull();
  });

  it('should handle errors gracefully', async () => {
    const mockError = new Error('Database connection failed');
    vi.mocked(courseAccessController.canAccessCourse).mockRejectedValue(mockError);

    const { result } = renderHook(() => 
      useCourseAccess({ courseId: mockCourseId })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasAccess).toBe(false);
    expect(result.current.error).toBe('Database connection failed');
    expect(result.current.accessResult).toBeNull();
  });

  it('should not check access when user is not logged in', async () => {
    // Mock no user
    vi.doMock('../AuthContext', () => ({
      useAuth: () => ({ user: null })
    }));

    const { result } = renderHook(() => 
      useCourseAccess({ courseId: mockCourseId })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasAccess).toBe(false);
    expect(result.current.accessResult).toBeNull();
    expect(courseAccessController.canAccessCourse).not.toHaveBeenCalled();
  });

  it('should refresh access and clear cache', async () => {
    const mockAccessResult = {
      hasAccess: true,
      enrollmentStatus: EnrollmentStatus.APPROVED,
      paymentStatus: PaymentStatus.COMPLETED
    };

    vi.mocked(courseAccessController.canAccessCourse).mockResolvedValue(mockAccessResult);

    const { result } = renderHook(() => 
      useCourseAccess({ courseId: mockCourseId })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refreshAccess();
    });

    expect(courseAccessController.clearAllCache).toHaveBeenCalled();
    expect(courseAccessController.canAccessCourse).toHaveBeenCalledTimes(2);
  });

  it('should manually check access when autoCheck is false', async () => {
    const mockAccessResult = {
      hasAccess: true,
      enrollmentStatus: EnrollmentStatus.APPROVED,
      paymentStatus: PaymentStatus.COMPLETED
    };

    vi.mocked(courseAccessController.canAccessCourse).mockResolvedValue(mockAccessResult);

    const { result } = renderHook(() => 
      useCourseAccess({ courseId: mockCourseId, autoCheck: false })
    );

    // Should not auto-check
    expect(courseAccessController.canAccessCourse).not.toHaveBeenCalled();

    await act(async () => {
      await result.current.checkAccess();
    });

    expect(courseAccessController.canAccessCourse).toHaveBeenCalledWith(mockCourseId, mockUser.id);
    expect(result.current.hasAccess).toBe(true);
  });

  it('should handle enrollment update events', async () => {
    const mockAccessResult = {
      hasAccess: true,
      enrollmentStatus: EnrollmentStatus.APPROVED,
      paymentStatus: PaymentStatus.COMPLETED
    };

    vi.mocked(courseAccessController.canAccessCourse).mockResolvedValue(mockAccessResult);

    const { result } = renderHook(() => 
      useCourseAccess({ courseId: mockCourseId })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    // Simulate enrollment update event
    const enrollmentUpdateEvent = new CustomEvent('enrollment-updated', {
      detail: {
        enrollment: { course_id: mockCourseId, status: EnrollmentStatus.APPROVED },
        userId: mockUser.id
      }
    });

    act(() => {
      window.dispatchEvent(enrollmentUpdateEvent);
    });

    await waitFor(() => {
      expect(courseAccessController.canAccessCourse).toHaveBeenCalledTimes(2);
    });
  });
});

describe('useMultipleCourseAccess', () => {
  const mockCourseIds = ['course-1', 'course-2', 'course-3'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return access status for multiple courses', async () => {
    const mockAccessResults = {
      'course-1': { hasAccess: true, enrollmentStatus: EnrollmentStatus.APPROVED },
      'course-2': { hasAccess: false, reason: 'Enrollment pending approval' },
      'course-3': { hasAccess: true, enrollmentStatus: EnrollmentStatus.APPROVED }
    };

    vi.mocked(courseAccessController.getUserCourseAccess).mockResolvedValue(mockAccessResults);

    const { result } = renderHook(() => 
      useMultipleCourseAccess({ courseIds: mockCourseIds })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.courseAccess).toEqual(mockAccessResults);
    expect(result.current.error).toBeNull();
    expect(courseAccessController.getUserCourseAccess).toHaveBeenCalledWith(mockUser.id, mockCourseIds);
  });

  it('should handle errors in multiple course access check', async () => {
    const mockError = new Error('Network error');
    vi.mocked(courseAccessController.getUserCourseAccess).mockRejectedValue(mockError);

    const { result } = renderHook(() => 
      useMultipleCourseAccess({ courseIds: mockCourseIds })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.courseAccess).toEqual({});
    expect(result.current.error).toBe('Network error');
  });

  it('should refresh all access and clear cache', async () => {
    const mockAccessResults = {
      'course-1': { hasAccess: true, enrollmentStatus: EnrollmentStatus.APPROVED }
    };

    vi.mocked(courseAccessController.getUserCourseAccess).mockResolvedValue(mockAccessResults);

    const { result } = renderHook(() => 
      useMultipleCourseAccess({ courseIds: mockCourseIds })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.refreshAllAccess();
    });

    expect(courseAccessController.clearAllCache).toHaveBeenCalled();
    expect(courseAccessController.getUserCourseAccess).toHaveBeenCalledTimes(2);
  });

  it('should not check when no courses provided', async () => {
    const { result } = renderHook(() => 
      useMultipleCourseAccess({ courseIds: [] })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.courseAccess).toEqual({});
    expect(courseAccessController.getUserCourseAccess).not.toHaveBeenCalled();
  });
});

describe('useCourseAccessWithStatus', () => {
  const mockCourseId = 'course-123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide detailed status information for pending approval', async () => {
    const mockAccessResult = {
      hasAccess: false,
      reason: 'Enrollment pending approval',
      enrollmentStatus: EnrollmentStatus.PENDING,
      paymentStatus: PaymentStatus.COMPLETED
    };

    vi.mocked(courseAccessController.canAccessCourse).mockResolvedValue(mockAccessResult);

    const { result } = renderHook(() => 
      useCourseAccessWithStatus({ courseId: mockCourseId })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasAccess).toBe(false);
    expect(result.current.enrollmentStatus).toBe(EnrollmentStatus.PENDING);
    expect(result.current.paymentStatus).toBe(PaymentStatus.COMPLETED);
    expect(result.current.accessReason).toBe('Enrollment pending approval');
    expect(result.current.canRetryPayment).toBe(false);
    expect(result.current.isPendingApproval).toBe(true);
    expect(result.current.isPaymentCompleted).toBe(true);
  });

  it('should indicate retry payment option for failed payments', async () => {
    const mockAccessResult = {
      hasAccess: false,
      reason: 'Payment failed',
      enrollmentStatus: EnrollmentStatus.PENDING,
      paymentStatus: PaymentStatus.FAILED
    };

    vi.mocked(courseAccessController.canAccessCourse).mockResolvedValue(mockAccessResult);

    const { result } = renderHook(() => 
      useCourseAccessWithStatus({ courseId: mockCourseId })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasAccess).toBe(false);
    expect(result.current.enrollmentStatus).toBe(EnrollmentStatus.PENDING);
    expect(result.current.paymentStatus).toBe(PaymentStatus.FAILED);
    expect(result.current.canRetryPayment).toBe(true);
    expect(result.current.isPendingApproval).toBe(false);
    expect(result.current.isPaymentCompleted).toBe(false);
  });

  it('should show approved status with access granted', async () => {
    const mockAccessResult = {
      hasAccess: true,
      enrollmentStatus: EnrollmentStatus.APPROVED,
      paymentStatus: PaymentStatus.COMPLETED
    };

    vi.mocked(courseAccessController.canAccessCourse).mockResolvedValue(mockAccessResult);

    const { result } = renderHook(() => 
      useCourseAccessWithStatus({ courseId: mockCourseId })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.hasAccess).toBe(true);
    expect(result.current.enrollmentStatus).toBe(EnrollmentStatus.APPROVED);
    expect(result.current.paymentStatus).toBe(PaymentStatus.COMPLETED);
    expect(result.current.canRetryPayment).toBe(false);
    expect(result.current.isPendingApproval).toBe(false);
    expect(result.current.isPaymentCompleted).toBe(true);
  });
});