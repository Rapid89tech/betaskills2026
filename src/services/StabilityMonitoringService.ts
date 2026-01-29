import { supabase } from '@/integrations/supabase/client';

export interface StabilityMetrics {
  errorCount: number;
  crashCount: number;
  performanceScore: number;
  memoryUsage: number;
  responseTime: number;
  uptime: number;
}

export interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  componentStack?: string;
  timestamp: string;
  userAgent: string;
  url: string;
  userId?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
}

export interface PerformanceMetric {
  id: string;
  metricName: string;
  value: number;
  timestamp: string;
  context?: Record<string, any>;
}

class StabilityMonitoringService {
  private errorQueue: ErrorReport[] = [];
  private performanceQueue: PerformanceMetric[] = [];
  private isOnline = navigator.onLine;
  private flushInterval: NodeJS.Timeout | null = null;
  private performanceObserver: PerformanceObserver | null = null;

  constructor() {
    this.initializeMonitoring();
    this.setupEventListeners();
    this.startPerformanceMonitoring();
  }

  private initializeMonitoring() {
    // Start periodic flushing of queued data
    this.flushInterval = setInterval(() => {
      this.flushQueuedData();
    }, 30000); // Flush every 30 seconds

    // Monitor memory usage
    this.monitorMemoryUsage();
  }

