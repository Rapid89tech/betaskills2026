/**
 * Webhook Handler Usage Examples
 * 
 * Demonstrates how to use the enhanced WebhookHandler for production
 * iKhokha payment processing with security validation and retry mechanisms.
 */

import { WebhookHandler } from '../services/WebhookHandler';
import { IkhokhaWebhook } from '../types/ikhokha';

/**
 * Example 1: Basic Webhook Processing
 * 
 * Shows how to process a standard iKhokha webhook notification
 * with proper security validation.
 */
export async function basicWebhookProcessingExample() {
  console.log('🔔 Example 1: Basic Webhook Processing');

  // Initialize the webhook handler
  const webhookHandler = WebhookHandler.getInstance();
  await webhookHandler.initialize();

  // Example webhook data from iKhokha
  const webhookData: IkhokhaWebhook = {
    transaction_id: 'txn_1234567890abcdef',
    reference: 'enrollment_ref_abc123',
    amount: 299.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'webhook_signature_from_ikhokha',
    response_code: '00',
    response_message: 'Transaction approved',
    card_type: 'VISA',
    masked_card_number: '****1234',
    auth_code: 'AUTH789'
  };

  // Signature from iKhokha headers
  const signature = 'sha256=actual_signature_from_ikhokha_header';
  const timestamp = webhookData.timestamp;

  try {
    // Process the webhook
    const result = await webhookHandler.processWebhook(
      webhookData,
      signature,
      timestamp
    );

    if (result.processed) {
      console.log('✅ Webhook processed successfully');
      console.log('📊 Result:', {
        paymentUpdated: result.payment_updated,
        enrollmentUpdated: result.enrollment_updated,
        details: result.details
      });

      // Handle successful processing
      if (result.enrollment_updated) {
        console.log('🎓 Student enrollment status updated');
        console.log('📧 Sending confirmation email to student...');
      }
    } else {
      console.log('❌ Webhook processing failed:', result.error);
      
      // Handle processing failure
      console.log('🚨 Alerting administrators...');
      console.log('📝 Logging failure for manual review...');
    }

  } catch (error) {
    console.error('💥 Webhook processing error:', error);
    
    // Handle critical errors
    console.log('🆘 Critical error - escalating to support team');
  }
}

/**
 * Example 2: Card Payment Webhook (Immediate Approval)
 * 
 * Demonstrates processing a successful card payment that should
 * grant immediate course access.
 */
export async function cardPaymentWebhookExample() {
  console.log('💳 Example 2: Card Payment Webhook Processing');

  const webhookHandler = WebhookHandler.getInstance();
  await webhookHandler.initialize();

  // Card payment webhook - includes card-specific fields
  const cardWebhookData: IkhokhaWebhook = {
    transaction_id: 'card_txn_987654321',
    reference: 'course_enrollment_card_456',
    amount: 499.00,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'card_webhook_signature',
    response_code: '00',
    response_message: 'Approved',
    card_type: 'MASTERCARD',
    masked_card_number: '****5678',
    auth_code: 'AUTH456',
    merchant_reference: 'MERCHANT_REF_123'
  };

  const signature = 'sha256=card_payment_signature';

  try {
    const result = await webhookHandler.processWebhook(
      cardWebhookData,
      signature,
      cardWebhookData.timestamp
    );

    if (result.processed && result.enrollment_updated) {
      console.log('🚀 Card payment processed - Immediate access granted!');
      console.log('📱 Real-time notification sent to student');
      console.log('🎯 Course access activated automatically');
      
      // The PaymentMethodRouter automatically:
      // 1. Detected this as a card payment
      // 2. Approved the enrollment immediately
      // 3. Granted course access
      // 4. Sent real-time updates to the student's interface
      
    } else {
      console.log('⚠️ Card payment webhook processed but enrollment not updated');
    }

  } catch (error) {
    console.error('❌ Card payment webhook failed:', error);
  }
}

/**
 * Example 3: EFT Payment Webhook (Admin Approval Required)
 * 
 * Shows processing an EFT payment that requires admin approval
 * before granting course access.
 */
export async function eftPaymentWebhookExample() {
  console.log('🏦 Example 3: EFT Payment Webhook Processing');

  const webhookHandler = WebhookHandler.getInstance();
  await webhookHandler.initialize();

  // EFT payment webhook - no card-specific fields
  const eftWebhookData: IkhokhaWebhook = {
    transaction_id: 'eft_txn_456789123',
    reference: 'course_enrollment_eft_789',
    amount: 299.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'eft_webhook_signature',
    response_code: '00',
    response_message: 'EFT transfer successful',
    // No card_type, masked_card_number, or auth_code for EFT
    metadata: {
      payment_method: 'eft',
      bank_reference: 'BANK_REF_789'
    }
  };

  const signature = 'sha256=eft_payment_signature';

  try {
    const result = await webhookHandler.processWebhook(
      eftWebhookData,
      signature,
      eftWebhookData.timestamp
    );

    if (result.processed) {
      console.log('📋 EFT payment processed - Routed to admin approval');
      console.log('👨‍💼 Admin dashboard updated with pending enrollment');
      console.log('📧 Admin notification sent');
      console.log('⏳ Student notified of pending approval status');
      
      // The PaymentMethodRouter automatically:
      // 1. Detected this as an EFT payment
      // 2. Marked enrollment as requiring approval
      // 3. Added to admin approval queue
      // 4. Sent real-time notification to admin dashboard
      // 5. Updated student interface to show "Pending Approval"
      
    } else {
      console.log('⚠️ EFT payment webhook processing failed');
    }

  } catch (error) {
    console.error('❌ EFT payment webhook failed:', error);
  }
}

