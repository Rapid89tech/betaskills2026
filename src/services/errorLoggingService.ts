import { logger } from '@/utils/logger';
import { ErrorType, ErrorSeverity } from '@/components/error/ErrorBoundarySystem';
import { ErrorCategory } from './errorRecoveryService';
import { NetworkQuality } from './networkErrorService';

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'debug';
  category: 'enrollment' | 'payment' | 'authentication' | 'network' | 'validation' | 'system';
  message: string;
  stack?: string;
  context?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  resolved: boolean;
  // Enhanced fields for new error system
  errorType?: ErrorType;
  errorCategory?: ErrorCategory;
  componentName?: string;
  networkQuality?: NetworkQuality;
  retryCount?: number;
  recoveryTime?: number;
  circuitBreakerState?: string;
  isOnline?: boolean;
}

export interface ErrorMetrics {
  totalErrors: number;
  errorsByCategory: Record<string, number>;
  errorsByLevel: Record<string, number>;
  errorsBySeverity: Record<string, number>;
  recentErrors: ErrorLogEntry[];
  errorRate: number;
  averageResolutionTime: number;
}

export interface AlertRule {
  id: string;
  name: string;
  condition: (entry: ErrorLogEntry) => boolean;
  threshold: number;
  timeWindow: number; // in milliseconds
  enabled: boolean;
}

export class ErrorLoggingService {
  private static instance: ErrorLoggingService;
  private errorLogs: ErrorLogEntry[] = [];
  private alertRules: AlertRule[] = [];
  private maxLogEntries: number = 1000;
  private isOnline: boolean = true;

  private constructor() {
    this.setupOnlineStatusListener();
    this.initializeAlertRules();
    this.startLogCleanup();
  }

  public static getInstance(): ErrorLoggingService {
    if (!ErrorLoggingService.instance) {
      ErrorLoggingService.instance = new ErrorLoggingService();
    }
    return ErrorLoggingService.instance;
  }

  /**
   * Log an error with context
   */
  public logError(
    level: ErrorLogEntry['level'],
    category: ErrorLogEntry['category'],
    message: string,
    error?: Error,
    context?: Record<string, any>,
    severity: ErrorLogEntry['severity'] = 'medium'
  ): string {
    const logEntry: ErrorLogEntry = {
      id: this.generateLogId(),
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      stack: error?.stack,
      context: {
        ...context,
        errorName: error?.name,
        errorMessage: error?.message
      },
      userId: context?.userId,
      sessionId: context?.sessionId,
      url: window.location.href,
      userAgent: navigator.userAgent,
      severity,
      resolved: false,
      // Enhanced fields for new error system
      errorType: context?.errorType,
      errorCategory: context?.errorCategory,
      componentName: context?.componentName,
      networkQuality: context?.networkQuality,
      retryCount: context?.retryCount,
      recoveryTime: context?.recoveryTime,
      circuitBreakerState: context?.circuitBreakerState,
      isOnline: context?.isOnline
    };

    // Add to logs
    this.errorLogs.unshift(logEntry);

    // Maintain max log entries
    if (this.errorLogs.length > this.maxLogEntries) {
      this.errorLogs = this.errorLogs.slice(0, this.maxLogEntries);
    }

    // Check alert rules
    this.checkAlertRules(logEntry);

    // Persist to localStorage for offline access
    this.persistLogs();

    // Send to remote logging service if online
    if (this.isOnline) {
      this.sendToRemoteService(logEntry);
    }

    logger[level](`[${category.toUpperCase()}] ${message}`, error, context);

    return logEntry.id;
  }

  /**
   * Log enrollment-specific errors
   */
  public logEnrollmentError(
    operation: 'create' | 'update' | 'delete' | 'verify',
    error: Error,
    context?: Record<string, any>
  ): string {
    const severity = this.determineEnrollmentErrorSeverity(error, operation);
    
    return this.logError(
      'error',
      'enrollment',
      `Enrollment ${operation} failed: ${error.message}`,
      error,
      {
        operation,
        ...context
      },
      severity
    );
  }

