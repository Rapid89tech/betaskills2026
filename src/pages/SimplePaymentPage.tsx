import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/hooks/AuthContext';
import { useCoursesContext } from '@/hooks/CoursesContext';

const SimplePaymentPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { courses, loading: coursesLoading } = useCoursesContext();

  console.log('SimplePaymentPage: courseId:', courseId);
  console.log('SimplePaymentPage: user:', user);
  console.log('SimplePaymentPage: courses:', courses);
  console.log('SimplePaymentPage: coursesLoading:', coursesLoading);

  const course = courses?.find(c => c.id === courseId);

  const handleGoBack = () => {
    navigate('/courses');
  };

  if (coursesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading course information...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-4">Course ID: {courseId}</p>
          <p className="text-gray-600 mb-4">Available courses: {courses?.map(c => c.id).join(', ')}</p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={handleGoBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Payment Page</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">{course.title}</h2>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <p className="text-lg font-bold mb-6">Price: R{course.price || 0}</p>
          
          <div className="space-y-4">
            <Button className="w-full" size="lg">
              Pay with Card - R{course.price || 0}
            </Button>
            <Button variant="secondary" className="w-full" size="lg">
              Pay with EFT - R{course.price || 0}
            </Button>
          </div>
          
          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✅ Payment Page Loaded Successfully!</h3>
            <p className="text-green-700 text-sm">
              The enrollment flow is working correctly. This simplified payment page confirms that:
            </p>
            <ul className="text-green-700 text-sm mt-2 list-disc list-inside">
              <li>Course ID: {courseId}</li>
              <li>Course found: {course.title}</li>
              <li>User logged in: {user?.email}</li>
              <li>Navigation working properly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimplePaymentPage;