/**
 * Card Payment System Health Check
 * 
 * Provides health status and configuration verification for the card payment system
 */

interface HandlerEvent {
  httpMethod: string;
  headers: Record<string, string>;
  body: string | null;
  queryStringParameters: Record<string, string> | null;
}

interface HandlerContext {
  functionName: string;
}

interface HandlerResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

type Handler = (event: HandlerEvent, context: HandlerContext) => Promise<HandlerResponse>;

interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  environment: string;
  checks: {
    configuration: CheckResult;
    database: CheckResult;
    monitoring: CheckResult;
    security: CheckResult;
    services: CheckResult;
  };
  metrics?: {
    uptime: number;
    lastDeployment?: string;
  };
}

interface CheckResult {
  status: 'pass' | 'warn' | 'fail';
  message: string;
  details?: Record<string, any>;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext): Promise<HandlerResponse> => {
  const startTime = Date.now();

  try {
    // Perform health checks
    const configCheck = await checkConfiguration();
    const databaseCheck = await checkDatabase();
    const monitoringCheck = await checkMonitoring();
    const securityCheck = await checkSecurity();
    const servicesCheck = await checkServices();

    // Determine overall status
    const checks = {
      configuration: configCheck,
      database: databaseCheck,
      monitoring: monitoringCheck,
      security: securityCheck,
      services: servicesCheck
    };

    const overallStatus = determineOverallStatus(checks);

    const result: HealthCheckResult = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.VITE_DEPLOYMENT_VERSION || 'unknown',
      environment: process.env.VITE_DEPLOYMENT_ENVIRONMENT || 'unknown',
      checks,
      metrics: {
        uptime: Date.now() - startTime,
        lastDeployment: process.env.VITE_DEPLOYMENT_TIMESTAMP
      }
    };

    // Return appropriate status code based on health
    const statusCode = overallStatus === 'healthy' ? 200 : 
                      overallStatus === 'degraded' ? 200 : 503;

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      },
      body: JSON.stringify(result, null, 2)
    };
  } catch (error) {
    console.error('Health check failed:', error);

    return {
      statusCode: 503,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
        checks: {
          configuration: { status: 'fail', message: 'Health check failed' },
          database: { status: 'fail', message: 'Health check failed' },
          monitoring: { status: 'fail', message: 'Health check failed' },
          security: { status: 'fail', message: 'Health check failed' },
          services: { status: 'fail', message: 'Health check failed' }
        }
      }, null, 2)
    };
  }
};

