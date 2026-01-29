
import { useState, useEffect } from 'react';
import { dieselMechanicCourse } from '@/data/dieselMechanic/index';

export interface Course {
  id: string;
  title: string;
  description?: string;
  level: string;
  category: string;
  is_free: boolean;
  status?: string;
  price: number;
  currency: string;
  instructor: {
    name: string;
    title: string;
    bio: string;
    avatar: string;
    first_name?: string;
    last_name?: string;
  };
  instructor_id?: string;
  thumbnail?: string;
  duration?: string;
  students?: number;
  rating?: number;
  learningObjectives?: string[];
  modules?: any[];
}

interface CreateCourseData {
  title: string;
  description: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  is_free: boolean;
}

export const useDieselCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = () => {
      setCourses([dieselMechanicCourse]);
      setLoading(false);
    };

    loadCourses();
  }, []);

  const createCourse = async (courseData: CreateCourseData): Promise<Course | null> => {
    try {
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: courseData.title,
        description: courseData.description,
        level: courseData.level,
        category: courseData.category,
        is_free: courseData.is_free,
        price: courseData.is_free ? 0 : courseData.price,
        currency: 'ZAR',
        instructor: {
          name: 'Default Instructor',
          title: 'Course Instructor',
          bio: 'Experienced instructor',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        duration: '4 weeks',
        students: 0,
        rating: 0,
        learningObjectives: [],
        modules: []
      };

      setCourses(prev => [...prev, newCourse]);
      return newCourse;
    } catch (error) {
      console.error('Error creating course:', error);
      return null;
    }
  };

  return { courses, loading, createCourse };
};
