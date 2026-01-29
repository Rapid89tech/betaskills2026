/**
 * Production Startup Validator Service
 * 
 * Coordinates the initialization and validation of all production services during application startup.
 * Provides graceful degradation and error handling for production service failures.
 * 
 * Requirements: 2.4, 2.5, 7.1, 7.2
 */

import { productionCredentialManager } from './ProductionCredentialManager';
import { ProductionEnvironmentValidator } from './ProductionEnvironmentValidator';
import { productionConfigurationEnforcer } from './ProductionConfigurationEnforcer';
import { productionSecurityValidator } from './ProductionSecurityValidator';
import { ProductionMonitoringSetup } from './ProductionMonitoringSetup';
import { ProductionDeploymentValidator } from './ProductionDeploymentValidator';

export interface StartupValidationResult {
  success: boolean;
  is_production_ready: boolean;
  errors: string[];
  warnings: string[];
  services_initialized: string[];
  services_failed: string[];
  degraded_services: string[];
  startup_time: number;
  validation_score: number;
}

export interface ServiceInitializationResult {
  service_name: string;
  success: boolean;
  error?: string;
  warning?: string;
  initialization_time: number;
  critical: boolean;
}

export interface StartupConfiguration {
  enable_monitoring: boolean;
  enable_deployment_validation: boolean;
  fail_on_security_errors: boolean;
  fail_on_credential_errors: boolean;
  fail_on_environment_errors: boolean;
  graceful_degradation: boolean;
  max_startup_time: number; // milliseconds
}

export class ProductionStartupValidator {
  private static instance: ProductionStartupValidator;
  private startupResults: StartupValidationResult | null = null;
  private serviceResults: ServiceInitializationResult[] = [];

  private constructor() {}

  public static getInstance(): ProductionStartupValidator {
    if (!ProductionStartupValidator.instance) {
      ProductionStartupValidator.instance = new ProductionStartupValidator();
    }
    return ProductionStartupValidator.instance;
  }

