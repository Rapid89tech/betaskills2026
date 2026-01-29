import { productionSecurityService } from '@/services/ProductionSecurityService';

export interface SecurityConfigValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
  recommendations: string[];
  complianceStatus: {
    pci: boolean;
    gdpr: boolean;
    security: boolean;
  };
}

export interface EnvironmentSecurityCheck {
  name: string;
  required: boolean;
  present: boolean;
  valid: boolean;
  message?: string;
}

export class SecurityConfigValidator {
  /**
   * Validate complete security configuration for production deployment
   */
  static async validateProductionSecurity(): Promise<SecurityConfigValidation> {
    const validation: SecurityConfigValidation = {
      valid: false,
      errors: [],
      warnings: [],
      recommendations: [],
      complianceStatus: {
        pci: false,
        gdpr: false,
        security: false
      }
    };

    try {
      // 1. Validate environment variables
      const envValidation = this.validateEnvironmentVariables();
      validation.errors.push(...envValidation.filter(check => check.required && !check.valid).map(check => check.message || `Missing required: ${check.name}`));
      validation.warnings.push(...envValidation.filter(check => !check.required && !check.valid).map(check => check.message || `Missing optional: ${check.name}`));

      // 2. Validate API key configuration
      const apiKeyValidation = await this.validateApiKeyConfiguration();
      if (!apiKeyValidation.valid) {
        validation.errors.push(...apiKeyValidation.errors);
      }

      // 3. Validate webhook security
      const webhookValidation = this.validateWebhookSecurity();
      if (!webhookValidation.valid) {
        validation.errors.push(...webhookValidation.errors);
      }

      // 4. Validate encryption configuration
      const encryptionValidation = this.validateEncryptionConfiguration();
      if (!encryptionValidation.valid) {
        validation.errors.push(...encryptionValidation.errors);
      }

      // 5. Validate SSL/TLS configuration
      const sslValidation = this.validateSSLConfiguration();
      if (!sslValidation.valid) {
        validation.errors.push(...sslValidation.errors);
      }

      // 6. Validate database security
      const dbValidation = this.validateDatabaseSecurity();
      if (!dbValidation.valid) {
        validation.errors.push(...dbValidation.errors);
      }

      // 7. Check PCI DSS compliance
      const pciCompliance = await productionSecurityService.validatePCICompliance();
      validation.complianceStatus.pci = pciCompliance.compliant;
      if (!pciCompliance.compliant) {
        validation.errors.push(...pciCompliance.violations);
      }

      // 8. Validate monitoring and logging
      const monitoringValidation = this.validateMonitoringConfiguration();
      if (!monitoringValidation.valid) {
        validation.warnings.push(...monitoringValidation.errors);
      }

      // 9. Generate security recommendations
      validation.recommendations = this.generateSecurityRecommendations(validation);

      // Overall validation
      validation.valid = validation.errors.length === 0;
      validation.complianceStatus.security = validation.valid;
      validation.complianceStatus.gdpr = this.validateGDPRCompliance();

      return validation;

    } catch (error) {
      validation.errors.push(`Security validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return validation;
    }
  }

  /**
   * Validate environment variables for security
   */
  private static validateEnvironmentVariables(): EnvironmentSecurityCheck[] {
    const checks: EnvironmentSecurityCheck[] = [
      // Required security variables
      {
        name: 'IKHOKHA_API_KEY',
        required: true,
        present: !!process.env.IKHOKHA_API_KEY,
        valid: !!process.env.IKHOKHA_API_KEY && process.env.IKHOKHA_API_KEY.length >= 32,
        message: 'iKhokha API key must be at least 32 characters'
      },
      {
        name: 'IKHOKHA_WEBHOOK_SECRET',
        required: true,
        present: !!process.env.IKHOKHA_WEBHOOK_SECRET,
        valid: !!process.env.IKHOKHA_WEBHOOK_SECRET && process.env.IKHOKHA_WEBHOOK_SECRET.length >= 32,
        message: 'Webhook secret must be at least 32 characters'
      },
      {
        name: 'ENCRYPTION_KEY',
        required: true,
        present: !!process.env.ENCRYPTION_KEY,
        valid: !!process.env.ENCRYPTION_KEY && process.env.ENCRYPTION_KEY.length >= 32,
        message: 'Encryption key must be at least 32 characters'
      },
      {
        name: 'DATABASE_URL',
        required: true,
        present: !!process.env.DATABASE_URL,
        valid: !!process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql://'),
        message: 'Database URL must be a valid PostgreSQL connection string'
      },
      {
        name: 'NODE_ENV',
        required: true,
        present: !!process.env.NODE_ENV,
        valid: process.env.NODE_ENV === 'production',
        message: 'NODE_ENV must be set to "production"'
      },
      
      // SSL/TLS configuration
      {
        name: 'SSL_ENABLED',
        required: true,
        present: !!process.env.SSL_ENABLED,
        valid: process.env.SSL_ENABLED === 'true',
        message: 'SSL must be enabled in production'
      },
      {
        name: 'HTTPS_ONLY',
        required: true,
        present: !!process.env.HTTPS_ONLY,
        valid: process.env.HTTPS_ONLY === 'true',
        message: 'HTTPS-only mode must be enabled'
      },

      // Security headers
      {
        name: 'SECURITY_HEADERS_ENABLED',
        required: false,
        present: !!process.env.SECURITY_HEADERS_ENABLED,
        valid: process.env.SECURITY_HEADERS_ENABLED === 'true'
      },
      {
        name: 'CORS_ORIGIN',
        required: true,
        present: !!process.env.CORS_ORIGIN,
        valid: !!process.env.CORS_ORIGIN && !process.env.CORS_ORIGIN.includes('*'),
        message: 'CORS origin must be explicitly set (no wildcards)'
      },

      // Rate limiting
      {
        name: 'RATE_LIMIT_ENABLED',
        required: false,
        present: !!process.env.RATE_LIMIT_ENABLED,
        valid: process.env.RATE_LIMIT_ENABLED === 'true'
      },

      // Monitoring
      {
        name: 'ERROR_TRACKING_ENABLED',
        required: false,
        present: !!process.env.ERROR_TRACKING_ENABLED,
        valid: process.env.ERROR_TRACKING_ENABLED === 'true'
      },
      {
        name: 'AUDIT_LOGGING_ENABLED',
        required: false,
        present: !!process.env.AUDIT_LOGGING_ENABLED,
        valid: process.env.AUDIT_LOGGING_ENABLED === 'true'
      }
    ];

    return checks;
  }

  /**
   * Validate API key configuration
   */
  private static async validateApiKeyConfiguration(): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    try {
      // Check if test mode is disabled
      if (process.env.IKHOKHA_TEST_MODE === 'true') {
        errors.push('Test mode must be disabled in production');
      }

      // Validate API endpoint
      const apiUrl = process.env.IKHOKHA_API_URL;
      if (!apiUrl || !apiUrl.startsWith('https://')) {
        errors.push('API URL must use HTTPS in production');
      }

      // Check API key format
      const apiKey = process.env.IKHOKHA_API_KEY;
      if (apiKey) {
        if (apiKey.includes('test') || apiKey.includes('sandbox')) {
          errors.push('Production API key appears to be a test key');
        }
      }

      return { valid: errors.length === 0, errors };

    } catch (error) {
      errors.push(`API key validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return { valid: false, errors };
    }
  }

  /**
   * Validate webhook security configuration
   */
  private static validateWebhookSecurity(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check webhook secret strength
    const webhookSecret = process.env.IKHOKHA_WEBHOOK_SECRET;
    if (!webhookSecret) {
      errors.push('Webhook secret is required');
    } else {
      if (webhookSecret.length < 32) {
        errors.push('Webhook secret must be at least 32 characters');
      }
      if (!/^[A-Za-z0-9+/=]+$/.test(webhookSecret)) {
        errors.push('Webhook secret should be base64 encoded');
      }
    }

    // Check webhook endpoint security
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl && !webhookUrl.startsWith('https://')) {
      errors.push('Webhook URL must use HTTPS');
    }

    // Check allowed IPs configuration
    const allowedIPs = process.env.IKHOKHA_ALLOWED_IPS;
    if (!allowedIPs) {
      errors.push('Webhook IP whitelist should be configured');
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate encryption configuration
   */
  private static validateEncryptionConfiguration(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check encryption key
    const encryptionKey = process.env.ENCRYPTION_KEY;
    if (!encryptionKey) {
      errors.push('Encryption key is required');
    } else {
      if (encryptionKey.length < 32) {
        errors.push('Encryption key must be at least 32 characters');
      }
    }

    // Check encryption algorithm
    const algorithm = process.env.ENCRYPTION_ALGORITHM || 'aes-256-gcm';
    const supportedAlgorithms = ['aes-256-gcm', 'aes-256-cbc'];
    if (!supportedAlgorithms.includes(algorithm)) {
      errors.push(`Unsupported encryption algorithm: ${algorithm}`);
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate SSL/TLS configuration
   */
  private static validateSSLConfiguration(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check SSL enforcement
    if (process.env.SSL_ENABLED !== 'true') {
      errors.push('SSL must be enabled in production');
    }

    // Check HTTPS enforcement
    if (process.env.HTTPS_ONLY !== 'true') {
      errors.push('HTTPS-only mode must be enabled');
    }

    // Check HSTS configuration
    if (process.env.HSTS_ENABLED !== 'true') {
      errors.push('HSTS should be enabled for security');
    }

    // Check certificate configuration
    const certPath = process.env.SSL_CERT_PATH;
    const keyPath = process.env.SSL_KEY_PATH;
    if (certPath && keyPath) {
      // In a real implementation, you would validate certificate files
      // For now, just check they are specified
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate database security configuration
   */
  private static validateDatabaseSecurity(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    const dbUrl = process.env.DATABASE_URL;
    if (dbUrl) {
      // Check SSL requirement
      if (!dbUrl.includes('sslmode=require')) {
        errors.push('Database connection must require SSL');
      }

      // Check for password in URL (security risk)
      if (dbUrl.includes('password=') && !dbUrl.includes('localhost')) {
        errors.push('Database password should not be in connection string for production');
      }
    }

    // Check connection pooling
    const maxConnections = process.env.DB_MAX_CONNECTIONS;
    if (!maxConnections || parseInt(maxConnections) > 100) {
      errors.push('Database connection pool should be limited (recommended: 20-50)');
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate monitoring and logging configuration
   */
  private static validateMonitoringConfiguration(): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check error tracking
    if (process.env.ERROR_TRACKING_ENABLED !== 'true') {
      errors.push('Error tracking should be enabled in production');
    }

    // Check audit logging
    if (process.env.AUDIT_LOGGING_ENABLED !== 'true') {
      errors.push('Audit logging should be enabled for compliance');
    }

    // Check performance monitoring
    if (process.env.PERFORMANCE_MONITORING_ENABLED !== 'true') {
      errors.push('Performance monitoring should be enabled');
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Validate GDPR compliance
   */
  private static validateGDPRCompliance(): boolean {
    // Check data protection measures
    const dataProtectionEnabled = process.env.DATA_PROTECTION_ENABLED === 'true';
    const cookieConsentEnabled = process.env.COOKIE_CONSENT_ENABLED === 'true';
    const dataRetentionConfigured = !!process.env.DATA_RETENTION_DAYS;

    return dataProtectionEnabled && cookieConsentEnabled && dataRetentionConfigured;
  }

  /**
   * Generate security recommendations
   */
  private static generateSecurityRecommendations(validation: SecurityConfigValidation): string[] {
    const recommendations: string[] = [];

    if (validation.errors.length > 0) {
      recommendations.push('Fix all security errors before deploying to production');
    }

    if (validation.warnings.length > 0) {
      recommendations.push('Address security warnings to improve overall security posture');
    }

    if (!validation.complianceStatus.pci) {
      recommendations.push('Implement PCI DSS compliance measures for payment processing');
    }

    if (!validation.complianceStatus.gdpr) {
      recommendations.push('Implement GDPR compliance measures for data protection');
    }

    // Additional recommendations
    recommendations.push('Regularly rotate API keys and secrets');
    recommendations.push('Monitor security events and set up alerting');
    recommendations.push('Conduct regular security audits and penetration testing');
    recommendations.push('Keep all dependencies updated to latest secure versions');
    recommendations.push('Implement Web Application Firewall (WAF) for additional protection');

    return recommendations;
  }

  /**
   * Generate security report
   */
  static async generateSecurityReport(): Promise<string> {
    const validation = await this.validateProductionSecurity();
    
    let report = '# Production Security Validation Report\n\n';
    report += `Generated: ${new Date().toISOString()}\n\n`;

    // Overall status
    report += `## Overall Status: ${validation.valid ? '✅ PASS' : '❌ FAIL'}\n\n`;

    // Compliance status
    report += '## Compliance Status\n';
    report += `- PCI DSS: ${validation.complianceStatus.pci ? '✅' : '❌'}\n`;
    report += `- GDPR: ${validation.complianceStatus.gdpr ? '✅' : '❌'}\n`;
    report += `- Security: ${validation.complianceStatus.security ? '✅' : '❌'}\n\n`;

    // Errors
    if (validation.errors.length > 0) {
      report += '## ❌ Critical Issues\n';
      validation.errors.forEach(error => {
        report += `- ${error}\n`;
      });
      report += '\n';
    }

    // Warnings
    if (validation.warnings.length > 0) {
      report += '## ⚠️ Warnings\n';
      validation.warnings.forEach(warning => {
        report += `- ${warning}\n`;
      });
      report += '\n';
    }

    // Recommendations
    if (validation.recommendations.length > 0) {
      report += '## 💡 Recommendations\n';
      validation.recommendations.forEach(recommendation => {
        report += `- ${recommendation}\n`;
      });
      report += '\n';
    }

    return report;
  }
}

export default SecurityConfigValidator;