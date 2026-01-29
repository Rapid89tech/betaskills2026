import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { notificationService } from '@/services/simpleNotificationService';
import type { 
  Notification, 
  NotificationType, 
  NotificationPriority, 
  NotificationCategory,
  NotificationData,
  NotificationFilter,
  NotificationStats
} from '@/types/notification';
import { useToast } from '@/hooks/use-toast';

export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  stats: NotificationStats;
  createNotification: (
    type: NotificationType,
    title: string,
    message: string,
    data?: NotificationData,
    priority?: NotificationPriority,
    category?: NotificationCategory
  ) => Promise<Notification | null>;
  markAsRead: (notificationId: string) => Promise<boolean>;
  markAllAsRead: () => Promise<boolean>;
  deleteNotification: (notificationId: string) => Promise<boolean>;
  refreshNotifications: () => Promise<void>;
  filterNotifications: (filter: NotificationFilter) => void;
}

export const useNotifications = (options?: {
  autoLoad?: boolean;
  realTime?: boolean;
  limit?: number;
}): UseNotificationsReturn => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<NotificationStats>({
    total: 0,
    unread: 0,
    byCategory: {} as any,
    byType: {} as any,
    recentActivity: {
      lastNotification: null,
      notificationsToday: 0,
      notificationsThisWeek: 0
    }
  });

  const { autoLoad = true, realTime = true, limit = 50 } = options || {};

  // Load notifications
  const loadNotifications = useCallback(async (filter?: NotificationFilter) => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const loadedNotifications = await notificationService.getNotifications(user.id, {
        ...filter,
        limit: filter?.limit || limit
      });

      setNotifications(loadedNotifications);
      
      // Calculate unread count
      const unreadCount = loadedNotifications.filter(n => !n.read).length;
      
      // Update stats
      setStats(prev => ({
        ...prev,
        total: loadedNotifications.length,
        unread: unreadCount,
        recentActivity: {
          ...prev.recentActivity,
          lastNotification: loadedNotifications.length > 0 ? loadedNotifications[0].createdAt : null
        }
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  }, [user?.id, limit]);

  // Create notification
  const createNotification = useCallback(async (
    type: NotificationType,
    title: string,
    message: string,
    data?: NotificationData,
    priority: NotificationPriority = 'medium',
    category: NotificationCategory = 'system'
  ): Promise<Notification | null> => {
    if (!user?.id) return null;

    try {
      const notification = await notificationService.createNotification(
        user.id,
        type,
        title,
        message,
        data,
        priority,
        category
      );

      if (notification) {
        // Add to local state immediately for better UX
        setNotifications(prev => [notification, ...prev]);
        setStats(prev => ({
          ...prev,
          total: prev.total + 1,
          unread: prev.unread + 1
        }));
      }

      return notification;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create notification');
      return null;
    }
  }, [user?.id]);

  // Mark as read
  const markAsRead = useCallback(async (notificationId: string): Promise<boolean> => {
    try {
      const success = await notificationService.markAsRead(notificationId);
      
      if (success) {
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        setStats(prev => ({
          ...prev,
          unread: Math.max(0, prev.unread - 1)
        }));
      }

      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark notification as read');
      return false;
    }
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(async (): Promise<boolean> => {
    if (!user?.id) return false;

    try {
      const success = await notificationService.markAllAsRead(user.id);
      
      if (success) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setStats(prev => ({ ...prev, unread: 0 }));
      }

      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark all notifications as read');
      return false;
    }
  }, [user?.id]);

  // Delete notification
  const deleteNotification = useCallback(async (notificationId: string): Promise<boolean> => {
    try {
      const success = await notificationService.deleteNotification(notificationId);
      
      if (success) {
        const deletedNotification = notifications.find(n => n.id === notificationId);
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        
        if (deletedNotification && !deletedNotification.read) {
          setStats(prev => ({
            ...prev,
            total: prev.total - 1,
            unread: Math.max(0, prev.unread - 1)
          }));
        } else if (deletedNotification) {
          setStats(prev => ({
            ...prev,
            total: prev.total - 1
          }));
        }
      }

      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete notification');
      return false;
    }
  }, [notifications]);

  // Refresh notifications
  const refreshNotifications = useCallback(async () => {
    await loadNotifications();
  }, [loadNotifications]);

  // Filter notifications
  const filterNotifications = useCallback((filter: NotificationFilter) => {
    loadNotifications(filter);
  }, [loadNotifications]);

  // Real-time subscription
  useEffect(() => {
    if (!user?.id || !realTime) return;

    const subscriptionId = notificationService.subscribe((notification: Notification) => {
      // Only handle notifications for current user
      if (notification.userId === user.id) {
        setNotifications(prev => {
          // Check if notification already exists (avoid duplicates)
          const exists = prev.some(n => n.id === notification.id);
          if (exists) {
            return prev.map(n => n.id === notification.id ? notification : n);
          }
          return [notification, ...prev];
        });

        setStats(prev => ({
          ...prev,
          total: prev.total + 1,
          unread: prev.unread + 1
        }));

        // Show toast for important notifications
        if (notification.priority === 'high' || 
            notification.priority === NotificationPriority.URGENT) {
          toast({
            title: notification.title,
            description: notification.message,
            duration: 5000
          });
        }
      }
    });

    return () => {
      notificationService.unsubscribe(subscriptionId);
    };
  }, [user?.id, realTime, toast]);

  // Auto-load notifications
  useEffect(() => {
    if (autoLoad && user?.id) {
      loadNotifications();
    }
  }, [autoLoad, user?.id, loadNotifications]);

  return {
    notifications,
    unreadCount: stats.unread,
    loading,
    error,
    stats,
    createNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refreshNotifications,
    filterNotifications
  };
};