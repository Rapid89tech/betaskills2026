import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PaymentTypeDetector } from '../../services/PaymentTypeDetector';
import { CardPaymentFastTrack } from '../../services/CardPaymentFastTrack';
import type { IkhokhaWebhook, EnrollmentData } from '../../types/ikhokha';

/**
 * Webhook Simulation Tests for Various Card Payment Scenarios
 * 
 * These tests simulate different webhook delivery scenarios:
 * 1. Different card types (Visa, Mastercard, Amex)
 * 2. Various payment amounts and currencies
 * 3. Different webhook timing scenarios
 * 4. Edge cases and error conditions
 * 5. Webhook retry scenarios
 * 
 * Requirements: 2.1, 4.1
 */
describe('Webhook Simulation Tests', () => {
  let paymentDetector: PaymentTypeDetector;
  let fastTrack: CardPaymentFastTrack;
  
  const baseEnrollment: EnrollmentData = {
    id: 'enroll_test',
    user_id: 'user_test',
    user_email: 'test@example.com',
    course_id: 'course_test',
    course_title: 'Test Course',
    status: 'pending',
    payment_type: 'unknown',
    payment_status: 'pending',
    payment_reference: 'pay_test',
    approval_type: 'manual_admin_approval',
    approved_by: '',
    approval_source: 'webhook_card_payment',
    course_access_granted: false,
    access_level: 'none',
    status_history: [],
    last_updated_by: 'system_automatic',
    created_at: new Date(),
    updated_at: new Date(),
    sync_version: 1,
    last_synced_at: new Date()
  };

  beforeEach(() => {
    paymentDetector = new PaymentTypeDetector();
    fastTrack = new CardPaymentFastTrack();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Card Type Variations', () => {
    it('should handle Visa card payments', async () => {
      const visaWebhook: IkhokhaWebhook = {
        id: 'wh_visa_123',
        type: 'payment.success',
        data: {
          id: 'pay_visa_456',
          amount: 29900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const paymentType = await paymentDetector.detectPaymentType(visaWebhook);
      expect(paymentType.type).toBe('card');
      expect(paymentType.metadata.cardType).toBe('visa');
      expect(paymentType.confidence).toBeGreaterThan(0.9);

      const result = await fastTrack.processCardPayment(visaWebhook, baseEnrollment);
      expect(result.success).toBe(true);
      expect(result.enrollmentApproved).toBe(true);
    });

    it('should handle Mastercard payments', async () => {
      const mastercardWebhook: IkhokhaWebhook = {
        id: 'wh_mc_123',
        type: 'payment.success',
        data: {
          id: 'pay_mc_456',
          amount: 49900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'mastercard',
              last4: '5555',
              exp_month: 6,
              exp_year: 2026
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const paymentType = await paymentDetector.detectPaymentType(mastercardWebhook);
      expect(paymentType.type).toBe('card');
      expect(paymentType.metadata.cardType).toBe('mastercard');
      expect(paymentType.confidence).toBeGreaterThan(0.9);

      const result = await fastTrack.processCardPayment(mastercardWebhook, baseEnrollment);
      expect(result.success).toBe(true);
    });

    it('should handle American Express payments', async () => {
      const amexWebhook: IkhokhaWebhook = {
        id: 'wh_amex_123',
        type: 'payment.success',
        data: {
          id: 'pay_amex_456',
          amount: 79900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'amex',
              last4: '1005',
              exp_month: 9,
              exp_year: 2027
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const paymentType = await paymentDetector.detectPaymentType(amexWebhook);
      expect(paymentType.type).toBe('card');
      expect(paymentType.metadata.cardType).toBe('amex');
      expect(paymentType.confidence).toBeGreaterThan(0.9);

      const result = await fastTrack.processCardPayment(amexWebhook, baseEnrollment);
      expect(result.success).toBe(true);
    });
  });

  describe('Payment Amount Variations', () => {
    it('should handle small payment amounts', async () => {
      const smallAmountWebhook: IkhokhaWebhook = {
        id: 'wh_small_123',
        type: 'payment.success',
        data: {
          id: 'pay_small_456',
          amount: 999, // R9.99
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const result = await fastTrack.processCardPayment(smallAmountWebhook, baseEnrollment);
      expect(result.success).toBe(true);
      expect(result.enrollmentApproved).toBe(true);
    });

    it('should handle large payment amounts', async () => {
      const largeAmountWebhook: IkhokhaWebhook = {
        id: 'wh_large_123',
        type: 'payment.success',
        data: {
          id: 'pay_large_456',
          amount: 199900, // R1999.00
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const result = await fastTrack.processCardPayment(largeAmountWebhook, baseEnrollment);
      expect(result.success).toBe(true);
      expect(result.enrollmentApproved).toBe(true);
    });
  });

  describe('EFT Payment Detection', () => {
    it('should correctly identify EFT payments and route to manual approval', async () => {
      const eftWebhook: IkhokhaWebhook = {
        id: 'wh_eft_123',
        type: 'payment.success',
        data: {
          id: 'pay_eft_456',
          amount: 29900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'bank_transfer',
            bank_transfer: {
              bank_name: 'Standard Bank',
              account_holder: 'John Doe'
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const paymentType = await paymentDetector.detectPaymentType(eftWebhook);
      expect(paymentType.type).toBe('eft');
      expect(paymentType.confidence).toBeGreaterThan(0.8);

      // EFT payments should not trigger fast-track approval
      const result = await fastTrack.processCardPayment(eftWebhook, baseEnrollment);
      expect(result.success).toBe(false);
      expect(result.error?.type).toBe('invalid_payment_type');
    });
  });

  describe('Webhook Timing Scenarios', () => {
    it('should handle immediate webhook delivery', async () => {
      const immediateWebhook: IkhokhaWebhook = {
        id: 'wh_immediate_123',
        type: 'payment.success',
        data: {
          id: 'pay_immediate_456',
          amount: 29900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const startTime = Date.now();
      const result = await fastTrack.processCardPayment(immediateWebhook, baseEnrollment);
      const processingTime = Date.now() - startTime;

      expect(result.success).toBe(true);
      expect(processingTime).toBeLessThan(1000); // Should be very fast for immediate delivery
    });

    it('should handle delayed webhook delivery', async () => {
      // Simulate a webhook that arrives 30 seconds after payment
      const delayedTime = new Date(Date.now() - 30000); // 30 seconds ago
      
      const delayedWebhook: IkhokhaWebhook = {
        id: 'wh_delayed_123',
        type: 'payment.success',
        data: {
          id: 'pay_delayed_456',
          amount: 29900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: delayedTime.toISOString(),
          updated_at: delayedTime.toISOString()
        },
        created_at: delayedTime.toISOString()
      };

      const result = await fastTrack.processCardPayment(delayedWebhook, baseEnrollment);
      expect(result.success).toBe(true);
      expect(result.enrollmentApproved).toBe(true);
    });
  });

  describe('Edge Cases and Error Conditions', () => {
    it('should handle webhooks with missing metadata', async () => {
      const incompleteWebhook: IkhokhaWebhook = {
        id: 'wh_incomplete_123',
        type: 'payment.success',
        data: {
          id: 'pay_incomplete_456',
          amount: 29900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            // Missing user_email, course_id, enrollment_id
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const result = await fastTrack.processCardPayment(incompleteWebhook, baseEnrollment);
      expect(result.success).toBe(false);
      expect(result.error?.type).toBe('validation_error');
    });

    it('should handle webhooks with invalid payment status', async () => {
      const failedWebhook: IkhokhaWebhook = {
        id: 'wh_failed_123',
        type: 'payment.failed',
        data: {
          id: 'pay_failed_456',
          amount: 29900,
          currency: 'ZAR',
          status: 'failed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const result = await fastTrack.processCardPayment(failedWebhook, baseEnrollment);
      expect(result.success).toBe(false);
      expect(result.error?.type).toBe('payment_failed');
    });

    it('should handle webhooks with unknown card brands', async () => {
      const unknownCardWebhook: IkhokhaWebhook = {
        id: 'wh_unknown_123',
        type: 'payment.success',
        data: {
          id: 'pay_unknown_456',
          amount: 29900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'unknown_brand' as any,
              last4: '9999',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      const paymentType = await paymentDetector.detectPaymentType(unknownCardWebhook);
      expect(paymentType.type).toBe('card'); // Should still detect as card
      expect(paymentType.metadata.cardType).toBe('unknown_brand');
      
      const result = await fastTrack.processCardPayment(unknownCardWebhook, baseEnrollment);
      expect(result.success).toBe(true); // Should still process successfully
    });
  });

  describe('Webhook Retry Scenarios', () => {
    it('should handle duplicate webhook deliveries', async () => {
      const webhook: IkhokhaWebhook = {
        id: 'wh_duplicate_123',
        type: 'payment.success',
        data: {
          id: 'pay_duplicate_456',
          amount: 29900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      // Process the same webhook twice
      const result1 = await fastTrack.processCardPayment(webhook, baseEnrollment);
      const result2 = await fastTrack.processCardPayment(webhook, {
        ...baseEnrollment,
        status: 'approved' // Already approved from first processing
      });

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      expect(result2.enrollmentApproved).toBe(true); // Should handle idempotently
    });

    it('should handle webhook delivery with network timeouts', async () => {
      const timeoutWebhook: IkhokhaWebhook = {
        id: 'wh_timeout_123',
        type: 'payment.success',
        data: {
          id: 'pay_timeout_456',
          amount: 29900,
          currency: 'ZAR',
          status: 'completed',
          payment_method: {
            type: 'card',
            card: {
              brand: 'visa',
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: 'test@example.com',
            course_id: 'course_test',
            enrollment_id: 'enroll_test'
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      };

      // Mock a timeout scenario
      const originalProcessCardPayment = fastTrack.processCardPayment;
      let attemptCount = 0;
      
      vi.spyOn(fastTrack, 'processCardPayment').mockImplementation(async (webhook, enrollment) => {
        attemptCount++;
        if (attemptCount === 1) {
          throw new Error('Network timeout');
        }
        return originalProcessCardPayment.call(fastTrack, webhook, enrollment);
      });

      // Should retry and succeed on second attempt
      await expect(
        fastTrack.processCardPayment(timeoutWebhook, baseEnrollment)
      ).rejects.toThrow('Network timeout');
      
      // Reset mock for second attempt
      vi.spyOn(fastTrack, 'processCardPayment').mockRestore();
      
      const result = await fastTrack.processCardPayment(timeoutWebhook, baseEnrollment);
      expect(result.success).toBe(true);
    });
  });

  describe('Concurrent Webhook Processing', () => {
    it('should handle multiple simultaneous webhooks', async () => {
      const webhooks = Array.from({ length: 10 }, (_, i) => ({
        id: `wh_concurrent_${i}`,
        type: 'payment.success' as const,
        data: {
          id: `pay_concurrent_${i}`,
          amount: 29900,
          currency: 'ZAR' as const,
          status: 'completed' as const,
          payment_method: {
            type: 'card' as const,
            card: {
              brand: 'visa' as const,
              last4: '4242',
              exp_month: 12,
              exp_year: 2025
            }
          },
          metadata: {
            user_email: `test${i}@example.com`,
            course_id: 'course_test',
            enrollment_id: `enroll_test_${i}`
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        created_at: new Date().toISOString()
      }));

      const enrollments = Array.from({ length: 10 }, (_, i) => ({
        ...baseEnrollment,
        id: `enroll_test_${i}`,
        user_email: `test${i}@example.com`,
        payment_reference: `pay_concurrent_${i}`
      }));

      const startTime = Date.now();
      const results = await Promise.all(
        webhooks.map((webhook, i) => 
          fastTrack.processCardPayment(webhook, enrollments[i])
        )
      );
      const totalTime = Date.now() - startTime;

      // All should succeed
      results.forEach((result, i) => {
        expect(result.success).toBe(true);
        expect(result.enrollmentApproved).toBe(true);
      });

      // Should handle 10 concurrent webhooks efficiently
      expect(totalTime).toBeLessThan(5000);
    });
  });
});