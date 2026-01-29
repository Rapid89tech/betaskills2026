/**
 * Configuration Health Monitor Tests
 * 
 * Comprehensive tests for the configuration health monitoring system
 */

import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { ConfigurationHealthMonitor } from '../ConfigurationHealthMonitor';
import { productionValidator } from '../ProductionValidator';

// Mock the ProductionValidator
vi.mock('../ProductionValidator', () => ({
  productionValidator: {
    getConfigurationHealth: vi.fn(),
    validateProductionReadiness: vi.fn()
  }
}));

describe('ConfigurationHealthMonitor', () => {
  let monitor: ConfigurationHealthMonitor;
  let mockGetConfigurationHealth: Mock;
  let mockValidateProductionReadiness: Mock;

  beforeEach(() => {
    monitor = ConfigurationHealthMonitor.getInstance();
    mockGetConfigurationHealth = productionValidator.getConfigurationHealth as Mock;
    mockValidateProductionReadiness = productionValidator.validateProductionReadiness as Mock;
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Stop any running monitoring
    monitor.stop();
    
    // Clear alerts
    monitor.clearOldAlerts();
  });

  afterEach(() => {
    monitor.stop();
    vi.clearAllTimers();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = ConfigurationHealthMonitor.getInstance();
      const instance2 = ConfigurationHealthMonitor.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Monitoring Control', () => {
    it('should start monitoring successfully', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      mockGetConfigurationHealth.mockReturnValue({
        overallHealth: { healthy: true, issues: [] },
        ikhokhaConfig: { healthy: true, issues: [] },
        databaseConfig: { healthy: true, issues: [] },
        webhookConfig: { healthy: true, issues: [] }
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: []
      });

      monitor.start();
      
      const status = monitor.getStatus();
      expect(status.running).toBe(true);
      expect(status.startTime).toBeInstanceOf(Date);
      
      consoleSpy.mockRestore();
    });

    it('should stop monitoring successfully', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      monitor.start();
      monitor.stop();
      
      const status = monitor.getStatus();
      expect(status.running).toBe(false);
      expect(status.startTime).toBeNull();
      
      consoleSpy.mockRestore();
    });

    it('should not start if already running', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      monitor.start();
      monitor.start(); // Second start should warn
      
      expect(consoleSpy).toHaveBeenCalledWith('Configuration health monitor is already running');
      
      consoleSpy.mockRestore();
    });

    it('should not stop if not running', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      monitor.stop(); // Stop when not running should warn
      
      expect(consoleSpy).toHaveBeenCalledWith('Configuration health monitor is not running');
      
      consoleSpy.mockRestore();
    });
  });

  describe('Health Check Processing', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should perform health check and update metrics', async () => {
      mockGetConfigurationHealth.mockReturnValue({
        overallHealth: { healthy: true, issues: [] },
        ikhokhaConfig: { healthy: true, issues: [] },
        databaseConfig: { healthy: true, issues: [] },
        webhookConfig: { healthy: true, issues: [] }
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: []
      });

      await monitor.forceHealthCheck();
      
      const metrics = monitor.getMetrics();
      expect(metrics.totalChecks).toBe(1);
      expect(metrics.successfulChecks).toBe(1);
      expect(metrics.failedChecks).toBe(0);
      expect(metrics.uptime).toBe(100);
    });

    it('should create alerts for unhealthy configuration', async () => {
      mockGetConfigurationHealth.mockReturnValue({
        overallHealth: { 
          healthy: false, 
          issues: ['Critical configuration error'] 
        },
        ikhokhaConfig: { 
          healthy: false, 
          issues: ['API key invalid'] 
        },
        databaseConfig: { healthy: true, issues: [] },
        webhookConfig: { healthy: true, issues: [] }
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        issues: ['Production not ready']
      });

      await monitor.forceHealthCheck();
      
      const alerts = monitor.getAlerts();
      expect(alerts.length).toBeGreaterThan(0);
      
      const overallAlert = alerts.find(a => a.component === 'overall');
      expect(overallAlert).toBeDefined();
      expect(overallAlert?.severity).toBe('high');
      
      const ikhokhaAlert = alerts.find(a => a.component === 'ikhokha');
      expect(ikhokhaAlert).toBeDefined();
      expect(ikhokhaAlert?.severity).toBe('high');
    });

    it('should handle health check failures', async () => {
      mockGetConfigurationHealth.mockImplementation(() => {
        throw new Error('Health check failed');
      });

      await expect(monitor.forceHealthCheck()).rejects.toThrow('Health check failed');
      
      const metrics = monitor.getMetrics();
      expect(metrics.totalChecks).toBe(1);
      expect(metrics.successfulChecks).toBe(0);
      expect(metrics.failedChecks).toBe(1);
      expect(metrics.uptime).toBe(0);
      
      const alerts = monitor.getAlerts();
      const errorAlert = alerts.find(a => a.component === 'overall' && a.severity === 'critical');
      expect(errorAlert).toBeDefined();
    });
  });

  describe('Alert Management', () => {
    it('should create alerts with correct properties', async () => {
      mockGetConfigurationHealth.mockReturnValue({
        overallHealth: { 
          healthy: false, 
          issues: ['Test error'] 
        },
        ikhokhaConfig: { healthy: true, issues: [] },
        databaseConfig: { healthy: true, issues: [] },
        webhookConfig: { healthy: true, issues: [] }
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: []
      });

      await monitor.forceHealthCheck();
      
      const alerts = monitor.getAlerts();
      expect(alerts.length).toBe(1);
      
      const alert = alerts[0];
      expect(alert.id).toBeDefined();
      expect(alert.severity).toBe('high');
      expect(alert.component).toBe('overall');
      expect(alert.message).toBe('Overall configuration health degraded');
      expect(alert.details).toEqual(['Test error']);
      expect(alert.timestamp).toBeInstanceOf(Date);
      expect(alert.resolved).toBe(false);
    });

    it('should resolve alerts', async () => {
      mockGetConfigurationHealth.mockReturnValue({
        overallHealth: { 
          healthy: false, 
          issues: ['Test error'] 
        },
        ikhokhaConfig: { healthy: true, issues: [] },
        databaseConfig: { healthy: true, issues: [] },
        webhookConfig: { healthy: true, issues: [] }
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: []
      });

      await monitor.forceHealthCheck();
      
      const alerts = monitor.getAlerts();
      const alertId = alerts[0].id;
      
      const resolved = monitor.resolveAlert(alertId);
      expect(resolved).toBe(true);
      
      const activeAlerts = monitor.getAlerts();
      expect(activeAlerts.length).toBe(0);
      
      const allAlerts = monitor.getAlerts(true);
      expect(allAlerts[0].resolved).toBe(true);
      expect(allAlerts[0].resolvedAt).toBeInstanceOf(Date);
    });

    it('should filter alerts by severity', async () => {
      mockGetConfigurationHealth.mockReturnValue({
        overallHealth: { 
          healthy: false, 
          issues: ['Critical error'] 
        },
        ikhokhaConfig: { 
          healthy: false, 
          issues: ['API key error'] 
        },
        databaseConfig: { 
          healthy: false, 
          issues: ['DB error'] 
        },
        webhookConfig: { 
          healthy: false, 
          issues: ['Webhook error'] 
        }
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        securityValid: false,
        issues: ['Security error', 'Performance error']
      });

      // Mock production environment for critical alerts
      vi.stubEnv('VITE_NODE_ENV', 'production');

      await monitor.forceHealthCheck();
      
      const criticalAlerts = monitor.getAlertsBySeverity('critical');
      const highAlerts = monitor.getAlertsBySeverity('high');
      const mediumAlerts = monitor.getAlertsBySeverity('medium');
      
      expect(criticalAlerts.length).toBeGreaterThan(0);
      expect(highAlerts.length).toBeGreaterThan(0);
      expect(mediumAlerts.length).toBeGreaterThan(0);
      
      vi.unstubAllEnvs();
    });

    it('should clear old resolved alerts', async () => {
      // Create an alert
      mockGetConfigurationHealth.mockReturnValue({
        overallHealth: { 
          healthy: false, 
          issues: ['Test error'] 
        },
        ikhokhaConfig: { healthy: true, issues: [] },
        databaseConfig: { healthy: true, issues: [] },
        webhookConfig: { healthy: true, issues: [] }
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: []
      });

      await monitor.forceHealthCheck();
      
      const alerts = monitor.getAlerts();
      const alertId = alerts[0].id;
      
      // Resolve the alert
      monitor.resolveAlert(alertId);
      
      // Mock old timestamp
      const alert = monitor.getAlerts(true)[0];
      alert.timestamp = new Date(Date.now() - 25 * 60 * 60 * 1000); // 25 hours ago
      
      // Clear old alerts
      const clearedCount = monitor.clearOldAlerts();
      expect(clearedCount).toBe(1);
      
      const remainingAlerts = monitor.getAlerts(true);
      expect(remainingAlerts.length).toBe(0);
    });
  });

  describe('Configuration Updates', () => {
    it('should update monitoring configuration', () => {
      const newConfig = {
        checkInterval: 60000,
        alertThreshold: 5,
        enableConsoleAlerts: false
      };

      monitor.updateConfig(newConfig);
      
      // Verify config was updated by checking behavior
      // Since config is private, we test through behavior
      const status = monitor.getStatus();
      expect(status.running).toBe(false); // Should have stopped and restarted
    });

    it('should restart monitoring after config update if it was running', () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      monitor.start();
      expect(monitor.getStatus().running).toBe(true);
      
      monitor.updateConfig({ checkInterval: 60000 });
      
      // Should restart automatically
      expect(monitor.getStatus().running).toBe(true);
      
      consoleSpy.mockRestore();
    });
  });

  describe('Metrics Tracking', () => {
    it('should track successful checks', async () => {
      mockGetConfigurationHealth.mockReturnValue({
        overallHealth: { healthy: true, issues: [] },
        ikhokhaConfig: { healthy: true, issues: [] },
        databaseConfig: { healthy: true, issues: [] },
        webhookConfig: { healthy: true, issues: [] }
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: []
      });

      await monitor.forceHealthCheck();
      await monitor.forceHealthCheck();
      await monitor.forceHealthCheck();
      
      const metrics = monitor.getMetrics();
      expect(metrics.totalChecks).toBe(3);
      expect(metrics.successfulChecks).toBe(3);
      expect(metrics.failedChecks).toBe(0);
      expect(metrics.uptime).toBe(100);
      expect(metrics.lastSuccessfulCheck).toBeInstanceOf(Date);
      expect(metrics.lastFailedCheck).toBeNull();
    });

    it('should track failed checks', async () => {
      mockGetConfigurationHealth.mockImplementation(() => {
        throw new Error('Check failed');
      });

      try {
        await monitor.forceHealthCheck();
      } catch {
        // Expected to fail
      }
      
      try {
        await monitor.forceHealthCheck();
      } catch {
        // Expected to fail
      }
      
      const metrics = monitor.getMetrics();
      expect(metrics.totalChecks).toBe(2);
      expect(metrics.successfulChecks).toBe(0);
      expect(metrics.failedChecks).toBe(2);
      expect(metrics.uptime).toBe(0);
      expect(metrics.lastSuccessfulCheck).toBeNull();
      expect(metrics.lastFailedCheck).toBeInstanceOf(Date);
    });

    it('should calculate average response time', async () => {
      mockGetConfigurationHealth.mockImplementation(() => {
        // Simulate some processing time
        return new Promise(resolve => {
          setTimeout(() => resolve({
            overallHealth: { healthy: true, issues: [] },
            ikhokhaConfig: { healthy: true, issues: [] },
            databaseConfig: { healthy: true, issues: [] },
            webhookConfig: { healthy: true, issues: [] }
          }), 10);
        });
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: []
      });

      await monitor.forceHealthCheck();
      
      const metrics = monitor.getMetrics();
      expect(metrics.averageResponseTime).toBeGreaterThan(0);
    });
  });

  describe('Production Environment Handling', () => {
    it('should create critical alerts in production environment', async () => {
      vi.stubEnv('VITE_NODE_ENV', 'production');
      
      mockGetConfigurationHealth.mockReturnValue({
        overallHealth: { healthy: true, issues: [] },
        ikhokhaConfig: { healthy: true, issues: [] },
        databaseConfig: { healthy: true, issues: [] },
        webhookConfig: { healthy: true, issues: [] }
      });
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        securityValid: false,
        issues: ['Production not ready', 'Security validation failed']
      });

      await monitor.forceHealthCheck();
      
      const alerts = monitor.getAlerts();
      const criticalAlerts = alerts.filter(a => a.severity === 'critical');
      
      expect(criticalAlerts.length).toBeGreaterThan(0);
      
      const productionAlert = criticalAlerts.find(a => 
        a.message === 'Production environment is not ready'
      );
      expect(productionAlert).toBeDefined();
      
      const securityAlert = criticalAlerts.find(a => 
        a.message === 'Security validation failed'
      );
      expect(securityAlert).toBeDefined();
      
      vi.unstubAllEnvs();
    });
  });
});