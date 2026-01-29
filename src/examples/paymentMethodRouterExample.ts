/**
 * PaymentMethodRouter Usage Examples
 * 
 * Demonstrates how to use the PaymentMethodRouter service for detecting
 * payment methods and routing them through appropriate approval workflows.
 */

import { paymentMethodRouter } from '../services/PaymentMethodRouter';
import { 
  PaymentType, 
  PaymentStatus, 
  PaymentResult,
  IkhokhaWebhook,
  PaymentData
} from '../types/ikhokha';

/**
 * Example 1: Card Payment Processing
 * 
 * Shows how card payments are automatically approved and granted immediate access.
 */
export async function processCardPayment() {
  console.log('🔄 Processing Card Payment Example');

  // Simulate successful card payment result
  const cardPaymentResult: PaymentResult = {
    success: true,
    payment_id: 'pay_card_12345',
    transaction_id: 'txn_card_12345',
    status: PaymentStatus.COMPLETED,
    amount: 299.99,
    currency: 'ZAR',
    reference: 'course_enrollment_card_12345',
    message: 'Card payment successful'
  };

  // Payment context with card method
  const cardContext = {
    paymentMethod: 'visa_card',
    paymentData: {
      sessionId: 'session_card_12345',
      amount: 299.99,
      currency: 'ZAR',
      reference: 'course_enrollment_card_12345',
      customer: {
        email: 'student@example.com',
        name: 'John Student'
      },
      paymentMethod: 'card'
    } as PaymentData
  };

  try {
    // Step 1: Detect payment method
    const detection = await paymentMethodRouter.detectPaymentMethod(cardContext);
    console.log('✅ Payment method detected:', {
      paymentType: detection.paymentType,
      requiresApproval: detection.requiresApproval,
      routingDecision: detection.routingDecision
    });

    // Step 2: Route payment through approval workflow
    const routingResult = await paymentMethodRouter.routePayment(
      'enrollment_card_12345',
      cardPaymentResult,
      cardContext
    );

    console.log('✅ Card payment routing result:', {
      success: routingResult.success,
      approved: routingResult.approved,
      accessGranted: routingResult.accessGranted,
      message: routingResult.message
    });

    // Step 3: Get persistence data for database storage
    const persistenceData = paymentMethodRouter.getPaymentTypePersistenceData(
      detection.paymentType,
      cardPaymentResult
    );

    console.log('💾 Persistence data:', persistenceData);

    return routingResult;

  } catch (error) {
    console.error('❌ Card payment processing failed:', error);
    throw error;
  }
}

/**
 * Example 2: EFT Payment Processing
 * 
 * Shows how EFT payments are routed to admin approval workflow.
 */
export async function processEFTPayment() {
  console.log('🔄 Processing EFT Payment Example');

  // Simulate successful EFT payment result
  const eftPaymentResult: PaymentResult = {
    success: true,
    payment_id: 'pay_eft_12345',
    transaction_id: 'txn_eft_12345',
    status: PaymentStatus.COMPLETED,
    amount: 299.99,
    currency: 'ZAR',
    reference: 'eft_course_enrollment_12345',
    message: 'EFT payment received'
  };

  // Payment context with EFT method
  const eftContext = {
    paymentMethod: 'eft_transfer',
    paymentData: {
      sessionId: 'session_eft_12345',
      amount: 299.99,
      currency: 'ZAR',
      reference: 'eft_course_enrollment_12345',
      customer: {
        email: 'student@example.com',
        name: 'Jane Student'
      },
      paymentMethod: 'eft'
    } as PaymentData
  };

  try {
    // Step 1: Detect payment method
    const detection = await paymentMethodRouter.detectPaymentMethod(eftContext);
    console.log('✅ Payment method detected:', {
      paymentType: detection.paymentType,
      requiresApproval: detection.requiresApproval,
      routingDecision: detection.routingDecision
    });

    // Step 2: Route payment through approval workflow
    const routingResult = await paymentMethodRouter.routePayment(
      'enrollment_eft_12345',
      eftPaymentResult,
      eftContext
    );

    console.log('✅ EFT payment routing result:', {
      success: routingResult.success,
      approved: routingResult.approved,
      accessGranted: routingResult.accessGranted,
      message: routingResult.message
    });

    // Step 3: Check approval requirements
    const requiresApproval = paymentMethodRouter.shouldRequireApproval(detection.paymentType);
    console.log('🔍 Approval required:', requiresApproval);

    return routingResult;

  } catch (error) {
    console.error('❌ EFT payment processing failed:', error);
    throw error;
  }
}

/**
 * Example 3: Webhook-Based Payment Detection
 * 
 * Shows how to detect payment methods from webhook data.
 */
