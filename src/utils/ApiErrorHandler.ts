/**
 * Centralized API Error Handler with Retry Logic
 * 
 * This utility provides comprehensive API error handling with:
 * - Exponential backoff retry mechanism
 * - Network connectivity detection and offline handling
 * - User-friendly error message conversion from technical errors
 * - Automatic recovery for transient failures
 */

import { errorHandler, type ApiError, type UserFriendlyError, type ErrorAction } from './ErrorHandler';
import { logger } from './logger';

interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  retryableStatuses: number[];
}

interface ApiRequest {
  url: string;
  options: RequestInit;
  retryCount?: number;
}

interface NetworkStatus {
  isOnline: boolean;
  lastChecked: number;
  connectionType?: string;
}

class ApiErrorHandler {
  private static instance: ApiErrorHandler;
  private retryQueue: ApiRequest[] = [];
  private networkStatus: NetworkStatus = {
    isOnline: navigator.onLine,
    lastChecked: Date.now()
  };
  
  private readonly defaultRetryConfig: RetryConfig = {
    maxRetries: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 30000, // 30 seconds
    backoffMultiplier: 2,
    retryableStatuses: [0, 408, 429, 500, 502, 503, 504]
  };

  private constructor() {
    this.initializeNetworkMonitoring();
    this.initializeOfflineQueue();
  }

  static getInstance(): ApiErrorHandler {
    if (!ApiErrorHandler.instance) {
      ApiErrorHandler.instance = new ApiErrorHandler();
    }
    return ApiErrorHandler.instance;
  }

  /**
   * Enhanced fetch with automatic retry logic and error handling
   */
  async fetchWithRetry(
    url: string, 
    options: RequestInit = {}, 
    retryConfig: Partial<RetryConfig> = {}
  ): Promise<Response> {
    const config = { ...this.defaultRetryConfig, ...retryConfig };
    const request: ApiRequest = { url, options, retryCount: 0 };

    return this.executeWithRetry(request, config);
  }

  /**
   * Execute API request with retry logic
   */
  private async executeWithRetry(request: ApiRequest, config: RetryConfig): Promise<Response> {
    const { url, options } = request;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
      try {
        // Check network connectivity before attempting request
        if (!this.networkStatus.isOnline) {
          throw new Error('Network unavailable');
        }

        // Add timeout to prevent hanging requests
        const timeoutController = new AbortController();
        const timeoutId = setTimeout(() => timeoutController.abort(), 30000);

        const requestOptions: RequestInit = {
          ...options,
          signal: timeoutController.signal,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          }
        };

        logger.info(`API Request attempt ${attempt + 1}/${config.maxRetries + 1}: ${url}`);
        
        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);

        // Check if response indicates a retryable error
        if (!response.ok && config.retryableStatuses.includes(response.status)) {
          throw new ApiError(`HTTP ${response.status}: ${response.statusText}`, response.status);
        }

        // Success - clear any queued retries for this request
        this.removeFromRetryQueue(url);
        logger.info(`API Request successful: ${url}`);
        
