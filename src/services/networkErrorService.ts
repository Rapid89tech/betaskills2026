/**
 * NetworkErrorService
 * 
 * Network error handling with offline mode support:
 * - Online/offline status monitoring
 * - Request queuing for offline scenarios
 * - Automatic retry when connection is restored
 * - Network quality assessment
 * - Bandwidth monitoring and adaptive strategies
 */

import { logger } from '@/utils/logger';
import { errorRecoveryService, RetryStrategy } from './errorRecoveryService';
import { errorLoggingService } from './errorLoggingService';

// Network status
export enum NetworkStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  SLOW = 'slow',
  UNSTABLE = 'unstable'
}

// Network quality levels
export enum NetworkQuality {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
  VERY_POOR = 'very_poor'
}

// Request queue item
interface QueuedRequest {
  id: string;
  operation: () => Promise<any>;
  priority: number;
  timestamp: number;
  retryCount: number;
  maxRetries: number;
  resolve: (value: any) => void;
  reject: (error: Error) => void;
}

// Network metrics
interface NetworkMetrics {
  latency: number;
  bandwidth: number;
  packetLoss: number;
  jitter: number;
  quality: NetworkQuality;
  lastCheck: number;
}

// Network configuration
interface NetworkConfig {
  onlineCheckInterval: number;
  qualityCheckInterval: number;
  maxQueueSize: number;
  defaultTimeout: number;
  slowConnectionThreshold: number;
  adaptiveRetryEnabled: boolean;
}

export class NetworkErrorService {
  private static instance: NetworkErrorService;
  
  // Network state
  private isOnline: boolean = navigator.onLine;
  private networkStatus: NetworkStatus = this.isOnline ? NetworkStatus.ONLINE : NetworkStatus.OFFLINE;
  private networkQuality: NetworkQuality = NetworkQuality.GOOD;
  private networkMetrics: NetworkMetrics = {
    latency: 0,
    bandwidth: 0,
    packetLoss: 0,
    jitter: 0,
    quality: NetworkQuality.GOOD,
    lastCheck: 0
  };
  
  // Request queue for offline scenarios
  private requestQueue: QueuedRequest[] = [];
  private isProcessingQueue: boolean = false;
  
  // Event listeners
  private onlineListeners: Array<(isOnline: boolean) => void> = [];
  private networkQualityListeners: Array<(quality: NetworkQuality) => void> = [];
  
  // Configuration
  private config: NetworkConfig = {
    onlineCheckInterval: 30000, // 30 seconds
    qualityCheckInterval: 60000, // 1 minute
    maxQueueSize: 100,
    defaultTimeout: 30000, // 30 seconds
    slowConnectionThreshold: 2000, // 2 seconds
    adaptiveRetryEnabled: true
  };
  
  // Timers
  private onlineCheckTimer: NodeJS.Timeout | null = null;
  private qualityCheckTimer: NodeJS.Timeout | null = null;
  
  // Performance tracking
  private requestTimes: number[] = [];
  private failedRequests: number = 0;
  private successfulRequests: number = 0;

  private constructor() {
    this.initializeNetworkMonitoring();
    this.setupEventListeners();
  }

  public static getInstance(): NetworkErrorService {
    if (!NetworkErrorService.instance) {
      NetworkErrorService.instance = new NetworkErrorService();
    }
    return NetworkErrorService.instance;
  }

  /**
   * Execute network request with offline support
   */
  public async executeRequest<T>(
    operation: () => Promise<T>,
    options?: {
      priority?: number;
      maxRetries?: number;
      timeout?: number;
      skipQueue?: boolean;
    }
  ): Promise<T> {
    const {
      priority = 1,
      maxRetries = 3,
      timeout = this.config.defaultTimeout,
      skipQueue = false
    } = options || {};

    // If offline and not skipping queue, add to queue
    if (!this.isOnline && !skipQueue) {
      return this.queueRequest(operation, priority, maxRetries);
    }

    // Execute request with network error handling
    return this.executeWithNetworkHandling(operation, maxRetries, timeout);
  }

