/**
 * Production Validation Dashboard
 * 
 * Comprehensive dashboard for monitoring production configuration health
 * Provides real-time status, alerts, metrics, and management controls
 */

import React, { useState } from 'react';
import { useProductionValidationSystem } from '../hooks/useProductionValidationSystem';
import { ProductionConfigMonitor } from './ProductionConfigMonitor';
import type { HealthAlert } from '../services/ConfigurationHealthMonitor';

interface ProductionValidationDashboardProps {
  className?: string;
  showDetailedView?: boolean;
  enableAutoRefresh?: boolean;
  refreshInterval?: number;
}

export const ProductionValidationDashboard: React.FC<ProductionValidationDashboardProps> = ({
  className = '',
  showDetailedView = true,
  enableAutoRefresh = true,
  refreshInterval = 30000
}) => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'alerts' | 'metrics' | 'config'>('overview');
  const [showResolvedAlerts, setShowResolvedAlerts] = useState(false);

  const [state, actions] = useProductionValidationSystem({
    autoStartMonitoring: true,
    autoRefresh: enableAutoRefresh,
    refreshInterval,
    enableRealTimeUpdates: true,
    alertCallback: (alerts) => {
      // Handle critical alerts
      const criticalAlerts = alerts.filter(a => a.severity === 'critical');
      if (criticalAlerts.length > 0) {
        console.error('🚨 Critical production alerts:', criticalAlerts.map(a => a.message));
      }
    }
  });

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  const getHealthScoreBackground = (score: number) => {
    if (score >= 90) return 'bg-green-100 border-green-200';
    if (score >= 70) return 'bg-yellow-100 border-yellow-200';
    if (score >= 50) return 'bg-orange-100 border-orange-200';
    return 'bg-red-100 border-red-200';
  };

  const getSeverityIcon = (severity: HealthAlert['severity']) => {
    switch (severity) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return '⚪';
    }
  };

  const getSeverityColor = (severity: HealthAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };

  const filteredAlerts = showResolvedAlerts 
    ? state.alerts 
    : state.alerts.filter(alert => !alert.resolved);

  if (state.loading && !state.configurationHealth) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-8 ${className}`}>
        <div className="flex items-center justify-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-lg text-gray-600">Loading production validation dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Production Validation Dashboard</h2>
            <p className="text-sm text-gray-600 mt-1">
              Real-time monitoring of production configuration health
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Health Score */}
            <div className={`px-4 py-2 rounded-lg border ${getHealthScoreBackground(state.systemHealthScore)}`}>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getHealthScoreColor(state.systemHealthScore)}`}>
                  {state.systemHealthScore}
                </div>
                <div className="text-xs text-gray-600">Health Score</div>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${state.isProductionReady ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm font-medium">
                {state.isProductionReady ? 'Production Ready' : 'Not Ready'}
              </span>
            </div>
            
            {/* Refresh Button */}
            <button
              onClick={() => actions.refresh()}
              disabled={state.loading}
              className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {state.loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview', count: null },
            { id: 'alerts', label: 'Alerts', count: state.activeAlertsCount },
            { id: 'metrics', label: 'Metrics', count: null },
            { id: 'config', label: 'Configuration', count: null }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count !== null && tab.count > 0 && (
                <span className="ml-2 bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Production Ready</p>
                    <p className={`text-2xl font-bold ${state.isProductionReady ? 'text-green-600' : 'text-red-600'}`}>
                      {state.isProductionReady ? 'YES' : 'NO'}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {state.isProductionReady ? '✅' : '❌'}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                    <p className={`text-2xl font-bold ${state.activeAlertsCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {state.activeAlertsCount}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {state.activeAlertsCount > 0 ? '🚨' : '✅'}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical Issues</p>
                    <p className={`text-2xl font-bold ${state.criticalAlertsCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {state.criticalAlertsCount}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {state.criticalAlertsCount > 0 ? '🔴' : '✅'}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monitoring</p>
                    <p className={`text-2xl font-bold ${state.monitoringStatus?.running ? 'text-green-600' : 'text-gray-600'}`}>
                      {state.monitoringStatus?.running ? 'ON' : 'OFF'}
                    </p>
                  </div>
                  <div className="text-2xl">
                    {state.monitoringStatus?.running ? '🔍' : '⏸️'}
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Monitor */}
            <ProductionConfigMonitor
              showDetails={showDetailedView}
              autoRefresh={enableAutoRefresh}
              refreshInterval={refreshInterval}
              onAlert={(issues) => console.warn('Configuration issues:', issues)}
            />

            {/* Recent Alerts */}
            {state.activeAlertsCount > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-red-800 mb-3">Active Alerts</h3>
                <div className="space-y-2">
                  {state.alerts.filter(a => !a.resolved).slice(0, 3).map(alert => (
                    <div key={alert.id} className="flex items-start space-x-3">
                      <span className="text-lg">{getSeverityIcon(alert.severity)}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-800">{alert.message}</p>
                        <p className="text-xs text-red-600">{formatDate(alert.timestamp)}</p>
                      </div>
                      <button
                        onClick={() => actions.resolveAlert(alert.id)}
                        className="text-xs text-red-600 hover:text-red-800 underline"
                      >
                        Resolve
                      </button>
                    </div>
                  ))}
                  {state.activeAlertsCount > 3 && (
                    <p className="text-sm text-red-600 italic">
                      +{state.activeAlertsCount - 3} more alerts
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'alerts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">System Alerts</h3>
              <div className="flex items-center space-x-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showResolvedAlerts}
                    onChange={(e) => setShowResolvedAlerts(e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-600">Show resolved</span>
                </label>
                <button
                  onClick={() => actions.clearOldAlerts()}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear old alerts
                </button>
              </div>
            </div>

            {filteredAlerts.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">✅</div>
                <p className="text-gray-600">No alerts to display</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAlerts.map(alert => (
                  <div
                    key={alert.id}
                    className={`border rounded-lg p-4 ${getSeverityColor(alert.severity)} ${
                      alert.resolved ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <span className="text-xl">{getSeverityIcon(alert.severity)}</span>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{alert.message}</h4>
                            <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-50">
                              {alert.component}
                            </span>
                            {alert.resolved && (
                              <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                                Resolved
                              </span>
                            )}
                          </div>
                          <p className="text-sm mt-1 opacity-75">
                            {formatDate(alert.timestamp)}
                            {alert.resolved && alert.resolvedAt && (
                              <span> • Resolved {formatDate(alert.resolvedAt)}</span>
                            )}
                          </p>
                          {alert.details.length > 0 && (
                            <ul className="text-sm mt-2 space-y-1">
                              {alert.details.map((detail, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="opacity-50">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                      {!alert.resolved && (
                        <button
                          onClick={() => actions.resolveAlert(alert.id)}
                          className="text-sm px-3 py-1 bg-white bg-opacity-50 rounded-md hover:bg-opacity-75"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedTab === 'metrics' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Health Metrics</h3>
            
            {state.healthMetrics ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Check Statistics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Checks:</span>
                      <span className="font-medium">{state.healthMetrics.totalChecks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Successful:</span>
                      <span className="font-medium text-green-600">{state.healthMetrics.successfulChecks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Failed:</span>
                      <span className="font-medium text-red-600">{state.healthMetrics.failedChecks}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Uptime:</span>
                      <span className={`font-medium ${state.healthMetrics.uptime >= 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {state.healthMetrics.uptime.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Response:</span>
                      <span className="font-medium">{state.healthMetrics.averageResponseTime.toFixed(0)}ms</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Last Checks</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Success:</span>
                      <span className="font-medium text-xs">
                        {state.healthMetrics.lastSuccessfulCheck 
                          ? formatDate(state.healthMetrics.lastSuccessfulCheck)
                          : 'Never'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Last Failure:</span>
                      <span className="font-medium text-xs">
                        {state.healthMetrics.lastFailedCheck 
                          ? formatDate(state.healthMetrics.lastFailedCheck)
                          : 'Never'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No metrics available</p>
            )}
          </div>
        )}

        {selectedTab === 'config' && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Configuration Management</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Monitoring Controls</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => actions.startMonitoring()}
                    disabled={state.monitoringStatus?.running}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                  >
                    Start Monitoring
                  </button>
                  <button
                    onClick={() => actions.stopMonitoring()}
                    disabled={!state.monitoringStatus?.running}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                  >
                    Stop Monitoring
                  </button>
                  <button
                    onClick={() => actions.forceHealthCheck()}
                    disabled={state.loading}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                  >
                    Force Health Check
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">System Actions</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => actions.performStartupValidation()}
                    disabled={state.startupValidationLoading}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
                  >
                    Run Startup Validation
                  </button>
                  <button
                    onClick={() => {
                      const report = actions.generateReport();
                      console.log(report);
                      navigator.clipboard?.writeText(report);
                    }}
                    className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>

            {/* Monitoring Status */}
            {state.monitoringStatus && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Monitoring Status</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className={`ml-2 font-medium ${state.monitoringStatus.running ? 'text-green-600' : 'text-red-600'}`}>
                      {state.monitoringStatus.running ? 'Running' : 'Stopped'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Started:</span>
                    <span className="ml-2 font-medium">
                      {state.monitoringStatus.startTime ? formatDate(state.monitoringStatus.startTime) : 'Never'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Check:</span>
                    <span className="ml-2 font-medium">
                      {state.monitoringStatus.lastCheck ? formatDate(state.monitoringStatus.lastCheck) : 'Never'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Failures:</span>
                    <span className={`ml-2 font-medium ${state.monitoringStatus.consecutiveFailures > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {state.monitoringStatus.consecutiveFailures}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Display */}
      {state.error && (
        <div className="border-t border-gray-200 bg-red-50 px-6 py-4">
          <div className="flex items-center space-x-2">
            <span className="text-red-600">❌</span>
            <span className="text-sm text-red-800">{state.error}</span>
            <button
              onClick={() => actions.refresh()}
              className="text-sm text-red-600 hover:text-red-800 underline ml-auto"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductionValidationDashboard;