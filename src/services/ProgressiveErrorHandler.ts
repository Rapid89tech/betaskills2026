/**
 * ProgressiveErrorHandler service for escalating error guidance based on attempt history
 * Implements progressive error handling system as per requirement 2.5
 */

import { PaymentError, ProcessedPaymentError, ErrorContext, UserErrorMessage } from '../types/paymentError';
import { PaymentErrorHandler } from './PaymentErrorHandler';

export interface ErrorAttempt {
  errorCode: string;
  timestamp: Date;
  context: ErrorContext;
  userMessage: string;
}

export interface UserErrorHistory {
  userId: string;
  courseId: string | undefined;
  attempts: ErrorAttempt[];
  firstAttemptTime: Date;
  lastAttemptTime: Date;
  totalAttempts: number;
  uniqueErrorCodes: Set<string>;
}

export interface ProgressiveErrorContext extends ErrorContext {
  errorHistory: UserErrorHistory | undefined;
  sessionAttempts?: number;
  consecutiveFailures?: number;
  timeSpentOnPayment?: number;
}

export class ProgressiveErrorHandler {
  private static instance: ProgressiveErrorHandler;
  private userErrorHistories: Map<string, UserErrorHistory> = new Map();
  private sessionAttempts: Map<string, number> = new Map();
  private paymentErrorHandler: PaymentErrorHandler;

  private constructor() {
    this.paymentErrorHandler = PaymentErrorHandler.getInstance();
  }

  static getInstance(): ProgressiveErrorHandler {
    if (!ProgressiveErrorHandler.instance) {
      ProgressiveErrorHandler.instance = new ProgressiveErrorHandler();
    }
    return ProgressiveErrorHandler.instance;
  }

  /**
   * Processes payment error with progressive escalation based on attempt history
   */
  processProgressiveError(
    error: PaymentError, 
    context: ProgressiveErrorContext
  ): ProcessedPaymentError {
    // Track this error attempt
    this.trackErrorAttempt(error, context);

    // Get user error history
    const errorHistory = this.getUserErrorHistory(context.userId || 'anonymous', context.courseId);
    
    // Calculate progressive context
    const progressiveContext = this.calculateProgressiveContext(context, errorHistory);

    // Get base processed error
    const baseProcessedError = this.paymentErrorHandler.processPaymentError(error, progressiveContext);

    // Apply progressive enhancements
    const enhancedUserMessage = this.applyProgressiveEnhancements(
      baseProcessedError.userMessage,
      progressiveContext,
      errorHistory
    );

    return {
      ...baseProcessedError,
      userMessage: enhancedUserMessage,
      severity: this.escalateSeverity(baseProcessedError.severity, progressiveContext)
    };
  }

  /**
   * Tracks error attempt for progressive analysis
   */
  private trackErrorAttempt(error: PaymentError, context: ProgressiveErrorContext): void {
    const userId = context.userId || 'anonymous';
    const courseId = context.courseId;
    const sessionKey = `${userId}-${courseId || 'general'}`;

    // Track session attempts
    const currentSessionAttempts = this.sessionAttempts.get(sessionKey) || 0;
    this.sessionAttempts.set(sessionKey, currentSessionAttempts + 1);

    // Track user error history
    let userHistory = this.userErrorHistories.get(userId);
    if (!userHistory) {
      userHistory = {
        userId,
        courseId: courseId,
        attempts: [],
        firstAttemptTime: new Date(),
        lastAttemptTime: new Date(),
        totalAttempts: 0,
        uniqueErrorCodes: new Set()
      };
      this.userErrorHistories.set(userId, userHistory);
    }

    // Add this attempt
    const attempt: ErrorAttempt = {
      errorCode: error.code,
      timestamp: new Date(),
      context,
      userMessage: error.message
    };

    userHistory.attempts.push(attempt);
    userHistory.lastAttemptTime = new Date();
    userHistory.totalAttempts++;
    userHistory.uniqueErrorCodes.add(error.code);

    // Keep only last 10 attempts to prevent memory bloat
    if (userHistory.attempts.length > 10) {
      userHistory.attempts = userHistory.attempts.slice(-10);
    }
  }

  /**
   * Gets user error history for progressive analysis
   */
  private getUserErrorHistory(userId: string, _courseId?: string): UserErrorHistory | undefined {
    return this.userErrorHistories.get(userId);
  }

