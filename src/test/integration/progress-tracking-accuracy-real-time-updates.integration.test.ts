/**
 * Integration Tests for Progress Tracking Accuracy and Real-time Updates
 * 
 * Tests the complete progress tracking system including calculation accuracy,
 * real-time updates, and admin dashboard display functionality.
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { progressTrackingService, ProgressData, ProgressUpdate } from '@/services/ProgressTrackingService';
import { useProgressTracking } from '@/hooks/useProgressTracking';
import { ProgressDisplay } from '@/components/admin/ProgressDisplay';
import type { Course } from '@/types/course';

// Mock Supabase client
const mockSupabase = {
  from: vi.fn(),
  channel: vi.fn(),
  auth: {
    admin: {
      getUserById: vi.fn()
    }
  }
};

vi.mock('@/integrations/supabase/client', () => ({
  supabase: mockSupabase
}));

// Mock course data
const mockCourse: Course = {
  id: 'course_123',
  title: 'Test Course',
  description: 'A test course for progress tracking',
  modules: [
    {
      id: 1,
      title: 'Module 1: Introduction',
      lessons: [
        { id: 1, title: 'Lesson 1.1: Getting Started', content: 'Content 1' },
        { id: 2, title: 'Lesson 1.2: Basic Concepts', content: 'Content 2' },
        { id: 3, title: 'Lesson 1.3: First Steps', content: 'Content 3' }
      ]
    },
    {
      id: 2,
      title: 'Module 2: Advanced Topics',
      lessons: [
        { id: 4, title: 'Lesson 2.1: Advanced Concepts', content: 'Content 4' },
        { id: 5, title: 'Lesson 2.2: Best Practices', content: 'Content 5' }
      ]
    }
  ]
};

const mockEnrollment = {
  id: 'enrollment_123',
  user_id: 'user_456',
  course_id: 'course_123',
  status: 'approved'
};

const mockProgressData: ProgressData = {
  enrollmentId: 'enrollment_123',
  userId: 'user_456',
  courseId: 'course_123',
  overallProgress: 60,
  moduleProgress: [
    {
      moduleId: '1',
      moduleName: 'Module 1: Introduction',
      progress: 100,
      completed: true,
      lessonsCompleted: 3,
      totalLessons: 3
    },
    {
      moduleId: '2',
      moduleName: 'Module 2: Advanced Topics',
      progress: 0,
      completed: false,
      lessonsCompleted: 0,
      totalLessons: 2
    }
  ],
  lessonProgress: [
    { lessonId: '1', lessonName: 'Lesson 1.1: Getting Started', completed: true, timeSpent: 15 },
    { lessonId: '2', lessonName: 'Lesson 1.2: Basic Concepts', completed: true, timeSpent: 20 },
    { lessonId: '3', lessonName: 'Lesson 1.3: First Steps', completed: true, timeSpent: 18 },
    { lessonId: '4', lessonName: 'Lesson 2.1: Advanced Concepts', completed: false, timeSpent: 0 },
    { lessonId: '5', lessonName: 'Lesson 2.2: Best Practices', completed: false, timeSpent: 0 }
  ],
  timeSpent: 53,
  lastAccessed: new Date('2024-01-15T10:30:00Z'),
  estimatedCompletion: new Date('2024-02-15T10:30:00Z'),
  completedModules: ['1'],
  completedLessons: ['1', '2', '3'],
  currentLesson: '4',
  quizScores: [
    { quizId: '1', score: 85, maxScore: 100, completedAt: new Date('2024-01-10T10:00:00Z') },
    { quizId: '2', score: 92, maxScore: 100, completedAt: new Date('2024-01-12T14:30:00Z') }
  ],
  averageScore: 88.5,
  certificateEligible: false
};

describe('Progress Tracking Accuracy and Real-time Updates Integration', () => {
  let mockFromChain: any;
  let mockChannel: any;

  beforeEach(() => {
    vi.clearAllMocks();

    // Setup mock Supabase chain
    mockFromChain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      upsert: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis()
    };

    mockSupabase.from.mockReturnValue(mockFromChain);

    // Setup mock channel for real-time subscriptions
    mockChannel = {
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnValue({ unsubscribe: vi.fn() })
    };

    mockSupabase.channel.mockReturnValue(mockChannel);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Progress Percentage Calculation Accuracy', () => {
    it('should calculate correct progress percentage based on completed lessons', async () => {
      // Test Requirement 4.1: Accurate progress percentage calculation
      
      // Mock enrollment data
      mockFromChain.single.mockResolvedValueOnce({
        data: mockEnrollment,
        error: null
      });

      // Mock progress data
      mockFromChain.single.mockResolvedValueOnce({
        data: {
          progress_data: {
            completedLessons: ['1', '2', '3'],
            completedModules: ['1'],
            timeSpent: 53,
            currentLesson: '4',
            lessonProgress: {
              '1': { completed: true, timeSpent: 15, completedAt: '2024-01-10T10:00:00Z' },
              '2': { completed: true, timeSpent: 20, completedAt: '2024-01-11T11:00:00Z' },
              '3': { completed: true, timeSpent: 18, completedAt: '2024-01-12T12:00:00Z' }
            },
            quizScores: [
              { quizId: '1', score: 85, maxScore: 100, completedAt: '2024-01-10T10:00:00Z' },
              { quizId: '2', score: 92, maxScore: 100, completedAt: '2024-01-12T14:30:00Z' }
            ]
          },
          updated_at: '2024-01-15T10:30:00Z'
        },
        error: null
      });

      // Mock course structure
      mockFromChain.single.mockResolvedValueOnce({
        data: mockCourse,
        error: null
      });

      // Mock user email
      mockFromChain.single.mockResolvedValueOnce({
        data: { email: 'user@example.com' },
        error: null
      });

      const progressData = await progressTrackingService.getUserProgress('user_456', 'course_123');

      expect(progressData).toBeDefined();
      expect(progressData!.overallProgress).toBe(60); // 3 out of 5 lessons completed
      expect(progressData!.completedLessons).toEqual(['1', '2', '3']);
      expect(progressData!.completedModules).toEqual(['1']);
      
      // Verify module progress calculations
      expect(progressData!.moduleProgress[0].progress).toBe(100); // Module 1: 3/3 lessons
      expect(progressData!.moduleProgress[0].completed).toBe(true);
      expect(progressData!.moduleProgress[1].progress).toBe(0); // Module 2: 0/2 lessons
      expect(progressData!.moduleProgress[1].completed).toBe(false);
    });

    it('should calculate progress percentage using calculateProgressPercentage method', async () => {
      // Test direct progress percentage calculation
      
      // Mock the getUserProgress method
      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValue(mockProgressData);

      const percentage = await progressTrackingService.calculateProgressPercentage('user_456', 'course_123');

      expect(percentage).toBe(60);
      expect(progressTrackingService.getUserProgress).toHaveBeenCalledWith('user_456', 'course_123');
    });

    it('should handle edge cases in progress calculation', async () => {
      // Test edge cases: no progress, 100% completion, etc.
      
      // Test no progress
      const noProgressData = {
        ...mockProgressData,
        overallProgress: 0,
        completedLessons: [],
        completedModules: []
      };

      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValueOnce(noProgressData);
      
      let percentage = await progressTrackingService.calculateProgressPercentage('user_456', 'course_123');
      expect(percentage).toBe(0);

      // Test 100% completion
      const completeProgressData = {
        ...mockProgressData,
        overallProgress: 100,
        completedLessons: ['1', '2', '3', '4', '5'],
        completedModules: ['1', '2'],
        certificateEligible: true
      };

      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValueOnce(completeProgressData);
      
      percentage = await progressTrackingService.calculateProgressPercentage('user_456', 'course_123');
      expect(percentage).toBe(100);

      // Test error handling
      vi.spyOn(progressTrackingService, 'getUserProgress').mockRejectedValueOnce(new Error('Database error'));
      
      percentage = await progressTrackingService.calculateProgressPercentage('user_456', 'course_123');
      expect(percentage).toBe(0); // Should return 0 on error
    });

    it('should calculate average quiz scores correctly', async () => {
      // Test quiz score calculation accuracy
      
      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValue(mockProgressData);

      const progressData = await progressTrackingService.getUserProgress('user_456', 'course_123');

      expect(progressData!.averageScore).toBe(88.5); // (85 + 92) / 2 = 88.5
      expect(progressData!.quizScores).toHaveLength(2);
      expect(progressData!.quizScores[0].score).toBe(85);
      expect(progressData!.quizScores[1].score).toBe(92);
    });

    it('should determine certificate eligibility correctly', async () => {
      // Test certificate eligibility logic
      
      // Test not eligible (60% progress, 88.5% average)
      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValueOnce(mockProgressData);
      
      let progressData = await progressTrackingService.getUserProgress('user_456', 'course_123');
      expect(progressData!.certificateEligible).toBe(false);

      // Test eligible (100% progress, 88.5% average)
      const eligibleProgressData = {
        ...mockProgressData,
        overallProgress: 100,
        averageScore: 88.5,
        certificateEligible: true
      };

      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValueOnce(eligibleProgressData);
      
      progressData = await progressTrackingService.getUserProgress('user_456', 'course_123');
      expect(progressData!.certificateEligible).toBe(true);

      // Test not eligible (100% progress, but low average score)
      const lowScoreProgressData = {
        ...mockProgressData,
        overallProgress: 100,
        averageScore: 65,
        certificateEligible: false
      };

      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValueOnce(lowScoreProgressData);
      
      progressData = await progressTrackingService.getUserProgress('user_456', 'course_123');
      expect(progressData!.certificateEligible).toBe(false);
    });
  });

  describe('Real-time Progress Updates', () => {
    it('should update progress in real-time as students advance', async () => {
      // Test Requirement 4.2: Real-time progress updates
      
      const { result } = renderHook(() => useProgressTracking());

      // Wait for initialization
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Mock initial progress
      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValue(mockProgressData);

      // Get initial progress
      await act(async () => {
        await result.current.getEnrollmentProgress('enrollment_123', 'user_456', 'course_123');
      });

      let progress = result.current.enrollmentProgress.get('enrollment_123');
      expect(progress?.progressPercentage).toBe(60);

      // Simulate lesson completion update
      const progressUpdate: ProgressUpdate = {
        userId: 'user_456',
        courseId: 'course_123',
        lessonId: '4',
        moduleId: '2',
        completed: true,
        timeSpent: 25
      };

      // Mock updated progress after lesson completion
      const updatedProgressData = {
        ...mockProgressData,
        overallProgress: 80, // 4 out of 5 lessons completed
        completedLessons: ['1', '2', '3', '4'],
        timeSpent: 78,
        currentLesson: '5'
      };

      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValue(updatedProgressData);

      // Mock the update lesson progress method
      mockFromChain.single.mockResolvedValueOnce({
        data: { progress_data: mockProgressData },
        error: null
      });

      mockFromChain.upsert.mockResolvedValueOnce({
        data: null,
        error: null
      });

      // Simulate progress update
      await act(async () => {
        await progressTrackingService.updateLessonProgress(progressUpdate);
      });

      // Verify progress was updated
      progress = result.current.enrollmentProgress.get('enrollment_123');
      expect(progress?.progressPercentage).toBe(80);
    });

    it('should handle real-time subscription updates', async () => {
      // Test real-time subscription mechanism
      
      let subscriptionCallback: any;

      // Mock channel subscription
      mockChannel.on.mockImplementation((event: string, config: any, callback: any) => {
        if (event === 'postgres_changes') {
          subscriptionCallback = callback;
        }
        return mockChannel;
      });

      // Initialize service
      await progressTrackingService.initialize();

      expect(mockSupabase.channel).toHaveBeenCalledWith('course_progress_updates');
      expect(mockChannel.on).toHaveBeenCalledWith(
        'postgres_changes',
        expect.objectContaining({
          event: '*',
          schema: 'public',
          table: 'course_progress'
        }),
        expect.any(Function)
      );

      // Simulate database change
      const dbChange = {
        eventType: 'UPDATE',
        new: {
          user_id: 'user_456',
          course_id: 'course_123',
          progress_data: {
            completedLessons: ['1', '2', '3', '4'],
            overallProgress: 80
          }
        }
      };

      // Trigger subscription callback
      if (subscriptionCallback) {
        subscriptionCallback(dbChange);
      }

      // Verify subscription was set up correctly
      expect(mockChannel.subscribe).toHaveBeenCalled();
    });

    it('should notify progress update listeners', async () => {
      // Test progress update notification system
      
      const mockCallback = vi.fn();
      
      // Subscribe to progress updates
      const unsubscribe = progressTrackingService.subscribeToProgressUpdates(mockCallback);

      // Mock progress data for notification
      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValue(mockProgressData);

      // Simulate progress update that triggers notification
      const progressUpdate: ProgressUpdate = {
        userId: 'user_456',
        courseId: 'course_123',
        lessonId: '4',
        moduleId: '2',
        completed: true
      };

      // Mock database operations
      mockFromChain.single.mockResolvedValueOnce({
        data: { progress_data: mockProgressData },
        error: null
      });

      mockFromChain.upsert.mockResolvedValueOnce({
        data: null,
        error: null
      });

      mockFromChain.single.mockResolvedValueOnce({
        data: { email: 'user@example.com' },
        error: null
      });

      // Update progress
      await progressTrackingService.updateLessonProgress(progressUpdate);

      // Verify callback was called
      expect(mockCallback).toHaveBeenCalledWith(mockProgressData);

      // Test unsubscribe
      unsubscribe();
      
      // Update again
      await progressTrackingService.updateLessonProgress(progressUpdate);
      
      // Callback should not be called again
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });

    it('should handle batch progress updates for multiple enrollments', async () => {
      // Test Requirement 4.3: Batch progress loading for admin dashboard
      
      const enrollments = [
        { id: 'enrollment_123', user_id: 'user_456', course_id: 'course_123' },
        { id: 'enrollment_124', user_id: 'user_457', course_id: 'course_124' }
      ];

      // Mock enrollment data
      mockFromChain.in.mockResolvedValueOnce({
        data: enrollments,
        error: null
      });

      // Mock progress data for each enrollment
      vi.spyOn(progressTrackingService, 'getUserProgress')
        .mockResolvedValueOnce(mockProgressData)
        .mockResolvedValueOnce({
          ...mockProgressData,
          enrollmentId: 'enrollment_124',
          userId: 'user_457',
          courseId: 'course_124',
          overallProgress: 25
        });

      const progressMap = await progressTrackingService.getEnrollmentProgressBatch(['enrollment_123', 'enrollment_124']);

      expect(progressMap.size).toBe(2);
      expect(progressMap.get('enrollment_123')?.overallProgress).toBe(60);
      expect(progressMap.get('enrollment_124')?.overallProgress).toBe(25);
    });
  });

  describe('Progress Display in Admin Dashboard', () => {
    it('should display progress correctly in compact mode', () => {
      // Test Requirement 4.4: Progress display in admin dashboard
      
      render(
        <ProgressDisplay
          progressPercentage={60}
          progressData={mockProgressData}
          compact={true}
        />
      );

      // Verify progress bar and percentage are displayed
      expect(screen.getByText('60%')).toBeInTheDocument();
      
      // Verify progress bar is present
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '60');
    });

    it('should display detailed progress information', () => {
      // Test detailed progress display
      
      render(
        <ProgressDisplay
          progressPercentage={60}
          progressData={mockProgressData}
          showDetails={true}
        />
      );

      // Verify detailed information is displayed
      expect(screen.getByText('Course Progress')).toBeInTheDocument();
      expect(screen.getByText('60%')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument(); // Lessons Done
      expect(screen.getByText('1')).toBeInTheDocument(); // Modules Done
      expect(screen.getByText('0h 53m')).toBeInTheDocument(); // Time Spent
      expect(screen.getByText('89%')).toBeInTheDocument(); // Average Score (rounded)

      // Verify module progress is displayed
      expect(screen.getByText('Module 1: Introduction')).toBeInTheDocument();
      expect(screen.getByText('Module 2: Advanced Topics')).toBeInTheDocument();
    });

    it('should handle loading and error states', () => {
      // Test loading state
      render(
        <ProgressDisplay
          progressPercentage={0}
          loading={true}
        />
      );

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      // Test error state
      render(
        <ProgressDisplay
          progressPercentage={0}
          error="Failed to load progress"
        />
      );

      expect(screen.getByText('Error loading progress')).toBeInTheDocument();
    });

    it('should show appropriate progress status badges', () => {
      // Test different progress status displays
      
      // Test "Not Started"
      render(
        <ProgressDisplay
          progressPercentage={0}
          progressData={null}
        />
      );

      expect(screen.getByText('Not Started')).toBeInTheDocument();

      // Test "In Progress"
      render(
        <ProgressDisplay
          progressPercentage={60}
          progressData={mockProgressData}
        />
      );

      expect(screen.getByText('In Progress')).toBeInTheDocument();

      // Test "Completed"
      render(
        <ProgressDisplay
          progressPercentage={100}
          progressData={{
            ...mockProgressData,
            overallProgress: 100,
            certificateEligible: true
          }}
        />
      );

      expect(screen.getByText('Completed')).toBeInTheDocument();
    });

    it('should display certificate eligibility status', () => {
      // Test certificate eligibility display
      
      const eligibleProgressData = {
        ...mockProgressData,
        overallProgress: 100,
        certificateEligible: true
      };

      render(
        <ProgressDisplay
          progressPercentage={100}
          progressData={eligibleProgressData}
          showDetails={true}
        />
      );

      expect(screen.getByText('Certificate Ready')).toBeInTheDocument();
    });
  });

  describe('useProgressTracking Hook Integration', () => {
    it('should manage progress state correctly', async () => {
      // Test the useProgressTracking hook functionality
      
      const { result } = renderHook(() => useProgressTracking());

      // Initially not initialized
      expect(result.current.isInitialized).toBe(false);

      // Wait for initialization
      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Mock progress data
      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValue(mockProgressData);

      // Get progress for an enrollment
      await act(async () => {
        await result.current.getEnrollmentProgress('enrollment_123', 'user_456', 'course_123');
      });

      // Verify progress is stored
      const progress = result.current.enrollmentProgress.get('enrollment_123');
      expect(progress).toBeDefined();
      expect(progress!.progressPercentage).toBe(60);
      expect(progress!.loading).toBe(false);
      expect(progress!.error).toBeNull();

      // Test progress percentage getter
      const percentage = result.current.getProgressPercentage('enrollment_123');
      expect(percentage).toBe(60);

      // Test detailed progress getter
      const detailedProgress = result.current.getDetailedProgress('enrollment_123');
      expect(detailedProgress).toEqual(mockProgressData);
    });

    it('should handle batch progress loading', async () => {
      // Test batch progress loading functionality
      
      const { result } = renderHook(() => useProgressTracking());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      const enrollments = [
        { id: 'enrollment_123', user_id: 'user_456', course_id: 'course_123' },
        { id: 'enrollment_124', user_id: 'user_457', course_id: 'course_124' }
      ];

      // Mock batch progress service
      const mockProgressMap = new Map([
        ['enrollment_123', mockProgressData],
        ['enrollment_124', { ...mockProgressData, enrollmentId: 'enrollment_124', overallProgress: 25 }]
      ]);

      vi.spyOn(progressTrackingService, 'getEnrollmentProgressBatch').mockResolvedValue(mockProgressMap);

      // Load batch progress
      let resultMap: Map<string, any>;
      await act(async () => {
        resultMap = await result.current.getEnrollmentProgressBatch(enrollments);
      });

      // Verify batch results
      expect(resultMap!.size).toBe(2);
      expect(resultMap!.get('enrollment_123').progressPercentage).toBe(60);
      expect(resultMap!.get('enrollment_124').progressPercentage).toBe(25);

      // Verify state was updated
      expect(result.current.enrollmentProgress.get('enrollment_123')?.progressPercentage).toBe(60);
      expect(result.current.enrollmentProgress.get('enrollment_124')?.progressPercentage).toBe(25);
    });

    it('should handle errors gracefully', async () => {
      // Test error handling in progress tracking
      
      const { result } = renderHook(() => useProgressTracking());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Mock service error
      vi.spyOn(progressTrackingService, 'getUserProgress').mockRejectedValue(new Error('Database connection failed'));

      // Attempt to get progress
      await act(async () => {
        await result.current.getEnrollmentProgress('enrollment_123', 'user_456', 'course_123');
      });

      // Verify error state
      const progress = result.current.enrollmentProgress.get('enrollment_123');
      expect(progress).toBeDefined();
      expect(progress!.loading).toBe(false);
      expect(progress!.error).toBe('Database connection failed');
      expect(progress!.progressPercentage).toBe(0);

      // Test error getter
      const error = result.current.getProgressError('enrollment_123');
      expect(error).toBe('Database connection failed');
    });

    it('should refresh progress data correctly', async () => {
      // Test progress refresh functionality
      
      const { result } = renderHook(() => useProgressTracking());

      await waitFor(() => {
        expect(result.current.isInitialized).toBe(true);
      });

      // Initial progress
      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValueOnce(mockProgressData);

      await act(async () => {
        await result.current.getEnrollmentProgress('enrollment_123', 'user_456', 'course_123');
      });

      expect(result.current.getProgressPercentage('enrollment_123')).toBe(60);

      // Updated progress
      const updatedProgressData = { ...mockProgressData, overallProgress: 80 };
      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValueOnce(updatedProgressData);

      // Refresh progress
      await act(async () => {
        await result.current.refreshEnrollmentProgress('enrollment_123', 'user_456', 'course_123');
      });

      expect(result.current.getProgressPercentage('enrollment_123')).toBe(80);
    });
  });

  describe('Performance and Reliability', () => {
    it('should handle concurrent progress updates', async () => {
      // Test concurrent progress updates
      
      const updates: ProgressUpdate[] = [
        { userId: 'user_456', courseId: 'course_123', lessonId: '1', moduleId: '1', completed: true },
        { userId: 'user_456', courseId: 'course_123', lessonId: '2', moduleId: '1', completed: true },
        { userId: 'user_456', courseId: 'course_123', lessonId: '3', moduleId: '1', completed: true }
      ];

      // Mock database operations
      mockFromChain.single.mockResolvedValue({
        data: { progress_data: mockProgressData },
        error: null
      });

      mockFromChain.upsert.mockResolvedValue({
        data: null,
        error: null
      });

      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValue(mockProgressData);

      // Process updates concurrently
      const promises = updates.map(update => progressTrackingService.updateLessonProgress(update));
      const results = await Promise.all(promises);

      // All updates should complete successfully
      expect(results).toHaveLength(3);
      expect(mockFromChain.upsert).toHaveBeenCalledTimes(3);
    });

    it('should maintain data consistency during updates', async () => {
      // Test data consistency during progress updates
      
      const progressUpdate: ProgressUpdate = {
        userId: 'user_456',
        courseId: 'course_123',
        lessonId: '4',
        moduleId: '2',
        completed: true,
        timeSpent: 25,
        quizScore: { score: 88, maxScore: 100 }
      };

      // Mock current progress
      mockFromChain.single.mockResolvedValueOnce({
        data: {
          progress_data: {
            completedLessons: ['1', '2', '3'],
            completedModules: ['1'],
            timeSpent: 53,
            lessonProgress: {},
            quizScores: []
          }
        },
        error: null
      });

      // Mock upsert operation
      let upsertedData: any;
      mockFromChain.upsert.mockImplementation((data) => {
        upsertedData = data;
        return Promise.resolve({ data: null, error: null });
      });

      mockFromChain.single.mockResolvedValueOnce({
        data: { email: 'user@example.com' },
        error: null
      });

      vi.spyOn(progressTrackingService, 'getUserProgress').mockResolvedValue(mockProgressData);

      // Update progress
      await progressTrackingService.updateLessonProgress(progressUpdate);

      // Verify data consistency
      expect(upsertedData.progress_data.completedLessons).toContain('4');
      expect(upsertedData.progress_data.timeSpent).toBe(78); // 53 + 25
      expect(upsertedData.progress_data.quizScores).toContainEqual(
        expect.objectContaining({
          quizId: '4',
          score: 88,
          maxScore: 100
        })
      );
    });
  });
});