/**
 * Application Error Boundary System
 * 
 * Enhanced error boundary component with:
 * - Automatic recovery mechanisms
 * - Error classification system
 * - Retry mechanisms with exponential backoff
 * - User-friendly error messages and recovery options
 * - Integration with existing error handling infrastructure
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  RefreshCw, 
  Home, 
  ArrowLeft, 
  Wifi, 
  WifiOff, 
  Settings,
  Shield,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { errorHandler, type UserFriendlyError, type ErrorCategory, type ErrorSeverity } from '@/utils/ErrorHandler';
import { fallbackManager } from '@/utils/FallbackManager';
import ComprehensiveErrorRecovery from '../ComprehensiveErrorRecovery';

// Error classification types
export type ApplicationErrorType = 
  | 'critical'      // Application cannot continue
  | 'recoverable'   // Can be handled with retry/fallback
  | 'user'          // Requires user intervention
  | 'transient';    // Temporary issues

export interface ErrorClassification {
  type: ApplicationErrorType;
  category: ErrorCategory;
  severity: ErrorSeverity;
  isRetryable: boolean;
  requiresUserAction: boolean;
  canUseCache: boolean;
  maxRetries: number;
  baseRetryDelay: number;
}

export interface RecoveryStrategy {
  name: string;
  description: string;
  execute: () => Promise<boolean>;
  canExecute: (error: Error, classification: ErrorClassification) => boolean;
  priority: number;
}

export interface ApplicationErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo, classification: ErrorClassification) => void;
  onRecovery?: (strategy: string, success: boolean) => void;
  enableComprehensiveRecovery?: boolean;
  enableAutomaticRecovery?: boolean;
  maxRetries?: number;
  retryDelay?: number;
  context?: string;
  className?: string;
}

interface ApplicationErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  classification?: ErrorClassification;
  userFriendlyError?: UserFriendlyError;
  retryCount: number;
  isRetrying: boolean;
  recoveryProgress: number;
  activeRecoveryStrategy?: string;
  recoveryAttempts: RecoveryAttempt[];
  showComprehensiveRecovery: boolean;
  networkStatus: boolean;
  lastSuccessfulRender: number;
}

interface RecoveryAttempt {
  strategy: string;
  timestamp: number;
  success: boolean;
  error?: string;
}

class ApplicationErrorBoundary extends Component<ApplicationErrorBoundaryProps, ApplicationErrorBoundaryState> {
  private retryTimeoutId?: NodeJS.Timeout;
  private recoveryStrategies: RecoveryStrategy[];
  private errorClassifier: ErrorClassifier;

  constructor(props: ApplicationErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      retryCount: 0,
      isRetrying: false,
      recoveryProgress: 0,
      recoveryAttempts: [],
      showComprehensiveRecovery: false,
      networkStatus: navigator.onLine,
      lastSuccessfulRender: Date.now()
    };

    this.errorClassifier = new ErrorClassifier();
    this.recoveryStrategies = this.initializeRecoveryStrategies();
  }

  componentDidMount() {
    // Monitor network status
    window.addEventListener('online', this.handleNetworkChange);
    window.addEventListener('offline', this.handleNetworkChange);
    
    // Update last successful render time
    this.setState({ lastSuccessfulRender: Date.now() });
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleNetworkChange);
    window.removeEventListener('offline', this.handleNetworkChange);
    
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  componentDidUpdate(prevProps: ApplicationErrorBoundaryProps, prevState: ApplicationErrorBoundaryState) {
    // Update last successful render time if we recovered from an error
    if (prevState.hasError && !this.state.hasError) {
      this.setState({ lastSuccessfulRender: Date.now() });
    }
  }

  private handleNetworkChange = () => {
    const networkStatus = navigator.onLine;
    this.setState({ networkStatus });
    
    // If we're back online and had a network-related error, attempt recovery
    if (networkStatus && this.state.hasError && this.state.classification?.category === 'network') {
      this.attemptAutomaticRecovery();
    }
  };

  private initializeRecoveryStrategies(): RecoveryStrategy[] {
    return [
      {
        name: 'Component Remount',
        description: 'Remount the component to clear temporary state issues',
        execute: async () => {
          // Clear component state and remount
          this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined,
            classification: undefined,
            userFriendlyError: undefined
          });
          return true;
        },
        canExecute: (error, classification) => 
          classification.type === 'recoverable' && classification.category === 'component',
        priority: 1
      },
      {
        name: 'Cache Fallback',
        description: 'Use cached data to continue operation',
        execute: async () => {
          try {
            // Attempt to use fallback manager for cached data
            const cacheStats = fallbackManager.getCacheStats();
            return cacheStats.size > 0;
          } catch {
            return false;
          }
        },
        canExecute: (error, classification) => 
          classification.canUseCache && classification.category === 'network',
        priority: 2
      },
      {
        name: 'Network Retry',
        description: 'Retry network operations with exponential backoff',
        execute: async () => {
          try {
            // Test network connectivity
            const response = await fetch('/favicon.ico', { method: 'HEAD' });
            return response.ok;
          } catch {
            return false;
          }
        },
        canExecute: (error, classification) => 
          classification.isRetryable && classification.category === 'network',
        priority: 3
      },
      {
        name: 'State Reset',
        description: 'Reset application state to recover from corruption',
        execute: async () => {
          try {
            // Clear error handler state
            errorHandler.clearErrors();
            
            // Clear potentially corrupted local storage
            const keysToRemove = ['errorBoundary_recoveryPath', 'lastNetworkError'];
            keysToRemove.forEach(key => {
              try {
                localStorage.removeItem(key);
              } catch (e) {
                // Ignore storage errors
              }
            });
            
            // Dispatch state reset event
            window.dispatchEvent(new CustomEvent('app:stateReset'));
            
            return true;
          } catch {
            return false;
          }
        },
        canExecute: (error, classification) => 
          classification.type === 'recoverable',
        priority: 4
      },
      {
        name: 'Resource Reload',
        description: 'Reload critical application resources',
        execute: async () => {
          try {
            // Clear browser caches
            if ('caches' in window) {
              const cacheNames = await caches.keys();
              await Promise.all(cacheNames.map(name => caches.delete(name)));
            }
            
            // Reload the page as last resort
            window.location.reload();
            return true;
          } catch {
            return false;
          }
        },
        canExecute: (error, classification) => 
          classification.type === 'critical' || classification.severity === 'critical',
        priority: 5
      }
    ];
  }

  static getDerivedStateFromError(error: Error): Partial<ApplicationErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Classify the error
    const classification = this.errorClassifier.classify(error);
    
    // Handle error with enhanced context
    const userFriendlyError = errorHandler.handleError(error, this.props.context || 'ApplicationErrorBoundary');
    
    this.setState({
      error,
      errorInfo,
      classification,
      userFriendlyError
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo, classification);
    }

    // Attempt automatic recovery if enabled and appropriate
    if (this.props.enableAutomaticRecovery !== false && this.shouldAttemptAutomaticRecovery(classification)) {
      this.scheduleAutomaticRecovery(classification);
    }
  }

  private shouldAttemptAutomaticRecovery(classification: ErrorClassification): boolean {
    return (
      classification.isRetryable &&
      this.state.retryCount < classification.maxRetries &&
      (classification.type === 'recoverable' || classification.type === 'transient')
    );
  }

  private scheduleAutomaticRecovery(classification: ErrorClassification): void {
    if (this.state.isRetrying) return;

    this.setState({ isRetrying: true, recoveryProgress: 0 });

    // Calculate delay with exponential backoff
    const delay = Math.min(
      classification.baseRetryDelay * Math.pow(2, this.state.retryCount),
      30000 // Max 30 seconds
    );

    this.retryTimeoutId = setTimeout(() => {
      this.attemptAutomaticRecovery();
    }, delay);
  }

  private async attemptAutomaticRecovery(): Promise<void> {
    if (!this.state.classification) return;

    const availableStrategies = this.recoveryStrategies
      .filter(strategy => strategy.canExecute(this.state.error!, this.state.classification!))
      .sort((a, b) => a.priority - b.priority);

    let recoverySuccess = false;
    let usedStrategy = '';

    for (const strategy of availableStrategies) {
      this.setState({ 
        activeRecoveryStrategy: strategy.name,
        recoveryProgress: 25 
      });

      try {
        const success = await strategy.execute();
        
        const attempt: RecoveryAttempt = {
          strategy: strategy.name,
          timestamp: Date.now(),
          success
        };

        this.setState(prevState => ({
          recoveryAttempts: [...prevState.recoveryAttempts, attempt],
          recoveryProgress: success ? 100 : 50
        }));

        if (success) {
          recoverySuccess = true;
          usedStrategy = strategy.name;
          break;
        }
      } catch (error) {
        const attempt: RecoveryAttempt = {
          strategy: strategy.name,
          timestamp: Date.now(),
          success: false,
          error: (error as Error).message
        };

        this.setState(prevState => ({
          recoveryAttempts: [...prevState.recoveryAttempts, attempt]
        }));
      }
    }

    // Update state based on recovery result
    this.setState(prevState => ({
      retryCount: prevState.retryCount + 1,
      isRetrying: false,
      activeRecoveryStrategy: undefined,
      recoveryProgress: 0
    }));

    // Call recovery callback if provided
    if (this.props.onRecovery) {
      this.props.onRecovery(usedStrategy, recoverySuccess);
    }

    // If recovery failed and we've exhausted retries, show comprehensive recovery
    if (!recoverySuccess && this.state.retryCount >= (this.state.classification?.maxRetries || 3)) {
      if (this.props.enableComprehensiveRecovery !== false) {
        this.setState({ showComprehensiveRecovery: true });
      }
    }
  }

  private handleManualRetry = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      classification: undefined,
      userFriendlyError: undefined,
      retryCount: 0,
      isRetrying: false,
      recoveryProgress: 0,
      activeRecoveryStrategy: undefined,
      recoveryAttempts: [],
      showComprehensiveRecovery: false
    });
  };

  private handleShowComprehensiveRecovery = (): void => {
    this.setState({ showComprehensiveRecovery: true });
  };

  private handleComprehensiveRecoveryComplete = (): void => {
    this.handleManualRetry();
  };

  private handleComprehensiveRecoveryFailed = (error: Error): void => {
    this.setState({ showComprehensiveRecovery: false });
  };

  private handleGoHome = (): void => {
    window.location.href = '/';
  };

  private handleGoBack = (): void => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      this.handleGoHome();
    }
  };

  private handleReload = (): void => {
    window.location.reload();
  };

  private getErrorTypeColor(type: ApplicationErrorType): string {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'recoverable': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'user': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'transient': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  private renderRecoveryProgress(): ReactNode {
    if (!this.state.isRetrying) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span>Recovery in progress...</span>
          <span>{Math.round(this.state.recoveryProgress)}%</span>
        </div>
        <Progress value={this.state.recoveryProgress} className="w-full" />
        {this.state.activeRecoveryStrategy && (
          <p className="text-sm text-gray-600 text-center">
            Trying: {this.state.activeRecoveryStrategy}
          </p>
        )}
      </div>
    );
  }

  private renderRecoveryHistory(): ReactNode {
    if (this.state.recoveryAttempts.length === 0) return null;

    return (
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Recovery Attempts</h4>
        <div className="space-y-1">
          {this.state.recoveryAttempts.slice(-3).map((attempt, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2">
                {attempt.success ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <XCircle className="h-3 w-3 text-red-500" />
                )}
                {attempt.strategy}
              </span>
              <span className="text-gray-500">
                {new Date(attempt.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      const { classification, userFriendlyError, networkStatus, showComprehensiveRecovery, error } = this.state;

      // Show comprehensive recovery if requested
      if (showComprehensiveRecovery && error) {
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

      // Use custom fallback component if provided
      if (this.props.fallbackComponent) {
        return this.props.fallbackComponent;
      }

      const errorTypeColor = classification ? this.getErrorTypeColor(classification.type) : 'bg-red-100 text-red-800 border-red-200';

      return (
        <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 ${this.props.className || ''}`}>
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="h-12 w-12 text-red-500 mr-2" />
                {networkStatus ? (
                  <Wifi className="h-6 w-6 text-green-500" />
                ) : (
                  <WifiOff className="h-6 w-6 text-red-500" />
                )}
              </div>
              <CardTitle className="text-xl">
                {this.state.isRetrying ? 'Attempting Recovery...' : 'Application Error'}
              </CardTitle>
              {classification && (
                <div className="flex justify-center mt-2">
                  <Badge className={errorTypeColor}>
                    {classification.type} {classification.category} error
                  </Badge>
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-center">
                {userFriendlyError?.message || 'An unexpected error occurred in the application.'}
              </p>

              {!networkStatus && (
                <Alert>
                  <WifiOff className="h-4 w-4" />
                  <AlertDescription>
                    You're currently offline. This may be related to the error.
                  </AlertDescription>
                </Alert>
              )}

              {this.state.retryCount > 0 && (
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    Recovery attempt {this.state.retryCount} of {classification?.maxRetries || 3}
                    {this.state.isRetrying && ' (in progress...)'}
                  </AlertDescription>
                </Alert>
              )}

              {this.renderRecoveryProgress()}
              {this.renderRecoveryHistory()}

              <div className="grid gap-2">
                {classification?.isRetryable && this.state.retryCount < (classification.maxRetries || 3) && (
                  <Button 
                    onClick={this.handleManualRetry}
                    disabled={this.state.isRetrying}
                    className="w-full"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${this.state.isRetrying ? 'animate-spin' : ''}`} />
                    {this.state.isRetrying ? 'Retrying...' : 'Try Again'}
                  </Button>
                )}
                
                <Button 
                  onClick={this.handleReload}
                  variant="outline"
                  disabled={this.state.isRetrying}
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reload Page
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={this.handleGoBack}
                    variant="outline"
                    disabled={this.state.isRetrying}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go Back
                  </Button>
                  
                  <Button 
                    onClick={this.handleGoHome}
                    variant="outline"
                    disabled={this.state.isRetrying}
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </div>
                
                {this.props.enableComprehensiveRecovery !== false && (
                  <Button 
                    onClick={this.handleShowComprehensiveRecovery}
                    variant="outline"
                    disabled={this.state.isRetrying}
                    className="w-full"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Advanced Recovery Options
                  </Button>
                )}
              </div>

              {/* Development error details */}
              {process.env.NODE_ENV === 'development' && error && (
                <details className="text-sm">
                  <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-32">
                    {error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Error ID: {error?.name || 'Unknown'}-{Date.now().toString(36)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Error Classifier
 * 
 * Classifies errors into types and determines appropriate recovery strategies
 */
class ErrorClassifier {
  classify(error: Error): ErrorClassification {
    const message = error.message.toLowerCase();
    const stack = error.stack?.toLowerCase() || '';

    // Critical errors that require immediate attention
    if (this.isCriticalError(message, stack)) {
      return {
        type: 'critical',
        category: this.getCriticalCategory(message, stack),
        severity: 'critical',
        isRetryable: false,
        requiresUserAction: true,
        canUseCache: false,
        maxRetries: 0,
        baseRetryDelay: 0
      };
    }

    // User errors that require user intervention
    if (this.isUserError(message, stack)) {
      return {
        type: 'user',
        category: this.getUserCategory(message, stack),
        severity: 'medium',
        isRetryable: false,
        requiresUserAction: true,
        canUseCache: false,
        maxRetries: 0,
        baseRetryDelay: 0
      };
    }

    // Transient errors that are likely to resolve themselves
    if (this.isTransientError(message, stack)) {
      return {
        type: 'transient',
        category: this.getTransientCategory(message, stack),
        severity: 'low',
        isRetryable: true,
        requiresUserAction: false,
        canUseCache: true,
        maxRetries: 5,
        baseRetryDelay: 1000
      };
    }

    // Recoverable errors that can be handled with retry/fallback
    return {
      type: 'recoverable',
      category: this.getRecoverableCategory(message, stack),
      severity: 'medium',
      isRetryable: true,
      requiresUserAction: false,
      canUseCache: true,
      maxRetries: 3,
      baseRetryDelay: 2000
    };
  }

  private isCriticalError(message: string, stack: string): boolean {
    const criticalPatterns = [
      'out of memory',
      'maximum call stack',
      'script error',
      'security error',
      'permission denied',
      'access denied'
    ];

    return criticalPatterns.some(pattern => message.includes(pattern) || stack.includes(pattern));
  }

  private isUserError(message: string, stack: string): boolean {
    const userPatterns = [
      'validation',
      'invalid input',
      'unauthorized',
      'forbidden',
      'bad request'
    ];

    return userPatterns.some(pattern => message.includes(pattern));
  }

  private isTransientError(message: string, stack: string): boolean {
    const transientPatterns = [
      'network',
      'timeout',
      'connection',
      'fetch',
      'loading chunk',
      'loading css chunk',
      'temporary'
    ];

    return transientPatterns.some(pattern => message.includes(pattern));
  }

  private getCriticalCategory(message: string, stack: string): ErrorCategory {
    if (message.includes('permission') || message.includes('security')) return 'authorization';
    if (message.includes('memory') || message.includes('stack')) return 'component';
    return 'unknown';
  }

  private getUserCategory(message: string, stack: string): ErrorCategory {
    if (message.includes('validation') || message.includes('invalid')) return 'validation';
    if (message.includes('unauthorized')) return 'authentication';
    if (message.includes('forbidden')) return 'authorization';
    return 'validation';
  }

  private getTransientCategory(message: string, stack: string): ErrorCategory {
    if (message.includes('network') || message.includes('fetch') || message.includes('connection')) return 'network';
    if (message.includes('loading')) return 'component';
    return 'network';
  }

  private getRecoverableCategory(message: string, stack: string): ErrorCategory {
    if (message.includes('component') || message.includes('render')) return 'component';
    if (message.includes('api') || message.includes('request')) return 'api';
    if (message.includes('payment')) return 'payment';
    return 'component';
  }
}

export default ApplicationErrorBoundary;