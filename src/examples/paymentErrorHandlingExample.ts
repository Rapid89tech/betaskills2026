/**
 * Example usage of the Payment Error Handling infrastructure
 * Demonstrates how to use PaymentErrorHandler and ErrorMessageMapper
 */

import { PaymentErrorHandler } from '../services/PaymentErrorHandler';
import { PaymentError, ErrorContext } from '../types/paymentError';

// Example: Processing an Ikhokha payment error
export function handleIkhokhaPaymentError() {
  const handler = PaymentErrorHandler.getInstance();
  
  // Simulate an Ikhokha error response
  const ikhokhaError = PaymentErrorHandler.createFromIkhokhaResponse({
    error_code: 'insufficient_funds',
    error_message: 'Transaction declined due to insufficient funds',
    status: 'failed'
  });

  const context: ErrorContext = {
    userId: 'user123',
    courseId: 'course456',
    paymentMethod: 'card',
    attemptCount: 1,
    isTestMode: false
  };

  const processedError = handler.processPaymentError(ikhokhaError, context);
  
  console.log('Processed Error:', {
    title: processedError.userMessage.title,
    description: processedError.userMessage.description,
    actions: processedError.userMessage.actions,
    severity: processedError.severity,
    category: processedError.category
  });

  return processedError;
}

// Example: Processing a validation error
export function handleValidationError() {
  const handler = PaymentErrorHandler.getInstance();
  
  const validationError = PaymentErrorHandler.createFromValidation(
    'cvv',
    'Invalid CVV provided'
  );

  const context: ErrorContext = {
    attemptCount: 1,
    isTestMode: false
  };

  const processedError = handler.processPaymentError(validationError, context);
  
  return processedError;
}

// Example: Processing a network error
export function handleNetworkError() {
  const handler = PaymentErrorHandler.getInstance();
  
  const networkError = PaymentErrorHandler.createFromNetworkError(
    new Error('Request timeout after 30 seconds')
  );

  const processedError = handler.processPaymentError(networkError);
  
  return processedError;
}

// Example: Processing a test mode error
export function handleTestModeError() {
  const handler = PaymentErrorHandler.getInstance();
  
  const testError = PaymentErrorHandler.createPaymentError(
    'INVALID_TEST_CARD',
    'Invalid test card used in development mode',
    'validation'
  );

  const context: ErrorContext = {
    isTestMode: true,
    attemptCount: 1
  };

  const processedError = handler.processPaymentError(testError, context);
  
  return processedError;
}

// Example: Multiple attempt error handling
export function handleMultipleAttemptError() {
  const handler = PaymentErrorHandler.getInstance();
  
  const cardError = PaymentErrorHandler.createPaymentError(
    'CARD_BLOCKED',
    'Card has been blocked by issuing bank',
    'ikhokha'
  );

  const context: ErrorContext = {
    attemptCount: 4, // Multiple attempts
    paymentMethod: 'card'
  };

  const processedError = handler.processPaymentError(cardError, context);
  
  // Should show escalated messaging with bank contact suggestion
  return processedError;
}

// Example: Getting error statistics
export function getErrorAnalytics() {
  const handler = PaymentErrorHandler.getInstance();
  
  // Simulate some errors for statistics
  handleIkhokhaPaymentError();
  handleValidationError();
  handleNetworkError();
  
  const stats = handler.getErrorStatistics();
  console.log('Error Statistics:', stats);
  
  return stats;
}