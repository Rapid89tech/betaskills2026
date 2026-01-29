/**
 * Payment Enrollment Integration Example
 * 
 * Demonstrates how to use the PaymentEnrollmentIntegration service
 * for automatic payment detection and enrollment status assignment.
 */

import { paymentEnrollmentIntegration } from '../services/PaymentEnrollmentIntegration';
import { PaymentType, PaymentStatus, EnrollmentStatus } from '@/types/ikhokha';
import type { IkhokhaWebhook } from '@/types/ikhokha';

/**
 * Example: Processing a card payment webhook
 */
export async function processCardPaymentExample(): Promise<void> {
  console.log('🔄 Processing Card Payment Example');

  try {
    // Initialize the integration service
    await paymentEnrollmentIntegration.initialize();

    // Mock card payment webhook data
    const cardWebhook: IkhokhaWebhook = {
      transaction_id: 'txn_card_12345',
      reference: 'CARD_PAY_12345',
      amount: 299.99,
      currency: 'ZAR',
      status: 'completed',
      timestamp: new Date().toISOString(),
      signature: 'card_signature_hash',
      response_code: '00', // Card success code
      response_message: 'Transaction approved',
      card_type: 'VISA',
      masked_card_number: '****1234',
      auth_code: 'AUTH123456'
    };

    // Mock enrollment data
    const enrollmentData = {
      enrollmentId: 'enr_card_001',
      userId: 'user_001',
      courseId: 'course_plumbing_101',
      userEmail: 'student@example.com',
      courseName: 'Plumbing 101 - Basic Skills',
      amount: 299.99,
      currency: 'ZAR'
    };

    // Process the payment webhook
    const result = await paymentEnrollmentIntegration.processPaymentWebhook(
      cardWebhook,
      enrollmentData
    );

    console.log('✅ Card Payment Processing Result:', {
      success: result.success,
      paymentType: result.paymentType, // Should be CARD
      status: result.status, // Should be APPROVED
      accessGranted: result.accessGranted, // Should be true
      confidence: Math.round(result.confidence * 100) + '%',
      processingTime: result.processingTimeMs + 'ms',
      message: result.message
    });

    // Expected outcome:
    // - Payment type detected as CARD with high confidence
    // - Enrollment status automatically set to APPROVED
    // - Course access granted immediately
    // - Real-time updates sent to user and admin dashboard

  } catch (error) {
    console.error('❌ Card payment processing failed:', error);
  }
}

/**
 * Example: Processing an EFT payment webhook
 */
export async function processEFTPaymentExample(): Promise<void> {
  console.log('🔄 Processing EFT Payment Example');

  try {
    // Mock EFT payment webhook data
    const eftWebhook: IkhokhaWebhook = {
      transaction_id: 'txn_eft_67890',
      reference: 'EFT_TRANSFER_67890',
      amount: 500.00,
      currency: 'ZAR',
      status: 'completed',
      timestamp: new Date().toISOString(),
      signature: 'eft_signature_hash',
      response_code: '000', // EFT success code
      response_message: 'Bank transfer completed successfully',
      metadata: {
        transfer_type: 'eft',
        bank_reference: 'BNK789012'
      }
    };

    // Mock enrollment data
    const enrollmentData = {
      enrollmentId: 'enr_eft_002',
      userId: 'user_002',
      courseId: 'course_electrical_101',
      userEmail: 'student2@example.com',
      courseName: 'Electrical Basics - Safety First',
      amount: 500.00,
      currency: 'ZAR'
    };

    // Process the payment webhook
    const result = await paymentEnrollmentIntegration.processPaymentWebhook(
      eftWebhook,
      enrollmentData
    );

    console.log('✅ EFT Payment Processing Result:', {
      success: result.success,
      paymentType: result.paymentType, // Should be EFT
      status: result.status, // Should be PENDING
      accessGranted: result.accessGranted, // Should be false
      confidence: Math.round(result.confidence * 100) + '%',
      processingTime: result.processingTimeMs + 'ms',
      message: result.message
    });

    // Expected outcome:
    // - Payment type detected as EFT with good confidence
    // - Enrollment status set to PENDING (requires admin approval)
    // - Course access NOT granted (awaiting approval)
    // - Admin notification sent for manual approval

  } catch (error) {
    console.error('❌ EFT payment processing failed:', error);
  }
}

/**
 * Example: Real-time payment status monitoring
 */
export async function monitorPaymentStatusExample(): Promise<void> {
  console.log('👀 Payment Status Monitoring Example');

  try {
    const enrollmentId = 'enr_monitor_003';

    // Set up real-time monitoring
    const unsubscribe = await paymentEnrollmentIntegration.monitorPaymentStatus(
      enrollmentId,
      (paymentStatus: PaymentStatus, enrollmentStatus: EnrollmentStatus) => {
        console.log('📡 Real-time Status Update:', {
          enrollmentId,
          paymentStatus,
          enrollmentStatus,
          timestamp: new Date().toISOString()
        });

        // Handle different status combinations
        if (paymentStatus === PaymentStatus.COMPLETED && enrollmentStatus === EnrollmentStatus.APPROVED) {
          console.log('🎉 Payment completed and enrollment approved - Student can access course!');
        } else if (paymentStatus === PaymentStatus.COMPLETED && enrollmentStatus === EnrollmentStatus.PENDING) {
          console.log('⏳ Payment completed but enrollment pending - Awaiting admin approval');
        } else if (paymentStatus === PaymentStatus.FAILED) {
          console.log('❌ Payment failed - Student needs to retry payment');
        }
      }
    );

    console.log('✅ Monitoring started for enrollment:', enrollmentId);
    console.log('📞 Call unsubscribe() to stop monitoring');

    // In a real application, you would keep this running
    // For this example, we'll unsubscribe after a short delay
    setTimeout(() => {
      unsubscribe();
      console.log('🛑 Monitoring stopped');
    }, 5000);

  } catch (error) {
    console.error('❌ Payment monitoring setup failed:', error);
  }
}

