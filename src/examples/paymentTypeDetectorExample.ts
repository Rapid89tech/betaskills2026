/**
 * PaymentTypeDetector Usage Examples
 * 
 * Demonstrates how to use the PaymentTypeDetector service for detecting
 * payment types from webhook data with confidence scoring and detailed analysis.
 */

import { paymentTypeDetector } from '../services/PaymentTypeDetector';
import { IkhokhaWebhook, PaymentType } from '../types/ikhokha';

/**
 * Example 1: Basic Card Payment Detection
 */
export async function cardPaymentDetectionExample() {
  console.log('🔍 Example 1: Card Payment Detection\n');

  const cardWebhookData: IkhokhaWebhook = {
    transaction_id: 'txn_card_001',
    reference: 'CARD_PAY_001',
    amount: 299.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'test_signature',
    response_code: '00', // Card success code
    response_message: 'Transaction approved',
    card_type: 'VISA',
    masked_card_number: '****1234',
    auth_code: 'AUTH123456'
  };

  try {
    // Basic detection
    const detection = paymentTypeDetector.detectPaymentType(cardWebhookData);
    
    console.log('✅ Card Payment Detection Result:');
    console.log(`   Type: ${detection.type}`);
    console.log(`   Confidence: ${Math.round(detection.confidence * 100)}%`);
    console.log(`   Indicators Found: ${detection.indicators.length}`);
    
    detection.indicators.forEach((indicator, index) => {
      console.log(`   ${index + 1}. ${indicator.description} (weight: ${indicator.weight})`);
    });

    console.log(`   Card Type: ${detection.metadata.cardType}`);
    console.log(`   Masked Card: ${detection.metadata.maskedCardNumber}`);
    console.log(`   Auth Code: ${detection.metadata.authCode}`);

    // Verify using convenience methods
    const isCard = paymentTypeDetector.isCardPayment(cardWebhookData);
    const isEFT = paymentTypeDetector.isEFTPayment(cardWebhookData);
    
    console.log(`\n🎯 Verification:`);
    console.log(`   Is Card Payment: ${isCard}`);
    console.log(`   Is EFT Payment: ${isEFT}`);

  } catch (error) {
    console.error('❌ Card payment detection failed:', error);
  }
}

/**
 * Example 2: EFT Payment Detection
 */
export async function eftPaymentDetectionExample() {
  console.log('\n🔍 Example 2: EFT Payment Detection\n');

  const eftWebhookData: IkhokhaWebhook = {
    transaction_id: 'txn_eft_002',
    reference: 'EFT_TRANSFER_002',
    amount: 1500.00,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago (slower processing)
    signature: 'test_signature',
    response_code: '000', // EFT success code
    response_message: 'Bank transfer completed successfully',
    metadata: {
      transfer_type: 'eft',
      bank_reference: 'BNK789012',
      clearing_code: 'CC001'
    }
  };

  try {
    // Basic detection
    const detection = paymentTypeDetector.detectPaymentType(eftWebhookData);
    
    console.log('✅ EFT Payment Detection Result:');
    console.log(`   Type: ${detection.type}`);
    console.log(`   Confidence: ${Math.round(detection.confidence * 100)}%`);
    console.log(`   Indicators Found: ${detection.indicators.length}`);
    
    detection.indicators.forEach((indicator, index) => {
      console.log(`   ${index + 1}. ${indicator.description} (weight: ${indicator.weight})`);
    });

    console.log(`   Bank Reference: ${detection.metadata.bankReference}`);
    console.log(`   Transfer Type: ${detection.metadata.transferType}`);

    // Verify using convenience methods
    const isCard = paymentTypeDetector.isCardPayment(eftWebhookData);
    const isEFT = paymentTypeDetector.isEFTPayment(eftWebhookData);
    
    console.log(`\n🎯 Verification:`);
    console.log(`   Is Card Payment: ${isCard}`);
    console.log(`   Is EFT Payment: ${isEFT}`);

  } catch (error) {
    console.error('❌ EFT payment detection failed:', error);
  }
}

