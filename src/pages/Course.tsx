import { Suspense, lazy, useState, useEffect } from 'react';
import { useCourseData } from '@/hooks/useCourseData';
import { useLessonNavigation } from '@/hooks/useLessonNavigation';
import { useStableProgress } from '@/hooks/useStableProgress';
import { useCourseEnrollment } from '@/hooks/useCourseEnrollment';
import { useQuizState } from '@/hooks/useQuizState';
import { useLessonCompletion } from '@/hooks/useLessonCompletion';
import CourseSkeleton from '@/components/skeletons/CourseSkeleton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthContext';
import SimpleEnrollmentForm from '@/components/course/SimpleEnrollmentForm';
import { unifiedEnrollmentValidator } from '@/services/UnifiedEnrollmentValidator';
import { CourseContentValidator, type CourseValidationResult } from '@/services/CourseContentValidator';
import { Loader2, AlertCircle, RefreshCw, Clock, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
// Import mobile styles for responsive layout
import '@/styles/mobile.css';

// Lazy load heavy components
const CourseEnrollmentView = lazy(() => import('@/components/course/CourseEnrollmentView'));
const CoursePlayerView = lazy(() => import('@/components/course/CoursePlayerView'));

const Course = () => {
  // ALL HOOKS MUST BE CALLED AT THE TOP - NEVER CONDITIONALLY!
  const { user } = useAuth();
  const navigate = useNavigate();
  const { courseId } = useParams<{ courseId: string }>();
  const { toast } = useToast();
  
  // Core course data loading - pass courseId explicitly
  const { course, allLessons, isLoading: courseLoading } = useCourseData(courseId);
  
  // Stable progress management
  const { 
    progress: stableProgress, 
    completedLessons: stableCompletedLessons, 
    saveProgress: saveStableProgress 
  } = useStableProgress(course?.id);
  
  // Unified enrollment validation state
  const [accessValidation, setAccessValidation] = useState<{
    isValidating: boolean;
    hasAccess: boolean;
    confidence: number;
    enrollmentStatus: 'enrolled' | 'pending' | 'rejected' | 'unenrolled';
    errorMessage?: string;
    enrollment?: any;
  }>({
    isValidating: true,
    hasAccess: false,
    confidence: 0,
    enrollmentStatus: 'unenrolled'
  });
  
  // Course content validation state
  const [contentValidation, setContentValidation] = useState<CourseValidationResult>({
    isValid: false,
    hasModules: false,
    hasLessons: false,
    canProceed: false,
    missingData: [],
    contentStatus: 'invalid',
    errors: [],
    warnings: []
  });
  
  const [loadingState, setLoadingState] = useState<{
    message: string;
    showRetry: boolean;
  }>({
    message: 'Loading course...',
    showRetry: false
  });
  
  // Lesson navigation and completion
  const {
    currentLesson,
    setCurrentLesson,
    currentLessonData,
    isPlaying,
    setIsPlaying,
    sidebarOpen,
    setSidebarOpen,
    canAccessLesson,
    handleSetCurrentLesson,
    nextLesson,
    prevLesson
  } = useLessonNavigation(allLessons, stableCompletedLessons);

  // Quiz state management
  const { quizAttempts, saveQuizAttempts } = useQuizState(course, accessValidation.hasAccess);
  
  // Course enrollment management
  const { 
    enrolling, 
    showEnrollmentForm, 
    handleEnroll, 
    handleEnrollmentFormClose, 
    handleEnrollmentSuccess 
  } = useCourseEnrollment(course, async (_courseId: string, _courseTitle: string) => {
    // Simplified enrollment - just return success for now
    // The actual enrollment logic will be handled by the enrollment form
    return true;
  });

  // Lesson completion with unified progress management
  const { markComplete } = useLessonCompletion(
    allLessons,
    course,
    accessValidation.hasAccess,
    stableProgress,
    async (_courseId: string, newProgress: number) => {
      // Calculate completed lessons from progress
      const newCompletedCount = Math.floor((newProgress / 100) * (allLessons?.length || 0));
      const newCompletedLessons = Array.from({ length: newCompletedCount }, (_, i) => i);
      
      // Save to stable progress (localStorage)
      saveStableProgress(newProgress, newCompletedLessons);
      
      return true;
    }
  );

  const handleMarkComplete = async () => {
    await markComplete(
      currentLesson,
      currentLessonData,
      quizAttempts,
      saveQuizAttempts,
      setCurrentLesson
    );
  };
  
  // Check if user just came from payment success (for future use)
  // const fromPayment = searchParams.get('from_payment') === 'true';

  // Unified enrollment validation - single source of truth
  useEffect(() => {
    const validateAccess = async () => {
      if (!user || !courseId) {
        setAccessValidation(prev => ({
          ...prev,
          isValidating: false,
          hasAccess: false,
          enrollmentStatus: 'unenrolled'
        }));
        return;
      }

      try {
        setLoadingState({
          message: 'Validating course access...',
          showRetry: false
        });

        const userId = user.id || user.email;
        if (!userId) {
          throw new Error('User ID not available');
        }

        // Use unified enrollment validator for comprehensive check
        const validationResult = await unifiedEnrollmentValidator.validateEnrollment(
          userId,
          courseId,
          { minConfidence: 0.5 }
        );

        console.log('🔍 Unified Course Access Validation:', {
          courseId,
          userId,
          status: validationResult.status,
          confidence: validationResult.confidence,
          sources: validationResult.sources.length,
          primarySource: validationResult.primarySource?.name
        });

        // Extract enrollment data from primary source
        const enrollmentData = validationResult.primarySource?.data || null;

        const newAccessValidation = {
          isValidating: false,
          hasAccess: validationResult.status === 'enrolled',
          confidence: validationResult.confidence,
          enrollmentStatus: validationResult.status,
          enrollment: enrollmentData,
          ...(validationResult.status !== 'enrolled' && {
            errorMessage: `Access denied: ${validationResult.status}`
          })
        };
        
        setAccessValidation(newAccessValidation);

        // Show user feedback for low confidence enrollments
        if (validationResult.status === 'enrolled' && validationResult.confidence < 0.7) {
          toast({
            title: "Course Access Granted",
            description: `Access verified with ${Math.round(validationResult.confidence * 100)}% confidence from ${validationResult.primarySource?.name}`,
            duration: 3000,
          });
        }

      } catch (error) {
        console.error('❌ Course access validation failed:', error);
        
        setAccessValidation({
          isValidating: false,
          hasAccess: false,
          confidence: 0,
          enrollmentStatus: 'unenrolled',
          errorMessage: error instanceof Error ? error.message : 'Validation failed'
        });

        setLoadingState({
          message: 'Failed to validate course access',
          showRetry: true
        });
      }
    };

    validateAccess();
  }, [user, courseId, toast]);

  // Course content validation - separate from enrollment
  useEffect(() => {
    const validateContent = async () => {
      if (!course) {
        setContentValidation({
          isValid: false,
          hasModules: false,
          hasLessons: false,
          canProceed: false,
          missingData: ['course'],
          contentStatus: 'invalid',
          errors: [{
            type: 'missing_data',
            message: 'Course data not available',
            severity: 'critical'
          }],
          warnings: []
        });
        return;
      }

      try {
        // Use the static method with enhanced validation
        const validation = CourseContentValidator.validateCourse(course, {
          requiresTitle: true,
          requiresDescription: false, // Description is optional for now
          minimumModules: 1,
          minimumLessonsPerModule: 1,
          requiresLessonContent: false // Content can be added progressively
        });
        
        console.log('🔍 Enhanced Course Content Validation:', {
          courseId: course.id,
          courseTitle: course.title,
          isValid: validation.isValid,
          hasModules: validation.hasModules,
          hasLessons: validation.hasLessons,
          canProceed: validation.canProceed,
          contentStatus: validation.contentStatus,
          missingData: validation.missingData,
          errors: validation.errors.length,
          warnings: validation.warnings.length,
          summary: CourseContentValidator.getValidationSummary(validation)
        });

        setContentValidation(validation);

        // Show user feedback for validation issues
        if (validation.errors.length > 0) {
          const criticalErrors = validation.errors.filter(e => e.severity === 'critical');
          if (criticalErrors.length > 0 && criticalErrors[0]) {
            toast({
              title: "Course Content Issue",
              description: `Critical issues found: ${criticalErrors[0].message}`,
              variant: "destructive",
              duration: 5000,
            });
          }
        }

        if (validation.warnings.length > 0 && validation.canProceed) {
          toast({
            title: "Course Content Notice",
            description: `Course is available but has ${validation.warnings.length} content warnings`,
            duration: 3000,
          });
        }

      } catch (error) {
        console.error('❌ Course content validation failed:', error);
        
        setContentValidation({
          isValid: false,
          hasModules: false,
          hasLessons: false,
          canProceed: false,
          missingData: ['validation_error'],
          contentStatus: 'invalid',
          errors: [{
            type: 'content_error',
            message: error instanceof Error ? error.message : 'Validation failed',
            severity: 'critical'
          }],
          warnings: []
        });
      }
    };

    validateContent();
  }, [course, toast]);

  // Retry validation functions
  const retryValidation = () => {
    setAccessValidation(prev => ({ ...prev, isValidating: true }));
    setLoadingState({ message: 'Retrying validation...', showRetry: false });
    
    // Clear cache and retry
    unifiedEnrollmentValidator.clearCache();
    
    setTimeout(() => {
      if (user && courseId) {
        const userId = user.id || user.email;
        if (userId) {
          unifiedEnrollmentValidator.validateEnrollment(userId, courseId, { useCache: false })
            .then(result => {
              const enrollmentData = result.primarySource?.data || null;
              setAccessValidation({
                isValidating: false,
                hasAccess: result.status === 'enrolled',
                confidence: result.confidence,
                enrollmentStatus: result.status,
                enrollment: enrollmentData
              });
              setLoadingState({ message: 'Loading course...', showRetry: false });
            })
            .catch(() => {
              setLoadingState({
                message: 'Validation failed again',
                showRetry: true
              });
            });
        }
      }
    }, 1000);
  };

  const retryContentValidation = () => {
    if (course) {
      // Re-run content validation
      const validation = CourseContentValidator.validateCourse(course, {
        requiresTitle: true,
        requiresDescription: false,
        minimumModules: 1,
        minimumLessonsPerModule: 1,
        requiresLessonContent: false
      });
      
      setContentValidation(validation);
      
      toast({
        title: "Content Validation Refreshed",
        description: `Status: ${validation.contentStatus} | Can proceed: ${validation.canProceed ? 'Yes' : 'No'}`,
        duration: 3000,
      });
    }
  };

  console.log("📊 Course Page State Summary:", {
    loading: courseLoading,
    courseExists: !!course,
    courseId: course?.id,
    userEmail: user?.email,
    accessValidation: {
      isValidating: accessValidation.isValidating,
      hasAccess: accessValidation.hasAccess,
      enrollmentStatus: accessValidation.enrollmentStatus,
      confidence: accessValidation.confidence
    },
    contentValidation: {
      isValid: contentValidation.isValid,
      canProceed: contentValidation.canProceed,
      contentStatus: contentValidation.contentStatus,
      hasModules: contentValidation.hasModules,
      hasLessons: contentValidation.hasLessons,
      errorsCount: contentValidation.errors.length,
      warningsCount: contentValidation.warnings.length
    }
  });

  // Show loading state for course data or access validation
  if (courseLoading || accessValidation.isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mobile-px">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 mobile-p">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <div className="text-center">
                <p className="text-lg font-medium mobile-text-body">{loadingState.message}</p>
                <p className="text-sm text-gray-600 mt-1 mobile-text-body">Please wait...</p>
              </div>
              {loadingState.showRetry && (
                <Button onClick={retryValidation} variant="outline" size="sm" className="touch-target-btn">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Retry
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Handle course not found
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mobile-px">
        <Card className="max-w-md w-full">
          <CardHeader className="mobile-p">
            <CardTitle className="text-center text-red-600 mobile-text-h3">Course Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4 mobile-p">
            <p className="text-gray-600 mobile-text-body">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button 
              onClick={() => navigate('/courses')}
              className="w-full touch-target-btn"
            >
              Back to Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Use unified validation results - single source of truth
  const userIsEnrolled = accessValidation.hasAccess;

  // If user is enrolled (approved), show course content
  if (userIsEnrolled) {
    console.log("🎯 Course Page: User IS enrolled, showing course player");
    console.log("🎯 Course data:", { 
      courseId: course?.id, 
      title: course?.title, 
      modulesCount: (course as any)?.modules?.length,
      lessonsCount: allLessons?.length || 0,
      contentValid: contentValidation.canProceed
    });
    
    // Check if course content is ready with enhanced validation
    if (!contentValidation.canProceed) {
      const userFriendlyMessage = CourseContentValidator.createUserFriendlyMessage(contentValidation);
      const criticalErrors = contentValidation.errors.filter(e => e.severity === 'critical');
      const hasStructuralIssues = criticalErrors.length > 0;
      
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 mobile-px">
          <Card className="max-w-lg w-full">
            <CardHeader className="mobile-p">
              <CardTitle className="flex items-center gap-2 mobile-text-h3">
                {hasStructuralIssues ? (
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                ) : (
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                )}
                {hasStructuralIssues ? 'Course Unavailable' : 'Course Being Prepared'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 mobile-p">
              <p className="text-gray-600 mobile-text-body">
                {userFriendlyMessage}
              </p>
              
              {/* Show content status */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Content Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    contentValidation.contentStatus === 'complete' ? 'bg-green-100 text-green-800' :
                    contentValidation.contentStatus === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                    contentValidation.contentStatus === 'placeholder' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {contentValidation.contentStatus.charAt(0).toUpperCase() + contentValidation.contentStatus.slice(1)}
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Modules: {contentValidation.hasModules ? '✓' : '✗'} | 
                  Lessons: {contentValidation.hasLessons ? '✓' : '✗'}
                </div>
              </div>

              {/* Show validation details for debugging */}
              {contentValidation.missingData.length > 0 && (
                <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
                  <p className="font-medium mb-1">Missing Data:</p>
                  <p>{contentValidation.missingData.join(', ')}</p>
                </div>
              )}

              {/* Show errors if any */}
              {contentValidation.errors.length > 0 && (
                <div className="text-sm bg-red-50 p-3 rounded">
                  <p className="font-medium text-red-800 mb-1">Issues Found:</p>
                  <ul className="text-red-700 space-y-1">
                    {contentValidation.errors.slice(0, 3).map((error, index) => (
                      <li key={index} className="flex items-start gap-1">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{error.message}</span>
                      </li>
                    ))}
                    {contentValidation.errors.length > 3 && (
                      <li className="text-red-600 italic">
                        ... and {contentValidation.errors.length - 3} more issues
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* Mobile-friendly button layout - stacks on mobile */}
              <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                <Button onClick={() => navigate('/courses')} variant="outline" className="touch-target-btn w-full sm:w-auto">
                  Back to Courses
                </Button>
                <Button onClick={retryContentValidation} size="sm" variant="outline" className="touch-target-btn w-full sm:w-auto">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh
                </Button>
                <Button onClick={() => window.location.reload()} size="sm" className="touch-target-btn w-full sm:w-auto">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reload
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    // Show course player with validated content
    return (
      <Suspense fallback={<CourseSkeleton />}>
        <CoursePlayerView
          course={course}
          enrollment={accessValidation.enrollment}
          progress={stableProgress}
          allLessons={allLessons}
          currentLesson={currentLesson}
          currentLessonData={currentLessonData}
          completedLessons={stableCompletedLessons}
          quizAttempts={quizAttempts}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          canAccessLesson={canAccessLesson}
          setCurrentLesson={handleSetCurrentLesson}
          nextLesson={nextLesson}
          prevLesson={prevLesson}
          markComplete={handleMarkComplete}
        />
      </Suspense>
    );
  }

  console.log("❌ Course Page: User is NOT enrolled, unified validation:", accessValidation);

  // Handle different enrollment statuses from enhanced validation
  if (accessValidation.enrollmentStatus === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mobile-px">
        <Card className="w-full max-w-md">
          <CardHeader className="mobile-p">
            <CardTitle className="mobile-text-h3">Enrollment Pending Approval</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 mobile-p">
            <p className="mobile-text-body">Your enrollment request for {course.title} has been submitted and is awaiting admin approval.</p>
            <p className="text-sm text-gray-600 mobile-text-body">
              Confidence: {Math.round(accessValidation.confidence * 100)}%
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
              <Button onClick={() => navigate('/courses')} variant="outline" className="touch-target-btn w-full sm:w-auto">
                Back to Courses
              </Button>
              <Button onClick={retryValidation} size="sm" className="touch-target-btn w-full sm:w-auto">
                <RefreshCw className="mr-2 h-4 w-4" />
                Check Status
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (accessValidation.enrollmentStatus === 'rejected') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 mobile-px">
        <Card className="w-full max-w-md">
          <CardHeader className="mobile-p">
            <CardTitle className="text-red-600 mobile-text-h3">Enrollment Not Approved</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 mobile-p">
            <div className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="mobile-text-body">Your enrollment request was not approved.</p>
            </div>
            <p className="text-sm text-gray-600 mobile-text-body">
              Please contact support for assistance or try enrolling again.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
              <Button onClick={() => navigate('/courses')} variant="outline" className="touch-target-btn w-full sm:w-auto">
                Back to Courses
              </Button>
              <Button onClick={() => window.location.href = 'mailto:support@example.com'} size="sm" className="touch-target-btn w-full sm:w-auto">
                Contact Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If not enrolled, show enrollment view
  console.log("Course Page: User not enrolled, showing enrollment view");
  return (
    <>
      <Suspense fallback={<CourseSkeleton />}>
        <CourseEnrollmentView
          course={course}
          handleEnroll={handleEnroll}
          enrolling={enrolling}
        />
      </Suspense>
      
      {/* Enrollment Form Modal - Mobile responsive */}
      {showEnrollmentForm && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 mobile-px">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md mobile-p">
            <SimpleEnrollmentForm
              courseId={course.id}
              courseTitle={course.title}
              onEnrollmentSuccess={handleEnrollmentSuccess}
              onClose={handleEnrollmentFormClose}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Course;