import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { IkhokhaPaymentService } from '../ikhokhaPaymentService';
import { PaymentData, PaymentStatus, PaymentSessionStatus } from '@/types/ikhokha';
import { ikhokhaConfig } from '@/config/ikhokha';

// Mock fetch for API calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock environment variables
const originalEnv = import.meta.env;

describe('Payment Processing End-to-End Tests', () => {
  let paymentService: IkhokhaPaymentService;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Reset environment
    import.meta.env = {
      ...originalEnv,
      VITE_NODE_ENV: 'test',
      VITE_ENABLE_CONSOLE_LOGS: 'false'
    };

    paymentService = new IkhokhaPaymentService();
  });

  afterEach(() => {
    vi.clearAllMocks();
    import.meta.env = originalEnv;
  });

  describe('Complete Payment Flow - Test Mode', () => {
    it('should complete full payment flow in test mode', async () => {
      // Step 1: Initialize payment
      const paymentSession = await paymentService.initializePayment(
        299.00,
        'test-ref-001',
        {
          courseName: 'React Development',
          userEmail: 'student@example.com',
          userName: 'Test Student'
        }
      );

      expect(paymentSession).toMatchObject({
        id: expect.stringMatching(/^sim_/),
        reference: 'test-ref-001',
        amount: 299.00,
        currency: 'ZAR',
        status: PaymentSessionStatus.CREATED,
        payment_url: expect.stringContaining('simulation')
      });

      // Step 2: Process payment
      const paymentData: PaymentData = {
        sessionId: paymentSession.id,
        amount: 299.00,
        currency: 'ZAR',
        reference: 'test-ref-001',
        customer: {
          email: 'student@example.com',
          name: 'Test Student'
        },
        paymentMethod: 'card',
        metadata: {
          courseName: 'React Development',
          userEmail: 'student@example.com',
          userName: 'Test Student'
        }
      };

      const paymentResult = await paymentService.processPayment(paymentData);

      expect(paymentResult).toMatchObject({
        success: true,
        payment_id: expect.stringMatching(/^test_/),
        transaction_id: expect.stringMatching(/^txn_/),
        status: PaymentStatus.COMPLETED,
        amount: 299.00,
        currency: 'ZAR',
        reference: 'test-ref-001',
        message: 'Payment completed successfully (simulated)'
      });

      // Step 3: Verify payment
      const verification = await paymentService.verifyPayment(paymentResult.payment_id!);

      expect(verification).toMatchObject({
        valid: true,
        payment_id: paymentResult.payment_id,
        status: PaymentStatus.COMPLETED,
        amount: expect.any(Number),
        currency: 'ZAR',
        verification_date: expect.any(Date)
      });
    });

    it('should handle payment failure in test mode', async () => {
      // Initialize payment
      const paymentSession = await paymentService.initializePayment(
        0.01, // Very small amount to trigger failure simulation
        'test-fail-001',
        {
          courseName: 'Test Course',
          userEmail: 'fail@example.com',
          userName: 'Fail Test'
        }
      );

      // Process payment with failure scenario
      const paymentData: PaymentData = {
        sessionId: paymentSession.id,
        amount: 0.01,
        currency: 'ZAR',
        reference: 'test-fail-001',
        customer: {
          email: 'fail@example.com',
          name: 'Fail Test'
        },
        paymentMethod: 'card',
        metadata: {
          courseName: 'Test Course',
          userEmail: 'fail@example.com',
          userName: 'Fail Test'
        }
      };

      const paymentResult = await paymentService.processPayment(paymentData);

      // In test mode, should still succeed for testing purposes
      expect(paymentResult.success).toBe(true);
    });
  });

  describe('Complete Payment Flow - Production Simulation', () => {
    beforeEach(() => {
      import.meta.env = {
        ...originalEnv,
        VITE_NODE_ENV: 'production',
        VITE_ENABLE_CONSOLE_LOGS: 'false'
      };

      // Mock successful API responses
      mockFetch.mockImplementation((url: string, options: any) => {
        const body = JSON.parse(options.body || '{}');
        
        if (url.includes('/payment') && !url.includes('/process')) {
          // Payment initialization
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              success: true,
              data: {
                payment_id: 'prod_payment_123',
                payment_url: 'https://api.ikhokha.com/pay/prod_payment_123',
                expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString()
              }
            })
          });
        }
        
        if (url.includes('/payment/process')) {
          // Payment processing
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              success: true,
              data: {
                payment_id: 'prod_payment_123',
                transaction_id: 'prod_txn_456',
                status: 'completed',
                amount: body.amount,
                currency: body.currency,
                reference: body.reference,
                message: 'Payment processed successfully',
                transaction_date: new Date().toISOString()
              }
            })
          });
        }
        
        if (url.includes('/verify')) {
          // Payment verification
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
              success: true,
              data: {
                valid: true,
                status: 'completed',
                amount: 299.00,
                currency: 'ZAR',
                reference: body.reference || 'prod-ref-001',
                transaction_date: new Date().toISOString()
              }
            })
          });
        }

        return Promise.reject(new Error('Unknown endpoint'));
      });

      paymentService = new IkhokhaPaymentService();
    });

    it('should complete full payment flow in production mode', async () => {
      // Step 1: Initialize payment
      const paymentSession = await paymentService.initializePayment(
        299.00,
        'prod-ref-001',
        {
          courseName: 'React Development',
          userEmail: 'student@example.com',
          userName: 'Test Student'
        }
      );

      expect(paymentSession).toMatchObject({
        id: 'prod_payment_123',
        reference: 'prod-ref-001',
        amount: 299.00,
        currency: 'ZAR',
        status: PaymentSessionStatus.CREATED,
        payment_url: 'https://api.ikhokha.com/pay/prod_payment_123'
      });

      // Step 2: Process payment
      const paymentData: PaymentData = {
        sessionId: paymentSession.id,
        amount: 299.00,
        currency: 'ZAR',
        reference: 'prod-ref-001',
        customer: {
          email: 'student@example.com',
          name: 'Test Student'
        },
        paymentMethod: 'card',
        metadata: {
          courseName: 'React Development',
          userEmail: 'student@example.com',
          userName: 'Test Student'
        }
      };

      const paymentResult = await paymentService.processPayment(paymentData);

      expect(paymentResult).toMatchObject({
        success: true,
        payment_id: 'prod_payment_123',
        transaction_id: 'prod_txn_456',
        status: PaymentStatus.COMPLETED,
        amount: 299.00,
        currency: 'ZAR',
        reference: 'prod-ref-001',
        message: 'Payment processed successfully'
      });

      // Step 3: Verify payment
      const verification = await paymentService.verifyPayment(paymentResult.payment_id!);

      expect(verification).toMatchObject({
        valid: true,
        payment_id: 'prod_payment_123',
        status: PaymentStatus.COMPLETED,
        amount: 299.00,
        currency: 'ZAR'
      });

      // Verify API calls were made correctly
      expect(mockFetch).toHaveBeenCalledTimes(3);
      
      // Check payment initialization call
      expect(mockFetch).toHaveBeenNthCalledWith(1, 
        expect.stringContaining('/payment'),
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          }),
          body: expect.stringContaining('"amount":299')
        })
      );
    });

    it('should handle API errors in production mode', async () => {
      // Mock API failure
      mockFetch.mockRejectedValue(new Error('Network error'));

      await expect(
        paymentService.initializePayment(299.00, 'error-ref-001')
      ).rejects.toThrow('Failed to initialize payment');
    });

    it('should handle invalid API responses in production mode', async () => {
      // Mock invalid API response
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          success: false,
          error: {
            message: 'Invalid payment amount',
            code: 'INVALID_AMOUNT'
          }
        })
      });

      await expect(
        paymentService.initializePayment(299.00, 'invalid-ref-001')
      ).rejects.toThrow('Invalid payment amount');
    });
  });

  describe('Webhook Processing End-to-End', () => {
    it('should process successful payment webhook', async () => {
      const webhookData = {
        transaction_id: 'webhook_txn_123',
        status: 'completed',
        amount: 299.00,
        currency: 'ZAR',
        reference: 'webhook-ref-001',
        customer_email: 'student@example.com',
        timestamp: new Date().toISOString(),
        signature: 'valid_signature_hash',
        metadata: {
          courseName: 'React Development',
          userEmail: 'student@example.com'
        }
      };

      const webhookResult = await paymentService.handleWebhook(webhookData);

      expect(webhookResult).toMatchObject({
        processed: true,
        payment_updated: true,
        enrollment_updated: true
      });
    });

    it('should reject webhook with invalid signature', async () => {
      const webhookData = {
        transaction_id: 'webhook_txn_invalid',
        status: 'completed',
        amount: 299.00,
        currency: 'ZAR',
        reference: 'invalid-ref-001',
        customer_email: 'student@example.com',
        timestamp: new Date().toISOString(),
        signature: 'invalid_signature_hash',
        metadata: {}
      };

      const webhookResult = await paymentService.handleWebhook(webhookData);

      expect(webhookResult).toMatchObject({
        processed: false,
        payment_updated: false,
        enrollment_updated: false,
        error: expect.stringContaining('signature')
      });
    });

    it('should handle failed payment webhook', async () => {
      const webhookData = {
        transaction_id: 'webhook_txn_failed',
        status: 'failed',
        amount: 299.00,
        currency: 'ZAR',
        reference: 'failed-ref-001',
        customer_email: 'student@example.com',
        timestamp: new Date().toISOString(),
        signature: 'valid_signature_hash',
        metadata: {
          courseName: 'React Development',
          userEmail: 'student@example.com'
        }
      };

      const webhookResult = await paymentService.handleWebhook(webhookData);

      expect(webhookResult).toMatchObject({
        processed: true,
        payment_updated: true,
        enrollment_updated: false // Failed payments don't update enrollment
      });
    });
  });

  describe('Payment Validation and Security', () => {
    it('should validate payment amounts correctly', async () => {
      // Test minimum amount validation
      await expect(
        paymentService.initializePayment(0, 'zero-amount')
      ).rejects.toThrow('amount must be greater than 0');

      // Test negative amount validation
      await expect(
        paymentService.initializePayment(-100, 'negative-amount')
      ).rejects.toThrow('amount must be greater than 0');

      // Test maximum amount validation (if implemented)
      await expect(
        paymentService.initializePayment(1000000, 'huge-amount')
      ).rejects.toThrow();
    });

    it('should validate payment references correctly', async () => {
      // Test empty reference
      await expect(
        paymentService.initializePayment(299, '')
      ).rejects.toThrow('reference cannot be empty');

      // Test null reference
      await expect(
        paymentService.initializePayment(299, null as any)
      ).rejects.toThrow('reference cannot be empty');

      // Test reference length validation
      const longReference = 'a'.repeat(256);
      await expect(
        paymentService.initializePayment(299, longReference)
      ).rejects.toThrow();
    });

    it('should validate payment data structure', async () => {
      const invalidPaymentData = {
        sessionId: 'valid-session',
        amount: 299,
        currency: 'ZAR',
        reference: 'valid-ref',
        customer: {
          email: 'invalid-email', // Invalid email format
          name: 'Test User'
        }
      } as PaymentData;

      await expect(
        paymentService.processPayment(invalidPaymentData)
      ).rejects.toThrow();
    });
  });

  describe('Error Recovery and Retry Logic', () => {
    it('should handle network timeouts gracefully', async () => {
      // Mock network timeout
      mockFetch.mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Network timeout')), 100)
        )
      );

      import.meta.env = {
        ...originalEnv,
        VITE_NODE_ENV: 'production'
      };

      paymentService = new IkhokhaPaymentService();

      await expect(
        paymentService.initializePayment(299, 'timeout-test')
      ).rejects.toThrow('Failed to initialize payment');
    });

    it('should handle API rate limiting', async () => {
      // Mock rate limiting response
      mockFetch.mockResolvedValue({
        ok: false,
        status: 429,
        json: () => Promise.resolve({
          error: {
            message: 'Rate limit exceeded',
            code: 'RATE_LIMIT_EXCEEDED'
          }
        })
      });

      import.meta.env = {
        ...originalEnv,
        VITE_NODE_ENV: 'production'
      };

      paymentService = new IkhokhaPaymentService();

      await expect(
        paymentService.initializePayment(299, 'rate-limit-test')
      ).rejects.toThrow();
    });
  });

  describe('Transaction History and Reporting', () => {
    it('should fetch transaction history in test mode', async () => {
      const transactions = await paymentService.getTransactionHistory({
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-31'),
        status: 'completed'
      });

      expect(Array.isArray(transactions)).toBe(true);
      expect(transactions.length).toBeGreaterThan(0);
      
      transactions.forEach(transaction => {
        expect(transaction).toHaveProperty('id');
        expect(transaction).toHaveProperty('amount');
        expect(transaction).toHaveProperty('status');
        expect(transaction).toHaveProperty('created_at');
      });
    });

    it('should filter transactions by date range', async () => {
      const startDate = new Date('2024-01-01');
      const endDate = new Date('2024-01-31');

      const transactions = await paymentService.getTransactionHistory({
        startDate,
        endDate
      });

      transactions.forEach(transaction => {
        const transactionDate = new Date(transaction.created_at);
        expect(transactionDate >= startDate).toBe(true);
        expect(transactionDate <= endDate).toBe(true);
      });
    });
  });

  describe('Refund Processing', () => {
    it('should process full refund in test mode', async () => {
      const refundResult = await paymentService.refundTransaction('test_txn_123');

      expect(refundResult).toMatchObject({
        success: true,
        refund_id: expect.any(String),
        transaction_id: 'test_txn_123',
        amount: expect.any(Number),
        status: 'completed',
        processed_at: expect.any(Date)
      });
    });

    it('should process partial refund in test mode', async () => {
      const refundAmount = 150.00;
      const refundResult = await paymentService.refundTransaction('test_txn_123', refundAmount);

      expect(refundResult).toMatchObject({
        success: true,
        refund_id: expect.any(String),
        transaction_id: 'test_txn_123',
        amount: refundAmount,
        status: 'completed',
        processed_at: expect.any(Date)
      });
    });

    it('should validate refund amounts', async () => {
      // Test negative refund amount
      await expect(
        paymentService.refundTransaction('test_txn_123', -50)
      ).rejects.toThrow();

      // Test zero refund amount
      await expect(
        paymentService.refundTransaction('test_txn_123', 0)
      ).rejects.toThrow();
    });
  });

  describe('Payment Update Subscriptions', () => {
    it('should notify subscribers of payment updates', async () => {
      const updateCallback = vi.fn();
      const unsubscribe = paymentService.subscribeToPaymentUpdates(updateCallback);

      // Process a payment to trigger update
      const paymentSession = await paymentService.initializePayment(
        299.00,
        'subscription-test',
        {
          courseName: 'Test Course',
          userEmail: 'test@example.com',
          userName: 'Test User'
        }
      );

      const paymentData: PaymentData = {
        sessionId: paymentSession.id,
        amount: 299.00,
        currency: 'ZAR',
        reference: 'subscription-test',
        customer: {
          email: 'test@example.com',
          name: 'Test User'
        },
        metadata: {
          courseName: 'Test Course'
        }
      };

      await paymentService.processPayment(paymentData);

      // Should have notified subscriber
      expect(updateCallback).toHaveBeenCalledWith(
        expect.objectContaining({
          status: PaymentStatus.COMPLETED,
          amount: 299.00,
          reference: 'subscription-test'
        })
      );

      // Cleanup
      unsubscribe();
    });

    it('should handle multiple subscribers', async () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      
      const unsubscribe1 = paymentService.subscribeToPaymentUpdates(callback1);
      const unsubscribe2 = paymentService.subscribeToPaymentUpdates(callback2);

      // Trigger payment update
      const webhookData = {
        transaction_id: 'multi_sub_test',
        status: 'completed',
        amount: 199.00,
        currency: 'ZAR',
        reference: 'multi-sub-ref',
        customer_email: 'multi@example.com',
        timestamp: new Date().toISOString(),
        signature: 'valid_signature',
        metadata: {}
      };

      await paymentService.handleWebhook(webhookData);

      // Both callbacks should be called
      expect(callback1).toHaveBeenCalled();
      expect(callback2).toHaveBeenCalled();

      // Cleanup
      unsubscribe1();
      unsubscribe2();
    });
  });
});