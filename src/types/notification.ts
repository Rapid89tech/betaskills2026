export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: NotificationData;
  read: boolean;
  createdAt: string;
  expiresAt?: string;
  priority: NotificationPriority;
  category: NotificationCategory;
  actions?: NotificationAction[];
  metadata?: Record<string, any>;
}

export interface NotificationData {
  courseId?: string;
  courseTitle?: string;
  enrollmentId?: string;
  adminId?: string;
  studentEmail?: string;
  paymentReference?: string;
  amount?: number;
  currency?: string;
  [key: string]: any;
}

export interface NotificationAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  action: string;
  data?: Record<string, any>;
}

export type NotificationType = 
  | 'enrollment_approved'
  | 'enrollment_rejected'
  | 'enrollment_pending'
  | 'new_eft_enrollment'
  | 'payment_received'
  | 'course_access_granted'
  | 'course_access_revoked'
  | 'system_maintenance'
  | 'general_announcement';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export type NotificationCategory = 'enrollment' | 'payment' | 'course' | 'system' | 'admin';

export interface NotificationPreferences {
  userId: string;
  email: boolean;
  push: boolean;
  inApp: boolean;
  categories: {
    [key in NotificationCategory]: boolean;
  };
  types: {
    [key in NotificationType]: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
    timezone: string;
  };
}

export interface NotificationStats {
  total: number;
  unread: number;
  byCategory: Record<NotificationCategory, number>;
  byType: Record<NotificationType, number>;
  recentActivity: {
    lastNotification: string | null;
    notificationsToday: number;
    notificationsThisWeek: number;
  };
}

export interface NotificationFilter {
  category?: NotificationCategory;
  type?: NotificationType;
  priority?: NotificationPriority;
  read?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  limit?: number;
  offset?: number;
}
