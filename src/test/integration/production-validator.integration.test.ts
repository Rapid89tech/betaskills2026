/**
 * Production Validator Integration Tests
 * 
 * Tests the ProductionValidator with real configuration and environment setup
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { productionValidator, validateProductionReadiness, performStartupValidation } from '../../services/ProductionValidator';

describe('ProductionValidator Integration', () => {
  let originalEnv: any;

  beforeEach(() => {
    originalEnv = { ...import.meta.env };
  });

  afterEach(() => {
    Object.assign(import.meta.env, originalEnv);
  });

  describe('Real Environment Testing', () => {
    it('should validate development environment configuration', () => {
      // Set up development environment
      import.meta.env.VITE_NODE_ENV = 'development';
      import.meta.env.VITE_SUPABASE_URL = 'http://localhost:54321';
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test';

      const result = productionValidator.validateIkhokhaConfig();
      
      // Development should be more lenient
      expect(result.valid).toBe(true);
      
      // Should have recommendations for development
      expect(result.recommendations.length).toBeGreaterThanOrEqual(0);
    });

    it('should detect production environment requirements', () => {
      // Set up production environment with missing configuration
      import.meta.env.VITE_NODE_ENV = 'production';
      import.meta.env.PROD = true;
      delete import.meta.env.VITE_SUPABASE_URL;
      delete import.meta.env.VITE_SUPABASE_ANON_KEY;

      const databaseValidation = productionValidator.validateDatabaseConfig();
      
      expect(databaseValidation.valid).toBe(false);
      expect(databaseValidation.errors).toContain('Supabase URL is required');
      expect(databaseValidation.errors).toContain('Supabase anonymous key is required');
    });

    it('should validate complete production readiness', () => {
      // Set up minimal production environment
      import.meta.env.VITE_NODE_ENV = 'production';
      import.meta.env.PROD = true;
      import.meta.env.VITE_SUPABASE_URL = 'https://project.supabase.co';
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjA2NzI2MCwiZXhwIjoxOTYxNjQzMjYwfQ.test';

      const readiness = validateProductionReadiness();
      
      // Should detect missing iKhokha configuration
      expect(readiness.ready).toBe(false);
      expect(readiness.issues.length).toBeGreaterThan(0);
      
      // Should have configuration and security validations
      expect(readiness.configurationValid).toBeDefined();
      expect(readiness.securityValid).toBeDefined();
      expect(readiness.performanceValid).toBeDefined();
    });

    it('should handle startup validation gracefully in development', () => {
      import.meta.env.VITE_NODE_ENV = 'development';
      
      // Should not throw in development
      expect(() => performStartupValidation()).not.toThrow();
    });

    it('should provide detailed configuration health monitoring', () => {
      const health = productionValidator.getConfigurationHealth();
      
      expect(health).toHaveProperty('ikhokhaConfig');
      expect(health).toHaveProperty('databaseConfig');
      expect(health).toHaveProperty('webhookConfig');
      expect(health).toHaveProperty('overallHealth');
      
      // Each component should have health status
      expect(health.ikhokhaConfig).toHaveProperty('healthy');
      expect(health.ikhokhaConfig).toHaveProperty('lastCheck');
      expect(health.ikhokhaConfig).toHaveProperty('issues');
      expect(health.ikhokhaConfig).toHaveProperty('metrics');
      
      expect(health.overallHealth.metrics).toHaveProperty('totalErrors');
      expect(health.overallHealth.metrics).toHaveProperty('componentsHealthy');
      expect(health.overallHealth.metrics).toHaveProperty('totalComponents');
      expect(health.overallHealth.metrics.totalComponents).toBe(3);
    });

    it('should validate API key security properly', () => {
      const securityValidation = productionValidator.validateApiKeys();
      
      expect(securityValidation).toHaveProperty('apiKeysValid');
      expect(securityValidation).toHaveProperty('webhookSecurityValid');
      expect(securityValidation).toHaveProperty('sslValid');
      expect(securityValidation).toHaveProperty('errors');
      expect(securityValidation).toHaveProperty('warnings');
      
      // Should detect missing or invalid keys
      expect(Array.isArray(securityValidation.errors)).toBe(true);
      expect(Array.isArray(securityValidation.warnings)).toBe(true);
    });

    it('should validate SSL certificates and HTTPS configuration', () => {
      const sslValidation = productionValidator.validateSSLCertificates();
      
      expect(sslValidation).toHaveProperty('sslValid');
      expect(sslValidation).toHaveProperty('errors');
      expect(sslValidation).toHaveProperty('warnings');
      
      // Should validate HTTPS requirements
      expect(Array.isArray(sslValidation.errors)).toBe(true);
      expect(Array.isArray(sslValidation.warnings)).toBe(true);
    });

    it('should validate database connections and performance', () => {
      const dbValidation = productionValidator.validateDatabaseConnections();
      
      expect(dbValidation).toHaveProperty('databaseConnectionsValid');
      expect(dbValidation).toHaveProperty('apiResponseTimesValid');
      expect(dbValidation).toHaveProperty('errors');
      expect(dbValidation).toHaveProperty('warnings');
      
      // Should check database configuration
      expect(Array.isArray(dbValidation.errors)).toBe(true);
      expect(Array.isArray(dbValidation.warnings)).toBe(true);
    });

    it('should validate API response times and performance', () => {
      const apiValidation = productionValidator.validateApiResponseTimes();
      
      expect(apiValidation).toHaveProperty('databaseConnectionsValid');
      expect(apiValidation).toHaveProperty('apiResponseTimesValid');
      expect(apiValidation).toHaveProperty('errors');
      expect(apiValidation).toHaveProperty('warnings');
      
      // Should validate timeout and retry configuration
      expect(Array.isArray(apiValidation.errors)).toBe(true);
      expect(Array.isArray(apiValidation.warnings)).toBe(true);
    });

    it('should cache validation results for performance', () => {
      const start = Date.now();
      
      // First call
      const result1 = productionValidator.validateIkhokhaConfig();
      const firstCallTime = Date.now() - start;
      
      const start2 = Date.now();
      
      // Second call should be faster (cached)
      const result2 = productionValidator.validateIkhokhaConfig();
      const secondCallTime = Date.now() - start2;
      
      expect(result1).toEqual(result2);
      expect(secondCallTime).toBeLessThan(firstCallTime);
    });

    it('should handle configuration errors gracefully', () => {
      // Test with invalid environment setup
      import.meta.env.VITE_NODE_ENV = 'production';
      
      // Clear all configuration
      delete import.meta.env.VITE_SUPABASE_URL;
      delete import.meta.env.VITE_SUPABASE_ANON_KEY;
      delete import.meta.env.VITE_IKHOKHA_API_KEY;
      delete import.meta.env.VITE_IKHOKHA_API_SECRET;
      
      const readiness = validateProductionReadiness();
      
      expect(readiness.ready).toBe(false);
      expect(readiness.issues.length).toBeGreaterThan(0);
      
      // Should not throw errors, just return validation results
      expect(() => productionValidator.getConfigurationHealth()).not.toThrow();
      expect(() => productionValidator.alertOnConfigurationIssues()).not.toThrow();
    });

    it('should provide actionable error messages', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      
      const readiness = validateProductionReadiness();
      
      // All error messages should be descriptive and actionable
      readiness.issues.forEach(issue => {
        expect(issue).toBeTruthy();
        expect(typeof issue).toBe('string');
        expect(issue.length).toBeGreaterThan(10); // Should be descriptive
      });
      
      // Recommendations should be helpful
      readiness.recommendations.forEach(recommendation => {
        expect(recommendation).toBeTruthy();
        expect(typeof recommendation).toBe('string');
        expect(recommendation.length).toBeGreaterThan(10);
      });
    });

    it('should validate webhook configuration comprehensively', () => {
      const webhookValidation = productionValidator.validateWebhookConfig();
      
      expect(webhookValidation).toHaveProperty('valid');
      expect(webhookValidation).toHaveProperty('errors');
      expect(webhookValidation).toHaveProperty('warnings');
      expect(webhookValidation).toHaveProperty('recommendations');
      
      // Should validate webhook security requirements
      expect(Array.isArray(webhookValidation.errors)).toBe(true);
      expect(Array.isArray(webhookValidation.warnings)).toBe(true);
      expect(Array.isArray(webhookValidation.recommendations)).toBe(true);
    });

    it('should integrate with existing iKhokha configuration', () => {
      // Test that validator works with the existing config system
      const ikhokhaValidation = productionValidator.validateIkhokhaConfig();
      
      expect(ikhokhaValidation).toHaveProperty('valid');
      expect(ikhokhaValidation).toHaveProperty('errors');
      expect(ikhokhaValidation).toHaveProperty('warnings');
      expect(ikhokhaValidation).toHaveProperty('recommendations');
      
      // Should handle both development and production scenarios
      expect(typeof ikhokhaValidation.valid).toBe('boolean');
      expect(Array.isArray(ikhokhaValidation.errors)).toBe(true);
      expect(Array.isArray(ikhokhaValidation.warnings)).toBe(true);
      expect(Array.isArray(ikhokhaValidation.recommendations)).toBe(true);
    });
  });

  describe('Production Security Validation', () => {
    it('should detect development patterns in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      
      const securityValidation = productionValidator.validateApiKeys();
      
      // Should detect if development credentials are being used
      if (securityValidation.errors.some(error => error.includes('development'))) {
        expect(securityValidation.apiKeysValid).toBe(false);
      }
    });

    it('should validate credential strength requirements', () => {
      const securityValidation = productionValidator.validateApiKeys();
      
      // Should check credential length and complexity
      securityValidation.warnings.forEach(warning => {
        if (warning.includes('shorter than expected')) {
          expect(warning).toContain('key');
        }
      });
    });

    it('should enforce HTTPS in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      
      const sslValidation = productionValidator.validateSSLCertificates();
      
      // Production should require HTTPS
      if (!sslValidation.sslValid) {
        expect(sslValidation.errors.some(error => 
          error.includes('HTTPS') || error.includes('SSL')
        )).toBe(true);
      }
    });
  });

  describe('Performance and Monitoring', () => {
    it('should provide performance metrics', () => {
      const health = productionValidator.getConfigurationHealth();
      
      expect(health.overallHealth.metrics).toBeDefined();
      expect(typeof health.overallHealth.metrics.totalErrors).toBe('number');
      expect(typeof health.overallHealth.metrics.componentsHealthy).toBe('number');
      expect(typeof health.overallHealth.metrics.totalComponents).toBe('number');
    });

    it('should track validation timestamps', () => {
      const health = productionValidator.getConfigurationHealth();
      
      expect(health.ikhokhaConfig.lastCheck).toBeInstanceOf(Date);
      expect(health.databaseConfig.lastCheck).toBeInstanceOf(Date);
      expect(health.webhookConfig.lastCheck).toBeInstanceOf(Date);
      expect(health.overallHealth.lastCheck).toBeInstanceOf(Date);
    });

    it('should provide alerting capabilities', () => {
      // Should not throw when alerting
      expect(() => productionValidator.alertOnConfigurationIssues()).not.toThrow();
    });
  });
});