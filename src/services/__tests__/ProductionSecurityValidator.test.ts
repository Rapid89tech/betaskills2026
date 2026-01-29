/**
 * Production Security Validator Tests
 * 
 * Tests for the ProductionSecurityValidator service to ensure proper
 * security validation functionality for production deployment.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductionSecurityValidator } from '../ProductionSecurityValidator';

// Mock environment variables
const mockEnv = {
  VITE_IKHOKHA_API_URL: 'https://api.ikhokha.com',
  VITE_PRODUCTION_URL: 'https://betaskill.com',
  VITE_WEBHOOK_ENDPOINT: 'https://betaskill.com/api/webhooks/ikhokha',
  VITE_ENABLE_WEBHOOK_VALIDATION: 'true',
  VITE_WEBHOOK_TIMESTAMP_TOLERANCE: '300',
  VITE_ENABLE_CARD_PAYMENT_THREAT_DETECTION: 'true'
};

// Mock import.meta.env globally
Object.defineProperty(globalThis, 'import', {
  value: {
    meta: {
      env: mockEnv
    }
  },
  writable: true
});

describe('ProductionSecurityValidator', () => {
  let validator: ProductionSecurityValidator;

  beforeEach(() => {
    validator = new ProductionSecurityValidator();
  });

  describe('validateApiKeyStrength', () => {
    it('should validate the correct production API key', () => {
      const result = validator.validateApiKeyStrength('IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D');
      
      expect(result.credential_strength_valid).toBe(true);
      expect(result.no_development_patterns).toBe(true);
      expect(result.proper_format).toBe(true);
      expect(result.security_score).toBe(100);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject incorrect API key', () => {
      const result = validator.validateApiKeyStrength('WRONG_API_KEY');
      
      expect(result.credential_strength_valid).toBe(false);
      expect(result.errors).toContain('API key does not match expected production key');
    });

    it('should reject API key with development patterns', () => {
      const result = validator.validateApiKeyStrength('TEST_API_KEY_12345678901234567890');
      
      expect(result.no_development_patterns).toBe(false);
      expect(result.errors).toContain('API key contains development patterns');
    });

    it('should reject short API key', () => {
      const result = validator.validateApiKeyStrength('SHORT');
      
      expect(result.credential_strength_valid).toBe(false);
      expect(result.errors).toContain('API key length is insufficient (minimum 32 characters)');
    });
  });

  describe('validateSecretStrength', () => {
    it('should validate the correct production API secret', () => {
      const result = validator.validateSecretStrength('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      
      expect(result.credential_strength_valid).toBe(true);
      expect(result.no_development_patterns).toBe(true);
      expect(result.proper_format).toBe(true);
      expect(result.security_score).toBe(100);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject incorrect API secret', () => {
      const result = validator.validateSecretStrength('WRONG_SECRET');
      
      expect(result.credential_strength_valid).toBe(false);
      expect(result.errors).toContain('API secret does not match expected production secret');
    });

    it('should warn about character diversity', () => {
      const result = validator.validateSecretStrength('ALLUPPERCASESECRET1234567890123456');
      
      expect(result.warnings).toContain('API secret should contain uppercase, lowercase, and numeric characters');
    });
  });

  describe('validateWebhookSecretStrength', () => {
    it('should validate the correct production webhook secret', () => {
      const result = validator.validateWebhookSecretStrength('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      
      expect(result.credential_strength_valid).toBe(true);
      expect(result.no_development_patterns).toBe(true);
      expect(result.proper_format).toBe(true);
      expect(result.security_score).toBe(100);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject short webhook secret', () => {
      const result = validator.validateWebhookSecretStrength('SHORT');
      
      expect(result.credential_strength_valid).toBe(false);
      expect(result.errors).toContain('Webhook secret length is insufficient (minimum 16 characters)');
    });
  });

  describe('validateHttpsEndpoints', () => {
    it('should validate HTTPS endpoints', () => {
      const result = validator.validateHttpsEndpoints();
      
      expect(result.https_enforced).toBe(true);
      expect(result.certificates_valid).toBe(true);
      expect(result.secure_protocols_only).toBe(true);
      expect(result.no_insecure_endpoints).toBe(true);
      expect(result.tls_version_valid).toBe(true);
    });

    it('should reject HTTP endpoints', () => {
      // Temporarily change the environment
      const originalEnv = globalThis.import.meta.env;
      globalThis.import.meta.env = {
        ...mockEnv,
        VITE_IKHOKHA_API_URL: 'http://api.ikhokha.com'
      };
      
      const newValidator = new ProductionSecurityValidator();
      const result = newValidator.validateHttpsEndpoints();
      
      expect(result.https_enforced).toBe(false);
      expect(result.no_insecure_endpoints).toBe(false);
      
      // Restore original environment
      globalThis.import.meta.env = originalEnv;
    });
  });

  describe('validateWebhookSecurity', () => {
    it('should validate webhook security configuration', () => {
      const result = validator.validateWebhookSecurity();
      
      expect(result.signature_validation_enabled).toBe(true);
      expect(result.timestamp_validation_enabled).toBe(true);
      expect(result.source_validation_enabled).toBe(true);
      expect(result.secure_endpoints_only).toBe(true);
      expect(result.proper_authentication).toBe(true);
    });

    it('should detect disabled webhook validation', () => {
      // Temporarily change the environment
      const originalEnv = globalThis.import.meta.env;
      globalThis.import.meta.env = {
        ...mockEnv,
        VITE_ENABLE_WEBHOOK_VALIDATION: 'false'
      };
      
      const newValidator = new ProductionSecurityValidator();
      const result = newValidator.validateWebhookSecurity();
      
      expect(result.signature_validation_enabled).toBe(false);
      expect(result.proper_authentication).toBe(false);
      
      // Restore original environment
      globalThis.import.meta.env = originalEnv;
    });
  });

  describe('validateCertificates', () => {
    it('should validate certificates for HTTPS production domain', () => {
      const result = validator.validateCertificates();
      
      expect(result.certificate_valid).toBe(true);
      expect(result.certificate_not_expired).toBe(true);
      expect(result.certificate_trusted).toBe(true);
      expect(result.certificate_chain_valid).toBe(true);
      expect(result.certificate_revocation_checked).toBe(true);
    });

    it('should reject certificates for non-HTTPS endpoints', () => {
      // Temporarily change the environment
      const originalEnv = globalThis.import.meta.env;
      globalThis.import.meta.env = {
        ...mockEnv,
        VITE_IKHOKHA_API_URL: 'http://api.ikhokha.com'
      };
      
      const newValidator = new ProductionSecurityValidator();
      const result = newValidator.validateCertificates();
      
      expect(result.certificate_valid).toBe(false);
      expect(result.certificate_not_expired).toBe(false);
      expect(result.certificate_trusted).toBe(false);
      
      // Restore original environment
      globalThis.import.meta.env = originalEnv;
    });
  });

  describe('performSecurityAudit', () => {
    it('should perform comprehensive security audit', () => {
      const result = validator.performSecurityAudit();
      
      expect(result.overall_security_score).toBeGreaterThan(0);
      expect(result.security_level).toBeOneOf(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']);
      expect(result.passed_checks).toBeInstanceOf(Array);
      expect(result.failed_checks).toBeInstanceOf(Array);
      expect(result.warnings).toBeInstanceOf(Array);
      expect(result.recommendations).toBeInstanceOf(Array);
      expect(result.audit_timestamp).toBeInstanceOf(Date);
      expect(result.audit_version).toBe('1.0.0');
    });

    it('should achieve high security score with proper configuration', () => {
      const result = validator.performSecurityAudit();
      
      expect(result.overall_security_score).toBeGreaterThanOrEqual(90);
      expect(result.security_level).toBe('HIGH');
    });
  });

  describe('generateSecurityReport', () => {
    it('should generate comprehensive security report', () => {
      const result = validator.generateSecurityReport();
      
      expect(result.summary).toBeDefined();
      expect(result.summary.total_checks).toBeGreaterThan(0);
      expect(result.summary.security_score).toBeGreaterThanOrEqual(0);
      expect(result.credential_security).toBeDefined();
      expect(result.endpoint_security).toBeDefined();
      expect(result.webhook_security).toBeDefined();
      expect(result.certificate_security).toBeDefined();
      expect(result.recommendations).toBeInstanceOf(Array);
      expect(result.next_audit_date).toBeInstanceOf(Date);
      expect(result.report_generated).toBeInstanceOf(Date);
    });

    it('should set next audit date to 7 days from now', () => {
      const result = validator.generateSecurityReport();
      const expectedDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const timeDiff = Math.abs(result.next_audit_date.getTime() - expectedDate.getTime());
      
      // Allow 1 second tolerance for test execution time
      expect(timeDiff).toBeLessThan(1000);
    });
  });

  describe('validateProductionSecurity', () => {
    it('should validate production security successfully', () => {
      const result = validator.validateProductionSecurity();
      
      expect(result.is_valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should log security events', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      validator.validateProductionSecurity();
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });
  });

  describe('logSecurityEvent', () => {
    it('should log security events', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      validator.logSecurityEvent({
        event_type: 'VALIDATION_FAILURE',
        severity: 'MEDIUM',
        message: 'Test security event',
        details: { test: true },
        timestamp: new Date(),
        source: 'Test'
      });
      
      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should trigger alerts for critical events', () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      validator.logSecurityEvent({
        event_type: 'SECURITY_VIOLATION',
        severity: 'CRITICAL',
        message: 'Critical security event',
        details: { critical: true },
        timestamp: new Date(),
        source: 'Test'
      });
      
      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('getSecurityEvents', () => {
    it('should return security events', () => {
      validator.logSecurityEvent({
        event_type: 'VALIDATION_FAILURE',
        severity: 'LOW',
        message: 'Test event',
        details: {},
        timestamp: new Date(),
        source: 'Test'
      });
      
      const events = validator.getSecurityEvents();
      
      expect(events).toHaveLength(1);
      expect(events[0].message).toBe('Test event');
    });

    it('should limit returned events', () => {
      // Add multiple events
      for (let i = 0; i < 5; i++) {
        validator.logSecurityEvent({
          event_type: 'VALIDATION_FAILURE',
          severity: 'LOW',
          message: `Test event ${i}`,
          details: {},
          timestamp: new Date(),
          source: 'Test'
        });
      }
      
      const events = validator.getSecurityEvents(3);
      
      expect(events).toHaveLength(3);
    });
  });
});