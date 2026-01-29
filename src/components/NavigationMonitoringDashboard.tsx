/**
 * Navigation Monitoring Dashboard Component
 * Displays navigation metrics, alerts, and performance data
 */

import React, { useState } from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  RefreshCw,
  Bell,
  BellOff
} from 'lucide-react';
import { useNavigationMonitoring } from '../hooks/useNavigationMonitoring';
import { NavigationErrorType } from '../types/navigationError';

interface NavigationMonitoringDashboardProps {
  className?: string;
  timeRange?: number; // Minutes
  showAlerts?: boolean;
  showPerformanceDetails?: boolean;
}

const NavigationMonitoringDashboard: React.FC<NavigationMonitoringDashboardProps> = ({
  className = '',
  timeRange = 60,
  showAlerts = true,
  showPerformanceDetails = true
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [showAcknowledgedAlerts, setShowAcknowledgedAlerts] = useState(false);
  
  const {
    metrics,
    alerts,
    performanceSummary,
    acknowledgeAlert,
    refreshMetrics
  } = useNavigationMonitoring('NavigationMonitoringDashboard', false, 30000);

  /**
   * Format percentage with color coding
   */
  const formatSuccessRate = (rate: number) => {
    const colorClass = rate >= 95 ? 'text-green-600' : 
                      rate >= 85 ? 'text-yellow-600' : 
                      'text-red-600';
    return (
      <span className={`font-semibold ${colorClass}`}>
        {rate.toFixed(1)}%
      </span>
    );
  };

  /**
   * Format duration in human-readable format
   */
  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  /**
   * Get trend icon for error trends
   */
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'stable':
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  /**
   * Get alert severity styling
   */
  const getAlertSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 border-red-300 text-red-800';
      case 'high':
        return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'low':
        return 'bg-blue-100 border-blue-300 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  if (!metrics) {
    return (
      <div className={`p-6 ${className}`}>
        <div className="flex items-center justify-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>Loading navigation metrics...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Navigation Monitoring</h2>
        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value={15}>Last 15 minutes</option>
            <option value={60}>Last hour</option>
            <option value={240}>Last 4 hours</option>
            <option value={1440}>Last 24 hours</option>
          </select>
          
          {/* Refresh Button */}
          <button
            onClick={refreshMetrics}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Success Rate */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold">
                {formatSuccessRate(metrics.successRate)}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {metrics.successfulAttempts} of {metrics.totalAttempts} attempts
          </p>
        </div>

        {/* Average Response Time */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatDuration(metrics.averageNavigationTime)}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            P95: {formatDuration(metrics.performanceMetrics.p95)}
          </p>
        </div>

        {/* Total Attempts */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Attempts</p>
              <p className="text-2xl font-bold text-gray-900">
                {metrics.totalAttempts}
              </p>
            </div>
            <Activity className="h-8 w-8 text-gray-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {metrics.failedAttempts} failures
          </p>
        </div>

        {/* Active Alerts */}
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-red-600">
                {alerts.filter(a => !a.acknowledged).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {alerts.length} total alerts
          </p>
        </div>
      </div>

      {/* Performance Details */}
      {showPerformanceDetails && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">P50 (Median)</p>
              <p className="text-lg font-semibold">
                {formatDuration(metrics.performanceMetrics.p50)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">P90</p>
              <p className="text-lg font-semibold">
                {formatDuration(metrics.performanceMetrics.p90)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">P95</p>
              <p className="text-lg font-semibold">
                {formatDuration(metrics.performanceMetrics.p95)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">P99</p>
              <p className="text-lg font-semibold">
                {formatDuration(metrics.performanceMetrics.p99)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Breakdown */}
      {metrics.errorBreakdown.size > 0 && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Error Breakdown</h3>
          <div className="space-y-3">
            {Array.from(metrics.errorBreakdown.entries()).map(([errorType, count]) => {
              const trend = performanceSummary?.errorTrends.find(t => t.type === errorType);
              return (
                <div key={errorType} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">
                      {errorType.replace(/_/g, ' ').toUpperCase()}
                    </span>
                    {trend && getTrendIcon(trend.trend)}
                  </div>
                  <span className="text-sm font-semibold text-red-600">
                    {count} errors
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {performanceSummary?.recommendations && performanceSummary.recommendations.length > 0 && (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800 mb-4">Recommendations</h3>
          <ul className="space-y-2">
            {performanceSummary.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-yellow-700">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Alerts Section */}
      {showAlerts && alerts.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Alerts</h3>
            <button
              onClick={() => setShowAcknowledgedAlerts(!showAcknowledgedAlerts)}
              className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
            >
              {showAcknowledgedAlerts ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
              <span>
                {showAcknowledgedAlerts ? 'Hide acknowledged' : 'Show acknowledged'}
              </span>
            </button>
          </div>
          
          <div className="space-y-3">
            {alerts
              .filter(alert => showAcknowledgedAlerts || !alert.acknowledged)
              .map(alert => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertSeverityStyle(alert.severity)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium text-sm uppercase">
                          {alert.type.replace(/_/g, ' ')} - {alert.severity}
                        </span>
                        <span className="text-xs opacity-75">
                          {alert.timestamp.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{alert.message}</p>
                      
                      {/* Alert Details */}
                      {Object.keys(alert.details).length > 0 && (
                        <details className="mt-2">
                          <summary className="text-xs cursor-pointer opacity-75">
                            Technical Details
                          </summary>
                          <pre className="text-xs mt-1 opacity-75 font-mono">
                            {JSON.stringify(alert.details, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                    
                    {!alert.acknowledged && (
                      <button
                        onClick={() => acknowledgeAlert(alert.id)}
                        className="ml-4 px-3 py-1 text-xs bg-white bg-opacity-50 hover:bg-opacity-75 rounded transition-colors"
                      >
                        Acknowledge
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Time Range Info */}
      <div className="text-xs text-gray-500 text-center">
        Showing data from {metrics.timeRange.start.toLocaleString()} to {metrics.timeRange.end.toLocaleString()}
      </div>
    </div>
  );
};

export default NavigationMonitoringDashboard;