/**
 * Example 3: Enhanced Analysis with Enrollment Context
 */
export async function enhancedAnalysisExample() {
  console.log('\n🔬 Example 3: Enhanced Payment Analysis\n');

  const webhookData: IkhokhaWebhook = {
    transaction_id: 'txn_enhanced_003',
    reference: 'CORP_PAYMENT_003',
    amount: 2500.00,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'test_signature',
    response_code: '01',
    response_message: 'MASTERCARD transaction approved',
    card_type: 'MASTERCARD',
    masked_card_number: '****5678'
  };

  const enrollmentData = {
    id: 'enr_003',
    userId: 'user_003',
    courseId: 'course_advanced_programming',
    amount: 2500.00,
    currency: 'ZAR',
    userEmail: 'manager@techcorp.co.za',
    userName: 'Sarah Johnson',
    createdAt: new Date()
  };

  try {
    // Enhanced analysis
    const analysis = paymentTypeDetector.analyzePaymentMethod(webhookData, enrollmentData);
    
    console.log('✅ Enhanced Analysis Result:');
    console.log(`   Primary Type: ${analysis.primaryType}`);
    console.log(`   Confidence: ${Math.round(analysis.confidence * 100)}%`);
    console.log(`   Alternative Type: ${analysis.alternativeType || 'None'}`);

    // Webhook analysis details
    console.log(`\n📊 Webhook Analysis:`);
    console.log(`   Card Indicators: ${analysis.analysisDetails.webhookAnalysis.cardIndicators.length}`);
    console.log(`   EFT Indicators: ${analysis.analysisDetails.webhookAnalysis.eftIndicators.length}`);
    console.log(`   Response Code Category: ${analysis.analysisDetails.webhookAnalysis.responseCodeAnalysis.category}`);
    console.log(`   Overall Card Score: ${analysis.analysisDetails.webhookAnalysis.fieldPresenceAnalysis.overallCardScore}`);

    // Pattern analysis
    console.log(`\n🔍 Pattern Analysis:`);
    console.log(`   Reference Patterns: ${analysis.analysisDetails.patternAnalysis.referencePatterns.length}`);
    console.log(`   Amount Patterns: ${analysis.analysisDetails.patternAnalysis.amountPatterns.length}`);
    console.log(`   Timing Patterns: ${analysis.analysisDetails.patternAnalysis.timingPatterns.length}`);

    // Customer data analysis
    console.log(`\n👤 Customer Analysis:`);
    console.log(`   Email Domain: ${analysis.analysisDetails.metadataAnalysis.customerDataAnalysis.emailDomain}`);
    console.log(`   Corporate Indicators: ${analysis.analysisDetails.metadataAnalysis.customerDataAnalysis.corporateIndicators}`);
    console.log(`   Personal Indicators: ${analysis.analysisDetails.metadataAnalysis.customerDataAnalysis.personalIndicators}`);

    // Transaction context
    console.log(`\n⏰ Transaction Context:`);
    console.log(`   Time of Day: ${analysis.analysisDetails.metadataAnalysis.transactionContextAnalysis.timeOfDay}`);
    console.log(`   Day of Week: ${analysis.analysisDetails.metadataAnalysis.transactionContextAnalysis.dayOfWeek}`);

    // Recommendations
    if (analysis.recommendations.length > 0) {
      console.log(`\n💡 Recommendations:`);
      analysis.recommendations.forEach((rec, index) => {
        console.log(`   ${index + 1}. ${rec}`);
      });
    }

  } catch (error) {
    console.error('❌ Enhanced analysis failed:', error);
  }
}

/**
 * Example 4: Unknown Payment Type Handling
 */
