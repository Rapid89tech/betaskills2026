
import { stabilityMonitoringService } from './StabilityMonitoringService';

export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize: number; // Maximum number of items in cache
}

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  cacheHitRate: number;
  apiResponseTime: number;
}

class PerformanceOptimizationService {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();
  private performanceMetrics: PerformanceMetrics = {
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    cacheHitRate: 0,
    apiResponseTime: 0
  };
  private cacheConfig: CacheConfig = {
    ttl: 5 * 60 * 1000, // 5 minutes default
    maxSize: 100
  };

  constructor() {
    this.startPerformanceMonitoring();
    this.setupCacheCleanup();
  }

  // Caching Methods
  public setCache(key: string, data: any, ttl?: number): void {
    const timestamp = Date.now();
    const cacheEntry = {
      data,
      timestamp,
      ttl: ttl || this.cacheConfig.ttl
    };

    // Remove oldest entries if cache is full
    if (this.cache.size >= this.cacheConfig.maxSize) {
      const oldestKey = Array.from(this.cache.keys())[0];
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, cacheEntry);
  }

  public getCache(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  public clearCache(pattern?: string): void {
    if (pattern) {
      const regex = new RegExp(pattern);
      for (const key of this.cache.keys()) {
        if (regex.test(key)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  public getCacheStats(): { size: number; hitRate: number } {
    return {
      size: this.cache.size,
      hitRate: this.performanceMetrics.cacheHitRate
    };
  }

  // Performance Monitoring
  private startPerformanceMonitoring(): void {
    // Monitor page load performance
    if (typeof window !== 'undefined' && 'performance' in window) {
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.performanceMetrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          
          stabilityMonitoringService.recordPerformanceMetric({
            metricName: 'page_load_time',
            value: this.performanceMetrics.loadTime,
            timestamp: new Date().toISOString()
          });
        }
      });

      // Monitor memory usage
      setInterval(() => {
        if ((performance as any).memory) {
          const memInfo = (performance as any).memory;
          this.performanceMetrics.memoryUsage = (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize) * 100;
          
          stabilityMonitoringService.recordPerformanceMetric({
            metricName: 'memory_usage_percentage',
            value: this.performanceMetrics.memoryUsage,
            timestamp: new Date().toISOString()
          });
        }
      }, 30000); // Every 30 seconds
    }
  }

  // Optimized Data Loading
  public async optimizedFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: { 
      useCache?: boolean; 
      ttl?: number; 
      retries?: number;
      timeout?: number;
    } = {}
  ): Promise<T> {
    const { useCache = true, ttl, retries = 3, timeout = 10000 } = options;
    
    // Check cache first
    if (useCache) {
      const cached = this.getCache(key);
      if (cached) {
        this.updateCacheHitRate(true);
        return cached;
      }
      this.updateCacheHitRate(false);
    }

    const startTime = performance.now();
    
    try {
      // Add timeout to fetch
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeout);
      });

      const result = await Promise.race([fetchFn(), timeoutPromise]);
      
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      
      this.performanceMetrics.apiResponseTime = responseTime;
      
      stabilityMonitoringService.recordPerformanceMetric({
        metricName: 'api_response_time',
        value: responseTime,
        timestamp: new Date().toISOString(),
        context: { endpoint: key }
      });

      // Cache the result
      if (useCache) {
        this.setCache(key, result, ttl);
      }

