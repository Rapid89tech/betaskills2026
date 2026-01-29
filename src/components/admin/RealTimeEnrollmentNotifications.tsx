import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/utils/logger';

interface Enrollment {
  id: string;
  user_email: string;
  course_title: string;
  status: 'pending' | 'approved' | 'rejected';
  enrolled_at: string;
  payment_type?: 'EFT' | 'CARD';
}

interface NotificationState {
  newEnrollments: number;
  lastNotification: Date | null;
}

/**
 * Real-time enrollment notification system for admin dashboard
 * 
 * This component provides:
 * - Real-time notifications for new enrollments
 * - Browser notifications (with permission)
 * - Toast notifications for immediate feedback
 * - Sound notifications (optional)
 * - Badge count for pending enrollments
 */
export const RealTimeEnrollmentNotifications: React.FC = () => {
  const { toast } = useToast();
  const [notificationState, setNotificationState] = useState<NotificationState>({
    newEnrollments: 0,
    lastNotification: null
  });
  const [isConnected, setIsConnected] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          setNotificationPermission(permission);
          logger.info(`Notification permission: ${permission}`);
        });
      } else {
        setNotificationPermission(Notification.permission);
      }
    }
  }, []);

  // Set up real-time subscription for enrollments
  useEffect(() => {
    logger.info('🔄 Setting up real-time enrollment notifications...');

    // Subscribe to enrollment changes
    const subscription = supabase
      .channel('enrollment-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'enrollments'
        },
        (payload) => {
          const newEnrollment = payload.new as Enrollment;
          logger.info('🔔 New enrollment detected:', newEnrollment);
          
          handleNewEnrollment(newEnrollment);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'enrollments'
        },
        (payload) => {
          const updatedEnrollment = payload.new as Enrollment;
          logger.info('📝 Enrollment updated:', updatedEnrollment);
          
          // Only notify about status changes
          if (payload.old.status !== updatedEnrollment.status) {
            handleEnrollmentStatusChange(updatedEnrollment);
          }
        }
      )
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
        logger.info(`Real-time subscription status: ${status}`);
      });

    return () => {
      subscription.unsubscribe();
      logger.info('🧹 Real-time enrollment notifications cleaned up');
    };
  }, []);

  // Handle new enrollment
  const handleNewEnrollment = (enrollment: Enrollment) => {
    const isEFT = enrollment.payment_type === 'EFT' || !enrollment.payment_type;
    
    // Update notification state
    setNotificationState(prev => ({
      newEnrollments: prev.newEnrollments + 1,
      lastNotification: new Date()
    }));

    // Show toast notification
    toast({
      title: "🔔 New Enrollment Request",
      description: `${enrollment.user_email} enrolled in ${enrollment.course_title}`,
      duration: 5000,
    });

    // Show browser notification
    if (notificationPermission === 'granted') {
      showBrowserNotification({
        title: 'New Enrollment Request',
        body: `${enrollment.user_email} enrolled in ${enrollment.course_title}`,
        icon: '/favicon.ico',
        tag: `enrollment-${enrollment.id}`,
        requireInteraction: isEFT, // EFT enrollments require interaction
        data: {
          enrollmentId: enrollment.id,
          userEmail: enrollment.user_email,
          courseTitle: enrollment.course_title,
          paymentType: enrollment.payment_type
        }
      });
    }

    // Update page title if tab is not active
    if (document.hidden) {
      document.title = `(${notificationState.newEnrollments + 1}) New Enrollment - Admin Dashboard`;
    }

    // Play notification sound (optional)
    playNotificationSound();

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('new-enrollment-notification', {
      detail: enrollment
    }));
  };

  // Handle enrollment status changes
  const handleEnrollmentStatusChange = (enrollment: Enrollment) => {
    logger.info(`📝 Enrollment status changed: ${enrollment.user_email} - ${enrollment.status}`);

    // Show toast notification for status changes
    const statusMessage = enrollment.status === 'approved' 
      ? `Enrollment approved for ${enrollment.user_email}`
      : `Enrollment rejected for ${enrollment.user_email}`;

    toast({
      title: "📝 Enrollment Status Updated",
      description: statusMessage,
      duration: 3000,
    });

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('enrollment-status-notification', {
      detail: enrollment
    }));
  };

  // Show browser notification
  const showBrowserNotification = (options: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(options.title!, options);
      
      // Handle notification click
      notification.onclick = () => {
        window.focus();
        notification.close();
        
        // Reset page title
        document.title = 'Admin Dashboard';
        
        // Clear notification count
        setNotificationState(prev => ({
          ...prev,
          newEnrollments: 0
        }));
      };

      // Auto-close after 10 seconds
      setTimeout(() => {
        notification.close();
      }, 10000);
    }
  };

  // Play notification sound
  const playNotificationSound = () => {
    try {
      // Create a simple beep sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      logger.warn('Could not play notification sound:', error);
    }
  };

  // Reset notification count when admin views dashboard
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Reset page title
        document.title = 'Admin Dashboard';
        
        // Clear notification count after a delay
        setTimeout(() => {
          setNotificationState(prev => ({
            ...prev,
            newEnrollments: 0
          }));
        }, 2000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // This component doesn't render anything visible
  // It only handles notifications in the background
  return null;
};

export default RealTimeEnrollmentNotifications;
