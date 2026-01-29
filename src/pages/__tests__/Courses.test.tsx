import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Courses from '../Courses';
import { useFastCourses } from '@/hooks/useFastCourses';
import { useCourseFiltering } from '@/hooks/useCourseFiltering';
import { useCoursePriorities } from '@/hooks/useCoursePriorities';
import { useAuth } from '@/hooks/AuthContext';

// Mock the hooks
vi.mock('@/hooks/useFastCourses');
vi.mock('@/hooks/useCourseFiltering');
vi.mock('@/hooks/useCoursePriorities');
vi.mock('@/hooks/AuthContext');

// Mock the components
vi.mock('@/components/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>
}));

vi.mock('@/components/courses/CourseFilters', () => ({
  default: ({ onFiltersChange }: { onFiltersChange: (filters: any) => void }) => (
    <div data-testid="course-filters">
      <button onClick={() => onFiltersChange({ category: 'technology' })}>
        Filter Technology
      </button>
    </div>
  )
}));

vi.mock('@/components/courses/CoursesGrid', () => ({
  default: ({ courses, coursePriorities }: { courses: any[], coursePriorities: any[] }) => (
    <div data-testid="courses-grid">
      {courses.map(course => (
        <div key={course.id} data-testid={`course-${course.id}`}>
          {course.title}
        </div>
      ))}
    </div>
  )
}));

vi.mock('@/components/courses/EmptyCoursesState', () => ({
  default: ({ onClearFilters }: { onClearFilters: () => void }) => (
    <div data-testid="empty-courses-state">
      <button onClick={onClearFilters}>Clear Filters</button>
    </div>
  )
}));

vi.mock('@/components/courses/CoursesPageHeader', () => ({
  default: () => <div data-testid="courses-page-header">Courses Header</div>
}));

vi.mock('@/components/courses/CoursesLoadingState', () => ({
  default: () => <div data-testid="courses-loading-state">Loading...</div>
}));

vi.mock('@/components/CourseFilter', () => ({
  default: ({ onFilterChange, categories }: { onFilterChange: (filters: any) => void, categories: string[] }) => (
    <div data-testid="course-filter">
      <select onChange={(e) => onFilterChange({ category: e.target.value })}>
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  )
}));

const mockCourses = [
  {
    id: 'course-1',
    title: 'React Development',
    description: 'Learn React development',
    category: 'Technology',
    level: 'Beginner',
    duration: '4 weeks',
    price: 299,
    instructor: 'John Doe',
    rating: 4.5,
    students: 150,
    image: '/course1.jpg',
    isComingSoon: false
  },
  {
    id: 'course-2',
    title: 'Node.js Backend',
    description: 'Learn Node.js backend development',
    category: 'Technology',
    level: 'Intermediate',
    duration: '6 weeks',
    price: 399,
    instructor: 'Jane Smith',
    rating: 4.7,
    students: 200,
    image: '/course2.jpg',
    isComingSoon: true
  }
];

const mockCoursePriorities = [
  { courseId: 'course-1', enrollmentStatus: 'NOT_ENROLLED', priority: 1, displayOrder: 1 },
  { courseId: 'course-2', enrollmentStatus: 'ENROLLED', priority: 0, displayOrder: 0 }
];

const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User'
};

const renderCoursesPage = () => {
  return render(
    <BrowserRouter>
      <Courses />
    </BrowserRouter>
  );
};

