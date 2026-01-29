/**
 * PaymentHandler Service
 * 
 * Handles different payment types (EFT vs Card) with appropriate workflows,
 * payment validation, callback handling, and error management.
 * 
 * This service implements the PaymentHandler interface from the design document
 * and provides payment processing functionality for the real-time enrollment system.
 */

import { 
  PaymentDetails, 
  PaymentResult, 
  PaymentCallback, 
  PaymentType, 
  PaymentStatus 
} from '@/types/enrollment';
import { 
  ENROLLMENT_CONFIG, 
  ENROLLMENT_ERROR_CODES, 
  ENROLLMENT_ERROR_MESSAGES 
} from '@/constants/enrollment';

/**
 * Payment Handler Interface
 */
export interface IPaymentHandler {
  processPayment(type: PaymentType, details: PaymentDetails): Promise<PaymentResult>;
  validatePayment(paymentId: string): Promise<boolean>;
  handlePaymentCallback(callback: PaymentCallback): void;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
  cancelPayment(paymentId: string): Promise<boolean>;
}

/**
 * EFT Payment Processor Interface
 */
interface EFTPaymentProcessor {
  generateReference(details: PaymentDetails): string;
  validateReference(reference: string): Promise<boolean>;
  checkPaymentStatus(reference: string): Promise<PaymentStatus>;
}

/**
 * Payment Handler Implementation (EFT Only)
 */
export class PaymentHandler implements IPaymentHandler {
  private static instance: PaymentHandler;
  private paymentCallbacks: Map<string, (callback: PaymentCallback) => void> = new Map();
  private paymentStatuses: Map<string, PaymentStatus> = new Map();
  private eftProcessor: EFTPaymentProcessor | null = null;

  private constructor() {
    this.initializeEFTProcessor();
  }

  static getInstance(): PaymentHandler {
    if (!PaymentHandler.instance) {
      PaymentHandler.instance = new PaymentHandler();
    }
    return PaymentHandler.instance;
  }

  /**
   * Initialize EFT payment processor
   */
  private initializeEFTProcessor(): void {
    // EFT payment processor
    this.eftProcessor = {
      generateReference: (details: PaymentDetails): string => {
        return this.mockCardPayment(details);
      },
      validateCard: async (cardDetails: any): Promise<boolean> => {
        return this.mockCardValidation(cardDetails);
      },
      refundPayment: async (paymentId: string): Promise<boolean> => {
        return this.mockRefund(paymentId);
      }
    };

    // Mock EFT processor
    this.eftProcessor = {
      generateReference: (details: PaymentDetails): string => {
        return this.generateEFTReference(details);
      },
      validateReference: async (reference: string): Promise<boolean> => {
        return this.validateEFTReference(reference);
      },
      checkPaymentStatus: async (reference: string): Promise<PaymentStatus> => {
        return this.checkEFTStatus(reference);
      }
    };

    console.log('✅ PaymentHandler initialized with mock gateways');
  }

