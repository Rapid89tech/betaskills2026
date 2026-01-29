/**
 * Production Webhook Service Tests
 * 
 * Tests for production webhook configuration and processing
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductionWebhookService } from '../ProductionWebhookService';
import { IkhokhaWebhook } from '../../types/ikhokha';

// Mock environment variables
const mockEnv = {
  VITE_NODE_ENV: 'production',
  VITE_PRODUCTION_URL: 'https://app.betaskill.com',
  VITE_IKHOKHA_WEBHOOK_SECRET: 'production_webhook_secret_key'
};

// Mock fetch
global.fetch = vi.fn();

describe('ProductionWebhookService', () => {
  let service: ProductionWebhookService;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock import.meta.env
    Object.defineProperty(import.meta, 'env', {
      value: mockEnv,
      writable: true
    });
  });

  describe('configureProductionWebhook', () => {
    it('should configure production webhook endpoint correctly', () => {
      service = new ProductionWebhookService();
      
      const config = service.configureProductionWebhook();
      
      expect(config.url).toBe('https://app.betaskill.com/.netlify/functions/ikhokha-webhook');
      expect(config.enabled).toBe(true);
      expect(config.secret).toBe('production_webhook_secret_key');
      expect(config.retryConfig.maxRetries).toBe(5);
    });

    it('should throw error in non-production environment', () => {
      // Mock development environment
      Object.defineProperty(import.meta, 'env', {
        value: { ...mockEnv, VITE_NODE_ENV: 'development' },
        writable: true
      });

      service = new ProductionWebhookService();
      
      expect(() => service.configureProductionWebhook()).toThrow(
        'Production webhook configuration can only be used in production environment'
      );
    });
  });

  describe('validateProductionWebhookSignature', () => {
    beforeEach(() => {
      service = new ProductionWebhookService();
    });

    it('should validate signature in production', async () => {
      const payload = '{"test": "data"}';
      const signature = 'sha256=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
      const timestamp = new Date().toISOString();

      const isValid = await service.validateProductionWebhookSignature(payload, signature, timestamp);
      
      expect(isValid).toBe(true);
    });

    it('should reject missing signature in production', async () => {
      const payload = '{"test": "data"}';
      const timestamp = new Date().toISOString();

      const isValid = await service.validateProductionWebhookSignature(payload, '', timestamp);
      
      expect(isValid).toBe(false);
    });

    it('should reject old timestamps', async () => {
      const payload = '{"test": "data"}';
      const signature = 'sha256=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
      const oldTimestamp = new Date(Date.now() - 10 * 60 * 1000).toISOString(); // 10 minutes ago

      const isValid = await service.validateProductionWebhookSignature(payload, signature, oldTimestamp);
      
      expect(isValid).toBe(false);
    });
  });

  describe('processProductionWebhook', () => {
    beforeEach(() => {
      service = new ProductionWebhookService();
    });

    it('should process valid webhook successfully', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_123456789',
        reference: 'ref_test_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'sha256=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        response_code: '00',
        response_message: 'Approved'
      };

      // Mock successful fetch response
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          result: {
            processed: true,
            payment_updated: true,
            enrollment_updated: true
          }
        })
      });

      const result = await service.processProductionWebhook(webhookData);

      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(true);
      expect(result.enrollment_updated).toBe(true);
    });

    it('should handle webhook processing errors', async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: 'txn_123456789',
        reference: 'ref_test_123',
        amount: 299.99,
        currency: 'ZAR',
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'sha256=abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        response_code: '00',
        response_message: 'Approved'
      };

      // Mock failed fetch response
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({
          success: false,
          message: 'Processing failed'
        })
      });

      const result = await service.processProductionWebhook(webhookData);

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook endpoint returned 500');
    });

    it('should validate webhook data before processing', async () => {
      const invalidWebhookData = {
        transaction_id: '',
        reference: '',
        amount: -100,
        currency: 'USD',
        status: 'invalid_status',
        timestamp: 'invalid_date',
        signature: '',
        response_code: '',
        response_message: ''
      } as IkhokhaWebhook;

      const result = await service.processProductionWebhook(invalidWebhookData);

      expect(result.processed).toBe(false);
      expect(result.error).toContain('Webhook data validation failed');
    });
  });

  describe('getProductionWebhookStatus', () => {
    it('should return correct status for properly configured webhook', () => {
      service = new ProductionWebhookService();
      
      const status = service.getProductionWebhookStatus();
      
      expect(status.configured).toBe(true);
      expect(status.endpoint).toBe('https://app.betaskill.com/.netlify/functions/ikhokha-webhook');
      expect(status.securityEnabled).toBe(true);
      expect(status.issues).toHaveLength(0);
    });

    it('should identify configuration issues', () => {
      // Mock missing webhook secret
      Object.defineProperty(import.meta, 'env', {
        value: { ...mockEnv, VITE_IKHOKHA_WEBHOOK_SECRET: '' },
        writable: true
      });

      expect(() => new ProductionWebhookService()).toThrow();
    });
  });

  describe('testWebhookEndpoint', () => {
    beforeEach(() => {
      service = new ProductionWebhookService();
    });

    it('should test endpoint connectivity successfully', async () => {
      // Mock successful endpoint test
      (global.fetch as any).mockResolvedValueOnce({
        status: 405 // Expected for GET request to webhook endpoint
      });

      const result = await service.testWebhookEndpoint();

      expect(result.reachable).toBe(true);
      expect(result.responseTime).toBeGreaterThan(0);
    });

    it('should handle endpoint connectivity failures', async () => {
      // Mock network error
      (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

      const result = await service.testWebhookEndpoint();

      expect(result.reachable).toBe(false);
      expect(result.error).toBe('Network error');
    });
  });

  describe('configureEnrollmentActivation', () => {
    it('should configure enrollment activation for production', () => {
      service = new ProductionWebhookService();
      
      const config = service.configureEnrollmentActivation();
      
      expect(config.enabled).toBe(true);
      expect(config.autoApprove).toBe(true); // Should be true in production
      expect(config.notificationEnabled).toBe(true);
    });

    it('should configure enrollment activation for development', () => {
      // Mock development environment
      Object.defineProperty(import.meta, 'env', {
        value: { ...mockEnv, VITE_NODE_ENV: 'development' },
        writable: true
      });

      service = new ProductionWebhookService();
      
      const config = service.configureEnrollmentActivation();
      
      expect(config.enabled).toBe(true);
      expect(config.autoApprove).toBe(false); // Should be false in development
      expect(config.notificationEnabled).toBe(true);
    });
  });
});

describe('ProductionWebhookService Integration', () => {
  it('should handle complete webhook flow', async () => {
    // Mock production environment
    Object.defineProperty(import.meta, 'env', {
      value: mockEnv,
      writable: true
    });

    const service = new ProductionWebhookService();

    // Test webhook data
    const webhookData: IkhokhaWebhook = {
      transaction_id: 'txn_integration_test',
      reference: 'ref_integration_test',
      amount: 499.99,
      currency: 'ZAR',
      status: 'completed',
      timestamp: new Date().toISOString(),
      signature: 'sha256=1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
      response_code: '00',
      response_message: 'Approved',
      auth_code: 'AUTH123456'
    };

    // Mock successful webhook processing
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        result: {
          processed: true,
          payment_updated: true,
          enrollment_updated: true
        }
      })
    });

    // Process webhook
    const result = await service.processProductionWebhook(webhookData);

    // Verify results
    expect(result.processed).toBe(true);
    expect(result.payment_updated).toBe(true);
    expect(result.enrollment_updated).toBe(true);

    // Verify webhook endpoint was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      'https://app.betaskill.com/.netlify/functions/ikhokha-webhook',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(webhookData)
      })
    );
  });
});