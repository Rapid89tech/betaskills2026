/**
 * Startup Validation Tests
 * 
 * Comprehensive tests for the enhanced startup validation system
 */

import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from 'vitest';
import { StartupValidator } from '../startupValidation';
import { productionValidator } from '../../services/ProductionValidator';

// Mock the ProductionValidator
vi.mock('../../services/ProductionValidator', () => ({
  productionValidator: {
    validateProductionReadiness: vi.fn(),
    getConfigurationHealth: vi.fn()
  }
}));

describe('StartupValidator', () => {
  let validator: StartupValidator;
  let mockValidateProductionReadiness: Mock;
  let mockGetConfigurationHealth: Mock;

  beforeEach(() => {
    validator = StartupValidator.getInstance();
    mockValidateProductionReadiness = productionValidator.validateProductionReadiness as Mock;
    mockGetConfigurationHealth = productionValidator.getConfigurationHealth as Mock;
    
    // Reset mocks
    vi.clearAllMocks();
    
    // Clear validation history
    validator.clearHistory();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = StartupValidator.getInstance();
      const instance2 = StartupValidator.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Environment Detection', () => {
    it('should detect production environment', async () => {
      vi.stubEnv('VITE_NODE_ENV', 'production');
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const result = await validator.performStartupValidation();
      
      expect(result.environment).toBe('production');
      expect(result.success).toBe(true);
    });

    it('should detect development environment', async () => {
      vi.stubEnv('VITE_NODE_ENV', 'development');
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const result = await validator.performStartupValidation();
      
      expect(result.environment).toBe('development');
    });

    it('should detect test environment', async () => {
      vi.stubEnv('NODE_ENV', 'test');
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const result = await validator.performStartupValidation();
      
      expect(result.environment).toBe('test');
    });
  });

  describe('Development Environment Validation', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_NODE_ENV', 'development');
    });

    it('should skip validation in development when requested', async () => {
      const result = await validator.performStartupValidation({
        skipInDevelopment: true
      });
      
      expect(result.success).toBe(true);
      expect(result.canProceed).toBe(true);
      expect(result.environment).toBe('development');
      expect(result.recommendations).toContain('Development environment - validation skipped');
      
      // Should not call production validator
      expect(mockValidateProductionReadiness).not.toHaveBeenCalled();
    });

    it('should perform validation in development when not skipped', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        issues: ['Test issue'],
        recommendations: ['Test recommendation'],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const result = await validator.performStartupValidation({
        skipInDevelopment: false
      });
      
      expect(result.environment).toBe('development');
      expect(result.errors).toContain('Test issue');
      expect(result.recommendations).toContain('Test recommendation');
      
      // Should call production validator
      expect(mockValidateProductionReadiness).toHaveBeenCalled();
    });
  });

  describe('Production Environment Validation', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_NODE_ENV', 'production');
    });

    it('should pass validation for healthy production environment', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: ['Minor recommendation'],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const result = await validator.performStartupValidation();
      
      expect(result.success).toBe(true);
      expect(result.canProceed).toBe(true);
      expect(result.environment).toBe('production');
      expect(result.errors).toHaveLength(0);
      expect(result.recommendations).toContain('Minor recommendation');
    });

    it('should fail validation for unhealthy production environment', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        issues: ['Critical production issue'],
        recommendations: [],
        configurationValid: false,
        securityValid: false,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: false },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const result = await validator.performStartupValidation();
      
      expect(result.success).toBe(false);
      expect(result.canProceed).toBe(false);
      expect(result.environment).toBe('production');
      expect(result.errors).toContain('Critical production issue');
      expect(result.errors).toContain('Production environment is not ready for live transactions');
      expect(result.errors).toContain('Production security validation failed');
    });

    it('should handle configuration health issues', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: false },
        databaseConfig: { healthy: false },
        webhookConfig: { healthy: false }
      });

      const result = await validator.performStartupValidation();
      
      expect(result.warnings).toContain('Ikhokha configuration has issues');
      expect(result.warnings).toContain('Database configuration has issues');
      expect(result.warnings).toContain('Webhook configuration has issues');
    });
  });

  describe('Strict Mode Validation', () => {
    beforeEach(() => {
      vi.stubEnv('VITE_NODE_ENV', 'development');
    });

    it('should treat warnings as errors in strict mode', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: false }, // This will create a warning
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const result = await validator.performStartupValidation({
        strictMode: true,
        allowWarnings: false
      });
      
      expect(result.success).toBe(false);
      expect(result.canProceed).toBe(false);
      expect(result.errors).toContain('Strict mode enabled - warnings treated as errors');
    });

    it('should allow warnings in non-strict mode', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: false }, // This will create a warning
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const result = await validator.performStartupValidation({
        strictMode: false,
        allowWarnings: true
      });
      
      expect(result.success).toBe(true);
      expect(result.canProceed).toBe(true);
      expect(result.warnings).toContain('Ikhokha configuration has issues');
    });
  });

  describe('Error Handling', () => {
    it('should handle validation errors gracefully', async () => {
      mockValidateProductionReadiness.mockImplementation(() => {
        throw new Error('Validation system failure');
      });

      const result = await validator.performStartupValidation();
      
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Startup validation failed: Validation system failure');
      
      // In development, should still allow proceeding
      if (result.environment === 'development') {
        expect(result.canProceed).toBe(true);
      }
    });

    it('should prevent proceeding in production on validation errors', async () => {
      vi.stubEnv('VITE_NODE_ENV', 'production');
      
      mockValidateProductionReadiness.mockImplementation(() => {
        throw new Error('Critical validation failure');
      });

      const result = await validator.performStartupValidation();
      
      expect(result.success).toBe(false);
      expect(result.canProceed).toBe(false);
      expect(result.environment).toBe('production');
    });
  });

  describe('Validation History', () => {
    it('should track validation history', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      await validator.performStartupValidation();
      await validator.performStartupValidation();
      
      const history = validator.getValidationHistory();
      expect(history).toHaveLength(2);
      
      const lastValidation = validator.getLastValidation();
      expect(lastValidation).toBeDefined();
      expect(lastValidation?.timestamp).toBeInstanceOf(Date);
    });

    it('should limit validation history size', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      // Perform more validations than the limit (10)
      for (let i = 0; i < 15; i++) {
        await validator.performStartupValidation();
      }
      
      const history = validator.getValidationHistory();
      expect(history.length).toBeLessThanOrEqual(10);
    });

    it('should clear validation history', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      await validator.performStartupValidation();
      expect(validator.getValidationHistory()).toHaveLength(1);
      
      validator.clearHistory();
      expect(validator.getValidationHistory()).toHaveLength(0);
      expect(validator.getLastValidation()).toBeNull();
    });
  });

  describe('Production Readiness Check', () => {
    it('should return true for production-ready system', async () => {
      vi.stubEnv('VITE_NODE_ENV', 'production');
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const isReady = await validator.isProductionReady();
      expect(isReady).toBe(true);
    });

    it('should return false for non-production environment', async () => {
      vi.stubEnv('VITE_NODE_ENV', 'development');
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const isReady = await validator.isProductionReady();
      expect(isReady).toBe(false);
    });

    it('should return false for unhealthy production system', async () => {
      vi.stubEnv('VITE_NODE_ENV', 'production');
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        issues: ['Critical issue'],
        recommendations: [],
        configurationValid: false,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: false },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      const isReady = await validator.isProductionReady();
      expect(isReady).toBe(false);
    });
  });

  describe('Validation Report Generation', () => {
    it('should generate comprehensive validation report', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        issues: ['Critical issue', 'Security problem'],
        recommendations: ['Fix configuration', 'Update credentials'],
        configurationValid: false,
        securityValid: false,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: false },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      await validator.performStartupValidation();
      
      const report = validator.generateValidationReport();
      
      expect(report).toContain('=== Startup Validation Report ===');
      expect(report).toContain('Status: FAILED');
      expect(report).toContain('Can Proceed: NO');
      expect(report).toContain('ERRORS:');
      expect(report).toContain('Critical issue');
      expect(report).toContain('Security problem');
      expect(report).toContain('RECOMMENDATIONS:');
      expect(report).toContain('Fix configuration');
      expect(report).toContain('Update credentials');
    });

    it('should handle empty validation history', () => {
      const report = validator.generateValidationReport();
      expect(report).toBe('No validation performed yet');
    });
  });

  describe('validateAndThrow Method', () => {
    it('should not throw for successful validation', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      await expect(validator.validateAndThrow()).resolves.not.toThrow();
    });

    it('should throw for failed validation', async () => {
      mockValidateProductionReadiness.mockReturnValue({
        ready: false,
        issues: ['Critical error'],
        recommendations: [],
        configurationValid: false,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: false },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      await expect(validator.validateAndThrow()).rejects.toThrow('Startup validation failed: Critical error');
    });
  });

  describe('Logging Levels', () => {
    it('should respect silent log level', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      await validator.performStartupValidation({ logLevel: 'silent' });
      
      expect(consoleSpy).not.toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });

    it('should respect minimal log level', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      mockValidateProductionReadiness.mockReturnValue({
        ready: true,
        issues: [],
        recommendations: [],
        configurationValid: true,
        securityValid: true,
        performanceValid: true
      });
      
      mockGetConfigurationHealth.mockReturnValue({
        ikhokhaConfig: { healthy: true },
        databaseConfig: { healthy: true },
        webhookConfig: { healthy: true }
      });

      await validator.performStartupValidation({ logLevel: 'minimal' });
      
      expect(consoleSpy).toHaveBeenCalledWith('✅ Startup validation PASSED');
      
      consoleSpy.mockRestore();
    });
  });
});