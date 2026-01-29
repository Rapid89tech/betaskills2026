import { Course } from '@/types/course';

// Map of course IDs to their actual lesson counts
const courseLessonCounts: Record<string, number> = {
  'entrepreneurship-final': 48, // Based on actual course data
  'ai-human-relations': 35,
  'roofing101': 42,
  'plumbing101': 38,
  'tiling-101': 28,
  'hair-dressing': 70,
  'nail-technician': 30,
  'podcast-management-101': 40,
  'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5': 45, // Sound Engineering
  'computer-repairs': 35,
  'cellphone-repairs': 25,
  'motor-mechanic-petrol': 55,
  'motor-mechanic-petrol-02': 24, // Based on actual modules/lessons
  'motor-mechanic-diesel': 50
};

/**
 * Get the lesson count for a course
 * @param courseId - The course ID
 * @param fallback - Fallback number if course not found (default: 35)
 * @returns The number of lessons in the course
 */
export const getLessonCount = (courseId: string, fallback: number = 35): number => {
  return courseLessonCounts[courseId] || fallback;
};

/**
 * Get lesson count from actual course data if available
 * @param course - The full course object
 * @returns The number of lessons calculated from course modules
 */
export const calculateLessonCount = (course?: Course): number => {
  if (!course?.modules) {
    return 35; // Default fallback
  }
  
  return course.modules.reduce((total, module) => {
    return total + (module.lessons?.length || 0);
  }, 0);
};

/**
 * Format lesson count for display
 * @param count - The lesson count
 * @returns Formatted string like "24 lessons"
 */
export const formatLessonCount = (count: number): string => {
  return `${count} lesson${count !== 1 ? 's' : ''}`;
};