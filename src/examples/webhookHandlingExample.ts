/**
 * Ikhokha Webhook Handling Example
 * 
 * This example demonstrates how to use the comprehensive webhook handling system
 * including security, retry mechanisms, and real-time updates.
 */

import { ikhokhaWebhookHandler } from '../services/IkhokhaWebhookHandler';
import { webhookRetryService } from '../services/WebhookRetryService';
import { webhookSecurityService } from '../services/WebhookSecurityService';
import { ikhokhaPaymentService } from '../services/ikhokhaPaymentService';
import {
  IkhokhaWebhook,
  PaymentStatus,
  PaymentUpdate
} from '../types/ikhokha';

/**
 * Example: Setting up webhook subscriptions
 */
export function setupWebhookSubscriptions() {
  console.log('🔔 Setting up webhook subscriptions...');

  // Subscribe to all payment updates
  const unsubscribeAll = ikhokhaWebhookHandler.subscribeToPaymentUpdates(
    (update: PaymentUpdate) => {
      console.log('💳 Payment update received:', {
        paymentId: update.payment_id,
        status: update.status,
        amount: update.amount,
        timestamp: update.timestamp
      });

      // Handle different payment statuses
      switch (update.status) {
        case PaymentStatus.COMPLETED:
          handlePaymentCompleted(update);
          break;
        case PaymentStatus.FAILED:
          handlePaymentFailed(update);
          break;
        case PaymentStatus.CANCELLED:
          handlePaymentCancelled(update);
          break;
      }
    }
  );

  // Subscribe to specific payment updates with filters
  const unsubscribeFiltered = ikhokhaWebhookHandler.subscribeToPaymentUpdates(
    (update: PaymentUpdate) => {
      console.log('✅ Completed payment update:', update);
      // Handle only completed payments
      sendPaymentConfirmationEmail(update);
    },
    {
      status: [PaymentStatus.COMPLETED] // Only completed payments
    }
  );

  // Return cleanup function
  return () => {
    unsubscribeAll();
    unsubscribeFiltered();
    console.log('🧹 Webhook subscriptions cleaned up');
  };
}

/**
 * Example: Processing a webhook manually (for testing)
 */
export async function processTestWebhook() {
  console.log('🧪 Processing test webhook...');

  const testWebhookData: IkhokhaWebhook = {
    transaction_id: 'txn_test_' + Date.now(),
    reference: 'TEST_REF_' + Math.random().toString(36).substr(2, 9),
    amount: 299.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'sha256=test_signature_' + Date.now(),
    response_code: '00',
    response_message: 'Approved',
    auth_code: 'AUTH123',
    card_type: 'VISA',
    masked_card_number: '****1234',
    metadata: {
      enrollmentId: 'enr_test_123',
      courseId: 'course_456',
      userId: 'user_789'
    }
  };

  try {
    const result = await ikhokhaWebhookHandler.processWebhook(testWebhookData);
    
    console.log('✅ Test webhook processed successfully:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Test webhook processing failed:', error);
    throw error;
  }
}

/**
 * Example: Webhook security validation
 */
export async function validateWebhookSecurity(
  webhookData: IkhokhaWebhook,
  sourceIp: string = '127.0.0.1'
) {
  console.log('🔒 Validating webhook security...');

  const securityResult = await webhookSecurityService.validateWebhookSecurity(
    webhookData,
    sourceIp,
    {
      'user-agent': 'Ikhokha-Webhook/1.0',
      'content-type': 'application/json'
    }
  );

  if (securityResult.valid) {
    console.log('✅ Webhook security validation passed');
    return true;
  } else {
    console.error('❌ Webhook security validation failed:', securityResult.violations);
    return false;
  }
}

/**
 * Example: Retry failed webhooks
 */
export async function handleWebhookRetries() {
  console.log('🔄 Handling webhook retries...');

  // Get retry statistics
  const stats = webhookRetryService.getRetryStats();
  console.log('📊 Retry statistics:', stats);

  // Get all retry items
  const retryItems = webhookRetryService.getAllRetryItems();
  console.log(`📋 Found ${retryItems.length} items in retry queue`);

  // Process specific retry items
  for (const item of retryItems) {
    if (item.attempts < 3) { // Only retry items that haven't exceeded max attempts
      try {
        console.log(`🔄 Retrying webhook: ${item.id}`);
        const result = await webhookRetryService.retryWebhook(item.id);
        console.log(`✅ Retry successful for ${item.id}:`, result);
      } catch (error) {
        console.error(`❌ Retry failed for ${item.id}:`, error);
      }
    }
  }
}

/**
 * Example: Complete payment flow with webhook handling
 */
