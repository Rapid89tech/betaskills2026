/**
 * Card Payment Fast-Track Service Usage Examples
 * 
 * This file demonstrates how to use the CardPaymentFastTrack service
 * for immediate enrollment approval and course access granting.
 */

import { cardPaymentFastTrack } from '../services/CardPaymentFastTrack';
import { paymentTypeDetector } from '../services/PaymentTypeDetector';
import {
  IkhokhaWebhook,
  EnrollmentStatus,
  PaymentStatus,
  PaymentType
} from '../types/ikhokha';

/**
 * Example 1: Basic Card Payment Fast-Track Processing
 * 
 * This example shows how to process a successful card payment webhook
 * and immediately approve the enrollment with course access.
 */
export async function basicCardPaymentFastTrack() {
  console.log('🚀 Example 1: Basic Card Payment Fast-Track Processing');

  // Sample webhook data from Ikhokha for a successful card payment
  const webhookData: IkhokhaWebhook = {
    transaction_id: 'txn_card_20241002_001',
    reference: 'enrollment_ref_12345',
    amount: 299.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'sha256=abc123def456...',
    response_code: '00', // Success code for card payments
    response_message: 'Transaction approved',
    auth_code: 'AUTH789123',
    card_type: 'visa',
    masked_card_number: '****1234',
    merchant_reference: 'MERCHANT_REF_001'
  };

  // Sample enrollment data
  const enrollmentData = {
    id: 'enrollment_12345',
    user_id: 'user_67890',
    user_email: 'student@example.com',
    course_id: 'course_ai_programming',
    course_title: 'AI-Assisted Programming',
    status: EnrollmentStatus.PENDING,
    payment_type: PaymentType.CARD,
    payment_status: PaymentStatus.PENDING,
    payment_reference: 'enrollment_ref_12345',
    created_at: new Date(),
    updated_at: new Date(),
    course_access_granted: false
  };

  try {
    // Initialize the fast-track service
    await cardPaymentFastTrack.initialize();

    // Process the card payment for immediate approval
    const result = await cardPaymentFastTrack.processCardPayment(
      webhookData,
      enrollmentData
    );

    console.log('✅ Fast-track processing result:', {
      success: result.success,
      enrollmentApproved: result.enrollmentApproved,
      accessGranted: result.accessGranted,
      processingTime: `${result.processingTimeMs}ms`,
      auditSteps: result.auditTrail.length
    });

    if (result.success) {
      console.log('🎉 Student now has immediate access to the course!');
      
      // The enrollment status is now approved
      // The course access is granted
      // Real-time UI updates have been triggered
      // Audit trail has been logged
    } else {
      console.log('❌ Fast-track processing failed:', result.error?.message);
    }

  } catch (error) {
    console.error('❌ Example failed:', error);
  }
}

/**
 * Example 2: Integration with Payment Type Detection
 * 
 * This example shows how to combine payment type detection
 * with fast-track processing for automatic routing.
 */
