import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';
import { useToast } from './use-toast';

export interface ModuleScore {
  id: string;
  user_id: string;
  course_id: string;
  module_id: number;
  lesson_id: number;
  score: number;
  total_points: number;
  percentage: number;
  grade: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

export interface CourseScoreSummary {
  user_id: string;
  course_id: string;
  completed_modules: number;
  total_score: number;
  total_possible_points: number;
  average_percentage: number;
  overall_grade: string;
}

// Mapping from course slugs to UUIDs for DB queries
const courseSlugToUuid: Record<string, string> = {
  'ai-human-relations': 'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d4',
  'entrepreneurship-101': 'c9d8e7f6-a5b4-9483-d2e3-f4a5b6c7d8e9',
  'entrepreneurship-final': 'c9d8e7f6-a5b4-9483-d2e3-f4a5b6c7d8e9', // Added mapping for Entrepreneurship final
  'sound-engineering': 'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d4',
  'motor-mechanic-petrol': 'a7b6c5d4-e3f2-8391-a2b3-c4d5e6f7a8b9',
  'diesel-mechanic': 'b8c7d6e5-f4a3-9281-b0c9-d8e7f6a5b4c3',
  'podcast-management': 'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5', // Fixed UUID format
  'podcast-management-101': 'f9e8d7c6-b5a4-9382-c1d0-e9f8a7b6c5d5', // Fixed UUID format
  'business': 'b9c8d7e6-f5a4-9382-c1d0-e9f8a7b6c5d4',
  'ai-assisted-programming': 'a1b2c3d4-e5f6-7890-a1b2-c3d4e5f6a7b8',
  'ai-assisted-web-development': 'b2c3d4e5-f6a7-8901-b2c3-d4e5f6a7b8c9',
  'christian-teacher': 'c3d4e5f6-a7b8-9012-c3d4-e5f6a7b8c9d0',
  // Add more mappings as needed
};

// Local storage fallback for when database is not available
const LOCAL_STORAGE_KEY = 'module_scores_fallback';

export const useModuleScores = (courseId?: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [scores, setScores] = useState<ModuleScore[]>([]);
  const [courseSummary, setCourseSummary] = useState<CourseScoreSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [dbAvailable, setDbAvailable] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);

  // Helper to get the real UUID for DB queries
  const getDbCourseId = useCallback((id?: string) => {
    if (!id) return undefined;
    // If the ID is already a UUID, return it as is
    if (id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
      return id;
    }
    return courseSlugToUuid[id] || id;
  }, []);

