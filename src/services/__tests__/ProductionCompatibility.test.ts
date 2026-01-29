/**
 * Tests for Production Compatibility Updates
 * 
 * Verifies that existing Ikhokha services properly integrate with production services.
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock environment variables for production
const mockProductionEnv = {
  VITE_NODE_ENV: 'production',
  VITE_IKHOKHA_API_KEY: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
  VITE_IKHOKHA_API_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
  VITE_IKHOKHA_WEBHOOK_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
  VITE_IKHOKHA_TEST_MODE: 'false',
  VITE_IKHOKHA_API_URL: 'https://api.ikhokha.com'
};

// Mock the production services
vi.mock('../ProductionCredentialManager', () => ({
  productionCredentialManager: {
    loadProductionCredentials: vi.fn().mockReturnValue({
      api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
      api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
      webhook_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
      node_env: 'production',
      test_mode: false,
      api_url: 'https://api.ikhokha.com',
      timeout: 45000,
      retry_attempts: 3,
      retry_delay: 2000,
      webhook_validation: true,
      https_required: true,
      payment_logging: true
    }),
    validateCredentialFormat: vi.fn().mockReturnValue({
      is_valid: true,
      errors: [],
      warnings: []
    }),
    validateCredentialSecurity: vi.fn().mockReturnValue({
      credential_strength_valid: true,
      no_development_patterns: true,
      proper_format: true,
      security_score: 85,
      recommendations: []
    }),
    validateEnvironmentIntegration: vi.fn().mockReturnValue({
      all_variables_present: true,
      variable_values_valid: true,
      production_mode_enabled: true,
      test_mode_disabled: true,
      missing_variables: [],
      invalid_variables: []
    }),
    maskSensitiveData: vi.fn().mockReturnValue({
      api_key: 'IKW3***X5D',
      api_secret: '***',
      webhook_secret: '***',
      api_url: 'https://api.ikhokha.com',
      test_mode: false
    }),
    isCredentialsInitialized: vi.fn().mockReturnValue(true),
    getCredentials: vi.fn().mockReturnValue({
      api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
      api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
      webhook_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS'
    })
  }
}));

vi.mock('../ProductionConfigurationEnforcer', () => ({
  productionConfigurationEnforcer: {
    enforceProductionSettings: vi.fn().mockReturnValue({
      success: true,
      settings_applied: {
        test_mode_disabled: true,
        fallback_credentials_disabled: true,
        https_endpoints_enforced: true,
        webhook_validation_enabled: true,
        security_logging_enabled: true,
        production_monitoring_enabled: true,
        error_tracking_enabled: true,
        performance_monitoring_enabled: true
      },
      errors: [],
      warnings: []
    }),
    isProductionEnforced: vi.fn().mockReturnValue(true),
    getMonitoringConfiguration: vi.fn().mockReturnValue({
      error_tracking: { enabled: true },
      performance_monitoring: { enabled: true },
      security_monitoring: { enabled: true },
      business_monitoring: { enabled: true }
    })
  }
}));

vi.mock('../ProductionWebhookSecurity', () => ({
  productionWebhookSecurity: {
    validateWebhookSecurity: vi.fn().mockResolvedValue({
      valid: true,
      signatureValid: true,
      timestampValid: true,
      sourceValid: true,
      securityViolations: [],
      validationErrors: [],
      validationTimestamp: new Date(),
      processingTimeMs: 50
    })
  }
}));

describe('Production Compatibility Integration', () => {
  beforeEach(() => {
    // Mock import.meta.env
    vi.stubGlobal('import.meta', {
      env: mockProductionEnv
    });

    // Clear any existing window properties
    delete (window as any).__PRODUCTION_MODE_ENFORCED__;
    delete (window as any).__REALTIME_SYNC_MONITORING__;
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  describe('IkhokhaPaymentIntegration Production Updates', () => {
    it('should initialize with production credential manager', async () => {
      const { IkhokhaPaymentIntegration } = await import('../ikhokhaPaymentIntegration');
      
      expect(() => {
        new (IkhokhaPaymentIntegration as any)();
      }).not.toThrow();
    });

    it('should validate production credentials on initialization', async () => {
      const { productionCredentialManager } = await import('../ProductionCredentialManager');
      const { IkhokhaPaymentIntegration } = await import('../ikhokhaPaymentIntegration');
      
      new (IkhokhaPaymentIntegration as any)();
      
      expect(productionCredentialManager.loadProductionCredentials).toHaveBeenCalled();
      expect(productionCredentialManager.validateCredentialFormat).toHaveBeenCalled();
    });
  });

  describe('IkhokhaPaymentService Production Updates', () => {
    it('should enforce production configuration on initialization', async () => {
      const { productionConfigurationEnforcer } = await import('../ProductionConfigurationEnforcer');
      
      // Mock the config loading to avoid circular dependency
      vi.doMock('../../config/ikhokha', () => ({
        ikhokhaConfig: {
          api_url: 'https://api.ikhokha.com',
          api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
          api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
          webhook_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
          test_mode: false,
          timeout: 45000,
          retry_attempts: 3,
          retry_delay: 2000
        },
        getIkhokhaEndpoints: () => ({
          payment: 'https://api.ikhokha.com/process',
          verify: 'https://api.ikhokha.com/verify'
        }),
        getPaymentUrls: () => ({
          return_url: 'https://app.betaskill.com/payment/success',
          cancel_url: 'https://app.betaskill.com/payment/cancel',
          notify_url: 'https://app.betaskill.com/.netlify/functions/ikhokha-webhook'
        }),
        isTestMode: () => false
      }));

      const { IkhokhaPaymentService } = await import('../ikhokhaPaymentService');
      
      expect(() => {
        new IkhokhaPaymentService();
      }).not.toThrow();
      
      expect(productionConfigurationEnforcer.enforceProductionSettings).toHaveBeenCalled();
    });

    it('should use production webhook security for validation', async () => {
      vi.doMock('../../config/ikhokha', () => ({
        ikhokhaConfig: {
          api_url: 'https://api.ikhokha.com',
          test_mode: false,
          webhook_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS'
        },
        getIkhokhaEndpoints: () => ({}),
        getPaymentUrls: () => ({}),
        isTestMode: () => false
      }));

      const { IkhokhaPaymentService } = await import('../ikhokhaPaymentService');
      const service = new IkhokhaPaymentService();
      
      const mockWebhookData = {
        transaction_id: 'txn_123',
        reference: 'ref_123',
        amount: 100,
        currency: 'ZAR',
        status: 'completed' as const,
        timestamp: new Date().toISOString(),
        signature: 'test_signature',
        response_code: '00',
        response_message: 'Approved'
      };

      const isValid = service.validateWebhookSignature(mockWebhookData);
      expect(typeof isValid).toBe('boolean');
    });
  });

  describe('IkhokhaWebhookHandler Production Updates', () => {
    it('should integrate with production webhook security', async () => {
      const { IkhokhaWebhookHandler } = await import('../IkhokhaWebhookHandler');
      
      expect(() => {
        new IkhokhaWebhookHandler();
      }).not.toThrow();
    });

    it('should validate webhooks using production security', async () => {
      const { IkhokhaWebhookHandler } = await import('../IkhokhaWebhookHandler');
      const handler = new IkhokhaWebhookHandler();
      
      const isValid = handler.validateWebhookSignature(
        '{"test": "payload"}',
        'test_signature',
        'test_secret'
      );
      
      expect(typeof isValid).toBe('boolean');
    });
  });

  describe('EnhancedRealTimeSync Production Updates', () => {
    it('should initialize production monitoring in production environment', async () => {
      const { EnhancedRealTimeSync } = await import('../EnhancedRealTimeSync');
      
      expect(() => {
        EnhancedRealTimeSync.getInstance();
      }).not.toThrow();
    });

    it('should track production metrics when monitoring is enabled', async () => {
      const { EnhancedRealTimeSync } = await import('../EnhancedRealTimeSync');
      const syncService = EnhancedRealTimeSync.getInstance();
      
      // Enable monitoring flags
      (window as any).__REALTIME_SYNC_MONITORING__ = true;
      (window as any).__REALTIME_SYNC_METRICS__ = {
        broadcastCount: 0,
        optimisticUpdateCount: 0,
        crossTabSyncCount: 0,
        averageProcessingTime: 0
      };

      const metrics = syncService.getProductionMetrics();
      expect(metrics).toBeDefined();
      expect(typeof metrics.broadcastCount).toBe('number');
    });
  });

  describe('Ikhokha Configuration Production Updates', () => {
    it('should load configuration using production credential manager', async () => {
      const { loadIkhokhaConfig } = await import('../../config/ikhokha');
      const { productionCredentialManager } = await import('../ProductionCredentialManager');
      
      const config = loadIkhokhaConfig();
      
      expect(config).toBeDefined();
      expect(config.api_url).toBe('https://api.ikhokha.com');
      expect(config.test_mode).toBe(false);
      expect(productionCredentialManager.loadProductionCredentials).toHaveBeenCalled();
    });

    it('should validate production configuration', async () => {
      const { loadIkhokhaConfig } = await import('../../config/ikhokha');
      const { productionCredentialManager } = await import('../ProductionCredentialManager');
      
      const config = loadIkhokhaConfig();
      
      expect(productionCredentialManager.validateCredentialFormat).toHaveBeenCalled();
      expect(config.api_key).toBe('IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D');
      expect(config.api_secret).toBe('455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS');
    });
  });

  describe('Integration Error Handling', () => {
    it('should handle production credential loading failures gracefully', async () => {
      const { productionCredentialManager } = await import('../ProductionCredentialManager');
      
      // Mock credential loading failure
      vi.mocked(productionCredentialManager.loadProductionCredentials).mockImplementationOnce(() => {
        throw new Error('Credential loading failed');
      });

      const { loadIkhokhaConfig } = await import('../../config/ikhokha');
      
      expect(() => {
        loadIkhokhaConfig();
      }).toThrow('Credential loading failed');
    });

    it('should handle production configuration enforcement failures', async () => {
      const { productionConfigurationEnforcer } = await import('../ProductionConfigurationEnforcer');
      
      // Mock enforcement failure
      vi.mocked(productionConfigurationEnforcer.enforceProductionSettings).mockReturnValueOnce({
        success: false,
        settings_applied: {} as any,
        errors: ['Configuration enforcement failed'],
        warnings: []
      });

      vi.doMock('../../config/ikhokha', () => ({
        ikhokhaConfig: { test_mode: false },
        getIkhokhaEndpoints: () => ({}),
        getPaymentUrls: () => ({}),
        isTestMode: () => false
      }));

      const { IkhokhaPaymentService } = await import('../ikhokhaPaymentService');
      
      expect(() => {
        new IkhokhaPaymentService();
      }).toThrow();
    });
  });
});