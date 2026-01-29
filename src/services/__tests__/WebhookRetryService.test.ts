/**
 * Webhook Retry Service Tests
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { WebhookRetryService } from '../WebhookRetryService';
import { IkhokhaWebhook, IkhokhaError } from '../../types/ikhokha';

// Mock the webhook handler
vi.mock('../IkhokhaWebhookHandler', () => ({
  ikhokhaWebhookHandler: {
    processWebhook: vi.fn()
  }
}));

describe('WebhookRetryService', () => {
  let retryService: WebhookRetryService;
  let mockWebhookData: IkhokhaWebhook;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    
    retryService = new WebhookRetryService({
      maxRetries: 3,
      initialDelay: 1000,
      maxDelay: 10000,
      backoffMultiplier: 2,
      jitterEnabled: false // Disable for predictable tests
    });
    
    mockWebhookData = {
      transaction_id: 'txn_123456789',
      reference: 'TEST_REF_123',
      amount: 299.99,
      currency: 'ZAR',
      status: 'completed',
      timestamp: '2024-01-15T10:30:00Z',
      signature: 'sha256=test_signature',
      response_code: '00',
      response_message: 'Approved'
    };
  });

  afterEach(() => {
    retryService.stopProcessing();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('addToRetryQueue', () => {
    it('should add webhook to retry queue', async () => {
      const error = new Error('Network timeout');
      
      const retryId = await retryService.addToRetryQueue(mockWebhookData, error);
      
      expect(retryId).toBeDefined();
      expect(typeof retryId).toBe('string');
      
      const retryItem = retryService.getRetryItem(retryId);
      expect(retryItem).toBeDefined();
      expect(retryItem?.webhook).toEqual(mockWebhookData);
      expect(retryItem?.attempts).toBe(1);
      expect(retryItem?.errors).toContain('Network timeout');
    });

    it('should update existing retry item', async () => {
      const error1 = new Error('First error');
      const error2 = new Error('Second error');
      
      const retryId = await retryService.addToRetryQueue(mockWebhookData, error1);
      await retryService.addToRetryQueue(mockWebhookData, error2, retryId);
      
      const retryItem = retryService.getRetryItem(retryId);
      expect(retryItem?.attempts).toBe(2);
      expect(retryItem?.errors).toHaveLength(2);
      expect(retryItem?.errors).toContain('First error');
      expect(retryItem?.errors).toContain('Second error');
    });

    it('should calculate next attempt time with exponential backoff', async () => {
      const error = new Error('Test error');
      
      const retryId = await retryService.addToRetryQueue(mockWebhookData, error);
      const retryItem = retryService.getRetryItem(retryId);
      
      expect(retryItem?.nextAttempt).toBeDefined();
      
      // First retry should be after initial delay (1000ms)
      const expectedTime = new Date(Date.now() + 1000);
      expect(retryItem?.nextAttempt.getTime()).toBeCloseTo(expectedTime.getTime(), -2);
    });
  });

  describe('removeFromRetryQueue', () => {
    it('should remove item from retry queue', async () => {
      const error = new Error('Test error');
      const retryId = await retryService.addToRetryQueue(mockWebhookData, error);
      
      expect(retryService.getRetryItem(retryId)).toBeDefined();
      
      const removed = retryService.removeFromRetryQueue(retryId);
      
      expect(removed).toBe(true);
      expect(retryService.getRetryItem(retryId)).toBeUndefined();
    });

    it('should return false for non-existent item', () => {
      const removed = retryService.removeFromRetryQueue('non_existent_id');
      expect(removed).toBe(false);
    });
  });

  describe('getRetryStats', () => {
    it('should return correct statistics', async () => {
      const error = new Error('Test error');
      
      // Add some retry items
      await retryService.addToRetryQueue(mockWebhookData, error);
      await retryService.addToRetryQueue({
        ...mockWebhookData,
        transaction_id: 'txn_987654321'
      }, error);
      
      const stats = retryService.getRetryStats();
      
      expect(stats.totalItems).toBe(2);
      expect(stats.failedItems).toBe(0);
      expect(stats.successfulRetries).toBe(0);
      
      // Advance time to make items pending
      vi.advanceTimersByTime(1000);
      
      const updatedStats = retryService.getRetryStats();
      expect(updatedStats.pendingItems).toBe(2); // Both should be pending now
    });

    it('should count failed items correctly', async () => {
      const error = new Error('Test error');
      const retryId = await retryService.addToRetryQueue(mockWebhookData, error);
      
      // Simulate max retries exceeded
      const retryItem = retryService.getRetryItem(retryId);
      if (retryItem) {
        retryItem.attempts = 3; // Max retries
      }
      
      const stats = retryService.getRetryStats();
      expect(stats.failedItems).toBe(1);
    });
  });

  describe('clearRetryQueue', () => {
    it('should clear all retry items', async () => {
      const error = new Error('Test error');
      
      await retryService.addToRetryQueue(mockWebhookData, error);
      await retryService.addToRetryQueue({
        ...mockWebhookData,
        transaction_id: 'txn_987654321'
      }, error);
      
      expect(retryService.getAllRetryItems()).toHaveLength(2);
      
      const clearedCount = retryService.clearRetryQueue();
      
      expect(clearedCount).toBe(2);
      expect(retryService.getAllRetryItems()).toHaveLength(0);
    });
  });

  describe('retryWebhook', () => {
    it('should retry webhook successfully', async () => {
      const { ikhokhaWebhookHandler } = await import('../IkhokhaWebhookHandler');
      (ikhokhaWebhookHandler.processWebhook as any).mockResolvedValue({
        processed: true,
        payment_updated: true,
        enrollment_updated: true
      });
      
      const error = new Error('Test error');
      const retryId = await retryService.addToRetryQueue(mockWebhookData, error);
      
      const result = await retryService.retryWebhook(retryId);
      
      expect(result.processed).toBe(true);
      expect(ikhokhaWebhookHandler.processWebhook).toHaveBeenCalledWith(mockWebhookData);
      
      // Item should be removed from queue on success
      expect(retryService.getRetryItem(retryId)).toBeUndefined();
    });

    it('should throw error for non-existent retry item', async () => {
      await expect(
        retryService.retryWebhook('non_existent_id')
      ).rejects.toThrow(IkhokhaError);
    });

    it('should throw error when max retries exceeded', async () => {
      const error = new Error('Test error');
      const retryId = await retryService.addToRetryQueue(mockWebhookData, error);
      
      // Set attempts to max retries
      const retryItem = retryService.getRetryItem(retryId);
      if (retryItem) {
        retryItem.attempts = 3; // Max retries
      }
      
      await expect(
        retryService.retryWebhook(retryId)
      ).rejects.toThrow(IkhokhaError);
    });

    it('should update retry count on failure', async () => {
      const { ikhokhaWebhookHandler } = await import('../IkhokhaWebhookHandler');
      (ikhokhaWebhookHandler.processWebhook as any).mockRejectedValue(new Error('Retry failed'));
      
      const error = new Error('Test error');
      const retryId = await retryService.addToRetryQueue(mockWebhookData, error);
      
      await expect(
        retryService.retryWebhook(retryId)
      ).rejects.toThrow();
      
      const retryItem = retryService.getRetryItem(retryId);
      expect(retryItem?.attempts).toBe(2); // Should increment
      expect(retryItem?.errors).toContain('Retry failed');
    });
  });

  describe('processing lifecycle', () => {
    it('should start and stop processing', () => {
      expect(() => retryService.startProcessing()).not.toThrow();
      expect(() => retryService.stopProcessing()).not.toThrow();
    });

    it('should not start processing if already running', () => {
      retryService.startProcessing();
      
      // Starting again should not throw or cause issues
      expect(() => retryService.startProcessing()).not.toThrow();
      
      retryService.stopProcessing();
    });
  });

  describe('exponential backoff calculation', () => {
    it('should calculate correct delays', async () => {
      const service = new WebhookRetryService({
        maxRetries: 5,
        initialDelay: 1000,
        maxDelay: 30000,
        backoffMultiplier: 2,
        jitterEnabled: false
      });
      
      const error = new Error('Test error');
      
      // Test multiple retry attempts
      const retryId = await service.addToRetryQueue(mockWebhookData, error);
      let retryItem = service.getRetryItem(retryId);
      
      // First attempt: 1000ms
      expect(retryItem?.nextAttempt.getTime()).toBeCloseTo(Date.now() + 1000, -2);
      
      // Second attempt: 2000ms
      await service.addToRetryQueue(mockWebhookData, error, retryId);
      retryItem = service.getRetryItem(retryId);
      expect(retryItem?.nextAttempt.getTime()).toBeCloseTo(Date.now() + 2000, -2);
      
      // Third attempt: 4000ms
      await service.addToRetryQueue(mockWebhookData, error, retryId);
      retryItem = service.getRetryItem(retryId);
      expect(retryItem?.nextAttempt.getTime()).toBeCloseTo(Date.now() + 4000, -2);
    });

    it('should respect maximum delay', async () => {
      const service = new WebhookRetryService({
        maxRetries: 10,
        initialDelay: 1000,
        maxDelay: 5000, // Low max delay
        backoffMultiplier: 2,
        jitterEnabled: false
      });
      
      const error = new Error('Test error');
      const retryId = await service.addToRetryQueue(mockWebhookData, error);
      
      // Simulate many retries to exceed max delay
      for (let i = 0; i < 5; i++) {
        await service.addToRetryQueue(mockWebhookData, error, retryId);
      }
      
      const retryItem = service.getRetryItem(retryId);
      const delay = retryItem!.nextAttempt.getTime() - Date.now();
      
      // Should not exceed max delay
      expect(delay).toBeLessThanOrEqual(5000);
    });
  });

  describe('jitter functionality', () => {
    it('should add jitter when enabled', async () => {
      const serviceWithJitter = new WebhookRetryService({
        maxRetries: 3,
        initialDelay: 1000,
        maxDelay: 10000,
        backoffMultiplier: 2,
        jitterEnabled: true
      });
      
      const error = new Error('Test error');
      
      // Add multiple items and check that delays vary due to jitter
      const delays: number[] = [];
      
      for (let i = 0; i < 5; i++) {
        const webhook = {
          ...mockWebhookData,
          transaction_id: `txn_${i}`
        };
        
        const retryId = await serviceWithJitter.addToRetryQueue(webhook, error);
        const retryItem = serviceWithJitter.getRetryItem(retryId);
        const delay = retryItem!.nextAttempt.getTime() - Date.now();
        delays.push(delay);
      }
      
      // With jitter, delays should vary
      const uniqueDelays = new Set(delays);
      expect(uniqueDelays.size).toBeGreaterThan(1);
    });
  });
});