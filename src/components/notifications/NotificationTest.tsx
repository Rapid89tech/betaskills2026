import React from 'react';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/hooks/useNotifications';
import type { NotificationType, NotificationPriority, NotificationCategory } from '@/types/notification';

const NotificationTest: React.FC = () => {
  const { createNotification } = useNotifications();

  const testNotifications = [
    {
      type: 'enrollment_approved',
      title: '🎉 Enrollment Approved!',
      message: 'Your enrollment for "Computer Repairs" has been approved.',
      priority: 'high',
      category: 'enrollment'
    },
    {
      type: 'new_eft_enrollment',
      title: '💰 New EFT Enrollment',
      message: 'New EFT enrollment from student@example.com for "Web Development".',
      priority: 'high',
      category: 'admin'
    },
    {
      type: 'payment_received',
      title: '💳 Payment Received',
      message: 'Your payment of R290 for "Entrepreneurship" has been received.',
      priority: 'medium',
      category: 'payment'
    }
  ];

  const sendTestNotification = async (notification: any) => {
    await createNotification(
      notification.type,
      notification.title,
      notification.message,
      undefined,
      notification.priority,
      notification.category
    );
  };

  if (!import.meta.env.DEV) {
    return null; // Only show in development
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
      <h3 className="font-semibold mb-2">Notification Test</h3>
      <div className="space-y-2">
        {testNotifications.map((notification, index) => (
          <Button
            key={index}
            size="sm"
            variant="outline"
            onClick={() => sendTestNotification(notification)}
            className="w-full text-left justify-start"
          >
            {notification.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default NotificationTest;
