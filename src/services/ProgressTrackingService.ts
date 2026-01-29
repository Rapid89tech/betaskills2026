import { supabase } from '@/integrations/supabase/client';
import type { Course } from '@/types/course';

export interface ProgressData {
  enrollmentId: string;
  userId: string;
  courseId: string;
  overallProgress: number;
  moduleProgress: ModuleProgress[];
  lessonProgress: LessonProgress[];
  timeSpent: number; // in minutes
  lastAccessed: Date;
  estimatedCompletion: Date | null;
  completedModules: string[];
  completedLessons: string[];
  currentLesson: string | null;
  quizScores: QuizScore[];
  averageScore: number;
  certificateEligible: boolean;
}

export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  progress: number;
  completed: boolean;
  lessonsCompleted: number;
  totalLessons: number;
}

export interface LessonProgress {
  lessonId: string;
  lessonName: string;
  completed: boolean;
  timeSpent: number;
  completedAt?: Date;
}

export interface QuizScore {
  quizId: string;
  score: number;
  maxScore: number;
  completedAt: Date;
}

export interface ProgressUpdate {
  userId: string;
  courseId: string;
  lessonId: string;
  moduleId: string;
  timeSpent?: number;
  completed?: boolean;
  quizScore?: {
    score: number;
    maxScore: number;
  };
}

export type ProgressUpdateCallback = (progressData: ProgressData) => void;

export class ProgressTrackingService {
  private static instance: ProgressTrackingService;
  private progressUpdateListeners: Set<ProgressUpdateCallback> = new Set();
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ProgressTrackingService {
    if (!ProgressTrackingService.instance) {
      ProgressTrackingService.instance = new ProgressTrackingService();
    }
    return ProgressTrackingService.instance;
  }

  /**
   * Initialize the progress tracking service
   * Requirement 4.1: Real-time progress percentage calculation
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Set up real-time subscription for progress updates
      supabase
        .channel('course_progress_updates')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'course_progress'
          },
          (payload) => {
            this.handleProgressUpdate(payload);
          }
        )
        .subscribe();

      this.isInitialized = true;
      console.log('ProgressTrackingService initialized successfully');
    } catch (error) {
      console.error('Error initializing ProgressTrackingService:', error);
      throw error;
    }
  }

  /**
   * Get user progress for a specific course
   * Requirement 4.1: Track student course progress
   */
  async getUserProgress(userId: string, courseId: string): Promise<ProgressData | null> {
    try {
      // Get enrollment data
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('id')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .eq('status', 'approved')
        .single();

      if (enrollmentError || !enrollment) {
        console.log('No approved enrollment found for user:', userId, 'course:', courseId);
        return null;
      }

      // Get progress data from course_progress table
      const { data: progressRecord, error: progressError } = await supabase
        .from('course_progress')
        .select('progress_data, updated_at')
        .eq('user_id', userId)
        .eq('course_id', courseId)
        .single();

      if (progressError && progressError.code !== 'PGRST116') {
        console.error('Error fetching progress data:', progressError);
        throw progressError;
      }

      // Get course structure to calculate progress
      const courseStructure = await this.getCourseStructure(courseId);
      if (!courseStructure) {
        throw new Error(`Course structure not found for course: ${courseId}`);
      }

      // If no progress record exists, create initial progress data
      if (!progressRecord) {
        return this.createInitialProgressData(enrollment.id, userId, courseId, courseStructure);
      }

      // Calculate current progress based on stored data and course structure
      return this.calculateProgressData(
        enrollment.id,
        userId,
        courseId,
        progressRecord.progress_data,
        courseStructure,
        new Date(progressRecord.updated_at)
      );
    } catch (error) {
      console.error('Error getting user progress:', error);
      throw error;
    }
  }

  /**
   * Calculate progress percentage for a user's course
   * Requirement 4.2: Real-time progress percentage calculation
   */
  async calculateProgressPercentage(userId: string, courseId: string): Promise<number> {
    try {
      const progressData = await this.getUserProgress(userId, courseId);
      return progressData?.overallProgress || 0;
    } catch (error) {
      console.error('Error calculating progress percentage:', error);
      return 0;
    }
  }

