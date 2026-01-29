import { ProductionUrlValidator, ProductionUrlConfig } from '../services/ProductionUrlValidator';

/**
 * Example demonstrating how to use ProductionUrlValidator for webhook endpoint validation,
 * URL verification, and security validation in production environment
 */

async function demonstrateProductionUrlValidation() {
  console.log('=== Production URL Validator Example ===\n');

  const validator = new ProductionUrlValidator();

  // Example 1: Validate production URL configuration
  console.log('1. Validating Production URL Configuration');
  console.log('----------------------------------------');

  const productionConfig: ProductionUrlConfig = {
    production_domain: 'https://app.betaskill.com',
    webhook_endpoint: 'https://app.betaskill.com/api/webhooks/ikhokha',
    return_url: 'https://app.betaskill.com/payment/success',
    cancel_url: 'https://app.betaskill.com/payment/cancel',
    success_url: 'https://app.betaskill.com/courses',
    failure_url: 'https://app.betaskill.com/payment/failed'
  };

  const urlValidation = validator.validateProductionUrls(productionConfig);
  console.log('URL Validation Result:', {
    is_valid: urlValidation.is_valid,
    webhook_endpoint_valid: urlValidation.webhook_endpoint_valid,
    return_url_valid: urlValidation.return_url_valid,
    cancel_url_valid: urlValidation.cancel_url_valid,
    security_validation_passed: urlValidation.security_validation_passed,
    domain_validation_passed: urlValidation.domain_validation_passed,
    https_enforced: urlValidation.https_enforced,
    errors: urlValidation.errors,
    warnings: urlValidation.warnings
  });

  // Example 2: Validate webhook endpoint security
  console.log('\n2. Validating Webhook Endpoint Security');
  console.log('--------------------------------------');

  try {
    const webhookUrl = 'https://app.betaskill.com/api/webhooks/ikhokha';
    const endpointValidation = await validator.validateWebhookEndpoint(webhookUrl);
    
    console.log('Webhook Endpoint Validation:', {
      endpoint_reachable: endpointValidation.endpoint_reachable,
      https_enabled: endpointValidation.https_enabled,
      certificate_valid: endpointValidation.certificate_valid,
      response_time_acceptable: endpointValidation.response_time_acceptable,
      security_headers_present: endpointValidation.security_headers_present,
      domain_matches_production: endpointValidation.domain_matches_production
    });

    const securityValidation = await validator.validateWebhookSecurity(webhookUrl);
    console.log('Webhook Security Validation Passed:', securityValidation);
  } catch (error) {
    console.error('Webhook validation error:', error);
  }

  // Example 3: Monitor webhook processing
  console.log('\n3. Webhook Processing Monitoring');
  console.log('-------------------------------');

  // Simulate webhook processing events
  validator.recordWebhookProcessing(true, 1200); // Success in 1.2s
  validator.recordWebhookProcessing(true, 800);  // Success in 0.8s
  validator.recordWebhookProcessing(false, 5000, 'Timeout error'); // Failure
  validator.recordWebhookProcessing(true, 1500); // Success in 1.5s

  const monitoringStats = validator.getWebhookMonitoringStats();
  console.log('Webhook Monitoring Statistics:', {
    success_count: monitoringStats.success_count,
    failure_count: monitoringStats.failure_count,
    average_response_time: Math.round(monitoringStats.average_response_time),
    consecutive_failures: monitoringStats.consecutive_failures,
    last_successful_webhook: monitoringStats.last_successful_webhook?.toISOString(),
    last_failed_webhook: monitoringStats.last_failed_webhook?.toISOString()
  });

  const isHealthy = validator.isWebhookProcessingHealthy();
  console.log('Webhook Processing Healthy:', isHealthy);

  // Example 4: Test invalid configurations
  console.log('\n4. Testing Invalid Configurations');
  console.log('--------------------------------');

  const invalidConfig: ProductionUrlConfig = {
    production_domain: 'https://app.betaskill.com',
    webhook_endpoint: 'http://localhost:3000/webhook', // HTTP instead of HTTPS
    return_url: 'https://wrong-domain.com/success',    // Wrong domain
    cancel_url: 'invalid-url'                          // Invalid URL format
  };

  const invalidValidation = validator.validateProductionUrls(invalidConfig);
  console.log('Invalid Configuration Validation:', {
    is_valid: invalidValidation.is_valid,
    errors: invalidValidation.errors,
    warnings: invalidValidation.warnings
  });

  // Example 5: Demonstrate failure threshold monitoring
  console.log('\n5. Failure Threshold Monitoring');
  console.log('------------------------------');

  // Reset monitoring for clean test
  validator.resetWebhookMonitoring();

  // Simulate consecutive failures to trigger alert
  validator.recordWebhookProcessing(false, 1000, 'Connection refused');
  validator.recordWebhookProcessing(false, 1000, 'Timeout');
  validator.recordWebhookProcessing(false, 1000, 'Server error');

  const failureStats = validator.getWebhookMonitoringStats();
  console.log('After Consecutive Failures:', {
    consecutive_failures: failureStats.consecutive_failures,
    is_healthy: validator.isWebhookProcessingHealthy()
  });

  // Recovery with successful processing
  validator.recordWebhookProcessing(true, 1000);
  const recoveryStats = validator.getWebhookMonitoringStats();
  console.log('After Recovery:', {
    consecutive_failures: recoveryStats.consecutive_failures,
    is_healthy: validator.isWebhookProcessingHealthy()
  });
}

