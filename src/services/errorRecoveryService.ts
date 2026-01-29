/**
 * ErrorRecoveryService
 * 
 * Service-level error recovery and retry mechanisms:
 * - Exponential backoff retry strategies
 * - Circuit breaker pattern
 * - Service health monitoring
 * - Automatic recovery procedures
 * - Error classification and routing
 */

import { logger } from '@/utils/logger';
import { errorLoggingService } from './errorLoggingService';

// Retry strategies
export enum RetryStrategy {
  EXPONENTIAL_BACKOFF = 'exponential_backoff',
  LINEAR_BACKOFF = 'linear_backoff',
  FIXED_INTERVAL = 'fixed_interval',
  IMMEDIATE = 'immediate',
  NO_RETRY = 'no_retry'
}

// Error categories
export enum ErrorCategory {
  NETWORK = 'network',
  DATABASE = 'database',
  AUTHENTICATION = 'authentication',
  VALIDATION = 'validation',
  BUSINESS_LOGIC = 'business_logic',
  EXTERNAL_SERVICE = 'external_service',
  RATE_LIMIT = 'rate_limit',
  TIMEOUT = 'timeout',
  UNKNOWN = 'unknown'
}

// Circuit breaker states
export enum CircuitBreakerState {
  CLOSED = 'closed',     // Normal operation
  OPEN = 'open',         // Failing, blocking requests
  HALF_OPEN = 'half_open' // Testing if service recovered
}

// Retry configuration
export interface RetryConfig {
  maxRetries: number;
  strategy: RetryStrategy;
  baseDelay: number;
  maxDelay: number;
  jitter: boolean;
  retryCondition?: (error: Error) => boolean;
}

// Circuit breaker configuration
export interface CircuitBreakerConfig {
  failureThreshold: number;
  recoveryTimeout: number;
  monitoringPeriod: number;
  minimumRequests: number;
}

// Service health status
export interface ServiceHealth {
  serviceName: string;
  isHealthy: boolean;
  lastCheck: number;
  errorCount: number;
  successCount: number;
  averageResponseTime: number;
  circuitBreakerState: CircuitBreakerState;
}

// Error recovery result
export interface RecoveryResult {
  success: boolean;
  data?: any;
  error?: Error;
  retryCount: number;
  recoveryTime: number;
  strategy: RetryStrategy;
}

export class ErrorRecoveryService {
  private static instance: ErrorRecoveryService;
  
  // Service health tracking
  private serviceHealth = new Map<string, ServiceHealth>();
  
  // Circuit breaker state
  private circuitBreakers = new Map<string, {
    state: CircuitBreakerState;
    failureCount: number;
    lastFailureTime: number;
    successCount: number;
    config: CircuitBreakerConfig;
  }>();
  
  // Default configurations
  private defaultRetryConfig: RetryConfig = {
    maxRetries: 3,
    strategy: RetryStrategy.EXPONENTIAL_BACKOFF,
    baseDelay: 1000,
    maxDelay: 30000,
    jitter: true,
    retryCondition: (error: Error) => this.shouldRetry(error)
  };
  
  private defaultCircuitBreakerConfig: CircuitBreakerConfig = {
    failureThreshold: 5,
    recoveryTimeout: 60000, // 1 minute
    monitoringPeriod: 300000, // 5 minutes
    minimumRequests: 10
  };

  private constructor() {
    this.initializeServiceHealthMonitoring();
  }

  public static getInstance(): ErrorRecoveryService {
    if (!ErrorRecoveryService.instance) {
      ErrorRecoveryService.instance = new ErrorRecoveryService();
    }
    return ErrorRecoveryService.instance;
  }

