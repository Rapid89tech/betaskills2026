/**
 * Navigation Error Handler Service
 * Comprehensive error handling and recovery for course navigation
 */

import { 
  NavigationError, 
  NavigationErrorType, 
  ErrorSeverity, 
  RecoveryStrategy,
  NavigationContext,
  ErrorRecoveryAction,
  NavigationErrorResult,
  ErrorMetrics
} from '../types/navigationError';

class NavigationErrorHandler {
  private errorMetrics: Map<NavigationErrorType, ErrorMetrics> = new Map();
  private retryAttempts: Map<string, number> = new Map();
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000; // 1 second base delay

  /**
   * Create a navigation error with proper classification and recovery options
   */
  createError(
    type: NavigationErrorType,
    message: string,
    context: NavigationContext,
    details: Record<string, any> = {}
  ): NavigationError {
    const error: NavigationError = {
      type,
      message,
      userMessage: this.getUserFriendlyMessage(type, details),
      courseId: details.courseId,
      userId: details.userId,
      details,
      severity: this.determineSeverity(type),
      recoverable: this.isRecoverable(type),
      suggestedAction: this.getSuggestedAction(type),
      recoveryStrategy: this.getRecoveryStrategy(type),
      timestamp: new Date(),
      context
    };

    this.updateErrorMetrics(error);
    this.logError(error);

    return error;
  }

  /**
   * Handle navigation error and provide recovery options
   */
  handleError(error: NavigationError): NavigationErrorResult {
    const recoveryActions = this.createRecoveryActions(error);
    const canRetry = this.canRetry(error);
    
    return {
      error,
      recoveryActions,
      canRetry,
      retryDelay: this.calculateRetryDelay(error),
      maxRetries: this.maxRetries
    };
  }

  /**
   * Create specific error for course not found
   */
  createCourseNotFoundError(courseId: string, context: NavigationContext): NavigationError {
    return this.createError(
      NavigationErrorType.COURSE_NOT_FOUND,
      `Course with ID ${courseId} not found`,
      context,
      { courseId, searchAttempted: true }
    );
  }

  /**
   * Create specific error for access denied
   */
  createAccessDeniedError(courseId: string, userId: string, context: NavigationContext): NavigationError {
    return this.createError(
      NavigationErrorType.ACCESS_DENIED,
      `Access denied to course ${courseId} for user ${userId}`,
      context,
      { courseId, userId, enrollmentRequired: true }
    );
  }

  /**
   * Create specific error for enrollment validation failure
   */
  createEnrollmentInvalidError(courseId: string, userId: string, context: NavigationContext): NavigationError {
    return this.createError(
      NavigationErrorType.ENROLLMENT_INVALID,
      `Invalid enrollment status for course ${courseId}`,
      context,
      { courseId, userId, validationFailed: true }
    );
  }

  /**
   * Create specific error for content unavailable
   */
  createContentUnavailableError(courseId: string, context: NavigationContext): NavigationError {
    return this.createError(
      NavigationErrorType.CONTENT_UNAVAILABLE,
      `Course content not available for ${courseId}`,
      context,
      { courseId, contentMissing: true }
    );
  }

  /**
   * Create specific error for loading failure
   */
  createLoadingFailedError(courseId: string, context: NavigationContext, originalError?: Error): NavigationError {
    return this.createError(
      NavigationErrorType.LOADING_FAILED,
      `Failed to load course ${courseId}`,
      context,
      { courseId, originalError: originalError?.message, stack: originalError?.stack }
    );
  }

  /**
   * Create specific error for network issues
   */
  createNetworkError(context: NavigationContext, originalError?: Error): NavigationError {
    return this.createError(
      NavigationErrorType.NETWORK_ERROR,
      'Network connection failed during navigation',
      context,
      { offline: !navigator.onLine, originalError: originalError?.message }
    );
  }

  /**
   * Get user-friendly error messages
   */
  private getUserFriendlyMessage(type: NavigationErrorType, details: Record<string, any>): string {
    const messages = {
      [NavigationErrorType.COURSE_NOT_FOUND]: 
        'We couldn\'t find this course. It may have been moved or is no longer available.',
      [NavigationErrorType.ACCESS_DENIED]: 
        'You don\'t have access to this course. Please check your enrollment status.',
      [NavigationErrorType.ENROLLMENT_INVALID]: 
        'There\'s an issue with your enrollment. Please try refreshing or contact support.',
      [NavigationErrorType.CONTENT_UNAVAILABLE]: 
        'This course content is being prepared. Please try again later.',
      [NavigationErrorType.LOADING_FAILED]: 
        'We\'re having trouble loading this course. Please try again.',
      [NavigationErrorType.NETWORK_ERROR]: 
        'Connection issue detected. Please check your internet connection.',
      [NavigationErrorType.VALIDATION_FAILED]: 
        'Course validation failed. Please try refreshing the page.',
      [NavigationErrorType.AUTHENTICATION_REQUIRED]: 
        'Please log in to access this course.',
      [NavigationErrorType.PERMISSION_DENIED]: 
        'You don\'t have permission to access this content.',
      [NavigationErrorType.TIMEOUT_ERROR]: 
        'The request took too long. Please try again.'
    };

    return messages[type] || 'An unexpected error occurred. Please try again.';
  }

