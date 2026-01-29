/**
 * Application Health Monitor
 * 
 * Monitors system health, collects performance metrics, and triggers
 * automatic recovery when issues are detected.
 */

export interface HealthMetrics {
  timestamp: number;
  memoryUsage: {
    used: number;
    total: number;
    percentage: number;
  };
  performance: {
    loadTime: number;
    renderTime: number;
    networkLatency: number;
    errorRate: number;
  };
  systemStatus: {
    authentication: 'healthy' | 'degraded' | 'failed';
    database: 'healthy' | 'degraded' | 'failed';
    network: 'healthy' | 'degraded' | 'failed';
    components: 'healthy' | 'degraded' | 'failed';
  };
  userExperience: {
    pageLoadSuccess: number;
    formSubmissionSuccess: number;
    navigationSuccess: number;
    errorCount: number;
  };
}

export interface HealthThresholds {
  memoryUsageWarning: number; // percentage
  memoryUsageCritical: number; // percentage
  loadTimeWarning: number; // milliseconds
  loadTimeCritical: number; // milliseconds
  errorRateWarning: number; // percentage
  errorRateCritical: number; // percentage
  networkLatencyWarning: number; // milliseconds
  networkLatencyCritical: number; // milliseconds
}

export interface HealthCheckResult {
  status: 'healthy' | 'warning' | 'critical';
  metrics: HealthMetrics;
  issues: HealthIssue[];
  recommendations: string[];
  recoveryActions: RecoveryAction[];
}

export interface HealthIssue {
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'performance' | 'memory' | 'network' | 'authentication' | 'database' | 'components';
  message: string;
  details: string;
  timestamp: number;
  affectedFeatures: string[];
}

export interface RecoveryAction {
  type: 'automatic' | 'manual' | 'user-notification';
  action: string;
  description: string;
  priority: number;
  execute?: () => Promise<boolean>;
}

export interface HealthMonitorConfig {
  checkInterval: number; // milliseconds
  thresholds: HealthThresholds;
  enableAutoRecovery: boolean;
  enableUserNotifications: boolean;
  maxHistorySize: number;
  enablePerformanceTracking: boolean;
}

export class HealthMonitor {
  private config: HealthMonitorConfig;
  private metricsHistory: HealthMetrics[] = [];
  private currentMetrics: HealthMetrics | null = null;
  private checkInterval: NodeJS.Timeout | null = null;
  private isMonitoring = false;
  private recoveryCallbacks: Map<string, () => Promise<void>> = new Map();
  private notificationCallbacks: Array<(issue: HealthIssue) => void> = [];
  private performanceObserver: PerformanceObserver | null = null;

  constructor(config: HealthMonitorConfig) {
    this.config = config;
    this.setupPerformanceTracking();
  }

  /**
   * Start health monitoring
   */
  public startMonitoring(): void {
    if (this.isMonitoring) {
      return;
    }

    this.isMonitoring = true;
    this.performInitialHealthCheck();
    
    this.checkInterval = setInterval(() => {
      this.performHealthCheck();
    }, this.config.checkInterval);

    console.log('Health monitoring started');
  }