export async function processWebhookPayment() {
  console.log('🔄 Processing Webhook Payment Example');

  // Simulate webhook data for card payment
  const webhookData: IkhokhaWebhook = {
    transaction_id: 'txn_webhook_12345',
    reference: 'course_payment_webhook_12345',
    amount: 199.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'webhook_signature_12345',
    response_code: '00',
    response_message: 'Approved',
    card_type: 'mastercard',
    masked_card_number: '****5678',
    auth_code: 'AUTH456'
  };

  const paymentResult: PaymentResult = {
    success: true,
    payment_id: 'pay_webhook_12345',
    transaction_id: 'txn_webhook_12345',
    status: PaymentStatus.COMPLETED,
    amount: 199.99,
    currency: 'ZAR',
    reference: 'course_payment_webhook_12345'
  };

  const webhookContext = { webhookData };

  try {
    // Detect payment method from webhook
    const detection = await paymentMethodRouter.detectPaymentMethod(webhookContext);
    console.log('✅ Webhook payment method detected:', {
      paymentType: detection.paymentType,
      routingDecision: detection.routingDecision,
      indicators: {
        hasCardType: !!webhookData.card_type,
        hasMaskedCard: !!webhookData.masked_card_number,
        hasAuthCode: !!webhookData.auth_code
      }
    });

    // Route webhook payment
    const routingResult = await paymentMethodRouter.routePayment(
      'enrollment_webhook_12345',
      paymentResult,
      webhookContext
    );

    console.log('✅ Webhook payment routing result:', routingResult);

    return routingResult;

  } catch (error) {
    console.error('❌ Webhook payment processing failed:', error);
    throw error;
  }
}

/**
 * Example 4: Failed Payment Handling
 * 
 * Shows how failed payments are handled gracefully.
 */
export async function processFailedPayment() {
  console.log('🔄 Processing Failed Payment Example');

  // Simulate failed payment result
  const failedPaymentResult: PaymentResult = {
    success: false,
    status: PaymentStatus.FAILED,
    message: 'Payment declined by bank',
    error: {
      code: 'PAYMENT_DECLINED',
      message: 'Insufficient funds',
      details: { bank_response: 'NSF' }
    }
  };

  const failedContext = {
    paymentMethod: 'visa_card',
    paymentData: {
      sessionId: 'session_failed_12345',
      amount: 299.99,
      currency: 'ZAR',
      reference: 'failed_payment_12345',
      customer: {
        email: 'student@example.com',
        name: 'Failed Student'
      }
    } as PaymentData
  };

  try {
    // Route failed payment
    const routingResult = await paymentMethodRouter.routePayment(
      'enrollment_failed_12345',
      failedPaymentResult,
      failedContext
    );

    console.log('✅ Failed payment handling result:', {
      success: routingResult.success, // Should be true (successfully handled)
      approved: routingResult.approved, // Should be false
      accessGranted: routingResult.accessGranted, // Should be false
      message: routingResult.message,
      error: routingResult.error
    });

    return routingResult;

  } catch (error) {
    console.error('❌ Failed payment handling failed:', error);
    throw error;
  }
}

/**
 * Example 5: Comprehensive Payment Processing Workflow
 * 
 * Shows a complete workflow from payment initiation to completion.
 */
export async function comprehensivePaymentWorkflow() {
  console.log('🔄 Comprehensive Payment Workflow Example');

  const scenarios = [
    {
      name: 'Card Payment',
      context: { paymentMethod: 'visa' },
      paymentResult: {
        success: true,
        payment_id: 'pay_comprehensive_card',
        transaction_id: 'txn_comprehensive_card',
        status: PaymentStatus.COMPLETED,
        amount: 399.99,
        currency: 'ZAR',
        reference: 'comprehensive_card_payment'
      } as PaymentResult
    },
    {
      name: 'EFT Payment',
      context: { paymentMethod: 'eft_transfer' },
      paymentResult: {
        success: true,
        payment_id: 'pay_comprehensive_eft',
        transaction_id: 'txn_comprehensive_eft',
        status: PaymentStatus.COMPLETED,
        amount: 399.99,
        currency: 'ZAR',
        reference: 'comprehensive_eft_payment'
      } as PaymentResult
    }
  ];

  const results = [];

  for (const scenario of scenarios) {
    console.log(`\n📋 Processing ${scenario.name}:`);

    try {
      // Detect payment method
      const detection = await paymentMethodRouter.detectPaymentMethod(scenario.context);
      
      // Route payment
      const routingResult = await paymentMethodRouter.routePayment(
        `enrollment_${scenario.name.toLowerCase().replace(' ', '_')}`,
        scenario.paymentResult,
        scenario.context
      );

      // Get persistence data
      const persistenceData = paymentMethodRouter.getPaymentTypePersistenceData(
        detection.paymentType,
        scenario.paymentResult
      );

      const result = {
        scenario: scenario.name,
        detection,
        routing: routingResult,
        persistence: persistenceData
      };

      console.log(`✅ ${scenario.name} completed:`, {
        paymentType: detection.paymentType,
        approved: routingResult.approved,
        accessGranted: routingResult.accessGranted,
        requiresApproval: persistenceData.requires_approval
      });

      results.push(result);

    } catch (error) {
      console.error(`❌ ${scenario.name} failed:`, error);
      results.push({
        scenario: scenario.name,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  console.log('\n📊 Workflow Summary:');
  results.forEach(result => {
    if ('error' in result) {
      console.log(`❌ ${result.scenario}: ${result.error}`);
    } else {
      console.log(`✅ ${result.scenario}: ${result.detection.paymentType} -> ${result.routing.approved ? 'APPROVED' : 'PENDING'}`);
    }
  });

  return results;
}

/**
 * Run all examples
 */
export async function runAllExamples() {
  console.log('🚀 Running PaymentMethodRouter Examples\n');

  try {
    await processCardPayment();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await processEFTPayment();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await processWebhookPayment();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await processFailedPayment();
    console.log('\n' + '='.repeat(50) + '\n');
    
    await comprehensivePaymentWorkflow();
    
    console.log('\n✅ All PaymentMethodRouter examples completed successfully!');

  } catch (error) {
    console.error('❌ Example execution failed:', error);
    throw error;
  }
}

// Export individual functions for testing
export {
  paymentMethodRouter
};