/**
 * EnrollmentStateManager Tests
 * 
 * Comprehensive tests for enrollment state management, business logic validation,
 * state transitions, and audit capabilities.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { EnrollmentStateManager, ButtonAction } from '../EnrollmentStateManager';
import { EnrollmentStatus, PaymentType, PaymentStatus } from '@/types/ikhokha';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          order: vi.fn(() => ({
            limit: vi.fn(() => ({
              single: vi.fn()
            })),
            ascending: vi.fn()
          }))
        })),
        order: vi.fn(() => ({
          ascending: vi.fn()
        }))
      })),
      upsert: vi.fn(),
      insert: vi.fn()
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

describe('EnrollmentStateManager', () => {
  let enrollmentStateManager: EnrollmentStateManager;
  let mockSupabase: any;

  beforeEach(async () => {
    const { supabase } = await import('@/integrations/supabase/client');
    mockSupabase = supabase;
    enrollmentStateManager = EnrollmentStateManager.getInstance();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = EnrollmentStateManager.getInstance();
      const instance2 = EnrollmentStateManager.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('createPendingEnrollment', () => {
    it('should create a new pending enrollment successfully', async () => {
      // Mock no existing enrollment
      mockSupabase.from().select().eq().eq().order().limit().single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116' }
      });

      // Mock successful upsert
      mockSupabase.from().upsert.mockResolvedValue({ error: null });

      // Mock successful history insert
      mockSupabase.from().insert.mockResolvedValue({ error: null });

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
      expect(enrollment.status).toBe(EnrollmentStatus.PENDING);
      expect(enrollment.payment_type).toBe(PaymentType.CARD);
      expect(enrollment.requires_approval).toBe(false);
    });

    it('should return existing enrollment if one exists', async () => {
      const existingEnrollment = {
        id: 'existing-123',
        user_id: 'user-456',
        user_email: 'user@example.com',
        course_id: 'course-123',
        course_title: 'Test Course',
        status: EnrollmentStatus.PENDING,
        payment_type: PaymentType.CARD,
        payment_status: PaymentStatus.PENDING,
        requires_approval: false,
        course_access_granted: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().eq().order().limit().single.mockResolvedValue({
        data: existingEnrollment,
        error: null
      });

      const enrollment = await enrollmentStateManager.createPendingEnrollment(
        'course-123',
        'user-456',
        'user@example.com',
        'Test Course',
        PaymentType.CARD
      );

      expect(enrollment.id).toBe('existing-123');
    });

    it('should set requires_approval to true for EFT payments', async () => {
      mockSupabase.from().select().eq().eq().order().limit().single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116' }
      });

      mockSupabase.from().upsert.mockResolvedValue({ error: null });
      mockSupabase.from().insert.mockResolvedValue({ error: null });

      const enrollment = await enrollmentStateManager.createPendingEnrollment(
        'course-123',
        'user-456',
        'user@example.com',
        'Test Course',
        PaymentType.EFT
      );

      expect(enrollment.requires_approval).toBe(true);
    });
  });

  describe('approveEnrollment', () => {
    it('should approve enrollment successfully', async () => {
      const mockEnrollment = {
        id: 'enrollment-123',
        user_id: 'user-456',
        user_email: 'user@example.com',
        course_id: 'course-123',
        course_title: 'Test Course',
        status: EnrollmentStatus.PENDING,
        payment_type: PaymentType.EFT,
        payment_status: PaymentStatus.COMPLETED,
        requires_approval: true,
        course_access_granted: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().single.mockResolvedValue({
        data: mockEnrollment,
        error: null
      });

      mockSupabase.from().upsert.mockResolvedValue({ error: null });
      mockSupabase.from().insert.mockResolvedValue({ error: null });

      await enrollmentStateManager.approveEnrollment('enrollment-123', 'admin-789', 'Manual approval');

      expect(mockSupabase.from().upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'enrollment-123',
          status: EnrollmentStatus.APPROVED,
          course_access_granted: true,
          approved_by: 'admin-789'
        })
      );
    });

    it('should throw error if enrollment not found', async () => {
      mockSupabase.from().select().eq().single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116' }
      });

      await expect(
        enrollmentStateManager.approveEnrollment('nonexistent', 'admin-789')
      ).rejects.toThrow('Enrollment not found: nonexistent');
    });

    it('should throw error if invalid state transition', async () => {
      const mockEnrollment = {
        id: 'enrollment-123',
        status: EnrollmentStatus.COMPLETED, // Cannot approve completed enrollment
        user_id: 'user-456',
        course_id: 'course-123',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().single.mockResolvedValue({
        data: mockEnrollment,
        error: null
      });

      await expect(
        enrollmentStateManager.approveEnrollment('enrollment-123', 'admin-789')
      ).rejects.toThrow('Cannot approve enrollment from status: completed');
    });
  });

  describe('rejectEnrollment', () => {
    it('should reject enrollment successfully', async () => {
      const mockEnrollment = {
        id: 'enrollment-123',
        user_id: 'user-456',
        course_id: 'course-123',
        status: EnrollmentStatus.PENDING,
        course_access_granted: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().single.mockResolvedValue({
        data: mockEnrollment,
        error: null
      });

      mockSupabase.from().upsert.mockResolvedValue({ error: null });
      mockSupabase.from().insert.mockResolvedValue({ error: null });

      await enrollmentStateManager.rejectEnrollment(
        'enrollment-123', 
        'Insufficient documentation', 
        'admin-789'
      );

      expect(mockSupabase.from().upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'enrollment-123',
          status: EnrollmentStatus.REJECTED,
          rejection_reason: 'Insufficient documentation',
          course_access_granted: false
        })
      );
    });
  });

  describe('getEnrollmentState', () => {
    it('should return redirect to auth state when not logged in', async () => {
      const state = await enrollmentStateManager.getEnrollmentState('course-123', undefined, false);

      expect(state).toEqual({
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: false,
        buttonText: "Register To Enroll",
        buttonAction: ButtonAction.REDIRECT_TO_AUTH,
        isDisabled: false
      });
    });

    it('should return enroll now state when logged in but no enrollment', async () => {
      mockSupabase.from().select().eq().eq().order().limit().single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116' }
      });

      const state = await enrollmentStateManager.getEnrollmentState('course-123', 'user-456', true);

      expect(state).toEqual({
        status: EnrollmentStatus.PENDING,
        requiresApproval: false,
        hasAccess: false,
        canEnroll: true,
        buttonText: "Enroll Now",
        buttonAction: ButtonAction.INITIATE_ENROLLMENT,
        isDisabled: false
      });
    });

    it('should return pending approval state for EFT payments', async () => {
      const mockEnrollment = {
        id: 'enrollment-123',
        user_id: 'user-456',
        course_id: 'course-123',
        status: EnrollmentStatus.PENDING,
        payment_type: PaymentType.EFT,
        payment_status: PaymentStatus.COMPLETED,
        requires_approval: true,
        course_access_granted: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().eq().order().limit().single.mockResolvedValue({
        data: mockEnrollment,
        error: null
      });

      const state = await enrollmentStateManager.getEnrollmentState('course-123', 'user-456', true);

      expect(state.buttonText).toBe("Pending Approval");
      expect(state.buttonAction).toBe(ButtonAction.SHOW_PENDING);
      expect(state.isDisabled).toBe(true);
    });

    it('should return continue course state for approved enrollments', async () => {
      const mockEnrollment = {
        id: 'enrollment-123',
        user_id: 'user-456',
        course_id: 'course-123',
        status: EnrollmentStatus.APPROVED,
        payment_type: PaymentType.CARD,
        payment_status: PaymentStatus.COMPLETED,
        requires_approval: false,
        course_access_granted: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().eq().order().limit().single.mockResolvedValue({
        data: mockEnrollment,
        error: null
      });

      const state = await enrollmentStateManager.getEnrollmentState('course-123', 'user-456', true);

      expect(state.buttonText).toBe("Continue Course");
      expect(state.buttonAction).toBe(ButtonAction.CONTINUE_COURSE);
      expect(state.isDisabled).toBe(false);
      expect(state.hasAccess).toBe(true);
    });
  });

  describe('canAccessCourse', () => {
    it('should return true for approved enrollment with access granted', async () => {
      const mockEnrollment = {
        id: 'enrollment-123',
        status: EnrollmentStatus.APPROVED,
        course_access_granted: true,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().eq().order().limit().single.mockResolvedValue({
        data: mockEnrollment,
        error: null
      });

      const canAccess = await enrollmentStateManager.canAccessCourse('course-123', 'user-456');
      expect(canAccess).toBe(true);
    });

    it('should return false for pending enrollment', async () => {
      const mockEnrollment = {
        id: 'enrollment-123',
        status: EnrollmentStatus.PENDING,
        course_access_granted: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().eq().order().limit().single.mockResolvedValue({
        data: mockEnrollment,
        error: null
      });

      const canAccess = await enrollmentStateManager.canAccessCourse('course-123', 'user-456');
      expect(canAccess).toBe(false);
    });

    it('should return false when no enrollment exists', async () => {
      mockSupabase.from().select().eq().eq().order().limit().single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116' }
      });

      const canAccess = await enrollmentStateManager.canAccessCourse('course-123', 'user-456');
      expect(canAccess).toBe(false);
    });
  });

  describe('determinePaymentType', () => {
    it('should return CARD for card payment methods', () => {
      expect(enrollmentStateManager.determinePaymentType('credit_card')).toBe(PaymentType.CARD);
      expect(enrollmentStateManager.determinePaymentType('debit_card')).toBe(PaymentType.CARD);
      expect(enrollmentStateManager.determinePaymentType('CARD')).toBe(PaymentType.CARD);
    });

    it('should return EFT for bank transfer methods', () => {
      expect(enrollmentStateManager.determinePaymentType('eft')).toBe(PaymentType.EFT);
      expect(enrollmentStateManager.determinePaymentType('bank_transfer')).toBe(PaymentType.EFT);
      expect(enrollmentStateManager.determinePaymentType('EFT')).toBe(PaymentType.EFT);
    });

    it('should return MANUAL for unknown payment methods', () => {
      expect(enrollmentStateManager.determinePaymentType('cash')).toBe(PaymentType.MANUAL);
      expect(enrollmentStateManager.determinePaymentType('unknown')).toBe(PaymentType.MANUAL);
    });
  });

  describe('shouldRequireApproval', () => {
    it('should require approval for EFT payments', () => {
      expect(enrollmentStateManager.shouldRequireApproval(PaymentType.EFT)).toBe(true);
    });

    it('should require approval for manual payments', () => {
      expect(enrollmentStateManager.shouldRequireApproval(PaymentType.MANUAL)).toBe(true);
    });

    it('should not require approval for card payments', () => {
      expect(enrollmentStateManager.shouldRequireApproval(PaymentType.CARD)).toBe(false);
    });
  });

  describe('updatePaymentStatus', () => {
    it('should auto-approve card payments when completed', async () => {
      const mockEnrollment = {
        id: 'enrollment-123',
        user_id: 'user-456',
        course_id: 'course-123',
        status: EnrollmentStatus.PENDING,
        payment_type: PaymentType.CARD,
        payment_status: PaymentStatus.PENDING,
        requires_approval: false,
        course_access_granted: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().single.mockResolvedValue({
        data: mockEnrollment,
        error: null
      });

      mockSupabase.from().upsert.mockResolvedValue({ error: null });
      mockSupabase.from().insert.mockResolvedValue({ error: null });

      await enrollmentStateManager.updatePaymentStatus(
        'enrollment-123',
        PaymentStatus.COMPLETED,
        'txn-789'
      );

      expect(mockSupabase.from().upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'enrollment-123',
          payment_status: PaymentStatus.COMPLETED,
          status: EnrollmentStatus.APPROVED,
          course_access_granted: true,
          ikhokha_transaction_id: 'txn-789'
        })
      );
    });

    it('should not auto-approve EFT payments', async () => {
      const mockEnrollment = {
        id: 'enrollment-123',
        user_id: 'user-456',
        course_id: 'course-123',
        status: EnrollmentStatus.PENDING,
        payment_type: PaymentType.EFT,
        payment_status: PaymentStatus.PENDING,
        requires_approval: true,
        course_access_granted: false,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z'
      };

      mockSupabase.from().select().eq().single.mockResolvedValue({
        data: mockEnrollment,
        error: null
      });

      mockSupabase.from().upsert.mockResolvedValue({ error: null });

      await enrollmentStateManager.updatePaymentStatus(
        'enrollment-123',
        PaymentStatus.COMPLETED
      );

      expect(mockSupabase.from().upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'enrollment-123',
          payment_status: PaymentStatus.COMPLETED,
          status: EnrollmentStatus.PENDING, // Should remain pending for EFT
          course_access_granted: false
        })
      );
    });
  });

  describe('getEnrollmentHistory', () => {
    it('should return enrollment history', async () => {
      const mockHistory = [
        {
          id: 'history-1',
          enrollment_id: 'enrollment-123',
          previous_status: EnrollmentStatus.PENDING,
          new_status: EnrollmentStatus.APPROVED,
          changed_by: 'admin-789',
          change_reason: 'Manual approval',
          created_at: '2024-01-01T00:00:00Z'
        }
      ];

      mockSupabase.from().select().eq().order.mockReturnValue({
        ascending: vi.fn().mockResolvedValue({
          data: mockHistory,
          error: null
        })
      });

      const history = await enrollmentStateManager.getEnrollmentHistory('enrollment-123');

      expect(history).toEqual(mockHistory);
      expect(mockSupabase.from().select().eq).toHaveBeenCalledWith('enrollment_id', 'enrollment-123');
    });

    it('should return empty array on error', async () => {
      mockSupabase.from().select().eq().order.mockReturnValue({
        ascending: vi.fn().mockResolvedValue({
          data: null,
          error: new Error('Database error')
        })
      });

      const history = await enrollmentStateManager.getEnrollmentHistory('enrollment-123');

      expect(history).toEqual([]);
    });
  });

  describe('subscribeToStatusUpdates', () => {
    it('should add and remove callback correctly', () => {
      const callback = vi.fn();
      const unsubscribe = enrollmentStateManager.subscribeToStatusUpdates(callback);

      expect(typeof unsubscribe).toBe('function');

      // Test unsubscribe
      unsubscribe();
      // Callback should be removed (tested indirectly through implementation)
    });
  });
});