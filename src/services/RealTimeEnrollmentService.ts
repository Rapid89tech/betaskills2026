import { supabase } from '@/integrations/supabase/client';
import { SimpleEnrollment } from './FastDataService';

interface SubscriptionState {
  subscription: any;
  status: 'connecting' | 'connected' | 'disconnected' | 'error';
  lastError?: string;
  retryCount: number;
  retryTimeout?: NodeJS.Timeout;
}

export class RealTimeEnrollmentService {
  private static instance: RealTimeEnrollmentService;
  private subscriptions: Map<string, SubscriptionState> = new Map();
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private maxRetries = 3;
  private baseRetryDelay = 1000;

  static getInstance(): RealTimeEnrollmentService {
    if (!RealTimeEnrollmentService.instance) {
      RealTimeEnrollmentService.instance = new RealTimeEnrollmentService();
    }
    return RealTimeEnrollmentService.instance;
  }

  /**
   * Subscribe to real-time enrollment updates with robust error handling
   */
  subscribeToEnrollments(callback: (data: SimpleEnrollment) => void): () => void {
    const listenerId = `enrollment_${Date.now()}_${Math.random()}`;
    
    // Add callback to listeners
    if (!this.listeners.has('enrollments')) {
      this.listeners.set('enrollments', new Set());
    }
    this.listeners.get('enrollments')!.add(callback);

    // Create subscription if it doesn't exist
    if (!this.subscriptions.has('enrollments')) {
      this.createEnrollmentSubscription('enrollments');
    }

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get('enrollments');
      if (listeners) {
        listeners.delete(callback);
        
        // If no more listeners, unsubscribe from Supabase
        if (listeners.size === 0) {
          this.cleanupSubscription('enrollments');
        }
      }
    };
  }

  /**
   * Subscribe to user-specific enrollment updates with robust error handling
   */
  subscribeToUserEnrollments(userId: string, callback: (data: SimpleEnrollment) => void): () => void {
    const listenerId = `user_enrollment_${userId}`;
    
    // Add callback to listeners
    if (!this.listeners.has(listenerId)) {
      this.listeners.set(listenerId, new Set());
    }
    this.listeners.get(listenerId)!.add(callback);

    // Create subscription if it doesn't exist
    if (!this.subscriptions.has(listenerId)) {
      this.createUserEnrollmentSubscription(listenerId, userId);
    }

    // Return unsubscribe function
    return () => {
      const listeners = this.listeners.get(listenerId);
      if (listeners) {
        listeners.delete(callback);
        
        // If no more listeners, unsubscribe from Supabase
        if (listeners.size === 0) {
          this.cleanupSubscription(listenerId);
        }
      }
    };
  }

  /**
   * Handle enrollment changes and notify listeners
   */
  private handleEnrollmentChange(payload: any): void {
    const listeners = this.listeners.get('enrollments');
    if (listeners) {
      const enrollmentData = this.normalizeEnrollmentData(payload);
      listeners.forEach(callback => {
        try {
          callback(enrollmentData);
        } catch (error) {
          console.error('Error in enrollment listener:', error);
        }
      });
    }

    // Also dispatch global events
    this.dispatchEnrollmentEvent(payload);
  }

  /**
   * Handle user-specific enrollment changes
   */
  private handleUserEnrollmentChange(userId: string, payload: any): void {
    const listenerId = `user_enrollment_${userId}`;
    const listeners = this.listeners.get(listenerId);
    
    if (listeners) {
      const enrollmentData = this.normalizeEnrollmentData(payload);
      listeners.forEach(callback => {
        try {
          callback(enrollmentData);
        } catch (error) {
          console.error('Error in user enrollment listener:', error);
        }
      });
    }

    // Also dispatch user-specific events
    this.dispatchUserEnrollmentEvent(userId, payload);
  }

  /**
   * Normalize enrollment data from Supabase payload
   */
  private normalizeEnrollmentData(payload: any): SimpleEnrollment {
    const data = payload.new || payload.old;
    return {
      id: data.id,
      user_id: data.user_id,
      user_email: data.user_email,
      course_id: data.course_id,
      course_title: data.course_title,
      status: data.status,
      enrolled_at: data.enrolled_at,
      updated_at: data.updated_at
    };
  }

  /**
   * Dispatch global enrollment events
   */
  private dispatchEnrollmentEvent(payload: any): void {
    const eventType = payload.eventType;
    const data = payload.new || payload.old;

    switch (eventType) {
      case 'INSERT':
        window.dispatchEvent(new CustomEvent('enrollment-created', {
          detail: { enrollment: data, source: 'realtime' }
        }));
        break;
      
      case 'UPDATE':
        window.dispatchEvent(new CustomEvent('enrollment-updated', {
          detail: { enrollment: data, source: 'realtime' }
        }));
        break;
      
      case 'DELETE':
        window.dispatchEvent(new CustomEvent('enrollment-deleted', {
          detail: { enrollmentId: data.id, source: 'realtime' }
        }));
        break;
    }
  }

  /**
   * Dispatch user-specific enrollment events
   */
  private dispatchUserEnrollmentEvent(userId: string, payload: any): void {
    const eventType = payload.eventType;
    const data = payload.new || payload.old;

    window.dispatchEvent(new CustomEvent('user-enrollment-changed', {
      detail: {
        userId,
        eventType,
        enrollment: data,
        source: 'realtime'
      }
    }));
  }

  /**
   * Create enrollment subscription with error handling and retry logic
   */
  private createEnrollmentSubscription(key: string): void {
    try {
      const subscription = supabase
        .channel('enrollments_realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'enrollments'
          },
          (payload) => {
            console.log('Real-time enrollment update:', payload);
            this.handleEnrollmentChange(payload);
          }
        )
        .subscribe((status) => {
          this.handleSubscriptionStatus(key, status);
        });

      this.subscriptions.set(key, {
        subscription,
        status: 'connecting',
        retryCount: 0
      });
    } catch (error) {
      console.error('Error creating enrollment subscription:', error);
      this.handleSubscriptionError(key, error);
    }
  }

  /**
   * Create user enrollment subscription with error handling and retry logic
   */
  private createUserEnrollmentSubscription(key: string, userId: string): void {
    try {
      const subscription = supabase
        .channel(`user_enrollments_${userId}`)
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'enrollments',
            filter: `user_id=eq.${userId}`
          },
          (payload) => {
            console.log('Real-time user enrollment update:', payload);
            this.handleUserEnrollmentChange(userId, payload);
          }
        )
        .subscribe((status) => {
          this.handleSubscriptionStatus(key, status);
        });

      this.subscriptions.set(key, {
        subscription,
        status: 'connecting',
        retryCount: 0
      });
    } catch (error) {
      console.error('Error creating user enrollment subscription:', error);
      this.handleSubscriptionError(key, error);
    }
  }

  /**
   * Handle subscription status changes
   */
  private handleSubscriptionStatus(key: string, status: string): void {
    const subscriptionState = this.subscriptions.get(key);
    if (!subscriptionState) return;

    console.log(`Subscription ${key} status:`, status);

    switch (status) {
      case 'SUBSCRIBED':
        subscriptionState.status = 'connected';
        subscriptionState.retryCount = 0;
        subscriptionState.lastError = undefined;
        break;
      
      case 'CHANNEL_ERROR':
      case 'TIMED_OUT':
      case 'CLOSED':
        subscriptionState.status = 'error';
        subscriptionState.lastError = `Subscription ${status}`;
        this.scheduleRetry(key);
        break;
      
      default:
        subscriptionState.status = 'connecting';
    }
  }

  /**
   * Handle subscription errors and schedule retries
   */
  private handleSubscriptionError(key: string, error: any): void {
    const subscriptionState = this.subscriptions.get(key);
    if (!subscriptionState) return;

    subscriptionState.status = 'error';
    subscriptionState.lastError = error.message || 'Unknown subscription error';
    
    console.error(`Subscription ${key} error:`, error);
    this.scheduleRetry(key);
  }

  /**
   * Schedule subscription retry with exponential backoff
   */
  private scheduleRetry(key: string): void {
    const subscriptionState = this.subscriptions.get(key);
    if (!subscriptionState || subscriptionState.retryCount >= this.maxRetries) {
      console.error(`Max retries reached for subscription ${key}`);
      return;
    }

    const delay = this.baseRetryDelay * Math.pow(2, subscriptionState.retryCount);
    subscriptionState.retryCount++;

    console.log(`Scheduling retry for subscription ${key} in ${delay}ms (attempt ${subscriptionState.retryCount})`);

    subscriptionState.retryTimeout = setTimeout(() => {
      this.retrySubscription(key);
    }, delay);
  }

  /**
   * Retry failed subscription
   */
  private retrySubscription(key: string): void {
    const subscriptionState = this.subscriptions.get(key);
    if (!subscriptionState) return;

    console.log(`Retrying subscription ${key}`);

    // Clean up old subscription
    try {
      subscriptionState.subscription?.unsubscribe();
    } catch (error) {
      console.error('Error unsubscribing during retry:', error);
    }

    // Create new subscription based on key type
    if (key === 'enrollments') {
      this.createEnrollmentSubscription(key);
    } else if (key.startsWith('user_enrollment_')) {
      const userId = key.replace('user_enrollment_', '');
      this.createUserEnrollmentSubscription(key, userId);
    }
  }

  /**
   * Clean up subscription and associated resources
   */
  private cleanupSubscription(key: string): void {
    const subscriptionState = this.subscriptions.get(key);
    if (subscriptionState) {
      // Clear retry timeout
      if (subscriptionState.retryTimeout) {
        clearTimeout(subscriptionState.retryTimeout);
      }
      
      // Unsubscribe
      try {
        subscriptionState.subscription?.unsubscribe();
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
      
      this.subscriptions.delete(key);
    }
    
    this.listeners.delete(key);
  }

  /**
   * Get subscription health status
   */
  getSubscriptionHealth(): Record<string, { status: string; error?: string; retryCount: number }> {
    const health: Record<string, { status: string; error?: string; retryCount: number }> = {};
    
    this.subscriptions.forEach((state, key) => {
      health[key] = {
        status: state.status,
        error: state.lastError,
        retryCount: state.retryCount
      };
    });
    
    return health;
  }

  /**
   * Clean up all subscriptions
   */
  cleanup(): void {
    this.subscriptions.forEach((state, key) => {
      this.cleanupSubscription(key);
    });
    this.subscriptions.clear();
    this.listeners.clear();
  }
}

export const realTimeEnrollmentService = RealTimeEnrollmentService.getInstance();