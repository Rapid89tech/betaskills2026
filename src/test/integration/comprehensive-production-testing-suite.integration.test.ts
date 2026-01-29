/**
 * Comprehensive Production Testing Suite
 * 
 * Integration tests for all production services working together.
 * Tests production configuration validation, webhook security, and production readiness.
 * 
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProductionSecurityValidator } from '../../services/ProductionSecurityValidator.simple';
import { ProductionWebhookSecurity } from '../../services/ProductionWebhookSecurity';
import { ProductionHealthCheckSystem } from '../../services/ProductionHealthCheckSystem';
import { ProductionCredentialManager } from '../../services/ProductionCredentialManager';
import { ProductionEnvironmentValidator } from '../../services/ProductionEnvironmentValidator';

// Mock environment variables for testing
const mockProductionEnv = {
  VITE_NODE_ENV: 'production',
  VITE_IKHOKHA_API_KEY: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
  VITE_IKHOKHA_API_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
  VITE_IKHOKHA_WEBHOOK_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
  VITE_IKHOKHA_TEST_MODE: 'false',
  VITE_IKHOKHA_API_URL: 'https://api.ikhokha.com',
  VITE_ENABLE_WEBHOOK_VALIDATION: 'true',
  VITE_ENABLE_ENHANCED_WEBHOOK_VALIDATION: 'true',
  VITE_ENABLE_CARD_PAYMENT_MONITORING: 'true',
  VITE_ENABLE_CARD_PAYMENT_AUDIT_LOGGING: 'true',
  VITE_SUPABASE_URL: 'https://test.supabase.co',
  VITE_SUPABASE_ANON_KEY: 'test-key'
};

describe('Comprehensive Production Testing Suite', () => {
  let originalEnv: any;

  beforeEach(() => {
    // Store original environment
    originalEnv = { ...import.meta.env };
    
    // Mock production environment
    Object.assign(import.meta.env, mockProductionEnv);
    
    // Mock window object for browser environment
    Object.defineProperty(window, 'ENV', {
      value: mockProductionEnv,
      writable: true
    });
  });

  afterEach(() => {
    // Restore original environment
    Object.keys(mockProductionEnv).forEach(key => {
      delete (import.meta.env as any)[key];
    });
    Object.assign(import.meta.env, originalEnv);
    
    // Clear mocks
    vi.clearAllMocks();
  });

  describe('Production Services Integration', () => {
    it('should validate all production services work together', async () => {
      // Test credential manager
      const credentialManager = ProductionCredentialManager.getInstance();
      const credentials = credentialManager.loadProductionCredentials();
      
      expect(credentials.api_key).toBe('IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D');
      expect(credentials.api_secret).toBe('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      expect(credentials.webhook_secret).toBe('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      expect(credentials.test_mode).toBe(false);

      // Test environment validator
      const environmentValidator = new ProductionEnvironmentValidator();
      const envValidation = await environmentValidator.performCompleteValidation();
      
      expect(envValidation.is_valid).toBe(true);
      expect(envValidation.critical_errors).toHaveLength(0);

      // Test security validator
      const securityValidator = new ProductionSecurityValidator();
      const securityValidation = securityValidator.validateProductionSecurity();
      
      expect(securityValidation.is_valid).toBe(true);
      expect(securityValidation.errors).toHaveLength(0);

      // Test health check system
      const healthCheckSystem = new ProductionHealthCheckSystem();
      const healthResult = await healthCheckSystem.performComprehensiveHealthCheck();
      
      expect(healthResult.overall_status).toMatch(/healthy|degraded/);
      expect(healthResult.summary.total_checks).toBeGreaterThan(0);
    });

    it('should validate production configuration enforcement', async () => {
      const credentialManager = ProductionCredentialManager.getInstance();
      const credentials = credentialManager.loadProductionCredentials();
      
      // Verify production-only settings
      expect(credentials.test_mode).toBe(false);
      expect(credentials.api_url).toBe('https://api.ikhokha.com');
      expect(credentials.webhook_validation).toBe(true);
      expect(credentials.https_required).toBe(true);
      
      // Verify no development fallbacks
      expect(credentials.api_key).not.toContain('test');
      expect(credentials.api_key).not.toContain('dev');
      expect(credentials.api_secret).not.toContain('test');
      expect(credentials.api_secret).not.toContain('dev');
    });

    it('should validate webhook security integration', async () => {
      const webhookSecurity = new ProductionWebhookSecurity();
      const testPayload = JSON.stringify({ test: 'data', timestamp: Math.floor(Date.now() / 1000) });
      const testSecret = '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS';
      
      // Test webhook security validation
      const webhookRequest = {
        payload: testPayload,
        signature: 'test-signature',
        timestamp: new Date().toISOString(),
        sourceIP: '127.0.0.1'
      };
      
      const validation = await webhookSecurity.validateWebhookSecurity(webhookRequest);
      expect(validation).toBeDefined();
      expect(typeof validation.valid).toBe('boolean');
      expect(typeof validation.signatureValid).toBe('boolean');
    });
  });

  describe('End-to-End Production Configuration Validation', () => {
    it('should validate complete production setup flow', async () => {
      // Step 1: Load and validate credentials
      const credentialManager = ProductionCredentialManager.getInstance();
      const credentials = credentialManager.loadProductionCredentials();
      const credentialValidation = credentialManager.validateCredentialFormat(credentials);
      
      expect(credentialValidation.is_valid).toBe(true);
      expect(credentialValidation.errors).toHaveLength(0);

      // Step 2: Validate environment
      const environmentValidator = new ProductionEnvironmentValidator();
      const envValidation = await environmentValidator.performCompleteValidation();
      
      expect(envValidation.is_valid).toBe(true);
      expect(envValidation.environment_validation.node_env_production).toBe(true);
      expect(envValidation.environment_validation.test_mode_disabled).toBe(true);

      // Step 3: Validate security
      const securityValidator = new ProductionSecurityValidator();
      const securityValidation = securityValidator.validateProductionSecurity();
      
      expect(securityValidation.is_valid).toBe(true);
      expect(securityValidation.warnings).toEqual(expect.any(Array));

      // Step 4: Validate health checks
      const healthCheckSystem = new ProductionHealthCheckSystem();
      const healthResult = await healthCheckSystem.performComprehensiveHealthCheck();
      
      expect(healthResult.overall_status).toMatch(/healthy|degraded/);
      expect(healthResult.system_health).toBeDefined();
      expect(healthResult.payment_health).toBeDefined();
      expect(healthResult.configuration_health).toBeDefined();

      // Step 5: Validate webhook security
      const webhookSecurity = new ProductionWebhookSecurity();
      const webhookValidation = webhookSecurity.validateProductionWebhookSecurity();
      
      expect(webhookValidation.is_valid).toBe(true);
      expect(webhookValidation.signature_validation_enabled).toBe(true);
      expect(webhookValidation.timestamp_validation_enabled).toBe(true);
    });

    it('should validate production API connectivity', async () => {
      const healthCheckSystem = new ProductionHealthCheckSystem();
      const systemHealth = await healthCheckSystem.checkSystemHealth();
      
      // Validate API connectivity configuration
      expect(systemHealth.api_connectivity.status).toMatch(/healthy|degraded/);
      expect(systemHealth.api_connectivity.details.api_key_configured).toBe(true);
      expect(systemHealth.api_connectivity.details.uses_https).toBe(true);
      expect(systemHealth.api_connectivity.details.is_production_url).toBe(true);
      
      // Validate webhook endpoint configuration
      expect(systemHealth.webhook_endpoint.status).toMatch(/healthy|degraded/);
      expect(systemHealth.webhook_endpoint.details.webhook_secret_configured).toBe(true);
    });

    it('should validate production payment system health', async () => {
      const healthCheckSystem = new ProductionHealthCheckSystem();
      const paymentHealth = await healthCheckSystem.checkPaymentSystemHealth();
      
      // Validate Ikhokha API status
      expect(paymentHealth.ikhokha_api_status.status).toMatch(/healthy|degraded/);
      expect(paymentHealth.ikhokha_api_status.details.api_key_configured).toBe(true);
      expect(paymentHealth.ikhokha_api_status.details.api_secret_configured).toBe(true);
      expect(paymentHealth.ikhokha_api_status.details.test_mode).toBe(false);
      expect(paymentHealth.ikhokha_api_status.details.is_production).toBe(true);
      
      // Validate webhook processing
      expect(paymentHealth.webhook_processing.status).toMatch(/healthy|degraded/);
      expect(paymentHealth.webhook_processing.details.webhook_secret_configured).toBe(true);
      expect(paymentHealth.webhook_processing.details.enhanced_validation).toBe(true);
    });
  });

  describe('Production Readiness Testing Automation', () => {
    it('should automate production readiness validation', async () => {
      const readinessChecks = {
        credentials: false,
        environment: false,
        security: false,
        health: false,
        webhook: false
      };

      try {
        // Check 1: Credentials
        const credentialManager = ProductionCredentialManager.getInstance();
        const credentials = credentialManager.loadProductionCredentials();
        const credentialValidation = credentialManager.validateCredentialFormat(credentials);
        readinessChecks.credentials = credentialValidation.is_valid;

        // Check 2: Environment
        const environmentValidator = new ProductionEnvironmentValidator();
        const envValidation = await environmentValidator.performCompleteValidation();
        readinessChecks.environment = envValidation.is_valid;

        // Check 3: Security
        const securityValidator = new ProductionSecurityValidator();
        const securityValidation = securityValidator.validateProductionSecurity();
        readinessChecks.security = securityValidation.is_valid;

        // Check 4: Health
        const healthCheckSystem = new ProductionHealthCheckSystem();
        const healthResult = await healthCheckSystem.performComprehensiveHealthCheck();
        readinessChecks.health = healthResult.overall_status !== 'unhealthy';

        // Check 5: Webhook Security
        const webhookSecurity = new ProductionWebhookSecurity();
        const webhookValidation = webhookSecurity.validateProductionWebhookSecurity();
        readinessChecks.webhook = webhookValidation.is_valid;

        // Validate all checks passed
        const allChecksPassed = Object.values(readinessChecks).every(check => check === true);
        expect(allChecksPassed).toBe(true);

        // Log readiness status
        console.log('🎉 Production Readiness Validation Results:');
        Object.entries(readinessChecks).forEach(([check, passed]) => {
          console.log(`  ${passed ? '✅' : '❌'} ${check}: ${passed ? 'PASSED' : 'FAILED'}`);
        });

        if (allChecksPassed) {
          console.log('🚀 System is PRODUCTION READY!');
        } else {
          console.log('⚠️ System requires fixes before production deployment');
        }

      } catch (error) {
        console.error('❌ Production readiness validation failed:', error);
        throw error;
      }
    });

    it('should validate production monitoring and alerting', async () => {
      const healthCheckSystem = new ProductionHealthCheckSystem();
      const configHealth = await healthCheckSystem.checkConfigurationHealth();
      
      // Validate monitoring configuration
      expect(configHealth.monitoring_config.status).toMatch(/healthy|degraded/);
      expect(configHealth.monitoring_config.details.monitoring_enabled).toBe(true);
      expect(configHealth.monitoring_config.details.is_production).toBe(true);
      
      // Validate security settings
      expect(configHealth.security_settings.status).toMatch(/healthy|degraded/);
      expect(configHealth.security_settings.details.webhook_validation).toBe(true);
      expect(configHealth.security_settings.details.audit_logging).toBe(true);
      expect(configHealth.security_settings.details.security_score).toBeGreaterThanOrEqual(70);
    });

    it('should validate production error handling and recovery', async () => {
      const webhookSecurity = new ProductionWebhookSecurity();
      
      // Test error scenarios
      const invalidPayload = 'invalid-json';
      const validSecret = '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS';
      
      // Should handle invalid payloads gracefully
      expect(() => {
        webhookSecurity.generateSignature(invalidPayload, validSecret);
      }).not.toThrow();
      
      // Test signature validation with various invalid inputs
      const testCases = [
        { payload: '', signature: '', secret: validSecret },
        { payload: 'test', signature: 'invalid', secret: validSecret },
        { payload: 'test', signature: 'valid-signature', secret: '' }
      ];
      
      testCases.forEach(({ payload, signature, secret }) => {
        expect(() => {
          const result = webhookSecurity.validateWebhookSignature(payload, signature, secret);
          expect(typeof result).toBe('boolean');
        }).not.toThrow();
      });
    });
  });

  describe('Production Performance and Load Testing', () => {
    it('should validate production service performance', async () => {
      const startTime = Date.now();
      
      // Test multiple concurrent operations
      const operations = [
        () => {
          const credentialManager = ProductionCredentialManager.getInstance();
          return credentialManager.loadProductionCredentials();
        },
        () => {
          const securityValidator = new ProductionSecurityValidator();
          return securityValidator.validateProductionSecurity();
        },
        () => {
          const webhookSecurity = new ProductionWebhookSecurity();
          return webhookSecurity.validateProductionWebhookSecurity();
        }
      ];
      
      // Run operations concurrently
      const results = await Promise.all(operations.map(op => op()));
      
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      
      // Validate performance
      expect(executionTime).toBeLessThan(5000); // Should complete within 5 seconds
      expect(results).toHaveLength(3);
      
      // Validate all operations succeeded
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });

    it('should validate webhook processing under load', async () => {
      const webhookSecurity = new ProductionWebhookSecurity();
      const testSecret = '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS';
      
      // Generate multiple test payloads
      const payloads = Array.from({ length: 10 }, (_, i) => 
        JSON.stringify({ 
          test: `payload-${i}`, 
          timestamp: Math.floor(Date.now() / 1000) + i 
        })
      );
      
      const startTime = Date.now();
      
      // Process multiple webhooks concurrently
      const results = await Promise.all(
        payloads.map(async (payload) => {
          const signature = webhookSecurity.generateSignature(payload, testSecret);
          const isValid = webhookSecurity.validateWebhookSignature(payload, signature, testSecret);
          return { payload, signature, isValid };
        })
      );
      
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      
      // Validate performance and results
      expect(executionTime).toBeLessThan(2000); // Should complete within 2 seconds
      expect(results).toHaveLength(10);
      
      // Validate all webhook validations succeeded
      results.forEach(({ isValid, signature }) => {
        expect(isValid).toBe(true);
        expect(signature).toBeTruthy();
      });
    });
  });

  describe('Production Security Testing', () => {
    it('should validate webhook signature security', async () => {
      const webhookSecurity = new ProductionWebhookSecurity();
      const testPayload = JSON.stringify({ sensitive: 'data', amount: 1000 });
      const correctSecret = '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS';
      const wrongSecret = 'wrong-secret';
      
      // Generate signature with correct secret
      const correctSignature = webhookSecurity.generateSignature(testPayload, correctSecret);
      
      // Validate with correct secret
      const validResult = webhookSecurity.validateWebhookSignature(testPayload, correctSignature, correctSecret);
      expect(validResult).toBe(true);
      
      // Validate with wrong secret (should fail)
      const invalidResult = webhookSecurity.validateWebhookSignature(testPayload, correctSignature, wrongSecret);
      expect(invalidResult).toBe(false);
      
      // Test signature tampering
      const tamperedSignature = correctSignature.slice(0, -1) + 'x';
      const tamperedResult = webhookSecurity.validateWebhookSignature(testPayload, tamperedSignature, correctSecret);
      expect(tamperedResult).toBe(false);
    });

    it('should validate production credential security', async () => {
      const securityValidator = new ProductionSecurityValidator();
      
      // Test API key validation
      const apiKeyValidation = securityValidator.validateApiKeyStrength('IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D');
      expect(apiKeyValidation.credential_strength_valid).toBe(true);
      expect(apiKeyValidation.no_development_patterns).toBe(true);
      expect(apiKeyValidation.security_score).toBeGreaterThanOrEqual(80);
      
      // Test API secret validation
      const secretValidation = securityValidator.validateSecretStrength('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      expect(secretValidation.credential_strength_valid).toBe(true);
      expect(secretValidation.no_development_patterns).toBe(true);
      expect(secretValidation.security_score).toBeGreaterThanOrEqual(80);
      
      // Test webhook secret validation
      const webhookValidation = securityValidator.validateWebhookSecretStrength('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      expect(webhookValidation.credential_strength_valid).toBe(true);
      expect(webhookValidation.no_development_patterns).toBe(true);
      expect(webhookValidation.security_score).toBeGreaterThanOrEqual(80);
    });

    it('should validate HTTPS enforcement', async () => {
      const securityValidator = new ProductionSecurityValidator();
      const httpsValidation = securityValidator.validateHttpsEndpoints();
      
      expect(httpsValidation.https_enforced).toBe(true);
      expect(httpsValidation.certificates_valid).toBe(true);
      expect(httpsValidation.secure_protocols_only).toBe(true);
      expect(httpsValidation.no_insecure_endpoints).toBe(true);
      expect(httpsValidation.tls_version_valid).toBe(true);
    });
  });

  describe('Production Integration Testing', () => {
    it('should validate complete payment flow integration', async () => {
      // This test validates that all production services work together
      // for a complete payment processing flow
      
      const testFlow = async () => {
        // Step 1: Validate credentials are loaded
        const credentialManager = ProductionCredentialManager.getInstance();
        const credentials = credentialManager.loadProductionCredentials();
        expect(credentials.api_key).toBeTruthy();
        expect(credentials.api_secret).toBeTruthy();
        expect(credentials.webhook_secret).toBeTruthy();
        
        // Step 2: Validate environment is production-ready
        const environmentValidator = new ProductionEnvironmentValidator();
        const envValidation = await environmentValidator.performCompleteValidation();
        expect(envValidation.is_valid).toBe(true);
        
        // Step 3: Validate security measures are in place
        const securityValidator = new ProductionSecurityValidator();
        const securityValidation = securityValidator.validateProductionSecurity();
        expect(securityValidation.is_valid).toBe(true);
        
        // Step 4: Validate webhook security is configured
        const webhookSecurity = new ProductionWebhookSecurity();
        const webhookValidation = webhookSecurity.validateProductionWebhookSecurity();
        expect(webhookValidation.is_valid).toBe(true);
        
        // Step 5: Validate system health
        const healthCheckSystem = new ProductionHealthCheckSystem();
        const healthResult = await healthCheckSystem.performComprehensiveHealthCheck();
        expect(healthResult.overall_status).not.toBe('unhealthy');
        
        return {
          credentials: credentials,
          environment: envValidation,
          security: securityValidation,
          webhook: webhookValidation,
          health: healthResult
        };
      };
      
      const flowResult = await testFlow();
      
      // Validate complete integration
      expect(flowResult.credentials).toBeDefined();
      expect(flowResult.environment.is_valid).toBe(true);
      expect(flowResult.security.is_valid).toBe(true);
      expect(flowResult.webhook.is_valid).toBe(true);
      expect(flowResult.health.overall_status).toMatch(/healthy|degraded/);
      
      console.log('✅ Complete production payment flow integration validated');
    });
  });
});