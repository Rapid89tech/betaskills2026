
import React from 'react';
import { Profile } from '@/types/auth';
import { Enrollment } from '@/types/enrollment';
import { Course } from '@/hooks/useCourses';
import InstructorDashboard from './InstructorDashboard';

interface AdminInstructorDashboardProps {
  profile: Profile;
  enrollments: Enrollment[];
  courses: Course[];
  userId?: string;
}

const AdminInstructorDashboard = ({ profile, enrollments, courses, userId }: AdminInstructorDashboardProps) => {
  return (
    <InstructorDashboard 
      profile={profile}
      enrollments={enrollments}
      courses={courses}
      userId={userId}
    />
  );
};

export default AdminInstructorDashboard;