  /**
   * Get current network status
   */
  public getNetworkStatus(): {
    isOnline: boolean;
    status: NetworkStatus;
    quality: NetworkQuality;
    metrics: NetworkMetrics;
    queueSize: number;
  } {
    return {
      isOnline: this.isOnline,
      status: this.networkStatus,
      quality: this.networkQuality,
      metrics: { ...this.networkMetrics },
      queueSize: this.requestQueue.length
    };
  }

  /**
   * Add online status listener
   */
  public addOnlineListener(callback: (isOnline: boolean) => void): () => void {
    this.onlineListeners.push(callback);
    return () => {
      const index = this.onlineListeners.indexOf(callback);
      if (index > -1) {
        this.onlineListeners.splice(index, 1);
      }
    };
  }

  /**
   * Add network quality listener
   */
  public addNetworkQualityListener(callback: (quality: NetworkQuality) => void): () => void {
    this.networkQualityListeners.push(callback);
    return () => {
      const index = this.networkQualityListeners.indexOf(callback);
      if (index > -1) {
        this.networkQualityListeners.splice(index, 1);
      }
    };
  }

  /**
   * Force network quality check
   */
  public async checkNetworkQuality(): Promise<NetworkQuality> {
    try {
      const startTime = Date.now();
      
      // Simple ping test
      const response = await fetch('/api/health', {
        method: 'HEAD',
        cache: 'no-cache',
        signal: AbortSignal.timeout(5000)
      });
      
      const latency = Date.now() - startTime;
      
      // Update metrics
      this.networkMetrics = {
        latency,
        bandwidth: this.estimateBandwidth(latency),
        packetLoss: 0, // Would need more sophisticated testing
        jitter: this.calculateJitter(latency),
        quality: this.assessQuality(latency),
        lastCheck: Date.now()
      };
      
      this.networkQuality = this.networkMetrics.quality;
      this.notifyNetworkQualityListeners(this.networkQuality);
      
      return this.networkQuality;
      
    } catch (error) {
      logger.warn('Network quality check failed:', error);
      this.networkQuality = NetworkQuality.VERY_POOR;
      this.notifyNetworkQualityListeners(this.networkQuality);
      return this.networkQuality;
    }
  }

  /**
   * Clear request queue
   */
  public clearQueue(): void {
    this.requestQueue.forEach(request => {
      request.reject(new Error('Request queue cleared'));
    });
    this.requestQueue = [];
    logger.info('Network request queue cleared');
  }

  /**
   * Configure network service
   */
  public configure(config: Partial<NetworkConfig>): void {
    this.config = { ...this.config, ...config };
    logger.info('Network service configuration updated:', config);
  }

  // Private methods

