/**
 * API Service with Centralized Error Handling
 * 
 * This service wraps all API calls with the ApiErrorHandler to provide:
 * - Automatic retry logic with exponential backoff
 * - Network connectivity detection and offline handling
 * - User-friendly error messages
 * - Consistent error handling across the application
 */

import { supabase } from '@/integrations/supabase/client';
import { apiErrorHandler, type RetryConfig } from '@/utils/ApiErrorHandler';
import { logger } from '@/utils/logger';

interface SupabaseResponse<T = any> {
  data: T | null;
  error: any;
}

interface ApiServiceConfig {
  retryConfig?: Partial<RetryConfig>;
  skipRetry?: boolean;
  timeout?: number;
}

class ApiService {
  private static instance: ApiService;

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  /**
   * Enhanced Supabase query with error handling and retry logic
   */
  async executeSupabaseQuery<T>(
    queryFn: () => Promise<SupabaseResponse<T>>,
    context: string,
    config: ApiServiceConfig = {}
  ): Promise<SupabaseResponse<T>> {
    const { retryConfig, skipRetry = false, timeout = 30000 } = config;

    if (skipRetry) {
      // Execute without retry for operations that shouldn't be retried
      return this.executeWithTimeout(queryFn, timeout, context);
    }

    // Execute with retry logic
    return this.executeWithRetry(queryFn, context, retryConfig);
  }

