/**
 * Navigation Error Types and Interfaces
 * Comprehensive error handling for course navigation system
 */

export enum NavigationErrorType {
  COURSE_NOT_FOUND = 'course_not_found',
  ACCESS_DENIED = 'access_denied',
  ENROLLMENT_INVALID = 'enrollment_invalid',
  CONTENT_UNAVAILABLE = 'content_unavailable',
  LOADING_FAILED = 'loading_failed',
  NETWORK_ERROR = 'network_error',
  VALIDATION_FAILED = 'validation_failed',
  AUTHENTICATION_REQUIRED = 'authentication_required',
  PERMISSION_DENIED = 'permission_denied',
  TIMEOUT_ERROR = 'timeout_error'
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum RecoveryStrategy {
  RETRY = 'retry',
  REDIRECT = 'redirect',
  FALLBACK = 'fallback',
  MANUAL_INTERVENTION = 'manual_intervention',
  REFRESH_DATA = 'refresh_data',
  CONTACT_SUPPORT = 'contact_support'
}

export interface NavigationError {
  type: NavigationErrorType;
  message: string;
  userMessage: string;
  courseId?: string;
  userId?: string;
  details: Record<string, any>;
  severity: ErrorSeverity;
  recoverable: boolean;
  suggestedAction: string;
  recoveryStrategy: RecoveryStrategy;
  timestamp: Date;
  context: NavigationContext;
}

export interface NavigationContext {
  route: string;
  component: string;
  userAgent?: string;
  sessionId?: string;
  enrollmentStatus?: string;
  previousRoute?: string;
  attemptCount?: number;
}

export interface ErrorRecoveryAction {
  type: RecoveryStrategy;
  label: string;
  action: () => Promise<void> | void;
  primary: boolean;
}

export interface NavigationErrorResult {
  error: NavigationError;
  recoveryActions: ErrorRecoveryAction[];
  canRetry: boolean;
  retryDelay?: number;
  maxRetries?: number;
}

export interface ErrorMetrics {
  errorType: NavigationErrorType;
  count: number;
  lastOccurrence: Date;
  averageResolutionTime?: number;
  successfulRecoveries: number;
  failedRecoveries: number;
}