  private setupEventListeners() {
    // Monitor online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushQueuedData();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Monitor unhandled errors
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        severity: 'high'
      });
    });

    // Monitor unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        severity: 'medium'
      });
    });
  }

  private startPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.recordPerformanceMetric({
            metricName: entry.name,
            value: entry.duration || entry.startTime,
            timestamp: new Date().toISOString(),
            context: {
              entryType: entry.entryType,
              startTime: entry.startTime
            }
          });
        });
      });

      this.performanceObserver.observe({ 
        entryTypes: ['navigation', 'resource', 'measure', 'paint'] 
      });
    }
  }

  public reportError(errorData: Partial<ErrorReport>): void {
    const error: ErrorReport = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      message: errorData.message || 'Unknown error',
      stack: errorData.stack,
      componentStack: errorData.componentStack,
      timestamp: errorData.timestamp || new Date().toISOString(),
      userAgent: errorData.userAgent || navigator.userAgent,
      url: errorData.url || window.location.href,
      userId: errorData.userId,
      severity: errorData.severity || 'medium',
      resolved: false
    };

    this.errorQueue.push(error);

    // Immediately flush critical errors
    if (error.severity === 'critical') {
      this.flushErrorData();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Stability Monitor - Error reported:', error);
    }
  }

  public recordPerformanceMetric(metricData: Partial<PerformanceMetric>): void {
    const metric: PerformanceMetric = {
      id: `metric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      metricName: metricData.metricName || 'unknown',
      value: metricData.value || 0,
      timestamp: metricData.timestamp || new Date().toISOString(),
      context: metricData.context
    };

    this.performanceQueue.push(metric);
  }

  public async getStabilityMetrics(): Promise<StabilityMetrics> {
    try {
      const now = new Date();
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

      // Get error count from last hour
      const { count: errorCount } = await supabase
        .from('error_reports')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', oneHourAgo.toISOString());

      // Get performance metrics
      const memoryInfo = (performance as any).memory;
      const memoryUsage = memoryInfo ? 
        (memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100 : 0;

      // Calculate performance score based on recent metrics
      const performanceScore = await this.calculatePerformanceScore();

      return {
        errorCount: errorCount || 0,
        crashCount: 0, // Will be implemented with crash detection
        performanceScore,
        memoryUsage,
        responseTime: await this.measureResponseTime(),
        uptime: performance.now()
      };
    } catch (error) {
      console.error('Failed to get stability metrics:', error);
      return {
        errorCount: 0,
        crashCount: 0,
        performanceScore: 0,
        memoryUsage: 0,
        responseTime: 0,
        uptime: 0
      };
    }
  }

  private async calculatePerformanceScore(): Promise<number> {
    try {
      const { data: recentMetrics } = await supabase
        .from('performance_metrics')
        .select('value')
        .eq('metric_name', 'response_time')
        .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(10);

      if (!recentMetrics || recentMetrics.length === 0) {
        return 100; // Default good score
      }

      const avgResponseTime = recentMetrics.reduce((sum, metric) => sum + metric.value, 0) / recentMetrics.length;
      
      // Score based on response time (lower is better)
      // 0-100ms = 100 points, 100-500ms = 80 points, 500ms+ = 50 points
      if (avgResponseTime <= 100) return 100;
      if (avgResponseTime <= 500) return 80;
      return 50;
    } catch (error) {
      console.error('Failed to calculate performance score:', error);
      return 100;
    }
  }

  private async measureResponseTime(): Promise<number> {
    const start = performance.now();
    try {
      await supabase.from('profiles').select('id').limit(1);
      return performance.now() - start;
    } catch (error) {
      return -1; // Indicate measurement failed
    }
  }

  private monitorMemoryUsage(): void {
    setInterval(() => {
      const memoryInfo = (performance as any).memory;
      if (memoryInfo) {
        const usagePercent = (memoryInfo.usedJSHeapSize / memoryInfo.totalJSHeapSize) * 100;
        
        this.recordPerformanceMetric({
          metricName: 'memory_usage',
          value: usagePercent,
          timestamp: new Date().toISOString(),
          context: {
            usedJSHeapSize: memoryInfo.usedJSHeapSize,
            totalJSHeapSize: memoryInfo.totalJSHeapSize,
            jsHeapSizeLimit: memoryInfo.jsHeapSizeLimit
          }
        });

        // Alert if memory usage is high
        if (usagePercent > 90) {
          this.reportError({
            message: `High memory usage detected: ${usagePercent.toFixed(2)}%`,
            severity: 'high',
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
          });
        }
      }
    }, 60000); // Check every minute
  }

  private async flushQueuedData(): Promise<void> {
    if (!this.isOnline) return;

    await Promise.all([
      this.flushErrorData(),
      this.flushPerformanceData()
    ]);
  }

  private async flushErrorData(): Promise<void> {
    if (this.errorQueue.length === 0) return;

    const errorsToFlush = [...this.errorQueue];
    this.errorQueue = [];

    try {
      const { error } = await supabase
        .from('error_reports')
        .insert(errorsToFlush.map(err => ({
          id: err.id,
          message: err.message,
          stack: err.stack,
          component_stack: err.componentStack,
          user_agent: err.userAgent,
          url: err.url,
          user_id: err.userId,
          severity: err.severity,
          resolved: err.resolved,
          created_at: err.timestamp
        })));

      if (error) {
        console.error('Failed to flush error data:', error);
        // Re-queue errors if flush failed
        this.errorQueue.unshift(...errorsToFlush);
      }
    } catch (error) {
      console.error('Failed to flush error data:', error);
      // Re-queue errors if flush failed
      this.errorQueue.unshift(...errorsToFlush);
    }
  }

  private async flushPerformanceData(): Promise<void> {
    if (this.performanceQueue.length === 0) return;

    const metricsToFlush = [...this.performanceQueue];
    this.performanceQueue = [];

    try {
      const { error } = await supabase
        .from('performance_metrics')
        .insert(metricsToFlush.map(metric => ({
          id: metric.id,
          metric_name: metric.metricName,
          value: metric.value,
          context: metric.context,
          created_at: metric.timestamp
        })));

      if (error) {
        console.error('Failed to flush performance data:', error);
        // Re-queue metrics if flush failed
        this.performanceQueue.unshift(...metricsToFlush);
      }
    } catch (error) {
      console.error('Failed to flush performance data:', error);
      // Re-queue metrics if flush failed
      this.performanceQueue.unshift(...metricsToFlush);
    }
  }

  public cleanup(): void {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }

    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }

    // Flush any remaining data
    this.flushQueuedData();
  }
}

export const stabilityMonitoringService = new StabilityMonitoringService();
export default StabilityMonitoringService;