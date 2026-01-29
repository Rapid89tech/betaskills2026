/**
 * Enrollment State Management Integration Tests
 * 
 * Integration tests for the complete enrollment state management system
 * including EnrollmentStateManager, hooks, and business logic validation.
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EnrollmentStatus, PaymentType, PaymentStatus } from '@/types/ikhokha';

// Mock Supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } }),
          order: vi.fn(() => ({
            limit: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } })
            })),
            ascending: vi.fn().mockResolvedValue({ data: [], error: null })
          }))
        })),
        order: vi.fn(() => ({
          ascending: vi.fn().mockResolvedValue({ data: [], error: null })
        }))
      })),
      upsert: vi.fn().mockResolvedValue({ error: null }),
      insert: vi.fn().mockResolvedValue({ error: null })
    }))
  }
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn()
  }
}));

describe('Enrollment State Management Integration', () => {
  let enrollmentStateManager: any;

  beforeEach(async () => {
    vi.clearAllMocks();
    const { EnrollmentStateManager } = await import('@/services/EnrollmentStateManager');
    enrollmentStateManager = EnrollmentStateManager.getInstance();
  });

  describe('Business Logic Validation', () => {
    it('should enforce correct payment type approval requirements', () => {
      // Requirement 6.2: EFT payments require approval, card payments do not
      expect(enrollmentStateManager.shouldRequireApproval(PaymentType.CARD)).toBe(false);
      expect(enrollmentStateManager.shouldRequireApproval(PaymentType.EFT)).toBe(true);
      expect(enrollmentStateManager.shouldRequireApproval(PaymentType.MANUAL)).toBe(true);
    });

    it('should correctly determine payment types from method strings', () => {
      // Test various payment method string formats
      expect(enrollmentStateManager.determinePaymentType('credit_card')).toBe(PaymentType.CARD);
      expect(enrollmentStateManager.determinePaymentType('DEBIT_CARD')).toBe(PaymentType.CARD);
      expect(enrollmentStateManager.determinePaymentType('card')).toBe(PaymentType.CARD);
      
      expect(enrollmentStateManager.determinePaymentType('eft')).toBe(PaymentType.EFT);
      expect(enrollmentStateManager.determinePaymentType('BANK_TRANSFER')).toBe(PaymentType.EFT);
      expect(enrollmentStateManager.determinePaymentType('bank')).toBe(PaymentType.EFT);
      
      expect(enrollmentStateManager.determinePaymentType('cash')).toBe(PaymentType.MANUAL);
      expect(enrollmentStateManager.determinePaymentType('unknown')).toBe(PaymentType.MANUAL);
    });
  });

  describe('Enrollment State Logic', () => {
    it('should return correct state for not logged in users', async () => {
      // Requirement 6.1: Not logged in users should see "Register To Enroll"
      const { ButtonAction } = await import('@/services/EnrollmentStateManager');
      
      const state = await enrollmentStateManager.getEnrollmentState('course-123', undefined, false);
      
      expect(state.buttonText).toBe("Register To Enroll");
      expect(state.buttonAction).toBe(ButtonAction.REDIRECT_TO_AUTH);
      expect(state.canEnroll).toBe(false);
      expect(state.hasAccess).toBe(false);
      expect(state.isDisabled).toBe(false);
    });

    it('should return correct state for logged in users without enrollment', async () => {
      // Requirement 6.2: Logged in users without enrollment should see "Enroll Now"
      const { ButtonAction } = await import('@/services/EnrollmentStateManager');
      
      const state = await enrollmentStateManager.getEnrollmentState('course-123', 'user-456', true);
      
      expect(state.buttonText).toBe("Enroll Now");
      expect(state.buttonAction).toBe(ButtonAction.INITIATE_ENROLLMENT);
      expect(state.canEnroll).toBe(true);
      expect(state.hasAccess).toBe(false);
      expect(state.isDisabled).toBe(false);
    });
  });

  describe('Course Access Control', () => {
    it('should deny access when no enrollment exists', async () => {
      // Requirement 6.4: Users without enrollment should not have course access
      const hasAccess = await enrollmentStateManager.canAccessCourse('course-123', 'user-456');
      expect(hasAccess).toBe(false);
    });
  });

  describe('Enrollment Creation Flow', () => {
    it('should create enrollment with correct default values', async () => {
      const enrollment = await enrollmentStateManager.createPendingEnrollment(
        'course-123',
        'user-456',
        'user@example.com',
        'Test Course',
        PaymentType.CARD
      );

      expect(enrollment).toBeDefined();
      expect(enrollment.course_id).toBe('course-123');
      expect(enrollment.user_id).toBe('user-456');
      expect(enrollment.user_email).toBe('user@example.com');
      expect(enrollment.course_title).toBe('Test Course');
      expect(enrollment.status).toBe(EnrollmentStatus.PENDING);
      expect(enrollment.payment_type).toBe(PaymentType.CARD);
      expect(enrollment.payment_status).toBe(PaymentStatus.PENDING);
      expect(enrollment.requires_approval).toBe(false); // Card payments don't require approval
      expect(enrollment.course_access_granted).toBe(false);
    });

    it('should create EFT enrollment requiring approval', async () => {
      const enrollment = await enrollmentStateManager.createPendingEnrollment(
        'course-eft-456',
        'user-eft-789',
        'user@example.com',
        'Test EFT Course',
        PaymentType.EFT
      );

      expect(enrollment.payment_type).toBe(PaymentType.EFT);
      expect(enrollment.requires_approval).toBe(true); // EFT payments require approval
    });
  });

  describe('Status Update Subscriptions', () => {
    it('should allow subscribing to status updates', () => {
      const callback = vi.fn();
      const unsubscribe = enrollmentStateManager.subscribeToStatusUpdates(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
      // Callback should be removed (implementation detail)
    });
  });

  describe('Error Handling', () => {
    it('should handle enrollment state errors gracefully', async () => {
      // Test with invalid parameters
      const state = await enrollmentStateManager.getEnrollmentState('', '', false);
      
      // Should return safe default state
      expect(state).toBeDefined();
      expect(state.buttonText).toBe("Register To Enroll");
    });
  });

  describe('Audit Trail', () => {
    it('should retrieve enrollment history', async () => {
      const history = await enrollmentStateManager.getEnrollmentHistory('enrollment-123');
      
      // Should return empty array when no history exists
      expect(Array.isArray(history)).toBe(true);
      expect(history.length).toBe(0);
    });
  });
});

describe('Integration with React Hooks', () => {
  it('should export all required hook functions', async () => {
    const {
      useEnrollmentState,
      useCourseCardState,
      useAdminEnrollmentState,
      useCourseAccess
    } = await import('@/hooks/useEnrollmentState');

    expect(useEnrollmentState).toBeDefined();
    expect(useCourseCardState).toBeDefined();
    expect(useAdminEnrollmentState).toBeDefined();
    expect(useCourseAccess).toBeDefined();
  });
});

describe('Example Component Integration', () => {
  it('should export example components', async () => {
    const {
      EnrollmentStateExample,
      CourseListingExample,
      AdminEnrollmentExample
    } = await import('@/examples/EnrollmentStateExample');

    expect(EnrollmentStateExample).toBeDefined();
    expect(CourseListingExample).toBeDefined();
    expect(AdminEnrollmentExample).toBeDefined();
  });
});

describe('Requirements Validation', () => {
  let enrollmentStateManager: any;

  beforeEach(async () => {
    const { EnrollmentStateManager } = await import('@/services/EnrollmentStateManager');
    enrollmentStateManager = EnrollmentStateManager.getInstance();
  });

  describe('Requirement 6.1: Login Status Based Button States', () => {
    it('should show Register To Enroll for non-logged users', async () => {
      const { ButtonAction } = await import('@/services/EnrollmentStateManager');
      const state = await enrollmentStateManager.getEnrollmentState('course-123', undefined, false);
      
      expect(state.buttonText).toBe("Register To Enroll");
      expect(state.buttonAction).toBe(ButtonAction.REDIRECT_TO_AUTH);
    });

    it('should show Enroll Now for logged users without enrollment', async () => {
      const { ButtonAction } = await import('@/services/EnrollmentStateManager');
      const state = await enrollmentStateManager.getEnrollmentState('course-unique-789', 'user-unique-456', true);
      
      expect(state.buttonText).toBe("Enroll Now");
      expect(state.buttonAction).toBe(ButtonAction.INITIATE_ENROLLMENT);
    });
  });

  describe('Requirement 6.2: State Transition Validation', () => {
    it('should enforce business rules for enrollment creation', async () => {
      // Card payments should not require approval
      const cardEnrollment = await enrollmentStateManager.createPendingEnrollment(
        'course-123', 'user-456', 'user@example.com', 'Test Course', PaymentType.CARD
      );
      expect(cardEnrollment.requires_approval).toBe(false);

      // EFT payments should require approval
      const eftEnrollment = await enrollmentStateManager.createPendingEnrollment(
        'course-456', 'user-456', 'user@example.com', 'Test Course 2', PaymentType.EFT
      );
      expect(eftEnrollment.requires_approval).toBe(true);
    });
  });

  describe('Requirement 6.3: Enrollment Status Persistence', () => {
    it('should persist enrollment data correctly', async () => {
      const enrollment = await enrollmentStateManager.createPendingEnrollment(
        'course-123', 'user-456', 'user@example.com', 'Test Course', PaymentType.CARD
      );

      // Verify all required fields are present
      expect(enrollment.id).toBeDefined();
      expect(enrollment.created_at).toBeDefined();
      expect(enrollment.updated_at).toBeDefined();
      expect(enrollment.status).toBe(EnrollmentStatus.PENDING);
    });
  });

  describe('Requirement 6.4: Course Access Control', () => {
    it('should properly control course access based on enrollment status', async () => {
      // No enrollment = no access
      const noAccess = await enrollmentStateManager.canAccessCourse('course-123', 'user-456');
      expect(noAccess).toBe(false);
    });
  });
});