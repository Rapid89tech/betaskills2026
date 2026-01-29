/**
 * Production Credential Manager Service
 * 
 * Handles loading, validation, and secure management of production Ikhokha credentials.
 * Ensures proper credential format validation and secure credential masking for logging.
 * 
 * Requirements: 1.1, 1.2, 1.3, 3.2, 3.4
 */

export interface ProductionCredentials {
  api_key: string;
  api_secret: string;
  webhook_secret: string;
  node_env: string;
  test_mode: boolean;
  api_url: string;
  timeout: number;
  retry_attempts: number;
  retry_delay: number;
  webhook_validation: boolean;
  https_required: boolean;
  payment_logging: boolean;
}

export interface MaskedCredentials {
  api_key: string;
  api_secret: string;
  webhook_secret: string;
  node_env: string;
  test_mode: boolean;
  api_url: string;
  timeout: number;
  retry_attempts: number;
  retry_delay: number;
  webhook_validation: boolean;
  https_required: boolean;
  payment_logging: boolean;
}

export interface ValidationResult {
  is_valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface SecurityValidation {
  credential_strength_valid: boolean;
  no_development_patterns: boolean;
  proper_format: boolean;
  security_score: number;
  recommendations: string[];
}

export interface EnvironmentValidation {
  all_variables_present: boolean;
  variable_values_valid: boolean;
  production_mode_enabled: boolean;
  test_mode_disabled: boolean;
  missing_variables: string[];
  invalid_variables: string[];
}

/**
 * ProductionCredentialManager class for handling production credentials
 */
export class ProductionCredentialManager {
  private static instance: ProductionCredentialManager;
  private credentials: ProductionCredentials | null = null;
  private isInitialized = false;

  private constructor() {}

  /**
   * Get singleton instance of ProductionCredentialManager
   */
  public static getInstance(): ProductionCredentialManager {
    if (!ProductionCredentialManager.instance) {
      ProductionCredentialManager.instance = new ProductionCredentialManager();
    }
    return ProductionCredentialManager.instance;
  }

