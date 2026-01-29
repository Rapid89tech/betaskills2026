import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  AlertCircle,
  GraduationCap,
  ArrowRight,
  Play
} from 'lucide-react';
import EnrollNowPopup from '@/components/course/EnrollNowPopup';

const EnrollmentDemo: React.FC = () => {
  const [showEnrollmentPopup, setShowEnrollmentPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  // Sample course data
  const sampleCourse = {
    id: 'ai-human-relations',
    title: 'AI and Human Relations',
    description: 'Learn how to effectively interact with AI systems, understand their capabilities and limitations, and develop strategies for productive human-AI collaboration. This comprehensive course covers communication techniques, ethical considerations, and practical applications.',
    category: 'Technology',
    level: 'Intermediate',
    duration: '8 weeks',
    students: 1250,
    rating: 4.8,
    price: 0, // Free enrollment
    isComingSoon: false
  };

  const handleEnrollClick = (course: any) => {
    setSelectedCourse(course);
    setShowEnrollmentPopup(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            New Enrollment System Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the streamlined enrollment process with course overview and instructor approval
          </p>
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Course Overview</h3>
              <p className="text-gray-600 text-sm">
                Get detailed information about the course including description, duration, student count, and ratings before enrolling.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Simple Enrollment</h3>
              <p className="text-gray-600 text-sm">
                No payment required. Simply review the course and click "Confirm Enrollment" to request access.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Instructor Approval</h3>
              <p className="text-gray-600 text-sm">
                Your enrollment request is sent to the instructor for manual approval. You'll be notified of the decision.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Course Card Demo */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">Sample Course</h2>
              <p className="text-blue-100">Click the button below to see the new enrollment popup</p>
            </div>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Course Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {sampleCourse.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {sampleCourse.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-gray-700">{sampleCourse.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-2 text-green-600" />
                      <span className="text-gray-700">{sampleCourse.students} students</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Star className="w-4 h-4 mr-2 text-yellow-600" />
                      <span className="text-gray-700">{sampleCourse.rating}/5 rating</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-gray-700">{sampleCourse.level} level</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {sampleCourse.category}
                    </Badge>
                    <Badge variant="outline" className="border-green-300 text-green-700">
                      Free Enrollment
                    </Badge>
                  </div>
                </div>

                {/* Demo Actions */}
                <div className="flex flex-col justify-center space-y-4">
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Try the New Enrollment</h4>
                    <p className="text-gray-600 text-sm mb-4">
                      Experience the streamlined enrollment process
                    </p>
                  </div>

                  <Button
                    onClick={() => handleEnrollClick(sampleCourse)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Demo Enrollment Popup
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-gray-500">
                      This will open the new enrollment popup with course overview
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Process Flow */}
        <div className="max-w-4xl mx-auto mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Enrollment Process Flow</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Browse Course</h3>
              <p className="text-sm text-gray-600">View course details and overview</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Click Enroll</h3>
              <p className="text-sm text-gray-600">Open enrollment popup</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">Confirm Request</h3>
              <p className="text-sm text-gray-600">Review and submit enrollment request</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Wait Approval</h3>
              <p className="text-sm text-gray-600">Instructor reviews and approves</p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-4xl mx-auto mt-12">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Benefits of the New System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">No Payment Hassle</h4>
                      <p className="text-sm text-gray-600">Free enrollment without payment processing</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Clear Course Information</h4>
                      <p className="text-sm text-gray-600">Detailed overview before enrolling</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Instructor Control</h4>
                      <p className="text-sm text-gray-600">Manual approval ensures quality</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Real-time Notifications</h4>
                      <p className="text-sm text-gray-600">Instant updates on approval status</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Simple Process</h4>
                      <p className="text-sm text-gray-600">One-click enrollment request</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Quality Assurance</h4>
                      <p className="text-sm text-gray-600">Instructor review maintains standards</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enrollment Popup */}
        {selectedCourse && (
          <EnrollNowPopup
            open={showEnrollmentPopup}
            onClose={() => {
              setShowEnrollmentPopup(false);
              setSelectedCourse(null);
            }}
            course={selectedCourse}
            userId="demo-user-id"
            userEmail="demo@example.com"
            onEnrollmentSuccess={() => {
              console.log('Demo enrollment successful');
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EnrollmentDemo;
