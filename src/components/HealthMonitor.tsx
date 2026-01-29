/**
 * Health Monitor Component
 * 
 * Displays application health status and metrics
 */

import React, { useState } from 'react';
import { useHealthMonitor, useHealthMetrics, useHealthNotifications } from '../hooks/useHealthMonitor';
import { HealthCheckResult, HealthIssue } from '../services/HealthMonitor';

interface HealthMonitorProps {
  showDetails?: boolean;
  showNotifications?: boolean;
  className?: string;
}

export const HealthMonitor: React.FC<HealthMonitorProps> = ({
  showDetails = false,
  showNotifications = true,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { healthStatus, isMonitoring, startMonitoring, stopMonitoring } = useHealthMonitor();
  const { currentMetrics, getMetricTrend } = useHealthMetrics();
  const { notifications, clearNotification, clearAllNotifications } = useHealthNotifications();

  if (!healthStatus) {
    return (
      <div className={`health-monitor loading ${className}`}>
        <div className="health-status">
          <span className="status-indicator unknown">?</span>
          <span>Initializing health monitor...</span>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'green';
      case 'warning': return 'orange';
      case 'critical': return 'red';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return '✓';
      case 'warning': return '⚠';
      case 'critical': return '✗';
      default: return '?';
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms.toFixed(0)}ms`;
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className={`health-monitor ${className}`}>
      {/* Main Status Display */}
      <div 
        className="health-status"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        <span 
          className="status-indicator"
          style={{ 
            color: getStatusColor(healthStatus.status),
            fontSize: '16px',
            marginRight: '8px'
          }}
        >
          {getStatusIcon(healthStatus.status)}
        </span>
        <span className="status-text">
          System Health: {healthStatus.status.charAt(0).toUpperCase() + healthStatus.status.slice(1)}
        </span>
        <span className="expand-icon" style={{ marginLeft: '8px' }}>
          {isExpanded ? '▼' : '▶'}
        </span>
      </div>

      {/* Monitoring Controls */}
      <div className="monitoring-controls" style={{ marginTop: '8px' }}>
        {isMonitoring ? (
          <button 
            onClick={stopMonitoring}
            style={{ 
              padding: '4px 8px', 
              backgroundColor: '#ff6b6b', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '12px'
            }}
          >
            Stop Monitoring
          </button>
        ) : (
          <button 
            onClick={startMonitoring}
            style={{ 
              padding: '4px 8px', 
              backgroundColor: '#51cf66', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              fontSize: '12px'
            }}
          >
            Start Monitoring
          </button>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="health-details" style={{ marginTop: '16px' }}>
          {/* Quick Metrics */}
          {currentMetrics && (
            <div className="quick-metrics" style={{ marginBottom: '16px' }}>
              <h4>Current Metrics</h4>
              <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div className="metric">
                  <span className="metric-label">Memory Usage:</span>
                  <span className="metric-value">
                    {currentMetrics.memoryUsage.percentage.toFixed(1)}%
                    <span className="trend">{getMetricTrend('memoryUsage.percentage')}</span>
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Load Time:</span>
                  <span className="metric-value">
                    {formatTime(currentMetrics.performance.loadTime)}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Network Latency:</span>
                  <span className="metric-value">
                    {formatTime(currentMetrics.performance.networkLatency)}
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Error Rate:</span>
                  <span className="metric-value">
                    {currentMetrics.performance.errorRate.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* System Status */}
          {currentMetrics && (
            <div className="system-status" style={{ marginBottom: '16px' }}>
              <h4>System Status</h4>
              <div className="status-grid">
                {Object.entries(currentMetrics.systemStatus).map(([system, status]) => (
                  <div key={system} className="system-item" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>{system.charAt(0).toUpperCase() + system.slice(1)}:</span>
                    <span style={{ color: getStatusColor(status) }}>
                      {getStatusIcon(status)} {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Issues */}
          {healthStatus.issues.length > 0 && (
            <div className="current-issues" style={{ marginBottom: '16px' }}>
              <h4>Current Issues ({healthStatus.issues.length})</h4>
              {healthStatus.issues.map((issue, index) => (
                <IssueCard key={index} issue={issue} />
              ))}
            </div>
          )}

          {/* Recommendations */}
          {healthStatus.recommendations.length > 0 && (
            <div className="recommendations" style={{ marginBottom: '16px' }}>
              <h4>Recommendations</h4>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {healthStatus.recommendations.map((rec, index) => (
                  <li key={index} style={{ marginBottom: '4px', fontSize: '14px' }}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Notifications */}
      {showNotifications && notifications.length > 0 && (
        <div className="health-notifications" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4>Health Notifications ({notifications.length})</h4>
            <button 
              onClick={clearAllNotifications}
              style={{ 
                padding: '2px 6px', 
                fontSize: '12px', 
                backgroundColor: '#868e96', 
                color: 'white', 
                border: 'none', 
                borderRadius: '3px' 
              }}
            >
              Clear All
            </button>
          </div>
          {notifications.slice(-5).map((notification, index) => (
            <NotificationCard 
              key={index} 
              notification={notification} 
              onDismiss={() => clearNotification(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface IssueCardProps {
  issue: HealthIssue;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff6b6b';
      case 'high': return '#ff8787';
      case 'medium': return '#ffa94d';
      case 'low': return '#69db7c';
      default: return '#868e96';
    }
  };

  return (
    <div 
      className="issue-card" 
      style={{ 
        border: `1px solid ${getSeverityColor(issue.severity)}`,
        borderRadius: '4px',
        padding: '8px',
        marginBottom: '8px',
        backgroundColor: `${getSeverityColor(issue.severity)}10`
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 'bold', color: getSeverityColor(issue.severity) }}>
            {issue.severity.toUpperCase()} - {issue.message}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            {issue.details}
          </div>
          {issue.affectedFeatures.length > 0 && (
            <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
              Affected: {issue.affectedFeatures.join(', ')}
            </div>
          )}
        </div>
        <div style={{ fontSize: '11px', color: '#999' }}>
          {new Date(issue.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

interface NotificationCardProps {
  notification: HealthIssue;
  onDismiss: () => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onDismiss }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff6b6b';
      case 'high': return '#ff8787';
      case 'medium': return '#ffa94d';
      case 'low': return '#69db7c';
      default: return '#868e96';
    }
  };

  return (
    <div 
      className="notification-card"
      style={{
        border: `1px solid ${getSeverityColor(notification.severity)}`,
        borderRadius: '4px',
        padding: '8px',
        marginBottom: '4px',
        backgroundColor: `${getSeverityColor(notification.severity)}15`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div>
        <div style={{ fontWeight: 'bold', fontSize: '13px' }}>
          {notification.message}
        </div>
        <div style={{ fontSize: '11px', color: '#666' }}>
          {new Date(notification.timestamp).toLocaleTimeString()}
        </div>
      </div>
      <button 
        onClick={onDismiss}
        style={{ 
          background: 'none', 
          border: 'none', 
          fontSize: '16px', 
          cursor: 'pointer',
          color: '#999'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default HealthMonitor;