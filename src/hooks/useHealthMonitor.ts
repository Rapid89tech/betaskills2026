/**
 * React hook for Application Health Monitor
 * 
 * Provides health monitoring functionality to React components
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { HealthMonitor, HealthCheckResult, HealthIssue, HealthMonitorConfig } from '../services/HealthMonitor';

export interface UseHealthMonitorOptions {
  autoStart?: boolean;
  config?: Partial<HealthMonitorConfig>;
  onHealthChange?: (result: HealthCheckResult) => void;
  onIssueDetected?: (issue: HealthIssue) => void;
}

export interface UseHealthMonitorReturn {
  healthStatus: HealthCheckResult | null;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  performHealthCheck: () => Promise<HealthCheckResult>;
  metricsHistory: any[];
  registerRecoveryCallback: (issueType: string, callback: () => Promise<void>) => void;
}

export function useHealthMonitor(options: UseHealthMonitorOptions = {}): UseHealthMonitorReturn {
  const {
    autoStart = true,
    config = {},
    onHealthChange,
    onIssueDetected
  } = options;

  const [healthStatus, setHealthStatus] = useState<HealthCheckResult | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [metricsHistory, setMetricsHistory] = useState<any[]>([]);
  
  const healthMonitorRef = useRef<HealthMonitor | null>(null);
  const healthCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize health monitor
  useEffect(() => {
    const defaultConfig = HealthMonitor.getDefaultConfig();
    const mergedConfig = { ...defaultConfig, ...config };
    
    healthMonitorRef.current = new HealthMonitor(mergedConfig);

    // Register notification callback for issues
    if (onIssueDetected) {
      healthMonitorRef.current.registerNotificationCallback(onIssueDetected);
    }

    return () => {
      if (healthMonitorRef.current) {
        healthMonitorRef.current.stopMonitoring();
      }
      if (healthCheckIntervalRef.current) {
        clearInterval(healthCheckIntervalRef.current);
      }
    };
  }, [config, onIssueDetected]);

  // Auto-start monitoring if enabled
  useEffect(() => {
    if (autoStart && healthMonitorRef.current && !isMonitoring) {
      startMonitoring();
    }
  }, [autoStart]);

  // Start monitoring
  const startMonitoring = useCallback(() => {
    if (!healthMonitorRef.current || isMonitoring) {
      return;
    }

    healthMonitorRef.current.startMonitoring();
    setIsMonitoring(true);

    // Set up periodic health status updates
    healthCheckIntervalRef.current = setInterval(async () => {
      if (healthMonitorRef.current) {
        try {
          const result = await healthMonitorRef.current.performHealthCheck();
          setHealthStatus(result);
          setMetricsHistory(healthMonitorRef.current.getMetricsHistory());
          
          if (onHealthChange) {
            onHealthChange(result);
          }
        } catch (error) {
          console.error('Health check failed:', error);
        }
      }
    }, 5000); // Update UI every 5 seconds

    // Perform initial health check
    performHealthCheck();
  }, [isMonitoring, onHealthChange]);

  // Stop monitoring
  const stopMonitoring = useCallback(() => {
    if (!healthMonitorRef.current || !isMonitoring) {
      return;
    }

    healthMonitorRef.current.stopMonitoring();
    setIsMonitoring(false);

    if (healthCheckIntervalRef.current) {
      clearInterval(healthCheckIntervalRef.current);
      healthCheckIntervalRef.current = null;
    }
  }, [isMonitoring]);

  // Perform immediate health check
  const performHealthCheck = useCallback(async (): Promise<HealthCheckResult> => {
    if (!healthMonitorRef.current) {
      throw new Error('Health monitor not initialized');
    }

    try {
      const result = await healthMonitorRef.current.performHealthCheck();
      setHealthStatus(result);
      setMetricsHistory(healthMonitorRef.current.getMetricsHistory());
      
      if (onHealthChange) {
        onHealthChange(result);
      }
      
      return result;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }, [onHealthChange]);

  // Register recovery callback
  const registerRecoveryCallback = useCallback((issueType: string, callback: () => Promise<void>) => {
    if (healthMonitorRef.current) {
      healthMonitorRef.current.registerRecoveryCallback(issueType, callback);
    }
  }, []);

  return {
    healthStatus,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    performHealthCheck,
    metricsHistory,
    registerRecoveryCallback
  };
}

/**
 * Hook for monitoring specific health metrics
 */
export function useHealthMetrics() {
  const { healthStatus, metricsHistory } = useHealthMonitor();

  const currentMetrics = healthStatus?.metrics || null;
  
  const getMetricTrend = useCallback((metricPath: string) => {
    if (metricsHistory.length < 2) {
      return 'stable';
    }

    const recent = metricsHistory.slice(-5);
    const values = recent.map(metric => {
      const keys = metricPath.split('.');
      let value = metric;
      for (const key of keys) {
        value = value?.[key];
      }
      return typeof value === 'number' ? value : 0;
    });

    const trend = values[values.length - 1] - values[0];
    
    if (Math.abs(trend) < 0.1) return 'stable';
    return trend > 0 ? 'increasing' : 'decreasing';
  }, [metricsHistory]);

  const getAverageMetric = useCallback((metricPath: string, samples = 10) => {
    const recent = metricsHistory.slice(-samples);
    if (recent.length === 0) return 0;

    const values = recent.map(metric => {
      const keys = metricPath.split('.');
      let value = metric;
      for (const key of keys) {
        value = value?.[key];
      }
      return typeof value === 'number' ? value : 0;
    });

    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }, [metricsHistory]);

  return {
    currentMetrics,
    metricsHistory,
    getMetricTrend,
    getAverageMetric
  };
}

/**
 * Hook for health-based notifications
 */
export function useHealthNotifications() {
  const [notifications, setNotifications] = useState<HealthIssue[]>([]);

  const addNotification = useCallback((issue: HealthIssue) => {
    setNotifications(prev => {
      // Avoid duplicate notifications
      const exists = prev.some(n => 
        n.category === issue.category && 
        n.message === issue.message &&
        Date.now() - n.timestamp < 60000 // Within last minute
      );
      
      if (exists) return prev;
      
      return [...prev, issue].slice(-10); // Keep last 10 notifications
    });
  }, []);

  const clearNotification = useCallback((index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Use health monitor with notification callback
  const { healthStatus, isMonitoring, startMonitoring, stopMonitoring } = useHealthMonitor({
    onIssueDetected: addNotification
  });

  return {
    notifications,
    clearNotification,
    clearAllNotifications,
    healthStatus,
    isMonitoring,
    startMonitoring,
    stopMonitoring
  };
}