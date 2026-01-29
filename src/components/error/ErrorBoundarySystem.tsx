/**
 * ErrorBoundarySystem
 * 
 * Comprehensive error boundary system with component-level error handling:
 * - Global error boundaries for different app sections
 * - Context-aware error recovery
 * - Error reporting and logging
 * - Fallback UI components
 * - Error state management
 */

import React, { Component, ErrorInfo, ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, AlertTriangle, Bug, Wifi, WifiOff, Database, Shield } from 'lucide-react';
import { logger } from '@/utils/logger';
import { errorLoggingService } from '@/services/errorLoggingService';

// Error types
export enum ErrorType {
  COMPONENT_ERROR = 'component_error',
  NETWORK_ERROR = 'network_error',
  DATABASE_ERROR = 'database_error',
  AUTH_ERROR = 'auth_error',
  VALIDATION_ERROR = 'validation_error',
  UNKNOWN_ERROR = 'unknown_error'
}

export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Error context
export interface ErrorContextType {
  errors: ErrorInfo[];
  reportError: (error: Error, errorInfo: ErrorInfo, context?: ErrorContext) => void;
  clearErrors: () => void;
  retryLastError: () => void;
  isOnline: boolean;
  setOnlineStatus: (online: boolean) => void;
}

export interface ErrorContext {
  componentName?: string;
  userId?: string;
  userRole?: string;
  timestamp?: number;
  severity?: ErrorSeverity;
  metadata?: Record<string, any>;
}

export interface ErrorInfo {
  id: string;
  error: Error;
  errorInfo: React.ErrorInfo;
  context: ErrorContext;
  timestamp: number;
  retryCount: number;
  resolved: boolean;
}

// Create error context
const ErrorContext = createContext<ErrorContextType | null>(null);

// Hook to use error context
export const useErrorBoundary = () => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorBoundary must be used within ErrorBoundaryProvider');
  }
  return context;
};

// Error boundary state
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string | null;
  retryCount: number;
}

