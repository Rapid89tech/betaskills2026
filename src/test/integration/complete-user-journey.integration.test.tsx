import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { Courses } from '../../pages/Courses';
import { Course } from '../../pages/Course';
import { CourseGridEnrollmentButton } from '../../components/courses/CourseGridEnrollmentButton';
import { UnifiedEnrollmentValidator } from '../../services/UnifiedEnrollmentValidator';
import { EnhancedNavigationHandler } from '../../services/EnhancedNavigationHandler';
import { CourseContentValidator } from '../../services/CourseContentValidator';
import { supabase } from '../../integrations/supabase/client';

// Mock all services
vi.mock('../../services/UnifiedEnrollmentValidator');
vi.mock('../../services/EnhancedNavigationHandler');
vi.mock('../../services/CourseContentValidator');
vi.mock('../../integrations/supabase/client');

const mockNavigate = vi.fn();
let currentRoute = '/courses';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => {
      const match = currentRoute.match(/\/course\/(.+)/);
      return match ? { courseId: match[1] } : {};
    },
    useLocation: () => ({ pathname: currentRoute }),
  };
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

// Mock course data
const mockCourses = [
  {
    id: 'plumbing-101',
    title: 'Plumbing 101',
    description: 'Learn the basics of plumbing',
    modules: [
      {
        id: 'module-1',
        title: 'Introduction to Plumbing',
        lessons: [
          { id: 'lesson-1', title: 'Plumbing Industry and Careers', content: 'Content 1' },
          { id: 'lesson-2', title: 'History and Importance', content: 'Content 2' },
        ],
      },
      {
        id: 'module-2',
        title: 'Tools and Materials',
        lessons: [
          { id: 'lesson-3', title: 'Essential Hand Tools', content: 'Content 3' },
          { id: 'lesson-4', title: 'Power Tools', content: 'Content 4' },
        ],
      },
    ],
    lessons: [
      { id: 'lesson-1', title: 'Plumbing Industry and Careers', content: 'Content 1' },
      { id: 'lesson-2', title: 'History and Importance', content: 'Content 2' },
      { id: 'lesson-3', title: 'Essential Hand Tools', content: 'Content 3' },
      { id: 'lesson-4', title: 'Power Tools', content: 'Content 4' },
    ],
  },
  {
    id: 'computer-repairs',
    title: 'Computer Repairs',
    description: 'Learn computer repair techniques',
    modules: [
      {
        id: 'module-1',
        title: 'Hardware Basics',
        lessons: [
          { id: 'lesson-1', title: 'Computer Components', content: 'Hardware content' },
        ],
      },
    ],
    lessons: [
      { id: 'lesson-1', title: 'Computer Components', content: 'Hardware content' },
    ],
  },
];

