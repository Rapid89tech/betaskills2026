/**
 * NotificationCenter Component
 * 
 * UI component for displaying and managing notifications
 * Provides notification list, badge, and management controls
 * 
 * Requirements: 6.1, 6.2, 6.3, 1.2
 */

import React, { useState } from 'react';
import { Bell, Check, CheckCheck, X, Settings, Trash2, AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useNotifications } from '@/hooks/useNotifications';
import { NotificationData, NotificationType, NotificationPriority } from '@/services/NotificationService';
import { cn } from '@/lib/utils';

// Component props
export interface NotificationCenterProps {
  userId?: string;
  userRole?: string;
  className?: string;
  showBadge?: boolean;
  maxNotifications?: number;
}

// Notification item props
interface NotificationItemProps {
  notification: NotificationData;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onClick?: (notification: NotificationData) => void;
}

/**
 * Get notification icon based on type
 */
const getNotificationIcon = (type: NotificationType, priority: NotificationPriority) => {
  const iconClass = cn(
    'w-4 h-4',
    priority === NotificationPriority.URGENT && 'text-red-500',
    priority === NotificationPriority.HIGH && 'text-orange-500',
    priority === NotificationPriority.MEDIUM && 'text-blue-500',
    priority === NotificationPriority.LOW && 'text-gray-500'
  );

  switch (type) {
    case NotificationType.ENROLLMENT_APPROVED:
      return <CheckCircle className={iconClass} />;
    case NotificationType.ENROLLMENT_REJECTED:
      return <XCircle className={iconClass} />;
    case NotificationType.NEW_EFT_ENROLLMENT:
      return <AlertCircle className={iconClass} />;
    case NotificationType.PAYMENT_PROCESSED:
      return <CheckCircle className={iconClass} />;
    case NotificationType.SYSTEM_ALERT:
      return <Info className={iconClass} />;
    default:
      return <Bell className={iconClass} />;
  }
};

/**
 * Get notification color based on type and priority
 */
const getNotificationColor = (type: NotificationType, priority: NotificationPriority, read: boolean) => {
  if (read) {
    return 'bg-gray-50 border-gray-200';
  }

  switch (priority) {
    case NotificationPriority.URGENT:
      return 'bg-red-50 border-red-200';
    case NotificationPriority.HIGH:
      return 'bg-orange-50 border-orange-200';
    case NotificationPriority.MEDIUM:
      return 'bg-blue-50 border-blue-200';
    case NotificationPriority.LOW:
    default:
      return 'bg-gray-50 border-gray-200';
  }
};

/**
 * Format relative time
 */
const formatRelativeTime = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
};

/**
 * NotificationItem Component
 */
const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
  onClick
}) => {
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    onClick?.(notification);
  };

  return (
    <div
      className={cn(
        'p-3 border rounded-lg cursor-pointer transition-colors hover:bg-gray-100',
        getNotificationColor(notification.type, notification.priority, notification.read)
      )}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getNotificationIcon(notification.type, notification.priority)}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className={cn(
              'text-sm font-medium truncate',
              !notification.read && 'font-semibold'
            )}>
              {notification.title}
            </h4>
            
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-xs text-gray-500">
                {formatRelativeTime(notification.timestamp)}
              </span>
              
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {notification.message}
          </p>
          
          {notification.courseTitle && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {notification.courseTitle}
              </Badge>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 flex-shrink-0">
          {!notification.read && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onMarkAsRead(notification.id);
              }}
              className="h-6 w-6 p-0"
            >
              <Check className="w-3 h-3" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(notification.id);
            }}
            className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * NotificationPreferences Component
 */
