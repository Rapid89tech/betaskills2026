/**
 * Strict Production Payment Validator
 * 
 * CRITICAL: This validator enforces strict production payment validation rules
 * and blocks payment processing if not in production mode with valid credentials.
 * Implements requirements 2.1, 2.4, and 2.5 from the production payment validation fix.
 */

// Global type declaration for payment config error
declare global {
  interface Window {
    PAYMENT_CONFIG_ERROR?: string;
    PAYMENT_PROCESSING_BLOCKED?: boolean;
  }
}

export interface ProductionValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  canProcessRealPayments: boolean;
  blockPaymentProcessing: boolean;
}

export interface CredentialValidationResult {
  isValid: boolean;
  hasTestCredentials: boolean;
  hasValidProductionCredentials: boolean;
  errors: string[];
  warnings: string[];
}

export interface EnvironmentValidationResult {
  isProduction: boolean;
  hasRequiredVariables: boolean;
  missingVariables: string[];
  invalidVariables: string[];
  errors: string[];
}

/**
 * Strict Production Payment Validator Class
 * 
 * Enforces production payment validation rules and blocks payment processing
 * if not in production mode with valid credentials.
 */
export class StrictPaymentValidator {
  
  /**
   * Validate production mode and block payment processing if invalid
   * Requirement 2.1: Block payment processing if not in production mode with valid credentials
   */
  static validateProductionMode(): ProductionValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    
    // In non-production environments, block real payment processing
    if (!isProduction) {
      return {
        isValid: false,
        errors: ['Payment processing blocked: Not running in production mode'],
        warnings: ['Development mode detected - real payment processing is disabled'],
        canProcessRealPayments: false,
        blockPaymentProcessing: true
      };
    }
    
    // Validate production environment variables
    const envValidation = this.validateEnvironmentVariables();
    if (!envValidation.hasRequiredVariables) {
      errors.push(...envValidation.errors);
    }
    
    // Validate credentials
    const credentialValidation = this.validateCredentials();
    if (!credentialValidation.isValid) {
      errors.push(...credentialValidation.errors);
    }
    
    // Check for test credentials in production
    if (credentialValidation.hasTestCredentials) {
      errors.push('CRITICAL: Test credentials detected in production environment');
    }
    
