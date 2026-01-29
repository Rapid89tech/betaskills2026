/**
 * Card Payment Fast-Track Service Tests
 * 
 * Comprehensive test suite for the CardPaymentFastTrack service
 * covering all requirements and edge cases.
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { CardPaymentFastTrack, cardPaymentFastTrack } from '../CardPaymentFastTrack';
import {
  IkhokhaWebhook,
  EnrollmentStatus,
  PaymentStatus,
  PaymentType
} from '../../types/ikhokha';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          limit: vi.fn()
        })),
        limit: vi.fn()
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn()
          }))
        }))
      })),
      insert: vi.fn()
    }))
  }
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn()
  }
}));

vi.mock('@/utils/enrollmentPersistence', () => ({
  saveEnrollment: vi.fn(),
  refreshEnrollmentStatus: vi.fn()
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock window.dispatchEvent
Object.defineProperty(window, 'dispatchEvent', {
  value: vi.fn()
});

describe('CardPaymentFastTrack', () => {
  let service: CardPaymentFastTrack;
  let mockWebhookData: IkhokhaWebhook;
  let mockEnrollmentData: any;

  beforeEach(async () => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Get service instance
    service = CardPaymentFastTrack.getInstance();
    
    // Mock successful database connection for initialization
    const mockSupabaseFrom = supabase.from as Mock;
    mockSupabaseFrom.mockReturnValue({
      select: vi.fn().mockReturnValue({
        limit: vi.fn().mockResolvedValue({ error: null })
      })
    });
    
    // Initialize service
    await service.initialize();

    // Setup test data
    mockWebhookData = {
      transaction_id: 'txn_123456789',
      reference: 'ref_test_payment',
      amount: 299.99,
      currency: 'ZAR',
      status: 'completed',
      timestamp: new Date().toISOString(),
      signature: 'test_signature',
      response_code: '00',
      response_message: 'Transaction successful',
      auth_code: 'AUTH123',
      card_type: 'visa',
      masked_card_number: '****1234'
    };

    mockEnrollmentData = {
      id: 'enrollment_123',
      user_id: 'user_456',
      user_email: 'test@example.com',
      course_id: 'course_789',
      course_title: 'Test Course',
      status: EnrollmentStatus.PENDING,
      payment_type: PaymentType.CARD,
      payment_status: PaymentStatus.PENDING,
      payment_reference: 'ref_test_payment',
      created_at: new Date(),
      updated_at: new Date(),
      course_access_granted: false
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    service.cleanup();
  });

  describe('Initialization', () => {
    it('should initialize successfully with valid database connection', async () => {
      const newService = CardPaymentFastTrack.getInstance();
      
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockReturnValue({
        select: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({ error: null })
        })
      });

      await expect(newService.initialize()).resolves.not.toThrow();
      expect(logger.info).toHaveBeenCalledWith('✅ CardPaymentFastTrack: Initialized successfully');
    });

    it('should throw error when database connection fails', async () => {
      // Create a fresh service instance for this test
      const freshService = new (CardPaymentFastTrack as any)();
      
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockReturnValue({
        select: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValue({ 
            error: { message: 'Connection failed' } 
          })
        })
      });

      await expect(freshService.initialize()).rejects.toThrow('Database connection failed: Connection failed');
    });
  });

  describe('processCardPayment', () => {
    beforeEach(() => {
      // Mock successful database operations
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockImplementation((table: string) => {
        if (table === 'enrollments') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: mockEnrollmentData,
                  error: null
                })
              })
            }),
            update: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({
                    data: { ...mockEnrollmentData, status: EnrollmentStatus.APPROVED },
                    error: null
                  })
                })
              })
            })
          };
        }
        if (table === 'fast_track_approvals') {
          return {
            insert: vi.fn().mockResolvedValue({ error: null })
          };
        }
        return {};
      });
    });

    it('should successfully process card payment and approve enrollment', async () => {
      const result = await service.processCardPayment(mockWebhookData, mockEnrollmentData);

      expect(result.success).toBe(true);
      expect(result.enrollmentApproved).toBe(true);
      expect(result.accessGranted).toBe(true);
      expect(result.processingTimeMs).toBeGreaterThan(0);
      expect(result.auditTrail).toHaveLength(5); // All processing steps
      expect(result.error).toBeUndefined();

      // Verify logging
      expect(logger.info).toHaveBeenCalledWith(
        '🚀 CardPaymentFastTrack: Processing card payment',
        expect.objectContaining({
          enrollmentId: mockEnrollmentData.id,
          transactionId: mockWebhookData.transaction_id
        })
      );
    });

    it('should handle failed payment validation', async () => {
      // Create webhook with failed status
      const failedWebhook = { ...mockWebhookData, status: 'failed' as const };

      const result = await service.processCardPayment(failedWebhook, mockEnrollmentData);

      expect(result.success).toBe(false);
      expect(result.enrollmentApproved).toBe(false);
      expect(result.accessGranted).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.code).toBe('PAYMENT_VALIDATION_FAILED');
    });

    it('should handle database errors gracefully', async () => {
      // Mock database error
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockImplementation((table: string) => {
        if (table === 'enrollments') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: null,
                  error: { message: 'Database error' }
                })
              })
            })
          };
        }
        return {};
      });

      const result = await service.processCardPayment(mockWebhookData, mockEnrollmentData);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(logger.error).toHaveBeenCalled();
    });

    it('should include comprehensive audit trail', async () => {
      const result = await service.processCardPayment(mockWebhookData, mockEnrollmentData);

      expect(result.auditTrail).toHaveLength(5);
      
      const auditActions = result.auditTrail.map(entry => entry.action);
      expect(auditActions).toContain('fast_track_started');
      expect(auditActions).toContain('payment_validation');
      expect(auditActions).toContain('enrollment_approval');
      expect(auditActions).toContain('access_granted');
      expect(auditActions).toContain('realtime_update');

      // Check audit entry structure
      result.auditTrail.forEach(entry => {
        expect(entry).toHaveProperty('timestamp');
        expect(entry).toHaveProperty('action');
        expect(entry).toHaveProperty('result');
        expect(entry).toHaveProperty('details');
        expect(entry.timestamp).toBeInstanceOf(Date);
        expect(['success', 'failure', 'warning']).toContain(entry.result);
      });
    });
  });

  describe('approveEnrollmentImmediately', () => {
    beforeEach(() => {
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockEnrollmentData,
              error: null
            })
          })
        }),
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({
                data: { ...mockEnrollmentData, status: EnrollmentStatus.APPROVED },
                error: null
              })
            })
          })
        })
      });
    });

    it('should approve enrollment immediately', async () => {
      const paymentData = {
        sessionId: mockWebhookData.transaction_id,
        amount: mockWebhookData.amount,
        currency: mockWebhookData.currency,
        reference: mockWebhookData.reference,
        customer: { email: 'test@example.com', name: 'Test User' },
        metadata: { transactionId: mockWebhookData.transaction_id }
      };

      const result = await service.approveEnrollmentImmediately(
        mockEnrollmentData.id,
        paymentData
      );

      expect(result.approved).toBe(true);
      expect(result.approvedBy).toBe('system_card_payment');
      expect(result.enrollmentId).toBe(mockEnrollmentData.id);
      expect(result.previousStatus).toBe(EnrollmentStatus.PENDING);
      expect(result.newStatus).toBe(EnrollmentStatus.APPROVED);
      expect(result.approvalTimestamp).toBeInstanceOf(Date);
    });

    it('should handle enrollment not found', async () => {
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: null,
              error: null
            })
          })
        })
      });

      const paymentData = {
        sessionId: mockWebhookData.transaction_id,
        amount: mockWebhookData.amount,
        currency: mockWebhookData.currency,
        reference: mockWebhookData.reference,
        customer: { email: 'test@example.com', name: 'Test User' }
      };

      const result = await service.approveEnrollmentImmediately(
        'nonexistent_id',
        paymentData
      );

      expect(result.approved).toBe(false);
      expect(logger.error).toHaveBeenCalled();
    });

    it('should update localStorage for immediate UI feedback', async () => {
      const paymentData = {
        sessionId: mockWebhookData.transaction_id,
        amount: mockWebhookData.amount,
        currency: mockWebhookData.currency,
        reference: mockWebhookData.reference,
        customer: { email: 'test@example.com', name: 'Test User' },
        metadata: { transactionId: mockWebhookData.transaction_id }
      };

      await service.approveEnrollmentImmediately(mockEnrollmentData.id, paymentData);

      // Verify localStorage calls
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expect.stringContaining('enrollment-success-'),
        expect.stringContaining('"status":"approved"')
      );
    });
  });

  describe('grantCourseAccessImmediately', () => {
    beforeEach(() => {
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ error: null })
        })
      });
    });

    it('should grant course access immediately', async () => {
      const result = await service.grantCourseAccessImmediately(
        mockEnrollmentData.id,
        mockEnrollmentData.user_id,
        mockEnrollmentData.course_id
      );

      expect(result.accessGranted).toBe(true);
      expect(result.courseId).toBe(mockEnrollmentData.course_id);
      expect(result.userId).toBe(mockEnrollmentData.user_id);
      expect(result.accessLevel).toBe('full');
      expect(result.grantedAt).toBeInstanceOf(Date);
    });

    it('should update localStorage for immediate access', async () => {
      await service.grantCourseAccessImmediately(
        mockEnrollmentData.id,
        mockEnrollmentData.user_id,
        mockEnrollmentData.course_id
      );

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        `course-access-${mockEnrollmentData.user_id}-${mockEnrollmentData.course_id}`,
        expect.stringContaining('"granted":true')
      );
    });

    it('should handle database update errors gracefully', async () => {
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockReturnValue({
        update: vi.fn().mockReturnValue({
          eq: vi.fn().mockResolvedValue({ 
            error: { message: 'Update failed' } 
          })
        })
      });

      const result = await service.grantCourseAccessImmediately(
        mockEnrollmentData.id,
        mockEnrollmentData.user_id,
        mockEnrollmentData.course_id
      );

      // Should still grant local access even if database update fails
      expect(result.accessGranted).toBe(true);
      expect(logger.error).toHaveBeenCalledWith(
        '❌ CardPaymentFastTrack: Failed to update access in database',
        expect.any(Object)
      );
    });
  });

  describe('logFastTrackApproval', () => {
    it('should log audit entry successfully', async () => {
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error: null })
      });

      const paymentData = {
        sessionId: mockWebhookData.transaction_id,
        amount: mockWebhookData.amount,
        currency: mockWebhookData.currency,
        reference: mockWebhookData.reference,
        customer: { email: 'test@example.com', name: 'Test User' },
        metadata: { transactionId: mockWebhookData.transaction_id }
      };

      const result = {
        success: true,
        enrollmentApproved: true,
        accessGranted: true,
        processingTimeMs: 150,
        auditTrail: [
          {
            timestamp: new Date(),
            action: 'test_action',
            result: 'success' as const,
            details: { test: 'data' }
          }
        ]
      };

      await service.logFastTrackApproval(mockEnrollmentData.id, paymentData, result);

      expect(supabase.from).toHaveBeenCalledWith('fast_track_approvals');
      expect(logger.info).toHaveBeenCalledWith(
        '📋 CardPaymentFastTrack: Audit logged successfully',
        expect.any(Object)
      );
    });

    it('should handle logging errors with fallback', async () => {
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockReturnValue({
        insert: vi.fn().mockResolvedValue({ 
          error: { message: 'Insert failed' } 
        })
      });

      const paymentData = {
        sessionId: mockWebhookData.transaction_id,
        amount: mockWebhookData.amount,
        currency: mockWebhookData.currency,
        reference: mockWebhookData.reference,
        customer: { email: 'test@example.com', name: 'Test User' }
      };

      const result = {
        success: true,
        enrollmentApproved: true,
        accessGranted: true,
        processingTimeMs: 150,
        auditTrail: []
      };

      await service.logFastTrackApproval(mockEnrollmentData.id, paymentData, result);

      expect(logger.error).toHaveBeenCalledWith(
        '❌ CardPaymentFastTrack: Failed to log audit entry',
        expect.any(Object)
      );
      
      // Should log fallback entry
      expect(logger.info).toHaveBeenCalledWith(
        '📋 CardPaymentFastTrack: Audit log (fallback)',
        expect.any(Object)
      );
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle already approved enrollment', async () => {
      const approvedEnrollment = {
        ...mockEnrollmentData,
        status: EnrollmentStatus.APPROVED
      };

      // Mock the database operations for already approved enrollment
      const mockSupabaseFrom = supabase.from as Mock;
      mockSupabaseFrom.mockImplementation((table: string) => {
        if (table === 'enrollments') {
          return {
            select: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValue({
                  data: approvedEnrollment,
                  error: null
                })
              })
            }),
            update: vi.fn().mockReturnValue({
              eq: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                  single: vi.fn().mockResolvedValue({
                    data: { ...approvedEnrollment, status: EnrollmentStatus.APPROVED },
                    error: null
                  })
                })
              })
            })
          };
        }
        if (table === 'fast_track_approvals') {
          return {
            insert: vi.fn().mockResolvedValue({ error: null })
          };
        }
        return {};
      });

      const result = await service.processCardPayment(mockWebhookData, approvedEnrollment);

      // Should still process successfully with warnings
      expect(result.success).toBe(true);
      expect(result.auditTrail.some(entry => 
        entry.action === 'payment_validation' && 
        entry.details.warnings?.includes('Enrollment is already approved')
      )).toBe(true);
    });

    it('should handle rejected enrollment', async () => {
      const rejectedEnrollment = {
        ...mockEnrollmentData,
        status: EnrollmentStatus.REJECTED
      };

      const result = await service.processCardPayment(mockWebhookData, rejectedEnrollment);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('PAYMENT_VALIDATION_FAILED');
    });

    it('should handle payment reference mismatch', async () => {
      const mismatchedEnrollment = {
        ...mockEnrollmentData,
        payment_reference: 'different_reference'
      };

      const result = await service.processCardPayment(mockWebhookData, mismatchedEnrollment);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('PAYMENT_VALIDATION_FAILED');
    });

    it('should handle unexpected errors gracefully', async () => {
      // Mock an unexpected error during the processCardPayment method itself
      const originalProcessCardPayment = service.processCardPayment;
      
      // Temporarily replace the method to throw an unexpected error
      (service as any).validateCardPaymentSuccess = vi.fn().mockImplementation(() => {
        throw new Error('Unexpected validation error');
      });

      const result = await service.processCardPayment(mockWebhookData, mockEnrollmentData);

      expect(result.success).toBe(false);
      expect(result.error?.code).toBe('UNEXPECTED_ERROR');
      expect(result.error?.recoverable).toBe(true);
      
      // Restore the original method
      service.processCardPayment = originalProcessCardPayment;
    });
  });

  describe('Real-time Updates', () => {
    it('should dispatch enrollment status update event', async () => {
      const mockDispatchEvent = window.dispatchEvent as Mock;
      
      // Test the updateRealTimeStatus method directly
      const enrollmentData = mockEnrollmentData;
      const approvalResult = {
        approved: true,
        approvalTimestamp: new Date(),
        approvedBy: 'system_card_payment' as const,
        enrollmentId: enrollmentData.id,
        previousStatus: EnrollmentStatus.PENDING,
        newStatus: EnrollmentStatus.APPROVED
      };
      const accessResult = {
        accessGranted: true,
        grantedAt: new Date(),
        courseId: enrollmentData.course_id,
        userId: enrollmentData.user_id,
        accessLevel: 'full' as const
      };

      // Call the private method directly using type assertion
      await (service as any).updateRealTimeStatus(enrollmentData, approvalResult, accessResult);

      // Check if dispatchEvent was called
      expect(mockDispatchEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'enrollment-status-update',
          detail: expect.objectContaining({
            enrollmentId: enrollmentData.id,
            userId: enrollmentData.user_id,
            courseId: enrollmentData.course_id,
            status: EnrollmentStatus.APPROVED,
            eventType: 'payment_completed'
          })
        })
      );
    });

    it('should update localStorage for cross-tab sync', async () => {
      // Test the updateRealTimeStatus method directly
      const enrollmentData = mockEnrollmentData;
      const approvalResult = {
        approved: true,
        approvalTimestamp: new Date(),
        approvedBy: 'system_card_payment' as const,
        enrollmentId: enrollmentData.id,
        previousStatus: EnrollmentStatus.PENDING,
        newStatus: EnrollmentStatus.APPROVED
      };
      const accessResult = {
        accessGranted: true,
        grantedAt: new Date(),
        courseId: enrollmentData.course_id,
        userId: enrollmentData.user_id,
        accessLevel: 'full' as const
      };

      // Call the private method directly
      await (service as any).updateRealTimeStatus(enrollmentData, approvalResult, accessResult);

      // Check if localStorage was updated
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        expect.stringContaining('enrollment-update-'),
        expect.stringContaining('"status":"approved"')
      );
    });
  });

  describe('Service Management', () => {
    it('should return singleton instance', () => {
      const instance1 = CardPaymentFastTrack.getInstance();
      const instance2 = CardPaymentFastTrack.getInstance();
      
      expect(instance1).toBe(instance2);
    });

    it('should provide processing statistics', () => {
      const stats = service.getProcessingStats();
      
      expect(stats).toHaveProperty('totalProcessed');
      expect(stats).toHaveProperty('successRate');
      expect(stats).toHaveProperty('averageProcessingTime');
      expect(typeof stats.totalProcessed).toBe('number');
      expect(typeof stats.successRate).toBe('number');
      expect(typeof stats.averageProcessingTime).toBe('number');
    });

    it('should cleanup resources', () => {
      service.cleanup();
      
      // After cleanup, service should be in uninitialized state
      expect(() => service.cleanup()).not.toThrow();
    });
  });
});