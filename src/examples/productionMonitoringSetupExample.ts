/**
 * Production Monitoring Setup Example
 * 
 * Demonstrates how to use the ProductionMonitoringSetup service
 * for comprehensive production monitoring including payment monitoring,
 * system health monitoring, error monitoring, and performance monitoring.
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */

import { ProductionMonitoringSetup } from '../services/ProductionMonitoringSetup';

/**
 * Example: Initialize and use ProductionMonitoringSetup
 */
async function demonstrateProductionMonitoring() {
  console.log('=== Production Monitoring Setup Example ===\n');

  // Create monitoring instance
  const monitoring = new ProductionMonitoringSetup();
  
  try {
    // Initialize the monitoring system
    console.log('1. Initializing production monitoring system...');
    await monitoring.initializeMonitoring();
    
    // Get initial status
    const initialStatus = monitoring.getMonitoringStatus();
    console.log('Initial monitoring status:', {
      enabled: initialStatus.enabled,
      metrics_count: initialStatus.metrics_count,
      events_count: initialStatus.events_count,
      health_checks_count: initialStatus.health_checks_count
    });
    
    // Simulate payment success event
    console.log('\n2. Simulating payment success...');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('payment-success', {
        detail: {
          paymentId: 'pay_123456',
          amount: 399,
          courseId: 'plumbing101',
          userId: 'user_789',
          method: 'card',
          processingTime: 1250
        }
      }));
    }
    
    // Record some metrics manually
    console.log('\n3. Recording custom metrics...');
    monitoring.recordMetric('api_response_time', 245, 'milliseconds', {
      endpoint: '/api/payments',
      method: 'POST'
    });
    
    monitoring.recordMetric('memory_usage', 67.5, 'percentage', {
      service: 'payment-processor'
    });
    
    monitoring.recordMetric('payment_volume', 15, 'count', {
      time_period: 'last_hour'
    });
    
    // Log some events
    console.log('\n4. Logging monitoring events...');
    monitoring.logEvent({
      event_type: 'PAYMENT_SUCCESS',
      severity: 'INFO',
      message: 'Payment processed successfully via Ikhokha',
      details: {
        payment_id: 'pay_123456',
        amount: 399,
        processing_time: 1250,
        gateway: 'ikhokha'
      },
      timestamp: new Date(),
      source: 'PaymentProcessor',
      user_id: 'user_789'
    });
    
    monitoring.logEvent({
      event_type: 'PERFORMANCE_ALERT',
      severity: 'WARNING',
      message: 'API response time above threshold',
      details: {
        response_time: 3500,
        threshold: 3000,
        endpoint: '/api/enrollments'
      },
      timestamp: new Date(),
      source: 'PerformanceMonitor'
    });
    
    // Update health check
    console.log('\n5. Updating health check status...');
    monitoring.updateHealthCheck('ikhokha_api', {
      service: 'ikhokha_api',
      status: 'HEALTHY',
      response_time: 245,
      last_check: new Date(),
      details: {
        endpoint: 'https://api.ikhokha.com',
        last_successful_payment: new Date().toISOString()
      }
    });
    
    monitoring.updateHealthCheck('database', {
      service: 'database',
      status: 'HEALTHY',
      response_time: 12,
      last_check: new Date(),
      details: {
        connection_pool: 'active',
        active_connections: 5,
        max_connections: 20
      }
    });
    
    // Collect business metrics
    console.log('\n6. Collecting business metrics...');
    const businessMetrics = await monitoring.collectBusinessMetrics();
    console.log('Business metrics:', {
      payment_volume: businessMetrics.payment_volume,
      payment_success_rate: businessMetrics.payment_success_rate,
      enrollment_conversion_rate: businessMetrics.enrollment_conversion_rate,
      average_payment_amount: businessMetrics.average_payment_amount,
      total_revenue: businessMetrics.total_revenue
    });
    
    // Get current metrics
    console.log('\n7. Retrieving recorded metrics...');
    const recentMetrics = monitoring.getMetrics(undefined, 10);
    console.log(`Found ${recentMetrics.length} recent metrics:`);
    recentMetrics.forEach(metric => {
      console.log(`  - ${metric.name}: ${metric.value} ${metric.unit} (${metric.timestamp.toISOString()})`);
    });
    
    // Get recent events
    console.log('\n8. Retrieving recent events...');
    const recentEvents = monitoring.getEvents(undefined, 5);
    console.log(`Found ${recentEvents.length} recent events:`);
    recentEvents.forEach(event => {
      console.log(`  - ${event.event_type} (${event.severity}): ${event.message}`);
    });
    
    // Get health status
    console.log('\n9. Checking health status...');
    const healthStatus = monitoring.getHealthStatus();
    console.log(`Health checks for ${healthStatus.size} services:`);
    healthStatus.forEach((health, serviceName) => {
      console.log(`  - ${serviceName}: ${health.status} (${health.response_time}ms)`);
    });
    
    // Get final monitoring status
    console.log('\n10. Final monitoring status...');
    const finalStatus = monitoring.getMonitoringStatus();
    console.log('Final status:', {
      enabled: finalStatus.enabled,
      metrics_count: finalStatus.metrics_count,
      events_count: finalStatus.events_count,
      health_checks_count: finalStatus.health_checks_count,
      alerts_count: finalStatus.alerts_count
    });
    
    // Demonstrate alert triggering
    console.log('\n11. Triggering test alert...');
    monitoring.logEvent({
      event_type: 'ERROR_OCCURRED',
      severity: 'CRITICAL',
      message: 'Critical system error detected',
      details: {
        error_code: 'SYS_001',
        component: 'payment-processor',
        impact: 'high'
      },
      timestamp: new Date(),
      source: 'SystemMonitor'
    });
    
    console.log('\n=== Production Monitoring Example Complete ===');
    
  } catch (error) {
    console.error('Error during monitoring demonstration:', error);
  } finally {
    // Clean shutdown
    console.log('\n12. Shutting down monitoring system...');
    await monitoring.shutdown();
    console.log('Monitoring system shutdown complete.');
  }
}

