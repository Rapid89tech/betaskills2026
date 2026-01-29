/**
 * Basic tests for ProductionMonitoringSetup service
 * 
 * Tests the core functionality of the production monitoring setup
 * including initialization, metric recording, and event logging.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProductionMonitoringSetup } from '../ProductionMonitoringSetup';

// Mock window and performance APIs
const mockWindow = {
  addEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
  performance: {
    now: vi.fn(() => Date.now()),
    getEntriesByType: vi.fn(() => []),
  },
  PerformanceObserver: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn()
  })),
  navigator: {
    userAgent: 'test-browser',
    onLine: true
  }
};

// Setup global mocks
Object.defineProperty(global, 'window', {
  value: mockWindow,
  writable: true
});

Object.defineProperty(global, 'performance', {
  value: mockWindow.performance,
  writable: true
});

Object.defineProperty(global, 'PerformanceObserver', {
  value: mockWindow.PerformanceObserver,
  writable: true
});

Object.defineProperty(global, 'navigator', {
  value: mockWindow.navigator,
  writable: true
});

describe('ProductionMonitoringSetup', () => {
  let monitoringSetup: ProductionMonitoringSetup;

  beforeEach(() => {
    vi.clearAllMocks();
    monitoringSetup = new ProductionMonitoringSetup();
  });

  afterEach(async () => {
    if (monitoringSetup) {
      await monitoringSetup.shutdown();
    }
  });

  describe('Initialization', () => {
    it('should create instance successfully', () => {
      expect(monitoringSetup).toBeInstanceOf(ProductionMonitoringSetup);
    });

    it('should initialize monitoring system', async () => {
      await expect(monitoringSetup.initializeMonitoring()).resolves.not.toThrow();
    });

    it('should get monitoring status', () => {
      const status = monitoringSetup.getMonitoringStatus();
      
      expect(status).toHaveProperty('enabled');
      expect(status).toHaveProperty('metrics_count');
      expect(status).toHaveProperty('events_count');
      expect(status).toHaveProperty('health_checks_count');
      expect(status).toHaveProperty('alerts_count');
      expect(status).toHaveProperty('last_collection');
      
      expect(typeof status.enabled).toBe('boolean');
      expect(typeof status.metrics_count).toBe('number');
      expect(typeof status.events_count).toBe('number');
    });
  });

  describe('Metric Recording', () => {
    it('should record metrics successfully', () => {
      expect(() => {
        monitoringSetup.recordMetric('test_metric', 100, 'count', { test: 'tag' });
      }).not.toThrow();
    });

    it('should retrieve recorded metrics', () => {
      monitoringSetup.recordMetric('test_metric', 100, 'count');
      monitoringSetup.recordMetric('test_metric', 200, 'count');
      
      const metrics = monitoringSetup.getMetrics('test_metric');
      expect(metrics).toHaveLength(2);
      expect(metrics[0].name).toBe('test_metric');
      
      // Check that both values are present (order may vary due to same timestamp)
      const values = metrics.map(m => m.value);
      expect(values).toContain(100);
      expect(values).toContain(200);
    });

    it('should limit metrics retrieval', () => {
      for (let i = 0; i < 10; i++) {
        monitoringSetup.recordMetric('test_metric', i, 'count');
      }
      
      const metrics = monitoringSetup.getMetrics('test_metric', 5);
      expect(metrics).toHaveLength(5);
    });
  });

  describe('Event Logging', () => {
    it('should log events successfully', () => {
      expect(() => {
        monitoringSetup.logEvent({
          event_type: 'PAYMENT_SUCCESS',
          severity: 'INFO',
          message: 'Test payment success',
          details: { test: 'data' },
          timestamp: new Date(),
          source: 'TestSource'
        });
      }).not.toThrow();
    });

    it('should retrieve logged events', () => {
      monitoringSetup.logEvent({
        event_type: 'PAYMENT_SUCCESS',
        severity: 'INFO',
        message: 'Test event 1',
        details: {},
        timestamp: new Date(),
        source: 'TestSource'
      });
      
      monitoringSetup.logEvent({
        event_type: 'PAYMENT_FAILURE',
        severity: 'ERROR',
        message: 'Test event 2',
        details: {},
        timestamp: new Date(),
        source: 'TestSource'
      });
      
      const allEvents = monitoringSetup.getEvents();
      expect(allEvents).toHaveLength(2);
      
      const paymentEvents = monitoringSetup.getEvents('PAYMENT_SUCCESS');
      expect(paymentEvents).toHaveLength(1);
      expect(paymentEvents[0].message).toBe('Test event 1');
    });
  });

  describe('Health Checks', () => {
    it('should update health check status', () => {
      monitoringSetup.updateHealthCheck('test_service', {
        service: 'test_service',
        status: 'HEALTHY',
        response_time: 100,
        last_check: new Date(),
        details: { test: 'data' }
      });
      
      const healthStatus = monitoringSetup.getHealthStatus();
      expect(healthStatus.has('test_service')).toBe(true);
      
      const serviceHealth = healthStatus.get('test_service');
      expect(serviceHealth?.status).toBe('HEALTHY');
      expect(serviceHealth?.response_time).toBe(100);
    });

    it('should handle multiple health checks', () => {
      monitoringSetup.updateHealthCheck('service1', {
        service: 'service1',
        status: 'HEALTHY',
        response_time: 100,
        last_check: new Date(),
        details: {}
      });
      
      monitoringSetup.updateHealthCheck('service2', {
        service: 'service2',
        status: 'DEGRADED',
        response_time: 500,
        last_check: new Date(),
        details: {}
      });
      
      const healthStatus = monitoringSetup.getHealthStatus();
      expect(healthStatus.size).toBe(2);
    });
  });

  describe('Business Metrics', () => {
    it('should collect business metrics', async () => {
      // Add some test metrics first
      monitoringSetup.recordMetric('payment_success_count', 1, 'count');
      monitoringSetup.recordMetric('payment_failure_count', 1, 'count');
      monitoringSetup.recordMetric('enrollment_conversion_count', 1, 'count');
      
      const businessMetrics = await monitoringSetup.collectBusinessMetrics();
      
      expect(businessMetrics).toHaveProperty('payment_volume');
      expect(businessMetrics).toHaveProperty('payment_success_rate');
      expect(businessMetrics).toHaveProperty('enrollment_conversion_rate');
      expect(businessMetrics).toHaveProperty('average_payment_amount');
      expect(businessMetrics).toHaveProperty('total_revenue');
      expect(businessMetrics).toHaveProperty('active_enrollments');
      expect(businessMetrics).toHaveProperty('failed_payments');
      expect(businessMetrics).toHaveProperty('webhook_success_rate');
      
      expect(typeof businessMetrics.payment_volume).toBe('number');
      expect(typeof businessMetrics.payment_success_rate).toBe('number');
      expect(typeof businessMetrics.enrollment_conversion_rate).toBe('number');
    });
  });

  describe('Monitoring Setup Methods', () => {
    it('should setup payment monitoring without errors', () => {
      expect(() => {
        monitoringSetup.setupPaymentMonitoring();
      }).not.toThrow();
    });

    it('should setup health monitoring without errors', () => {
      expect(() => {
        monitoringSetup.setupHealthMonitoring();
      }).not.toThrow();
    });

    it('should setup error monitoring without errors', () => {
      expect(() => {
        monitoringSetup.setupErrorMonitoring();
      }).not.toThrow();
    });

    it('should setup performance monitoring without errors', () => {
      expect(() => {
        monitoringSetup.setupPerformanceMonitoring();
      }).not.toThrow();
    });

    it('should setup business metrics tracking without errors', () => {
      expect(() => {
        monitoringSetup.setupBusinessMetricsTracking();
      }).not.toThrow();
    });
  });

  describe('Shutdown', () => {
    it('should shutdown gracefully', async () => {
      await monitoringSetup.initializeMonitoring();
      
      await expect(monitoringSetup.shutdown()).resolves.not.toThrow();
      
      const status = monitoringSetup.getMonitoringStatus();
      expect(status.enabled).toBe(false);
    });
  });
});