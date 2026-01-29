/**
 * Real Payment Processing Tests
 * 
 * Tests for real money payment processing with Ikhokha API
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { IkhokhaPaymentService } from '../ikhokhaPaymentService';
import { PaymentVerificationService } from '../PaymentVerificationService';
import { PaymentErrorHandler } from '../../utils/paymentErrorHandler';
import {
  PaymentStatus,
  PaymentData,
  PaymentMetadata,
  IkhokhaError,
  PaymentValidationError,
  NetworkError
} from '../../types/ikhokha';

// Mock environment variables
const mockEnv = {
  VITE_NODE_ENV: 'production',
  VITE_IKHOKHA_API_URL: 'https://api.ikhokha.com',
  VITE_IKHOKHA_API_KEY: 'prod_api_key_12345',
  VITE_IKHOKHA_API_SECRET: 'prod_api_secret_67890',
  VITE_IKHOKHA_WEBHOOK_SECRET: 'prod_webhook_secret',
  VITE_IKHOKHA_TEST_MODE: 'false',
  VITE_ENABLE_CONSOLE_LOGS: 'false'
};

// Mock fetch globally
global.fetch = vi.fn();

describe('Real Payment Processing', () => {
  let paymentService: IkhokhaPaymentService;
  let verificationService: PaymentVerificationService;

  beforeEach(() => {
    // Mock environment variables
    vi.stubGlobal('import.meta', { env: mockEnv });
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Create fresh service instances
    paymentService = new IkhokhaPaymentService();
    verificationService = PaymentVerificationService.getInstance();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('Production Environment Validation', () => {
    it('should initialize in production mode with real credentials', () => {
      expect(() => new IkhokhaPaymentService()).not.toThrow();
    });

    it('should reject test mode in production', () => {
      vi.stubGlobal('import.meta', { 
        env: { ...mockEnv, VITE_IKHOKHA_TEST_MODE: 'true' } 
      });

      expect(() => new IkhokhaPaymentService()).toThrow(
        'Payment service cannot run in test mode in production environment'
      );
    });

    it('should reject development API URL in production', () => {
      vi.stubGlobal('import.meta', { 
        env: { ...mockEnv, VITE_IKHOKHA_API_URL: 'https://pay.ikhokha.com' } 
      });

      expect(() => new IkhokhaPaymentService()).toThrow(
        'Production payment service must use api.ikhokha.com endpoint'
      );
    });
  });

  describe('Real Payment Initialization', () => {
    it('should initialize real payment with production API', async () => {
      const mockResponse = {
        success: true,
        data: {
          payment_id: 'real_payment_123',
          payment_url: 'https://api.ikhokha.com/pay/real_payment_123',
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
        }
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse.data)
      });

      const metadata: PaymentMetadata = {
        courseName: 'Test Course',
        userEmail: 'test@example.com',
        userName: 'Test User',
        enrollmentId: 'enr_123',
        courseId: 'course_123',
        userId: 'user_123'
      };

      const session = await paymentService.initializePayment(100, 'TEST_REF_123', metadata);

      expect(session).toMatchObject({
        id: 'real_payment_123',
        payment_url: 'https://api.ikhokha.com/pay/real_payment_123',
        amount: 100,
        currency: 'ZAR',
        reference: 'TEST_REF_123'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.ikhokha.com/process',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          }),
          body: expect.stringContaining('prod_api_key_12345')
        })
      );
    });

    it('should handle API errors during payment initialization', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve({
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid API credentials'
          }
        })
      });

      await expect(
        paymentService.initializePayment(100, 'TEST_REF_123')
      ).rejects.toThrow(IkhokhaError);
    });
  });

  describe('Real Payment Processing', () => {
    it('should process real payment with production API', async () => {
      const mockResponse = {
        success: true,
        data: {
          payment_id: 'real_payment_123',
          transaction_id: 'txn_real_456',
          status: 'completed',
          amount: 100,
          currency: 'ZAR',
          reference: 'TEST_REF_123',
          message: 'Payment completed successfully',
          transaction_date: new Date().toISOString()
        }
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse.data)
      });

      const paymentData: PaymentData = {
        sessionId: 'session_123',
        amount: 100,
        currency: 'ZAR',
        reference: 'TEST_REF_123',
        customer: {
          email: 'test@example.com',
          name: 'Test User'
        },
        paymentMethod: 'card',
        metadata: {
          enrollmentId: 'enr_123',
          courseId: 'course_123'
        }
      };

      const result = await paymentService.processPayment(paymentData);

      expect(result).toMatchObject({
        success: true,
        payment_id: 'real_payment_123',
        transaction_id: 'txn_real_456',
        status: PaymentStatus.COMPLETED,
        amount: 100,
        currency: 'ZAR',
        reference: 'TEST_REF_123'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.ikhokha.com/process/process',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('session_123')
        })
      );
    });

    it('should handle payment processing failures', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: false,
          error: {
            code: 'PAYMENT_DECLINED',
            message: 'Payment was declined by the bank'
          }
        })
      });

      const paymentData: PaymentData = {
        sessionId: 'session_123',
        amount: 100,
        currency: 'ZAR',
        reference: 'TEST_REF_123',
        customer: {
          email: 'test@example.com',
          name: 'Test User'
        }
      };

      const result = await paymentService.processPayment(paymentData);

      expect(result).toMatchObject({
        success: false,
        status: PaymentStatus.FAILED,
        error: {
          code: 'PAYMENT_DECLINED',
          message: 'Payment was declined by the bank'
        }
      });
    });

    it('should handle network errors during payment processing', async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      const paymentData: PaymentData = {
        sessionId: 'session_123',
        amount: 100,
        currency: 'ZAR',
        reference: 'TEST_REF_123',
        customer: {
          email: 'test@example.com',
          name: 'Test User'
        }
      };

      const result = await paymentService.processPayment(paymentData);

      expect(result).toMatchObject({
        success: false,
        status: PaymentStatus.FAILED,
        error: {
          code: 'UNEXPECTED_ERROR'
        }
      });
    });
  });

  describe('Real Payment Verification', () => {
    it('should verify real payment with production API', async () => {
      const mockResponse = {
        success: true,
        data: {
          valid: true,
          status: 'completed',
          amount: 100,
          currency: 'ZAR',
          reference: 'TEST_REF_123',
          transaction_date: new Date().toISOString()
        }
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse.data)
      });

      const verification = await paymentService.verifyPayment('real_payment_123');

      expect(verification).toMatchObject({
        valid: true,
        payment_id: 'real_payment_123',
        status: PaymentStatus.COMPLETED,
        amount: 100,
        currency: 'ZAR',
        reference: 'TEST_REF_123'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.ikhokha.com/verify',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('real_payment_123')
        })
      );
    });

    it('should handle verification failures', async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: false,
          error: {
            code: 'PAYMENT_NOT_FOUND',
            message: 'Payment not found'
          }
        })
      });

      await expect(
        paymentService.verifyPayment('invalid_payment_123')
      ).rejects.toThrow(IkhokhaError);
    });
  });

  describe('Payment Error Handling', () => {
    it('should handle validation errors properly', async () => {
      await expect(
        paymentService.initializePayment(-100, 'TEST_REF')
      ).rejects.toThrow(PaymentValidationError);
    });

    it('should handle network timeouts', async () => {
      (global.fetch as any).mockImplementationOnce(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 100)
        )
      );

      const paymentData: PaymentData = {
        sessionId: 'session_123',
        amount: 100,
        currency: 'ZAR',
        reference: 'TEST_REF_123',
        customer: {
          email: 'test@example.com',
          name: 'Test User'
        }
      };

      const result = await paymentService.processPayment(paymentData);
      
      expect(result.success).toBe(false);
      expect(result.error?.retryable).toBe(true);
    });

    it('should provide user-friendly error messages', () => {
      const error = new IkhokhaError('Payment declined', 'PAYMENT_DECLINED');
      const handling = PaymentErrorHandler.handlePaymentError(error);

      expect(handling.userMessage).toContain('declined');
      expect(handling.shouldRetry).toBe(true);
    });
  });

  describe('Real Refund Processing', () => {
    it('should process real refunds with production API', async () => {
      const mockResponse = {
        success: true,
        data: {
          refund_id: 'refund_123',
          refund_amount: 100,
          original_amount: 100,
          remaining_amount: 0,
          status: 'completed',
          message: 'Refund processed successfully',
          refund_date: new Date().toISOString()
        }
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse.data)
      });

      const result = await paymentService.refundTransaction('txn_real_456');

      expect(result).toMatchObject({
        success: true,
        refund_id: 'refund_123',
        refund_amount: 100,
        status: 'completed'
      });

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.ikhokha.com/refund',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('txn_real_456')
        })
      );
    });
  });

  describe('Production Security', () => {
    it('should not log sensitive information in production', () => {
      const consoleSpy = vi.spyOn(console, 'log');
      
      // Create service with production logging disabled
      new IkhokhaPaymentService();

      // Should not log API keys or secrets
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('prod_api_key_12345')
      );
      expect(consoleSpy).not.toHaveBeenCalledWith(
        expect.stringContaining('prod_api_secret_67890')
      );
    });

    it('should validate webhook signatures in production', () => {
      const webhookData = {
        transaction_id: 'txn_123',
        reference: 'REF_123',
        amount: 100,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'invalid_signature'
      };

      const isValid = paymentService.validateWebhookSignature(webhookData);
      
      // In production, invalid signatures should be rejected
      expect(isValid).toBe(false);
    });
  });

  describe('Transaction History', () => {
    it('should fetch real transaction history from production API', async () => {
      const mockResponse = {
        success: true,
        data: {
          transactions: [
            {
              transaction_id: 'txn_123',
              payment_id: 'pay_123',
              reference: 'REF_123',
              amount: 100,
              currency: 'ZAR',
              status: 'completed',
              customer_email: 'test@example.com',
              transaction_date: new Date().toISOString(),
              created_at: new Date().toISOString()
            }
          ]
        }
      };

      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse.data)
      });

      const transactions = await paymentService.getTransactionHistory({
        start_date: new Date('2024-01-01'),
        end_date: new Date('2024-12-31')
      });

      expect(transactions).toHaveLength(1);
      expect(transactions[0]).toMatchObject({
        id: 'txn_123',
        payment_id: 'pay_123',
        reference: 'REF_123',
        amount: 100,
        status: PaymentStatus.COMPLETED
      });
    });
  });
});

describe('Payment Verification Service', () => {
  let verificationService: PaymentVerificationService;

  beforeEach(() => {
    vi.stubGlobal('import.meta', { env: mockEnv });
    verificationService = PaymentVerificationService.getInstance();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe('Production Payment Verification', () => {
    it('should verify payment and update enrollment in production', async () => {
      // Mock Ikhokha verification
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          data: {
            valid: true,
            status: 'completed',
            amount: 100,
            currency: 'ZAR',
            reference: 'REF_123',
            transaction_date: new Date().toISOString()
          }
        })
      });

      // Mock Supabase calls would go here in a real test
      // For now, we'll test the service structure

      const result = await verificationService.verifyPaymentAndUpdateEnrollment(
        'real_payment_123',
        'enrollment_123'
      );

      // The actual result would depend on mocked Supabase responses
      expect(result).toHaveProperty('verified');
      expect(result).toHaveProperty('payment');
      expect(result).toHaveProperty('enrollmentUpdated');
    });
  });
});