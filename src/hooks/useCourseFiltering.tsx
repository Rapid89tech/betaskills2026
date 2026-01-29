
import { useState, useMemo } from 'react';
import { Course } from '@/hooks/useCourses';

interface FilterState {
  search: string;
  category: string;
  level: string;
  priceRange: string;
}

export const useCourseFiltering = (courses: Course[]) => {
  const [searchFilters, setSearchFilters] = useState<FilterState>({
    search: '',
    category: '',
    level: '',
    priceRange: ''
  });

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = !searchFilters.search || 
        course.title.toLowerCase().includes(searchFilters.search.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchFilters.search.toLowerCase());
      
      let matchesCategory = true;
      if (searchFilters.category === 'Information Communication and Technology') {
        const ictTitles = [
          'AI and Human Relations',
          'Sound Engineering',
          'Mastering Podcast Management',
          'Computer & Laptop Repairs',
          'Cellphone Repairs and Maintenance',
          'AI-Assisted Web Development',
        ];
        matchesCategory = ictTitles.includes(course.title);
      } else if (searchFilters.category === 'Technology') {
        const technologyTitles = [
          'AI-Assisted Web Development',
          'Computer Repairs',
          'Cellphone Repairs and Maintenance',
        ];
        matchesCategory = technologyTitles.includes(course.title);
      } else if (searchFilters.category === 'Religion') {
        const religionTitles = [
          'Christian Teacher Training Course: Teaching with Truth, Grace & Power',
        ];
        matchesCategory = religionTitles.includes(course.title);
      } else if (searchFilters.category) {
        matchesCategory = course.category === searchFilters.category;
      }
      const matchesLevel = !searchFilters.level || course.level === searchFilters.level;
      
      let matchesPrice = true;
      if (searchFilters.priceRange) {
        if (searchFilters.priceRange === 'free') {
          matchesPrice = course.is_free;
        } else if (searchFilters.priceRange === 'paid') {
          matchesPrice = !course.is_free;
        }
      }

      // Show courses that are approved OR don't have a status (job-ready courses)
      const isVisible = !course.status || course.status === 'approved';

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice && isVisible;
    });
  }, [courses, searchFilters]);

  const handleClearFilters = () => {
    setSearchFilters({ search: '', category: '', level: '', priceRange: '' });
  };

  return {
    searchFilters,
    setSearchFilters,
    filteredCourses,
    handleClearFilters
  };
};
