/**
 * Production Validation System Hook
 * 
 * Comprehensive hook that integrates all production validation and monitoring capabilities
 * Provides a unified interface for production configuration management
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  configurationHealthMonitor,
  type HealthAlert,
  type MonitoringStatus,
  type HealthMetrics
} from '../services/ConfigurationHealthMonitor';
import { 
  startupValidator,
  type StartupValidationResult
} from '../utils/startupValidation';
import { 
  useProductionValidator,
  useConfigurationHealth,
  useProductionReadiness
} from './useProductionValidator';

export interface ProductionValidationSystemState {
  // Startup validation
  startupValidation: StartupValidationResult | null;
  startupValidationLoading: boolean;
  
  // Health monitoring
  monitoringStatus: MonitoringStatus | null;
  healthMetrics: HealthMetrics | null;
  alerts: HealthAlert[];
  activeAlertsCount: number;
  criticalAlertsCount: number;
  
  // Real-time health
  configurationHealth: any;
  productionReadiness: any;
  
  // System state
  isProductionReady: boolean;
  hasActiveIssues: boolean;
  systemHealthScore: number; // 0-100
  lastUpdate: Date | null;
  
  // Loading states
  loading: boolean;
  error: string | null;
}

export interface ProductionValidationSystemActions {
  // Startup validation
  performStartupValidation: () => Promise<StartupValidationResult>;
  
  // Health monitoring
  startMonitoring: () => void;
  stopMonitoring: () => void;
  forceHealthCheck: () => Promise<void>;
  
  // Alert management
  resolveAlert: (alertId: string) => boolean;
  clearOldAlerts: () => number;
  getAlertsBySeverity: (severity: HealthAlert['severity']) => HealthAlert[];
  
  // System actions
  refresh: () => Promise<void>;
  generateReport: () => string;
  
  // Configuration
  updateMonitoringConfig: (config: any) => void;
}

export interface UseProductionValidationSystemOptions {
  autoStartMonitoring?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  alertCallback?: (alerts: HealthAlert[]) => void;
  enableRealTimeUpdates?: boolean;
}

/**
 * Comprehensive production validation system hook
 */