  /**
   * Execute query with retry logic
   */
  private async executeWithRetry<T>(
    queryFn: () => Promise<SupabaseResponse<T>>,
    context: string,
    retryConfig?: Partial<RetryConfig>
  ): Promise<SupabaseResponse<T>> {
    const config = {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 30000,
      backoffMultiplier: 2,
      ...retryConfig
    };

    let lastError: any = null;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        logger.info(`${context} - Attempt ${attempt + 1}/${config.maxRetries + 1}`);
        
        const result = await this.executeWithTimeout(queryFn, 30000, context);
        
        // Check if Supabase returned an error
        if (result.error) {
          // Determine if error is retryable
          if (this.isRetryableSupabaseError(result.error) && attempt < config.maxRetries) {
            lastError = result.error;
            
            const delay = Math.min(
              config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
              config.maxDelay
            );
            
            logger.warn(`${context} - Supabase error, retrying in ${delay}ms:`, result.error);
            await this.delay(delay + Math.random() * 1000);
            continue;
          }
          
          // Non-retryable error or max retries reached
          return this.handleSupabaseError(result, context);
        }

        // Success
        logger.info(`${context} - Success`);
        return result;

      } catch (error) {
        lastError = error;
        
        // Don't retry on the last attempt
        if (attempt === config.maxRetries) {
          break;
        }

        // Check if error is retryable (network issues, timeouts, etc.)
        if (this.isRetryableError(error)) {
          const delay = Math.min(
            config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
            config.maxDelay
          );
          
          logger.warn(`${context} - Network error, retrying in ${delay}ms:`, error);
          await this.delay(delay + Math.random() * 1000);
          continue;
        }

        // Non-retryable error
        break;
      }
    }

    // All retries exhausted
    logger.error(`${context} - All retries exhausted`, lastError);
    throw lastError;
  }

  /**
   * Execute query with timeout
   */
  private async executeWithTimeout<T>(
    queryFn: () => Promise<SupabaseResponse<T>>,
    timeout: number,
    context: string
  ): Promise<SupabaseResponse<T>> {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error(`${context} - Request timeout after ${timeout}ms`));
      }, timeout);

      try {
        const result = await queryFn();
        clearTimeout(timeoutId);
        resolve(result);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  /**
   * Handle Supabase-specific errors
   */
  private handleSupabaseError<T>(
    result: SupabaseResponse<T>,
    context: string
  ): SupabaseResponse<T> {
    const error = result.error;
    
    // Log the error for debugging
    logger.error(`${context} - Supabase error:`, error);

    // Convert Supabase error to user-friendly message
    const userFriendlyMessage = this.convertSupabaseErrorToUserMessage(error);
    
    // Create enhanced error object
    const enhancedError = {
      ...error,
      userMessage: userFriendlyMessage,
      context,
      timestamp: new Date().toISOString()
    };

    return {
      data: null,
      error: enhancedError
    };
  }

  /**
   * Convert Supabase errors to user-friendly messages
   */
  private convertSupabaseErrorToUserMessage(error: any): string {
    if (!error) return 'An unexpected error occurred';

    const message = error.message?.toLowerCase() || '';
    const code = error.code || '';

    // Network/Connection errors
    if (message.includes('network') || message.includes('connection') || code === 'NETWORK_ERROR') {
      return 'Unable to connect to the server. Please check your internet connection and try again.';
    }

    // Authentication errors
    if (code === 'PGRST301' || message.includes('jwt') || message.includes('unauthorized')) {
      return 'Your session has expired. Please log in again to continue.';
    }

    // Permission errors
    if (code === 'PGRST116' || message.includes('permission') || message.includes('policy')) {
      return 'You don\'t have permission to perform this action. Please contact support if you believe this is an error.';
    }

    // Validation errors
    if (code === 'PGRST204' || message.includes('violates') || message.includes('constraint')) {
      return 'The data you entered is invalid. Please check your information and try again.';
    }

    // Rate limiting
    if (code === '429' || message.includes('rate limit')) {
      return 'Too many requests. Please wait a moment and try again.';
    }

    // Server errors
    if (code.startsWith('50') || message.includes('internal') || message.includes('server error')) {
      return 'The server is temporarily unavailable. Please try again in a few moments.';
    }

    // Timeout errors
    if (message.includes('timeout') || code === 'TIMEOUT') {
      return 'The request took too long to complete. Please try again.';
    }

    // Generic fallback
    return 'An unexpected error occurred. Please try again or contact support if the problem persists.';
  }

  /**
   * Check if Supabase error is retryable
   */
  private isRetryableSupabaseError(error: any): boolean {
    if (!error) return false;

    const message = error.message?.toLowerCase() || '';
    const code = error.code || '';

    // Retryable conditions
    return (
      message.includes('network') ||
      message.includes('connection') ||
      message.includes('timeout') ||
      code === 'NETWORK_ERROR' ||
      code === 'TIMEOUT' ||
      code === '429' || // Rate limiting
      code.startsWith('50') // Server errors
    );
  }

  /**
   * Check if general error is retryable
   */
  private isRetryableError(error: any): boolean {
    if (!error) return false;

    const message = error.message?.toLowerCase() || '';
    
    return (
      message.includes('network') ||
      message.includes('connection') ||
      message.includes('timeout') ||
      message.includes('fetch') ||
      error.name === 'TypeError' ||
      !navigator.onLine
    );
  }

  /**
   * Utility method for delays
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get network status from ApiErrorHandler
   */
  getNetworkStatus() {
    return apiErrorHandler.getNetworkStatus();
  }

  /**
   * Get retry queue length from ApiErrorHandler
   */
  getRetryQueueLength(): number {
    return apiErrorHandler.getRetryQueueLength();
  }

  /**
   * Clear retry queue
   */
  clearRetryQueue(): void {
    apiErrorHandler.clearRetryQueue();
  }

  // Convenience methods for common Supabase operations

  /**
   * Enhanced select query with error handling
   */
  async select<T>(
    table: string,
    query?: string,
    config?: ApiServiceConfig
  ): Promise<SupabaseResponse<T[]>> {
    return this.executeSupabaseQuery(
      () => {
        let queryBuilder = supabase.from(table).select(query || '*');
        return queryBuilder as Promise<SupabaseResponse<T[]>>;
      },
      `SELECT from ${table}`,
      config
    );
  }

  /**
   * Enhanced insert query with error handling
   */
  async insert<T>(
    table: string,
    data: any,
    config?: ApiServiceConfig
  ): Promise<SupabaseResponse<T>> {
    return this.executeSupabaseQuery(
      () => supabase.from(table).insert(data).select(),
      `INSERT into ${table}`,
      { ...config, skipRetry: true } // Don't retry inserts to avoid duplicates
    );
  }

  /**
   * Enhanced update query with error handling
   */
  async update<T>(
    table: string,
    data: any,
    filter: { column: string; value: any },
    config?: ApiServiceConfig
  ): Promise<SupabaseResponse<T>> {
    return this.executeSupabaseQuery(
      () => supabase.from(table).update(data).eq(filter.column, filter.value).select(),
      `UPDATE ${table}`,
      config
    );
  }

  /**
   * Enhanced delete query with error handling
   */
  async delete<T>(
    table: string,
    filter: { column: string; value: any },
    config?: ApiServiceConfig
  ): Promise<SupabaseResponse<T>> {
    return this.executeSupabaseQuery(
      () => supabase.from(table).delete().eq(filter.column, filter.value),
      `DELETE from ${table}`,
      { ...config, skipRetry: true } // Don't retry deletes to avoid unintended consequences
    );
  }

  /**
   * Enhanced RPC call with error handling
   */
  async rpc<T>(
    functionName: string,
    params?: any,
    config?: ApiServiceConfig
  ): Promise<SupabaseResponse<T>> {
    return this.executeSupabaseQuery(
      () => supabase.rpc(functionName, params),
      `RPC ${functionName}`,
      config
    );
  }
}

// Export singleton instance
export const apiService = ApiService.getInstance();
export default ApiService;
export type { ApiServiceConfig, SupabaseResponse };