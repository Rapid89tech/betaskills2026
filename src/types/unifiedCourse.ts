/**
 * Unified Course Interface
 * This interface standardizes course data across the application
 */

export interface UnifiedCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  currency: string;
  instructor: string;
  rating: number;
  students: number;
  image: string;
  isComingSoon?: boolean | undefined;
  available: boolean;
  courseId: string; // For backward compatibility
}

/**
 * Course Priority Model for enrollment status display
 */
export interface CoursePriorityCalculation {
  courseId: string;
  enrollmentStatus: 'ENROLLED' | 'PENDING' | 'NOT_ENROLLED';
  priority: number;
  displayOrder: number;
}

/**
 * Category mapping for course filtering
 */
export const COURSE_CATEGORIES = {
  'Business': 'Business',
  'ICT': 'ICT',
  'Electronics': 'Electronics', 
  'Construction and Civil': 'Construction and Civil',
  'Health and Beauty': 'Health and Beauty',
  'Film & Broadcasting': 'Film & Broadcasting',
  'Religion': 'Religion',
  'Hospitality and Culinary': 'Hospitality and Culinary',
  'Motor Vehicles': 'Motor Vehicles',
  'Automotive': 'Motor Vehicles', // Alias for Motor Vehicles
  'Appliances': 'Appliances',
  'Professional Services': 'Professional Services'
} as const;

export type CourseCategory = keyof typeof COURSE_CATEGORIES;