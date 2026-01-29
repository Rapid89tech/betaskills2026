/**
 * PaymentTypeDetector Service Tests
 * 
 * Comprehensive tests for payment type detection functionality
 * including card vs EFT identification, confidence scoring, and webhook analysis.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PaymentTypeDetector } from '../PaymentTypeDetector';
import { IkhokhaWebhook, PaymentType } from '../../types/ikhokha';

// Mock logger
vi.mock('@/utils/logger', () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
  }
}));

describe('PaymentTypeDetector', () => {
  let detector: PaymentTypeDetector;

  beforeEach(() => {
    detector = PaymentTypeDetector.getInstance();
    vi.clearAllMocks();
  });

  describe('detectPaymentType', () => {
    it('should detect card payment from card-specific fields', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_123',
        reference: 'PAY_123',
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

      const result = detector.detectPaymentType(webhookData);

      expect(result.type).toBe('card');
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.indicators).toHaveLength(4); // card_type, masked_card_number, auth_code, response_code
      expect(result.metadata.cardType).toBe('VISA');
      expect(result.metadata.maskedCardNumber).toBe('****1234');
      expect(result.metadata.authCode).toBe('AUTH123');
    });

    it('should detect card payment from response code patterns', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_124',
        reference: 'PAY_124',
        amount: 199.50,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00', // Card success code
        response_message: 'Approved'
      };

      const result = detector.detectPaymentType(webhookData);

      expect(result.type).toBe('card');
      expect(result.confidence).toBeGreaterThan(0.3);
      expect(result.indicators.some(i => i.field === 'response_code')).toBe(true);
    });

    it('should detect EFT payment from EFT-specific indicators', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_125',
        reference: 'EFT_TRANSFER_125',
        amount: 500.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '000', // EFT success code
        response_message: 'Bank transfer completed',
        metadata: {
          transfer_type: 'eft',
          bank_reference: 'BNK123456'
        }
      };

      const result = detector.detectPaymentType(webhookData);

      expect(result.type).toBe('eft');
      expect(result.confidence).toBeGreaterThan(0.4);
      expect(result.indicators.some(i => i.description.includes('EFT'))).toBe(true);
    });

    it('should detect EFT payment from reference patterns', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_126',
        reference: 'BANK_TRANSFER_126',
        amount: 1000.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '100',
        response_message: 'Transfer successful'
      };

      const result = detector.detectPaymentType(webhookData);

      expect(result.type).toBe('eft');
      expect(result.indicators.some(i => i.field === 'reference')).toBe(true);
    });

    it('should handle unknown payment type with low confidence', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_127',
        reference: 'UNKNOWN_127',
        amount: 150.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '999', // Unknown code
        response_message: 'Unknown transaction type'
      };

      const result = detector.detectPaymentType(webhookData);

      expect(result.type).toBe('unknown');
      expect(result.confidence).toBe(0);
      expect(result.indicators).toHaveLength(0);
    });

    it('should handle card payment with keywords in response message', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_128',
        reference: 'PAY_128',
        amount: 75.50,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '01',
        response_message: 'VISA card transaction approved'
      };

      const result = detector.detectPaymentType(webhookData);

      expect(result.type).toBe('card');
      expect(result.indicators.some(i => 
        i.field === 'response_message' && i.value === 'visa'
      )).toBe(true);
    });

    it('should handle error gracefully and return safe fallback', () => {
      const invalidWebhookData = null as any;

      const result = detector.detectPaymentType(invalidWebhookData);

      expect(result.type).toBe('unknown');
      expect(result.confidence).toBe(0);
      expect(result.indicators).toHaveLength(0);
    });
  });

  describe('analyzePaymentMethod', () => {
    const enrollmentData = {
      id: 'enr_123',
      userId: 'user_123',
      courseId: 'course_123',
      amount: 299.99,
      currency: 'ZAR',
      userEmail: 'test@example.com',
      userName: 'John Doe',
      createdAt: new Date()
    };

    it('should perform comprehensive analysis for card payment', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_129',
        reference: 'CARD_PAY_129',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'VISA approved',
        card_type: 'VISA',
        masked_card_number: '****5678'
      };

      const result = detector.analyzePaymentMethod(webhookData, enrollmentData);

      expect(result.primaryType).toBe(PaymentType.CARD);
      expect(result.confidence).toBeGreaterThan(0.6);
      expect(result.analysisDetails.webhookAnalysis.cardIndicators.length).toBeGreaterThan(0);
      expect(result.analysisDetails.patternAnalysis.referencePatterns.length).toBeGreaterThan(0);
      expect(result.analysisDetails.metadataAnalysis.customerDataAnalysis.emailDomain).toBe('example.com');
    });

    it('should perform comprehensive analysis for EFT payment', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_130',
        reference: 'EFT_130',
        amount: 500.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '000',
        response_message: 'Bank transfer completed'
      };

      const result = detector.analyzePaymentMethod(webhookData, enrollmentData);

      expect(result.primaryType).toBe(PaymentType.EFT);
      expect(result.analysisDetails.webhookAnalysis.eftIndicators.length).toBeGreaterThan(0);
      expect(result.analysisDetails.patternAnalysis.referencePatterns.some(p => 
        p.paymentType === PaymentType.EFT
      )).toBe(true);
    });

    it('should suggest alternative type for low confidence detection', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_131',
        reference: 'AMBIGUOUS_131',
        amount: 100.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '999', // Truly unknown code
        response_message: 'Transaction processed'
      };

      const result = detector.analyzePaymentMethod(webhookData, enrollmentData);

      expect(result.confidence).toBeLessThan(0.8);
      expect(result.alternativeType).toBeDefined();
      expect(result.recommendations.length).toBeGreaterThan(0);
    });

    it('should handle analysis errors gracefully', () => {
      const invalidWebhookData = null as any;

      const result = detector.analyzePaymentMethod(invalidWebhookData, enrollmentData);

      expect(result.primaryType).toBe(PaymentType.CARD);
      expect(result.confidence).toBe(0);
      expect(result.recommendations).toContain('Unable to perform analysis - using default card payment type');
    });
  });

  describe('isCardPayment', () => {
    it('should return true for high-confidence card payment', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_132',
        reference: 'PAY_132',
        amount: 199.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Approved',
        card_type: 'MASTERCARD',
        masked_card_number: '****9876'
      };

      const result = detector.isCardPayment(webhookData);

      expect(result).toBe(true);
    });

    it('should return false for low-confidence card payment', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_133',
        reference: 'PAY_133',
        amount: 50.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '99', // Unknown code
        response_message: 'Processed'
      };

      const result = detector.isCardPayment(webhookData);

      expect(result).toBe(false);
    });

    it('should return false for EFT payment', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_134',
        reference: 'EFT_134',
        amount: 300.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '000',
        response_message: 'Bank transfer successful'
      };

      const result = detector.isCardPayment(webhookData);

      expect(result).toBe(false);
    });
  });

  describe('isEFTPayment', () => {
    it('should return true for high-confidence EFT payment', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_135',
        reference: 'BANK_TRANSFER_135',
        amount: 750.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '000',
        response_message: 'EFT transfer completed successfully'
      };

      const result = detector.isEFTPayment(webhookData);

      expect(result).toBe(true);
    });

    it('should return false for low-confidence EFT payment', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_136',
        reference: 'PAY_136',
        amount: 100.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '99',
        response_message: 'Processed'
      };

      const result = detector.isEFTPayment(webhookData);

      expect(result).toBe(false);
    });

    it('should return false for card payment', () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_137',
        reference: 'CARD_137',
        amount: 150.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Card approved',
        card_type: 'VISA'
      };

      const result = detector.isEFTPayment(webhookData);

      expect(result).toBe(false);
    });
  });

  describe('getPaymentTypeConfidence', () => {
    it('should return the confidence score from detection result', () => {
      const detectionResult = {
        type: 'card' as const,
        confidence: 0.85,
        indicators: [],
        metadata: { responseCode: '00' }
      };

      const confidence = detector.getPaymentTypeConfidence(detectionResult);

      expect(confidence).toBe(0.85);
    });
  });

  describe('timing analysis', () => {
    it('should classify instant processing as card payment indicator', () => {
      const recentTimestamp = new Date(Date.now() - 2000).toISOString(); // 2 seconds ago
      
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_138',
        reference: 'PAY_138',
        amount: 99.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: recentTimestamp,
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Approved'
      };

      const result = detector.detectPaymentType(webhookData);

      // Should have some card bias due to fast processing
      expect(result.type).toBe('card');
    });

    it('should classify slow processing as potential EFT indicator', () => {
      const oldTimestamp = new Date(Date.now() - 600000).toISOString(); // 10 minutes ago
      
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_139',
        reference: 'PAY_139',
        amount: 200.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: oldTimestamp,
        signature: 'test_signature',
        response_code: '100',
        response_message: 'Transfer completed'
      };

      const result = detector.detectPaymentType(webhookData);

      // Should have some EFT bias due to slow processing
      expect(result.type).toBe('eft');
    });
  });

  describe('pattern analysis', () => {
    it('should detect round amounts as EFT indicators', () => {
      const enrollmentData = {
        id: 'enr_140',
        userId: 'user_140',
        courseId: 'course_140',
        amount: 1000.00, // Round amount
        currency: 'ZAR',
        userEmail: 'test@company.co.za',
        userName: 'Jane Smith',
        createdAt: new Date()
      };

      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_140',
        reference: 'PAY_140',
        amount: 1000.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '100',
        response_message: 'Completed'
      };

      const result = detector.analyzePaymentMethod(webhookData, enrollmentData);

      expect(result.analysisDetails.patternAnalysis.amountPatterns.some(p => 
        p.pattern === 'round_amount'
      )).toBe(true);
    });

    it('should detect precise amounts as card indicators', () => {
      const enrollmentData = {
        id: 'enr_141',
        userId: 'user_141',
        courseId: 'course_141',
        amount: 299.99, // Precise amount
        currency: 'ZAR',
        userEmail: 'user@gmail.com',
        userName: 'Bob Johnson',
        createdAt: new Date()
      };

      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_141',
        reference: 'PAY_141',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Approved'
      };

      const result = detector.analyzePaymentMethod(webhookData, enrollmentData);

      expect(result.analysisDetails.patternAnalysis.amountPatterns.some(p => 
        p.pattern === 'precise_amount' && p.paymentType === PaymentType.CARD
      )).toBe(true);
    });
  });

  describe('metadata analysis', () => {
    it('should analyze customer data for corporate vs personal indicators', () => {
      const corporateEnrollment = {
        id: 'enr_142',
        userId: 'user_142',
        courseId: 'course_142',
        amount: 500.00,
        currency: 'ZAR',
        userEmail: 'employee@company.co.za',
        userName: 'Corporate User',
        createdAt: new Date()
      };

      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_142',
        reference: 'PAY_142',
        amount: 500.00,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Approved'
      };

      const result = detector.analyzePaymentMethod(webhookData, corporateEnrollment);

      expect(result.analysisDetails.metadataAnalysis.customerDataAnalysis.corporateIndicators).toBe(true);
      expect(result.analysisDetails.metadataAnalysis.customerDataAnalysis.emailDomain).toBe('company.co.za');
    });

    it('should analyze transaction context for business hours vs after hours', () => {
      // Create a timestamp for business hours (10 AM on a weekday)
      const businessHoursDate = new Date();
      businessHoursDate.setHours(10, 0, 0, 0);
      // Ensure it's a weekday (Monday = 1, Friday = 5)
      const dayOfWeek = businessHoursDate.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        businessHoursDate.setDate(businessHoursDate.getDate() + (dayOfWeek === 0 ? 1 : 2));
      }

      const enrollmentData = {
        id: 'enr_143',
        userId: 'user_143',
        courseId: 'course_143',
        amount: 199.99,
        currency: 'ZAR',
        userEmail: 'test@example.com',
        userName: 'Test User',
        createdAt: new Date()
      };

      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_143',
        reference: 'PAY_143',
        amount: 199.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: businessHoursDate.toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Approved'
      };

      const result = detector.analyzePaymentMethod(webhookData, enrollmentData);

      expect(result.analysisDetails.metadataAnalysis.transactionContextAnalysis.timeOfDay).toBe('business_hours');
    });
  });

  describe('singleton pattern', () => {
    it('should return the same instance', () => {
      const instance1 = PaymentTypeDetector.getInstance();
      const instance2 = PaymentTypeDetector.getInstance();

      expect(instance1).toBe(instance2);
    });
  });
});