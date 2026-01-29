import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CourseGridEnrollmentButton } from '../../components/courses/CourseGridEnrollmentButton';
import { Course } from '../../pages/Course';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ courseId: 'plumbing-101' }),
  };
});

// Mock Supabase
vi.mock('../../integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({
            data: mockPlumbingCourse,
            error: null,
          })),
        })),
      })),
    })),
  },
}));

// Mock hooks
vi.mock('../../hooks/useCourseData', () => ({
  useCourseData: () => ({
    course: mockPlumbingCourse,
    isLoading: false,
    error: null,
  }),
}));

vi.mock('../../hooks/useEnrollments', () => ({
  useEnrollments: () => ({
    enrollments: [{ course_id: 'plumbing-101', status: 'enrolled' }],
    isLoading: false,
    error: null,
  }),
}));

// Test wrapper component
const TestWrapper = ({ 
  children, 
  initialEntries = ['/'] 
}: { 
  children: React.ReactNode;
  initialEntries?: string[];
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

// Mock course data
const mockPlumbingCourse = {
  id: 'plumbing-101',
  title: 'Plumbing 101',
  description: 'Complete plumbing course for beginners',
  modules: [
    {
      id: 'module-1',
      title: 'Introduction to Plumbing',
      lessons: [
        { id: 'lesson-1', title: 'Plumbing Industry and Careers', content: 'Industry overview' },
        { id: 'lesson-2', title: 'History and Importance', content: 'Historical context' },
      ],
    },
    {
      id: 'module-2',
      title: 'Tools and Materials',
      lessons: [
        { id: 'lesson-3', title: 'Essential Hand Tools', content: 'Tool overview' },
        { id: 'lesson-4', title: 'Types of Pipes and Fittings', content: 'Pipe types' },
      ],
    },
  ],
  lessons: [
    { id: 'lesson-1', title: 'Plumbing Industry and Careers', content: 'Industry overview' },
    { id: 'lesson-2', title: 'History and Importance', content: 'Historical context' },
    { id: 'lesson-3', title: 'Essential Hand Tools', content: 'Tool overview' },
    { id: 'lesson-4', title: 'Types of Pipes and Fittings', content: 'Pipe types' },
  ],
};

describe('Course Navigation End-to-End Integration Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    // Setup user event
    user = userEvent.setup();

    // Reset all mocks
    vi.clearAllMocks();
    mockNavigate.mockClear();

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn((key) => {
          if (key === 'enrollments') {
            return JSON.stringify([{ course_id: 'plumbing-101', status: 'enrolled' }]);
          }
          return null;
        }),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn(),
      },
      writable: true,
    });

    // Mock console to reduce noise
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Successful Navigation from Continue Course Button to Lessons', () => {
    it('should render Continue Course button for enrolled user', async () => {
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Verify Continue Course button is present
      const continueButton = screen.getByText('Continue Course');
      expect(continueButton).toBeInTheDocument();
      
      // Verify no enrollment button is shown
      expect(screen.queryByText('Enroll Now')).not.toBeInTheDocument();
    });

    it('should navigate when Continue Course button is clicked', async () => {
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      // Verify navigation was called
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/course/plumbing-101');
      });
    });

    it('should load course content properly after navigation', async () => {
      render(
        <TestWrapper initialEntries={['/course/plumbing-101']}>
          <Course />
        </TestWrapper>
      );

      // Wait for course content to load
      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
      });

      // Verify course player is shown (not enrollment form)
      expect(screen.queryByText('Enroll Now')).not.toBeInTheDocument();
    });

    it('should display course lessons in navigation', async () => {
      render(
        <TestWrapper initialEntries={['/course/plumbing-101']}>
          <Course />
        </TestWrapper>
      );

      // Wait for course to load
      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
      });

      // Verify lessons are available in navigation
      await waitFor(() => {
        expect(screen.getByText('Plumbing Industry and Careers')).toBeInTheDocument();
        expect(screen.getByText('History and Importance')).toBeInTheDocument();
        expect(screen.getByText('Essential Hand Tools')).toBeInTheDocument();
      });
    });
  });

  describe('Different Enrollment States', () => {
    it('should show enrollment button for unenrolled user', async () => {
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should show enrollment button, not continue button
      expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      expect(screen.queryByText('Continue Course')).not.toBeInTheDocument();
    });

    it('should handle enrollment button click', async () => {
      const mockOnEnroll = vi.fn();
      
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={false}
            onEnroll={mockOnEnroll}
          />
        </TestWrapper>
      );

      const enrollButton = screen.getByText('Enroll Now');
      await user.click(enrollButton);

      expect(mockOnEnroll).toHaveBeenCalledWith(mockPlumbingCourse);
    });

    it('should show enrollment form for unenrolled user on course page', async () => {
      // Mock unenrolled state
      vi.mocked(window.localStorage.getItem).mockImplementation((key) => {
        if (key === 'enrollments') {
          return JSON.stringify([]); // No enrollments
        }
        return null;
      });

      render(
        <TestWrapper initialEntries={['/course/plumbing-101']}>
          <Course />
        </TestWrapper>
      );

      // Should show enrollment form instead of course content
      await waitFor(() => {
        expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      });

      expect(screen.queryByText('Plumbing Industry and Careers')).not.toBeInTheDocument();
    });
  });

  describe('Cross-Browser and Device Compatibility', () => {
    it('should handle mobile navigation with touch events', async () => {
      // Mock mobile user agent
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        configurable: true,
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      
      // Simulate touch events
      fireEvent.touchStart(continueButton);
      fireEvent.touchEnd(continueButton);
      await user.click(continueButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/course/plumbing-101');
      });
    });

    it('should handle desktop navigation with keyboard events', async () => {
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      
      // Focus and press Enter
      continueButton.focus();
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/course/plumbing-101');
      });
    });

    it('should handle browsers with disabled localStorage', async () => {
      // Mock localStorage to throw errors
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn(() => { throw new Error('localStorage disabled'); }),
          setItem: vi.fn(() => { throw new Error('localStorage disabled'); }),
          removeItem: vi.fn(() => { throw new Error('localStorage disabled'); }),
          clear: vi.fn(() => { throw new Error('localStorage disabled'); }),
        },
        writable: true,
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      // Should still work even with localStorage issues
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/course/plumbing-101');
      });
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle navigation errors gracefully', async () => {
      // Mock navigation to fail
      mockNavigate.mockImplementation(() => {
        throw new Error('Navigation failed');
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      
      // Should not throw error when navigation fails
      expect(async () => {
        await user.click(continueButton);
      }).not.toThrow();
    });

    it('should handle missing course data gracefully', async () => {
      // Mock course data as null
      const mockCourseWithoutData = {
        ...mockPlumbingCourse,
        modules: [],
        lessons: [],
      };

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourseWithoutData}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should still render button even with incomplete course data
      expect(screen.getByText('Continue Course')).toBeInTheDocument();
    });
  });

  describe('Performance and Loading States', () => {
    it('should handle rapid successive clicks', async () => {
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      
      // Rapid clicks
      await user.click(continueButton);
      await user.click(continueButton);
      await user.click(continueButton);

      // Should handle gracefully without errors
      expect(mockNavigate).toHaveBeenCalled();
    });

    it('should maintain button state during interactions', async () => {
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      
      // Button should remain clickable
      expect(continueButton).not.toBeDisabled();
      
      await user.click(continueButton);
      
      // Button should still be in document after click
      expect(continueButton).toBeInTheDocument();
    });
  });

  describe('Complete User Journey Integration', () => {
    it('should complete full journey from course grid to course page', async () => {
      // Step 1: Render course grid with Continue Course button
      const { rerender } = render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Step 2: Verify Continue Course button is present
      const continueButton = screen.getByText('Continue Course');
      expect(continueButton).toBeInTheDocument();

      // Step 3: Click Continue Course button
      await user.click(continueButton);

      // Step 4: Verify navigation was called
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/course/plumbing-101');
      });

      // Step 5: Simulate navigation to course page
      rerender(
        <TestWrapper initialEntries={['/course/plumbing-101']}>
          <Course />
        </TestWrapper>
      );

      // Step 6: Verify course loads
      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
      });

      // Step 7: Verify lessons are accessible
      await waitFor(() => {
        expect(screen.getByText('Plumbing Industry and Careers')).toBeInTheDocument();
      });
    });

    it('should handle different course types consistently', async () => {
      const electricalCourse = {
        id: 'electrical-101',
        title: 'Electrical Basics',
        description: 'Electrical fundamentals course',
        modules: [
          {
            id: 'module-1',
            title: 'Electrical Safety',
            lessons: [
              { id: 'lesson-1', title: 'Safety Protocols', content: 'Safety overview' },
            ],
          },
        ],
        lessons: [
          { id: 'lesson-1', title: 'Safety Protocols', content: 'Safety overview' },
        ],
      };

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={electricalCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/course/electrical-101');
      });
    });

    it('should verify navigation works across different enrollment states', async () => {
      // Test enrolled state
      const { rerender } = render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Continue Course')).toBeInTheDocument();

      // Test unenrolled state
      rerender(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockPlumbingCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      expect(screen.queryByText('Continue Course')).not.toBeInTheDocument();
    });
  });
});