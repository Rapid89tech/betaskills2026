/**
 * ErrorMessageMapper utility for standardized error code translations
 * Supports requirements 1.1-1.6 and 6.1-6.4
 */

import { UserErrorMessage, ErrorMessageTemplate, ErrorContext } from '../types/paymentError';

export class ErrorMessageMapper {
  private static errorTemplates: Map<string, ErrorMessageTemplate> = new Map([
    // Card decline errors (Requirements 1.1-1.6)
    ['INSUFFICIENT_FUNDS', {
      code: 'INSUFFICIENT_FUNDS',
      category: 'card',
      title: 'Payment Declined',
      description: 'Payment declined: Insufficient funds. Please check your account balance or try a different card.',
      actions: ['try_different_card', 'try_eft', 'contact_support'],
      severity: 'medium'
    }],
    ['EXPIRED_CARD', {
      code: 'EXPIRED_CARD',
      category: 'card',
      title: 'Payment Declined',
      description: 'Payment declined: Your card has expired. Please use a different card or contact your bank.',
      actions: ['try_different_card', 'contact_support'],
      severity: 'medium'
    }],
    ['INVALID_CVV', {
      code: 'INVALID_CVV',
      category: 'card',
      title: 'Payment Declined',
      description: 'Payment declined: Invalid security code (CVV). Please check the 3-digit code on the back of your card.',
      actions: ['retry', 'try_different_card'],
      severity: 'low'
    }],
    ['INVALID_CARD_NUMBER', {
      code: 'INVALID_CARD_NUMBER',
      category: 'validation',
      title: 'Payment Declined',
      description: 'Payment declined: Invalid card number. Please check your card details and try again.',
      actions: ['retry', 'try_different_card'],
      severity: 'low'
    }],
    ['CARD_BLOCKED', {
      code: 'CARD_BLOCKED',
      category: 'card',
      title: 'Payment Declined',
      description: 'Payment declined: Your card has been blocked. Please contact your bank or try a different card.',
      actions: ['contact_support', 'try_different_card', 'try_eft'],
      severity: 'high'
    }],
    ['SECURITY_DECLINE', {
      code: 'SECURITY_DECLINE',
      category: 'card',
      title: 'Payment Declined',
      description: 'Payment declined: Transaction blocked for security reasons. Please contact your bank or try a different payment method.',
      actions: ['contact_support', 'try_different_card', 'try_eft'],
      severity: 'high'
    }],
    
    // Network and system errors (Requirements 4.1-4.4)
    ['TIMEOUT', {
      code: 'TIMEOUT',
      category: 'network',
      title: 'Payment Timeout',
      description: 'Payment timeout: Connection to payment gateway timed out. Please check your internet connection and try again.',
      actions: ['retry', 'try_eft', 'contact_support'],
      severity: 'medium'
    }],
    ['GATEWAY_UNAVAILABLE', {
      code: 'GATEWAY_UNAVAILABLE',
      category: 'network',
      title: 'Service Unavailable',
      description: 'Payment service temporarily unavailable: Please try again in a few minutes or use the EFT payment option.',
      actions: ['retry', 'try_eft', 'contact_support'],
      severity: 'medium'
    }],
    ['SYSTEM_ERROR', {
      code: 'SYSTEM_ERROR',
      category: 'system',
      title: 'System Error',
      description: 'System error: An unexpected error occurred. Please try again or contact support if the problem persists.',
      actions: ['retry', 'contact_support', 'try_eft'],
      severity: 'high'
    }],
    ['PAYMENT_INTERRUPTED', {
      code: 'PAYMENT_INTERRUPTED',
      category: 'system',
      title: 'Payment Interrupted',
      description: 'Payment interrupted: Your payment was not completed. Please try again or use a different payment method.',
      actions: ['retry', 'try_different_card', 'try_eft'],
      severity: 'medium'
    }],
    
    // Test mode errors (Requirements 3.1-3.4)
    ['INVALID_TEST_CARD', {
      code: 'INVALID_TEST_CARD',
      category: 'validation',
      title: 'Test Mode Active',
      description: 'Test mode active: Please use test card 4111 1111 1111 1111 for successful payments or try the EFT option.',
      actions: ['retry', 'try_eft'],
      severity: 'info'
    }],
    ['TEST_CARD_DECLINED', {
      code: 'TEST_CARD_DECLINED',
      category: 'validation',
      title: 'Test Card Declined',
      description: 'Test card declined (simulated): This test card simulates a declined payment. Try 4111 1111 1111 1111 for successful test payments.',
      actions: ['retry'],
      severity: 'info'
    }]
  ]);

  private static actionLabels: Map<string, string> = new Map([
    ['retry', 'Try Again'],
    ['contact_support', 'Contact Support'],
    ['try_eft', 'Use EFT Payment'],
    ['try_different_card', 'Try Different Card']
  ]);

  private static iconMap: Map<string, string> = new Map([
    ['card', 'CreditCard'],
    ['network', 'Wifi'],
    ['system', 'AlertTriangle'],
    ['validation', 'AlertCircle']
  ]);

  private static variantMap: Map<string, 'destructive' | 'warning' | 'info'> = new Map([
    ['low', 'warning'],
    ['medium', 'warning'],
    ['high', 'destructive'],
    ['critical', 'destructive'],
    ['info', 'info']
  ]);

