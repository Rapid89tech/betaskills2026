# Production Webhook Implementation

This document describes the complete implementation of production webhooks for the Beta Skill application, including setup, configuration, security, and monitoring.

## Overview

The webhook system handles real-time payment notifications from Ikhokha payment gateway, automatically activating course enrollments upon successful payment completion.

## Architecture

```
Ikhokha Payment Gateway
         ↓
    HTTPS Webhook
         ↓
Netlify Function (/.netlify/functions/ikhokha-webhook)
         ↓
    Security Validation
         ↓
    Payment Processing
         ↓
    Enrollment Activation
         ↓
    Real-time Updates
```

## Components

### 1. Webhook Configuration (`src/config/webhookConfig.ts`)
- Production webhook endpoint configuration
- Security settings and validation rules
- Retry and timeout configurations
- Environment-specific settings

### 2. Webhook Registration Service (`src/services/WebhookRegistrationService.ts`)
- Registers webhook endpoints with Ikhokha
- Manages webhook lifecycle (create, update, delete)
- Handles webhook endpoint testing

### 3. Production Webhook Service (`src/services/ProductionWebhookService.ts`)
- Production-specific webhook processing
- Security validation and signature verification
- Enrollment activation configuration

### 4. Webhook Validation (`src/utils/webhookValidator.ts`)
- Comprehensive webhook data validation
- Security checks and rate limiting
- Signature and timestamp validation

### 5. Netlify Function (`netlify/functions/ikhokha-webhook.ts`)
- Main webhook endpoint handler
- Processes incoming webhook notifications
- Activates enrollments and sends notifications

### 6. Monitoring Service (`src/services/WebhookMonitoringService.ts`)
- Tracks webhook processing metrics
- Monitors success rates and response times
- Provides health status and alerts

## Setup Instructions

### 1. Environment Configuration

Set the following environment variables for production:

```bash
# Production Ikhokha Configuration
VITE_IKHOKHA_API_URL=https://api.ikhokha.com
VITE_IKHOKHA_API_KEY=your_production_api_key
VITE_IKHOKHA_API_SECRET=your_production_api_secret
VITE_IKHOKHA_WEBHOOK_SECRET=your_production_webhook_secret
VITE_IKHOKHA_TEST_MODE=false

# Production URLs
VITE_PRODUCTION_URL=https://app.betaskill.com
VITE_APP_URL=https://app.betaskill.com

# Environment
VITE_NODE_ENV=production
```

### 2. Webhook Setup Commands

```bash
# Set up production webhooks
npm run webhook:setup

# Validate webhook configuration
npm run webhook:validate

# Test webhook processing
npm run webhook:test

# List registered webhooks
npm run webhook:list

# Run comprehensive validation
npm run webhook:validate-setup
```

### 3. Manual Setup Process

1. **Configure Environment Variables**
   ```bash
   # Ensure all production environment variables are set
   npm run config:check
   ```

2. **Validate Production Setup**
   ```bash
   # Check production readiness
   npm run webhook:validate
   ```

3. **Register Webhook with Ikhokha**
   ```bash
   # Register webhook endpoint
   npm run webhook:setup
   ```

4. **Test Webhook Processing**
   ```bash
   # Test webhook functionality
   npm run webhook:test
   ```

## Security Features

### 1. Signature Validation
- HMAC-SHA256 signature verification
- Prevents unauthorized webhook calls
- Mandatory in production environment

### 2. Timestamp Validation
- Prevents replay attacks
- 5-minute tolerance window
- Rejects old or future-dated requests

### 3. Rate Limiting
- Prevents abuse and DoS attacks
- IP-based rate limiting
- Configurable limits per environment

### 4. Data Validation
- Comprehensive input validation
- SQL injection prevention
- XSS protection

### 5. HTTPS Enforcement
- All webhook endpoints use HTTPS
- SSL certificate validation
- Secure data transmission

## Webhook Processing Flow

### 1. Incoming Webhook
```typescript
POST /.netlify/functions/ikhokha-webhook
Content-Type: application/json
X-Ikhokha-Signature: sha256=...

{
  "transaction_id": "txn_12345",
  "reference": "enrollment_ref_67890",
  "amount": 500,
  "currency": "ZAR",
  "status": "completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "signature": "sha256=...",
  "response_code": "00",
  "response_message": "Success"
}
```

### 2. Security Validation
- Verify webhook signature
- Validate timestamp
- Check rate limits
- Validate data structure

### 3. Payment Processing
- Find enrollment by reference
- Update payment status
- Log transaction details
- Handle payment failures

### 4. Enrollment Activation
- Auto-approve successful payments
- Grant course access
- Send notifications
- Log activation events

### 5. Real-time Updates
- Broadcast status changes
- Update connected clients
- Trigger UI refreshes

## Error Handling

### 1. Webhook Validation Errors
```typescript
{
  "error": "Security validation failed",
  "message": "Invalid webhook signature",
  "violations": ["Invalid webhook signature"]
}
```