async function checkConfiguration(): Promise<CheckResult> {
  try {
    const requiredVars = [
      'VITE_IKHOKHA_API_KEY',
      'VITE_IKHOKHA_API_SECRET',
      'VITE_IKHOKHA_WEBHOOK_SECRET',
      'VITE_SUPABASE_URL',
      'VITE_SUPABASE_ANON_KEY'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);

    if (missing.length > 0) {
      return {
        status: 'fail',
        message: 'Missing required environment variables',
        details: { missing }
      };
    }

    // Check production-specific configuration
    const isProduction = process.env.VITE_NODE_ENV === 'production';
    if (isProduction) {
      const testMode = process.env.VITE_IKHOKHA_TEST_MODE === 'true';
      if (testMode) {
        return {
          status: 'fail',
          message: 'Test mode enabled in production',
          details: { testMode }
        };
      }
    }

    return {
      status: 'pass',
      message: 'Configuration valid',
      details: {
        environment: process.env.VITE_NODE_ENV,
        fastTrackEnabled: process.env.VITE_ENABLE_CARD_PAYMENT_FAST_TRACK === 'true',
        monitoringEnabled: process.env.VITE_ENABLE_CARD_PAYMENT_MONITORING === 'true'
      }
    };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Configuration check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}

async function checkDatabase(): Promise<CheckResult> {
  try {
    // In a real implementation, this would check database connectivity
    // For now, we'll check if Supabase URL is configured
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    
    if (!supabaseUrl) {
      return {
        status: 'fail',
        message: 'Database configuration missing'
      };
    }

    return {
      status: 'pass',
      message: 'Database configuration valid',
      details: {
        configured: true
      }
    };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Database check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}

async function checkMonitoring(): Promise<CheckResult> {
  try {
    const monitoringEnabled = process.env.VITE_ENABLE_CARD_PAYMENT_MONITORING === 'true';
    const performanceMonitoring = process.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true';
    const businessMetrics = process.env.VITE_ENABLE_BUSINESS_METRICS === 'true';

    const hasAlertEndpoint = !!(
      process.env.VITE_ALERT_WEBHOOK_URL ||
      process.env.VITE_ALERT_EMAIL ||
      process.env.VITE_ALERT_SLACK_WEBHOOK
    );

    const isProduction = process.env.VITE_NODE_ENV === 'production';

    if (isProduction && !monitoringEnabled) {
      return {
        status: 'warn',
        message: 'Monitoring disabled in production',
        details: { monitoringEnabled }
      };
    }

    if (isProduction && !hasAlertEndpoint) {
      return {
        status: 'warn',
        message: 'No alert endpoints configured',
        details: { hasAlertEndpoint }
      };
    }

    return {
      status: 'pass',
      message: 'Monitoring configured',
      details: {
        monitoringEnabled,
        performanceMonitoring,
        businessMetrics,
        hasAlertEndpoint
      }
    };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Monitoring check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}

async function checkSecurity(): Promise<CheckResult> {
  try {
    const webhookValidation = process.env.VITE_ENABLE_ENHANCED_WEBHOOK_VALIDATION === 'true';
    const auditLogging = process.env.VITE_ENABLE_CARD_PAYMENT_AUDIT_LOGGING === 'true';
    const threatDetection = process.env.VITE_ENABLE_CARD_PAYMENT_THREAT_DETECTION === 'true';
    const ipVerification = process.env.VITE_ENABLE_WEBHOOK_IP_VERIFICATION === 'true';

    const isProduction = process.env.VITE_NODE_ENV === 'production';

    if (isProduction && !webhookValidation) {
      return {
        status: 'fail',
        message: 'Webhook validation disabled in production'
      };
    }

    if (isProduction && !auditLogging) {
      return {
        status: 'fail',
        message: 'Audit logging disabled in production'
      };
    }

    const warnings: string[] = [];
    if (isProduction && !threatDetection) {
      warnings.push('Threat detection disabled');
    }
    if (isProduction && ipVerification && !process.env.VITE_WEBHOOK_ALLOWED_IPS) {
      warnings.push('IP verification enabled but no IPs whitelisted');
    }

    return {
      status: warnings.length > 0 ? 'warn' : 'pass',
      message: warnings.length > 0 ? 'Security warnings detected' : 'Security configured',
      details: {
        webhookValidation,
        auditLogging,
        threatDetection,
        ipVerification,
        warnings
      }
    };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Security check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}

async function checkServices(): Promise<CheckResult> {
  try {
    const fastTrackEnabled = process.env.VITE_ENABLE_CARD_PAYMENT_FAST_TRACK === 'true';
    const realTimeSyncEnabled = process.env.VITE_ENABLE_ENHANCED_REAL_TIME_SYNC === 'true';
    const persistenceEnabled = process.env.VITE_ENABLE_BULLETPROOF_PERSISTENCE === 'true';
    const errorRecoveryEnabled = process.env.VITE_ENABLE_ERROR_RECOVERY === 'true';

    const criticalServices = {
      fastTrack: fastTrackEnabled,
      realTimeSync: realTimeSyncEnabled,
      persistence: persistenceEnabled,
      errorRecovery: errorRecoveryEnabled
    };

    const disabledServices = Object.entries(criticalServices)
      .filter(([_, enabled]) => !enabled)
      .map(([service]) => service);

    if (disabledServices.length > 0) {
      return {
        status: 'warn',
        message: 'Some critical services disabled',
        details: { disabledServices, ...criticalServices }
      };
    }

    return {
      status: 'pass',
      message: 'All critical services enabled',
      details: criticalServices
    };
  } catch (error) {
    return {
      status: 'fail',
      message: 'Services check failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    };
  }
}

function determineOverallStatus(checks: HealthCheckResult['checks']): 'healthy' | 'degraded' | 'unhealthy' {
  const statuses = Object.values(checks).map(check => check.status);

  if (statuses.includes('fail')) {
    return 'unhealthy';
  }

  if (statuses.includes('warn')) {
    return 'degraded';
  }

  return 'healthy';
}

exports.handler = handler;
