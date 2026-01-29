/**
 * Tests for ApiErrorHandler
 */

import { apiErrorHandler, ApiError } from '../ApiErrorHandler';
import { errorHandler } from '../ErrorHandler';

// Mock dependencies
jest.mock('../ErrorHandler');
jest.mock('../logger');

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock navigator.onLine
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true,
});

describe('ApiErrorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    
    // Reset network status
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      value: true,
    });
  });

  describe('fetchWithRetry', () => {
    it('should succeed on first attempt when request is successful', async () => {
      const mockResponse = new Response('{"success": true}', { status: 200 });
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await apiErrorHandler.fetchWithRetry('/api/test');

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockResponse);
    });

    it('should retry on retryable errors with exponential backoff', async () => {
      const mockError = new Error('Network error');
      const mockResponse = new Response('{"success": true}', { status: 200 });
      
      (fetch as jest.Mock)
        .mockRejectedValueOnce(mockError)
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce(mockResponse);

      const startTime = Date.now();
      const result = await apiErrorHandler.fetchWithRetry('/api/test');
      const endTime = Date.now();

      expect(fetch).toHaveBeenCalledTimes(3);
      expect(result).toBe(mockResponse);
      // Should have some delay due to exponential backoff
      expect(endTime - startTime).toBeGreaterThan(1000);
    });

    it('should retry on 500 status codes', async () => {
      const mockErrorResponse = new Response('Server Error', { status: 500 });
      const mockSuccessResponse = new Response('{"success": true}', { status: 200 });
      
      (fetch as jest.Mock)
        .mockResolvedValueOnce(mockErrorResponse)
        .mockResolvedValueOnce(mockSuccessResponse);

      const result = await apiErrorHandler.fetchWithRetry('/api/test');

      expect(fetch).toHaveBeenCalledTimes(2);
      expect(result).toBe(mockSuccessResponse);
    });

    it('should not retry on 404 status codes', async () => {
      const mockErrorResponse = new Response('Not Found', { status: 404 });
      
      (fetch as jest.Mock).mockResolvedValueOnce(mockErrorResponse);

      const result = await apiErrorHandler.fetchWithRetry('/api/test');

      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockErrorResponse);
    });

    it('should throw error after max retries exhausted', async () => {
      const mockError = new Error('Network error');
      (fetch as jest.Mock).mockRejectedValue(mockError);

      await expect(
        apiErrorHandler.fetchWithRetry('/api/test', {}, { maxRetries: 2 })
      ).rejects.toThrow();

      expect(fetch).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should handle timeout errors', async () => {
      const timeoutError = new Error('AbortError');
      timeoutError.name = 'AbortError';
      
      (fetch as jest.Mock).mockRejectedValue(timeoutError);

      await expect(
        apiErrorHandler.fetchWithRetry('/api/test', {}, { maxRetries: 1 })
      ).rejects.toThrow();

      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });

  describe('Network Status Monitoring', () => {
    it('should detect when network goes offline', () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });

      // Trigger offline event
      window.dispatchEvent(new Event('offline'));

      const networkStatus = apiErrorHandler.getNetworkStatus();
      expect(networkStatus.isOnline).toBe(false);
    });

    it('should detect when network comes back online', () => {
      // Start offline
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });
      window.dispatchEvent(new Event('offline'));

      // Go back online
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: true,
      });
      window.dispatchEvent(new Event('online'));

      const networkStatus = apiErrorHandler.getNetworkStatus();
      expect(networkStatus.isOnline).toBe(true);
    });
  });

  describe('Offline Queue Management', () => {
    it('should queue requests when offline', async () => {
      Object.defineProperty(navigator, 'onLine', {
        writable: true,
        value: false,
      });

      const mockResponse = new Response('{"error": "offline"}', { status: 0 });
      (fetch as jest.Mock).mockResolvedValue(mockResponse);

      const result = await apiErrorHandler.fetchWithRetry('/api/test');

      expect(result.status).toBe(0);
      expect(apiErrorHandler.getRetryQueueLength()).toBeGreaterThan(0);
    });

    it('should save and load retry queue from localStorage', () => {
      const mockQueue = [{ url: '/api/test', options: {}, retryCount: 0 }];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockQueue));

      // Create new instance to trigger loading
      const newHandler = new (apiErrorHandler.constructor as any)();
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('apiRetryQueue');
    });

    it('should clear retry queue when requested', () => {
      apiErrorHandler.clearRetryQueue();
      
      expect(apiErrorHandler.getRetryQueueLength()).toBe(0);
      expect(localStorageMock.setItem).toHaveBeenCalledWith('apiRetryQueue', '[]');
    });
  });

  describe('Error Conversion', () => {
    it('should convert network errors to ApiError', async () => {
      const networkError = new Error('Network request failed');
      (fetch as jest.Mock).mockRejectedValue(networkError);

      try {
        await apiErrorHandler.fetchWithRetry('/api/test', {}, { maxRetries: 0 });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(0);
      }
    });

    it('should convert timeout errors to ApiError', async () => {
      const timeoutError = new Error('AbortError');
      timeoutError.name = 'AbortError';
      (fetch as jest.Mock).mockRejectedValue(timeoutError);

      try {
        await apiErrorHandler.fetchWithRetry('/api/test', {}, { maxRetries: 0 });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(408);
      }
    });

    it('should extract status codes from error messages', async () => {
      const httpError = new Error('HTTP 503: Service Unavailable');
      (fetch as jest.Mock).mockRejectedValue(httpError);

      try {
        await apiErrorHandler.fetchWithRetry('/api/test', {}, { maxRetries: 0 });
      } catch (error) {
        expect(error).toBeInstanceOf(ApiError);
        expect((error as ApiError).status).toBe(503);
      }
    });
  });

  describe('Custom Retry Configuration', () => {
    it('should respect custom retry configuration', async () => {
      const mockError = new Error('Network error');
      (fetch as jest.Mock).mockRejectedValue(mockError);

      const customConfig = {
        maxRetries: 1,
        baseDelay: 100,
        backoffMultiplier: 1.5
      };

      await expect(
        apiErrorHandler.fetchWithRetry('/api/test', {}, customConfig)
      ).rejects.toThrow();

      expect(fetch).toHaveBeenCalledTimes(2); // Initial + 1 retry
    });

    it('should respect maxDelay configuration', async () => {
      const mockError = new Error('Network error');
      (fetch as jest.Mock).mockRejectedValue(mockError);

      const customConfig = {
        maxRetries: 3,
        baseDelay: 1000,
        maxDelay: 1500,
        backoffMultiplier: 3
      };

      const startTime = Date.now();
      
      await expect(
        apiErrorHandler.fetchWithRetry('/api/test', {}, customConfig)
      ).rejects.toThrow();
      
      const endTime = Date.now();
      
      // Should not exceed maxDelay significantly
      expect(endTime - startTime).toBeLessThan(8000); // Should be much less than 9000ms without maxDelay
    });
  });

  describe('Request Headers and Options', () => {
    it('should preserve custom headers in requests', async () => {
      const mockResponse = new Response('{"success": true}', { status: 200 });
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      const customOptions = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer token123',
          'Custom-Header': 'custom-value'
        },
        body: JSON.stringify({ data: 'test' })
      };

      await apiErrorHandler.fetchWithRetry('/api/test', customOptions);

      expect(fetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123',
          'Custom-Header': 'custom-value'
        }),
        body: JSON.stringify({ data: 'test' })
      }));
    });

    it('should add default Content-Type header', async () => {
      const mockResponse = new Response('{"success": true}', { status: 200 });
      (fetch as jest.Mock).mockResolvedValueOnce(mockResponse);

      await apiErrorHandler.fetchWithRetry('/api/test');

      expect(fetch).toHaveBeenCalledWith('/api/test', expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json'
        })
      }));
    });
  });
});