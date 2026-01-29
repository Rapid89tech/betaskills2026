import React, { useEffect, useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import type { Notification, NotificationType, NotificationPriority } from '@/types/notification';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  BellRing, 
  Info, 
  X,
  AlertCircle
} from 'lucide-react';

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose,
  onMarkAsRead
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Show toast with animation
    const showTimer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-hide after 5 seconds for non-urgent notifications
    const hideTimer = setTimeout(() => {
      if (notification.priority !== 'urgent') {
        handleClose();
      }
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [notification.priority]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleMarkAsRead = () => {
    onMarkAsRead(notification.id);
    handleClose();
  };

  const getNotificationIcon = () => {
    if (notification.priority === 'urgent') {
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
    
    switch (notification.type) {
      case 'enrollment_approved':
      case 'course_access_granted':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'enrollment_rejected':
      case 'course_access_revoked':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'new_eft_enrollment':
        return <BellRing className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getToastStyles = () => {
    const baseStyles = "fixed top-4 right-4 z-50 w-96 max-w-sm transition-all duration-300 ease-in-out";
    
    if (isLeaving) {
      return `${baseStyles} transform translate-x-full opacity-0`;
    }
    
    if (isVisible) {
      return `${baseStyles} transform translate-x-0 opacity-100`;
    }
    
    return `${baseStyles} transform translate-x-full opacity-0`;
  };

  const getCardStyles = () => {
    if (notification.priority === 'urgent') {
      return "border-red-200 bg-red-50 shadow-lg";
    }
    if (notification.priority === 'high') {
      return "border-orange-200 bg-orange-50 shadow-md";
    }
    return "border-blue-200 bg-white shadow-sm";
  };

  return (
    <div className={getToastStyles()}>
      <Card className={`${getCardStyles()} border-l-4 ${
        notification.priority === 'urgent' 
          ? 'border-l-red-500' 
          : notification.priority === 'high'
          ? 'border-l-orange-500'
          : 'border-l-blue-500'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              {getNotificationIcon()}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-gray-900 mb-1">
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {notification.message}
              </p>
              
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleMarkAsRead}
                    className="h-7 px-3 text-xs"
                  >
                    Mark as Read
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleClose}
                  className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationToast;
