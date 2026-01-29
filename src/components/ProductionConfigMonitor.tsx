/**
 * Production Configuration Monitor Component
 * 
 * Real-time monitoring dashboard for production configuration health
 * Provides visual feedback and alerts for configuration issues
 */

import React, { useState, useEffect } from 'react';
import { useProductionValidator, useConfigurationHealth, useProductionReadiness } from '../hooks/useProductionValidator';
import type { ConfigurationHealth, ProductionReadiness } from '../services/ProductionValidator';

interface ProductionConfigMonitorProps {
  showDetails?: boolean;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onAlert?: (issues: string[]) => void;
}

export const ProductionConfigMonitor: React.FC<ProductionConfigMonitorProps> = ({
  showDetails = false,
  autoRefresh = true,
  refreshInterval = 30000,
  onAlert
}) => {
  const { health, loading: healthLoading, error: healthError, refresh: refreshHealth } = useConfigurationHealth(autoRefresh, refreshInterval);
  const { readiness, loading: readinessLoading, error: readinessError, refresh: refreshReadiness } = useProductionReadiness(autoRefresh, refreshInterval);
  const [lastAlertTime, setLastAlertTime] = useState<Date | null>(null);

  // Alert on critical issues
  useEffect(() => {
    if (health && !health.overallHealth.healthy && health.overallHealth.issues.length > 0) {
      const now = new Date();
      const shouldAlert = !lastAlertTime || (now.getTime() - lastAlertTime.getTime()) > 300000; // 5 minutes

      if (shouldAlert) {
        setLastAlertTime(now);
        onAlert?.(health.overallHealth.issues);
        console.error('🚨 Production configuration alert:', health.overallHealth.issues);
      }
    }
  }, [health, lastAlertTime, onAlert]);

  const getHealthStatusIcon = (healthy: boolean) => {
    return healthy ? '✅' : '❌';
  };

  const getHealthStatusColor = (healthy: boolean) => {
    return healthy ? 'text-green-600' : 'text-red-600';
  };

  const formatLastCheck = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  if (healthLoading || readinessLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-sm text-gray-600">Checking production configuration...</span>
        </div>
      </div>
    );
  }

  if (healthError || readinessError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <span className="text-red-600">❌</span>
          <span className="text-sm text-red-800">
            Configuration check failed: {healthError || readinessError}
          </span>
        </div>
        <button
          onClick={() => {
            refreshHealth();
            refreshReadiness();
          }}
          className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Production Configuration Status</h3>
        <button
          onClick={() => {
            refreshHealth();
            refreshReadiness();
          }}
          className="text-sm text-blue-600 hover:text-blue-800 underline"
        >
          Refresh
        </button>
      </div>

      {/* Overall Health Status */}
      {health && (
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">{getHealthStatusIcon(health.overallHealth.healthy)}</span>
            <div>
              <h4 className={`font-medium ${getHealthStatusColor(health.overallHealth.healthy)}`}>
                {health.overallHealth.healthy ? 'Configuration Healthy' : 'Configuration Issues Detected'}
              </h4>
              <p className="text-sm text-gray-600">
                Last checked: {formatLastCheck(health.overallHealth.lastCheck)}
              </p>
            </div>
          </div>

          {health.overallHealth.issues.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-3">
              <h5 className="text-sm font-medium text-red-800 mb-2">Critical Issues:</h5>
              <ul className="text-sm text-red-700 space-y-1">
                {health.overallHealth.issues.map((issue, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Production Readiness */}
      {readiness && (
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xl">{getHealthStatusIcon(readiness.ready)}</span>
            <h4 className={`font-medium ${getHealthStatusColor(readiness.ready)}`}>
              {readiness.ready ? 'Production Ready' : 'Not Production Ready'}
            </h4>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="text-center">
              <div className={`text-lg font-semibold ${getHealthStatusColor(readiness.configurationValid)}`}>
                {getHealthStatusIcon(readiness.configurationValid)}
              </div>
              <div className="text-xs text-gray-600">Configuration</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-semibold ${getHealthStatusColor(readiness.securityValid)}`}>
                {getHealthStatusIcon(readiness.securityValid)}
              </div>
              <div className="text-xs text-gray-600">Security</div>
            </div>
            <div className="text-center">
              <div className={`text-lg font-semibold ${getHealthStatusColor(readiness.performanceValid)}`}>
                {getHealthStatusIcon(readiness.performanceValid)}
              </div>
              <div className="text-xs text-gray-600">Performance</div>
            </div>
          </div>

          {readiness.recommendations.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mt-3">
              <h5 className="text-sm font-medium text-yellow-800 mb-2">Recommendations:</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                {readiness.recommendations.slice(0, 3).map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
                {readiness.recommendations.length > 3 && (
                  <li className="text-xs text-yellow-600 italic">
                    +{readiness.recommendations.length - 3} more recommendations
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Detailed Component Health */}
      {showDetails && health && (
        <div className="space-y-4">
          <h5 className="font-medium text-gray-900">Component Health Details</h5>
          
          <div className="grid gap-4">
            {/* Ikhokha Configuration */}
            <div className="border border-gray-200 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Ikhokha Configuration</span>
                <span className={getHealthStatusColor(health.ikhokhaConfig.healthy)}>
                  {getHealthStatusIcon(health.ikhokhaConfig.healthy)}
                </span>
              </div>
              {health.ikhokhaConfig.issues.length > 0 && (
                <ul className="text-xs text-red-600 space-y-1">
                  {health.ikhokhaConfig.issues.map((issue, index) => (
                    <li key={index}>• {issue}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Database Configuration */}
            <div className="border border-gray-200 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Database Configuration</span>
                <span className={getHealthStatusColor(health.databaseConfig.healthy)}>
                  {getHealthStatusIcon(health.databaseConfig.healthy)}
                </span>
              </div>
              {health.databaseConfig.issues.length > 0 && (
                <ul className="text-xs text-red-600 space-y-1">
                  {health.databaseConfig.issues.map((issue, index) => (
                    <li key={index}>• {issue}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Webhook Configuration */}
            <div className="border border-gray-200 rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">Webhook Configuration</span>
                <span className={getHealthStatusColor(health.webhookConfig.healthy)}>
                  {getHealthStatusIcon(health.webhookConfig.healthy)}
                </span>
              </div>
              {health.webhookConfig.issues.length > 0 && (
                <ul className="text-xs text-red-600 space-y-1">
                  {health.webhookConfig.issues.map((issue, index) => (
                    <li key={index}>• {issue}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionConfigMonitor;