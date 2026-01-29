/**
 * Health Monitor Hooks Tests
 * 
 * Tests for React hooks related to health monitoring
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHealthMonitor, useHealthMetrics, useHealthNotifications } from '../useHealthMonitor';
import { HealthMonitor } from '../../services/HealthMonitor';

// Mock the HealthMonitor service
vi.mock('../../services/HealthMonitor');

const MockedHealthMonitor = HealthMonitor as any;

describe('useHealthMonitor', () => {
  let mockHealthMonitor: any;

  beforeEach(() => {
    mockHealthMonitor = {
      startMonitoring: vi.fn(),
      stopMonitoring: vi.fn(),
      performHealthCheck: vi.fn(),
      getMetricsHistory: vi.fn(() => []),
      registerRecoveryCallback: vi.fn(),
      registerNotificationCallback: vi.fn()
    };

    MockedHealthMonitor.mockImplementation(() => mockHealthMonitor);
    MockedHealthMonitor.getDefaultConfig = vi.fn(() => ({
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
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Functionality', () => {
    it('should initialize health monitor', () => {
      const { result } = renderHook(() => useHealthMonitor());
      
      expect(MockedHealthMonitor).toHaveBeenCalled();
      expect(result.current.healthStatus).toBeNull();
      expect(result.current.isMonitoring).toBe(false);
    });

    it('should auto-start monitoring when enabled', () => {
      renderHook(() => useHealthMonitor({ autoStart: true }));
      
      expect(mockHealthMonitor.startMonitoring).toHaveBeenCalled();
    });

    it('should not auto-start monitoring when disabled', () => {
      renderHook(() => useHealthMonitor({ autoStart: false }));
      
      expect(mockHealthMonitor.startMonitoring).not.toHaveBeenCalled();
    });
  });

  describe('Monitoring Control', () => {
    it('should start monitoring', () => {
      const { result } = renderHook(() => useHealthMonitor({ autoStart: false }));
      
      act(() => {
        result.current.startMonitoring();
      });
      
      expect(mockHealthMonitor.startMonitoring).toHaveBeenCalled();
      expect(result.current.isMonitoring).toBe(true);
    });

    it('should stop monitoring', () => {
      const { result } = renderHook(() => useHealthMonitor({ autoStart: false }));
      
      act(() => {
        result.current.startMonitoring();
      });
      
      act(() => {
        result.current.stopMonitoring();
      });
      
      expect(mockHealthMonitor.stopMonitoring).toHaveBeenCalled();
      expect(result.current.isMonitoring).toBe(false);
    });

    it('should not start monitoring if already monitoring', () => {
      const { result } = renderHook(() => useHealthMonitor({ autoStart: false }));
      
      act(() => {
        result.current.startMonitoring();
      });
      
      vi.clearAllMocks();
      
      act(() => {
        result.current.startMonitoring();
      });
      
      expect(mockHealthMonitor.startMonitoring).not.toHaveBeenCalled();
    });
  });

  describe('Health Check', () => {
    it('should perform health check', async () => {
      const mockResult = {
        status: 'healthy' as const,
        metrics: {
          timestamp: Date.now(),
          memoryUsage: { used: 50000000, total: 100000000, percentage: 50 },
          performance: { loadTime: 1000, renderTime: 500, networkLatency: 100, errorRate: 0.1 },
          systemStatus: { authentication: 'healthy' as const, database: 'healthy' as const, network: 'healthy' as const, components: 'healthy' as const },
          userExperience: { pageLoadSuccess: 95, formSubmissionSuccess: 98, navigationSuccess: 99, errorCount: 2 }
        },
        issues: [],
        recommendations: [],
        recoveryActions: []
      };
      
      mockHealthMonitor.performHealthCheck.mockResolvedValue(mockResult);
      
      const { result } = renderHook(() => useHealthMonitor({ autoStart: false }));
      
      let healthCheckResult;
      await act(async () => {
        healthCheckResult = await result.current.performHealthCheck();
      });
      
      expect(mockHealthMonitor.performHealthCheck).toHaveBeenCalled();
      expect(healthCheckResult).toEqual(mockResult);
      expect(result.current.healthStatus).toEqual(mockResult);
    });

    it('should handle health check errors', async () => {
      const error = new Error('Health check failed');
      mockHealthMonitor.performHealthCheck.mockRejectedValue(error);
      
      const { result } = renderHook(() => useHealthMonitor({ autoStart: false }));
      
      await act(async () => {
        await expect(result.current.performHealthCheck()).rejects.toThrow('Health check failed');
      });
    });
  });

  describe('Callbacks', () => {
    it('should call onHealthChange callback', async () => {
      const onHealthChange = vi.fn();
      const mockResult = {
        status: 'healthy' as const,
        metrics: {} as any,
        issues: [],
        recommendations: [],
        recoveryActions: []
      };
      
      mockHealthMonitor.performHealthCheck.mockResolvedValue(mockResult);
      
      const { result } = renderHook(() => useHealthMonitor({ 
        autoStart: false,
        onHealthChange 
      }));
      
      await act(async () => {
        await result.current.performHealthCheck();
      });
      
      expect(onHealthChange).toHaveBeenCalledWith(mockResult);
    });

    it('should register issue detection callback', () => {
      const onIssueDetected = vi.fn();
      
      renderHook(() => useHealthMonitor({ 
        autoStart: false,
        onIssueDetected 
      }));
      
      expect(mockHealthMonitor.registerNotificationCallback).toHaveBeenCalledWith(onIssueDetected);
    });

    it('should register recovery callback', () => {
      const { result } = renderHook(() => useHealthMonitor({ autoStart: false }));
      const recoveryCallback = vi.fn();
      
      act(() => {
        result.current.registerRecoveryCallback('memory', recoveryCallback);
      });
      
      expect(mockHealthMonitor.registerRecoveryCallback).toHaveBeenCalledWith('memory', recoveryCallback);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup on unmount', () => {
      const { unmount } = renderHook(() => useHealthMonitor());
      
      unmount();
      
      expect(mockHealthMonitor.stopMonitoring).toHaveBeenCalled();
    });
  });
});

describe('useHealthMetrics', () => {
  let mockHealthMonitor: any;

  beforeEach(() => {
    mockHealthMonitor = {
      startMonitoring: vi.fn(),
      stopMonitoring: vi.fn(),
      performHealthCheck: vi.fn(),
      getMetricsHistory: vi.fn(() => []),
      registerRecoveryCallback: vi.fn(),
      registerNotificationCallback: vi.fn()
    };

    MockedHealthMonitor.mockImplementation(() => mockHealthMonitor);
  });

  it('should return current metrics', () => {
    const mockMetrics = {
      timestamp: Date.now(),
      memoryUsage: { used: 50000000, total: 100000000, percentage: 50 },
      performance: { loadTime: 1000, renderTime: 500, networkLatency: 100, errorRate: 0.1 },
      systemStatus: { authentication: 'healthy' as const, database: 'healthy' as const, network: 'healthy' as const, components: 'healthy' as const },
      userExperience: { pageLoadSuccess: 95, formSubmissionSuccess: 98, navigationSuccess: 99, errorCount: 2 }
    };

    const mockResult = {
      status: 'healthy' as const,
      metrics: mockMetrics,
      issues: [],
      recommendations: [],
      recoveryActions: []
    };

    mockHealthMonitor.performHealthCheck.mockResolvedValue(mockResult);

    const { result } = renderHook(() => {
      const healthMonitor = useHealthMonitor({ autoStart: false });
      return useHealthMetrics();
    });

    expect(result.current.currentMetrics).toBeNull();
  });

  it('should calculate metric trends', () => {
    const mockHistory = [
      { memoryUsage: { percentage: 50 } },
      { memoryUsage: { percentage: 55 } },
      { memoryUsage: { percentage: 60 } },
      { memoryUsage: { percentage: 65 } },
      { memoryUsage: { percentage: 70 } }
    ];

    mockHealthMonitor.getMetricsHistory.mockReturnValue(mockHistory);

    const { result } = renderHook(() => useHealthMetrics());

    const trend = result.current.getMetricTrend('memoryUsage.percentage');
    expect(trend).toBe('increasing');
  });

  it('should calculate average metrics', () => {
    const mockHistory = [
      { memoryUsage: { percentage: 50 } },
      { memoryUsage: { percentage: 60 } },
      { memoryUsage: { percentage: 70 } }
    ];

    mockHealthMonitor.getMetricsHistory.mockReturnValue(mockHistory);

    const { result } = renderHook(() => useHealthMetrics());

    const average = result.current.getAverageMetric('memoryUsage.percentage');
    expect(average).toBe(60);
  });
});

describe('useHealthNotifications', () => {
  let mockHealthMonitor: any;

  beforeEach(() => {
    mockHealthMonitor = {
      startMonitoring: vi.fn(),
      stopMonitoring: vi.fn(),
      performHealthCheck: vi.fn(),
      getMetricsHistory: vi.fn(() => []),
      registerRecoveryCallback: vi.fn(),
      registerNotificationCallback: vi.fn()
    };

    MockedHealthMonitor.mockImplementation(() => mockHealthMonitor);
  });

  it('should manage notifications', () => {
    const { result } = renderHook(() => useHealthNotifications());

    expect(result.current.notifications).toEqual([]);
    expect(typeof result.current.clearNotification).toBe('function');
    expect(typeof result.current.clearAllNotifications).toBe('function');
  });

  it('should add notifications', () => {
    let notificationCallback: any;
    mockHealthMonitor.registerNotificationCallback.mockImplementation((callback: any) => {
      notificationCallback = callback;
    });

    const { result } = renderHook(() => useHealthNotifications());

    const mockIssue = {
      severity: 'critical' as const,
      category: 'memory' as const,
      message: 'High memory usage',
      details: 'Memory usage at 95%',
      timestamp: Date.now(),
      affectedFeatures: ['Performance']
    };

    act(() => {
      notificationCallback(mockIssue);
    });

    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0]).toEqual(mockIssue);
  });

  it('should clear individual notifications', () => {
    let notificationCallback: any;
    mockHealthMonitor.registerNotificationCallback.mockImplementation((callback: any) => {
      notificationCallback = callback;
    });

    const { result } = renderHook(() => useHealthNotifications());

    const mockIssue = {
      severity: 'critical' as const,
      category: 'memory' as const,
      message: 'High memory usage',
      details: 'Memory usage at 95%',
      timestamp: Date.now(),
      affectedFeatures: ['Performance']
    };

    act(() => {
      notificationCallback(mockIssue);
    });

    act(() => {
      result.current.clearNotification(0);
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it('should clear all notifications', () => {
    let notificationCallback: any;
    mockHealthMonitor.registerNotificationCallback.mockImplementation((callback: any) => {
      notificationCallback = callback;
    });

    const { result } = renderHook(() => useHealthNotifications());

    const mockIssue1 = {
      severity: 'critical' as const,
      category: 'memory' as const,
      message: 'High memory usage',
      details: 'Memory usage at 95%',
      timestamp: Date.now(),
      affectedFeatures: ['Performance']
    };

    const mockIssue2 = {
      severity: 'high' as const,
      category: 'network' as const,
      message: 'Network latency',
      details: 'High network latency detected',
      timestamp: Date.now(),
      affectedFeatures: ['Network']
    };

    act(() => {
      notificationCallback(mockIssue1);
      notificationCallback(mockIssue2);
    });

    expect(result.current.notifications).toHaveLength(2);

    act(() => {
      result.current.clearAllNotifications();
    });

    expect(result.current.notifications).toHaveLength(0);
  });

  it('should prevent duplicate notifications', () => {
    let notificationCallback: any;
    mockHealthMonitor.registerNotificationCallback.mockImplementation((callback: any) => {
      notificationCallback = callback;
    });

    const { result } = renderHook(() => useHealthNotifications());

    const mockIssue = {
      severity: 'critical' as const,
      category: 'memory' as const,
      message: 'High memory usage',
      details: 'Memory usage at 95%',
      timestamp: Date.now(),
      affectedFeatures: ['Performance']
    };

    act(() => {
      notificationCallback(mockIssue);
      notificationCallback(mockIssue); // Duplicate
    });

    expect(result.current.notifications).toHaveLength(1);
  });
});