export async function completePaymentFlow(
  amount: number,
  courseName: string,
  userEmail: string
) {
  console.log('💳 Starting complete payment flow...');

  try {
    // 1. Initialize payment
    const paymentSession = await ikhokhaPaymentService.initializePayment(
      amount,
      `COURSE_${Date.now()}`,
      {
        courseName,
        userEmail,
        enrollmentId: `enr_${Date.now()}`
      }
    );

    console.log('🚀 Payment session created:', {
      id: paymentSession.id,
      amount: paymentSession.amount,
      paymentUrl: paymentSession.payment_url
    });

    // 2. Set up webhook subscription for this specific payment
    const unsubscribe = ikhokhaWebhookHandler.subscribeToPaymentUpdates(
      (update: PaymentUpdate) => {
        console.log(`💳 Payment update for ${paymentSession.id}:`, update);
        
        if (update.status === PaymentStatus.COMPLETED) {
          console.log('✅ Payment completed successfully!');
          // Grant course access, send confirmation email, etc.
        }
      },
      {
        paymentId: paymentSession.id
      }
    );

    // 3. Simulate webhook processing (in real scenario, this comes from Ikhokha)
    setTimeout(async () => {
      const webhookData: IkhokhaWebhook = {
        transaction_id: paymentSession.id,
        reference: paymentSession.reference,
        amount: paymentSession.amount,
        currency: paymentSession.currency,
        status: 'completed',
        timestamp: new Date().toISOString(),
        signature: 'sha256=simulated_signature',
        response_code: '00',
        response_message: 'Approved'
      };

      try {
        await ikhokhaWebhookHandler.processWebhook(webhookData);
      } catch (error) {
        console.error('❌ Webhook processing failed:', error);
      }
    }, 2000); // Simulate 2-second delay

    // 4. Return payment session and cleanup function
    return {
      paymentSession,
      cleanup: unsubscribe
    };

  } catch (error) {
    console.error('❌ Payment flow failed:', error);
    throw error;
  }
}

/**
 * Example: Monitoring webhook system health
 */
export function monitorWebhookSystem() {
  console.log('📊 Monitoring webhook system...');

  // Get webhook handler statistics
  const webhookStats = ikhokhaWebhookHandler.getWebhookStats();
  console.log('🔔 Webhook Handler Stats:', webhookStats);

  // Get retry service statistics
  const retryStats = webhookRetryService.getRetryStats();
  console.log('🔄 Retry Service Stats:', retryStats);

  // Get security service statistics
  const rateLimitStats = webhookSecurityService.getRateLimitStats();
  console.log('🔒 Security Stats:', rateLimitStats);

  // Get recent audit logs
  const auditLogs = webhookSecurityService.getAuditLogs(10);
  console.log('📝 Recent Audit Logs:', auditLogs);

  return {
    webhookStats,
    retryStats,
    rateLimitStats,
    auditLogs
  };
}

/**
 * Example: Cleanup and maintenance
 */
export function performWebhookMaintenance() {
  console.log('🧹 Performing webhook system maintenance...');

  // Clear old retry items
  const clearedRetries = webhookRetryService.clearRetryQueue();
  console.log(`🗑️ Cleared ${clearedRetries} retry items`);

  // Clear old audit logs
  const clearedLogs = webhookSecurityService.clearAuditLogs();
  console.log(`🗑️ Cleared ${clearedLogs} audit logs`);

  // Clear rate limiting data
  webhookSecurityService.clearRateLimitData();
  console.log('🗑️ Cleared rate limiting data');

  console.log('✅ Webhook maintenance completed');
}

// Helper functions for handling different payment statuses

function handlePaymentCompleted(update: PaymentUpdate) {
  console.log('✅ Handling completed payment:', update.payment_id);
  
  // Implementation would include:
  // - Grant course access
  // - Send confirmation email
  // - Update user dashboard
  // - Log successful transaction
}

function handlePaymentFailed(update: PaymentUpdate) {
  console.log('❌ Handling failed payment:', update.payment_id);
  
  // Implementation would include:
  // - Send failure notification
  // - Offer retry options
  // - Log failed transaction
  // - Update enrollment status
}

function handlePaymentCancelled(update: PaymentUpdate) {
  console.log('⚠️ Handling cancelled payment:', update.payment_id);
  
  // Implementation would include:
  // - Send cancellation notification
  // - Clean up pending enrollment
  // - Log cancelled transaction
}

function sendPaymentConfirmationEmail(update: PaymentUpdate) {
  console.log('📧 Sending payment confirmation email for:', update.payment_id);
  
  // Implementation would include:
  // - Generate email content
  // - Send via email service
  // - Log email sent
}

/**
 * Example usage of the webhook system
 */
export async function exampleUsage() {
  console.log('🚀 Starting webhook system example...');

  try {
    // 1. Set up subscriptions
    const cleanup = setupWebhookSubscriptions();

    // 2. Process a test webhook
    await processTestWebhook();

    // 3. Start a complete payment flow
    const paymentFlow = await completePaymentFlow(
      299.99,
      'Advanced JavaScript Course',
      'student@example.com'
    );

    // 4. Monitor system health
    const healthStats = monitorWebhookSystem();

    // 5. Handle any retries
    await handleWebhookRetries();

    console.log('✅ Webhook system example completed successfully');

    // Cleanup after 10 seconds
    setTimeout(() => {
      cleanup();
      paymentFlow.cleanup();
      performWebhookMaintenance();
    }, 10000);

    return {
      paymentFlow,
      healthStats,
      cleanup
    };

  } catch (error) {
    console.error('❌ Webhook system example failed:', error);
    throw error;
  }
}

// Export for use in other parts of the application
export {
  handlePaymentCompleted,
  handlePaymentFailed,
  handlePaymentCancelled,
  sendPaymentConfirmationEmail
};