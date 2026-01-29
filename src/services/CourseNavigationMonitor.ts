/**
 * Course Navigation Monitoring Service
 * Tracks navigation success rates, performance metrics, and error patterns
 */

import { NavigationErrorType, ErrorMetrics } from '../types/navigationError';

interface NavigationAttempt {
  id: string;
  courseId: string;
  userId?: string;
  startTime: Date;
  endTime?: Date;
  success: boolean;
  errorType?: NavigationErrorType;
  duration?: number;
  route: string;
  component: string;
  userAgent?: string;
  sessionId?: string;
}

interface NavigationMetrics {
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  successRate: number;
  averageNavigationTime: number;
  errorBreakdown: Map<NavigationErrorType, number>;
  performanceMetrics: {
    p50: number;
    p90: number;
    p95: number;
    p99: number;
  };
  timeRange: {
    start: Date;
    end: Date;
  };
}

interface NavigationAlert {
  id: string;
  type: 'high_failure_rate' | 'slow_performance' | 'error_spike' | 'system_degradation';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  details: Record<string, any>;
  timestamp: Date;
  acknowledged: boolean;
}

interface MonitoringConfig {
  failureRateThreshold: number; // Percentage (e.g., 10 for 10%)
  performanceThreshold: number; // Milliseconds
  errorSpikeThreshold: number; // Number of errors in time window
  timeWindow: number; // Minutes for monitoring window
  alertCooldown: number; // Minutes between similar alerts
}

class CourseNavigationMonitor {
  private attempts: Map<string, NavigationAttempt> = new Map();
  private completedAttempts: NavigationAttempt[] = [];
  private alerts: NavigationAlert[] = [];
  private config: MonitoringConfig;
  private lastAlertTimes: Map<string, Date> = new Map();

  constructor(config?: Partial<MonitoringConfig>) {
    this.config = {
      failureRateThreshold: 15, // 15% failure rate threshold
      performanceThreshold: 5000, // 5 seconds
      errorSpikeThreshold: 10, // 10 errors in time window
      timeWindow: 15, // 15 minutes
      alertCooldown: 30, // 30 minutes between similar alerts
      ...config
    };

    // Clean up old data periodically
    setInterval(() => this.cleanup(), 60000); // Every minute
  }

  /**
   * Start tracking a navigation attempt
   */
  startNavigation(
    courseId: string,
    route: string,
    component: string,
    userId?: string,
    sessionId?: string
  ): string {
    const attemptId = this.generateAttemptId();
    const attempt: NavigationAttempt = {
      id: attemptId,
      courseId,
      userId,
      startTime: new Date(),
      success: false,
      route,
      component,
      userAgent: navigator.userAgent,
      sessionId
    };

    this.attempts.set(attemptId, attempt);
    
    console.log('📊 Navigation attempt started:', {
      attemptId,
      courseId,
      route,
      component,
      timestamp: attempt.startTime
    });

    return attemptId;
  }

  /**
   * Record successful navigation completion
   */
  recordSuccess(attemptId: string): void {
    const attempt = this.attempts.get(attemptId);
    if (!attempt) {
      console.warn('⚠️ Attempt not found for success recording:', attemptId);
      return;
    }

    attempt.endTime = new Date();
    attempt.success = true;
    attempt.duration = attempt.endTime.getTime() - attempt.startTime.getTime();

    this.completeAttempt(attempt);
    
    console.log('✅ Navigation success recorded:', {
      attemptId,
      courseId: attempt.courseId,
      duration: attempt.duration,
      timestamp: attempt.endTime
    });
  }

  /**
   * Record navigation failure
   */
  recordFailure(attemptId: string, errorType: NavigationErrorType): void {
    const attempt = this.attempts.get(attemptId);
    if (!attempt) {
      console.warn('⚠️ Attempt not found for failure recording:', attemptId);
      return;
    }

    attempt.endTime = new Date();
    attempt.success = false;
    attempt.errorType = errorType;
    attempt.duration = attempt.endTime.getTime() - attempt.startTime.getTime();

    this.completeAttempt(attempt);
    
    console.log('❌ Navigation failure recorded:', {
      attemptId,
      courseId: attempt.courseId,
      errorType,
      duration: attempt.duration,
      timestamp: attempt.endTime
    });

    // Check for alerts after recording failure
    this.checkForAlerts();
  }

  /**
   * Record navigation timeout
   */
  recordTimeout(attemptId: string): void {
    this.recordFailure(attemptId, NavigationErrorType.TIMEOUT_ERROR);
  }

