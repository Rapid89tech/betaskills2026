/**
 * Error Notification System
 * 
 * Provides user-friendly error notifications with:
 * - Toast notifications for non-critical errors
 * - Modal dialogs for critical errors
 * - Action buttons for error recovery
 * - Progress indicators for retry operations
 */

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X, 
  RefreshCw,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { type UserFriendlyError, type ErrorSeverity } from '@/utils/ErrorHandler';

export interface ErrorNotification extends UserFriendlyError {
  id: string;
  timestamp: number;
  dismissed: boolean;
  retryCount: number;
  isRetrying: boolean;
  autoHide: boolean;
  hideAfter: number;
}

export interface ErrorNotificationSystemProps {
  maxNotifications?: number;
  defaultAutoHide?: boolean;
  defaultHideAfter?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  enableSound?: boolean;
}

const ErrorNotificationSystem: React.FC<ErrorNotificationSystemProps> = ({
  maxNotifications = 5,
  defaultAutoHide = true,
  defaultHideAfter = 5000,
  position = 'top-right',
  enableSound = false
}) => {
  const [notifications, setNotifications] = useState<ErrorNotification[]>([]);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);

  // Monitor network status
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for error events from the error handler
  useEffect(() => {
    const handleShowError = (event: CustomEvent<UserFriendlyError>) => {
      showNotification(event.detail);
    };

    window.addEventListener('errorHandler:showError', handleShowError as EventListener);

    return () => {
      window.removeEventListener('errorHandler:showError', handleShowError as EventListener);
    };
  }, []);

  const showNotification = useCallback((userError: UserFriendlyError) => {
    const notification: ErrorNotification = {
      ...userError,
      id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      dismissed: false,
      retryCount: 0,
      isRetrying: false,
      autoHide: userError.severity === 'low' ? defaultAutoHide : false,
      hideAfter: defaultHideAfter
    };

    setNotifications(prev => {
      const updated = [notification, ...prev].slice(0, maxNotifications);
      return updated;
    });

    // Play notification sound if enabled
    if (enableSound && userError.severity !== 'low') {
      playNotificationSound(userError.severity);
    }

    // Auto-hide notification if configured
    if (notification.autoHide) {
      setTimeout(() => {
        dismissNotification(notification.id);
      }, notification.hideAfter);
    }
  }, [defaultAutoHide, defaultHideAfter, maxNotifications, enableSound]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const retryNotification = useCallback(async (id: string) => {
    const notification = notifications.find(n => n.id === id);
    if (!notification || !notification.canRetry) return;

    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRetrying: true } : n
    ));

    // Simulate retry delay
    await new Promise(resolve => setTimeout(resolve, notification.retryDelay || 1000));

    // Execute the first available action (usually retry)
    const retryAction = notification.actions.find(action => action.primary);
    if (retryAction) {
      try {
        retryAction.action();
        
        // Update retry count and stop retrying
        setNotifications(prev => prev.map(n => 
          n.id === id ? { 
            ...n, 
            isRetrying: false, 
            retryCount: n.retryCount + 1 
          } : n
        ));

        // Auto-dismiss after successful retry
        setTimeout(() => {
          dismissNotification(id);
        }, 2000);
      } catch (error) {
        setNotifications(prev => prev.map(n => 
          n.id === id ? { 
            ...n, 
            isRetrying: false, 
            retryCount: n.retryCount + 1 
          } : n
        ));
      }
    }
  }, [notifications, dismissNotification]);

  const playNotificationSound = (severity: ErrorSeverity) => {
    if (!enableSound) return;

    try {
      const audio = new Audio('/notification.mp3');
      audio.volume = severity === 'critical' ? 0.8 : 0.5;
      audio.play().catch(() => {
        // Ignore audio play errors
      });
    } catch (error) {
      // Ignore audio errors
    }
  };

  const getSeverityIcon = (severity: ErrorSeverity) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'medium': return <Info className="h-5 w-5 text-yellow-500" />;
      case 'low': return <CheckCircle className="h-5 w-5 text-blue-500" />;
      default: return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: ErrorSeverity) => {
    switch (severity) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'high': return 'border-orange-200 bg-orange-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right': return 'top-4 right-4';
      case 'top-left': return 'top-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-center': return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center': return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default: return 'top-4 right-4';
    }
  };

  const renderNotification = (notification: ErrorNotification) => {
    const severityIcon = getSeverityIcon(notification.severity);
    const severityColor = getSeverityColor(notification.severity);

    return (
      <Card 
        key={notification.id}
        className={`w-96 mb-3 shadow-lg border-l-4 ${severityColor} animate-in slide-in-from-right duration-300`}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              {severityIcon}
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {notification.category}
                </Badge>
                {!networkStatus && notification.category === 'network' && (
                  <WifiOff className="h-3 w-3 text-red-500" />
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissNotification(notification.id)}
              className="h-6 w-6 p-0 hover:bg-gray-200"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-sm text-gray-700 mb-3">
            {notification.message}
          </p>

          {notification.isRetrying && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Retrying...</span>
                <span>Attempt {notification.retryCount + 1}</span>
              </div>
              <Progress value={75} className="h-1" />
            </div>
          )}

          {notification.retryCount > 0 && !notification.isRetrying && (
            <Alert className="mb-3">
              <Clock className="h-3 w-3" />
              <AlertDescription className="text-xs">
                Retry attempt {notification.retryCount} completed
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            {notification.actions.slice(0, 2).map((action, index) => (
              <Button
                key={index}
                size="sm"
                variant={action.primary ? "default" : "outline"}
                onClick={() => {
                  action.action();
                  if (!action.primary) {
                    dismissNotification(notification.id);
                  }
                }}
                disabled={notification.isRetrying}
                className="text-xs"
              >
                {action.icon && <action.icon className="h-3 w-3 mr-1" />}
                {action.label}
              </Button>
            ))}
            
            {notification.canRetry && !notification.isRetrying && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => retryNotification(notification.id)}
                className="text-xs"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Auto Retry
              </Button>
            )}
          </div>

          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>{new Date(notification.timestamp).toLocaleTimeString()}</span>
            {notification.autoHide && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Auto-hide
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderCriticalModal = (notification: ErrorNotification) => {
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Card className="w-full max-w-md mx-4 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Critical Error
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-red-700">
              {notification.message}
            </p>

            {!networkStatus && (
              <Alert>
                <WifiOff className="h-4 w-4" />
                <AlertDescription>
                  You're currently offline. This may be related to the error.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              {notification.actions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={action.primary ? "default" : "outline"}
                  onClick={() => {
                    action.action();
                    dismissNotification(notification.id);
                  }}
                  className="flex-1"
                >
                  {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                  {action.label}
                </Button>
              ))}
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
                Error ID: {notification.id}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>,
      document.body
    );
  };

  if (notifications.length === 0) {
    return null;
  }

  const criticalNotifications = notifications.filter(n => n.severity === 'critical' && !n.dismissed);
  const regularNotifications = notifications.filter(n => n.severity !== 'critical' && !n.dismissed);

  return (
    <>
      {/* Regular notifications */}
      {regularNotifications.length > 0 && (
        <div className={`fixed z-40 ${getPositionClasses()}`}>
          <div className="space-y-3">
            {regularNotifications.map(renderNotification)}
          </div>
        </div>
      )}

      {/* Critical error modals */}
      {criticalNotifications.map(renderCriticalModal)}
    </>
  );
};

export default ErrorNotificationSystem;