  /**
   * Performs comprehensive startup validation and service initialization
   * Requirements: 2.4, 2.5, 7.1, 7.2
   */
  async validateAndInitializeStartup(config?: Partial<StartupConfiguration>): Promise<StartupValidationResult> {
    const startTime = Date.now();
    const configuration: StartupConfiguration = {
      enable_monitoring: true,
      enable_deployment_validation: true,
      fail_on_security_errors: true,
      fail_on_credential_errors: true,
      fail_on_environment_errors: true,
      graceful_degradation: true,
      max_startup_time: 30000, // 30 seconds
      ...config
    };

    console.log('[STARTUP] Beginning production startup validation...');

    const result: StartupValidationResult = {
      success: true,
      is_production_ready: false,
      errors: [],
      warnings: [],
      services_initialized: [],
      services_failed: [],
      degraded_services: [],
      startup_time: 0,
      validation_score: 0
    };

    this.serviceResults = [];

    try {
      // Check if we're in production mode
      const isProduction = this.isProductionEnvironment();
      
      if (!isProduction) {
        console.log('[STARTUP] Development mode detected - minimal validation');
        result.warnings.push('Running in development mode');
        result.success = true;
        result.is_production_ready = false;
        result.startup_time = Date.now() - startTime;
        result.validation_score = 50; // Partial score for development
        this.startupResults = result;
        return result;
      }

      console.log('[STARTUP] Production mode detected - full validation required');

      // Initialize services in order of criticality
      const serviceInitializations = [
        () => this.initializeCredentialManager(configuration),
        () => this.initializeEnvironmentValidator(configuration),
        () => this.initializeConfigurationEnforcer(configuration),
        () => this.initializeSecurityValidator(configuration),
        () => this.initializeMonitoringSetup(configuration),
        () => this.initializeDeploymentValidator(configuration)
      ];

      // Execute service initializations with timeout protection
      for (const initializeService of serviceInitializations) {
        try {
          const serviceResult = await this.executeWithTimeout(
            initializeService(),
            5000, // 5 second timeout per service
            'Service initialization timeout'
          );
          
          this.serviceResults.push(serviceResult);
          
          if (serviceResult.success) {
            result.services_initialized.push(serviceResult.service_name);
          } else {
            result.services_failed.push(serviceResult.service_name);
            
            if (serviceResult.critical && !configuration.graceful_degradation) {
              result.errors.push(serviceResult.error || `Critical service ${serviceResult.service_name} failed`);
              result.success = false;
            } else if (serviceResult.critical) {
              result.degraded_services.push(serviceResult.service_name);
              result.warnings.push(serviceResult.error || `Critical service ${serviceResult.service_name} degraded`);
            } else {
              result.warnings.push(serviceResult.error || `Non-critical service ${serviceResult.service_name} failed`);
            }
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown service error';
          console.error(`[STARTUP] Service initialization failed: ${errorMessage}`);
          result.errors.push(`Service initialization failed: ${errorMessage}`);
          result.success = false;
        }
      }

      // Calculate validation score
      const totalServices = this.serviceResults.length;
      const successfulServices = result.services_initialized.length;
      const degradedServices = result.degraded_services.length;
      
      result.validation_score = totalServices > 0 ? 
        Math.round(((successfulServices + (degradedServices * 0.5)) / totalServices) * 100) : 0;

      // Determine production readiness
      result.is_production_ready = result.success && 
                                  result.validation_score >= 80 && 
                                  result.services_failed.length === 0;

      // Final startup time
      result.startup_time = Date.now() - startTime;

      // Log startup summary
      console.log(`[STARTUP] Validation complete - Success: ${result.success}, Score: ${result.validation_score}%, Time: ${result.startup_time}ms`);
      console.log(`[STARTUP] Services initialized: ${result.services_initialized.join(', ')}`);
      
      if (result.services_failed.length > 0) {
        console.warn(`[STARTUP] Services failed: ${result.services_failed.join(', ')}`);
      }
      
      if (result.degraded_services.length > 0) {
        console.warn(`[STARTUP] Services degraded: ${result.degraded_services.join(', ')}`);
      }

      this.startupResults = result;
      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown startup error';
      console.error('[STARTUP] Startup validation failed:', errorMessage);
      
      result.success = false;
      result.is_production_ready = false;
      result.errors.push(`Startup validation failed: ${errorMessage}`);
      result.startup_time = Date.now() - startTime;
      result.validation_score = 0;
      
      this.startupResults = result;
      return result;
    }
  }

  /**
   * Gets the last startup validation results
   */
  getStartupResults(): StartupValidationResult | null {
    return this.startupResults;
  }

  /**
   * Gets detailed service initialization results
   */
  getServiceResults(): ServiceInitializationResult[] {
    return [...this.serviceResults];
  }

  /**
   * Checks if the application is ready for production use
   */
  isProductionReady(): boolean {
    return this.startupResults?.is_production_ready || false;
  }

  /**
   * Gets startup health summary
   */
  getStartupHealthSummary(): {
    overall_health: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
    services_status: Record<string, 'SUCCESS' | 'FAILED' | 'DEGRADED'>;
    recommendations: string[];
  } {
    if (!this.startupResults) {
      return {
        overall_health: 'UNHEALTHY',
        services_status: {},
        recommendations: ['Run startup validation first']
      };
    }

    const servicesStatus: Record<string, 'SUCCESS' | 'FAILED' | 'DEGRADED'> = {};
    const recommendations: string[] = [];

    // Map service results to status
    this.serviceResults.forEach(service => {
      if (service.success) {
        servicesStatus[service.service_name] = 'SUCCESS';
      } else if (this.startupResults!.degraded_services.includes(service.service_name)) {
        servicesStatus[service.service_name] = 'DEGRADED';
      } else {
        servicesStatus[service.service_name] = 'FAILED';
      }
    });

    // Determine overall health
    let overallHealth: 'HEALTHY' | 'DEGRADED' | 'UNHEALTHY';
    if (this.startupResults.success && this.startupResults.validation_score >= 90) {
      overallHealth = 'HEALTHY';
    } else if (this.startupResults.success && this.startupResults.validation_score >= 70) {
      overallHealth = 'DEGRADED';
      recommendations.push('Address degraded services for optimal performance');
    } else {
      overallHealth = 'UNHEALTHY';
      recommendations.push('Critical startup issues must be resolved');
    }

    // Add specific recommendations
    if (this.startupResults.services_failed.length > 0) {
      recommendations.push(`Fix failed services: ${this.startupResults.services_failed.join(', ')}`);
    }
    
    if (this.startupResults.startup_time > 15000) {
      recommendations.push('Startup time is slow - consider optimization');
    }

    return {
      overall_health: overallHealth,
      services_status: servicesStatus,
      recommendations
    };
  }

  // Private service initialization methods

  private async initializeCredentialManager(config: StartupConfiguration): Promise<ServiceInitializationResult> {
    const startTime = Date.now();
    const serviceName = 'ProductionCredentialManager';
    
    try {
      console.log(`[STARTUP] Initializing ${serviceName}...`);
      
      const credentials = productionCredentialManager.loadProductionCredentials();
      const validation = productionCredentialManager.validateCredentialFormat(credentials);
      
      if (!validation.is_valid) {
        const error = `Credential validation failed: ${validation.errors.join(', ')}`;
        return {
          service_name: serviceName,
          success: false,
          error,
          initialization_time: Date.now() - startTime,
          critical: config.fail_on_credential_errors
        };
      }
      
      return {
        service_name: serviceName,
        success: true,
        initialization_time: Date.now() - startTime,
        critical: config.fail_on_credential_errors
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown credential error';
      return {
        service_name: serviceName,
        success: false,
        error: errorMessage,
        initialization_time: Date.now() - startTime,
        critical: config.fail_on_credential_errors
      };
    }
  }

  private async initializeEnvironmentValidator(config: StartupConfiguration): Promise<ServiceInitializationResult> {
    const startTime = Date.now();
    const serviceName = 'ProductionEnvironmentValidator';
    
    try {
      console.log(`[STARTUP] Initializing ${serviceName}...`);
      
      const validator = new ProductionEnvironmentValidator();
      const validation = await validator.performCompleteValidation();
      
      if (!validation.is_valid) {
        const error = `Environment validation failed: ${validation.critical_errors.map(e => e.message).join(', ')}`;
        return {
          service_name: serviceName,
          success: false,
          error,
          warning: validation.warnings.length > 0 ? validation.warnings.map(w => w.message).join(', ') : undefined,
          initialization_time: Date.now() - startTime,
          critical: config.fail_on_environment_errors
        };
      }
      
      return {
        service_name: serviceName,
        success: true,
        warning: validation.warnings.length > 0 ? validation.warnings.map(w => w.message).join(', ') : undefined,
        initialization_time: Date.now() - startTime,
        critical: config.fail_on_environment_errors
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown environment error';
      return {
        service_name: serviceName,
        success: false,
        error: errorMessage,
        initialization_time: Date.now() - startTime,
        critical: config.fail_on_environment_errors
      };
    }
  }

  private async initializeConfigurationEnforcer(config: StartupConfiguration): Promise<ServiceInitializationResult> {
    const startTime = Date.now();
    const serviceName = 'ProductionConfigurationEnforcer';
    
    try {
      console.log(`[STARTUP] Initializing ${serviceName}...`);
      
      const result = productionConfigurationEnforcer.enforceProductionSettings();
      
      if (!result.success) {
        const error = `Configuration enforcement failed: ${result.errors.join(', ')}`;
        return {
          service_name: serviceName,
          success: false,
          error,
          warning: result.warnings.length > 0 ? result.warnings.join(', ') : undefined,
          initialization_time: Date.now() - startTime,
          critical: true
        };
      }
      
      return {
        service_name: serviceName,
        success: true,
        warning: result.warnings.length > 0 ? result.warnings.join(', ') : undefined,
        initialization_time: Date.now() - startTime,
        critical: true
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown configuration error';
      return {
        service_name: serviceName,
        success: false,
        error: errorMessage,
        initialization_time: Date.now() - startTime,
        critical: true
      };
    }
  }

  private async initializeSecurityValidator(config: StartupConfiguration): Promise<ServiceInitializationResult> {
    const startTime = Date.now();
    const serviceName = 'ProductionSecurityValidator';
    
    try {
      console.log(`[STARTUP] Initializing ${serviceName}...`);
      
      const validation = productionSecurityValidator.validateProductionSecurity();
      
      if (!validation.is_valid) {
        const error = `Security validation failed: ${validation.errors.join(', ')}`;
        return {
          service_name: serviceName,
          success: false,
          error,
          warning: validation.warnings.length > 0 ? validation.warnings.join(', ') : undefined,
          initialization_time: Date.now() - startTime,
          critical: config.fail_on_security_errors
        };
      }
      
      return {
        service_name: serviceName,
        success: true,
        warning: validation.warnings.length > 0 ? validation.warnings.join(', ') : undefined,
        initialization_time: Date.now() - startTime,
        critical: config.fail_on_security_errors
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown security error';
      return {
        service_name: serviceName,
        success: false,
        error: errorMessage,
        initialization_time: Date.now() - startTime,
        critical: config.fail_on_security_errors
      };
    }
  }

  private async initializeMonitoringSetup(config: StartupConfiguration): Promise<ServiceInitializationResult> {
    const startTime = Date.now();
    const serviceName = 'ProductionMonitoringSetup';
    
    if (!config.enable_monitoring) {
      return {
        service_name: serviceName,
        success: true,
        warning: 'Monitoring disabled by configuration',
        initialization_time: Date.now() - startTime,
        critical: false
      };
    }
    
    try {
      console.log(`[STARTUP] Initializing ${serviceName}...`);
      
      const monitoring = new ProductionMonitoringSetup();
      await monitoring.initializeMonitoring();
      
      return {
        service_name: serviceName,
        success: true,
        initialization_time: Date.now() - startTime,
        critical: false
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown monitoring error';
      return {
        service_name: serviceName,
        success: false,
        error: errorMessage,
        initialization_time: Date.now() - startTime,
        critical: false // Monitoring is not critical for startup
      };
    }
  }

  private async initializeDeploymentValidator(config: StartupConfiguration): Promise<ServiceInitializationResult> {
    const startTime = Date.now();
    const serviceName = 'ProductionDeploymentValidator';
    
    if (!config.enable_deployment_validation) {
      return {
        service_name: serviceName,
        success: true,
        warning: 'Deployment validation disabled by configuration',
        initialization_time: Date.now() - startTime,
        critical: false
      };
    }
    
    try {
      console.log(`[STARTUP] Initializing ${serviceName}...`);
      
      const validator = new ProductionDeploymentValidator();
      const validation = await validator.validateDeploymentReadiness();
      
      if (!validation.is_ready) {
        const warning = `Deployment not fully ready: ${validation.failed_checks.join(', ')}`;
        return {
          service_name: serviceName,
          success: true, // Don't fail startup for deployment readiness
          warning,
          initialization_time: Date.now() - startTime,
          critical: false
        };
      }
      
      return {
        service_name: serviceName,
        success: true,
        initialization_time: Date.now() - startTime,
        critical: false
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown deployment validation error';
      return {
        service_name: serviceName,
        success: false,
        error: errorMessage,
        initialization_time: Date.now() - startTime,
        critical: false // Deployment validation is not critical for startup
      };
    }
  }

  // Utility methods

  private isProductionEnvironment(): boolean {
    return import.meta.env.VITE_NODE_ENV === 'production';
  }

  private async executeWithTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number,
    timeoutMessage: string
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(timeoutMessage));
      }, timeoutMs);

      promise
        .then(resolve)
        .catch(reject)
        .finally(() => clearTimeout(timeout));
    });
  }
}

/**
 * Export singleton instance for easy access
 */
export const productionStartupValidator = ProductionStartupValidator.getInstance();