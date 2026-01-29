export interface CourseLoadingMetrics {
  courseId: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  status: 'loading' | 'success' | 'error' | 'timeout';
  errorMessage?: string;
  cacheHit?: boolean;
  dataSize?: number;
  moduleCount?: number;
  lessonCount?: number;
}

export interface PerformanceAlert {
  type: 'slow_loading' | 'frequent_failures' | 'timeout' | 'memory_usage';
  message: string;
  courseId?: string;
  threshold: number;
  actualValue: number;
  timestamp: Date;
}

export interface PerformanceThresholds {
  slowLoadingMs: number;
  timeoutMs: number;
  maxFailureRate: number;
  maxMemoryUsageMB: number;
}

export class CourseLoadingPerformanceMonitor {
  private static instance: CourseLoadingPerformanceMonitor;
  private metrics: Map<string, CourseLoadingMetrics> = new Map();
  private performanceHistory: CourseLoadingMetrics[] = [];
  private alerts: PerformanceAlert[] = [];
  private readonly maxHistorySize = 1000;
  private thresholds: PerformanceThresholds;
  
  private readonly defaultThresholds: PerformanceThresholds = {
    slowLoadingMs: 3000, // 3 seconds
    timeoutMs: 10000, // 10 seconds
    maxFailureRate: 0.1, // 10%
    maxMemoryUsageMB: 50, // 50MB
  };

  private constructor(thresholds: Partial<PerformanceThresholds> = {}) {
    this.thresholds = { ...this.defaultThresholds, ...thresholds };
  }

  static getInstance(thresholds?: Partial<PerformanceThresholds>): CourseLoadingPerformanceMonitor {
    if (!CourseLoadingPerformanceMonitor.instance) {
      CourseLoadingPerformanceMonitor.instance = new CourseLoadingPerformanceMonitor(thresholds);
    }
    return CourseLoadingPerformanceMonitor.instance;
  }