// Base error boundary component
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  context?: ErrorContext;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const errorId = this.state.errorId || `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Log error
    logger.error('ErrorBoundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorId,
      context: this.props.context
    });

    // Report to error logging service
    if (this.props.context) {
      errorLoggingService.logError(error, {
        ...this.props.context,
        componentName: this.props.context.componentName || 'Unknown',
        errorId,
        errorType: ErrorType.COMPONENT_ERROR,
        severity: this.props.context.severity || ErrorSeverity.MEDIUM
      });
    }

    // Update state
    this.setState({
      errorInfo,
      errorId
    });

    // Call custom error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError, retryCount } = this.state;

    if (hasError && prevProps.resetKeys !== resetKeys) {
      if (resetKeys && resetKeys.length > 0) {
        this.resetErrorBoundary();
      }
    }

    if (hasError && resetOnPropsChange && prevProps.children !== this.props.children) {
      this.resetErrorBoundary();
    }

    // Auto-retry with exponential backoff
    if (hasError && retryCount < 3) {
      const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
      this.resetTimeoutId = window.setTimeout(() => {
        this.resetErrorBoundary();
      }, delay);
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = null;
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: this.state.retryCount + 1
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
          retryCount={this.state.retryCount}
          onRetry={this.resetErrorBoundary}
          context={this.props.context}
        />
      );
    }

    return this.props.children;
  }
}

// Error fallback component
interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorId: string | null;
  retryCount: number;
  onRetry: () => void;
  context?: ErrorContext;
}

function ErrorFallback({ error, errorInfo, errorId, retryCount, onRetry, context }: ErrorFallbackProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      onRetry();
    } finally {
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };

  const getErrorIcon = () => {
    if (error?.message.includes('network') || error?.message.includes('fetch')) {
      return <WifiOff className="h-8 w-8 text-red-500" />;
    }
    if (error?.message.includes('database') || error?.message.includes('supabase')) {
      return <Database className="h-8 w-8 text-red-500" />;
    }
    return <AlertTriangle className="h-8 w-8 text-red-500" />;
  };

  const getErrorSeverity = () => {
    if (retryCount >= 3) return ErrorSeverity.CRITICAL;
    if (retryCount >= 1) return ErrorSeverity.HIGH;
    return ErrorSeverity.MEDIUM;
  };

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          {getErrorIcon()}
          Application Error
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Something went wrong. {retryCount > 0 && `Retry attempt ${retryCount} failed.`}
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Badge variant="destructive">{getErrorSeverity()}</Badge>
            {errorId && <Badge variant="outline">ID: {errorId}</Badge>}
            <Badge variant="outline">Retries: {retryCount}/3</Badge>
          </div>

          {error && (
            <div className="text-sm text-red-700">
              <strong>Error:</strong> {error.message}
            </div>
          )}

          {context?.componentName && (
            <div className="text-sm text-red-700">
              <strong>Component:</strong> {context.componentName}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleRetry}
            disabled={isRetrying || retryCount >= 3}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />
            {isRetrying ? 'Retrying...' : 'Retry'}
          </Button>

          <Button
            variant="outline"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Reload Page
          </Button>
        </div>

        {retryCount >= 3 && (
          <Alert>
            <Bug className="h-4 w-4" />
            <AlertDescription>
              Multiple retry attempts failed. Please contact support if this issue persists.
            </AlertDescription>
          </Alert>
        )}

        {process.env.NODE_ENV === 'development' && errorInfo && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium">
              Technical Details (Development)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
              {errorInfo.componentStack}
            </pre>
          </details>
        )}
      </CardContent>
    </Card>
  );
}

// Error boundary provider
interface ErrorBoundaryProviderProps {
  children: ReactNode;
}

export function ErrorBoundaryProvider({ children }: ErrorBoundaryProviderProps) {
  const [errors, setErrors] = useState<ErrorInfo[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const reportError = (error: Error, errorInfo: React.ErrorInfo, context?: ErrorContext) => {
    const errorEntry: ErrorInfo = {
      id: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      error,
      errorInfo,
      context: context || {},
      timestamp: Date.now(),
      retryCount: 0,
      resolved: false
    };

    setErrors(prev => [...prev, errorEntry]);

    // Log to service
    errorLoggingService.logError(error, {
      ...context,
      errorType: ErrorType.COMPONENT_ERROR,
      severity: context?.severity || ErrorSeverity.MEDIUM
    });
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const retryLastError = () => {
    if (errors.length > 0) {
      const lastError = errors[errors.length - 1];
      if (!lastError.resolved) {
        // Implement retry logic here
        setErrors(prev => prev.map(err => 
          err.id === lastError.id 
            ? { ...err, retryCount: err.retryCount + 1 }
            : err
        ));
      }
    }
  };

  const value: ErrorContextType = {
    errors,
    reportError,
    clearErrors,
    retryLastError,
    isOnline,
    setOnlineStatus: setIsOnline
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
}

// Specialized error boundaries
export function NetworkErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      context={{
        componentName: 'NetworkErrorBoundary',
        severity: ErrorSeverity.HIGH
      }}
      fallback={
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6 text-center">
            <WifiOff className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-orange-800 mb-2">
              Network Connection Lost
            </h3>
            <p className="text-orange-700 mb-4">
              Please check your internet connection and try again.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function DatabaseErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      context={{
        componentName: 'DatabaseErrorBoundary',
        severity: ErrorSeverity.HIGH
      }}
      fallback={
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <Database className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Database Connection Error
            </h3>
            <p className="text-red-700 mb-4">
              Unable to connect to the database. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>
              Retry Connection
            </Button>
          </CardContent>
        </Card>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

export function AuthErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      context={{
        componentName: 'AuthErrorBoundary',
        severity: ErrorSeverity.CRITICAL
      }}
      fallback={
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Authentication Error
            </h3>
            <p className="text-red-700 mb-4">
              There was a problem with your authentication. Please log in again.
            </p>
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// HOC for wrapping components with error boundaries
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  context?: ErrorContext
) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary context={context}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

// Hook for manual error reporting
export function useErrorReporting() {
  const { reportError, isOnline } = useErrorBoundary();

  const reportComponentError = (error: Error, context?: ErrorContext) => {
    reportError(error, {
      componentStack: error.stack || 'No stack trace available'
    }, context);
  };

  const reportNetworkError = (error: Error, context?: ErrorContext) => {
    reportError(error, {
      componentStack: error.stack || 'Network error'
    }, {
      ...context,
      severity: ErrorSeverity.HIGH,
      componentName: 'NetworkError'
    });
  };

  const reportDatabaseError = (error: Error, context?: ErrorContext) => {
    reportError(error, {
      componentStack: error.stack || 'Database error'
    }, {
      ...context,
      severity: ErrorSeverity.HIGH,
      componentName: 'DatabaseError'
    });
  };

  return {
    reportComponentError,
    reportNetworkError,
    reportDatabaseError,
    isOnline
  };
}