  /**
   * Get current navigation metrics
   */
  getMetrics(timeRangeMinutes: number = 60): NavigationMetrics {
    const cutoffTime = new Date(Date.now() - timeRangeMinutes * 60 * 1000);
    const recentAttempts = this.completedAttempts.filter(
      attempt => attempt.endTime && attempt.endTime >= cutoffTime
    );

    const totalAttempts = recentAttempts.length;
    const successfulAttempts = recentAttempts.filter(a => a.success).length;
    const failedAttempts = totalAttempts - successfulAttempts;
    const successRate = totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0;

    // Calculate performance metrics
    const durations = recentAttempts
      .filter(a => a.duration !== undefined)
      .map(a => a.duration!)
      .sort((a, b) => a - b);

    const performanceMetrics = this.calculatePerformanceMetrics(durations);
    const averageNavigationTime = durations.length > 0 
      ? durations.reduce((sum, d) => sum + d, 0) / durations.length 
      : 0;

    // Error breakdown
    const errorBreakdown = new Map<NavigationErrorType, number>();
    recentAttempts
      .filter(a => !a.success && a.errorType)
      .forEach(a => {
        const count = errorBreakdown.get(a.errorType!) || 0;
        errorBreakdown.set(a.errorType!, count + 1);
      });

    return {
      totalAttempts,
      successfulAttempts,
      failedAttempts,
      successRate,
      averageNavigationTime,
      errorBreakdown,
      performanceMetrics,
      timeRange: {
        start: cutoffTime,
        end: new Date()
      }
    };
  }

  /**
   * Get navigation metrics for specific course
   */
  getCourseMetrics(courseId: string, timeRangeMinutes: number = 60): NavigationMetrics {
    const cutoffTime = new Date(Date.now() - timeRangeMinutes * 60 * 1000);
    const courseAttempts = this.completedAttempts.filter(
      attempt => attempt.courseId === courseId && 
                 attempt.endTime && 
                 attempt.endTime >= cutoffTime
    );

    return this.calculateMetricsFromAttempts(courseAttempts, cutoffTime);
  }

  /**
   * Get active alerts
   */
  getActiveAlerts(): NavigationAlert[] {
    return this.alerts.filter(alert => !alert.acknowledged);
  }

