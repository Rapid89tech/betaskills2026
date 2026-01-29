/**
 * PaymentErrorHandler service for processing payment errors and mapping them to user-friendly messages
 * Supports requirements 1.1-1.6 and 6.1-6.4
 */

import { PaymentError, ProcessedPaymentError, UserErrorMessage, ErrorContext } from '../types/paymentError';
import { ErrorMessageMapper } from '../utils/ErrorMessageMapper';
import { ProgressiveErrorHandler, ProgressiveErrorContext } from './ProgressiveErrorHandler';

export class PaymentErrorHandler {
  private static instance: PaymentErrorHandler;
  private errorLog: PaymentError[] = [];
  private progressiveErrorHandler: ProgressiveErrorHandler;

  private constructor() {
    this.progressiveErrorHandler = ProgressiveErrorHandler.getInstance();
  }

  /**
   * Singleton instance getter
   */
  static getInstance(): PaymentErrorHandler {
    if (!PaymentErrorHandler.instance) {
      PaymentErrorHandler.instance = new PaymentErrorHandler();
    }
    return PaymentErrorHandler.instance;
  }

  /**
   * Processes payment error and returns user-friendly processed error
   */
  processPaymentError(error: PaymentError, context?: ErrorContext): ProcessedPaymentError {
    // Log the error for debugging and analytics
    this.logPaymentError(error, context);

    // Normalize error code
    const normalizedCode = this.normalizeErrorCode(error.code, error.source);
    
    // Get user message from mapper
    const userMessage = this.getErrorMessage(normalizedCode, context);
    
    // Determine error properties
    const severity = this.determineSeverity(normalizedCode, context);
    const category = this.determineCategory(normalizedCode);
    const actionable = this.isActionable(normalizedCode);

    return {
      userMessage,
      severity,
      category,
      actionable
    };
  }

  /**
   * Processes payment error with progressive escalation based on user history
   */
  processPaymentErrorWithProgression(error: PaymentError, context?: ProgressiveErrorContext): ProcessedPaymentError {
    if (!context || (!context.userId && !context.attemptCount)) {
      // Fall back to basic processing if no progressive context
      return this.processPaymentError(error, context);
    }

    return this.progressiveErrorHandler.processProgressiveError(error, context);
  }

  /**
   * Gets user-friendly error message for given error code
   */
  getErrorMessage(errorCode: string, context?: ErrorContext): UserErrorMessage {
    return ErrorMessageMapper.mapErrorToUserMessage(errorCode, context);
  }

  /**
   * Logs payment error for debugging and analytics
   */
  logPaymentError(error: PaymentError, context?: ErrorContext): void {
    const logEntry = {
      ...error,
      timestamp: new Date().toISOString(),
      context: context || {}
    };

    // Add to in-memory log (in production, this would go to a proper logging service)
    this.errorLog.push(error);

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.error('Payment Error:', logEntry);
    }

