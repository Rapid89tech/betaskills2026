/**
 * Production Validator Usage Examples
 * 
 * Demonstrates how to use the ProductionValidator for configuration validation,
 * startup checks, and health monitoring in production environments.
 */

import { 
  productionValidator, 
  validateProductionReadiness, 
  performStartupValidation,
  getConfigurationHealth,
  alertOnConfigurationIssues
} from '../services/ProductionValidator';

/**
 * Example 1: Basic Production Readiness Check
 * 
 * Use this to validate if your system is ready for production deployment
 */
export function basicProductionReadinessCheck() {
  console.log('🔍 Checking production readiness...');
  
  try {
    const readiness = validateProductionReadiness();
    
    if (readiness.ready) {
      console.log('✅ System is ready for production!');
      console.log(`Configuration: ${readiness.configurationValid ? '✅' : '❌'}`);
      console.log(`Security: ${readiness.securityValid ? '✅' : '❌'}`);
      console.log(`Performance: ${readiness.performanceValid ? '✅' : '❌'}`);
      
      if (readiness.recommendations.length > 0) {
        console.log('💡 Recommendations:');
        readiness.recommendations.forEach(rec => console.log(`  - ${rec}`));
      }
    } else {
      console.error('❌ System is NOT ready for production');
      console.error('Issues found:');
      readiness.issues.forEach(issue => console.error(`  - ${issue}`));
      
      if (readiness.recommendations.length > 0) {
        console.log('💡 Recommendations:');
        readiness.recommendations.forEach(rec => console.log(`  - ${rec}`));
      }
    }
    
    return readiness;
  } catch (error) {
    console.error('❌ Production readiness check failed:', error);
    throw error;
  }
}

/**
 * Example 2: Startup Validation
 * 
 * Use this in your application startup to ensure production configuration
 */
export function applicationStartupValidation() {
  console.log('🚀 Performing application startup validation...');
  
  try {
    // This will throw an error if production validation fails
    performStartupValidation();
    console.log('✅ Startup validation passed');
    return true;
  } catch (error) {
    console.error('❌ Startup validation failed:', error);
    // In a real application, you might want to exit the process here
    // process.exit(1);
    throw error;
  }
}

/**
 * Example 3: Individual Configuration Validation
 * 
 * Validate specific aspects of your configuration
 */
export function individualConfigurationValidation() {
  console.log('🔧 Validating individual configuration components...');
  
  // Validate iKhokha configuration
  const ikhokhaValidation = productionValidator.validateIkhokhaConfig();
  console.log(`iKhokha Config: ${ikhokhaValidation.valid ? '✅' : '❌'}`);
  if (!ikhokhaValidation.valid) {
    console.error('iKhokha errors:', ikhokhaValidation.errors);
  }
  if (ikhokhaValidation.warnings.length > 0) {
    console.warn('iKhokha warnings:', ikhokhaValidation.warnings);
  }
  
  // Validate database configuration
  const databaseValidation = productionValidator.validateDatabaseConfig();
  console.log(`Database Config: ${databaseValidation.valid ? '✅' : '❌'}`);
  if (!databaseValidation.valid) {
    console.error('Database errors:', databaseValidation.errors);
  }
  
  // Validate webhook configuration
  const webhookValidation = productionValidator.validateWebhookConfig();
  console.log(`Webhook Config: ${webhookValidation.valid ? '✅' : '❌'}`);
  if (!webhookValidation.valid) {
    console.error('Webhook errors:', webhookValidation.errors);
  }
  
  return {
    ikhokha: ikhokhaValidation,
    database: databaseValidation,
    webhook: webhookValidation
  };
}

/**
 * Example 4: Security Validation
 * 
 * Validate security aspects of your configuration
 */