  // Load scores from local storage as fallback
  const loadLocalScores = useCallback(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed)) {
          return parsed.filter((score: ModuleScore) => 
            score.user_id === user?.id && score.course_id === getDbCourseId(courseId)
          );
        }
      }
    } catch (error) {
      console.warn('Error loading local scores:', error);
    }
    return [];
  }, [user?.id, courseId, getDbCourseId]);

  // Save scores to local storage as fallback
  const saveLocalScore = useCallback((score: ModuleScore) => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const existing = stored ? JSON.parse(stored) : [];
      
      // Remove existing score for this user/course/module/lesson
      const filtered = existing.filter((s: ModuleScore) => 
        !(s.user_id === score.user_id && 
          s.course_id === score.course_id && 
          s.module_id === score.module_id && 
          s.lesson_id === score.lesson_id)
      );
      
      // Add new score
      const updated = [...filtered, score];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.warn('Error saving local score:', error);
    }
  }, []);

  // Test database connectivity
  const testDatabaseConnection = useCallback(async () => {
    try {
      // Try a simple query to test connection
      const { data, error } = await supabase
        .from('module_scores')
        .select('id')
        .limit(1);
      
      if (error) {
        if (error.code === '42P01') {
          // Table doesn't exist - this is expected for new setups
          console.log('ℹ️ Database table does not exist yet, using local storage');
          return false;
        }
        if (error.code === 'PGRST116') {
          // No rows found - this is normal
          console.log('ℹ️ Database connected but no scores found yet');
          return true;
        }
        console.error('❌ Database connection error:', error);
        return false;
      }
      
      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.warn('❌ Database connection test failed:', error);
      return false;
    }
  }, []);

  // Fetch scores for a specific course or all courses
  const fetchScores = useCallback(async () => {
    if (!user || !courseId) return;
    
    const dbCourseId = getDbCourseId(courseId);
    if (!dbCourseId) {
      console.warn('No database course ID found for:', courseId);
      // Load from local storage as fallback
      const localScores = loadLocalScores();
      setScores(localScores);
      return;
    }

    setLoading(true);
    setLastError(null);

    try {
      // Test database connection first
      const isConnected = await testDatabaseConnection();
      if (!isConnected) {
        console.log('Database not available, using local storage fallback');
        setDbAvailable(false);
        const localScores = loadLocalScores();
        setScores(localScores);
        return;
      }

      setDbAvailable(true);
      console.log('🔄 Fetching scores from database for:', { courseId, dbCourseId, userId: user.id });

      const { data, error } = await supabase
        .from('module_scores')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', dbCourseId)
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST116') {
          console.log('ℹ️ No scores found for this course yet');
          // Load from local storage as fallback
          const localScores = loadLocalScores();
          setScores(localScores);
        } else {
          console.error('❌ Error fetching scores:', error);
          setLastError('Failed to load scores from database');
          // Fallback to local storage
          const localScores = loadLocalScores();
          setScores(localScores);
        }
        return;
      }

      console.log('✅ Scores fetched successfully from database:', data);
      const scoresData = data || [];
      
      // Merge database scores with local storage scores to ensure nothing is lost
      const localScores = loadLocalScores();
      const mergedScores = [...scoresData];
      
      // Add local scores that aren't in database
      localScores.forEach(localScore => {
        const exists = scoresData.some(dbScore => 
          dbScore.module_id === localScore.module_id && 
          dbScore.lesson_id === localScore.lesson_id
        );
        if (!exists) {
          mergedScores.push(localScore);
        }
      });
      
      setScores(mergedScores);
      
      // Cache the merged scores for instant loading on refresh
      if (user && courseId) {
        localStorage.setItem(`module-scores-${courseId}-${user.id}`, JSON.stringify(mergedScores));
        console.log('💾 Cached merged scores to localStorage');
      }
    } catch (error) {
      console.error('❌ Error fetching scores:', error);
      setLastError('Failed to load scores');
      // Fallback to local storage
      const localScores = loadLocalScores();
      setScores(localScores);
    } finally {
      setLoading(false);
    }
  }, [user, courseId, getDbCourseId, testDatabaseConnection, loadLocalScores]);

  // Fetch course summary
  const fetchCourseSummary = useCallback(async () => {
    if (!user || !courseId) return;
    
    const dbCourseId = getDbCourseId(courseId);
    if (!dbCourseId) {
      console.warn('No database course ID found for course summary:', courseId);
      return;
    }

    if (!dbAvailable) {
      // Calculate summary from local scores
      const localScores = loadLocalScores();
      if (localScores.length > 0) {
        const totalScore = localScores.reduce((sum, s) => sum + s.score, 0);
        const totalPoints = localScores.reduce((sum, s) => sum + s.total_points, 0);
        const averagePercentage = totalPoints > 0 ? (totalScore / totalPoints) * 100 : 0;
        
        // Calculate completed modules properly
        const moduleScores = localScores.reduce((acc, score) => {
          if (!acc[score.module_id]) {
            acc[score.module_id] = [];
          }
          acc[score.module_id].push(score);
          return acc;
        }, {} as Record<number, ModuleScore[]>);

        // Count modules that have any scores (completed)
        const completedModules = Object.keys(moduleScores).length;
        
        console.log('📊 Course Summary Calculation:', {
          localScores: localScores.length,
          moduleScores: Object.keys(moduleScores),
          completedModules,
          totalScore,
          totalPoints,
          averagePercentage
        });

        const summary: CourseScoreSummary = {
          user_id: user.id,
          course_id: dbCourseId,
          completed_modules: completedModules,
          total_score: totalScore,
          total_possible_points: totalPoints,
          average_percentage: averagePercentage,
          overall_grade: averagePercentage >= 90 ? 'A' : 
                        averagePercentage >= 80 ? 'B' : 
                        averagePercentage >= 70 ? 'C' : 
                        averagePercentage >= 60 ? 'D' : 'F'
        };
        setCourseSummary(summary);
      }
      return;
    }

    try {
      const { data, error } = await supabase
        .from('course_score_summary')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', dbCourseId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching course summary:', error);
        return;
      }

      setCourseSummary(data);
      
      // Cache the course summary for instant loading on refresh
      if (user && courseId) {
        localStorage.setItem(`course-summary-${courseId}-${user.id}`, JSON.stringify(data));
        console.log('💾 Cached course summary to localStorage');
      }
    } catch (error) {
      console.error('Error fetching course summary:', error);
    }
  }, [user, courseId, getDbCourseId, dbAvailable, loadLocalScores]);

  // Submit or update a score for a quiz/assignment
  const submitScore = useCallback(async (moduleId: number, lessonId: number, score: number, totalPoints: number = 100) => {
    if (!user || !courseId) {
      console.warn('No user or courseId for score submission');
      return false;
    }
    
    const dbCourseId = getDbCourseId(courseId);
    if (!dbCourseId) {
      console.warn('No database course ID found for score submission:', courseId);
      return false;
    }

    const percentage = (score / totalPoints) * 100;
    const grade = percentage >= 90 ? 'A' : 
                 percentage >= 80 ? 'B' : 
                 percentage >= 70 ? 'C' : 
                 percentage >= 60 ? 'D' : 'F';

    const newScore: ModuleScore = {
      id: `local-${Date.now()}`,
      user_id: user.id,
      course_id: dbCourseId,
      module_id: moduleId,
      lesson_id: lessonId,
      score: score,
      total_points: totalPoints,
      percentage: percentage,
      grade: grade,
      completed_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('🎯 Submitting new score:', {
      moduleId,
      lessonId,
      score,
      totalPoints,
      percentage,
      grade,
      dbCourseId
    });

    // Always save to local storage first for immediate persistence
    saveLocalScore(newScore);

    // Update local state IMMEDIATELY for instant UI feedback
    setScores(prev => {
      const filtered = prev.filter(s => 
        !(s.module_id === moduleId && s.lesson_id === lessonId)
      );
      const updatedScores = [newScore, ...filtered];
      
      // Update cache immediately
      if (user && courseId) {
        localStorage.setItem(`module-scores-${courseId}-${user.id}`, JSON.stringify(updatedScores));
        console.log('💾 Updated cached scores immediately after submission');
      }
      
      return updatedScores;
    });

    // Update course summary immediately
    setCourseSummary(prev => {
      if (!prev) {
        // Create new summary if none exists
        const newSummary: CourseScoreSummary = {
          user_id: user.id,
          course_id: dbCourseId,
          completed_modules: 1,
          total_score: score,
          total_possible_points: totalPoints,
          average_percentage: percentage,
          overall_grade: grade
        };
        
        if (user && courseId) {
          localStorage.setItem(`course-summary-${courseId}-${user.id}`, JSON.stringify(newSummary));
        }
        
        return newSummary;
      } else {
        // Update existing summary
        const updatedSummary = {
          ...prev,
          total_score: prev.total_score + score,
          total_possible_points: prev.total_possible_points + totalPoints,
          average_percentage: ((prev.total_score + score) / (prev.total_possible_points + totalPoints)) * 100
        };
        
        // Recalculate overall grade
        if (updatedSummary.average_percentage >= 90) updatedSummary.overall_grade = 'A';
        else if (updatedSummary.average_percentage >= 80) updatedSummary.overall_grade = 'B';
        else if (updatedSummary.average_percentage >= 70) updatedSummary.overall_grade = 'C';
        else if (updatedSummary.average_percentage >= 60) updatedSummary.overall_grade = 'D';
        else updatedSummary.overall_grade = 'F';
        
        if (user && courseId) {
          localStorage.setItem(`course-summary-${courseId}-${user.id}`, JSON.stringify(updatedSummary));
        }
        
        return updatedSummary;
      }
    });

    // Show success toast immediately
    toast({
      title: "Score Saved Successfully! 🎉",
      description: `You scored ${score}/${totalPoints} (${Math.round(percentage)}%) - Grade: ${grade}`,
    });

    // Try to save to database in background (non-blocking)
    if (dbAvailable) {
      try {
        console.log('🔄 Submitting score to database in background...');

        const { data, error } = await supabase
          .from('module_scores')
          .upsert({
            user_id: user.id,
            course_id: dbCourseId,
            module_id: moduleId,
            lesson_id: lessonId,
            score: score,
            total_points: totalPoints,
            percentage: percentage,
            grade: grade,
            completed_at: new Date().toISOString()
          }, {
            onConflict: 'user_id,course_id,module_id,lesson_id'
          });

        if (error) {
          console.error('❌ Error submitting score to database:', error);
          setDbAvailable(false);
          // Don't fail the operation - local storage is sufficient
        } else {
          console.log('✅ Score submitted successfully to database:', data);
        }
      } catch (error) {
        console.error('❌ Error submitting score to database:', error);
        setDbAvailable(false);
        // Don't fail the operation - local storage is sufficient
      }
    }
    
    return true;
  }, [user, courseId, getDbCourseId, dbAvailable, saveLocalScore, toast]);

  // Get grade color for UI display
  const getGradeColor = useCallback((grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-100 border-green-300';
      case 'B': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'C': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'D': return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'F': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  }, []);

  // Get score for a specific module and lesson
  const getScore = useCallback((moduleId: number, lessonId: number) => {
    return scores.find(s => s.module_id === moduleId && s.lesson_id === lessonId);
  }, [scores]);

  // Calculate module average
  const getModuleAverage = useCallback((moduleId: number) => {
    const moduleScores = scores.filter(s => s.module_id === moduleId);
    if (moduleScores.length === 0) return null;
    
    const totalScore = moduleScores.reduce((sum, s) => sum + s.score, 0);
    const totalPossible = moduleScores.reduce((sum, s) => sum + s.total_points, 0);
    const percentage = (totalScore / totalPossible) * 100;
    
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    
    return {
      score: totalScore,
      totalPoints: totalPossible,
      percentage: Math.round(percentage * 100) / 100,
      grade
    };
  }, [scores]);

  // Test function to verify scoring system is working
  const testScoringSystem = useCallback(async () => {
    if (!user || !courseId) {
      console.warn('Cannot test scoring system: no user or courseId');
      return false;
    }
    
    console.log('🧪 Testing scoring system...');
    
    // Test 1: Check if we can submit a score
    const testResult = await submitScore(1, 1, 8, 10);
    console.log('Test 1 - Score submission:', testResult ? 'PASSED' : 'FAILED');
    
    // Test 2: Check if scores are loaded
    await fetchScores();
    console.log('Test 2 - Score loading:', scores.length > 0 ? 'PASSED' : 'FAILED');
    
    // Test 3: Check if course summary is loaded
    await fetchCourseSummary();
    console.log('Test 3 - Course summary:', courseSummary ? 'PASSED' : 'FAILED');
    
    console.log('🧪 Scoring system test completed');
    return testResult && scores.length > 0 && courseSummary;
  }, [user, courseId, submitScore, fetchScores, fetchCourseSummary, scores.length, courseSummary]);

  useEffect(() => {
    if (user && courseId) {
      console.log('🔄 Initializing scores for course:', courseId);
      
      // Always fetch fresh data from database first
      fetchScores();
      fetchCourseSummary();
      
      // Also load cached data as fallback for instant display
      const cachedScores = localStorage.getItem(`module-scores-${courseId}-${user.id}`);
      const cachedSummary = localStorage.getItem(`course-summary-${courseId}-${user.id}`);
      
      if (cachedScores && scores.length === 0) {
        console.log('📦 Loading cached scores as fallback');
        try {
          const parsedScores = JSON.parse(cachedScores);
          setScores(parsedScores);
        } catch (error) {
          console.warn('Error parsing cached scores:', error);
        }
      }
      
      if (cachedSummary && !courseSummary) {
        console.log('📦 Loading cached summary as fallback');
        try {
          const parsedSummary = JSON.parse(cachedSummary);
          setCourseSummary(parsedSummary);
        } catch (error) {
          console.warn('Error parsing cached summary:', error);
        }
      }
    }
  }, [user, courseId, fetchScores, fetchCourseSummary]);

  return {
    scores,
    courseSummary,
    loading,
    dbAvailable,
    lastError,
    submitScore,
    getGradeColor,
    getScore,
    getModuleAverage,
    fetchScores,
    fetchCourseSummary,
    testScoringSystem
  };
};