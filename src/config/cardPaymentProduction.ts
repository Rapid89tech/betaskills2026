/**
 * Card Payment Production Configuration
 * 
 * Centralized configuration management for the card payment immediate access system
 * in production environments.
 */

export interface CardPaymentProductionConfig {
  // Fast-track configuration
  fastTrack: {
    enabled: boolean;
    confidenceThreshold: number;
    detectionTimeout: number;
    approvalTimeout: number;
    manualFallbackEnabled: boolean;
  };

  // Real-time sync configuration
  realTimeSync: {
    enabled: boolean;
    channels: string[];
    retryAttempts: number;
    retryDelay: number;
    crossTabTimeout: number;
  };

  // Persistence configuration
  persistence: {
    enabled: boolean;
    strategies: string[];
    conflictResolution: 'latest_wins' | 'approved_wins' | 'remote_wins' | 'manual_review';
    verificationInterval: number;
  };

  // Monitoring configuration
  monitoring: {
    enabled: boolean;
    performanceMonitoring: boolean;
    businessMetrics: boolean;
    retentionDays: number;
    thresholds: {
      webhookProcessing: number;
      paymentDetection: number;
      approvalProcessing: number;
      uiUpdate: number;
      endToEnd: number;
    };
    errorRateThreshold: number;
  };

  // Alerting configuration
  alerting: {
    webhookUrl?: string | undefined;
    email?: string | undefined;
    slackWebhook?: string | undefined;
  };

  // Security configuration
  security: {
    enhancedWebhookValidation: boolean;
    signatureAlgorithm: 'sha256' | 'sha512';
    timestampTolerance: number;
    ipVerificationEnabled: boolean;
    allowedIps: string[];
    threatDetectionEnabled: boolean;
    auditLoggingEnabled: boolean;
    auditRetentionDays: number;
  };

  // Error handling configuration
  errorHandling: {
    recoveryEnabled: boolean;
    strategies: string[];
    maxAttempts: number;
    backoffStrategy: 'linear' | 'exponential' | 'fixed';
    backoffBaseDelay: number;
    manualInterventionEnabled: boolean;
    interventionWebhook?: string | undefined;
    interventionEmail?: string | undefined;
  };

  // Course access configuration
  courseAccess: {
    immediateAccessEnabled: boolean;
    validationCacheEnabled: boolean;
    validationCacheTTL: number;
    crossDeviceSyncEnabled: boolean;
  };

  // Logging configuration
  logging: {
    detailedLogging: boolean;
    logLevel: 'debug' | 'info' | 'warn' | 'error';
    structuredLogging: boolean;
    aggregationEndpoint?: string | undefined;
  };

  // Feature flags
  features: {
    optimisticUIUpdates: boolean;
    uiRollback: boolean;
    paymentTypeCache: boolean;
    paymentTypeCacheTTL: number;
  };

  // Deployment settings
  deployment: {
    environment: string;
    version?: string | undefined;
    timestamp?: string | undefined;
    productionValidations: boolean;
    healthChecksEnabled: boolean;
    healthCheckEndpoint: string;
  };
}

/**
 * Load card payment production configuration from environment variables
 */
