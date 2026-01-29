import { supabase } from '@/integrations/supabase/client';
import { progressTrackingService, type ProgressData } from './ProgressTrackingService';

export interface ProgressAnalytics {
  totalStudents: number;
  activeStudents: number;
  averageProgress: number;
  completionRate: number;
  averageTimeSpent: number;
  topPerformers: Array<{
    userId: string;
    userName: string;
    courseTitle: string;
    progress: number;
    timeSpent: number;
  }>;
  strugglingStudents: Array<{
    userId: string;
    userName: string;
    courseTitle: string;
    progress: number;
    lastAccessed: Date;
  }>;
  coursePerformance: Array<{
    courseId: string;
    courseTitle: string;
    enrollmentCount: number;
    averageProgress: number;
    completionRate: number;
  }>;
  progressTrends: Array<{
    date: string;
    averageProgress: number;
    activeStudents: number;
    completions: number;
  }>;
}

export interface ProgressAlert {
  id: string;
  type: 'low_progress' | 'stuck_student' | 'high_performer' | 'completion_milestone';
  severity: 'low' | 'medium' | 'high';
  message: string;
  enrollmentId: string;
  userId: string;
  courseId: string;
  timestamp: Date;
  acknowledged: boolean;
}

export type ProgressAlertCallback = (alert: ProgressAlert) => void;

export class ProgressAnalyticsService {
  private static instance: ProgressAnalyticsService;
  private alertListeners: Set<ProgressAlertCallback> = new Set();
  private isInitialized = false;

  private constructor() {}

  static getInstance(): ProgressAnalyticsService {
    if (!ProgressAnalyticsService.instance) {
      ProgressAnalyticsService.instance = new ProgressAnalyticsService();
    }
    return ProgressAnalyticsService.instance;
  }

  /**
   * Initialize the analytics service
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await progressTrackingService.initialize();
      this.isInitialized = true;
      console.log('ProgressAnalyticsService initialized successfully');
    } catch (error) {
      console.error('Error initializing ProgressAnalyticsService:', error);
      throw error;
    }
  }

  /**
   * Get comprehensive progress analytics
   * Requirement 4.4: Progress history tracking and analytics
   */
  async getProgressAnalytics(timeRange: '7d' | '30d' | '90d' = '30d'): Promise<ProgressAnalytics> {
    try {
      // Calculate date range
      const endDate = new Date();
      const startDate = new Date();
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      startDate.setDate(endDate.getDate() - days);

      // Get all approved enrollments
      const { data: enrollments, error: enrollmentError } = await supabase
        .from('enrollments')
        .select(`
          id,
          user_id,
          course_id,
          status,
          enrolled_at,
          approved_at,
          courses (
            id,
            title
          ),
          profiles (
            id,
            first_name,
            last_name,
            email
          )
        `)
        .eq('status', 'approved')
        .gte('enrolled_at', startDate.toISOString());

      if (enrollmentError) {
        throw enrollmentError;
      }

      if (!enrollments || enrollments.length === 0) {
        return this.getEmptyAnalytics();
      }

      // Get progress data for all enrollments
      const enrollmentIds = enrollments.map(e => e.id);
      const progressMap = await progressTrackingService.getEnrollmentProgressBatch(enrollmentIds);

      // Calculate analytics
      const analytics = await this.calculateAnalytics(enrollments, progressMap, timeRange);
      
      return analytics;
    } catch (error) {
      console.error('Error getting progress analytics:', error);
      throw error;
    }
  }