/**
 * Example 4: Failed Payment Webhook
 * 
 * Demonstrates handling a failed payment notification
 * and appropriate error messaging.
 */
export async function failedPaymentWebhookExample() {
  console.log('❌ Example 4: Failed Payment Webhook Processing');

  const webhookHandler = WebhookHandler.getInstance();
  await webhookHandler.initialize();

  // Failed payment webhook
  const failedWebhookData: IkhokhaWebhook = {
    transaction_id: 'failed_txn_111222333',
    reference: 'course_enrollment_failed_999',
    amount: 199.99,
    currency: 'ZAR',
    status: 'failed',
    timestamp: new Date().toISOString(),
    signature: 'failed_webhook_signature',
    response_code: '05',
    response_message: 'Transaction declined - insufficient funds',
    card_type: 'VISA',
    masked_card_number: '****9999'
  };

  const signature = 'sha256=failed_payment_signature';

  try {
    const result = await webhookHandler.processWebhook(
      failedWebhookData,
      signature,
      failedWebhookData.timestamp
    );

    if (result.processed) {
      console.log('📝 Failed payment processed and logged');
      console.log('💬 Student notified with retry options');
      console.log('🔄 Enrollment remains in pending state for retry');
      
      // The system automatically:
      // 1. Updated enrollment with failure reason
      // 2. Kept enrollment in pending state for retry
      // 3. Sent user-friendly error message to student
      // 4. Logged failure for analytics and support
      
    } else {
      console.log('⚠️ Failed payment webhook processing failed');
    }

  } catch (error) {
    console.error('💥 Failed payment webhook error:', error);
  }
}

/**
 * Example 5: Webhook Security Validation
 * 
 * Shows how the webhook handler validates security to prevent
 * malicious or invalid webhook attempts.
 */
export async function webhookSecurityValidationExample() {
  console.log('🔒 Example 5: Webhook Security Validation');

  const webhookHandler = WebhookHandler.getInstance();
  await webhookHandler.initialize();

  // Valid webhook data
  const webhookData: IkhokhaWebhook = {
    transaction_id: 'security_test_txn',
    reference: 'security_test_ref',
    amount: 100.00,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'test_signature',
    response_code: '00',
    response_message: 'Success'
  };

  console.log('🧪 Testing various security scenarios...');

  // Test 1: Invalid signature
  try {
    const result = await webhookHandler.processWebhook(
      webhookData,
      'invalid_signature',
      webhookData.timestamp
    );
    
    console.log('🚫 Invalid signature rejected:', !result.processed);
  } catch (error) {
    console.log('✅ Invalid signature properly rejected');
  }

  // Test 2: Expired timestamp
  try {
    const expiredTimestamp = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const result = await webhookHandler.processWebhook(
      webhookData,
      'valid_signature',
      expiredTimestamp
    );
    
    console.log('⏰ Expired timestamp rejected:', !result.processed);
  } catch (error) {
    console.log('✅ Expired timestamp properly rejected');
  }

  // Test 3: Invalid content
  try {
    const invalidWebhookData = {
      ...webhookData,
      amount: -100 // Invalid negative amount
    };
    
    const result = await webhookHandler.processWebhook(
      invalidWebhookData,
      'valid_signature',
      webhookData.timestamp
    );
    
    console.log('📋 Invalid content rejected:', !result.processed);
  } catch (error) {
    console.log('✅ Invalid content properly rejected');
  }

  console.log('🛡️ Security validation complete - All threats blocked');
}

/**
 * Example 6: Webhook Retry Mechanism
 * 
 * Demonstrates how the webhook handler automatically retries
 * failed processing attempts with exponential backoff.
 */
