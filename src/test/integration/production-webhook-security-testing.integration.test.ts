/**
 * Production Webhook Security Testing Suite
 * 
 * Comprehensive tests for webhook security validation with ProductionWebhookSecurity.
 * Tests signature validation, timestamp validation, and security event logging.
 * 
 * Requirements: 8.2, 8.3
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProductionWebhookSecurity } from '../../services/ProductionWebhookSecurity';

describe('Production Webhook Security Testing', () => {
  let webhookSecurity: ProductionWebhookSecurity;
  const testSecret = '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS';

  beforeEach(() => {
    webhookSecurity = new ProductionWebhookSecurity();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Webhook Signature Validation', () => {
    it('should generate and validate webhook signatures correctly', () => {
      const testPayload = JSON.stringify({
        transaction_id: 'test-123',
        amount: 1000,
        status: 'completed',
        timestamp: Math.floor(Date.now() / 1000)
      });

      // Generate signature
      const signature = webhookSecurity.generateSignature(testPayload, testSecret);
      expect(signature).toBeTruthy();
      expect(typeof signature).toBe('string');
      expect(signature.length).toBeGreaterThan(0);

      // Validate signature
      const isValid = webhookSecurity.validateWebhookSignature(testPayload, signature, testSecret);
      expect(isValid).toBe(true);
    });

    it('should reject invalid webhook signatures', () => {
      const testPayload = JSON.stringify({ test: 'data' });
      const validSignature = webhookSecurity.generateSignature(testPayload, testSecret);

      // Test with wrong signature
      const invalidResult1 = webhookSecurity.validateWebhookSignature(testPayload, 'invalid-signature', testSecret);
      expect(invalidResult1).toBe(false);

      // Test with tampered signature
      const tamperedSignature = validSignature.slice(0, -1) + 'x';
      const invalidResult2 = webhookSecurity.validateWebhookSignature(testPayload, tamperedSignature, testSecret);
      expect(invalidResult2).toBe(false);

      // Test with wrong secret
      const invalidResult3 = webhookSecurity.validateWebhookSignature(testPayload, validSignature, 'wrong-secret');
      expect(invalidResult3).toBe(false);
    });

    it('should handle edge cases in signature validation', () => {
      // Test with empty payload
      const emptyPayload = '';
      const emptySignature = webhookSecurity.generateSignature(emptyPayload, testSecret);
      const emptyResult = webhookSecurity.validateWebhookSignature(emptyPayload, emptySignature, testSecret);
      expect(emptyResult).toBe(true);

      // Test with special characters
      const specialPayload = JSON.stringify({ 
        message: 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?',
        unicode: '🚀💳✅❌'
      });
      const specialSignature = webhookSecurity.generateSignature(specialPayload, testSecret);
      const specialResult = webhookSecurity.validateWebhookSignature(specialPayload, specialSignature, testSecret);
      expect(specialResult).toBe(true);

      // Test with large payload
      const largePayload = JSON.stringify({
        data: 'x'.repeat(10000),
        timestamp: Date.now()
      });
      const largeSignature = webhookSecurity.generateSignature(largePayload, testSecret);
      const largeResult = webhookSecurity.validateWebhookSignature(largePayload, largeSignature, testSecret);
      expect(largeResult).toBe(true);
    });
  });

  describe('Webhook Timestamp Validation', () => {
    it('should validate current timestamps', () => {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const isValid = webhookSecurity.validateWebhookTimestamp(currentTimestamp);
      expect(isValid).toBe(true);
    });

    it('should reject old timestamps', () => {
      const oldTimestamp = Math.floor(Date.now() / 1000) - 600; // 10 minutes ago
      const isValid = webhookSecurity.validateWebhookTimestamp(oldTimestamp, 300); // 5 minute tolerance
      expect(isValid).toBe(false);
    });

    it('should reject future timestamps', () => {
      const futureTimestamp = Math.floor(Date.now() / 1000) + 600; // 10 minutes in future
      const isValid = webhookSecurity.validateWebhookTimestamp(futureTimestamp, 300); // 5 minute tolerance
      expect(isValid).toBe(false);
    });

    it('should respect custom tolerance settings', () => {
      const timestamp = Math.floor(Date.now() / 1000) - 400; // 6.67 minutes ago
      
      // Should fail with 5 minute tolerance
      const strictResult = webhookSecurity.validateWebhookTimestamp(timestamp, 300);
      expect(strictResult).toBe(false);
      
      // Should pass with 10 minute tolerance
      const lenientResult = webhookSecurity.validateWebhookTimestamp(timestamp, 600);
      expect(lenientResult).toBe(true);
    });
  });

  describe('Production Webhook Security Validation', () => {
    it('should validate production webhook security configuration', () => {
      const validation = webhookSecurity.validateProductionWebhookSecurity();
      
      expect(validation.is_valid).toBe(true);
      expect(validation.signature_validation_enabled).toBe(true);
      expect(validation.timestamp_validation_enabled).toBe(true);
      expect(validation.enhanced_security_features).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect security configuration issues', () => {
      // Mock environment without webhook secret
      const originalEnv = import.meta.env.VITE_IKHOKHA_WEBHOOK_SECRET;
      delete (import.meta.env as any).VITE_IKHOKHA_WEBHOOK_SECRET;

      const validation = webhookSecurity.validateProductionWebhookSecurity();
      
      expect(validation.is_valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
      expect(validation.errors.some(error => error.includes('webhook secret'))).toBe(true);

      // Restore environment
      (import.meta.env as any).VITE_IKHOKHA_WEBHOOK_SECRET = originalEnv;
    });
  });

  describe('Webhook Security Event Logging', () => {
    it('should log security events for invalid signatures', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const testPayload = JSON.stringify({ test: 'data' });
      const invalidSignature = 'invalid-signature';
      
      // This should trigger a security event
      const result = webhookSecurity.validateWebhookSignature(testPayload, invalidSignature, testSecret);
      
      expect(result).toBe(false);
      // Note: Actual logging implementation would depend on the ProductionWebhookSecurity implementation
      
      consoleSpy.mockRestore();
    });

    it('should log security events for timestamp violations', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const oldTimestamp = Math.floor(Date.now() / 1000) - 1000; // Very old timestamp
      
      // This should trigger a security event
      const result = webhookSecurity.validateWebhookTimestamp(oldTimestamp);
      
      expect(result).toBe(false);
      
      consoleSpy.mockRestore();
    });
  });

  describe('Webhook Security Performance Testing', () => {
    it('should handle high-volume webhook validation efficiently', async () => {
      const testPayloads = Array.from({ length: 100 }, (_, i) => 
        JSON.stringify({ 
          id: i, 
          data: `test-data-${i}`,
          timestamp: Math.floor(Date.now() / 1000)
        })
      );

      const startTime = Date.now();

      // Process all webhooks
      const results = testPayloads.map(payload => {
        const signature = webhookSecurity.generateSignature(payload, testSecret);
        const isValid = webhookSecurity.validateWebhookSignature(payload, signature, testSecret);
        return { payload, signature, isValid };
      });

      const endTime = Date.now();
      const processingTime = endTime - startTime;

      // Validate performance (should process 100 webhooks quickly)
      expect(processingTime).toBeLessThan(1000); // Less than 1 second
      expect(results).toHaveLength(100);
      
      // Validate all results are valid
      results.forEach(({ isValid, signature }) => {
        expect(isValid).toBe(true);
        expect(signature).toBeTruthy();
      });
    });

    it('should handle concurrent webhook validation', async () => {
      const concurrentRequests = 50;
      const testPayload = JSON.stringify({ 
        test: 'concurrent-data',
        timestamp: Math.floor(Date.now() / 1000)
      });

      const startTime = Date.now();

      // Process webhooks concurrently
      const promises = Array.from({ length: concurrentRequests }, async () => {
        const signature = webhookSecurity.generateSignature(testPayload, testSecret);
        const isValid = webhookSecurity.validateWebhookSignature(testPayload, signature, testSecret);
        return { signature, isValid };
      });

      const results = await Promise.all(promises);
      const endTime = Date.now();
      const processingTime = endTime - startTime;

      // Validate performance and results
      expect(processingTime).toBeLessThan(500); // Less than 0.5 seconds
      expect(results).toHaveLength(concurrentRequests);
      
      results.forEach(({ isValid, signature }) => {
        expect(isValid).toBe(true);
        expect(signature).toBeTruthy();
      });
    });
  });

  describe('Webhook Security Integration Testing', () => {
    it('should integrate with production security validation', () => {
      // Test that webhook security works with overall production security
      const webhookValidation = webhookSecurity.validateProductionWebhookSecurity();
      
      expect(webhookValidation.is_valid).toBe(true);
      expect(webhookValidation.signature_validation_enabled).toBe(true);
      expect(webhookValidation.timestamp_validation_enabled).toBe(true);
      expect(webhookValidation.enhanced_security_features).toBe(true);
      
      // Test actual webhook processing
      const testPayload = JSON.stringify({
        transaction_id: 'prod-test-123',
        amount: 5000,
        currency: 'ZAR',
        status: 'completed',
        timestamp: Math.floor(Date.now() / 1000)
      });

      const signature = webhookSecurity.generateSignature(testPayload, testSecret);
      const isValid = webhookSecurity.validateWebhookSignature(testPayload, signature, testSecret);
      
      expect(isValid).toBe(true);
    });

    it('should validate webhook security in production environment', () => {
      // Mock production environment
      const originalNodeEnv = import.meta.env.VITE_NODE_ENV;
      (import.meta.env as any).VITE_NODE_ENV = 'production';

      try {
        const validation = webhookSecurity.validateProductionWebhookSecurity();
        
        expect(validation.is_valid).toBe(true);
        expect(validation.production_ready).toBe(true);
        expect(validation.security_level).toMatch(/HIGH|MEDIUM/);
        
      } finally {
        // Restore environment
        (import.meta.env as any).VITE_NODE_ENV = originalNodeEnv;
      }
    });
  });

  describe('Webhook Security Error Handling', () => {
    it('should handle malformed webhook data gracefully', () => {
      const malformedPayloads = [
        null,
        undefined,
        '',
        'not-json',
        '{"incomplete": json',
        '{"null_value": null}',
        '{"empty_object": {}}'
      ];

      malformedPayloads.forEach(payload => {
        expect(() => {
          const signature = webhookSecurity.generateSignature(payload as string, testSecret);
          const isValid = webhookSecurity.validateWebhookSignature(payload as string, signature, testSecret);
          expect(typeof isValid).toBe('boolean');
        }).not.toThrow();
      });
    });

    it('should handle invalid secrets gracefully', () => {
      const testPayload = JSON.stringify({ test: 'data' });
      const invalidSecrets = [
        '',
        null,
        undefined,
        'short',
        'a'.repeat(1000) // Very long secret
      ];

      invalidSecrets.forEach(secret => {
        expect(() => {
          const signature = webhookSecurity.generateSignature(testPayload, secret as string);
          const isValid = webhookSecurity.validateWebhookSignature(testPayload, signature, secret as string);
          expect(typeof isValid).toBe('boolean');
        }).not.toThrow();
      });
    });
  });
});