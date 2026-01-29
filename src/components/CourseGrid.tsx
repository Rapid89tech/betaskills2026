import React, { memo, useState, useMemo } from 'react';
import { useCourses } from '@/hooks/useCourses';
import CourseCard from './CourseCard';
import CourseFilter from './CourseFilter';
import { useSmoothAnimations, useOptimizedList } from '@/hooks/useSmoothAnimations';
import { SmoothContentPlaceholder } from './SmoothLoadingSpinner';

const CourseGrid = memo(() => {
  const { courses, loading } = useCourses();
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    availability: ''
  });

  // Get unique categories from courses
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(courses.map(course => course.category))];
    return uniqueCategories.sort();
  }, [courses]);

  // Filter courses based on current filters
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesKeyword = !filters.keyword || 
        course.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.keyword.toLowerCase());
      
      const matchesCategory = !filters.category || course.category === filters.category;
      
      const matchesAvailability = !filters.availability || 
        (filters.availability === 'available' && course.available) ||
        (filters.availability === 'coming-soon' && !course.available) ||
        (filters.availability === 'enrolled' && course.status === 'enrolled');
      
      return matchesKeyword && matchesCategory && matchesAvailability;
    });
  }, [courses, filters]);

  const { visibleItems, loadMore, hasMore } = useOptimizedList(filteredCourses, 6);
  const { elementRef, addSmoothClass } = useSmoothAnimations({
    threshold: 0.1,
    rootMargin: '100px'
  });

  React.useEffect(() => {
    addSmoothClass();
  }, [addSmoothClass]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SmoothContentPlaceholder
            key={index}
            className="h-48 rounded-lg"
            minHeight="h-48"
          />
        ))}
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white">
      {/* Course Filter */}
      <CourseFilter 
        onFilterChange={setFilters}
        categories={categories}
      />
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 animate-fade-in">
            Explore Our Courses
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in delay-200 px-2 sm:px-4">
            Discover comprehensive courses designed to help you master new skills and advance your career
          </p>
          {filters.keyword || filters.category || filters.availability ? (
            <p className="text-xs sm:text-sm text-gray-500 mt-2 animate-fade-in delay-300">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
          ) : null}
        </div>

        <div 
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 animate-fade-in-up"
        >
          {visibleItems.map((course, index) => (
            <div
              key={course.id}
              className="animate-fade-in-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
            >
              Load More Courses
            </button>
          </div>
        )}
      </div>
    </section>
  );
});

CourseGrid.displayName = 'CourseGrid';

export default CourseGrid;