/**
 * Example: Integration with existing monitoring infrastructure
 */
function demonstrateMonitoringIntegration() {
  console.log('\n=== Monitoring Integration Example ===\n');
  
  const monitoring = new ProductionMonitoringSetup();
  
  // Example: Listen for monitoring alerts
  if (typeof window !== 'undefined') {
    window.addEventListener('monitoring-alert', (event: any) => {
      const alertData = event.detail;
      console.log(`🚨 MONITORING ALERT: ${alertData.severity} - ${alertData.message}`);
      
      // In production, this could:
      // - Send to Slack/Teams
      // - Trigger PagerDuty
      // - Send email notifications
      // - Log to external monitoring service
      
      switch (alertData.severity) {
        case 'CRITICAL':
          console.log('  → Triggering immediate escalation');
          break;
        case 'ERROR':
          console.log('  → Logging to error tracking service');
          break;
        case 'WARNING':
          console.log('  → Adding to monitoring dashboard');
          break;
        default:
          console.log('  → Recording for analysis');
      }
    });
  }
  
  // Example: Custom metric collection
  const collectCustomMetrics = () => {
    // Simulate collecting metrics from various sources
    monitoring.recordMetric('active_users', Math.floor(Math.random() * 100), 'count');
    monitoring.recordMetric('cpu_usage', Math.random() * 100, 'percentage');
    monitoring.recordMetric('disk_usage', Math.random() * 100, 'percentage');
    monitoring.recordMetric('network_latency', Math.random() * 1000, 'milliseconds');
  };
  
  // Example: Periodic health checks
  const performHealthChecks = async () => {
    const services = ['ikhokha_api', 'database', 'redis', 'webhook_endpoint'];
    
    for (const service of services) {
      try {
        // Simulate health check
        const responseTime = Math.random() * 1000;
        const isHealthy = responseTime < 500;
        
        monitoring.updateHealthCheck(service, {
          service,
          status: isHealthy ? 'HEALTHY' : 'DEGRADED',
          response_time: responseTime,
          last_check: new Date(),
          details: {
            simulated: true,
            check_type: 'ping'
          }
        });
        
      } catch (error) {
        monitoring.updateHealthCheck(service, {
          service,
          status: 'UNHEALTHY',
          response_time: -1,
          last_check: new Date(),
          details: {
            error: error instanceof Error ? error.message : 'Unknown error'
          }
        });
      }
    }
  };
  
  console.log('Integration examples set up. In production, these would run continuously.');
  
  return {
    monitoring,
    collectCustomMetrics,
    performHealthChecks
  };
}

// Export for use in other modules
export {
  demonstrateProductionMonitoring,
  demonstrateMonitoringIntegration
};

// Run example if this file is executed directly
if (typeof window !== 'undefined' && window.location?.pathname) {
  console.log('ProductionMonitoringSetup example loaded. Call demonstrateProductionMonitoring() to run the demo.');
} else if (typeof module !== 'undefined' && require.main === module) {
  demonstrateProductionMonitoring().catch(console.error);
}