    // In production, this would integrate with logging services like:
    // - Supabase error logging
    // - External monitoring services
    // - Analytics platforms
  }

  /**
   * Normalizes error codes from different payment sources
   */
  private normalizeErrorCode(code: string, source: PaymentError['source']): string {
    // Handle different error code formats from various sources
    const codeMap: Record<string, Record<string, string>> = {
      ikhokha: {
        'insufficient_funds': 'INSUFFICIENT_FUNDS',
        'expired_card': 'EXPIRED_CARD',
        'invalid_cvv': 'INVALID_CVV',
        'invalid_cvc': 'INVALID_CVV',
        'card_declined': 'CARD_BLOCKED',
        'processing_error': 'SYSTEM_ERROR',
        'timeout': 'TIMEOUT',
        'gateway_error': 'GATEWAY_UNAVAILABLE'
      },
      validation: {
        'invalid_card_number': 'INVALID_CARD_NUMBER',
        'invalid_expiry': 'EXPIRED_CARD',
        'invalid_cvv': 'INVALID_CVV',
        'test_card_error': 'INVALID_TEST_CARD'
      },
      network: {
        'timeout': 'TIMEOUT',
        'connection_error': 'GATEWAY_UNAVAILABLE',
        'network_error': 'GATEWAY_UNAVAILABLE'
      },
      system: {
        'internal_error': 'SYSTEM_ERROR',
        'service_unavailable': 'GATEWAY_UNAVAILABLE',
        'unknown_error': 'SYSTEM_ERROR'
      }
    };

    const sourceMap = codeMap[source];
    const mappedCode = sourceMap?.[code.toLowerCase()];
    if (mappedCode) {
      return mappedCode;
    }

    // Return normalized uppercase version if no mapping found
    return code.toUpperCase().replace(/\s+/g, '_');
  }

  /**
   * Determines error severity based on code and context
   */
  private determineSeverity(errorCode: string, context?: ErrorContext): ProcessedPaymentError['severity'] {
    const highSeverityErrors = ['CARD_BLOCKED', 'SECURITY_DECLINE', 'SYSTEM_ERROR'];
    const lowSeverityErrors = ['INVALID_CVV', 'INVALID_CARD_NUMBER'];
    const infoErrors = ['INVALID_TEST_CARD', 'TEST_CARD_DECLINED'];

    if (infoErrors.includes(errorCode)) return 'low';
    if (highSeverityErrors.includes(errorCode)) return 'high';
    if (lowSeverityErrors.includes(errorCode)) return 'low';

    // Consider attempt count for severity escalation
    if (context?.attemptCount && context.attemptCount > 3) {
      return 'high';
    }

    return 'medium';
  }

  /**
   * Determines error category based on error code
   */
  private determineCategory(errorCode: string): ProcessedPaymentError['category'] {
    const cardErrors = ['INSUFFICIENT_FUNDS', 'EXPIRED_CARD', 'INVALID_CVV', 'CARD_BLOCKED', 'SECURITY_DECLINE'];
    const networkErrors = ['TIMEOUT', 'GATEWAY_UNAVAILABLE'];
    const validationErrors = ['INVALID_CARD_NUMBER', 'INVALID_TEST_CARD', 'TEST_CARD_DECLINED'];
    const systemErrors = ['SYSTEM_ERROR', 'PAYMENT_INTERRUPTED'];

    if (cardErrors.includes(errorCode)) return 'card';
    if (networkErrors.includes(errorCode)) return 'network';
    if (validationErrors.includes(errorCode)) return 'validation';
    if (systemErrors.includes(errorCode)) return 'system';

    return 'system'; // Default fallback
  }

  /**
   * Determines if error is actionable by the user
   */
  private isActionable(errorCode: string): boolean {
    const nonActionableErrors = ['SYSTEM_ERROR', 'GATEWAY_UNAVAILABLE'];
    return !nonActionableErrors.includes(errorCode);
  }

  /**
   * Creates PaymentError from various error sources
   */
  static createPaymentError(
    code: string, 
    message: string, 
    source: PaymentError['source'], 
    details?: any
  ): PaymentError {
    return {
      code,
      message,
      source,
      details
    };
  }

  /**
   * Creates PaymentError from Ikhokha response
   */
  static createFromIkhokhaResponse(response: any): PaymentError {
    return {
      code: response.error_code || response.status || 'UNKNOWN_ERROR',
      message: response.error_message || response.message || 'Unknown payment error',
      source: 'ikhokha',
      details: response
    };
  }

  /**
   * Creates PaymentError from validation failure
   */
  static createFromValidation(field: string, message: string): PaymentError {
    return {
      code: `INVALID_${field.toUpperCase()}`,
      message,
      source: 'validation'
    };
  }

  /**
   * Creates PaymentError from network issue
   */
  static createFromNetworkError(error: Error): PaymentError {
    const isTimeout = error.message.toLowerCase().includes('timeout');
    
    return {
      code: isTimeout ? 'TIMEOUT' : 'NETWORK_ERROR',
      message: error.message,
      source: 'network',
      details: { originalError: error }
    };
  }

  /**
   * Gets error statistics for analytics
   */
  getErrorStatistics(): { [key: string]: number } {
    const stats: { [key: string]: number } = {};
    
    this.errorLog.forEach(error => {
      const normalizedCode = this.normalizeErrorCode(error.code, error.source);
      stats[normalizedCode] = (stats[normalizedCode] || 0) + 1;
    });

    return stats;
  }

  /**
   * Clears error log (useful for testing)
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }
}