  /**
   * Stop health monitoring
   */
  public stopMonitoring(): void {
    if (!this.isMonitoring) {
      return;
    }

    this.isMonitoring = false;
    
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }

    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }

    console.log('Health monitoring stopped');
  }

  /**
   * Perform immediate health check
   */
  public async performHealthCheck(): Promise<HealthCheckResult> {
    try {
      const metrics = await this.collectMetrics();
      const issues = this.analyzeMetrics(metrics);
      const recommendations = this.generateRecommendations(issues);
      const recoveryActions = this.generateRecoveryActions(issues);

      const result: HealthCheckResult = {
        status: this.determineOverallStatus(issues),
        metrics,
        issues,
        recommendations,
        recoveryActions
      };

      this.currentMetrics = metrics;
      this.addToHistory(metrics);

      // Execute automatic recovery if enabled
      if (this.config.enableAutoRecovery) {
        await this.executeAutomaticRecovery(recoveryActions);
      }

      // Send notifications for critical issues
      if (this.config.enableUserNotifications) {
        this.notifyUsers(issues);
      }

      return result;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }

  /**
   * Get current health status
   */
  public getCurrentHealth(): HealthCheckResult | null {
    if (!this.currentMetrics) {
      return null;
    }

    const issues = this.analyzeMetrics(this.currentMetrics);
    return {
      status: this.determineOverallStatus(issues),
      metrics: this.currentMetrics,
      issues,
      recommendations: this.generateRecommendations(issues),
      recoveryActions: this.generateRecoveryActions(issues)
    };
  }

  /**
   * Get health metrics history
   */
  public getMetricsHistory(): HealthMetrics[] {
    return [...this.metricsHistory];
  }

  /**
   * Register recovery callback for specific issue type
   */
  public registerRecoveryCallback(issueType: string, callback: () => Promise<void>): void {
    this.recoveryCallbacks.set(issueType, callback);
  }

  /**
   * Register notification callback
   */
  public registerNotificationCallback(callback: (issue: HealthIssue) => void): void {
    this.notificationCallbacks.push(callback);
  }

  /**
   * Collect current system metrics
   */
  private async collectMetrics(): Promise<HealthMetrics> {
    const timestamp = Date.now();

    // Memory usage metrics
    const memoryUsage = this.getMemoryUsage();

    // Performance metrics
    const performance = await this.getPerformanceMetrics();

    // System status checks
    const systemStatus = await this.checkSystemStatus();

    // User experience metrics
    const userExperience = this.getUserExperienceMetrics();

    return {
      timestamp,
      memoryUsage,
      performance,
      systemStatus,
      userExperience
    };
  }

  /**
   * Get memory usage information
   */
  private getMemoryUsage(): HealthMetrics['memoryUsage'] {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        percentage: (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100
      };
    }

    // Fallback for browsers without memory API
    return {
      used: 0,
      total: 0,
      percentage: 0
    };
  }

  /**
   * Get performance metrics
   */
  private async getPerformanceMetrics(): Promise<HealthMetrics['performance']> {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    const loadTime = navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;
    const renderTime = navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0;
    
    // Network latency estimation
    const networkLatency = await this.measureNetworkLatency();
    
    // Error rate from recent history
    const errorRate = this.calculateErrorRate();

    return {
      loadTime,
      renderTime,
      networkLatency,
      errorRate
    };
  }

  /**
   * Check system component status
   */
  private async checkSystemStatus(): Promise<HealthMetrics['systemStatus']> {
    const checks = await Promise.allSettled([
      this.checkAuthenticationHealth(),
      this.checkDatabaseHealth(),
      this.checkNetworkHealth(),
      this.checkComponentsHealth()
    ]);

    return {
      authentication: checks[0].status === 'fulfilled' ? checks[0].value : 'failed',
      database: checks[1].status === 'fulfilled' ? checks[1].value : 'failed',
      network: checks[2].status === 'fulfilled' ? checks[2].value : 'failed',
      components: checks[3].status === 'fulfilled' ? checks[3].value : 'failed'
    };
  }

  /**
   * Get user experience metrics
   */
  private getUserExperienceMetrics(): HealthMetrics['userExperience'] {
    // These would be tracked by other parts of the application
    // For now, return default values
    return {
      pageLoadSuccess: 95,
      formSubmissionSuccess: 98,
      navigationSuccess: 99,
      errorCount: 2
    };
  }

  /**
   * Measure network latency
   */
  private async measureNetworkLatency(): Promise<number> {
    try {
      const start = performance.now();
      await fetch('/api/health', { method: 'HEAD' });
      const end = performance.now();
      return end - start;
    } catch {
      return 5000; // Return high latency on error
    }
  }

  /**
   * Calculate error rate from recent activity
   */
  private calculateErrorRate(): number {
    // This would be calculated from error tracking
    // For now, return a default value
    return 0.5; // 0.5% error rate
  }

  /**
   * Check authentication system health
   */
  private async checkAuthenticationHealth(): Promise<'healthy' | 'degraded' | 'failed'> {
    try {
      // Check if auth service is responsive
      const response = await fetch('/api/auth/status', { 
        method: 'HEAD',
        timeout: 5000 
      } as any);
      
      if (response.ok) {
        return 'healthy';
      } else if (response.status >= 500) {
        return 'failed';
      } else {
        return 'degraded';
      }
    } catch {
      return 'failed';
    }
  }

  /**
   * Check database health
   */
  private async checkDatabaseHealth(): Promise<'healthy' | 'degraded' | 'failed'> {
    try {
      // Simple database connectivity check
      const response = await fetch('/api/db/health', { 
        method: 'HEAD',
        timeout: 5000 
      } as any);
      
      if (response.ok) {
        return 'healthy';
      } else {
        return 'failed';
      }
    } catch {
      return 'failed';
    }
  }

  /**
   * Check network health
   */
  private async checkNetworkHealth(): Promise<'healthy' | 'degraded' | 'failed'> {
    if (!navigator.onLine) {
      return 'failed';
    }

    const latency = await this.measureNetworkLatency();
    
    if (latency < this.config.thresholds.networkLatencyWarning) {
      return 'healthy';
    } else if (latency < this.config.thresholds.networkLatencyCritical) {
      return 'degraded';
    } else {
      return 'failed';
    }
  }

  /**
   * Check components health
   */
  private async checkComponentsHealth(): Promise<'healthy' | 'degraded' | 'failed'> {
    // Check if critical components are loaded and functional
    const criticalComponents = ['App', 'Router', 'AuthProvider'];
    let healthyCount = 0;

    for (const component of criticalComponents) {
      if (this.isComponentHealthy(component)) {
        healthyCount++;
      }
    }

    const healthPercentage = (healthyCount / criticalComponents.length) * 100;

    if (healthPercentage >= 90) {
      return 'healthy';
    } else if (healthPercentage >= 70) {
      return 'degraded';
    } else {
      return 'failed';
    }
  }

  /**
   * Check if a specific component is healthy
   */
  private isComponentHealthy(componentName: string): boolean {
    // This would check component-specific health indicators
    // For now, assume components are healthy
    return true;
  }

  /**
   * Analyze metrics and identify issues
   */
  private analyzeMetrics(metrics: HealthMetrics): HealthIssue[] {
    const issues: HealthIssue[] = [];

    // Memory usage analysis
    if (metrics.memoryUsage.percentage > this.config.thresholds.memoryUsageCritical) {
      issues.push({
        severity: 'critical',
        category: 'memory',
        message: 'Critical memory usage detected',
        details: `Memory usage at ${metrics.memoryUsage.percentage.toFixed(1)}%`,
        timestamp: metrics.timestamp,
        affectedFeatures: ['All application features']
      });
    } else if (metrics.memoryUsage.percentage > this.config.thresholds.memoryUsageWarning) {
      issues.push({
        severity: 'medium',
        category: 'memory',
        message: 'High memory usage detected',
        details: `Memory usage at ${metrics.memoryUsage.percentage.toFixed(1)}%`,
        timestamp: metrics.timestamp,
        affectedFeatures: ['Performance may be affected']
      });
    }

    // Performance analysis
    if (metrics.performance.loadTime > this.config.thresholds.loadTimeCritical) {
      issues.push({
        severity: 'high',
        category: 'performance',
        message: 'Critical load time detected',
        details: `Load time: ${metrics.performance.loadTime}ms`,
        timestamp: metrics.timestamp,
        affectedFeatures: ['Page loading', 'User experience']
      });
    }

    // Error rate analysis
    if (metrics.performance.errorRate > this.config.thresholds.errorRateCritical) {
      issues.push({
        severity: 'critical',
        category: 'performance',
        message: 'High error rate detected',
        details: `Error rate: ${metrics.performance.errorRate}%`,
        timestamp: metrics.timestamp,
        affectedFeatures: ['Application reliability']
      });
    }

    // System status analysis
    Object.entries(metrics.systemStatus).forEach(([system, status]) => {
      if (status === 'failed') {
        issues.push({
          severity: 'critical',
          category: system as any,
          message: `${system} system failure`,
          details: `${system} system is not responding`,
          timestamp: metrics.timestamp,
          affectedFeatures: [system]
        });
      } else if (status === 'degraded') {
        issues.push({
          severity: 'medium',
          category: system as any,
          message: `${system} system degraded`,
          details: `${system} system performance is reduced`,
          timestamp: metrics.timestamp,
          affectedFeatures: [system]
        });
      }
    });

    return issues;
  }

  /**
   * Generate recommendations based on issues
   */
  private generateRecommendations(issues: HealthIssue[]): string[] {
    const recommendations: string[] = [];

    issues.forEach(issue => {
      switch (issue.category) {
        case 'memory':
          if (issue.severity === 'critical') {
            recommendations.push('Restart the application to free memory');
            recommendations.push('Close unnecessary browser tabs');
          } else {
            recommendations.push('Clear browser cache and cookies');
            recommendations.push('Refresh the page to reset memory usage');
          }
          break;
        case 'performance':
          recommendations.push('Check network connection');
          recommendations.push('Try refreshing the page');
          recommendations.push('Clear browser cache');
          break;
        case 'network':
          recommendations.push('Check internet connection');
          recommendations.push('Try switching networks');
          break;
        case 'authentication':
          recommendations.push('Try logging out and back in');
          recommendations.push('Clear authentication cookies');
          break;
        case 'database':
          recommendations.push('Contact support if issues persist');
          recommendations.push('Try again in a few minutes');
          break;
      }
    });

    return [...new Set(recommendations)]; // Remove duplicates
  }

  /**
   * Generate recovery actions for issues
   */
  private generateRecoveryActions(issues: HealthIssue[]): RecoveryAction[] {
    const actions: RecoveryAction[] = [];

    issues.forEach(issue => {
      switch (issue.category) {
        case 'memory':
          if (issue.severity === 'critical') {
            actions.push({
              type: 'automatic',
              action: 'memory-cleanup',
              description: 'Clear unused objects and force garbage collection',
              priority: 1,
              execute: async () => {
                // Force garbage collection if available
                if ('gc' in window) {
                  (window as any).gc();
                }
                return true;
              }
            });
          }
          break;
        case 'network':
          actions.push({
            type: 'automatic',
            action: 'retry-requests',
            description: 'Retry failed network requests',
            priority: 2,
            execute: async () => {
              // This would retry failed requests
              return true;
            }
          });
          break;
        case 'authentication':
          actions.push({
            type: 'user-notification',
            action: 'auth-refresh',
            description: 'Notify user to refresh authentication',
            priority: 3
          });
          break;
      }
    });

    return actions.sort((a, b) => a.priority - b.priority);
  }

  /**
   * Determine overall system status
   */
  private determineOverallStatus(issues: HealthIssue[]): 'healthy' | 'warning' | 'critical' {
    if (issues.some(issue => issue.severity === 'critical')) {
      return 'critical';
    } else if (issues.some(issue => issue.severity === 'high' || issue.severity === 'medium')) {
      return 'warning';
    } else {
      return 'healthy';
    }
  }

  /**
   * Execute automatic recovery actions
   */
  private async executeAutomaticRecovery(actions: RecoveryAction[]): Promise<void> {
    for (const action of actions) {
      if (action.type === 'automatic' && action.execute) {
        try {
          const success = await action.execute();
          console.log(`Recovery action ${action.action} ${success ? 'succeeded' : 'failed'}`);
        } catch (error) {
          console.error(`Recovery action ${action.action} failed:`, error);
        }
      }
    }
  }

  /**
   * Notify users of critical issues
   */
  private notifyUsers(issues: HealthIssue[]): void {
    const criticalIssues = issues.filter(issue => 
      issue.severity === 'critical' || issue.severity === 'high'
    );

    criticalIssues.forEach(issue => {
      this.notificationCallbacks.forEach(callback => {
        try {
          callback(issue);
        } catch (error) {
          console.error('Notification callback failed:', error);
        }
      });
    });
  }

  /**
   * Add metrics to history
   */
  private addToHistory(metrics: HealthMetrics): void {
    this.metricsHistory.push(metrics);
    
    // Keep history size within limits
    if (this.metricsHistory.length > this.config.maxHistorySize) {
      this.metricsHistory = this.metricsHistory.slice(-this.config.maxHistorySize);
    }
  }

  /**
   * Perform initial health check on startup
   */
  private async performInitialHealthCheck(): Promise<void> {
    try {
      await this.performHealthCheck();
      console.log('Initial health check completed');
    } catch (error) {
      console.error('Initial health check failed:', error);
    }
  }

  /**
   * Setup performance tracking
   */
  private setupPerformanceTracking(): void {
    if (!this.config.enablePerformanceTracking || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          // Track performance entries for analysis
          if (entry.entryType === 'navigation' || entry.entryType === 'measure') {
            console.debug('Performance entry:', entry);
          }
        });
      });

      this.performanceObserver.observe({ 
        entryTypes: ['navigation', 'measure', 'resource'] 
      });
    } catch (error) {
      console.warn('Performance tracking setup failed:', error);
    }
  }

  /**
   * Get default configuration
   */
  public static getDefaultConfig(): HealthMonitorConfig {
    return {
      checkInterval: 30000, // 30 seconds
      thresholds: {
        memoryUsageWarning: 70, // 70%
        memoryUsageCritical: 90, // 90%
        loadTimeWarning: 3000, // 3 seconds
        loadTimeCritical: 10000, // 10 seconds
        errorRateWarning: 1, // 1%
        errorRateCritical: 5, // 5%
        networkLatencyWarning: 1000, // 1 second
        networkLatencyCritical: 5000 // 5 seconds
      },
      enableAutoRecovery: true,
      enableUserNotifications: true,
      maxHistorySize: 100,
      enablePerformanceTracking: true
    };
  }
}