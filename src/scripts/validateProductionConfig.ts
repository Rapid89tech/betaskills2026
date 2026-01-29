/**
 * Production Configuration Validation Script
 * 
 * This script validates that the production Ikhokha configuration is properly set up
 * and ready for real payment processing.
 */

import { checkProductionSetup, validateProductionCredentials, isProductionEnvironment } from '../config/productionCredentials';
import { checkEnvironmentConfig } from '../config/ikhokha';

/**
 * Main validation function
 */
export function validateProductionConfiguration(): {
  success: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  try {
    console.log('🔍 Validating Ikhokha production configuration...');

    // Check if we're in production environment
    if (!isProductionEnvironment()) {
      warnings.push('Not running in production environment');
      console.log('ℹ️ Running in development/test environment');
      return { success: true, errors, warnings, recommendations };
    }

    console.log('🏭 Production environment detected');

    // Validate production credentials
    const credentialValidation = validateProductionCredentials();
    if (!credentialValidation.isValid) {
      errors.push(...credentialValidation.errors);
    }
    warnings.push(...credentialValidation.warnings);

    // Check production setup
    const setupCheck = checkProductionSetup();
    if (!setupCheck.ready) {
      errors.push(...setupCheck.issues);
    }
    recommendations.push(...setupCheck.recommendations);

    // Check environment configuration
    const envCheck = checkEnvironmentConfig();
    if (!envCheck.valid) {
      errors.push(...envCheck.missing);
    }
    warnings.push(...envCheck.warnings);

    // Additional production-specific checks
    const additionalChecks = performAdditionalProductionChecks();
    errors.push(...additionalChecks.errors);
    warnings.push(...additionalChecks.warnings);
    recommendations.push(...additionalChecks.recommendations);

    // Log results
    if (errors.length === 0) {
      console.log('✅ Production configuration validation passed');
    } else {
      console.error('❌ Production configuration validation failed');
      console.error('Errors:', errors);
    }

    if (warnings.length > 0) {
      console.warn('⚠️ Configuration warnings:', warnings);
    }

    if (recommendations.length > 0) {
      console.log('💡 Recommendations:', recommendations);
    }

    return {
      success: errors.length === 0,
      errors,
      warnings,
      recommendations
    };

  } catch (error) {
    const errorMessage = `Configuration validation failed: ${error instanceof Error ? error.message : error}`;
    errors.push(errorMessage);
    console.error('❌', errorMessage);

    return {
      success: false,
      errors,
      warnings,
      recommendations
    };
  }
}

/**
 * Perform additional production-specific checks
 */
function performAdditionalProductionChecks(): {
  errors: string[];
  warnings: string[];
  recommendations: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Check HTTPS requirement
  if (typeof window !== 'undefined') {
    if (window.location.protocol !== 'https:') {
      errors.push('Production application must be served over HTTPS');
    }
  }

  // Check for secure headers (if available)
  if (typeof document !== 'undefined') {
    const csp = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (!csp) {
      warnings.push('Consider implementing Content Security Policy for enhanced security');
    }
  }

  // Environment variable security checks
  const sensitiveVars = [
    'VITE_IKHOKHA_API_KEY',
    'VITE_IKHOKHA_API_SECRET',
    'VITE_IKHOKHA_WEBHOOK_SECRET'
  ];

  for (const varName of sensitiveVars) {
    const value = import.meta.env[varName];
    if (value && (value.includes('test') || value.includes('dev') || value.includes('demo'))) {
      errors.push(`${varName} appears to contain test/development indicators`);
    }
  }

  // Production recommendations
  recommendations.push('Monitor payment processing logs regularly');
  recommendations.push('Set up alerts for payment failures');
  recommendations.push('Implement proper error tracking and monitoring');
  recommendations.push('Regularly review and rotate API credentials');
  recommendations.push('Test webhook endpoints with small amounts before full deployment');

  return { errors, warnings, recommendations };
}

/**
 * CLI interface for running validation
 */
if (import.meta.env.VITE_RUN_VALIDATION === 'true') {
  validateProductionConfiguration();
}

// Export for use in other modules
export default validateProductionConfiguration;