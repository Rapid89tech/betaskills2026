
import { Course } from '@/hooks/useCourses';

export const formatCourseFromSupabase = (supabaseCourse: any): Course => {
  return {
    id: supabaseCourse.id,
    title: supabaseCourse.title,
    description: supabaseCourse.description,
    level: supabaseCourse.level,
    category: supabaseCourse.category,
    is_free: supabaseCourse.is_free,
    status: supabaseCourse.status,
    price: supabaseCourse.price || 0,
    currency: supabaseCourse.currency || 'ZAR',
    students: supabaseCourse.students || 0,
    rating: supabaseCourse.rating || 0,
    duration: supabaseCourse.duration || '0 weeks',
    instructor: {
      id: supabaseCourse.instructor?.id || 'unknown',
      first_name: supabaseCourse.instructor?.first_name || 'Unknown',
      last_name: supabaseCourse.instructor?.last_name || 'Instructor',
      email: supabaseCourse.instructor?.email || 'unknown@example.com',
    },
    created_at: supabaseCourse.created_at || new Date().toISOString(),
    updated_at: supabaseCourse.updated_at || new Date().toISOString(),
    available: supabaseCourse.available !== false,
    available_date: supabaseCourse.available_date
  };
};