export function securityValidation() {
  console.log('🔒 Performing security validation...');
  
  // Validate API keys
  const apiKeyValidation = productionValidator.validateApiKeys();
  console.log(`API Keys: ${apiKeyValidation.apiKeysValid ? '✅' : '❌'}`);
  console.log(`Webhook Security: ${apiKeyValidation.webhookSecurityValid ? '✅' : '❌'}`);
  console.log(`SSL Configuration: ${apiKeyValidation.sslValid ? '✅' : '❌'}`);
  
  if (apiKeyValidation.errors.length > 0) {
    console.error('Security errors:', apiKeyValidation.errors);
  }
  
  if (apiKeyValidation.warnings.length > 0) {
    console.warn('Security warnings:', apiKeyValidation.warnings);
  }
  
  // Validate SSL certificates
  const sslValidation = productionValidator.validateSSLCertificates();
  console.log(`SSL Certificates: ${sslValidation.sslValid ? '✅' : '❌'}`);
  
  return {
    apiKeys: apiKeyValidation,
    ssl: sslValidation
  };
}

/**
 * Example 5: Performance Validation
 * 
 * Validate performance-related configuration
 */
export function performanceValidation() {
  console.log('⚡ Performing performance validation...');
  
  // Validate database connections
  const dbPerformance = productionValidator.validateDatabaseConnections();
  console.log(`Database Connections: ${dbPerformance.databaseConnectionsValid ? '✅' : '❌'}`);
  
  // Validate API response times configuration
  const apiPerformance = productionValidator.validateApiResponseTimes();
  console.log(`API Response Times: ${apiPerformance.apiResponseTimesValid ? '✅' : '❌'}`);
  
  if (dbPerformance.errors.length > 0) {
    console.error('Database performance errors:', dbPerformance.errors);
  }
  
  if (apiPerformance.errors.length > 0) {
    console.error('API performance errors:', apiPerformance.errors);
  }
  
  return {
    database: dbPerformance,
    api: apiPerformance
  };
}

/**
 * Example 6: Configuration Health Monitoring
 * 
 * Monitor the health of your configuration over time
 */
export function configurationHealthMonitoring() {
  console.log('📊 Monitoring configuration health...');
  
  const health = getConfigurationHealth();
  
  console.log(`Overall Health: ${health.overallHealth.healthy ? '✅' : '❌'}`);
  console.log(`Last Check: ${health.overallHealth.lastCheck.toISOString()}`);
  
  // Component health
  console.log('\nComponent Health:');
  console.log(`  iKhokha: ${health.ikhokhaConfig.healthy ? '✅' : '❌'} (${health.ikhokhaConfig.metrics.errorsCount} errors)`);
  console.log(`  Database: ${health.databaseConfig.healthy ? '✅' : '❌'} (${health.databaseConfig.metrics.errorsCount} errors)`);
  console.log(`  Webhook: ${health.webhookConfig.healthy ? '✅' : '❌'} (${health.webhookConfig.metrics.errorsCount} errors)`);
  
  // Overall metrics
  console.log('\nOverall Metrics:');
  console.log(`  Total Errors: ${health.overallHealth.metrics.totalErrors}`);
  console.log(`  Healthy Components: ${health.overallHealth.metrics.componentsHealthy}/${health.overallHealth.metrics.totalComponents}`);
  
  // Issues
  if (health.overallHealth.issues.length > 0) {
    console.log('\nIssues:');
    health.overallHealth.issues.forEach(issue => console.log(`  - ${issue}`));
  }
  
  return health;
}

/**
 * Example 7: Automated Health Alerting
 * 
 * Set up automated alerting for configuration issues
 */
export function automatedHealthAlerting() {
  console.log('🚨 Setting up automated health alerting...');
  
  try {
    alertOnConfigurationIssues();
    console.log('✅ Health alerting completed');
  } catch (error) {
    console.error('❌ Health alerting failed:', error);
  }
}

/**
 * Example 8: Comprehensive Production Validation Workflow
 * 
 * Complete workflow for production deployment validation
 */