  /**
   * Load production credentials from environment variables
   * Requirements: 1.1, 1.2, 1.3
   */
  public loadProductionCredentials(): ProductionCredentials {
    try {
      // Check if we're in a development environment
      const isDevelopment = import.meta.env.DEV || import.meta.env.NODE_ENV === 'development';
      
      const credentials = {
        // Environment configuration - Requirement 1.4, 1.5
        node_env: this.getEnvVar('VITE_NODE_ENV', isDevelopment ? 'development' : 'production'),
        
        // Core Ikhokha credentials - Requirements 1.1, 1.2, 1.3
        api_key: this.getEnvVar('VITE_IKHOKHA_API_KEY', isDevelopment ? 'dev_key' : ''),
        api_secret: this.getEnvVar('VITE_IKHOKHA_API_SECRET', isDevelopment ? 'dev_secret' : ''),
        webhook_secret: this.getEnvVar('VITE_IKHOKHA_WEBHOOK_SECRET', isDevelopment ? 'dev_webhook_secret' : ''),
        test_mode: this.getEnvVarAsBoolean('VITE_IKHOKHA_TEST_MODE', isDevelopment),
        
        // API configuration
        api_url: this.getEnvVar('VITE_IKHOKHA_API_URL', isDevelopment ? 'https://sandbox.ikhokha.com' : 'https://api.ikhokha.com'),
        timeout: this.getEnvVarAsNumber('VITE_IKHOKHA_TIMEOUT', 45000),
        retry_attempts: this.getEnvVarAsNumber('VITE_IKHOKHA_RETRY_ATTEMPTS', 3),
        retry_delay: this.getEnvVarAsNumber('VITE_IKHOKHA_RETRY_DELAY', 2000),
        
        // Security configuration
        webhook_validation: this.getEnvVarAsBoolean('VITE_ENABLE_WEBHOOK_VALIDATION', true),
        https_required: this.getEnvVarAsBoolean('VITE_REQUIRE_HTTPS', true),
        payment_logging: this.getEnvVarAsBoolean('VITE_ENABLE_PAYMENT_LOGGING', true),
      };

      this.credentials = credentials;
      this.isInitialized = true;

      // Log successful credential loading (with masking)
      console.log('Production credentials loaded successfully:', this.maskSensitiveData(credentials));
      
      return credentials;
    } catch (error) {
      const errorMessage = `Failed to load production credentials: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  /**
   * Validate credential format and structure
   * Requirements: 3.2, 3.4
   */
  public validateCredentialFormat(credentials: ProductionCredentials): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate API key format
    if (!this.validateApiKeyFormat(credentials.api_key)) {
      errors.push('Invalid API key format. Must be 32-64 characters long with proper structure.');
    }

    // Validate API secret format
    if (!this.validateApiSecretFormat(credentials.api_secret)) {
      errors.push('Invalid API secret format. Must be 32-64 characters long with proper structure.');
    }

    // Validate webhook secret format
    if (!this.validateWebhookSecretFormat(credentials.webhook_secret)) {
      errors.push('Invalid webhook secret format. Must be 16-128 characters long.');
    }

    // Validate environment configuration
    if (credentials.node_env !== 'production') {
      errors.push('NODE_ENV must be set to "production" for production deployment.');
    }

    if (credentials.test_mode === true) {
      errors.push('Test mode must be disabled (false) for production deployment.');
    }

    // Validate API URL
    if (!credentials.api_url.includes('api.ikhokha.com')) {
      errors.push('API URL must use production Ikhokha endpoint (api.ikhokha.com).');
    }

    if (!credentials.api_url.startsWith('https://')) {
      errors.push('API URL must use HTTPS in production.');
    }

    // Validate timeout and retry settings
    if (credentials.timeout < 30000) {
      warnings.push('Timeout is less than 30 seconds, which may cause issues with slow connections.');
    }

    if (credentials.retry_attempts < 1) {
      errors.push('Retry attempts must be at least 1.');
    }

    return {
      is_valid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Create masked version of credentials for secure logging
   * Requirements: 3.4
   */
  public maskSensitiveData(credentials: ProductionCredentials): MaskedCredentials {
    return {
      ...credentials,
      api_key: this.maskCredential(credentials.api_key),
      api_secret: this.maskCredential(credentials.api_secret),
      webhook_secret: this.maskCredential(credentials.webhook_secret),
    };
  }

  /**
   * Validate credential security strength
   * Requirements: 3.2
   */
  public validateCredentialSecurity(credentials: ProductionCredentials): SecurityValidation {
    let security_score = 0;
    const recommendations: string[] = [];

    // Check API key strength
    const api_key_strength = this.assessCredentialStrength(credentials.api_key);
    security_score += api_key_strength.score;
    recommendations.push(...api_key_strength.recommendations);

    // Check API secret strength
    const api_secret_strength = this.assessCredentialStrength(credentials.api_secret);
    security_score += api_secret_strength.score;
    recommendations.push(...api_secret_strength.recommendations);

    // Check webhook secret strength
    const webhook_secret_strength = this.assessCredentialStrength(credentials.webhook_secret);
    security_score += webhook_secret_strength.score;
    recommendations.push(...webhook_secret_strength.recommendations);

    // Check for development patterns
    const no_development_patterns = !this.hasCommonDevelopmentPatterns(credentials);
    if (!no_development_patterns) {
      recommendations.push('Credentials contain development patterns. Ensure using production credentials.');
    }

    // Check proper format
    const proper_format = this.validateApiKeyFormat(credentials.api_key) &&
                         this.validateApiSecretFormat(credentials.api_secret) &&
                         this.validateWebhookSecretFormat(credentials.webhook_secret);

    return {
      credential_strength_valid: security_score >= 75, // Minimum 75% security score
      no_development_patterns,
      proper_format,
      security_score: Math.round(security_score / 3), // Average score
      recommendations: [...new Set(recommendations)] // Remove duplicates
    };
  }

  /**
   * Validate environment variable integration
   * Requirements: 3.2, 3.4
   */
  public validateEnvironmentIntegration(): EnvironmentValidation {
    const required_variables = [
      'VITE_IKHOKHA_API_KEY',
      'VITE_IKHOKHA_API_SECRET',
      'VITE_IKHOKHA_WEBHOOK_SECRET',
      'VITE_NODE_ENV'
    ];

    const missing_variables: string[] = [];
    const invalid_variables: string[] = [];

    // Check for missing variables
    for (const variable of required_variables) {
      if (!this.hasEnvVar(variable)) {
        missing_variables.push(variable);
      }
    }

    // Check for invalid variable values
    if (this.hasEnvVar('VITE_NODE_ENV') && this.getEnvVar('VITE_NODE_ENV') !== 'production') {
      invalid_variables.push('VITE_NODE_ENV (must be "production")');
    }

    if (this.hasEnvVar('VITE_IKHOKHA_TEST_MODE') && this.getEnvVarAsBoolean('VITE_IKHOKHA_TEST_MODE', false) === true) {
      invalid_variables.push('VITE_IKHOKHA_TEST_MODE (must be "false" or unset)');
    }

    return {
      all_variables_present: missing_variables.length === 0,
      variable_values_valid: invalid_variables.length === 0,
      production_mode_enabled: this.getEnvVar('VITE_NODE_ENV') === 'production',
      test_mode_disabled: !this.getEnvVarAsBoolean('VITE_IKHOKHA_TEST_MODE', false),
      missing_variables,
      invalid_variables
    };
  }

  /**
   * Get current credentials (if loaded)
   */
  public getCredentials(): ProductionCredentials | null {
    return this.credentials;
  }

  /**
   * Check if credentials are initialized
   */
  public isCredentialsInitialized(): boolean {
    return this.isInitialized && this.credentials !== null;
  }

  // Private helper methods

  private getRequiredEnvVar(name: string): string {
    const value = import.meta.env[name];
    if (!value) {
      throw new Error(`Required environment variable ${name} is not set`);
    }
    return value;
  }

  private getEnvVar(name: string, defaultValue: string = ''): string {
    return import.meta.env[name] || defaultValue;
  }

  private getEnvVarAsBoolean(name: string, defaultValue: boolean = false): boolean {
    const value = import.meta.env[name];
    if (value === undefined) return defaultValue;
    return value.toLowerCase() === 'true';
  }

  private getEnvVarAsNumber(name: string, defaultValue: number): number {
    const value = import.meta.env[name];
    if (value === undefined) return defaultValue;
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }

  private hasEnvVar(name: string): boolean {
    return import.meta.env[name] !== undefined;
  }

  private validateApiKeyFormat(apiKey: string): boolean {
    // API key should be 32-64 characters, alphanumeric with possible special characters
    return apiKey.length >= 32 && apiKey.length <= 64 && /^[A-Z0-9]+$/i.test(apiKey);
  }

  private validateApiSecretFormat(apiSecret: string): boolean {
    // API secret should be 32-64 characters, alphanumeric with possible special characters
    return apiSecret.length >= 32 && apiSecret.length <= 64 && /^[A-Za-z0-9]+$/.test(apiSecret);
  }

  private validateWebhookSecretFormat(webhookSecret: string): boolean {
    // Webhook secret should be 16-128 characters
    return webhookSecret.length >= 16 && webhookSecret.length <= 128;
  }

  private maskCredential(credential: string): string {
    if (credential.length <= 8) {
      return '*'.repeat(credential.length);
    }
    const start = credential.substring(0, 4);
    const end = credential.substring(credential.length - 3);
    const middle = '*'.repeat(credential.length - 7);
    return `${start}${middle}${end}`;
  }

  private assessCredentialStrength(credential: string): { score: number; recommendations: string[] } {
    let score = 0;
    const recommendations: string[] = [];

    // Length check
    if (credential.length >= 32) {
      score += 30;
    } else {
      recommendations.push('Credential should be at least 32 characters long');
    }

    // Character diversity check
    const hasUppercase = /[A-Z]/.test(credential);
    const hasLowercase = /[a-z]/.test(credential);
    const hasNumbers = /[0-9]/.test(credential);
    const hasSpecialChars = /[^A-Za-z0-9]/.test(credential);

    const diversity = [hasUppercase, hasLowercase, hasNumbers, hasSpecialChars].filter(Boolean).length;
    score += diversity * 15; // Up to 60 points for diversity

    if (diversity < 3) {
      recommendations.push('Credential should contain a mix of uppercase, lowercase, numbers, and special characters');
    }

    // Pattern check
    if (!/(.)\1{2,}/.test(credential)) { // No repeated characters
      score += 10;
    } else {
      recommendations.push('Credential should not contain repeated character patterns');
    }

    return { score: Math.min(score, 100), recommendations };
  }

  private hasCommonDevelopmentPatterns(credentials: ProductionCredentials): boolean {
    const developmentPatterns = [
      'test', 'dev', 'development', 'local', 'demo', 'sample',
      '123', 'abc', 'password', 'secret', 'key'
    ];

    const credentialValues = [
      credentials.api_key.toLowerCase(),
      credentials.api_secret.toLowerCase(),
      credentials.webhook_secret.toLowerCase()
    ];

    return credentialValues.some(value =>
      developmentPatterns.some(pattern => value.includes(pattern))
    );
  }
}

/**
 * Export singleton instance for easy access
 */
export const productionCredentialManager = ProductionCredentialManager.getInstance();