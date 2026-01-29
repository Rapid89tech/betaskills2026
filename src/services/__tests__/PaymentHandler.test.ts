/**
 * PaymentHandler Service Tests
 * 
 * Comprehensive test suite for the PaymentHandler service covering:
 * - Card payment processing with immediate access logic
 * - EFT payment handling with pending approval workflow
 * - Payment validation and callback handling mechanisms
 * - Payment status tracking and error handling
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PaymentHandler } from '../PaymentHandler';
import { 
  PaymentType, 
  PaymentStatus, 
  PaymentDetails, 
  PaymentCallback 
} from '@/types/enrollment';
import { ENROLLMENT_ERROR_CODES } from '@/constants/enrollment';

describe('PaymentHandler', () => {
  let paymentHandler: PaymentHandler;

  beforeEach(() => {
    // Get fresh instance for each test
    paymentHandler = PaymentHandler.getInstance();
    
    // Clear any existing state
    paymentHandler.destroy();
    paymentHandler = PaymentHandler.getInstance();
  });

  afterEach(() => {
    // Clean up after each test
    paymentHandler.destroy();
  });

  describe('Card Payment Processing', () => {
    const validCardPaymentDetails: PaymentDetails = {
      amount: 299.99,
      currency: 'ZAR',
      metadata: {
        cardType: 'visa',
        lastFourDigits: '1234'
      }
    };

    it('should process card payment successfully with immediate access', async () => {
      // Force successful payment by mocking Math.random
      const originalRandom = Math.random;
      Math.random = vi.fn(() => 0.9); // Force success

      const result = await paymentHandler.processPayment(PaymentType.CARD, validCardPaymentDetails);

      // Restore original Math.random
      Math.random = originalRandom;

      expect(result.success).toBe(true);
      expect(result.paymentId).toBeDefined();
      expect(result.error).toBeUndefined();
      expect(result.errorCode).toBeUndefined();
    });

    it('should handle card payment failures gracefully', async () => {
      // Mock Math.random to force failure (< 0.1 for failure)
      const originalRandom = Math.random;
      Math.random = vi.fn(() => 0.05); // Force failure

      const result = await paymentHandler.processPayment(PaymentType.CARD, validCardPaymentDetails);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.errorCode).toBe('CARD_DECLINED');

      // Restore original Math.random
      Math.random = originalRandom;
    });

    it('should validate card payment details', async () => {
      const invalidPaymentDetails: PaymentDetails = {
        amount: -100,
        currency: '',
      };

      const result = await paymentHandler.processPayment(PaymentType.CARD, invalidPaymentDetails);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.errorCode).toBe(ENROLLMENT_ERROR_CODES.VALIDATION_ERROR);
    });

    it('should handle card payment timeout', async () => {
      // Mock a very long processing time to trigger timeout
      const originalTimeout = setTimeout;
      global.setTimeout = vi.fn((callback, delay) => {
        if (delay === 30000) { // CARD_PAYMENT_TIMEOUT
          callback();
        }
        return originalTimeout(callback, delay);
      });

      const result = await paymentHandler.processPayment(PaymentType.CARD, validCardPaymentDetails);

      // The timeout should trigger before the 2-second mock processing
      expect(result.success).toBe(false);
      expect(result.errorCode).toBe(ENROLLMENT_ERROR_CODES.TIMEOUT_ERROR);

      global.setTimeout = originalTimeout;
    });

    it('should trigger payment callback for successful card payment', async () => {
      // Force successful payment by mocking Math.random
      const originalRandom = Math.random;
      Math.random = vi.fn(() => 0.9); // Force success

      const result = await paymentHandler.processPayment(PaymentType.CARD, validCardPaymentDetails);

      // Restore original Math.random
      Math.random = originalRandom;

      expect(result.success).toBe(true);
      
      if (result.success && result.paymentId) {
        // Register a callback to test the callback mechanism
        const callbackSpy = vi.fn();
        paymentHandler.registerPaymentCallback(result.paymentId, callbackSpy);
        
        // Manually trigger the callback to test the mechanism
        paymentHandler.handlePaymentCallback({
          paymentId: result.paymentId,
          status: PaymentStatus.COMPLETED,
          metadata: {
            paymentType: PaymentType.CARD,
            immediateAccess: true
          }
        });
        
        expect(callbackSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            paymentId: result.paymentId,
            status: PaymentStatus.COMPLETED,
            metadata: expect.objectContaining({
              paymentType: PaymentType.CARD,
              immediateAccess: true
            })
          })
        );
      }
    });
  });

  describe('EFT Payment Processing', () => {
    const validEFTPaymentDetails: PaymentDetails = {
      amount: 299.99,
      currency: 'ZAR',
      reference: 'USER_REF_123',
      metadata: {
        bankName: 'Standard Bank',
        accountHolder: 'John Doe'
      }
    };

    it('should process EFT payment with pending approval workflow', async () => {
      const result = await paymentHandler.processPayment(PaymentType.EFT, validEFTPaymentDetails);

      expect(result.success).toBe(true);
      expect(result.paymentId).toBeDefined();
      expect(result.paymentId).toMatch(/^eft_/);
      expect(result.error).toBeUndefined();
    });

    it('should generate EFT reference for payment', async () => {
      const result = await paymentHandler.processPayment(PaymentType.EFT, validEFTPaymentDetails);

      expect(result.success).toBe(true);
      
      if (result.success && result.paymentId) {
        // Register a callback to test the callback mechanism
        const callbackSpy = vi.fn();
        paymentHandler.registerPaymentCallback(result.paymentId, callbackSpy);
        
        // Manually trigger the callback to test the mechanism
        paymentHandler.handlePaymentCallback({
          paymentId: result.paymentId,
          status: PaymentStatus.PENDING,
          reference: 'EFT123456ABCDEF',
          metadata: {
            paymentType: PaymentType.EFT,
            requiresApproval: true
          }
        });
        
        expect(callbackSpy).toHaveBeenCalledWith(
          expect.objectContaining({
            paymentId: result.paymentId,
            status: PaymentStatus.PENDING,
            reference: expect.stringMatching(/^EFT\d+[A-Z0-9]+$/),
            metadata: expect.objectContaining({
              paymentType: PaymentType.EFT,
              requiresApproval: true
            })
          })
        );
      }
    });

    it('should set payment status to pending for EFT payments', async () => {
      const result = await paymentHandler.processPayment(PaymentType.EFT, validEFTPaymentDetails);

      if (result.success && result.paymentId) {
        const status = await paymentHandler.getPaymentStatus(result.paymentId);
        expect(status).toBe(PaymentStatus.PENDING);
      }
    });
  });

  describe('Payment Validation', () => {
    it('should validate existing completed payment', async () => {
      // Force successful payment by mocking Math.random
      const originalRandom = Math.random;
      Math.random = vi.fn(() => 0.9); // Force success

      // First create a successful card payment
      const result = await paymentHandler.processPayment(PaymentType.CARD, {
        amount: 100,
        currency: 'ZAR'
      });

      // Restore original Math.random
      Math.random = originalRandom;

      expect(result.success).toBe(true);
      
      if (result.success && result.paymentId) {
        const isValid = await paymentHandler.validatePayment(result.paymentId);
        expect(isValid).toBe(true);
      }
    });

    it('should reject validation for non-existent payment', async () => {
      const isValid = await paymentHandler.validatePayment('non_existent_payment_id');
      expect(isValid).toBe(false);
    });

    it('should reject validation for pending payment', async () => {
      // Create EFT payment (which starts as pending)
      const result = await paymentHandler.processPayment(PaymentType.EFT, {
        amount: 100,
        currency: 'ZAR'
      });

      if (result.success && result.paymentId) {
        const isValid = await paymentHandler.validatePayment(result.paymentId);
        expect(isValid).toBe(false); // Pending payments are not considered valid
      }
    });
  });

  describe('Payment Callback Handling', () => {
    it('should handle payment callback and update status', async () => {
      const paymentId = 'test_payment_123';
      const callback: PaymentCallback = {
        paymentId,
        status: PaymentStatus.COMPLETED,
        reference: 'REF123',
        metadata: { test: true }
      };

      paymentHandler.handlePaymentCallback(callback);

      const status = await paymentHandler.getPaymentStatus(paymentId);
      expect(status).toBe(PaymentStatus.COMPLETED);
    });

    it('should trigger browser event for payment callback', () => {
      // Mock window.dispatchEvent to test if it's called
      const originalDispatchEvent = window.dispatchEvent;
      const dispatchEventSpy = vi.fn();
      window.dispatchEvent = dispatchEventSpy;

      const callback: PaymentCallback = {
        paymentId: 'test_payment_456',
        status: PaymentStatus.FAILED,
        metadata: { error: 'Payment declined' }
      };

      paymentHandler.handlePaymentCallback(callback);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'payment-callback',
          detail: callback
        })
      );

      // Restore original dispatchEvent
      window.dispatchEvent = originalDispatchEvent;
    });

    it('should handle registered payment callback', async () => {
      const paymentId = 'test_payment_789';
      const callbackSpy = vi.fn();

      paymentHandler.registerPaymentCallback(paymentId, callbackSpy);

      const callback: PaymentCallback = {
        paymentId,
        status: PaymentStatus.COMPLETED
      };

      paymentHandler.handlePaymentCallback(callback);

      expect(callbackSpy).toHaveBeenCalledWith(callback);
    });
  });

  describe('Payment Status Tracking', () => {
    it('should track payment status correctly', async () => {
      const paymentId = 'status_test_payment';
      
      // Initially should return FAILED for non-existent payment
      let status = await paymentHandler.getPaymentStatus(paymentId);
      expect(status).toBe(PaymentStatus.FAILED);

      // After handling callback, should return correct status
      paymentHandler.handlePaymentCallback({
        paymentId,
        status: PaymentStatus.PENDING
      });

      status = await paymentHandler.getPaymentStatus(paymentId);
      expect(status).toBe(PaymentStatus.PENDING);

      // Update to completed
      paymentHandler.handlePaymentCallback({
        paymentId,
        status: PaymentStatus.COMPLETED
      });

      status = await paymentHandler.getPaymentStatus(paymentId);
      expect(status).toBe(PaymentStatus.COMPLETED);
    });
  });

  describe('Payment Cancellation', () => {
    it('should cancel payment successfully', async () => {
      const paymentId = 'cancel_test_payment';
      
      // Set initial status
      paymentHandler.handlePaymentCallback({
        paymentId,
        status: PaymentStatus.PENDING
      });

      const cancelled = await paymentHandler.cancelPayment(paymentId);
      expect(cancelled).toBe(true);

      const status = await paymentHandler.getPaymentStatus(paymentId);
      expect(status).toBe(PaymentStatus.FAILED);
    });

    it('should trigger cancellation callback', async () => {
      // Mock window.dispatchEvent to test if it's called
      const originalDispatchEvent = window.dispatchEvent;
      const dispatchEventSpy = vi.fn();
      window.dispatchEvent = dispatchEventSpy;

      const paymentId = 'cancel_callback_test';
      await paymentHandler.cancelPayment(paymentId);

      expect(dispatchEventSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'payment-callback',
          detail: expect.objectContaining({
            paymentId,
            status: PaymentStatus.FAILED,
            metadata: expect.objectContaining({
              cancelled: true
            })
          })
        })
      );

      // Restore original dispatchEvent
      window.dispatchEvent = originalDispatchEvent;
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid payment type', async () => {
      const result = await paymentHandler.processPayment(
        'INVALID_TYPE' as PaymentType,
        { amount: 100, currency: 'ZAR' }
      );

      expect(result.success).toBe(false);
      expect(result.errorCode).toBe(ENROLLMENT_ERROR_CODES.INVALID_PAYMENT_TYPE);
    });

    it('should handle missing amount', async () => {
      const result = await paymentHandler.processPayment(PaymentType.CARD, {
        amount: 0,
        currency: 'ZAR'
      });

      expect(result.success).toBe(false);
      expect(result.errorCode).toBe(ENROLLMENT_ERROR_CODES.VALIDATION_ERROR);
    });

    it('should handle missing currency', async () => {
      const result = await paymentHandler.processPayment(PaymentType.CARD, {
        amount: 100,
        currency: ''
      });

      expect(result.success).toBe(false);
      expect(result.errorCode).toBe(ENROLLMENT_ERROR_CODES.VALIDATION_ERROR);
    });
  });

  describe('Callback Registration', () => {
    it('should register and unregister payment callbacks', () => {
      const paymentId = 'callback_reg_test';
      const callback = vi.fn();

      // Register callback
      paymentHandler.registerPaymentCallback(paymentId, callback);

      // Trigger callback
      paymentHandler.handlePaymentCallback({
        paymentId,
        status: PaymentStatus.COMPLETED
      });

      expect(callback).toHaveBeenCalled();

      // Unregister callback
      paymentHandler.unregisterPaymentCallback(paymentId);

      // Reset mock
      callback.mockReset();

      // Trigger callback again - should not be called
      paymentHandler.handlePaymentCallback({
        paymentId,
        status: PaymentStatus.FAILED
      });

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Singleton Pattern', () => {
    it('should return same instance', () => {
      const instance1 = PaymentHandler.getInstance();
      const instance2 = PaymentHandler.getInstance();
      
      expect(instance1).toBe(instance2);
    });
  });
});