describe('Complete User Journey Integration Tests', () => {
  let mockEnrollmentValidator: any;
  let mockNavigationHandler: any;
  let mockContentValidator: any;
  let user: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    currentRoute = '/courses';
    user = userEvent.setup();

    // Setup service mocks
    mockEnrollmentValidator = {
      validateEnrollment: vi.fn(),
      checkAllSources: vi.fn(),
      reconcileEnrollmentData: vi.fn(),
    };

    mockNavigationHandler = {
      navigateToCourse: vi.fn(),
      validateAccess: vi.fn(),
      handleNavigationError: vi.fn(),
    };

    mockContentValidator = {
      validateCourseData: vi.fn(),
      createFallbackCourse: vi.fn(),
    };

    (UnifiedEnrollmentValidator as any).mockImplementation(() => mockEnrollmentValidator);
    (EnhancedNavigationHandler as any).mockImplementation(() => mockNavigationHandler);
    (CourseContentValidator as any).mockImplementation(() => mockContentValidator);

    // Mock Supabase responses
    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          single: vi.fn().mockImplementation(({ courseId }) => {
            const course = mockCourses.find(c => c.id === courseId);
            return Promise.resolve({
              data: course || null,
              error: course ? null : { message: 'Course not found' },
            });
          }),
        }),
      }),
    } as any);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('New User Journey - From Course Discovery to Enrollment', () => {
    it('should complete full journey: browse courses → enroll → access content', async () => {
      // Step 1: User browses courses (not enrolled in any)
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'unenrolled',
        confidence: 'high',
      });

      // Mock courses list
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: mockCourses,
            error: null,
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <Courses />
        </TestWrapper>
      );

      // Verify courses are displayed
      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
        expect(screen.getByText('Computer Repairs')).toBeInTheDocument();
      });

      // Verify enrollment buttons are shown
      const enrollButtons = screen.getAllByText('Enroll Now');
      expect(enrollButtons).toHaveLength(2);

      // Step 2: User clicks enroll on Plumbing 101
      const plumbingEnrollButton = enrollButtons[0];
      await user.click(plumbingEnrollButton);

      // Mock successful enrollment
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [{ type: 'api', data: { enrolled: true } }],
      });

      // Step 3: After enrollment, button should change to Continue Course
      await waitFor(() => {
        expect(screen.getByText('Continue Course')).toBeInTheDocument();
      });

      // Step 4: User clicks Continue Course
      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: true,
        destination: '/course/plumbing-101',
      });

      mockNavigationHandler.validateAccess.mockResolvedValue({
        hasAccess: true,
        enrollmentStatus: 'enrolled',
        accessLevel: 'full',
      });

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      // Verify navigation was attempted
      expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledWith('plumbing-101');
      expect(mockNavigate).toHaveBeenCalledWith('/course/plumbing-101');
    });

    it('should handle enrollment failure gracefully', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'unenrolled',
        confidence: 'high',
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [mockCourses[0]],
            error: null,
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <Courses />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
      });

      const enrollButton = screen.getByText('Enroll Now');
      
      // Mock enrollment failure
      const mockOnEnroll = vi.fn().mockRejectedValue(new Error('Enrollment failed'));
      
      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourses[0]}
            isEnrolled={false}
            onEnroll={mockOnEnroll}
          />
        </TestWrapper>
      );

      await user.click(screen.getByText('Enroll Now'));

      // Should handle error gracefully
      await waitFor(() => {
        expect(mockOnEnroll).toHaveBeenCalled();
      });
    });
  });

  describe('Returning User Journey - Direct Course Access', () => {
    it('should allow enrolled user to directly access course content', async () => {
      // Setup: User is already enrolled
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [
          { type: 'localStorage', data: { enrolled: true } },
          { type: 'api', data: { enrolled: true } },
        ],
      });

      mockNavigationHandler.validateAccess.mockResolvedValue({
        hasAccess: true,
        enrollmentStatus: 'enrolled',
        accessLevel: 'full',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
      });

      // Simulate direct navigation to course page
      currentRoute = '/course/plumbing-101';

      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      // Should load course content directly
      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
      });

      // Should show course player, not enrollment form
      expect(screen.queryByText('Enroll Now')).not.toBeInTheDocument();
      
      // Should show lesson navigation
      await waitFor(() => {
        expect(screen.getByText('Introduction to Plumbing')).toBeInTheDocument();
        expect(screen.getByText('Plumbing Industry and Careers')).toBeInTheDocument();
      });
    });

    it('should handle returning user with expired enrollment', async () => {
      // Setup: User enrollment has expired
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'expired',
        confidence: 'high',
        sources: [
          { type: 'localStorage', data: { enrolled: true, expiredAt: '2024-01-01' } },
          { type: 'api', data: { enrolled: false, status: 'expired' } },
        ],
      });

      mockNavigationHandler.validateAccess.mockResolvedValue({
        hasAccess: false,
        enrollmentStatus: 'expired',
        accessLevel: 'none',
      });

      currentRoute = '/course/plumbing-101';

      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      // Should show re-enrollment option
      await waitFor(() => {
        expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      });

      // Should not show course content
      expect(screen.queryByText('Introduction to Plumbing')).not.toBeInTheDocument();
    });
  });

  describe('Multi-Course User Journey', () => {
    it('should handle user enrolled in multiple courses', async () => {
      // Setup: User enrolled in both courses
      mockEnrollmentValidator.validateEnrollment.mockImplementation((courseId) => {
        return Promise.resolve({
          isEnrolled: true,
          status: 'enrolled',
          confidence: 'high',
          sources: [{ type: 'api', data: { enrolled: true } }],
        });
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: mockCourses,
            error: null,
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <Courses />
        </TestWrapper>
      );

      // Should show Continue Course for all enrolled courses
      await waitFor(() => {
        const continueButtons = screen.getAllByText('Continue Course');
        expect(continueButtons).toHaveLength(2);
      });

      // Test navigation to first course
      mockNavigationHandler.navigateToCourse.mockResolvedValue({
        success: true,
        destination: '/course/plumbing-101',
      });

      const firstContinueButton = screen.getAllByText('Continue Course')[0];
      await user.click(firstContinueButton);

      expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledWith('plumbing-101');
    });

    it('should handle mixed enrollment states across courses', async () => {
      // Setup: User enrolled in first course, not in second
      mockEnrollmentValidator.validateEnrollment.mockImplementation((courseId) => {
        if (courseId === 'plumbing-101') {
          return Promise.resolve({
            isEnrolled: true,
            status: 'enrolled',
            confidence: 'high',
          });
        }
        return Promise.resolve({
          isEnrolled: false,
          status: 'unenrolled',
          confidence: 'high',
        });
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: mockCourses,
            error: null,
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <Courses />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Continue Course')).toBeInTheDocument();
        expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      });

      // Should show different buttons for different enrollment states
      const courseCards = screen.getAllByRole('article');
      expect(courseCards).toHaveLength(2);
    });
  });

  describe('Progressive Course Completion Journey', () => {
    it('should track progress through course lessons', async () => {
      // Setup: User enrolled and accessing course
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
      });

      currentRoute = '/course/plumbing-101';

      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Plumbing 101')).toBeInTheDocument();
      });

      // Should show first lesson by default
      expect(screen.getByText('Plumbing Industry and Careers')).toBeInTheDocument();

      // User navigates to second lesson
      const secondLesson = screen.getByText('History and Importance');
      await user.click(secondLesson);

      // Should update current lesson
      await waitFor(() => {
        expect(screen.getByText('History and Importance')).toHaveClass('active');
      });
    });

    it('should handle lesson navigation within modules', async () => {
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: true,
        hasModules: true,
        hasLessons: true,
        canProceed: true,
      });

      currentRoute = '/course/plumbing-101';

      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Introduction to Plumbing')).toBeInTheDocument();
        expect(screen.getByText('Tools and Materials')).toBeInTheDocument();
      });

      // Navigate between modules
      const toolsModule = screen.getByText('Tools and Materials');
      await user.click(toolsModule);

      // Should show lessons from second module
      await waitFor(() => {
        expect(screen.getByText('Essential Hand Tools')).toBeInTheDocument();
        expect(screen.getByText('Power Tools')).toBeInTheDocument();
      });
    });
  });

  describe('Error Recovery Journey', () => {
    it('should recover from temporary network issues during course access', async () => {
      let networkAttempts = 0;

      mockEnrollmentValidator.validateEnrollment.mockImplementation(() => {
        networkAttempts++;
        if (networkAttempts <= 2) {
          return Promise.reject(new Error('Network error'));
        }
        return Promise.resolve({
          isEnrolled: true,
          status: 'enrolled',
          confidence: 'high',
        });
      });

      mockNavigationHandler.navigateToCourse.mockImplementation(() => {
        if (networkAttempts <= 2) {
          return Promise.resolve({
            success: false,
            error: {
              type: 'network_error',
              message: 'Network connection failed',
              recoverable: true,
            },
          });
        }
        return Promise.resolve({
          success: true,
          destination: '/course/plumbing-101',
        });
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourses[0]}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      // Should eventually succeed after retries
      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledTimes(3);
      }, { timeout: 5000 });

      expect(mockNavigate).toHaveBeenCalledWith('/course/plumbing-101');
    });

    it('should provide clear error messages and recovery options', async () => {
      mockEnrollmentValidator.validateEnrollment.mockRejectedValue(
        new Error('Service temporarily unavailable')
      );

      mockNavigationHandler.handleNavigationError.mockReturnValue({
        message: 'Unable to access course. Please try again in a few moments.',
        actions: ['retry', 'refresh', 'contact_support'],
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourses[0]}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      await user.click(continueButton);

      await waitFor(() => {
        expect(mockNavigationHandler.handleNavigationError).toHaveBeenCalled();
      });
    });
  });

  describe('Cross-Device Consistency Journey', () => {
    it('should maintain enrollment state across different sessions', async () => {
      // Simulate enrollment on one device (localStorage available)
      const mockLocalStorage = {
        getItem: vi.fn().mockReturnValue(JSON.stringify({
          'plumbing-101': { enrolled: true, enrolledAt: new Date().toISOString() }
        })),
        setItem: vi.fn(),
        removeItem: vi.fn(),
      };

      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      });

      mockEnrollmentValidator.checkAllSources.mockResolvedValue([
        { type: 'localStorage', data: { enrolled: true }, reliability: 0.8 },
        { type: 'api', data: { enrolled: true }, reliability: 0.9 },
      ]);

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
        sources: [
          { type: 'localStorage', data: { enrolled: true } },
          { type: 'api', data: { enrolled: true } },
        ],
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourses[0]}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should show Continue Course based on consistent data
      expect(screen.getByText('Continue Course')).toBeInTheDocument();
    });

    it('should handle enrollment sync conflicts between devices', async () => {
      // Simulate conflict: localStorage says enrolled, API says not enrolled
      mockEnrollmentValidator.checkAllSources.mockResolvedValue([
        { type: 'localStorage', data: { enrolled: true }, reliability: 0.7 },
        { type: 'api', data: { enrolled: false }, reliability: 0.9 },
      ]);

      mockEnrollmentValidator.reconcileEnrollmentData.mockReturnValue({
        isEnrolled: false, // API wins due to higher reliability
        status: 'unenrolled',
        confidence: 'medium',
      });

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'unenrolled',
        confidence: 'medium',
        sources: [
          { type: 'localStorage', data: { enrolled: true } },
          { type: 'api', data: { enrolled: false } },
        ],
      });

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourses[0]}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should show Enroll Now based on API data (higher reliability)
      expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      expect(screen.queryByText('Continue Course')).not.toBeInTheDocument();
    });
  });
});