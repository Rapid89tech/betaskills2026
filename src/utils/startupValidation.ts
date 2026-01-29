/**
 * Enhanced Startup Validation System
 * 
 * Comprehensive startup validation with error recovery and detailed reporting
 * Prevents application startup with invalid production configuration
 */

import { productionValidator, type ProductionReadiness } from '../services/ProductionValidator';

export interface StartupValidationResult {
  success: boolean;
  canProceed: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
  environment: 'development' | 'production' | 'test';
  timestamp: Date;
}

export interface StartupValidationOptions {
  strictMode?: boolean;
  allowWarnings?: boolean;
  skipInDevelopment?: boolean;
  logLevel?: 'silent' | 'minimal' | 'verbose';
}

/**
 * Enhanced startup validation with comprehensive error handling
 */
export class StartupValidator {
  private static instance: StartupValidator;
  private validationHistory: StartupValidationResult[] = [];
  private readonly MAX_HISTORY = 10;

  private constructor() {}

  public static getInstance(): StartupValidator {
    if (!StartupValidator.instance) {
      StartupValidator.instance = new StartupValidator();
    }
    return StartupValidator.instance;
  }

  /**
   * Perform comprehensive startup validation
   */
  public async performStartupValidation(
    options: StartupValidationOptions = {}
  ): Promise<StartupValidationResult> {
    const {
      strictMode = false,
      allowWarnings = true,
      skipInDevelopment = false,
      logLevel = 'verbose'
    } = options;

    const environment = this.detectEnvironment();
    const timestamp = new Date();

    if (logLevel !== 'silent') {
      console.log(`🔍 Starting ${environment} environment validation...`);
    }

    // Skip validation in development if requested
    if (environment === 'development' && skipInDevelopment) {
      const result: StartupValidationResult = {
        success: true,
        canProceed: true,
        errors: [],
        warnings: [],
        recommendations: ['Development environment - validation skipped'],
        environment,
        timestamp
      };

      this.addToHistory(result);
      
      if (logLevel === 'verbose') {
        console.log('🧪 Development environment - skipping production validation');
      }
      
      return result;
    }

    try {
      // Perform comprehensive validation
      const readiness = productionValidator.validateProductionReadiness();
      const configHealth = productionValidator.getConfigurationHealth();

      // Collect all issues
      const errors: string[] = [...readiness.issues];
      const warnings: string[] = [];
      const recommendations: string[] = [...readiness.recommendations];

      // Add health-specific warnings
      if (!configHealth.ikhokhaConfig.healthy) {
        warnings.push('Ikhokha configuration has issues');
      }
      if (!configHealth.databaseConfig.healthy) {
        warnings.push('Database configuration has issues');
      }
      if (!configHealth.webhookConfig.healthy) {
        warnings.push('Webhook configuration has issues');
      }

      // Determine if we can proceed
      const hasBlockingErrors = errors.length > 0;
      const hasWarnings = warnings.length > 0;
      
      let canProceed = true;
      let success = true;

      if (hasBlockingErrors) {
        canProceed = false;
        success = false;
      } else if (hasWarnings && strictMode && !allowWarnings) {
        canProceed = false;
        success = false;
        errors.push('Strict mode enabled - warnings treated as errors');
      }

      // Production-specific validation
      if (environment === 'production') {
        if (!readiness.ready) {
          canProceed = false;
          success = false;
          errors.push('Production environment is not ready for live transactions');
        }

        if (!readiness.securityValid) {
          canProceed = false;
          success = false;
          errors.push('Production security validation failed');
        }
      }

      const result: StartupValidationResult = {
        success,
        canProceed,
        errors,
        warnings,
        recommendations,
        environment,
        timestamp
      };

      this.addToHistory(result);
      this.logValidationResult(result, logLevel);

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown validation error';
      
      const result: StartupValidationResult = {
        success: false,
        canProceed: environment !== 'production', // Allow development to proceed with errors
        errors: [`Startup validation failed: ${errorMessage}`],
        warnings: [],
        recommendations: ['Check configuration and try again'],
        environment,
        timestamp
      };

      this.addToHistory(result);
      this.logValidationResult(result, logLevel);

      return result;
    }
  }

  /**
   * Validate and throw if critical issues found
   */
  public async validateAndThrow(options: StartupValidationOptions = {}): Promise<void> {
    const result = await this.performStartupValidation(options);

    if (!result.canProceed) {
      const errorMessage = `Startup validation failed: ${result.errors.join(', ')}`;
      throw new Error(errorMessage);
    }

    if (result.warnings.length > 0 && options.logLevel !== 'silent') {
      console.warn('⚠️ Startup validation warnings:', result.warnings);
    }
  }

  /**
   * Get validation history
   */
  public getValidationHistory(): StartupValidationResult[] {
    return [...this.validationHistory];
  }

  /**
   * Get last validation result
   */
  public getLastValidation(): StartupValidationResult | null {
    return this.validationHistory[this.validationHistory.length - 1] || null;
  }

  /**
   * Clear validation history
   */
  public clearHistory(): void {
    this.validationHistory = [];
  }

  /**
   * Check if system is ready for production
   */
  public async isProductionReady(): Promise<boolean> {
    try {
      const result = await this.performStartupValidation({ logLevel: 'silent' });
      return result.success && result.environment === 'production';
    } catch {
      return false;
    }
  }

  /**
   * Generate validation report
   */
  public generateValidationReport(): string {
    const lastValidation = this.getLastValidation();
    
    if (!lastValidation) {
      return 'No validation performed yet';
    }

    const lines: string[] = [];
    lines.push('=== Startup Validation Report ===');
    lines.push(`Environment: ${lastValidation.environment}`);
    lines.push(`Timestamp: ${lastValidation.timestamp.toISOString()}`);
    lines.push(`Status: ${lastValidation.success ? 'SUCCESS' : 'FAILED'}`);
    lines.push(`Can Proceed: ${lastValidation.canProceed ? 'YES' : 'NO'}`);
    lines.push('');

    if (lastValidation.errors.length > 0) {
      lines.push('ERRORS:');
      lastValidation.errors.forEach(error => lines.push(`  ❌ ${error}`));
      lines.push('');
    }

    if (lastValidation.warnings.length > 0) {
      lines.push('WARNINGS:');
      lastValidation.warnings.forEach(warning => lines.push(`  ⚠️ ${warning}`));
      lines.push('');
    }

    if (lastValidation.recommendations.length > 0) {
      lines.push('RECOMMENDATIONS:');
      lastValidation.recommendations.forEach(rec => lines.push(`  💡 ${rec}`));
      lines.push('');
    }

    lines.push('=== End Report ===');
    return lines.join('\n');
  }

  // Private helper methods

  private detectEnvironment(): 'development' | 'production' | 'test' {
    if (import.meta.env.VITE_NODE_ENV === 'production' || import.meta.env.NODE_ENV === 'production') {
      return 'production';
    }
    
    if (import.meta.env.VITE_NODE_ENV === 'test' || import.meta.env.NODE_ENV === 'test') {
      return 'test';
    }
    
    return 'development';
  }

  private addToHistory(result: StartupValidationResult): void {
    this.validationHistory.push(result);
    
    // Keep only the last MAX_HISTORY results
    if (this.validationHistory.length > this.MAX_HISTORY) {
      this.validationHistory = this.validationHistory.slice(-this.MAX_HISTORY);
    }
  }

  private logValidationResult(result: StartupValidationResult, logLevel: 'silent' | 'minimal' | 'verbose'): void {
    if (logLevel === 'silent') return;

    const icon = result.success ? '✅' : '❌';
    const status = result.success ? 'PASSED' : 'FAILED';
    
    if (logLevel === 'minimal') {
      console.log(`${icon} Startup validation ${status}`);
      if (!result.success) {
        console.error('Errors:', result.errors);
      }
      return;
    }

    // Verbose logging
    console.log(`${icon} Startup validation ${status} (${result.environment})`);
    
    if (result.errors.length > 0) {
      console.error('❌ Errors:');
      result.errors.forEach(error => console.error(`  • ${error}`));
    }
    
    if (result.warnings.length > 0) {
      console.warn('⚠️ Warnings:');
      result.warnings.forEach(warning => console.warn(`  • ${warning}`));
    }
    
    if (result.recommendations.length > 0) {
      console.info('💡 Recommendations:');
      result.recommendations.forEach(rec => console.info(`  • ${rec}`));
    }

    if (result.canProceed) {
      console.log('✅ Application can proceed to start');
    } else {
      console.error('🛑 Application startup blocked due to validation failures');
    }
  }
}

// Export singleton instance and convenience functions
export const startupValidator = StartupValidator.getInstance();

export const performStartupValidation = (options?: StartupValidationOptions) => 
  startupValidator.performStartupValidation(options);

export const validateAndThrow = (options?: StartupValidationOptions) => 
  startupValidator.validateAndThrow(options);

export const isProductionReady = () => 
  startupValidator.isProductionReady();

export const getValidationReport = () => 
  startupValidator.generateValidationReport();

/**
 * Enhanced startup validation for main.tsx
 */
export const enhancedStartupValidation = async (): Promise<void> => {
  try {
    await validateAndThrow({
      strictMode: false,
      allowWarnings: true,
      skipInDevelopment: false,
      logLevel: 'verbose'
    });
  } catch (error) {
    console.error('❌ Application startup validation failed:', error);
    
    // In production, prevent startup
    if (import.meta.env.VITE_NODE_ENV === 'production') {
      throw error;
    }
    
    // In development, log warning but allow startup
    console.warn('⚠️ Development environment - allowing startup despite validation failures');
  }
};