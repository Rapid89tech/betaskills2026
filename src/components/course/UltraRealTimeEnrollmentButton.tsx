// Ultra Real-time Enrollment Button with aggressive polling and event listening
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/AuthContext';
import { enrollmentService } from '@/services/enrollmentService';
import RealTimeEnrollmentStatus from './RealTimeEnrollmentStatus';

interface UltraRealTimeEnrollmentButtonProps {
  courseId: string;
  courseTitle: string;
  onEnrollClick: () => void;
  className?: string;
}

export const UltraRealTimeEnrollmentButton: React.FC<UltraRealTimeEnrollmentButtonProps> = ({
  courseId,
  courseTitle,
  onEnrollClick,
  className = ""
}) => {
  const { user } = useAuth();
  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle enrollment
  const handleEnroll = async () => {
    if (!user) {
      console.error('❌ Cannot enroll: User not authenticated');
      return;
    }

    setEnrolling(true);
    setError(null);

    try {
      console.log(`📝 UltraRealTime: Enrolling in course ${courseId}...`);
      
      const enrollmentData = {
        user_id: user.id,
        user_email: user.email || '',
        course_id: courseId,
        course_title: courseTitle,
        status: 'pending' as const,
        progress: 0,
        enrolled_at: new Date().toISOString()
      };

      const newEnrollment = await enrollmentService.createEnrollment(enrollmentData);
      console.log(`✅ UltraRealTime: Successfully enrolled in ${courseId}:`, newEnrollment);

      // Dispatch enrollment created event
      window.dispatchEvent(new CustomEvent('enrollment-created', {
        detail: {
          courseId,
          courseTitle,
          userEmail: user.email,
          status: 'pending',
          enrollment: newEnrollment
        }
      }));

      // Show success message
      console.log('🎉 Enrollment created successfully!');
      
    } catch (err: any) {
      console.error('❌ UltraRealTime: Error enrolling in course:', err);
      setError(err.message || 'Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  // Handle continue to course
  const handleContinue = () => {
    window.location.href = `/course/${courseId}`;
  };

  return (
    <RealTimeEnrollmentStatus
      courseId={courseId}
      onStatusChange={(status) => {
        console.log(`🔄 UltraRealTime: Status changed to ${status} for course ${courseId}`);
      }}
    >
      {(status, loading) => {
        console.log(`🎯 UltraRealTime: Rendering button for ${courseId} with status: ${status}, loading: ${loading}`);

        if (loading) {
          return (
            <Button disabled className={className}>
              Loading...
            </Button>
          );
        }

        if (error) {
          return (
            <Button 
              onClick={() => {
                setError(null);
                handleEnroll();
              }}
              className={`bg-orange-600 hover:bg-orange-700 text-white ${className}`}
            >
              ⚠️ Retry
            </Button>
          );
        }

        if (status === 'approved') {
          return (
            <Button 
              onClick={handleContinue}
              className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
            >
              ✅ Continue Course
            </Button>
          );
        }

        if (status === 'pending') {
          return (
            <Button 
              disabled
              className={`bg-yellow-500 hover:bg-yellow-600 text-white cursor-not-allowed ${className}`}
            >
              ⏳ Pending Approval
            </Button>
          );
        }

        if (status === 'rejected') {
          return (
            <Button 
              onClick={handleEnroll}
              className={`bg-red-600 hover:bg-red-700 text-white ${className}`}
            >
              🔄 Re-enroll
            </Button>
          );
        }

        // Default: not enrolled
        return (
          <Button 
            onClick={enrolling ? undefined : handleEnroll}
            disabled={enrolling}
            className={`bg-red-600 hover:bg-red-700 text-white ${className}`}
          >
            {enrolling ? 'Enrolling...' : 'Enroll Now'}
          </Button>
        );
      }}
    </RealTimeEnrollmentStatus>
  );
};

export default UltraRealTimeEnrollmentButton;
