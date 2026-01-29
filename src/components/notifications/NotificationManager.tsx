import React, { useState, useEffect } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/hooks/AuthContext';
import type { Notification } from '@/types/notification';
import NotificationToast from './NotificationToast';

interface NotificationManagerProps {
  children: React.ReactNode;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ children }) => {
  const { user } = useAuth();
  const { notifications, markAsRead } = useNotifications({ 
    autoLoad: true, 
    realTime: true 
  });
  
  const [activeToasts, setActiveToasts] = useState<Notification[]>([]);
  const [processedNotifications, setProcessedNotifications] = useState<Set<string>>(new Set());

  // Handle new notifications
  useEffect(() => {
    if (!user?.id) return;

    // Get unread notifications that haven't been processed
    const newNotifications = notifications.filter(
      notification => 
        !notification.read && 
        !processedNotifications.has(notification.id) &&
        notification.userId === user.id
    );

    if (newNotifications.length > 0) {
      // Add new notifications to active toasts
      setActiveToasts(prev => {
        const existingIds = new Set(prev.map(t => t.id));
        const newToasts = newNotifications.filter(n => !existingIds.has(n.id));
        return [...prev, ...newToasts];
      });

      // Mark as processed
      setProcessedNotifications(prev => {
        const newSet = new Set(prev);
        newNotifications.forEach(n => newSet.add(n.id));
        return newSet;
      });
    }
  }, [notifications, user?.id, processedNotifications]);

  // Clean up processed notifications when they're marked as read
  useEffect(() => {
    const readNotificationIds = notifications
      .filter(n => n.read)
      .map(n => n.id);
    
    setProcessedNotifications(prev => {
      const newSet = new Set(prev);
      readNotificationIds.forEach(id => newSet.delete(id));
      return newSet;
    });

    // Remove read notifications from active toasts
    setActiveToasts(prev => prev.filter(toast => !readNotificationIds.includes(toast.id)));
  }, [notifications]);

  const handleToastClose = (notificationId: string) => {
    setActiveToasts(prev => prev.filter(toast => toast.id !== notificationId));
  };

  const handleToastMarkAsRead = async (notificationId: string) => {
    await markAsRead(notificationId);
    handleToastClose(notificationId);
  };

  // Clean up old processed notifications periodically
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      const oldNotifications = notifications
        .filter(n => n.createdAt < oneHourAgo)
        .map(n => n.id);
      
      setProcessedNotifications(prev => {
        const newSet = new Set(prev);
        oldNotifications.forEach(id => newSet.delete(id));
        return newSet;
      });
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(cleanupInterval);
  }, [notifications]);

  return (
    <>
      {children}
      
      {/* Render active toast notifications */}
      <div className="fixed top-0 right-0 z-50 space-y-2 p-4 pointer-events-none">
        {activeToasts.map(notification => (
          <div key={notification.id} className="pointer-events-auto">
            <NotificationToast
              notification={notification}
              onClose={() => handleToastClose(notification.id)}
              onMarkAsRead={handleToastMarkAsRead}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default NotificationManager;
