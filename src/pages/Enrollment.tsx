import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useCoursesContext } from '@/hooks/CoursesContext';
import { useDataManager } from '@/hooks/useDataManager';
import { logger } from '@/utils/logger';
import EnrollmentErrorBoundary from '@/components/error/EnrollmentErrorBoundary';
import { errorLoggingService } from '@/services/errorLoggingService';
import { ArrowLeft, Upload, CheckCircle, Calendar, Clock } from 'lucide-react';

const Enrollment = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { courses } = useCoursesContext();
  
  // 🚨 MIGRATED: Use unified enrollment system exclusively
  const { 
    isEnrolled, 
    hasPendingEnrollment, 
    createEnrollment,
    loading: enrollmentLoading,
    error: enrollmentError 
  } = useDataManager();
  
  // Removed unused step state
  const [file, setFile] = useState<File | null>(null);
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const course = courses.find(c => c.id === courseId);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to enroll in courses",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (!course) {
      toast({
        title: "Course not found",
        description: "The course you're looking for doesn't exist",
        variant: "destructive",
      });
      navigate('/courses');
      return;
    }

    // Check if user is already enrolled or has pending enrollment
    if (courseId && (isEnrolled(courseId) || hasPendingEnrollment(courseId))) {
      toast({
        title: "Already enrolled",
        description: "You are already enrolled in this course or have a pending enrollment",
        variant: "default",
      });
      navigate('/dashboard');
      return;
    }
  }, [user, course, courseId, isEnrolled, hasPendingEnrollment, navigate, toast]);

  // 🚨 MIGRATED: Enhanced loading and error states
  if (!user || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading enrollment page...</p>
        </div>
      </div>
    );
  }

  // Show enrollment error state
  if (enrollmentError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enrollment Error</h3>
            <p className="text-gray-600 mb-4">{enrollmentError}</p>
            <Button onClick={() => navigate('/courses')} variant="outline">
              Back to Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  async function uploadProof(file: File, userId: string): Promise<string> {
    setProgress(30);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUrl = `proof_${userId}_${Date.now()}_${file.name}`;
    setProgress(50);
    return mockUrl;
  }

  // 🚨 MIGRATED: Use UnifiedEnrollmentManager for enrollment creation
  async function createEnrollmentSubmission(proofUrl: string) {
    if (!user || !course) {
      throw new Error('User or course not found');
    }

    setProgress(70);
    
    try {
      logger.info('🚀 Creating enrollment via UnifiedEnrollmentManager:', {
        courseId: course.id,
        userId: user.id,
        userEmail: user.email
      });

      // Create enrollment using UnifiedEnrollmentManager
      const enrollmentData = {
        user_id: user.id,
        user_email: user.email!,
        course_id: course.id,
        course_title: course.title,
        status: 'pending' as const,
        progress: 0,
        // Additional enrollment-specific data
        payment_proof: proofUrl,
        payment_reference: paymentRef,
        payment_date: paymentDate,
      };
      
      const newEnrollment = await createEnrollment(enrollmentData);
      
      logger.info('✅ Enrollment created via UnifiedEnrollmentManager:', newEnrollment);

      setProgress(100);
      setSuccess(true);
      
      // Dispatch event to notify instructor dashboard
      window.dispatchEvent(new CustomEvent('refresh-instructor-dashboard', {
        detail: { 
          newEnrollment: {
            id: newEnrollment.id || `enrollment_${Date.now()}`,
            user_id: user.id,
            user_email: user.email,
            course_id: course.id,
            course_title: course.title,
            status: 'pending',
            enrolled_at: new Date().toISOString(),
            progress: 0
          },
          type: 'enrollment_page_unified',
          timestamp: new Date().toISOString()
        }
      }));

      // Also dispatch enrollment-created event for real-time admin dashboard updates
      window.dispatchEvent(new CustomEvent('enrollment-created', {
        detail: { 
          enrollment: newEnrollment,
          timestamp: new Date().toISOString(),
          source: 'EnrollmentPage'
        }
      }));
      
      toast({
        title: "✅ Enrollment Submitted!",
        description: "Your enrollment request has been submitted for review. You'll be notified once approved.",
      });
      
      setTimeout(() => {
        navigate(`/course/${course.id}`);
      }, 2000);
      
    } catch (e: any) {
      logger.error('❌ Enrollment creation error:', e);
      const errorMessage = e.message || 'Enrollment failed. Please try again.';
      setError(errorMessage);
      setProgress(0);
      
      // Log the error for monitoring
      errorLoggingService.logEnrollmentError('create', e, {
        courseId: course.id,
        userId: user.id,
        userEmail: user.email,
        proofUrl,
        paymentRef,
        paymentDate
      });
      
      toast({
        title: "❌ Enrollment Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit() {
    if (!file) {
      setError('Please select a payment proof file');
      return;
    }

    if (!paymentRef.trim()) {
      setError('Please enter your payment reference');
      return;
    }

    if (!paymentDate) {
      setError('Please select your payment date');
      return;
    }

    setUploading(true);
    setError('');
    setProgress(0);

    try {
      const proofUrl = await uploadProof(file, user?.id || '');
      await createEnrollmentSubmission(proofUrl);
    } catch (e: any) {
      console.error('Submit error:', e);
      setError(e.message || 'Submission failed');
      setProgress(0);
    }
  }

  // Removed unused reset function

  return (
    <EnrollmentErrorBoundary
      enrollmentContext={{
        courseId: courseId || undefined,
        userId: user?.id,
        operation: 'enrollment'
      }}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/course/${courseId}`)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Enroll in {course.title}
          </h1>
          <p className="text-gray-600">
            Complete your enrollment by providing payment proof
          </p>
        </div>

        {/* Progress Bar */}
        {(uploading || enrollmentLoading) && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                {enrollmentLoading ? 'Loading enrollment data...' : 'Processing enrollment...'}
              </span>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Success Message */}
        {success && (
          <Card className="mb-6 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Enrollment Submitted Successfully!</h3>
                  <p className="text-green-700 text-sm">Redirecting to course...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enrollment Form */}
        {!success && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Enrollment Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Course Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <span>•</span>
                  <span>Free Course</span>
                </div>
              </div>

              {/* Payment Reference */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Reference *
                </label>
                <input
                  type="text"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  placeholder="Enter your payment reference number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={uploading}
                />
              </div>

              {/* Payment Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Date *
                </label>
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={uploading}
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Proof *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="file-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {file ? file.name : 'Click to upload payment proof (PDF, JPG, PNG)'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Max file size: 5MB
                    </p>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={uploading || enrollmentLoading || !file || !paymentRef || !paymentDate}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {(uploading || enrollmentLoading) ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {enrollmentLoading ? 'Loading...' : 'Processing...'}
                  </div>
                ) : (
                  'Submit Enrollment'
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
    </EnrollmentErrorBoundary>
  );
};

export default Enrollment;
