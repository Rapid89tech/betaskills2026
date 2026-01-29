/**
 * ProductionEnvironmentValidator Service
 * 
 * Provides comprehensive environment validation for production deployment.
 * Validates NODE_ENV, required environment variables, API endpoints, and security settings.
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5
 */

export interface EnvironmentValidation {
  node_env_production: boolean;
  test_mode_disabled: boolean;
  production_endpoints: boolean;
  required_variables_set: boolean;
  variable_values_valid: boolean;
}

export interface ProductionValidation {
  is_production_mode: boolean;
  test_mode_disabled: boolean;
  fallback_credentials_disabled: boolean;
  production_api_configured: boolean;
}

export interface EndpointValidation {
  api_url_valid: boolean;
  uses_https: boolean;
  uses_production_domain: boolean;
  webhook_endpoints_configured: boolean;
}

export interface VariableValidation {
  all_required_present: boolean;
  missing_variables: string[];
  optional_variables_status: Record<string, boolean>;
}

export interface ValueValidation {
  api_key_format_valid: boolean;
  api_secret_format_valid: boolean;
  webhook_secret_format_valid: boolean;
  timeout_values_valid: boolean;
  retry_values_valid: boolean;
}

export interface SecurityValidation {
  https_enforced: boolean;
  webhook_validation_enabled: boolean;
  security_logging_enabled: boolean;
  certificates_valid: boolean;
  no_security_vulnerabilities: boolean;
}

export interface ValidationError {
  code: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  field?: string;
  recommendation?: string;
}

export interface ValidationWarning {
  code: string;
  message: string;
  field?: string;
  recommendation?: string;
}

export interface ValidationRecommendation {
  code: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  action?: string;
}

export interface EnvironmentInfo {
  node_version: string;
  platform: string;
  timestamp: Date;
  build_environment: string;
}

export interface CompleteValidation {
  is_valid: boolean;
  is_production_ready: boolean;
  environment_validation: EnvironmentValidation;
  production_validation: ProductionValidation;
  endpoint_validation: EndpointValidation;
  variable_validation: VariableValidation;
  value_validation: ValueValidation;
  security_validation: SecurityValidation;
  critical_errors: ValidationError[];
  warnings: ValidationWarning[];
  recommendations: ValidationRecommendation[];
}

export interface ValidationReport {
  validation_id: string;
  timestamp: Date;
  environment_info: EnvironmentInfo;
  validation_results: CompleteValidation;
  deployment_readiness: boolean;
  next_steps: string[];
  summary: {
    total_checks: number;
    passed_checks: number;
    failed_checks: number;
    warnings_count: number;
    critical_errors_count: number;
  };
}

export class ProductionEnvironmentValidator {
  private readonly requiredVariables = [
    'VITE_NODE_ENV',
    'VITE_IKHOKHA_API_KEY',
    'VITE_IKHOKHA_API_SECRET',
    'VITE_IKHOKHA_WEBHOOK_SECRET',
    'VITE_IKHOKHA_TEST_MODE',
    'VITE_IKHOKHA_API_URL'
  ];

  private readonly optionalVariables = [
    'VITE_IKHOKHA_TIMEOUT',
    'VITE_IKHOKHA_RETRY_ATTEMPTS',
    'VITE_IKHOKHA_RETRY_DELAY',
    'VITE_ENABLE_WEBHOOK_VALIDATION',
    'VITE_REQUIRE_HTTPS',
    'VITE_ENABLE_PAYMENT_LOGGING'
  ];

  private readonly productionCredentials = {
    api_key: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
    api_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
    webhook_secret: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS'
  };

  constructor(private envProvider?: (key: string) => string | undefined) {}

  /**
   * Validates NODE_ENV and production mode settings
   */
  validateNodeEnvironment(): EnvironmentValidation {
    const nodeEnv = this.getEnvVar('VITE_NODE_ENV') || (typeof process !== 'undefined' ? process.env.NODE_ENV : undefined);
    const testMode = this.getEnvVar('VITE_IKHOKHA_TEST_MODE');
    const apiUrl = this.getEnvVar('VITE_IKHOKHA_API_URL');

    return {
      node_env_production: nodeEnv === 'production',
      test_mode_disabled: testMode === 'false',
      production_endpoints: apiUrl?.includes('api.ikhokha.com') || false,
      required_variables_set: this.checkRequiredVariables(),
      variable_values_valid: this.checkVariableValues()
    };
  }

  /**
   * Validates production mode configuration
   */
  validateProductionMode(): ProductionValidation {
    const nodeEnv = this.getEnvVar('VITE_NODE_ENV') || (typeof process !== 'undefined' ? process.env.NODE_ENV : undefined);
    const testMode = this.getEnvVar('VITE_IKHOKHA_TEST_MODE');
    const apiKey = this.getEnvVar('VITE_IKHOKHA_API_KEY');
    const apiUrl = this.getEnvVar('VITE_IKHOKHA_API_URL');

    return {
      is_production_mode: nodeEnv === 'production',
      test_mode_disabled: testMode === 'false',
      fallback_credentials_disabled: this.checkNoFallbackCredentials(),
      production_api_configured: apiKey === this.productionCredentials.api_key && 
                                 Boolean(apiUrl?.includes('api.ikhokha.com'))
    };
  }

  /**
   * Validates API endpoints and URLs
   */
  validateApiEndpoints(): EndpointValidation {
    const apiUrl = this.getEnvVar('VITE_IKHOKHA_API_URL');
    const webhookEndpoint = this.getEnvVar('VITE_WEBHOOK_ENDPOINT');
    const productionUrl = this.getEnvVar('VITE_PRODUCTION_URL');

    return {
      api_url_valid: this.isValidApiUrl(apiUrl),
      uses_https: apiUrl?.startsWith('https://') || false,
      uses_production_domain: apiUrl?.includes('api.ikhokha.com') || false,
      webhook_endpoints_configured: Boolean(webhookEndpoint && productionUrl)
    };
  }

  /**
   * Validates presence of required environment variables
   */
  validateRequiredVariables(): VariableValidation {
    const missingVariables: string[] = [];
    const optionalStatus: Record<string, boolean> = {};

    // Check required variables
    for (const variable of this.requiredVariables) {
      const value = this.getEnvVar(variable);
      if (!value || value.trim() === '') {
        missingVariables.push(variable);
      }
    }

    // Check optional variables
    for (const variable of this.optionalVariables) {
      const value = this.getEnvVar(variable);
      optionalStatus[variable] = Boolean(value && value.trim() !== '');
    }

    return {
      all_required_present: missingVariables.length === 0,
      missing_variables: missingVariables,
      optional_variables_status: optionalStatus
    };
  }

  /**
   * Validates format and values of environment variables
   */
  validateVariableValues(): ValueValidation {
    const apiKey = this.getEnvVar('VITE_IKHOKHA_API_KEY');
    const apiSecret = this.getEnvVar('VITE_IKHOKHA_API_SECRET');
    const webhookSecret = this.getEnvVar('VITE_IKHOKHA_WEBHOOK_SECRET');
    const timeout = this.getEnvVar('VITE_IKHOKHA_TIMEOUT');
    const retryAttempts = this.getEnvVar('VITE_IKHOKHA_RETRY_ATTEMPTS');

    return {
      api_key_format_valid: this.validateApiKeyFormat(apiKey),
      api_secret_format_valid: this.validateApiSecretFormat(apiSecret),
      webhook_secret_format_valid: this.validateWebhookSecretFormat(webhookSecret),
      timeout_values_valid: this.validateTimeoutValue(timeout),
      retry_values_valid: this.validateRetryValue(retryAttempts)
    };
  }