        return response;

      } catch (error) {
        lastError = error as Error;
        clearTimeout(timeoutId);

        // Don't retry on the last attempt
        if (attempt === config.maxRetries) {
          break;
        }

        // Check if error is retryable
        if (!this.isRetryableError(error as Error)) {
          break;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          config.baseDelay * Math.pow(config.backoffMultiplier, attempt),
          config.maxDelay
        );

        logger.warn(`API Request failed, retrying in ${delay}ms: ${url}`, error);
        
        // Add jitter to prevent thundering herd
        const jitteredDelay = delay + Math.random() * 1000;
        await this.delay(jitteredDelay);
      }
    }

    // All retries exhausted - handle the error
    if (lastError) {
      return this.handleFailedRequest(request, lastError);
    }

    throw new Error('Request failed with unknown error');
  }

  /**
   * Handle failed requests after all retries exhausted
   */
  private async handleFailedRequest(request: ApiRequest, error: Error): Promise<Response> {
    const apiError = this.convertToApiError(error);
    
    // If offline, queue the request for later
    if (!this.networkStatus.isOnline || this.isNetworkError(error)) {
      this.queueForRetry(request);
      
      // Return a mock response for offline handling
      return new Response(
        JSON.stringify({ 
          error: 'offline', 
          message: 'Request queued for when connection is restored' 
        }),
        { 
          status: 0, 
          statusText: 'Offline' 
        }
      );
    }

    // Convert to user-friendly error and handle
    const userFriendlyError = errorHandler.handleApiError(apiError);
    this.showUserFriendlyError(userFriendlyError);
    
    // Re-throw for caller to handle
    throw apiError;
  }

  /**
   * Convert generic errors to ApiError format
   */
  private convertToApiError(error: Error): ApiError {
    if (error.name === 'AbortError') {
      return new ApiError('Request timeout', 408);
    }
    
    if (this.isNetworkError(error)) {
      return new ApiError('Network error', 0);
    }

    // Try to extract status from error message
    const statusMatch = error.message.match(/HTTP (\d+):/);
    const status = statusMatch ? parseInt(statusMatch[1]) : 500;
    
    return new ApiError(error.message, status);
  }

  /**
   * Check if error is retryable
   */
  private isRetryableError(error: Error): boolean {
    // Network errors are retryable
    if (this.isNetworkError(error)) {
      return true;
    }

    // Timeout errors are retryable
    if (error.name === 'AbortError') {
      return true;
    }

    // Check if it's an ApiError with retryable status
    if (error instanceof ApiError && error.status) {
      return this.defaultRetryConfig.retryableStatuses.includes(error.status);
    }

    return false;
  }

  /**
   * Check if error is network-related
   */
  private isNetworkError(error: Error): boolean {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('connection') ||
      message.includes('timeout') ||
      error.name === 'TypeError' ||
      !this.networkStatus.isOnline
    );
  }

  /**
   * Initialize network connectivity monitoring
   */
  private initializeNetworkMonitoring(): void {
    // Listen for online/offline events
    window.addEventListener('online', () => {
      logger.info('Network connection restored');
      this.networkStatus.isOnline = true;
      this.networkStatus.lastChecked = Date.now();
      this.processRetryQueue();
    });

    window.addEventListener('offline', () => {
      logger.warn('Network connection lost');
      this.networkStatus.isOnline = false;
      this.networkStatus.lastChecked = Date.now();
    });

    // Periodic connectivity check
    setInterval(() => {
      this.checkNetworkConnectivity();
    }, 30000); // Check every 30 seconds
  }

  /**
   * Check network connectivity with a lightweight request
   */
  private async checkNetworkConnectivity(): Promise<boolean> {
    try {
      // Use a lightweight request to check connectivity
      const response = await fetch('/favicon.ico', { 
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000)
      });
      
      const isOnline = response.ok;
      
      if (isOnline !== this.networkStatus.isOnline) {
        this.networkStatus.isOnline = isOnline;
        this.networkStatus.lastChecked = Date.now();
        
        if (isOnline) {
          logger.info('Network connectivity restored via periodic check');
          this.processRetryQueue();
        } else {
          logger.warn('Network connectivity lost via periodic check');
        }
      }
      
      return isOnline;
    } catch (error) {
      if (this.networkStatus.isOnline) {
        this.networkStatus.isOnline = false;
        this.networkStatus.lastChecked = Date.now();
        logger.warn('Network connectivity lost via periodic check');
      }
      return false;
    }
  }

  /**
   * Initialize offline request queue management
   */
  private initializeOfflineQueue(): void {
    // Load queued requests from localStorage on startup
    try {
      const queuedRequests = localStorage.getItem('apiRetryQueue');
      if (queuedRequests) {
        this.retryQueue = JSON.parse(queuedRequests);
        logger.info(`Loaded ${this.retryQueue.length} queued requests from storage`);
      }
    } catch (error) {
      logger.warn('Failed to load retry queue from storage:', error);
      this.retryQueue = [];
    }

    // Save queue to localStorage when it changes
    this.saveRetryQueue();
  }

  /**
   * Queue request for retry when network is restored
   */
  private queueForRetry(request: ApiRequest): void {
    // Avoid duplicate entries
    const existingIndex = this.retryQueue.findIndex(r => r.url === request.url);
    if (existingIndex >= 0) {
      this.retryQueue[existingIndex] = request;
    } else {
      this.retryQueue.push(request);
    }
    
    this.saveRetryQueue();
    logger.info(`Queued request for retry: ${request.url}`);
  }

  /**
   * Remove request from retry queue
   */
  private removeFromRetryQueue(url: string): void {
    const initialLength = this.retryQueue.length;
    this.retryQueue = this.retryQueue.filter(request => request.url !== url);
    
    if (this.retryQueue.length !== initialLength) {
      this.saveRetryQueue();
      logger.info(`Removed request from retry queue: ${url}`);
    }
  }

  /**
   * Process queued requests when network is restored
   */
  private async processRetryQueue(): Promise<void> {
    if (this.retryQueue.length === 0) {
      return;
    }

    logger.info(`Processing ${this.retryQueue.length} queued requests`);
    
    const queueCopy = [...this.retryQueue];
    this.retryQueue = [];
    this.saveRetryQueue();

    // Process requests with some delay to avoid overwhelming the server
    for (const request of queueCopy) {
      try {
        await this.delay(500); // 500ms between requests
        await this.executeWithRetry(request, this.defaultRetryConfig);
        logger.info(`Successfully processed queued request: ${request.url}`);
      } catch (error) {
        logger.error(`Failed to process queued request: ${request.url}`, error);
        // Re-queue if it's still a retryable error
        if (this.isRetryableError(error as Error)) {
          this.queueForRetry(request);
        }
      }
    }
  }

  /**
   * Save retry queue to localStorage
   */
  private saveRetryQueue(): void {
    try {
      localStorage.setItem('apiRetryQueue', JSON.stringify(this.retryQueue));
    } catch (error) {
      logger.warn('Failed to save retry queue to storage:', error);
    }
  }

  /**
   * Show user-friendly error with enhanced actions
   */
  private showUserFriendlyError(userError: UserFriendlyError): void {
    // Enhance error actions with retry capability
    const enhancedActions: ErrorAction[] = [
      {
        label: 'Retry Now',
        action: () => {
          this.processRetryQueue();
        },
        primary: true
      },
      ...userError.actions
    ];

    const enhancedError: UserFriendlyError = {
      ...userError,
      actions: enhancedActions
    };

    errorHandler.showErrorMessage(enhancedError.message, enhancedError.actions);
  }

  /**
   * Get current network status
   */
  getNetworkStatus(): NetworkStatus {
    return { ...this.networkStatus };
  }

  /**
   * Get current retry queue length
   */
  getRetryQueueLength(): number {
    return this.retryQueue.length;
  }

  /**
   * Clear retry queue (useful for testing or manual cleanup)
   */
  clearRetryQueue(): void {
    this.retryQueue = [];
    this.saveRetryQueue();
    logger.info('Retry queue cleared');
  }

  /**
   * Utility method for delays
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Custom ApiError class for better error handling
 */
class ApiError extends Error {
  public status?: number;
  public code?: string;
  public response?: any;

  constructor(message: string, status?: number, code?: string, response?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.response = response;
  }
}

// Export singleton instance and types
export const apiErrorHandler = ApiErrorHandler.getInstance();
export default ApiErrorHandler;
export type { RetryConfig, ApiRequest, NetworkStatus };
export { ApiError };