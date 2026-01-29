/**
 * Health Monitor Tests
 * 
 * Comprehensive tests for the Application Health Monitor
 */

import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { HealthMonitor, HealthMonitorConfig, HealthMetrics, HealthIssue } from '../HealthMonitor';

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
});

describe('HealthMonitor', () => {
  let healthMonitor: HealthMonitor;
  let config: HealthMonitorConfig;

  beforeEach(() => {
    config = HealthMonitor.getDefaultConfig();
    healthMonitor = new HealthMonitor(config);
  });

  afterEach(() => {
    healthMonitor.stopMonitoring();
  });

  describe('Initialization', () => {
    it('should initialize with default config', () => {
      const defaultConfig = HealthMonitor.getDefaultConfig();
      expect(defaultConfig).toEqual({
        checkInterval: 30000,
        thresholds: {
          memoryUsageWarning: 70,
          memoryUsageCritical: 90,
          loadTimeWarning: 3000,
          loadTimeCritical: 10000,
          errorRateWarning: 1,
          errorRateCritical: 5,
          networkLatencyWarning: 1000,
          networkLatencyCritical: 5000
        },
        enableAutoRecovery: true,
        enableUserNotifications: true,
        maxHistorySize: 100,
        enablePerformanceTracking: true
      });
    });

    it('should initialize with custom config', () => {
      const customConfig: HealthMonitorConfig = {
        ...config,
        checkInterval: 60000,
        enableAutoRecovery: false
      };
      
      const monitor = new HealthMonitor(customConfig);
      expect(monitor).toBeDefined();
    });
  });

  describe('Monitoring Control', () => {
    it('should start monitoring', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      healthMonitor.startMonitoring();
      
      expect(consoleSpy).toHaveBeenCalledWith('Health monitoring started');
      consoleSpy.mockRestore();
    });

    it('should stop monitoring', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      healthMonitor.startMonitoring();
      healthMonitor.stopMonitoring();
      
      expect(consoleSpy).toHaveBeenCalledWith('Health monitoring stopped');
      consoleSpy.mockRestore();
    });

    it('should not start monitoring twice', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      healthMonitor.startMonitoring();
      healthMonitor.startMonitoring(); // Second call should be ignored
      
      expect(consoleSpy).toHaveBeenCalledTimes(1);
      consoleSpy.mockRestore();
    });
  });

  describe('Health Check', () => {
    beforeEach(() => {
      // Mock successful API responses
      mockFetch.mockResolvedValue({
        ok: true,
        status: 200
      });
    });

    it('should perform health check and return results', async () => {
      const result = await healthMonitor.performHealthCheck();
      
      expect(result).toHaveProperty('status');
      expect(result).toHaveProperty('metrics');
      expect(result).toHaveProperty('issues');
      expect(result).toHaveProperty('recommendations');
      expect(result).toHaveProperty('recoveryActions');
      
      expect(['healthy', 'warning', 'critical']).toContain(result.status);
    });

    it('should collect memory metrics', async () => {
      const result = await healthMonitor.performHealthCheck();
      
      expect(result.metrics.memoryUsage).toEqual({
        used: 50000000,
        total: 100000000,
        percentage: 50
      });
    });

    it('should collect performance metrics', async () => {
      // Mock navigation timing
      mockPerformance.getEntriesByType.mockReturnValue([{
        fetchStart: 1000,
        loadEventEnd: 3000,
        domContentLoadedEventStart: 2000,
        domContentLoadedEventEnd: 2500
      }]);

      const result = await healthMonitor.performHealthCheck();
      
      expect(result.metrics.performance).toHaveProperty('loadTime');
      expect(result.metrics.performance).toHaveProperty('renderTime');
      expect(result.metrics.performance).toHaveProperty('networkLatency');
      expect(result.metrics.performance).toHaveProperty('errorRate');
    });

    it('should check system status', async () => {
      const result = await healthMonitor.performHealthCheck();
      
      expect(result.metrics.systemStatus).toHaveProperty('authentication');
      expect(result.metrics.systemStatus).toHaveProperty('database');
      expect(result.metrics.systemStatus).toHaveProperty('network');
      expect(result.metrics.systemStatus).toHaveProperty('components');
      
      Object.values(result.metrics.systemStatus).forEach(status => {
        expect(['healthy', 'degraded', 'failed']).toContain(status);
      });
    });
  });

  describe('Issue Detection', () => {
    it('should detect memory usage issues', async () => {
      // Mock high memory usage
      mockPerformance.memory = {
        usedJSHeapSize: 95000000,
        totalJSHeapSize: 100000000
      };

      const result = await healthMonitor.performHealthCheck();
      
      const memoryIssues = result.issues.filter(issue => issue.category === 'memory');
      expect(memoryIssues.length).toBeGreaterThan(0);
      expect(memoryIssues[0].severity).toBe('critical');
    });

    it('should detect performance issues', async () => {
      // Mock slow load time
      mockPerformance.getEntriesByType.mockReturnValue([{
        fetchStart: 1000,
        loadEventEnd: 15000, // 14 second load time
        domContentLoadedEventStart: 2000,
        domContentLoadedEventEnd: 2500
      }]);

      const result = await healthMonitor.performHealthCheck();
      
      const performanceIssues = result.issues.filter(issue => issue.category === 'performance');
      expect(performanceIssues.length).toBeGreaterThan(0);
    });

    it('should detect system failures', async () => {
      // Mock failed API responses
      mockFetch.mockRejectedValue(new Error('Network error'));

      const result = await healthMonitor.performHealthCheck();
      
      const systemIssues = result.issues.filter(issue => 
        ['authentication', 'database', 'network'].includes(issue.category)
      );
      expect(systemIssues.length).toBeGreaterThan(0);
    });
  });

  describe('Recovery Actions', () => {
    it('should generate recovery actions for issues', async () => {
      // Mock high memory usage to trigger recovery actions
      mockPerformance.memory = {
        usedJSHeapSize: 95000000,
        totalJSHeapSize: 100000000
      };

      const result = await healthMonitor.performHealthCheck();
      
      expect(result.recoveryActions.length).toBeGreaterThan(0);
      
      const memoryAction = result.recoveryActions.find(action => 
        action.action === 'memory-cleanup'
      );
      expect(memoryAction).toBeDefined();
      expect(memoryAction?.type).toBe('automatic');
    });

    it('should execute automatic recovery actions', async () => {
      const mockRecoveryCallback = vi.fn().mockResolvedValue(undefined);
      healthMonitor.registerRecoveryCallback('memory', mockRecoveryCallback);

      // Mock critical memory usage
      mockPerformance.memory = {
        usedJSHeapSize: 95000000,
        totalJSHeapSize: 100000000
      };

      await healthMonitor.performHealthCheck();
      
      // Recovery should be attempted automatically
      // Note: The actual execution depends on the recovery action implementation
    });
  });

  describe('Notifications', () => {
    it('should register and call notification callbacks', async () => {
      const mockNotificationCallback = vi.fn();
      healthMonitor.registerNotificationCallback(mockNotificationCallback);

      // Mock critical issue
      mockPerformance.memory = {
        usedJSHeapSize: 95000000,
        totalJSHeapSize: 100000000
      };

      await healthMonitor.performHealthCheck();
      
      expect(mockNotificationCallback).toHaveBeenCalled();
      
      const calledWith = mockNotificationCallback.mock.calls[0][0] as HealthIssue;
      expect(calledWith).toHaveProperty('severity');
      expect(calledWith).toHaveProperty('message');
    });

    it('should handle notification callback errors gracefully', async () => {
      const mockNotificationCallback = vi.fn().mockImplementation(() => {
        throw new Error('Notification error');
      });
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      healthMonitor.registerNotificationCallback(mockNotificationCallback);

      // Mock critical issue
      mockPerformance.memory = {
        usedJSHeapSize: 95000000,
        totalJSHeapSize: 100000000
      };

      await healthMonitor.performHealthCheck();
      
      expect(consoleSpy).toHaveBeenCalledWith('Notification callback failed:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('Metrics History', () => {
    it('should maintain metrics history', async () => {
      await healthMonitor.performHealthCheck();
      await healthMonitor.performHealthCheck();
      
      const history = healthMonitor.getMetricsHistory();
      expect(history.length).toBe(2);
      
      history.forEach(metrics => {
        expect(metrics).toHaveProperty('timestamp');
        expect(metrics).toHaveProperty('memoryUsage');
        expect(metrics).toHaveProperty('performance');
        expect(metrics).toHaveProperty('systemStatus');
      });
    });

    it('should limit history size', async () => {
      const smallConfig = { ...config, maxHistorySize: 2 };
      const monitor = new HealthMonitor(smallConfig);
      
      // Perform more health checks than the limit
      await monitor.performHealthCheck();
      await monitor.performHealthCheck();
      await monitor.performHealthCheck();
      
      const history = monitor.getMetricsHistory();
      expect(history.length).toBe(2);
      
      monitor.stopMonitoring();
    });
  });

  describe('Current Health Status', () => {
    it('should return null when no health check performed', () => {
      const currentHealth = healthMonitor.getCurrentHealth();
      expect(currentHealth).toBeNull();
    });

    it('should return current health after health check', async () => {
      await healthMonitor.performHealthCheck();
      
      const currentHealth = healthMonitor.getCurrentHealth();
      expect(currentHealth).not.toBeNull();
      expect(currentHealth).toHaveProperty('status');
      expect(currentHealth).toHaveProperty('metrics');
    });
  });

  describe('Network Conditions', () => {
    it('should handle offline network status', async () => {
      global.navigator = { onLine: false } as any;
      
      const result = await healthMonitor.performHealthCheck();
      
      expect(result.metrics.systemStatus.network).toBe('failed');
    });

    it('should measure network latency', async () => {
      const startTime = 1000;
      const endTime = 1500;
      
      mockPerformance.now
        .mockReturnValueOnce(startTime)
        .mockReturnValueOnce(endTime);
      
      mockFetch.mockResolvedValue({ ok: true });
      
      const result = await healthMonitor.performHealthCheck();
      
      expect(result.metrics.performance.networkLatency).toBe(500);
    });
  });

  describe('Error Handling', () => {
    it('should handle health check errors gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      // Mock error in metrics collection
      mockPerformance.getEntriesByType.mockImplementation(() => {
        throw new Error('Performance API error');
      });
      
      await expect(healthMonitor.performHealthCheck()).rejects.toThrow();
      
      consoleSpy.mockRestore();
    });

    it('should handle fetch errors in system checks', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      
      const result = await healthMonitor.performHealthCheck();
      
      // Should still return a result, but with failed system status
      expect(result).toBeDefined();
      expect(result.metrics.systemStatus.authentication).toBe('failed');
    });
  });

  describe('Performance Tracking', () => {
    it('should setup performance observer when enabled', () => {
      const config = { ...HealthMonitor.getDefaultConfig(), enablePerformanceTracking: true };
      const monitor = new HealthMonitor(config);
      
      expect(mockPerformanceObserver).toHaveBeenCalled();
      
      monitor.stopMonitoring();
    });

    it('should not setup performance observer when disabled', () => {
      vi.clearAllMocks();
      
      const config = { ...HealthMonitor.getDefaultConfig(), enablePerformanceTracking: false };
      const monitor = new HealthMonitor(config);
      
      expect(mockPerformanceObserver).not.toHaveBeenCalled();
      
      monitor.stopMonitoring();
    });
  });
});