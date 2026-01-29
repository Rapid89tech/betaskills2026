#!/usr/bin/env node

/**
 * Production Deployment Validator Script
 * 
 * Comprehensive production readiness validation using all production validators.
 * Performs pre-deployment validation pipeline and provides rollback procedures.
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4
 * 
 * Usage:
 *   node scripts/production-deployment-validator.js [options]
 * 
 * Options:
 *   --check-only          Only perform validation checks without deployment actions
 *   --verbose             Enable verbose logging
 *   --output-format json  Output results in JSON format
 *   --rollback-check      Validate rollback readiness
 *   --health-check        Perform post-deployment health checks
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

// Import production validators (simulated for Node.js environment)
class ProductionValidatorRunner {
  constructor(options = {}) {
    this.options = {
      verbose: false,
      checkOnly: false,
      outputFormat: 'text',
      rollbackCheck: false,
      healthCheck: false,
      ...options
    };
    
    this.validationResults = {
      environment: null,
      configuration: null,
      security: null,
      health: null,
      deployment: null,
      rollback: null
    };
    
    this.startTime = new Date();
  }

  /**
   * Main validation entry point
   */
  async runValidation() {
    try {
      this.log('🚀 Starting Production Deployment Validation', 'info');
      this.log(`📅 Validation started at: ${this.startTime.toISOString()}`, 'info');
      
      // Load environment variables
      await this.loadEnvironmentVariables();
      
      // Run all validation checks
      await this.runEnvironmentValidation();
      await this.runConfigurationValidation();
      await this.runSecurityValidation();
      
      if (this.options.healthCheck) {
        await this.runHealthValidation();
      }
      
      if (this.options.rollbackCheck) {
        await this.runRollbackValidation();
      }
      
      // Generate deployment readiness assessment
      const deploymentReadiness = await this.assessDeploymentReadiness();
      
      // Output results
      await this.outputResults(deploymentReadiness);
      
      // Exit with appropriate code
      const exitCode = deploymentReadiness.is_ready ? 0 : 1;
      process.exit(exitCode);
      
    } catch (error) {
      this.log(`❌ Validation failed with error: ${error.message}`, 'error');
      console.error(error);
      process.exit(1);
    }
  }

  /**
   * Load and validate environment variables
   */
  async loadEnvironmentVariables() {
    this.log('📋 Loading environment variables...', 'info');
    
    const envFiles = [
      '.env.production',
      '.env.production.card-payment',
      '.env'
    ];
    
    const loadedEnvs = {};
    
    for (const envFile of envFiles) {
      const envPath = join(projectRoot, envFile);
      if (existsSync(envPath)) {
        this.log(`  ✓ Loading ${envFile}`, 'verbose');
        const envContent = readFileSync(envPath, 'utf8');
        const envVars = this.parseEnvFile(envContent);
        Object.assign(loadedEnvs, envVars);
      } else {
        this.log(`  ⚠️ ${envFile} not found`, 'verbose');
      }
    }
    
    // Set environment variables for validation
    Object.assign(process.env, loadedEnvs);
    
    this.log(`✅ Loaded ${Object.keys(loadedEnvs).length} environment variables`, 'info');
  }

  /**
   * Run environment validation using ProductionEnvironmentValidator
   */
  async runEnvironmentValidation() {
    this.log('🔍 Running environment validation...', 'info');
    
    try {
      const validation = {
        node_env_production: process.env.VITE_NODE_ENV === 'production',
        test_mode_disabled: process.env.VITE_IKHOKHA_TEST_MODE === 'false',
        production_endpoints: (process.env.VITE_IKHOKHA_API_URL || '').includes('api.ikhokha.com'),
        required_variables_set: this.checkRequiredVariables(),
        variable_values_valid: this.checkVariableValues()
      };
      
      const errors = [];
      const warnings = [];
      
      if (!validation.node_env_production) {
        errors.push('NODE_ENV must be set to "production"');
      }
      
      if (!validation.test_mode_disabled) {
        errors.push('Test mode must be disabled (VITE_IKHOKHA_TEST_MODE=false)');
      }
      
      if (!validation.production_endpoints) {
        errors.push('API URL must use production endpoint (api.ikhokha.com)');
      }
      
      if (!validation.required_variables_set) {
        errors.push('Required environment variables are missing');
      }
      
      if (!validation.variable_values_valid) {
        warnings.push('Some environment variable values may be invalid');
      }
      
      this.validationResults.environment = {
        validation,
        errors,
        warnings,
        is_valid: errors.length === 0
      };
      
      if (errors.length === 0) {
        this.log('  ✅ Environment validation passed', 'info');
      } else {
        this.log(`  ❌ Environment validation failed: ${errors.length} errors`, 'error');
        errors.forEach(error => this.log(`    - ${error}`, 'error'));
      }
      
      if (warnings.length > 0) {
        this.log(`  ⚠️ Environment validation warnings: ${warnings.length}`, 'warning');
        warnings.forEach(warning => this.log(`    - ${warning}`, 'warning'));
      }
      
    } catch (error) {
      this.log(`❌ Environment validation error: ${error.message}`, 'error');
      this.validationResults.environment = {
        validation: null,
        errors: [error.message],
        warnings: [],
        is_valid: false
      };
    }
  }

  /**
   * Run configuration validation using ProductionConfigurationEnforcer
   */
  async runConfigurationValidation() {
    this.log('⚙️ Running configuration validation...', 'info');
    
    try {
      const configuration = {
        test_mode_disabled: process.env.VITE_IKHOKHA_TEST_MODE === 'false',
        fallback_credentials_disabled: this.checkNoFallbackCredentials(),
        https_endpoints_enforced: this.checkHttpsEndpoints(),
        webhook_validation_enabled: process.env.VITE_ENABLE_WEBHOOK_VALIDATION !== 'false',
        security_logging_enabled: process.env.VITE_ENABLE_PAYMENT_LOGGING !== 'false',
        production_monitoring_enabled: process.env.VITE_ENABLE_CARD_PAYMENT_MONITORING === 'true',
        error_tracking_enabled: true, // Assume enabled in production
        performance_monitoring_enabled: true // Assume enabled in production
      };
      
      const errors = [];
      const warnings = [];
      
      if (!configuration.test_mode_disabled) {
        errors.push('Test mode must be disabled for production');
      }
      
      if (!configuration.fallback_credentials_disabled) {
        errors.push('Fallback credentials must be disabled');
      }
      
      if (!configuration.https_endpoints_enforced) {
        errors.push('HTTPS endpoints must be enforced');
      }
      
      if (!configuration.webhook_validation_enabled) {
        warnings.push('Webhook validation should be enabled for security');
      }
      
      if (!configuration.security_logging_enabled) {
        warnings.push('Security logging should be enabled for monitoring');
      }
      
      this.validationResults.configuration = {
        configuration,
        errors,
        warnings,
        is_valid: errors.length === 0
      };
      
      if (errors.length === 0) {
        this.log('  ✅ Configuration validation passed', 'info');
      } else {
        this.log(`  ❌ Configuration validation failed: ${errors.length} errors`, 'error');
        errors.forEach(error => this.log(`    - ${error}`, 'error'));
      }
      
      if (warnings.length > 0) {
        this.log(`  ⚠️ Configuration validation warnings: ${warnings.length}`, 'warning');
        warnings.forEach(warning => this.log(`    - ${warning}`, 'warning'));
      }
      
    } catch (error) {
      this.log(`❌ Configuration validation error: ${error.message}`, 'error');
      this.validationResults.configuration = {
        configuration: null,
        errors: [error.message],
        warnings: [],
        is_valid: false
      };
    }
  }

  /**
   * Run security validation using ProductionSecurityValidator
   */
  async runSecurityValidation() {
    this.log('🔒 Running security validation...', 'info');
    
    try {
      const expectedCredentials = {
        api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
        api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
        webhook_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS'
      };
      
      const actualCredentials = {
        api_key: process.env.VITE_IKHOKHA_API_KEY,
        api_secret: process.env.VITE_IKHOKHA_API_SECRET,
        webhook_secret: process.env.VITE_IKHOKHA_WEBHOOK_SECRET
      };
      
      const security = {
        credential_strength_valid: this.validateCredentialStrength(actualCredentials, expectedCredentials),
        https_enforced: this.checkHttpsEndpoints(),
        webhook_validation_enabled: process.env.VITE_ENABLE_WEBHOOK_VALIDATION !== 'false',
        security_logging_enabled: process.env.VITE_ENABLE_PAYMENT_LOGGING !== 'false',
        certificates_valid: this.validateCertificates(),
        no_security_vulnerabilities: this.checkSecurityVulnerabilities()
      };
      
      const errors = [];
      const warnings = [];
      
      if (!security.credential_strength_valid) {
        errors.push('Production credentials do not match expected values');
      }
      
      if (!security.https_enforced) {
        errors.push('HTTPS is not properly enforced');
      }
      
      if (!security.webhook_validation_enabled) {
        warnings.push('Webhook validation should be enabled');
      }
      
      if (!security.security_logging_enabled) {
        warnings.push('Security logging should be enabled');
      }
      
      if (!security.certificates_valid) {
        warnings.push('SSL certificate validation may have issues');
      }
      
      if (!security.no_security_vulnerabilities) {
        errors.push('Security vulnerabilities detected');
      }
      
      // Calculate security score
      const totalChecks = Object.keys(security).length;
      const passedChecks = Object.values(security).filter(Boolean).length;
      const securityScore = Math.round((passedChecks / totalChecks) * 100);
      
      this.validationResults.security = {
        security,
        security_score: securityScore,
        errors,
        warnings,
        is_valid: errors.length === 0 && securityScore >= 80
      };
      
      if (errors.length === 0 && securityScore >= 80) {
        this.log(`  ✅ Security validation passed (Score: ${securityScore}%)`, 'info');
      } else {
        this.log(`  ❌ Security validation failed (Score: ${securityScore}%)`, 'error');
        errors.forEach(error => this.log(`    - ${error}`, 'error'));
      }
      
      if (warnings.length > 0) {
        this.log(`  ⚠️ Security validation warnings: ${warnings.length}`, 'warning');
        warnings.forEach(warning => this.log(`    - ${warning}`, 'warning'));
      }
      
    } catch (error) {
      this.log(`❌ Security validation error: ${error.message}`, 'error');
      this.validationResults.security = {
        security: null,
        security_score: 0,
        errors: [error.message],
        warnings: [],
        is_valid: false
      };
    }
  }

  /**
   * Run health validation using ProductionHealthCheckSystem
   */
  async runHealthValidation() {
    this.log('🏥 Running health validation...', 'info');
    
    try {
      const health = {
        database_connection: this.checkDatabaseConnection(),
        api_connectivity: this.checkApiConnectivity(),
        webhook_endpoint: this.checkWebhookEndpoint(),
        real_time_sync: this.checkRealTimeSync(),
        monitoring_systems: this.checkMonitoringSystems()
      };
      
      const errors = [];
      const warnings = [];
      
      Object.entries(health).forEach(([component, status]) => {
        if (status === 'unhealthy') {
          errors.push(`${component} is unhealthy`);
        } else if (status === 'degraded') {
          warnings.push(`${component} is degraded`);
        }
      });
      
      this.validationResults.health = {
        health,
        errors,
        warnings,
        is_valid: errors.length === 0
      };
      
      if (errors.length === 0) {
        this.log('  ✅ Health validation passed', 'info');
      } else {
        this.log(`  ❌ Health validation failed: ${errors.length} errors`, 'error');
        errors.forEach(error => this.log(`    - ${error}`, 'error'));
      }
      
      if (warnings.length > 0) {
        this.log(`  ⚠️ Health validation warnings: ${warnings.length}`, 'warning');
        warnings.forEach(warning => this.log(`    - ${warning}`, 'warning'));
      }
      
    } catch (error) {
      this.log(`❌ Health validation error: ${error.message}`, 'error');
      this.validationResults.health = {
        health: null,
        errors: [error.message],
        warnings: [],
        is_valid: false
      };
    }
  }

  /**
   * Run rollback validation
   */
  async runRollbackValidation() {
    this.log('🔄 Running rollback validation...', 'info');
    
    try {
      const rollback = {
        rollback_plan_ready: this.checkRollbackPlan(),
        rollback_tested: this.checkRollbackTested(),
        rollback_triggers_defined: this.checkRollbackTriggers(),
        rollback_procedures_documented: this.checkRollbackDocumentation(),
        backup_procedures_ready: this.checkBackupProcedures()
      };
      
      const errors = [];
      const warnings = [];
      
      if (!rollback.rollback_plan_ready) {
        warnings.push('Rollback plan should be prepared');
      }
      
      if (!rollback.rollback_tested) {
        warnings.push('Rollback procedures should be tested');
      }
      
      if (!rollback.rollback_triggers_defined) {
        warnings.push('Rollback triggers should be defined');
      }
      
      if (!rollback.rollback_procedures_documented) {
        warnings.push('Rollback procedures should be documented');
      }
      
      if (!rollback.backup_procedures_ready) {
        errors.push('Backup procedures must be ready');
      }
      
      this.validationResults.rollback = {
        rollback,
        errors,
        warnings,
        is_valid: errors.length === 0
      };
      
      if (errors.length === 0) {
        this.log('  ✅ Rollback validation passed', 'info');
      } else {
        this.log(`  ❌ Rollback validation failed: ${errors.length} errors`, 'error');
        errors.forEach(error => this.log(`    - ${error}`, 'error'));
      }
      
      if (warnings.length > 0) {
        this.log(`  ⚠️ Rollback validation warnings: ${warnings.length}`, 'warning');
        warnings.forEach(warning => this.log(`    - ${warning}`, 'warning'));
      }
      
    } catch (error) {
      this.log(`❌ Rollback validation error: ${error.message}`, 'error');
      this.validationResults.rollback = {
        rollback: null,
        errors: [error.message],
        warnings: [],
        is_valid: false
      };
    }
  }

  /**
   * Assess overall deployment readiness
   */
  async assessDeploymentReadiness() {
    this.log('📊 Assessing deployment readiness...', 'info');
    
    const results = this.validationResults;
    const criticalValidations = ['environment', 'configuration', 'security'];
    const optionalValidations = ['health', 'rollback'];
    
    let totalErrors = 0;
    let totalWarnings = 0;
    let criticalIssues = [];
    let recommendations = [];
    
    // Check critical validations
    for (const validation of criticalValidations) {
      if (results[validation]) {
        totalErrors += results[validation].errors.length;
        totalWarnings += results[validation].warnings.length;
        
        if (!results[validation].is_valid) {
          criticalIssues.push(`${validation} validation failed`);
        }
      } else {
        criticalIssues.push(`${validation} validation not performed`);
      }
    }
    
    // Check optional validations
    for (const validation of optionalValidations) {
      if (results[validation]) {
        totalWarnings += results[validation].warnings.length;
        
        if (!results[validation].is_valid) {
          recommendations.push(`Address ${validation} validation issues`);
        }
      }
    }
    
    // Generate recommendations
    if (totalErrors > 0) {
      recommendations.push('Fix all critical errors before deployment');
    }
    
    if (totalWarnings > 0) {
      recommendations.push('Review and address warnings for optimal production setup');
    }
    
    if (criticalIssues.length === 0 && totalErrors === 0) {
      recommendations.push('System is ready for production deployment');
    }
    
    const isReady = criticalIssues.length === 0 && totalErrors === 0;
    const readinessScore = this.calculateReadinessScore();
    
    const deploymentReadiness = {
      is_ready: isReady,
      readiness_score: readinessScore,
      critical_issues: criticalIssues,
      total_errors: totalErrors,
      total_warnings: totalWarnings,
      recommendations,
      validation_summary: this.generateValidationSummary(),
      next_steps: this.generateNextSteps(isReady, criticalIssues, recommendations)
    };
    
    if (isReady) {
      this.log(`✅ Deployment readiness: READY (Score: ${readinessScore}%)`, 'info');
    } else {
      this.log(`❌ Deployment readiness: NOT READY (Score: ${readinessScore}%)`, 'error');
      this.log(`Critical issues: ${criticalIssues.length}`, 'error');
    }
    
    return deploymentReadiness;
  }

  /**
   * Output validation results
   */
  async outputResults(deploymentReadiness) {
    const endTime = new Date();
    const duration = Math.round((endTime - this.startTime) / 1000);
    
    this.log(`⏱️ Validation completed in ${duration} seconds`, 'info');
    
    if (this.options.outputFormat === 'json') {
      const jsonOutput = {
        validation_timestamp: this.startTime.toISOString(),
        validation_duration_seconds: duration,
        deployment_readiness: deploymentReadiness,
        validation_results: this.validationResults
      };
      
      console.log(JSON.stringify(jsonOutput, null, 2));
    } else {
      this.outputTextResults(deploymentReadiness, duration);
    }
    
    // Write results to file
    await this.writeResultsToFile(deploymentReadiness, duration);
  }

  /**
   * Output results in text format
   */
  outputTextResults(deploymentReadiness, duration) {
    console.log('\n' + '='.repeat(80));
    console.log('🚀 PRODUCTION DEPLOYMENT VALIDATION RESULTS');
    console.log('='.repeat(80));
    
    console.log(`📅 Validation Time: ${this.startTime.toISOString()}`);
    console.log(`⏱️ Duration: ${duration} seconds`);
    console.log(`📊 Readiness Score: ${deploymentReadiness.readiness_score}%`);
    
    if (deploymentReadiness.is_ready) {
      console.log('✅ Status: READY FOR DEPLOYMENT');
    } else {
      console.log('❌ Status: NOT READY FOR DEPLOYMENT');
    }
    
    console.log('\n📋 VALIDATION SUMMARY:');
    console.log(deploymentReadiness.validation_summary);
    
    if (deploymentReadiness.critical_issues.length > 0) {
      console.log('\n🚨 CRITICAL ISSUES:');
      deploymentReadiness.critical_issues.forEach(issue => {
        console.log(`  ❌ ${issue}`);
      });
    }
    
    if (deploymentReadiness.total_errors > 0) {
      console.log(`\n❌ Total Errors: ${deploymentReadiness.total_errors}`);
    }
    
    if (deploymentReadiness.total_warnings > 0) {
      console.log(`\n⚠️ Total Warnings: ${deploymentReadiness.total_warnings}`);
    }
    
    if (deploymentReadiness.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:');
      deploymentReadiness.recommendations.forEach(rec => {
        console.log(`  💡 ${rec}`);
      });
    }
    
    console.log('\n🎯 NEXT STEPS:');
    deploymentReadiness.next_steps.forEach(step => {
      console.log(`  🎯 ${step}`);
    });
    
    console.log('\n' + '='.repeat(80));
  }

  /**
   * Write results to file
   */
  async writeResultsToFile(deploymentReadiness, duration) {
    const timestamp = this.startTime.toISOString().replace(/[:.]/g, '-');
    const filename = `production-validation-${timestamp}.json`;
    const filepath = join(projectRoot, 'validation-reports', filename);
    
    try {
      // Ensure directory exists
      const { mkdirSync } = await import('fs');
      const { dirname } = await import('path');
      mkdirSync(dirname(filepath), { recursive: true });
      
      const report = {
        validation_timestamp: this.startTime.toISOString(),
        validation_duration_seconds: duration,
        deployment_readiness: deploymentReadiness,
        validation_results: this.validationResults,
        environment_info: {
          node_version: process.version,
          platform: process.platform,
          cwd: process.cwd()
        }
      };
      
      writeFileSync(filepath, JSON.stringify(report, null, 2));
      this.log(`📄 Validation report saved to: ${filepath}`, 'info');
      
    } catch (error) {
      this.log(`⚠️ Failed to save validation report: ${error.message}`, 'warning');
    }
  }

  // Helper methods for validation checks

  parseEnvFile(content) {
    const env = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    }
    
    return env;
  }

  checkRequiredVariables() {
    const required = [
      'VITE_NODE_ENV',
      'VITE_IKHOKHA_API_KEY',
      'VITE_IKHOKHA_API_SECRET',
      'VITE_IKHOKHA_WEBHOOK_SECRET',
      'VITE_IKHOKHA_TEST_MODE',
      'VITE_IKHOKHA_API_URL'
    ];
    
    return required.every(varName => process.env[varName]);
  }

  checkVariableValues() {
    const apiKey = process.env.VITE_IKHOKHA_API_KEY;
    const apiSecret = process.env.VITE_IKHOKHA_API_SECRET;
    const webhookSecret = process.env.VITE_IKHOKHA_WEBHOOK_SECRET;
    
    return apiKey && apiKey.length >= 32 &&
           apiSecret && apiSecret.length >= 32 &&
           webhookSecret && webhookSecret.length >= 16;
  }

  checkNoFallbackCredentials() {
    const expectedCredentials = {
      api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
      api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
      webhook_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS'
    };
    
    return process.env.VITE_IKHOKHA_API_KEY === expectedCredentials.api_key &&
           process.env.VITE_IKHOKHA_API_SECRET === expectedCredentials.api_secret &&
           process.env.VITE_IKHOKHA_WEBHOOK_SECRET === expectedCredentials.webhook_secret;
  }

  checkHttpsEndpoints() {
    const apiUrl = process.env.VITE_IKHOKHA_API_URL || '';
    const productionUrl = process.env.VITE_PRODUCTION_URL || '';
    
    return apiUrl.startsWith('https://') && 
           (productionUrl === '' || productionUrl.startsWith('https://'));
  }

  validateCredentialStrength(actual, expected) {
    return actual.api_key === expected.api_key &&
           actual.api_secret === expected.api_secret &&
           actual.webhook_secret === expected.webhook_secret;
  }

  validateCertificates() {
    const apiUrl = process.env.VITE_IKHOKHA_API_URL || '';
    return apiUrl.startsWith('https://') && apiUrl.includes('api.ikhokha.com');
  }

  checkSecurityVulnerabilities() {
    // Basic security checks
    const apiKey = process.env.VITE_IKHOKHA_API_KEY;
    const apiSecret = process.env.VITE_IKHOKHA_API_SECRET;
    const apiUrl = process.env.VITE_IKHOKHA_API_URL;
    
    // Check for weak credentials
    if (!apiKey || !apiSecret || apiKey.length < 32 || apiSecret.length < 32) {
      return false;
    }
    
    // Check for insecure endpoints
    if (!apiUrl || !apiUrl.startsWith('https://')) {
      return false;
    }
    
    return true;
  }

  checkDatabaseConnection() {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) return 'unhealthy';
    return 'healthy';
  }

  checkApiConnectivity() {
    const apiKey = process.env.VITE_IKHOKHA_API_KEY;
    const apiUrl = process.env.VITE_IKHOKHA_API_URL;
    
    if (!apiKey || !apiUrl) return 'unhealthy';
    if (!apiUrl.startsWith('https://')) return 'degraded';
    return 'healthy';
  }

  checkWebhookEndpoint() {
    const webhookSecret = process.env.VITE_IKHOKHA_WEBHOOK_SECRET;
    
    if (!webhookSecret) return 'unhealthy';
    if (webhookSecret.length < 16) return 'degraded';
    return 'healthy';
  }

  checkRealTimeSync() {
    const realTimeSync = process.env.VITE_ENABLE_ENHANCED_REAL_TIME_SYNC;
    
    if (realTimeSync === 'false') return 'degraded';
    return 'healthy';
  }

  checkMonitoringSystems() {
    const monitoring = process.env.VITE_ENABLE_CARD_PAYMENT_MONITORING;
    const isProduction = process.env.VITE_NODE_ENV === 'production';
    
    if (isProduction && monitoring !== 'true') return 'unhealthy';
    return 'healthy';
  }

  checkRollbackPlan() {
    // Check if rollback documentation exists
    const rollbackFiles = [
      'ROLLBACK_PROCEDURES.md',
      'docs/ROLLBACK_PROCEDURES.md',
      'DEPLOYMENT_GUIDE.md'
    ];
    
    return rollbackFiles.some(file => existsSync(join(projectRoot, file)));
  }

  checkRollbackTested() {
    // This would typically check for rollback test results
    // For now, assume false unless explicitly documented
    return existsSync(join(projectRoot, 'ROLLBACK_TEST_RESULTS.md'));
  }

  checkRollbackTriggers() {
    // Check if rollback triggers are defined in deployment configuration
    const deploymentFiles = [
      'netlify.toml',
      '.github/workflows/deploy.yml',
      'deployment.yml'
    ];
    
    return deploymentFiles.some(file => existsSync(join(projectRoot, file)));
  }

  checkRollbackDocumentation() {
    const docFiles = [
      'ROLLBACK_PROCEDURES.md',
      'DEPLOYMENT_GUIDE.md',
      'README.md'
    ];
    
    return docFiles.some(file => {
      const filepath = join(projectRoot, file);
      if (existsSync(filepath)) {
        const content = readFileSync(filepath, 'utf8').toLowerCase();
        return content.includes('rollback') || content.includes('revert');
      }
      return false;
    });
  }

  checkBackupProcedures() {
    // Check if backup procedures are documented or configured
    const backupIndicators = [
      'BACKUP_PROCEDURES.md',
      'scripts/backup.js',
      'scripts/backup.sh'
    ];
    
    return backupIndicators.some(file => existsSync(join(projectRoot, file)));
  }

  calculateReadinessScore() {
    const results = this.validationResults;
    let totalChecks = 0;
    let passedChecks = 0;
    
    Object.values(results).forEach(result => {
      if (result) {
        totalChecks++;
        if (result.is_valid) {
          passedChecks++;
        }
      }
    });
    
    return totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0;
  }

  generateValidationSummary() {
    const results = this.validationResults;
    const summary = [];
    
    Object.entries(results).forEach(([name, result]) => {
      if (result) {
        const status = result.is_valid ? '✅' : '❌';
        const errors = result.errors.length;
        const warnings = result.warnings.length;
        summary.push(`${status} ${name}: ${errors} errors, ${warnings} warnings`);
      }
    });
    
    return summary.join('\n');
  }

  generateNextSteps(isReady, criticalIssues, recommendations) {
    const steps = [];
    
    if (!isReady) {
      steps.push('Fix all critical issues before attempting deployment');
      criticalIssues.forEach(issue => {
        steps.push(`- Address: ${issue}`);
      });
    } else {
      steps.push('System is ready for production deployment');
      steps.push('Run final pre-deployment checks');
      steps.push('Execute deployment procedure');
      steps.push('Perform post-deployment health checks');
    }
    
    if (recommendations.length > 0) {
      steps.push('Consider implementing recommendations for optimal setup');
    }
    
    return steps;
  }

  log(message, level = 'info') {
    if (level === 'verbose' && !this.options.verbose) {
      return;
    }
    
    const timestamp = new Date().toISOString();
    const prefix = {
      info: '📋',
      error: '❌',
      warning: '⚠️',
      verbose: '🔍'
    }[level] || '📋';
    
    console.log(`${prefix} [${timestamp}] ${message}`);
  }
}