  /**
   * Calculates progressive context based on attempt history
   */
  private calculateProgressiveContext(
    context: ProgressiveErrorContext,
    errorHistory?: UserErrorHistory
  ): ProgressiveErrorContext {
    const userId = context.userId || 'anonymous';
    const courseId = context.courseId;
    const sessionKey = `${userId}-${courseId || 'general'}`;

    const sessionAttempts = this.sessionAttempts.get(sessionKey) || 0;
    const consecutiveFailures = this.calculateConsecutiveFailures(errorHistory);
    const timeSpentOnPayment = this.calculateTimeSpentOnPayment(errorHistory);

    return {
      ...context,
      errorHistory,
      sessionAttempts,
      consecutiveFailures,
      timeSpentOnPayment,
      attemptCount: sessionAttempts
    };
  }

  /**
   * Calculates consecutive failures for escalation logic
   */
  private calculateConsecutiveFailures(errorHistory?: UserErrorHistory): number {
    if (!errorHistory || errorHistory.attempts.length === 0) {
      return 0;
    }

    // Count consecutive failures from the end
    let consecutiveFailures = 0;
    for (let i = errorHistory.attempts.length - 1; i >= 0; i--) {
      consecutiveFailures++;
    }

    return consecutiveFailures;
  }

  /**
   * Calculates time spent on payment attempts
   */
  private calculateTimeSpentOnPayment(errorHistory?: UserErrorHistory): number {
    if (!errorHistory || errorHistory.attempts.length === 0) {
      return 0;
    }

    const firstAttempt = errorHistory.firstAttemptTime;
    const lastAttempt = errorHistory.lastAttemptTime;
    
    return Math.floor((lastAttempt.getTime() - firstAttempt.getTime()) / 1000); // seconds
  }

  /**
   * Applies progressive enhancements to error messages based on attempt history
   */
  private applyProgressiveEnhancements(
    baseMessage: UserErrorMessage,
    context: ProgressiveErrorContext,
    errorHistory?: UserErrorHistory
  ): UserErrorMessage {
    const sessionAttempts = context.sessionAttempts || 0;
    const consecutiveFailures = context.consecutiveFailures || 0;
    const timeSpentOnPayment = context.timeSpentOnPayment || 0;

    let enhancedMessage = { ...baseMessage };

    // Level 1: First attempt - show basic message (no changes needed)
    if (sessionAttempts <= 1) {
      return enhancedMessage;
    }

    // Level 2: Second attempt - add alternative suggestions
    if (sessionAttempts === 2) {
      enhancedMessage = this.applyLevel2Enhancements(enhancedMessage, context);
    }

    // Level 3: Third attempt - emphasize alternatives and support
    if (sessionAttempts === 3) {
      enhancedMessage = this.applyLevel3Enhancements(enhancedMessage, context);
    }

    // Level 4: Multiple failures - strong escalation
    if (sessionAttempts >= 4 || consecutiveFailures >= 4) {
      enhancedMessage = this.applyLevel4Enhancements(enhancedMessage, context, errorHistory);
    }

    // Time-based escalation: If user has been trying for more than 5 minutes
    if (timeSpentOnPayment > 300) {
      enhancedMessage = this.applyTimeBasedEscalation(enhancedMessage, context);
    }

    // Pattern-based escalation: If user keeps hitting the same error
    if (errorHistory && this.hasRepeatingErrorPattern(errorHistory)) {
      enhancedMessage = this.applyPatternBasedEscalation(enhancedMessage, context, errorHistory);
    }

    return enhancedMessage;
  }

  /**
   * Level 2 enhancements: Second attempt
   */
  private applyLevel2Enhancements(
    message: UserErrorMessage,
    _context: ProgressiveErrorContext
  ): UserErrorMessage {
    const enhancedActions = [...message.actions];

    // Ensure EFT is prominently suggested
    if (!enhancedActions.some(a => a.action === 'try_eft')) {
      enhancedActions.splice(1, 0, {
        label: 'Try EFT Payment Instead',
        action: 'try_eft',
        primary: false
      });
    }

    return {
      ...message,
      description: message.description + ' You might want to try a different payment method.',
      actions: enhancedActions
    };
  }

