
import React from 'react';
import CourseHeader from './enrollment/CourseHeader';
import EnrollmentSidebar from './enrollment/EnrollmentSidebar';
import CourseOverview from './enrollment/CourseOverview';
import CourseCurriculum from './enrollment/CourseCurriculum';
import LearningObjectives from './enrollment/LearningObjectives';
import type { Course } from '@/types/course';

interface CourseEnrollmentViewProps {
  course: Course;
  handleEnroll: () => void;
  enrolling: boolean;
}

const CourseEnrollmentView = ({ course, handleEnroll, enrolling }: CourseEnrollmentViewProps) => {
  const totalDuration = course.duration || "7 weeks";
  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Mobile-first container with 16px padding on mobile (Requirements 2.3) */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Standard Header for All Courses */}
        <CourseHeader 
          course={course} 
          totalDuration={totalDuration}
          totalLessons={totalLessons}
        />

        <div className="w-full max-w-7xl mx-auto">
          {/* Single-column on mobile, multi-column on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
            {/* Main Content - Single column on mobile */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-4 sm:space-y-6 lg:space-y-8">
              <CourseOverview course={course} />
              <div id="learning-objectives">
                <LearningObjectives objectives={course.learningObjectives || []} />
              </div>
              <div id="course-curriculum">
                <CourseCurriculum 
                  modules={course.modules} 
                  totalLessons={totalLessons}
                  totalDuration={totalDuration}
                />
              </div>
            </div>
            
            {/* Enrollment Sidebar - Stacks below content on mobile */}
            <div className="lg:col-span-4 xl:col-span-3">
              <EnrollmentSidebar 
                course={course}
                handleEnroll={handleEnroll}
                enrolling={enrolling}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollmentView;