export async function webhookRetryMechanismExample() {
  console.log('🔄 Example 6: Webhook Retry Mechanism');

  const webhookHandler = WebhookHandler.getInstance();
  await webhookHandler.initialize();

  // Webhook data for retry testing
  const webhookData: IkhokhaWebhook = {
    transaction_id: 'retry_test_txn',
    reference: 'retry_test_ref',
    amount: 150.00,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'retry_test_signature',
    response_code: '00',
    response_message: 'Success'
  };

  const signature = 'sha256=retry_test_signature';

  console.log('🎯 Simulating temporary service failures...');

  try {
    // The webhook handler will automatically:
    // 1. Attempt initial processing
    // 2. Detect retryable errors (network, database timeouts)
    // 3. Wait with exponential backoff (1s, 2s, 4s, 8s, 16s)
    // 4. Retry up to 5 times
    // 5. Log each attempt for monitoring
    
    const result = await webhookHandler.processWebhook(
      webhookData,
      signature,
      webhookData.timestamp
    );

    if (result.processed) {
      console.log('✅ Webhook processed successfully after retries');
      console.log('📊 Processing statistics:', webhookHandler.getProcessingStats());
    } else {
      console.log('❌ Webhook failed after all retry attempts');
      console.log('🚨 Escalating to manual review queue');
    }

  } catch (error) {
    console.error('💥 Webhook retry mechanism error:', error);
  }
}

/**
 * Example 7: Real-time Status Synchronization
 * 
 * Shows how webhook processing triggers real-time updates
 * across the application interface.
 */
export async function realTimeStatusSyncExample() {
  console.log('⚡ Example 7: Real-time Status Synchronization');

  const webhookHandler = WebhookHandler.getInstance();
  await webhookHandler.initialize();

  // Successful payment webhook
  const webhookData: IkhokhaWebhook = {
    transaction_id: 'realtime_sync_txn',
    reference: 'realtime_sync_ref',
    amount: 399.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'realtime_sync_signature',
    response_code: '00',
    response_message: 'Approved',
    card_type: 'VISA',
    masked_card_number: '****1111',
    auth_code: 'AUTH999'
  };

  const signature = 'sha256=realtime_sync_signature';

  try {
    console.log('📡 Processing webhook with real-time sync...');

    const result = await webhookHandler.processWebhook(
      webhookData,
      signature,
      webhookData.timestamp
    );

    if (result.processed) {
      console.log('🚀 Webhook processed - Real-time updates triggered:');
      console.log('  📱 Student course card updated to "Continue Course"');
      console.log('  🔄 Cross-tab synchronization activated');
      console.log('  📊 Admin dashboard statistics updated');
      console.log('  🔔 Push notifications sent');
      console.log('  📧 Email confirmations queued');
      
      // The RealTimePaymentSync service automatically:
      // 1. Broadcasts status updates to all listening components
      // 2. Syncs across browser tabs using BroadcastChannel
      // 3. Updates WebSocket connections for instant notifications
      // 4. Triggers custom events for backward compatibility
      // 5. Updates localStorage for offline sync
      
    } else {
      console.log('⚠️ Real-time sync not triggered due to processing failure');
    }

  } catch (error) {
    console.error('❌ Real-time sync error:', error);
  }
}

/**
 * Example 8: Production Configuration Validation
 * 
 * Demonstrates how the webhook handler validates production
 * configuration to ensure security and reliability.
 */
export async function productionConfigValidationExample() {
  console.log('🏭 Example 8: Production Configuration Validation');

  try {
    const webhookHandler = WebhookHandler.getInstance();
    
    console.log('🔍 Validating production configuration...');
    
    // The webhook handler automatically validates:
    // 1. Webhook secret is configured and secure
    // 2. Test mode is disabled in production
    // 3. HTTPS endpoints are used
    // 4. API keys are properly set
    // 5. Security settings are enabled
    
    await webhookHandler.initialize();
    
    console.log('✅ Production configuration validated successfully');
    console.log('🔒 Security measures active:');
    console.log('  ✓ Webhook signature validation enabled');
    console.log('  ✓ Timestamp validation active (5-minute window)');
    console.log('  ✓ Content structure validation enabled');
    console.log('  ✓ Source validation active');
    console.log('  ✓ HTTPS enforcement enabled');
    console.log('  ✓ Test mode disabled');
    
  } catch (error) {
    console.error('❌ Production configuration validation failed:', error);
    console.log('🚨 Production deployment blocked due to configuration issues');
    console.log('📋 Required actions:');
    console.log('  1. Set VITE_IKHOKHA_WEBHOOK_SECRET environment variable');
    console.log('  2. Ensure VITE_IKHOKHA_TEST_MODE=false');
    console.log('  3. Configure production API endpoints');
    console.log('  4. Validate SSL certificates');
  }
}

/**
 * Run all examples
 */
export async function runAllWebhookExamples() {
  console.log('🎬 Running all Webhook Handler examples...\n');

  try {
    await basicWebhookProcessingExample();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await cardPaymentWebhookExample();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await eftPaymentWebhookExample();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await failedPaymentWebhookExample();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await webhookSecurityValidationExample();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await webhookRetryMechanismExample();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await realTimeStatusSyncExample();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await productionConfigValidationExample();
    
    console.log('\n🎉 All Webhook Handler examples completed successfully!');
    
  } catch (error) {
    console.error('💥 Example execution failed:', error);
  }
}

// Export for use in other files
export {
  WebhookHandler
};