  /**
   * Level 3 enhancements: Third attempt
   */
  private applyLevel3Enhancements(
    message: UserErrorMessage,
    _context: ProgressiveErrorContext
  ): UserErrorMessage {
    const enhancedActions = [
      { label: 'Use EFT Payment', action: 'try_eft' as const, primary: true },
      { label: 'Contact Support', action: 'contact_support' as const },
      ...message.actions.filter(a => a.action !== 'try_eft' && a.action !== 'contact_support')
    ];

    return {
      ...message,
      title: 'Multiple Payment Attempts Failed',
      description: message.description + ' We recommend trying EFT payment or contacting support for assistance.',
      actions: enhancedActions,
      variant: 'destructive' as const
    };
  }

  /**
   * Level 4 enhancements: Multiple failures
   */
  private applyLevel4Enhancements(
    message: UserErrorMessage,
    _context: ProgressiveErrorContext,
    errorHistory?: UserErrorHistory
  ): UserErrorMessage {
    const cardErrors = errorHistory?.uniqueErrorCodes.has('INSUFFICIENT_FUNDS') || 
                      errorHistory?.uniqueErrorCodes.has('EXPIRED_CARD') ||
                      errorHistory?.uniqueErrorCodes.has('CARD_BLOCKED');

    let escalatedDescription = message.description;
    
    if (cardErrors) {
      escalatedDescription += ' Since you\'re experiencing card issues, we strongly recommend contacting your bank or using our EFT payment option.';
    } else {
      escalatedDescription += ' Multiple payment attempts have failed. Please contact our support team for immediate assistance.';
    }

    return {
      ...message,
      title: 'Payment Assistance Needed',
      description: escalatedDescription,
      actions: [
        { label: 'Contact Support Now', action: 'contact_support' as const, primary: true },
        { label: 'Use EFT Payment', action: 'try_eft' as const },
        { label: 'Try Different Card', action: 'try_different_card' as const }
      ],
      variant: 'destructive' as const
    };
  }

  /**
   * Time-based escalation for users spending too long on payment
   */
  private applyTimeBasedEscalation(
    message: UserErrorMessage,
    _context: ProgressiveErrorContext
  ): UserErrorMessage {
    return {
      ...message,
      description: message.description + ' We notice you\'ve been trying for a while. Our support team can help you complete your enrollment quickly.',
      actions: [
        { label: 'Get Help Now', action: 'contact_support' as const, primary: true },
        { label: 'Try EFT Payment', action: 'try_eft' as const },
        ...message.actions.filter(a => a.action !== 'contact_support' && a.action !== 'try_eft')
      ]
    };
  }

  /**
   * Pattern-based escalation for repeating errors
   */
  private applyPatternBasedEscalation(
    message: UserErrorMessage,
    _context: ProgressiveErrorContext,
    errorHistory: UserErrorHistory
  ): UserErrorMessage {
    const mostCommonError = this.getMostCommonError(errorHistory);
    
    let patternMessage = message.description;
    
    if (mostCommonError === 'INSUFFICIENT_FUNDS') {
      patternMessage += ' This appears to be a recurring insufficient funds issue. Please check your account balance or contact your bank.';
    } else if (mostCommonError === 'INVALID_CVV') {
      patternMessage += ' You\'ve had multiple CVV errors. Please double-check the security code on your card.';
    } else if (mostCommonError === 'EXPIRED_CARD') {
      patternMessage += ' Your card appears to be expired. Please use a different card.';
    } else {
      patternMessage += ' This error keeps occurring. Our support team can help resolve this specific issue.';
    }

    return {
      ...message,
      description: patternMessage,
      actions: [
        { label: 'Contact Support', action: 'contact_support' as const, primary: true },
        { label: 'Try Different Card', action: 'try_different_card' as const },
        { label: 'Use EFT Payment', action: 'try_eft' as const }
      ]
    };
  }

  /**
   * Checks if user has a repeating error pattern
   */
  private hasRepeatingErrorPattern(errorHistory: UserErrorHistory): boolean {
    if (errorHistory.attempts.length < 3) return false;

    const recentAttempts = errorHistory.attempts.slice(-3);
    const errorCounts: { [key: string]: number } = {};

    recentAttempts.forEach(attempt => {
      errorCounts[attempt.errorCode] = (errorCounts[attempt.errorCode] || 0) + 1;
    });

    // If any error appears more than once in recent attempts, it's a pattern
    return Object.values(errorCounts).some(count => count > 1);
  }

