/**
 * Production Webhook Security Example
 * 
 * Demonstrates how to use the ProductionWebhookSecurity service
 * for validating Ikhokha webhooks in production environment.
 */

import { productionWebhookSecurity, WebhookRequest } from '@/services/ProductionWebhookSecurity';

/**
 * Example: Validate an incoming Ikhokha webhook
 */
export async function validateIncomingWebhook(
  payload: string,
  signature: string,
  timestamp: string,
  sourceIP: string,
  userAgent?: string
): Promise<void> {
  console.log('🔒 Validating incoming Ikhokha webhook...');

  const request: WebhookRequest = {
    payload,
    signature,
    timestamp,
    sourceIP,
    userAgent,
    headers: {
      'content-type': 'application/json',
      'user-agent': userAgent || 'Unknown'
    }
  };

  try {
    const validationResult = await productionWebhookSecurity.validateWebhookSecurity(request);

    if (validationResult.valid) {
      console.log('✅ Webhook validation successful');
      console.log(`Processing time: ${validationResult.processingTimeMs}ms`);
      
      // Process the webhook payload
      const webhookData = JSON.parse(payload);
      console.log('📦 Webhook data:', {
        transactionId: webhookData.transaction_id,
        reference: webhookData.reference,
        amount: webhookData.amount,
        status: webhookData.status
      });

      // Continue with webhook processing...
      await processValidatedWebhook(webhookData);
      
    } else {
      console.error('❌ Webhook validation failed');
      console.error('Validation errors:', validationResult.validationErrors);
      console.error('Security violations:', validationResult.securityViolations.map(v => ({
        type: v.type,
        severity: v.severity,
        description: v.description
      })));

      // Reject the webhook
      throw new Error(`Webhook validation failed: ${validationResult.validationErrors.join(', ')}`);
    }

  } catch (error) {
    console.error('🚨 Webhook validation error:', error);
    throw error;
  }
}

/**
 * Example: Process a validated webhook
 */
async function processValidatedWebhook(webhookData: any): Promise<void> {
  console.log('🔄 Processing validated webhook...');

  // Update enrollment status based on webhook data
  if (webhookData.status === 'completed') {
    console.log('💳 Payment completed - updating enrollment status');
    // Update enrollment to approved status
    // Grant course access
    // Send confirmation email
  } else if (webhookData.status === 'failed') {
    console.log('❌ Payment failed - updating enrollment status');
    // Update enrollment to failed status
    // Send failure notification
  } else if (webhookData.status === 'cancelled') {
    console.log('🚫 Payment cancelled - updating enrollment status');
    // Update enrollment to cancelled status
  }

  console.log('✅ Webhook processing completed');
}

/**
 * Example: Configure webhook security settings
 */
export function configureWebhookSecurity(): void {
  console.log('⚙️ Configuring webhook security settings...');

  // Get current configuration
  const currentConfig = productionWebhookSecurity.getSecurityConfig();
  console.log('Current config:', {
    signatureAlgorithm: currentConfig.signatureAlgorithm,
    timestampTolerance: currentConfig.timestampTolerance,
    enableSignatureValidation: currentConfig.enableSignatureValidation,
    enableTimestampValidation: currentConfig.enableTimestampValidation,
    enableSourceValidation: currentConfig.enableSourceValidation
  });

  // Update configuration if needed
  productionWebhookSecurity.updateSecurityConfig({
    timestampTolerance: 300, // 5 minutes
    enableSourceValidation: true,
    allowedSourceIPs: ['192.168.1.1', '10.0.0.1'] // Add Ikhokha IPs
  });

  console.log('✅ Webhook security configuration updated');
}

/**
 * Example: Monitor webhook security statistics
 */
export function monitorWebhookSecurity(): void {
  console.log('📊 Monitoring webhook security statistics...');

  const stats = productionWebhookSecurity.getSecurityStats();
  console.log('Security statistics:', {
    cacheSize: stats.cacheSize,
    recentWebhooksCount: stats.recentWebhooksCount,
    suspiciousIPsCount: stats.suspiciousIPsCount
  });

  // Alert if suspicious activity detected
  if (stats.suspiciousIPsCount > 0) {
    console.warn('⚠️ Suspicious IPs detected:', stats.suspiciousIPsCount);
  }

  // Clean caches if needed
  if (stats.cacheSize > 500) {
    console.log('🧹 Cleaning security caches...');
    productionWebhookSecurity.clearSecurityCaches();
  }
}

/**
 * Example: Express.js webhook endpoint with security validation
 */
export function createSecureWebhookEndpoint() {
  return async (req: any, res: any) => {
    try {
      const payload = JSON.stringify(req.body);
      const signature = req.headers['x-signature'] || req.headers['signature'];
      const timestamp = req.headers['x-timestamp'] || new Date().toISOString();
      const sourceIP = req.ip || req.connection.remoteAddress;
      const userAgent = req.headers['user-agent'];

      console.log('📥 Received webhook from:', sourceIP);

      // Validate webhook security
      await validateIncomingWebhook(payload, signature, timestamp, sourceIP, userAgent);

      // Send success response
      res.status(200).json({
        success: true,
        message: 'Webhook processed successfully'
      });

    } catch (error) {
      console.error('Webhook processing failed:', error);
      
      // Send error response
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
}

/**
 * Example: Batch validate multiple webhooks
 */
export async function batchValidateWebhooks(webhooks: Array<{
  payload: string;
  signature: string;
  timestamp: string;
  sourceIP: string;
  userAgent?: string;
}>): Promise<void> {
  console.log(`🔒 Batch validating ${webhooks.length} webhooks...`);

  const results = await Promise.allSettled(
    webhooks.map(webhook => 
      validateIncomingWebhook(
        webhook.payload,
        webhook.signature,
        webhook.timestamp,
        webhook.sourceIP,
        webhook.userAgent
      )
    )
  );

  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.filter(r => r.status === 'rejected').length;

  console.log(`✅ Batch validation completed: ${successful} successful, ${failed} failed`);

  // Log failed validations
  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`Webhook ${index + 1} validation failed:`, result.reason);
    }
  });
}

/**
 * Example usage
 */
export async function runWebhookSecurityExamples(): Promise<void> {
  console.log('🚀 Running Production Webhook Security Examples...\n');

  // Configure security settings
  configureWebhookSecurity();
  console.log('');

  // Monitor security statistics
  monitorWebhookSecurity();
  console.log('');

  // Example webhook data
  const examplePayload = JSON.stringify({
    transaction_id: 'txn_123456789',
    reference: 'REF_123456',
    amount: 299.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    auth_code: 'AUTH123',
    response_code: '00',
    response_message: 'Approved'
  });

  // This would normally be generated by Ikhokha
  const exampleSignature = 'sha256=example_signature_here';
  const exampleTimestamp = new Date().toISOString();
  const exampleSourceIP = '192.168.1.1';
  const exampleUserAgent = 'Ikhokha-Webhook/1.0';

  try {
    // Validate example webhook (this will fail due to invalid signature, but demonstrates the flow)
    console.log('📝 Example webhook validation (will fail due to invalid signature):');
    await validateIncomingWebhook(
      examplePayload,
      exampleSignature,
      exampleTimestamp,
      exampleSourceIP,
      exampleUserAgent
    );
  } catch (error) {
    console.log('Expected validation failure:', error instanceof Error ? error.message : error);
  }

  console.log('\n🎉 Production Webhook Security Examples completed!');
}

// Export for use in other parts of the application
export {
  productionWebhookSecurity
};