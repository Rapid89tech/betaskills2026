# Monitoring and Logging System Implementation

## Overview

This document describes the comprehensive monitoring and logging system implemented for the Beta Skill application. The system provides real-time monitoring, error tracking, and performance metrics collection to ensure system health and facilitate debugging.

## Architecture

### Core Components

1. **MonitoringService** - Central logging and monitoring service
2. **PaymentLoggingService** - Specialized payment event logging
3. **PerformanceMonitoring** - Performance metrics collection
4. **useMonitoring Hook** - React integration for components
5. **MonitoringDashboard** - Admin interface for viewing logs and metrics

### Database Schema

The system uses three main tables in Supabase:

- `application_logs` - General application logs
- `performance_metrics` - Performance measurements
- `error_reports` - Error tracking and resolution

## Features

### 1. Application Logging

```typescript
import { monitoringService } from '@/services/MonitoringService';

// Basic logging
await monitoringService.log({
  level: 'info',
  category: 'system',
  message: 'User logged in',
  metadata: { userId: 'user-123' }
});

// Specialized logging
await monitoringService.logPayment('Payment initiated', { paymentId: 'pay-123' });
await monitoringService.logEnrollment('Course enrolled', { courseId: 'course-123' });
await monitoringService.logAdmin('User approved', { userId: 'user-123' });
```

### 2. Performance Monitoring

```typescript
import { performanceMonitoring } from '@/utils/performanceMonitoring';

// Timer-based measurement
const timerId = performanceMonitoring.startTimer('api_call', 'api_response_time');
// ... perform operation
await performanceMonitoring.endTimer(timerId);

// Function measurement
const result = await performanceMonitoring.measureFunction(
  'database_query',
  () => fetchUserData(userId),
  'database_query_time',
  { userId }
);

// API call measurement
const apiResult = await performanceMonitoring.measureApiCall(
  '/api/payments',
  'POST',
  () => processPayment(paymentData)
);
```

### 3. Payment-Specific Logging

```typescript
import { paymentLoggingService } from '@/services/PaymentLoggingService';

// Payment flow logging
const context = { paymentId: 'pay-123', userId: 'user-123', amount: 100 };

await paymentLoggingService.logPaymentInitiated(context);
const timerId = await paymentLoggingService.logPaymentProcessingStart(context);
await paymentLoggingService.logPaymentProcessingComplete(context, timerId, true, 'txn-123');

// Error logging
await paymentLoggingService.logPaymentError(context, {
  code: 'PAYMENT_FAILED',
  message: 'Payment processing failed',
  retryable: true
}, 'processing');

// Webhook logging
await paymentLoggingService.logWebhookReceived('payment_status', context, webhookPayload);
```

### 4. Error Reporting

```typescript
// Automatic error reporting
await monitoringService.reportError(new Error('Something went wrong'), {
  userId: 'user-123',
  action: 'course_enrollment'
});

// Custom error reports
await monitoringService.reportError({
  timestamp: new Date(),
  errorType: 'ValidationError',
  errorMessage: 'Invalid payment amount',
  severity: 'medium',
  category: 'payment',
  metadata: { amount: -100 }
});
```

### 5. React Component Integration

```typescript
import { useMonitoring } from '@/hooks/useMonitoring';

function MyComponent() {
  const { logInfo, logError, measureFunction, trackPaymentFlow } = useMonitoring({
    pageName: 'payment-page',
    enablePerformanceMonitoring: true,
    enableErrorBoundary: true
  });

  const handlePayment = async () => {
    const paymentFlow = trackPaymentFlow();
    
    try {
      await paymentFlow.logInitiated({ paymentId: 'pay-123' });
      const result = await measureFunction('process_payment', () => processPayment());
      logInfo('Payment completed successfully', { result });
    } catch (error) {
      logError('Payment failed', error);
    }
  };

  return <div>...</div>;
}
```

## Configuration

### Environment Variables

```env
# Production mode (disables console logging)
VITE_NODE_ENV=production

# Enable console logs in production (optional)
VITE_ENABLE_CONSOLE_LOGS=true
```

### Database Setup

Run the migration to create monitoring tables:

```sql
-- Run: supabase/migrations/20240922000001_create_monitoring_tables.sql
```

## Monitoring Dashboard

The admin monitoring dashboard provides:

- **Real-time Logs** - View application logs with filtering
- **Error Reports** - Track and resolve system errors
- **Performance Metrics** - Monitor system performance
- **Summary Views** - Aggregated statistics and trends

