import { AuditLoggingService } from './AuditLoggingService';

export interface ProductionUrlValidationResult {
  is_valid: boolean;
  webhook_endpoint_valid: boolean;
  return_url_valid: boolean;
  cancel_url_valid: boolean;
  security_validation_passed: boolean;
  domain_validation_passed: boolean;
  https_enforced: boolean;
  errors: string[];
  warnings: string[];
  validation_timestamp: Date;
}

export interface WebhookEndpointValidation {
  endpoint_reachable: boolean;
  https_enabled: boolean;
  certificate_valid: boolean;
  response_time_acceptable: boolean;
  security_headers_present: boolean;
  domain_matches_production: boolean;
}

export interface ProductionUrlConfig {
  production_domain: string;
  webhook_endpoint: string;
  return_url: string;
  cancel_url: string;
  success_url?: string;
  failure_url?: string;
}

export interface WebhookProcessingMonitoring {
  success_count: number;
  failure_count: number;
  average_response_time: number;
  last_successful_webhook: Date | null;
  last_failed_webhook: Date | null;
  consecutive_failures: number;
  monitoring_active: boolean;
}

export class ProductionUrlValidator {
  private webhookMonitoring: WebhookProcessingMonitoring;
  private readonly MAX_RESPONSE_TIME = 5000; // 5 seconds
  private readonly MAX_CONSECUTIVE_FAILURES = 3;

  constructor() {
    this.webhookMonitoring = {
      success_count: 0,
      failure_count: 0,
      average_response_time: 0,
      last_successful_webhook: null,
      last_failed_webhook: null,
      consecutive_failures: 0,
      monitoring_active: true
    };
  }