  /**
   * Validates security settings and configurations
   */
  validateSecuritySettings(): SecurityValidation {
    const requireHttps = this.getEnvVar('VITE_REQUIRE_HTTPS');
    const webhookValidation = this.getEnvVar('VITE_ENABLE_WEBHOOK_VALIDATION');
    const paymentLogging = this.getEnvVar('VITE_ENABLE_PAYMENT_LOGGING');
    const apiUrl = this.getEnvVar('VITE_IKHOKHA_API_URL');

    return {
      https_enforced: requireHttps !== 'false' && Boolean(apiUrl?.startsWith('https://')),
      webhook_validation_enabled: webhookValidation !== 'false',
      security_logging_enabled: paymentLogging !== 'false',
      certificates_valid: this.validateCertificates(),
      no_security_vulnerabilities: this.checkSecurityVulnerabilities()
    };
  }

  /**
   * Performs complete validation of all production environment aspects
   */
  async performCompleteValidation(): Promise<CompleteValidation> {
    const environmentValidation = this.validateNodeEnvironment();
    const productionValidation = this.validateProductionMode();
    const endpointValidation = this.validateApiEndpoints();
    const variableValidation = this.validateRequiredVariables();
    const valueValidation = this.validateVariableValues();
    const securityValidation = this.validateSecuritySettings();

    const criticalErrors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];
    const recommendations: ValidationRecommendation[] = [];

    // Check for critical errors
    if (!environmentValidation.node_env_production) {
      criticalErrors.push({
        code: 'NODE_ENV_NOT_PRODUCTION',
        message: 'NODE_ENV must be set to "production" for production deployment',
        severity: 'critical',
        field: 'VITE_NODE_ENV',
        recommendation: 'Set VITE_NODE_ENV=production in your environment variables'
      });
    }

    if (!environmentValidation.test_mode_disabled) {
      criticalErrors.push({
        code: 'TEST_MODE_ENABLED',
        message: 'Test mode must be disabled in production',
        severity: 'critical',
        field: 'VITE_IKHOKHA_TEST_MODE',
        recommendation: 'Set VITE_IKHOKHA_TEST_MODE=false'
      });
    }

    if (!productionValidation.production_api_configured) {
      criticalErrors.push({
        code: 'PRODUCTION_API_NOT_CONFIGURED',
        message: 'Production API credentials and endpoints are not properly configured',
        severity: 'critical',
        recommendation: 'Ensure production API key and URL are set correctly'
      });
    }

    if (variableValidation.missing_variables.length > 0) {
      criticalErrors.push({
        code: 'MISSING_REQUIRED_VARIABLES',
        message: `Missing required environment variables: ${variableValidation.missing_variables.join(', ')}`,
        severity: 'critical',
        recommendation: 'Set all required environment variables before deployment'
      });
    }

    if (!securityValidation.https_enforced) {
      criticalErrors.push({
        code: 'HTTPS_NOT_ENFORCED',
        message: 'HTTPS is not enforced for production API endpoints',
        severity: 'critical',
        field: 'VITE_IKHOKHA_API_URL',
        recommendation: 'Ensure API URL uses HTTPS and VITE_REQUIRE_HTTPS is not set to false'
      });
    }

    // Check for warnings
    if (!endpointValidation.webhook_endpoints_configured) {
      warnings.push({
        code: 'WEBHOOK_ENDPOINTS_NOT_CONFIGURED',
        message: 'Webhook endpoints are not fully configured',
        recommendation: 'Configure VITE_WEBHOOK_ENDPOINT and VITE_PRODUCTION_URL'
      });
    }

    // Add recommendations
    if (!securityValidation.security_logging_enabled) {
      recommendations.push({
        code: 'ENABLE_SECURITY_LOGGING',
        message: 'Enable security logging for better monitoring',
        priority: 'medium',
        action: 'Set VITE_ENABLE_PAYMENT_LOGGING=true'
      });
    }

    const isValid = criticalErrors.length === 0;
    const isProductionReady = isValid && warnings.length === 0;