  /**
   * Gets the most common error from user history
   */
  private getMostCommonError(errorHistory: UserErrorHistory): string {
    const errorCounts: { [key: string]: number } = {};

    errorHistory.attempts.forEach(attempt => {
      errorCounts[attempt.errorCode] = (errorCounts[attempt.errorCode] || 0) + 1;
    });

    return Object.entries(errorCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'UNKNOWN';
  }

  /**
   * Escalates severity based on progressive context
   */
  private escalateSeverity(
    baseSeverity: ProcessedPaymentError['severity'],
    context: ProgressiveErrorContext
  ): ProcessedPaymentError['severity'] {
    const sessionAttempts = context.sessionAttempts || 0;
    const consecutiveFailures = context.consecutiveFailures || 0;

    // Escalate severity based on attempt count
    if (sessionAttempts >= 4 || consecutiveFailures >= 4) {
      return 'critical';
    }

    if (sessionAttempts >= 3 || consecutiveFailures >= 3) {
      return baseSeverity === 'low' ? 'medium' : 'high';
    }

    if (sessionAttempts >= 2) {
      return baseSeverity === 'low' ? 'medium' : baseSeverity;
    }

    return baseSeverity;
  }

  /**
   * Gets progressive error statistics for analytics
   */
  getProgressiveErrorStatistics(): {
    totalUsers: number;
    averageAttemptsPerUser: number;
    mostCommonErrorSequences: string[];
    escalationTriggers: { [key: string]: number };
  } {
    const totalUsers = this.userErrorHistories.size;
    const totalAttempts = Array.from(this.userErrorHistories.values())
      .reduce((sum, history) => sum + history.totalAttempts, 0);
    
    const averageAttemptsPerUser = totalUsers > 0 ? totalAttempts / totalUsers : 0;

    // Calculate most common error sequences
    const errorSequences: { [key: string]: number } = {};
    this.userErrorHistories.forEach(history => {
      if (history.attempts.length >= 2) {
        const sequence = history.attempts
          .slice(-3)
          .map(a => a.errorCode)
          .join(' -> ');
        errorSequences[sequence] = (errorSequences[sequence] || 0) + 1;
      }
    });

    const mostCommonErrorSequences = Object.entries(errorSequences)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([sequence]) => sequence);

    // Calculate escalation triggers
    const escalationTriggers: { [key: string]: number } = {
      'multiple_attempts': 0,
      'time_based': 0,
      'pattern_based': 0,
      'consecutive_failures': 0
    };

    this.userErrorHistories.forEach(history => {
      if (history.totalAttempts >= 4) {
        escalationTriggers['multiple_attempts'] = (escalationTriggers['multiple_attempts'] || 0) + 1;
      }
      if (this.calculateTimeSpentOnPayment(history) > 300) {
        escalationTriggers['time_based'] = (escalationTriggers['time_based'] || 0) + 1;
      }
      if (this.hasRepeatingErrorPattern(history)) {
        escalationTriggers['pattern_based'] = (escalationTriggers['pattern_based'] || 0) + 1;
      }
      if (this.calculateConsecutiveFailures(history) >= 3) {
        escalationTriggers['consecutive_failures'] = (escalationTriggers['consecutive_failures'] || 0) + 1;
      }
    });

    return {
      totalUsers,
      averageAttemptsPerUser,
      mostCommonErrorSequences,
      escalationTriggers
    };
  }

  /**
   * Clears error history for a specific user (useful for testing or privacy)
   */
  clearUserErrorHistory(userId: string): void {
    this.userErrorHistories.delete(userId);
    
    // Clear session attempts for this user
    const keysToDelete = Array.from(this.sessionAttempts.keys())
      .filter(key => key.startsWith(userId));
    keysToDelete.forEach(key => this.sessionAttempts.delete(key));
  }

  /**
   * Clears all error histories (useful for testing)
   */
  clearAllErrorHistories(): void {
    this.userErrorHistories.clear();
    this.sessionAttempts.clear();
  }

  /**
   * Gets user error history for debugging/analytics
   */
  getUserErrorHistoryForAnalytics(userId: string): UserErrorHistory | undefined {
    return this.userErrorHistories.get(userId);
  }
}