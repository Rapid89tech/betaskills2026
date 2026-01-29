
import { Course } from '@/types/course';
import { SimplifiedCourse } from '@/hooks/useCourses';

export const convertToSimplifiedCourse = (course: Course): SimplifiedCourse => {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    category: course.category,
    level: course.level,
    duration: course.duration,
    is_free: course.is_free,
    price: course.price,
    currency: course.currency,
    students: course.students,
    rating: course.rating,
    instructor: {
      id: 'instructor-' + course.id,
      first_name: course.instructor.name.split(' ')[0] || 'Unknown',
      last_name: course.instructor.name.split(' ')[1] || 'Instructor',
      email: course.instructor.name.toLowerCase().replace(' ', '.') + '@example.com'
    },
    status: 'approved',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    available: true
  };
};