  /**
   * Log payment-specific errors
   */
  public logPaymentError(
    operation: 'process' | 'verify' | 'refund' | 'retry',
    error: Error,
    context?: Record<string, any>
  ): string {
    const severity = this.determinePaymentErrorSeverity(error, operation);
    
    return this.logError(
      'error',
      'payment',
      `Payment ${operation} failed: ${error.message}`,
      error,
      {
        operation,
        ...context
      },
      severity
    );
  }

  /**
   * Log authentication errors
   */
  public logAuthError(
    operation: 'login' | 'logout' | 'register' | 'verify',
    error: Error,
    context?: Record<string, any>
  ): string {
    return this.logError(
      'error',
      'authentication',
      `Authentication ${operation} failed: ${error.message}`,
      error,
      {
        operation,
        ...context
      },
      'high'
    );
  }

  /**
   * Log network errors
   */
  public logNetworkError(
    operation: string,
    error: Error,
    context?: Record<string, any>
  ): string {
    return this.logError(
      'error',
      'network',
      `Network operation failed: ${operation}`,
      error,
      {
        operation,
        ...context
      },
      'medium'
    );
  }

  /**
   * Mark error as resolved
   */
  public markErrorResolved(logId: string): void {
    const logEntry = this.errorLogs.find(log => log.id === logId);
    if (logEntry) {
      logEntry.resolved = true;
      this.persistLogs();
    }
  }

  /**
   * Get error metrics
   */
  public getErrorMetrics(timeWindow?: number): ErrorMetrics {
    const now = Date.now();
    const cutoffTime = timeWindow ? now - timeWindow : 0;
    
    const filteredLogs = this.errorLogs.filter(log => {
      const logTime = new Date(log.timestamp).getTime();
      return logTime >= cutoffTime;
    });

    const errorsByCategory: Record<string, number> = {};
    const errorsByLevel: Record<string, number> = {};
    const errorsBySeverity: Record<string, number> = {};

    filteredLogs.forEach(log => {
      errorsByCategory[log.category] = (errorsByCategory[log.category] || 0) + 1;
      errorsByLevel[log.level] = (errorsByLevel[log.level] || 0) + 1;
      errorsBySeverity[log.severity] = (errorsBySeverity[log.severity] || 0) + 1;
    });

    const recentErrors = filteredLogs.slice(0, 10);
    const errorRate = this.calculateErrorRate(filteredLogs);
    const averageResolutionTime = this.calculateAverageResolutionTime(filteredLogs);

    return {
      totalErrors: filteredLogs.length,
      errorsByCategory,
      errorsByLevel,
      errorsBySeverity,
      recentErrors,
      errorRate,
      averageResolutionTime
    };
  }

  /**
   * Get errors by category
   */
  public getErrorsByCategory(category: ErrorLogEntry['category'], limit = 50): ErrorLogEntry[] {
    return this.errorLogs
      .filter(log => log.category === category)
      .slice(0, limit);
  }

  /**
   * Get unresolved errors
   */
  public getUnresolvedErrors(limit = 50): ErrorLogEntry[] {
    return this.errorLogs
      .filter(log => !log.resolved)
      .slice(0, limit);
  }

  /**
   * Clear old logs
   */
  public clearOldLogs(olderThanDays = 7): void {
    const cutoffTime = Date.now() - (olderThanDays * 24 * 60 * 60 * 1000);
    this.errorLogs = this.errorLogs.filter(log => {
      const logTime = new Date(log.timestamp).getTime();
      return logTime >= cutoffTime;
    });
    this.persistLogs();
  }

  /**
   * Export logs for analysis
   */
  public exportLogs(format: 'json' | 'csv' = 'json'): string {
    if (format === 'csv') {
      const headers = ['id', 'timestamp', 'level', 'category', 'message', 'severity', 'resolved'];
      const csvRows = [headers.join(',')];
      
      this.errorLogs.forEach(log => {
        const row = [
          log.id,
          log.timestamp,
          log.level,
          log.category,
          `"${log.message.replace(/"/g, '""')}"`,
          log.severity,
          log.resolved.toString()
        ];
        csvRows.push(row.join(','));
      });
      
      return csvRows.join('\n');
    }
    
    return JSON.stringify(this.errorLogs, null, 2);
  }

