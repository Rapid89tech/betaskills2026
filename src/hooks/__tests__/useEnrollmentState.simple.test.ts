/**
 * useEnrollmentState Hook Simple Tests
 * 
 * Basic tests for the enrollment state hook
 */

import { describe, it, expect, vi } from 'vitest';

// Mock the EnrollmentStateManager
vi.mock('@/services/EnrollmentStateManager', () => ({
  enrollmentStateManager: {
    getEnrollmentState: vi.fn(),
    createPendingEnrollment: vi.fn(),
    approveEnrollment: vi.fn(),
    rejectEnrollment: vi.fn(),
    updatePaymentStatus: vi.fn(),
    canAccessCourse: vi.fn(),
    subscribeToStatusUpdates: vi.fn(() => vi.fn())
  },
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

describe('useEnrollmentState Hook', () => {
  it('should be importable', async () => {
    const { useEnrollmentState } = await import('../useEnrollmentState');
    expect(useEnrollmentState).toBeDefined();
  });

  it('should export convenience hooks', async () => {
    const { useCourseCardState, useAdminEnrollmentState, useCourseAccess } = await import('../useEnrollmentState');
    expect(useCourseCardState).toBeDefined();
    expect(useAdminEnrollmentState).toBeDefined();
    expect(useCourseAccess).toBeDefined();
  });
});