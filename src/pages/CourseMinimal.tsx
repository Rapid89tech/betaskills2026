import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * MINIMAL COURSE PAGE - NO COMPLEX HOOKS
 * This bypasses all the complex hook logic that's causing errors
 */
const CourseMinimal = () => {
  const { courseId, id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const actualCourseId = courseId || id;

  // Check localStorage for enrollment
  const [isEnrolled, setIsEnrolled] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!user || !actualCourseId) {
      setIsLoading(false);
      return;
    }

    console.log('🔍 CourseMinimal: Checking enrollment for', { userId: user.id, email: user.email, courseId: actualCourseId });

    // Try BOTH user.id and user.email as possible user identifiers
    const possibleUserIds = [user.id, user.email, (user as any).user_id].filter(Boolean);
    console.log('🔍 CourseMinimal: Possible user IDs:', possibleUserIds);
    
    const userId = user.id || user.email;
    
    // AGGRESSIVE CHECK - Check ALL possible localStorage keys
    const allKeys = Object.keys(localStorage);
    console.log('🔍 CourseMinimal: All localStorage keys:', allKeys.filter(k => k.includes('enrollment') || k.includes('payment')));
    
    // Check enrollment success flag
    const enrollmentSuccessKey = `enrollment-success-${userId}-${actualCourseId}`;
    const enrollmentSuccess = localStorage.getItem(enrollmentSuccessKey);
    console.log('🔍 CourseMinimal: Checking', enrollmentSuccessKey, ':', enrollmentSuccess);
    
    if (enrollmentSuccess) {
      try {
        const successData = JSON.parse(enrollmentSuccess);
        console.log('✅ CourseMinimal: Found enrollment success flag:', successData);
        if (successData.status === 'approved' || successData.courseId === actualCourseId) {
          setIsEnrolled(true);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Error parsing enrollment success:', e);
      }
    }

    // Check recent payment
    const recentPaymentKey = `recent-payment-${userId}-${actualCourseId}`;
    const recentPayment = localStorage.getItem(recentPaymentKey);
    console.log('🔍 CourseMinimal: Checking', recentPaymentKey, ':', recentPayment);
    
    if (recentPayment) {
      try {
        const paymentData = JSON.parse(recentPayment);
        console.log('✅ CourseMinimal: Found recent payment:', paymentData);
        const paymentTime = new Date(paymentData.timestamp).getTime();
        const now = Date.now();
        const thirtyMinutes = 30 * 60 * 1000; // Extended to 30 minutes
        
        if (now - paymentTime < thirtyMinutes) {
          console.log('✅ CourseMinimal: Recent payment is valid, granting access');
          setIsEnrolled(true);
          setIsLoading(false);
          return;
        }
      } catch (e) {
        console.warn('Error parsing recent payment:', e);
      }
    }

    // Check ALL enrollment keys
    const enrollmentKeys = [
      `enrollment-${actualCourseId}`,
      `user-enrollment-${userId}-${actualCourseId}`,
      `user-enrollments-${userId}`,
      'enrollments'
    ];
    
    for (const key of enrollmentKeys) {
      const data = localStorage.getItem(key);
      console.log('🔍 CourseMinimal: Checking', key, ':', data ? 'EXISTS' : 'NOT FOUND');
      
      if (data) {
        try {
          const parsed = JSON.parse(data);
          
          if (Array.isArray(parsed)) {
            // It's an array of enrollments
            const found = parsed.find((e: any) => {
              const courseMatches = e.course_id === actualCourseId;
              const userMatches = possibleUserIds.some(id => 
                e.user_id === id || e.user_email === id
              );
              const statusMatches = e.status === 'approved';
              
              console.log('🔍 Checking enrollment:', { 
                courseMatches, 
                userMatches, 
                statusMatches,
                enrollmentUserId: e.user_id,
                enrollmentEmail: e.user_email,
                enrollmentCourseId: e.course_id,
                enrollmentStatus: e.status
              });
              
              return courseMatches && userMatches && statusMatches;
            });
            
            if (found) {
              console.log('✅ CourseMinimal: Found enrollment in array:', found);
              setIsEnrolled(true);
              setIsLoading(false);
              return;
            }
          } else {
            // It's a single enrollment
            const courseMatches = parsed.course_id === actualCourseId;
            const userMatches = possibleUserIds.some(id => 
              parsed.user_id === id || parsed.user_email === id
            );
            const statusMatches = parsed.status === 'approved';
            
            console.log('🔍 Checking single enrollment:', { 
              courseMatches, 
              userMatches, 
              statusMatches,
              enrollmentUserId: parsed.user_id,
              enrollmentEmail: parsed.user_email
            });
            
            if (courseMatches && userMatches && statusMatches) {
              console.log('✅ CourseMinimal: Found single enrollment:', parsed);
              setIsEnrolled(true);
              setIsLoading(false);
              return;
            }
          }
        } catch (e) {
          console.warn(`Error parsing ${key}:`, e);
        }
      }
    }

    console.log('❌ CourseMinimal: No enrollment found after checking all keys');
    setIsLoading(false);
  }, [user, actualCourseId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-center">Please Log In</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>You need to be logged in to access this course.</p>
            <Button onClick={() => navigate('/auth')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isEnrolled) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-center">Not Enrolled</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>You are not enrolled in this course yet.</p>
            <Button onClick={() => navigate('/courses')} className="w-full">
              Browse Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is enrolled - show success message and link
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <Card className="max-w-2xl w-full mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">✅</span>
          </div>
          <CardTitle className="text-3xl text-green-600 mb-2">Enrollment Successful!</CardTitle>
          <p className="text-gray-600">You now have full access to this course</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-800 mb-2">
              🎓 You're Now Enrolled!
            </h3>
            <p className="text-green-700 mb-3">
              Your payment has been processed successfully and you have been enrolled in <strong>{actualCourseId}</strong>.
            </p>
            <p className="text-green-700">
              You can now access all course materials, lessons, and resources.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">📚 What's Next?</h4>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• Access your course from the Dashboard</li>
              <li>• Track your progress as you complete lessons</li>
              <li>• Earn your certificate upon completion</li>
              <li>• Get support from instructors anytime</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> The interactive course player is currently being updated with new features. 
              You can access your enrolled courses from the Dashboard or Courses page.
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/dashboard')} 
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
            >
              📊 Go to My Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/courses')} 
              variant="outline" 
              className="w-full text-lg py-6"
            >
              🔍 Browse More Courses
            </Button>
          </div>

          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>Course ID: <code className="bg-gray-100 px-2 py-1 rounded">{actualCourseId}</code></p>
            <p className="mt-2">Need help? Contact support@betaskills.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseMinimal;
