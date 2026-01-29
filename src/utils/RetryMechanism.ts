interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  jitter?: boolean;
  retryCondition?: (error: Error, attempt: number) => boolean;
  onRetry?: (error: Error, attempt: number) => void;
  onSuccess?: (result: any, attempt: number) => void;
  onFailure?: (error: Error, attempts: number) => void;
}

interface RetryResult<T> {
  success: boolean;
  result?: T;
  error?: Error;
  attempts: number;
  totalTime: number;
}

class RetryMechanism {
  private static readonly DEFAULT_OPTIONS: Required<RetryOptions> = {
    maxAttempts: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffFactor: 2,
    jitter: true,
    retryCondition: (error: Error) => {
      // Default retry condition - retry on network errors and 5xx status codes
      const message = error.message.toLowerCase();
      return (
        message.includes('network') ||
        message.includes('fetch') ||
        message.includes('timeout') ||
        (error as any).status >= 500
      );
    },
    onRetry: () => {},
    onSuccess: () => {},
    onFailure: () => {}
  };

  /**
   * Execute a function with retry logic
   */
  static async execute<T>(
    fn: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<RetryResult<T>> {
    const config = { ...this.DEFAULT_OPTIONS, ...options };
    const startTime = Date.now();
    let lastError: Error;
    let attempts = 0;

    for (attempts = 1; attempts <= config.maxAttempts; attempts++) {
      try {
        const result = await fn();
        const totalTime = Date.now() - startTime;
        
        config.onSuccess(result, attempts);
        
        return {
          success: true,
          result,
          attempts,
          totalTime
        };
      } catch (error) {
        lastError = error as Error;
        
        // Check if we should retry this error
        if (!config.retryCondition(lastError, attempts)) {
          break;
        }
        
        // If this is the last attempt, don't wait
        if (attempts >= config.maxAttempts) {
          break;
        }
        
        // Calculate delay with exponential backoff and optional jitter
        const delay = this.calculateDelay(attempts, config);
        
        config.onRetry(lastError, attempts);
        
        // Wait before retrying
        await this.sleep(delay);
      }
    }

    const totalTime = Date.now() - startTime;
    config.onFailure(lastError!, attempts);
    
    return {
      success: false,
      error: lastError!,
      attempts,
      totalTime
    };
  }

  /**
   * Create a retry wrapper for a function
   */
  static wrap<T extends any[], R>(
    fn: (...args: T) => Promise<R>,
    options: RetryOptions = {}
  ): (...args: T) => Promise<R> {
    return async (...args: T): Promise<R> => {
      const result = await this.execute(() => fn(...args), options);
      
      if (result.success) {
        return result.result!;
      } else {
        throw result.error;
      }
    };
  }

  /**
   * Calculate delay with exponential backoff and jitter
   */
  private static calculateDelay(attempt: number, config: Required<RetryOptions>): number {
    let delay = config.baseDelay * Math.pow(config.backoffFactor, attempt - 1);
    
    // Apply maximum delay limit
    delay = Math.min(delay, config.maxDelay);
    
    // Add jitter to prevent thundering herd
    if (config.jitter) {
      delay = delay * (0.5 + Math.random() * 0.5);
    }
    
    return Math.floor(delay);
  }

  /**
   * Sleep for specified milliseconds
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Create retry options for common scenarios
   */
  static createNetworkRetryOptions(): RetryOptions {
    return {
      maxAttempts: 3,
      baseDelay: 1000,
      maxDelay: 5000,
      backoffFactor: 2,
      jitter: true,
      retryCondition: (error: Error) => {
        const message = error.message.toLowerCase();
        const status = (error as any).status;
        return (
          message.includes('network') ||
          message.includes('fetch') ||
          message.includes('timeout') ||
          status === 0 ||
          status >= 500 ||
          !navigator.onLine
        );
      }
    };
  }

  static createApiRetryOptions(): RetryOptions {
    return {
      maxAttempts: 2,
      baseDelay: 500,
      maxDelay: 2000,
      backoffFactor: 2,
      jitter: true,
      retryCondition: (error: Error) => {
        const status = (error as any).status;
        // Retry on 5xx errors and network issues, but not on 4xx client errors
        return status >= 500 || status === 0 || !navigator.onLine;
      }
    };
  }

  static createChunkLoadRetryOptions(): RetryOptions {
    return {
      maxAttempts: 2,
      baseDelay: 2000,
      maxDelay: 5000,
      backoffFactor: 1.5,
      jitter: false,
      retryCondition: (error: Error) => {
        const message = error.message.toLowerCase();
        return (
          message.includes('loading chunk') ||
          message.includes('loading css chunk') ||
          message.includes('chunk load')
        );
      }
    };
  }
}

export default RetryMechanism;
export type { RetryOptions, RetryResult };