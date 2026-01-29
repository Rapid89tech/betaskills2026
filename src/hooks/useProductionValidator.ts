/**
 * Production Validator Hook
 * 
 * React hook for using ProductionValidator in components with real-time updates
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  productionValidator,
  getConfigurationHealth,
  validateProductionReadiness,
  type ConfigurationHealth,
  type ProductionReadiness,
  type ValidationResult,
  type SecurityValidation,
  type PerformanceValidation
} from '../services/ProductionValidator';

export interface UseProductionValidatorOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
  validateOnMount?: boolean;
}

export interface ProductionValidatorState {
  health: ConfigurationHealth | null;
  readiness: ProductionReadiness | null;
  ikhokhaValidation: ValidationResult | null;
  databaseValidation: ValidationResult | null;
  webhookValidation: ValidationResult | null;
  securityValidation: SecurityValidation | null;
  performanceValidation: PerformanceValidation | null;
  loading: boolean;
  error: string | null;
  lastUpdate: Date | null;
}

export interface ProductionValidatorActions {
  refresh: () => Promise<void>;
  validateIkhokha: () => Promise<ValidationResult>;
  validateDatabase: () => Promise<ValidationResult>;
  validateWebhook: () => Promise<ValidationResult>;
  validateSecurity: () => Promise<SecurityValidation>;
  validatePerformance: () => Promise<PerformanceValidation>;
  alertOnIssues: () => void;
}

export function useProductionValidator(
  options: UseProductionValidatorOptions = {}
): [ProductionValidatorState, ProductionValidatorActions] {
  const {
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds
    validateOnMount = true
  } = options;

  const [state, setState] = useState<ProductionValidatorState>({
    health: null,
    readiness: null,
    ikhokhaValidation: null,
    databaseValidation: null,
    webhookValidation: null,
    securityValidation: null,
    performanceValidation: null,
    loading: false,
    error: null,
    lastUpdate: null
  });

  const updateState = useCallback((updates: Partial<ProductionValidatorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleError = useCallback((error: unknown, context: string) => {
    const errorMessage = error instanceof Error ? error.message : `Unknown error in ${context}`;
    console.error(`ProductionValidator ${context} error:`, error);
    updateState({ error: errorMessage, loading: false });
  }, [updateState]);

  const validateIkhokha = useCallback(async (): Promise<ValidationResult> => {
    try {
      const result = productionValidator.validateIkhokhaConfig();
      updateState({ ikhokhaValidation: result, error: null });
      return result;
    } catch (error) {
      handleError(error, 'iKhokha validation');
      throw error;
    }
  }, [updateState, handleError]);

  const validateDatabase = useCallback(async (): Promise<ValidationResult> => {
    try {
      const result = productionValidator.validateDatabaseConfig();
      updateState({ databaseValidation: result, error: null });
      return result;
    } catch (error) {
      handleError(error, 'database validation');
      throw error;
    }
  }, [updateState, handleError]);

  const validateWebhook = useCallback(async (): Promise<ValidationResult> => {
    try {
      const result = productionValidator.validateWebhookConfig();
      updateState({ webhookValidation: result, error: null });
      return result;
    } catch (error) {
      handleError(error, 'webhook validation');
      throw error;
    }
  }, [updateState, handleError]);

  const validateSecurity = useCallback(async (): Promise<SecurityValidation> => {
    try {
      const result = productionValidator.validateApiKeys();
      updateState({ securityValidation: result, error: null });
      return result;
    } catch (error) {
      handleError(error, 'security validation');
      throw error;
    }
  }, [updateState, handleError]);

  const validatePerformance = useCallback(async (): Promise<PerformanceValidation> => {
    try {
      const dbValidation = productionValidator.validateDatabaseConnections();
      const apiValidation = productionValidator.validateApiResponseTimes();
      
      // Combine both validations
      const result: PerformanceValidation = {
        databaseConnectionsValid: dbValidation.databaseConnectionsValid,
        apiResponseTimesValid: apiValidation.apiResponseTimesValid,
        errors: [...dbValidation.errors, ...apiValidation.errors],
        warnings: [...dbValidation.warnings, ...apiValidation.warnings]
      };
      
      updateState({ performanceValidation: result, error: null });
      return result;
    } catch (error) {
      handleError(error, 'performance validation');
      throw error;
    }
  }, [updateState, handleError]);

  const refresh = useCallback(async (): Promise<void> => {
    updateState({ loading: true, error: null });
    
    try {
      const [
        healthData,
        readinessData,
        ikhokhaData,
        databaseData,
        webhookData,
        securityData,
        performanceData
      ] = await Promise.all([
        Promise.resolve(getConfigurationHealth()),
        Promise.resolve(validateProductionReadiness()),
        validateIkhokha(),
        validateDatabase(),
        validateWebhook(),
        validateSecurity(),
        validatePerformance()
      ]);

      updateState({
        health: healthData,
        readiness: readinessData,
        ikhokhaValidation: ikhokhaData,
        databaseValidation: databaseData,
        webhookValidation: webhookData,
        securityValidation: securityData,
        performanceValidation: performanceData,
        loading: false,
        lastUpdate: new Date()
      });
    } catch (error) {
      handleError(error, 'refresh');
    }
  }, [updateState, handleError, validateIkhokha, validateDatabase, validateWebhook, validateSecurity, validatePerformance]);

  const alertOnIssues = useCallback(() => {
    try {
      productionValidator.alertOnConfigurationIssues();
    } catch (error) {
      handleError(error, 'alerting');
    }
  }, [handleError]);

  // Initial validation on mount
  useEffect(() => {
    if (validateOnMount) {
      refresh();
    }
  }, [validateOnMount, refresh]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      refresh();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, refresh]);

  const actions: ProductionValidatorActions = {
    refresh,
    validateIkhokha,
    validateDatabase,
    validateWebhook,
    validateSecurity,
    validatePerformance,
    alertOnIssues
  };

  return [state, actions];
}

/**
 * Hook for simple production readiness check
 */
export function useProductionReadiness(autoRefresh = false, refreshInterval = 60000) {
  const [readiness, setReadiness] = useState<ProductionReadiness | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkReadiness = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = validateProductionReadiness();
      setReadiness(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Production readiness check failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkReadiness();
  }, [checkReadiness]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(checkReadiness, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, checkReadiness]);

  return {
    readiness,
    loading,
    error,
    refresh: checkReadiness,
    isReady: readiness?.ready ?? false,
    issues: readiness?.issues ?? [],
    recommendations: readiness?.recommendations ?? []
  };
}

/**
 * Hook for configuration health monitoring
 */
export function useConfigurationHealth(autoRefresh = true, refreshInterval = 30000) {
  const [health, setHealth] = useState<ConfigurationHealth | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = getConfigurationHealth();
      setHealth(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Configuration health check failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(checkHealth, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, checkHealth]);

  return {
    health,
    loading,
    error,
    refresh: checkHealth,
    isHealthy: health?.overallHealth.healthy ?? false,
    totalErrors: health?.overallHealth.metrics.totalErrors ?? 0,
    healthyComponents: health?.overallHealth.metrics.componentsHealthy ?? 0,
    totalComponents: health?.overallHealth.metrics.totalComponents ?? 0
  };
}

export default useProductionValidator;