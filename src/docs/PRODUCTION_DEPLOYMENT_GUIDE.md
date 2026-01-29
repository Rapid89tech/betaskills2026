# Production Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the Ikhokha payment system to production using the validated production credentials and configuration.

## Prerequisites

Before deploying to production, ensure you have:

- Production Ikhokha credentials (API Key, API Secret, Webhook Secret)
- Access to production environment variables
- Deployment access to the production server
- Monitoring and alerting systems configured

## Production Credentials

The following production credentials must be configured:

```bash
VITE_NODE_ENV=production
VITE_IKHOKHA_API_KEY=IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D
VITE_IKHOKHA_API_SECRET=455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS
VITE_IKHOKHA_WEBHOOK_SECRET=455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS
VITE_IKHOKHA_TEST_MODE=false
VITE_IKHOKHA_API_URL=https://api.ikhokha.com
```

## Deployment Process

### Step 1: Pre-Deployment Validation

Run the production deployment validator to ensure all requirements are met:

```bash
node scripts/production-deployment-validator.js
```

This validator checks:
- Environment variables are properly set
- Production credentials are valid
- Security measures are enabled
- Monitoring is configured
- All production services are ready

### Step 2: Environment Configuration

1. **Update Environment Variables**
   ```bash
   # Set production environment variables
   export VITE_NODE_ENV=production
   export VITE_IKHOKHA_API_KEY=IKW31E1I5WP1HT2KIIB2XZMBXJOFDX5D
   export VITE_IKHOKHA_API_SECRET=455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS
   export VITE_IKHOKHA_WEBHOOK_SECRET=455rtQjghdOHzLN3YZ3AQ81H3KEf7OeS
   export VITE_IKHOKHA_TEST_MODE=false
   ```

2. **Validate Configuration**
   ```bash
   # Run environment validation
   npm run validate:production
   ```

### Step 3: Build and Deploy

1. **Build Production Application**
   ```bash
   npm run build
   ```

2. **Run Production Tests**
   ```bash
   npm run test:production
   ```

3. **Deploy to Production**
   ```bash
   npm run deploy:production
   ```

### Step 4: Post-Deployment Validation

After deployment, run comprehensive validation:

```bash
# Validate production deployment
node scripts/verify-deployment.js

# Check production health
npm run health:check

# Verify payment processing
npm run test:payment-flow
```

## Production Validators

The system includes several validators that ensure production readiness:

### ProductionEnvironmentValidator
- Validates NODE_ENV is set to production
- Checks all required environment variables
- Verifies API endpoints are production URLs
- Ensures test mode is disabled

### ProductionCredentialManager
- Loads and validates production credentials
- Ensures no development credentials are used
- Validates credential format and security

### ProductionSecurityValidator
- Enforces HTTPS endpoints
- Validates webhook security
- Checks certificate validity
- Ensures security logging is enabled

### ProductionConfigurationEnforcer
- Disables test mode completely
- Prevents fallback to development credentials
- Enforces production-only settings

## Monitoring and Health Checks

### Production Health Endpoints

The system provides several health check endpoints:

- `/api/health` - Overall system health
- `/api/health/payment` - Payment system health
- `/api/health/webhook` - Webhook processing health
- `/api/health/database` - Database connectivity health

### Monitoring Setup

Production monitoring includes:

1. **Payment Monitoring**
   - Transaction success/failure rates
   - Payment processing latency
   - Enrollment conversion rates

2. **System Health Monitoring**
   - API connectivity
   - Database health
   - Webhook processing
   - Real-time sync status

3. **Error Monitoring**
   - Application errors
   - Payment failures
   - Configuration issues
   - Security violations

### Alerting Configuration

Critical alerts are configured for:

- Payment processing failures (5+ failures in 5 minutes)
- Webhook processing failures (3+ failures in 2 minutes)
- Configuration errors (immediate alert)
- Security violations (immediate alert)

## Security Measures

### Production Security Features

1. **Credential Security**
   - Production credentials are validated for strength
   - Sensitive data is masked in logs
   - No development credentials in production

2. **Webhook Security**
   - Signature validation using production webhook secret
   - Timestamp validation with configurable tolerance
   - Source IP validation
   - Enhanced security logging

3. **HTTPS Enforcement**
   - All API calls use HTTPS
   - Certificate validation
   - Secure webhook endpoints

### Security Monitoring

- Real-time security event logging
- Threat detection and alerting
- Audit trail for all payment operations
- Security violation notifications

## Rollback Procedures

### Rollback Triggers

Initiate rollback if:
- Payment processing failure rate > 10%
- Critical security vulnerabilities detected
- System health checks fail consistently
- Configuration validation errors

### Rollback Process

1. **Immediate Actions**
   ```bash
   # Stop current deployment
   npm run deployment:stop
   
   # Rollback to previous version
   npm run rollback:previous
   
   # Validate rollback
   npm run validate:rollback
   ```

2. **Verification Steps**
   - Verify payment processing is restored
   - Check webhook processing
   - Validate system health
   - Confirm monitoring is active

3. **Post-Rollback Actions**
   - Investigate root cause
   - Update incident documentation
   - Plan corrective measures
   - Schedule re-deployment

## Troubleshooting

### Common Issues

1. **Environment Variable Issues**
   - Check all required variables are set
   - Verify variable values are correct
   - Ensure no extra spaces or characters

2. **Credential Validation Failures**
   - Verify production credentials are correct
   - Check credential format
   - Ensure no development credentials

3. **API Connectivity Issues**
   - Verify production API URL
   - Check network connectivity
   - Validate SSL certificates

4. **Webhook Processing Issues**
   - Verify webhook secret
   - Check webhook endpoint configuration
   - Validate signature processing

### Diagnostic Commands

```bash
# Check environment configuration
npm run diagnose:environment

# Validate credentials
npm run diagnose:credentials

# Test API connectivity
npm run diagnose:api

# Check webhook configuration
npm run diagnose:webhooks

# Run comprehensive diagnostics
npm run diagnose:all
```

## Support and Escalation

### Support Contacts

- **Technical Issues**: [technical-support@company.com]
- **Payment Issues**: [payment-support@company.com]
- **Security Issues**: [security@company.com]
- **Emergency**: [emergency@company.com]

### Escalation Procedures

1. **Level 1**: Development team (response within 1 hour)
2. **Level 2**: Technical lead (response within 30 minutes)
3. **Level 3**: Emergency response team (immediate response)

### Documentation Updates

This guide should be updated whenever:
- Production configuration changes
- New validators are added
- Monitoring requirements change
- Security procedures are updated

---

**Last Updated**: [Current Date]
**Version**: 1.0
**Maintained By**: Production Operations Team