export function loadCardPaymentProductionConfig(): CardPaymentProductionConfig {
  const isProduction = import.meta.env.VITE_NODE_ENV === 'production';

  return {
    fastTrack: {
      enabled: getBooleanEnv('VITE_ENABLE_CARD_PAYMENT_FAST_TRACK', true),
      confidenceThreshold: getNumberEnv('VITE_CARD_PAYMENT_CONFIDENCE_THRESHOLD', 0.8),
      detectionTimeout: getNumberEnv('VITE_PAYMENT_TYPE_DETECTION_TIMEOUT', 5000),
      approvalTimeout: getNumberEnv('VITE_FAST_TRACK_APPROVAL_TIMEOUT', 10000),
      manualFallbackEnabled: getBooleanEnv('VITE_ENABLE_MANUAL_APPROVAL_FALLBACK', true)
    },

    realTimeSync: {
      enabled: getBooleanEnv('VITE_ENABLE_ENHANCED_REAL_TIME_SYNC', true),
      channels: getArrayEnv('VITE_REAL_TIME_SYNC_CHANNELS', ['localStorage', 'broadcastChannel']),
      retryAttempts: getNumberEnv('VITE_REAL_TIME_SYNC_RETRY_ATTEMPTS', 3),
      retryDelay: getNumberEnv('VITE_REAL_TIME_SYNC_RETRY_DELAY', 1000),
      crossTabTimeout: getNumberEnv('VITE_CROSS_TAB_SYNC_TIMEOUT', 2000)
    },

    persistence: {
      enabled: getBooleanEnv('VITE_ENABLE_BULLETPROOF_PERSISTENCE', true),
      strategies: getArrayEnv('VITE_PERSISTENCE_STRATEGIES', [
        'localStorage_primary',
        'localStorage_backup',
        'sessionStorage'
      ]),
      conflictResolution: getStringEnv('VITE_PERSISTENCE_CONFLICT_RESOLUTION', 'approved_wins') as any,
      verificationInterval: getNumberEnv('VITE_PERSISTENCE_VERIFICATION_INTERVAL', 30000)
    },

    monitoring: {
      enabled: getBooleanEnv('VITE_ENABLE_CARD_PAYMENT_MONITORING', true),
      performanceMonitoring: getBooleanEnv('VITE_ENABLE_PERFORMANCE_MONITORING', true),
      businessMetrics: getBooleanEnv('VITE_ENABLE_BUSINESS_METRICS', true),
      retentionDays: getNumberEnv('VITE_MONITORING_RETENTION_DAYS', 90),
      thresholds: {
        webhookProcessing: getNumberEnv('VITE_WEBHOOK_PROCESSING_THRESHOLD', 5000),
        paymentDetection: getNumberEnv('VITE_PAYMENT_DETECTION_THRESHOLD', 2000),
        approvalProcessing: getNumberEnv('VITE_APPROVAL_PROCESSING_THRESHOLD', 3000),
        uiUpdate: getNumberEnv('VITE_UI_UPDATE_THRESHOLD', 2000),
        endToEnd: getNumberEnv('VITE_END_TO_END_THRESHOLD', 10000)
      },
      errorRateThreshold: getNumberEnv('VITE_ERROR_RATE_ALERT_THRESHOLD', 5)
    },

    alerting: {
      ...(getStringEnv('VITE_ALERT_WEBHOOK_URL') && { webhookUrl: getStringEnv('VITE_ALERT_WEBHOOK_URL') }),
      ...(getStringEnv('VITE_ALERT_EMAIL') && { email: getStringEnv('VITE_ALERT_EMAIL') }),
      ...(getStringEnv('VITE_ALERT_SLACK_WEBHOOK') && { slackWebhook: getStringEnv('VITE_ALERT_SLACK_WEBHOOK') })
    },

    security: {
      enhancedWebhookValidation: getBooleanEnv('VITE_ENABLE_ENHANCED_WEBHOOK_VALIDATION', true),
      signatureAlgorithm: getStringEnv('VITE_WEBHOOK_SIGNATURE_ALGORITHM', 'sha256') as any,
      timestampTolerance: getNumberEnv('VITE_WEBHOOK_TIMESTAMP_TOLERANCE', 300),
      ipVerificationEnabled: getBooleanEnv('VITE_ENABLE_WEBHOOK_IP_VERIFICATION', isProduction),
      allowedIps: getArrayEnv('VITE_WEBHOOK_ALLOWED_IPS', []),
      threatDetectionEnabled: getBooleanEnv('VITE_ENABLE_CARD_PAYMENT_THREAT_DETECTION', true),
      auditLoggingEnabled: getBooleanEnv('VITE_ENABLE_CARD_PAYMENT_AUDIT_LOGGING', true),
      auditRetentionDays: getNumberEnv('VITE_AUDIT_LOG_RETENTION_DAYS', 365)
    },

    errorHandling: {
      recoveryEnabled: getBooleanEnv('VITE_ENABLE_ERROR_RECOVERY', true),
      strategies: getArrayEnv('VITE_ERROR_RECOVERY_STRATEGIES', [
        'retry',
        'fallback',
        'manual_intervention'
      ]),
      maxAttempts: getNumberEnv('VITE_MAX_RECOVERY_ATTEMPTS', 3),
      backoffStrategy: getStringEnv('VITE_RECOVERY_BACKOFF_STRATEGY', 'exponential') as any,
      backoffBaseDelay: getNumberEnv('VITE_RECOVERY_BACKOFF_BASE_DELAY', 1000),
      manualInterventionEnabled: getBooleanEnv('VITE_ENABLE_MANUAL_INTERVENTION', true),
      ...(getStringEnv('VITE_MANUAL_INTERVENTION_WEBHOOK') && { interventionWebhook: getStringEnv('VITE_MANUAL_INTERVENTION_WEBHOOK') }),
      ...(getStringEnv('VITE_MANUAL_INTERVENTION_EMAIL') && { interventionEmail: getStringEnv('VITE_MANUAL_INTERVENTION_EMAIL') })
    },

    courseAccess: {
      immediateAccessEnabled: getBooleanEnv('VITE_ENABLE_IMMEDIATE_ACCESS_GRANTING', true),
      validationCacheEnabled: getBooleanEnv('VITE_ENABLE_ACCESS_VALIDATION_CACHE', true),
      validationCacheTTL: getNumberEnv('VITE_ACCESS_VALIDATION_CACHE_TTL', 300),
      crossDeviceSyncEnabled: getBooleanEnv('VITE_ENABLE_CROSS_DEVICE_ACCESS_SYNC', true)
    },

    logging: {
      detailedLogging: getBooleanEnv('VITE_ENABLE_DETAILED_CARD_PAYMENT_LOGGING', !isProduction),
      logLevel: getStringEnv('VITE_CARD_PAYMENT_LOG_LEVEL', isProduction ? 'info' : 'debug') as any,
      structuredLogging: getBooleanEnv('VITE_ENABLE_STRUCTURED_LOGGING', true),
      ...(getStringEnv('VITE_LOG_AGGREGATION_ENDPOINT') && { aggregationEndpoint: getStringEnv('VITE_LOG_AGGREGATION_ENDPOINT') })
    },

    features: {
      optimisticUIUpdates: getBooleanEnv('VITE_ENABLE_OPTIMISTIC_UI_UPDATES', true),
      uiRollback: getBooleanEnv('VITE_ENABLE_UI_ROLLBACK', true),
      paymentTypeCache: getBooleanEnv('VITE_ENABLE_PAYMENT_TYPE_CACHE', true),
      paymentTypeCacheTTL: getNumberEnv('VITE_PAYMENT_TYPE_CACHE_TTL', 3600)
    },

    deployment: {
      environment: getStringEnv('VITE_DEPLOYMENT_ENVIRONMENT', isProduction ? 'production' : 'development') || 'development',
      ...(getStringEnv('VITE_DEPLOYMENT_VERSION') && { version: getStringEnv('VITE_DEPLOYMENT_VERSION') }),
      ...(getStringEnv('VITE_DEPLOYMENT_TIMESTAMP') && { timestamp: getStringEnv('VITE_DEPLOYMENT_TIMESTAMP') }),
      productionValidations: getBooleanEnv('VITE_ENABLE_PRODUCTION_VALIDATIONS', isProduction),
      healthChecksEnabled: getBooleanEnv('VITE_ENABLE_HEALTH_CHECKS', true),
      healthCheckEndpoint: getStringEnv('VITE_HEALTH_CHECK_ENDPOINT', '/.netlify/functions/health-check') || '/.netlify/functions/health-check'
    }
  };
}

