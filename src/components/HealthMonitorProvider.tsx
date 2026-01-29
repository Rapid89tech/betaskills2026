/**
 * Health Monitor Provider
 * 
 * Provides global health monitoring context to the application
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { HealthMonitor, HealthCheckResult, HealthIssue, HealthMonitorConfig } from '../services/HealthMonitor';

interface HealthMonitorContextType {
  healthMonitor: HealthMonitor | null;
  healthStatus: HealthCheckResult | null;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  performHealthCheck: () => Promise<HealthCheckResult>;
  registerRecoveryCallback: (issueType: string, callback: () => Promise<void>) => void;
}

const HealthMonitorContext = createContext<HealthMonitorContextType | null>(null);

interface HealthMonitorProviderProps {
  children: React.ReactNode;
  config?: Partial<HealthMonitorConfig>;
  autoStart?: boolean;
  onHealthChange?: (result: HealthCheckResult) => void;
  onCriticalIssue?: (issue: HealthIssue) => void;
}

export const HealthMonitorProvider: React.FC<HealthMonitorProviderProps> = ({
  children,
  config = {},
  autoStart = true,
  onHealthChange,
  onCriticalIssue
}) => {
  const [healthMonitor, setHealthMonitor] = useState<HealthMonitor | null>(null);
  const [healthStatus, setHealthStatus] = useState<HealthCheckResult | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);

  // Initialize health monitor
  useEffect(() => {
    const defaultConfig = HealthMonitor.getDefaultConfig();
    const mergedConfig = { ...defaultConfig, ...config };
    
    const monitor = new HealthMonitor(mergedConfig);
    
    // Register notification callback for critical issues
    if (onCriticalIssue) {
      monitor.registerNotificationCallback((issue) => {
        if (issue.severity === 'critical' || issue.severity === 'high') {
          onCriticalIssue(issue);
        }
      });
    }

    setHealthMonitor(monitor);

    return () => {
      monitor.stopMonitoring();
    };
  }, [config, onCriticalIssue]);

  // Auto-start monitoring
  useEffect(() => {
    if (autoStart && healthMonitor && !isMonitoring) {
      startMonitoring();
    }
  }, [autoStart, healthMonitor]);

  // Start monitoring
  const startMonitoring = () => {
    if (!healthMonitor || isMonitoring) return;

    healthMonitor.startMonitoring();
    setIsMonitoring(true);

    // Set up periodic health status updates
    const updateInterval = setInterval(async () => {
      try {
        const result = await healthMonitor.performHealthCheck();
        setHealthStatus(result);
        
        if (onHealthChange) {
          onHealthChange(result);
        }
      } catch (error) {
        console.error('Health check failed:', error);
      }
    }, 10000); // Update every 10 seconds

    // Store interval for cleanup
    (healthMonitor as any)._updateInterval = updateInterval;

    // Perform initial health check
    performHealthCheck();
  };

  // Stop monitoring
  const stopMonitoring = () => {
    if (!healthMonitor || !isMonitoring) return;

    healthMonitor.stopMonitoring();
    setIsMonitoring(false);

    // Clear update interval
    if ((healthMonitor as any)._updateInterval) {
      clearInterval((healthMonitor as any)._updateInterval);
      delete (healthMonitor as any)._updateInterval;
    }
  };

  // Perform health check
  const performHealthCheck = async (): Promise<HealthCheckResult> => {
    if (!healthMonitor) {
      throw new Error('Health monitor not initialized');
    }

    const result = await healthMonitor.performHealthCheck();
    setHealthStatus(result);
    
    if (onHealthChange) {
      onHealthChange(result);
    }
    
    return result;
  };

  // Register recovery callback
  const registerRecoveryCallback = (issueType: string, callback: () => Promise<void>) => {
    if (healthMonitor) {
      healthMonitor.registerRecoveryCallback(issueType, callback);
    }
  };

  const contextValue: HealthMonitorContextType = {
    healthMonitor,
    healthStatus,
    isMonitoring,
    startMonitoring,
    stopMonitoring,
    performHealthCheck,
    registerRecoveryCallback
  };

  return (
    <HealthMonitorContext.Provider value={contextValue}>
      {children}
    </HealthMonitorContext.Provider>
  );
};

export const useHealthMonitorContext = (): HealthMonitorContextType => {
  const context = useContext(HealthMonitorContext);
  if (!context) {
    throw new Error('useHealthMonitorContext must be used within a HealthMonitorProvider');
  }
  return context;
};

/**
 * Health Status Indicator Component
 * 
 * Simple component to show health status in the UI
 */
