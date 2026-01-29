import { supabase } from '@/integrations/supabase/client';

interface CourseProgress {
  courseId: string;
  moduleId?: string;
  lessonId?: string;
  progress: number;
  completed: boolean;
  lastAccessed: string;
  quizScores?: Record<string, number>;
  completedLessons?: string[];
  completedModules?: string[];
}

export const saveCourseProgress = async (
  userId: string,
  userEmail: string,
  courseId: string,
  progress: number,
  additionalData: Partial<CourseProgress> = {}
) => {
  try {
    const progressData: CourseProgress = {
      courseId,
      progress,
      completed: progress >= 100,
      lastAccessed: new Date().toISOString(),
      ...additionalData,
    };

    // Save to localStorage
    const localStorageKey = `course-progress-${userId}-${courseId}`;
    localStorage.setItem(localStorageKey, JSON.stringify(progressData));

    // Save to Supabase for cloud sync
    const { error } = await supabase
      .from('course_progress')
      .upsert({
        user_id: userId,
        user_email: userEmail,
        course_id: courseId,
        progress_data: progressData,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,course_id'
      });

    if (error) {
      console.error('❌ Failed to save progress to cloud:', error);
      // If table doesn't exist, log it but don't fail completely
      if (error.message.includes('relation "course_progress" does not exist')) {
        console.warn('⚠️ course_progress table not created yet. Please run the SQL migrations.');
        return false;
      }
      return false;
    }

    console.log('✅ Course progress saved to cloud:', courseId, progress);
    return true;
  } catch (error) {
    console.error('❌ Error saving course progress:', error);
    return false;
  }
};

export const loadCourseProgress = async (
  userId: string,
  courseId: string
): Promise<CourseProgress | null> => {
  try {
    // First try to get from localStorage
    const localStorageKey = `course-progress-${userId}-${courseId}`;
    const localProgress = localStorage.getItem(localStorageKey);
    
    if (localProgress) {
      const parsed = JSON.parse(localProgress);
      console.log('📦 Loaded progress from localStorage:', courseId, parsed);
      return parsed;
    }

    // If not in localStorage, try to get from cloud
    const { data, error } = await supabase
      .from('course_progress')
      .select('progress_data')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .single();

    if (error || !data) {
      // If table doesn't exist, that's normal for first-time setup
      if (error && error.message.includes('relation "course_progress" does not exist')) {
        console.log('📋 course_progress table not created yet. This is normal for first-time setup.');
        return null;
      }
      console.log('No cloud progress found for course:', courseId);
      return null;
    }

    const cloudProgress = data.progress_data as CourseProgress;
    
    // Save to localStorage for future use
    localStorage.setItem(localStorageKey, JSON.stringify(cloudProgress));
    
    console.log('📦 Loaded progress from cloud:', courseId, cloudProgress);
    return cloudProgress;
  } catch (error) {
    console.error('❌ Error loading course progress:', error);
    return null;
  }
};

export const syncAllCourseProgress = async (userId: string, userEmail: string) => {
  try {
    console.log('🔄 Syncing all course progress for user:', userEmail);

    // Get all course progress from localStorage
    const progressKeys = Object.keys(localStorage).filter(key => 
      key.startsWith(`course-progress-${userId}-`)
    );

    const progressData: Record<string, CourseProgress> = {};
    
    progressKeys.forEach(key => {
      const courseId = key.replace(`course-progress-${userId}-`, '');
      const progress = JSON.parse(localStorage.getItem(key) || '{}');
      progressData[courseId] = progress;
    });

    // Save all to cloud
    const { error } = await supabase
      .from('course_progress')
      .upsert(
        Object.entries(progressData).map(([courseId, progress]) => ({
          user_id: userId,
          user_email: userEmail,
          course_id: courseId,
          progress_data: progress,
          updated_at: new Date().toISOString(),
        })),
        {
          onConflict: 'user_id,course_id'
        }
      );

    if (error) {
      console.error('❌ Failed to sync course progress to cloud:', error);
      // If table doesn't exist, log it but don't fail completely
      if (error.message.includes('relation "course_progress" does not exist')) {
        console.warn('⚠️ course_progress table not created yet. Please run the SQL migrations.');
        return false;
      }
      return false;
    }

    console.log('✅ All course progress synced to cloud:', Object.keys(progressData).length, 'courses');
    return true;
  } catch (error) {
    console.error('❌ Error syncing course progress:', error);
    return false;
  }
};
