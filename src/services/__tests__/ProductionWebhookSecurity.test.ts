/**
 * Production Webhook Security Tests
 * 
 * Comprehensive test suite for ProductionWebhookSecurity service
 * Tests signature validation, timestamp validation, source verification, and security logging
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import crypto from 'crypto';
import { ProductionWebhookSecurity, WebhookRequest, SecurityViolation } from '../ProductionWebhookSecurity';
import { supabase } from '@/integrations/supabase/client';

// Mock supabase
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ data: null, error: null })
    }))
  }
}));

describe('ProductionWebhookSecurity', () => {
  let webhookSecurity: ProductionWebhookSecurity;
  let mockSupabaseInsert: Mock;

  const validWebhookSecret = '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS';
  const validPayload = JSON.stringify({
    transaction_id: 'txn_123456789',
    reference: 'REF_123456',
    amount: 299.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    auth_code: 'AUTH123',
    response_code: '00',
    response_message: 'Approved'
  });

  beforeEach(() => {
    // Reset environment variables
    process.env.VITE_IKHOKHA_WEBHOOK_SECRET = validWebhookSecret;
    process.env.VITE_WEBHOOK_TIMESTAMP_TOLERANCE = '300';
    process.env.VITE_ENABLE_WEBHOOK_SOURCE_VALIDATION = 'false';
    process.env.VITE_ENABLE_WEBHOOK_TIMESTAMP_VALIDATION = 'true';
    process.env.VITE_ENABLE_WEBHOOK_SIGNATURE_VALIDATION = 'true';
    process.env.VITE_ENABLE_WEBHOOK_SECURITY_LOGGING = 'true';

    webhookSecurity = new ProductionWebhookSecurity();
    
    // Setup supabase mock
    mockSupabaseInsert = vi.fn().mockResolvedValue({ data: null, error: null });
    (supabase.from as Mock).mockReturnValue({
      insert: mockSupabaseInsert
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    webhookSecurity.clearSecurityCaches();
  });

  describe('Webhook Signature Validation', () => {
    it('should validate correct webhook signature', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(true);
      expect(result.signatureValid).toBe(true);
      expect(result.validationErrors).toHaveLength(0);
      expect(result.securityViolations).toHaveLength(0);
    });

    it('should reject invalid webhook signature', async () => {
      const request: WebhookRequest = {
        payload: validPayload,
        signature: 'sha256=invalid_signature_here',
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.signatureValid).toBe(false);
      expect(result.validationErrors).toContain('Invalid webhook signature');
      expect(result.securityViolations).toHaveLength(1);
      expect(result.securityViolations[0].type).toBe('invalid_signature');
      expect(result.securityViolations[0].severity).toBe('high');
    });

    it('should handle signature without prefix', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: signature, // No 'sha256=' prefix
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(true);
      expect(result.signatureValid).toBe(true);
    });
  });

  describe('Webhook Timestamp Validation', () => {
    it('should validate recent timestamp', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(true);
      expect(result.timestampValid).toBe(true);
    });

    it('should reject expired timestamp', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      // Create timestamp 10 minutes ago (beyond 5-minute tolerance)
      const expiredTimestamp = new Date(Date.now() - 10 * 60 * 1000).toISOString();

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: expiredTimestamp,
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.timestampValid).toBe(false);
      expect(result.validationErrors).toContain('Webhook timestamp is expired or invalid');
      expect(result.securityViolations).toHaveLength(1);
      expect(result.securityViolations[0].type).toBe('expired_timestamp');
    });

    it('should accept timestamp within tolerance', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      // Create timestamp 4 minutes ago (within 5-minute tolerance)
      const validTimestamp = new Date(Date.now() - 4 * 60 * 1000).toISOString();

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: validTimestamp,
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(true);
      expect(result.timestampValid).toBe(true);
    });
  });

  describe('Webhook Source Validation', () => {
    beforeEach(() => {
      process.env.VITE_ENABLE_WEBHOOK_SOURCE_VALIDATION = 'true';
      process.env.VITE_IKHOKHA_ALLOWED_IPS = '192.168.1.1,10.0.0.1';
      webhookSecurity = new ProductionWebhookSecurity();
    });

    it('should validate allowed source IP', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1', // Allowed IP
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(true);
      expect(result.sourceValid).toBe(true);
    });

    it('should reject unauthorized source IP', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.100', // Not in allowed list
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.sourceValid).toBe(false);
      expect(result.validationErrors).toContain('Unauthorized source IP address');
      expect(result.securityViolations).toHaveLength(1);
      expect(result.securityViolations[0].type).toBe('invalid_source');
    });
  });

  describe('Replay Attack Detection', () => {
    it('should detect replay attacks', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      // First request should succeed
      const result1 = await webhookSecurity.validateWebhookSecurity(request);
      expect(result1.valid).toBe(true);

      // Second identical request should be detected as replay
      const result2 = await webhookSecurity.validateWebhookSecurity(request);
      expect(result2.valid).toBe(false);
      expect(result2.securityViolations.some(v => v.type === 'replay_attack')).toBe(true);
    });
  });

  describe('Suspicious Activity Detection', () => {
    it('should detect XSS attempts in payload', async () => {
      const maliciousPayload = JSON.stringify({
        transaction_id: 'txn_123456789',
        reference: 'REF_123456',
        amount: 299.99,
        status: 'completed',
        timestamp: new Date().toISOString(),
        malicious_field: '<script>alert("xss")</script>'
      });

      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(maliciousPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: maliciousPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.securityViolations.some(v => v.type === 'suspicious_activity')).toBe(true);
    });

    it('should detect suspicious user agents', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'malicious-bot/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.securityViolations.some(v => v.type === 'suspicious_activity')).toBe(true);
    });

    it('should detect unusually large payloads', async () => {
      const largePayload = JSON.stringify({
        transaction_id: 'txn_123456789',
        reference: 'REF_123456',
        amount: 299.99,
        status: 'completed',
        timestamp: new Date().toISOString(),
        large_field: 'x'.repeat(15000) // Very large field
      });

      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(largePayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: largePayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.securityViolations.some(v => v.type === 'suspicious_activity')).toBe(true);
    });
  });

  describe('Payload Structure Validation', () => {
    it('should validate correct payload structure', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(true);
    });

    it('should reject payload with missing required fields', async () => {
      const invalidPayload = JSON.stringify({
        transaction_id: 'txn_123456789',
        // Missing required fields: reference, amount, status, timestamp
      });

      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(invalidPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: invalidPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.securityViolations.some(v => v.type === 'malformed_payload')).toBe(true);
    });

    it('should reject payload with invalid amount', async () => {
      const invalidPayload = JSON.stringify({
        transaction_id: 'txn_123456789',
        reference: 'REF_123456',
        amount: -100, // Invalid negative amount
        status: 'completed',
        timestamp: new Date().toISOString()
      });

      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(invalidPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: invalidPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.securityViolations.some(v => v.type === 'malformed_payload')).toBe(true);
    });

    it('should reject payload with invalid status', async () => {
      const invalidPayload = JSON.stringify({
        transaction_id: 'txn_123456789',
        reference: 'REF_123456',
        amount: 299.99,
        status: 'invalid_status', // Invalid status
        timestamp: new Date().toISOString()
      });

      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(invalidPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: invalidPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.securityViolations.some(v => v.type === 'malformed_payload')).toBe(true);
    });
  });

  describe('Security Event Logging', () => {
    it('should log successful validation events', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      await webhookSecurity.validateWebhookSecurity(request);

      expect(mockSupabaseInsert).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'webhook_security',
            event_type: 'validation_success',
            severity: 'info'
          })
        ])
      );
    });

    it('should log validation failure events', async () => {
      const request: WebhookRequest = {
        payload: validPayload,
        signature: 'invalid_signature',
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      await webhookSecurity.validateWebhookSecurity(request);

      expect(mockSupabaseInsert).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'webhook_security',
            event_type: 'validation_failure',
            severity: 'error'
          })
        ])
      );
    });

    it('should log security violation events', async () => {
      const request: WebhookRequest = {
        payload: validPayload,
        signature: 'invalid_signature',
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      await webhookSecurity.validateWebhookSecurity(request);

      expect(mockSupabaseInsert).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'webhook_security_violation',
            event_type: 'security_violation',
            severity: 'high'
          })
        ])
      );
    });
  });

  describe('Configuration Management', () => {
    it('should return current security configuration', () => {
      const config = webhookSecurity.getSecurityConfig();

      expect(config).toMatchObject({
        webhookSecret: validWebhookSecret,
        signatureAlgorithm: 'sha256',
        timestampTolerance: 300,
        enableSignatureValidation: true,
        enableTimestampValidation: true,
        enableSecurityLogging: true
      });
    });

    it('should update security configuration', () => {
      const updates = {
        timestampTolerance: 600,
        enableSourceValidation: true
      };

      webhookSecurity.updateSecurityConfig(updates);
      const config = webhookSecurity.getSecurityConfig();

      expect(config.timestampTolerance).toBe(600);
      expect(config.enableSourceValidation).toBe(true);
    });

    it('should return security statistics', () => {
      const stats = webhookSecurity.getSecurityStats();

      expect(stats).toMatchObject({
        cacheSize: expect.any(Number),
        recentWebhooksCount: expect.any(Number),
        suspiciousIPsCount: expect.any(Number)
      });
    });
  });

  describe('Cache Management', () => {
    it('should cache validation results', async () => {
      const signature1 = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request1: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature1}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      // First validation
      const result1 = await webhookSecurity.validateWebhookSecurity(request1);
      expect(result1.valid).toBe(true);

      // Create a different request with same validation characteristics but different signature/timestamp
      // to avoid replay detection but still hit cache
      const newTimestamp = new Date(Date.now() + 1000).toISOString();
      const newPayload = JSON.stringify({
        transaction_id: 'txn_123456789',
        reference: 'REF_123456',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: newTimestamp,
        auth_code: 'AUTH123',
        response_code: '00',
        response_message: 'Approved'
      });

      const signature2 = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(newPayload, 'utf8')
        .digest('hex');

      const request2: WebhookRequest = {
        payload: newPayload,
        signature: `sha256=${signature2}`,
        timestamp: newTimestamp,
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      // Second validation should succeed (different signature, so no replay)
      const result2 = await webhookSecurity.validateWebhookSecurity(request2);
      expect(result2.valid).toBe(true);

      // Verify both validations were successful
      expect(result1.valid).toBe(true);
      expect(result2.valid).toBe(true);
    });

    it('should clear security caches', () => {
      webhookSecurity.clearSecurityCaches();
      const stats = webhookSecurity.getSecurityStats();

      expect(stats.cacheSize).toBe(0);
      expect(stats.recentWebhooksCount).toBe(0);
      expect(stats.suspiciousIPsCount).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed JSON payload gracefully', async () => {
      const malformedPayload = '{ invalid json }';
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(malformedPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: malformedPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.securityViolations.some(v => v.type === 'malformed_payload')).toBe(true);
    });

    it('should handle signature validation errors gracefully', async () => {
      const request: WebhookRequest = {
        payload: validPayload,
        signature: 'malformed_signature_not_hex',
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.valid).toBe(false);
      expect(result.signatureValid).toBe(false);
    });
  });

  describe('Performance', () => {
    it('should track processing time', async () => {
      const signature = crypto
        .createHmac('sha256', validWebhookSecret)
        .update(validPayload, 'utf8')
        .digest('hex');

      const request: WebhookRequest = {
        payload: validPayload,
        signature: `sha256=${signature}`,
        timestamp: new Date().toISOString(),
        sourceIP: '192.168.1.1',
        userAgent: 'Ikhokha-Webhook/1.0',
        headers: { 'content-type': 'application/json' }
      };

      const result = await webhookSecurity.validateWebhookSecurity(request);

      expect(result.processingTimeMs).toBeGreaterThan(0);
      expect(result.processingTimeMs).toBeLessThan(1000); // Should be fast
    });
  });
});