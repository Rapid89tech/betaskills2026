import { supabase } from '@/integrations/supabase/client';

export interface LogEntry {
  id?: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  category: 'payment' | 'enrollment' | 'admin' | 'system' | 'performance';
  message: string;
  metadata?: Record<string, any>;
  userId?: string;
  sessionId?: string;
  userAgent?: string;
  url?: string;
}

export interface PerformanceMetric {
  id?: string;
  timestamp: Date;
  metricName: string;
  value: number;
  unit: string;
  category: 'api_response_time' | 'page_load_time' | 'payment_processing_time' | 'database_query_time';
  metadata?: Record<string, any>;
}

export interface ErrorReport {
  id?: string;
  timestamp: Date;
  errorType: string;
  errorMessage: string;
  stackTrace?: string;
  userId?: string;
  sessionId?: string;
  url?: string;
  userAgent?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'payment' | 'enrollment' | 'admin' | 'system';
  metadata?: Record<string, any>;
}

class MonitoringService {
  private sessionId: string;
  private isProduction: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.isProduction = import.meta.env.PROD;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getCurrentUser(): string | undefined {
    // Get current user from Supabase auth
    return supabase.auth.getUser().then(({ data }) => data.user?.id);
  }

  private getMetadata(): Record<string, any> {
    return {
      sessionId: this.sessionId,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }

  /**
   * Log general application events
   */
  async log(entry: Omit<LogEntry, 'timestamp' | 'sessionId' | 'userAgent' | 'url'>): Promise<void> {
    const logEntry: LogEntry = {
      ...entry,
      timestamp: new Date(),
      sessionId: this.sessionId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: entry.userId || await this.getCurrentUser()
    };

    // Console logging for development
    if (!this.isProduction) {
      const logMethod = entry.level === 'error' ? console.error : 
                       entry.level === 'warn' ? console.warn : 
                       entry.level === 'debug' ? console.debug : console.log;
      
      logMethod(`[${entry.category.toUpperCase()}] ${entry.message}`, entry.metadata);
    }

    // Store in database for production monitoring
    try {
      await supabase
        .from('application_logs')
        .insert([logEntry]);
    } catch (error) {
      console.error('Failed to store log entry:', error);
    }
  }

  /**
   * Log payment-specific events
   */
  async logPayment(message: string, metadata?: Record<string, any>, level: LogEntry['level'] = 'info'): Promise<void> {
    await this.log({
      level,
      category: 'payment',
      message,
      metadata: {
        ...metadata,
        ...this.getMetadata()
      }
    });
  }

  /**
   * Log enrollment events
   */
  async logEnrollment(message: string, metadata?: Record<string, any>, level: LogEntry['level'] = 'info'): Promise<void> {
    await this.log({
      level,
      category: 'enrollment',
      message,
      metadata: {
        ...metadata,
        ...this.getMetadata()
      }
    });
  }

  /**
   * Log admin dashboard events
   */
  async logAdmin(message: string, metadata?: Record<string, any>, level: LogEntry['level'] = 'info'): Promise<void> {
    await this.log({
      level,
      category: 'admin',
      message,
      metadata: {
        ...metadata,
        ...this.getMetadata()
      }
    });
  }

  /**
   * Record performance metrics
   */
  async recordMetric(metric: Omit<PerformanceMetric, 'timestamp'>): Promise<void> {
    const performanceMetric: PerformanceMetric = {
      ...metric,
      timestamp: new Date(),
      metadata: {
        ...metric.metadata,
        ...this.getMetadata()
      }
    };

    // Console logging for development
    if (!this.isProduction) {
      console.log(`[PERFORMANCE] ${metric.metricName}: ${metric.value}${metric.unit}`, metric.metadata);
    }

    try {
      await supabase
        .from('performance_metrics')
        .insert([performanceMetric]);
    } catch (error) {
      console.error('Failed to store performance metric:', error);
    }
  }

  /**
   * Report errors with context
   */
  async reportError(error: Error | ErrorReport, context?: Record<string, any>): Promise<void> {
    let errorReport: ErrorReport;

    if (error instanceof Error) {
      errorReport = {
        timestamp: new Date(),
        errorType: error.name,
        errorMessage: error.message,
        stackTrace: error.stack,
        severity: 'medium',
        category: 'system',
        sessionId: this.sessionId,
        url: window.location.href,
        userAgent: navigator.userAgent,
        userId: await this.getCurrentUser(),
        metadata: {
          ...context,
          ...this.getMetadata()
        }
      };
    } else {
      errorReport = {
        ...error,
        timestamp: new Date(),
        sessionId: this.sessionId,
        url: error.url || window.location.href,
        userAgent: error.userAgent || navigator.userAgent,
        userId: error.userId || await this.getCurrentUser(),
        metadata: {
          ...error.metadata,
          ...context,
          ...this.getMetadata()
        }
      };
    }

    // Console logging for development
    if (!this.isProduction) {
      console.error(`[ERROR] ${errorReport.errorType}: ${errorReport.errorMessage}`, {
        stackTrace: errorReport.stackTrace,
        metadata: errorReport.metadata
      });
    }

    try {
      await supabase
        .from('error_reports')
        .insert([errorReport]);
    } catch (dbError) {
      console.error('Failed to store error report:', dbError);
    }

    // Also log as a regular log entry
    await this.log({
      level: 'error',
      category: errorReport.category,
      message: `${errorReport.errorType}: ${errorReport.errorMessage}`,
      metadata: errorReport.metadata
    });
  }

  /**
   * Track API response times
   */
  async trackApiCall(endpoint: string, method: string, duration: number, status: number, metadata?: Record<string, any>): Promise<void> {
    await this.recordMetric({
      metricName: `api_${method.toLowerCase()}_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`,
      value: duration,
      unit: 'ms',
      category: 'api_response_time',
      metadata: {
        endpoint,
        method,
        status,
        ...metadata
      }
    });

    // Log slow API calls
    if (duration > 2000) {
      await this.log({
        level: 'warn',
        category: 'performance',
        message: `Slow API call detected: ${method} ${endpoint}`,
        metadata: {
          duration,
          status,
          ...metadata
        }
      });
    }
  }

  /**
   * Track page load performance
   */
  async trackPageLoad(pageName: string, loadTime: number, metadata?: Record<string, any>): Promise<void> {
    await this.recordMetric({
      metricName: `page_load_${pageName.replace(/[^a-zA-Z0-9]/g, '_')}`,
      value: loadTime,
      unit: 'ms',
      category: 'page_load_time',
      metadata: {
        pageName,
        ...metadata
      }
    });
  }

  /**
   * Track payment processing performance
   */
  async trackPaymentProcessing(paymentId: string, duration: number, success: boolean, metadata?: Record<string, any>): Promise<void> {
    await this.recordMetric({
      metricName: 'payment_processing_time',
      value: duration,
      unit: 'ms',
      category: 'payment_processing_time',
      metadata: {
        paymentId,
        success,
        ...metadata
      }
    });

    await this.logPayment(
      `Payment processing ${success ? 'completed' : 'failed'} for ${paymentId}`,
      {
        paymentId,
        duration,
        success,
        ...metadata
      },
      success ? 'info' : 'error'
    );
  }

  /**
   * Get session ID for correlation
   */
  getSessionId(): string {
    return this.sessionId;
  }
}

// Export singleton instance
export const monitoringService = new MonitoringService();
export default MonitoringService;