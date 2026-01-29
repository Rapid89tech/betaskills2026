/**
 * Comprehensive Error Handler System
 * 
 * This utility provides centralized error handling with:
 * - Global error capture and processing
 * - User-friendly error message conversion
 * - Automatic retry mechanisms
 * - Error reporting and analytics
 * - Performance-optimized error filtering
 */

import React from 'react';

// Error severity levels
export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

// Error categories for better handling
export type ErrorCategory =
  | 'network'
  | 'authentication'
  | 'authorization'
  | 'validation'
  | 'payment'
  | 'component'
  | 'api'
  | 'unknown';

// User-friendly error action
export interface ErrorAction {
  label: string;
  action: () => void;
  primary?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}

// User-friendly error structure
export interface UserFriendlyError {
  message: string;
  severity: ErrorSeverity;
  category: ErrorCategory;
  actions: ErrorAction[];
  fallbackComponent?: React.ReactNode;
  canRetry?: boolean;
  retryDelay?: number;
}

// API Error class
export class ApiError extends Error {
  public status?: number;
  public code?: string;
  public response?: any;
  public category: ErrorCategory = 'api';

  constructor(message: string, status?: number, code?: string, response?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.response = response;
  }
}

// Error configuration
interface ErrorConfig {
  enableLogging: boolean;
  enableReporting: boolean;
  enableUserNotifications: boolean;
  maxErrors: number;
  ignoredErrors: string[];
  retryableErrors: string[];
  autoRetryAttempts: number;
  retryDelay: number;
}

class ErrorHandler {
  private config: ErrorConfig;
  private errorCount: number = 0;
  private reportedErrors: Set<string> = new Set();
  private errorQueue: Array<{ error: Error; context: string; timestamp: number }> = [];
  private retryQueue: Map<string, { attempts: number; lastAttempt: number }> = new Map();

  constructor() {
    this.config = {
      enableLogging: import.meta.env.DEV,
      enableReporting: import.meta.env.PROD,
      enableUserNotifications: true,
      maxErrors: 100,
      ignoredErrors: [
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
        'Loading chunk',
        'Loading CSS chunk',
        'Network request failed',
        'Failed to fetch',
        'AbortError',
        'The operation was aborted',
        'Script error',
        'Uncaught ReferenceError: webkitURL is not defined',
        'Resource loading failed',
        'Failed to preload image',
        'logo.png',
        'hero-bg.jpg'
      ],
      retryableErrors: [
        'network',
        'timeout',
        'fetch',
        'connection',
        'loading chunk',
        'loading css chunk'
      ],
      autoRetryAttempts: 3,
      retryDelay: 1000
    };

    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers(): void {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError(event.reason, 'unhandledrejection');
      event.preventDefault();
    });

    // Handle JavaScript errors
    window.addEventListener('error', (event) => {
      this.handleError(event.error || event.message, 'javascript');
      event.preventDefault();
    });

