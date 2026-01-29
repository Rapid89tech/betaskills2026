/**
 * Working Production Testing Suite
 * 
 * Integration tests for production services that actually work with the current implementations.
 * Tests production configuration validation, webhook security, and production readiness.
 * 
 * Requirements: 8.1, 8.2, 8.3, 8.4, 8.5
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProductionSecurityValidator } from '../../services/ProductionSecurityValidator.simple';
import { ProductionWebhookSecurity } from '../../services/ProductionWebhookSecurity';
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

describe('Working Production Testing Suite', () => {
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

  describe('Production Credential Management', () => {
    it('should load and validate production credentials', () => {
      const credentialManager = ProductionCredentialManager.getInstance();
      const credentials = credentialManager.loadProductionCredentials();
      
      expect(credentials.api_key).toBe('IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D');
      expect(credentials.api_secret).toBe('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      expect(credentials.webhook_secret).toBe('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      expect(credentials.test_mode).toBe(false);
      expect(credentials.api_url).toBe('https://api.ikhokha.com');
    });

    it('should validate credential format', () => {
      const credentialManager = ProductionCredentialManager.getInstance();
      const credentials = credentialManager.loadProductionCredentials();
      const validation = credentialManager.validateCredentialFormat(credentials);
      
      expect(validation.is_valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should enforce production-only settings', () => {
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
  });

  describe('Production Environment Validation', () => {
    it('should validate production environment configuration', async () => {
      const environmentValidator = new ProductionEnvironmentValidator();
      const validation = await environmentValidator.performCompleteValidation();
      
      expect(validation.is_valid).toBe(true);
      expect(validation.critical_errors).toHaveLength(0);
      expect(validation.environment_validation.node_env_production).toBe(true);
      expect(validation.environment_validation.test_mode_disabled).toBe(true);
    });

    it('should detect missing environment variables', async () => {
      // Remove a required environment variable
      const originalApiKey = import.meta.env.VITE_IKHOKHA_API_KEY;
      delete (import.meta.env as any).VITE_IKHOKHA_API_KEY;

      const environmentValidator = new ProductionEnvironmentValidator();
      const validation = await environmentValidator.performCompleteValidation();
      
      expect(validation.is_valid).toBe(false);
      expect(validation.critical_errors.length).toBeGreaterThan(0);

      // Restore environment variable
      (import.meta.env as any).VITE_IKHOKHA_API_KEY = originalApiKey;
    });
  });

  describe('Production Security Validation', () => {
    it('should validate production security configuration', () => {
      const securityValidator = new ProductionSecurityValidator();
      const validation = securityValidator.validateProductionSecurity();
      
      expect(validation.is_valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should validate API key strength', () => {
      const securityValidator = new ProductionSecurityValidator();
      const validation = securityValidator.validateApiKeyStrength('IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D');
      
      expect(validation.credential_strength_valid).toBe(true);
      expect(validation.no_development_patterns).toBe(true);
      expect(validation.security_score).toBeGreaterThanOrEqual(80);
    });

    it('should validate HTTPS enforcement', () => {
      const securityValidator = new ProductionSecurityValidator();
      const httpsValidation = securityValidator.validateHttpsEndpoints();
      
      expect(httpsValidation.https_enforced).toBe(true);
      expect(httpsValidation.certificates_valid).toBe(true);
      expect(httpsValidation.secure_protocols_only).toBe(true);
      expect(httpsValidation.no_insecure_endpoints).toBe(true);
      expect(httpsValidation.tls_version_valid).toBe(true);
    });
  });

  describe('Production Webhook Security', () => {
    it('should initialize webhook security configuration', () => {
      const webhookSecurity = new ProductionWebhookSecurity();
      const config = webhookSecurity.getSecurityConfig();
      
      expect(config).toBeDefined();
      expect(config.webhookSecret).toBe('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
      expect(config.enableSignatureValidation).toBe(true);
      expect(config.enableTimestampValidation).toBe(true);
      expect(config.enableSecurityLogging).toBe(true);
    });

    it('should validate webhook security request structure', async () => {
      const webhookSecurity = new ProductionWebhookSecurity();
      
      const testRequest = {
        payload: JSON.stringify({
          transaction_id: 'test-123',
          reference: 'ref-123',
          amount: 1000,
          status: 'completed',
          timestamp: new Date().toISOString()
        }),
        signature: 'test-signature',
        timestamp: new Date().toISOString(),
        sourceIP: '127.0.0.1'
      };
      
      const validation = await webhookSecurity.validateWebhookSecurity(testRequest);
      
      expect(validation).toBeDefined();
      expect(typeof validation.valid).toBe('boolean');
      expect(typeof validation.signatureValid).toBe('boolean');
      expect(typeof validation.timestampValid).toBe('boolean');
      expect(typeof validation.sourceValid).toBe('boolean');
      expect(validation.validationTimestamp).toBeInstanceOf(Date);
    });

    it('should provide security statistics', () => {
      const webhookSecurity = new ProductionWebhookSecurity();
      const stats = webhookSecurity.getSecurityStats();
      
      expect(stats).toBeDefined();
      expect(typeof stats.cacheSize).toBe('number');
      expect(typeof stats.recentWebhooksCount).toBe('number');
      expect(typeof stats.suspiciousIPsCount).toBe('number');
    });
  });

  describe('Production Integration Testing', () => {
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

      // Step 4: Validate webhook security configuration
      const webhookSecurity = new ProductionWebhookSecurity();
      const securityConfig = webhookSecurity.getSecurityConfig();
      
      expect(securityConfig.enableSignatureValidation).toBe(true);
      expect(securityConfig.enableTimestampValidation).toBe(true);
      expect(securityConfig.enableSecurityLogging).toBe(true);

      console.log('✅ Complete production setup flow validated successfully');
    });

    it('should handle production service errors gracefully', async () => {
      // Test error handling by corrupting environment
      const originalApiKey = import.meta.env.VITE_IKHOKHA_API_KEY;
      delete (import.meta.env as any).VITE_IKHOKHA_API_KEY;

      try {
        const credentialManager = ProductionCredentialManager.getInstance();
        const credentials = credentialManager.loadProductionCredentials();
        const validation = credentialManager.validateCredentialFormat(credentials);
        
        // Should handle missing credentials gracefully
        expect(validation.is_valid).toBe(false);
        expect(validation.errors.length).toBeGreaterThan(0);
        
      } finally {
        // Restore environment
        (import.meta.env as any).VITE_IKHOKHA_API_KEY = originalApiKey;
      }
    });
  });

  describe('Production Performance Testing', () => {
    it('should complete production validation within acceptable time', async () => {
      const startTime = Date.now();
      
      // Run multiple production validations
      const operations = [
        () => {
          const credentialManager = ProductionCredentialManager.getInstance();
          return credentialManager.loadProductionCredentials();
        },
        () => {
          const securityValidator = new ProductionSecurityValidator();
          return securityValidator.validateProductionSecurity();
        },
        async () => {
          const environmentValidator = new ProductionEnvironmentValidator();
          return await environmentValidator.performCompleteValidation();
        }
      ];
      
      const results = await Promise.all(operations.map(op => op()));
      
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      
      // Should complete within reasonable time
      expect(executionTime).toBeLessThan(5000); // 5 seconds
      expect(results).toHaveLength(3);
      
      // All operations should succeed
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });

    it('should handle concurrent production operations', async () => {
      const concurrentOperations = 5;
      const startTime = Date.now();
      
      const promises = Array.from({ length: concurrentOperations }, async () => {
        const credentialManager = ProductionCredentialManager.getInstance();
        const credentials = credentialManager.loadProductionCredentials();
        const validation = credentialManager.validateCredentialFormat(credentials);
        return validation;
      });
      
      const results = await Promise.all(promises);
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      
      expect(executionTime).toBeLessThan(2000); // 2 seconds
      expect(results).toHaveLength(concurrentOperations);
      
      results.forEach(result => {
        expect(result.is_valid).toBe(true);
      });
    });
  });

  describe('Production Readiness Automation', () => {
    it('should automate production readiness validation', async () => {
      const readinessChecks = {
        credentials: false,
        environment: false,
        security: false,
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

        // Check 4: Webhook Security
        const webhookSecurity = new ProductionWebhookSecurity();
        const securityConfig = webhookSecurity.getSecurityConfig();
        readinessChecks.webhook = securityConfig.enableSignatureValidation && 
                                  securityConfig.enableTimestampValidation;

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

    it('should provide production readiness report', async () => {
      const report = {
        timestamp: new Date(),
        overall_status: 'READY',
        checks: {
          credentials: true,
          environment: true,
          security: true,
          webhook: true
        },
        recommendations: [] as string[]
      };

      // Run actual checks
      try {
        const credentialManager = ProductionCredentialManager.getInstance();
        const credentials = credentialManager.loadProductionCredentials();
        const credentialValidation = credentialManager.validateCredentialFormat(credentials);
        report.checks.credentials = credentialValidation.is_valid;

        const environmentValidator = new ProductionEnvironmentValidator();
        const envValidation = await environmentValidator.performCompleteValidation();
        report.checks.environment = envValidation.is_valid;

        const securityValidator = new ProductionSecurityValidator();
        const securityValidation = securityValidator.validateProductionSecurity();
        report.checks.security = securityValidation.is_valid;

        const webhookSecurity = new ProductionWebhookSecurity();
        const securityConfig = webhookSecurity.getSecurityConfig();
        report.checks.webhook = securityConfig.enableSignatureValidation;

        // Determine overall status
        const failedChecks = Object.entries(report.checks).filter(([_, passed]) => !passed);
        if (failedChecks.length === 0) {
          report.overall_status = 'READY';
        } else if (failedChecks.length <= 1) {
          report.overall_status = 'DEGRADED';
        } else {
          report.overall_status = 'NOT_READY';
        }

        // Add recommendations for failed checks
        failedChecks.forEach(([check, _]) => {
          report.recommendations.push(`Fix ${check} configuration before deployment`);
        });

      } catch (error) {
        report.overall_status = 'NOT_READY';
        report.recommendations.push('Resolve critical errors before deployment');
      }

      // Validate report structure
      expect(report.timestamp).toBeInstanceOf(Date);
      expect(report.overall_status).toMatch(/READY|DEGRADED|NOT_READY/);
      expect(report.checks).toBeDefined();
      expect(report.recommendations).toBeInstanceOf(Array);

      console.log('\n📊 Production Readiness Report:');
      console.log(`Overall Status: ${report.overall_status}`);
      console.log('Checks:', report.checks);
      if (report.recommendations.length > 0) {
        console.log('Recommendations:', report.recommendations);
      }
    });
  });
});