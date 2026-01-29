import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { SimplifiedCourse } from '@/hooks/useCourses';
import { Clock, Users, Star, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';
import { enrollmentService } from '@/services/enrollmentService';

interface EnrollNowPopupProps {
  open: boolean;
  onClose: () => void;
  course: SimplifiedCourse;
  userId: string;
  userEmail: string;
  userName?: string; // Add optional userName prop
  onEnrollmentSuccess?: () => void;
}

export default function EnrollNowPopup({ open, onClose, course, userId, userEmail, userName, onEnrollmentSuccess }: EnrollNowPopupProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log('EnrollNowPopup rendered:', { open, course: course?.title, userEmail, courseId: course?.id });

  const handleConfirmEnrollment = async () => {
    if (uploading) return;
    
    // Ensure we have user data for enrollment
    if (!userId || !userEmail) {
      console.error('❌ Missing user data for enrollment:', { userId, userEmail });
      setError('User data is missing. Please try logging in again.');
      setUploading(false);
      return;
    }
    
    setUploading(true);
    setError('');
    setProgress(10);
    

    try {
      console.log('🚀 Starting fast enrollment request...');

      // Prepare payload that matches Supabase schema exactly
      const dbPayload = {
        user_id: userId,
        user_email: userEmail,
        course_id: course.id,
        course_title: course.title,
        status: 'pending', // ALWAYS pending for instructor approval
        enrolled_at: new Date().toISOString(),
        progress: 0
      };

      setProgress(40);

      // Direct Supabase enrollment - no localStorage
      console.log('💾 Creating enrollment directly in Supabase...');
      
      console.log('✅ Ready to create enrollment in Supabase');

      // Cloud sync disabled - using Supabase-only mode
      // window.dispatchEvent(new CustomEvent('force-cloud-sync', {
      //   detail: { timestamp: new Date().toISOString() }
      // }));

      // 🔗 SEND WEBHOOK TO MAKE.COM (NON-BLOCKING WITH TIMEOUT)
      console.log('🔗 Sending webhook to Make.com in background...');
      (async () => {
      try {
        const webhookPayload = {
          userName: userName || userEmail.split('@')[0], // Use provided name or extract from email
          userEmail: userEmail,
          courseSelected: course.title,
          enrollmentDate: new Date().toISOString(),
          courseId: course.id,
          status: 'pending',
          source: 'web_app'
        };

        const webhookResponse = await fetch('https://hook.eu2.make.com/cjidqgl89n2sw81cs64krdscwt13e38u', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload)
        });

        if (webhookResponse.ok) {
          console.log('✅ Webhook sent successfully to Make.com');
        } else {
          console.warn('⚠️ Webhook failed (non-critical):', webhookResponse.status, webhookResponse.statusText);
        }
      } catch (webhookError) {
        console.warn('⚠️ Webhook error (non-critical):', webhookError);
        // Webhook failure is non-critical, enrollment continues
      }
      })();

      // Update progress to show webhook is complete
      setProgress(85);

      // SAVE TO SUPABASE USING ENROLLMENT SERVICE
      console.log('🚨 CRITICAL: Saving enrollment to Supabase using service...');
        try {
          const enrollmentData = {
            user_id: userId,
            user_email: userEmail,
            course_id: course.id,
            course_title: course.title,
            status: 'pending' as const,
            progress: 0,
            enrolled_at: new Date().toISOString(),
            payment_ref: null,
            proof_of_payment: null,
            payment_date: null
          };

          const newRow = await enrollmentService.createEnrollment(enrollmentData);
          console.log('✅ CRITICAL: Enrollment saved to Supabase with id:', newRow?.id);
            
            // Dispatch event with Supabase data
            window.dispatchEvent(new CustomEvent('enrollment-saved-to-supabase', {
              detail: { 
                enrollment: newRow,
                timestamp: new Date().toISOString()
              }
            }));

            // Also dispatch the instructor dashboard refresh event with Supabase data
            window.dispatchEvent(new CustomEvent('refresh-instructor-dashboard', {
              detail: { 
                newEnrollment: {
                  id: newRow.id,
                  user_id: newRow.user_id,
                  user_email: newRow.user_email,
                  course_id: newRow.course_id,
                  course_title: newRow.course_title,
                  status: newRow.status,
                  enrolled_at: newRow.enrolled_at,
                  progress: newRow.progress || 0
                },
                type: 'supabase_save',
                timestamp: new Date().toISOString()
              }
            }));
        } catch (insertError: any) {
          console.error('❌ CRITICAL: Supabase insert failed:', insertError);
          setError('Failed to save enrollment to database: ' + insertError.message);
          setUploading(false);
          return;
      }
      
      setProgress(100);
      setSuccess(true);
      
      toast({
        title: "📋 Enrollment Request Submitted!",
        description: `Your enrollment request for ${course.title} has been sent to the instructor for approval. Please check your email for further instructions.`,
      });
      
      if (onEnrollmentSuccess) onEnrollmentSuccess();
      
      setTimeout(() => {
        console.log('📋 Enrollment request completed, closing popup...');
        reset();
        onClose();
      }, 1500);
      
    } catch (e: any) {
      console.error('💥 Enrollment request error:', e);
      
      const errorMessage = 'Enrollment request failed. Please try again.';
      setError(errorMessage);
      setProgress(0);
      
      toast({
        title: "❌ Request Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  function reset() {
    setUploading(false);
    setProgress(0);
    setError('');
    setSuccess(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/80"
        onClick={() => {
          if (!uploading) {
            reset();
            onClose();
          }
        }}
      />
      
      <div 
        data-popup="enroll-now"
        className="relative z-[10000] bg-white rounded-xl shadow-2xl max-w-lg w-full mx-auto max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8"
      >
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
            Enroll in {course?.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Request enrollment for instructor approval
          </p>
        </div>
        
        <div className="space-y-6 sm:space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">Course Overview</h3>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                  {course.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-center text-sm sm:text-base">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600" />
                  <span className="text-gray-700">{course.duration}</span>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-green-600" />
                  <span className="text-gray-700">{course.students} students</span>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-yellow-600" />
                  <span className="text-gray-700">{course.rating}/5 rating</span>
                </div>
                <div className="flex items-center text-sm sm:text-base">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-purple-600" />
                  <span className="text-gray-700">{course.level} level</span>
                </div>
              </div>
            </div>
          </div>


          <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm p-4 sm:p-6 md:p-8">
            <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Enrollment Process</h3>
                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base md:text-lg text-gray-700">
                      Click <span className="font-semibold text-blue-600">"Confirm Enrollment"</span> to confirm your enrollment.
                    </span>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base md:text-lg text-gray-700">
                      Sit tight for a moment – our admin team will approve it shortly.
                    </span>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 sm:mt-3 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base md:text-lg text-gray-700">
                      Once approved, you'll see the button change to a green <span className="font-semibold text-green-600">"Continue"</span> – that's your green light to dive in and start learning right away!
                    </span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-300 shadow-sm p-4 sm:p-6">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                      <span className="text-white text-sm sm:text-base">📧</span>
                    </div>
                    <p className="font-bold text-green-800 text-center text-sm sm:text-base">
                      Check your email to confirm enrollment
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {uploading && (
            <div className="space-y-3">
              <Progress value={progress} className="h-2" />
              <div className="text-sm text-center text-gray-600">
                {progress < 30 ? 'Preparing request...' : 
                 progress < 70 ? 'Submitting enrollment request...' : 
                 'Finalizing request...'}
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                <span className="text-red-800 text-sm">{error}</span>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800 mb-2 text-lg">Enrollment Request Submitted!</h3>
              <p className="text-green-700 text-sm mb-4">
                Your request has been sent to the instructor for approval.
              </p>
              <div className="bg-white rounded-lg p-4 border border-green-300">
                <div className="flex items-center justify-center mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-green-600 text-lg">📧</span>
                  </div>
                  <span className="font-semibold text-green-800">Please Check Your Email</span>
                </div>
                <p className="text-green-700 text-sm">
                  And confirm enrollment
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-3 sm:gap-4">
            {!success && (
              <>
                <Button
                  variant="outline"
                  className="flex-1 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-lg"
                  onClick={() => {
                    if (!uploading) {
                      reset();
                      onClose();
                    }
                  }}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-lg"
                  onClick={handleConfirmEnrollment}
                  disabled={uploading}
                >
                  {uploading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 sm:mr-3"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Confirm Enrollment'
                  )}
                </Button>
              </>
            )}
            
            {success && (
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-lg"
                onClick={() => {
                  reset();
                  onClose();
                }}
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
          </div>
    );
  }