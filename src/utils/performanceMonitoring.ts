import { monitoringService } from '@/services/MonitoringService';

export interface PerformanceTimer {
  start: number;
  name: string;
  category: string;
  metadata?: Record<string, any>;
}

class PerformanceMonitoring {
  private timers: Map<string, PerformanceTimer> = new Map();

  /**
   * Start a performance timer
   */
  startTimer(name: string, category: string = 'general', metadata?: Record<string, any>): string {
    const timerId = `${name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    this.timers.set(timerId, {
      start: performance.now(),
      name,
      category,
      metadata
    });

    return timerId;
  }

  /**
   * End a performance timer and record the metric
   */
  async endTimer(timerId: string, additionalMetadata?: Record<string, any>): Promise<number> {
    const timer = this.timers.get(timerId);
    if (!timer) {
      console.warn(`Timer ${timerId} not found`);
      return 0;
    }

    const duration = performance.now() - timer.start;
    this.timers.delete(timerId);

    // Record the performance metric
    await monitoringService.recordMetric({
      metricName: timer.name,
      value: Math.round(duration),
      unit: 'ms',
      category: timer.category as any,
      metadata: {
        ...timer.metadata,
        ...additionalMetadata
      }
    });

    return duration;
  }

  /**
   * Measure and record a function's execution time
   */
  async measureFunction<T>(
    name: string,
    fn: () => Promise<T> | T,
    category: string = 'function_execution',
    metadata?: Record<string, any>
  ): Promise<T> {
    const timerId = this.startTimer(name, category, metadata);
    
    try {
      const result = await fn();
      await this.endTimer(timerId, { success: true });
      return result;
    } catch (error) {
      await this.endTimer(timerId, { success: false, error: error instanceof Error ? error.message : 'Unknown error' });
      throw error;
    }
  }

  /**
   * Measure API call performance
   */
  async measureApiCall<T>(
    endpoint: string,
    method: string,
    apiCall: () => Promise<T>,
    metadata?: Record<string, any>
  ): Promise<T> {
    const startTime = performance.now();
    let status = 0;
    let success = false;

    try {
      const result = await apiCall();
      success = true;
      status = 200; // Assume success if no error
      return result;
    } catch (error) {
      success = false;
      // Try to extract status from error if available
      if (error && typeof error === 'object' && 'status' in error) {
        status = (error as any).status;
      } else {
        status = 500;
      }
      throw error;
    } finally {
      const duration = performance.now() - startTime;
      
      await monitoringService.trackApiCall(
        endpoint,
        method,
        Math.round(duration),
        status,
        {
          success,
          ...metadata
        }
      );
    }
  }

  /**
   * Monitor page load performance
   */
  async monitorPageLoad(pageName: string): Promise<void> {
    // Use Navigation Timing API if available
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
      
      if (navigationEntries.length > 0) {
        const entry = navigationEntries[0];
        
        // Record various load metrics
        await monitoringService.trackPageLoad(pageName, Math.round(entry.loadEventEnd - entry.navigationStart), {
          domContentLoaded: Math.round(entry.domContentLoadedEventEnd - entry.navigationStart),
          firstPaint: this.getFirstPaintTime(),
          firstContentfulPaint: this.getFirstContentfulPaintTime(),
          networkTime: Math.round(entry.responseEnd - entry.requestStart),
          serverTime: Math.round(entry.responseEnd - entry.responseStart),
          domProcessingTime: Math.round(entry.domComplete - entry.domLoading)
        });
      }
    }

    // Fallback for older browsers
    window.addEventListener('load', async () => {
      const loadTime = performance.now();
      await monitoringService.trackPageLoad(pageName, Math.round(loadTime));
    });
  }

  /**
   * Get First Paint time
   */
  private getFirstPaintTime(): number | undefined {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
    return firstPaint ? Math.round(firstPaint.startTime) : undefined;
  }

  /**
   * Get First Contentful Paint time
   */
  private getFirstContentfulPaintTime(): number | undefined {
    const paintEntries = performance.getEntriesByType('paint');
    const firstContentfulPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstContentfulPaint ? Math.round(firstContentfulPaint.startTime) : undefined;
  }

  /**
   * Monitor resource loading performance
   */
  async monitorResourceLoading(): Promise<void> {
    const resourceEntries = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    for (const entry of resourceEntries) {
      const duration = entry.responseEnd - entry.startTime;
      
      // Only log slow resources (> 1 second)
      if (duration > 1000) {
        await monitoringService.log({
          level: 'warn',
          category: 'performance',
          message: `Slow resource loading detected: ${entry.name}`,
          metadata: {
            resource: entry.name,
            duration: Math.round(duration),
            size: entry.transferSize,
            type: this.getResourceType(entry.name)
          }
        });
      }
    }
  }

  /**
   * Get resource type from URL
   */
  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'js':
        return 'javascript';
      case 'css':
        return 'stylesheet';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'webp':
        return 'image';
      case 'woff':
      case 'woff2':
      case 'ttf':
        return 'font';
      default:
        return 'other';
    }
  }

  /**
   * Monitor memory usage (if available)
   */
  async monitorMemoryUsage(): Promise<void> {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      
      await monitoringService.recordMetric({
        metricName: 'memory_usage',
        value: Math.round(memory.usedJSHeapSize / 1024 / 1024), // Convert to MB
        unit: 'MB',
        category: 'performance',
        metadata: {
          totalHeapSize: Math.round(memory.totalJSHeapSize / 1024 / 1024),
          heapSizeLimit: Math.round(memory.jsHeapSizeLimit / 1024 / 1024)
        }
      });
    }
  }

  /**
   * Start continuous performance monitoring
   */
  startContinuousMonitoring(intervalMs: number = 30000): void {
    setInterval(async () => {
      await this.monitorMemoryUsage();
      await this.monitorResourceLoading();
    }, intervalMs);
  }
}

// Export singleton instance
export const performanceMonitoring = new PerformanceMonitoring();
export default PerformanceMonitoring;