  /**
   * Generate progress alerts based on current data
   * Requirement 4.4: Progress alerts and notifications for admin awareness
   */
  async generateProgressAlerts(): Promise<ProgressAlert[]> {
    try {
      const analytics = await this.getProgressAnalytics('30d');
      const alerts: ProgressAlert[] = [];

      // Alert for struggling students (low progress + inactive)
      analytics.strugglingStudents.forEach(student => {
        const daysSinceAccess = Math.floor(
          (Date.now() - student.lastAccessed.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (student.progress < 20 && daysSinceAccess > 5) {
          alerts.push({
            id: `stuck-${student.userId}-${Date.now()}`,
            type: 'stuck_student',
            severity: daysSinceAccess > 14 ? 'high' : 'medium',
            message: `${student.userName} has low progress (${student.progress}%) in ${student.courseTitle} and hasn't accessed course for ${daysSinceAccess} days`,
            enrollmentId: '',
            userId: student.userId,
            courseId: '',
            timestamp: new Date(),
            acknowledged: false
          });
        }
      });

      // Alert for high performers near completion
      analytics.topPerformers.forEach(performer => {
        if (performer.progress > 90 && performer.progress < 100) {
          alerts.push({
            id: `completion-${performer.userId}-${Date.now()}`,
            type: 'completion_milestone',
            severity: 'low',
            message: `${performer.userName} is close to completing ${performer.courseTitle} (${performer.progress}%)`,
            enrollmentId: '',
            userId: performer.userId,
            courseId: '',
            timestamp: new Date(),
            acknowledged: false
          });
        }
      });

      // Alert for low course performance
      analytics.coursePerformance.forEach(course => {
        if (course.averageProgress < 30 && course.enrollmentCount > 5) {
          alerts.push({
            id: `low-performance-${course.courseId}-${Date.now()}`,
            type: 'low_progress',
            severity: 'medium',
            message: `Course "${course.courseTitle}" has low average progress (${course.averageProgress}%) across ${course.enrollmentCount} students`,
            enrollmentId: '',
            userId: '',
            courseId: course.courseId,
            timestamp: new Date(),
            acknowledged: false
          });
        }
      });

      // Notify listeners
      alerts.forEach(alert => {
        this.notifyAlertListeners(alert);
      });

      return alerts;
    } catch (error) {
      console.error('Error generating progress alerts:', error);
      return [];
    }
  }

  /**
   * Subscribe to progress alerts
   */
  subscribeToAlerts(callback: ProgressAlertCallback): () => void {
    this.alertListeners.add(callback);
    
    return () => {
      this.alertListeners.delete(callback);
    };
  }

  /**
   * Get progress trends over time
   * Requirement 4.4: Progress history tracking and analytics
   */
  async getProgressTrends(timeRange: '7d' | '30d' | '90d' = '30d'): Promise<Array<{
    date: string;
    averageProgress: number;
    activeStudents: number;
    completions: number;
  }>> {
    try {
      // This would typically query historical progress data
      // For now, we'll return mock trend data
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const trends = [];
      
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Mock trend calculation - in real implementation, this would query historical data
        trends.push({
          date: date.toISOString().split('T')[0] || '',
          averageProgress: Math.floor(Math.random() * 20) + 50, // 50-70%
          activeStudents: Math.floor(Math.random() * 50) + 80, // 80-130 students
          completions: Math.floor(Math.random() * 5) + 1 // 1-6 completions
        });
      }
      
      return trends;
    } catch (error) {
      console.error('Error getting progress trends:', error);
      return [];
    }
  }

  // Private helper methods

  private async calculateAnalytics(
    enrollments: any[],
    progressMap: Map<string, ProgressData>,
    timeRange: string
  ): Promise<ProgressAnalytics> {
    const totalStudents = enrollments.length;
    let totalProgress = 0;
    let totalTimeSpent = 0;
    let completedCount = 0;
    let activeCount = 0;

    const performersList: Array<{
      userId: string;
      userName: string;
      courseTitle: string;
      progress: number;
      timeSpent: number;
    }> = [];

    const strugglingList: Array<{
      userId: string;
      userName: string;
      courseTitle: string;
      progress: number;
      lastAccessed: Date;
    }> = [];

    const courseMap = new Map<string, {
      courseId: string;
      courseTitle: string;
      enrollmentCount: number;
      totalProgress: number;
      completedCount: number;
    }>();

    // Process each enrollment
    for (const enrollment of enrollments) {
      const progressData = progressMap.get(enrollment.id);
      const progress = progressData?.overallProgress || 0;
      const timeSpent = progressData?.timeSpent || 0;
      const lastAccessed = progressData?.lastAccessed || new Date(enrollment.enrolled_at);

      totalProgress += progress;
      totalTimeSpent += timeSpent;

      if (progress === 100) {
        completedCount++;
      }

      // Consider active if accessed within last 7 days
      const daysSinceAccess = Math.floor((Date.now() - lastAccessed.getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceAccess <= 7) {
        activeCount++;
      }

      // Collect performer data
      const userName = `${enrollment.profiles?.first_name || 'Unknown'} ${enrollment.profiles?.last_name || 'User'}`;
      const courseTitle = enrollment.courses?.title || 'Unknown Course';

      performersList.push({
        userId: enrollment.user_id,
        userName,
        courseTitle,
        progress,
        timeSpent: Math.round(timeSpent / 60) // Convert to hours
      });

      // Identify struggling students
      if (progress < 30 || daysSinceAccess > 7) {
        strugglingList.push({
          userId: enrollment.user_id,
          userName,
          courseTitle,
          progress,
          lastAccessed
        });
      }

      // Aggregate course data
      const courseId = enrollment.course_id;
      if (!courseMap.has(courseId)) {
        courseMap.set(courseId, {
          courseId,
          courseTitle,
          enrollmentCount: 0,
          totalProgress: 0,
          completedCount: 0
        });
      }

      const courseData = courseMap.get(courseId)!;
      courseData.enrollmentCount++;
      courseData.totalProgress += progress;
      if (progress === 100) {
        courseData.completedCount++;
      }
    }

    // Calculate averages
    const averageProgress = totalStudents > 0 ? Math.round(totalProgress / totalStudents) : 0;
    const completionRate = totalStudents > 0 ? Math.round((completedCount / totalStudents) * 100) : 0;
    const averageTimeSpent = totalStudents > 0 ? Math.round(totalTimeSpent / totalStudents / 60) : 0; // Hours

    // Sort and limit performers
    const topPerformers = performersList
      .sort((a, b) => b.progress - a.progress)
      .slice(0, 10);

    const strugglingStudents = strugglingList
      .sort((a, b) => a.progress - b.progress)
      .slice(0, 10);

    // Calculate course performance
    const coursePerformance = Array.from(courseMap.values()).map(course => ({
      courseId: course.courseId,
      courseTitle: course.courseTitle,
      enrollmentCount: course.enrollmentCount,
      averageProgress: Math.round(course.totalProgress / course.enrollmentCount),
      completionRate: Math.round((course.completedCount / course.enrollmentCount) * 100)
    }));

    // Get trends
    const progressTrends = await this.getProgressTrends(timeRange as '7d' | '30d' | '90d');

    return {
      totalStudents,
      activeStudents: activeCount,
      averageProgress,
      completionRate,
      averageTimeSpent,
      topPerformers,
      strugglingStudents,
      coursePerformance,
      progressTrends
    };
  }

  private getEmptyAnalytics(): ProgressAnalytics {
    return {
      totalStudents: 0,
      activeStudents: 0,
      averageProgress: 0,
      completionRate: 0,
      averageTimeSpent: 0,
      topPerformers: [],
      strugglingStudents: [],
      coursePerformance: [],
      progressTrends: []
    };
  }

  private notifyAlertListeners(alert: ProgressAlert): void {
    this.alertListeners.forEach(callback => {
      try {
        callback(alert);
      } catch (error) {
        console.error('Error in alert callback:', error);
      }
    });
  }
}

// Export singleton instance
export const progressAnalyticsService = ProgressAnalyticsService.getInstance();