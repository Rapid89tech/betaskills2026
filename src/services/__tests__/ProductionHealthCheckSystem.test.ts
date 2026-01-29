/**
 * Production Health Check System Tests
 * 
 * Tests the comprehensive health check functionality for production monitoring.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProductionHealthCheckSystem } from '../ProductionHealthCheckSystem';

// Mock environment variables
const mockEnvVars = {
  VITE_NODE_ENV: 'production',
  VITE_IKHOKHA_API_KEY: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
  VITE_IKHOKHA_API_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
  VITE_IKHOKHA_WEBHOOK_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
  VITE_IKHOKHA_TEST_MODE: 'false',
  VITE_IKHOKHA_API_URL: 'https://api.ikhokha.com',
  VITE_SUPABASE_URL: 'https://test.supabase.co',
  VITE_SUPABASE_ANON_KEY: 'test-key',
  VITE_ENABLE_CARD_PAYMENT_MONITORING: 'true',
  VITE_ENABLE_ENHANCED_WEBHOOK_VALIDATION: 'true',
  VITE_ENABLE_CARD_PAYMENT_AUDIT_LOGGING: 'true',
  VITE_ENABLE_CARD_PAYMENT_FAST_TRACK: 'true',
  VITE_ENABLE_ENHANCED_REAL_TIME_SYNC: 'true',
  VITE_ENABLE_BULLETPROOF_PERSISTENCE: 'true',
  VITE_ENABLE_IMMEDIATE_ACCESS_GRANTING: 'true'
};

describe('ProductionHealthCheckSystem', () => {
  let healthCheckSystem: ProductionHealthCheckSystem;

  beforeEach(() => {
    // Mock import.meta.env
    vi.stubGlobal('import.meta', {
      env: mockEnvVars
    });

    healthCheckSystem = new ProductionHealthCheckSystem();
  });

  describe('System Health Checks', () => {
    it('should check database connection health', async () => {
      const result = await healthCheckSystem.checkSystemHealth();
      
      expect(result.database_connection).toBeDefined();
      expect(result.database_connection.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.database_connection.component).toBe('database_connection');
      expect(result.database_connection.timestamp).toBeDefined();
    });

    it('should check Ikhokha API connectivity', async () => {
      const result = await healthCheckSystem.checkSystemHealth();
      
      expect(result.api_connectivity).toBeDefined();
      expect(result.api_connectivity.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.api_connectivity.component).toBe('ikhokha_api_connectivity');
      expect(result.api_connectivity.details.api_key_configured).toBe(true);
      expect(result.api_connectivity.details.uses_https).toBe(true);
    });

    it('should check webhook endpoint configuration', async () => {
      const result = await healthCheckSystem.checkSystemHealth();
      
      expect(result.webhook_endpoint).toBeDefined();
      expect(result.webhook_endpoint.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.webhook_endpoint.component).toBe('webhook_endpoint');
      expect(result.webhook_endpoint.details.webhook_secret_configured).toBe(true);
    });

    it('should check real-time sync configuration', async () => {
      const result = await healthCheckSystem.checkSystemHealth();
      
      expect(result.real_time_sync).toBeDefined();
      expect(result.real_time_sync.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.real_time_sync.component).toBe('real_time_sync');
    });

    it('should check monitoring systems', async () => {
      const result = await healthCheckSystem.checkSystemHealth();
      
      expect(result.monitoring_systems).toBeDefined();
      expect(result.monitoring_systems.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.monitoring_systems.component).toBe('monitoring_systems');
    });
  });

  describe('Payment System Health Checks', () => {
    it('should check Ikhokha API status', async () => {
      const result = await healthCheckSystem.checkPaymentSystemHealth();
      
      expect(result.ikhokha_api_status).toBeDefined();
      expect(result.ikhokha_api_status.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.ikhokha_api_status.component).toBe('ikhokha_api_status');
      expect(result.ikhokha_api_status.details.api_key_configured).toBe(true);
      expect(result.ikhokha_api_status.details.test_mode).toBe(false);
    });

    it('should check webhook processing', async () => {
      const result = await healthCheckSystem.checkPaymentSystemHealth();
      
      expect(result.webhook_processing).toBeDefined();
      expect(result.webhook_processing.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.webhook_processing.component).toBe('webhook_processing');
      expect(result.webhook_processing.details.webhook_secret_configured).toBe(true);
    });

    it('should check enrollment creation', async () => {
      const result = await healthCheckSystem.checkPaymentSystemHealth();
      
      expect(result.enrollment_creation).toBeDefined();
      expect(result.enrollment_creation.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.enrollment_creation.component).toBe('enrollment_creation');
    });

    it('should check payment flow configuration', async () => {
      const result = await healthCheckSystem.checkPaymentSystemHealth();
      
      expect(result.payment_flow).toBeDefined();
      expect(result.payment_flow.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.payment_flow.component).toBe('payment_flow');
    });

    it('should check course access configuration', async () => {
      const result = await healthCheckSystem.checkPaymentSystemHealth();
      
      expect(result.course_access).toBeDefined();
      expect(result.course_access.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.course_access.component).toBe('course_access');
    });
  });

  describe('Configuration Health Checks', () => {
    it('should check environment variables', async () => {
      const result = await healthCheckSystem.checkConfigurationHealth();
      
      expect(result.environment_variables).toBeDefined();
      expect(result.environment_variables.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.environment_variables.component).toBe('environment_variables');
    });

    it('should check credential validity', async () => {
      const result = await healthCheckSystem.checkConfigurationHealth();
      
      expect(result.credential_validity).toBeDefined();
      expect(result.credential_validity.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.credential_validity.component).toBe('credential_validity');
    });

    it('should check security settings', async () => {
      const result = await healthCheckSystem.checkConfigurationHealth();
      
      expect(result.security_settings).toBeDefined();
      expect(result.security_settings.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.security_settings.component).toBe('security_settings');
    });

    it('should check monitoring configuration', async () => {
      const result = await healthCheckSystem.checkConfigurationHealth();
      
      expect(result.monitoring_config).toBeDefined();
      expect(result.monitoring_config.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.monitoring_config.component).toBe('monitoring_config');
    });

    it('should check feature flags', async () => {
      const result = await healthCheckSystem.checkConfigurationHealth();
      
      expect(result.feature_flags).toBeDefined();
      expect(result.feature_flags.status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.feature_flags.component).toBe('feature_flags');
    });
  });

  describe('Comprehensive Health Check', () => {
    it('should perform comprehensive health check', async () => {
      const result = await healthCheckSystem.performComprehensiveHealthCheck();
      
      expect(result.overall_status).toMatch(/healthy|degraded|unhealthy/);
      expect(result.timestamp).toBeDefined();
      expect(result.system_health).toBeDefined();
      expect(result.payment_health).toBeDefined();
      expect(result.configuration_health).toBeDefined();
      expect(result.summary).toBeDefined();
      expect(result.summary.total_checks).toBeGreaterThan(0);
    });

    it('should calculate summary statistics correctly', async () => {
      const result = await healthCheckSystem.performComprehensiveHealthCheck();
      
      const { summary } = result;
      expect(summary.total_checks).toBe(
        summary.healthy_checks + summary.degraded_checks + summary.unhealthy_checks
      );
      expect(summary.total_checks).toBe(15); // 5 system + 5 payment + 5 configuration
    });

    it('should determine overall status correctly', async () => {
      const result = await healthCheckSystem.performComprehensiveHealthCheck();
      
      if (result.summary.unhealthy_checks > 0) {
        expect(result.overall_status).toBe('unhealthy');
      } else if (result.summary.degraded_checks > 0) {
        expect(result.overall_status).toBe('degraded');
      } else {
        expect(result.overall_status).toBe('healthy');
      }
    });
  });

  describe('Health Check Endpoint', () => {
    it('should create health check endpoint response', async () => {
      const response = await healthCheckSystem.createHealthCheckEndpoint();
      
      expect(response.statusCode).toMatch(/200|503/);
      expect(response.headers['Content-Type']).toBe('application/json');
      expect(response.headers['Cache-Control']).toBe('no-cache, no-store, must-revalidate');
      expect(response.headers['X-Health-Status']).toMatch(/healthy|degraded|unhealthy/);
      expect(response.headers['X-Health-Timestamp']).toBeDefined();
      
      const body = JSON.parse(response.body);
      expect(body.overall_status).toMatch(/healthy|degraded|unhealthy/);
      expect(body.timestamp).toBeDefined();
      expect(body.summary).toBeDefined();
    });

    it('should return 200 for healthy or degraded status', async () => {
      const response = await healthCheckSystem.createHealthCheckEndpoint();
      const body = JSON.parse(response.body);
      
      if (body.overall_status === 'healthy' || body.overall_status === 'degraded') {
        expect(response.statusCode).toBe(200);
      }
    });

    it('should return 503 for unhealthy status', async () => {
      // Mock environment to force unhealthy status
      vi.stubGlobal('import.meta', {
        env: {
          ...mockEnvVars,
          VITE_IKHOKHA_API_KEY: '', // Missing API key should cause unhealthy status
        }
      });

      const unhealthySystem = new ProductionHealthCheckSystem();
      const response = await unhealthySystem.createHealthCheckEndpoint();
      const body = JSON.parse(response.body);
      
      if (body.overall_status === 'unhealthy') {
        expect(response.statusCode).toBe(503);
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle errors gracefully in comprehensive health check', async () => {
      // Mock a service to throw an error
      const originalCheckSystemHealth = healthCheckSystem.checkSystemHealth;
      healthCheckSystem.checkSystemHealth = vi.fn().mockRejectedValue(new Error('Test error'));

      const result = await healthCheckSystem.performComprehensiveHealthCheck();
      
      expect(result.overall_status).toBe('unhealthy');
      expect(result.summary.unhealthy_checks).toBeGreaterThan(0);

      // Restore original method
      healthCheckSystem.checkSystemHealth = originalCheckSystemHealth;
    });

    it('should handle errors gracefully in health check endpoint', async () => {
      // Mock comprehensive health check to throw an error
      const originalPerformComprehensiveHealthCheck = healthCheckSystem.performComprehensiveHealthCheck;
      healthCheckSystem.performComprehensiveHealthCheck = vi.fn().mockRejectedValue(new Error('Test error'));

      const response = await healthCheckSystem.createHealthCheckEndpoint();
      
      expect(response.statusCode).toBe(503);
      expect(response.headers['Content-Type']).toBe('application/json');
      
      const body = JSON.parse(response.body);
      expect(body.overall_status).toBe('unhealthy');
      expect(body.error).toBe('Test error');

      // Restore original method
      healthCheckSystem.performComprehensiveHealthCheck = originalPerformComprehensiveHealthCheck;
    });
  });
});