export async function integratedPaymentProcessing() {
  console.log('🔍 Example 2: Integrated Payment Processing with Type Detection');

  const webhookData: IkhokhaWebhook = {
    transaction_id: 'txn_mixed_20241002_002',
    reference: 'enrollment_ref_67890',
    amount: 199.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'sha256=def456ghi789...',
    response_code: '00',
    response_message: 'Payment successful',
    card_type: 'mastercard',
    masked_card_number: '****5678'
  };

  const enrollmentData = {
    id: 'enrollment_67890',
    user_id: 'user_11111',
    user_email: 'learner@example.com',
    course_id: 'course_web_dev',
    course_title: 'Web Development Fundamentals',
    status: EnrollmentStatus.PENDING,
    payment_type: PaymentType.CARD,
    payment_status: PaymentStatus.PENDING,
    payment_reference: 'enrollment_ref_67890',
    created_at: new Date(),
    updated_at: new Date(),
    course_access_granted: false
  };

  try {
    // Step 1: Detect payment type
    const paymentTypeResult = paymentTypeDetector.detectPaymentType(webhookData);
    
    console.log('🔍 Payment type detection:', {
      type: paymentTypeResult.type,
      confidence: `${Math.round(paymentTypeResult.confidence * 100)}%`,
      indicators: paymentTypeResult.indicators.length
    });

    // Step 2: Route based on payment type
    if (paymentTypeResult.type === 'card' && paymentTypeResult.confidence > 0.6) {
      console.log('💳 Card payment detected - routing to fast-track approval');
      
      // Initialize and process with fast-track
      await cardPaymentFastTrack.initialize();
      const fastTrackResult = await cardPaymentFastTrack.processCardPayment(
        webhookData,
        enrollmentData
      );

      console.log('⚡ Fast-track result:', {
        approved: fastTrackResult.enrollmentApproved,
        accessGranted: fastTrackResult.accessGranted,
        processingTime: `${fastTrackResult.processingTimeMs}ms`
      });

    } else if (paymentTypeResult.type === 'eft') {
      console.log('🏦 EFT payment detected - routing to admin approval queue');
      // Would route to admin approval workflow
      
    } else {
      console.log('❓ Unknown payment type - routing to manual review');
      // Would route to manual review process
    }

  } catch (error) {
    console.error('❌ Integrated processing failed:', error);
  }
}

/**
 * Example 3: Handling Different Payment Scenarios
 * 
 * This example demonstrates how the fast-track service handles
 * various payment scenarios and edge cases.
 */
export async function paymentScenarioHandling() {
  console.log('🎭 Example 3: Payment Scenario Handling');

  // Initialize service once
  await cardPaymentFastTrack.initialize();

  // Scenario 1: Successful card payment
  console.log('\n📝 Scenario 1: Successful Card Payment');
  await processPaymentScenario({
    transaction_id: 'txn_success_001',
    reference: 'ref_success_001',
    amount: 149.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'valid_signature',
    response_code: '00',
    response_message: 'Approved',
    card_type: 'visa',
    masked_card_number: '****1111'
  }, 'Successful card payment should be approved immediately');

  // Scenario 2: Failed payment
  console.log('\n📝 Scenario 2: Failed Payment');
  await processPaymentScenario({
    transaction_id: 'txn_failed_001',
    reference: 'ref_failed_001',
    amount: 149.99,
    currency: 'ZAR',
    status: 'failed',
    timestamp: new Date().toISOString(),
    signature: 'valid_signature',
    response_code: '05',
    response_message: 'Declined'
  }, 'Failed payment should not be processed');

  // Scenario 3: Already approved enrollment
  console.log('\n📝 Scenario 3: Already Approved Enrollment');
  const approvedEnrollment = createSampleEnrollment('enrollment_approved_001');
  approvedEnrollment.status = EnrollmentStatus.APPROVED;
  
  await processPaymentScenario({
    transaction_id: 'txn_duplicate_001',
    reference: 'ref_duplicate_001',
    amount: 149.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'valid_signature',
    response_code: '00',
    response_message: 'Approved',
    card_type: 'mastercard',
    masked_card_number: '****2222'
  }, 'Already approved enrollment should be handled gracefully', approvedEnrollment);
}

/**
 * Example 4: Monitoring and Audit Trail
 * 
 * This example shows how to access and interpret the audit trail
 * and monitoring information from fast-track processing.
 */
