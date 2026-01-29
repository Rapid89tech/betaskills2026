/**
 * WebhookHandler Test Suite
 * 
 * Tests for production webhook processing, signature validation,
 * automatic enrollment approval, and retry mechanisms.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { WebhookHandler } from '../WebhookHandler';
import { IkhokhaWebhook, PaymentStatus, EnrollmentStatus } from '../../types/ikhokha';
import { supabase } from '@/integrations/supabase/client';

// Mock dependencies
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn()
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn()
      })),
      insert: vi.fn()
    }))
  }
}));

vi.mock('../PaymentMethodRouter', () => ({
  paymentMethodRouter: {
    routePayment: vi.fn()
  }
}));

vi.mock('../RealTimePaymentSync', () => ({
  realTimePaymentSync: {
    initialize: vi.fn(),
    syncPaymentStatus: vi.fn(),
    syncEnrollmentStatus: vi.fn()
  }
}));

vi.mock('../../config/ikhokha', () => ({
  ikhokhaConfig: {
    webhook_secret: 'test_webhook_secret_key',
    test_mode: false,
    api_url: 'https://api.ikhokha.com'
  }
}));

describe('WebhookHandler', () => {
  let webhookHandler: WebhookHandler;
  let mockWebhookData: IkhokhaWebhook;

  beforeEach(async () => {
    webhookHandler = WebhookHandler.getInstance();
    await webhookHandler.initialize();

    mockWebhookData = {
      transaction_id: 'txn_123456789',
      reference: 'enrollment_ref_123',
      amount: 299.99,
      currency: 'ZAR',
      status: 'completed',
      timestamp: new Date().toISOString(),
      signature: 'test_signature',
      response_code: '00',
      response_message: 'Transaction successful',
      card_type: 'VISA',
      masked_card_number: '****1234'
    };
  });

  afterEach(() => {
    webhookHandler.cleanup();
    vi.clearAllMocks();
  });

  describe('Webhook Processing', () => {
    it('should process successful card payment webhook', async () => {
      // Mock enrollment lookup
      const mockEnrollment = {
        id: 'enrollment_123',
        user_id: 'user_123',
        course_id: 'course_123',
        payment_reference: 'enrollment_ref_123',
        status: 'pending',
        payment_type: 'card'
      };

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: null })
        })),
        insert: vi.fn().mockResolvedValue({ error: null })
      } as any);

      // Mock payment routing
      const { paymentMethodRouter } = await import('../PaymentMethodRouter');
      vi.mocked(paymentMethodRouter.routePayment).mockResolvedValue({
        success: true,
        enrollmentId: 'enrollment_123',
        approved: true,
        accessGranted: true,
        message: 'Payment successful - Course access granted immediately'
      });

      // Create valid signature
      const validSignature = await createTestSignature(mockWebhookData);

      const result = await webhookHandler.processWebhook(
        mockWebhookData,
        validSignature,
        mockWebhookData.timestamp
      );

      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(true);
      expect(result.enrollment_updated).toBe(true);
      expect(paymentMethodRouter.routePayment).toHaveBeenCalledWith(
        'enrollment_123',
        expect.objectContaining({
          success: true,
          status: PaymentStatus.COMPLETED
        }),
        expect.objectContaining({
          webhookData: mockWebhookData
        })
      );
    });

    it('should handle failed payment webhook', async () => {
      const failedWebhookData = {
        ...mockWebhookData,
        status: 'failed' as const,
        response_code: '05',
        response_message: 'Transaction declined'
      };

      const mockEnrollment = {
        id: 'enrollment_123',
        user_id: 'user_123',
        course_id: 'course_123',
        payment_reference: 'enrollment_ref_123',
        status: 'pending'
      };

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: null })
        })),
        insert: vi.fn().mockResolvedValue({ error: null })
      } as any);

      const { paymentMethodRouter } = await import('../PaymentMethodRouter');
      vi.mocked(paymentMethodRouter.routePayment).mockResolvedValue({
        success: true,
        enrollmentId: 'enrollment_123',
        approved: false,
        accessGranted: false,
        message: 'Payment failed - Please try again'
      });

      const validSignature = await createTestSignature(failedWebhookData);

      const result = await webhookHandler.processWebhook(
        failedWebhookData,
        validSignature,
        failedWebhookData.timestamp
      );

      expect(result.processed).toBe(true);
      expect(paymentMethodRouter.routePayment).toHaveBeenCalledWith(
        'enrollment_123',
        expect.objectContaining({
          success: false,
          status: PaymentStatus.FAILED
        }),
        expect.any(Object)
      );
    });

    it('should handle webhook for non-existent enrollment', async () => {
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: null, error: { code: 'PGRST116' } })
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn()
        })),
        insert: vi.fn()
      } as any);

      const validSignature = await createTestSignature(mockWebhookData);

      const result = await webhookHandler.processWebhook(
        mockWebhookData,
        validSignature,
        mockWebhookData.timestamp
      );

      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(false);
      expect(result.enrollment_updated).toBe(false);
      expect(result.error).toBe('No enrollment found for reference');
    });
  });

  describe('Security Validation', () => {
    it('should reject webhook with invalid signature', async () => {
      const invalidSignature = 'invalid_signature';

      const result = await webhookHandler.processWebhook(
        mockWebhookData,
        invalidSignature,
        mockWebhookData.timestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');
    });

    it('should reject webhook with expired timestamp', async () => {
      const expiredTimestamp = new Date(Date.now() - 10 * 60 * 1000).toISOString(); // 10 minutes ago
      const validSignature = await createTestSignature(mockWebhookData);

      const result = await webhookHandler.processWebhook(
        mockWebhookData,
        validSignature,
        expiredTimestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');
    });

    it('should reject webhook with missing required fields', async () => {
      const invalidWebhookData = {
        ...mockWebhookData,
        transaction_id: '', // Missing required field
      };

      const validSignature = await createTestSignature(invalidWebhookData);

      const result = await webhookHandler.processWebhook(
        invalidWebhookData,
        validSignature,
        mockWebhookData.timestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');
    });

    it('should reject webhook with invalid amount', async () => {
      const invalidWebhookData = {
        ...mockWebhookData,
        amount: -100, // Invalid negative amount
      };

      const validSignature = await createTestSignature(invalidWebhookData);

      const result = await webhookHandler.processWebhook(
        invalidWebhookData,
        validSignature,
        mockWebhookData.timestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');
    });
  });

  describe('Retry Mechanism', () => {
    it('should retry on retryable errors', async () => {
      const mockEnrollment = {
        id: 'enrollment_123',
        user_id: 'user_123',
        course_id: 'course_123',
        payment_reference: 'enrollment_ref_123'
      };

      // First call fails with retryable error, second succeeds
      vi.mocked(supabase.from)
        .mockReturnValueOnce({
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn().mockRejectedValue(new Error('connection timeout'))
            }))
          })),
          update: vi.fn(() => ({
            eq: vi.fn()
          })),
          insert: vi.fn()
        } as any)
        .mockReturnValueOnce({
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
            }))
          })),
          update: vi.fn(() => ({
            eq: vi.fn().mockResolvedValue({ error: null })
          })),
          insert: vi.fn().mockResolvedValue({ error: null })
        } as any);

      const { paymentMethodRouter } = await import('../PaymentMethodRouter');
      vi.mocked(paymentMethodRouter.routePayment).mockResolvedValue({
        success: true,
        enrollmentId: 'enrollment_123',
        approved: true,
        accessGranted: true,
        message: 'Success after retry'
      });

      const validSignature = await createTestSignature(mockWebhookData);

      const result = await webhookHandler.processWebhook(
        mockWebhookData,
        validSignature,
        mockWebhookData.timestamp
      );

      expect(result.processed).toBe(true);
    });

    it('should fail after max retry attempts', async () => {
      // Mock persistent failure
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockRejectedValue(new Error('connection timeout'))
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn()
        })),
        insert: vi.fn()
      } as any);

      const validSignature = await createTestSignature(mockWebhookData);

      const result = await webhookHandler.processWebhook(
        mockWebhookData,
        validSignature,
        mockWebhookData.timestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Max retry attempts');
    }, 35000); // 35 second timeout to allow for all retry attempts
  });

  describe('Real-time Synchronization', () => {
    it('should sync payment and enrollment status updates', async () => {
      const mockEnrollment = {
        id: 'enrollment_123',
        user_id: 'user_123',
        course_id: 'course_123',
        payment_reference: 'enrollment_ref_123'
      };

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: null })
        })),
        insert: vi.fn().mockResolvedValue({ error: null })
      } as any);

      const { paymentMethodRouter } = await import('../PaymentMethodRouter');
      vi.mocked(paymentMethodRouter.routePayment).mockResolvedValue({
        success: true,
        enrollmentId: 'enrollment_123',
        approved: true,
        accessGranted: true,
        message: 'Payment successful'
      });

      const { realTimePaymentSync } = await import('../RealTimePaymentSync');

      const validSignature = await createTestSignature(mockWebhookData);

      await webhookHandler.processWebhook(
        mockWebhookData,
        validSignature,
        mockWebhookData.timestamp
      );

      expect(realTimePaymentSync.syncPaymentStatus).toHaveBeenCalledWith(
        mockWebhookData.transaction_id,
        PaymentStatus.COMPLETED
      );

      expect(realTimePaymentSync.syncEnrollmentStatus).toHaveBeenCalledWith(
        'enrollment_123',
        EnrollmentStatus.APPROVED
      );
    });
  });
});

/**
 * Helper function to create valid test signature
 */
async function createTestSignature(webhookData: IkhokhaWebhook): Promise<string> {
  const payload = JSON.stringify({
    transaction_id: webhookData.transaction_id,
    reference: webhookData.reference,
    amount: webhookData.amount,
    currency: webhookData.currency,
    status: webhookData.status,
    timestamp: webhookData.timestamp
  });

  const encoder = new TextEncoder();
  const keyData = encoder.encode('test_webhook_secret_key');
  const messageData = encoder.encode(payload);

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const signature = Array.from(new Uint8Array(signatureBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return `sha256=${signature}`;
}