/**
 * Example: Determining enrollment status based on payment type
 */
export function enrollmentStatusDeterminationExample(): void {
  console.log('🎯 Enrollment Status Determination Examples');

  // Card payment scenarios
  const cardApproved = paymentEnrollmentIntegration.determineEnrollmentStatus(PaymentType.CARD, true);
  const cardFailed = paymentEnrollmentIntegration.determineEnrollmentStatus(PaymentType.CARD, false);

  console.log('💳 Card Payment Status Determination:');
  console.log(`  Successful card payment → ${cardApproved}`); // APPROVED
  console.log(`  Failed card payment → ${cardFailed}`); // PENDING

  // EFT payment scenarios
  const eftCompleted = paymentEnrollmentIntegration.determineEnrollmentStatus(PaymentType.EFT, true);
  const eftFailed = paymentEnrollmentIntegration.determineEnrollmentStatus(PaymentType.EFT, false);

  console.log('🏦 EFT Payment Status Determination:');
  console.log(`  Successful EFT payment → ${eftCompleted}`); // PENDING (needs approval)
  console.log(`  Failed EFT payment → ${eftFailed}`); // PENDING

  // Manual payment scenarios
  const manualCompleted = paymentEnrollmentIntegration.determineEnrollmentStatus(PaymentType.MANUAL, true);

  console.log('👤 Manual Payment Status Determination:');
  console.log(`  Manual payment → ${manualCompleted}`); // PENDING (needs review)
}

/**
 * Example: Checking immediate access eligibility
 */
export function immediateAccessExample(): void {
  console.log('⚡ Immediate Access Determination Examples');

  // Test different payment scenarios
  const scenarios = [
    { type: PaymentType.CARD, success: true, description: 'Successful card payment' },
    { type: PaymentType.CARD, success: false, description: 'Failed card payment' },
    { type: PaymentType.EFT, success: true, description: 'Successful EFT payment' },
    { type: PaymentType.EFT, success: false, description: 'Failed EFT payment' },
    { type: PaymentType.MANUAL, success: true, description: 'Manual payment' }
  ];

  scenarios.forEach(scenario => {
    const hasAccess = paymentEnrollmentIntegration.shouldGrantImmediateAccess(
      scenario.type,
      scenario.success
    );

    console.log(`${hasAccess ? '✅' : '❌'} ${scenario.description}: ${hasAccess ? 'Immediate access' : 'No immediate access'}`);
  });
}

/**
 * Example: Classifying existing enrollment payments
 */
export async function classifyExistingEnrollmentExample(): Promise<void> {
  console.log('🔍 Existing Enrollment Classification Example');

  try {
    // Mock enrollment IDs for different scenarios
    const enrollmentIds = [
      'enr_approved_001', // Likely card payment
      'enr_pending_002',  // Likely EFT payment
      'enr_unknown_003'   // Unknown status
    ];

    for (const enrollmentId of enrollmentIds) {
      const classification = await paymentEnrollmentIntegration.classifyEnrollmentPayment(enrollmentId);

      console.log(`📋 Enrollment ${enrollmentId}:`, {
        paymentType: classification.paymentType,
        confidence: Math.round(classification.confidence * 100) + '%',
        requiresApproval: classification.requiresApproval
      });
    }

  } catch (error) {
    console.error('❌ Enrollment classification failed:', error);
  }
}

/**
 * Example: Service health monitoring
 */
export function serviceHealthExample(): void {
  console.log('🏥 Service Health Status Example');

  const health = paymentEnrollmentIntegration.getHealthStatus();

  console.log('📊 Integration Service Health:', {
    initialized: health.initialized ? '✅' : '❌',
    paymentDetector: health.paymentDetectorAvailable ? '✅' : '❌',
    paymentRouter: health.routerAvailable ? '✅' : '❌',
    realTimeSync: health.realTimeSyncAvailable ? '✅' : '❌',
    enrollmentManager: health.enrollmentManagerAvailable ? '✅' : '❌'
  });

  if (health.initialized && 
      health.paymentDetectorAvailable && 
      health.routerAvailable && 
      health.realTimeSyncAvailable && 
      health.enrollmentManagerAvailable) {
    console.log('🎉 All systems operational - Ready to process payments!');
  } else {
    console.log('⚠️ Some services are not available - Check system configuration');
  }
}

/**
 * Run all examples
 */
export async function runAllExamples(): Promise<void> {
  console.log('🚀 Payment Enrollment Integration Examples\n');

  try {
    // Basic status determination examples (no async)
    enrollmentStatusDeterminationExample();
    console.log('');

    immediateAccessExample();
    console.log('');

    serviceHealthExample();
    console.log('');

    // Async examples
    await processCardPaymentExample();
    console.log('');

    await processEFTPaymentExample();
    console.log('');

    await monitorPaymentStatusExample();
    console.log('');

    await classifyExistingEnrollmentExample();
    console.log('');

    console.log('✅ All examples completed successfully!');

  } catch (error) {
    console.error('❌ Example execution failed:', error);
  } finally {
    // Cleanup
    paymentEnrollmentIntegration.cleanup();
    console.log('🧹 Service cleaned up');
  }
}

// Export individual examples for selective testing
export {
  processCardPaymentExample,
  processEFTPaymentExample,
  monitorPaymentStatusExample,
  enrollmentStatusDeterminationExample,
  immediateAccessExample,
  classifyExistingEnrollmentExample,
  serviceHealthExample
};

// Auto-run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples().catch(console.error);
}