/**
 * Example of integrating ProductionUrlValidator with Ikhokha payment configuration
 */
async function integrateWithIkhokhaConfig() {
  console.log('\n=== Integration with Ikhokha Configuration ===\n');

  const validator = new ProductionUrlValidator();

  // Production Ikhokha configuration
  const ikhokhaConfig = {
    api_url: 'https://api.ikhokha.com',
    webhook_url: 'https://app.betaskill.com/api/webhooks/ikhokha',
    return_url: 'https://app.betaskill.com/payment/success',
    cancel_url: 'https://app.betaskill.com/payment/cancel'
  };

  // Validate URLs before using in payment processing
  const config: ProductionUrlConfig = {
    production_domain: 'https://app.betaskill.com',
    webhook_endpoint: ikhokhaConfig.webhook_url,
    return_url: ikhokhaConfig.return_url,
    cancel_url: ikhokhaConfig.cancel_url
  };

  const validation = validator.validateProductionUrls(config);
  
  if (validation.is_valid) {
    console.log('✅ Ikhokha configuration URLs are valid for production');
    
    // Proceed with payment processing setup
    console.log('Proceeding with payment configuration...');
    
    // Validate webhook security
    const webhookSecure = await validator.validateWebhookSecurity(config.webhook_endpoint);
    if (webhookSecure) {
      console.log('✅ Webhook endpoint security validation passed');
    } else {
      console.log('❌ Webhook endpoint security validation failed');
    }
  } else {
    console.log('❌ Ikhokha configuration URLs are invalid:');
    validation.errors.forEach(error => console.log(`  - ${error}`));
    validation.warnings.forEach(warning => console.log(`  ⚠️ ${warning}`));
  }
}

/**
 * Example of production deployment validation
 */
async function validateProductionDeployment() {
  console.log('\n=== Production Deployment Validation ===\n');

  const validator = new ProductionUrlValidator();

  // Check all production URLs before deployment
  const deploymentConfig: ProductionUrlConfig = {
    production_domain: 'https://app.betaskill.com',
    webhook_endpoint: process.env.VITE_IKHOKHA_WEBHOOK_URL || 'https://app.betaskill.com/api/webhooks/ikhokha',
    return_url: process.env.VITE_IKHOKHA_RETURN_URL || 'https://app.betaskill.com/payment/success',
    cancel_url: process.env.VITE_IKHOKHA_CANCEL_URL || 'https://app.betaskill.com/payment/cancel'
  };

  console.log('Validating deployment configuration...');
  const deploymentValidation = validator.validateProductionUrls(deploymentConfig);

  if (deploymentValidation.is_valid) {
    console.log('✅ Production deployment URLs are valid');
    
    // Test webhook endpoint connectivity
    try {
      const webhookValidation = await validator.validateWebhookEndpoint(deploymentConfig.webhook_endpoint);
      if (webhookValidation.endpoint_reachable) {
        console.log('✅ Webhook endpoint is reachable');
      } else {
        console.log('❌ Webhook endpoint is not reachable');
      }
    } catch (error) {
      console.log('❌ Webhook endpoint validation failed:', error);
    }
    
    console.log('🚀 Ready for production deployment');
  } else {
    console.log('❌ Production deployment validation failed:');
    deploymentValidation.errors.forEach(error => console.log(`  - ${error}`));
    console.log('🛑 Fix configuration before deploying to production');
  }
}

// Run examples
if (import.meta.env.NODE_ENV !== 'test') {
  demonstrateProductionUrlValidation()
    .then(() => integrateWithIkhokhaConfig())
    .then(() => validateProductionDeployment())
    .catch(console.error);
}

export {
  demonstrateProductionUrlValidation,
  integrateWithIkhokhaConfig,
  validateProductionDeployment
};