/**
 * Validate production configuration
 */
export function validateProductionConfig(config: CardPaymentProductionConfig): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const isProduction = config.deployment.environment === 'production';

  // Production-specific validations
  if (isProduction) {
    // Fast-track validations
    if (!config.fastTrack.enabled) {
      warnings.push('Card payment fast-track is disabled in production');
    }

    if (config.fastTrack.confidenceThreshold < 0.7) {
      warnings.push('Card payment confidence threshold is low for production');
    }

    // Security validations
    if (!config.security.enhancedWebhookValidation) {
      errors.push('Enhanced webhook validation must be enabled in production');
    }

    if (!config.security.auditLoggingEnabled) {
      errors.push('Audit logging must be enabled in production');
    }

    if (config.security.ipVerificationEnabled && config.security.allowedIps.length === 0) {
      errors.push('Webhook IP verification is enabled but no IPs are whitelisted');
    }

    // Monitoring validations
    if (!config.monitoring.enabled) {
      warnings.push('Card payment monitoring is disabled in production');
    }

    if (!config.alerting.webhookUrl && !config.alerting.email && !config.alerting.slackWebhook) {
      warnings.push('No alerting endpoints configured');
    }

    // Error handling validations
    if (!config.errorHandling.recoveryEnabled) {
      warnings.push('Error recovery is disabled in production');
    }

    if (!config.errorHandling.manualInterventionEnabled) {
      warnings.push('Manual intervention is disabled in production');
    }
  }

  // General validations
  if (config.fastTrack.confidenceThreshold < 0 || config.fastTrack.confidenceThreshold > 1) {
    errors.push('Confidence threshold must be between 0 and 1');
  }

  if (config.fastTrack.detectionTimeout <= 0) {
    errors.push('Detection timeout must be positive');
  }

  if (config.realTimeSync.retryAttempts < 0) {
    errors.push('Retry attempts must be non-negative');
  }

  if (config.monitoring.errorRateThreshold < 0 || config.monitoring.errorRateThreshold > 100) {
    errors.push('Error rate threshold must be between 0 and 100');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Get configuration summary for logging
 */
export function getConfigSummary(config: CardPaymentProductionConfig): Record<string, any> {
  return {
    environment: config.deployment.environment,
    version: config.deployment.version,
    fastTrackEnabled: config.fastTrack.enabled,
    realTimeSyncEnabled: config.realTimeSync.enabled,
    monitoringEnabled: config.monitoring.enabled,
    securityEnhanced: config.security.enhancedWebhookValidation,
    auditLoggingEnabled: config.security.auditLoggingEnabled,
    errorRecoveryEnabled: config.errorHandling.recoveryEnabled
  };
}

// Helper functions
function getBooleanEnv(key: string, defaultValue: boolean = false): boolean {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1' || value === true;
}

function getNumberEnv(key: string, defaultValue: number): number {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  const parsed = typeof value === 'number' ? value : parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
}

function getStringEnv(key: string, defaultValue?: string): string | undefined {
  return import.meta.env[key] || defaultValue;
}

function getArrayEnv(key: string, defaultValue: string[] = []): string[] {
  const value = import.meta.env[key];
  if (!value) return defaultValue;
  return typeof value === 'string' ? value.split(',').map(v => v.trim()) : defaultValue;
}

// Export singleton configuration
export const cardPaymentProductionConfig = loadCardPaymentProductionConfig();

// Validate configuration on load
if (typeof window !== 'undefined') {
  const validation = validateProductionConfig(cardPaymentProductionConfig);
  const isProduction = cardPaymentProductionConfig.deployment.environment === 'production';
  
  if (validation.errors.length > 0) {
    console.error('❌ Card Payment Production Configuration Errors:', validation.errors);
    if (isProduction) {
      throw new Error(`Invalid production configuration: ${validation.errors.join(', ')}`);
    }
  }

  if (validation.warnings.length > 0) {
    console.warn('⚠️ Card Payment Production Configuration Warnings:', validation.warnings);
  }

  if (cardPaymentProductionConfig.logging.detailedLogging) {
    console.log('🔧 Card Payment Production Configuration:', getConfigSummary(cardPaymentProductionConfig));
  }
}