export async function monitoringAndAuditExample() {
  console.log('📊 Example 4: Monitoring and Audit Trail');

  const webhookData: IkhokhaWebhook = {
    transaction_id: 'txn_audit_001',
    reference: 'ref_audit_001',
    amount: 399.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'audit_signature',
    response_code: '00',
    response_message: 'Transaction successful',
    auth_code: 'AUTH999',
    card_type: 'amex',
    masked_card_number: '****9999'
  };

  const enrollmentData = createSampleEnrollment('enrollment_audit_001');

  try {
    await cardPaymentFastTrack.initialize();
    
    // Process payment and capture detailed results
    const result = await cardPaymentFastTrack.processCardPayment(
      webhookData,
      enrollmentData
    );

    // Display comprehensive audit information
    console.log('📋 Audit Trail Analysis:');
    console.log(`Total processing steps: ${result.auditTrail.length}`);
    console.log(`Processing time: ${result.processingTimeMs}ms`);
    console.log(`Success rate: ${result.success ? '100%' : '0%'}`);

    // Analyze each audit step
    result.auditTrail.forEach((entry, index) => {
      console.log(`\n  Step ${index + 1}: ${entry.action}`);
      console.log(`    Result: ${entry.result}`);
      console.log(`    Timestamp: ${entry.timestamp.toISOString()}`);
      console.log(`    Details: ${JSON.stringify(entry.details, null, 2)}`);
      
      if (entry.processingTimeMs) {
        console.log(`    Step Duration: ${entry.processingTimeMs}ms`);
      }
    });

    // Get service statistics
    const stats = cardPaymentFastTrack.getProcessingStats();
    console.log('\n📈 Service Statistics:', stats);

    // Error analysis if applicable
    if (result.error) {
      console.log('\n❌ Error Analysis:');
      console.log(`  Code: ${result.error.code}`);
      console.log(`  Message: ${result.error.message}`);
      console.log(`  Recoverable: ${result.error.recoverable}`);
      console.log(`  Details: ${JSON.stringify(result.error.details, null, 2)}`);
    }

  } catch (error) {
    console.error('❌ Monitoring example failed:', error);
  }
}

/**
 * Helper function to process a payment scenario
 */
async function processPaymentScenario(
  webhookData: IkhokhaWebhook,
  description: string,
  enrollmentData?: any
) {
  console.log(`\n  Testing: ${description}`);
  
  const enrollment = enrollmentData || createSampleEnrollment(`enrollment_${webhookData.transaction_id}`);
  
  try {
    const result = await cardPaymentFastTrack.processCardPayment(webhookData, enrollment);
    
    console.log(`  ✅ Result: ${result.success ? 'SUCCESS' : 'FAILED'}`);
    console.log(`  📊 Approved: ${result.enrollmentApproved}, Access: ${result.accessGranted}`);
    console.log(`  ⏱️  Time: ${result.processingTimeMs}ms`);
    
    if (result.error) {
      console.log(`  ❌ Error: ${result.error.code} - ${result.error.message}`);
    }
    
  } catch (error) {
    console.log(`  ❌ Exception: ${error}`);
  }
}

/**
 * Helper function to create sample enrollment data
 */
function createSampleEnrollment(enrollmentId: string) {
  return {
    id: enrollmentId,
    user_id: `user_${Date.now()}`,
    user_email: 'test@example.com',
    course_id: 'course_sample',
    course_title: 'Sample Course',
    status: EnrollmentStatus.PENDING,
    payment_type: PaymentType.CARD,
    payment_status: PaymentStatus.PENDING,
    payment_reference: `ref_${enrollmentId}`,
    created_at: new Date(),
    updated_at: new Date(),
    course_access_granted: false
  };
}

/**
 * Run all examples
 */
export async function runAllCardPaymentFastTrackExamples() {
  console.log('🚀 Running Card Payment Fast-Track Examples\n');
  
  try {
    await basicCardPaymentFastTrack();
    console.log('\n' + '='.repeat(60) + '\n');
    
    await integratedPaymentProcessing();
    console.log('\n' + '='.repeat(60) + '\n');
    
    await paymentScenarioHandling();
    console.log('\n' + '='.repeat(60) + '\n');
    
    await monitoringAndAuditExample();
    
    console.log('\n✅ All Card Payment Fast-Track examples completed!');
    
  } catch (error) {
    console.error('❌ Examples failed:', error);
  } finally {
    // Cleanup
    cardPaymentFastTrack.cleanup();
  }
}

// Export individual examples for selective testing
export {
  basicCardPaymentFastTrack,
  integratedPaymentProcessing,
  paymentScenarioHandling,
  monitoringAndAuditExample
};