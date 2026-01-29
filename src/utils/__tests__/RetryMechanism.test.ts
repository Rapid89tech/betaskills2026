import RetryMechanism, { RetryOptions, RetryResult } from '../RetryMechanism';

describe('RetryMechanism', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should succeed on first attempt', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      
      const result = await RetryMechanism.execute(mockFn);
      
      expect(result.success).toBe(true);
      expect(result.result).toBe('success');
      expect(result.attempts).toBe(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should retry on failure and eventually succeed', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce('success');
      
      const result = await RetryMechanism.execute(mockFn, {
        maxAttempts: 3,
        baseDelay: 10 // Short delay for testing
      });
      
      expect(result.success).toBe(true);
      expect(result.result).toBe('success');
      expect(result.attempts).toBe(2);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should fail after max attempts', async () => {
      const mockError = new Error('Persistent error');
      const mockFn = jest.fn().mockRejectedValue(mockError);
      
      const result = await RetryMechanism.execute(mockFn, {
        maxAttempts: 2,
        baseDelay: 10
      });
      
      expect(result.success).toBe(false);
      expect(result.error).toBe(mockError);
      expect(result.attempts).toBe(2);
      expect(mockFn).toHaveBeenCalledTimes(2);
    });

    it('should respect retry condition', async () => {
      const mockError = new Error('Client error');
      const mockFn = jest.fn().mockRejectedValue(mockError);
      
      const retryCondition = jest.fn().mockReturnValue(false);
      
      const result = await RetryMechanism.execute(mockFn, {
        maxAttempts: 3,
        retryCondition
      });
      
      expect(result.success).toBe(false);
      expect(result.attempts).toBe(1);
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(retryCondition).toHaveBeenCalledWith(mockError, 1);
    });

    it('should call onRetry callback', async () => {
      const mockError = new Error('Network error');
      const mockFn = jest.fn()
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce('success');
      
      const onRetry = jest.fn();
      
      await RetryMechanism.execute(mockFn, {
        maxAttempts: 2,
        baseDelay: 10,
        onRetry
      });
      
      expect(onRetry).toHaveBeenCalledWith(mockError, 1);
    });

    it('should call onSuccess callback', async () => {
      const mockFn = jest.fn().mockResolvedValue('success');
      const onSuccess = jest.fn();
      
      await RetryMechanism.execute(mockFn, {
        onSuccess
      });
      
      expect(onSuccess).toHaveBeenCalledWith('success', 1);
    });

    it('should call onFailure callback', async () => {
      const mockError = new Error('Persistent error');
      const mockFn = jest.fn().mockRejectedValue(mockError);
      const onFailure = jest.fn();
      
      await RetryMechanism.execute(mockFn, {
        maxAttempts: 1,
        onFailure
      });
      
      expect(onFailure).toHaveBeenCalledWith(mockError, 1);
    });

    it('should apply exponential backoff', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('Error 1'))
        .mockRejectedValueOnce(new Error('Error 2'))
        .mockResolvedValueOnce('success');
      
      const startTime = Date.now();
      
      await RetryMechanism.execute(mockFn, {
        maxAttempts: 3,
        baseDelay: 100,
        backoffFactor: 2,
        jitter: false // Disable jitter for predictable timing
      });
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      // Should have waited at least 100ms + 200ms = 300ms
      expect(totalTime).toBeGreaterThanOrEqual(250); // Allow some tolerance
    });

    it('should apply jitter when enabled', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('Error'))
        .mockResolvedValueOnce('success');
      
      const results: number[] = [];
      
      // Run multiple times to test jitter variation
      for (let i = 0; i < 5; i++) {
        const startTime = Date.now();
        await RetryMechanism.execute(mockFn, {
          maxAttempts: 2,
          baseDelay: 100,
          jitter: true
        });
        const endTime = Date.now();
        results.push(endTime - startTime);
        
        // Reset mock for next iteration
        mockFn.mockClear()
          .mockRejectedValueOnce(new Error('Error'))
          .mockResolvedValueOnce('success');
      }
      
      // With jitter, we should see some variation in timing
      const uniqueResults = new Set(results.map(r => Math.floor(r / 10))); // Group by 10ms
      expect(uniqueResults.size).toBeGreaterThan(1);
    });

    it('should respect maxDelay', async () => {
      const mockFn = jest.fn()
        .mockRejectedValueOnce(new Error('Error'))
        .mockResolvedValueOnce('success');
      
      const startTime = Date.now();
      
      await RetryMechanism.execute(mockFn, {
        maxAttempts: 2,
        baseDelay: 1000,
        backoffFactor: 10,
        maxDelay: 50, // Very low max delay
        jitter: false
      });
      
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      
      // Should not exceed maxDelay significantly
      expect(totalTime).toBeLessThan(100);
    });
  });

  describe('wrap', () => {
    it('should create a wrapped function that retries', async () => {
      const originalFn = jest.fn()
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce('success');
      
      const wrappedFn = RetryMechanism.wrap(originalFn, {
        maxAttempts: 2,
        baseDelay: 10
      });
      
      const result = await wrappedFn('arg1', 'arg2');
      
      expect(result).toBe('success');
      expect(originalFn).toHaveBeenCalledTimes(2);
      expect(originalFn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('should throw error if all retries fail', async () => {
      const mockError = new Error('Persistent error');
      const originalFn = jest.fn().mockRejectedValue(mockError);
      
      const wrappedFn = RetryMechanism.wrap(originalFn, {
        maxAttempts: 2,
        baseDelay: 10
      });
      
      await expect(wrappedFn()).rejects.toThrow('Persistent error');
    });
  });

  describe('preset configurations', () => {
    it('should create network retry options', () => {
      const options = RetryMechanism.createNetworkRetryOptions();
      
      expect(options.maxAttempts).toBe(3);
      expect(options.baseDelay).toBe(1000);
      expect(options.maxDelay).toBe(5000);
      expect(options.retryCondition).toBeDefined();
      
      // Test retry condition
      const networkError = new Error('Network request failed');
      expect(options.retryCondition!(networkError, 1)).toBe(true);
      
      const clientError = { message: 'Bad request', status: 400 } as any;
      expect(options.retryCondition!(clientError, 1)).toBe(false);
    });

    it('should create API retry options', () => {
      const options = RetryMechanism.createApiRetryOptions();
      
      expect(options.maxAttempts).toBe(2);
      expect(options.baseDelay).toBe(500);
      expect(options.retryCondition).toBeDefined();
      
      // Test retry condition
      const serverError = { message: 'Server error', status: 500 } as any;
      expect(options.retryCondition!(serverError, 1)).toBe(true);
      
      const clientError = { message: 'Bad request', status: 400 } as any;
      expect(options.retryCondition!(clientError, 1)).toBe(false);
    });

    it('should create chunk load retry options', () => {
      const options = RetryMechanism.createChunkLoadRetryOptions();
      
      expect(options.maxAttempts).toBe(2);
      expect(options.jitter).toBe(false);
      expect(options.retryCondition).toBeDefined();
      
      // Test retry condition
      const chunkError = new Error('Loading chunk 1 failed');
      expect(options.retryCondition!(chunkError, 1)).toBe(true);
      
      const otherError = new Error('Some other error');
      expect(options.retryCondition!(otherError, 1)).toBe(false);
    });
  });

  describe('default retry condition', () => {
    it('should retry on network errors', () => {
      const networkErrors = [
        new Error('Network request failed'),
        new Error('fetch error occurred'),
        new Error('Connection timeout'),
        { message: 'Server error', status: 500 } as any,
        { message: 'Bad gateway', status: 502 } as any
      ];
      
      networkErrors.forEach(error => {
        const options = { retryCondition: undefined };
        const result = RetryMechanism['DEFAULT_OPTIONS'].retryCondition(error, 1);
        expect(result).toBe(true);
      });
    });

    it('should not retry on client errors', () => {
      const clientErrors = [
        { message: 'Bad request', status: 400 } as any,
        { message: 'Unauthorized', status: 401 } as any,
        { message: 'Not found', status: 404 } as any,
        new Error('Validation failed')
      ];
      
      clientErrors.forEach(error => {
        const result = RetryMechanism['DEFAULT_OPTIONS'].retryCondition(error, 1);
        expect(result).toBe(false);
      });
    });
  });
});