Access the dashboard at `/admin/monitoring` (admin users only).

## Performance Considerations

### Log Retention

- Application logs: 90 days
- Performance metrics: 30 days
- Error reports: 180 days (resolved), indefinite (unresolved)

### Automatic Cleanup

A cleanup function runs periodically to remove old logs:

```sql
SELECT cleanup_old_logs();
```

### Production Optimizations

- Console logging disabled in production
- Batch log insertions for high-volume events
- Asynchronous error reporting
- Connection pooling for database operations

## Security

### Data Protection

- User PII is not logged in plain text
- Payment details are sanitized before logging
- Webhook signatures are validated
- Admin-only access to monitoring dashboard

### Access Control

- Row Level Security (RLS) enabled on all monitoring tables
- Users can only insert their own logs
- Admins can view all logs and metrics
- Error resolution requires admin privileges

## Troubleshooting

### Common Issues

1. **Logs not appearing in dashboard**
   - Check user permissions
   - Verify RLS policies
   - Check network connectivity

2. **Performance metrics missing**
   - Ensure performance monitoring is enabled
   - Check timer cleanup (timers must be ended)
   - Verify metric categories are valid

3. **Error reports not created**
   - Check error boundary configuration
   - Verify error reporting is enabled
   - Check console for error reporting failures

### Debug Mode

Enable debug logging in development:

```typescript
// Set log level to debug
await monitoringService.log({
  level: 'debug',
  category: 'system',
  message: 'Debug information',
  metadata: { debugData: 'value' }
});
```

## Best Practices

### Logging Guidelines

1. **Use appropriate log levels**
   - `debug`: Development information
   - `info`: Normal operations
   - `warn`: Potential issues
   - `error`: Actual problems

2. **Include relevant context**
   - User IDs for user actions
   - Payment IDs for payment operations
   - Course IDs for enrollment actions

3. **Avoid logging sensitive data**
   - No passwords or API keys
   - Sanitize payment information
   - Hash or mask PII when necessary

### Performance Monitoring

1. **Monitor critical paths**
   - Payment processing
   - User authentication
   - Course enrollment
   - Admin operations

2. **Set reasonable thresholds**
   - API calls > 2 seconds are flagged as slow
   - Page loads > 3 seconds trigger warnings
   - Payment processing > 10 seconds is critical

3. **Use meaningful metric names**
   - Include operation type and context
   - Use consistent naming conventions
   - Group related metrics by category

### Error Handling

1. **Categorize errors appropriately**
   - `payment`: Payment-related errors
   - `enrollment`: Course enrollment issues
   - `admin`: Administrative operation failures
   - `system`: General system errors

2. **Set appropriate severity levels**
   - `low`: Minor issues, no user impact
   - `medium`: Some functionality affected
   - `high`: Major functionality broken
   - `critical`: System-wide issues

3. **Provide actionable information**
   - Include error codes and messages
   - Add context for debugging
   - Suggest resolution steps when possible

## Integration Examples

### Payment Service Integration

The Ikhokha payment service is fully integrated with monitoring:

```typescript
// Payment initiation
await paymentLoggingService.logPaymentInitiated(paymentContext);

// Performance tracking
const timerId = await paymentLoggingService.logPaymentProcessingStart(paymentContext);
const result = await processPayment(paymentData);
await paymentLoggingService.logPaymentProcessingComplete(paymentContext, timerId, result.success);

// Error handling
if (!result.success) {
  await paymentLoggingService.logPaymentError(paymentContext, result.error, 'processing');
}
```

### Admin Dashboard Integration

The admin dashboard tracks all administrative actions:

```typescript
// Action logging
logAdminAction('enrollment_approval_initiated', { enrollmentId });

// Performance measurement
const success = await measureFunction(
  'admin_enrollment_approval',
  () => approveEnrollment(enrollmentId)
);

// Error tracking
if (!success) {
  logError('Admin enrollment approval failed', error, { enrollmentId });
}
```

## Monitoring Alerts

### Automated Alerts (Future Enhancement)

The system is designed to support automated alerting based on:

- Error rate thresholds
- Performance degradation
- System health metrics
- Payment processing failures

### Manual Monitoring

Admins should regularly check:

- Unresolved error reports
- Performance trend analysis
- Payment processing success rates
- User activity patterns

## Conclusion

The monitoring and logging system provides comprehensive visibility into the Beta Skill application's operation, enabling proactive issue detection, performance optimization, and effective debugging. The system is designed to be scalable, secure, and easy to use while providing detailed insights into system behavior.