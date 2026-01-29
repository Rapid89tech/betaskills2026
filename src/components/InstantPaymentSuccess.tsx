import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { directEnrollmentService } from '@/services/directEnrollmentService';
import { useAuth } from '@/hooks/AuthContext';
import { useCoursesContext } from '@/hooks/CoursesContext';

interface InstantPaymentSuccessProps {
  onSuccess: (enrollment: any) => void;
  onError: (error: string) => void;
}

const InstantPaymentSuccess: React.FC<InstantPaymentSuccessProps> = ({
  onSuccess,
  onError
}) => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { courses } = useCoursesContext();
  const [hasProcessed, setHasProcessed] = React.useState(false);

  useEffect(() => {
    // Prevent multiple executions
    if (hasProcessed) {
      console.log('⏭️ InstantPaymentSuccess: Already processed, skipping');
      return;
    }

    const processPayment = async () => {
      // Wait for user to be available (max 5 seconds)
      let attempts = 0;
      while (!user && attempts < 50) {
        console.log(`⏳ InstantPaymentSuccess: Waiting for user... attempt ${attempts + 1}`);
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
      }
      
      setHasProcessed(true);
      
      if (!user) {
        console.error('❌ InstantPaymentSuccess: User not authenticated after waiting');
        onError('User not authenticated');
        return;
      }
      
      console.log('✅ InstantPaymentSuccess: User authenticated:', user.email);

      const courseIdRaw = searchParams.get('course_id');
      console.log('🔍 InstantPaymentSuccess: Raw course_id from URL:', courseIdRaw);
      
      const allParams: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        allParams[key] = value;
      });
      console.log('🔍 InstantPaymentSuccess: All URL params:', allParams);
      
      // Clean the courseId - remove any query parameters or extra characters
      let courseId = courseIdRaw ? courseIdRaw.split('?')[0]?.trim() || null : null;
      
      // Additional cleaning - remove any trailing slashes or special characters
      if (courseId) {
        courseId = courseId.replace(/[\/\\]/g, '').trim();
      }
      
      console.log('🔍 InstantPaymentSuccess: Cleaned course_id:', courseId);

      if (!courseId || courseId.length === 0) {
        console.error('❌ InstantPaymentSuccess: Course ID is empty after cleaning');
        onError('Course ID not found');
        return;
      }

      // Find the course to get the proper title, but don't fail if not found
      const course = courses?.find(c => c.id === courseId);
      // Use a descriptive fallback title if course not found in context
      const courseTitle = course?.title || `Course ${courseId}`;

      console.log('🚀 InstantPaymentSuccess: Creating direct enrollment for user:', user.email, 'course:', courseId, 'title:', courseTitle);
      
      if (!course) {
        console.warn('⚠️ InstantPaymentSuccess: Course not found in courses context, using fallback title');
      }

      try {
        // Verify payment before creating enrollment
        const paymentRef = searchParams.get('payment_id');
        const paymentStatus = searchParams.get('status');
        
        if (!paymentRef || paymentStatus !== 'success') {
          throw new Error('Invalid payment verification. Enrollment blocked.');
        }

        console.log('✅ InstantPaymentSuccess: Payment verification passed:', {
          paymentRef,
          paymentStatus,
          transactionRef: searchParams.get('transaction_reference')
        });

        // Create enrollment only after payment verification
        const enrollmentPayload: any = {
          user_id: user.id,
          user_email: user.email || '',
          course_id: courseId,
          course_title: courseTitle,
          status: 'approved',
          payment_ref: paymentRef,
          payment_verified: true
        };
        
        const enrollment = await directEnrollmentService.createEnrollment(enrollmentPayload);

        console.log('✅ InstantPaymentSuccess: Supabase enrollment created:', enrollment);

        // Prepare enrollment data for localStorage and events
        const enrollmentData = {
          id: enrollment.id || `enrollment_${Date.now()}`,
          user_id: user.id,
          user_email: user.email,
          course_id: courseId,
          course_title: courseTitle,
          status: 'approved' as const,
          enrolled_at: new Date().toISOString(),
          approved_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          progress: 0
        };

        // Save enrollment to localStorage for immediate UI updates
        try {

          // Save to multiple localStorage keys for maximum compatibility
          localStorage.setItem(`enrollment-${courseId}`, JSON.stringify(enrollmentData));
          localStorage.setItem(`user-enrollment-${user.id}-${courseId}`, JSON.stringify(enrollmentData));

          // Also save to global enrollments list
          const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
          const updatedEnrollments = existingEnrollments.filter((e: any) => !(e.course_id === courseId && (e.user_id === user.id || e.user_email === user.email)));
          updatedEnrollments.push(enrollmentData);
          localStorage.setItem('enrollments', JSON.stringify(updatedEnrollments));

          // Save to user-specific enrollments list
          const userEnrollmentsKey = `user-enrollments-${user.id}`;
          const existingUserEnrollments = JSON.parse(localStorage.getItem(userEnrollmentsKey) || '[]');
          const updatedUserEnrollments = existingUserEnrollments.filter((e: any) => e.course_id !== courseId);
          updatedUserEnrollments.push(enrollmentData);
          localStorage.setItem(userEnrollmentsKey, JSON.stringify(updatedUserEnrollments));

          // Set recent payment flag for immediate access
          const recentPaymentData = {
            courseId: courseId,
            userId: user.id,
            userEmail: user.email,
            timestamp: new Date().toISOString(),
            paymentId: searchParams.get('payment_id')
          };
          localStorage.setItem(`recent-payment-${user.id}-${courseId}`, JSON.stringify(recentPaymentData));

          console.log('✅ InstantPaymentSuccess: Enrollment saved to localStorage:', enrollmentData);
          console.log('✅ InstantPaymentSuccess: Recent payment flag set:', recentPaymentData);
        } catch (error) {
          console.warn('⚠️ InstantPaymentSuccess: Failed to save to localStorage:', error);
        }

        // Use the global enrollment refresh utility to ensure all components are updated
        try {
          const { forceRefreshAllEnrollments } = await import('@/utils/enrollmentRefresh');
          forceRefreshAllEnrollments(courseId);
        } catch (error) {
          console.warn('⚠️ InstantPaymentSuccess: Failed to import enrollment refresh utility:', error);
        }

        // Also dispatch specific events for backward compatibility

        // 1. Instructor dashboard refresh event
        window.dispatchEvent(new CustomEvent('refresh-instructor-dashboard', {
          detail: {
            newEnrollment: enrollmentData,
            type: 'InstantPaymentSuccess',
            timestamp: new Date().toISOString()
          }
        }));
        console.log('✅ InstantPaymentSuccess: Dispatched refresh-instructor-dashboard event.');

        // 2. Enrollment-created event for real-time admin dashboard updates
        window.dispatchEvent(new CustomEvent('enrollment-created', {
          detail: {
            enrollment: enrollmentData,
            timestamp: new Date().toISOString(),
            source: 'InstantPaymentSuccess'
          }
        }));
        console.log('✅ InstantPaymentSuccess: Dispatched enrollment-created event.');

        // 3. Force refresh admin dashboard specifically
        window.dispatchEvent(new CustomEvent('refresh-admin-dashboard', {
          detail: {
            newEnrollment: enrollmentData,
            type: 'card_payment_enrollment',
            timestamp: new Date().toISOString()
          }
        }));
        console.log('✅ InstantPaymentSuccess: Dispatched refresh-admin-dashboard event.');

        // 4. Force refresh enrollment management component
        window.dispatchEvent(new CustomEvent('refresh-enrollment-management', {
          detail: {
            newEnrollment: enrollmentData,
            type: 'card_payment_enrollment',
            timestamp: new Date().toISOString()
          }
        }));
        console.log('✅ InstantPaymentSuccess: Dispatched refresh-enrollment-management event.');

        console.log('✅ InstantPaymentSuccess: All refresh events dispatched successfully.');

        onSuccess({
          ...enrollment,
          supabase: true,
          immediate: true
        });

      } catch (error) {
        console.error('❌ InstantPaymentSuccess: Failed to create enrollment:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to create enrollment in database.';
        console.error('❌ InstantPaymentSuccess: Error details:', errorMessage);
        
        // NO FALLBACK - enrollment creation must succeed with verified payment
        onError(errorMessage);
      }
    };

    processPayment();
  }, [user, searchParams, onSuccess, onError, courses]);

  return null;
};

export default InstantPaymentSuccess;
