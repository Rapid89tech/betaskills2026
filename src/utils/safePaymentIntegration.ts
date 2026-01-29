/**
 * Safe Payment Integration Wrapper
 * 
 * This utility provides a safe wrapper around the payment integration
 * to prevent initialization errors from crashing the app.
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

// Mock payment integration for when the real one fails to initialize
const createMockPaymentIntegration = () => ({
  createPayment: async (request: any) => {
    logger.info('Using mock payment integration for testing');
    
    // Check if it's a test card
    const cardNumber = request.card_details?.card_number?.replace(/\s/g, '');
    
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
        payment_url: `${window.location.origin}/payment-success?course_id=${request.course_id || ''}&test=true`
      };
    }
    
    // For non-test cards, return unavailable message
    return { 
      success: false, 
      message: 'Payment system is currently in test mode. Please use a test card number or EFT payment option.',
      error: 'PAYMENT_SYSTEM_TEST_MODE'
    };
  },
  
  createRealPayment: async (request: any) => {
    logger.info('Using mock real payment integration for testing');
    
    // Check if it's a test card
    const cardNumber = request.card_details?.card_number?.replace(/\s/g, '');
    
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
        payment_url: `${window.location.origin}/payment-success?course_id=${request.course_id || ''}&test=true`
      };
    }
    
    // For non-test cards, return unavailable message
    return { 
      success: false, 
      message: 'Payment system is currently in test mode. Please use a test card number or EFT payment option.',
      error: 'PAYMENT_SYSTEM_TEST_MODE'
    };
  }
});

/**
 * Safely get the payment integration instance
 */
export const getSafePaymentIntegration = async () => {
  try {
    // Try to import the real payment integration
    const { ikhokhaPaymentIntegration } = await import('@/services/ikhokhaPaymentIntegration');
    return ikhokhaPaymentIntegration;
  } catch (error) {
    logger.error('Failed to load payment integration, using mock:', error);
    return createMockPaymentIntegration();
  }
};

/**
 * Safe payment creation that won't crash the app
 */
export const safeCreatePayment = async (paymentRequest: any) => {
  try {
    const paymentIntegration = await getSafePaymentIntegration();
    return await paymentIntegration.createPayment(paymentRequest);
  } catch (error) {
    logger.error('Payment creation failed:', error);
    return { 
      success: false, 
      message: 'Payment processing failed. Please try again later or use EFT payment option.',
      error: 'PAYMENT_PROCESSING_ERROR'
    };
  }
};

/**
 * Safe real payment creation that won't crash the app
 */
export const safeCreateRealPayment = async (paymentRequest: any) => {
  try {
    const paymentIntegration = await getSafePaymentIntegration();
    return await paymentIntegration.createRealPayment(paymentRequest);
  } catch (error) {
    logger.error('Real payment creation failed:', error);
    return { 
      success: false, 
      message: 'Payment processing failed. Please try again later or use EFT payment option.',
      error: 'PAYMENT_PROCESSING_ERROR'
    };
  }
};