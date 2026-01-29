import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@/hooks/AuthContext';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface TestEnrollmentFormProps {
  courseId: string;
  courseTitle: string;
  onEnrollmentSuccess?: () => void;
  onClose?: () => void;
}

const TestEnrollmentForm = ({ 
  courseId, 
  courseTitle, 
  onEnrollmentSuccess, 
  onClose 
}: TestEnrollmentFormProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleEnroll = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to enroll in courses",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      console.log('🚀 TEST ENROLLMENT: Starting enrollment process...');
      
      // Create Supabase client with environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        console.error('❌ Missing Supabase environment variables');
        throw new Error('Supabase configuration is missing');
      }
      
      const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

      // Create enrollment record with minimal data
      const enrollmentData = {
        user_id: user.id,
        user_email: user.email,
        course_id: courseId,
        course_title: courseTitle,
        status: 'pending',
        enrolled_at: new Date().toISOString(),
        progress: 0
      };
      
      console.log('📝 TEST ENROLLMENT: Creating enrollment with data:', enrollmentData);
      
      const { data, error } = await supabaseClient
        .from('enrollments')
        .insert([enrollmentData])
        .select();

      if (error) {
        console.error('❌ TEST ENROLLMENT: Error creating enrollment:', error);
        throw error;
      }

      console.log('✅ TEST ENROLLMENT: Enrollment created successfully:', data);

      setSuccess(true);
      
      toast({
        title: "🎉 Enrollment Submitted!",
        description: "Your enrollment request has been submitted and is awaiting admin approval.",
      });

      // Trigger admin dashboard refresh
      window.dispatchEvent(new CustomEvent('refresh-admin-dashboard', {
        detail: { 
          newEnrollment: data[0],
          timestamp: new Date().toISOString(),
          source: 'TestEnrollmentForm'
        }
      }));

      if (onEnrollmentSuccess) {
        onEnrollmentSuccess();
      }

    } catch (error) {
      console.error('❌ TEST ENROLLMENT: Error enrolling in course:', error);
      toast({
        title: "Error",
        description: "Failed to submit enrollment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Enrollment Submitted!</h3>
          <p className="text-gray-600 mb-4">
            Your enrollment request for <strong>{courseTitle}</strong> has been submitted successfully.
          </p>
          <p className="text-sm text-gray-500 mb-4">
            An admin will review your request and approve it shortly. You'll receive a notification once approved.
          </p>
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-xl md:text-2xl">Test Enrollment - {courseTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div>
          <Label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">Course</Label>
          <Input value={courseTitle} disabled className="w-full px-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50" />
        </div>
        
        <div>
          <Label className="block text-sm sm:text-base font-medium text-gray-700 mb-2 sm:mb-3">User Email</Label>
          <Input value={user?.email || ''} disabled className="w-full px-4 py-3 sm:py-4 text-sm sm:text-base border border-gray-300 rounded-lg bg-gray-50" />
        </div>


        <div className="bg-blue-50 border border-blue-200 rounded-xl shadow-sm p-4 sm:p-6">
          <div className="flex items-start space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">Enrollment Process</h4>
              <div className="space-y-3 sm:space-y-4">
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
            </div>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <Button 
            onClick={onClose} 
            variant="outline" 
            className="flex-1 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-lg"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleEnroll}
            disabled={loading}
            className="flex-1 py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-medium rounded-lg"
          >
            {loading ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Submitting...
              </div>
            ) : (
              'Submit Test Enrollment'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestEnrollmentForm;