  /**
   * Process payment based on type
   */
  async processPayment(type: PaymentType, details: PaymentDetails): Promise<PaymentResult> {
    try {
      console.log(`💳 Processing ${type} payment:`, { type, amount: details.amount });

      // Validate payment details
      const validationResult = this.validatePaymentDetails(details);
      if (!validationResult.isValid) {
        return {
          success: false,
          error: validationResult.error,
          errorCode: ENROLLMENT_ERROR_CODES.VALIDATION_ERROR
        };
      }

      // Only EFT payments are supported
      if (type !== PaymentType.EFT) {
        return {
          success: false,
          error: 'Only EFT payments are supported',
          errorCode: ENROLLMENT_ERROR_CODES.INVALID_PAYMENT_TYPE
        };
      }
      
      return await this.processEFTPayment(details);
    } catch (error: any) {
      console.error('❌ Error processing payment:', error);
      return {
        success: false,
        error: error.message || ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED],
        errorCode: ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED
      };
    }
  }



  /**
   * Process EFT payment with pending approval workflow
   */
  private async processEFTPayment(details: PaymentDetails): Promise<PaymentResult> {
    try {
      if (!this.eftProcessor) {
        throw new Error('EFT processor not initialized');
      }

      console.log('🏦 Processing EFT payment...');

      // Generate EFT reference
      const reference = this.eftProcessor.generateReference(details);
      const paymentId = `eft_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      // Store payment status as pending
      this.paymentStatuses.set(paymentId, PaymentStatus.PENDING);

      console.log('✅ EFT payment initiated:', { paymentId, reference });

      // Trigger pending approval callback
      setTimeout(() => {
        this.triggerPaymentCallback({
          paymentId,
          status: PaymentStatus.PENDING,
          reference,
          metadata: {
            paymentType: PaymentType.EFT,
            requiresApproval: true,
            initiatedAt: new Date().toISOString()
          }
        });
      }, 0);

      return {
        success: true,
        paymentId,
        error: undefined,
        errorCode: undefined
      };

    } catch (error: any) {
      console.error('❌ EFT payment error:', error);
      return {
        success: false,
        error: error.message || ENROLLMENT_ERROR_MESSAGES[ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED],
        errorCode: ENROLLMENT_ERROR_CODES.PAYMENT_PROCESSING_FAILED
      };
    }
  }

  /**
   * Validate payment by ID
   */
  async validatePayment(paymentId: string): Promise<boolean> {
    try {
      console.log('🔍 Validating payment:', paymentId);

      // Check if payment exists in our records
      if (!this.paymentStatuses.has(paymentId)) {
        console.log('❌ Payment not found:', paymentId);
        return false;
      }

      const status = this.paymentStatuses.get(paymentId);
      const isValid = status === PaymentStatus.COMPLETED;

      console.log(`${isValid ? '✅' : '❌'} Payment validation result:`, { paymentId, status, isValid });
      
      return isValid;

    } catch (error: any) {
      console.error('❌ Error validating payment:', error);
      return false;
    }
  }

  /**
   * Handle payment callback
   */
  handlePaymentCallback(callback: PaymentCallback): void {
    try {
      console.log('📞 Handling payment callback:', callback);

      // Update payment status
      this.paymentStatuses.set(callback.paymentId, callback.status);

      // Trigger registered callbacks
      this.triggerPaymentCallback(callback);

      // Log callback handling
      console.log('✅ Payment callback handled successfully:', callback.paymentId);

    } catch (error: any) {
      console.error('❌ Error handling payment callback:', error);
    }
  }

  /**
   * Get payment status
   */
  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    try {
      const status = this.paymentStatuses.get(paymentId);
      
      if (!status) {
        console.log('❌ Payment status not found:', paymentId);
        return PaymentStatus.FAILED;
      }

      console.log('📊 Payment status retrieved:', { paymentId, status });
      return status;

    } catch (error: any) {
      console.error('❌ Error getting payment status:', error);
      return PaymentStatus.FAILED;
    }
  }

  /**
   * Cancel payment
   */
  async cancelPayment(paymentId: string): Promise<boolean> {
    try {
      console.log('❌ Cancelling payment:', paymentId);

      // Update payment status to failed
      this.paymentStatuses.set(paymentId, PaymentStatus.FAILED);

      // Trigger cancellation callback
      this.triggerPaymentCallback({
        paymentId,
        status: PaymentStatus.FAILED,
        metadata: {
          cancelled: true,
          cancelledAt: new Date().toISOString()
        }
      });

      console.log('✅ Payment cancelled successfully:', paymentId);
      return true;

    } catch (error: any) {
      console.error('❌ Error cancelling payment:', error);
      return false;
    }
  }

  /**
   * Register payment callback listener
   */
  registerPaymentCallback(paymentId: string, callback: (result: PaymentCallback) => void): void {
    this.paymentCallbacks.set(paymentId, callback);
  }

  /**
   * Unregister payment callback listener
   */
  unregisterPaymentCallback(paymentId: string): void {
    this.paymentCallbacks.delete(paymentId);
  }

  /**
   * Private helper methods
   */

  private validatePaymentDetails(details: PaymentDetails): { isValid: boolean; error?: string } {
    if (!details.amount || details.amount <= 0) {
      return { isValid: false, error: 'Invalid payment amount' };
    }

    if (!details.currency) {
      return { isValid: false, error: 'Currency is required' };
    }

    return { isValid: true };
  }

  private triggerPaymentCallback(callback: PaymentCallback): void {
    // Trigger specific payment callback if registered
    const specificCallback = this.paymentCallbacks.get(callback.paymentId);
    if (specificCallback) {
      try {
        specificCallback(callback);
      } catch (error) {
        console.error('❌ Error in specific payment callback:', error);
      }
    }

    // Dispatch browser event for cross-component communication
    try {
      window.dispatchEvent(new CustomEvent('payment-callback', {
        detail: callback
      }));
    } catch (error) {
      console.error('❌ Error dispatching payment callback event:', error);
    }
  }

  /**
   * Mock payment gateway implementations
   * (These would be replaced with real payment gateway integrations)
   */



  private generateEFTReference(_details: PaymentDetails): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `EFT${timestamp}${random}`;
  }

  private async validateEFTReference(reference: string): Promise<boolean> {
    // Mock EFT reference validation
    return Promise.resolve(reference.startsWith('EFT') && reference.length >= 10);
  }

  private async checkEFTStatus(_reference: string): Promise<PaymentStatus> {
    // Mock EFT status checking
    // In real implementation, this would check with banking systems
    return Promise.resolve(PaymentStatus.PENDING);
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.paymentCallbacks.clear();
    this.paymentStatuses.clear();
    console.log('🧹 PaymentHandler resources cleaned up');
  }
}

// Export singleton instance
export const paymentHandler = PaymentHandler.getInstance();

// Export types for external use
export type { IPaymentHandler };