import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import SimpleEnrollmentForm from '@/components/course/SimpleEnrollmentForm';

interface EnrollmentSidebarProps {
  course: any;
  handleEnroll: () => void;
  enrolling: boolean;
}

const EnrollmentSidebar = ({ course, handleEnroll, enrolling }: EnrollmentSidebarProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  
  // Show special access message for users with full access
  const specialAccessEmails = ['john.doe@gmail.com', 'ericmnisi007@gmail.com', 'maxmon@gmail.com', 'carlowalljee@gmail.com', 'mopalamitshepo@gmail.com'];
  if (user?.email && specialAccessEmails.includes(user.email.toLowerCase())) {
    return (
      <div className="space-y-6">
        <Card className="sticky top-6 glassmorphism-card border-0 shadow-lg rounded-3xl overflow-hidden animate-fade-in-card">
          <CardContent className="p-6 flex flex-col items-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="text-center mb-5">
              <div className="text-2xl font-extrabold text-green-700 mb-1 animate-fade-in-card">🎯 Special Access</div>
              <div className="text-sm text-green-600">You have full access to all courses</div>
            </div>

            <Button 
              onClick={() => {
                // Navigate directly to course content
                window.location.href = `/course/${course.id}`;
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold py-3 min-h-[44px] text-base mb-5 rounded-full shadow-md animate-fade-in-card transition-all duration-300"
            >
              Access Course Content
            </Button>

            {/* Special Features */}
            <div className="w-full space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>Full course access granted</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>No enrollment required</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>All lessons available</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span>Certificate upon completion</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Show enrollment form for logged-in users
  if (showEnrollmentForm && user) {
    return (
      <div className="space-y-6">
        <SimpleEnrollmentForm
          courseId={course.id}
          courseTitle={course.title}
          onEnrollmentSuccess={() => {
            setShowEnrollmentForm(false);
            // Refresh the page to show the pending enrollment state
            window.location.reload();
          }}
          onClose={() => setShowEnrollmentForm(false)}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Enrollment Card */}
      <Card className="sticky top-6 glassmorphism-card border-0 shadow-lg rounded-3xl overflow-hidden animate-fade-in-card">
        <CardContent className="p-6 flex flex-col items-center bg-white/90 dark:bg-gray-900/90">
                    <div className="text-center mb-5">
            <div className="text-2xl font-extrabold gradient-text mb-1 animate-fade-in-card">Enroll Now</div>
          </div>

          <Button 
            onClick={() => {
              if (user) {
                setShowEnrollmentForm(true);
              } else {
                navigate('/auth');
              }
            }}
            disabled={enrolling}
            className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 min-h-[44px] text-base mb-5 rounded-full shadow-md animate-fade-in-card transition-all duration-300"
          >
            {enrolling ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Enrolling...
              </div>
            ) : (
              user ? 'Enroll Now' : 'Login to Enroll'
            )}
          </Button>

          {/* Course Features */}
          <div className="w-full space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Lifetime access to course content</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Certificate upon completion</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>24/7 support and guidance</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>Mobile-friendly learning</span>
            </div>
          </div>
        </CardContent>
        <style>{`
          .glassmorphism-card {
            background: rgba(255,255,255,0.8);
            box-shadow: 0 4px 24px 0 rgba(31, 38, 135, 0.08);
            backdrop-filter: blur(10px);
            border-radius: 2rem;
          }
          .gradient-text {
            background: linear-gradient(90deg, #dc2626 0%, #db2777 50%, #7c3aed 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          .animate-fade-in-card {
            opacity: 0;
            transform: translateY(24px) scale(0.98);
            animation: fadeInCard 0.7s cubic-bezier(.4,2,.3,1) forwards;
          }
          @keyframes fadeInCard {
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}</style>
      </Card>
    </div>
  );
};

export default EnrollmentSidebar;
