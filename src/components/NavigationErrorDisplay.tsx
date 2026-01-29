/**
 * Navigation Error Display Component
 * User-friendly error display with recovery actions
 */

import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft, MessageCircle, Info } from 'lucide-react';
import { 
  NavigationError, 
  ErrorRecoveryAction, 
  ErrorSeverity,
  NavigationErrorType 
} from '../types/navigationError';

interface NavigationErrorDisplayProps {
  error: NavigationError;
  recoveryActions: ErrorRecoveryAction[];
  isRetrying?: boolean;
  onRecoveryAction: (action: ErrorRecoveryAction) => void;
  onDismiss?: () => void;
  className?: string;
}

const NavigationErrorDisplay: React.FC<NavigationErrorDisplayProps> = ({
  error,
  recoveryActions,
  isRetrying = false,
  onRecoveryAction,
  onDismiss,
  className = ''
}) => {
  /**
   * Get appropriate icon for error type
   */
  const getErrorIcon = () => {
    switch (error.type) {
      case NavigationErrorType.NETWORK_ERROR:
        return <RefreshCw className="h-6 w-6" />;
      case NavigationErrorType.ACCESS_DENIED:
      case NavigationErrorType.PERMISSION_DENIED:
        return <AlertTriangle className="h-6 w-6" />;
      case NavigationErrorType.COURSE_NOT_FOUND:
        return <Info className="h-6 w-6" />;
      default:
        return <AlertTriangle className="h-6 w-6" />;
    }
  };

  /**
   * Get appropriate styling based on error severity
   */
  const getSeverityStyles = () => {
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
        return {
          container: 'bg-red-50 border-red-200',
          icon: 'text-red-600',
          title: 'text-red-800',
          message: 'text-red-700',
          button: 'bg-red-600 hover:bg-red-700 text-white'
        };
      case ErrorSeverity.HIGH:
        return {
          container: 'bg-orange-50 border-orange-200',
          icon: 'text-orange-600',
          title: 'text-orange-800',
          message: 'text-orange-700',
          button: 'bg-orange-600 hover:bg-orange-700 text-white'
        };
      case ErrorSeverity.MEDIUM:
        return {
          container: 'bg-yellow-50 border-yellow-200',
          icon: 'text-yellow-600',
          title: 'text-yellow-800',
          message: 'text-yellow-700',
          button: 'bg-yellow-600 hover:bg-yellow-700 text-white'
        };
      case ErrorSeverity.LOW:
        return {
          container: 'bg-blue-50 border-blue-200',
          icon: 'text-blue-600',
          title: 'text-blue-800',
          message: 'text-blue-700',
          button: 'bg-blue-600 hover:bg-blue-700 text-white'
        };
      default:
        return {
          container: 'bg-gray-50 border-gray-200',
          icon: 'text-gray-600',
          title: 'text-gray-800',
          message: 'text-gray-700',
          button: 'bg-gray-600 hover:bg-gray-700 text-white'
        };
    }
  };

  /**
   * Get icon for recovery action type
   */
  const getActionIcon = (action: ErrorRecoveryAction) => {
    switch (action.type) {
      case 'retry':
        return <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />;
      case 'redirect':
        return <ArrowLeft className="h-4 w-4" />;
      case 'contact_support':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const styles = getSeverityStyles();

  return (
    <div className={`rounded-lg border p-6 ${styles.container} ${className}`}>
      <div className="flex items-start space-x-4">
        {/* Error Icon */}
        <div className={`flex-shrink-0 ${styles.icon}`}>
          {getErrorIcon()}
        </div>

        {/* Error Content */}
        <div className="flex-1 min-w-0">
          {/* Error Title */}
          <h3 className={`text-lg font-semibold ${styles.title}`}>
            {getErrorTitle(error.type)}
          </h3>

          {/* User-friendly Message */}
          <p className={`mt-2 text-sm ${styles.message}`}>
            {error.userMessage}
          </p>

          {/* Technical Details (for debugging) */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-3">
              <summary className={`text-xs cursor-pointer ${styles.message} opacity-75`}>
                Technical Details
              </summary>
              <div className={`mt-2 text-xs font-mono ${styles.message} opacity-75`}>
                <div>Type: {error.type}</div>
                <div>Message: {error.message}</div>
                <div>Course ID: {error.courseId || 'N/A'}</div>
                <div>User ID: {error.userId || 'N/A'}</div>
                <div>Timestamp: {error.timestamp.toISOString()}</div>
                <div>Context: {JSON.stringify(error.context, null, 2)}</div>
              </div>
            </details>
          )}

          {/* Recovery Actions */}
          {recoveryActions.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {recoveryActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => onRecoveryAction(action)}
                  disabled={isRetrying && action.type === 'retry'}
                  className={`
                    inline-flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium
                    transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                    ${action.primary ? styles.button : `border border-current ${styles.message} hover:bg-black hover:bg-opacity-5`}
                  `}
                >
                  {getActionIcon(action)}
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Suggested Action */}
          {error.suggestedAction && (
            <div className={`mt-3 text-sm ${styles.message} opacity-75`}>
              <strong>Suggested:</strong> {error.suggestedAction}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`flex-shrink-0 ${styles.icon} hover:opacity-75`}
            aria-label="Dismiss error"
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Get user-friendly error titles
 */
function getErrorTitle(type: NavigationErrorType): string {
  const titles = {
    [NavigationErrorType.COURSE_NOT_FOUND]: 'Course Not Found',
    [NavigationErrorType.ACCESS_DENIED]: 'Access Denied',
    [NavigationErrorType.ENROLLMENT_INVALID]: 'Enrollment Issue',
    [NavigationErrorType.CONTENT_UNAVAILABLE]: 'Content Unavailable',
    [NavigationErrorType.LOADING_FAILED]: 'Loading Failed',
    [NavigationErrorType.NETWORK_ERROR]: 'Connection Issue',
    [NavigationErrorType.VALIDATION_FAILED]: 'Validation Failed',
    [NavigationErrorType.AUTHENTICATION_REQUIRED]: 'Login Required',
    [NavigationErrorType.PERMISSION_DENIED]: 'Permission Denied',
    [NavigationErrorType.TIMEOUT_ERROR]: 'Request Timeout'
  };

  return titles[type] || 'Navigation Error';
}

export default NavigationErrorDisplay;