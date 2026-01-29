import { useState, useEffect } from 'react';
import { featuredCourses } from '@/data/featuredCourses';
import { UnifiedCourse } from '@/types/unifiedCourse';
import { CourseDataNormalizer } from '@/utils/courseDataNormalizer';
import { fallbackManager } from '@/utils/FallbackManager';
import { errorHandler } from '@/utils/ErrorHandler';
import { courseDataCache } from '@/utils/AdvancedCacheManager';
import { loadingOptimizer } from '@/utils/loadingOptimizer';

export interface FastCourse {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  level: string;
  price: number;
  instructor: string;
  rating: number;
  students: number;
  isComingSoon?: boolean;
}

export const useFastCourses = () => {
  const [courses, setCourses] = useState<FastCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load courses with fallback support and advanced caching
    const loadCourses = async () => {
      // Start loading optimization tracking
      loadingOptimizer.startLoading('courses-data', 'Loading courses...');

      try {
        // Use advanced cache manager for better performance
        const coursesData = await courseDataCache.get(
          'featured-courses-normalized',
          async () => {
            // Validate and normalize featured courses data
            const validatedCourses: UnifiedCourse[] = [];
            
            featuredCourses.forEach(course => {
              const validation = CourseDataNormalizer.validateCourse(course);
              if (validation.isValid) {
                validatedCourses.push(course);
              } else {
                console.warn(`Invalid course data for ${course.title}:`, validation.errors);
                // Still include the course but with normalized data
                validatedCourses.push(course);
              }
            });

            // Convert to FastCourse format for backward compatibility
            const fastCourses: FastCourse[] = validatedCourses.map(course => 
              CourseDataNormalizer.toFastCourse(course)
            );

            return fastCourses;
          },
          10 * 60 * 1000 // 10 minutes TTL for course data
        );

        // Also use fallback manager for additional resilience
        const fallbackData = await fallbackManager.withFallback(
          'featured-courses-fallback',
          async () => coursesData,
          {
            maxAge: 15 * 60 * 1000, // 15 minutes for fallback
            enableOfflineMode: true,
            showFallbackIndicator: true,
            gracefulDegradation: true
          }
        );

        setCourses(fallbackData.data || coursesData || []);
        setLoading(false);
        loadingOptimizer.updateProgress('courses-data', 100, 'Courses loaded');
      } catch (error) {
        console.error('Error loading courses:', error);
        errorHandler.handleError(error as Error, 'courses-loading');
        setError('Failed to load courses');
        setLoading(false);
      } finally {
        loadingOptimizer.finishLoading('courses-data');
      }
    };

    // Load courses
    loadCourses();
  }, []);

  return {
    courses,
    loading,
    error
  };
};