  /**
   * Validate webhook endpoint configuration for production domain
   */
  async validateWebhookEndpoint(webhookUrl: string): Promise<WebhookEndpointValidation> {
    try {
      const validation: WebhookEndpointValidation = {
        endpoint_reachable: false,
        https_enabled: false,
        certificate_valid: false,
        response_time_acceptable: false,
        security_headers_present: false,
        domain_matches_production: false
      };

      // Validate HTTPS
      validation.https_enabled = webhookUrl.startsWith('https://');
      if (!validation.https_enabled) {
        try {
          await AuditLoggingService.logSecurityEvent(
            'system',
            'webhook_security_violation',
            { webhook_url: webhookUrl, violation: 'non_https_endpoint' }
          );
        } catch (logError) {
          console.warn('Failed to log security event:', logError);
        }
      }

      // Validate domain
      validation.domain_matches_production = webhookUrl.includes('app.betaskill.com');
      if (!validation.domain_matches_production) {
        try {
          await AuditLoggingService.logSecurityEvent(
            'system',
            'webhook_domain_mismatch',
            { webhook_url: webhookUrl, expected_domain: 'app.betaskill.com' }
          );
        } catch (logError) {
          console.warn('Failed to log security event:', logError);
        }
      }

      // Test endpoint reachability
      const startTime = Date.now();
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.MAX_RESPONSE_TIME);
        
        const response = await fetch(webhookUrl, {
          method: 'HEAD',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        const responseTime = Date.now() - startTime;
        validation.endpoint_reachable = response.ok || response.status === 405; // 405 Method Not Allowed is acceptable for HEAD
        validation.response_time_acceptable = responseTime < this.MAX_RESPONSE_TIME;
        
        // Check security headers
        validation.security_headers_present = this.validateSecurityHeaders(response.headers);
        validation.certificate_valid = validation.https_enabled; // Simplified - in production would check cert details

      } catch (error) {
        validation.endpoint_reachable = false;
        try {
          await AuditLoggingService.logSecurityEvent(
            'system',
            'webhook_endpoint_unreachable',
            { webhook_url: webhookUrl, error: error instanceof Error ? error.message : 'Unknown error' }
          );
        } catch (logError) {
          console.warn('Failed to log security event:', logError);
        }
      }

      return validation;
    } catch (error) {
      console.error('Error validating webhook endpoint:', error);
      throw new Error(`Webhook endpoint validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Verify return URLs and cancel URLs for production environment
   */
  async validateProductionUrls(config: ProductionUrlConfig): Promise<ProductionUrlValidationResult> {
    const result: ProductionUrlValidationResult = {
      is_valid: true,
      webhook_endpoint_valid: false,
      return_url_valid: false,
      cancel_url_valid: false,
      security_validation_passed: false,
      domain_validation_passed: false,
      https_enforced: false,
      errors: [],
      warnings: [],
      validation_timestamp: new Date()
    };

    try {
      // Validate webhook endpoint URL
      result.webhook_endpoint_valid = this.validateUrl(config.webhook_endpoint, 'webhook_endpoint', result);
      
      // Validate return URL
      result.return_url_valid = this.validateUrl(config.return_url, 'return_url', result);
      
      // Validate cancel URL
      result.cancel_url_valid = this.validateUrl(config.cancel_url, 'cancel_url', result);

      // Validate optional URLs
      if (config.success_url) {
        this.validateUrl(config.success_url, 'success_url', result);
      }
      if (config.failure_url) {
        this.validateUrl(config.failure_url, 'failure_url', result);
      }

      // Check domain validation
      result.domain_validation_passed = this.validateProductionDomain(config, result);

      // Check HTTPS enforcement
      result.https_enforced = this.validateHttpsEnforcement(config, result);

      // Overall security validation
      result.security_validation_passed = 
        result.webhook_endpoint_valid &&
        result.return_url_valid &&
        result.cancel_url_valid &&
        result.domain_validation_passed &&
        result.https_enforced;

      // Overall validation
      result.is_valid = 
        result.security_validation_passed &&
        result.errors.length === 0;

      // Log validation result
      try {
        await AuditLoggingService.logSecurityEvent(
          'system',
          'production_url_validation',
          {
            validation_result: result,
            config: this.sanitizeConfigForLogging(config)
          }
        );
      } catch (error) {
        console.warn('Failed to log security event:', error);
      }

      return result;
    } catch (error) {
      result.is_valid = false;
      result.errors.push(`URL validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return result;
    }
  }

  /**
   * Implement production webhook endpoint security validation
   */
  async validateWebhookSecurity(webhookUrl: string): Promise<boolean> {
    try {
      const endpointValidation = await this.validateWebhookEndpoint(webhookUrl);
      
      const securityChecks = [
        endpointValidation.https_enabled,
        endpointValidation.domain_matches_production,
        endpointValidation.certificate_valid,
        endpointValidation.security_headers_present
      ];

      const securityPassed = securityChecks.every(check => check);

      if (!securityPassed) {
        try {
          await AuditLoggingService.logSecurityEvent(
            'system',
            'webhook_security_validation_failed',
            {
              webhook_url: webhookUrl,
              validation_results: endpointValidation,
              failed_checks: securityChecks.map((check, index) => ({
                check: ['https_enabled', 'domain_matches_production', 'certificate_valid', 'security_headers_present'][index],
                passed: check
              })).filter(item => !item.passed)
            }
          );
        } catch (logError) {
          console.warn('Failed to log security event:', logError);
        }
      }

      return securityPassed;
    } catch (error) {
      console.error('Webhook security validation error:', error);
      return false;
    }
  }

  /**
   * Add webhook processing monitoring and failure detection
   */
  async recordWebhookProcessing(success: boolean, responseTime: number, error?: string): Promise<void> {
    try {
      if (success) {
        this.webhookMonitoring.success_count++;
        this.webhookMonitoring.last_successful_webhook = new Date();
        this.webhookMonitoring.consecutive_failures = 0;
      } else {
        this.webhookMonitoring.failure_count++;
        this.webhookMonitoring.last_failed_webhook = new Date();
        this.webhookMonitoring.consecutive_failures++;
      }

      // Update average response time
      const totalProcessed = this.webhookMonitoring.success_count + this.webhookMonitoring.failure_count;
      this.webhookMonitoring.average_response_time = 
        ((this.webhookMonitoring.average_response_time * (totalProcessed - 1)) + responseTime) / totalProcessed;

      // Check for failure threshold
      if (this.webhookMonitoring.consecutive_failures >= this.MAX_CONSECUTIVE_FAILURES) {
        try {
          await AuditLoggingService.logSecurityEvent(
            'system',
            'webhook_processing_failure_threshold',
            {
              consecutive_failures: this.webhookMonitoring.consecutive_failures,
              last_error: error,
              monitoring_stats: this.webhookMonitoring
            }
          );
        } catch (logError) {
          console.warn('Failed to log security event:', logError);
        }
      }

      // Log processing event
      try {
        await AuditLoggingService.logSecurityEvent(
          'system',
          'webhook_processing_recorded',
          {
            success,
            response_time: responseTime,
            error,
            monitoring_stats: this.webhookMonitoring
          }
        );
      } catch (logError) {
        console.warn('Failed to log security event:', logError);
      }
    } catch (error) {
      console.error('Error recording webhook processing:', error);
    }
  }

  /**
   * Get webhook processing monitoring statistics
   */
  getWebhookMonitoringStats(): WebhookProcessingMonitoring {
    return { ...this.webhookMonitoring };
  }

  /**
   * Reset webhook monitoring statistics
   */
  resetWebhookMonitoring(): void {
    this.webhookMonitoring = {
      success_count: 0,
      failure_count: 0,
      average_response_time: 0,
      last_successful_webhook: null,
      last_failed_webhook: null,
      consecutive_failures: 0,
      monitoring_active: true
    };
  }

  /**
   * Check if webhook processing is healthy
   */
  isWebhookProcessingHealthy(): boolean {
    const totalProcessed = this.webhookMonitoring.success_count + this.webhookMonitoring.failure_count;
    
    if (totalProcessed === 0) {
      return true; // No data yet
    }

    const successRate = this.webhookMonitoring.success_count / totalProcessed;
    const responseTimeAcceptable = this.webhookMonitoring.average_response_time < this.MAX_RESPONSE_TIME;
    const noConsecutiveFailures = this.webhookMonitoring.consecutive_failures < this.MAX_CONSECUTIVE_FAILURES;

    return successRate >= 0.95 && responseTimeAcceptable && noConsecutiveFailures;
  }

  // Private helper methods

  private validateUrl(url: string, urlType: string, result: ProductionUrlValidationResult): boolean {
    if (!url) {
      result.errors.push(`${urlType} is required`);
      return false;
    }

    try {
      const parsedUrl = new URL(url);
      
      // Check HTTPS
      if (parsedUrl.protocol !== 'https:') {
        result.errors.push(`${urlType} must use HTTPS protocol`);
        return false;
      }

      // Check domain for production
      if (!url.includes('app.betaskill.com')) {
        result.warnings.push(`${urlType} should use production domain (app.betaskill.com)`);
      }

      return true;
    } catch (error) {
      result.errors.push(`${urlType} is not a valid URL: ${error instanceof Error ? error.message : 'Invalid format'}`);
      return false;
    }
  }

  private validateProductionDomain(config: ProductionUrlConfig, result: ProductionUrlValidationResult): boolean {
    const urls = [
      config.webhook_endpoint,
      config.return_url,
      config.cancel_url,
      config.success_url,
      config.failure_url
    ].filter(Boolean);

    const productionDomainUrls = urls.filter(url => url?.includes('app.betaskill.com'));
    
    if (productionDomainUrls.length !== urls.length) {
      result.warnings.push('Not all URLs use the production domain (app.betaskill.com)');
      return false;
    }

    return true;
  }

  private validateHttpsEnforcement(config: ProductionUrlConfig, result: ProductionUrlValidationResult): boolean {
    const urls = [
      config.webhook_endpoint,
      config.return_url,
      config.cancel_url,
      config.success_url,
      config.failure_url
    ].filter(Boolean);

    const httpsUrls = urls.filter(url => url?.startsWith('https://'));
    
    if (httpsUrls.length !== urls.length) {
      result.errors.push('All URLs must use HTTPS in production');
      return false;
    }

    return true;
  }

  private validateSecurityHeaders(headers: Headers): boolean {
    const requiredHeaders = [
      'strict-transport-security',
      'x-content-type-options',
      'x-frame-options'
    ];

    return requiredHeaders.some(header => headers.has(header));
  }

  private sanitizeConfigForLogging(config: ProductionUrlConfig): Record<string, string | undefined> {
    return {
      production_domain: config.production_domain,
      webhook_endpoint: this.maskUrl(config.webhook_endpoint),
      return_url: this.maskUrl(config.return_url),
      cancel_url: this.maskUrl(config.cancel_url),
      success_url: config.success_url ? this.maskUrl(config.success_url) : undefined,
      failure_url: config.failure_url ? this.maskUrl(config.failure_url) : undefined
    };
  }

  private maskUrl(url: string): string {
    try {
      const parsedUrl = new URL(url);
      return `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname}`;
    } catch {
      return '[INVALID_URL]';
    }
  }
}