/**
 * Card Payment Deployment Verification Tests
 * 
 * Comprehensive tests to verify the card payment system is properly configured
 * and ready for production deployment.
 */

import { describe, it, expect } from 'vitest';
import { cardPaymentProductionConfig, validateProductionConfig } from '@/config/cardPaymentProduction';
import { checkEnvironmentConfig } from '@/config/ikhokha';
import { cardPaymentMonitoring } from '@/services/CardPaymentMonitoring';
import { supabase } from '@/integrations/supabase/client';

describe('Card Payment Deployment Verification', () => {
  describe('Configuration Validation', () => {
    it('should have valid production configuration', () => {
      const validation = validateProductionConfig(cardPaymentProductionConfig);
      
      expect(validation.valid).toBe(true);
      expect(validation.errors).toHaveLength(0);
      
      if (validation.warnings.length > 0) {
        console.warn('Configuration warnings:', validation.warnings);
      }
    });

    it('should have valid Ikhokha configuration', () => {
      const configCheck = checkEnvironmentConfig();
      
      expect(configCheck.valid).toBe(true);
      expect(configCheck.missing).toHaveLength(0);
      
      if (configCheck.warnings.length > 0) {
        console.warn('Ikhokha configuration warnings:', configCheck.warnings);
      }
    });

    it('should have production environment variables set', () => {
      const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
      
      if (isProduction) {
        expect(import.meta.env.VITE_IKHOKHA_API_KEY).toBeDefined();
        expect(import.meta.env.VITE_IKHOKHA_API_SECRET).toBeDefined();
        expect(import.meta.env.VITE_IKHOKHA_WEBHOOK_SECRET).toBeDefined();
        expect(import.meta.env.VITE_IKHOKHA_TEST_MODE).toBe('false');
      }
    });

    it('should have monitoring enabled in production', () => {
      const isProduction = cardPaymentProductionConfig.deployment.environment === 'production';
      
      if (isProduction) {
        expect(cardPaymentProductionConfig.monitoring.enabled).toBe(true);
        expect(cardPaymentProductionConfig.security.auditLoggingEnabled).toBe(true);
      }
    });

    it('should have alerting configured', () => {
      const isProduction = cardPaymentProductionConfig.deployment.environment === 'production';
      
      if (isProduction) {
        const hasAlerting = 
          cardPaymentProductionConfig.alerting.webhookUrl ||
          cardPaymentProductionConfig.alerting.email ||
          cardPaymentProductionConfig.alerting.slackWebhook;
        
        expect(hasAlerting).toBe(true);
      }
    });
  });

  describe('Security Configuration', () => {
    it('should have enhanced webhook validation enabled', () => {
      expect(cardPaymentProductionConfig.security.enhancedWebhookValidation).toBe(true);
    });

    it('should have audit logging enabled', () => {
      expect(cardPaymentProductionConfig.security.auditLoggingEnabled).toBe(true);
    });

    it('should have threat detection enabled', () => {
      expect(cardPaymentProductionConfig.security.threatDetectionEnabled).toBe(true);
    });

    it('should have appropriate webhook timestamp tolerance', () => {
      const tolerance = cardPaymentProductionConfig.security.timestampTolerance;
      expect(tolerance).toBeGreaterThan(0);
      expect(tolerance).toBeLessThanOrEqual(600); // Max 10 minutes
    });

    it('should use secure signature algorithm', () => {
      const algorithm = cardPaymentProductionConfig.security.signatureAlgorithm;
      expect(['sha256', 'sha512']).toContain(algorithm);
    });

    it('should have IP verification configured for production', () => {
      const isProduction = cardPaymentProductionConfig.deployment.environment === 'production';
      
      if (isProduction && cardPaymentProductionConfig.security.ipVerificationEnabled) {
        expect(cardPaymentProductionConfig.security.allowedIps.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Fast-Track Configuration', () => {
    it('should have fast-track enabled', () => {
      expect(cardPaymentProductionConfig.fastTrack.enabled).toBe(true);
    });

    it('should have appropriate confidence threshold', () => {
      const threshold = cardPaymentProductionConfig.fastTrack.confidenceThreshold;
      expect(threshold).toBeGreaterThanOrEqual(0.7);
      expect(threshold).toBeLessThanOrEqual(1.0);
    });

    it('should have reasonable timeouts', () => {
      expect(cardPaymentProductionConfig.fastTrack.detectionTimeout).toBeGreaterThan(0);
      expect(cardPaymentProductionConfig.fastTrack.approvalTimeout).toBeGreaterThan(0);
      expect(cardPaymentProductionConfig.fastTrack.detectionTimeout).toBeLessThan(30000);
      expect(cardPaymentProductionConfig.fastTrack.approvalTimeout).toBeLessThan(30000);
    });

    it('should have manual fallback enabled', () => {
      expect(cardPaymentProductionConfig.fastTrack.manualFallbackEnabled).toBe(true);
    });
  });

  describe('Real-Time Sync Configuration', () => {
    it('should have real-time sync enabled', () => {
      expect(cardPaymentProductionConfig.realTimeSync.enabled).toBe(true);
    });

    it('should have sync channels configured', () => {
      expect(cardPaymentProductionConfig.realTimeSync.channels.length).toBeGreaterThan(0);
    });

    it('should have retry configuration', () => {
      expect(cardPaymentProductionConfig.realTimeSync.retryAttempts).toBeGreaterThanOrEqual(1);
      expect(cardPaymentProductionConfig.realTimeSync.retryDelay).toBeGreaterThan(0);
    });

    it('should have reasonable cross-tab timeout', () => {
      const timeout = cardPaymentProductionConfig.realTimeSync.crossTabTimeout;
      expect(timeout).toBeGreaterThan(0);
      expect(timeout).toBeLessThan(10000);
    });
  });

  describe('Persistence Configuration', () => {
    it('should have bulletproof persistence enabled', () => {
      expect(cardPaymentProductionConfig.persistence.enabled).toBe(true);
    });

    it('should have multiple persistence strategies', () => {
      expect(cardPaymentProductionConfig.persistence.strategies.length).toBeGreaterThanOrEqual(2);
    });

    it('should have conflict resolution strategy', () => {
      const strategy = cardPaymentProductionConfig.persistence.conflictResolution;
      expect(['latest_wins', 'approved_wins', 'remote_wins', 'manual_review']).toContain(strategy);
    });

    it('should have verification interval configured', () => {
      expect(cardPaymentProductionConfig.persistence.verificationInterval).toBeGreaterThan(0);
    });
  });

  describe('Monitoring Configuration', () => {
    it('should have monitoring enabled', () => {
      expect(cardPaymentProductionConfig.monitoring.enabled).toBe(true);
    });

    it('should have performance monitoring enabled', () => {
      expect(cardPaymentProductionConfig.monitoring.performanceMonitoring).toBe(true);
    });

    it('should have business metrics enabled', () => {
      expect(cardPaymentProductionConfig.monitoring.businessMetrics).toBe(true);
    });

    it('should have reasonable performance thresholds', () => {
      const thresholds = cardPaymentProductionConfig.monitoring.thresholds;
      
      expect(thresholds.webhookProcessing).toBeGreaterThan(0);
      expect(thresholds.paymentDetection).toBeGreaterThan(0);
      expect(thresholds.approvalProcessing).toBeGreaterThan(0);
      expect(thresholds.uiUpdate).toBeGreaterThan(0);
      expect(thresholds.endToEnd).toBeGreaterThan(0);
      
      // Ensure thresholds are reasonable (not too high)
      expect(thresholds.endToEnd).toBeLessThan(60000); // Less than 1 minute
    });

    it('should have error rate threshold configured', () => {
      const threshold = cardPaymentProductionConfig.monitoring.errorRateThreshold;
      expect(threshold).toBeGreaterThan(0);
      expect(threshold).toBeLessThanOrEqual(100);
    });
  });

  describe('Error Handling Configuration', () => {
    it('should have error recovery enabled', () => {
      expect(cardPaymentProductionConfig.errorHandling.recoveryEnabled).toBe(true);
    });

    it('should have recovery strategies configured', () => {
      expect(cardPaymentProductionConfig.errorHandling.strategies.length).toBeGreaterThan(0);
    });

    it('should have reasonable max attempts', () => {
      const maxAttempts = cardPaymentProductionConfig.errorHandling.maxAttempts;
      expect(maxAttempts).toBeGreaterThanOrEqual(1);
      expect(maxAttempts).toBeLessThanOrEqual(10);
    });

    it('should have backoff strategy configured', () => {
      const strategy = cardPaymentProductionConfig.errorHandling.backoffStrategy;
      expect(['linear', 'exponential', 'fixed']).toContain(strategy);
    });

    it('should have manual intervention enabled', () => {
      expect(cardPaymentProductionConfig.errorHandling.manualInterventionEnabled).toBe(true);
    });
  });

  describe('Database Tables', () => {
    it('should have card_payment_metrics table', async () => {
      const { error } = await supabase
        .from('card_payment_metrics')
        .select('*')
        .limit(1);
      
      expect(error).toBeNull();
    });

    it('should have card_payment_performance table', async () => {
      const { error } = await supabase
        .from('card_payment_performance')
        .select('*')
        .limit(1);
      
      expect(error).toBeNull();
    });

    it('should have card_payment_alerts table', async () => {
      const { error } = await supabase
        .from('card_payment_alerts')
        .select('*')
        .limit(1);
      
      expect(error).toBeNull();
    });

    it('should have fast_track_approvals table', async () => {
      const { error } = await supabase
        .from('fast_track_approvals')
        .select('*')
        .limit(1);
      
      expect(error).toBeNull();
    });
  });

  describe('Monitoring Service', () => {
    it('should be able to track metrics', async () => {
      await expect(
        cardPaymentMonitoring.trackCardPaymentMetrics({
          totalCardPayments: 1,
          successfulApprovals: 1,
          failedApprovals: 0,
          averageProcessingTime: 1000,
          immediateAccessGranted: 1,
          uiUpdateSuccessRate: 100,
          errorRate: 0
        })
      ).resolves.not.toThrow();
    });

    it('should be able to get metrics summary', async () => {
      const summary = await cardPaymentMonitoring.getMetricsSummary('day');
      
      expect(summary).toBeDefined();
      expect(summary.timestamp).toBeInstanceOf(Date);
    });

    it('should be able to get performance summary', async () => {
      const summary = await cardPaymentMonitoring.getPerformanceSummary('day');
      
      expect(summary).toBeDefined();
      expect(summary.timestamp).toBeInstanceOf(Date);
    });

    it('should be able to get active alerts', async () => {
      const alerts = await cardPaymentMonitoring.getActiveAlerts();
      
      expect(Array.isArray(alerts)).toBe(true);
    });
  });

  describe('Feature Flags', () => {
    it('should have optimistic UI updates enabled', () => {
      expect(cardPaymentProductionConfig.features.optimisticUIUpdates).toBe(true);
    });

    it('should have UI rollback enabled', () => {
      expect(cardPaymentProductionConfig.features.uiRollback).toBe(true);
    });

    it('should have payment type cache configured', () => {
      if (cardPaymentProductionConfig.features.paymentTypeCache) {
        expect(cardPaymentProductionConfig.features.paymentTypeCacheTTL).toBeGreaterThan(0);
      }
    });
  });

  describe('Deployment Settings', () => {
    it('should have deployment environment set', () => {
      expect(cardPaymentProductionConfig.deployment.environment).toBeDefined();
      expect(['development', 'staging', 'production']).toContain(
        cardPaymentProductionConfig.deployment.environment
      );
    });

    it('should have health checks enabled', () => {
      expect(cardPaymentProductionConfig.deployment.healthChecksEnabled).toBe(true);
    });

    it('should have health check endpoint configured', () => {
      expect(cardPaymentProductionConfig.deployment.healthCheckEndpoint).toBeDefined();
      expect(cardPaymentProductionConfig.deployment.healthCheckEndpoint.length).toBeGreaterThan(0);
    });

    it('should have production validations enabled for production', () => {
      const isProduction = cardPaymentProductionConfig.deployment.environment === 'production';
      
      if (isProduction) {
        expect(cardPaymentProductionConfig.deployment.productionValidations).toBe(true);
      }
    });
  });

  describe('Integration Readiness', () => {
    it('should have all required services available', () => {
      expect(cardPaymentMonitoring).toBeDefined();
      expect(supabase).toBeDefined();
    });

    it('should have proper error handling in place', () => {
      expect(cardPaymentProductionConfig.errorHandling.recoveryEnabled).toBe(true);
      expect(cardPaymentProductionConfig.errorHandling.manualInterventionEnabled).toBe(true);
    });

    it('should have comprehensive logging configured', () => {
      expect(cardPaymentProductionConfig.logging.structuredLogging).toBe(true);
      expect(cardPaymentProductionConfig.security.auditLoggingEnabled).toBe(true);
    });

    it('should have all critical features enabled', () => {
      expect(cardPaymentProductionConfig.fastTrack.enabled).toBe(true);
      expect(cardPaymentProductionConfig.realTimeSync.enabled).toBe(true);
      expect(cardPaymentProductionConfig.persistence.enabled).toBe(true);
      expect(cardPaymentProductionConfig.courseAccess.immediateAccessEnabled).toBe(true);
    });
  });
});

describe('Production Deployment Checklist', () => {
  it('should pass all deployment verification checks', () => {
    const checks = {
      configurationValid: validateProductionConfig(cardPaymentProductionConfig).valid,
      ikhokhaConfigValid: checkEnvironmentConfig().valid,
      monitoringEnabled: cardPaymentProductionConfig.monitoring.enabled,
      securityEnabled: cardPaymentProductionConfig.security.enhancedWebhookValidation,
      auditLoggingEnabled: cardPaymentProductionConfig.security.auditLoggingEnabled,
      fastTrackEnabled: cardPaymentProductionConfig.fastTrack.enabled,
      realTimeSyncEnabled: cardPaymentProductionConfig.realTimeSync.enabled,
      persistenceEnabled: cardPaymentProductionConfig.persistence.enabled,
      errorRecoveryEnabled: cardPaymentProductionConfig.errorHandling.recoveryEnabled,
      healthChecksEnabled: cardPaymentProductionConfig.deployment.healthChecksEnabled
    };

    const failedChecks = Object.entries(checks)
      .filter(([_, passed]) => !passed)
      .map(([check]) => check);

    if (failedChecks.length > 0) {
      console.error('Failed deployment checks:', failedChecks);
    }

    expect(failedChecks).toHaveLength(0);
  });
});