  /**
   * Maps error code to user-friendly message with context awareness
   */
  static mapErrorToUserMessage(errorCode: string, context?: ErrorContext): UserErrorMessage {
    const template = this.errorTemplates.get(errorCode);
    
    if (!template) {
      return this.getFallbackMessage(errorCode, context);
    }

    // Apply context-specific modifications
    const contextualTemplate = this.applyContextualModifications(template, context);

    return {
      title: contextualTemplate.title,
      description: contextualTemplate.description,
      actions: contextualTemplate.actions.map((actionKey, index) => ({
        label: this.actionLabels.get(actionKey) || actionKey,
        action: actionKey as any,
        primary: index === 0
      })),
      icon: this.iconMap.get(contextualTemplate.category) || 'AlertCircle',
      variant: this.variantMap.get(contextualTemplate.severity) || 'warning'
    };
  }

  /**
   * Applies context-specific modifications to error messages
   */
  private static applyContextualModifications(
    template: ErrorMessageTemplate, 
    context?: ErrorContext
  ): ErrorMessageTemplate {
    if (!context) return template;

    let modifiedTemplate = { ...template };

    // Test mode modifications
    if (context.isTestMode && !template.code.includes('TEST')) {
      modifiedTemplate.description += ' (Test mode - no real charges will be made)';
    }

    // Environment-based modifications
    if (context.userAgent) {
      const isMobile = /Mobile|Android|iPhone|iPad/.test(context.userAgent);
      if (isMobile && template.description.length > 100) {
        // Shorter messages for mobile users
        modifiedTemplate.description = this.createMobileOptimizedMessage(template);
      }
    }

    // Multiple attempt modifications
    if (context.attemptCount && context.attemptCount > 2) {
      modifiedTemplate.actions = ['contact_support', 'try_eft', ...template.actions.filter(a => 
        a !== 'contact_support' && a !== 'try_eft'
      )];
      
      if (template.category === 'card') {
        modifiedTemplate.description += ' If this continues, please contact your bank.';
      }
    }

    // Progressive context modifications (if available)
    const progressiveContext = context as any;
    if (progressiveContext.sessionAttempts) {
      modifiedTemplate = this.applyProgressiveContextModifications(modifiedTemplate, progressiveContext);
    }

    return modifiedTemplate;
  }

  /**
   * Creates mobile-optimized error messages
   */
  private static createMobileOptimizedMessage(template: ErrorMessageTemplate): string {
    const mobileMessages: { [key: string]: string } = {
      'INSUFFICIENT_FUNDS': 'Payment declined: Insufficient funds. Try a different card or EFT.',
      'EXPIRED_CARD': 'Payment declined: Card expired. Use a different card.',
      'INVALID_CVV': 'Payment declined: Invalid CVV. Check the 3-digit code.',
      'CARD_BLOCKED': 'Payment declined: Card blocked. Contact your bank.',
      'TIMEOUT': 'Payment timeout: Check connection and retry.',
      'GATEWAY_UNAVAILABLE': 'Service unavailable: Try again or use EFT.',
      'SYSTEM_ERROR': 'System error: Try again or contact support.'
    };

    return mobileMessages[template.code] || template.description;
  }

  /**
   * Applies progressive context modifications for enhanced user guidance
   */
  private static applyProgressiveContextModifications(
    template: ErrorMessageTemplate,
    progressiveContext: any
  ): ErrorMessageTemplate {
    let modifiedTemplate = { ...template };

    // If user has been trying for a while, emphasize support
    if (progressiveContext.timeSpentOnPayment > 300) { // 5 minutes
      modifiedTemplate.actions = ['contact_support', ...template.actions.filter(a => a !== 'contact_support')];
    }

    // If multiple session attempts, prioritize alternatives
    if (progressiveContext.sessionAttempts >= 3) {
      modifiedTemplate.actions = ['try_eft', 'contact_support', ...template.actions.filter(a => 
        a !== 'try_eft' && a !== 'contact_support'
      )];
    }

    return modifiedTemplate;
  }

  /**
   * Provides fallback message for unknown error codes
   */
  private static getFallbackMessage(_errorCode: string, context?: ErrorContext): UserErrorMessage {
    const isTestMode = context?.isTestMode || false;
    const baseMessage = isTestMode 
      ? 'Test payment failed. Please try using test card 4111 1111 1111 1111 or the EFT option.'
      : 'Payment failed. Please try again or use a different payment method.';

    return {
      title: 'Payment Error',
      description: baseMessage,
      actions: [
        { label: 'Try Again', action: 'retry', primary: true },
        { label: 'Use EFT Payment', action: 'try_eft' },
        { label: 'Contact Support', action: 'contact_support' }
      ],
      icon: 'AlertCircle',
      variant: 'warning'
    };
  }

  /**
   * Gets all available error templates for testing/debugging
   */
  static getAllErrorTemplates(): ErrorMessageTemplate[] {
    return Array.from(this.errorTemplates.values());
  }

  /**
   * Checks if error code has a defined template
   */
  static hasTemplate(errorCode: string): boolean {
    return this.errorTemplates.has(errorCode);
  }
}