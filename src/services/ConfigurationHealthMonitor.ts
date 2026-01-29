/**
 * Configuration Health Monitoring Service
 * 
 * Continuous monitoring of production configuration health with alerting
 * Provides real-time health checks and automated issue detection
 */

import { productionValidator, type ConfigurationHealth, type ProductionReadiness } from './ProductionValidator';

export interface HealthAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  component: 'ikhokha' | 'database' | 'webhook' | 'security' | 'performance' | 'overall';
  message: string;
  details: string[];
  timestamp: Date;
  resolved: boolean;
  resolvedAt?: Date;
}

export interface MonitoringConfig {
  enabled: boolean;
  checkInterval: number; // milliseconds
  alertThreshold: number; // consecutive failures before alert
  retentionPeriod: number; // milliseconds to keep alerts
  enableConsoleAlerts: boolean;
  enableEmailAlerts: boolean;
  enableWebhookAlerts: boolean;
}

export interface HealthMetrics {
  totalChecks: number;
  successfulChecks: number;
  failedChecks: number;
  averageResponseTime: number;
  uptime: number; // percentage
  lastSuccessfulCheck: Date | null;
  lastFailedCheck: Date | null;
}

export interface MonitoringStatus {
  running: boolean;
  startTime: Date | null;
  lastCheck: Date | null;
  nextCheck: Date | null;
  consecutiveFailures: number;
  totalAlerts: number;
  activeAlerts: number;
}

/**
 * Configuration Health Monitor
 * 
 * Continuously monitors configuration health and sends alerts
 */
export class ConfigurationHealthMonitor {
  private static instance: ConfigurationHealthMonitor;
  private config: MonitoringConfig;
  private alerts: Map<string, HealthAlert> = new Map();
  private metrics: HealthMetrics;
  private status: MonitoringStatus;
  private intervalId: NodeJS.Timeout | null = null;
  private consecutiveFailures = 0;

  private constructor() {
    this.config = {
      enabled: true,
      checkInterval: 30000, // 30 seconds
      alertThreshold: 3, // 3 consecutive failures
      retentionPeriod: 24 * 60 * 60 * 1000, // 24 hours
      enableConsoleAlerts: true,
      enableEmailAlerts: false,
      enableWebhookAlerts: false
    };

    this.metrics = {
      totalChecks: 0,
      successfulChecks: 0,
      failedChecks: 0,
      averageResponseTime: 0,
      uptime: 100,
      lastSuccessfulCheck: null,
      lastFailedCheck: null
    };

    this.status = {
      running: false,
      startTime: null,
      lastCheck: null,
      nextCheck: null,
      consecutiveFailures: 0,
      totalAlerts: 0,
      activeAlerts: 0
    };
  }

  public static getInstance(): ConfigurationHealthMonitor {
    if (!ConfigurationHealthMonitor.instance) {
      ConfigurationHealthMonitor.instance = new ConfigurationHealthMonitor();
    }
    return ConfigurationHealthMonitor.instance;
  }

  /**
   * Start health monitoring
   */
  public start(): void {
    if (this.status.running) {
      console.warn('Configuration health monitor is already running');
      return;
    }

    if (!this.config.enabled) {
      console.log('Configuration health monitor is disabled');
      return;
    }

    console.log('🔍 Starting configuration health monitoring...');
    
    this.status.running = true;
    this.status.startTime = new Date();
    
    // Perform initial check
    this.performHealthCheck();
    
    // Schedule regular checks
    this.intervalId = setInterval(() => {
      this.performHealthCheck();
    }, this.config.checkInterval);

    console.log(`✅ Configuration health monitor started (interval: ${this.config.checkInterval}ms)`);
  }

  /**
   * Stop health monitoring
   */
  public stop(): void {
    if (!this.status.running) {
      console.warn('Configuration health monitor is not running');
      return;
    }

    console.log('🛑 Stopping configuration health monitoring...');
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.status.running = false;
    this.status.startTime = null;
    this.status.nextCheck = null;
    
    console.log('✅ Configuration health monitor stopped');
  }

