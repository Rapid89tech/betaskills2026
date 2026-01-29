import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, RefreshCw, Home, ArrowLeft, Wifi, WifiOff, Settings } from 'lucide-react';
import { errorHandler, type ErrorAction, type UserFriendlyError } from '@/utils/ErrorHandler';
import ComprehensiveErrorRecovery from './ComprehensiveErrorRecovery';

interface EnhancedErrorAction extends ErrorAction {
  icon?: React.ComponentType<{ className?: string }>;
}

interface EnhancedUserFriendlyError extends UserFriendlyError {
  actions: EnhancedErrorAction[];
  fallbackComponent?: ReactNode;
}

interface Props {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  maxRetries?: number;
  retryDelay?: number;
  enableComprehensiveRecovery?: boolean;
  context?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
  isRetrying: boolean;
  userFriendlyError?: EnhancedUserFriendlyError;
  isOnline: boolean;
  showComprehensiveRecovery: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  private retryTimeoutId?: NodeJS.Timeout;
  private readonly maxRetries: number;
  private readonly retryDelay: number;

  constructor(props: Props) {
    super(props);
    this.maxRetries = props.maxRetries || 3;
    this.retryDelay = props.retryDelay || 1000;
    this.state = { 
      hasError: false, 
      retryCount: 0, 
      isRetrying: false,
      isOnline: navigator.onLine,
      showComprehensiveRecovery: false
    };
  }

  componentDidMount() {
    // Listen for online/offline events
    window.addEventListener('online', this.handleOnlineStatusChange);
    window.addEventListener('offline', this.handleOnlineStatusChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleOnlineStatusChange);
    window.removeEventListener('offline', this.handleOnlineStatusChange);
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  handleOnlineStatusChange = () => {
    this.setState({ isOnline: navigator.onLine });
    
    // If we're back online and had an error, attempt automatic recovery
    if (navigator.onLine && this.state.hasError && this.state.retryCount < this.maxRetries) {
      this.attemptAutomaticRecovery();
    }
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Use centralized error handler
    errorHandler.handleError(error, 'ErrorBoundary');
    
    const userFriendlyError = this.convertToUserFriendlyError(error);
    
    this.setState({ 
      error, 
      errorInfo, 
      userFriendlyError 
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Attempt automatic recovery for certain error types
    if (this.shouldAttemptAutomaticRecovery(error)) {
      this.attemptAutomaticRecovery();
    }
  }

  convertToUserFriendlyError = (error: Error): EnhancedUserFriendlyError => {
    const errorMessage = error.message.toLowerCase();
    
    // Network-related errors
    if (errorMessage.includes('network') || errorMessage.includes('fetch') || !this.state.isOnline) {
      return {
        message: "Connection issue detected. Please check your internet connection and try again.",
        severity: 'medium',
        actions: [
          {
            label: 'Retry',
            action: this.handleRetry,
            primary: true,
            icon: RefreshCw
          },
          {
            label: 'Work Offline',
            action: this.handleWorkOffline,
            icon: WifiOff
          }
        ]
      };
    }

    // Chunk loading errors (common with code splitting)
    if (errorMessage.includes('loading chunk') || errorMessage.includes('loading css chunk')) {
      return {
        message: "Failed to load application resources. This usually happens after an update.",
        severity: 'medium',
        actions: [
          {
            label: 'Reload Page',
            action: this.handleReload,
            primary: true,
            icon: RefreshCw
          },
          {
            label: 'Clear Cache & Reload',
            action: this.handleClearCacheAndReload,
            icon: RefreshCw
          }
        ]
      };
    }

    // Component rendering errors
    if (errorMessage.includes('render') || errorMessage.includes('component')) {
      return {
        message: "A component failed to load properly. You can try refreshing or go back to continue.",
        severity: 'low',
        actions: [
          {
            label: 'Try Again',
            action: this.handleRetry,
            primary: true,
            icon: RefreshCw
          },
          {
            label: 'Go Back',
            action: this.handleGoBack,
            icon: ArrowLeft
          },
          {
            label: 'Go Home',
            action: this.handleGoHome,
            icon: Home
          }
        ]
      };
    }

    // Generic error
    return {
      message: "An unexpected error occurred. Don't worry, your progress is saved.",
      severity: 'medium',
      actions: [
        {
          label: 'Try Again',
          action: this.handleRetry,
          primary: true,
          icon: RefreshCw
        },
        {
          label: 'Reload Page',
          action: this.handleReload,
          icon: RefreshCw
        },
        {
          label: 'Go Home',
          action: this.handleGoHome,
          icon: Home
        }
      ]
    };
  };

  shouldAttemptAutomaticRecovery = (error: Error): boolean => {
    const errorMessage = error.message.toLowerCase();
    
    // Attempt automatic recovery for network errors and chunk loading errors
    return (
      errorMessage.includes('network') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('loading chunk') ||
      !this.state.isOnline
    );
  };

  attemptAutomaticRecovery = async (): Promise<void> => {
    if (this.state.retryCount >= this.maxRetries || this.state.isRetrying) {
      return;
    }

    this.setState({ isRetrying: true });

    // Wait for retry delay
    await new Promise(resolve => {
      this.retryTimeoutId = setTimeout(resolve, this.retryDelay * (this.state.retryCount + 1));
    });

    try {
      // Attempt to recover by clearing the error state
      this.setState({ 
        hasError: false, 
        error: undefined, 
        errorInfo: undefined,
        userFriendlyError: undefined,
        retryCount: this.state.retryCount + 1,
        isRetrying: false
      });
    } catch (recoveryError) {
      // If recovery fails, increment retry count and stop retrying
      this.setState({ 
        retryCount: this.state.retryCount + 1,
        isRetrying: false
      });
    }
  };

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      userFriendlyError: undefined,
      retryCount: 0,
      isRetrying: false
    });
  };

