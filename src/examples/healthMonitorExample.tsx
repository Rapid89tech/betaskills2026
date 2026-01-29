/**
 * Health Monitor Integration Example
 * 
 * Example showing how to integrate the Health Monitor system
 * into a React application
 */

import React, { useState } from 'react';
import { HealthMonitorProvider, HealthStatusIndicator, CriticalIssueAlert } from '../components/HealthMonitorProvider';
import HealthMonitor from '../components/HealthMonitor';
import { useHealthMonitor, useHealthNotifications } from '../hooks/useHealthMonitor';
import { HealthIssue } from '../services/HealthMonitor';

/**
 * Main App Component with Health Monitoring
 */
export const AppWithHealthMonitoring: React.FC = () => {
  const [showHealthDetails, setShowHealthDetails] = useState(false);

  const handleCriticalIssue = (issue: HealthIssue) => {
    console.warn('Critical health issue detected:', issue);
    
    // You could also:
    // - Send to error reporting service
    // - Show user notification
    // - Trigger automatic recovery
    // - Log to analytics
  };

  return (
    <HealthMonitorProvider 
      autoStart={true}
      onCriticalIssue={handleCriticalIssue}
      config={{
        checkInterval: 30000, // Check every 30 seconds
        enableAutoRecovery: true,
        enableUserNotifications: true,
        thresholds: {
          memoryUsageWarning: 70,
          memoryUsageCritical: 90,
          loadTimeWarning: 3000,
          loadTimeCritical: 10000,
          errorRateWarning: 1,
          errorRateCritical: 5,
          networkLatencyWarning: 1000,
          networkLatencyCritical: 5000
        }
      }}
    >
      <div className="app">
        {/* Header with Health Status */}
        <header className="app-header">
          <h1>My Application</h1>
          <div className="health-status-container">
            <HealthStatusIndicator size="small" />
            <button 
              onClick={() => setShowHealthDetails(!showHealthDetails)}
              style={{ marginLeft: '8px', fontSize: '12px' }}
            >
              {showHealthDetails ? 'Hide' : 'Show'} Health Details
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="app-content">
          <h2>Application Content</h2>
          <p>Your application content goes here...</p>
          
          {/* Health Details Panel */}
          {showHealthDetails && (
            <div className="health-details-panel">
              <HealthMonitor showDetails={true} showNotifications={true} />
            </div>
          )}
        </main>

        {/* Critical Issue Alerts */}
        <CriticalIssueAlert autoHide={true} hideDelay={15000} />
      </div>
    </HealthMonitorProvider>
  );
};

/**
 * Custom Health Dashboard Component
 */
