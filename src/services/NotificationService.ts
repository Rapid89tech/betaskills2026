/**
 * NotificationService
 * 
 * Comprehensive notification system for enrollment status changes with:
 * - Student notifications for enrollment status changes
 * - Admin notifications for new EFT enrollments
 * - Cross-session notification synchronization
 * - Notification persistence for offline users
 * - Browser notification API integration
 * - Toast notification system integration
 * 
 * Requirements: 6.1, 6.2, 6.3, 1.2
 */

import { realTimeService } from './RealTimeService';
import { EnrollmentUpdate, EnrollmentUpdateType, Enrollment } from '@/types/enrollment';
import type { 
  NotificationType, 
  NotificationPriority, 
  NotificationCategory,
  Notification,
  NotificationData
} from '@/types/notification';

// Notification callback types
export type NotificationCallback = (notification: Notification) => void;
export type NotificationFilter = (notification: Notification) => boolean;

// Notification preferences interface
export interface NotificationPreferences {
  browserNotifications: boolean;
  toastNotifications: boolean;
  soundEnabled: boolean;
  enrollmentUpdates: boolean;
  adminAlerts: boolean;
  systemMessages: boolean;
}

// Storage keys
const STORAGE_KEYS = {
  NOTIFICATIONS: 'enrollment-notifications',
  PREFERENCES: 'notification-preferences',
  PERMISSION_REQUESTED: 'notification-permission-requested'
};

/**
 * NotificationService Interface
 */
export interface INotificationService {
  initialize(userId?: string, userRole?: string): Promise<void>;
  destroy(): void;
  
  // Notification management
  createNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): string;
  markAsRead(notificationId: string): void;
  markAllAsRead(userId?: string): void;
  deleteNotification(notificationId: string): void;
  clearExpiredNotifications(): void;
  
  // Subscription management
  subscribe(callback: NotificationCallback, filter?: NotificationFilter): () => void;
  subscribeToUserNotifications(userId: string, callback: NotificationCallback): () => void;
  subscribeToAdminNotifications(callback: NotificationCallback): () => void;
  
  // Notification retrieval
  getNotifications(userId?: string, unreadOnly?: boolean): Notification[];
  getUnreadCount(userId?: string): number;
  
  // Preferences management
  getPreferences(): NotificationPreferences;
  updatePreferences(preferences: Partial<NotificationPreferences>): void;
  
  // Browser notification management
  requestPermission(): Promise<NotificationPermission>;
  showBrowserNotification(notification: Notification): void;
  
  // Cross-session synchronization
  syncNotifications(): void;
  
  // Utility methods
  isConnected(): boolean;
  getQueuedNotificationsCount(): number;
}

/**
 * NotificationService Implementation
 */
export class NotificationService implements INotificationService {
  private static instance: NotificationService;
  
  // Service state
  private isInitialized = false;
  private currentUserId?: string;
  private currentUserRole?: string;
  
  // Notification storage
  private notifications: Map<string, Notification> = new Map();
  private preferences: NotificationPreferences;
  
  // Subscription management
  private subscribers: Set<{ callback: NotificationCallback; filter?: NotificationFilter }> = new Set();
  private userSubscribers: Map<string, Set<NotificationCallback>> = new Map();
  private adminSubscribers: Set<NotificationCallback> = new Set();
  
  // Real-time service integration
  private realTimeUnsubscribe?: () => void;
  
  // Cross-session synchronization
  private broadcastChannel: BroadcastChannel | null = null;
  private readonly BROADCAST_CHANNEL_NAME = 'notification-sync';
  
  // Cleanup management
  private cleanupInterval?: NodeJS.Timeout;
  private readonly CLEANUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
  
  // Default preferences
  private readonly DEFAULT_PREFERENCES: NotificationPreferences = {
    browserNotifications: true,
    toastNotifications: true,
    soundEnabled: true,
    enrollmentUpdates: true,
    adminAlerts: true,
    systemMessages: true
  };