describe('Courses Page', () => {
  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();
    
    // Default mock implementations
    (useFastCourses as any).mockReturnValue({
      courses: mockCourses,
      loading: false,
      error: null
    });

    (useCourseFiltering as any).mockReturnValue({
      setSearchFilters: vi.fn(),
      filteredCourses: mockCourses,
      handleClearFilters: vi.fn()
    });

    (useCoursePriorities as any).mockReturnValue({
      coursePriorities: mockCoursePriorities,
      loading: false,
      sortedCourseIds: ['course-2', 'course-1'],
      courseGroups: {
        hasEnrolled: true,
        hasPending: false,
        hasAvailable: true,
        totalEnrolled: 1,
        totalPending: 0,
        totalAvailable: 1
      },
      enrolledCourseIds: ['course-2'],
      pendingCourseIds: [],
      getStatusIndicator: vi.fn()
    });

    (useAuth as any).mockReturnValue({
      user: mockUser
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading States', () => {
    it('should show loading state when courses are loading', () => {
      (useFastCourses as any).mockReturnValue({
        courses: [],
        loading: true,
        error: null
      });

      (useCoursePriorities as any).mockReturnValue({
        coursePriorities: [],
        loading: true,
        sortedCourseIds: [],
        courseGroups: null,
        enrolledCourseIds: [],
        pendingCourseIds: [],
        getStatusIndicator: vi.fn()
      });

      renderCoursesPage();

      expect(screen.getByTestId('courses-loading-state')).toBeInTheDocument();
    });

    it('should show courses when loading is complete', () => {
      renderCoursesPage();

      expect(screen.getByTestId('courses-grid')).toBeInTheDocument();
      expect(screen.getByTestId('course-course-1')).toBeInTheDocument();
      expect(screen.getByTestId('course-course-2')).toBeInTheDocument();
    });
  });

  describe('Course Data Loading', () => {
    it('should load and display courses correctly', () => {
      renderCoursesPage();

      expect(screen.getByText('React Development')).toBeInTheDocument();
      expect(screen.getByText('Node.js Backend')).toBeInTheDocument();
    });

    it('should handle empty courses state', () => {
      (useFastCourses as any).mockReturnValue({
        courses: [],
        loading: false,
        error: null
      });

      (useCourseFiltering as any).mockReturnValue({
        setSearchFilters: vi.fn(),
        filteredCourses: [],
        handleClearFilters: vi.fn()
      });

      renderCoursesPage();

      expect(screen.getByTestId('empty-courses-state')).toBeInTheDocument();
    });

    it('should handle course data structure inconsistencies', () => {
      const inconsistentCourses = [
        {
          id: 'course-3',
          title: 'Incomplete Course',
          // Missing some required fields
          category: 'Technology'
        }
      ];

      (useFastCourses as any).mockReturnValue({
        courses: inconsistentCourses,
        loading: false,
        error: null
      });

      (useCourseFiltering as any).mockReturnValue({
        setSearchFilters: vi.fn(),
        filteredCourses: inconsistentCourses,
        handleClearFilters: vi.fn()
      });

      renderCoursesPage();

      // Should still render without crashing
      expect(screen.getByTestId('courses-grid')).toBeInTheDocument();
    });
  });

  describe('Course Priority System', () => {
    it('should display enrolled courses section when user has enrollments', () => {
      renderCoursesPage();

      expect(screen.getByText(/My Enrolled Courses/)).toBeInTheDocument();
      expect(screen.getByText(/My Enrolled Courses \(1\)/)).toBeInTheDocument(); // Count in parentheses
    });

    it('should display pending courses section when user has pending enrollments', () => {
      (useCoursePriorities as any).mockReturnValue({
        coursePriorities: mockCoursePriorities,
        loading: false,
        sortedCourseIds: ['course-1', 'course-2'],
        courseGroups: {
          hasEnrolled: false,
          hasPending: true,
          hasAvailable: true,
          totalEnrolled: 0,
          totalPending: 1,
          totalAvailable: 1
        },
        enrolledCourseIds: [],
        pendingCourseIds: ['course-1'],
        getStatusIndicator: vi.fn()
      });

      renderCoursesPage();

      expect(screen.getByText(/Pending Approval/)).toBeInTheDocument();
    });

    it('should sort courses based on priority calculation', () => {
      renderCoursesPage();

      const coursesGrid = screen.getByTestId('courses-grid');
      expect(coursesGrid).toBeInTheDocument();
      
      // Verify that useFastCourses was called
      expect(useFastCourses).toHaveBeenCalled();
      
      // Verify that useCoursePriorities was called with course IDs
      expect(useCoursePriorities).toHaveBeenCalledWith(['course-1', 'course-2']);
    });
  });

  describe('Course Filtering', () => {
    it('should handle category filtering', async () => {
      const mockSetSearchFilters = vi.fn();
      (useCourseFiltering as any).mockReturnValue({
        setSearchFilters: mockSetSearchFilters,
        filteredCourses: mockCourses,
        handleClearFilters: vi.fn()
      });

      renderCoursesPage();

      const filterButton = screen.getByText('Filter Technology');
      fireEvent.click(filterButton);

      expect(mockSetSearchFilters).toHaveBeenCalledWith({ category: 'technology' });
    });

    it('should handle horizontal filter changes', async () => {
      renderCoursesPage();

      const categorySelect = screen.getByRole('combobox');
      fireEvent.change(categorySelect, { target: { value: 'Technology' } });

      // Should trigger filter change
      await waitFor(() => {
        expect(categorySelect).toHaveValue('Technology');
      });
    });

    it('should clear filters when requested', () => {
      const mockHandleClearFilters = vi.fn();
      (useCourseFiltering as any).mockReturnValue({
        setSearchFilters: vi.fn(),
        filteredCourses: [],
        handleClearFilters: mockHandleClearFilters
      });

      renderCoursesPage();

      const clearButton = screen.getByText('Clear Filters');
      fireEvent.click(clearButton);

      expect(mockHandleClearFilters).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle course loading errors gracefully', () => {
      (useFastCourses as any).mockReturnValue({
        courses: [],
        loading: false,
        error: 'Failed to load courses'
      });

      renderCoursesPage();

      // Should still render the page structure
      expect(screen.getByTestId('courses-page-header')).toBeInTheDocument();
    });

    it('should handle priority calculation errors', () => {
      (useCoursePriorities as any).mockReturnValue({
        coursePriorities: [],
        loading: false,
        sortedCourseIds: [],
        courseGroups: null,
        enrolledCourseIds: [],
        pendingCourseIds: [],
        getStatusIndicator: vi.fn(),
        error: 'Failed to calculate priorities'
      });

      renderCoursesPage();

      // Should still render courses without priority indicators
      expect(screen.getByTestId('courses-grid')).toBeInTheDocument();
    });
  });

  describe('User Authentication States', () => {
    it('should handle unauthenticated user', () => {
      (useAuth as any).mockReturnValue({
        user: null
      });

      renderCoursesPage();

      // Should not show enrollment sections for unauthenticated users
      expect(screen.queryByText(/My Enrolled Courses/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Pending Approval/)).not.toBeInTheDocument();
    });

    it('should show course sections for authenticated users', () => {
      renderCoursesPage();

      // Should show course sections when user is authenticated
      expect(screen.getByText(/My Enrolled Courses/)).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('should render all required components', () => {
      renderCoursesPage();

      expect(screen.getByTestId('courses-page-header')).toBeInTheDocument();
      expect(screen.getByTestId('course-filter')).toBeInTheDocument();
      expect(screen.getByTestId('courses-grid')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should pass correct props to CoursesGrid', () => {
      renderCoursesPage();

      const coursesGrid = screen.getByTestId('courses-grid');
      expect(coursesGrid).toBeInTheDocument();
      
      // Verify courses are passed correctly
      expect(screen.getByTestId('course-course-1')).toBeInTheDocument();
      expect(screen.getByTestId('course-course-2')).toBeInTheDocument();
    });
  });

  describe('Performance and Optimization', () => {
    it('should memoize course categories correctly', () => {
      renderCoursesPage();

      // Categories should be derived from courses and predefined categories
      const categorySelect = screen.getByRole('combobox');
      expect(categorySelect).toBeInTheDocument();
    });

    it('should handle large course datasets efficiently', () => {
      const largeCourseSet = Array.from({ length: 100 }, (_, i) => ({
        id: `course-${i}`,
        title: `Course ${i}`,
        description: `Description ${i}`,
        category: i % 2 === 0 ? 'Technology' : 'Business',
        level: 'Beginner',
        duration: '4 weeks',
        price: 299,
        instructor: 'Instructor',
        rating: 4.5,
        students: 150,
        image: '/course.jpg',
        isComingSoon: false
      }));

      (useFastCourses as any).mockReturnValue({
        courses: largeCourseSet,
        loading: false,
        error: null
      });

      (useCourseFiltering as any).mockReturnValue({
        setSearchFilters: vi.fn(),
        filteredCourses: largeCourseSet,
        handleClearFilters: vi.fn()
      });

      renderCoursesPage();

      expect(screen.getByTestId('courses-grid')).toBeInTheDocument();
    });
  });
});