const NotificationPreferences: React.FC<{
  preferences: any;
  onUpdatePreferences: (prefs: any) => void;
  onRequestPermission: () => Promise<NotificationPermission>;
}> = ({ preferences, onUpdatePreferences, onRequestPermission }) => {
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);

  const handlePermissionRequest = async () => {
    setIsRequestingPermission(true);
    try {
      await onRequestPermission();
    } finally {
      setIsRequestingPermission(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="browser-notifications">Browser Notifications</Label>
        <Switch
          id="browser-notifications"
          checked={preferences.browserNotifications}
          onCheckedChange={(checked) =>
            onUpdatePreferences({ browserNotifications: checked })
          }
        />
      </div>
      
      {preferences.browserNotifications && (
        <div className="ml-4 space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePermissionRequest}
            disabled={isRequestingPermission}
          >
            {isRequestingPermission ? 'Requesting...' : 'Request Permission'}
          </Button>
          <p className="text-xs text-gray-500">
            Allow browser notifications to receive alerts even when the page is not active.
          </p>
        </div>
      )}

      <Separator />

      <div className="flex items-center justify-between">
        <Label htmlFor="toast-notifications">Toast Notifications</Label>
        <Switch
          id="toast-notifications"
          checked={preferences.toastNotifications}
          onCheckedChange={(checked) =>
            onUpdatePreferences({ toastNotifications: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="sound-enabled">Sound Alerts</Label>
        <Switch
          id="sound-enabled"
          checked={preferences.soundEnabled}
          onCheckedChange={(checked) =>
            onUpdatePreferences({ soundEnabled: checked })
          }
        />
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <Label htmlFor="enrollment-updates">Enrollment Updates</Label>
        <Switch
          id="enrollment-updates"
          checked={preferences.enrollmentUpdates}
          onCheckedChange={(checked) =>
            onUpdatePreferences({ enrollmentUpdates: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="admin-alerts">Admin Alerts</Label>
        <Switch
          id="admin-alerts"
          checked={preferences.adminAlerts}
          onCheckedChange={(checked) =>
            onUpdatePreferences({ adminAlerts: checked })
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="system-messages">System Messages</Label>
        <Switch
          id="system-messages"
          checked={preferences.systemMessages}
          onCheckedChange={(checked) =>
            onUpdatePreferences({ systemMessages: checked })
          }
        />
      </div>
    </div>
  );
};

/**
 * NotificationCenter Component
 */
export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  userId,
  userRole,
  className,
  showBadge = true,
  maxNotifications = 50
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  const {
    notifications,
    unreadCount,
    isConnected,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    preferences,
    updatePreferences,
    requestPermission,
    syncNotifications,
    isInitializing,
    error
  } = useNotifications({
    userId,
    userRole,
    autoInitialize: true,
    showToasts: true
  });

  const displayNotifications = notifications.slice(0, maxNotifications);

  const handleNotificationClick = (notification: NotificationData) => {
    // Handle notification-specific actions
    if (notification.courseId) {
      // Could navigate to course page
      console.log('Navigate to course:', notification.courseId);
    }
    
    if (notification.enrollmentId) {
      // Could navigate to enrollment details
      console.log('Navigate to enrollment:', notification.enrollmentId);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn('relative', className)}
        >
          <Bell className="w-5 h-5" />
          {showBadge && unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary">
                  {unreadCount} unread
                </Badge>
              )}
            </SheetTitle>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreferences(!showPreferences)}
              >
                <Settings className="w-4 h-4" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    •••
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={markAllAsRead}>
                    <CheckCheck className="w-4 h-4 mr-2" />
                    Mark all as read
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={syncNotifications}>
                    <Bell className="w-4 h-4 mr-2" />
                    Sync notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <SheetDescription className="flex items-center gap-2">
            <div className={cn(
              'w-2 h-2 rounded-full',
              isConnected ? 'bg-green-500' : 'bg-red-500'
            )} />
            {isConnected ? 'Connected' : 'Disconnected'}
            {isInitializing && ' • Initializing...'}
          </SheetDescription>
        </SheetHeader>

        {error && (
          <Card className="mt-4 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Error</span>
              </div>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </CardContent>
          </Card>
        )}

        {showPreferences ? (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationPreferences
                preferences={preferences}
                onUpdatePreferences={updatePreferences}
                onRequestPermission={requestPermission}
              />
            </CardContent>
          </Card>
        ) : (
          <div className="mt-4">
            {displayNotifications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No notifications
                  </h3>
                  <p className="text-gray-500">
                    You're all caught up! New notifications will appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-2">
                  {displayNotifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                      onClick={handleNotificationClick}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationCenter;