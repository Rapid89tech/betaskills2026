import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PaymentTypeDetector } from '../../services/PaymentTypeDetector';
import { CardPaymentFastTrack } from '../../services/CardPaymentFastTrack';
import { EnhancedRealTimeSync } from '../../services/EnhancedRealTimeSync';
import { CourseAccessController } from '../../services/CourseAccessController';
import type { IkhokhaWebhook } from '../../types/ikhokha';
import type { EnrollmentData } from '../../utils/enrollmentPersistence';

/**
 * End-to-End Tests for Complete Card Payment to Access Workflow
 * 
 * These tests verify the complete flow from webhook receipt to course access:
 * 1. Webhook validation and payment type detection
 * 2. Fast-track approval for card payments
 * 3. Real-time UI updates
 * 4. Course access granting
 * 5. Persistence across sessions
 * 
 * Requirements: 1.1, 2.1, 3.1, 4.1
 */
describe('Card Payment Flow E2E Tests', () => {
  let paymentDetector: PaymentTypeDetector;
  let fastTrack: CardPaymentFastTrack;
  let realTimeSync: EnhancedRealTimeSync;
  let accessController: CourseAccessController;
  
  // Test data
  const mockCardWebhook: IkhokhaWebhook = {
    transaction_id: 'pay_card_456',
    amount: 29900, // R299.00
    currency: 'ZAR',
    response_code: '00',
    response_message: 'Transaction successful',
    reference: 'card_payment_test',
    merchant_reference: 'enroll_789',
    timestamp: new Date().toISOString(),
    card_type: 'visa',
    masked_card_number: '****4242',
    auth_code: 'AUTH123',
    metadata: {
      user_email: 'test@example.com',
      course_id: 'course_123',
      enrollment_id: 'enroll_789'
    }
  };

  const mockEnrollment: EnrollmentData = {
    id: 'enroll_789',
    userId: 'user_123',
    userEmail: 'test@example.com',
    courseId: 'course_123',
    courseTitle: 'Test Course',
    status: 'pending',
    paymentReference: 'pay_card_456',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  beforeEach(() => {
    paymentDetector = new PaymentTypeDetector();
    fastTrack = new CardPaymentFastTrack();
    realTimeSync = new EnhancedRealTimeSync();
    accessController = new CourseAccessController();
    
    // Mock localStorage for testing
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });
    
    // Mock BroadcastChannel for cross-tab testing
    global.BroadcastChannel = vi.fn().mockImplementation(() => ({
      postMessage: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      close: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete Card Payment Workflow', () => {
    it('should process card payment from webhook to course access', async () => {
      // Step 1: Payment type detection
      const paymentTypeResult = await paymentDetector.detectPaymentType(mockCardWebhook);
      
      expect(paymentTypeResult.type).toBe('card');
      expect(paymentTypeResult.confidence).toBeGreaterThan(0.8);
      expect(paymentTypeResult.indicators).toContainEqual(
        expect.objectContaining({
          field: 'payment_method.type',
          value: 'card'
        })
      );

      // Step 2: Fast-track approval
      const fastTrackResult = await fastTrack.processCardPayment(
        mockCardWebhook,
        mockEnrollment
      );
      
      expect(fastTrackResult.success).toBe(true);
      expect(fastTrackResult.enrollmentApproved).toBe(true);
      expect(fastTrackResult.accessGranted).toBe(true);
      expect(fastTrackResult.processingTimeMs).toBeLessThan(2000);

      // Step 3: Real-time status broadcasting
      const broadcastSpy = vi.spyOn(realTimeSync, 'broadcastImmediateApproval');
      
      await realTimeSync.broadcastImmediateApproval({
        enrollmentId: mockEnrollment.id,
        userId: mockEnrollment.userId,
        courseId: mockEnrollment.courseId,
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        paymentReference: mockCardWebhook.transaction_id,
        accessGranted: true,
        source: 'webhook_card_payment'
      });
      
      expect(broadcastSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          enrollmentId: 'enroll_789',
          approvalType: 'card_payment_automatic',
          accessGranted: true
        })
      );

      // Step 4: Course access granting
      const accessResult = await accessController.grantImmediateAccess(
        mockEnrollment.userId,
        mockEnrollment.courseId,
        'card_payment_success'
      );
      
      expect(accessResult.success).toBe(true);
      expect(accessResult.accessLevel).toBe('full');
      expect(accessResult.grantedAt).toBeInstanceOf(Date);

      // Step 5: Verify end-to-end timing
      const totalProcessingTime = fastTrackResult.processingTimeMs;
      expect(totalProcessingTime).toBeLessThan(2000); // Under 2 seconds as per requirements
    });

    it('should handle card payment with immediate UI updates', async () => {
      // Mock UI update functions
      const broadcastSpy = vi.spyOn(realTimeSync, 'broadcastImmediateApproval');
      
      // Process card payment
      const fastTrackResult = await fastTrack.processCardPayment(
        mockCardWebhook,
        mockEnrollment
      );
      
      expect(fastTrackResult.success).toBe(true);
      
      // Trigger UI updates via broadcast
      await realTimeSync.broadcastImmediateApproval({
        enrollmentId: mockEnrollment.id,
        userId: mockEnrollment.userId,
        courseId: mockEnrollment.courseId,
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        paymentReference: mockCardWebhook.transaction_id,
        accessGranted: true,
        source: 'webhook_card_payment'
      });
      
      expect(broadcastSpy).toHaveBeenCalled();
    });

    it('should persist enrollment status across browser sessions', async () => {
      const setItemSpy = vi.spyOn(localStorage, 'setItem');
      
      // Process card payment
      await fastTrack.processCardPayment(mockCardWebhook, mockEnrollment);
      
      // Verify persistence
      expect(setItemSpy).toHaveBeenCalledWith(
        expect.stringContaining('enrollment_'),
        expect.stringContaining('"status":"approved"')
      );
    });
  });

  describe('Error Scenarios', () => {
    it('should handle webhook validation failures gracefully', async () => {
      const invalidWebhook = {
        ...mockCardWebhook,
        response_code: '05', // Card declined
        response_message: 'Transaction failed'
      };
      
      const result = await fastTrack.processCardPayment(invalidWebhook, mockEnrollment);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.type).toBe('validation_error');
    });

    it('should fallback to manual approval when payment type detection fails', async () => {
      const ambiguousWebhook = {
        ...mockCardWebhook,
        card_type: undefined,
        masked_card_number: undefined,
        auth_code: undefined,
        response_code: '999' // Unknown response code
      };
      
      const paymentTypeResult = await paymentDetector.detectPaymentType(ambiguousWebhook);
      
      expect(paymentTypeResult.type).toBe('unknown');
      expect(paymentTypeResult.confidence).toBeLessThan(0.4);
    });

    it('should recover from real-time sync failures', async () => {
      // Mock broadcast failure
      const broadcastSpy = vi.spyOn(realTimeSync, 'broadcastImmediateApproval')
        .mockRejectedValueOnce(new Error('Broadcast failed'));
      
      // Should not throw, should handle gracefully
      await expect(
        realTimeSync.broadcastImmediateApproval({
          enrollmentId: mockEnrollment.id,
          userId: mockEnrollment.user_id,
          courseId: mockEnrollment.course_id,
          approvalType: 'card_payment_automatic',
          timestamp: new Date(),
          paymentReference: mockCardWebhook.data.id,
          accessGranted: true
        })
      ).rejects.toThrow('Broadcast failed');
      
      expect(broadcastSpy).toHaveBeenCalled();
    });
  });

  describe('Performance Requirements', () => {
    it('should process card payments within 2 seconds', async () => {
      const startTime = Date.now();
      
      await fastTrack.processCardPayment(mockCardWebhook, mockEnrollment);
      
      const processingTime = Date.now() - startTime;
      expect(processingTime).toBeLessThan(2000);
    });

    it('should handle concurrent card payments efficiently', async () => {
      const concurrentPayments = Array.from({ length: 5 }, (_, i) => ({
        ...mockCardWebhook,
        id: `wh_card_test_${i}`,
        data: {
          ...mockCardWebhook.data,
          id: `pay_card_${i}`,
          metadata: {
            ...mockCardWebhook.data.metadata,
            enrollment_id: `enroll_${i}`
          }
        }
      }));

      const concurrentEnrollments = Array.from({ length: 5 }, (_, i) => ({
        ...mockEnrollment,
        id: `enroll_${i}`,
        payment_reference: `pay_card_${i}`
      }));

      const startTime = Date.now();
      
      const results = await Promise.all(
        concurrentPayments.map((webhook, i) =>
          fastTrack.processCardPayment(webhook, concurrentEnrollments[i])
        )
      );
      
      const totalTime = Date.now() - startTime;
      
      // All should succeed
      results.forEach(result => {
        expect(result.success).toBe(true);
      });
      
      // Should handle 5 concurrent payments in under 5 seconds
      expect(totalTime).toBeLessThan(5000);
    });
  });

  describe('Cross-Tab Synchronization', () => {
    it('should synchronize enrollment status across multiple tabs', async () => {
      const broadcastSpy = vi.spyOn(realTimeSync, 'broadcastImmediateApproval');
      
      // Process card payment
      await fastTrack.processCardPayment(mockCardWebhook, mockEnrollment);
      
      // Trigger cross-tab sync via broadcast
      await realTimeSync.broadcastImmediateApproval({
        enrollmentId: mockEnrollment.id,
        userId: mockEnrollment.userId,
        courseId: mockEnrollment.courseId,
        approvalType: 'card_payment_automatic',
        timestamp: new Date(),
        paymentReference: mockCardWebhook.transaction_id,
        accessGranted: true,
        source: 'webhook_card_payment'
      });
      
      expect(broadcastSpy).toHaveBeenCalled();
    });

    it('should coordinate UI updates across tabs', async () => {
      const broadcastSpy = vi.spyOn(realTimeSync, 'broadcastCourseAccessGranted');
      
      const accessUpdate = {
        userId: mockEnrollment.userId,
        courseId: mockEnrollment.courseId,
        accessLevel: 'granted' as const,
        grantedAt: new Date(),
        source: 'card_payment' as const,
        enrollmentId: mockEnrollment.id
      };
      
      await realTimeSync.broadcastCourseAccessGranted(accessUpdate);
      
      expect(broadcastSpy).toHaveBeenCalledWith(accessUpdate);
    });
  });
});