  private constructor() {
    this.preferences = this.loadPreferences();
    this.initializeBroadcastChannel();
    this.loadNotificationsFromStorage();
    this.startCleanupInterval();
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * Initialize the notification service
   */
  async initialize(userId?: string, userRole?: string): Promise<void> {
    if (this.isInitialized) {
      console.log('🔔 NotificationService already initialized');
      return;
    }

    try {
      console.log('🚀 Initializing NotificationService...');
      
      this.currentUserId = userId;
      this.currentUserRole = userRole;
      
      // Request browser notification permission if enabled
      if (this.preferences.browserNotifications) {
        await this.requestPermission();
      }
      
      // Subscribe to real-time enrollment updates
      this.subscribeToRealTimeUpdates();
      
      // Sync notifications across sessions
      this.syncNotifications();
      
      this.isInitialized = true;
      console.log('✅ NotificationService initialized successfully');
      
    } catch (error) {
      console.error('❌ Failed to initialize NotificationService:', error);
      throw error;
    }
  }

  /**
   * Destroy the notification service
   */
  destroy(): void {
    console.log('🧹 Destroying NotificationService...');
    
    // Unsubscribe from real-time updates
    if (this.realTimeUnsubscribe) {
      this.realTimeUnsubscribe();
      this.realTimeUnsubscribe = undefined;
    }
    
    // Close broadcast channel
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
    
    // Clear cleanup interval
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined;
    }
    
    // Clear subscribers
    this.subscribers.clear();
    this.userSubscribers.clear();
    this.adminSubscribers.clear();
    
    // Save notifications to storage
    this.saveNotificationsToStorage();
    
    this.isInitialized = false;
    console.log('✅ NotificationService destroyed');
  }