  /**
   * Acknowledge an alert
   */
  acknowledgeAlert(alertId: string): void {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.acknowledged = true;
      console.log('✅ Alert acknowledged:', alertId);
    }
  }

  /**
   * Get navigation performance summary
   */
  getPerformanceSummary(): {
    currentSuccessRate: number;
    averageResponseTime: number;
    errorTrends: { type: NavigationErrorType; count: number; trend: 'up' | 'down' | 'stable' }[];
    recommendations: string[];
  } {
    const currentMetrics = this.getMetrics(60); // Last hour
    const previousMetrics = this.getMetrics(120); // Previous hour (2 hours total, minus current hour)

    // Calculate error trends
    const errorTrends = Array.from(currentMetrics.errorBreakdown.entries()).map(([type, count]) => {
      const previousCount = previousMetrics.errorBreakdown.get(type) || 0;
      let trend: 'up' | 'down' | 'stable' = 'stable';
      
      if (count > previousCount * 1.2) trend = 'up';
      else if (count < previousCount * 0.8) trend = 'down';

      return { type, count, trend };
    });

    // Generate recommendations
    const recommendations: string[] = [];
    
    if (currentMetrics.successRate < 85) {
      recommendations.push('Success rate is below 85%. Consider investigating common failure patterns.');
    }
    
    if (currentMetrics.averageNavigationTime > 3000) {
      recommendations.push('Average navigation time exceeds 3 seconds. Consider performance optimization.');
    }

    const highErrorTypes = Array.from(currentMetrics.errorBreakdown.entries())
      .filter(([_, count]) => count > 5)
      .map(([type, _]) => type);

    if (highErrorTypes.length > 0) {
      recommendations.push(`High frequency errors detected: ${highErrorTypes.join(', ')}`);
    }

    return {
      currentSuccessRate: currentMetrics.successRate,
      averageResponseTime: currentMetrics.averageNavigationTime,
      errorTrends,
      recommendations
    };
  }

  /**
   * Export metrics for external monitoring systems
   */
  exportMetrics(): {
    timestamp: Date;
    metrics: NavigationMetrics;
    alerts: NavigationAlert[];
    config: MonitoringConfig;
  } {
    return {
      timestamp: new Date(),
      metrics: this.getMetrics(),
      alerts: this.getActiveAlerts(),
      config: this.config
    };
  }

  /**
   * Private helper methods
   */
  private generateAttemptId(): string {
    return `nav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private completeAttempt(attempt: NavigationAttempt): void {
    this.attempts.delete(attempt.id);
    this.completedAttempts.push(attempt);
  }

  private calculatePerformanceMetrics(durations: number[]) {
    if (durations.length === 0) {
      return { p50: 0, p90: 0, p95: 0, p99: 0 };
    }

    return {
      p50: this.percentile(durations, 0.5),
      p90: this.percentile(durations, 0.9),
      p95: this.percentile(durations, 0.95),
      p99: this.percentile(durations, 0.99)
    };
  }

  private percentile(values: number[], p: number): number {
    const index = Math.ceil(values.length * p) - 1;
    return values[Math.max(0, index)] || 0;
  }

  private calculateMetricsFromAttempts(attempts: NavigationAttempt[], cutoffTime: Date): NavigationMetrics {
    const totalAttempts = attempts.length;
    const successfulAttempts = attempts.filter(a => a.success).length;
    const failedAttempts = totalAttempts - successfulAttempts;
    const successRate = totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0;

    const durations = attempts
      .filter(a => a.duration !== undefined)
      .map(a => a.duration!)
      .sort((a, b) => a - b);

    const performanceMetrics = this.calculatePerformanceMetrics(durations);
    const averageNavigationTime = durations.length > 0 
      ? durations.reduce((sum, d) => sum + d, 0) / durations.length 
      : 0;

    const errorBreakdown = new Map<NavigationErrorType, number>();
    attempts
      .filter(a => !a.success && a.errorType)
      .forEach(a => {
        const count = errorBreakdown.get(a.errorType!) || 0;
        errorBreakdown.set(a.errorType!, count + 1);
      });

    return {
      totalAttempts,
      successfulAttempts,
      failedAttempts,
      successRate,
      averageNavigationTime,
      errorBreakdown,
      performanceMetrics,
      timeRange: {
        start: cutoffTime,
        end: new Date()
      }
    };
  }

  private checkForAlerts(): void {
    const metrics = this.getMetrics(this.config.timeWindow);
    
    // Check failure rate
    if (metrics.successRate < (100 - this.config.failureRateThreshold) && metrics.totalAttempts >= 5) {
      this.createAlert(
        'high_failure_rate',
        'high',
        `Navigation failure rate is ${(100 - metrics.successRate).toFixed(1)}% (threshold: ${this.config.failureRateThreshold}%)`,
        { successRate: metrics.successRate, threshold: this.config.failureRateThreshold }
      );
    }

    // Check performance
    if (metrics.averageNavigationTime > this.config.performanceThreshold && metrics.totalAttempts >= 3) {
      this.createAlert(
        'slow_performance',
        'medium',
        `Average navigation time is ${metrics.averageNavigationTime.toFixed(0)}ms (threshold: ${this.config.performanceThreshold}ms)`,
        { averageTime: metrics.averageNavigationTime, threshold: this.config.performanceThreshold }
      );
    }

    // Check error spikes
    const totalErrors = metrics.failedAttempts;
    if (totalErrors >= this.config.errorSpikeThreshold) {
      this.createAlert(
        'error_spike',
        'high',
        `Error spike detected: ${totalErrors} errors in ${this.config.timeWindow} minutes`,
        { errorCount: totalErrors, timeWindow: this.config.timeWindow }
      );
    }
  }

  private createAlert(
    type: NavigationAlert['type'],
    severity: NavigationAlert['severity'],
    message: string,
    details: Record<string, any>
  ): void {
    const alertKey = `${type}_${severity}`;
    const lastAlert = this.lastAlertTimes.get(alertKey);
    const now = new Date();

    // Check cooldown
    if (lastAlert && (now.getTime() - lastAlert.getTime()) < this.config.alertCooldown * 60 * 1000) {
      return;
    }

    const alert: NavigationAlert = {
      id: `alert_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type,
      severity,
      message,
      details,
      timestamp: now,
      acknowledged: false
    };

    this.alerts.push(alert);
    this.lastAlertTimes.set(alertKey, now);

    console.warn('🚨 Navigation Alert Created:', alert);

    // Emit custom event for external listeners
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('navigationAlert', { detail: alert }));
    }
  }

  private cleanup(): void {
    const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
    
    // Clean up old completed attempts
    this.completedAttempts = this.completedAttempts.filter(
      attempt => attempt.endTime && attempt.endTime >= cutoffTime
    );

    // Clean up old alerts
    const alertCutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    this.alerts = this.alerts.filter(alert => alert.timestamp >= alertCutoff);

    // Clean up abandoned attempts (older than 10 minutes)
    const abandonedCutoff = new Date(Date.now() - 10 * 60 * 1000);
    for (const [id, attempt] of this.attempts.entries()) {
      if (attempt.startTime < abandonedCutoff) {
        console.warn('⚠️ Cleaning up abandoned navigation attempt:', id);
        this.attempts.delete(id);
      }
    }
  }
}

// Singleton instance
export const courseNavigationMonitor = new CourseNavigationMonitor();
export default CourseNavigationMonitor;