export const HealthDashboard: React.FC = () => {
  const { 
    healthStatus, 
    isMonitoring, 
    startMonitoring, 
    stopMonitoring,
    performHealthCheck 
  } = useHealthMonitor();

  const { notifications, clearAllNotifications } = useHealthNotifications();

  const handleManualHealthCheck = async () => {
    try {
      await performHealthCheck();
      console.log('Manual health check completed');
    } catch (error) {
      console.error('Manual health check failed:', error);
    }
  };

  return (
    <div className="health-dashboard">
      <h2>System Health Dashboard</h2>
      
      {/* Controls */}
      <div className="health-controls">
        <button 
          onClick={isMonitoring ? stopMonitoring : startMonitoring}
          style={{ 
            backgroundColor: isMonitoring ? '#ff6b6b' : '#51cf66',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            marginRight: '8px'
          }}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
        
        <button 
          onClick={handleManualHealthCheck}
          style={{ 
            backgroundColor: '#339af0',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px'
          }}
        >
          Run Health Check
        </button>
      </div>

      {/* Status Overview */}
      {healthStatus && (
        <div className="status-overview" style={{ marginTop: '16px' }}>
          <h3>Current Status: 
            <span style={{ 
              color: healthStatus.status === 'healthy' ? '#51cf66' : 
                     healthStatus.status === 'warning' ? '#ffa94d' : '#ff6b6b',
              marginLeft: '8px'
            }}>
              {healthStatus.status.toUpperCase()}
            </span>
          </h3>
          
          {/* Metrics Summary */}
          <div className="metrics-summary" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '16px' }}>
            <div className="metric-card">
              <h4>Memory Usage</h4>
              <p>{healthStatus.metrics.memoryUsage.percentage.toFixed(1)}%</p>
            </div>
            
            <div className="metric-card">
              <h4>Load Time</h4>
              <p>{healthStatus.metrics.performance.loadTime}ms</p>
            </div>
            
            <div className="metric-card">
              <h4>Network Latency</h4>
              <p>{healthStatus.metrics.performance.networkLatency}ms</p>
            </div>
            
            <div className="metric-card">
              <h4>Error Rate</h4>
              <p>{healthStatus.metrics.performance.errorRate.toFixed(2)}%</p>
            </div>
          </div>

          {/* Issues */}
          {healthStatus.issues.length > 0 && (
            <div className="issues-section" style={{ marginTop: '16px' }}>
              <h4>Current Issues ({healthStatus.issues.length})</h4>
              {healthStatus.issues.map((issue, index) => (
                <div 
                  key={index} 
                  className="issue-item"
                  style={{ 
                    padding: '8px',
                    margin: '4px 0',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: issue.severity === 'critical' ? '#ffe0e0' : 
                                   issue.severity === 'high' ? '#fff0e0' : '#f0f8ff'
                  }}
                >
                  <strong>{issue.severity.toUpperCase()}</strong>: {issue.message}
                  <br />
                  <small>{issue.details}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="notifications-section" style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>Recent Notifications ({notifications.length})</h4>
            <button 
              onClick={clearAllNotifications}
              style={{ 
                backgroundColor: '#868e96',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              Clear All
            </button>
          </div>
          
          {notifications.slice(-5).map((notification, index) => (
            <div 
              key={index}
              style={{ 
                padding: '8px',
                margin: '4px 0',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: '#f8f9fa'
              }}
            >
              <strong>{notification.message}</strong>
              <br />
              <small>{new Date(notification.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Minimal Health Status Component
 */
export const MinimalHealthStatus: React.FC = () => {
  return (
    <HealthMonitorProvider autoStart={true}>
      <div style={{ 
        position: 'fixed', 
        bottom: '20px', 
        right: '20px',
        padding: '8px 12px',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 1000
      }}>
        <HealthStatusIndicator size="small" showText={true} />
      </div>
    </HealthMonitorProvider>
  );
};

/**
 * Health Monitor with Custom Recovery
 */
export const HealthMonitorWithRecovery: React.FC = () => {
  const { registerRecoveryCallback } = useHealthMonitor();

  React.useEffect(() => {
    // Register custom recovery callbacks
    registerRecoveryCallback('memory', async () => {
      console.log('Executing memory cleanup...');
      // Custom memory cleanup logic
      // e.g., clear caches, remove unused objects, etc.
    });

    registerRecoveryCallback('network', async () => {
      console.log('Attempting network recovery...');
      // Custom network recovery logic
      // e.g., retry failed requests, switch endpoints, etc.
    });

    registerRecoveryCallback('authentication', async () => {
      console.log('Refreshing authentication...');
      // Custom auth recovery logic
      // e.g., refresh tokens, re-authenticate, etc.
    });
  }, [registerRecoveryCallback]);

  return (
    <div>
      <h2>Application with Custom Recovery</h2>
      <p>This application has custom recovery callbacks registered.</p>
      <HealthMonitor showDetails={true} />
    </div>
  );
};

/**
 * Usage Examples
 */
export const UsageExamples = {
  // Basic integration
  basic: () => (
    <HealthMonitorProvider>
      <div>Your App Content</div>
    </HealthMonitorProvider>
  ),

  // With status indicator
  withIndicator: () => (
    <HealthMonitorProvider>
      <header>
        <h1>My App</h1>
        <HealthStatusIndicator />
      </header>
      <main>Your App Content</main>
    </HealthMonitorProvider>
  ),

  // With full dashboard
  withDashboard: () => (
    <HealthMonitorProvider>
      <div>
        <HealthDashboard />
        <div>Your App Content</div>
      </div>
    </HealthMonitorProvider>
  ),

  // Minimal floating status
  minimal: () => (
    <>
      <div>Your App Content</div>
      <MinimalHealthStatus />
    </>
  )
};

export default AppWithHealthMonitoring;