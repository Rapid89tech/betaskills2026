/**
 * Simple Safe Payment Integration
 * 
 * This provides a direct mock payment system that always works for testing
 */

import { logger } from './logger';

// Test card numbers that should be accepted for testing
const TEST_CARDS = {
  '4111111111111111': 'Visa Test Card',
  '5555555555554444': 'Mastercard Test Card',
  '378282246310005': 'American Express Test Card',
  '4000000000000002': 'Visa Test Card (Declined)',
  '5200000000000007': 'Mastercard Test Card (Declined)'
};

/**
 * Simple safe payment creation that always works for testing
 */
export const simpleSafeCreatePayment = async (paymentRequest: any) => {
  logger.info('Using simple safe payment integration for testing');
  
  // Check if it's a test card
  const cardNumber = paymentRequest.card_details?.card_number?.replace(/\s/g, '');
  
  if (TEST_CARDS[cardNumber as keyof typeof TEST_CARDS]) {
    const cardName = TEST_CARDS[cardNumber as keyof typeof TEST_CARDS];
    
    // Simulate declined cards
    if (cardName.includes('Declined')) {
      return {
        success: false,
        message: 'Card declined. Please try a different card or use EFT payment.',
        error: 'CARD_DECLINED'
      };
    }
    
    // Simulate successful payment for test cards
    logger.info(`Test card accepted: ${cardName}`);
    return {
      success: true,
      message: 'Test payment successful! You will be enrolled shortly.',
      payment_id: `test_payment_${Date.now()}`,
      payment_url: `${window.location.origin}/payment-success?course_id=${paymentRequest.course_id || ''}&test=true`
    };
  }
  
  // For non-test cards, provide helpful guidance
  return { 
    success: false, 
    message: 'Please use a test card number: 4111 1111 1111 1111 (Visa) or 5555 5555 5555 4444 (Mastercard)',
    error: 'INVALID_TEST_CARD'
  };
};

/**
 * Simple safe real payment creation that always works for testing
 */
export const simpleSafeCreateRealPayment = async (paymentRequest: any) => {
  // Use the same logic as regular payment for testing
  return simpleSafeCreatePayment(paymentRequest);
};