export function comprehensiveProductionValidation() {
  console.log('🏭 Starting comprehensive production validation workflow...');
  
  const results = {
    startup: false,
    readiness: null as any,
    security: null as any,
    performance: null as any,
    health: null as any
  };
  
  try {
    // Step 1: Startup validation
    console.log('\n1️⃣ Startup Validation');
    results.startup = applicationStartupValidation();
    
    // Step 2: Production readiness
    console.log('\n2️⃣ Production Readiness Check');
    results.readiness = basicProductionReadinessCheck();
    
    // Step 3: Security validation
    console.log('\n3️⃣ Security Validation');
    results.security = securityValidation();
    
    // Step 4: Performance validation
    console.log('\n4️⃣ Performance Validation');
    results.performance = performanceValidation();
    
    // Step 5: Health monitoring
    console.log('\n5️⃣ Health Monitoring');
    results.health = configurationHealthMonitoring();
    
    // Step 6: Alerting
    console.log('\n6️⃣ Automated Alerting');
    automatedHealthAlerting();
    
    console.log('\n✅ Comprehensive validation completed successfully!');
    
    return results;
  } catch (error) {
    console.error('\n❌ Comprehensive validation failed:', error);
    throw error;
  }
}

/**
 * Example 9: Environment-Specific Validation
 * 
 * Validate configuration based on the current environment
 */
export function environmentSpecificValidation() {
  const isProduction = import.meta.env.VITE_NODE_ENV === 'production' || 
                      import.meta.env.NODE_ENV === 'production' ||
                      import.meta.env.PROD === true;
  
  console.log(`🌍 Environment-specific validation (${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'})`);
  
  if (isProduction) {
    console.log('Running production validation...');
    return comprehensiveProductionValidation();
  } else {
    console.log('Running development validation...');
    
    // In development, we're more lenient
    const readiness = validateProductionReadiness();
    console.log(`Development readiness: ${readiness.ready ? '✅' : '⚠️'}`);
    
    if (!readiness.ready) {
      console.log('Development issues (non-blocking):');
      readiness.issues.forEach(issue => console.log(`  - ${issue}`));
    }
    
    if (readiness.recommendations.length > 0) {
      console.log('Development recommendations:');
      readiness.recommendations.forEach(rec => console.log(`  - ${rec}`));
    }
    
    return readiness;
  }
}

/**
 * Example 10: Continuous Health Monitoring
 * 
 * Set up continuous monitoring of configuration health
 */
export function setupContinuousHealthMonitoring(intervalMinutes: number = 5) {
  console.log(`⏰ Setting up continuous health monitoring (every ${intervalMinutes} minutes)`);
  
  const monitoringInterval = setInterval(() => {
    try {
      const health = configurationHealthMonitoring();
      
      if (!health.overallHealth.healthy) {
        console.error('🚨 Configuration health degraded!');
        alertOnConfigurationIssues();
      }
    } catch (error) {
      console.error('❌ Health monitoring check failed:', error);
    }
  }, intervalMinutes * 60 * 1000);
  
  console.log('✅ Continuous health monitoring started');
  
  // Return cleanup function
  return () => {
    clearInterval(monitoringInterval);
    console.log('🛑 Continuous health monitoring stopped');
  };
}

// Export all examples for easy usage
export const ProductionValidatorExamples = {
  basicProductionReadinessCheck,
  applicationStartupValidation,
  individualConfigurationValidation,
  securityValidation,
  performanceValidation,
  configurationHealthMonitoring,
  automatedHealthAlerting,
  comprehensiveProductionValidation,
  environmentSpecificValidation,
  setupContinuousHealthMonitoring
};

// Example usage in application startup
if (typeof window !== 'undefined') {
  // Browser environment - run validation on load
  console.log('🔍 Running production validator examples...');
  
  // Run environment-specific validation
  environmentSpecificValidation().catch(error => {
    console.error('Validation failed:', error);
  });
}