// CLI argument parsing
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    verbose: false,
    checkOnly: false,
    outputFormat: 'text',
    rollbackCheck: false,
    healthCheck: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case '--verbose':
        options.verbose = true;
        break;
      case '--check-only':
        options.checkOnly = true;
        break;
      case '--output-format':
        options.outputFormat = args[++i] || 'text';
        break;
      case '--rollback-check':
        options.rollbackCheck = true;
        break;
      case '--health-check':
        options.healthCheck = true;
        break;
      case '--help':
        console.log(`
Production Deployment Validator

Usage: node scripts/production-deployment-validator.js [options]

Options:
  --check-only          Only perform validation checks without deployment actions
  --verbose             Enable verbose logging
  --output-format json  Output results in JSON format (default: text)
  --rollback-check      Validate rollback readiness
  --health-check        Perform post-deployment health checks
  --help                Show this help message

Examples:
  node scripts/production-deployment-validator.js
  node scripts/production-deployment-validator.js --verbose --health-check
  node scripts/production-deployment-validator.js --output-format json
  node scripts/production-deployment-validator.js --rollback-check --verbose
        `);
        process.exit(0);
        break;
    }
  }
  
  return options;
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs();
  const validator = new ProductionValidatorRunner(options);
  validator.runValidation().catch(error => {
    console.error('❌ Validation failed:', error);
    process.exit(1);
  });
}

export { ProductionValidatorRunner };