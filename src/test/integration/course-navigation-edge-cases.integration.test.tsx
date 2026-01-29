import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Course } from '../../pages/Course';
import { CourseGridEnrollmentButton } from '../../components/courses/CourseGridEnrollmentButton';
import { UnifiedEnrollmentValidator } from '../../services/UnifiedEnrollmentValidator';
import { EnhancedNavigationHandler } from '../../services/EnhancedNavigationHandler';
import { CourseContentValidator } from '../../services/CourseContentValidator';
import { supabase } from '../../integrations/supabase/client';

// Mock services
vi.mock('../../services/UnifiedEnrollmentValidator');
vi.mock('../../services/EnhancedNavigationHandler');
vi.mock('../../services/CourseContentValidator');
vi.mock('../../integrations/supabase/client');

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ courseId: 'edge-case-course' }),
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

describe('Course Navigation Edge Cases Integration Tests', () => {
  let mockEnrollmentValidator: any;
  let mockNavigationHandler: any;
  let mockContentValidator: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();

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
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Enrollment Data Corruption Scenarios', () => {
    it('should handle corrupted localStorage enrollment data', async () => {
      // Setup corrupted localStorage data
      const mockGetItem = vi.fn().mockImplementation((key) => {
        if (key === 'enrollments') {
          return 'invalid-json-data{';
        }
        return null;
      });

      Object.defineProperty(window, 'localStorage', {
        value: { getItem: mockGetItem, setItem: vi.fn(), removeItem: vi.fn() },
        writable: true,
      });

      mockEnrollmentValidator.checkAllSources.mockResolvedValue([
        { 
          type: 'localStorage', 
          data: null, // Corrupted data returns null
          reliability: 0.0,
          error: 'JSON parse error'
        },
        { 
          type: 'api', 
          data: { enrolled: true }, 
          reliability: 0.9 
        },
      ]);

      mockEnrollmentValidator.reconcileEnrollmentData.mockReturnValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'medium', // Lower confidence due to corrupted local data
      });

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'medium',
        sources: [
          { type: 'localStorage', data: null, error: 'JSON parse error' },
          { type: 'api', data: { enrolled: true } },
        ],
      });

      const mockCourse = {
        id: 'edge-case-course',
        title: 'Edge Case Course',
        modules: [],
        lessons: [],
      };

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should still show Continue Course button based on API data
      expect(screen.getByText('Continue Course')).toBeInTheDocument();

      // Verify that corrupted localStorage was handled gracefully
      expect(mockEnrollmentValidator.checkAllSources).toHaveBeenCalled();
    });

    it('should handle missing enrollment data across all sources', async () => {
      mockEnrollmentValidator.checkAllSources.mockResolvedValue([]);
      
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: false,
        status: 'unenrolled',
        confidence: 'high',
        sources: [],
      });

      const mockCourse = {
        id: 'edge-case-course',
        title: 'Edge Case Course',
        modules: [],
        lessons: [],
      };

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: mockCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Enroll Now')).toBeInTheDocument();
      });

      // Should default to showing enrollment form when no data is found
      expect(screen.queryByText('Continue Course')).not.toBeInTheDocument();
    });
  });

  describe('Course Data Edge Cases', () => {
    it('should handle course with empty modules but valid lessons', async () => {
      const courseWithOrphanedLessons = {
        id: 'edge-case-course',
        title: 'Course with Orphaned Lessons',
        modules: [], // No modules
        lessons: [
          { id: 'lesson-1', title: 'Orphaned Lesson 1', content: 'Content' },
          { id: 'lesson-2', title: 'Orphaned Lesson 2', content: 'Content' },
        ],
      };

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: false,
        hasModules: false,
        hasLessons: true,
        canProceed: true, // Can still proceed with lessons
        missingData: ['modules'],
      });

      // Content validator creates a default module for orphaned lessons
      mockContentValidator.createFallbackCourse.mockReturnValue({
        ...courseWithOrphanedLessons,
        modules: [
          {
            id: 'default-module',
            title: 'Course Content',
            lessons: courseWithOrphanedLessons.lessons,
          },
        ],
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: courseWithOrphanedLessons,
              error: null,
            }),
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Course Content')).toBeInTheDocument();
      });

      // Should show lessons under the default module
      expect(screen.getByText('Orphaned Lesson 1')).toBeInTheDocument();
      expect(screen.getByText('Orphaned Lesson 2')).toBeInTheDocument();
    });

    it('should handle course with modules but no lessons', async () => {
      const courseWithEmptyModules = {
        id: 'edge-case-course',
        title: 'Course with Empty Modules',
        modules: [
          { id: 'module-1', title: 'Empty Module 1', lessons: [] },
          { id: 'module-2', title: 'Empty Module 2', lessons: [] },
        ],
        lessons: [],
      };

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: false,
        hasModules: true,
        hasLessons: false,
        canProceed: false,
        missingData: ['lessons'],
      });

      mockContentValidator.createFallbackCourse.mockReturnValue({
        ...courseWithEmptyModules,
        modules: [
          {
            id: 'placeholder-module',
            title: 'Content Coming Soon',
            lessons: [
              {
                id: 'placeholder-lesson',
                title: 'This course is being prepared',
                content: 'Course content will be available soon.',
              },
            ],
          },
        ],
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: courseWithEmptyModules,
              error: null,
            }),
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Content Coming Soon')).toBeInTheDocument();
      });

      expect(screen.getByText('This course is being prepared')).toBeInTheDocument();
    });

    it('should handle malformed course data structure', async () => {
      const malformedCourse = {
        id: 'edge-case-course',
        title: 'Malformed Course',
        // Missing modules and lessons properties
        someOtherProperty: 'unexpected data',
      };

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockContentValidator.validateCourseData.mockReturnValue({
        isValid: false,
        hasModules: false,
        hasLessons: false,
        canProceed: false,
        missingData: ['modules', 'lessons'],
      });

      mockContentValidator.createFallbackCourse.mockReturnValue({
        id: 'edge-case-course',
        title: 'Malformed Course',
        modules: [
          {
            id: 'error-module',
            title: 'Course Error',
            lessons: [
              {
                id: 'error-lesson',
                title: 'Course data is incomplete',
                content: 'Please contact support for assistance.',
              },
            ],
          },
        ],
        lessons: [],
      });

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          eq: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: malformedCourse,
              error: null,
            }),
          }),
        }),
      } as any);

      render(
        <TestWrapper>
          <Course />
        </TestWrapper>
      );

      await waitFor(() => {
        expect(screen.getByText('Course Error')).toBeInTheDocument();
      });

      expect(screen.getByText('Course data is incomplete')).toBeInTheDocument();
    });
  });

  describe('Network and API Edge Cases', () => {
    it('should handle intermittent network connectivity', async () => {
      let networkCallCount = 0;
      
      mockEnrollmentValidator.validateEnrollment.mockImplementation(() => {
        networkCallCount++;
        if (networkCallCount <= 2) {
          return Promise.reject(new Error('Network error'));
        }
        return Promise.resolve({
          isEnrolled: true,
          status: 'enrolled',
          confidence: 'high',
        });
      });

      mockNavigationHandler.navigateToCourse.mockImplementation(() => {
        if (networkCallCount <= 2) {
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
          destination: '/course/edge-case-course',
        });
      });

      const mockCourse = {
        id: 'edge-case-course',
        title: 'Network Test Course',
        modules: [],
        lessons: [],
      };

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      fireEvent.click(continueButton);

      // Should eventually succeed after retries
      await waitFor(() => {
        expect(mockNavigationHandler.navigateToCourse).toHaveBeenCalledTimes(3);
      }, { timeout: 5000 });
    });

    it('should handle API rate limiting', async () => {
      mockEnrollmentValidator.validateEnrollment.mockRejectedValue({
        status: 429,
        message: 'Rate limit exceeded',
      });

      mockNavigationHandler.handleNavigationError.mockReturnValue({
        message: 'Too many requests. Please wait a moment and try again.',
        retryAfter: 5000,
      });

      const mockCourse = {
        id: 'edge-case-course',
        title: 'Rate Limited Course',
        modules: [],
        lessons: [],
      };

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={false}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const enrollButton = screen.getByText('Enroll Now');
      fireEvent.click(enrollButton);

      await waitFor(() => {
        expect(mockNavigationHandler.handleNavigationError).toHaveBeenCalled();
      });
    });
  });

  describe('Concurrent User Actions', () => {
    it('should handle rapid successive navigation attempts', async () => {
      let navigationCount = 0;
      
      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      mockNavigationHandler.navigateToCourse.mockImplementation(() => {
        navigationCount++;
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              destination: '/course/edge-case-course',
            });
          }, 100);
        });
      });

      const mockCourse = {
        id: 'edge-case-course',
        title: 'Rapid Click Course',
        modules: [],
        lessons: [],
      };

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      const continueButton = screen.getByText('Continue Course');
      
      // Simulate rapid clicking
      fireEvent.click(continueButton);
      fireEvent.click(continueButton);
      fireEvent.click(continueButton);

      await waitFor(() => {
        // Should only navigate once despite multiple clicks
        expect(navigationCount).toBe(1);
      });
    });

    it('should handle navigation during enrollment status change', async () => {
      let enrollmentStatus = false;
      
      mockEnrollmentValidator.validateEnrollment.mockImplementation(() => {
        return Promise.resolve({
          isEnrolled: enrollmentStatus,
          status: enrollmentStatus ? 'enrolled' : 'unenrolled',
          confidence: 'high',
        });
      });

      const mockCourse = {
        id: 'edge-case-course',
        title: 'Status Change Course',
        modules: [],
        lessons: [],
      };

      const { rerender } = render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={enrollmentStatus}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Initially shows Enroll Now
      expect(screen.getByText('Enroll Now')).toBeInTheDocument();

      // Simulate enrollment status change
      enrollmentStatus = true;
      
      rerender(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={enrollmentStatus}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should now show Continue Course
      await waitFor(() => {
        expect(screen.getByText('Continue Course')).toBeInTheDocument();
      });

      expect(screen.queryByText('Enroll Now')).not.toBeInTheDocument();
    });
  });

  describe('Browser Compatibility Edge Cases', () => {
    it('should handle browsers with disabled localStorage', async () => {
      // Mock localStorage that throws errors
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn().mockImplementation(() => {
            throw new Error('localStorage is disabled');
          }),
          setItem: vi.fn().mockImplementation(() => {
            throw new Error('localStorage is disabled');
          }),
        },
        writable: true,
      });

      mockEnrollmentValidator.checkAllSources.mockResolvedValue([
        { 
          type: 'localStorage', 
          data: null, 
          reliability: 0.0,
          error: 'localStorage is disabled'
        },
        { 
          type: 'api', 
          data: { enrolled: true }, 
          reliability: 0.9 
        },
      ]);

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'medium',
        sources: [
          { type: 'api', data: { enrolled: true } },
        ],
      });

      const mockCourse = {
        id: 'edge-case-course',
        title: 'No LocalStorage Course',
        modules: [],
        lessons: [],
      };

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      // Should still work using API data only
      expect(screen.getByText('Continue Course')).toBeInTheDocument();
    });

    it('should handle browsers with limited JavaScript support', async () => {
      // Mock limited Promise support
      const originalPromise = global.Promise;
      
      // Simulate older browser with basic Promise support
      global.Promise = class LimitedPromise extends Promise<any> {
        static allSettled = undefined; // Not available in older browsers
      } as any;

      mockEnrollmentValidator.validateEnrollment.mockResolvedValue({
        isEnrolled: true,
        status: 'enrolled',
        confidence: 'high',
      });

      const mockCourse = {
        id: 'edge-case-course',
        title: 'Limited JS Course',
        modules: [],
        lessons: [],
      };

      render(
        <TestWrapper>
          <CourseGridEnrollmentButton
            course={mockCourse}
            isEnrolled={true}
            onEnroll={vi.fn()}
          />
        </TestWrapper>
      );

      expect(screen.getByText('Continue Course')).toBeInTheDocument();

      // Restore original Promise
      global.Promise = originalPromise;
    });
  });
});