  private async queueRequest<T>(
    operation: () => Promise<T>,
    priority: number,
    maxRetries: number
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      // Check queue size limit
      if (this.requestQueue.length >= this.config.maxQueueSize) {
        reject(new Error('Request queue is full'));
        return;
      }

      const queuedRequest: QueuedRequest = {
        id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        operation,
        priority,
        timestamp: Date.now(),
        retryCount: 0,
        maxRetries,
        resolve,
        reject
      };

      // Insert by priority (higher priority first)
      const insertIndex = this.requestQueue.findIndex(req => req.priority < priority);
      if (insertIndex === -1) {
        this.requestQueue.push(queuedRequest);
      } else {
        this.requestQueue.splice(insertIndex, 0, queuedRequest);
      }

      logger.info(`Request queued (priority: ${priority}, queue size: ${this.requestQueue.length})`);

      // Start processing queue if not already running
      if (!this.isProcessingQueue) {
        this.processQueue();
      }
    });
  }

  private async executeWithNetworkHandling<T>(
    operation: () => Promise<T>,
    maxRetries: number,
    timeout: number
  ): Promise<T> {
    const startTime = Date.now();

    try {
      // Create timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeout);
      });

      // Execute with timeout
      const result = await Promise.race([
        operation(),
        timeoutPromise
      ]);

      // Record successful request
      const requestTime = Date.now() - startTime;
      this.recordSuccessfulRequest(requestTime);

      return result;

    } catch (error) {
      this.recordFailedRequest();
      
      // Check if it's a network error
      if (this.isNetworkError(error as Error)) {
        // Use error recovery service for network errors
        const recoveryResult = await errorRecoveryService.executeWithRetry(
          operation,
          'network',
          {
            maxRetries,
            strategy: this.getRetryStrategy(),
            baseDelay: this.getBaseDelay(),
            retryCondition: (err) => this.shouldRetryNetworkError(err)
          }
        );

        if (recoveryResult.success) {
          return recoveryResult.data;
        } else {
          throw recoveryResult.error;
        }
      }

      throw error;
    }
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessingQueue || !this.isOnline || this.requestQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;
    logger.info(`Processing request queue (${this.requestQueue.length} items)`);

    while (this.requestQueue.length > 0 && this.isOnline) {
      const request = this.requestQueue.shift()!;

      try {
        const result = await this.executeWithNetworkHandling(
          request.operation,
          request.maxRetries,
          this.config.defaultTimeout
        );

        request.resolve(result);
        logger.info(`Queued request completed successfully`);

      } catch (error) {
        request.retryCount++;
        
        if (request.retryCount < request.maxRetries) {
          // Re-queue for retry
          request.timestamp = Date.now();
          this.requestQueue.unshift(request);
          logger.info(`Queued request retry ${request.retryCount}/${request.maxRetries}`);
        } else {
          request.reject(error as Error);
          logger.error(`Queued request failed after ${request.maxRetries} retries`);
        }
      }

      // Small delay between requests to avoid overwhelming the network
      await this.sleep(100);
    }

    this.isProcessingQueue = false;
    logger.info('Request queue processing completed');
  }

  private isNetworkError(error: Error): boolean {
    const message = error.message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('connection') ||
      message.includes('timeout') ||
      message.includes('abort') ||
      message.includes('offline')
    );
  }

  private shouldRetryNetworkError(error: Error): boolean {
    const message = error.message.toLowerCase();
    
    // Don't retry certain errors
    if (message.includes('unauthorized') || message.includes('forbidden')) {
      return false;
    }
    
    // Retry network-related errors
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('connection')
    );
  }

  private getRetryStrategy(): RetryStrategy {
    if (!this.config.adaptiveRetryEnabled) {
      return RetryStrategy.EXPONENTIAL_BACKOFF;
    }

    // Adaptive retry based on network quality
    switch (this.networkQuality) {
      case NetworkQuality.EXCELLENT:
      case NetworkQuality.GOOD:
        return RetryStrategy.EXPONENTIAL_BACKOFF;
      
      case NetworkQuality.FAIR:
        return RetryStrategy.LINEAR_BACKOFF;
      
      case NetworkQuality.POOR:
      case NetworkQuality.VERY_POOR:
        return RetryStrategy.FIXED_INTERVAL;
      
      default:
        return RetryStrategy.EXPONENTIAL_BACKOFF;
    }
  }

  private getBaseDelay(): number {
    if (!this.config.adaptiveRetryEnabled) {
      return 1000;
    }

    // Adaptive delay based on network quality
    switch (this.networkQuality) {
      case NetworkQuality.EXCELLENT:
        return 500;
      
      case NetworkQuality.GOOD:
        return 1000;
      
      case NetworkQuality.FAIR:
        return 2000;
      
      case NetworkQuality.POOR:
        return 5000;
      
      case NetworkQuality.VERY_POOR:
        return 10000;
      
      default:
        return 1000;
    }
  }

  private assessQuality(latency: number): NetworkQuality {
    if (latency < 100) return NetworkQuality.EXCELLENT;
    if (latency < 300) return NetworkQuality.GOOD;
    if (latency < 1000) return NetworkQuality.FAIR;
    if (latency < 3000) return NetworkQuality.POOR;
    return NetworkQuality.VERY_POOR;
  }

  private estimateBandwidth(latency: number): number {
    // Rough estimation based on latency
    if (latency < 100) return 100; // Mbps
    if (latency < 300) return 50;
    if (latency < 1000) return 10;
    return 1;
  }

  private calculateJitter(latency: number): number {
    // Calculate jitter based on recent latency measurements
    if (this.requestTimes.length < 2) return 0;
    
    const recentTimes = this.requestTimes.slice(-10);
    const avgLatency = recentTimes.reduce((a, b) => a + b, 0) / recentTimes.length;
    
    return Math.abs(latency - avgLatency);
  }

  private recordSuccessfulRequest(requestTime: number): void {
    this.successfulRequests++;
    this.requestTimes.push(requestTime);
    
    // Keep only last 100 request times
    if (this.requestTimes.length > 100) {
      this.requestTimes.shift();
    }
  }

  private recordFailedRequest(): void {
    this.failedRequests++;
  }

  private setupEventListeners(): void {
    // Online/offline events
    window.addEventListener('online', () => {
      this.handleOnlineStatusChange(true);
    });

    window.addEventListener('offline', () => {
      this.handleOnlineStatusChange(false);
    });

    // Visibility change (tab focus/blur)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && this.isOnline) {
        // Tab became visible and we're online, check network quality
        this.checkNetworkQuality();
      }
    });
  }

  private handleOnlineStatusChange(isOnline: boolean): void {
    const wasOffline = !this.isOnline;
    this.isOnline = isOnline;
    this.networkStatus = isOnline ? NetworkStatus.ONLINE : NetworkStatus.OFFLINE;

    logger.info(`Network status changed: ${isOnline ? 'ONLINE' : 'OFFLINE'}`);

    // Notify listeners
    this.notifyOnlineListeners(isOnline);

    if (isOnline && wasOffline) {
      // Connection restored, process queued requests
      this.checkNetworkQuality();
      this.processQueue();
    }

    // Log error for offline events
    if (!isOnline) {
      errorLoggingService.logError(new Error('Network connection lost'), {
        errorType: 'network_error',
        severity: 'high',
        metadata: {
          queueSize: this.requestQueue.length,
          networkQuality: this.networkQuality
        }
      });
    }
  }

  private notifyOnlineListeners(isOnline: boolean): void {
    this.onlineListeners.forEach(listener => {
      try {
        listener(isOnline);
      } catch (error) {
        logger.error('Error in online listener:', error);
      }
    });
  }

  private notifyNetworkQualityListeners(quality: NetworkQuality): void {
    this.networkQualityListeners.forEach(listener => {
      try {
        listener(quality);
      } catch (error) {
        logger.error('Error in network quality listener:', error);
      }
    });
  }

  private initializeNetworkMonitoring(): void {
    // Start online status monitoring
    this.onlineCheckTimer = setInterval(() => {
      if (this.isOnline) {
        this.checkNetworkQuality();
      }
    }, this.config.onlineCheckInterval);

    // Start quality monitoring
    this.qualityCheckTimer = setInterval(() => {
      if (this.isOnline) {
        this.checkNetworkQuality();
      }
    }, this.config.qualityCheckInterval);
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Cleanup method
  public destroy(): void {
    if (this.onlineCheckTimer) {
      clearInterval(this.onlineCheckTimer);
    }
    if (this.qualityCheckTimer) {
      clearInterval(this.qualityCheckTimer);
    }
    
    this.clearQueue();
    this.onlineListeners = [];
    this.networkQualityListeners = [];
  }
}

// Export singleton instance
export const networkErrorService = NetworkErrorService.getInstance();
