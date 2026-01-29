import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  RefreshCw,
  Wifi,
  WifiOff,
  Users,
  Monitor
} from 'lucide-react';
import { useCrossSessionEnrollmentSync, useEnrollmentStatusSync, useMultiCourseEnrollmentSync } from '@/hooks/useCrossSessionEnrollmentSync';
import { enrollmentSyncIntegration } from '@/services/EnrollmentSyncIntegration';
import { useAuth } from '@/hooks/AuthContext';

/**
 * Example: Enhanced Course Card with Cross-Session Sync
 * Shows how to integrate cross-session enrollment synchronization into existing components
 */
export const EnhancedCourseCard: React.FC<{
  courseId: string;
  courseName: string;
  coursePrice: number;
}> = ({ courseId, courseName, coursePrice }) => {
  const { user } = useAuth();
  const { isEnrolled, enrollmentStatus, paymentStatus } = useEnrollmentStatusSync(courseId);
  const { syncEnrollmentStatus, isOnline, isSyncing } = useCrossSessionEnrollmentSync(courseId);

  const getButtonText = () => {
    if (!user) return 'Register To Enroll';
    if (isEnrolled) return 'Continue Course';
    if (enrollmentStatus === 'pending') return 'Pending Approval';
    return 'Enroll Now';
  };

  const getButtonVariant = () => {
    if (isEnrolled) return 'default';
    if (enrollmentStatus === 'pending') return 'secondary';
    return 'default';
  };

  const isButtonDisabled = () => {
    return enrollmentStatus === 'pending' || isSyncing;
  };

  const handleEnrollClick = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    if (isEnrolled) {
      // Navigate to course content
      window.location.href = `/course/${courseId}`;
      return;
    }

    // Start enrollment process
    try {
      await syncEnrollmentStatus(courseId, 'pending', 'pending', 'payment');
      // Redirect to payment
      window.location.href = `/payment/${courseId}`;
    } catch (error) {
      console.error('Error starting enrollment:', error);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {courseName}
          <div className="flex items-center gap-2">
            {!isOnline && <WifiOff className="h-4 w-4 text-red-500" />}
            {isSyncing && <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />}
          </div>
        </CardTitle>
        <p className="text-lg font-semibold">${coursePrice}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Enrollment Status */}
        {user && (
          <div className="flex items-center gap-2">
            {enrollmentStatus === 'approved' && <CheckCircle className="h-4 w-4 text-green-500" />}
            {enrollmentStatus === 'pending' && <Clock className="h-4 w-4 text-yellow-500" />}
            {enrollmentStatus === 'rejected' && <XCircle className="h-4 w-4 text-red-500" />}
            
            <Badge variant={isEnrolled ? 'default' : 'secondary'}>
              {enrollmentStatus || 'Not Enrolled'}
            </Badge>
            
            {paymentStatus && (
              <Badge variant="outline">
                {paymentStatus}
              </Badge>
            )}
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={handleEnrollClick}
          disabled={isButtonDisabled()}
          variant={getButtonVariant()}
          className="w-full"
        >
          {getButtonText()}
        </Button>

        {/* Offline Notice */}
        {!isOnline && (
          <Alert>
            <WifiOff className="h-4 w-4" />
            <AlertDescription>
              You're offline. Changes will sync when connection is restored.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

/**
 * Example: Multi-Course Dashboard with Cross-Session Sync
 * Shows how to manage multiple course enrollments with real-time synchronization
 */
export const MultiCourseDashboard: React.FC<{
  courses: Array<{ id: string; name: string; price: number }>;
}> = ({ courses }) => {
  const { user } = useAuth();
  const courseIds = courses.map(course => course.id);
  const enrollments = useMultiCourseEnrollmentSync(courseIds);
  const [syncHealth, setSyncHealth] = useState(enrollmentSyncIntegration.getSyncHealth());

  // Update sync health periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncHealth(enrollmentSyncIntegration.getSyncHealth());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!user) {
    return (
      <Alert>
        <AlertDescription>
          Please log in to view your course dashboard.
        </AlertDescription>
      </Alert>
    );
  }

  const enrolledCourses = courses.filter(course => enrollments[course.id]?.isEnrolled);
  const pendingCourses = courses.filter(course => enrollments[course.id]?.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Sync Health Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Sync Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant={syncHealth.overall === 'healthy' ? 'default' : 'destructive'}>
              {syncHealth.overall}
            </Badge>
            
            <div className="text-sm text-muted-foreground">
              {syncHealth.details.queuedActions > 0 && (
                <span>{syncHealth.details.queuedActions} queued actions</span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              {syncHealth.details.isOnline ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm">
                {syncHealth.details.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              My Courses ({enrolledCourses.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrolledCourses.map(course => (
                <div key={course.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{course.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="default">Enrolled</Badge>
                    {enrollments[course.id]?.lastUpdated && (
                      <span className="text-xs text-muted-foreground">
                        Updated: {new Date(enrollments[course.id].lastUpdated!).toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  <Button size="sm" className="mt-2 w-full">
                    Continue Course
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pending Courses */}
      {pendingCourses.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Pending Approval ({pendingCourses.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingCourses.map(course => (
                <div key={course.id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{course.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">Pending</Badge>
                    {enrollments[course.id]?.paymentStatus && (
                      <Badge variant="outline">
                        {enrollments[course.id].paymentStatus}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Waiting for admin approval
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Courses */}
      <Card>
        <CardHeader>
          <CardTitle>Available Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses
              .filter(course => !enrollments[course.id]?.isEnrolled && enrollments[course.id]?.status !== 'pending')
              .map(course => (
                <EnhancedCourseCard
                  key={course.id}
                  courseId={course.id}
                  courseName={course.name}
                  coursePrice={course.price}
                />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/**
 * Example: Real-Time Enrollment Notifications
 * Shows how to display real-time notifications for enrollment changes
 */
export const EnrollmentNotifications: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Array<{
    id: string;
    message: string;
    type: 'success' | 'info' | 'warning';
    timestamp: Date;
  }>>([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = enrollmentSyncIntegration.subscribeToEnrollmentUpdates((data) => {
      const notification = {
        id: `${data.courseId}-${Date.now()}`,
        message: `Course enrollment ${data.status}: ${data.courseId}`,
        type: data.status === 'approved' ? 'success' : data.status === 'rejected' ? 'warning' : 'info',
        timestamp: new Date()
      };

      setNotifications(prev => [notification, ...prev.slice(0, 4)]); // Keep last 5

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 5000);
    });

    return unsubscribe;
  }, [user]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map(notification => (
        <Alert key={notification.id} className="w-80">
          <Users className="h-4 w-4" />
          <AlertDescription>
            <div className="flex justify-between items-start">
              <span>{notification.message}</span>
              <span className="text-xs text-muted-foreground">
                {notification.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
};

/**
 * Example: Complete Integration Component
 * Shows how to put everything together in a single component
 */
export const CrossSessionSyncExample: React.FC = () => {
  const { user } = useAuth();
  
  const sampleCourses = [
    { id: 'course-1', name: 'React Fundamentals', price: 99 },
    { id: 'course-2', name: 'Advanced TypeScript', price: 149 },
    { id: 'course-3', name: 'Node.js Backend', price: 199 }
  ];

  // Initialize sync integration when user logs in
  useEffect(() => {
    if (user) {
      enrollmentSyncIntegration.initializeForUser(user.id);
    }

    return () => {
      if (user) {
        enrollmentSyncIntegration.cleanup();
      }
    };
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertDescription>
            Please log in to see the cross-session enrollment synchronization example.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cross-Session Enrollment Sync Example</h1>
        <p className="text-muted-foreground">
          This example demonstrates real-time enrollment synchronization across multiple browser tabs and devices.
        </p>
      </div>

      <MultiCourseDashboard courses={sampleCourses} />
      <EnrollmentNotifications />
    </div>
  );
};

export default CrossSessionSyncExample;