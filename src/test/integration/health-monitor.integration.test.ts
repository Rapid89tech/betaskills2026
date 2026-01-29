/**
 * Health Monitor Integration Tests
 * 
 * End-to-end tests for the complete health monitoring system
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import React from 'react';
import { HealthMonitor } from '../../services/HealthMonitor';
import { HealthMonitorProvider, HealthStatusIndicator, CriticalIssueAlert } from '../../components/HealthMonitorProvider';
import HealthMonitorComponent from '../../components/HealthMonitor';

// Mock performance API
const mockPerformance = {
  now: vi.fn(() => Date.now()),
  getEntriesByType: vi.fn(() => []),
  memory: {
    usedJSHeapSize: 50000000,
    totalJSHeapSize: 100000000
  }
};

// Mock fetch
const mockFetch = vi.fn();

// Mock PerformanceObserver
const mockPerformanceObserver = vi.fn(() => ({
  observe: vi.fn(),
  disconnect: vi.fn()
}));

// Setup global mocks
beforeEach(() => {
  global.performance = mockPerformance as any;
  global.fetch = mockFetch;
  global.PerformanceObserver = mockPerformanceObserver as any;
  global.navigator = { onLine: true } as any;
  
  // Reset mocks
  vi.clearAllMocks();
  
  // Mock successful API responses by default
  mockFetch.mockResolvedValue({
    ok: true,
    status: 200
  });
});

describe('Health Monitor Integration', () => {
  describe('Complete System Integration', () => {
    it('should initialize and start monitoring automatically', async () => {
      const TestComponent = () => (
        <HealthMonitorProvider autoStart={true}>
          <HealthStatusIndicator />
        </HealthMonitorProvider>
      );

      render(<TestComponent />);

      // Should show loading initially
      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Wait for health check to complete
      await waitFor(() => {
        expect(screen.getByText(/Healthy/i)).toBeInTheDocument();
      }, { timeout: 5000 });
    });

    it('should detect and display critical issues', async () => {
      // Mock critical memory usage
      mockPerformance.memory = {
        usedJSHeapSize: 95000000,
        totalJSHeapSize: 100000000
      };

      const TestComponent = () => (
        <HealthMonitorProvider autoStart={true}>
          <HealthStatusIndicator />
          <CriticalIssueAlert />
        </HealthMonitorProvider>
      );

      render(<TestComponent />);

      // Wait for critical issue detection
      await waitFor(() => {
        expect(screen.getByText(/Critical System Issues Detected/i)).toBeInTheDocument();
      }, { timeout: 5000 });
    });

    it('should show health monitor component with details', async () => {
      const TestComponent = () => (
        <HealthMonitorProvider autoStart={true}>
          <HealthMonitorComponent showDetails={true} />
        </HealthMonitorProvider>
      );

      render(<TestComponent />);

      // Wait for health status to load
      await waitFor(() => {
        expect(screen.getByText(/System Health:/i)).toBeInTheDocument();
      });

      // Should show monitoring controls
      expect(screen.getByText(/Stop Monitoring/i)).toBeInTheDocument();
    });
  });

  describe('Error Recovery Integration', () => {
    it('should trigger automatic recovery for memory issues', async () => {
      // Mock critical memory usage
      mockPerformance.memory = {
        usedJSHeapSize: 95000000,
        totalJSHeapSize: 100000000
      };

      const healthMonitor = new HealthMonitor(HealthMonitor.getDefaultConfig());
      
      const result = await healthMonitor.performHealthCheck();
      
      // Should detect memory issue
      const memoryIssues = result.issues.filter(issue => issue.category === 'memory');
      expect(memoryIssues.length).toBeGreaterThan(0);
      
      // Should generate recovery actions
      const recoveryActions = result.recoveryActions.filter(action => 
        action.action === 'memory-cleanup'
      );
      expect(recoveryActions.length).toBeGreaterThan(0);
      
      healthMonitor.stopMonitoring();
    });

    it('should handle network failures gracefully', async () => {
      // Mock network failures
      mockFetch.mockRejectedValue(new Error('Network error'));
      global.navigator = { onLine: false } as any;

      const healthMonitor = new HealthMonitor(HealthMonitor.getDefaultConfig());
      
      const result = await healthMonitor.performHealthCheck();
      
      // Should detect network issues
      expect(result.metrics.systemStatus.network).toBe('failed');
      
      // Should provide recommendations
      expect(result.recommendations.some(rec => 
        rec.includes('network') || rec.includes('connection')
      )).toBe(true);
      
      healthMonitor.stopMonitoring();
    });
  });

  describe('Performance Monitoring Integration', () => {
    it('should track performance metrics over time', async () => {
      const healthMonitor = new HealthMonitor(HealthMonitor.getDefaultConfig());
      
      // Perform multiple health checks
      await healthMonitor.performHealthCheck();
      await healthMonitor.performHealthCheck();
      await healthMonitor.performHealthCheck();
      
      const history = healthMonitor.getMetricsHistory();
      expect(history.length).toBe(3);
      
      // Each entry should have complete metrics
      history.forEach(metrics => {
        expect(metrics).toHaveProperty('timestamp');
        expect(metrics).toHaveProperty('memoryUsage');
        expect(metrics).toHaveProperty('performance');
        expect(metrics).toHaveProperty('systemStatus');
        expect(metrics).toHaveProperty('userExperience');
      });
      
      healthMonitor.stopMonitoring();
    });

    it('should detect performance degradation trends', async () => {
      const healthMonitor = new HealthMonitor(HealthMonitor.getDefaultConfig());
      
      // Mock increasing load times
      let loadTime = 1000;
      mockPerformance.getEntriesByType.mockImplementation(() => [{
        fetchStart: 1000,
        loadEventEnd: 1000 + loadTime,
        domContentLoadedEventStart: 2000,
        domContentLoadedEventEnd: 2500
      }]);
      
      // Perform health checks with increasing load times
      await healthMonitor.performHealthCheck();
      
      loadTime = 5000; // Increase to warning level
      await healthMonitor.performHealthCheck();
      
      loadTime = 12000; // Increase to critical level
      const result = await healthMonitor.performHealthCheck();
      
      // Should detect performance issues
      const performanceIssues = result.issues.filter(issue => 
        issue.category === 'performance' && issue.message.includes('load time')
      );
      expect(performanceIssues.length).toBeGreaterThan(0);
      expect(performanceIssues[0].severity).toBe('high');
      
      healthMonitor.stopMonitoring();
    });
  });

  describe('User Notification Integration', () => {
    it('should notify users of critical issues through callbacks', async () => {
      const notificationCallback = vi.fn();
      
      const TestComponent = () => (
        <HealthMonitorProvider 
          autoStart={true}
          onCriticalIssue={notificationCallback}
        >
          <div>Test App</div>
        </HealthMonitorProvider>
      );

      // Mock critical memory usage
      mockPerformance.memory = {
        usedJSHeapSize: 95000000,
        totalJSHeapSize: 100000000
      };

      render(<TestComponent />);

      // Wait for notification callback
      await waitFor(() => {
        expect(notificationCallback).toHaveBeenCalled();
      }, { timeout: 5000 });

      const calledWith = notificationCallback.mock.calls[0][0];
      expect(calledWith).toHaveProperty('severity');
      expect(['critical', 'high']).toContain(calledWith.severity);
    });

    it('should display notifications in the UI', async () => {
      // Mock critical memory usage
      mockPerformance.memory = {
        usedJSHeapSize: 95000000,
        totalJSHeapSize: 100000000
      };

      const TestComponent = () => (
        <HealthMonitorProvider autoStart={true}>
          <HealthMonitorComponent showNotifications={true} />
        </HealthMonitorProvider>
      );

      render(<TestComponent />);

      // Wait for notifications to appear
      await waitFor(() => {
        expect(screen.getByText(/Health Notifications/i)).toBeInTheDocument();
      }, { timeout: 5000 });
    });
  });

  describe('System Status Integration', () => {
    it('should check all system components', async () => {
      const healthMonitor = new HealthMonitor(HealthMonitor.getDefaultConfig());
      
      const result = await healthMonitor.performHealthCheck();
      
      // Should check all system components
      expect(result.metrics.systemStatus).toHaveProperty('authentication');
      expect(result.metrics.systemStatus).toHaveProperty('database');
      expect(result.metrics.systemStatus).toHaveProperty('network');
      expect(result.metrics.systemStatus).toHaveProperty('components');
      
      // All should have valid status values
      Object.values(result.metrics.systemStatus).forEach(status => {
        expect(['healthy', 'degraded', 'failed']).toContain(status);
      });
      
      healthMonitor.stopMonitoring();
    });

    it('should handle mixed system status correctly', async () => {
      // Mock mixed system responses
      mockFetch
        .mockResolvedValueOnce({ ok: true, status: 200 }) // auth healthy
        .mockResolvedValueOnce({ ok: false, status: 500 }) // db failed
        .mockResolvedValueOnce({ ok: true, status: 200 }); // network healthy

      const healthMonitor = new HealthMonitor(HealthMonitor.getDefaultConfig());
      
      const result = await healthMonitor.performHealthCheck();
      
      // Should reflect mixed status
      expect(result.metrics.systemStatus.authentication).toBe('healthy');
      expect(result.metrics.systemStatus.database).toBe('failed');
      
      // Overall status should be critical due to database failure
      expect(result.status).toBe('critical');
      
      healthMonitor.stopMonitoring();
    });
  });

  describe('Configuration Integration', () => {
    it('should respect custom configuration', async () => {
      const customConfig = {
        checkInterval: 60000,
        thresholds: {
          memoryUsageWarning: 50,
          memoryUsageCritical: 80,
          loadTimeWarning: 2000,
          loadTimeCritical: 5000,
          errorRateWarning: 0.5,
          errorRateCritical: 2,
          networkLatencyWarning: 500,
          networkLatencyCritical: 2000
        },
        enableAutoRecovery: false,
        enableUserNotifications: false,
        maxHistorySize: 50,
        enablePerformanceTracking: false
      };

      const healthMonitor = new HealthMonitor(customConfig);
      
      // Mock memory usage that would trigger warning with custom thresholds
      mockPerformance.memory = {
        usedJSHeapSize: 60000000, // 60%
        totalJSHeapSize: 100000000
      };
      
      const result = await healthMonitor.performHealthCheck();
      
      // Should detect warning with custom threshold (50%)
      const memoryIssues = result.issues.filter(issue => issue.category === 'memory');
      expect(memoryIssues.length).toBeGreaterThan(0);
      expect(memoryIssues[0].severity).toBe('medium');
      
      healthMonitor.stopMonitoring();
    });
  });

  describe('Cleanup Integration', () => {
    it('should cleanup resources properly', async () => {
      const TestComponent = () => (
        <HealthMonitorProvider autoStart={true}>
          <HealthStatusIndicator />
        </HealthMonitorProvider>
      );

      const { unmount } = render(<TestComponent />);

      // Wait for initialization
      await waitFor(() => {
        expect(screen.getByText(/Healthy|Warning|Critical/i)).toBeInTheDocument();
      });

      // Unmount should not throw errors
      expect(() => unmount()).not.toThrow();
    });
  });
});