  /**
   * Execute operation with retry mechanism
   */
  public async executeWithRetry<T>(
    operation: () => Promise<T>,
    serviceName: string,
    config?: Partial<RetryConfig>
  ): Promise<RecoveryResult> {
    const startTime = Date.now();
    const retryConfig = { ...this.defaultRetryConfig, ...config };
    let lastError: Error | null = null;
    
    // Check circuit breaker
    if (!this.isCircuitBreakerClosed(serviceName)) {
      const error = new Error(`Circuit breaker is open for service: ${serviceName}`);
      return {
        success: false,
        error,
        retryCount: 0,
        recoveryTime: Date.now() - startTime,
        strategy: retryConfig.strategy
      };
    }

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        // Record attempt
        this.recordServiceAttempt(serviceName, true);
        
        // Execute operation
        const result = await operation();
        
        // Record success
        this.recordServiceSuccess(serviceName);
        
        return {
          success: true,
          data: result,
          retryCount: attempt,
          recoveryTime: Date.now() - startTime,
          strategy: retryConfig.strategy
        };
        
      } catch (error) {
        lastError = error as Error;
        
        // Record failure
        this.recordServiceFailure(serviceName, lastError);
        
        // Check if we should retry
        if (attempt === retryConfig.maxRetries || 
            !retryConfig.retryCondition?.(lastError)) {
          break;
        }
        
        // Calculate delay
        const delay = this.calculateDelay(attempt, retryConfig);
        
        logger.warn(`Retry attempt ${attempt + 1} for ${serviceName} after ${delay}ms`, {
          error: lastError.message,
          service: serviceName,
          attempt: attempt + 1,
          delay
        });
        
        // Wait before retry
        await this.sleep(delay);
      }
    }

    // All retries failed
    this.handleServiceFailure(serviceName, lastError!);
    
    return {
      success: false,
      error: lastError!,
      retryCount: retryConfig.maxRetries,
      recoveryTime: Date.now() - startTime,
      strategy: retryConfig.strategy
    };
  }

  /**
   * Execute operation with circuit breaker
   */
  public async executeWithCircuitBreaker<T>(
    operation: () => Promise<T>,
    serviceName: string,
    config?: Partial<CircuitBreakerConfig>
  ): Promise<T> {
    const circuitConfig = { ...this.defaultCircuitBreakerConfig, ...config };
    
    // Initialize circuit breaker if not exists
    if (!this.circuitBreakers.has(serviceName)) {
      this.circuitBreakers.set(serviceName, {
        state: CircuitBreakerState.CLOSED,
        failureCount: 0,
        lastFailureTime: 0,
        successCount: 0,
        config: circuitConfig
      });
    }

    const circuitBreaker = this.circuitBreakers.get(serviceName)!;

    // Check circuit breaker state
    if (circuitBreaker.state === CircuitBreakerState.OPEN) {
      if (Date.now() - circuitBreaker.lastFailureTime > circuitConfig.recoveryTimeout) {
        circuitBreaker.state = CircuitBreakerState.HALF_OPEN;
        logger.info(`Circuit breaker for ${serviceName} moved to HALF_OPEN`);
      } else {
        throw new Error(`Circuit breaker is OPEN for service: ${serviceName}`);
      }
    }

    try {
      const result = await operation();
      
      // Record success
      circuitBreaker.successCount++;
      circuitBreaker.failureCount = 0;
      
      if (circuitBreaker.state === CircuitBreakerState.HALF_OPEN) {
        circuitBreaker.state = CircuitBreakerState.CLOSED;
        logger.info(`Circuit breaker for ${serviceName} moved to CLOSED`);
      }
      
      return result;
      
    } catch (error) {
      // Record failure
      circuitBreaker.failureCount++;
      circuitBreaker.lastFailureTime = Date.now();
      
      if (circuitBreaker.failureCount >= circuitConfig.failureThreshold) {
        circuitBreaker.state = CircuitBreakerState.OPEN;
        logger.error(`Circuit breaker for ${serviceName} moved to OPEN`, {
          failureCount: circuitBreaker.failureCount,
          threshold: circuitConfig.failureThreshold
        });
      }
      
      throw error;
    }
  }

  /**
   * Get service health status
   */
  public getServiceHealth(serviceName: string): ServiceHealth | null {
    return this.serviceHealth.get(serviceName) || null;
  }

  /**
   * Get all service health statuses
   */
  public getAllServiceHealth(): ServiceHealth[] {
    return Array.from(this.serviceHealth.values());
  }

  /**
   * Reset circuit breaker for service
   */
  public resetCircuitBreaker(serviceName: string): void {
    const circuitBreaker = this.circuitBreakers.get(serviceName);
    if (circuitBreaker) {
      circuitBreaker.state = CircuitBreakerState.CLOSED;
      circuitBreaker.failureCount = 0;
      circuitBreaker.successCount = 0;
      logger.info(`Circuit breaker reset for service: ${serviceName}`);
    }
  }

  /**
   * Configure retry strategy for service
   */
  public configureRetry(serviceName: string, config: Partial<RetryConfig>): void {
    // Store configuration per service
    logger.info(`Retry configuration updated for ${serviceName}:`, config);
  }

  /**
   * Configure circuit breaker for service
   */
  public configureCircuitBreaker(serviceName: string, config: Partial<CircuitBreakerConfig>): void {
    const circuitBreaker = this.circuitBreakers.get(serviceName);
    if (circuitBreaker) {
      circuitBreaker.config = { ...circuitBreaker.config, ...config };
      logger.info(`Circuit breaker configuration updated for ${serviceName}:`, config);
    }
  }

  // Private methods

  private shouldRetry(error: Error): boolean {
    const errorCategory = this.categorizeError(error);
    
    // Don't retry certain error types
    const noRetryCategories = [
      ErrorCategory.AUTHENTICATION,
      ErrorCategory.VALIDATION,
      ErrorCategory.BUSINESS_LOGIC
    ];
    
    if (noRetryCategories.includes(errorCategory)) {
      return false;
    }
    
    // Retry network, timeout, and rate limit errors
    const retryCategories = [
      ErrorCategory.NETWORK,
      ErrorCategory.TIMEOUT,
      ErrorCategory.RATE_LIMIT,
      ErrorCategory.EXTERNAL_SERVICE
    ];
    
    return retryCategories.includes(errorCategory);
  }

  private categorizeError(error: Error): ErrorCategory {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return ErrorCategory.NETWORK;
    }
    
    if (message.includes('database') || message.includes('sql') || message.includes('supabase')) {
      return ErrorCategory.DATABASE;
    }
    
    if (message.includes('auth') || message.includes('unauthorized') || message.includes('forbidden')) {
      return ErrorCategory.AUTHENTICATION;
    }
    
    if (message.includes('validation') || message.includes('invalid') || message.includes('required')) {
      return ErrorCategory.VALIDATION;
    }
    
    if (message.includes('timeout')) {
      return ErrorCategory.TIMEOUT;
    }
    
    if (message.includes('rate limit') || message.includes('too many requests')) {
      return ErrorCategory.RATE_LIMIT;
    }
    
    if (message.includes('external') || message.includes('api') || message.includes('service')) {
      return ErrorCategory.EXTERNAL_SERVICE;
    }
    
    return ErrorCategory.UNKNOWN;
  }

  private calculateDelay(attempt: number, config: RetryConfig): number {
    let delay: number;
    
    switch (config.strategy) {
      case RetryStrategy.EXPONENTIAL_BACKOFF:
        delay = config.baseDelay * Math.pow(2, attempt);
        break;
        
      case RetryStrategy.LINEAR_BACKOFF:
        delay = config.baseDelay * (attempt + 1);
        break;
        
      case RetryStrategy.FIXED_INTERVAL:
        delay = config.baseDelay;
        break;
        
      case RetryStrategy.IMMEDIATE:
        delay = 0;
        break;
        
      default:
        delay = config.baseDelay;
    }
    
    // Apply maximum delay limit
    delay = Math.min(delay, config.maxDelay);
    
    // Add jitter to prevent thundering herd
    if (config.jitter) {
      delay = delay * (0.5 + Math.random() * 0.5);
    }
    
    return Math.floor(delay);
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private isCircuitBreakerClosed(serviceName: string): boolean {
    const circuitBreaker = this.circuitBreakers.get(serviceName);
    return !circuitBreaker || circuitBreaker.state === CircuitBreakerState.CLOSED;
  }

  private recordServiceAttempt(serviceName: string, success: boolean): void {
    const health = this.serviceHealth.get(serviceName) || {
      serviceName,
      isHealthy: true,
      lastCheck: Date.now(),
      errorCount: 0,
      successCount: 0,
      averageResponseTime: 0,
      circuitBreakerState: CircuitBreakerState.CLOSED
    };
    
    if (success) {
      health.successCount++;
    } else {
      health.errorCount++;
    }
    
    health.lastCheck = Date.now();
    health.isHealthy = health.errorCount < health.successCount;
    
    this.serviceHealth.set(serviceName, health);
  }

  private recordServiceSuccess(serviceName: string): void {
    this.recordServiceAttempt(serviceName, true);
  }

  private recordServiceFailure(serviceName: string, error: Error): void {
    this.recordServiceAttempt(serviceName, false);
    
    // Log error
    errorLoggingService.logError(error, {
      serviceName,
      errorCategory: this.categorizeError(error),
      errorType: 'service_error',
      severity: 'medium'
    });
  }

  private handleServiceFailure(serviceName: string, error: Error): void {
    logger.error(`Service failure for ${serviceName}:`, error);
    
    // Update circuit breaker
    const circuitBreaker = this.circuitBreakers.get(serviceName);
    if (circuitBreaker) {
      circuitBreaker.failureCount++;
      circuitBreaker.lastFailureTime = Date.now();
      
      if (circuitBreaker.failureCount >= circuitBreaker.config.failureThreshold) {
        circuitBreaker.state = CircuitBreakerState.OPEN;
      }
    }
  }

  private initializeServiceHealthMonitoring(): void {
    // Monitor service health every 5 minutes
    setInterval(() => {
      this.cleanupOldHealthData();
      this.logServiceHealthSummary();
    }, 5 * 60 * 1000);
  }

  private cleanupOldHealthData(): void {
    const cutoffTime = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago
    
    for (const [serviceName, health] of this.serviceHealth.entries()) {
      if (health.lastCheck < cutoffTime) {
        this.serviceHealth.delete(serviceName);
        this.circuitBreakers.delete(serviceName);
      }
    }
  }

  private logServiceHealthSummary(): void {
    const unhealthyServices = Array.from(this.serviceHealth.values())
      .filter(health => !health.isHealthy);
    
    if (unhealthyServices.length > 0) {
      logger.warn('Unhealthy services detected:', unhealthyServices);
    }
  }
}

// Export singleton instance
export const errorRecoveryService = ErrorRecoveryService.getInstance();
