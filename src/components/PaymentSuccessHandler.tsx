import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { directEnrollmentService } from '@/services/directEnrollmentService';
import { useAuth } from '@/hooks/AuthContext';

interface PaymentSuccessHandlerProps {
  onSuccess: (enrollment: any) => void;
  onError: (error: string) => void;
}

const PaymentSuccessHandler: React.FC<PaymentSuccessHandlerProps> = ({
  onSuccess,
  onError
}) => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processPayment = async () => {
      if (!user) {
        onError('User not authenticated');
        setIsProcessing(false);
        return;
      }

      const courseIdRaw = searchParams.get('course_id');
      const courseId = courseIdRaw ? courseIdRaw.split('?')[0] : null;
      
      if (!courseId) {
        onError('Course ID not found');
        setIsProcessing(false);
        return;
      }

      console.log('🔄 PaymentSuccessHandler: Processing payment for user:', user.email, 'course:', courseId);

      try {
        // Create enrollment directly in Supabase (NO localStorage)
        console.log('🎯 PaymentSuccessHandler: Creating enrollment directly in Supabase');
        
        const enrollment = await directEnrollmentService.createEnrollmentDirectly({
          user_id: user.id,
          user_email: user.email || '',
          course_id: courseId,
          course_title: 'Course',
          status: 'approved',
          payment_ref: searchParams.get('payment_id') || undefined
        });

        console.log('✅ PaymentSuccessHandler: Supabase enrollment created successfully:', enrollment);

        // Show success immediately
        onSuccess({
          ...enrollment,
          immediate: true,
          supabase: true
        });

        // Dispatch events to refresh course cards
        const enrollmentEvent = new CustomEvent('enrollment-success', {
          detail: {
            courseId: courseId,
            course_id: courseId,
            user_id: user.id,
            user_email: user.email,
            enrollment: enrollment
          }
        });
        window.dispatchEvent(enrollmentEvent);
        console.log('✅ PaymentSuccessHandler: Dispatched enrollment-success event for course:', courseId);
        
        // Force refresh all course cards
        const forceRefreshEvent = new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: courseId,
            course_id: courseId,
            timestamp: new Date().toISOString(),
            source: 'payment-success'
          }
        });
        window.dispatchEvent(forceRefreshEvent);
        console.log('✅ PaymentSuccessHandler: Dispatched force-course-card-refresh event');

        setIsProcessing(false);

      } catch (error) {
        console.error('❌ PaymentSuccessHandler: Enrollment creation failed:', error);
        
        // Show success anyway since payment was successful
        const fallbackEnrollment = {
          id: `fallback-${Date.now()}`,
          user_id: user.id,
          user_email: user.email || '',
          course_id: courseId,
          course_title: 'Course',
          status: 'approved',
          enrolled_at: new Date().toISOString(),
          immediate: true,
          fallback_only: true
        };
        
        onSuccess(fallbackEnrollment);

        // Still dispatch events to refresh course cards
        const event = new CustomEvent('enrollment-success', {
          detail: {
            courseId: courseId,
            course_id: courseId,
            user_id: user.id,
            user_email: user.email,
            enrollment: fallbackEnrollment
          }
        });
        window.dispatchEvent(event);
        console.log('✅ PaymentSuccessHandler: Dispatched enrollment-success event for fallback');

        // Force refresh
        const forceRefreshEvent = new CustomEvent('force-course-card-refresh', {
          detail: {
            courseId: courseId,
            course_id: courseId,
            timestamp: new Date().toISOString(),
            source: 'payment-success-fallback'
          }
        });
        window.dispatchEvent(forceRefreshEvent);

        setIsProcessing(false);
      }
    };

    processPayment();
  }, [user, searchParams, onSuccess, onError]);

  return (
    <div className="text-center">
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your enrollment...</p>
        </>
      ) : null}
    </div>
  );
};

export default PaymentSuccessHandler;