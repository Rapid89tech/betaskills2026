import { logger } from '@/utils/logger';

export interface PaymentRetryOptions {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  jitter: boolean;
}

export interface PaymentRetryResult {
  success: boolean;
  attempts: number;
  totalTime: number;
  lastError?: Error;
  data?: any;
}

export interface PaymentOperation {
  id: string;
  type: 'enrollment' | 'status_update' | 'verification';
  data: any;
  timestamp: string;
  userId: string;
  courseId?: string;
}

export class PaymentRetryService {
  private static instance: PaymentRetryService;
  private retryQueue: Map<string, PaymentOperation> = new Map();
  private activeRetries: Map<string, Promise<PaymentRetryResult>> = new Map();
  private defaultOptions: PaymentRetryOptions = {
    maxRetries: 3,
    baseDelay: 1000,
    maxDelay: 10000,
    backoffMultiplier: 2,
    jitter: true
  };

  private constructor() {
    this.startRetryProcessor();
    this.setupOnlineStatusListener();
  }

  public static getInstance(): PaymentRetryService {
    if (!PaymentRetryService.instance) {
      PaymentRetryService.instance = new PaymentRetryService();
    }
    return PaymentRetryService.instance;
  }

  /**
   * Execute payment operation with retry logic
   */
  public async executeWithRetry<T>(
    operationId: string,
    operation: () => Promise<T>,
    options: Partial<PaymentRetryOptions> = {}
  ): Promise<PaymentRetryResult> {
    const retryOptions = { ...this.defaultOptions, ...options };
    const startTime = Date.now();
    let lastError: Error | undefined;
    let attempts = 0;

    logger.info(`🔄 Starting payment retry operation: ${operationId}`, {
      maxRetries: retryOptions.maxRetries,
      baseDelay: retryOptions.baseDelay
    });

    for (attempts = 1; attempts <= retryOptions.maxRetries; attempts++) {
      try {
        logger.info(`🔄 Payment operation attempt ${attempts}/${retryOptions.maxRetries}: ${operationId}`);
        
        const result = await operation();
        
        const totalTime = Date.now() - startTime;
        logger.info(`✅ Payment operation succeeded: ${operationId}`, {
          attempts,
          totalTime
        });

        return {
          success: true,
          attempts,
          totalTime,
          data: result
        };

      } catch (error) {
        lastError = error as Error;
        logger.warn(`⚠️ Payment operation attempt ${attempts} failed: ${operationId}`, {
          error: lastError.message,
          attempt: attempts,
          maxRetries: retryOptions.maxRetries
        });

        // Don't retry on the last attempt
        if (attempts >= retryOptions.maxRetries) {
          break;
        }

        // Calculate delay with exponential backoff and jitter
        const delay = this.calculateDelay(attempts, retryOptions);
        logger.info(`⏳ Waiting ${delay}ms before retry ${attempts + 1}: ${operationId}`);
        
        await this.sleep(delay);
      }
    }

    const totalTime = Date.now() - startTime;
    logger.error(`❌ Payment operation failed after ${attempts} attempts: ${operationId}`, {
      attempts,
      totalTime,
      lastError: lastError?.message
    });

    return {
      success: false,
      attempts,
      totalTime,
      lastError
    };
  }

  /**
   * Queue payment operation for retry
   */
  public queuePaymentOperation(operation: PaymentOperation): void {
    this.retryQueue.set(operation.id, operation);
    logger.info(`📋 Payment operation queued: ${operation.id}`, {
      type: operation.type,
      userId: operation.userId
    });
  }

  /**
   * Process queued payment operations
   */
  private async processQueuedOperations(): Promise<void> {
    if (this.retryQueue.size === 0) {
      return;
    }

    logger.info(`🔄 Processing ${this.retryQueue.size} queued payment operations`);

    const operations = Array.from(this.retryQueue.values());
    
    for (const operation of operations) {
      // Skip if already being retried
      if (this.activeRetries.has(operation.id)) {
        continue;
      }

      // Check if operation is too old (older than 1 hour)
      const operationAge = Date.now() - new Date(operation.timestamp).getTime();
      if (operationAge > 60 * 60 * 1000) {
        logger.warn(`⏰ Removing expired payment operation: ${operation.id}`, {
          age: operationAge
        });
        this.retryQueue.delete(operation.id);
        continue;
      }

      // Start retry process
      this.retryPaymentOperation(operation);
    }
  }