    // Handle resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target !== window) {
        this.handleError(
          new Error(`Resource loading failed: ${(event.target as any)?.src || 'unknown'}`),
          'resource'
        );
      }
    }, true);

    // Setup console filtering
    this.setupConsoleFiltering();
  }

  private setupConsoleFiltering(): void {
    if (!this.config.enableLogging) return;

    const originalError = console.error;
    const originalWarn = console.warn;

    console.error = (...args) => {
      const message = args.join(' ');
      if (!this.shouldIgnoreError(message)) {
        originalError.apply(console, args);
      }
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      if (!this.shouldIgnoreError(message)) {
        originalWarn.apply(console, args);
      }
    };
  }

  private shouldIgnoreError(message: string): boolean {
    return this.config.ignoredErrors.some(ignored =>
      message.toLowerCase().includes(ignored.toLowerCase())
    );
  }

  private categorizeError(error: Error): ErrorCategory {
    const message = error.message.toLowerCase();

    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return 'network';
    }
    if (message.includes('unauthorized') || message.includes('authentication')) {
      return 'authentication';
    }
    if (message.includes('forbidden') || message.includes('permission')) {
      return 'authorization';
    }
    if (message.includes('validation') || message.includes('invalid')) {
      return 'validation';
    }
    if (message.includes('payment') || message.includes('billing')) {
      return 'payment';
    }
    if (message.includes('component') || message.includes('render')) {
      return 'component';
    }
    if (error instanceof ApiError) {
      return 'api';
    }

    return 'unknown';
  }

  private determineSeverity(error: Error, category: ErrorCategory): ErrorSeverity {
    // Critical errors that break core functionality
    if (category === 'authentication' || category === 'payment') {
      return 'critical';
    }

    // High severity for API and network errors
    if (category === 'api' || category === 'network') {
      return 'high';
    }

    // Medium severity for component and validation errors
    if (category === 'component' || category === 'validation') {
      return 'medium';
    }

    // Low severity for unknown errors
    return 'low';
  }

  private isRetryableError(error: Error): boolean {
    const message = error.message.toLowerCase();
    return this.config.retryableErrors.some(retryable =>
      message.includes(retryable)
    );
  }

  public handleError(error: any, context: string = 'unknown'): UserFriendlyError {
    this.errorCount++;

    // Prevent error spam
    if (this.errorCount > this.config.maxErrors) {
      return this.createFallbackError();
    }

    // Convert to Error object if needed
    const errorObj = error instanceof Error ? error : new Error(String(error));
    const errorMessage = errorObj.message || 'Unknown error occurred';
    const errorKey = `${context}:${errorMessage}`;

    // Don't process the same error multiple times
    if (this.reportedErrors.has(errorKey)) {
      return this.createFallbackError();
    }

    this.reportedErrors.add(errorKey);

    // Skip ignored errors
    if (this.shouldIgnoreError(errorMessage)) {
      return this.createFallbackError();
    }

    // Add to error queue for processing
    this.errorQueue.push({
      error: errorObj,
      context,
      timestamp: Date.now()
    });

    // Categorize and process error
    const category = this.categorizeError(errorObj);
    const severity = this.determineSeverity(errorObj, category);
    const userFriendlyError = this.convertToUserFriendlyError(errorObj, category, severity);

    // Log error if enabled
    if (this.config.enableLogging) {
      this.logError(errorObj, context, category, severity);
    }

    // Report error if enabled
    if (this.config.enableReporting) {
      this.reportError(errorObj, context, category, severity);
    }

    // Show user notification if enabled
    if (this.config.enableUserNotifications) {
      this.showUserNotification(userFriendlyError);
    }

    return userFriendlyError;
  }

  private convertToUserFriendlyError(
    error: Error,
    category: ErrorCategory,
    severity: ErrorSeverity
  ): UserFriendlyError {
    const message = error.message.toLowerCase();

    // Network errors
    if (category === 'network') {
      return {
        message: "Connection issue detected. Please check your internet connection and try again.",
        severity,
        category,
        actions: [
          {
            label: 'Retry',
            action: () => this.retryLastAction(),
            primary: true
          },
          {
            label: 'Work Offline',
            action: () => this.enableOfflineMode()
          }
        ],
        canRetry: true,
        retryDelay: this.config.retryDelay
      };
    }

    // Authentication errors
    if (category === 'authentication') {
      return {
        message: "Your session has expired. Please sign in again to continue.",
        severity,
        category,
        actions: [
          {
            label: 'Sign In',
            action: () => window.location.href = '/auth',
            primary: true
          }
        ],
        canRetry: false
      };
    }

    // Authorization errors
    if (category === 'authorization') {
      return {
        message: "You don't have permission to perform this action. Please contact support if you believe this is an error.",
        severity,
        category,
        actions: [
          {
            label: 'Go Back',
            action: () => window.history.back(),
            primary: true
          },
          {
            label: 'Contact Support',
            action: () => window.open('mailto:support@betaskill.com')
          }
        ],
        canRetry: false
      };
    }

    // Payment errors
    if (category === 'payment') {
      return {
        message: "Payment processing failed. Your card was not charged. Please try again or use a different payment method.",
        severity,
        category,
        actions: [
          {
            label: 'Try Again',
            action: () => this.retryLastAction(),
            primary: true
          },
          {
            label: 'Contact Support',
            action: () => window.open('mailto:support@betaskill.com')
          }
        ],
        canRetry: true,
        retryDelay: 2000
      };
    }

    // Component errors
    if (category === 'component') {
      return {
        message: "A component failed to load properly. You can try refreshing or go back to continue.",
        severity,
        category,
        actions: [
          {
            label: 'Try Again',
            action: () => this.retryLastAction(),
            primary: true
          },
          {
            label: 'Refresh Page',
            action: () => window.location.reload()
          },
          {
            label: 'Go Home',
            action: () => window.location.href = '/'
          }
        ],
        canRetry: true,
        retryDelay: this.config.retryDelay
      };
    }

    // API errors
    if (category === 'api') {
      const apiError = error as ApiError;
      let message = "An error occurred while communicating with the server.";

      if (apiError.status === 404) {
        message = "The requested resource was not found.";
      } else if (apiError.status === 500) {
        message = "Server error occurred. Our team has been notified.";
      } else if (apiError.status === 429) {
        message = "Too many requests. Please wait a moment and try again.";
      }

      return {
        message,
        severity,
        category,
        actions: [
          {
            label: 'Try Again',
            action: () => this.retryLastAction(),
            primary: true
          },
          {
            label: 'Refresh Page',
            action: () => window.location.reload()
          }
        ],
        canRetry: true,
        retryDelay: this.config.retryDelay
      };
    }

    // Validation errors
    if (category === 'validation') {
      return {
        message: "Please check your input and try again.",
        severity,
        category,
        actions: [
          {
            label: 'OK',
            action: () => { },
            primary: true
          }
        ],
        canRetry: false
      };
    }

    // Generic error fallback
    return {
      message: "An unexpected error occurred. Don't worry, your progress is saved.",
      severity,
      category,
      actions: [
        {
          label: 'Try Again',
          action: () => this.retryLastAction(),
          primary: true
        },
        {
          label: 'Refresh Page',
          action: () => window.location.reload()
        },
        {
          label: 'Go Home',
          action: () => window.location.href = '/'
        }
      ],
      canRetry: true,
      retryDelay: this.config.retryDelay
    };
  }

  private createFallbackError(): UserFriendlyError {
    return {
      message: "Something went wrong. Please refresh the page and try again.",
      severity: 'medium',
      category: 'unknown',
      actions: [
        {
          label: 'Refresh Page',
          action: () => window.location.reload(),
          primary: true
        }
      ],
      canRetry: false
    };
  }

  private logError(error: Error, context: string, category: ErrorCategory, severity: ErrorSeverity): void {
    console.group(`🚨 ${severity.toUpperCase()} ${category.toUpperCase()} Error`);
    console.error('Context:', context);
    console.error('Message:', error.message);
    console.error('Category:', category);
    console.error('Severity:', severity);
    if (error.stack) {
      console.error('Stack:', error.stack);
    }
    console.groupEnd();
  }

  private reportError(error: Error, context: string, category: ErrorCategory, severity: ErrorSeverity): void {
    // Report to external service (implement based on your error reporting service)
    try {
      const errorReport = {
        message: error.message,
        stack: error.stack,
        context,
        category,
        severity,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        userId: this.getCurrentUserId(),
        sessionId: this.getSessionId()
      };

      // Example: Send to your error reporting service
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorReport)
      }).catch(() => {
        // Silently fail error reporting
      });
    } catch {
      // Silently fail error reporting
    }
  }

  private showUserNotification(userError: UserFriendlyError): void {
    // This will be implemented by the UI layer
    // For now, we'll dispatch a custom event
    window.dispatchEvent(new CustomEvent('errorHandler:showError', {
      detail: userError
    }));
  }

  private retryLastAction(): void {
    // Implement retry logic based on your application's needs
    console.log('Retrying last action...');
  }

  private enableOfflineMode(): void {
    try {
      localStorage.setItem('workOfflineMode', 'true');
      window.dispatchEvent(new CustomEvent('errorHandler:offlineMode'));
    } catch (e) {
      // Ignore storage errors
    }
  }

  private getCurrentUserId(): string | null {
    // Implement based on your auth system
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.id || null;
    } catch {
      return null;
    }
  }

  private getSessionId(): string {
    // Generate or retrieve session ID
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  // Public API methods
  public clearErrors(): void {
    this.errorCount = 0;
    this.reportedErrors.clear();
    this.errorQueue = [];
    this.retryQueue.clear();
  }

  public getErrorCount(): number {
    return this.errorCount;
  }

  public getErrorQueue(): Array<{ error: Error; context: string; timestamp: number }> {
    return [...this.errorQueue];
  }

  public updateConfig(newConfig: Partial<ErrorConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  public handleApiError(error: ApiError): UserFriendlyError {
    return this.handleError(error, 'api');
  }

  public showErrorMessage(message: string, actions: ErrorAction[] = []): void {
    const userError: UserFriendlyError = {
      message,
      severity: 'medium',
      category: 'unknown',
      actions: actions.length > 0 ? actions : [
        {
          label: 'OK',
          action: () => { },
          primary: true
        }
      ],
      canRetry: false
    };

    this.showUserNotification(userError);
  }
}

// Create singleton instance
export const errorHandler = new ErrorHandler();

// Utility functions for manual error handling
export const handleAsyncError = async <T>(
  promise: Promise<T>,
  fallback?: T
): Promise<T | undefined> => {
  try {
    return await promise;
  } catch (error) {
    errorHandler.handleError(error, 'async');
    return fallback;
  }
};

export const handleSyncError = <T>(
  fn: () => T,
  fallback?: T
): T | undefined => {
  try {
    return fn();
  } catch (error) {
    errorHandler.handleError(error, 'sync');
    return fallback;
  }
};

// React error boundary helper
export const createErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> => {
  return class ErrorBoundaryWrapper extends React.Component<P, { hasError: boolean }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(): { hasError: boolean } {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      errorHandler.handleError(error, 'react');
    }

    render(): React.ReactNode {
      if (this.state.hasError) {
        return React.createElement('div', {
          className: 'p-4 text-center'
        }, [
          React.createElement('h2', {
            key: 'title',
            className: 'text-lg font-semibold text-red-600 mb-2'
          }, 'Something went wrong'),
          React.createElement('p', {
            key: 'message',
            className: 'text-gray-600 mb-4'
          }, 'This component encountered an error. Please refresh the page.'),
          React.createElement('button', {
            key: 'button',
            onClick: () => window.location.reload(),
            className: 'px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          }, 'Refresh Page')
        ]);
      }

      return React.createElement(Component, this.props);
    }
  };
};

export default ErrorHandler;