export function useProductionValidationSystem(
  options: UseProductionValidationSystemOptions = {}
): [ProductionValidationSystemState, ProductionValidationSystemActions] {
  const {
    autoStartMonitoring = true,
    autoRefresh = true,
    refreshInterval = 30000,
    alertCallback,
    enableRealTimeUpdates = true
  } = options;

  // State management
  const [state, setState] = useState<ProductionValidationSystemState>({
    startupValidation: null,
    startupValidationLoading: false,
    monitoringStatus: null,
    healthMetrics: null,
    alerts: [],
    activeAlertsCount: 0,
    criticalAlertsCount: 0,
    configurationHealth: null,
    productionReadiness: null,
    isProductionReady: false,
    hasActiveIssues: false,
    systemHealthScore: 0,
    lastUpdate: null,
    loading: false,
    error: null
  });

  // Use existing hooks for real-time data
  const { health, loading: healthLoading, error: healthError, refresh: refreshHealth } = 
    useConfigurationHealth(enableRealTimeUpdates, refreshInterval);
  
  const { readiness, loading: readinessLoading, error: readinessError, refresh: refreshReadiness } = 
    useProductionReadiness(enableRealTimeUpdates, refreshInterval);

  // Refs for cleanup
  const alertCallbackRef = useRef(alertCallback);
  const monitoringIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update callback ref
  useEffect(() => {
    alertCallbackRef.current = alertCallback;
  }, [alertCallback]);

  // Update state helper
  const updateState = useCallback((updates: Partial<ProductionValidationSystemState>) => {
    setState(prev => ({ ...prev, ...updates, lastUpdate: new Date() }));
  }, []);

  // Calculate system health score
  const calculateHealthScore = useCallback((
    health: any,
    readiness: any,
    alerts: HealthAlert[]
  ): number => {
    let score = 100;

    // Deduct for configuration issues
    if (health && !health.overallHealth.healthy) {
      score -= 30;
    }

    // Deduct for production readiness issues
    if (readiness && !readiness.ready) {
      score -= 40;
    }

    // Deduct for active alerts
    const criticalAlerts = alerts.filter(a => !a.resolved && a.severity === 'critical').length;
    const highAlerts = alerts.filter(a => !a.resolved && a.severity === 'high').length;
    const mediumAlerts = alerts.filter(a => !a.resolved && a.severity === 'medium').length;

    score -= criticalAlerts * 20;
    score -= highAlerts * 10;
    score -= mediumAlerts * 5;

    return Math.max(0, Math.min(100, score));
  }, []);

  // Perform startup validation
  const performStartupValidation = useCallback(async (): Promise<StartupValidationResult> => {
    updateState({ startupValidationLoading: true, error: null });

    try {
      const result = await startupValidator.performStartupValidation({
        logLevel: 'verbose'
      });

      updateState({
        startupValidation: result,
        startupValidationLoading: false,
        isProductionReady: result.success && result.environment === 'production'
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Startup validation failed';
      updateState({
        startupValidationLoading: false,
        error: errorMessage
      });
      throw error;
    }
  }, [updateState]);

  // Start health monitoring
  const startMonitoring = useCallback(() => {
    try {
      configurationHealthMonitor.start();
      updateState({ error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to start monitoring';
      updateState({ error: errorMessage });
    }
  }, [updateState]);

  // Stop health monitoring
  const stopMonitoring = useCallback(() => {
    try {
      configurationHealthMonitor.stop();
      if (monitoringIntervalRef.current) {
        clearInterval(monitoringIntervalRef.current);
        monitoringIntervalRef.current = null;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to stop monitoring';
      updateState({ error: errorMessage });
    }
  }, [updateState]);

  // Force health check
  const forceHealthCheck = useCallback(async (): Promise<void> => {
    updateState({ loading: true, error: null });

    try {
      await configurationHealthMonitor.forceHealthCheck();
      await refreshHealth();
      await refreshReadiness();
      updateState({ loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Health check failed';
      updateState({ loading: false, error: errorMessage });
      throw error;
    }
  }, [updateState, refreshHealth, refreshReadiness]);

  // Alert management
  const resolveAlert = useCallback((alertId: string): boolean => {
    return configurationHealthMonitor.resolveAlert(alertId);
  }, []);

  const clearOldAlerts = useCallback((): number => {
    return configurationHealthMonitor.clearOldAlerts();
  }, []);

  const getAlertsBySeverity = useCallback((severity: HealthAlert['severity']): HealthAlert[] => {
    return configurationHealthMonitor.getAlertsBySeverity(severity);
  }, []);

  // Refresh all data
  const refresh = useCallback(async (): Promise<void> => {
    updateState({ loading: true, error: null });

    try {
      await Promise.all([
        refreshHealth(),
        refreshReadiness(),
        forceHealthCheck()
      ]);
      updateState({ loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Refresh failed';
      updateState({ loading: false, error: errorMessage });
    }
  }, [updateState, refreshHealth, refreshReadiness, forceHealthCheck]);

  // Generate comprehensive report
  const generateReport = useCallback((): string => {
    const lines: string[] = [];
    lines.push('=== Production Validation System Report ===');
    lines.push(`Generated: ${new Date().toISOString()}`);
    lines.push('');

    // System overview
    lines.push('SYSTEM OVERVIEW:');
    lines.push(`Health Score: ${state.systemHealthScore}/100`);
    lines.push(`Production Ready: ${state.isProductionReady ? 'YES' : 'NO'}`);
    lines.push(`Active Issues: ${state.hasActiveIssues ? 'YES' : 'NO'}`);
    lines.push(`Active Alerts: ${state.activeAlertsCount}`);
    lines.push(`Critical Alerts: ${state.criticalAlertsCount}`);
    lines.push('');

    // Startup validation
    if (state.startupValidation) {
      lines.push('STARTUP VALIDATION:');
      lines.push(`Status: ${state.startupValidation.success ? 'PASSED' : 'FAILED'}`);
      lines.push(`Environment: ${state.startupValidation.environment}`);
      lines.push(`Can Proceed: ${state.startupValidation.canProceed ? 'YES' : 'NO'}`);
      
      if (state.startupValidation.errors.length > 0) {
        lines.push('Errors:');
        state.startupValidation.errors.forEach(error => lines.push(`  • ${error}`));
      }
      
      if (state.startupValidation.warnings.length > 0) {
        lines.push('Warnings:');
        state.startupValidation.warnings.forEach(warning => lines.push(`  • ${warning}`));
      }
      lines.push('');
    }

    // Health metrics
    if (state.healthMetrics) {
      lines.push('HEALTH METRICS:');
      lines.push(`Total Checks: ${state.healthMetrics.totalChecks}`);
      lines.push(`Successful: ${state.healthMetrics.successfulChecks}`);
      lines.push(`Failed: ${state.healthMetrics.failedChecks}`);
      lines.push(`Uptime: ${state.healthMetrics.uptime.toFixed(2)}%`);
      lines.push(`Avg Response Time: ${state.healthMetrics.averageResponseTime.toFixed(0)}ms`);
      lines.push('');
    }

    // Active alerts
    const activeAlerts = state.alerts.filter(a => !a.resolved);
    if (activeAlerts.length > 0) {
      lines.push('ACTIVE ALERTS:');
      activeAlerts.forEach(alert => {
        lines.push(`  ${alert.severity.toUpperCase()}: ${alert.message}`);
        alert.details.forEach(detail => lines.push(`    - ${detail}`));
      });
      lines.push('');
    }

    lines.push('=== End Report ===');
    return lines.join('\n');
  }, [state]);

  // Update monitoring config
  const updateMonitoringConfig = useCallback((config: any) => {
    configurationHealthMonitor.updateConfig(config);
  }, []);

  // Update state when health data changes
  useEffect(() => {
    if (health || readiness) {
      const alerts = configurationHealthMonitor.getAlerts();
      const activeAlerts = alerts.filter(a => !a.resolved);
      const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical');
      
      const healthScore = calculateHealthScore(health, readiness, alerts);
      const hasIssues = activeAlerts.length > 0 || 
                       (health && !health.overallHealth.healthy) ||
                       (readiness && !readiness.ready);

      updateState({
        configurationHealth: health,
        productionReadiness: readiness,
        alerts,
        activeAlertsCount: activeAlerts.length,
        criticalAlertsCount: criticalAlerts.length,
        systemHealthScore: healthScore,
        hasActiveIssues: hasIssues,
        isProductionReady: readiness?.ready && health?.overallHealth.healthy,
        loading: healthLoading || readinessLoading,
        error: healthError || readinessError
      });

      // Trigger alert callback
      if (alertCallbackRef.current && activeAlerts.length > 0) {
        alertCallbackRef.current(activeAlerts);
      }
    }
  }, [health, readiness, healthLoading, readinessLoading, healthError, readinessError, calculateHealthScore, updateState]);

  // Update monitoring status and metrics
  useEffect(() => {
    const updateMonitoringData = () => {
      const status = configurationHealthMonitor.getStatus();
      const metrics = configurationHealthMonitor.getMetrics();
      
      updateState({
        monitoringStatus: status,
        healthMetrics: metrics
      });
    };

    // Initial update
    updateMonitoringData();

    // Set up interval for monitoring data updates
    if (enableRealTimeUpdates) {
      monitoringIntervalRef.current = setInterval(updateMonitoringData, 5000); // Update every 5 seconds
    }

    return () => {
      if (monitoringIntervalRef.current) {
        clearInterval(monitoringIntervalRef.current);
      }
    };
  }, [enableRealTimeUpdates, updateState]);

  // Auto-start monitoring
  useEffect(() => {
    if (autoStartMonitoring) {
      startMonitoring();
    }

    return () => {
      if (autoStartMonitoring) {
        stopMonitoring();
      }
    };
  }, [autoStartMonitoring, startMonitoring, stopMonitoring]);

  // Perform initial startup validation
  useEffect(() => {
    performStartupValidation().catch(console.error);
  }, [performStartupValidation]);

  const actions: ProductionValidationSystemActions = {
    performStartupValidation,
    startMonitoring,
    stopMonitoring,
    forceHealthCheck,
    resolveAlert,
    clearOldAlerts,
    getAlertsBySeverity,
    refresh,
    generateReport,
    updateMonitoringConfig
  };

  return [state, actions];
}

export default useProductionValidationSystem;