  /**
   * Retry a specific payment operation
   */
  private async retryPaymentOperation(operation: PaymentOperation): Promise<void> {
    const retryPromise = this.executeWithRetry(
      operation.id,
      async () => {
        return await this.executePaymentOperation(operation);
      },
      {
        maxRetries: 3,
        baseDelay: 2000
      }
    );

    this.activeRetries.set(operation.id, retryPromise);

    try {
      const result = await retryPromise;
      
      if (result.success) {
        logger.info(`✅ Queued payment operation succeeded: ${operation.id}`);
        this.retryQueue.delete(operation.id);
      } else {
        logger.error(`❌ Queued payment operation failed: ${operation.id}`, {
          attempts: result.attempts,
          error: result.lastError?.message
        });
        
        // Remove from queue if all retries failed
        this.retryQueue.delete(operation.id);
      }
    } catch (error) {
      logger.error(`❌ Unexpected error during payment retry: ${operation.id}`, error);
      this.retryQueue.delete(operation.id);
    } finally {
      this.activeRetries.delete(operation.id);
    }
  }

  /**
   * Execute the actual payment operation
   */
  private async executePaymentOperation(operation: PaymentOperation): Promise<any> {
    switch (operation.type) {
      case 'enrollment':
        return await this.executeEnrollmentOperation(operation);
      case 'status_update':
        return await this.executeStatusUpdateOperation(operation);
      case 'verification':
        return await this.executeVerificationOperation(operation);
      default:
        throw new Error(`Unknown payment operation type: ${operation.type}`);
    }
  }

  /**
   * Execute enrollment operation
   */
  private async executeEnrollmentOperation(operation: PaymentOperation): Promise<any> {
    // Import dynamically to avoid circular dependencies
    const { supabase } = await import('@/integrations/supabase/client');
    
    logger.info(`🔄 Executing enrollment operation: ${operation.id}`);
    
    const { data, error } = await supabase
      .from('enrollments')
      .insert(operation.data)
      .select()
      .single();

    if (error) {
      throw new Error(`Enrollment operation failed: ${error.message}`);
    }

    return data;
  }

  /**
   * Execute status update operation
   */
  private async executeStatusUpdateOperation(operation: PaymentOperation): Promise<any> {
    const { supabase } = await import('@/integrations/supabase/client');
    
    logger.info(`🔄 Executing status update operation: ${operation.id}`);
    
    const { data, error } = await supabase
      .from('enrollments')
      .update(operation.data.updates)
      .eq('id', operation.data.enrollmentId)
      .select()
      .single();

    if (error) {
      throw new Error(`Status update operation failed: ${error.message}`);
    }

    return data;
  }

  /**
   * Execute verification operation
   */
  private async executeVerificationOperation(operation: PaymentOperation): Promise<any> {
    const { supabase } = await import('@/integrations/supabase/client');
    
    logger.info(`🔄 Executing verification operation: ${operation.id}`);
    
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('id', operation.data.enrollmentId)
      .single();

    if (error) {
      throw new Error(`Verification operation failed: ${error.message}`);
    }

    return data;
  }

  /**
   * Calculate retry delay with exponential backoff and jitter
   */
  private calculateDelay(attempt: number, options: PaymentRetryOptions): number {
    let delay = Math.min(
      options.baseDelay * Math.pow(options.backoffMultiplier, attempt - 1),
      options.maxDelay
    );

    // Add jitter to prevent thundering herd
    if (options.jitter) {
      const jitterAmount = delay * 0.1; // 10% jitter
      delay += (Math.random() - 0.5) * 2 * jitterAmount;
    }

    return Math.max(0, Math.floor(delay));
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Start the retry processor
   */
  private startRetryProcessor(): void {
    // Process queued operations every 30 seconds
    setInterval(() => {
      this.processQueuedOperations();
    }, 30000);

    // Also process immediately
    setTimeout(() => {
      this.processQueuedOperations();
    }, 1000);
  }

  /**
   * Setup online status listener
   */
  private setupOnlineStatusListener(): void {
    window.addEventListener('online', () => {
      logger.info('🌐 Back online - processing queued payment operations');
      this.processQueuedOperations();
    });

    window.addEventListener('offline', () => {
      logger.info('📱 Gone offline - payment operations will be queued');
    });
  }

  /**
   * Get retry queue status
   */
  public getQueueStatus(): {
    queued: number;
    active: number;
    operations: PaymentOperation[];
  } {
    return {
      queued: this.retryQueue.size,
      active: this.activeRetries.size,
      operations: Array.from(this.retryQueue.values())
    };
  }

  /**
   * Clear retry queue
   */
  public clearQueue(): void {
    this.retryQueue.clear();
    logger.info('🧹 Payment retry queue cleared');
  }

  /**
   * Get retry statistics
   */
  public getRetryStats(): {
    totalQueued: number;
    totalProcessed: number;
    successRate: number;
  } {
    // This would be implemented with persistent storage in a real application
    return {
      totalQueued: this.retryQueue.size,
      totalProcessed: 0, // Would track this in persistent storage
      successRate: 0 // Would calculate from historical data
    };
  }
}

export const paymentRetryService = PaymentRetryService.getInstance();