      return result;
    } catch (error) {
      if (retries > 0) {
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, 3 - retries) * 1000));
        return this.optimizedFetch(key, fetchFn, { ...options, retries: retries - 1 });
      }
      throw error;
    }
  }

  // Batch Operations
  public async batchFetch<T>(
    requests: Array<{ key: string; fetchFn: () => Promise<T>; options?: any }>,
    concurrency: number = 5
  ): Promise<Array<{ key: string; result: T | null; error?: Error }>> {
    const results: Array<{ key: string; result: T | null; error?: Error }> = [];
    
    // Process requests in batches
    for (let i = 0; i < requests.length; i += concurrency) {
      const batch = requests.slice(i, i + concurrency);
      
      const batchPromises = batch.map(async ({ key, fetchFn, options }) => {
        try {
          const result = await this.optimizedFetch(key, fetchFn, options);
          return { key, result };
        } catch (error) {
          return { key, result: null, error: error as Error };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    return results;
  }

  // Debounced Operations
  private debounceTimers = new Map<string, NodeJS.Timeout>();

  public debounce<T extends (...args: any[]) => any>(
    key: string,
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      const existingTimer = this.debounceTimers.get(key);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      const timer = setTimeout(() => {
        fn(...args);
        this.debounceTimers.delete(key);
      }, delay);

      this.debounceTimers.set(key, timer);
    };
  }

  // Throttled Operations
  private throttleTimers = new Map<string, { lastCall: number; timer?: NodeJS.Timeout }>();

  public throttle<T extends (...args: any[]) => any>(
    key: string,
    fn: T,
    delay: number
  ): (...args: Parameters<T>) => void {
    return (...args: Parameters<T>) => {
      const now = Date.now();
      const throttleInfo = this.throttleTimers.get(key);

      if (!throttleInfo || now - throttleInfo.lastCall >= delay) {
        fn(...args);
        this.throttleTimers.set(key, { lastCall: now });
      } else if (!throttleInfo.timer) {
        const remainingTime = delay - (now - throttleInfo.lastCall);
        const timer = setTimeout(() => {
          fn(...args);
          this.throttleTimers.set(key, { lastCall: Date.now() });
        }, remainingTime);
        
        this.throttleTimers.set(key, { ...throttleInfo, timer });
      }
    };
  }

  // Virtual Scrolling Helper
  public calculateVisibleItems(
    containerHeight: number,
    itemHeight: number,
    scrollTop: number,
    totalItems: number,
    overscan: number = 5
  ): { startIndex: number; endIndex: number; visibleItems: number } {
    const visibleItems = Math.ceil(containerHeight / itemHeight);
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(totalItems - 1, startIndex + visibleItems + overscan * 2);

    return { startIndex, endIndex, visibleItems };
  }

  // Memory Optimization
  public optimizeMemory(): void {
    // Clear old cache entries
    this.clearExpiredCache();
    
    // Force garbage collection if available
    if ((window as any).gc) {
      (window as any).gc();
    }

    // Clear debounce and throttle timers
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
    
    this.throttleTimers.forEach(info => {
      if (info.timer) clearTimeout(info.timer);
    });
    this.throttleTimers.clear();
  }

  // Performance Metrics
  public getPerformanceMetrics(): PerformanceMetrics {
    return { ...this.performanceMetrics };
  }

  public measureRenderTime<T>(componentName: string, renderFn: () => T): T {
    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();
    
    const renderTime = endTime - startTime;
    this.performanceMetrics.renderTime = renderTime;
    
    stabilityMonitoringService.recordPerformanceMetric({
      metricName: 'component_render_time',
      value: renderTime,
      timestamp: new Date().toISOString(),
      context: { component: componentName }
    });

    return result;
  }

  // Private Methods
  private updateCacheHitRate(hit: boolean): void {
    // Simple moving average for cache hit rate
    const currentRate = this.performanceMetrics.cacheHitRate;
    this.performanceMetrics.cacheHitRate = currentRate * 0.9 + (hit ? 1 : 0) * 0.1;
  }

  private clearExpiredCache(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  private setupCacheCleanup(): void {
    // Clean up expired cache entries every 5 minutes
    setInterval(() => {
      this.clearExpiredCache();
    }, 5 * 60 * 1000);
  }

  public cleanup(): void {
    this.cache.clear();
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
    this.throttleTimers.forEach(info => {
      if (info.timer) clearTimeout(info.timer);
    });
    this.throttleTimers.clear();
  }
}

export const performanceOptimizationService = new PerformanceOptimizationService();
export default PerformanceOptimizationService;