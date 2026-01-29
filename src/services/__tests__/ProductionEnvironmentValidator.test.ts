/**
 * Tests for ProductionEnvironmentValidator Service
 * 
 * Validates comprehensive environment validation for production deployment.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ProductionEnvironmentValidator } from '../ProductionEnvironmentValidator';

// Mock import.meta.env
const mockEnv = {
    VITE_NODE_ENV: 'production',
    VITE_IKHOKHA_API_KEY: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
    VITE_IKHOKHA_API_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
    VITE_IKHOKHA_WEBHOOK_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
    VITE_IKHOKHA_TEST_MODE: 'false',
    VITE_IKHOKHA_API_URL: 'https://api.ikhokha.com',
    VITE_IKHOKHA_TIMEOUT: '45000',
    VITE_IKHOKHA_RETRY_ATTEMPTS: '3',
    VITE_IKHOKHA_RETRY_DELAY: '2000',
    VITE_ENABLE_WEBHOOK_VALIDATION: 'true',
    VITE_REQUIRE_HTTPS: 'true',
    VITE_ENABLE_PAYMENT_LOGGING: 'true',
    VITE_WEBHOOK_ENDPOINT: 'https://example.com/webhook',
    VITE_PRODUCTION_URL: 'https://example.com',
    MODE: 'production'
};

describe('ProductionEnvironmentValidator', () => {
    let validator: ProductionEnvironmentValidator;
    let envProvider: (key: string) => string | undefined;

    beforeEach(() => {
        // Reset mock environment to default valid state
        Object.assign(mockEnv, {
            VITE_NODE_ENV: 'production',
            VITE_IKHOKHA_API_KEY: 'IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D',
            VITE_IKHOKHA_API_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
            VITE_IKHOKHA_WEBHOOK_SECRET: '455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS',
            VITE_IKHOKHA_TEST_MODE: 'false',
            VITE_IKHOKHA_API_URL: 'https://api.ikhokha.com',
            VITE_REQUIRE_HTTPS: 'true',
            VITE_WEBHOOK_ENDPOINT: 'https://example.com/webhook',
            VITE_PRODUCTION_URL: 'https://example.com',
            MODE: 'production'
        });

        envProvider = (key: string) => mockEnv[key as keyof typeof mockEnv];
        validator = new ProductionEnvironmentValidator(envProvider);
    });

    describe('validateNodeEnvironment', () => {
        it('should validate production environment correctly', () => {
            const result = validator.validateNodeEnvironment();

            expect(result.node_env_production).toBe(true);
            expect(result.test_mode_disabled).toBe(true);
            expect(result.production_endpoints).toBe(true);
            expect(result.required_variables_set).toBe(true);
            expect(result.variable_values_valid).toBe(true);
        });

        it('should fail when NODE_ENV is not production', () => {
            mockEnv.VITE_NODE_ENV = 'development';

            const result = validator.validateNodeEnvironment();

            expect(result.node_env_production).toBe(false);
        });

        it('should fail when test mode is enabled', () => {
            mockEnv.VITE_IKHOKHA_TEST_MODE = 'true';

            const result = validator.validateNodeEnvironment();

            expect(result.test_mode_disabled).toBe(false);
        });

        it('should fail when API URL is not production', () => {
            mockEnv.VITE_IKHOKHA_API_URL = 'https://sandbox.ikhokha.com';

            const result = validator.validateNodeEnvironment();

            expect(result.production_endpoints).toBe(false);
        });
    });

    describe('validateProductionMode', () => {
        it('should validate production mode correctly', () => {
            const result = validator.validateProductionMode();

            expect(result.is_production_mode).toBe(true);
            expect(result.test_mode_disabled).toBe(true);
            expect(result.fallback_credentials_disabled).toBe(true);
            expect(result.production_api_configured).toBe(true);
        });

        it('should fail when using wrong API key', () => {
            mockEnv.VITE_IKHOKHA_API_KEY = 'wrong_api_key';

            const result = validator.validateProductionMode();

            expect(result.fallback_credentials_disabled).toBe(false);
            expect(result.production_api_configured).toBe(false);
        });

        it('should fail when using wrong API secret', () => {
            mockEnv.VITE_IKHOKHA_API_SECRET = 'wrong_api_secret';

            const result = validator.validateProductionMode();

            expect(result.fallback_credentials_disabled).toBe(false);
        });
    });

    describe('validateApiEndpoints', () => {
        it('should validate API endpoints correctly', () => {
            const result = validator.validateApiEndpoints();

            expect(result.api_url_valid).toBe(true);
            expect(result.uses_https).toBe(true);
            expect(result.uses_production_domain).toBe(true);
            expect(result.webhook_endpoints_configured).toBe(true);
        });

        it('should fail for invalid API URL', () => {
            mockEnv.VITE_IKHOKHA_API_URL = 'invalid-url';

            const result = validator.validateApiEndpoints();

            expect(result.api_url_valid).toBe(false);
            expect(result.uses_https).toBe(false);
            expect(result.uses_production_domain).toBe(false);
        });

        it('should fail for HTTP API URL', () => {
            mockEnv.VITE_IKHOKHA_API_URL = 'http://api.ikhokha.com';

            const result = validator.validateApiEndpoints();

            expect(result.uses_https).toBe(false);
        });

        it('should fail when webhook endpoints are not configured', () => {
            mockEnv.VITE_WEBHOOK_ENDPOINT = undefined as any;
            mockEnv.VITE_PRODUCTION_URL = undefined as any;

            const result = validator.validateApiEndpoints();

            expect(result.webhook_endpoints_configured).toBe(false);
        });
    });

    describe('validateRequiredVariables', () => {
        it('should validate all required variables are present', () => {
            const result = validator.validateRequiredVariables();

            expect(result.all_required_present).toBe(true);
            expect(result.missing_variables).toHaveLength(0);
        });

        it('should detect missing required variables', () => {
            mockEnv.VITE_IKHOKHA_API_KEY = undefined as any;
            mockEnv.VITE_IKHOKHA_API_SECRET = undefined as any;

            const result = validator.validateRequiredVariables();

            expect(result.all_required_present).toBe(false);
            expect(result.missing_variables).toContain('VITE_IKHOKHA_API_KEY');
            expect(result.missing_variables).toContain('VITE_IKHOKHA_API_SECRET');
        });

        it('should track optional variables status', () => {
            const result = validator.validateRequiredVariables();

            expect(result.optional_variables_status.VITE_IKHOKHA_TIMEOUT).toBe(true);
            expect(result.optional_variables_status.VITE_IKHOKHA_RETRY_ATTEMPTS).toBe(true);
        });
    });

    describe('validateVariableValues', () => {
        it('should validate variable values correctly', () => {
            const result = validator.validateVariableValues();

            expect(result.api_key_format_valid).toBe(true);
            expect(result.api_secret_format_valid).toBe(true);
            expect(result.webhook_secret_format_valid).toBe(true);
            expect(result.timeout_values_valid).toBe(true);
            expect(result.retry_values_valid).toBe(true);
        });

        it('should fail for invalid API key format', () => {
            mockEnv.VITE_IKHOKHA_API_KEY = 'invalid_key';

            const result = validator.validateVariableValues();

            expect(result.api_key_format_valid).toBe(false);
        });

        it('should fail for invalid timeout value', () => {
            mockEnv.VITE_IKHOKHA_TIMEOUT = '10000'; // Too low

            const result = validator.validateVariableValues();

            expect(result.timeout_values_valid).toBe(false);
        });

        it('should fail for invalid retry attempts', () => {
            mockEnv.VITE_IKHOKHA_RETRY_ATTEMPTS = '20'; // Too high

            const result = validator.validateVariableValues();

            expect(result.retry_values_valid).toBe(false);
        });
    });

    describe('validateSecuritySettings', () => {
        it('should validate security settings correctly', () => {
            const result = validator.validateSecuritySettings();

            expect(result.https_enforced).toBe(true);
            expect(result.webhook_validation_enabled).toBe(true);
            expect(result.security_logging_enabled).toBe(true);
            expect(result.certificates_valid).toBe(true);
            expect(result.no_security_vulnerabilities).toBe(true);
        });

        it('should fail when HTTPS is not enforced', () => {
            mockEnv.VITE_REQUIRE_HTTPS = 'false';

            const result = validator.validateSecuritySettings();

            expect(result.https_enforced).toBe(false);
        });

        it('should fail when webhook validation is disabled', () => {
            mockEnv.VITE_ENABLE_WEBHOOK_VALIDATION = 'false';

            const result = validator.validateSecuritySettings();

            expect(result.webhook_validation_enabled).toBe(false);
        });

        it('should detect security vulnerabilities', () => {
            mockEnv.VITE_IKHOKHA_API_KEY = 'short'; // Too short
            mockEnv.VITE_IKHOKHA_API_URL = 'http://api.ikhokha.com'; // Not HTTPS

            const result = validator.validateSecuritySettings();

            expect(result.no_security_vulnerabilities).toBe(false);
        });
    });

    describe('performCompleteValidation', () => {
        it('should perform complete validation successfully', async () => {
            const result = await validator.performCompleteValidation();

            expect(result.is_valid).toBe(true);
            expect(result.is_production_ready).toBe(true);
            expect(result.critical_errors).toHaveLength(0);
            expect(result.warnings).toHaveLength(0);
        });

        it('should detect critical errors', async () => {
            mockEnv.VITE_NODE_ENV = 'development';
            mockEnv.VITE_IKHOKHA_TEST_MODE = 'true';

            const result = await validator.performCompleteValidation();

            expect(result.is_valid).toBe(false);
            expect(result.is_production_ready).toBe(false);
            expect(result.critical_errors.length).toBeGreaterThan(0);

            const nodeEnvError = result.critical_errors.find(e => e.code === 'NODE_ENV_NOT_PRODUCTION');
            expect(nodeEnvError).toBeDefined();

            const testModeError = result.critical_errors.find(e => e.code === 'TEST_MODE_ENABLED');
            expect(testModeError).toBeDefined();
        });

        it('should detect missing required variables', async () => {
            mockEnv.VITE_IKHOKHA_API_KEY = undefined as any;
            mockEnv.VITE_IKHOKHA_API_SECRET = undefined as any;

            const result = await validator.performCompleteValidation();

            expect(result.is_valid).toBe(false);

            const missingVarsError = result.critical_errors.find(e => e.code === 'MISSING_REQUIRED_VARIABLES');
            expect(missingVarsError).toBeDefined();
            expect(missingVarsError?.message).toContain('VITE_IKHOKHA_API_KEY');
            expect(missingVarsError?.message).toContain('VITE_IKHOKHA_API_SECRET');
        });

        it('should detect HTTPS enforcement issues', async () => {
            mockEnv.VITE_IKHOKHA_API_URL = 'http://api.ikhokha.com';

            const result = await validator.performCompleteValidation();

            expect(result.is_valid).toBe(false);

            const httpsError = result.critical_errors.find(e => e.code === 'HTTPS_NOT_ENFORCED');
            expect(httpsError).toBeDefined();
        });

        it('should generate warnings for missing webhook configuration', async () => {
            mockEnv.VITE_WEBHOOK_ENDPOINT = undefined as any;

            const result = await validator.performCompleteValidation();

            const webhookWarning = result.warnings.find(w => w.code === 'WEBHOOK_ENDPOINTS_NOT_CONFIGURED');
            expect(webhookWarning).toBeDefined();
        });

        it('should generate security recommendations', async () => {
            mockEnv.VITE_ENABLE_PAYMENT_LOGGING = 'false';

            const result = await validator.performCompleteValidation();

            const securityRec = result.recommendations.find(r => r.code === 'ENABLE_SECURITY_LOGGING');
            expect(securityRec).toBeDefined();
            expect(securityRec?.priority).toBe('medium');
        });
    });

    describe('generateValidationReport', () => {
        it('should generate comprehensive validation report', async () => {
            const report = await validator.generateValidationReport();

            expect(report.validation_id).toMatch(/^prod-env-val-\d+-[a-z0-9]+$/);
            expect(report.timestamp).toBeInstanceOf(Date);
            expect(report.environment_info).toBeDefined();
            expect(report.validation_results).toBeDefined();
            expect(report.deployment_readiness).toBe(true);
            expect(report.next_steps).toBeDefined();
            expect(report.summary).toBeDefined();
        });

        it('should calculate summary statistics correctly', async () => {
            const report = await validator.generateValidationReport();

            expect(report.summary.total_checks).toBe(20);
            expect(report.summary.passed_checks).toBeGreaterThan(0);
            expect(report.summary.failed_checks).toBeGreaterThanOrEqual(0);
            expect(report.summary.warnings_count).toBeGreaterThanOrEqual(0);
            expect(report.summary.critical_errors_count).toBeGreaterThanOrEqual(0);

            // The sum should equal total checks
            expect(report.summary.passed_checks + report.summary.failed_checks).toBe(report.summary.total_checks);
        });

        it('should provide next steps when errors exist', async () => {
            mockEnv.VITE_NODE_ENV = 'development';

            const report = await validator.generateValidationReport();

            expect(report.deployment_readiness).toBe(false);
            expect(report.next_steps).toContain('Fix all critical errors before proceeding with deployment');
            expect(report.summary.critical_errors_count).toBeGreaterThan(0);
        });

        it('should include environment information', async () => {
            const report = await validator.generateValidationReport();

            expect(report.environment_info.timestamp).toBeInstanceOf(Date);
            expect(report.environment_info.build_environment).toBe('production');
        });

        it('should indicate production readiness when all checks pass', async () => {
            const report = await validator.generateValidationReport();

            expect(report.deployment_readiness).toBe(true);
            expect(report.next_steps).toContain('Environment is production-ready');
            expect(report.next_steps).toContain('Proceed with deployment validation');
        });
    });

    describe('Edge Cases', () => {
        it('should handle missing environment variables gracefully', async () => {
            // Clear all environment variables
            Object.keys(mockEnv).forEach(key => {
                delete mockEnv[key as keyof typeof mockEnv];
            });

            const result = await validator.performCompleteValidation();

            expect(result.is_valid).toBe(false);
            expect(result.critical_errors.length).toBeGreaterThan(0);
        });

        it('should handle empty string environment variables', () => {
            mockEnv.VITE_IKHOKHA_API_KEY = '';
            mockEnv.VITE_IKHOKHA_API_SECRET = '';

            const result = validator.validateRequiredVariables();

            expect(result.all_required_present).toBe(false);
            expect(result.missing_variables).toContain('VITE_IKHOKHA_API_KEY');
            expect(result.missing_variables).toContain('VITE_IKHOKHA_API_SECRET');
        });

        it('should handle whitespace-only environment variables', () => {
            mockEnv.VITE_IKHOKHA_API_KEY = '   ';
            mockEnv.VITE_IKHOKHA_API_SECRET = '\t\n';

            const result = validator.validateRequiredVariables();

            expect(result.all_required_present).toBe(false);
        });

        it('should validate timeout edge cases', () => {
            // Test minimum valid timeout
            mockEnv.VITE_IKHOKHA_TIMEOUT = '30000';
            let result = validator.validateVariableValues();
            expect(result.timeout_values_valid).toBe(true);

            // Test maximum valid timeout
            mockEnv.VITE_IKHOKHA_TIMEOUT = '120000';
            result = validator.validateVariableValues();
            expect(result.timeout_values_valid).toBe(true);

            // Test invalid timeout (too low)
            mockEnv.VITE_IKHOKHA_TIMEOUT = '29999';
            result = validator.validateVariableValues();
            expect(result.timeout_values_valid).toBe(false);

            // Test invalid timeout (too high)
            mockEnv.VITE_IKHOKHA_TIMEOUT = '120001';
            result = validator.validateVariableValues();
            expect(result.timeout_values_valid).toBe(false);
        });

        it('should validate retry attempts edge cases', () => {
            // Test minimum valid retry attempts
            mockEnv.VITE_IKHOKHA_RETRY_ATTEMPTS = '1';
            let result = validator.validateVariableValues();
            expect(result.retry_values_valid).toBe(true);

            // Test maximum valid retry attempts
            mockEnv.VITE_IKHOKHA_RETRY_ATTEMPTS = '10';
            result = validator.validateVariableValues();
            expect(result.retry_values_valid).toBe(true);

            // Test invalid retry attempts (too low)
            mockEnv.VITE_IKHOKHA_RETRY_ATTEMPTS = '0';
            result = validator.validateVariableValues();
            expect(result.retry_values_valid).toBe(false);

            // Test invalid retry attempts (too high)
            mockEnv.VITE_IKHOKHA_RETRY_ATTEMPTS = '11';
            result = validator.validateVariableValues();
            expect(result.retry_values_valid).toBe(false);
        });
    });
});