  /**
   * Update monitoring configuration
   */
  public updateConfig(newConfig: Partial<MonitoringConfig>): void {
    const wasRunning = this.status.running;
    
    if (wasRunning) {
      this.stop();
    }
    
    this.config = { ...this.config, ...newConfig };
    
    if (wasRunning && this.config.enabled) {
      this.start();
    }
    
    console.log('⚙️ Configuration health monitor config updated');
  }

  /**
   * Get current monitoring status
   */
  public getStatus(): MonitoringStatus {
    if (this.status.running && this.intervalId) {
      this.status.nextCheck = new Date(Date.now() + this.config.checkInterval);
    }
    
    return { ...this.status };
  }

  /**
   * Get health metrics
   */
  public getMetrics(): HealthMetrics {
    return { ...this.metrics };
  }

  /**
   * Get all alerts
   */
  public getAlerts(includeResolved = false): HealthAlert[] {
    const alerts = Array.from(this.alerts.values());
    
    if (includeResolved) {
      return alerts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
    
    return alerts
      .filter(alert => !alert.resolved)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Get active alerts by severity
   */
  public getAlertsBySeverity(severity: HealthAlert['severity']): HealthAlert[] {
    return this.getAlerts().filter(alert => alert.severity === severity);
  }

  /**
   * Resolve an alert
   */
  public resolveAlert(alertId: string): boolean {
    const alert = this.alerts.get(alertId);
    
    if (!alert || alert.resolved) {
      return false;
    }
    
    alert.resolved = true;
    alert.resolvedAt = new Date();
    
    this.status.activeAlerts = this.getAlerts().length;
    
    console.log(`✅ Alert resolved: ${alert.message}`);
    return true;
  }

  /**
   * Clear old alerts based on retention period
   */
  public clearOldAlerts(): number {
    const cutoffTime = Date.now() - this.config.retentionPeriod;
    let clearedCount = 0;
    
    for (const [id, alert] of this.alerts.entries()) {
      if (alert.timestamp.getTime() < cutoffTime && alert.resolved) {
        this.alerts.delete(id);
        clearedCount++;
      }
    }
    
    if (clearedCount > 0) {
      console.log(`🧹 Cleared ${clearedCount} old alerts`);
    }
    
    return clearedCount;
  }

  /**
   * Force a health check
   */
  public async forceHealthCheck(): Promise<ConfigurationHealth> {
    return this.performHealthCheck();
  }

  // Private methods

  private async performHealthCheck(): Promise<ConfigurationHealth> {
    const startTime = Date.now();
    this.status.lastCheck = new Date();
    this.metrics.totalChecks++;

    try {
      // Get configuration health
      const health = productionValidator.getConfigurationHealth();
      const readiness = productionValidator.validateProductionReadiness();
      
      const responseTime = Date.now() - startTime;
      this.updateMetrics(true, responseTime);
      
      // Check for issues and create alerts
      this.processHealthResults(health, readiness);
      
      // Clear old alerts
      this.clearOldAlerts();
      
      return health;
      
    } catch (error) {
      const responseTime = Date.now() - startTime;
      this.updateMetrics(false, responseTime);
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.createAlert('critical', 'overall', 'Health check failed', [errorMessage]);
      
      console.error('❌ Configuration health check failed:', error);
      throw error;
    }
  }

  private updateMetrics(success: boolean, responseTime: number): void {
    if (success) {
      this.metrics.successfulChecks++;
      this.metrics.lastSuccessfulCheck = new Date();
      this.consecutiveFailures = 0;
      this.status.consecutiveFailures = 0;
    } else {
      this.metrics.failedChecks++;
      this.metrics.lastFailedCheck = new Date();
      this.consecutiveFailures++;
      this.status.consecutiveFailures = this.consecutiveFailures;
    }

    // Update average response time
    const totalResponseTime = this.metrics.averageResponseTime * (this.metrics.totalChecks - 1) + responseTime;
    this.metrics.averageResponseTime = totalResponseTime / this.metrics.totalChecks;

    // Update uptime percentage
    this.metrics.uptime = (this.metrics.successfulChecks / this.metrics.totalChecks) * 100;
  }

  private processHealthResults(health: ConfigurationHealth, readiness: ProductionReadiness): void {
    // Check overall health
    if (!health.overallHealth.healthy) {
      this.createAlert(
        'high',
        'overall',
        'Overall configuration health degraded',
        health.overallHealth.issues
      );
    }

    // Check individual components
    if (!health.ikhokhaConfig.healthy) {
      this.createAlert(
        'high',
        'ikhokha',
        'Ikhokha configuration issues detected',
        health.ikhokhaConfig.issues
      );
    }

    if (!health.databaseConfig.healthy) {
      this.createAlert(
        'high',
        'database',
        'Database configuration issues detected',
        health.databaseConfig.issues
      );
    }

    if (!health.webhookConfig.healthy) {
      this.createAlert(
        'medium',
        'webhook',
        'Webhook configuration issues detected',
        health.webhookConfig.issues
      );
    }

    // Check production readiness
    if (!readiness.ready && this.isProductionEnvironment()) {
      this.createAlert(
        'critical',
        'overall',
        'Production environment is not ready',
        readiness.issues
      );
    }

    if (!readiness.securityValid) {
      this.createAlert(
        'critical',
        'security',
        'Security validation failed',
        readiness.issues.filter(issue => issue.toLowerCase().includes('security') || issue.toLowerCase().includes('key'))
      );
    }

    if (!readiness.performanceValid) {
      this.createAlert(
        'medium',
        'performance',
        'Performance validation failed',
        readiness.issues.filter(issue => issue.toLowerCase().includes('performance') || issue.toLowerCase().includes('timeout'))
      );
    }

    // Check for consecutive failures
    if (this.consecutiveFailures >= this.config.alertThreshold) {
      this.createAlert(
        'critical',
        'overall',
        `${this.consecutiveFailures} consecutive health check failures`,
        ['System may be experiencing persistent issues']
      );
    }
  }

  private createAlert(
    severity: HealthAlert['severity'],
    component: HealthAlert['component'],
    message: string,
    details: string[]
  ): void {
    const alertId = `${component}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const alert: HealthAlert = {
      id: alertId,
      severity,
      component,
      message,
      details,
      timestamp: new Date(),
      resolved: false
    };

    this.alerts.set(alertId, alert);
    this.status.totalAlerts++;
    this.status.activeAlerts = this.getAlerts().length;

    // Send alert notifications
    this.sendAlertNotifications(alert);
  }

  private sendAlertNotifications(alert: HealthAlert): void {
    const severityIcon = {
      low: '🔵',
      medium: '🟡',
      high: '🟠',
      critical: '🔴'
    };

    const alertMessage = `${severityIcon[alert.severity]} ${alert.severity.toUpperCase()}: ${alert.message}`;

    if (this.config.enableConsoleAlerts) {
      console.error(alertMessage);
      if (alert.details.length > 0) {
        console.error('Details:', alert.details);
      }
    }

    // TODO: Implement email alerts
    if (this.config.enableEmailAlerts) {
      this.sendEmailAlert(alert);
    }

    // TODO: Implement webhook alerts
    if (this.config.enableWebhookAlerts) {
      this.sendWebhookAlert(alert);
    }
  }

  private sendEmailAlert(alert: HealthAlert): void {
    // TODO: Implement email alert functionality
    console.log('📧 Email alert would be sent:', alert.message);
  }

  private sendWebhookAlert(alert: HealthAlert): void {
    // TODO: Implement webhook alert functionality
    console.log('🔗 Webhook alert would be sent:', alert.message);
  }

  private isProductionEnvironment(): boolean {
    return import.meta.env.VITE_NODE_ENV === 'production' || 
           import.meta.env.NODE_ENV === 'production';
  }
}

// Export singleton instance and convenience functions
export const configurationHealthMonitor = ConfigurationHealthMonitor.getInstance();

export const startHealthMonitoring = () => configurationHealthMonitor.start();
export const stopHealthMonitoring = () => configurationHealthMonitor.stop();
export const getHealthStatus = () => configurationHealthMonitor.getStatus();
export const getHealthMetrics = () => configurationHealthMonitor.getMetrics();
export const getHealthAlerts = (includeResolved?: boolean) => configurationHealthMonitor.getAlerts(includeResolved);
export const resolveHealthAlert = (alertId: string) => configurationHealthMonitor.resolveAlert(alertId);
export const forceHealthCheck = () => configurationHealthMonitor.forceHealthCheck();