/**
 * Core TypeScript interfaces for payment error handling
 * Supports requirements 1.1-1.6 and 6.1-6.4
 */

export interface PaymentError {
  code: string;
  message: string;
  details?: any;
  source: 'ikhokha' | 'validation' | 'network' | 'system';
}

export interface ProcessedPaymentError {
  userMessage: UserErrorMessage;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'card' | 'network' | 'system' | 'validation';
  actionable: boolean;
}

export interface UserErrorMessage {
  title: string;
  description: string;
  actions: ErrorAction[];
  icon: string;
  variant: 'destructive' | 'warning' | 'info';
}

export interface ErrorAction {
  label: string;
  action: 'retry' | 'contact_support' | 'try_eft' | 'try_different_card';
  primary?: boolean;
}

export interface ErrorContext {
  userId?: string;
  courseId?: string;
  paymentMethod?: string;
  attemptCount?: number;
  isTestMode?: boolean;
  userAgent?: string;
  ipAddress?: string;
}

export interface ProgressiveErrorContext extends ErrorContext {
  sessionAttempts?: number;
  consecutiveFailures?: number;
  timeSpentOnPayment?: number;
  errorHistory?: any; // Will be properly typed in ProgressiveErrorHandler
}

export interface ErrorMessageTemplate {
  code: string;
  category: string;
  title: string;
  description: string;
  actions: string[];
  severity: string;
  context_variables?: string[];
}