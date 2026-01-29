/**
 * EnrollmentManager Service Tests
 * 
 * Comprehensive tests for the EnrollmentManager service covering all
 * enrollment workflows, real-time updates, and error handling.
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { EnrollmentManager, enrollmentManager } from '../EnrollmentManager';
import { 
  EnrollmentStatus, 
  PaymentType, 
  PaymentStatus,
  EnrollmentUpdateType
} from '@/types/enrollment';
import { ENROLLMENT_ERROR_CODES } from '@/constants/enrollment';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
    channel: vi.fn()
  }
}));

// Mock utility functions
vi.mock('@/utils/enrollment', () => ({
  createEnrollmentUpdate: vi.fn((type, enrollment) => ({
    type,
    enrollmentId: enrollment.id,
    userId: enrollment.userId,
    courseId: enrollment.courseId,
    status: enrollment.status,
    timestamp: new Date()
  })),
  needsAdminAttention: vi.fn(() => true),
  hasAccessToContent: vi.fn(() => true)
}));

describe('EnrollmentManager', () => {
  let manager: EnrollmentManager;
  let mockChannel: any;
  let mockQuery: any;
  let mockSupabase: any;

  beforeEach(async () => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Get the mocked supabase
    const { supabase } = await import('@/integrations/supabase/client');
    mockSupabase = supabase;
    
    // Setup mock channel
    mockChannel = {
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
      unsubscribe: vi.fn()
    };
    
    // Setup mock query builder
    mockQuery = {
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis()
    };
    
    mockSupabase.from.mockReturnValue(mockQuery);
    mockSupabase.channel.mockReturnValue(mockChannel);
    
    // Get fresh instance
    manager = EnrollmentManager.getInstance();
  });

  afterEach(() => {
    manager.destroy();
  });

  describe('EFT Enrollment Processing', () => {
    it('should create pending EFT enrollment successfully', async () => {
      const userId = 'user123';
      const courseId = 'course456';
      const paymentDetails = {
        amount: 500,
        currency: 'ZAR',
        reference: 'EFT123456'
      };

      // Mock no existing enrollment
      mockQuery.single.mockResolvedValueOnce({
        data: null,
        error: { code: 'PGRST116' } // No rows found
      });

      // Mock successful insertion
      mockQuery.single.mockResolvedValueOnce({
        data: {
          id: 'enrollment123',
          user_id: userId,
          course_id: courseId,
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          payment_status: PaymentStatus.PENDING,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          payment_reference: paymentDetails.reference,
          payment_amount: paymentDetails.amount,
          payment_currency: paymentDetails.currency
        },
        error: null
      });

      const result = await manager.processEFTEnrollment(userId, courseId, paymentDetails);

      expect(result.success).toBe(true);
      expect(result.enrollment).toBeDefined();
      expect(result.enrollment?.paymentType).toBe(PaymentType.EFT);
      expect(result.enrollment?.status).toBe(EnrollmentStatus.PENDING);
      expect(result.enrollment?.paymentStatus).toBe(PaymentStatus.PENDING);
    });

    it('should reject EFT enrollment if user already enrolled', async () => {
      const userId = 'user123';
      const courseId = 'course456';

      // Mock existing enrollment
      mockQuery.single.mockResolvedValueOnce({
        data: {
          id: 'existing123',
          user_id: userId,
          course_id: courseId,
          status: EnrollmentStatus.APPROVED
        },
        error: null
      });

      const result = await manager.processEFTEnrollment(userId, courseId);

      expect(result.success).toBe(false);
      expect(result.errorCode).toBe(ENROLLMENT_ERROR_CODES.DUPLICATE_ENROLLMENT);
    });

    it('should handle database errors during EFT enrollment', async () => {
      const userId = 'user123';
      const courseId = 'course456';

      // Mock no existing enrollment
      mockQuery.single.mockResolvedValueOnce({
        data: null,
        error: { code: 'PGRST116' }
      });

      // Mock database error during insertion
      mockQuery.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'Database connection failed' }
      });

      const result = await manager.processEFTEnrollment(userId, courseId);

      expect(result.success).toBe(false);
      expect(result.errorCode).toBe(ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED);
    });
  });

  describe('Card Enrollment Processing', () => {
    it('should create approved card enrollment on successful payment', async () => {
      const userId = 'user123';
      const courseId = 'course456';
      const paymentDetails = {
        amount: 500,
        currency: 'ZAR'
      };

      // Mock no existing enrollment
      mockQuery.single.mockResolvedValueOnce({
        data: null,
        error: { code: 'PGRST116' }
      });

      // Mock successful insertion
      mockQuery.single.mockResolvedValueOnce({
        data: {
          id: 'enrollment123',
          user_id: userId,
          course_id: courseId,
          payment_type: PaymentType.CARD,
          status: EnrollmentStatus.APPROVED,
          payment_status: PaymentStatus.COMPLETED,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          approved_at: new Date().toISOString(),
          payment_id: 'payment123',
          payment_amount: paymentDetails.amount,
          payment_currency: paymentDetails.currency
        },
        error: null
      });

      // Mock successful card payment (we'll need to spy on the private method)
      const processCardPaymentSpy = vi.spyOn(manager as any, 'processCardPayment');
      processCardPaymentSpy.mockResolvedValue({
        success: true,
        paymentId: 'payment123'
      });

      const result = await manager.processCardEnrollment(userId, courseId, paymentDetails);

      expect(result.success).toBe(true);
      expect(result.enrollment).toBeDefined();
      expect(result.enrollment?.paymentType).toBe(PaymentType.CARD);
      expect(result.enrollment?.status).toBe(EnrollmentStatus.APPROVED);
      expect(result.enrollment?.paymentStatus).toBe(PaymentStatus.COMPLETED);

      processCardPaymentSpy.mockRestore();
    });

    it('should handle failed card payment', async () => {
      const userId = 'user123';
      const courseId = 'course456';
      const paymentDetails = {
        amount: 500,
        currency: 'ZAR'
      };

      // Mock no existing enrollment
      mockQuery.single.mockResolvedValueOnce({
        data: null,
        error: { code: 'PGRST116' }
      });

      // Mock failed card payment
      const processCardPaymentSpy = vi.spyOn(manager as any, 'processCardPayment');
      processCardPaymentSpy.mockResolvedValue({
        success: false,
        error: 'Card declined',
        errorCode: 'CARD_DECLINED'
      });

      const result = await manager.processCardEnrollment(userId, courseId, paymentDetails);

      expect(result.success).toBe(false);
      expect(result.errorCode).toBe(ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED);

      processCardPaymentSpy.mockRestore();
    });
  });

  describe('Admin Operations', () => {
    it('should approve enrollment successfully', async () => {
      const enrollmentId = 'enrollment123';
      const adminId = 'admin456';

      mockQuery.single.mockResolvedValue({
        data: {
          id: enrollmentId,
          status: EnrollmentStatus.APPROVED,
          payment_status: PaymentStatus.COMPLETED,
          approved_by: adminId,
          approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        error: null
      });

      await expect(manager.approveEnrollment(enrollmentId, adminId)).resolves.not.toThrow();
    });

    it('should reject enrollment successfully', async () => {
      const enrollmentId = 'enrollment123';
      const adminId = 'admin456';
      const reason = 'Invalid payment proof';

      mockQuery.single.mockResolvedValue({
        data: {
          id: enrollmentId,
          status: EnrollmentStatus.REJECTED,
          approved_by: adminId,
          rejection_reason: reason,
          updated_at: new Date().toISOString()
        },
        error: null
      });

      await expect(manager.rejectEnrollment(enrollmentId, adminId, reason)).resolves.not.toThrow();
    });

    it('should handle enrollment not found during approval', async () => {
      const enrollmentId = 'nonexistent';
      const adminId = 'admin456';

      mockQuery.single.mockResolvedValue({
        data: null,
        error: { message: 'Enrollment not found' }
      });

      await expect(manager.approveEnrollment(enrollmentId, adminId)).rejects.toThrow();
    });
  });

  describe('Enrollment Status Queries', () => {
    it('should get enrollment status successfully', async () => {
      const userId = 'user123';
      const courseId = 'course456';

      mockQuery.single.mockResolvedValue({
        data: {
          id: 'enrollment123',
          user_id: userId,
          course_id: courseId,
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          payment_status: PaymentStatus.PENDING,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        error: null
      });

      const enrollment = await manager.getEnrollmentStatus(userId, courseId);

      expect(enrollment).toBeDefined();
      expect(enrollment?.userId).toBe(userId);
      expect(enrollment?.courseId).toBe(courseId);
      expect(enrollment?.status).toBe(EnrollmentStatus.PENDING);
    });

    it('should return null when no enrollment found', async () => {
      const userId = 'user123';
      const courseId = 'course456';

      mockQuery.single.mockResolvedValue({
        data: null,
        error: { code: 'PGRST116' } // No rows found
      });

      const enrollment = await manager.getEnrollmentStatus(userId, courseId);

      expect(enrollment).toBeNull();
    });

    it('should get pending EFT enrollments for admin', async () => {
      const mockEnrollments = [
        {
          id: 'enrollment1',
          user_id: 'user1',
          course_id: 'course1',
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          created_at: new Date().toISOString()
        },
        {
          id: 'enrollment2',
          user_id: 'user2',
          course_id: 'course2',
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          created_at: new Date().toISOString()
        }
      ];

      mockQuery.order.mockResolvedValue({
        data: mockEnrollments,
        error: null
      });

      const enrollments = await manager.getPendingEFTEnrollments();

      expect(enrollments).toHaveLength(2);
      expect(enrollments[0].paymentType).toBe(PaymentType.EFT);
      expect(enrollments[0].status).toBe(EnrollmentStatus.PENDING);
    });

    it('should get user enrollments', async () => {
      const userId = 'user123';
      const mockEnrollments = [
        {
          id: 'enrollment1',
          user_id: userId,
          course_id: 'course1',
          status: EnrollmentStatus.APPROVED,
          created_at: new Date().toISOString()
        }
      ];

      mockQuery.order.mockResolvedValue({
        data: mockEnrollments,
        error: null
      });

      const enrollments = await manager.getUserEnrollments(userId);

      expect(enrollments).toHaveLength(1);
      expect(enrollments[0].userId).toBe(userId);
    });
  });

  describe('Subscription System', () => {
    it('should subscribe to enrollment updates', () => {
      const callback = vi.fn();
      
      const unsubscribe = manager.subscribeToEnrollmentUpdates(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
    });

    it('should subscribe to admin updates', () => {
      const callback = vi.fn();
      
      const unsubscribe = manager.subscribeToAdminUpdates(callback);
      
      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
    });

    it('should handle real-time updates correctly', () => {
      const updateCallback = vi.fn();
      const adminCallback = vi.fn();
      
      manager.subscribeToEnrollmentUpdates(updateCallback);
      manager.subscribeToAdminUpdates(adminCallback);

      // Simulate real-time update
      const mockPayload = {
        eventType: 'INSERT',
        new: {
          id: 'enrollment123',
          user_id: 'user123',
          course_id: 'course456',
          payment_type: PaymentType.EFT,
          status: EnrollmentStatus.PENDING,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };

      // Access private method for testing
      (manager as any).handleRealtimeUpdate(mockPayload);

      expect(updateCallback).toHaveBeenCalled();
      expect(adminCallback).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      const userId = 'user123';
      const courseId = 'course456';

      // Mock network error
      mockQuery.single.mockRejectedValue(new Error('Network connection failed'));

      const result = await manager.processEFTEnrollment(userId, courseId);

      expect(result.success).toBe(false);
      expect(result.errorCode).toBe(ENROLLMENT_ERROR_CODES.NETWORK_ERROR);
    });

    it('should handle subscription callback errors gracefully', () => {
      const faultyCallback = vi.fn().mockImplementation(() => {
        throw new Error('Callback error');
      });
      
      manager.subscribeToEnrollmentUpdates(faultyCallback);

      // This should not throw even if callback throws
      expect(() => {
        const mockPayload = {
          eventType: 'INSERT',
          new: {
            id: 'enrollment123',
            user_id: 'user123',
            course_id: 'course456',
            status: EnrollmentStatus.PENDING,
            created_at: new Date().toISOString()
          }
        };
        (manager as any).handleRealtimeUpdate(mockPayload);
      }).not.toThrow();
    });
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = EnrollmentManager.getInstance();
      const instance2 = EnrollmentManager.getInstance();
      
      expect(instance1).toBe(instance2);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup resources properly', () => {
      // Ensure the channel is set up by accessing the private property
      (manager as any).realtimeChannel = mockChannel;
      
      manager.destroy();
      
      expect(mockChannel.unsubscribe).toHaveBeenCalled();
    });
  });
});