/**
 * ProductionValidator Tests
 * 
 * Comprehensive test suite for production configuration validation system
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProductionValidator, productionValidator } from '../ProductionValidator';

// Mock the config module
vi.mock('../../config/ikhokha', () => ({
  loadIkhokhaConfig: vi.fn(),
  maskConfig: vi.fn()
}));

describe('ProductionValidator', () => {
  let validator: ProductionValidator;
  let originalEnv: any;

  beforeEach(() => {
    validator = ProductionValidator.getInstance();
    originalEnv = { ...import.meta.env };
    
    // Clear validation cache
    (validator as any).validationCache.clear();
  });

  afterEach(() => {
    // Restore environment
    Object.assign(import.meta.env, originalEnv);
    vi.clearAllMocks();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = ProductionValidator.getInstance();
      const instance2 = ProductionValidator.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should use the exported singleton', () => {
      expect(productionValidator).toBe(ProductionValidator.getInstance());
    });
  });

  describe('validateIkhokhaConfig', () => {
    beforeEach(() => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'prod_api_key_1234567890123456789',
        api_secret: 'prod_api_secret_1234567890123456789',
        webhook_secret: 'prod_webhook_secret_1234567890123456789',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
    });

    it('should validate production configuration successfully', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      
      const result = validator.validateIkhokhaConfig();
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect test mode in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'prod_key',
        api_secret: 'prod_secret',
        webhook_secret: 'prod_webhook',
        test_mode: true, // This should cause an error
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      const result = validator.validateIkhokhaConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Test mode MUST be disabled in production environment');
    });

    it('should detect development API endpoint in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://pay.ikhokha.com', // Development endpoint
        api_key: 'prod_key_1234567890123456789',
        api_secret: 'prod_secret_1234567890123456789',
        webhook_secret: 'prod_webhook_1234567890123456789',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      const result = validator.validateIkhokhaConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Production must use api.ikhokha.com endpoint, not pay.ikhokha.com test endpoint');
    });

    it('should detect development credentials in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D', // Development key
        api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS', // Development secret
        webhook_secret: 'dev_webhook_secret_key', // Development webhook
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      const result = validator.validateIkhokhaConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Production environment detected development API key - real credentials required');
      expect(result.errors).toContain('Production environment detected development API secret - real credentials required');
      expect(result.errors).toContain('Production environment detected development webhook secret - real credentials required');
    });

    it('should validate credential strength in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'short', // Too short
        api_secret: 'short', // Too short
        webhook_secret: 'short', // Too short
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      const result = validator.validateIkhokhaConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Production API key appears to be too short - minimum 20 characters expected');
      expect(result.errors).toContain('Production API secret appears to be too short - minimum 20 characters expected');
      expect(result.errors).toContain('Production webhook secret appears to be too short - minimum 16 characters expected');
    });

    it('should require HTTPS in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'http://api.ikhokha.com', // HTTP instead of HTTPS
        api_key: 'prod_key_1234567890123456789',
        api_secret: 'prod_secret_1234567890123456789',
        webhook_secret: 'prod_webhook_1234567890123456789',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      const result = validator.validateIkhokhaConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Production API URL must use HTTPS protocol');
    });

    it('should validate timeout configuration in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'prod_key_1234567890123456789',
        api_secret: 'prod_secret_1234567890123456789',
        webhook_secret: 'prod_webhook_1234567890123456789',
        test_mode: false,
        timeout: 15000, // Too short for production
        retry_attempts: 0, // No retries
        retry_delay: 2000
      });
      
      const result = validator.validateIkhokhaConfig();
      
      expect(result.valid).toBe(true); // Warnings don't make it invalid
      expect(result.warnings).toContain('Production timeout should be at least 30 seconds for reliability');
      expect(result.warnings).toContain('Production should have at least 1 retry attempt for resilience');
    });

    it('should handle configuration loading errors', () => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockImplementation(() => {
        throw new Error('Configuration loading failed');
      });
      
      const result = validator.validateIkhokhaConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors[0]).toContain('Configuration loading failed: Configuration loading failed');
    });

    it('should cache validation results', () => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      
      // First call
      const result1 = validator.validateIkhokhaConfig();
      
      // Second call should use cache
      const result2 = validator.validateIkhokhaConfig();
      
      expect(loadIkhokhaConfig).toHaveBeenCalledTimes(1);
      expect(result1).toEqual(result2);
    });
  });

  describe('validateDatabaseConfig', () => {
    it('should validate database configuration successfully', () => {
      import.meta.env.VITE_SUPABASE_URL = 'https://project.supabase.co';
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjA2NzI2MCwiZXhwIjoxOTYxNjQzMjYwfQ.test';
      
      const result = validator.validateDatabaseConfig();
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing database configuration', () => {
      delete import.meta.env.VITE_SUPABASE_URL;
      delete import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      const result = validator.validateDatabaseConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Supabase URL is required');
      expect(result.errors).toContain('Supabase anonymous key is required');
    });

    it('should detect localhost database in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      import.meta.env.VITE_SUPABASE_URL = 'http://localhost:54321';
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-key';
      
      const result = validator.validateDatabaseConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Production must not use localhost database URL');
    });

    it('should require HTTPS for production database', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      import.meta.env.VITE_SUPABASE_URL = 'http://project.supabase.co';
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-key';
      
      const result = validator.validateDatabaseConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Production database URL must use HTTPS');
    });
  });

  describe('validateWebhookConfig', () => {
    beforeEach(() => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        webhook_secret: 'prod_webhook_secret_1234567890123456789'
      });
    });

    it('should validate webhook configuration successfully', () => {
      const result = validator.validateWebhookConfig();
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing webhook secret', () => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        webhook_secret: ''
      });
      
      const result = validator.validateWebhookConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Webhook secret is required for secure webhook processing');
    });

    it('should detect development webhook secret in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        webhook_secret: 'dev_webhook_secret_key'
      });
      
      const result = validator.validateWebhookConfig();
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Production must not use development webhook secret');
    });

    it('should validate webhook secret strength in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        webhook_secret: 'short'
      });
      
      const result = validator.validateWebhookConfig();
      
      expect(result.valid).toBe(true); // Warnings don't make it invalid
      expect(result.warnings).toContain('Production webhook secret should be at least 32 characters for security');
    });
  });

  describe('validateApiKeys', () => {
    beforeEach(() => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'prod_api_key_1234567890123456789',
        api_secret: 'prod_api_secret_1234567890123456789',
        webhook_secret: 'prod_webhook_secret_1234567890123456789'
      });
    });

    it('should validate API keys successfully', () => {
      const result = validator.validateApiKeys();
      
      expect(result.apiKeysValid).toBe(true);
      expect(result.webhookSecurityValid).toBe(true);
      expect(result.sslValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should detect missing API keys', () => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: '',
        api_secret: '',
        webhook_secret: ''
      });
      
      const result = validator.validateApiKeys();
      
      expect(result.apiKeysValid).toBe(false);
      expect(result.webhookSecurityValid).toBe(false);
      expect(result.errors).toContain('API key is missing');
      expect(result.errors).toContain('API secret is missing');
      expect(result.errors).toContain('Webhook secret is missing');
    });

    it('should detect development credentials in production', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
        api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
        webhook_secret: 'dev_webhook_secret_key'
      });
      
      const result = validator.validateApiKeys();
      
      expect(result.apiKeysValid).toBe(false);
      expect(result.webhookSecurityValid).toBe(false);
      expect(result.errors).toContain('Production environment using development API key');
      expect(result.errors).toContain('Production environment using development API secret');
      expect(result.errors).toContain('Production environment using development webhook secret');
    });
  });

  describe('validateProductionReadiness', () => {
    beforeEach(() => {
      // Mock all dependencies to return valid results
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'prod_api_key_1234567890123456789',
        api_secret: 'prod_api_secret_1234567890123456789',
        webhook_secret: 'prod_webhook_secret_1234567890123456789',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      import.meta.env.VITE_SUPABASE_URL = 'https://project.supabase.co';
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test';
    });

    it('should validate production readiness successfully', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      
      const result = validator.validateProductionReadiness();
      
      expect(result.ready).toBe(true);
      expect(result.configurationValid).toBe(true);
      expect(result.securityValid).toBe(true);
      expect(result.performanceValid).toBe(true);
      expect(result.issues).toHaveLength(0);
    });

    it('should detect configuration issues', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: '', // Missing API key
        api_secret: 'prod_secret',
        webhook_secret: 'prod_webhook',
        test_mode: true, // Test mode in production
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      const result = validator.validateProductionReadiness();
      
      expect(result.ready).toBe(false);
      expect(result.configurationValid).toBe(false);
      expect(result.issues).toContain('API Key is required');
      expect(result.issues).toContain('Test mode MUST be disabled in production environment');
    });
  });

  describe('performStartupValidation', () => {
    it('should skip validation in development', () => {
      import.meta.env.VITE_NODE_ENV = 'development';
      
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      expect(() => validator.performStartupValidation()).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith('🧪 Development environment detected - skipping production validation');
      
      consoleSpy.mockRestore();
    });

    it('should throw error for invalid production configuration', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: '', // Missing API key
        api_secret: 'prod_secret',
        webhook_secret: 'prod_webhook',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      expect(() => validator.performStartupValidation()).toThrow('Production validation failed');
    });

    it('should pass validation for valid production configuration', () => {
      import.meta.env.VITE_NODE_ENV = 'production';
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'prod_api_key_1234567890123456789',
        api_secret: 'prod_api_secret_1234567890123456789',
        webhook_secret: 'prod_webhook_secret_1234567890123456789',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      import.meta.env.VITE_SUPABASE_URL = 'https://project.supabase.co';
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-key';
      
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      expect(() => validator.performStartupValidation()).not.toThrow();
      expect(consoleSpy).toHaveBeenCalledWith('✅ Production validation passed - system ready for live transactions');
      
      consoleSpy.mockRestore();
    });
  });

  describe('getConfigurationHealth', () => {
    beforeEach(() => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'prod_api_key_1234567890123456789',
        api_secret: 'prod_api_secret_1234567890123456789',
        webhook_secret: 'prod_webhook_secret_1234567890123456789',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      import.meta.env.VITE_SUPABASE_URL = 'https://project.supabase.co';
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-key';
    });

    it('should return healthy configuration status', () => {
      const health = validator.getConfigurationHealth();
      
      expect(health.overallHealth.healthy).toBe(true);
      expect(health.ikhokhaConfig.healthy).toBe(true);
      expect(health.databaseConfig.healthy).toBe(true);
      expect(health.webhookConfig.healthy).toBe(true);
      expect(health.overallHealth.issues).toHaveLength(0);
    });

    it('should detect unhealthy configuration', () => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: '', // Missing API key
        api_secret: 'prod_secret',
        webhook_secret: 'prod_webhook',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      const health = validator.getConfigurationHealth();
      
      expect(health.overallHealth.healthy).toBe(false);
      expect(health.ikhokhaConfig.healthy).toBe(false);
      expect(health.overallHealth.issues).toContain('API Key is required');
    });

    it('should include metrics in health status', () => {
      const health = validator.getConfigurationHealth();
      
      expect(health.overallHealth.metrics).toHaveProperty('totalErrors');
      expect(health.overallHealth.metrics).toHaveProperty('componentsHealthy');
      expect(health.overallHealth.metrics).toHaveProperty('totalComponents');
      expect(health.overallHealth.metrics.totalComponents).toBe(3);
    });
  });

  describe('alertOnConfigurationIssues', () => {
    it('should not alert for healthy configuration', () => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: 'prod_api_key_1234567890123456789',
        api_secret: 'prod_api_secret_1234567890123456789',
        webhook_secret: 'prod_webhook_secret_1234567890123456789',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      import.meta.env.VITE_SUPABASE_URL = 'https://project.supabase.co';
      import.meta.env.VITE_SUPABASE_ANON_KEY = 'test-key';
      
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      validator.alertOnConfigurationIssues();
      
      expect(consoleErrorSpy).not.toHaveBeenCalled();
      
      consoleErrorSpy.mockRestore();
    });

    it('should alert for configuration issues', () => {
      const { loadIkhokhaConfig } = require('../../config/ikhokha');
      loadIkhokhaConfig.mockReturnValue({
        api_url: 'https://api.ikhokha.com',
        api_key: '', // Missing API key
        api_secret: 'prod_secret',
        webhook_secret: 'prod_webhook',
        test_mode: false,
        timeout: 45000,
        retry_attempts: 3,
        retry_delay: 2000
      });
      
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      validator.alertOnConfigurationIssues();
      
      expect(consoleErrorSpy).toHaveBeenCalledWith('🚨 Configuration health alert:', expect.any(Array));
      expect(consoleErrorSpy).toHaveBeenCalledWith('❌ Ikhokha configuration issues:', expect.any(Array));
      
      consoleErrorSpy.mockRestore();
    });
  });
});