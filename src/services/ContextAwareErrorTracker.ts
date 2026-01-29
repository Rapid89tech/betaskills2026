/**
 * ContextAwareErrorTracker service for tracking error context and user environment
 * Implements context-aware messaging based on user history and environment
 * Supports requirement 2.5 - Progressive error handling from design
 */

import { PaymentError, ErrorContext, ProgressiveErrorContext } from '../types/paymentError';

export interface UserEnvironmentContext {
  userId: string;
  userAgent: string;
  isMobile: boolean;
  isTestMode: boolean;
  preferredPaymentMethod: string | undefined;
  previousSuccessfulPayments: number;
  accountAge: number | undefined; // days since account creation
  lastSuccessfulPayment: Date | undefined;
  deviceFingerprint: string | undefined;
}

export interface PaymentSessionContext {
  sessionId: string;
  startTime: Date;
  courseId: string | undefined;
  paymentAmount: number | undefined;
  attemptedMethods: string[];
  timeSpentOnForm: number; // seconds
  formInteractions: number;
  abandonmentPoints: string[]; // where user stopped/hesitated
}

export interface ErrorEnvironmentContext {
  browserInfo: {
    name: string;
    version: string;
    platform: string;
  };
  networkInfo: {
    connectionType: string;
    effectiveType: string;
    downlink?: number;
  } | undefined;
  screenInfo: {
    width: number;
    height: number;
    pixelRatio: number;
  };
  timestamp: Date;
  timezone: string;
}

export class ContextAwareErrorTracker {
  private static instance: ContextAwareErrorTracker;
  private userEnvironments: Map<string, UserEnvironmentContext> = new Map();
  private paymentSessions: Map<string, PaymentSessionContext> = new Map();
  private errorContexts: Map<string, ErrorEnvironmentContext[]> = new Map();

  constructor() {}

  static getInstance(): ContextAwareErrorTracker {
    if (!ContextAwareErrorTracker.instance) {
      ContextAwareErrorTracker.instance = new ContextAwareErrorTracker();
    }
    return ContextAwareErrorTracker.instance;
  }

  /**
   * Tracks user environment context for personalized error handling
   */
  trackUserEnvironment(userId: string, context: Partial<UserEnvironmentContext>): void {
    const existingContext = this.userEnvironments.get(userId);
    
    const updatedContext: UserEnvironmentContext = {
      userId,
      userAgent: context.userAgent || navigator.userAgent,
      isMobile: context.isMobile ?? this.detectMobile(context.userAgent || navigator.userAgent),
      isTestMode: context.isTestMode ?? this.detectTestMode(),
      preferredPaymentMethod: context.preferredPaymentMethod || existingContext?.preferredPaymentMethod || undefined,
      previousSuccessfulPayments: context.previousSuccessfulPayments ?? existingContext?.previousSuccessfulPayments ?? 0,
      accountAge: context.accountAge || existingContext?.accountAge || undefined,
      lastSuccessfulPayment: context.lastSuccessfulPayment || existingContext?.lastSuccessfulPayment || undefined,
      deviceFingerprint: context.deviceFingerprint || existingContext?.deviceFingerprint || this.generateDeviceFingerprint()
    };

    this.userEnvironments.set(userId, updatedContext);
  }

  /**
   * Starts tracking a payment session
   */
  startPaymentSession(sessionId: string, context: Partial<PaymentSessionContext>): void {
    const sessionContext: PaymentSessionContext = {
      sessionId,
      startTime: new Date(),
      courseId: context.courseId || undefined,
      paymentAmount: context.paymentAmount || undefined,
      attemptedMethods: context.attemptedMethods || [],
      timeSpentOnForm: 0,
      formInteractions: 0,
      abandonmentPoints: []
    };

    this.paymentSessions.set(sessionId, sessionContext);
  }

  /**
   * Updates payment session with user interactions
   */
  updatePaymentSession(sessionId: string, updates: Partial<PaymentSessionContext>): void {
    const session = this.paymentSessions.get(sessionId);
    if (!session) return;

    // Update session data
    Object.assign(session, updates);

    // Calculate time spent
    session.timeSpentOnForm = Math.floor((Date.now() - session.startTime.getTime()) / 1000);

    this.paymentSessions.set(sessionId, session);
  }

