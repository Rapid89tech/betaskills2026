import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseData } from '@/hooks/useCourseData';
import { useCoursesContext } from '@/hooks/CoursesContext';
import { useAuth } from '@/hooks/AuthContext';
import { Certificate } from './Certificate';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';

export const CertificatePage: React.FC = () => {
  const params = useParams<{ courseId?: string; id?: string }>();
  const courseId = params.courseId ?? params.id;
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { courses } = useCoursesContext();
  const { course } = useCourseData(courseId);
  
  // PERSISTENT CERTIFICATE DATA - Survives page refresh
  const getCertificateData = () => {
    const storageKey = courseId ? `certificate-data-${courseId}` : null;
    const stored = storageKey ? localStorage.getItem(storageKey) : null;
    let storedData: any = null;
    if (stored) {
      try {
        storedData = JSON.parse(stored);
      } catch {
        storedData = null;
      }
    }
    
    // Get user name from profile or user metadata
    let studentName = 'Student';
    if (profile?.first_name && profile?.last_name) {
      studentName = `${profile.first_name} ${profile.last_name}`;
    } else if (user?.user_metadata?.full_name) {
      studentName = String(user.user_metadata.full_name);
    } else if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      studentName = `${String(user.user_metadata.first_name)} ${String(user.user_metadata.last_name)}`;
    } else {
      const email = user?.email;
      if (email) {
        studentName = (email.split('@')[0] ?? email); // Use email prefix as name
      }
    }
    
    const courseFromCatalog = courseId
      ? courses.find(c => c.id === courseId || (c as any).courseId === courseId)
      : undefined;

    const courseTitleFromHook = typeof course?.title === 'string' ? course.title : '';
    const isPlaceholderHookTitle =
      !courseTitleFromHook ||
      courseTitleFromHook.trim().toLowerCase() === 'course' ||
      courseTitleFromHook.trim().toLowerCase() === 'course content loading';

    const storedTitle = typeof storedData?.courseTitle === 'string' ? storedData.courseTitle : '';
    const isPlaceholderStoredTitle =
      !storedTitle ||
      storedTitle.trim().toLowerCase() === 'course' ||
      (courseId ? storedTitle.trim() === courseId : false);

    const resolvedCourseTitle =
      (!isPlaceholderHookTitle ? courseTitleFromHook : '') ||
      courseFromCatalog?.title ||
      (!isPlaceholderStoredTitle ? storedTitle : '') ||
      courseId ||
      'Course';
    const instructorName = course?.instructor
      ? `${course.instructor.first_name} ${course.instructor.last_name}`
      : 'Expert Instructor';

    // Create default certificate data using actual course information
    const defaultData = {
      courseTitle: resolvedCourseTitle,
      studentName,
      completionDate: storedData?.completionDate || new Date().toISOString().split('T')[0],
      instructorName,
      courseId: courseId ?? 'test-course',
      grade: 'A'
    };
    
    // Store for persistence
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(defaultData));
    }
    return defaultData;
  };
  
  const certificateData = getCertificateData();

  console.log('CertificatePage loaded with persistent data:', {
    courseId,
    certificateData,
    user: user?.email,
    profile: profile?.first_name
  });

  // ALWAYS SHOW CERTIFICATE - No more loading states!

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(`/course/${courseId}`)}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Course
              </Button>
                             <div>
                 <h1 className="text-2xl font-bold">{certificateData.courseTitle}</h1>
                 <p className="text-blue-100">Certificate of Completion</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-yellow-300">
                <Trophy className="w-6 h-6" />
                <span className="font-semibold">Certificate Earned!</span>
              </div>
              <Button
                variant="ghost"
                onClick={() => navigate('/courses')}
                className="text-white hover:bg-white/20"
              >
                All Courses
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate */}
      <Certificate {...certificateData} />
    </div>
  );
}; 