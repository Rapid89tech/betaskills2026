/**
 * Webhook Handler Integration Tests
 * 
 * Tests the complete webhook processing flow including:
 * - Real iKhokha webhook processing
 * - Signature validation
 * - Automatic enrollment approval
 * - Real-time status synchronization
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { WebhookHandler } from '../../services/WebhookHandler';
import { PaymentMethodRouter } from '../../services/PaymentMethodRouter';
import { RealTimePaymentSync } from '../../services/RealTimePaymentSync';
import { IkhokhaWebhook, PaymentStatus, EnrollmentStatus, PaymentType } from '../../types/ikhokha';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(),
    channel: vi.fn(() => ({
      on: vi.fn(() => ({
        subscribe: vi.fn()
      }))
    }))
  }
}));

describe('Webhook Handler Integration', () => {
  let webhookHandler: WebhookHandler;
  let paymentMethodRouter: PaymentMethodRouter;
  let realTimePaymentSync: RealTimePaymentSync;

  beforeEach(async () => {
    webhookHandler = WebhookHandler.getInstance();
    paymentMethodRouter = PaymentMethodRouter.getInstance();
    realTimePaymentSync = RealTimePaymentSync.getInstance();

    // Initialize services
    await webhookHandler.initialize();
    await realTimePaymentSync.initialize();
  });

  afterEach(() => {
    webhookHandler.cleanup();
    realTimePaymentSync.cleanup();
    vi.clearAllMocks();
  });

  describe('Card Payment Webhook Flow', () => {
    it('should process successful card payment and grant immediate access', async () => {
      // Setup test data
      const mockEnrollment = {
        id: 'enrollment_card_123',
        user_id: 'user_123',
        user_email: 'test@example.com',
        course_id: 'course_123',
        course_title: 'Test Course',
        payment_reference: 'card_payment_ref_123',
        status: 'pending',
        payment_type: 'card',
        payment_status: 'pending',
        requires_approval: false,
        course_access_granted: false,
        created_at: new Date(),
        updated_at: new Date()
      };

      const cardWebhookData: IkhokhaWebhook = {
        transaction_id: 'card_txn_123456789',
        reference: 'card_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Transaction approved',
        card_type: 'VISA',
        masked_card_number: '****1234',
        auth_code: 'AUTH123'
      };

      // Mock database operations
      const mockSupabaseChain = {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: null })
        })),
        insert: vi.fn().mockResolvedValue({ error: null })
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      // Create valid signature
      const validSignature = await createValidSignature(cardWebhookData);

      // Process webhook
      const result = await webhookHandler.processWebhook(
        cardWebhookData,
        validSignature,
        cardWebhookData.timestamp
      );

      // Verify webhook processing
      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(true);
      expect(result.enrollment_updated).toBe(true);
      expect(result.error).toBeUndefined();

      // Verify enrollment was updated with approval
      expect(mockSupabaseChain.update).toHaveBeenCalledWith({
        status: EnrollmentStatus.APPROVED,
        payment_status: PaymentStatus.COMPLETED,
        course_access_granted: true,
        access_granted_at: expect.any(String),
        approved_at: expect.any(String),
        approved_by: 'system_auto_approval',
        ikhokha_transaction_id: cardWebhookData.transaction_id,
        payment_reference: cardWebhookData.reference,
        updated_at: expect.any(String)
      });
    });

    it('should handle card payment failure correctly', async () => {
      const mockEnrollment = {
        id: 'enrollment_card_failed_123',
        user_id: 'user_123',
        course_id: 'course_123',
        payment_reference: 'card_payment_failed_ref_123',
        status: 'pending',
        payment_type: 'card'
      };

      const failedCardWebhookData: IkhokhaWebhook = {
        transaction_id: 'card_failed_txn_123',
        reference: 'card_payment_failed_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'failed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '05',
        response_message: 'Transaction declined - insufficient funds'
      };

      const mockSupabaseChain = {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: null })
        })),
        insert: vi.fn().mockResolvedValue({ error: null })
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      const validSignature = await createValidSignature(failedCardWebhookData);

      const result = await webhookHandler.processWebhook(
        failedCardWebhookData,
        validSignature,
        failedCardWebhookData.timestamp
      );

      expect(result.processed).toBe(true);
      
      // Verify enrollment was updated with failure status
      expect(mockSupabaseChain.update).toHaveBeenCalledWith({
        status: EnrollmentStatus.PENDING,
        payment_status: PaymentStatus.FAILED,
        course_access_granted: false,
        rejection_reason: 'Transaction declined - insufficient funds',
        updated_at: expect.any(String)
      });
    });
  });

  describe('EFT Payment Webhook Flow', () => {
    it('should process successful EFT payment and route to admin approval', async () => {
      const mockEnrollment = {
        id: 'enrollment_eft_123',
        user_id: 'user_123',
        user_email: 'test@example.com',
        course_id: 'course_123',
        course_title: 'Test Course',
        payment_reference: 'eft_payment_ref_123',
        status: 'pending',
        payment_type: 'eft',
        payment_status: 'pending',
        requires_approval: true,
        course_access_granted: false
      };

      const eftWebhookData: IkhokhaWebhook = {
        transaction_id: 'eft_txn_123456789',
        reference: 'eft_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'EFT transfer completed',
        // No card-specific fields for EFT
        metadata: { payment_method: 'eft' }
      };

      const mockSupabaseChain = {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: null })
        })),
        insert: vi.fn().mockResolvedValue({ error: null })
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      const validSignature = await createValidSignature(eftWebhookData);

      const result = await webhookHandler.processWebhook(
        eftWebhookData,
        validSignature,
        eftWebhookData.timestamp
      );

      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(true);

      // Verify enrollment was updated for admin approval (not auto-approved)
      expect(mockSupabaseChain.update).toHaveBeenCalledWith({
        status: EnrollmentStatus.PENDING,
        payment_status: PaymentStatus.COMPLETED,
        requires_approval: true,
        course_access_granted: false,
        ikhokha_transaction_id: eftWebhookData.transaction_id,
        payment_reference: eftWebhookData.reference,
        updated_at: expect.any(String)
      });
    });
  });

  describe('Security and Validation', () => {
    it('should reject webhook with invalid signature', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'security_test_txn',
        reference: 'security_test_ref',
        amount: 100.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Success'
      };

      const invalidSignature = 'invalid_signature_hash';

      const result = await webhookHandler.processWebhook(
        webhookData,
        invalidSignature,
        webhookData.timestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');
    });

    it('should reject webhook with expired timestamp', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'expired_test_txn',
        reference: 'expired_test_ref',
        amount: 100.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Success'
      };

      const validSignature = await createValidSignature(webhookData);
      const expiredTimestamp = new Date(Date.now() - 10 * 60 * 1000).toISOString(); // 10 minutes ago

      const result = await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        expiredTimestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');
    });

    it('should validate webhook content structure', async () => {
      const invalidWebhookData = {
        transaction_id: 'content_test_txn',
        reference: 'content_test_ref',
        amount: -100, // Invalid negative amount
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Success'
      } as IkhokhaWebhook;

      const validSignature = await createValidSignature(invalidWebhookData);

      const result = await webhookHandler.processWebhook(
        invalidWebhookData,
        validSignature,
        invalidWebhookData.timestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');
    });
  });

  describe('Retry Mechanism', () => {
    it('should retry on database connection errors', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'retry_test_txn',
        reference: 'retry_test_ref',
        amount: 100.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Success'
      };

      const mockEnrollment = {
        id: 'enrollment_retry_123',
        user_id: 'user_123',
        course_id: 'course_123',
        payment_reference: 'retry_test_ref'
      };

      // First call fails, second succeeds
      let callCount = 0;
      const mockSupabaseChain = {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockImplementation(() => {
              callCount++;
              if (callCount === 1) {
                return Promise.reject(new Error('connection timeout'));
              }
              return Promise.resolve({ data: mockEnrollment, error: null });
            })
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: null })
        })),
        insert: vi.fn().mockResolvedValue({ error: null })
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      const validSignature = await createValidSignature(webhookData);

      const result = await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        webhookData.timestamp
      );

      expect(result.processed).toBe(true);
      expect(callCount).toBe(2); // Verify retry occurred
    });
  });

  describe('Audit Logging', () => {
    it('should log webhook processing for audit trail', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'audit_test_txn',
        reference: 'audit_test_ref',
        amount: 100.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Success'
      };

      const mockEnrollment = {
        id: 'enrollment_audit_123',
        user_id: 'user_123',
        course_id: 'course_123',
        payment_reference: 'audit_test_ref'
      };

      const mockSupabaseChain = {
        select: vi.fn(() => ({
          eq: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockEnrollment, error: null })
          }))
        })),
        update: vi.fn(() => ({
          eq: vi.fn().mockResolvedValue({ error: null })
        })),
        insert: vi.fn().mockResolvedValue({ error: null })
      };

      vi.mocked(supabase.from).mockReturnValue(mockSupabaseChain as any);

      const validSignature = await createValidSignature(webhookData);

      await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        webhookData.timestamp
      );

      // Verify audit log was created
      expect(mockSupabaseChain.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          transaction_id: webhookData.transaction_id,
          enrollment_id: mockEnrollment.id,
          user_id: mockEnrollment.user_id,
          course_id: mockEnrollment.course_id,
          webhook_status: webhookData.status,
          processing_result: 'success'
        })
      );
    });
  });
});

/**
 * Helper function to create valid HMAC signature for testing
 */
async function createValidSignature(webhookData: IkhokhaWebhook): Promise<string> {
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