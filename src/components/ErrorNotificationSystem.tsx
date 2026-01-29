/**
 * Error Notification System
 * 
 * Provides user-friendly error notifications with:
 * - Toast notifications for non-critical errors
 * - Modal dialogs for critical errors
 * - Action buttons for error recovery
 * - Automatic dismissal and retry mechanisms
 */

import React, { useEffect, useState, useCallback } from 'react';
import { AlertCircle, Wifi, WifiOff, RefreshCw, X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { type UserFriendlyError, type ErrorSeverity, type ErrorCategory } from '@/utils/ErrorHandler';

interface ErrorNotification extends UserFriendlyError {
  id: string;
  timestamp: number;
  dismissed?: boolean;
  autoRetryCount?: number;
}

interface ErrorNotificationSystemProps {
  maxNotifications?: number;
  autoRetryEnabled?: boolean;
  showNetworkStatus?: boolean;
}

const ErrorNotificationSystem: React.FC<ErrorNotificationSystemProps> = ({
  maxNotifications = 5,
  autoRetryEnabled = true,
  showNetworkStatus = true
}) => {
  const [notifications, setNotifications] = useState<ErrorNotification[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [criticalError, setCriticalError] = useState<ErrorNotification | null>(null);
  const { toast } = useToast();

  // Handle online/offline status
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

  // Listen for error events from ErrorHandler
  useEffect(() => {
    const handleErrorEvent = (event: CustomEvent<UserFriendlyError>) => {
      const error = event.detail;
      addNotification(error);
    };

    const handleOfflineModeEvent = () => {
      toast({
        title: "Offline Mode Enabled",
        description: "You're now working offline. Some features may be limited.",
        duration: 5000,
      });
    };

    window.addEventListener('errorHandler:showError', handleErrorEvent as EventListener);
    window.addEventListener('errorHandler:offlineMode', handleOfflineModeEvent);

    return () => {
      window.removeEventListener('errorHandler:showError', handleErrorEvent as EventListener);
      window.removeEventListener('errorHandler:offlineMode', handleOfflineModeEvent);
    };
  }, [toast]);

  const addNotification = useCallback((error: UserFriendlyError) => {
    const notification: ErrorNotification = {
      ...error,
      id: Date.now().toString() + Math.random().toString(36).substr(2),
      timestamp: Date.now(),
      autoRetryCount: 0
    };

    // Handle critical errors with modal
    if (error.severity === 'critical') {
      setCriticalError(notification);
      return;
    }

    // Add to notifications list
    setNotifications(prev => {
      const updated = [notification, ...prev].slice(0, maxNotifications);
      return updated;
    });

    // Show toast notification
    showToastNotification(notification);

    // Auto-dismiss non-critical errors after delay
    if (error.severity === 'low') {
      setTimeout(() => {
        dismissNotification(notification.id);
      }, 5000);
    } else if (error.severity === 'medium') {
      setTimeout(() => {
        dismissNotification(notification.id);
      }, 10000);
    }

    // Auto-retry if enabled and error is retryable
    if (autoRetryEnabled && error.canRetry && error.retryDelay) {
      setTimeout(() => {
        attemptAutoRetry(notification.id);
      }, error.retryDelay);
    }
  }, [maxNotifications, autoRetryEnabled]);

  const showToastNotification = (notification: ErrorNotification) => {
    const getSeverityIcon = (severity: ErrorSeverity) => {
      switch (severity) {
        case 'critical': return AlertTriangle;
        case 'high': return AlertCircle;
        case 'medium': return Info;
        case 'low': return CheckCircle;
        default: return Info;
      }
    };

    const getSeverityVariant = (severity: ErrorSeverity) => {
      switch (severity) {
        case 'critical':
        case 'high':
          return 'destructive' as const;
        case 'medium':
          return 'default' as const;
        case 'low':
          return 'default' as const;
        default:
          return 'default' as const;
      }
    };

    const Icon = getSeverityIcon(notification.severity);

    toast({
      title: (
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4" />
          {getCategoryTitle(notification.category)}
        </div>
      ),
      description: notification.message,
      variant: getSeverityVariant(notification.severity),
      duration: notification.severity === 'critical' ? 0 : 
                notification.severity === 'high' ? 15000 :
                notification.severity === 'medium' ? 10000 : 5000,
      action: notification.actions.length > 0 ? (
        <Button
          variant="outline"
          size="sm"
          onClick={notification.actions[0].action}
        >
          {notification.actions[0].label}
        </Button>
      ) : undefined,
    });
  };

  const getCategoryTitle = (category: ErrorCategory): string => {
    switch (category) {
      case 'network': return 'Connection Issue';
      case 'authentication': return 'Authentication Required';
      case 'authorization': return 'Access Denied';
      case 'validation': return 'Validation Error';
      case 'payment': return 'Payment Error';
      case 'component': return 'Component Error';
      case 'api': return 'Server Error';
      default: return 'Error';
    }
  };

  const dismissNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const dismissCriticalError = useCallback(() => {
    setCriticalError(null);
  }, []);

  const attemptAutoRetry = useCallback((id: string) => {
    setNotifications(prev => prev.map(notification => {
      if (notification.id === id && notification.canRetry) {
        const retryCount = (notification.autoRetryCount || 0) + 1;
        
        if (retryCount <= 3) { // Max 3 auto-retries
          // Execute the primary action (usually retry)
          const primaryAction = notification.actions.find(a => a.primary);
          if (primaryAction) {
            primaryAction.action();
          }
          
          return {
            ...notification,
            autoRetryCount: retryCount
          };
        }
      }
      return notification;
    }));
  }, []);

  const getSeverityColor = (severity: ErrorSeverity): string => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-red-500 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryColor = (category: ErrorCategory): string => {
    switch (category) {
      case 'network': return 'bg-blue-100 text-blue-800';
      case 'authentication': return 'bg-purple-100 text-purple-800';
      case 'authorization': return 'bg-red-100 text-red-800';
      case 'validation': return 'bg-yellow-100 text-yellow-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'component': return 'bg-indigo-100 text-indigo-800';
      case 'api': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Critical Error Modal
  if (criticalError) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <CardTitle className="text-red-600">Critical Error</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={dismissCriticalError}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">{criticalError.message}</p>
            
            <div className="flex items-center gap-2">
              <Badge className={getCategoryColor(criticalError.category)}>
                {criticalError.category}
              </Badge>
              <Badge variant="destructive">
                {criticalError.severity}
              </Badge>
            </div>

            <div className="flex flex-col gap-2">
              {criticalError.actions.map((action, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    action.action();
                    dismissCriticalError();
                  }}
                  variant={action.primary ? "default" : "outline"}
                  className="w-full"
                >
                  {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                  {action.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Network Status Indicator */}
      {showNetworkStatus && (
        <div className="fixed top-4 right-4 z-40">
          {!isOnline && (
            <Alert className="w-auto bg-red-50 border-red-200">
              <WifiOff className="h-4 w-4" />
              <AlertDescription className="text-red-800">
                You're offline
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {/* Error Notifications Panel */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-30 space-y-2 max-w-sm">
          {notifications.slice(0, 3).map((notification) => (
            <Card 
              key={notification.id} 
              className={`${getSeverityColor(notification.severity)} shadow-lg`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium text-sm">
                        {getCategoryTitle(notification.category)}
                      </span>
                      <Badge className={getCategoryColor(notification.category)} variant="secondary">
                        {notification.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm mb-3">{notification.message}</p>
                    
                    {notification.autoRetryCount && notification.autoRetryCount > 0 && (
                      <p className="text-xs opacity-75 mb-2">
                        Auto-retry attempt {notification.autoRetryCount}/3
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-1">
                      {notification.actions.slice(0, 2).map((action, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant={action.primary ? "default" : "outline"}
                          onClick={() => {
                            action.action();
                            if (!notification.canRetry) {
                              dismissNotification(notification.id);
                            }
                          }}
                          className="text-xs h-6"
                        >
                          {action.icon && <action.icon className="h-3 w-3 mr-1" />}
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissNotification(notification.id)}
                    className="h-6 w-6 p-0 opacity-50 hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {notifications.length > 3 && (
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-2 text-center">
                <p className="text-xs text-gray-600">
                  +{notifications.length - 3} more errors
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setNotifications([])}
                  className="text-xs h-6 mt-1"
                >
                  Clear All
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </>
  );
};

export default ErrorNotificationSystem;