### 2. Processing Errors
```typescript
{
  "error": "Internal server error",
  "message": "Failed to process webhook",
  "details": "Enrollment not found"
}
```

### 3. Retry Logic
- Automatic retries for transient failures
- Exponential backoff strategy
- Maximum retry attempts: 5
- Retry delay: 2 seconds (production)

## Monitoring and Alerting

### 1. Webhook Metrics
- Total processed webhooks
- Success/failure rates
- Average response times
- Common error patterns

### 2. Health Monitoring
```typescript
const healthStatus = await webhookMonitoringService.getWebhookHealthStatus();

// Returns:
{
  status: 'healthy' | 'warning' | 'critical',
  issues: string[],
  recommendations: string[],
  metrics: WebhookMetrics
}
```

### 3. Alerting Thresholds
- Success rate < 95%: Warning
- Success rate < 80%: Critical
- Response time > 5s: Warning
- Response time > 10s: Critical
- No webhooks in 24h: Warning

## Testing

### 1. Unit Tests
```bash
# Run webhook service tests
npm test -- src/services/__tests__/ProductionWebhookService.test.ts
npm test -- src/utils/__tests__/webhookValidator.test.ts
```

### 2. Integration Tests
```bash
# Test webhook endpoint
npm run webhook:test

# Comprehensive testing
npm run webhook:validate-setup
```

### 3. Load Testing
```typescript
import { performWebhookLoadTest } from '../utils/webhookTester';

const result = await performWebhookLoadTest(webhookUrl, {
  concurrentRequests: 10,
  totalRequests: 100,
  requestDelay: 100
});
```

### 4. Security Testing
```typescript
import { performWebhookSecurityTest } from '../utils/webhookTester';

const securityResult = await performWebhookSecurityTest(webhookUrl);
console.log('Security Score:', securityResult.securityScore);
```

## Troubleshooting

### 1. Webhook Not Receiving Requests
- Check webhook URL configuration
- Verify Ikhokha webhook registration
- Test endpoint connectivity
- Check firewall/proxy settings

### 2. Signature Validation Failures
- Verify webhook secret configuration
- Check signature generation algorithm
- Ensure consistent payload formatting
- Validate timestamp synchronization

### 3. Processing Failures
- Check database connectivity
- Verify enrollment data structure
- Review error logs
- Test with sample data

### 4. Performance Issues
- Monitor response times
- Check database query performance
- Review concurrent request handling
- Optimize webhook processing logic

## Production Deployment

### 1. Pre-deployment Checklist
- [ ] Environment variables configured
- [ ] Webhook secret generated and secured
- [ ] SSL certificate valid
- [ ] Database migrations applied
- [ ] Monitoring configured

### 2. Deployment Steps
1. Deploy application to production
2. Configure environment variables
3. Register webhook with Ikhokha
4. Test webhook processing
5. Monitor initial webhook traffic

### 3. Post-deployment Validation
```bash
# Validate production setup
npm run webhook:validate

# Test webhook processing
npm run webhook:test

# Monitor webhook health
npm run webhook:validate-setup
```

## Maintenance

### 1. Regular Tasks
- Monitor webhook success rates
- Review error logs weekly
- Update webhook secrets quarterly
- Test webhook processing monthly

### 2. Performance Optimization
- Monitor response times
- Optimize database queries
- Review concurrent processing
- Update retry configurations

### 3. Security Updates
- Rotate webhook secrets regularly
- Update signature validation
- Review rate limiting rules
- Monitor security alerts

## API Reference

### Webhook Endpoint
```
POST /.netlify/functions/ikhokha-webhook
```

### Required Headers
```
Content-Type: application/json
X-Ikhokha-Signature: sha256=<signature>
```

### Webhook Payload
```typescript
interface IkhokhaWebhook {
  transaction_id: string;
  reference: string;
  amount: number;
  currency: string;
  status: 'completed' | 'failed' | 'cancelled';
  timestamp: string;
  signature: string;
  response_code: string;
  response_message: string;
  auth_code?: string;
  card_type?: string;
  masked_card_number?: string;
  merchant_reference?: string;
  metadata?: Record<string, any>;
}
```

### Response Format
```typescript
interface WebhookResponse {
  success: boolean;
  message: string;
  result?: {
    processed: boolean;
    payment_updated: boolean;
    enrollment_updated: boolean;
    error?: string;
  };
}
```

## Support

For webhook-related issues:

1. Check the monitoring dashboard
2. Review webhook processing logs
3. Run diagnostic commands
4. Contact technical support with:
   - Webhook transaction ID
   - Error messages
   - Timestamp of issue
   - Diagnostic report output

## Changelog

### Version 1.0.0 (Current)
- Initial production webhook implementation
- Security validation and signature verification
- Automatic enrollment activation
- Comprehensive monitoring and alerting
- Load testing and security testing utilities
- Production deployment scripts