export async function unknownPaymentTypeExample() {
  console.log('\n❓ Example 4: Unknown Payment Type Handling\n');

  const unknownWebhookData: IkhokhaWebhook = {
    transaction_id: 'txn_unknown_004',
    reference: 'MYSTERY_PAYMENT_004',
    amount: 750.00,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'test_signature',
    response_code: '999', // Unknown response code
    response_message: 'Transaction processed via unknown method'
  };

  try {
    const detection = paymentTypeDetector.detectPaymentType(unknownWebhookData);
    
    console.log('✅ Unknown Payment Detection Result:');
    console.log(`   Type: ${detection.type}`);
    console.log(`   Confidence: ${Math.round(detection.confidence * 100)}%`);
    console.log(`   Indicators Found: ${detection.indicators.length}`);

    if (detection.type === 'unknown') {
      console.log('\n⚠️ Payment type could not be determined with confidence');
      console.log('   Recommended action: Route to manual review');
      console.log('   Fallback: Default to manual approval workflow');
    }

    // Show how this would be handled in practice
    const confidence = paymentTypeDetector.getPaymentTypeConfidence(detection);
    console.log(`\n🎯 Confidence Score: ${Math.round(confidence * 100)}%`);
    
    if (confidence < 0.6) {
      console.log('   ⚠️ Low confidence - recommend manual review');
    } else if (confidence < 0.8) {
      console.log('   ⚡ Medium confidence - proceed with caution');
    } else {
      console.log('   ✅ High confidence - safe to auto-process');
    }

  } catch (error) {
    console.error('❌ Unknown payment type detection failed:', error);
  }
}

/**
 * Example 5: Batch Processing Multiple Webhooks
 */
export async function batchProcessingExample() {
  console.log('\n📦 Example 5: Batch Processing Multiple Webhooks\n');

  const webhooks: IkhokhaWebhook[] = [
    {
      transaction_id: 'txn_batch_001',
      reference: 'VISA_001',
      amount: 199.99,
      currency: 'ZAR',
      status: 'completed',
      timestamp: new Date().toISOString(),
      signature: 'test_signature',
      response_code: '00',
      response_message: 'VISA approved',
      card_type: 'VISA',
      masked_card_number: '****1111'
    },
    {
      transaction_id: 'txn_batch_002',
      reference: 'EFT_BANK_002',
      amount: 500.00,
      currency: 'ZAR',
      status: 'completed',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      signature: 'test_signature',
      response_code: '000',
      response_message: 'Bank transfer successful'
    },
    {
      transaction_id: 'txn_batch_003',
      reference: 'MASTERCARD_003',
      amount: 89.50,
      currency: 'ZAR',
      status: 'completed',
      timestamp: new Date().toISOString(),
      signature: 'test_signature',
      response_code: '02',
      response_message: 'MASTERCARD approved',
      card_type: 'MASTERCARD'
    }
  ];

  try {
    console.log(`Processing ${webhooks.length} webhooks...\n`);

    const results = webhooks.map((webhook, index) => {
      const detection = paymentTypeDetector.detectPaymentType(webhook);
      
      console.log(`${index + 1}. Transaction ${webhook.transaction_id}:`);
      console.log(`   Type: ${detection.type}`);
      console.log(`   Confidence: ${Math.round(detection.confidence * 100)}%`);
      console.log(`   Indicators: ${detection.indicators.length}`);
      
      return {
        transactionId: webhook.transaction_id,
        detectedType: detection.type,
        confidence: detection.confidence,
        shouldAutoApprove: detection.type === 'card' && detection.confidence > 0.6,
        requiresManualReview: detection.type === 'unknown' || detection.confidence < 0.6
      };
    });

    // Summary
    console.log('\n📊 Batch Processing Summary:');
    const cardPayments = results.filter(r => r.detectedType === 'card').length;
    const eftPayments = results.filter(r => r.detectedType === 'eft').length;
    const unknownPayments = results.filter(r => r.detectedType === 'unknown').length;
    const autoApprove = results.filter(r => r.shouldAutoApprove).length;
    const manualReview = results.filter(r => r.requiresManualReview).length;

    console.log(`   Card Payments: ${cardPayments}`);
    console.log(`   EFT Payments: ${eftPayments}`);
    console.log(`   Unknown Payments: ${unknownPayments}`);
    console.log(`   Auto-Approve: ${autoApprove}`);
    console.log(`   Manual Review: ${manualReview}`);

  } catch (error) {
    console.error('❌ Batch processing failed:', error);
  }
}

