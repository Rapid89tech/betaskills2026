import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CourseSkeleton from '@/components/skeletons/CourseSkeleton';

/**
 * EMERGENCY SIMPLE COURSE PAGE
 * This is a simplified version that just shows enrollment success
 * and redirects to the main course page after a delay
 */
const CourseSimple = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = React.useState(3);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to courses page
          navigate('/courses');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="max-w-md w-full mx-4">
        <CardHeader>
          <CardTitle className="text-center text-green-600">✅ Enrollment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            You have been successfully enrolled in the course!
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to courses page in {countdown} seconds...
          </p>
          <Button 
            onClick={() => navigate('/courses')}
            className="w-full"
          >
            Go to Courses Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseSimple;