  /**
   * Determine enrollment error severity
   */
  private determineEnrollmentErrorSeverity(error: Error, operation: string): ErrorLogEntry['severity'] {
    const message = error.message.toLowerCase();
    
    // Critical: Database failures, data corruption
    if (message.includes('database') || message.includes('corrupt') || message.includes('integrity')) {
      return 'critical';
    }
    
    // High: Authentication failures, permission issues
    if (message.includes('permission') || message.includes('unauthorized') || message.includes('forbidden')) {
      return 'high';
    }
    
    // Medium: Network issues, validation errors
    if (message.includes('network') || message.includes('validation') || message.includes('timeout')) {
      return 'medium';
    }
    
    // Low: User input errors, temporary issues
    return 'low';
  }

  /**
   * Determine payment error severity
   */
  private determinePaymentErrorSeverity(error: Error, operation: string): ErrorLogEntry['severity'] {
    const message = error.message.toLowerCase();
    
    // Critical: Payment processing failures, security issues
    if (message.includes('payment') || message.includes('transaction') || message.includes('security')) {
      return 'critical';
    }
    
    // High: Network issues during payment
    if (message.includes('network') || message.includes('connection')) {
      return 'high';
    }
    
    // Medium: Validation errors, temporary issues
    if (message.includes('validation') || message.includes('timeout')) {
      return 'medium';
    }
    
    return 'low';
  }

  /**
   * Generate unique log ID
   */
  private generateLogId(): string {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Check alert rules
   */
  private checkAlertRules(logEntry: ErrorLogEntry): void {
    this.alertRules.forEach(rule => {
      if (!rule.enabled) return;
      
      if (rule.condition(logEntry)) {
        this.triggerAlert(rule, logEntry);
      }
    });
  }

  /**
   * Trigger alert
   */
  private triggerAlert(rule: AlertRule, logEntry: ErrorLogEntry): void {
    console.warn(`🚨 Alert triggered: ${rule.name}`, {
      rule: rule.name,
      logEntry: logEntry.id,
      timestamp: logEntry.timestamp
    });
    
    // In a real application, this would send alerts to monitoring services
    // like PagerDuty, Slack, email, etc.
  }

  /**
   * Initialize default alert rules
   */
  private initializeAlertRules(): void {
    this.alertRules = [
      {
        id: 'critical_errors',
        name: 'Critical Errors',
        condition: (entry) => entry.severity === 'critical',
        threshold: 1,
        timeWindow: 60000, // 1 minute
        enabled: true
      },
      {
        id: 'high_error_rate',
        name: 'High Error Rate',
        condition: (entry) => entry.level === 'error',
        threshold: 10,
        timeWindow: 300000, // 5 minutes
        enabled: true
      },
      {
        id: 'enrollment_failures',
        name: 'Enrollment Failures',
        condition: (entry) => entry.category === 'enrollment' && entry.level === 'error',
        threshold: 5,
        timeWindow: 300000, // 5 minutes
        enabled: true
      },
      {
        id: 'payment_failures',
        name: 'Payment Failures',
        condition: (entry) => entry.category === 'payment' && entry.level === 'error',
        threshold: 3,
        timeWindow: 300000, // 5 minutes
        enabled: true
      }
    ];
  }

  /**
   * Calculate error rate
   */
  private calculateErrorRate(logs: ErrorLogEntry[]): number {
    if (logs.length === 0) return 0;
    
    const errorLogs = logs.filter(log => log.level === 'error');
    return (errorLogs.length / logs.length) * 100;
  }

  /**
   * Calculate average resolution time
   */
  private calculateAverageResolutionTime(logs: ErrorLogEntry[]): number {
    const resolvedLogs = logs.filter(log => log.resolved);
    if (resolvedLogs.length === 0) return 0;
    
    // This would require additional tracking of resolution timestamps
    // For now, return a placeholder value
    return 0;
  }

  /**
   * Persist logs to localStorage
   */
  private persistLogs(): void {
    try {
      localStorage.setItem('error-logs', JSON.stringify(this.errorLogs));
    } catch (error) {
      console.error('Failed to persist error logs:', error);
    }
  }

  /**
   * Load logs from localStorage
   */
  private loadLogs(): void {
    try {
      const stored = localStorage.getItem('error-logs');
      if (stored) {
        this.errorLogs = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load error logs:', error);
      this.errorLogs = [];
    }
  }

  /**
   * Send log to remote service
   */
  private async sendToRemoteService(logEntry: ErrorLogEntry): Promise<void> {
    try {
      // In a real application, this would send to your logging service
      // like Sentry, LogRocket, DataDog, etc.
      
      // Example implementation:
      // await fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry)
      // });
      
      console.log('📤 Log sent to remote service:', logEntry.id);
    } catch (error) {
      console.error('Failed to send log to remote service:', error);
    }
  }

  /**
   * Setup online status listener
   */
  private setupOnlineStatusListener(): void {
    this.isOnline = navigator.onLine;
    
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncPendingLogs();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
    });

    // Load existing logs
    this.loadLogs();
  }