  handleReload = () => {
    // Save current state to sessionStorage for recovery
    try {
      const currentPath = window.location.pathname + window.location.search;
      sessionStorage.setItem('errorBoundary_recoveryPath', currentPath);
    } catch (e) {
      // Ignore storage errors
    }
    window.location.reload();
  };

  handleClearCacheAndReload = () => {
    // Clear caches and reload
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
        this.handleReload();
      });
    } else {
      this.handleReload();
    }
  };

  handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.handleGoHome();
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleWorkOffline = () => {
    // Set a flag to indicate offline mode and clear error
    try {
      localStorage.setItem('workOfflineMode', 'true');
    } catch (e) {
      // Ignore storage errors
    }
    this.handleRetry();
  };

  handleShowComprehensiveRecovery = () => {
    this.setState({ showComprehensiveRecovery: true });
  };

  handleComprehensiveRecoveryComplete = () => {
    this.setState({ 
      hasError: false, 
      error: undefined, 
      errorInfo: undefined,
      userFriendlyError: undefined,
      retryCount: 0,
      isRetrying: false,
      showComprehensiveRecovery: false
    });
  };

  handleComprehensiveRecoveryFailed = (recoveryError: Error) => {
    // Keep the error state but hide comprehensive recovery
    this.setState({ showComprehensiveRecovery: false });
  };

  renderFallbackUI = (): ReactNode => {
    const { userFriendlyError, isRetrying, retryCount, isOnline, showComprehensiveRecovery, error } = this.state;

    // Show comprehensive recovery system if enabled and requested
    if (showComprehensiveRecovery && error && this.props.enableComprehensiveRecovery) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
          <div className="w-full max-w-6xl">
            <ComprehensiveErrorRecovery
              error={error}
              context={this.props.context || 'Application'}
              onRecoveryComplete={this.handleComprehensiveRecoveryComplete}
              onRecoveryFailed={this.handleComprehensiveRecoveryFailed}
            />
          </div>
        </div>
      );
    }
    
    // If a custom fallback component is provided, use it
    if (this.props.fallbackComponent) {
      return this.props.fallbackComponent;
    }

    // If we have a user-friendly error with a custom fallback, use it
    if (userFriendlyError?.fallbackComponent) {
      return userFriendlyError.fallbackComponent;
    }

    const errorToDisplay = userFriendlyError || {
      message: "An unexpected error occurred. Don't worry, your progress is saved.",
      severity: 'medium' as const,
      actions: [
        {
          label: 'Try Again',
          action: this.handleRetry,
          primary: true,
          icon: RefreshCw
        }
      ]
    };

    const getSeverityColor = (severity: string) => {
      switch (severity) {
        case 'high': return 'text-red-500';
        case 'medium': return 'text-orange-500';
        case 'low': return 'text-yellow-500';
        default: return 'text-red-500';
      }
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className={`h-12 w-12 ${getSeverityColor(errorToDisplay.severity)} mr-2`} />
              {!isOnline && <WifiOff className="h-6 w-6 text-gray-500" />}
              {isOnline && <Wifi className="h-6 w-6 text-green-500" />}
            </div>
            <CardTitle className="text-xl">
              {isRetrying ? 'Attempting Recovery...' : 'Something went wrong'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600 text-center">
              {errorToDisplay.message}
            </p>

            {!isOnline && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm text-center">
                  You're currently offline. Some features may not work properly.
                </p>
              </div>
            )}

            {retryCount > 0 && retryCount < this.maxRetries && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-blue-800 text-sm text-center">
                  Automatic recovery attempt {retryCount} of {this.maxRetries}
                </p>
              </div>
            )}

            {retryCount >= this.maxRetries && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm text-center">
                  Automatic recovery failed. Please try manual recovery options below.
                </p>
              </div>
            )}
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="text-sm">
                <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            
            <div className="grid gap-2">
              {errorToDisplay.actions.map((action, index) => {
                const IconComponent = action.icon || RefreshCw;
                return (
                  <Button 
                    key={index}
                    onClick={action.action} 
                    variant={action.primary ? "default" : "outline"}
                    disabled={isRetrying}
                    className="w-full"
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {action.label}
                  </Button>
                );
              })}
              
              {/* Add comprehensive recovery option if enabled */}
              {this.props.enableComprehensiveRecovery && (
                <Button 
                  onClick={this.handleShowComprehensiveRecovery}
                  variant="outline"
                  disabled={isRetrying}
                  className="w-full"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Recovery Options
                </Button>
              )}
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Error ID: {this.state.error?.name || 'Unknown'}-{Date.now().toString(36)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  render() {
    if (this.state.hasError) {
      return this.renderFallbackUI();
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
