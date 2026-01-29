import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/AuthContext';
import { useToast } from '@/hooks/use-toast';
import SimpleEnrollmentForm from '@/components/course/SimpleEnrollmentForm';
import { BookOpen, Users, Clock, Star } from 'lucide-react';

// Sample courses for testing
const sampleCourses = [
  {
    id: 'christian-teacher',
    title: 'Christian Teacher Training',
    description: 'Learn to teach with Christian values and principles',
    category: 'Education',
    level: 'Beginner',
    duration: '8 weeks',
    students: 45,
    rating: 4.8
  },
  {
    id: 'roofing',
    title: 'Roofing Installation & Repair',
    description: 'Master the art of roofing installation and maintenance',
    category: 'Construction',
    level: 'Intermediate',
    duration: '6 weeks',
    students: 32,
    rating: 4.7
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship Fundamentals',
    description: 'Build your business from the ground up',
    category: 'Business',
    level: 'Beginner',
    duration: '10 weeks',
    students: 78,
    rating: 4.9
  },
  {
    id: 'plumbing',
    title: 'Plumbing Systems & Maintenance',
    description: 'Complete guide to plumbing installation and repair',
    category: 'Construction',
    level: 'Intermediate',
    duration: '7 weeks',
    students: 28,
    rating: 4.6
  }
];

const TestEnrollment = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);

  const handleEnrollClick = (course: any) => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to enroll in courses",
        variant: "destructive",
      });
      return;
    }
    
    setSelectedCourse(course);
    setShowEnrollmentForm(true);
  };

  const handleEnrollmentSuccess = () => {
    setShowEnrollmentForm(false);
    setSelectedCourse(null);
    toast({
      title: "🎉 Enrollment Submitted!",
      description: "Your enrollment request has been submitted and is awaiting admin approval.",
    });
  };

  const handleCloseForm = () => {
    setShowEnrollmentForm(false);
    setSelectedCourse(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Course Enrollment</h1>
          <p className="text-gray-600">
            Test the real enrollment system. Enrollments will appear in the admin dashboard for approval.
          </p>
          {user && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Logged in as:</strong> {user.email}
              </p>
            </div>
          )}
        </div>

        {showEnrollmentForm && selectedCourse ? (
          <div className="max-w-2xl mx-auto">
            <SimpleEnrollmentForm
              courseId={selectedCourse.id}
              courseTitle={selectedCourse.title}
              onEnrollmentSuccess={handleEnrollmentSuccess}
              onClose={handleCloseForm}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <p className="text-sm text-gray-600">{course.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{course.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Level:</span>
                      <span className="font-medium">{course.level}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Students:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Rating:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleEnrollClick(course)}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="bg-green-50 p-4 rounded-lg max-w-2xl mx-auto">
            <h3 className="font-semibold text-green-800 mb-2">How it works:</h3>
            <ol className="text-sm text-green-700 space-y-1 text-left max-w-md mx-auto">
              <li>1. Click "Enroll Now" on any course</li>
              <li>2. Fill out the enrollment form</li>
              <li>3. Submit your enrollment request</li>
              <li>4. Admin will review and approve in the admin dashboard</li>
              <li>5. You'll receive access once approved</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestEnrollment;