    const blockPaymentProcessing = errors.length > 0;
    const canProcessRealPayments = !blockPaymentProcessing && credentialValidation.hasValidProductionCredentials;
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings: [...warnings, ...credentialValidation.warnings],
      canProcessRealPayments,
      blockPaymentProcessing
    };
  }
  
  /**
   * Validate credentials and reject test credentials in production
   * Requirement 2.4: Implement credential validation that rejects test credentials in production
   */
  static validateCredentials(): CredentialValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    
    const apiKey = import.meta.env.VITE_IKHOKHA_API_KEY;
    const apiSecret = import.meta.env.VITE_IKHOKHA_API_SECRET;
    const webhookSecret = import.meta.env.VITE_IKHOKHA_WEBHOOK_SECRET;
    
    // Known test credentials that must be rejected in production
    const TEST_API_KEY = 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D';
    const TEST_API_SECRET = '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS';
    
    let hasTestCredentials = false;
    let hasValidProductionCredentials = true;
    
    if (isProduction) {
      // Check for test credentials in production
      if (apiKey === TEST_API_KEY) {
        errors.push('CRITICAL: Test API key detected in production environment');
        hasTestCredentials = true;
        hasValidProductionCredentials = false;
      }
      
      if (apiSecret === TEST_API_SECRET) {
        errors.push('CRITICAL: Test API secret detected in production environment');
        hasTestCredentials = true;
        hasValidProductionCredentials = false;
      }
      
      // Validate credential format and strength
      if (!apiKey || apiKey.length < 20) {
        errors.push('CRITICAL: Production API key is missing or invalid (too short)');
        hasValidProductionCredentials = false;
      }
      
      if (!apiSecret || apiSecret.length < 20) {
        errors.push('CRITICAL: Production API secret is missing or invalid (too short)');
        hasValidProductionCredentials = false;
      }
      
      if (!webhookSecret || webhookSecret.length < 16) {
        errors.push('CRITICAL: Production webhook secret is missing or invalid (too short)');
        hasValidProductionCredentials = false;
      }
      
      // Check for development/test patterns in webhook secret
      if (webhookSecret && (webhookSecret.includes('dev_') || webhookSecret.includes('test_') || webhookSecret.includes('local_'))) {
        errors.push('CRITICAL: Webhook secret contains development/test patterns');
        hasTestCredentials = true;
        hasValidProductionCredentials = false;
      }
      
      // Validate credential complexity for production
      if (apiKey && !this.isValidProductionCredential(apiKey)) {
        warnings.push('WARNING: API key may not meet production security standards');
      }
      
      if (apiSecret && !this.isValidProductionCredential(apiSecret)) {
        warnings.push('WARNING: API secret may not meet production security standards');
      }
    } else {
      // In development, warn about missing credentials but don't error
      if (!apiKey) {
        warnings.push('API key not configured - using fallback development credentials');
      }
      
      if (!apiSecret) {
        warnings.push('API secret not configured - using fallback development credentials');
      }
      
      if (!webhookSecret) {
        warnings.push('Webhook secret not configured - using fallback development credentials');
      }
    }
    
    return {
      isValid: errors.length === 0,
      hasTestCredentials,
      hasValidProductionCredentials,
      errors,
      warnings
    };
  }
  
  /**
   * Validate environment variables for production requirements
   * Requirement 2.5: Add environment variable validation for production requirements
   */
  static validateEnvironmentVariables(): EnvironmentValidationResult {
    const errors: string[] = [];
    const missingVariables: string[] = [];
    const invalidVariables: string[] = [];
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    
    // Required environment variables for production
    const requiredVars = [
      'VITE_IKHOKHA_API_KEY',
      'VITE_IKHOKHA_API_SECRET',
      'VITE_IKHOKHA_WEBHOOK_SECRET',
      'VITE_IKHOKHA_API_URL'
    ];
    
    // Check for missing required variables
    for (const varName of requiredVars) {
      const value = import.meta.env[varName];
      if (!value) {
        missingVariables.push(varName);
        if (isProduction) {
          errors.push(`CRITICAL: Required environment variable ${varName} is not set`);
        }
      }
    }
    
    // Validate specific environment variable values in production
    if (isProduction) {
      const testMode = import.meta.env.VITE_IKHOKHA_TEST_MODE;
      if (testMode === 'true') {
        invalidVariables.push('VITE_IKHOKHA_TEST_MODE');
        errors.push('CRITICAL: Test mode is enabled in production (VITE_IKHOKHA_TEST_MODE=true)');
      }
      
      const apiUrl = import.meta.env.VITE_IKHOKHA_API_URL;
      if (apiUrl && !apiUrl.startsWith('https://')) {
        invalidVariables.push('VITE_IKHOKHA_API_URL');
        errors.push('CRITICAL: API URL must use HTTPS in production');
      }
      
      if (apiUrl && apiUrl.includes('pay.ikhokha.com')) {
        invalidVariables.push('VITE_IKHOKHA_API_URL');
        errors.push('CRITICAL: Using test API URL (pay.ikhokha.com) in production - use api.ikhokha.com');
      }
      
      // Validate timeout settings
      const timeout = import.meta.env.VITE_IKHOKHA_TIMEOUT;
      if (timeout && parseInt(timeout) < 30000) {
        invalidVariables.push('VITE_IKHOKHA_TIMEOUT');
        errors.push('CRITICAL: Production timeout should be at least 30 seconds');
      }
    }
    
    const hasRequiredVariables = missingVariables.length === 0;
    
    return {
      isProduction,
      hasRequiredVariables,
      missingVariables,
      invalidVariables,
      errors
    };
  }
  
  /**
   * Check if a credential meets production security standards
   */
  private static isValidProductionCredential(credential: string): boolean {
    // Basic validation for production credentials
    if (credential.length < 20) return false;
    
    // Should contain mix of uppercase, lowercase, and numbers
    const hasUppercase = /[A-Z]/.test(credential);
    const hasLowercase = /[a-z]/.test(credential);
    const hasNumbers = /[0-9]/.test(credential);
    
    return hasUppercase && hasLowercase && hasNumbers;
  }
  
  /**
   * Prevent fallback mechanisms from being used
   * Blocks any attempt to use fallback payment processing
   */
  static preventFallbackMechanisms(): void {
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    
    if (isProduction) {
      // Set global flag to block fallback mechanisms
      if (typeof window !== 'undefined') {
        window.PAYMENT_PROCESSING_BLOCKED = true;
      }
      
      // Log critical warning about fallback prevention
      console.error('🚨 FALLBACK MECHANISMS DISABLED IN PRODUCTION');
      console.error('⚠️ All payment processing must go through real gateway validation');
    }
  }
  
  /**
   * Enforce real payment processing only
   * Blocks any simulation or test payment processing in production
   */
  static enforceRealPaymentProcessing(): void {
    const validation = this.validateProductionMode();
    
    if (validation.blockPaymentProcessing) {
      const errorMessage = 'Payment processing blocked due to invalid production configuration';
      
      // Set global error state
      if (typeof window !== 'undefined') {
        window.PAYMENT_CONFIG_ERROR = validation.errors.join('; ');
        window.PAYMENT_PROCESSING_BLOCKED = true;
      }
      
      // Log critical errors
      console.error('🚨 PAYMENT PROCESSING BLOCKED');
      validation.errors.forEach(error => console.error(`❌ ${error}`));
      
      throw new Error(`${errorMessage}: ${validation.errors.join(', ')}`);
    }
  }
  
  /**
   * Legacy method for backward compatibility
   * @deprecated Use validateProductionMode() instead
   */
  static validateProductionConfig(): ProductionValidationResult {
    return this.validateProductionMode();
  }
  
  /**
   * Display validation results to console
   */
  static displayValidationResults(result: ProductionValidationResult): void {
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    
    if (isProduction) {
      if (result.canProcessRealPayments && !result.blockPaymentProcessing) {
        console.log('✅ STRICT PRODUCTION PAYMENT VALIDATION PASSED');
        console.log('💰 Real payment processing is ENABLED');
        console.log('🔒 Production credentials validated and secured');
      } else {
        console.error('❌ STRICT PRODUCTION PAYMENT VALIDATION FAILED');
        console.error('🚨 PAYMENT PROCESSING IS BLOCKED');
        console.error('⚠️ CUSTOMERS CANNOT MAKE PAYMENTS');
        
        result.errors.forEach(error => {
          console.error(`❌ ${error}`);
        });
        
        if (result.blockPaymentProcessing) {
          console.error('🔒 Payment processing has been completely blocked for security');
        }
      }
      
      result.warnings.forEach(warning => {
        console.warn(`⚠️ ${warning}`);
      });
    } else {
      console.log('🧪 Development mode - real payment processing blocked');
      console.log('⚠️ Only payment simulation available in development');
    }
  }
  
  /**
   * Check production validation with strict enforcement
   */
  static checkProductionValidation(): void {
    const result = this.validateProductionMode();
    
    if (result.blockPaymentProcessing) {
      console.error('🚨 CRITICAL: PAYMENT PROCESSING BLOCKED 🚨');
      console.error('Payment processing is completely disabled due to configuration issues:');
      result.errors.forEach(error => console.error(`• ${error}`));
      
      if (import.meta.env.VITE_NODE_ENV === 'production') {
        console.error('⚠️ Production environment detected but payment processing is unsafe');
        console.error('💡 Fix configuration issues before enabling payment processing');
      } else {
        console.error('⚠️ Development environment - real payment processing is disabled');
      }
      
      // Store error state for UI components
      if (typeof window !== 'undefined') {
        window.PAYMENT_CONFIG_ERROR = result.errors.join('; ');
        window.PAYMENT_PROCESSING_BLOCKED = true;
      }
    } else if (result.canProcessRealPayments) {
      console.log('✅ Payment processing validation passed');
      
      // Clear any previous error states
      if (typeof window !== 'undefined') {
        delete window.PAYMENT_CONFIG_ERROR;
        delete window.PAYMENT_PROCESSING_BLOCKED;
      }
    }
  }
}

/**
 * Legacy ProductionPaymentValidator class for backward compatibility
 * @deprecated Use StrictPaymentValidator instead
 */
export class ProductionPaymentValidator extends StrictPaymentValidator {
  // All methods inherited from StrictPaymentValidator
}

// Auto-validate on module load with strict enforcement
if (typeof window !== 'undefined') {
  try {
    // Initialize fallback prevention
    StrictPaymentValidator.preventFallbackMechanisms();
    
    // Perform strict validation
    const result = StrictPaymentValidator.validateProductionMode();
    StrictPaymentValidator.displayValidationResults(result);
    StrictPaymentValidator.checkProductionValidation();
    
    // Log initialization status
    const isProduction = import.meta.env.VITE_NODE_ENV === 'production';
    if (isProduction) {
      console.log('🔒 Strict Payment Validator initialized for PRODUCTION');
      console.log('⚡ Fallback mechanisms disabled');
      console.log('🛡️ Test credentials blocked');
    } else {
      console.log('🧪 Strict Payment Validator initialized for DEVELOPMENT');
      console.log('⚠️ Real payment processing blocked in development');
    }
  } catch (error) {
    console.error('❌ Strict Payment Validator failed to initialize:', error);
    
    // Set global error state to block payment processing
    if (typeof window !== 'undefined') {
      window.PAYMENT_CONFIG_ERROR = 'Payment validator initialization failed';
      window.PAYMENT_PROCESSING_BLOCKED = true;
    }
  }
}