  /**
   * Sync pending logs when back online
   */
  private syncPendingLogs(): void {
    const pendingLogs = this.errorLogs.filter(log => !log.resolved);
    pendingLogs.forEach(log => this.sendToRemoteService(log));
  }

  /**
   * Start log cleanup process
   */
  private startLogCleanup(): void {
    // Clean up old logs every hour
    setInterval(() => {
      this.clearOldLogs(7); // Keep logs for 7 days
    }, 60 * 60 * 1000);
  }

  /**
   * Log error from error boundary system
   */
  public logErrorBoundaryError(
    error: Error,
    errorType: ErrorType,
    componentName?: string,
    context?: Record<string, any>
  ): string {
    return this.logError(
      'error',
      'system',
      `Component error in ${componentName || 'Unknown'}: ${error.message}`,
      error,
      {
        ...context,
        errorType,
        componentName,
        category: 'system'
      },
      'high'
    );
  }

  /**
   * Log enhanced network error with network context
   */
  public logEnhancedNetworkError(
    error: Error,
    networkQuality?: NetworkQuality,
    isOnline?: boolean,
    context?: Record<string, any>
  ): string {
    return this.logError(
      'error',
      'network',
      `Network error: ${error.message}`,
      error,
      {
        ...context,
        errorType: ErrorType.NETWORK_ERROR,
        errorCategory: ErrorCategory.NETWORK,
        networkQuality,
        isOnline,
        category: 'network'
      },
      'medium'
    );
  }

  /**
   * Log recovery attempt with detailed metrics
   */
  public logRecoveryAttempt(
    error: Error,
    retryCount: number,
    recoveryTime: number,
    strategy: string,
    context?: Record<string, any>
  ): string {
    return this.logError(
      'info',
      'system',
      `Recovery attempt ${retryCount}: ${error.message}`,
      error,
      {
        ...context,
        errorType: ErrorType.COMPONENT_ERROR,
        retryCount,
        recoveryTime,
        category: 'system',
        context: {
          ...context?.context,
          recoveryStrategy: strategy
        }
      },
      'low'
    );
  }

  /**
   * Log circuit breaker state change
   */
  public logCircuitBreakerState(
    serviceName: string,
    oldState: string,
    newState: string,
    context?: Record<string, any>
  ): string {
    return this.logError(
      'warn',
      'system',
      `Circuit breaker for ${serviceName} changed from ${oldState} to ${newState}`,
      undefined,
      {
        ...context,
        errorType: ErrorType.SYSTEM_ERROR,
        errorCategory: ErrorCategory.EXTERNAL_SERVICE,
        circuitBreakerState: newState,
        serviceName,
        oldState,
        newState
      },
      'medium'
    );
  }
}

export const errorLoggingService = ErrorLoggingService.getInstance();
