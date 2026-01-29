import { useMemo } from 'react';
import { Course } from './useCourses';
import { useRealTimeEnrollments } from './useRealTimeEnrollments';

interface UseSortedCoursesOptions {
  courses: Course[];
  prioritizeEnrolled?: boolean;
}

export const useSortedCourses = ({ 
  courses, 
  prioritizeEnrolled = true 
}: UseSortedCoursesOptions) => {
  const { userEnrollments } = useRealTimeEnrollments();

  const sortedCourses = useMemo(() => {
    if (!prioritizeEnrolled || userEnrollments.length === 0) {
      return courses;
    }

    // Get approved enrollments sorted by most recent
    const approvedEnrollments = userEnrollments
      .filter(enrollment => enrollment.status === 'approved')
      .sort((a, b) => new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime());

    // Get pending enrollments sorted by most recent
    const pendingEnrollments = userEnrollments
      .filter(enrollment => enrollment.status === 'pending')
      .sort((a, b) => new Date(b.enrolled_at).getTime() - new Date(a.enrolled_at).getTime());

    // Create sets of enrolled course IDs for quick lookup
    const approvedCourseIds = new Set(approvedEnrollments.map(e => e.course_id));
    const pendingCourseIds = new Set(pendingEnrollments.map(e => e.course_id));
    const allEnrolledCourseIds = new Set([...approvedCourseIds, ...pendingCourseIds]);

    // Separate courses into enrolled and non-enrolled
    const enrolledCourses: Course[] = [];
    const nonEnrolledCourses: Course[] = [];

    courses.forEach(course => {
      if (allEnrolledCourseIds.has(course.id)) {
        enrolledCourses.push(course);
      } else {
        nonEnrolledCourses.push(course);
      }
    });

    // Sort enrolled courses by enrollment date (most recent first)
    enrolledCourses.sort((a, b) => {
      const aEnrollment = [...approvedEnrollments, ...pendingEnrollments]
        .find(e => e.course_id === a.id);
      const bEnrollment = [...approvedEnrollments, ...pendingEnrollments]
        .find(e => e.course_id === b.id);

      if (!aEnrollment || !bEnrollment) return 0;

      // Prioritize approved over pending
      if (aEnrollment.status === 'approved' && bEnrollment.status === 'pending') return -1;
      if (aEnrollment.status === 'pending' && bEnrollment.status === 'approved') return 1;

      // Then sort by enrollment date
      return new Date(bEnrollment.enrolled_at).getTime() - new Date(aEnrollment.enrolled_at).getTime();
    });

    // Return enrolled courses first, then non-enrolled courses
    return [...enrolledCourses, ...nonEnrolledCourses];
  }, [courses, userEnrollments, prioritizeEnrolled]);

  // Get enrollment status for a specific course
  const getEnrollmentStatus = (courseId: string) => {
    const enrollment = userEnrollments.find(e => e.course_id === courseId);
    return enrollment?.status || null;
  };

  // Get enrollment data for a specific course
  const getEnrollmentData = (courseId: string) => {
    return userEnrollments.find(e => e.course_id === courseId) || null;
  };

  // Check if user is enrolled in a course
  const isEnrolled = (courseId: string) => {
    return userEnrollments.some(e => e.course_id === courseId && e.status === 'approved');
  };

  // Check if user has pending enrollment
  const hasPendingEnrollment = (courseId: string) => {
    return userEnrollments.some(e => e.course_id === courseId && e.status === 'pending');
  };

  return {
    sortedCourses,
    getEnrollmentStatus,
    getEnrollmentData,
    isEnrolled,
    hasPendingEnrollment,
    userEnrollments
  };
};

export default useSortedCourses;