  /**
   * Create a new notification
   */
  createNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): string {
    const id = this.generateNotificationId();
    
    const fullNotification: Notification = {
      ...notification,
      id,
      timestamp: new Date(),
      read: false
    };
    
    // Store notification
    this.notifications.set(id, fullNotification);
    
    // Show browser notification if enabled and appropriate
    if (this.shouldShowBrowserNotification(fullNotification)) {
      this.showBrowserNotification(fullNotification);
    }
    
    // Notify subscribers
    this.notifySubscribers(fullNotification);
    
    // Broadcast to other tabs
    this.broadcastNotification(fullNotification);
    
    // Save to storage if persistent
    if (fullNotification.persistent) {
      this.saveNotificationsToStorage();
    }
    
    console.log('🔔 Notification created:', fullNotification);
    
    return id;
  }

  /**
   * Mark notification as read
   */
  markAsRead(notificationId: string): void {
    const notification = this.notifications.get(notificationId);
    if (notification && !notification.read) {
      notification.read = true;
      this.notifications.set(notificationId, notification);
      
      // Broadcast update to other tabs
      this.broadcastNotificationUpdate(notification);
      
      // Save to storage if persistent
      if (notification.persistent) {
        this.saveNotificationsToStorage();
      }
      
      console.log('📖 Notification marked as read:', notificationId);
    }
  }

  /**
   * Mark all notifications as read for a user
   */
  markAllAsRead(userId?: string): void {
    const targetUserId = userId || this.currentUserId;
    let updatedCount = 0;
    
    this.notifications.forEach((notification) => {
      if ((!targetUserId || notification.userId === targetUserId) && !notification.read) {
        notification.read = true;
        this.notifications.set(notification.id, notification);
        updatedCount++;
      }
    });
    
    if (updatedCount > 0) {
      // Broadcast bulk update to other tabs
      this.broadcastBulkUpdate(targetUserId);
      
      // Save to storage
      this.saveNotificationsToStorage();
      
      console.log(`📖 Marked ${updatedCount} notifications as read for user:`, targetUserId);
    }
  }

  /**
   * Delete a notification
   */
  deleteNotification(notificationId: string): void {
    if (this.notifications.delete(notificationId)) {
      // Broadcast deletion to other tabs
      this.broadcastNotificationDeletion(notificationId);
      
      // Save to storage
      this.saveNotificationsToStorage();
      
      console.log('🗑️ Notification deleted:', notificationId);
    }
  }

  /**
   * Clear expired notifications
   */
  clearExpiredNotifications(): void {
    const now = new Date();
    let deletedCount = 0;
    
    this.notifications.forEach((notification, id) => {
      if (notification.expiresAt && notification.expiresAt < now) {
        this.notifications.delete(id);
        deletedCount++;
      }
    });
    
    if (deletedCount > 0) {
      this.saveNotificationsToStorage();
      console.log(`🧹 Cleared ${deletedCount} expired notifications`);
    }
  }

  /**
   * Subscribe to notifications with optional filter
   */
  subscribe(callback: NotificationCallback, filter?: NotificationFilter): () => void {
    const subscription = { callback, filter };
    this.subscribers.add(subscription);
    
    return () => {
      this.subscribers.delete(subscription);
    };
  }

  /**
   * Subscribe to notifications for a specific user
   */
  subscribeToUserNotifications(userId: string, callback: NotificationCallback): () => void {
    if (!this.userSubscribers.has(userId)) {
      this.userSubscribers.set(userId, new Set());
    }
    
    const userCallbacks = this.userSubscribers.get(userId)!;
    userCallbacks.add(callback);
    
    return () => {
      userCallbacks.delete(callback);
      if (userCallbacks.size === 0) {
        this.userSubscribers.delete(userId);
      }
    };
  }

  /**
   * Subscribe to admin notifications
   */
  subscribeToAdminNotifications(callback: NotificationCallback): () => void {
    this.adminSubscribers.add(callback);
    
    return () => {
      this.adminSubscribers.delete(callback);
    };
  }

  /**
   * Get notifications for a user
   */
  getNotifications(userId?: string, unreadOnly = false): Notification[] {
    const targetUserId = userId || this.currentUserId;
    
    return Array.from(this.notifications.values())
      .filter(notification => {
        // Filter by user if specified
        if (targetUserId && notification.userId && notification.userId !== targetUserId) {
          return false;
        }
        
        // Filter by read status if specified
        if (unreadOnly && notification.read) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  /**
   * Get unread notification count
   */
  getUnreadCount(userId?: string): number {
    return this.getNotifications(userId, true).length;
  }

  /**
   * Get notification preferences
   */
  getPreferences(): NotificationPreferences {
    return { ...this.preferences };
  }

  /**
   * Update notification preferences
   */
  updatePreferences(preferences: Partial<NotificationPreferences>): void {
    this.preferences = { ...this.preferences, ...preferences };
    this.savePreferences();
    
    // Request browser permission if enabled
    if (preferences.browserNotifications && !this.hasBrowserPermission()) {
      this.requestPermission();
    }
    
    console.log('⚙️ Notification preferences updated:', this.preferences);
  }

  /**
   * Request browser notification permission
   */
  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      console.warn('⚠️ Browser notifications not supported');
      return 'denied';
    }
    
    if (Notification.permission === 'granted') {
      return 'granted';
    }
    
    if (Notification.permission === 'denied') {
      return 'denied';
    }
    
    try {
      const permission = await Notification.requestPermission();
      localStorage.setItem(STORAGE_KEYS.PERMISSION_REQUESTED, 'true');
      console.log('🔔 Notification permission:', permission);
      return permission;
    } catch (error) {
      console.error('❌ Error requesting notification permission:', error);
      return 'denied';
    }
  }

  /**
   * Show browser notification
   */
  showBrowserNotification(notification: Notification): void {
    if (!this.canShowBrowserNotification()) {
      return;
    }
    
    try {
      const browserNotification = new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: notification.id,
        requireInteraction: notification.priority === 'urgent',
        silent: !this.preferences.soundEnabled
      });
      
      // Auto-close after delay for non-urgent notifications
      if (notification.priority !== 'urgent') {
        setTimeout(() => {
          browserNotification.close();
        }, 8000);
      }
      
      // Handle click events
      browserNotification.onclick = () => {
        window.focus();
        this.markAsRead(notification.id);
        browserNotification.close();
        
        // Trigger custom event for UI handling
        window.dispatchEvent(new CustomEvent('notification-clicked', {
          detail: { notification }
        }));
      };
      
      console.log('🔔 Browser notification shown:', notification.title);
      
    } catch (error) {
      console.error('❌ Error showing browser notification:', error);
    }
  }

  /**
   * Sync notifications across sessions
   */
  syncNotifications(): void {
    if (!this.broadcastChannel) {
      return;
    }
    
    try {
      this.broadcastChannel.postMessage({
        type: 'sync-request',
        timestamp: new Date().toISOString(),
        userId: this.currentUserId
      });
      
      console.log('🔄 Notification sync requested');
      
    } catch (error) {
      console.error('❌ Error syncing notifications:', error);
    }
  }

  /**
   * Check if service is connected
   */
  isConnected(): boolean {
    return realTimeService.isConnected();
  }

  /**
   * Get queued notifications count
   */
  getQueuedNotificationsCount(): number {
    return Array.from(this.notifications.values())
      .filter(n => !n.read && n.persistent).length;
  }

  /**
   * Private Methods
   */

  /**
   * Subscribe to real-time enrollment updates
   */
  private subscribeToRealTimeUpdates(): void {
    this.realTimeUnsubscribe = realTimeService.subscribeToEnrollments((update: EnrollmentUpdate) => {
      this.handleEnrollmentUpdate(update);
    });
    
    console.log('📡 Subscribed to real-time enrollment updates');
  }

  /**
   * Handle enrollment updates from real-time service
   */
  private handleEnrollmentUpdate(update: EnrollmentUpdate): void {
    try {
      console.log('📨 Processing enrollment update for notifications:', update);
      
      switch (update.type) {
        case EnrollmentUpdateType.ENROLLMENT_CREATED:
          this.handleNewEnrollment(update);
          break;
          
        case EnrollmentUpdateType.ENROLLMENT_APPROVED:
          this.handleEnrollmentApproved(update);
          break;
          
        case EnrollmentUpdateType.ENROLLMENT_REJECTED:
          this.handleEnrollmentRejected(update);
          break;
          
        default:
          console.log('❓ Unknown enrollment update type:', update.type);
      }
      
    } catch (error) {
      console.error('❌ Error handling enrollment update:', error);
    }
  }

  /**
   * Handle new enrollment notifications
   */
  private handleNewEnrollment(update: EnrollmentUpdate): void {
    const enrollment = update.enrollment;
    
    // Create admin notification for EFT enrollments
    if (enrollment.paymentType === 'EFT' && this.shouldNotifyAdmins()) {
      this.createNotification({
        type: 'new_eft_enrollment',
        title: '💳 New EFT Enrollment',
        message: `${enrollment.user_email || 'A student'} enrolled in "${enrollment.course_title || 'a course'}" via EFT payment`,
        priority: 'high',
        enrollmentId: enrollment.id,
        courseId: enrollment.courseId,
        courseTitle: enrollment.course_title,
        persistent: true,
        metadata: {
          paymentType: enrollment.paymentType,
          userEmail: enrollment.user_email
        }
      });
    }
    
    // Create student notification for card payments (immediate access)
    if (enrollment.paymentType === 'CARD' && enrollment.userId) {
      this.createNotification({
        type: 'payment_received',
        title: '🎉 Payment Successful!',
        message: `Your enrollment in "${enrollment.course_title || 'the course'}" has been processed. You now have access to the course content.`,
        priority: 'medium',
        userId: enrollment.userId,
        enrollmentId: enrollment.id,
        courseId: enrollment.courseId,
        courseTitle: enrollment.course_title,
        persistent: true
      });
    }
  }

  /**
   * Handle enrollment approval notifications
   */
  private handleEnrollmentApproved(update: EnrollmentUpdate): void {
    const enrollment = update.enrollment;
    
    if (enrollment.userId) {
      this.createNotification({
        type: 'enrollment_approved',
        title: '🎉 Enrollment Approved!',
        message: `Your enrollment in "${enrollment.course_title || 'the course'}" has been approved. You can now access the course content.`,
        priority: 'high',
        userId: enrollment.userId,
        enrollmentId: enrollment.id,
        courseId: enrollment.courseId,
        courseTitle: enrollment.course_title,
        persistent: true,
        metadata: {
          approvedBy: enrollment.approvedBy,
          approvedAt: enrollment.approvedAt
        }
      });
    }
  }

  /**
   * Handle enrollment rejection notifications
   */
  private handleEnrollmentRejected(update: EnrollmentUpdate): void {
    const enrollment = update.enrollment;
    
    if (enrollment.userId) {
      this.createNotification({
        type: 'enrollment_rejected',
        title: '❌ Enrollment Rejected',
        message: `Your enrollment in "${enrollment.course_title || 'the course'}" has been rejected. ${enrollment.rejectionReason ? `Reason: ${enrollment.rejectionReason}` : 'Please contact support for more information.'}`,
        priority: 'high',
        userId: enrollment.userId,
        enrollmentId: enrollment.id,
        courseId: enrollment.courseId,
        courseTitle: enrollment.course_title,
        persistent: true,
        metadata: {
          rejectionReason: enrollment.rejectionReason
        }
      });
    }
  }

  /**
   * Initialize broadcast channel for cross-session sync
   */
  private initializeBroadcastChannel(): void {
    try {
      if (typeof BroadcastChannel === 'undefined') {
        console.warn('⚠️ BroadcastChannel not supported for notification sync');
        return;
      }
      
      this.broadcastChannel = new BroadcastChannel(this.BROADCAST_CHANNEL_NAME);
      
      this.broadcastChannel.addEventListener('message', (event) => {
        this.handleBroadcastMessage(event.data);
      });
      
      console.log('✅ Notification BroadcastChannel initialized');
      
    } catch (error) {
      console.error('❌ Error initializing notification BroadcastChannel:', error);
    }
  }

  /**
   * Handle broadcast messages from other tabs
   */
  private handleBroadcastMessage(data: any): void {
    try {
      switch (data.type) {
        case 'notification-created':
          this.handleRemoteNotificationCreated(data.notification);
          break;
          
        case 'notification-updated':
          this.handleRemoteNotificationUpdated(data.notification);
          break;
          
        case 'notification-deleted':
          this.handleRemoteNotificationDeleted(data.notificationId);
          break;
          
        case 'bulk-update':
          this.handleRemoteBulkUpdate(data.userId);
          break;
          
        case 'sync-request':
          this.handleSyncRequest(data);
          break;
          
        case 'sync-response':
          this.handleSyncResponse(data);
          break;
          
        default:
          console.log('❓ Unknown notification broadcast message:', data.type);
      }
      
    } catch (error) {
      console.error('❌ Error handling notification broadcast message:', error);
    }
  }

  /**
   * Notify all subscribers
   */
  private notifySubscribers(notification: Notification): void {
    // Notify general subscribers
    this.subscribers.forEach(({ callback, filter }) => {
      try {
        if (!filter || filter(notification)) {
          callback(notification);
        }
      } catch (error) {
        console.error('❌ Error in notification subscriber callback:', error);
      }
    });
    
    // Notify user-specific subscribers
    if (notification.userId) {
      const userCallbacks = this.userSubscribers.get(notification.userId);
      if (userCallbacks) {
        userCallbacks.forEach(callback => {
          try {
            callback(notification);
          } catch (error) {
            console.error('❌ Error in user notification callback:', error);
          }
        });
      }
    }
    
    // Notify admin subscribers for admin-relevant notifications
    if (this.isAdminNotification(notification)) {
      this.adminSubscribers.forEach(callback => {
        try {
          callback(notification);
        } catch (error) {
          console.error('❌ Error in admin notification callback:', error);
        }
      });
    }
  }

  /**
   * Utility methods
   */
  
  private generateNotificationId(): string {
    return `notif_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }
  
  private shouldShowBrowserNotification(notification: Notification): boolean {
    return this.preferences.browserNotifications && 
           this.canShowBrowserNotification() &&
           (notification.priority === 'high' || 
            notification.priority === 'urgent');
  }
  
  private canShowBrowserNotification(): boolean {
    return 'Notification' in window && Notification.permission === 'granted';
  }
  
  private hasBrowserPermission(): boolean {
    return 'Notification' in window && Notification.permission === 'granted';
  }
  
  private shouldNotifyAdmins(): boolean {
    return this.preferences.adminAlerts && 
           (this.currentUserRole === 'admin' || this.currentUserRole === 'instructor');
  }
  
  private isAdminNotification(notification: Notification): boolean {
    return notification.type === 'new_eft_enrollment' ||
           notification.type === 'system_maintenance';
  }

  /**
   * Storage methods
   */
  
  private loadPreferences(): NotificationPreferences {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (stored) {
        return { ...this.DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('❌ Error loading notification preferences:', error);
    }
    return { ...this.DEFAULT_PREFERENCES };
  }
  
  private savePreferences(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(this.preferences));
    } catch (error) {
      console.error('❌ Error saving notification preferences:', error);
    }
  }
  
  private loadNotificationsFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (stored) {
        const notifications: Notification[] = JSON.parse(stored);
        notifications.forEach(notification => {
          // Convert timestamp strings back to Date objects
          notification.timestamp = new Date(notification.timestamp);
          if (notification.expiresAt) {
            notification.expiresAt = new Date(notification.expiresAt);
          }
          this.notifications.set(notification.id, notification);
        });
        console.log(`📥 Loaded ${notifications.length} notifications from storage`);
      }
    } catch (error) {
      console.error('❌ Error loading notifications from storage:', error);
    }
  }
  
  private saveNotificationsToStorage(): void {
    try {
      const persistentNotifications = Array.from(this.notifications.values())
        .filter(n => n.persistent);
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(persistentNotifications));
    } catch (error) {
      console.error('❌ Error saving notifications to storage:', error);
    }
  }

  /**
   * Cross-session broadcast methods
   */
  
  private broadcastNotification(notification: Notification): void {
    if (!this.broadcastChannel) return;
    
    try {
      this.broadcastChannel.postMessage({
        type: 'notification-created',
        notification,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Error broadcasting notification:', error);
    }
  }
  
  private broadcastNotificationUpdate(notification: Notification): void {
    if (!this.broadcastChannel) return;
    
    try {
      this.broadcastChannel.postMessage({
        type: 'notification-updated',
        notification,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Error broadcasting notification update:', error);
    }
  }
  
  private broadcastNotificationDeletion(notificationId: string): void {
    if (!this.broadcastChannel) return;
    
    try {
      this.broadcastChannel.postMessage({
        type: 'notification-deleted',
        notificationId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Error broadcasting notification deletion:', error);
    }
  }
  
  private broadcastBulkUpdate(userId?: string): void {
    if (!this.broadcastChannel) return;
    
    try {
      this.broadcastChannel.postMessage({
        type: 'bulk-update',
        userId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('❌ Error broadcasting bulk update:', error);
    }
  }

  /**
   * Remote event handlers
   */
  
  private handleRemoteNotificationCreated(notification: Notification): void {
    // Convert timestamp strings back to Date objects
    notification.timestamp = new Date(notification.timestamp);
    if (notification.expiresAt) {
      notification.expiresAt = new Date(notification.expiresAt);
    }
    
    this.notifications.set(notification.id, notification);
    this.notifySubscribers(notification);
  }
  
  private handleRemoteNotificationUpdated(notification: Notification): void {
    // Convert timestamp strings back to Date objects
    notification.timestamp = new Date(notification.timestamp);
    if (notification.expiresAt) {
      notification.expiresAt = new Date(notification.expiresAt);
    }
    
    this.notifications.set(notification.id, notification);
    this.notifySubscribers(notification);
  }
  
  private handleRemoteNotificationDeleted(notificationId: string): void {
    this.notifications.delete(notificationId);
  }
  
  private handleRemoteBulkUpdate(userId?: string): void {
    // Reload notifications from storage to get latest state
    this.loadNotificationsFromStorage();
  }
  
  private handleSyncRequest(data: any): void {
    // Respond with current notifications for the requesting user
    if (this.broadcastChannel && data.userId) {
      const userNotifications = this.getNotifications(data.userId);
      this.broadcastChannel.postMessage({
        type: 'sync-response',
        userId: data.userId,
        notifications: userNotifications,
        timestamp: new Date().toISOString()
      });
    }
  }
  
  private handleSyncResponse(data: any): void {
    // Merge received notifications
    if (data.notifications && Array.isArray(data.notifications)) {
      data.notifications.forEach((notification: Notification) => {
        this.handleRemoteNotificationCreated(notification);
      });
    }
  }

  /**
   * Cleanup methods
   */
  
  private startCleanupInterval(): void {
    this.cleanupInterval = setInterval(() => {
      this.clearExpiredNotifications();
    }, this.CLEANUP_INTERVAL);
  }
}

// Export singleton instance
export const notificationService = NotificationService.getInstance();
// Export types
export type { 
  INotificationService, 
  Notification, 
  NotificationCallback, 
  NotificationFilter, 
  NotificationPreferences 
};