  /**
   * Update lesson completion and recalculate progress
   * Requirement 4.3: Progress data synchronization
   */
  async updateLessonProgress(update: ProgressUpdate): Promise<void> {
    try {
      // Get current progress data
      const { data: currentProgress, error: fetchError } = await supabase
        .from('course_progress')
        .select('progress_data')
        .eq('user_id', update.userId)
        .eq('course_id', update.courseId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      // Initialize progress data if it doesn't exist
      let progressData = currentProgress?.progress_data || {
        completedLessons: [],
        completedModules: [],
        lessonProgress: {},
        moduleProgress: {},
        quizScores: [],
        timeSpent: 0,
        currentLesson: null
      };

      // Update lesson progress
      if (update.completed) {
        if (!progressData.completedLessons.includes(update.lessonId)) {
          progressData.completedLessons.push(update.lessonId);
        }
      }

      // Update time spent
      if (update.timeSpent) {
        progressData.timeSpent = (progressData.timeSpent || 0) + update.timeSpent;
      }

      // Update current lesson
      progressData.currentLesson = update.lessonId;

      // Update lesson-specific progress
      progressData.lessonProgress[update.lessonId] = {
        completed: update.completed || false,
        timeSpent: (progressData.lessonProgress[update.lessonId]?.timeSpent || 0) + (update.timeSpent || 0),
        completedAt: update.completed ? new Date().toISOString() : null
      };

      // Update quiz score if provided
      if (update.quizScore) {
        const existingScoreIndex = progressData.quizScores.findIndex(
          (score: any) => score.quizId === update.lessonId
        );
        
        const quizScore = {
          quizId: update.lessonId,
          score: update.quizScore.score,
          maxScore: update.quizScore.maxScore,
          completedAt: new Date().toISOString()
        };

        if (existingScoreIndex >= 0) {
          progressData.quizScores[existingScoreIndex] = quizScore;
        } else {
          progressData.quizScores.push(quizScore);
        }
      }

      // Check if module is completed
      const courseStructure = await this.getCourseStructure(update.courseId);
      if (courseStructure) {
        const module = courseStructure.modules.find(m => m.id.toString() === update.moduleId);
        if (module) {
          const moduleLessons = module.lessons.map(l => l.id.toString());
          const completedModuleLessons = moduleLessons.filter(lessonId => 
            progressData.completedLessons.includes(lessonId)
          );

          if (completedModuleLessons.length === moduleLessons.length) {
            if (!progressData.completedModules.includes(update.moduleId)) {
              progressData.completedModules.push(update.moduleId);
            }
          }
        }
      }

      // Upsert progress data
      const { error: upsertError } = await supabase
        .from('course_progress')
        .upsert({
          user_id: update.userId,
          user_email: await this.getUserEmail(update.userId),
          course_id: update.courseId,
          progress_data: progressData,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,course_id'
        });

      if (upsertError) {
        throw upsertError;
      }

      // Notify listeners of progress update
      const updatedProgressData = await this.getUserProgress(update.userId, update.courseId);
      if (updatedProgressData) {
        this.notifyProgressUpdate(updatedProgressData);
      }
    } catch (error) {
      console.error('Error updating lesson progress:', error);
      throw error;
    }
  }

  /**
   * Subscribe to progress updates
   * Requirement 4.4: Real-time progress updates
   */
  subscribeToProgressUpdates(callback: ProgressUpdateCallback): () => void {
    this.progressUpdateListeners.add(callback);
    
    return () => {
      this.progressUpdateListeners.delete(callback);
    };
  }

  /**
   * Get progress data for multiple enrollments (for admin dashboard)
   * Requirement 4.1: Progress data synchronization across admin dashboard
   */
  async getEnrollmentProgressBatch(enrollmentIds: string[]): Promise<Map<string, ProgressData>> {
    const progressMap = new Map<string, ProgressData>();

    try {
      // Get enrollment data for all IDs
      const { data: enrollments, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('id, user_id, course_id')
        .in('id', enrollmentIds)
        .eq('status', 'approved');

      if (enrollmentError) {
        throw enrollmentError;
      }

      // Get progress for each enrollment
      for (const enrollment of enrollments || []) {
        try {
          const progressData = await this.getUserProgress(enrollment.user_id, enrollment.course_id);
          if (progressData) {
            progressMap.set(enrollment.id, progressData);
          }
        } catch (error) {
          console.error(`Error getting progress for enrollment ${enrollment.id}:`, error);
          // Continue with other enrollments even if one fails
        }
      }

      return progressMap;
    } catch (error) {
      console.error('Error getting enrollment progress batch:', error);
      throw error;
    }
  }

  /**
   * Get detailed progress metrics for admin monitoring
   * Requirement 4.4: Detailed progress metrics and completion tracking
   */
  async getDetailedProgressMetrics(enrollmentId: string): Promise<ProgressData | null> {
    try {
      // Get enrollment data
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('user_id, course_id')
        .eq('id', enrollmentId)
        .single();

      if (enrollmentError || !enrollment) {
        return null;
      }

      return await this.getUserProgress(enrollment.user_id, enrollment.course_id);
    } catch (error) {
      console.error('Error getting detailed progress metrics:', error);
      return null;
    }
  }

  // Private helper methods

  private async getCourseStructure(courseId: string): Promise<Course | null> {
    try {
      // Get course data from database
      const { data: course, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error || !course) {
        console.error('Course not found:', courseId);
        return null;
      }

      // For now, we'll need to get the course structure from the course data
      // This might need to be enhanced based on how course modules/lessons are stored
      return course as Course;
    } catch (error) {
      console.error('Error getting course structure:', error);
      return null;
    }
  }

  private createInitialProgressData(
    enrollmentId: string,
    userId: string,
    courseId: string,
    courseStructure: Course
  ): ProgressData {
    const totalLessons = courseStructure.modules.reduce((total, module) => total + module.lessons.length, 0);
    
    return {
      enrollmentId,
      userId,
      courseId,
      overallProgress: 0,
      moduleProgress: courseStructure.modules.map(module => ({
        moduleId: module.id.toString(),
        moduleName: module.title,
        progress: 0,
        completed: false,
        lessonsCompleted: 0,
        totalLessons: module.lessons.length
      })),
      lessonProgress: courseStructure.modules.flatMap(module =>
        module.lessons.map(lesson => ({
          lessonId: lesson.id.toString(),
          lessonName: lesson.title,
          completed: false,
          timeSpent: 0
        }))
      ),
      timeSpent: 0,
      lastAccessed: new Date(),
      estimatedCompletion: null,
      completedModules: [],
      completedLessons: [],
      currentLesson: null,
      quizScores: [],
      averageScore: 0,
      certificateEligible: false
    };
  }

  private calculateProgressData(
    enrollmentId: string,
    userId: string,
    courseId: string,
    storedProgressData: any,
    courseStructure: Course,
    lastUpdated: Date
  ): ProgressData {
    const totalLessons = courseStructure.modules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = storedProgressData.completedLessons || [];
    const overallProgress = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

    // Calculate module progress
    const moduleProgress: ModuleProgress[] = courseStructure.modules.map(module => {
      const moduleLessons = module.lessons.map(l => l.id.toString());
      const completedModuleLessons = moduleLessons.filter(lessonId => 
        completedLessons.includes(lessonId)
      );
      const moduleProgressPercent = moduleLessons.length > 0 
        ? Math.round((completedModuleLessons.length / moduleLessons.length) * 100) 
        : 0;

      return {
        moduleId: module.id.toString(),
        moduleName: module.title,
        progress: moduleProgressPercent,
        completed: completedModuleLessons.length === moduleLessons.length,
        lessonsCompleted: completedModuleLessons.length,
        totalLessons: moduleLessons.length
      };
    });

    // Calculate lesson progress
    const lessonProgress: LessonProgress[] = courseStructure.modules.flatMap(module =>
      module.lessons.map(lesson => {
        const lessonId = lesson.id.toString();
        const lessonProgressData = storedProgressData.lessonProgress?.[lessonId];
        
        const lessonProgressItem: LessonProgress = {
          lessonId,
          lessonName: lesson.title,
          completed: completedLessons.includes(lessonId),
          timeSpent: lessonProgressData?.timeSpent || 0
        };
        
        if (lessonProgressData?.completedAt) {
          lessonProgressItem.completedAt = new Date(lessonProgressData.completedAt);
        }
        
        return lessonProgressItem;
      })
    );

    // Calculate average quiz score
    const quizScores = storedProgressData.quizScores || [];
    const averageScore = quizScores.length > 0 
      ? quizScores.reduce((sum: number, score: any) => sum + (score.score / score.maxScore * 100), 0) / quizScores.length
      : 0;

    // Determine certificate eligibility (100% completion + average score >= 70%)
    const certificateEligible = overallProgress === 100 && averageScore >= 70;

    return {
      enrollmentId,
      userId,
      courseId,
      overallProgress,
      moduleProgress,
      lessonProgress,
      timeSpent: storedProgressData.timeSpent || 0,
      lastAccessed: lastUpdated,
      estimatedCompletion: this.calculateEstimatedCompletion(overallProgress, storedProgressData.timeSpent || 0, totalLessons),
      completedModules: storedProgressData.completedModules || [],
      completedLessons,
      currentLesson: storedProgressData.currentLesson || null,
      quizScores: quizScores.map((score: any) => ({
        ...score,
        completedAt: new Date(score.completedAt)
      })),
      averageScore,
      certificateEligible
    };
  }

  private calculateEstimatedCompletion(overallProgress: number, timeSpent: number, totalLessons: number): Date | null {
    if (overallProgress === 0 || timeSpent === 0) return null;

    // Estimate based on current pace (very rough calculation)
    const averageTimePerLesson = timeSpent / (overallProgress / 100 * totalLessons);
    const remainingLessons = totalLessons - (overallProgress / 100 * totalLessons);
    const estimatedRemainingTime = remainingLessons * averageTimePerLesson;

    const estimatedCompletion = new Date();
    estimatedCompletion.setMinutes(estimatedCompletion.getMinutes() + estimatedRemainingTime);

    return estimatedCompletion;
  }

  private async getUserEmail(userId: string): Promise<string> {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single();

      if (error || !profile) {
        // Fallback to auth.users if profile doesn't exist
        const { data: user } = await supabase.auth.admin.getUserById(userId);
        return user?.user?.email || '';
      }

      return profile.email || '';
    } catch (error) {
      console.error('Error getting user email:', error);
      return '';
    }
  }

  private handleProgressUpdate(payload: any): void {
    // Handle real-time progress updates from database
    console.log('Progress update received:', payload);
    // This would trigger recalculation and notification to listeners
  }

  private notifyProgressUpdate(progressData: ProgressData): void {
    this.progressUpdateListeners.forEach(callback => {
      try {
        callback(progressData);
      } catch (error) {
        console.error('Error in progress update callback:', error);
      }
    });
  }
}

// Export singleton instance
export const progressTrackingService = ProgressTrackingService.getInstance();