  /**
   * Determine error severity
   */
  private determineSeverity(type: NavigationErrorType): ErrorSeverity {
    const severityMap = {
      [NavigationErrorType.COURSE_NOT_FOUND]: ErrorSeverity.HIGH,
      [NavigationErrorType.ACCESS_DENIED]: ErrorSeverity.MEDIUM,
      [NavigationErrorType.ENROLLMENT_INVALID]: ErrorSeverity.HIGH,
      [NavigationErrorType.CONTENT_UNAVAILABLE]: ErrorSeverity.MEDIUM,
      [NavigationErrorType.LOADING_FAILED]: ErrorSeverity.HIGH,
      [NavigationErrorType.NETWORK_ERROR]: ErrorSeverity.MEDIUM,
      [NavigationErrorType.VALIDATION_FAILED]: ErrorSeverity.HIGH,
      [NavigationErrorType.AUTHENTICATION_REQUIRED]: ErrorSeverity.LOW,
      [NavigationErrorType.PERMISSION_DENIED]: ErrorSeverity.MEDIUM,
      [NavigationErrorType.TIMEOUT_ERROR]: ErrorSeverity.MEDIUM
    };

    return severityMap[type] || ErrorSeverity.MEDIUM;
  }

  /**
   * Check if error is recoverable
   */
  private isRecoverable(type: NavigationErrorType): boolean {
    const recoverableErrors = [
      NavigationErrorType.LOADING_FAILED,
      NavigationErrorType.NETWORK_ERROR,
      NavigationErrorType.TIMEOUT_ERROR,
      NavigationErrorType.VALIDATION_FAILED,
      NavigationErrorType.ENROLLMENT_INVALID
    ];

    return recoverableErrors.includes(type);
  }

  /**
   * Get suggested action for error type
   */
  private getSuggestedAction(type: NavigationErrorType): string {
    const actions = {
      [NavigationErrorType.COURSE_NOT_FOUND]: 'Browse available courses or contact support',
      [NavigationErrorType.ACCESS_DENIED]: 'Check enrollment status or enroll in course',
      [NavigationErrorType.ENROLLMENT_INVALID]: 'Refresh enrollment status or contact support',
      [NavigationErrorType.CONTENT_UNAVAILABLE]: 'Try again later or contact support',
      [NavigationErrorType.LOADING_FAILED]: 'Refresh page or try again',
      [NavigationErrorType.NETWORK_ERROR]: 'Check internet connection and retry',
      [NavigationErrorType.VALIDATION_FAILED]: 'Refresh page or clear browser cache',
      [NavigationErrorType.AUTHENTICATION_REQUIRED]: 'Log in to your account',
      [NavigationErrorType.PERMISSION_DENIED]: 'Contact support for access',
      [NavigationErrorType.TIMEOUT_ERROR]: 'Try again with better connection'
    };

    return actions[type] || 'Contact support for assistance';
  }

  /**
   * Get recovery strategy for error type
   */
  private getRecoveryStrategy(type: NavigationErrorType): RecoveryStrategy {
    const strategies = {
      [NavigationErrorType.COURSE_NOT_FOUND]: RecoveryStrategy.REDIRECT,
      [NavigationErrorType.ACCESS_DENIED]: RecoveryStrategy.MANUAL_INTERVENTION,
      [NavigationErrorType.ENROLLMENT_INVALID]: RecoveryStrategy.REFRESH_DATA,
      [NavigationErrorType.CONTENT_UNAVAILABLE]: RecoveryStrategy.FALLBACK,
      [NavigationErrorType.LOADING_FAILED]: RecoveryStrategy.RETRY,
      [NavigationErrorType.NETWORK_ERROR]: RecoveryStrategy.RETRY,
      [NavigationErrorType.VALIDATION_FAILED]: RecoveryStrategy.REFRESH_DATA,
      [NavigationErrorType.AUTHENTICATION_REQUIRED]: RecoveryStrategy.REDIRECT,
      [NavigationErrorType.PERMISSION_DENIED]: RecoveryStrategy.CONTACT_SUPPORT,
      [NavigationErrorType.TIMEOUT_ERROR]: RecoveryStrategy.RETRY
    };

    return strategies[type] || RecoveryStrategy.MANUAL_INTERVENTION;
  }

