// Admin Event Service - Bridges admin panel events to main application
import { enrollmentService } from './enrollmentService';

class AdminEventService {
  private listeners: Map<string, Set<Function>> = new Map();
  private pollingInterval: NodeJS.Timeout | null = null;
  private lastCheckTime: number = 0;

  constructor() {
    this.startPolling();
  }

  // Start polling for admin events
  private startPolling() {
    // Poll every 1 second for admin events
    this.pollingInterval = setInterval(() => {
      this.checkForAdminEvents();
    }, 1000);
  }

  // Check for admin events by polling localStorage
  private async checkForAdminEvents() {
    try {
      const adminEvents = localStorage.getItem('admin-events');
      if (!adminEvents) return;

      const events = JSON.parse(adminEvents);
      const newEvents = events.filter((event: any) => event.timestamp > this.lastCheckTime);

      if (newEvents.length > 0) {
        console.log('🔔 AdminEventService: Found new admin events:', newEvents);
        
        for (const event of newEvents) {
          await this.handleAdminEvent(event);
        }

        this.lastCheckTime = Math.max(...newEvents.map((e: any) => e.timestamp));
      }
    } catch (error) {
      console.error('❌ AdminEventService: Error checking for admin events:', error);
    }
  }

  // Handle individual admin event
  private async handleAdminEvent(event: any) {
    console.log('🔄 AdminEventService: Handling admin event:', event);

    try {
      // Verify the enrollment status in database
      const userEnrollments = await enrollmentService.getUserEnrollments(event.userId);
      const enrollment = userEnrollments.find(e => e.course_id === event.courseId);

      if (enrollment) {
        console.log('✅ AdminEventService: Found enrollment in database:', enrollment);
        
        // Dispatch events to all listeners
        this.dispatchEvent('enrollment-status-changed', {
          enrollmentId: enrollment.id,
          userEmail: enrollment.user_email,
          courseId: enrollment.course_id,
          courseTitle: enrollment.course_title,
          status: enrollment.status,
          timestamp: new Date().toISOString()
        });

        this.dispatchEvent('admin-approval', {
          enrollmentId: enrollment.id,
          userEmail: enrollment.user_email,
          courseId: enrollment.course_id,
          courseTitle: enrollment.course_title,
          status: enrollment.status,
          timestamp: new Date().toISOString()
        });

        this.dispatchEvent('force-course-card-refresh', {
          courseId: enrollment.course_id,
          userEmail: enrollment.user_email,
          status: enrollment.status,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('❌ AdminEventService: Error handling admin event:', error);
    }
  }

  // Dispatch event to all listeners
  private dispatchEvent(eventType: string, data: any) {
    console.log(`📡 AdminEventService: Dispatching ${eventType}:`, data);
    
    // Dispatch to window events
    window.dispatchEvent(new CustomEvent(eventType, { detail: data }));
    
    // Dispatch to registered listeners
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error('❌ AdminEventService: Error in event listener:', error);
        }
      });
    }
  }

  // Register event listener
  public addEventListener(eventType: string, listener: Function) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(listener);
  }

  // Remove event listener
  public removeEventListener(eventType: string, listener: Function) {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.delete(listener);
    }
  }

  // Cleanup
  public destroy() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
    this.listeners.clear();
  }
}

// Create singleton instance
export const adminEventService = new AdminEventService();
