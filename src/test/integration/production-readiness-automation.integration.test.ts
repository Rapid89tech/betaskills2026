/**
 * Production Readiness Testing Automation
 * 
 * Automated tests to verify production readiness across all systems.
 * Tests deployment validation, health checks, and system integration.
 * 
 * Requirements: 8.4, 8.5
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ProductionCredentialManager } from '../../services/ProductionCredentialManager';
import { ProductionEnvironmentValidator } from '../../services/ProductionEnvironmentValidator';
import { ProductionSecurityValidator } from '../../services/ProductionSecurityValidator.simple';
import { ProductionWebhookSecurity } from '../../services/ProductionWebhookSecurity';
import { ProductionHealthCheckSystem } from '../../services/ProductionHealthCheckSystem';

// Production readiness criteria
interface ProductionReadinessCriteria {
  credentials: boolean;
  environment: boolean;
  security: boolean;
  webhooks: boolean;
  health: boolean;
  performance: boolean;
  monitoring: boolean;
}

interface ProductionReadinessReport {
  overall_status: 'READY' | 'NOT_READY' | 'DEGRADED';
  readiness_score: number;
  criteria: ProductionReadinessCriteria;
  failed_checks: string[];
  warnings: string[];
  recommendations: string[];
  timestamp: Date;
}

class ProductionReadinessAutomation {
  async runComprehensiveReadinessCheck(): Promise<ProductionReadinessReport> {
    const startTime = Date.now();
    const criteria: ProductionReadinessCriteria = {
      credentials: false,
      environment: false,
      security: false,
      webhooks: false,
      health: false,
      performance: false,
      monitoring: false
    };
    
    const failedChecks: string[] = [];
    const warnings: string[] = [];
    const recommendations: string[] = [];

    try {
      // 1. Credentials Check
      console.log('🔑 Checking production credentials...');
      const credentialsResult = await this.checkCredentials();
      criteria.credentials = credentialsResult.passed;
      if (!credentialsResult.passed) {
        failedChecks.push(...credentialsResult.errors);
      }
      warnings.push(...credentialsResult.warnings);

      // 2. Environment Check
      console.log('🌍 Checking production environment...');
      const environmentResult = await this.checkEnvironment();
      criteria.environment = environmentResult.passed;
      if (!environmentResult.passed) {
        failedChecks.push(...environmentResult.errors);
      }
      warnings.push(...environmentResult.warnings);

      // 3. Security Check
      console.log('🔒 Checking production security...');
      const securityResult = await this.checkSecurity();
      criteria.security = securityResult.passed;
      if (!securityResult.passed) {
        failedChecks.push(...securityResult.errors);
      }
      warnings.push(...securityResult.warnings);

      // 4. Webhook Security Check
      console.log('🔗 Checking webhook security...');
      const webhookResult = await this.checkWebhookSecurity();
      criteria.webhooks = webhookResult.passed;
      if (!webhookResult.passed) {
        failedChecks.push(...webhookResult.errors);
      }
      warnings.push(...webhookResult.warnings);

      // 5. Health Check
      console.log('🏥 Checking system health...');
      const healthResult = await this.checkSystemHealth();
      criteria.health = healthResult.passed;
      if (!healthResult.passed) {
        failedChecks.push(...healthResult.errors);
      }
      warnings.push(...healthResult.warnings);

      // 6. Performance Check
      console.log('⚡ Checking performance...');
      const performanceResult = await this.checkPerformance();
      criteria.performance = performanceResult.passed;
      if (!performanceResult.passed) {
        failedChecks.push(...performanceResult.errors);
      }
      warnings.push(...performanceResult.warnings);

      // 7. Monitoring Check
      console.log('📊 Checking monitoring systems...');
      const monitoringResult = await this.checkMonitoring();
      criteria.monitoring = monitoringResult.passed;
      if (!monitoringResult.passed) {
        failedChecks.push(...monitoringResult.errors);
      }
      warnings.push(...monitoringResult.warnings);

      // Calculate readiness score
      const passedChecks = Object.values(criteria).filter(Boolean).length;
      const totalChecks = Object.keys(criteria).length;
      const readinessScore = Math.round((passedChecks / totalChecks) * 100);

      // Determine overall status
      let overallStatus: 'READY' | 'NOT_READY' | 'DEGRADED';
      if (readinessScore >= 95) {
        overallStatus = 'READY';
      } else if (readinessScore >= 80) {
        overallStatus = 'DEGRADED';
      } else {
        overallStatus = 'NOT_READY';
      }

      // Generate recommendations
      if (!criteria.credentials) {
        recommendations.push('Fix credential configuration before deployment');
      }
      if (!criteria.environment) {
        recommendations.push('Resolve environment configuration issues');
      }
      if (!criteria.security) {
        recommendations.push('Address security configuration problems');
      }
      if (!criteria.webhooks) {
        recommendations.push('Configure webhook security properly');
      }
      if (!criteria.health) {
        recommendations.push('Resolve system health issues');
      }
      if (!criteria.performance) {
        recommendations.push('Optimize system performance');
      }
      if (!criteria.monitoring) {
        recommendations.push('Set up production monitoring');
      }

      const endTime = Date.now();
      console.log(`✅ Production readiness check completed in ${endTime - startTime}ms`);

      return {
        overall_status: overallStatus,
        readiness_score: readinessScore,
        criteria,
        failed_checks: failedChecks,
        warnings,
        recommendations,
        timestamp: new Date()
      };

    } catch (error) {
      console.error('❌ Production readiness check failed:', error);
      return {
        overall_status: 'NOT_READY',
        readiness_score: 0,
        criteria,
        failed_checks: [`Critical error during readiness check: ${error instanceof Error ? error.message : 'Unknown error'}`],
        warnings,
        recommendations: ['Fix critical errors before attempting deployment'],
        timestamp: new Date()
      };
    }
  }

  private async checkCredentials(): Promise<{ passed: boolean; errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const credentialManager = ProductionCredentialManager.getInstance();
      const credentials = credentialManager.loadProductionCredentials();
      const validation = credentialManager.validateCredentialFormat(credentials);

      if (!validation.is_valid) {
        errors.push(...validation.errors);
      }
      warnings.push(...validation.warnings);

      // Additional credential checks
      if (!credentials.api_key || credentials.api_key.length < 32) {
        errors.push('API key is missing or too short');
      }
      if (!credentials.api_secret || credentials.api_secret.length < 32) {
        errors.push('API secret is missing or too short');
      }
      if (!credentials.webhook_secret || credentials.webhook_secret.length < 16) {
        errors.push('Webhook secret is missing or too short');
      }
      if (credentials.test_mode) {
        errors.push('Test mode is enabled in production');
      }

      return { passed: errors.length === 0, errors, warnings };
    } catch (error) {
      errors.push(`Credential check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { passed: false, errors, warnings };
    }
  }

  private async checkEnvironment(): Promise<{ passed: boolean; errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const environmentValidator = new ProductionEnvironmentValidator();
      const validation = await environmentValidator.performCompleteValidation();

      if (!validation.is_valid) {
        errors.push(...validation.critical_errors.map(e => e.message));
      }
      warnings.push(...validation.warnings.map(w => w.message));

      return { passed: errors.length === 0, errors, warnings };
    } catch (error) {
      errors.push(`Environment check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { passed: false, errors, warnings };
    }
  }

  private async checkSecurity(): Promise<{ passed: boolean; errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const securityValidator = new ProductionSecurityValidator();
      const validation = securityValidator.validateProductionSecurity();

      if (!validation.is_valid) {
        errors.push(...validation.errors);
      }
      warnings.push(...validation.warnings);

      return { passed: errors.length === 0, errors, warnings };
    } catch (error) {
      errors.push(`Security check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { passed: false, errors, warnings };
    }
  }

  private async checkWebhookSecurity(): Promise<{ passed: boolean; errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const webhookSecurity = new ProductionWebhookSecurity();
      const validation = webhookSecurity.validateProductionWebhookSecurity();

      if (!validation.is_valid) {
        errors.push(...validation.errors);
      }
      warnings.push(...validation.warnings);

      // Test webhook functionality
      const testPayload = JSON.stringify({ test: 'readiness-check', timestamp: Date.now() });
      const testSecret = '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS';
      
      try {
        const signature = webhookSecurity.generateSignature(testPayload, testSecret);
        const isValid = webhookSecurity.validateWebhookSignature(testPayload, signature, testSecret);
        
        if (!isValid) {
          errors.push('Webhook signature validation test failed');
        }
      } catch (webhookError) {
        errors.push(`Webhook functionality test failed: ${webhookError instanceof Error ? webhookError.message : 'Unknown error'}`);
      }

      return { passed: errors.length === 0, errors, warnings };
    } catch (error) {
      errors.push(`Webhook security check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { passed: false, errors, warnings };
    }
  }

  private async checkSystemHealth(): Promise<{ passed: boolean; errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      const healthCheckSystem = new ProductionHealthCheckSystem();
      const healthResult = await healthCheckSystem.performComprehensiveHealthCheck();

      if (healthResult.overall_status === 'unhealthy') {
        errors.push('System health check indicates unhealthy status');
      } else if (healthResult.overall_status === 'degraded') {
        warnings.push('System health check indicates degraded status');
      }

      // Check individual health components
      const allChecks = [
        ...Object.values(healthResult.system_health),
        ...Object.values(healthResult.payment_health),
        ...Object.values(healthResult.configuration_health)
      ];

      const unhealthyChecks = allChecks.filter(check => check.status === 'unhealthy');
      const degradedChecks = allChecks.filter(check => check.status === 'degraded');

      unhealthyChecks.forEach(check => {
        errors.push(`Health check failed: ${check.component} - ${check.message}`);
      });

      degradedChecks.forEach(check => {
        warnings.push(`Health check degraded: ${check.component} - ${check.message}`);
      });

      return { passed: errors.length === 0, errors, warnings };
    } catch (error) {
      errors.push(`System health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { passed: false, errors, warnings };
    }
  }

  private async checkPerformance(): Promise<{ passed: boolean; errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Performance benchmarks
      const performanceTests = [
        {
          name: 'Credential Loading',
          test: () => {
            const credentialManager = ProductionCredentialManager.getInstance();
            return credentialManager.loadProductionCredentials();
          },
          maxTime: 100 // 100ms
        },
        {
          name: 'Security Validation',
          test: () => {
            const securityValidator = new ProductionSecurityValidator();
            return securityValidator.validateProductionSecurity();
          },
          maxTime: 500 // 500ms
        },
        {
          name: 'Webhook Signature Generation',
          test: () => {
            const webhookSecurity = new ProductionWebhookSecurity();
            const payload = JSON.stringify({ test: 'performance' });
            return webhookSecurity.generateSignature(payload, '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
          },
          maxTime: 50 // 50ms
        }
      ];

      for (const perfTest of performanceTests) {
        const startTime = Date.now();
        await perfTest.test();
        const endTime = Date.now();
        const executionTime = endTime - startTime;

        if (executionTime > perfTest.maxTime) {
          warnings.push(`Performance warning: ${perfTest.name} took ${executionTime}ms (max: ${perfTest.maxTime}ms)`);
        }
      }

      return { passed: errors.length === 0, errors, warnings };
    } catch (error) {
      errors.push(`Performance check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { passed: false, errors, warnings };
    }
  }

  private async checkMonitoring(): Promise<{ passed: boolean; errors: string[]; warnings: string[] }> {
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // Check monitoring configuration
      const monitoringEnabled = import.meta.env.VITE_ENABLE_CARD_PAYMENT_MONITORING === 'true';
      const auditLoggingEnabled = import.meta.env.VITE_ENABLE_CARD_PAYMENT_AUDIT_LOGGING === 'true';
      const isProduction = import.meta.env.VITE_NODE_ENV === 'production';

      if (isProduction && !monitoringEnabled) {
        errors.push('Payment monitoring is disabled in production');
      }

      if (isProduction && !auditLoggingEnabled) {
        warnings.push('Audit logging is disabled in production');
      }

      // Test monitoring functionality
      try {
        const healthCheckSystem = new ProductionHealthCheckSystem();
        const healthEndpoint = await healthCheckSystem.createHealthCheckEndpoint();
        
        if (healthEndpoint.statusCode >= 400) {
          errors.push('Health check endpoint is not functioning properly');
        }
      } catch (monitoringError) {
        warnings.push(`Monitoring endpoint test failed: ${monitoringError instanceof Error ? monitoringError.message : 'Unknown error'}`);
      }

      return { passed: errors.length === 0, errors, warnings };
    } catch (error) {
      errors.push(`Monitoring check failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { passed: false, errors, warnings };
    }
  }
}

describe('Production Readiness Testing Automation', () => {
  let readinessAutomation: ProductionReadinessAutomation;

  beforeEach(() => {
    readinessAutomation = new ProductionReadinessAutomation();
    
    // Mock production environment
    Object.assign(import.meta.env, {
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
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Comprehensive Production Readiness Check', () => {
    it('should run complete production readiness validation', async () => {
      const report = await readinessAutomation.runComprehensiveReadinessCheck();

      expect(report).toBeDefined();
      expect(report.overall_status).toMatch(/READY|NOT_READY|DEGRADED/);
      expect(report.readiness_score).toBeGreaterThanOrEqual(0);
      expect(report.readiness_score).toBeLessThanOrEqual(100);
      expect(report.criteria).toBeDefined();
      expect(report.timestamp).toBeInstanceOf(Date);

      // Log results for visibility
      console.log('\n🎯 Production Readiness Report:');
      console.log(`Overall Status: ${report.overall_status}`);
      console.log(`Readiness Score: ${report.readiness_score}%`);
      console.log('\nCriteria Results:');
      Object.entries(report.criteria).forEach(([criterion, passed]) => {
        console.log(`  ${passed ? '✅' : '❌'} ${criterion}: ${passed ? 'PASSED' : 'FAILED'}`);
      });

      if (report.failed_checks.length > 0) {
        console.log('\nFailed Checks:');
        report.failed_checks.forEach(check => console.log(`  ❌ ${check}`));
      }

      if (report.warnings.length > 0) {
        console.log('\nWarnings:');
        report.warnings.forEach(warning => console.log(`  ⚠️ ${warning}`));
      }

      if (report.recommendations.length > 0) {
        console.log('\nRecommendations:');
        report.recommendations.forEach(rec => console.log(`  💡 ${rec}`));
      }
    });

    it('should validate production readiness criteria individually', async () => {
      const report = await readinessAutomation.runComprehensiveReadinessCheck();

      // Each criterion should be tested
      expect(typeof report.criteria.credentials).toBe('boolean');
      expect(typeof report.criteria.environment).toBe('boolean');
      expect(typeof report.criteria.security).toBe('boolean');
      expect(typeof report.criteria.webhooks).toBe('boolean');
      expect(typeof report.criteria.health).toBe('boolean');
      expect(typeof report.criteria.performance).toBe('boolean');
      expect(typeof report.criteria.monitoring).toBe('boolean');
    });

    it('should provide actionable recommendations for failed checks', async () => {
      // Mock a failing environment
      const originalApiKey = import.meta.env.VITE_IKHOKHA_API_KEY;
      delete (import.meta.env as any).VITE_IKHOKHA_API_KEY;

      const report = await readinessAutomation.runComprehensiveReadinessCheck();

      expect(report.overall_status).toMatch(/NOT_READY|DEGRADED/);
      expect(report.failed_checks.length).toBeGreaterThan(0);
      expect(report.recommendations.length).toBeGreaterThan(0);

      // Should provide specific recommendations
      const hasCredentialRecommendation = report.recommendations.some(rec => 
        rec.toLowerCase().includes('credential')
      );
      expect(hasCredentialRecommendation).toBe(true);

      // Restore environment
      (import.meta.env as any).VITE_IKHOKHA_API_KEY = originalApiKey;
    });
  });

  describe('Production Readiness Performance Testing', () => {
    it('should complete readiness check within acceptable time', async () => {
      const startTime = Date.now();
      const report = await readinessAutomation.runComprehensiveReadinessCheck();
      const endTime = Date.now();
      const executionTime = endTime - startTime;

      expect(executionTime).toBeLessThan(10000); // Should complete within 10 seconds
      expect(report).toBeDefined();
    });

    it('should handle concurrent readiness checks', async () => {
      const concurrentChecks = 3;
      const startTime = Date.now();

      const promises = Array.from({ length: concurrentChecks }, () => 
        readinessAutomation.runComprehensiveReadinessCheck()
      );

      const reports = await Promise.all(promises);
      const endTime = Date.now();
      const executionTime = endTime - startTime;

      expect(executionTime).toBeLessThan(15000); // Should handle concurrent checks
      expect(reports).toHaveLength(concurrentChecks);
      
      reports.forEach(report => {
        expect(report).toBeDefined();
        expect(report.overall_status).toMatch(/READY|NOT_READY|DEGRADED/);
      });
    });
  });

  describe('Production Readiness Error Handling', () => {
    it('should handle errors gracefully during readiness check', async () => {
      // Mock an error condition
      const originalConsoleError = console.error;
      console.error = vi.fn();

      // Force an error by corrupting the environment
      const originalEnv = { ...import.meta.env };
      Object.keys(import.meta.env).forEach(key => {
        if (key.startsWith('VITE_')) {
          delete (import.meta.env as any)[key];
        }
      });

      const report = await readinessAutomation.runComprehensiveReadinessCheck();

      expect(report).toBeDefined();
      expect(report.overall_status).toBe('NOT_READY');
      expect(report.readiness_score).toBeLessThan(50);
      expect(report.failed_checks.length).toBeGreaterThan(0);

      // Restore environment and console
      Object.assign(import.meta.env, originalEnv);
      console.error = originalConsoleError;
    });
  });

  describe('Production Readiness Reporting', () => {
    it('should generate comprehensive readiness report', async () => {
      const report = await readinessAutomation.runComprehensiveReadinessCheck();

      // Validate report structure
      expect(report.overall_status).toBeDefined();
      expect(report.readiness_score).toBeDefined();
      expect(report.criteria).toBeDefined();
      expect(report.failed_checks).toBeInstanceOf(Array);
      expect(report.warnings).toBeInstanceOf(Array);
      expect(report.recommendations).toBeInstanceOf(Array);
      expect(report.timestamp).toBeInstanceOf(Date);

      // Validate readiness score calculation
      const passedChecks = Object.values(report.criteria).filter(Boolean).length;
      const totalChecks = Object.keys(report.criteria).length;
      const expectedScore = Math.round((passedChecks / totalChecks) * 100);
      expect(report.readiness_score).toBe(expectedScore);
    });

    it('should provide different status levels based on readiness score', async () => {
      // Test with good configuration
      const goodReport = await readinessAutomation.runComprehensiveReadinessCheck();
      
      // Should be READY or DEGRADED with good config
      expect(goodReport.overall_status).toMatch(/READY|DEGRADED/);
      expect(goodReport.readiness_score).toBeGreaterThan(70);
    });
  });
});