/**
 * Example 6: Integration with Webhook Handler
 */
export async function webhookIntegrationExample() {
  console.log('\n🔗 Example 6: Webhook Handler Integration\n');

  const webhookData: IkhokhaWebhook = {
    transaction_id: 'txn_integration_006',
    reference: 'INTEGRATION_TEST_006',
    amount: 399.99,
    currency: 'ZAR',
    status: 'completed',
    timestamp: new Date().toISOString(),
    signature: 'test_signature',
    response_code: '00',
    response_message: 'Transaction approved',
    card_type: 'VISA',
    auth_code: 'AUTH789'
  };

  try {
    console.log('🔍 Step 1: Detect payment type');
    const detection = paymentTypeDetector.detectPaymentType(webhookData);
    
    console.log(`   Detected Type: ${detection.type}`);
    console.log(`   Confidence: ${Math.round(detection.confidence * 100)}%`);

    console.log('\n🚦 Step 2: Determine routing decision');
    let routingDecision: string;
    let shouldAutoApprove: boolean;

    if (detection.type === 'card' && detection.confidence > 0.6) {
      routingDecision = 'immediate_approval';
      shouldAutoApprove = true;
      console.log('   ⚡ Route to: Immediate Approval (Card Payment Fast-Track)');
    } else if (detection.type === 'eft' && detection.confidence > 0.6) {
      routingDecision = 'admin_approval';
      shouldAutoApprove = false;
      console.log('   👨‍💼 Route to: Admin Approval Workflow (EFT Payment)');
    } else {
      routingDecision = 'manual_review';
      shouldAutoApprove = false;
      console.log('   🔍 Route to: Manual Review (Low Confidence/Unknown)');
    }

    console.log('\n📋 Step 3: Processing summary');
    console.log(`   Transaction ID: ${webhookData.transaction_id}`);
    console.log(`   Payment Type: ${detection.type.toUpperCase()}`);
    console.log(`   Auto-Approve: ${shouldAutoApprove ? 'YES' : 'NO'}`);
    console.log(`   Routing: ${routingDecision}`);
    console.log(`   Confidence: ${Math.round(detection.confidence * 100)}%`);

    if (shouldAutoApprove) {
      console.log('\n✅ Result: Student will receive immediate course access');
    } else {
      console.log('\n⏳ Result: Payment requires approval before course access');
    }

  } catch (error) {
    console.error('❌ Webhook integration example failed:', error);
  }
}

/**
 * Run all PaymentTypeDetector examples
 */
export async function runAllPaymentTypeDetectorExamples() {
  console.log('🚀 PaymentTypeDetector Examples\n');
  console.log('='.repeat(60));

  try {
    await cardPaymentDetectionExample();
    await eftPaymentDetectionExample();
    await enhancedAnalysisExample();
    await unknownPaymentTypeExample();
    await batchProcessingExample();
    await webhookIntegrationExample();
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ All PaymentTypeDetector examples completed successfully!');
    console.log('\n💡 Key Features Demonstrated:');
    console.log('   • Card vs EFT payment detection');
    console.log('   • Confidence scoring system');
    console.log('   • Enhanced analysis with enrollment context');
    console.log('   • Unknown payment type handling');
    console.log('   • Batch processing capabilities');
    console.log('   • Webhook handler integration');

  } catch (error) {
    console.error('❌ Examples failed:', error);
  }
}

// Export individual functions for testing
export {
  paymentTypeDetector
};