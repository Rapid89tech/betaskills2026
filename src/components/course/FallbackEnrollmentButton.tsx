// Fallback enrollment button - simple and reliable
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/AuthContext';
import { enrollmentService } from '@/services/enrollmentService';

interface FallbackEnrollmentButtonProps {
  courseId: string;
  courseTitle: string;
  className?: string;
}

export const FallbackEnrollmentButton: React.FC<FallbackEnrollmentButtonProps> = ({
  courseId,
  courseTitle,
  className = ""
}) => {
  const { user } = useAuth();
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const handleEnroll = async () => {
    if (!user) return;

    setEnrolling(true);

    try {
      console.log(`📝 FALLBACK ENROLL: ${courseId}...`);
      
      const enrollmentData = {
        user_id: user.id,
        user_email: user.email || '',
        course_id: courseId,
        course_title: courseTitle,
        status: 'pending' as const,
        progress: 0,
        enrolled_at: new Date().toISOString()
      };

      const result = await enrollmentService.createEnrollment(enrollmentData);
      console.log(`✅ FALLBACK ENROLL: Success!`, result);

      setEnrolled(true);
      
    } catch (err: any) {
      console.error('❌ FALLBACK ENROLL ERROR:', err);
      
      // Show user-friendly error message
      if (err.message?.includes('duplicate') || err.message?.includes('already exists')) {
        alert('You are already enrolled in this course!');
        setEnrolled(true);
      } else {
        alert('Failed to enroll. Please try again.');
      }
    } finally {
      setEnrolling(false);
    }
  };

  const handleContinue = () => {
    window.location.href = `/course/${courseId}`;
  };

  if (enrolled) {
    return (
      <Button 
        onClick={handleContinue} 
        className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
      >
        ✅ Continue Course
      </Button>
    );
  }

  return (
    <Button 
      onClick={enrolling ? undefined : handleEnroll}
      disabled={enrolling}
      className={`bg-red-600 hover:bg-red-700 text-white ${className}`}
    >
      {enrolling ? 'Enrolling...' : 'Enroll Now'}
    </Button>
  );
};

export default FallbackEnrollmentButton;
