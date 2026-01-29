/**
 * Tests for IkhokhaPaymentService
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IkhokhaPaymentService } from '../IkhokhaPaymentService';
import { PaymentStatus, PaymentSessionStatus } from '../../types/ikhokha';

// Mock the config module
vi.mock('../../config/ikhokha', () => ({
  ikhokhaConfig: {
    api_url: 'https://test.ikhokha.com',
    api_key: 'test_key',
    api_secret: 'test_secret',
    webhook_secret: 'test_webhook_secret',
    test_mode: true,
    timeout: 30000,
    retry_attempts: 3,
    retry_delay: 1000
  },
  getIkhokhaEndpoints: () => ({
    payment: 'https://test.ikhokha.com/process',
    verify: 'https://test.ikhokha.com/verify',
    refund: 'https://test.ikhokha.com/refund',
    status: 'https://test.ikhokha.com/status',
    webhook: 'https://test.ikhokha.com/webhook'
  }),
  getPaymentUrls: () => ({
    return_url: 'http://localhost:3000/payment/success',
    cancel_url: 'http://localhost:3000/payment/cancel',
    notify_url: 'http://localhost:3000/api/webhooks/ikhokha'
  }),
  isTestMode: () => true
}));

// Mock the webhook handler
vi.mock('../IkhokhaWebhookHandler', () => ({
  ikhokhaWebhookHandler: {
    processWebhook: vi.fn().mockResolvedValue({
      processed: true,
      payment_updated: true,
      enrollment_updated: true
    })
  }
}));

describe('IkhokhaPaymentService', () => {
  let service: IkhokhaPaymentService;

  beforeEach(() => {
    service = new IkhokhaPaymentService();
  });

  describe('initializePayment', () => {
    it('should create a payment session successfully', async () => {
      const amount = 100;
      const reference = 'TEST_REF_123';
      const metadata = {
        enrollmentId: 'enr_123',
        courseId: 'course_123',
        courseName: 'Test Course',
        userEmail: 'test@example.com',
        userName: 'Test User'
      };

      const session = await service.initializePayment(amount, reference, metadata);

      expect(session).toBeDefined();
      expect(session.amount).toBe(amount);
      expect(session.reference).toBe(reference);
      expect(session.currency).toBe('ZAR');
      expect(session.status).toBe(PaymentSessionStatus.CREATED);
      expect(session.payment_url).toContain('simulated=true');
      expect(session.metadata).toEqual(metadata);
    });

    it('should validate payment amount', async () => {
      await expect(service.initializePayment(0, 'TEST_REF')).rejects.toThrow('Invalid payment amount');
      await expect(service.initializePayment(-100, 'TEST_REF')).rejects.toThrow('Invalid payment amount');
      await expect(service.initializePayment(2000000, 'TEST_REF')).rejects.toThrow('Payment amount exceeds limit');
    });

    it('should validate payment reference', async () => {
      await expect(service.initializePayment(100, '')).rejects.toThrow('Payment reference is required');
      await expect(service.initializePayment(100, 'A'.repeat(51))).rejects.toThrow('Payment reference too long');
    });
  });

  describe('processPayment', () => {
    it('should process payment successfully in test mode', async () => {
      const paymentData = {
        sessionId: 'test_session_123',
        amount: 100,
        currency: 'ZAR',
        reference: 'TEST_REF_123',
        customer: {
          email: 'test@example.com',
          name: 'Test User'
        }
      };

      const result = await service.processPayment(paymentData);

      expect(result.success).toBe(true);
      expect(result.status).toBe(PaymentStatus.COMPLETED);
      expect(result.amount).toBe(paymentData.amount);
      expect(result.currency).toBe(paymentData.currency);
      expect(result.reference).toBe(paymentData.reference);
    });

    it('should validate payment data', async () => {
      const invalidPaymentData = {
        sessionId: '',
        amount: 0,
        currency: 'ZAR',
        reference: '',
        customer: {
          email: '',
          name: 'Test User'
        }
      };

      await expect(service.processPayment(invalidPaymentData)).resolves.toMatchObject({
        success: false,
        status: PaymentStatus.FAILED
      });
    });
  });

  describe('verifyPayment', () => {
    it('should verify simulated payment successfully', async () => {
      const paymentId = 'sim_123456789';

      const verification = await service.verifyPayment(paymentId);

      expect(verification.valid).toBe(true);
      expect(verification.payment_id).toBe(paymentId);
      expect(verification.status).toBe(PaymentStatus.COMPLETED);
      expect(verification.currency).toBe('ZAR');
      expect(verification.ikhokha_data).toBeDefined();
    });

    it('should validate payment ID', async () => {
      await expect(service.verifyPayment('')).rejects.toThrow('Payment ID is required');
    });
  });

  describe('handleWebhook', () => {
    it('should process webhook successfully', async () => {
      const webhookData = {
        transaction_id: 'txn_123456789',
        reference: 'TEST_REF_123',
        amount: 100,
        currency: 'ZAR',
        status: 'completed' as const,
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Approved'
      };

      const result = await service.handleWebhook(webhookData);

      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(true);
      expect(result.enrollment_updated).toBe(true);
    });
  });

  describe('validateWebhookSignature', () => {
    it('should validate webhook signature in test mode', () => {
      const webhookData = {
        transaction_id: 'txn_123456789',
        reference: 'TEST_REF_123',
        amount: 100,
        currency: 'ZAR',
        status: 'completed' as const,
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Approved'
      };

      const isValid = service.validateWebhookSignature(webhookData);
      expect(isValid).toBe(true);
    });
  });

  describe('subscribeToPaymentUpdates', () => {
    it('should allow subscribing to payment updates', () => {
      const callback = vi.fn();
      const unsubscribe = service.subscribeToPaymentUpdates(callback);

      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('getTransactionHistory', () => {
    it('should return transaction history', async () => {
      const filters = {
        status: [PaymentStatus.COMPLETED],
        limit: 10
      };

      const transactions = await service.getTransactionHistory(filters);
      expect(Array.isArray(transactions)).toBe(true);
    });
  });

  describe('refundTransaction', () => {
    it('should process refund successfully in test mode', async () => {
      const transactionId = 'txn_123456789';
      const refundAmount = 50;

      const result = await service.refundTransaction(transactionId, refundAmount);

      expect(result.success).toBe(true);
      expect(result.refund_amount).toBe(refundAmount);
      expect(result.refund_id).toBeDefined();
    });

    it('should validate transaction ID', async () => {
      await expect(service.refundTransaction('')).rejects.toThrow('Transaction ID is required');
    });
  });
});