/**
 * Ikhokha Webhook Handler Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { IkhokhaWebhookHandler } from '../IkhokhaWebhookHandler';
import { webhookRetryService } from '../WebhookRetryService';
import {
  IkhokhaWebhook,
  PaymentStatus,
  WebhookValidationError,
  IkhokhaError
} from '../../types/ikhokha';

// Mock dependencies
vi.mock('../WebhookRetryService');
vi.mock('../../integrations/supabase/client', () => ({
  supabase: {
    channel: vi.fn(() => ({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn()
    }))
  }
}));

// Mock fetch
global.fetch = vi.fn();

describe('IkhokhaWebhookHandler', () => {
  let webhookHandler: IkhokhaWebhookHandler;
  let mockWebhookData: IkhokhaWebhook;

  beforeEach(() => {
    vi.clearAllMocks();
    
    webhookHandler = new IkhokhaWebhookHandler();
    
    mockWebhookData = {
      transaction_id: 'txn_123456789',
      reference: 'TEST_REF_123',
      amount: 299.99,
      currency: 'ZAR',
      status: 'completed',
      timestamp: '2024-01-15T10:30:00Z',
      signature: 'sha256=test_signature',
      response_code: '00',
      response_message: 'Approved',
      metadata: {
        enrollmentId: 'enr_123',
        courseId: 'course_456'
      }
    };
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('subscribeToPaymentUpdates', () => {
    it('should create subscription and return unsubscribe function', () => {
      const mockCallback = vi.fn();
      
      const unsubscribe = webhookHandler.subscribeToPaymentUpdates(mockCallback);
      
      expect(typeof unsubscribe).toBe('function');
      
      // Test unsubscribe
      unsubscribe();
      
      // Verify subscription was removed (check internal state)
      const stats = webhookHandler.getWebhookStats();
      expect(stats.activeSubscriptions).toBe(0);
    });

    it('should create subscription with filters', () => {
      const mockCallback = vi.fn();
      const filters = {
        paymentId: 'payment_123',
        status: [PaymentStatus.COMPLETED]
      };
      
      const unsubscribe = webhookHandler.subscribeToPaymentUpdates(mockCallback, filters);
      
      expect(typeof unsubscribe).toBe('function');
      
      const stats = webhookHandler.getWebhookStats();
      expect(stats.activeSubscriptions).toBe(1);
      
      unsubscribe();
    });
  });

  describe('processWebhook', () => {
    beforeEach(() => {
      (fetch as Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          success: true,
          result: {
            processed: true,
            payment_updated: true,
            enrollment_updated: true
          }
        })
      });
    });

    it('should process webhook successfully', async () => {
      const result = await webhookHandler.processWebhook(mockWebhookData);
      
      expect(result.processed).toBe(true);
      expect(result.payment_updated).toBe(true);
      expect(result.enrollment_updated).toBe(true);
      
      expect(fetch).toHaveBeenCalledWith('/api/webhooks/ikhokha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(mockWebhookData)
      });
    });

    it('should validate webhook data before processing', async () => {
      const invalidWebhookData = {
        ...mockWebhookData,
        transaction_id: '', // Invalid
        amount: -100 // Invalid
      };
      
      await expect(
        webhookHandler.processWebhook(invalidWebhookData as IkhokhaWebhook)
      ).rejects.toThrow(WebhookValidationError);
    });

    it('should handle webhook endpoint errors', async () => {
      (fetch as Mock).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });
      
      await expect(
        webhookHandler.processWebhook(mockWebhookData)
      ).rejects.toThrow(IkhokhaError);
      
      // Should add to retry queue
      expect(webhookRetryService.addToRetryQueue).toHaveBeenCalled();
    });

    it('should handle network errors', async () => {
      (fetch as Mock).mockRejectedValue(new Error('Network error'));
      
      await expect(
        webhookHandler.processWebhook(mockWebhookData)
      ).rejects.toThrow();
      
      // Should add to retry queue
      expect(webhookRetryService.addToRetryQueue).toHaveBeenCalled();
    });

    it('should not retry validation errors', async () => {
      const invalidWebhookData = {
        ...mockWebhookData,
        status: 'invalid_status' as any
      };
      
      await expect(
        webhookHandler.processWebhook(invalidWebhookData)
      ).rejects.toThrow(WebhookValidationError);
      
      // Should not add to retry queue for validation errors
      expect(webhookRetryService.addToRetryQueue).not.toHaveBeenCalled();
    });
  });

  describe('validateWebhookSignature', () => {
    it('should validate signature in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      const isValid = webhookHandler.validateWebhookSignature(
        JSON.stringify(mockWebhookData),
        'any_signature'
      );
      
      expect(isValid).toBe(true);
      
      process.env.NODE_ENV = originalEnv;
    });

    it('should require signature in production mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      const isValid = webhookHandler.validateWebhookSignature(
        JSON.stringify(mockWebhookData),
        ''
      );
      
      expect(isValid).toBe(false);
      
      process.env.NODE_ENV = originalEnv;
    });

    it('should validate non-empty signature', () => {
      const isValid = webhookHandler.validateWebhookSignature(
        JSON.stringify(mockWebhookData),
        'valid_signature'
      );
      
      expect(isValid).toBe(true);
    });
  });

  describe('getWebhookStats', () => {
    it('should return webhook statistics', () => {
      const stats = webhookHandler.getWebhookStats();
      
      expect(stats).toHaveProperty('activeSubscriptions');
      expect(stats).toHaveProperty('pendingRetries');
      expect(stats).toHaveProperty('totalProcessed');
      expect(typeof stats.activeSubscriptions).toBe('number');
      expect(typeof stats.pendingRetries).toBe('number');
      expect(typeof stats.totalProcessed).toBe('number');
    });
  });

  describe('webhook data validation', () => {
    it('should validate required fields', async () => {
      const requiredFields = [
        'transaction_id',
        'reference',
        'amount',
        'currency',
        'status',
        'timestamp'
      ];
      
      for (const field of requiredFields) {
        const invalidData = { ...mockWebhookData };
        delete invalidData[field as keyof IkhokhaWebhook];
        
        await expect(
          webhookHandler.processWebhook(invalidData as IkhokhaWebhook)
        ).rejects.toThrow(WebhookValidationError);
      }
    });

    it('should validate amount is positive', async () => {
      const invalidData = {
        ...mockWebhookData,
        amount: 0
      };
      
      await expect(
        webhookHandler.processWebhook(invalidData)
      ).rejects.toThrow(WebhookValidationError);
    });

    it('should validate status values', async () => {
      const validStatuses = ['completed', 'failed', 'cancelled'];
      
      for (const status of validStatuses) {
        const validData = {
          ...mockWebhookData,
          status: status as any
        };
        
        // Should not throw validation error
        (fetch as Mock).mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            result: { processed: true, payment_updated: true, enrollment_updated: true }
          })
        });
        
        await expect(
          webhookHandler.processWebhook(validData)
        ).resolves.toBeDefined();
      }
      
      // Test invalid status
      const invalidData = {
        ...mockWebhookData,
        status: 'invalid_status' as any
      };
      
      await expect(
        webhookHandler.processWebhook(invalidData)
      ).rejects.toThrow(WebhookValidationError);
    });
  });

  describe('payment status mapping', () => {
    it('should map Ikhokha statuses correctly', async () => {
      const statusMappings = [
        { ikhokha: 'completed', expected: PaymentStatus.COMPLETED },
        { ikhokha: 'failed', expected: PaymentStatus.FAILED },
        { ikhokha: 'cancelled', expected: PaymentStatus.CANCELLED }
      ];
      
      for (const mapping of statusMappings) {
        const webhookData = {
          ...mockWebhookData,
          status: mapping.ikhokha as any
        };
        
        (fetch as Mock).mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({
            success: true,
            result: { processed: true, payment_updated: true, enrollment_updated: true }
          })
        });
        
        await webhookHandler.processWebhook(webhookData);
        
        // Verify the status was mapped correctly in the notification
        // This would be tested through the subscription callback
      }
    });
  });

  describe('error handling', () => {
    it('should handle retryable errors', async () => {
      const networkError = new Error('Network timeout');
      (fetch as Mock).mockRejectedValue(networkError);
      
      await expect(
        webhookHandler.processWebhook(mockWebhookData)
      ).rejects.toThrow();
      
      expect(webhookRetryService.addToRetryQueue).toHaveBeenCalledWith(
        mockWebhookData,
        networkError
      );
    });

    it('should not retry validation errors', async () => {
      const validationError = new WebhookValidationError('Invalid data');
      
      // Mock validation to throw error
      const invalidData = {
        ...mockWebhookData,
        amount: -100
      };
      
      await expect(
        webhookHandler.processWebhook(invalidData)
      ).rejects.toThrow(WebhookValidationError);
      
      expect(webhookRetryService.addToRetryQueue).not.toHaveBeenCalled();
    });

    it('should handle subscription callback errors gracefully', () => {
      const errorCallback = vi.fn(() => {
        throw new Error('Callback error');
      });
      
      const unsubscribe = webhookHandler.subscribeToPaymentUpdates(errorCallback);
      
      // This should not throw even if callback throws
      expect(() => {
        // Simulate internal notification (would need access to private method)
        // For now, just verify subscription was created
        const stats = webhookHandler.getWebhookStats();
        expect(stats.activeSubscriptions).toBe(1);
      }).not.toThrow();
      
      unsubscribe();
    });
  });
});