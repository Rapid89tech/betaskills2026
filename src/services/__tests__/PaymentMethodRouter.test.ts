/**
 * PaymentMethodRouter Tests
 * 
 * Comprehensive test suite for payment method detection and routing logic.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PaymentMethodRouter } from '../PaymentMethodRouter';
import { 
  PaymentType, 
  PaymentStatus, 
  EnrollmentStatus,
  PaymentResult,
  IkhokhaWebhook,
  PaymentData
} from '../../types/ikhokha';
import { supabase } from '@/integrations/supabase/client';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      update: vi.fn(() => ({
        eq: vi.fn(() => ({ error: null }))
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

describe('PaymentMethodRouter', () => {
  let router: PaymentMethodRouter;

  beforeEach(() => {
    router = PaymentMethodRouter.getInstance();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('detectPaymentMethod', () => {
    it('should detect card payment from payment method string', async () => {
      const context = {
        paymentMethod: 'visa_card'
      };

      const result = await router.detectPaymentMethod(context);

      expect(result.paymentType).toBe(PaymentType.CARD);
      expect(result.requiresApproval).toBe(false);
      expect(result.autoApprove).toBe(true);
      expect(result.routingDecision).toBe('immediate_approval');
    });

    it('should detect EFT payment from payment method string', async () => {
      const context = {
        paymentMethod: 'eft_transfer'
      };

      const result = await router.detectPaymentMethod(context);

      expect(result.paymentType).toBe(PaymentType.EFT);
      expect(result.requiresApproval).toBe(true);
      expect(result.autoApprove).toBe(false);
      expect(result.routingDecision).toBe('admin_approval');
    });

    it('should detect card payment from webhook data', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_123',
        reference: 'ref_123',
        amount: 100,
        currency: 'ZAR',
        status: 'completed',
        timestamp: '2024-01-01T00:00:00Z',
        signature: 'sig_123',
        response_code: '00',
        response_message: 'Approved',
        card_type: 'visa',
        masked_card_number: '****1234',
        auth_code: 'AUTH123'
      };

      const context = { webhookData };
      const result = await router.detectPaymentMethod(context);

      expect(result.paymentType).toBe(PaymentType.CARD);
      expect(result.routingDecision).toBe('immediate_approval');
    });

    it('should detect EFT payment from webhook reference', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_123',
        reference: 'eft_transfer_ref_123',
        amount: 100,
        currency: 'ZAR',
        status: 'completed',
        timestamp: '2024-01-01T00:00:00Z',
        signature: 'sig_123',
        response_code: '10',
        response_message: 'EFT Received'
      };

      const context = { webhookData };
      const result = await router.detectPaymentMethod(context);

      expect(result.paymentType).toBe(PaymentType.EFT);
      expect(result.routingDecision).toBe('admin_approval');
    });

    it('should handle detection errors gracefully', async () => {
      const context = {
        paymentMethod: null as any
      };

      // Mock an error in the detection process
      const originalConsoleWarn = console.warn;
      console.warn = vi.fn();

      const result = await router.detectPaymentMethod(context);

      expect(result.paymentType).toBe(PaymentType.CARD);
      // When no payment method is detected, it defaults to CARD which gets immediate approval
      expect(result.routingDecision).toBe('immediate_approval');

      console.warn = originalConsoleWarn;
    });
  });

  describe('routePayment', () => {
    const mockEnrollmentId = 'enrollment_123';
    const mockSuccessfulPaymentResult: PaymentResult = {
      success: true,
      payment_id: 'pay_123',
      transaction_id: 'txn_123',
      status: PaymentStatus.COMPLETED,
      amount: 100,
      currency: 'ZAR',
      reference: 'ref_123',
      message: 'Payment successful'
    };

    beforeEach(() => {
      // Mock successful database update
      vi.mocked(supabase.from).mockReturnValue({
        update: vi.fn(() => ({
          eq: vi.fn(() => ({ error: null }))
        }))
      } as any);
    });

    it('should process immediate approval for card payments', async () => {
      const context = {
        paymentMethod: 'visa_card'
      };

      const result = await router.routePayment(
        mockEnrollmentId,
        mockSuccessfulPaymentResult,
        context
      );

      expect(result.success).toBe(true);
      expect(result.approved).toBe(true);
      expect(result.accessGranted).toBe(true);
      expect(result.message).toContain('Course access granted immediately');

      // Verify database update was called with correct data
      expect(supabase.from).toHaveBeenCalledWith('enrollments');
    });

    it('should route EFT payments to admin approval', async () => {
      const context = {
        paymentMethod: 'eft_transfer'
      };

      const result = await router.routePayment(
        mockEnrollmentId,
        mockSuccessfulPaymentResult,
        context
      );

      expect(result.success).toBe(true);
      expect(result.approved).toBe(false);
      expect(result.accessGranted).toBe(false);
      expect(result.message).toContain('Awaiting admin approval');
    });

    it('should handle failed payments correctly', async () => {
      const failedPaymentResult: PaymentResult = {
        success: false,
        status: PaymentStatus.FAILED,
        message: 'Payment declined',
        error: {
          code: 'PAYMENT_DECLINED',
          message: 'Insufficient funds'
        }
      };

      const context = {
        paymentMethod: 'visa_card'
      };

      const result = await router.routePayment(
        mockEnrollmentId,
        failedPaymentResult,
        context
      );

      expect(result.success).toBe(true); // Successfully handled the failure
      expect(result.approved).toBe(false);
      expect(result.accessGranted).toBe(false);
      expect(result.message).toContain('Insufficient funds');
    });

    it('should handle database errors gracefully', async () => {
      // Mock database error
      vi.mocked(supabase.from).mockReturnValue({
        update: vi.fn(() => ({
          eq: vi.fn(() => ({ error: { message: 'Database connection failed' } }))
        }))
      } as any);

      const context = {
        paymentMethod: 'visa_card'
      };

      const result = await router.routePayment(
        mockEnrollmentId,
        mockSuccessfulPaymentResult,
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toContain('Database connection failed');
    });
  });

  describe('shouldRequireApproval', () => {
    it('should not require approval for card payments', () => {
      const result = router.shouldRequireApproval(PaymentType.CARD);
      expect(result).toBe(false);
    });

    it('should require approval for EFT payments', () => {
      const result = router.shouldRequireApproval(PaymentType.EFT);
      expect(result).toBe(true);
    });
  });

  describe('getPaymentTypePersistenceData', () => {
    it('should return correct persistence data for successful card payment', () => {
      const paymentResult: PaymentResult = {
        success: true,
        payment_id: 'pay_123',
        transaction_id: 'txn_123',
        status: PaymentStatus.COMPLETED,
        reference: 'ref_123'
      };

      const result = router.getPaymentTypePersistenceData(PaymentType.CARD, paymentResult);

      expect(result.payment_type).toBe(PaymentType.CARD);
      expect(result.payment_status).toBe(PaymentStatus.COMPLETED);
      expect(result.payment_reference).toBe('ref_123');
      expect(result.ikhokha_transaction_id).toBe('txn_123');
      expect(result.requires_approval).toBe(false);
    });

    it('should return correct persistence data for EFT payment', () => {
      const paymentResult: PaymentResult = {
        success: true,
        payment_id: 'pay_123',
        transaction_id: 'txn_123',
        status: PaymentStatus.COMPLETED,
        reference: 'eft_ref_123'
      };

      const result = router.getPaymentTypePersistenceData(PaymentType.EFT, paymentResult);

      expect(result.payment_type).toBe(PaymentType.EFT);
      expect(result.requires_approval).toBe(true);
    });
  });

  describe('singleton pattern', () => {
    it('should return the same instance', () => {
      const instance1 = PaymentMethodRouter.getInstance();
      const instance2 = PaymentMethodRouter.getInstance();
      
      expect(instance1).toBe(instance2);
    });
  });
});