  /**
   * Records form abandonment point
   */
  recordAbandonmentPoint(sessionId: string, point: string): void {
    const session = this.paymentSessions.get(sessionId);
    if (session) {
      session.abandonmentPoints.push(point);
      this.paymentSessions.set(sessionId, session);
    }
  }

  /**
   * Tracks error environment context
   */
  trackErrorEnvironment(errorId: string): ErrorEnvironmentContext {
    const context: ErrorEnvironmentContext = {
      browserInfo: this.getBrowserInfo(),
      networkInfo: this.getNetworkInfo(),
      screenInfo: this.getScreenInfo(),
      timestamp: new Date(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    const existingContexts = this.errorContexts.get(errorId) || [];
    existingContexts.push(context);
    this.errorContexts.set(errorId, existingContexts);

    return context;
  }

  /**
   * Creates enhanced progressive error context with user environment and session data
   */
  createProgressiveErrorContext(
    baseContext: ErrorContext,
    sessionId?: string
  ): ProgressiveErrorContext {
    const userId = baseContext.userId || 'anonymous';
    const userEnvironment = this.userEnvironments.get(userId);
    const paymentSession = sessionId ? this.paymentSessions.get(sessionId) : undefined;

    // Create enhanced context
    const progressiveContext: ProgressiveErrorContext = {
      ...baseContext,
      errorHistory: undefined, // Will be set by ProgressiveErrorHandler
      sessionAttempts: paymentSession?.attemptedMethods.length || 0,
      timeSpentOnPayment: paymentSession?.timeSpentOnForm || 0
    };

    // Add environment-specific context
    if (userEnvironment) {
      progressiveContext.isTestMode = userEnvironment.isTestMode;
      progressiveContext.userAgent = userEnvironment.userAgent;
    }

    return progressiveContext;
  }

  /**
   * Gets context-aware error message suggestions based on user environment
   */
  getContextAwareMessageSuggestions(
    error: PaymentError,
    userId: string,
    sessionId?: string
  ): {
    messageVariant: 'mobile' | 'desktop' | 'test' | 'experienced' | 'new_user';
    suggestedActions: string[];
    escalationLevel: 'low' | 'medium' | 'high';
  } {
    const userEnvironment = this.userEnvironments.get(userId);
    const paymentSession = sessionId ? this.paymentSessions.get(sessionId) : undefined;

    // Determine message variant based on context
    let messageVariant: 'mobile' | 'desktop' | 'test' | 'experienced' | 'new_user' = 'desktop';
    
    if (userEnvironment?.isTestMode) {
      messageVariant = 'test';
    } else if (userEnvironment?.isMobile) {
      messageVariant = 'mobile';
    } else if (userEnvironment?.previousSuccessfulPayments && userEnvironment.previousSuccessfulPayments > 3) {
      messageVariant = 'experienced';
    } else if (userEnvironment?.previousSuccessfulPayments === 0) {
      messageVariant = 'new_user';
    }

    // Suggest actions based on context
    const suggestedActions = this.getSuggestedActions(error, userEnvironment, paymentSession);

    // Determine escalation level
    const escalationLevel = this.determineEscalationLevel(error, userEnvironment, paymentSession);

    return {
      messageVariant,
      suggestedActions,
      escalationLevel
    };
  }

  /**
   * Gets user success patterns for personalized guidance
   */
  getUserSuccessPatterns(userId: string): {
    preferredPaymentMethod: string | undefined;
    successfulTimeOfDay: string | undefined;
    averageCompletionTime: number | undefined;
    commonSuccessFactors: string[];
  } {
    const userEnvironment = this.userEnvironments.get(userId);
    
    if (!userEnvironment) {
      return { 
        preferredPaymentMethod: undefined,
        successfulTimeOfDay: undefined,
        averageCompletionTime: undefined,
        commonSuccessFactors: [] 
      };
    }

    return {
      preferredPaymentMethod: userEnvironment.preferredPaymentMethod,
      successfulTimeOfDay: this.getSuccessfulTimeOfDay(userId),
      averageCompletionTime: this.getAverageCompletionTime(userId),
      commonSuccessFactors: this.getCommonSuccessFactors(userEnvironment)
    };
  }

  /**
   * Detects if user is on mobile device
   */
  private detectMobile(userAgent: string): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  }

  /**
   * Detects if in test mode
   */
  private detectTestMode(): boolean {
    return process.env.NODE_ENV === 'development' || 
           window.location.hostname === 'localhost' ||
           window.location.hostname.includes('test') ||
           window.location.hostname.includes('staging');
  }

  /**
   * Generates device fingerprint for tracking
   */
  private generateDeviceFingerprint(): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Device fingerprint', 2, 2);
    }
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < fingerprint.length; i++) {
      const char = fingerprint.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }

  /**
   * Gets browser information
   */
  private getBrowserInfo(): ErrorEnvironmentContext['browserInfo'] {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';

    if (userAgent.includes('Chrome')) {
      browserName = 'Chrome';
      browserVersion = userAgent.match(/Chrome\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('Firefox')) {
      browserName = 'Firefox';
      browserVersion = userAgent.match(/Firefox\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('Safari')) {
      browserName = 'Safari';
      browserVersion = userAgent.match(/Version\/([0-9.]+)/)?.[1] || 'Unknown';
    } else if (userAgent.includes('Edge')) {
      browserName = 'Edge';
      browserVersion = userAgent.match(/Edge\/([0-9.]+)/)?.[1] || 'Unknown';
    }

    return {
      name: browserName,
      version: browserVersion,
      platform: navigator.platform
    };
  }

  /**
   * Gets network information if available
   */
  private getNetworkInfo(): ErrorEnvironmentContext['networkInfo'] {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      return {
        connectionType: connection.type || 'unknown',
        effectiveType: connection.effectiveType || 'unknown',
        downlink: connection.downlink
      };
    }

    return undefined;
  }

  /**
   * Gets screen information
   */
  private getScreenInfo(): ErrorEnvironmentContext['screenInfo'] {
    return {
      width: screen.width,
      height: screen.height,
      pixelRatio: window.devicePixelRatio || 1
    };
  }

  /**
   * Gets suggested actions based on context
   */
  private getSuggestedActions(
    error: PaymentError,
    userEnvironment?: UserEnvironmentContext,
    paymentSession?: PaymentSessionContext
  ): string[] {
    const actions: string[] = [];

    // Base actions for error type
    if (error.code.includes('CARD')) {
      actions.push('try_different_card');
    }
    
    // Context-specific suggestions
    if (userEnvironment?.isMobile) {
      actions.push('check_mobile_connection');
    }

    if (userEnvironment?.isTestMode) {
      actions.push('use_test_card');
    }

    if (userEnvironment?.preferredPaymentMethod === 'eft') {
      actions.unshift('try_eft'); // Prioritize EFT for users who prefer it
    }

    if (paymentSession && paymentSession.attemptedMethods.length > 2) {
      actions.push('contact_support');
    }

    // Always include retry as fallback
    if (!actions.includes('retry')) {
      actions.push('retry');
    }

    return actions;
  }

  /**
   * Determines escalation level based on context
   */
  private determineEscalationLevel(
    error: PaymentError,
    userEnvironment?: UserEnvironmentContext,
    paymentSession?: PaymentSessionContext
  ): 'low' | 'medium' | 'high' {
    let escalationScore = 0;

    // Error severity
    if (error.code.includes('BLOCKED') || error.code.includes('SECURITY')) {
      escalationScore += 3;
    } else if (error.code.includes('INSUFFICIENT') || error.code.includes('EXPIRED')) {
      escalationScore += 2;
    } else {
      escalationScore += 1;
    }

    // User experience level
    if (userEnvironment?.previousSuccessfulPayments === 0) {
      escalationScore += 2; // New users need more help
    } else if (userEnvironment && userEnvironment.previousSuccessfulPayments > 5) {
      escalationScore -= 1; // Experienced users need less hand-holding
    }

    // Session context
    if (paymentSession) {
      if (paymentSession.attemptedMethods.length > 3) {
        escalationScore += 2;
      }
      if (paymentSession.timeSpentOnForm > 300) { // 5 minutes
        escalationScore += 1;
      }
    }

    // Mobile users might need simpler guidance
    if (userEnvironment?.isMobile) {
      escalationScore += 1;
    }

    if (escalationScore >= 5) return 'high';
    if (escalationScore >= 3) return 'medium';
    return 'low';
  }

  /**
   * Gets successful time of day pattern for user
   */
  private getSuccessfulTimeOfDay(_userId: string): string | undefined {
    // This would typically analyze historical data
    // For now, return undefined as we don't have historical payment data
    return undefined;
  }

  /**
   * Gets average completion time for user
   */
  private getAverageCompletionTime(_userId: string): number | undefined {
    // This would typically analyze historical data
    // For now, return undefined as we don't have historical payment data
    return undefined;
  }

  /**
   * Gets common success factors for user
   */
  private getCommonSuccessFactors(userEnvironment: UserEnvironmentContext): string[] {
    const factors: string[] = [];

    if (userEnvironment.preferredPaymentMethod) {
      factors.push(`prefers_${userEnvironment.preferredPaymentMethod}`);
    }

    if (userEnvironment.isMobile) {
      factors.push('mobile_user');
    }

    if (userEnvironment.previousSuccessfulPayments > 3) {
      factors.push('experienced_user');
    }

    return factors;
  }

  /**
   * Records successful payment for learning
   */
  recordSuccessfulPayment(userId: string, paymentMethod: string, sessionId?: string): void {
    const userEnvironment = this.userEnvironments.get(userId);
    if (userEnvironment) {
      userEnvironment.previousSuccessfulPayments++;
      userEnvironment.preferredPaymentMethod = paymentMethod;
      userEnvironment.lastSuccessfulPayment = new Date();
      this.userEnvironments.set(userId, userEnvironment);
    }

    // Clean up session data
    if (sessionId) {
      this.paymentSessions.delete(sessionId);
    }
  }

  /**
   * Gets analytics data for context-aware error handling
   */
  getContextAnalytics(): {
    totalUsers: number;
    mobileUsers: number;
    testModeUsers: number;
    averageSessionTime: number;
    commonAbandonmentPoints: string[];
    deviceDistribution: { [key: string]: number };
  } {
    const users = Array.from(this.userEnvironments.values());
    const sessions = Array.from(this.paymentSessions.values());

    const mobileUsers = users.filter(u => u.isMobile).length;
    const testModeUsers = users.filter(u => u.isTestMode).length;
    
    const averageSessionTime = sessions.length > 0 
      ? sessions.reduce((sum, s) => sum + s.timeSpentOnForm, 0) / sessions.length 
      : 0;

    const abandonmentPoints: { [key: string]: number } = {};
    sessions.forEach(session => {
      session.abandonmentPoints.forEach(point => {
        abandonmentPoints[point] = (abandonmentPoints[point] || 0) + 1;
      });
    });

    const commonAbandonmentPoints = Object.entries(abandonmentPoints)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([point]) => point);

    const deviceDistribution: { [key: string]: number } = {};
    users.forEach(user => {
      const deviceType = user.isMobile ? 'mobile' : 'desktop';
      deviceDistribution[deviceType] = (deviceDistribution[deviceType] || 0) + 1;
    });

    return {
      totalUsers: users.length,
      mobileUsers,
      testModeUsers,
      averageSessionTime,
      commonAbandonmentPoints,
      deviceDistribution
    };
  }

  /**
   * Clears context data for a specific user (useful for testing or privacy)
   */
  clearUserContext(userId: string): void {
    this.userEnvironments.delete(userId);
    
    // Clear related sessions
    const sessionsToDelete = Array.from(this.paymentSessions.entries())
      .filter(([, session]) => session.sessionId.includes(userId))
      .map(([sessionId]) => sessionId);
    
    sessionsToDelete.forEach(sessionId => this.paymentSessions.delete(sessionId));
  }

  /**
   * Clears all context data (useful for testing)
   */
  clearAllContext(): void {
    this.userEnvironments.clear();
    this.paymentSessions.clear();
    this.errorContexts.clear();
  }
}

// Export instance to avoid circular dependency issues
export const contextAwareErrorTracker = new ContextAwareErrorTracker();
export default contextAwareErrorTracker;