  /**
   * Create recovery actions for error
   */
  private createRecoveryActions(error: NavigationError): ErrorRecoveryAction[] {
    const actions: ErrorRecoveryAction[] = [];

    switch (error.recoveryStrategy) {
      case RecoveryStrategy.RETRY:
        actions.push({
          type: RecoveryStrategy.RETRY,
          label: 'Try Again',
          action: () => this.retryNavigation(error),
          primary: true
        });
        break;

      case RecoveryStrategy.REDIRECT:
        actions.push({
          type: RecoveryStrategy.REDIRECT,
          label: 'Go to Courses',
          action: () => this.redirectToCourses(),
          primary: true
        });
        break;

      case RecoveryStrategy.REFRESH_DATA:
        actions.push({
          type: RecoveryStrategy.REFRESH_DATA,
          label: 'Refresh Data',
          action: () => this.refreshEnrollmentData(error),
          primary: true
        });
        break;

      case RecoveryStrategy.FALLBACK:
        actions.push({
          type: RecoveryStrategy.FALLBACK,
          label: 'View Course Info',
          action: () => this.showCourseFallback(error),
          primary: true
        });
        break;

      case RecoveryStrategy.CONTACT_SUPPORT:
        actions.push({
          type: RecoveryStrategy.CONTACT_SUPPORT,
          label: 'Contact Support',
          action: () => this.contactSupport(error),
          primary: true
        });
        break;
    }

    // Always add a fallback action
    if (actions.length === 0 || error.type !== NavigationErrorType.COURSE_NOT_FOUND) {
      actions.push({
        type: RecoveryStrategy.REDIRECT,
        label: 'Back to Courses',
        action: () => this.redirectToCourses(),
        primary: false
      });
    }

    return actions;
  }

  /**
   * Check if error can be retried
   */
  private canRetry(error: NavigationError): boolean {
    if (!error.recoverable) return false;

    const key = `${error.type}-${error.courseId || 'unknown'}`;
    const attempts = this.retryAttempts.get(key) || 0;
    
    return attempts < this.maxRetries;
  }

  /**
   * Calculate retry delay with exponential backoff
   */
  private calculateRetryDelay(error: NavigationError): number {
    const key = `${error.type}-${error.courseId || 'unknown'}`;
    const attempts = this.retryAttempts.get(key) || 0;
    
    return this.retryDelay * Math.pow(2, attempts);
  }

  /**
   * Recovery action implementations
   */
  private async retryNavigation(error: NavigationError): Promise<void> {
    const key = `${error.type}-${error.courseId || 'unknown'}`;
    const attempts = this.retryAttempts.get(key) || 0;
    this.retryAttempts.set(key, attempts + 1);

    // Implementation would depend on the specific navigation context
    console.log('🔄 Retrying navigation...', { error: error.type, attempts: attempts + 1 });
  }

  private redirectToCourses(): void {
    window.location.href = '/courses';
  }

  private async refreshEnrollmentData(error: NavigationError): Promise<void> {
    // Implementation would refresh enrollment data
    console.log('🔄 Refreshing enrollment data...', { courseId: error.courseId });
  }

  private showCourseFallback(error: NavigationError): void {
    // Implementation would show course info page
    console.log('📋 Showing course fallback...', { courseId: error.courseId });
  }

  private contactSupport(error: NavigationError): void {
    const supportUrl = `/support?error=${error.type}&course=${error.courseId}&timestamp=${error.timestamp.getTime()}`;
    window.open(supportUrl, '_blank');
  }

  /**
   * Update error metrics for monitoring
   */
  private updateErrorMetrics(error: NavigationError): void {
    const existing = this.errorMetrics.get(error.type);
    
    if (existing) {
      existing.count++;
      existing.lastOccurrence = error.timestamp;
    } else {
      this.errorMetrics.set(error.type, {
        errorType: error.type,
        count: 1,
        lastOccurrence: error.timestamp,
        successfulRecoveries: 0,
        failedRecoveries: 0
      });
    }
  }

  /**
   * Log error for debugging and monitoring
   */
  private logError(error: NavigationError): void {
    const logLevel = error.severity === ErrorSeverity.CRITICAL ? 'error' : 
                    error.severity === ErrorSeverity.HIGH ? 'warn' : 'info';

    console[logLevel]('🚨 Navigation Error:', {
      type: error.type,
      message: error.message,
      courseId: error.courseId,
      userId: error.userId,
      severity: error.severity,
      recoverable: error.recoverable,
      context: error.context,
      details: error.details,
      timestamp: error.timestamp
    });
  }

  /**
   * Get error metrics for monitoring
   */
  getErrorMetrics(): Map<NavigationErrorType, ErrorMetrics> {
    return new Map(this.errorMetrics);
  }

  /**
   * Clear retry attempts (useful for testing or manual reset)
   */
  clearRetryAttempts(): void {
    this.retryAttempts.clear();
  }

  /**
   * Record successful recovery
   */
  recordSuccessfulRecovery(errorType: NavigationErrorType): void {
    const metrics = this.errorMetrics.get(errorType);
    if (metrics) {
      metrics.successfulRecoveries++;
    }
  }

  /**
   * Record failed recovery
   */
  recordFailedRecovery(errorType: NavigationErrorType): void {
    const metrics = this.errorMetrics.get(errorType);
    if (metrics) {
      metrics.failedRecoveries++;
    }
  }
}

export const navigationErrorHandler = new NavigationErrorHandler();
export default NavigationErrorHandler;