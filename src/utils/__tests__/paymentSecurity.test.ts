/**
 * Payment Security and Validation Tests
 * 
 * Comprehensive test suite for payment security, validation, and credential management.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as PaymentSecurityModule from '../paymentSecurity';

const { PaymentValidator, CredentialManager, PaymentVerifier, PaymentSecurity } = PaymentSecurityModule;
import {
  PaymentData,
  IkhokhaPaymentRequest,
  PaymentVerification,
  IkhokhaWebhook,
  PaymentStatus
} from '../../types/ikhokha';

// Mock crypto module for testing
vi.mock('crypto', () => ({
  randomBytes: vi.fn(() => Buffer.from('test-random-bytes')),
  createHmac: vi.fn(() => ({
    update: vi.fn().mockReturnThis(),
    digest: vi.fn(() => 'test-signature')
  })),
  createCipher: vi.fn(() => ({
    update: vi.fn(() => 'encrypted'),
    final: vi.fn(() => 'data')
  })),
  createDecipher: vi.fn(() => ({
    update: vi.fn(() => 'decrypted'),
    final: vi.fn(() => 'data')
  }))
}));

describe('PaymentValidator', () => {
  describe('validatePaymentAmount', () => {
    it('should validate valid payment amounts', () => {
      const result = PaymentValidator.validatePaymentAmount(100.50);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject null or undefined amounts', () => {
      const result1 = PaymentValidator.validatePaymentAmount(null as any);
      const result2 = PaymentValidator.validatePaymentAmount(undefined as any);
      
      expect(result1.isValid).toBe(false);
      expect(result1.errors).toContain('Payment amount is required');
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Payment amount is required');
    });

    it('should reject non-numeric amounts', () => {
      const result = PaymentValidator.validatePaymentAmount('100' as any);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment amount must be a valid number');
    });

    it('should reject amounts below minimum', () => {
      const result = PaymentValidator.validatePaymentAmount(0.50);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment amount must be at least R1.00');
    });

    it('should reject amounts above maximum', () => {
      const result = PaymentValidator.validatePaymentAmount(1500000);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment amount cannot exceed R1,000,000');
    });

    it('should reject amounts with more than 2 decimal places', () => {
      const result = PaymentValidator.validatePaymentAmount(100.123);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment amount cannot have more than 2 decimal places');
    });

    it('should reject zero or negative amounts', () => {
      const result1 = PaymentValidator.validatePaymentAmount(0);
      const result2 = PaymentValidator.validatePaymentAmount(-10);
      
      expect(result1.isValid).toBe(false);
      expect(result1.errors).toContain('Payment amount must be greater than zero');
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Payment amount must be greater than zero');
    });

    it('should warn about large amounts', () => {
      const result = PaymentValidator.validatePaymentAmount(150000);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Large payment amount detected - additional verification may be required');
    });

    it('should warn about common test amounts', () => {
      const result = PaymentValidator.validatePaymentAmount(100.00);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Payment amount matches common test values');
    });
  });

  describe('validatePaymentReference', () => {
    it('should validate valid payment references', () => {
      const result = PaymentValidator.validatePaymentReference('PAY_123456_ABC');
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject null or undefined references', () => {
      const result1 = PaymentValidator.validatePaymentReference(null as any);
      const result2 = PaymentValidator.validatePaymentReference(undefined as any);
      
      expect(result1.isValid).toBe(false);
      expect(result1.errors).toContain('Payment reference is required and must be a string');
      expect(result2.isValid).toBe(false);
      expect(result2.errors).toContain('Payment reference is required and must be a string');
    });

    it('should reject references that are too short', () => {
      const result = PaymentValidator.validatePaymentReference('AB');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment reference must be at least 3 characters long');
    });

    it('should reject references that are too long', () => {
      const longRef = 'A'.repeat(51);
      const result = PaymentValidator.validatePaymentReference(longRef);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment reference cannot exceed 50 characters');
    });

    it('should reject references with invalid characters', () => {
      const result = PaymentValidator.validatePaymentReference('PAY@123#456');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment reference can only contain letters, numbers, hyphens, and underscores');
    });

    it('should warn about test references', () => {
      const result = PaymentValidator.validatePaymentReference('TEST_123456');
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Payment reference contains test/demo keywords');
    });

    it('should reject references with suspicious patterns', () => {
      const testCases = [
        'PAY<script>',
        'PAY"DROP',
        'PAY;DELETE',
        'javascript:alert',
        'data:text/html'
      ];

      testCases.forEach(testRef => {
        const result = PaymentValidator.validatePaymentReference(testRef);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Payment reference contains invalid characters');
      });
    });
  });

  describe('validateEmail', () => {
    it('should validate valid email addresses', () => {
      const validEmails = [
        'user@example.com',
        'test.user@domain.co.za',
        'user+tag@example.org'
      ];

      validEmails.forEach(email => {
        const result = PaymentValidator.validateEmail(email);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@domain.com',
        'user@',
        'user@domain',
        'user..double@domain.com'
      ];

      invalidEmails.forEach(email => {
        const result = PaymentValidator.validateEmail(email);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Invalid email format');
      });
    });

    it('should reject emails that are too long', () => {
      const longEmail = 'a'.repeat(250) + '@domain.com';
      const result = PaymentValidator.validateEmail(longEmail);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Email address is too long');
    });

    it('should warn about test email addresses', () => {
      const testEmails = [
        'test@example.com',
        'demo@test.com',
        'user@example.org'
      ];

      testEmails.forEach(email => {
        const result = PaymentValidator.validateEmail(email);
        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Email appears to be a test address');
      });
    });

    it('should reject emails with suspicious patterns', () => {
      const suspiciousEmails = [
        'user<script>@domain.com',
        'javascript:alert@domain.com',
        'data:text@domain.com'
      ];

      suspiciousEmails.forEach(email => {
        const result = PaymentValidator.validateEmail(email);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Email contains invalid characters');
      });
    });
  });

  describe('validateUserName', () => {
    it('should validate valid user names', () => {
      const validNames = [
        'John Doe',
        'Mary-Jane Smith',
        "O'Connor",
        'Jean-Pierre'
      ];

      validNames.forEach(name => {
        const result = PaymentValidator.validateUserName(name);
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
      });
    });

    it('should reject names that are too short', () => {
      const result = PaymentValidator.validateUserName('A');
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name must be at least 2 characters long');
    });

    it('should reject names that are too long', () => {
      const longName = 'A'.repeat(101);
      const result = PaymentValidator.validateUserName(longName);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Name cannot exceed 100 characters');
    });

    it('should reject names with invalid characters', () => {
      const invalidNames = [
        'John123',
        'User@Domain',
        'Name<script>',
        'User$Money'
      ];

      invalidNames.forEach(name => {
        const result = PaymentValidator.validateUserName(name);
        expect(result.isValid).toBe(false);
        expect(result.errors).toContain('Name can only contain letters, spaces, hyphens, and apostrophes');
      });
    });

    it('should warn about test names', () => {
      const testNames = [
        'Test User',
        'Demo Account',
        'Example Person'
      ];

      testNames.forEach(name => {
        const result = PaymentValidator.validateUserName(name);
        expect(result.isValid).toBe(true);
        expect(result.warnings).toContain('Name appears to be a test value');
      });
    });
  });

  describe('validatePaymentData', () => {
    const validPaymentData: PaymentData = {
      sessionId: 'session_123456789',
      amount: 100.00,
      currency: 'ZAR',
      reference: 'PAY_123456_ABC',
      customer: {
        email: 'user@example.com',
        name: 'John Doe',
        phone: '+27123456789'
      },
      metadata: {
        courseId: 'course_123',
        userId: 'user_456'
      }
    };

    it('should validate complete valid payment data', () => {
      const result = PaymentValidator.validatePaymentData(validPaymentData);
      expect(result.isValid).toBe(true);
    });

    it('should reject payment data with invalid session ID', () => {
      const invalidData = { ...validPaymentData, sessionId: 'short' };
      const result = PaymentValidator.validatePaymentData(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment session ID appears to be invalid');
    });

    it('should reject payment data with invalid currency', () => {
      const invalidData = { ...validPaymentData, currency: 'USD' };
      const result = PaymentValidator.validatePaymentData(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment currency must be ZAR');
    });
  });
});

describe('CredentialManager', () => {
  beforeEach(() => {
    // Reset environment variables
    vi.stubEnv('VITE_NODE_ENV', 'test');
    vi.stubEnv('VITE_ENCRYPTION_KEY', 'test-encryption-key');
  });

  describe('maskSensitiveData', () => {
    it('should mask sensitive fields', () => {
      const data = {
        api_key: 'very-secret-api-key',
        api_secret: 'super-secret-value',
        webhook_secret: 'webhook-secret-key',
        public_field: 'public-value'
      };

      const masked = CredentialManager.maskSensitiveData(data);
      
      expect(masked.api_key).toBe('very***key');
      expect(masked.api_secret).toBe('supe***lue');
      expect(masked.webhook_secret).toBe('webh***key');
      expect(masked.public_field).toBe('public-value');
    });

    it('should handle short sensitive values', () => {
      const data = {
        api_key: 'abc',
        pin: '1234'
      };

      const masked = CredentialManager.maskSensitiveData(data);
      
      expect(masked.api_key).toBe('***');
      expect(masked.pin).toBe('***');
    });

    it('should recursively mask nested objects', () => {
      const data = {
        config: {
          api_key: 'secret-key',
          settings: {
            password: 'secret-password'
          }
        },
        public: 'value'
      };

      const masked = CredentialManager.maskSensitiveData(data);
      
      expect(masked.config.api_key).toBe('secr***key');
      expect(masked.config.settings.password).toBe('secr***ord');
      expect(masked.public).toBe('value');
    });
  });
});

describe('PaymentVerifier', () => {
  describe('verifyPaymentIntegrity', () => {
    it('should verify matching payment data', () => {
      const result = PaymentVerifier.verifyPaymentIntegrity(
        100.00,
        100.00,
        'REF_123',
        'REF_123'
      );
      
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect amount mismatches', () => {
      const result = PaymentVerifier.verifyPaymentIntegrity(
        100.00,
        99.99,
        'REF_123',
        'REF_123'
      );
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment amount mismatch: expected 100, got 99.99');
    });

    it('should detect reference mismatches', () => {
      const result = PaymentVerifier.verifyPaymentIntegrity(
        100.00,
        100.00,
        'REF_123',
        'REF_456'
      );
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment reference mismatch: expected REF_123, got REF_456');
    });

    it('should allow small amount differences due to rounding', () => {
      const result = PaymentVerifier.verifyPaymentIntegrity(
        100.00,
        100.005,
        'REF_123',
        'REF_123'
      );
      
      expect(result.isValid).toBe(true);
    });
  });

  describe('verifyWebhookSignature', () => {
    const mockWebhook: IkhokhaWebhook = {
      transaction_id: 'txn_123',
      reference: 'REF_123',
      amount: 100.00,
      currency: 'ZAR',
      status: 'completed',
      timestamp: '2023-01-01T00:00:00Z',
      signature: 'sha256=test-signature',
      response_code: '00',
      response_message: 'Approved'
    };

    it('should verify valid webhook signatures', () => {
      const result = PaymentVerifier.verifyWebhookSignature(mockWebhook, 'webhook-secret');
      expect(result.isValid).toBe(true);
    });

    it('should reject webhooks without signatures', () => {
      const webhookWithoutSignature = { ...mockWebhook, signature: '' };
      const result = PaymentVerifier.verifyWebhookSignature(webhookWithoutSignature, 'webhook-secret');
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Webhook signature is missing');
    });
  });

  describe('verifyPaymentVerificationResponse', () => {
    const validVerification: PaymentVerification = {
      valid: true,
      payment_id: 'pay_123',
      status: PaymentStatus.COMPLETED,
      amount: 100.00,
      currency: 'ZAR',
      reference: 'REF_123',
      transaction_date: new Date(),
      verification_date: new Date()
    };

    it('should verify valid payment verification responses', () => {
      const result = PaymentVerifier.verifyPaymentVerificationResponse(validVerification);
      expect(result.isValid).toBe(true);
    });

    it('should reject verification responses with missing payment ID', () => {
      const invalidVerification = { ...validVerification, payment_id: '' };
      const result = PaymentVerifier.verifyPaymentVerificationResponse(invalidVerification);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Payment ID is missing from verification response');
    });

    it('should reject verification responses with invalid amounts', () => {
      const invalidVerification = { ...validVerification, amount: -10 };
      const result = PaymentVerifier.verifyPaymentVerificationResponse(invalidVerification);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Invalid amount in verification response');
    });

    it('should warn about test payment IDs in development', () => {
      vi.stubEnv('VITE_NODE_ENV', 'development');
      const testVerification = { ...validVerification, payment_id: 'test_123' };
      const result = PaymentVerifier.verifyPaymentVerificationResponse(testVerification);
      
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Test payment ID detected');
    });

    it('should reject test payment IDs in production', () => {
      vi.stubEnv('VITE_NODE_ENV', 'production');
      const testVerification = { ...validVerification, payment_id: 'test_123' };
      const result = PaymentVerifier.verifyPaymentVerificationResponse(testVerification);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Test payment ID detected in production environment');
    });
  });

  describe('reconcilePaymentData', () => {
    const localPayment = {
      amount: 100.00,
      reference: 'REF_123',
      status: 'completed',
      timestamp: new Date('2023-01-01T12:00:00Z')
    };

    const remotePayment = {
      amount: 100.00,
      reference: 'REF_123',
      status: 'completed',
      timestamp: new Date('2023-01-01T12:00:00Z')
    };

    it('should reconcile matching payment data', () => {
      const result = PaymentVerifier.reconcilePaymentData(localPayment, remotePayment);
      expect(result.isValid).toBe(true);
    });

    it('should detect amount mismatches', () => {
      const mismatchedRemote = { ...remotePayment, amount: 99.99 };
      const result = PaymentVerifier.reconcilePaymentData(localPayment, mismatchedRemote);
      
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Amount mismatch: local 100, remote 99.99');
    });

    it('should warn about status mismatches', () => {
      const mismatchedRemote = { ...remotePayment, status: 'pending' };
      const result = PaymentVerifier.reconcilePaymentData(localPayment, mismatchedRemote);
      
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Status mismatch: local completed, remote pending');
    });

    it('should warn about large timestamp differences', () => {
      const mismatchedRemote = { 
        ...remotePayment, 
        timestamp: new Date('2023-01-01T13:00:00Z') // 1 hour difference
      };
      const result = PaymentVerifier.reconcilePaymentData(localPayment, mismatchedRemote);
      
      expect(result.isValid).toBe(true);
      expect(result.warnings).toContain('Timestamp difference exceeds 5 minutes: 3600 seconds');
    });
  });
});

describe('PaymentSecurity', () => {
  describe('generateSecureReference', () => {
    it('should generate secure payment references', () => {
      const ref1 = PaymentSecurity.generateSecureReference();
      const ref2 = PaymentSecurity.generateSecureReference();
      
      expect(ref1).toMatch(/^PAY_\d+_[A-F0-9]+$/);
      expect(ref2).toMatch(/^PAY_\d+_[A-F0-9]+$/);
      expect(ref1).not.toBe(ref2);
    });

    it('should use custom prefix', () => {
      const ref = PaymentSecurity.generateSecureReference('CUSTOM');
      expect(ref).toMatch(/^CUSTOM_\d+_[A-F0-9]+$/);
    });
  });

  describe('sanitizePaymentMetadata', () => {
    it('should sanitize string values', () => {
      const metadata = {
        courseName: 'Course <script>alert("xss")</script>',
        description: 'javascript:alert("xss")',
        userNote: 'data:text/html,<h1>Test</h1>'
      };

      const sanitized = PaymentSecurity.sanitizePaymentMetadata(metadata);
      
      expect(sanitized.courseName).toBe('Course alert("xss")');
      expect(sanitized.description).toBe('alert("xss")');
      expect(sanitized.userNote).toBe(',Test');
    });

    it('should preserve safe values', () => {
      const metadata = {
        courseId: 'course_123',
        amount: 100.00,
        active: true,
        tags: ['programming', 'web-development']
      };

      const sanitized = PaymentSecurity.sanitizePaymentMetadata(metadata);
      
      expect(sanitized.courseId).toBe('course_123');
      expect(sanitized.amount).toBe(100.00);
      expect(sanitized.active).toBe(true);
      expect(sanitized.tags).toEqual(['programming', 'web-development']);
    });

    it('should recursively sanitize nested objects', () => {
      const metadata = {
        course: {
          name: 'Course <script>',
          details: {
            description: 'javascript:alert'
          }
        }
      };

      const sanitized = PaymentSecurity.sanitizePaymentMetadata(metadata);
      
      expect(sanitized.course.name).toBe('Course ');
      expect(sanitized.course.details.description).toBe('alert');
    });
  });

  describe('detectSuspiciousPaymentPatterns', () => {
    const normalPayment: PaymentData = {
      sessionId: 'session_123',
      amount: 100.00,
      currency: 'ZAR',
      reference: 'PAY_123',
      customer: {
        email: 'user@example.com',
        name: 'John Doe'
      }
    };

    it('should not flag normal payments', () => {
      const result = PaymentSecurity.detectSuspiciousPaymentPatterns(normalPayment, []);
      expect(result.isValid).toBe(true);
      expect(result.warnings).toHaveLength(0);
    });

    it('should detect duplicate payments', () => {
      const recentPayments = [
        { ...normalPayment, sessionId: 'session_456' }
      ];
      
      const result = PaymentSecurity.detectSuspiciousPaymentPatterns(normalPayment, recentPayments);
      expect(result.warnings).toContain('Potential duplicate payment detected');
    });

    it('should detect rapid successive payments', () => {
      const recentPayments = Array(4).fill(null).map((_, i) => ({
        ...normalPayment,
        sessionId: `session_${i}`,
        reference: `PAY_${i}`
      }));
      
      const result = PaymentSecurity.detectSuspiciousPaymentPatterns(normalPayment, recentPayments);
      expect(result.warnings).toContain('Multiple rapid payments from same user detected');
    });

    it('should detect unusual round number amounts', () => {
      const roundPayment = { ...normalPayment, amount: 5000 };
      const result = PaymentSecurity.detectSuspiciousPaymentPatterns(roundPayment, []);
      expect(result.warnings).toContain('Round number payment amount detected');
    });
  });

  describe('validateProductionSecurity', () => {
    it('should pass validation in development', () => {
      vi.stubEnv('VITE_NODE_ENV', 'development');
      const result = PaymentSecurity.validateProductionSecurity();
      expect(result.isValid).toBe(true);
    });

    it('should validate HTTPS in production', () => {
      vi.stubEnv('VITE_NODE_ENV', 'production');
      
      // Mock window.location
      Object.defineProperty(window, 'location', {
        value: { protocol: 'http:' },
        writable: true
      });
      
      const result = PaymentSecurity.validateProductionSecurity();
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('HTTPS is required in production');
    });

    it('should warn about debug flags in production', () => {
      vi.stubEnv('VITE_NODE_ENV', 'production');
      vi.stubEnv('VITE_DEBUG', 'true');
      
      // Mock HTTPS
      Object.defineProperty(window, 'location', {
        value: { protocol: 'https:' },
        writable: true
      });
      
      const result = PaymentSecurity.validateProductionSecurity();
      expect(result.warnings).toContain('Development environment variable VITE_DEBUG is enabled in production');
    });
  });
});