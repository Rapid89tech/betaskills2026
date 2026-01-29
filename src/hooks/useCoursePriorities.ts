import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/hooks/AuthContext';
import { useEnrollments } from '@/hooks/EnrollmentContext';
import { CoursePriorityCalculator } from '@/services/CoursePriorityCalculator';
import { CoursePriorityCalculation } from '@/types/unifiedCourse';
import { CoursePriority } from '@/types/enrollment';

/**
 * Hook to calculate and manage course priorities based on enrollment status
 */
export const useCoursePriorities = (courseIds: string[]) => {
  const { user } = useAuth();
  const { enrollments, isLoading: enrollmentsLoading } = useEnrollments();
  const [coursePriorities, setCoursePriorities] = useState<CoursePriority[]>([]);
  const [loading, setLoading] = useState(true);

  // Calculate priorities when data changes
  const priorityCalculations = useMemo(() => {
    if (enrollmentsLoading || !courseIds.length) {
      return [];
    }

    return CoursePriorityCalculator.calculatePriorities(
      courseIds,
      enrollments || {},
      coursePriorities
    );
  }, [courseIds, enrollments, enrollmentsLoading, coursePriorities]);

  // Convert calculations to CoursePriority format
  const convertedPriorities = useMemo(() => {
    if (!user?.id || !priorityCalculations.length) {
      return [];
    }

    return CoursePriorityCalculator.toCoursePriority(
      priorityCalculations,
      user.id
    );
  }, [priorityCalculations, user?.id]);

  useEffect(() => {
    if (!enrollmentsLoading) {
      setCoursePriorities(convertedPriorities);
      setLoading(false);
    }
  }, [convertedPriorities, enrollmentsLoading]);

  // Get sorted course IDs based on priority
  const sortedCourseIds = useMemo(() => {
    return priorityCalculations
      .sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        return a.displayOrder - b.displayOrder;
      })
      .map(calc => calc.courseId);
  }, [priorityCalculations]);

  // Get priority for a specific course
  const getCoursePriority = (courseId: string): CoursePriority | undefined => {
    return coursePriorities.find(p => p.courseId === courseId);
  };

  // Check if a course has high priority (enrolled or pending)
  const isHighPriority = (courseId: string): boolean => {
    const priority = getCoursePriority(courseId);
    return priority?.enrollmentStatus === 'ENROLLED' || priority?.enrollmentStatus === 'PENDING';
  };

  // Get enrollment status for a specific course
  const getEnrollmentStatus = (courseId: string): 'ENROLLED' | 'PENDING' | 'NOT_ENROLLED' => {
    const calculation = priorityCalculations.find(calc => calc.courseId === courseId);
    return calculation?.enrollmentStatus || 'NOT_ENROLLED';
  };

  // Get status indicator for a course
  const getStatusIndicator = (courseId: string) => {
    const status = getEnrollmentStatus(courseId);
    return CoursePriorityCalculator.getEnrollmentStatusIndicator(status);
  };

  // Group courses by enrollment status
  const courseGroups = useMemo(() => {
    return CoursePriorityCalculator.groupCoursesByStatus(priorityCalculations);
  }, [priorityCalculations]);

  // Get courses by status
  const enrolledCourseIds = useMemo(() => 
    courseGroups.enrolled.map(calc => calc.courseId), 
    [courseGroups.enrolled]
  );

  const pendingCourseIds = useMemo(() => 
    courseGroups.pending.map(calc => calc.courseId), 
    [courseGroups.pending]
  );

  const availableCourseIds = useMemo(() => 
    courseGroups.available.map(calc => calc.courseId), 
    [courseGroups.available]
  );

  return {
    coursePriorities,
    priorityCalculations,
    sortedCourseIds,
    loading: loading || enrollmentsLoading,
    getCoursePriority,
    isHighPriority,
    getEnrollmentStatus,
    getStatusIndicator,
    courseGroups,
    enrolledCourseIds,
    pendingCourseIds,
    availableCourseIds
  };
};