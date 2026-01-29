import { supabase } from '@/integrations/supabase/client';
import type { 
  Notification, 
  NotificationType, 
  NotificationPriority, 
  NotificationCategory,
  NotificationData
} from '@/types/notification';
import { logger } from '@/utils/logger';

export class SimpleNotificationService {
  private static instance: SimpleNotificationService;
  private subscribers: Map<string, (notification: Notification) => void> = new Map();
  private realTimeSubscription: any = null;

  private constructor() {
    this.setupRealTimeSubscription();
  }

  public static getInstance(): SimpleNotificationService {
    if (!SimpleNotificationService.instance) {
      SimpleNotificationService.instance = new SimpleNotificationService();
    }
    return SimpleNotificationService.instance;
  }

  // Real-time subscription setup
  private setupRealTimeSubscription() {
    try {
      this.realTimeSubscription = supabase
        .channel('notifications')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'notifications'
          },
          (payload) => {
            logger.info('🔔 Real-time notification received:', payload);
            this.handleRealTimeNotification(payload.new as Notification);
          }
        )
        .subscribe();

      logger.info('✅ Real-time notification subscription established');
    } catch (error) {
      logger.error('❌ Failed to setup real-time subscription:', error);
    }
  }

  // Handle real-time notification
  private handleRealTimeNotification(notification: Notification) {
    // Notify all subscribers
    this.subscribers.forEach((callback) => {
      try {
        callback(notification);
      } catch (error) {
        logger.error('❌ Error in notification subscriber:', error);
      }
    });

    // Show browser notification if permission granted
    this.showBrowserNotification(notification);
  }

  // Create notification
  public async createNotification(
    userId: string,
    type: NotificationType,
    title: string,
    message: string,
    data?: NotificationData,
    priority: NotificationPriority = 'medium',
    category: NotificationCategory = 'system',
    expiresAt?: string
  ): Promise<Notification | null> {
    try {
      const notification: Omit<Notification, 'id'> = {
        userId,
        type,
        title,
        message,
        read: false,
        createdAt: new Date().toISOString(),
        priority,
        category,
        metadata: {
          source: 'system',
          version: '1.0.0'
        },
        ...(data && { data }),
        ...(expiresAt && { expiresAt })
      };

      const { data: result, error } = await supabase
        .from('notifications')
        .insert(notification)
        .select()
        .single();

      if (error) {
        logger.error('❌ Failed to create notification:', error);
        return null;
      }

      logger.info('✅ Notification created:', result);
      return result;
    } catch (error) {
      logger.error('❌ Error creating notification:', error);
      return null;
    }
  }

  // Get notifications for user
  public async getNotifications(
    userId: string,
    limit: number = 50
  ): Promise<Notification[]> {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        logger.error('❌ Failed to get notifications:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      logger.error('❌ Error getting notifications:', error);
      return [];
    }
  }

  // Mark notification as read
  public async markAsRead(notificationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);

      if (error) {
        logger.error('❌ Failed to mark notification as read:', error);
        return false;
      }

      return true;
    } catch (error) {
      logger.error('❌ Error marking notification as read:', error);
      return false;
    }
  }

  // Mark all notifications as read
  public async markAllAsRead(userId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', userId);

      if (error) {
        logger.error('❌ Failed to mark all notifications as read:', error);
        return false;
      }

      return true;
    } catch (error) {
      logger.error('❌ Error marking all notifications as read:', error);
      return false;
    }
  }

  // Delete notification
  public async deleteNotification(notificationId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);

      if (error) {
        logger.error('❌ Failed to delete notification:', error);
        return false;
      }

      return true;
    } catch (error) {
      logger.error('❌ Error deleting notification:', error);
      return false;
    }
  }

  // Subscribe to notifications
  public subscribe(callback: (notification: Notification) => void): string {
    const id = Math.random().toString(36).substr(2, 9);
    this.subscribers.set(id, callback);
    return id;
  }

  // Unsubscribe from notifications
  public unsubscribe(subscriptionId: string): void {
    this.subscribers.delete(subscriptionId);
  }

  // Browser notification
  private async showBrowserNotification(notification: Notification) {
    if (!('Notification' in window)) {
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id
      });
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        new Notification(notification.title, {
          body: notification.message,
          icon: '/favicon.ico',
          tag: notification.id
        });
      }
    }
  }

  // Cleanup
  public destroy() {
    if (this.realTimeSubscription) {
      this.realTimeSubscription.unsubscribe();
    }
    this.subscribers.clear();
  }
}

export const notificationService = SimpleNotificationService.getInstance();