export const HealthStatusIndicator: React.FC<{ 
  className?: string;
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}> = ({ 
  className = '', 
  showText = true,
  size = 'medium'
}) => {
  const { healthStatus } = useHealthMonitorContext();

  if (!healthStatus) {
    return (
      <div className={`health-indicator loading ${size} ${className}`}>
        <span className="indicator-dot" style={{ backgroundColor: '#gray' }}>?</span>
        {showText && <span>Loading...</span>}
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#51cf66';
      case 'warning': return '#ffa94d';
      case 'critical': return '#ff6b6b';
      default: return '#868e96';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return '●';
      case 'warning': return '●';
      case 'critical': return '●';
      default: return '●';
    }
  };

  const getSizeStyle = (size: string) => {
    switch (size) {
      case 'small': return { fontSize: '12px', padding: '2px 4px' };
      case 'large': return { fontSize: '18px', padding: '8px 12px' };
      default: return { fontSize: '14px', padding: '4px 8px' };
    }
  };

  return (
    <div 
      className={`health-indicator ${size} ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        ...getSizeStyle(size)
      }}
    >
      <span 
        className="indicator-dot"
        style={{ 
          color: getStatusColor(healthStatus.status),
          fontSize: size === 'small' ? '8px' : size === 'large' ? '16px' : '12px'
        }}
      >
        {getStatusIcon(healthStatus.status)}
      </span>
      {showText && (
        <span style={{ fontSize: size === 'small' ? '11px' : size === 'large' ? '16px' : '13px' }}>
          {healthStatus.status.charAt(0).toUpperCase() + healthStatus.status.slice(1)}
        </span>
      )}
    </div>
  );
};

/**
 * Critical Issue Alert Component
 * 
 * Shows alerts for critical health issues
 */
export const CriticalIssueAlert: React.FC<{
  onDismiss?: () => void;
  autoHide?: boolean;
  hideDelay?: number;
}> = ({
  onDismiss,
  autoHide = false,
  hideDelay = 10000
}) => {
  const { healthStatus } = useHealthMonitorContext();
  const [isVisible, setIsVisible] = useState(true);

  const criticalIssues = healthStatus?.issues.filter(
    issue => issue.severity === 'critical' || issue.severity === 'high'
  ) || [];

  // Auto-hide functionality
  useEffect(() => {
    if (autoHide && criticalIssues.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onDismiss) onDismiss();
      }, hideDelay);

      return () => clearTimeout(timer);
    }
  }, [autoHide, hideDelay, criticalIssues.length, onDismiss]);

  if (!isVisible || criticalIssues.length === 0) {
    return null;
  }

  return (
    <div 
      className="critical-issue-alert"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        backgroundColor: '#ff6b6b',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 1000,
        maxWidth: '400px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
            ⚠ Critical System Issues Detected
          </div>
          {criticalIssues.slice(0, 3).map((issue, index) => (
            <div key={index} style={{ fontSize: '13px', marginBottom: '2px' }}>
              • {issue.message}
            </div>
          ))}
          {criticalIssues.length > 3 && (
            <div style={{ fontSize: '12px', fontStyle: 'italic' }}>
              +{criticalIssues.length - 3} more issues
            </div>
          )}
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            if (onDismiss) onDismiss();
          }}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            fontSize: '18px', 
            cursor: 'pointer',
            padding: '0',
            marginLeft: '8px'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default HealthMonitorProvider;