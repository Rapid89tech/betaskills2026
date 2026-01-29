/**
 * Critical Section Error Boundary
 * 
 * Enhanced error boundary specifically designed for critical application sections:
 * - Payment processing
 * - Authentication flows
 * - Course enrollment
 * - Admin operations
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Shield, CreditCard, User, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { errorHandler, type UserFriendlyError } from '@/utils/ErrorHandler';
import { fallbackManager } from '@/utils/FallbackManager';

// Critical section types
export type CriticalSection = 
  | 'payment'
  | 'authentication' 
  | 'enrollment'
  | 'admin'
  | 'course-content'
  | 'user-profile'
  | 'dashboard';

interface CriticalSectionConfig {
  section: CriticalSection;
  allowRetry: boolean;
  maxRetries: number;
  showFallback: boolean;
  requiresAuth: boolean;
  criticalData?: string[];
  fallbackComponent?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo, section: CriticalSection) => void;
  onRecovery?: (section: CriticalSection) => void;
}

interface Props extends CriticalSectionConfig {
  children: ReactNode;
  className?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
  isRetrying: boolean;
  userFriendlyError?: UserFriendlyError;
  fallbackData?: any;
  recoveryAttempts: number;
}

class CriticalSectionErrorBoundary extends Component<Props, State> {
  private retryTimeoutId?: NodeJS.Timeout;
  private readonly sectionConfig: Record<CriticalSection, Partial<CriticalSectionConfig>>;

  constructor(props: Props) {
    super(props);
    
    this.state = { 
      hasError: false, 
      retryCount: 0, 
      isRetrying: false,
      recoveryAttempts: 0
    };

    // Default configurations for different critical sections
    this.sectionConfig = {
      payment: {
        allowRetry: true,
        maxRetries: 2,
        showFallback: false,
        requiresAuth: true,
        criticalData: ['payment-methods', 'transaction-status']
      },
      authentication: {
        allowRetry: true,
        maxRetries: 3,
        showFallback: true,
        requiresAuth: false,
        criticalData: ['user-session', 'auth-tokens']
      },
      enrollment: {
        allowRetry: true,
        maxRetries: 3,
        showFallback: true,
        requiresAuth: true,
        criticalData: ['enrollment-status', 'course-access']
      },
      admin: {
        allowRetry: true,
        maxRetries: 2,
        showFallback: true,
        requiresAuth: true,
        criticalData: ['admin-data', 'user-management']
      },
      'course-content': {
        allowRetry: true,
        maxRetries: 3,
        showFallback: true,
        requiresAuth: true,
        criticalData: ['course-materials', 'progress-data']
      },
      'user-profile': {
        allowRetry: true,
        maxRetries: 2,
        showFallback: true,
        requiresAuth: true,
        criticalData: ['user-profile', 'preferences']
      },
      dashboard: {
        allowRetry: true,
        maxRetries: 3,
        showFallback: true,
        requiresAuth: true,
        criticalData: ['dashboard-data', 'user-stats']
      }
    };
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const config = this.getEffectiveConfig();
    
    // Handle error with enhanced context
    const enhancedError = this.enhanceErrorForSection(error);
    const userFriendlyError = errorHandler.handleError(enhancedError, `critical-${this.props.section}`);
    
    this.setState({ 
      error: enhancedError, 
      errorInfo, 
      userFriendlyError 
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(enhancedError, errorInfo, this.props.section);
    }

    // Load fallback data if configured
    if (config.showFallback && config.criticalData) {
      this.loadFallbackData(config.criticalData);
    }

    // Attempt automatic recovery for certain error types
    if (this.shouldAttemptAutomaticRecovery(enhancedError) && config.allowRetry) {
      this.scheduleAutomaticRecovery();
    }
  }

  private getEffectiveConfig(): CriticalSectionConfig {
    const defaultConfig = this.sectionConfig[this.props.section] || {};
    return {
      section: this.props.section,
      allowRetry: true,
      maxRetries: 3,
      showFallback: true,
      requiresAuth: false,
      ...defaultConfig,
      ...this.props
    };
  }

  private enhanceErrorForSection(error: Error): Error {
    const sectionContext = this.getSectionContext();
    const enhancedMessage = `${sectionContext}: ${error.message}`;
    
    const enhancedError = new Error(enhancedMessage);
    enhancedError.name = `${this.props.section}Error`;
    enhancedError.stack = error.stack;
    
    return enhancedError;
  }

  private getSectionContext(): string {
    switch (this.props.section) {
      case 'payment': return 'Payment Processing Error';
      case 'authentication': return 'Authentication Error';
      case 'enrollment': return 'Course Enrollment Error';
      case 'admin': return 'Admin Dashboard Error';
      case 'course-content': return 'Course Content Error';
      case 'user-profile': return 'User Profile Error';
      case 'dashboard': return 'Dashboard Error';
      default: return 'Critical Section Error';
    }
  }

  private shouldAttemptAutomaticRecovery(error: Error): boolean {
    const message = error.message.toLowerCase();
    
    // Attempt recovery for network and temporary errors
    return (
      message.includes('network') ||
      message.includes('fetch') ||
      message.includes('timeout') ||
      message.includes('loading chunk') ||
      message.includes('temporary')
    );
  }

  private scheduleAutomaticRecovery(): void {
    const config = this.getEffectiveConfig();
    
    if (this.state.retryCount >= config.maxRetries) {
      return;
    }

    this.setState({ isRetrying: true });

    const delay = Math.min(1000 * Math.pow(2, this.state.retryCount), 10000);
    
    this.retryTimeoutId = setTimeout(() => {
      this.attemptRecovery();
    }, delay);
  }

  private async loadFallbackData(criticalDataKeys: string[]): Promise<void> {
    try {
      const fallbackData: any = {};
      
      for (const key of criticalDataKeys) {
        try {
          const cached = await fallbackManager.withFallback(
            key,
            () => Promise.reject(new Error('Network unavailable')),
            { gracefulDegradation: true }
          );
          fallbackData[key] = cached.data;
        } catch (error) {
          console.warn(`Failed to load fallback data for ${key}:`, error);
          fallbackData[key] = null;
        }
      }
      
      this.setState({ fallbackData });
    } catch (error) {
      console.error('Failed to load fallback data:', error);
    }
  }

  private attemptRecovery = (): void => {
    const config = this.getEffectiveConfig();
    
    this.setState(prevState => ({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      userFriendlyError: undefined,
      retryCount: prevState.retryCount + 1,
      recoveryAttempts: prevState.recoveryAttempts + 1,
      isRetrying: false
    }));

    // Call recovery callback if provided
    if (this.props.onRecovery) {
      this.props.onRecovery(this.props.section);
    }
  };

  private handleManualRetry = (): void => {
    this.attemptRecovery();
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

  private handleContactSupport = (): void => {
    const subject = encodeURIComponent(`${this.getSectionContext()} - Support Request`);
    const body = encodeURIComponent(
      `I encountered an error in the ${this.props.section} section.\n\n` +
      `Error: ${this.state.error?.message || 'Unknown error'}\n` +
      `Time: ${new Date().toISOString()}\n` +
      `URL: ${window.location.href}\n\n` +
      `Please help me resolve this issue.`
    );
    
    window.open(`mailto:support@betaskill.com?subject=${subject}&body=${body}`);
  };

  private getSectionIcon(): React.ComponentType<{ className?: string }> {
    switch (this.props.section) {
      case 'payment': return CreditCard;
      case 'authentication': return User;
      case 'enrollment': return BookOpen;
      case 'admin': return Shield;
      case 'course-content': return BookOpen;
      case 'user-profile': return User;
      case 'dashboard': return Home;
      default: return AlertTriangle;
    }
  }

  private getSectionColor(): string {
    switch (this.props.section) {
      case 'payment': return 'text-green-600 bg-green-50 border-green-200';
      case 'authentication': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'enrollment': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'admin': return 'text-red-600 bg-red-50 border-red-200';
      case 'course-content': return 'text-indigo-600 bg-indigo-50 border-indigo-200';
      case 'user-profile': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'dashboard': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-red-600 bg-red-50 border-red-200';
    }
  }

  private renderFallbackContent(): ReactNode {
    const config = this.getEffectiveConfig();
    
    // Use custom fallback component if provided
    if (this.props.fallbackComponent) {
      return this.props.fallbackComponent;
    }

    // Show fallback data if available
    if (config.showFallback && this.state.fallbackData) {
      return this.renderFallbackDataView();
    }

    return null;
  }

  private renderFallbackDataView(): ReactNode {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">
            Showing cached data
          </span>
        </div>
        <p className="text-xs text-yellow-700">
          This data may be outdated. Please try refreshing when your connection is restored.
        </p>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      const config = this.getEffectiveConfig();
      const SectionIcon = this.getSectionIcon();
      const sectionColor = this.getSectionColor();
      
      return (
        <div className={`min-h-[400px] flex items-center justify-center p-4 ${this.props.className || ''}`}>
          <Card className={`w-full max-w-lg ${sectionColor}`}>
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <SectionIcon className="h-12 w-12 mr-2" />
                <AlertTriangle className="h-8 w-8" />
              </div>
              <CardTitle className="text-center">
                {this.state.isRetrying ? 'Attempting Recovery...' : this.getSectionContext()}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <Badge variant="destructive" className="mb-2">
                  Critical Section Error
                </Badge>
                <p className="text-sm text-gray-600">
                  {this.state.userFriendlyError?.message || 
                   `An error occurred in the ${this.props.section} section. This is a critical area of the application.`}
                </p>
              </div>

              {this.state.retryCount > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Recovery attempt {this.state.retryCount} of {config.maxRetries}
                    {this.state.isRetrying && ' (in progress...)'}
                  </AlertDescription>
                </Alert>
              )}

              {this.state.retryCount >= config.maxRetries && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Automatic recovery failed. Please try manual recovery options below.
                  </AlertDescription>
                </Alert>
              )}

              {/* Show fallback content if available */}
              {this.renderFallbackContent()}

              {/* Error actions */}
              <div className="grid gap-2">
                {config.allowRetry && this.state.retryCount < config.maxRetries && (
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
                
                <Button 
                  onClick={this.handleContactSupport}
                  variant="secondary"
                  className="w-full"
                >
                  Contact Support
                </Button>
              </div>

              {/* Development error details */}
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

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Error ID: {this.state.error?.name || 'Unknown'}-{Date.now().toString(36)}
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

export default CriticalSectionErrorBoundary;