    return {
      is_valid: isValid,
      is_production_ready: isProductionReady,
      environment_validation: environmentValidation,
      production_validation: productionValidation,
      endpoint_validation: endpointValidation,
      variable_validation: variableValidation,
      value_validation: valueValidation,
      security_validation: securityValidation,
      critical_errors: criticalErrors,
      warnings,
      recommendations
    };
  }

  /**
   * Generates comprehensive validation report for deployment readiness
   */
  async generateValidationReport(): Promise<ValidationReport> {
    const validationResults = await this.performCompleteValidation();
    const environmentInfo = this.getEnvironmentInfo();
    
    const totalChecks = this.calculateTotalChecks();
    const passedChecks = this.calculatePassedChecks(validationResults);
    const failedChecks = totalChecks - passedChecks;

    const nextSteps = this.generateNextSteps(validationResults);

    return {
      validation_id: this.generateValidationId(),
      timestamp: new Date(),
      environment_info: environmentInfo,
      validation_results: validationResults,
      deployment_readiness: validationResults.is_production_ready,
      next_steps: nextSteps,
      summary: {
        total_checks: totalChecks,
        passed_checks: passedChecks,
        failed_checks: failedChecks,
        warnings_count: validationResults.warnings.length,
        critical_errors_count: validationResults.critical_errors.length
      }
    };
  }

  // Private helper methods

  private getEnvVar(key: string): string | undefined {
    // Use injected environment provider for testing
    if (this.envProvider) {
      return this.envProvider(key);
    }
    
    // In browser environment, use import.meta.env
    try {
      if (import.meta?.env) {
        return import.meta.env[key];
      }
    } catch {
      // Ignore import.meta access errors in test environment
    }
    
    // Fallback to process.env for Node.js environments
    if (typeof process !== 'undefined' && process.env) {
      return process.env[key];
    }
    
    return undefined;
  }

  private checkRequiredVariables(): boolean {
    return this.requiredVariables.every(variable => {
      const value = this.getEnvVar(variable);
      return value && value.trim() !== '';
    });
  }

  private checkVariableValues(): boolean {
    const valueValidation = this.validateVariableValues();
    return valueValidation.api_key_format_valid &&
           valueValidation.api_secret_format_valid &&
           valueValidation.webhook_secret_format_valid &&
           valueValidation.timeout_values_valid &&
           valueValidation.retry_values_valid;
  }

  private checkNoFallbackCredentials(): boolean {
    const apiKey = this.getEnvVar('VITE_IKHOKHA_API_KEY');
    const apiSecret = this.getEnvVar('VITE_IKHOKHA_API_SECRET');
    
    // Ensure we're using the specific production credentials
    return apiKey === this.productionCredentials.api_key &&
           apiSecret === this.productionCredentials.api_secret;
  }

  private isValidApiUrl(url: string | undefined): boolean {
    if (!url) return false;
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'https:' && 
             parsedUrl.hostname.includes('ikhokha.com');
    } catch {
      return false;
    }
  }

  private validateApiKeyFormat(apiKey: string | undefined): boolean {
    if (!apiKey) return false;
    return apiKey === this.productionCredentials.api_key &&
           apiKey.length >= 32 &&
           /^[A-Z0-9]+$/.test(apiKey);
  }

  private validateApiSecretFormat(apiSecret: string | undefined): boolean {
    if (!apiSecret) return false;
    return apiSecret === this.productionCredentials.api_secret &&
           apiSecret.length >= 32 &&
           /^[A-Za-z0-9]+$/.test(apiSecret);
  }

  private validateWebhookSecretFormat(webhookSecret: string | undefined): boolean {
    if (!webhookSecret) return false;
    return webhookSecret === this.productionCredentials.webhook_secret &&
           webhookSecret.length >= 16;
  }

  private validateTimeoutValue(timeout: string | undefined): boolean {
    if (!timeout) return true; // Optional, so valid if not set
    const timeoutNum = parseInt(timeout, 10);
    return !isNaN(timeoutNum) && timeoutNum >= 30000 && timeoutNum <= 120000;
  }

  private validateRetryValue(retryAttempts: string | undefined): boolean {
    if (!retryAttempts) return true; // Optional, so valid if not set
    const retryNum = parseInt(retryAttempts, 10);
    return !isNaN(retryNum) && retryNum >= 1 && retryNum <= 10;
  }

  private validateCertificates(): boolean {
    // In a browser environment, we can't directly validate certificates
    // This would be implemented differently in a Node.js environment
    const apiUrl = this.getEnvVar('VITE_IKHOKHA_API_URL');
    return apiUrl?.startsWith('https://') || false;
  }

  private checkSecurityVulnerabilities(): boolean {
    // Basic security checks
    const apiKey = this.getEnvVar('VITE_IKHOKHA_API_KEY');
    const apiSecret = this.getEnvVar('VITE_IKHOKHA_API_SECRET');
    
    // Check for common security issues
    const hasWeakCredentials = !apiKey || !apiSecret || 
                              apiKey.length < 32 || 
                              apiSecret.length < 32;
    
    const hasInsecureEndpoints = !this.getEnvVar('VITE_IKHOKHA_API_URL')?.startsWith('https://');
    
    return !hasWeakCredentials && !hasInsecureEndpoints;
  }

  private getEnvironmentInfo(): EnvironmentInfo {
    return {
      node_version: typeof process !== 'undefined' ? process.version : 'unknown',
      platform: typeof navigator !== 'undefined' ? navigator.platform : 'unknown',
      timestamp: new Date(),
      build_environment: this.getEnvVar('MODE') || 'unknown'
    };
  }

  private calculateTotalChecks(): number {
    // Count all validation checks performed
    return 20; // Based on the validation methods implemented
  }

  private calculatePassedChecks(validation: CompleteValidation): number {
    let passed = 0;
    
    // Count passed environment validations
    if (validation.environment_validation.node_env_production) passed++;
    if (validation.environment_validation.test_mode_disabled) passed++;
    if (validation.environment_validation.production_endpoints) passed++;
    if (validation.environment_validation.required_variables_set) passed++;
    if (validation.environment_validation.variable_values_valid) passed++;
    
    // Count passed production validations
    if (validation.production_validation.is_production_mode) passed++;
    if (validation.production_validation.test_mode_disabled) passed++;
    if (validation.production_validation.fallback_credentials_disabled) passed++;
    if (validation.production_validation.production_api_configured) passed++;
    
    // Count passed endpoint validations
    if (validation.endpoint_validation.api_url_valid) passed++;
    if (validation.endpoint_validation.uses_https) passed++;
    if (validation.endpoint_validation.uses_production_domain) passed++;
    if (validation.endpoint_validation.webhook_endpoints_configured) passed++;
    
    // Count passed variable validations
    if (validation.variable_validation.all_required_present) passed++;
    
    // Count passed value validations
    if (validation.value_validation.api_key_format_valid) passed++;
    if (validation.value_validation.api_secret_format_valid) passed++;
    if (validation.value_validation.webhook_secret_format_valid) passed++;
    if (validation.value_validation.timeout_values_valid) passed++;
    if (validation.value_validation.retry_values_valid) passed++;
    
    // Count passed security validations
    if (validation.security_validation.https_enforced) passed++;
    
    return passed;
  }

  private generateNextSteps(validation: CompleteValidation): string[] {
    const steps: string[] = [];
    
    if (validation.critical_errors.length > 0) {
      steps.push('Fix all critical errors before proceeding with deployment');
      validation.critical_errors.forEach(error => {
        if (error.recommendation) {
          steps.push(`- ${error.recommendation}`);
        }
      });
    }
    
    if (validation.warnings.length > 0) {
      steps.push('Address warnings to ensure optimal production configuration');
      validation.warnings.forEach(warning => {
        if (warning.recommendation) {
          steps.push(`- ${warning.recommendation}`);
        }
      });
    }
    
    if (validation.is_production_ready) {
      steps.push('Environment is production-ready');
      steps.push('Proceed with deployment validation');
      steps.push('Run production health checks after deployment');
    }
    
    return steps;
  }

  private generateValidationId(): string {
    return `prod-env-val-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}