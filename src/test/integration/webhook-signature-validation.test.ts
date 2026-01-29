/**
 * Webhook Processing with Signature Validation Tests
 * 
 * Comprehensive testing for webhook security, signature validation,
 * and production-grade webhook processing.
 * 
 * Requirements: 5.1, 8.1, 8.2, 8.3, 8.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { WebhookHandler } from '@/services/WebhookHandler';
import { ProductionValidator } from '@/services/ProductionValidator';
import { IkhokhaWebhook, PaymentStatus, EnrollmentStatus } from '@/types/ikhokha';
import crypto from 'crypto';

// Mock crypto for consistent signature testing
const mockCrypto = {
  subtle: {
    importKey: vi.fn(),
    sign: vi.fn(),
    verify: vi.fn()
  }
};

// Production-grade signature validation helper
class WebhookSignatureValidator {
  private static readonly WEBHOOK_SECRET = 'test_production_webhook_secret_key_2024';
  private static readonly SIGNATURE_ALGORITHM = 'sha256';
  private static readonly MAX_TIMESTAMP_DIFF = 5 * 60 * 1000; // 5 minutes

  static async generateValidSignature(payload: string, timestamp: string): Promise<string> {
    const signaturePayload = `${timestamp}.${payload}`;
    
    // Use Node.js crypto for consistent testing
    const hmac = crypto.createHmac(this.SIGNATURE_ALGORITHM, this.WEBHOOK_SECRET);
    hmac.update(signaturePayload);
    const signature = hmac.digest('hex');
    
    return `${this.SIGNATURE_ALGORITHM}=${signature}`;
  }

  static async validateSignature(
    payload: string, 
    signature: string, 
    timestamp: string
  ): Promise<{ valid: boolean; error?: string }> {
    try {
      // Check timestamp freshness
      const webhookTime = new Date(timestamp).getTime();
      const currentTime = Date.now();
      
      if (Math.abs(currentTime - webhookTime) > this.MAX_TIMESTAMP_DIFF) {
        return { valid: false, error: 'Webhook timestamp too old' };
      }

      // Validate signature format
      if (!signature.startsWith(`${this.SIGNATURE_ALGORITHM}=`)) {
        return { valid: false, error: 'Invalid signature format' };
      }

      // Generate expected signature
      const expectedSignature = await this.generateValidSignature(payload, timestamp);
      
      // Compare signatures securely
      const providedSig = signature.split('=')[1];
      const expectedSig = expectedSignature.split('=')[1];
      
      if (providedSig.length !== expectedSig.length) {
        return { valid: false, error: 'Signature length mismatch' };
      }

      // Constant-time comparison
      let isValid = true;
      for (let i = 0; i < providedSig.length; i++) {
        if (providedSig[i] !== expectedSig[i]) {
          isValid = false;
        }
      }

      return { valid: isValid, error: isValid ? undefined : 'Signature mismatch' };
    } catch (error) {
      return { valid: false, error: `Signature validation error: ${error}` };
    }
  }
}

// Mock Supabase with audit logging
const mockDatabase = new Map();
const mockAuditLogs: any[] = [];

const createSecureMockSupabase = () => {
  const mockQuery = {
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockImplementation(() => {
      const key = mockQuery._lastEqValue;
      const data = mockDatabase.get(key);
      return Promise.resolve({
        data: data || null,
        error: data ? null : { message: 'Not found' }
      });
    }),
    update: vi.fn().mockImplementation((updateData) => {
      const key = mockQuery._lastEqValue;
      const existingData = mockDatabase.get(key);
      if (existingData) {
        const updatedData = { ...existingData, ...updateData, updated_at: new Date().toISOString() };
        mockDatabase.set(key, updatedData);
        return Promise.resolve({ data: updatedData, error: null });
      }
      return Promise.resolve({ data: null, error: { message: 'Not found' } });
    }),
    insert: vi.fn().mockImplementation((insertData) => {
      if (insertData.event_type) {
        // This is an audit log entry
        mockAuditLogs.push({ ...insertData, id: `audit_${Date.now()}` });
      } else {
        // Regular data insertion
        const id = insertData.id || `generated_${Date.now()}`;
        mockDatabase.set(id, { ...insertData, id });
      }
      return Promise.resolve({ data: insertData, error: null });
    }),
    _lastEqValue: null as any
  };

  const originalEq = mockQuery.eq;
  mockQuery.eq = vi.fn().mockImplementation((column, value) => {
    mockQuery._lastEqValue = value;
    return originalEq.call(mockQuery, column, value);
  });

  return {
    mockSupabase: {
      from: vi.fn().mockReturnValue(mockQuery)
    },
    mockQuery
  };
};

describe('Webhook Processing with Signature Validation', () => {
  let webhookHandler: WebhookHandler;
  let productionValidator: ProductionValidator;
  let mockSupabase: any;

  beforeEach(async () => {
    // Clear all mocks and data
    vi.clearAllMocks();
    mockDatabase.clear();
    mockAuditLogs.length = 0;

    // Setup secure Supabase mock
    const { mockSupabase: supabase } = createSecureMockSupabase();
    mockSupabase = supabase;

    // Mock crypto for signature validation
    global.crypto = mockCrypto as any;

    // Mock Supabase import
    vi.doMock('@/integrations/supabase/client', () => ({
      supabase: mockSupabase
    }));

    // Initialize services
    webhookHandler = WebhookHandler.getInstance();
    productionValidator = ProductionValidator.getInstance();

    await webhookHandler.initialize();
    await productionValidator.initialize();

    // Setup test enrollment data
    mockDatabase.set('test_payment_ref_123', {
      id: 'enrollment-123',
      user_id: 'user-456',
      user_email: 'test@example.com',
      course_id: 'course-789',
      course_title: 'Test Course',
      payment_reference: 'test_payment_ref_123',
      status: 'pending',
      payment_status: 'pending',
      payment_type: 'card',
      requires_approval: false,
      course_access_granted: false,
      created_at: new Date().toISOString()
    });
  });

  afterEach(() => {
    webhookHandler.cleanup();
    productionValidator.cleanup();
    vi.restoreAllMocks();
  });

  describe('Signature Validation Security (Requirement 5.1)', () => {
    it('should validate webhook signatures correctly', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'secure_txn_123',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'webhook_signature',
        response_code: '00',
        response_message: 'Transaction approved'
      };

      const payload = JSON.stringify(webhookData);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        webhookData.timestamp
      );

      // Test valid signature
      const validResult = await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        webhookData.timestamp
      );

      expect(validResult.processed).toBe(true);
      expect(validResult.security_validated).toBe(true);
      expect(validResult.error).toBeUndefined();

      // Verify audit log was created
      const auditLog = mockAuditLogs.find(log => 
        log.event_type === 'webhook_processed' && 
        log.transaction_id === webhookData.transaction_id
      );
      expect(auditLog).toBeDefined();
      expect(auditLog.security_status).toBe('validated');
    });

    it('should reject webhooks with invalid signatures', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'invalid_sig_txn',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'webhook_signature',
        response_code: '00',
        response_message: 'Transaction approved'
      };

      const invalidSignature = 'sha256=invalid_signature_hash_12345';

      const result = await webhookHandler.processWebhook(
        webhookData,
        invalidSignature,
        webhookData.timestamp
      );

      expect(result.processed).toBe(false);
      expect(result.security_validated).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');

      // Verify security audit log
      const securityLog = mockAuditLogs.find(log => 
        log.event_type === 'webhook_security_violation'
      );
      expect(securityLog).toBeDefined();
      expect(securityLog.violation_type).toBe('invalid_signature');
    });

    it('should reject webhooks with expired timestamps', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'expired_txn_123',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'webhook_signature',
        response_code: '00',
        response_message: 'Transaction approved'
      };

      // Create timestamp from 10 minutes ago
      const expiredTimestamp = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const payload = JSON.stringify({ ...webhookData, timestamp: expiredTimestamp });
      const signature = await WebhookSignatureValidator.generateValidSignature(payload, expiredTimestamp);

      const result = await webhookHandler.processWebhook(
        webhookData,
        signature,
        expiredTimestamp
      );

      expect(result.processed).toBe(false);
      expect(result.security_validated).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');

      // Verify timestamp violation audit log
      const timestampLog = mockAuditLogs.find(log => 
        log.event_type === 'webhook_security_violation' &&
        log.violation_type === 'expired_timestamp'
      );
      expect(timestampLog).toBeDefined();
    });

    it('should validate webhook payload structure', async () => {
      const invalidWebhookData = {
        transaction_id: 'structure_test_txn',
        reference: 'test_payment_ref_123',
        amount: -100, // Invalid negative amount
        currency: 'INVALID', // Invalid currency
        status: 'unknown_status', // Invalid status
        timestamp: 'invalid_timestamp', // Invalid timestamp format
        signature: 'webhook_signature',
        response_code: '00',
        response_message: 'Transaction approved'
      } as any;

      const payload = JSON.stringify(invalidWebhookData);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        new Date().toISOString()
      );

      const result = await webhookHandler.processWebhook(
        invalidWebhookData,
        validSignature,
        new Date().toISOString()
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook security validation failed');

      // Verify structure validation audit log
      const structureLog = mockAuditLogs.find(log => 
        log.event_type === 'webhook_security_violation' &&
        log.violation_type === 'invalid_structure'
      );
      expect(structureLog).toBeDefined();
    });
  });

  describe('Production Webhook Processing (Requirement 8.1)', () => {
    it('should process production card payment webhooks', async () => {
      const productionWebhook: IkhokhaWebhook = {
        transaction_id: 'prod_card_txn_789',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'production_signature',
        response_code: '00',
        response_message: 'Transaction approved',
        card_type: 'VISA',
        masked_card_number: '****1234',
        auth_code: 'AUTH789',
        merchant_id: 'PROD_MERCHANT_123',
        terminal_id: 'PROD_TERMINAL_456'
      };

      const payload = JSON.stringify(productionWebhook);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        productionWebhook.timestamp
      );

      const result = await webhookHandler.processWebhook(
        productionWebhook,
        validSignature,
        productionWebhook.timestamp
      );

      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(true);
      expect(result.enrollment_updated).toBe(true);

      // Verify enrollment was auto-approved for card payment
      const updatedEnrollment = mockDatabase.get('test_payment_ref_123');
      expect(updatedEnrollment.status).toBe(EnrollmentStatus.APPROVED);
      expect(updatedEnrollment.payment_status).toBe(PaymentStatus.COMPLETED);
      expect(updatedEnrollment.course_access_granted).toBe(true);
      expect(updatedEnrollment.approved_by).toBe('system_auto_approval');

      // Verify production audit trail
      const productionLog = mockAuditLogs.find(log => 
        log.event_type === 'production_payment_processed'
      );
      expect(productionLog).toBeDefined();
      expect(productionLog.payment_method).toBe('card');
      expect(productionLog.auto_approved).toBe(true);
    });

    it('should process production EFT payment webhooks', async () => {
      // Setup EFT enrollment
      mockDatabase.set('eft_payment_ref_456', {
        id: 'enrollment-eft-456',
        user_id: 'user-eft-789',
        user_email: 'eft@example.com',
        course_id: 'course-eft-123',
        course_title: 'EFT Test Course',
        payment_reference: 'eft_payment_ref_456',
        status: 'pending',
        payment_status: 'pending',
        payment_type: 'eft',
        requires_approval: true,
        course_access_granted: false
      });

      const eftWebhook: IkhokhaWebhook = {
        transaction_id: 'prod_eft_txn_456',
        reference: 'eft_payment_ref_456',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'production_signature',
        response_code: '00',
        response_message: 'EFT transfer completed',
        bank_reference: 'EFT_REF_789',
        settlement_date: new Date().toISOString(),
        metadata: { payment_method: 'eft' }
      };

      const payload = JSON.stringify(eftWebhook);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        eftWebhook.timestamp
      );

      const result = await webhookHandler.processWebhook(
        eftWebhook,
        validSignature,
        eftWebhook.timestamp
      );

      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(true);

      // Verify EFT payment was marked as completed but not auto-approved
      const updatedEnrollment = mockDatabase.get('eft_payment_ref_456');
      expect(updatedEnrollment.status).toBe(EnrollmentStatus.PENDING);
      expect(updatedEnrollment.payment_status).toBe(PaymentStatus.COMPLETED);
      expect(updatedEnrollment.requires_approval).toBe(true);
      expect(updatedEnrollment.course_access_granted).toBe(false);

      // Verify EFT audit trail
      const eftLog = mockAuditLogs.find(log => 
        log.event_type === 'production_payment_processed' &&
        log.payment_method === 'eft'
      );
      expect(eftLog).toBeDefined();
      expect(eftLog.requires_approval).toBe(true);
    });

    it('should handle production payment failures', async () => {
      const failedWebhook: IkhokhaWebhook = {
        transaction_id: 'prod_failed_txn_123',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'failed',
        timestamp: new Date().toISOString(),
        signature: 'production_signature',
        response_code: '05',
        response_message: 'Transaction declined - insufficient funds',
        decline_reason: 'INSUFFICIENT_FUNDS',
        merchant_advice: 'Contact card issuer'
      };

      const payload = JSON.stringify(failedWebhook);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        failedWebhook.timestamp
      );

      const result = await webhookHandler.processWebhook(
        failedWebhook,
        validSignature,
        failedWebhook.timestamp
      );

      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(true);

      // Verify enrollment remains pending with failure details
      const updatedEnrollment = mockDatabase.get('test_payment_ref_123');
      expect(updatedEnrollment.status).toBe(EnrollmentStatus.PENDING);
      expect(updatedEnrollment.payment_status).toBe(PaymentStatus.FAILED);
      expect(updatedEnrollment.rejection_reason).toContain('insufficient funds');
      expect(updatedEnrollment.course_access_granted).toBe(false);

      // Verify failure audit trail
      const failureLog = mockAuditLogs.find(log => 
        log.event_type === 'production_payment_failed'
      );
      expect(failureLog).toBeDefined();
      expect(failureLog.failure_reason).toBe('INSUFFICIENT_FUNDS');
    });
  });

  describe('Webhook Retry Mechanism (Requirement 8.3)', () => {
    it('should retry webhook processing on transient failures', async () => {
      let attemptCount = 0;
      const originalUpdate = mockSupabase.from().update;

      // Mock first two attempts to fail, third to succeed
      mockSupabase.from().update = vi.fn().mockImplementation((data) => {
        attemptCount++;
        if (attemptCount <= 2) {
          return Promise.reject(new Error(`Attempt ${attemptCount}: Database connection timeout`));
        }
        return originalUpdate(data);
      });

      const webhookData: IkhokhaWebhook = {
        transaction_id: 'retry_test_txn_456',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'webhook_signature',
        response_code: '00',
        response_message: 'Transaction approved'
      };

      const payload = JSON.stringify(webhookData);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        webhookData.timestamp
      );

      const result = await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        webhookData.timestamp
      );

      expect(result.processed).toBe(true);
      expect(attemptCount).toBe(3); // Verify retry occurred

      // Verify retry audit logs
      const retryLogs = mockAuditLogs.filter(log => 
        log.event_type === 'webhook_retry_attempt'
      );
      expect(retryLogs.length).toBe(2); // Two retry attempts
    });

    it('should fail after maximum retry attempts', async () => {
      let attemptCount = 0;

      // Mock all attempts to fail
      mockSupabase.from().update = vi.fn().mockImplementation(() => {
        attemptCount++;
        return Promise.reject(new Error(`Attempt ${attemptCount}: Persistent database error`));
      });

      const webhookData: IkhokhaWebhook = {
        transaction_id: 'max_retry_txn_789',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'webhook_signature',
        response_code: '00',
        response_message: 'Transaction approved'
      };

      const payload = JSON.stringify(webhookData);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        webhookData.timestamp
      );

      const result = await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        webhookData.timestamp
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Maximum retry attempts exceeded');
      expect(attemptCount).toBe(3); // Maximum retry attempts

      // Verify failure audit log
      const failureLog = mockAuditLogs.find(log => 
        log.event_type === 'webhook_processing_failed'
      );
      expect(failureLog).toBeDefined();
      expect(failureLog.retry_count).toBe(3);
    });

    it('should handle webhook deduplication', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'duplicate_txn_123',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'webhook_signature',
        response_code: '00',
        response_message: 'Transaction approved'
      };

      const payload = JSON.stringify(webhookData);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        webhookData.timestamp
      );

      // Process webhook first time
      const firstResult = await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        webhookData.timestamp
      );

      expect(firstResult.processed).toBe(true);

      // Process same webhook again (duplicate)
      const duplicateResult = await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        webhookData.timestamp
      );

      expect(duplicateResult.processed).toBe(false);
      expect(duplicateResult.error).toContain('Duplicate webhook detected');

      // Verify deduplication audit log
      const dedupeLog = mockAuditLogs.find(log => 
        log.event_type === 'webhook_duplicate_detected'
      );
      expect(dedupeLog).toBeDefined();
    });
  });

  describe('Security Monitoring and Alerting (Requirement 8.4)', () => {
    it('should detect and log suspicious webhook patterns', async () => {
      const suspiciousWebhooks = [];

      // Generate multiple webhooks with suspicious patterns
      for (let i = 0; i < 10; i++) {
        const webhookData: IkhokhaWebhook = {
          transaction_id: `suspicious_txn_${i}`,
          reference: 'test_payment_ref_123',
          amount: 0.01, // Suspicious small amount
          currency: 'ZAR',
          status: 'completed',
          timestamp: new Date().toISOString(),
          signature: 'webhook_signature',
          response_code: '00',
          response_message: 'Transaction approved'
        };

        suspiciousWebhooks.push(webhookData);
      }

      // Process all suspicious webhooks rapidly
      const results = await Promise.all(
        suspiciousWebhooks.map(async (webhook) => {
          const payload = JSON.stringify(webhook);
          const signature = await WebhookSignatureValidator.generateValidSignature(
            payload, 
            webhook.timestamp
          );
          return webhookHandler.processWebhook(webhook, signature, webhook.timestamp);
        })
      );

      // Verify security monitoring detected the pattern
      const securityAlerts = mockAuditLogs.filter(log => 
        log.event_type === 'security_alert'
      );
      expect(securityAlerts.length).toBeGreaterThan(0);

      const suspiciousPatternAlert = securityAlerts.find(alert => 
        alert.alert_type === 'suspicious_payment_pattern'
      );
      expect(suspiciousPatternAlert).toBeDefined();
    });

    it('should monitor webhook processing performance', async () => {
      const performanceWebhooks = [];

      // Generate webhooks to test performance monitoring
      for (let i = 0; i < 5; i++) {
        const webhookData: IkhokhaWebhook = {
          transaction_id: `perf_txn_${i}`,
          reference: 'test_payment_ref_123',
          amount: 299.99,
          currency: 'ZAR',
          status: 'completed',
          timestamp: new Date().toISOString(),
          signature: 'webhook_signature',
          response_code: '00',
          response_message: 'Transaction approved'
        };

        performanceWebhooks.push(webhookData);
      }

      const startTime = Date.now();

      // Process all webhooks
      await Promise.all(
        performanceWebhooks.map(async (webhook) => {
          const payload = JSON.stringify(webhook);
          const signature = await WebhookSignatureValidator.generateValidSignature(
            payload, 
            webhook.timestamp
          );
          return webhookHandler.processWebhook(webhook, signature, webhook.timestamp);
        })
      );

      const totalTime = Date.now() - startTime;

      // Verify performance monitoring logs
      const performanceLogs = mockAuditLogs.filter(log => 
        log.event_type === 'webhook_performance_metric'
      );
      expect(performanceLogs.length).toBeGreaterThan(0);

      const avgProcessingTime = performanceLogs.reduce((sum, log) => 
        sum + log.processing_time_ms, 0
      ) / performanceLogs.length;

      expect(avgProcessingTime).toBeLessThan(1000); // Should process within 1 second
    });

    it('should alert on webhook security violations', async () => {
      const securityViolations = [
        {
          name: 'Invalid signature format',
          signature: 'invalid_format_signature',
          expectedAlert: 'invalid_signature_format'
        },
        {
          name: 'Missing signature',
          signature: '',
          expectedAlert: 'missing_signature'
        },
        {
          name: 'Malformed payload',
          signature: 'sha256=valid_but_payload_is_malformed',
          expectedAlert: 'malformed_payload'
        }
      ];

      for (const violation of securityViolations) {
        const webhookData: IkhokhaWebhook = {
          transaction_id: `security_violation_${violation.name}`,
          reference: 'test_payment_ref_123',
          amount: 299.99,
          currency: 'ZAR',
          status: 'completed',
          timestamp: new Date().toISOString(),
          signature: 'webhook_signature',
          response_code: '00',
          response_message: 'Transaction approved'
        };

        await webhookHandler.processWebhook(
          webhookData,
          violation.signature,
          webhookData.timestamp
        );
      }

      // Verify security violation alerts
      const securityAlerts = mockAuditLogs.filter(log => 
        log.event_type === 'webhook_security_violation'
      );
      expect(securityAlerts.length).toBe(securityViolations.length);

      // Verify each violation type was detected
      securityViolations.forEach(violation => {
        const alert = securityAlerts.find(log => 
          log.violation_type === violation.expectedAlert
        );
        expect(alert).toBeDefined();
      });
    });
  });

  describe('Production Configuration Validation (Requirement 5.1)', () => {
    it('should validate production webhook configuration', async () => {
      const configValidation = await productionValidator.validateWebhookConfiguration();

      expect(configValidation.valid).toBe(true);
      expect(configValidation.webhook_url_configured).toBe(true);
      expect(configValidation.signature_validation_enabled).toBe(true);
      expect(configValidation.ssl_certificate_valid).toBe(true);
      expect(configValidation.rate_limiting_configured).toBe(true);
    });

    it('should validate production security settings', async () => {
      const securityValidation = await productionValidator.validateSecurityConfiguration();

      expect(securityValidation.valid).toBe(true);
      expect(securityValidation.webhook_secret_configured).toBe(true);
      expect(securityValidation.signature_algorithm_secure).toBe(true);
      expect(securityValidation.timestamp_validation_enabled).toBe(true);
      expect(securityValidation.audit_logging_enabled).toBe(true);
    });

    it('should detect test mode in production environment', async () => {
      // Mock test mode detection
      const testModeValidation = await productionValidator.validateProductionMode();

      expect(testModeValidation.production_mode).toBe(true);
      expect(testModeValidation.test_mode_disabled).toBe(true);
      expect(testModeValidation.mock_data_disabled).toBe(true);
      expect(testModeValidation.production_api_endpoints).toBe(true);
    });
  });

  describe('Comprehensive Security Testing', () => {
    it('should handle webhook replay attacks', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'replay_attack_txn',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'webhook_signature',
        response_code: '00',
        response_message: 'Transaction approved'
      };

      const payload = JSON.stringify(webhookData);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        webhookData.timestamp
      );

      // Process webhook first time
      const firstResult = await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        webhookData.timestamp
      );

      expect(firstResult.processed).toBe(true);

      // Wait and try to replay (simulate replay attack)
      await new Promise(resolve => setTimeout(resolve, 100));

      const replayResult = await webhookHandler.processWebhook(
        webhookData,
        validSignature,
        webhookData.timestamp
      );

      expect(replayResult.processed).toBe(false);
      expect(replayResult.error).toContain('Duplicate webhook detected');

      // Verify replay attack was logged
      const replayLog = mockAuditLogs.find(log => 
        log.event_type === 'security_alert' &&
        log.alert_type === 'potential_replay_attack'
      );
      expect(replayLog).toBeDefined();
    });

    it('should validate webhook source IP restrictions', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'ip_restriction_txn',
        reference: 'test_payment_ref_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'webhook_signature',
        response_code: '00',
        response_message: 'Transaction approved'
      };

      const payload = JSON.stringify(webhookData);
      const validSignature = await WebhookSignatureValidator.generateValidSignature(
        payload, 
        webhookData.timestamp
      );

      // Mock request with invalid source IP
      const mockRequest = {
        ip: '192.168.1.100', // Not in allowed IP range
        headers: {
          'x-forwarded-for': '192.168.1.100',
          'user-agent': 'Suspicious-Bot/1.0'
        }
      };

      const result = await webhookHandler.processWebhookWithIPValidation(
        webhookData,
        validSignature,
        webhookData.timestamp,
        mockRequest
      );

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook source IP not allowed');

      // Verify IP restriction violation was logged
      const ipViolationLog = mockAuditLogs.find(log => 
        log.event_type === 'webhook_security_violation' &&
        log.violation_type === 'unauthorized_source_ip'
      );
      expect(ipViolationLog).toBeDefined();
    });
  });
});