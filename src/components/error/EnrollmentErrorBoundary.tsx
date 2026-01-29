import React, { Component, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Wifi, WifiOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EnrollmentErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
  maxRetries?: number;
  retryDelay?: number;
  enrollmentContext?: {
    courseId?: string | undefined;
    userId?: string | undefined;
    operation?: 'enrollment' | 'payment' | 'status_update';
  };
}

interface EnrollmentErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
  retryCount: number;
  isRetrying: boolean;
  isOnline: boolean;
  lastRetryTime?: number;
  errorType: 'network' | 'validation' | 'permission' | 'system' | 'unknown';
  recoverySuggestions: string[];
}

class EnrollmentErrorBoundary extends Component<EnrollmentErrorBoundaryProps, EnrollmentErrorBoundaryState> {
  private retryTimeoutId?: NodeJS.Timeout;
  private onlineStatusListener?: () => void;

  constructor(props: EnrollmentErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: 0,
      isRetrying: false,
      isOnline: navigator.onLine,
      errorType: 'unknown',
      recoverySuggestions: []
    };
  }

  componentDidMount() {
    this.onlineStatusListener = () => {
      this.setState({ isOnline: navigator.onLine });
      
      // Auto-retry when back online if we had a network error
      if (navigator.onLine && this.state.hasError && this.state.errorType === 'network') {
        this.handleRetry();
      }
    };

    window.addEventListener('online', this.onlineStatusListener);
    window.addEventListener('offline', this.onlineStatusListener);
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
    if (this.onlineStatusListener) {
      window.removeEventListener('online', this.onlineStatusListener);
      window.removeEventListener('offline', this.onlineStatusListener);
    }
  }

  static getDerivedStateFromError(error: Error): Partial<EnrollmentErrorBoundaryState> {
    const errorType = EnrollmentErrorBoundary.categorizeError(error);
    const recoverySuggestions = EnrollmentErrorBoundary.getRecoverySuggestions(errorType);
    
    return {
      hasError: true,
      error,
      errorType,
      recoverySuggestions
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ errorInfo });
    
    // Log error with enrollment context
    console.error('EnrollmentErrorBoundary caught error:', {
      error: error.message,
      stack: error.stack,
      errorInfo,
      enrollmentContext: this.props.enrollmentContext,
      timestamp: new Date().toISOString()
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Send error to monitoring service
    this.reportError(error, errorInfo);
  }

  private static categorizeError(error: Error): EnrollmentErrorBoundaryState['errorType'] {
    const message = error.message.toLowerCase();
    
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) {
      return 'network';
    }
    if (message.includes('validation') || message.includes('invalid') || message.includes('required')) {
      return 'validation';
    }
    if (message.includes('permission') || message.includes('unauthorized') || message.includes('forbidden')) {
      return 'permission';
    }
    if (message.includes('server') || message.includes('database') || message.includes('supabase')) {
      return 'system';
    }
    
    return 'unknown';
  }

  private static getRecoverySuggestions(errorType: EnrollmentErrorBoundaryState['errorType']): string[] {
    switch (errorType) {
      case 'network':
        return [
          'Check your internet connection',
          'Try refreshing the page',
          'Wait a moment and try again'
        ];
      case 'validation':
        return [
          'Verify all required fields are filled',
          'Check that your information is correct',
          'Contact support if the problem persists'
        ];
      case 'permission':
        return [
          'Make sure you are logged in',
          'Check if you have permission for this action',
          'Try logging out and back in'
        ];
      case 'system':
        return [
          'The system is temporarily unavailable',
          'Please try again in a few minutes',
          'Contact support if the issue continues'
        ];
      default:
        return [
          'An unexpected error occurred',
          'Try refreshing the page',
          'Contact support if the problem persists'
        ];
    }
  }

  private reportError(error: Error, errorInfo: any) {
    // Send error to monitoring service
    try {
      const errorReport = {
        type: 'enrollment_error',
        error: error.message,
        stack: error.stack,
        errorType: this.state.errorType,
        enrollmentContext: this.props.enrollmentContext,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
      };

      // Send to your error monitoring service
      console.log('Error report:', errorReport);
      
      // You could send this to a service like Sentry, LogRocket, etc.
      // Example: Sentry.captureException(error, { extra: errorReport });
      
    } catch (reportingError) {
      console.error('Failed to report error:', reportingError);
    }
  }

  handleRetry = () => {
    const { maxRetries = 3, retryDelay = 1000 } = this.props;
    
    if (this.state.retryCount >= maxRetries) {
      console.warn('Maximum retry attempts reached');
      return;
    }

    this.setState({ isRetrying: true, lastRetryTime: Date.now() });

    this.retryTimeoutId = setTimeout(() => {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: prevState.retryCount + 1,
        isRetrying: false
      }));
    }, retryDelay * Math.pow(2, this.state.retryCount)); // Exponential backoff
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      retryCount: 0,
      isRetrying: false
    });
  };

  getErrorIcon = () => {
    const { errorType, isOnline } = this.state;
    
    if (!isOnline) {
      return <WifiOff className="w-8 h-8 text-red-500" />;
    }
    
    switch (errorType) {
      case 'network':
        return <Wifi className="w-8 h-8 text-orange-500" />;
      case 'validation':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      case 'permission':
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
      case 'system':
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
      default:
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
    }
  };

  getErrorTitle = () => {
    const { errorType, isOnline } = this.state;
    
    if (!isOnline) {
      return 'No Internet Connection';
    }
    
    switch (errorType) {
      case 'network':
        return 'Connection Error';
      case 'validation':
        return 'Validation Error';
      case 'permission':
        return 'Access Denied';
      case 'system':
        return 'System Error';
      default:
        return 'Enrollment Error';
    }
  };

  render() {
    const { hasError, error, retryCount, isRetrying, isOnline, recoverySuggestions } = this.state;
    const { children, fallbackComponent } = this.props;

    if (hasError) {
      if (fallbackComponent) {
        return fallbackComponent;
      }

      return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {this.getErrorIcon()}
            </div>
            <CardTitle className="text-xl text-red-600">
              {this.getErrorTitle()}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Connection Status */}
            <div className="flex items-center justify-center gap-2">
              {isOnline ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <WifiOff className="w-4 h-4 text-red-500" />
              )}
              <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
                {isOnline ? 'Connected' : 'Offline'}
              </span>
            </div>

            {/* Error Message */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {error?.message || 'Something went wrong with the enrollment process.'}
              </p>
            </div>

            {/* Recovery Suggestions */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">Try these steps:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {recoverySuggestions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Retry Information */}
            {retryCount > 0 && (
              <div className="text-xs text-gray-500 text-center">
                Retry attempt {retryCount} of {this.props.maxRetries || 3}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={this.handleRetry}
                disabled={isRetrying || retryCount >= (this.props.maxRetries || 3)}
                className="flex-1"
                variant={isOnline ? "default" : "outline"}
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Retrying...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </>
                )}
              </Button>
              
              <Button
                onClick={this.handleReset}
                variant="outline"
                className="flex-1"
              >
                Reset
              </Button>
            </div>

            {/* Technical Details (Development Only) */}
            {import.meta.env.DEV && error && (
              <details className="text-xs text-gray-500">
                <summary className="cursor-pointer">Technical Details</summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto">
                  {error.stack}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>
      );
    }

    return children;
  }
}

export default EnrollmentErrorBoundary;
