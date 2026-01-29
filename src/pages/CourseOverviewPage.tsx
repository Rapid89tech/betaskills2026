import React from 'react';
import { useCourseData } from '@/hooks/useCourseData';
import CourseEnrollmentView from '@/components/course/CourseEnrollmentView';
import CourseSkeleton from '@/components/skeletons/CourseSkeleton';

const CourseOverviewPage = () => {
  const { course, isLoading } = useCourseData();

  // Dummy enroll handler and enrolling state for overview page
  const handleEnroll = () => {};
  const enrolling = false;

  if (isLoading) return <CourseSkeleton />;
  if (!course) return <div className="min-h-screen flex items-center justify-center">Course not found.</div>;

  return <CourseEnrollmentView course={course} handleEnroll={handleEnroll} enrolling={enrolling} />;
};

export default CourseOverviewPage; 