import { describe, it, expect } from 'vitest';
import { FastDataService } from '../FastDataService';

describe('FastDataService Error Handling', () => {
  let service: FastDataService;

  beforeEach(() => {
    service = FastDataService.getInstance();
  });

  describe('Error Classification', () => {
    it('should identify retryable network errors', () => {
      const networkError = new Error('Network error');
      networkError.name = 'NetworkError';
      
      // Access private method for testing
      const isRetryable = (service as any).isRetryableError(networkError);
      expect(isRetryable).toBe(true);
    });

    it('should identify retryable timeout errors', () => {
      const timeoutError = new Error('Request timeout');
      timeoutError.name = 'TimeoutError';
      
      const isRetryable = (service as any).isRetryableError(timeoutError);
      expect(isRetryable).toBe(true);
    });

    it('should identify retryable Supabase connection errors', () => {
      const connectionError = {
        code: '08000',
        message: 'Connection exception'
      };
      
      const isRetryable = (service as any).isRetryableError(connectionError);
      expect(isRetryable).toBe(true);
    });

    it('should identify non-retryable authentication errors', () => {
      const authError = {
        code: '42501',
        message: 'Permission denied'
      };
      
      const isRetryable = (service as any).isRetryableError(authError);
      expect(isRetryable).toBe(false);
    });

    it('should identify retryable HTTP status codes', () => {
      const serverError = {
        status: 500,
        message: 'Internal server error'
      };
      
      const isRetryable = (service as any).isRetryableError(serverError);
      expect(isRetryable).toBe(true);
    });

    it('should identify non-retryable HTTP status codes', () => {
      const clientError = {
        status: 400,
        message: 'Bad request'
      };
      
      const isRetryable = (service as any).isRetryableError(clientError);
      expect(isRetryable).toBe(false);
    });
  });

  describe('API Error Creation', () => {
    it('should create standardized API errors', () => {
      const supabaseError = {
        code: '23505',
        details: 'Key already exists',
        hint: 'Try a different value',
        message: 'Duplicate key violation'
      };
      
      const apiError = (service as any).createApiError(supabaseError, 'Test operation failed');
      
      expect(apiError.message).toBe('Test operation failed');
      expect(apiError.code).toBe('23505');
      expect(apiError.details).toBe('Key already exists');
      expect(apiError.hint).toBe('Try a different value');
      expect(apiError.isRetryable).toBe(false);
    });
  });

  describe('Cache Management', () => {
    it('should manage cache correctly', () => {
      const testData = { id: '1', name: 'test' };
      
      // Set cache
      (service as any).setCache('test-key', testData);
      
      // Get from cache
      const cached = (service as any).getFromCache('test-key');
      expect(cached).toEqual(testData);
      
      // Clear cache
      service.clearCache();
      
      // Should not find cached data
      const clearedCache = (service as any).getFromCache('test-key');
      expect(clearedCache).toBeNull();
    });

    it('should expire cache after timeout', async () => {
      const testData = { id: '1', name: 'test' };
      
      // Set cache with very short timeout
      (service as any).cacheTimeout = 10; // 10ms
      (service as any).setCache('test-key', testData);
      
      // Should get cached data immediately
      const cached1 = (service as any).getFromCache('test-key');
      expect(cached1).toEqual(testData);
      
      // Wait for cache to expire
      await new Promise(resolve => setTimeout(resolve, 20));
      
      // Should not get cached data after expiration
      const cached2 = (service as any).getFromCache('test-key');
      expect(cached2).toBeNull();
      
      // Reset timeout for other tests
      (service as any).cacheTimeout = 30000;
    });
  });

  describe('Utility Functions', () => {
    it('should implement sleep function', async () => {
      const start = Date.now();
      await (service as any).sleep(50);
      const end = Date.now();
      
      expect(end - start).toBeGreaterThanOrEqual(45); // Allow some variance
    });
  });
});