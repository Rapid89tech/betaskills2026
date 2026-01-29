
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { Course } from '@/types/course';

export const useCourseEnrollment = (
  course: Course | null,
  enrollInCourse: (courseId: string, courseTitle: string) => Promise<boolean>
) => {
  const [enrolling, setEnrolling] = useState(false);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEnroll = async () => {
    console.log("handleEnroll called for course:", course?.id);
    
    if (!user) {
      console.log("User not authenticated, redirecting to auth");
      toast({
        title: "Please log in",
        description: "You need to be logged in to enroll in courses",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!course) {
      console.log("No course provided");
      return;
    }

    console.log("Showing enrollment form for course:", course.id);
    setShowEnrollmentForm(true);
  };

  const handleEnrollmentFormClose = () => {
    setShowEnrollmentForm(false);
  };

  const handleEnrollmentSuccess = () => {
    setShowEnrollmentForm(false);
    toast({
      title: "🎉 Enrollment Submitted!",
      description: "Your enrollment request has been submitted and is awaiting admin approval.",
    });
    // Refresh the page to show the pending enrollment state
    window.location.reload();
  };

  return {
    enrolling,
    showEnrollmentForm,
    handleEnroll,
    handleEnrollmentFormClose,
    handleEnrollmentSuccess
  };
};