  /**
   * Start monitoring a course loading operation
   */
  startLoading(courseId: string): string {
    const loadingId = `${courseId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const metrics: CourseLoadingMetrics = {
      courseId,
      startTime: performance.now(),
      status: 'loading',
    };

    this.metrics.set(loadingId, metrics);
    
    // Set timeout monitoring
    setTimeout(() => {
      const currentMetrics = this.metrics.get(loadingId);
      if (currentMetrics && currentMetrics.status === 'loading') {
        this.finishLoading(loadingId, 'timeout', 'Course loading timed out');
      }
    }, this.thresholds.timeoutMs);

    this.logPerformance(`Started loading course ${courseId}`, { courseId, loadingId });
    
    return loadingId;
  }

  /**
   * Finish monitoring a course loading operation
   */
  finishLoading(
    loadingId: string, 
    status: 'success' | 'error' | 'timeout', 
    errorMessage?: string,
    additionalData?: {
      cacheHit?: boolean;
      dataSize?: number;
      moduleCount?: number;
      lessonCount?: number;
    }
  ): CourseLoadingMetrics | null {
    const metrics = this.metrics.get(loadingId);
    if (!metrics) {
      console.warn(`CourseLoadingPerformanceMonitor: No metrics found for loading ID ${loadingId}`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - metrics.startTime;

    const completedMetrics: CourseLoadingMetrics = {
      ...metrics,
      endTime,
      duration,
      status,
      ...(errorMessage && { errorMessage }),
      ...additionalData,
    };

    // Update metrics
    this.metrics.set(loadingId, completedMetrics);
    
    // Add to history
    this.addToHistory(completedMetrics);
    
    // Check for performance issues
    this.checkPerformanceThresholds(completedMetrics);
    
    // Log completion
    this.logPerformance(
      `Finished loading course ${metrics.courseId}`, 
      { 
        courseId: metrics.courseId, 
        loadingId, 
        duration: Math.round(duration), 
        status,
        errorMessage 
      }
    );

    // Clean up active metrics
    this.metrics.delete(loadingId);

    return completedMetrics;
  }

  /**
   * Add metrics to performance history
   */
  private addToHistory(metrics: CourseLoadingMetrics): void {
    this.performanceHistory.push(metrics);
    
    // Maintain history size limit
    if (this.performanceHistory.length > this.maxHistorySize) {
      this.performanceHistory = this.performanceHistory.slice(-this.maxHistorySize);
    }
  }

  /**
   * Check if metrics exceed performance thresholds
   */
  private checkPerformanceThresholds(metrics: CourseLoadingMetrics): void {
    // Check slow loading
    if (metrics.duration && metrics.duration > this.thresholds.slowLoadingMs) {
      this.addAlert({
        type: 'slow_loading',
        message: `Course ${metrics.courseId} took ${Math.round(metrics.duration)}ms to load (threshold: ${this.thresholds.slowLoadingMs}ms)`,
        courseId: metrics.courseId,
        threshold: this.thresholds.slowLoadingMs,
        actualValue: metrics.duration,
        timestamp: new Date(),
      });
    }

    // Check timeout
    if (metrics.status === 'timeout') {
      this.addAlert({
        type: 'timeout',
        message: `Course ${metrics.courseId} loading timed out after ${this.thresholds.timeoutMs}ms`,
        courseId: metrics.courseId,
        threshold: this.thresholds.timeoutMs,
        actualValue: this.thresholds.timeoutMs,
        timestamp: new Date(),
      });
    }

    // Check failure rate for this course
    const recentFailures = this.getRecentFailureRate(metrics.courseId);
    if (recentFailures > this.thresholds.maxFailureRate) {
      this.addAlert({
        type: 'frequent_failures',
        message: `Course ${metrics.courseId} has high failure rate: ${Math.round(recentFailures * 100)}% (threshold: ${Math.round(this.thresholds.maxFailureRate * 100)}%)`,
        courseId: metrics.courseId,
        threshold: this.thresholds.maxFailureRate,
        actualValue: recentFailures,
        timestamp: new Date(),
      });
    }
  }

  /**
   * Add performance alert
   */
  private addAlert(alert: PerformanceAlert): void {
    this.alerts.push(alert);
    
    // Log alert
    console.warn(`CourseLoadingPerformanceMonitor Alert [${alert.type}]: ${alert.message}`);
    
    // Maintain alerts limit
    if (this.alerts.length > 100) {
      this.alerts = this.alerts.slice(-100);
    }
  }

  /**
   * Get recent failure rate for a specific course
   */
  private getRecentFailureRate(courseId: string, timeWindowMs: number = 300000): number {
    const cutoffTime = Date.now() - timeWindowMs;
    const recentMetrics = this.performanceHistory.filter(
      (m) => m.courseId === courseId && m.startTime > cutoffTime
    );

    if (recentMetrics.length === 0) return 0;

    const failures = recentMetrics.filter((m) => m.status === 'error' || m.status === 'timeout').length;
    return failures / recentMetrics.length;
  }

  /**
   * Get performance statistics for a course
   */
  getCoursePerformanceStats(courseId: string): {
    totalLoads: number;
    averageLoadTime: number;
    successRate: number;
    recentFailures: number;
    slowLoads: number;
  } {
    const courseMetrics = this.performanceHistory.filter((m) => m.courseId === courseId);
    
    if (courseMetrics.length === 0) {
      return {
        totalLoads: 0,
        averageLoadTime: 0,
        successRate: 0,
        recentFailures: 0,
        slowLoads: 0,
      };
    }

    const successfulLoads = courseMetrics.filter((m) => m.status === 'success');
    const averageLoadTime = successfulLoads.length > 0 
      ? successfulLoads.reduce((sum, m) => sum + (m.duration || 0), 0) / successfulLoads.length
      : 0;

    const successRate = successfulLoads.length / courseMetrics.length;
    const recentFailures = this.getRecentFailureRate(courseId);
    const slowLoads = courseMetrics.filter((m) => 
      m.duration && m.duration > this.thresholds.slowLoadingMs
    ).length;

    return {
      totalLoads: courseMetrics.length,
      averageLoadTime: Math.round(averageLoadTime),
      successRate: Math.round(successRate * 100) / 100,
      recentFailures: Math.round(recentFailures * 100) / 100,
      slowLoads,
    };
  }

  /**
   * Get overall performance statistics
   */
  getOverallPerformanceStats(): {
    totalLoads: number;
    averageLoadTime: number;
    overallSuccessRate: number;
    activeLoads: number;
    recentAlerts: number;
  } {
    const totalLoads = this.performanceHistory.length;
    const successfulLoads = this.performanceHistory.filter((m) => m.status === 'success');
    
    const averageLoadTime = successfulLoads.length > 0
      ? successfulLoads.reduce((sum, m) => sum + (m.duration || 0), 0) / successfulLoads.length
      : 0;

    const overallSuccessRate = totalLoads > 0 ? successfulLoads.length / totalLoads : 0;
    const activeLoads = this.metrics.size;
    
    const oneHourAgo = Date.now() - 3600000;
    const recentAlerts = this.alerts.filter((a) => a.timestamp.getTime() > oneHourAgo).length;

    return {
      totalLoads,
      averageLoadTime: Math.round(averageLoadTime),
      overallSuccessRate: Math.round(overallSuccessRate * 100) / 100,
      activeLoads,
      recentAlerts,
    };
  }

  /**
   * Get recent alerts
   */
  getRecentAlerts(limit: number = 10): PerformanceAlert[] {
    return this.alerts
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  /**
   * Clear performance history and alerts
   */
  clearHistory(): void {
    this.performanceHistory = [];
    this.alerts = [];
    console.log('CourseLoadingPerformanceMonitor: History and alerts cleared');
  }

  /**
   * Log performance information
   */
  private logPerformance(message: string, data?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`CourseLoadingPerformanceMonitor: ${message}`, data || '');
    }
  }

  /**
   * Create performance report
   */
  generatePerformanceReport() {
    const summary = this.getOverallPerformanceStats();
    
    // Get unique course IDs and their stats
    const courseIds = [...new Set(this.performanceHistory.map((m) => m.courseId))];
    const courseStats = courseIds.map((courseId) => ({
      courseId,
      stats: this.getCoursePerformanceStats(courseId),
    }));

    // Top courses by load count
    const topCoursesByLoads = courseStats
      .sort((a, b) => b.stats.totalLoads - a.stats.totalLoads)
      .slice(0, 5);

    // Slowest courses
    const slowestCourses = courseStats
      .filter((c) => c.stats.averageLoadTime > 0)
      .sort((a, b) => b.stats.averageLoadTime - a.stats.averageLoadTime)
      .slice(0, 5)
      .map((c) => ({ courseId: c.courseId, averageLoadTime: c.stats.averageLoadTime }));

    // Recent alerts
    const recentAlerts = this.getRecentAlerts(10);

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (summary.overallSuccessRate < 0.9) {
      recommendations.push('Overall success rate is below 90%. Consider investigating common failure causes.');
    }
    
    if (summary.averageLoadTime > this.thresholds.slowLoadingMs) {
      recommendations.push(`Average load time (${summary.averageLoadTime}ms) exceeds threshold (${this.thresholds.slowLoadingMs}ms). Consider optimizing course data loading.`);
    }
    
    const slowestCourse = slowestCourses[0];
    if (slowestCourse && slowestCourse.averageLoadTime > this.thresholds.slowLoadingMs * 2) {
      recommendations.push(`Course ${slowestCourse.courseId} is significantly slower than others. Consider course-specific optimization.`);
    }
    
    if (recentAlerts.length > 5) {
      recommendations.push('High number of recent alerts detected. Monitor system performance closely.');
    }

    return {
      summary,
      topCoursesByLoads,
      slowestCourses,
      recentAlerts,
      recommendations,
    };
  }
}

// Export singleton instance
export const courseLoadingMonitor = CourseLoadingPerformanceMonitor.getInstance();