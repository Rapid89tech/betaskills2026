/**
 * PaymentMethodRouter Integration Tests
 * 
 * Tests the integration of PaymentMethodRouter with the broader payment system.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PaymentMethodRouter } from '../../services/PaymentMethodRouter';
import { IkhokhaPaymentService } from '../../services/IkhokhaPaymentService';
import { 
  PaymentType, 
  PaymentStatus, 
  EnrollmentStatus,
  PaymentResult,
  IkhokhaWebhook,
  PaymentData
} from '../../types/ikhokha';

// Mock external dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({ error: null }))
      })),
      insert: vi.fn(() => ({ error: null })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => ({
            data: {
              id: 'enrollment_123',
              user_id: 'user_123',
              course_id: 'course_123',
              status: EnrollmentStatus.PENDING,
              payment_type: PaymentType.CARD
            },
            error: null
          }))
        }))
      }))
    }))
  }
}));

vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

describe('PaymentMethodRouter Integration', () => {
  let router: PaymentMethodRouter;

  beforeEach(() => {
    router = PaymentMethodRouter.getInstance();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('End-to-End Payment Routing', () => {
    it('should handle complete card payment flow', async () => {
      // Simulate a successful card payment
      const paymentResult: PaymentResult = {
        success: true,
        payment_id: 'pay_card_123',
        transaction_id: 'txn_card_123',
        status: PaymentStatus.COMPLETED,
        amount: 299.99,
        currency: 'ZAR',
        reference: 'course_enrollment_card_123',
        message: 'Card payment successful'
      };

      const context = {
        paymentMethod: 'visa',
        paymentData: {
          sessionId: 'session_123',
          amount: 299.99,
          currency: 'ZAR',
          reference: 'course_enrollment_card_123',
          customer: {
            email: 'student@example.com',
            name: 'Test Student'
          },
          paymentMethod: 'card'
        } as PaymentData
      };

      // Test payment method detection
      const detection = await router.detectPaymentMethod(context);
      expect(detection.paymentType).toBe(PaymentType.CARD);
      expect(detection.routingDecision).toBe('immediate_approval');

      // Test payment routing
      const routingResult = await router.routePayment(
        'enrollment_123',
        paymentResult,
        context
      );

      expect(routingResult.success).toBe(true);
      expect(routingResult.approved).toBe(true);
      expect(routingResult.accessGranted).toBe(true);
      expect(routingResult.message).toContain('Course access granted immediately');
    });

    it('should handle complete EFT payment flow', async () => {
      // Simulate a successful EFT payment
      const paymentResult: PaymentResult = {
        success: true,
        payment_id: 'pay_eft_123',
        transaction_id: 'txn_eft_123',
        status: PaymentStatus.COMPLETED,
        amount: 299.99,
        currency: 'ZAR',
        reference: 'eft_course_enrollment_123',
        message: 'EFT payment received'
      };

      const context = {
        paymentMethod: 'eft',
        paymentData: {
          sessionId: 'session_eft_123',
          amount: 299.99,
          currency: 'ZAR',
          reference: 'eft_course_enrollment_123',
          customer: {
            email: 'student@example.com',
            name: 'Test Student'
          },
          paymentMethod: 'eft'
        } as PaymentData
      };

      // Test payment method detection
      const detection = await router.detectPaymentMethod(context);
      expect(detection.paymentType).toBe(PaymentType.EFT);
      expect(detection.routingDecision).toBe('admin_approval');

      // Test payment routing
      const routingResult = await router.routePayment(
        'enrollment_123',
        paymentResult,
        context
      );

      expect(routingResult.success).toBe(true);
      expect(routingResult.approved).toBe(false);
      expect(routingResult.accessGranted).toBe(false);
      expect(routingResult.message).toContain('Awaiting admin approval');
    });

    it('should handle webhook-based payment detection', async () => {
      // Simulate webhook data for card payment
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_webhook_123',
        reference: 'course_payment_webhook_123',
        amount: 199.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'webhook_signature_123',
        response_code: '00',
        response_message: 'Approved',
        card_type: 'mastercard',
        masked_card_number: '****5678',
        auth_code: 'AUTH456'
      };

      const paymentResult: PaymentResult = {
        success: true,
        payment_id: 'pay_webhook_123',
        transaction_id: 'txn_webhook_123',
        status: PaymentStatus.COMPLETED,
        amount: 199.99,
        currency: 'ZAR',
        reference: 'course_payment_webhook_123'
      };

      const context = { webhookData };

      // Test webhook-based detection
      const detection = await router.detectPaymentMethod(context);
      expect(detection.paymentType).toBe(PaymentType.CARD);
      expect(detection.routingDecision).toBe('immediate_approval');

      // Test routing with webhook context
      const routingResult = await router.routePayment(
        'enrollment_webhook_123',
        paymentResult,
        context
      );

      expect(routingResult.success).toBe(true);
      expect(routingResult.approved).toBe(true);
      expect(routingResult.accessGranted).toBe(true);
    });

    it('should handle payment failure scenarios', async () => {
      const failedPaymentResult: PaymentResult = {
        success: false,
        status: PaymentStatus.FAILED,
        message: 'Payment declined by bank',
        error: {
          code: 'PAYMENT_DECLINED',
          message: 'Insufficient funds',
          details: { bank_response: 'NSF' }
        }
      };

      const context = {
        paymentMethod: 'visa',
        paymentData: {
          sessionId: 'session_failed_123',
          amount: 299.99,
          currency: 'ZAR',
          reference: 'failed_payment_123',
          customer: {
            email: 'student@example.com',
            name: 'Test Student'
          }
        } as PaymentData
      };

      const routingResult = await router.routePayment(
        'enrollment_failed_123',
        failedPaymentResult,
        context
      );

      expect(routingResult.success).toBe(true); // Successfully handled the failure
      expect(routingResult.approved).toBe(false);
      expect(routingResult.accessGranted).toBe(false);
      expect(routingResult.message).toContain('Insufficient funds');
    });

    it('should handle unknown payment methods with manual review', async () => {
      const paymentResult: PaymentResult = {
        success: true,
        payment_id: 'pay_unknown_123',
        transaction_id: 'txn_unknown_123',
        status: PaymentStatus.COMPLETED,
        amount: 299.99,
        currency: 'ZAR',
        reference: 'unknown_payment_method_123'
      };

      const context = {
        paymentMethod: 'crypto_payment', // Unknown payment method
        transactionData: {
          payment_method: 'cryptocurrency',
          transaction_type: 'blockchain_transfer'
        }
      };

      const detection = await router.detectPaymentMethod(context);
      expect(detection.paymentType).toBe(PaymentType.CARD); // Default fallback
      expect(detection.routingDecision).toBe('immediate_approval'); // Card payments get immediate approval

      const routingResult = await router.routePayment(
        'enrollment_unknown_123',
        paymentResult,
        context
      );

      expect(routingResult.success).toBe(true);
      expect(routingResult.approved).toBe(true); // Card payments get approved
      expect(routingResult.accessGranted).toBe(true); // Card payments get access
      expect(routingResult.message).toContain('Course access granted immediately');
    });
  });

  describe('Payment Type Persistence', () => {
    it('should generate correct persistence data for card payments', () => {
      const paymentResult: PaymentResult = {
        success: true,
        payment_id: 'pay_123',
        transaction_id: 'txn_123',
        status: PaymentStatus.COMPLETED,
        reference: 'ref_123'
      };

      const persistenceData = router.getPaymentTypePersistenceData(
        PaymentType.CARD,
        paymentResult
      );

      expect(persistenceData).toMatchObject({
        payment_type: PaymentType.CARD,
        payment_status: PaymentStatus.COMPLETED,
        payment_reference: 'ref_123',
        ikhokha_transaction_id: 'txn_123',
        requires_approval: false
      });
      expect(persistenceData.updated_at).toBeInstanceOf(Date);
    });

    it('should generate correct persistence data for EFT payments', () => {
      const paymentResult: PaymentResult = {
        success: true,
        payment_id: 'pay_eft_123',
        transaction_id: 'txn_eft_123',
        status: PaymentStatus.COMPLETED,
        reference: 'eft_ref_123'
      };

      const persistenceData = router.getPaymentTypePersistenceData(
        PaymentType.EFT,
        paymentResult
      );

      expect(persistenceData).toMatchObject({
        payment_type: PaymentType.EFT,
        payment_status: PaymentStatus.COMPLETED,
        payment_reference: 'eft_ref_123',
        ikhokha_transaction_id: 'txn_eft_123',
        requires_approval: true
      });
    });

    it('should handle failed payment persistence correctly', () => {
      const failedPaymentResult: PaymentResult = {
        success: false,
        status: PaymentStatus.FAILED,
        error: {
          code: 'PAYMENT_FAILED',
          message: 'Transaction declined'
        }
      };

      const persistenceData = router.getPaymentTypePersistenceData(
        PaymentType.CARD,
        failedPaymentResult
      );

      expect(persistenceData.payment_status).toBe(PaymentStatus.FAILED);
      expect(persistenceData.requires_approval).toBe(false); // Card payments don't require approval even when failed
    });
  });

  describe('Business Logic Validation', () => {
    it('should correctly determine approval requirements', () => {
      // Card payments should not require approval
      expect(router.shouldRequireApproval(PaymentType.CARD)).toBe(false);
      
      // EFT payments should require approval
      expect(router.shouldRequireApproval(PaymentType.EFT)).toBe(true);
    });

    it('should handle edge cases in payment method detection', async () => {
      // Empty context
      const emptyContext = {};
      const emptyResult = await router.detectPaymentMethod(emptyContext);
      expect(emptyResult.paymentType).toBe(PaymentType.CARD); // Default fallback
      expect(emptyResult.routingDecision).toBe('immediate_approval'); // Card payments get immediate approval

      // Null values
      const nullContext = {
        paymentMethod: null as any,
        paymentData: null as any,
        webhookData: null as any
      };
      const nullResult = await router.detectPaymentMethod(nullContext);
      expect(nullResult.paymentType).toBe(PaymentType.CARD);
      expect(nullResult.routingDecision).toBe('immediate_approval'); // Card payments get immediate approval
    });
  });
});