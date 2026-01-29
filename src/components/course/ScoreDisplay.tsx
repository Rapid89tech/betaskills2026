import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, BarChart3, Database, HardDrive } from 'lucide-react';
import { CourseScoreSummary, ModuleScore } from '@/hooks/useModuleScores';
import { useCourseData } from '@/hooks/useCourseData';

interface ScoreDisplayProps {
  courseSummary: CourseScoreSummary | null;
  moduleScores: ModuleScore[];
  getGradeColor: (grade: string) => string;
  courseTitle: string;
  dbAvailable?: boolean;
  lastError?: string | null;
}

const ScoreDisplay = ({ 
  courseSummary, 
  moduleScores, 
  getGradeColor, 
  courseTitle,
  dbAvailable = true,
  lastError = null
}: ScoreDisplayProps) => {
  // Group scores by module
  const scoresByModule = moduleScores.reduce((acc, score) => {
    const moduleId = score.module_id;
    if (!acc[moduleId]) {
      acc[moduleId] = [];
    }
    acc[moduleId].push(score);
    return acc;
  }, {} as Record<number, ModuleScore[]>);

  // Calculate module averages
  const moduleAverages = Object.entries(scoresByModule).map(([moduleId, scores]) => {
    const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
    const totalPossible = scores.reduce((sum, s) => sum + s.total_points, 0);
    const percentage = totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0;
    
    let grade = 'F';
    if (percentage >= 90) grade = 'A';
    else if (percentage >= 80) grade = 'B';
    else if (percentage >= 70) grade = 'C';
    else if (percentage >= 60) grade = 'D';
    
    return {
      moduleId: parseInt(moduleId),
      score: totalScore,
      totalPoints: totalPossible,
      percentage: Math.round(percentage * 100) / 100,
      grade,
      lessonCount: scores.length
    };
  }).sort((a, b) => a.moduleId - b.moduleId);

  // Get course data to count quiz questions
  const { course } = useCourseData();
  let totalQuizQuestions = 0;
  if (course) {
    totalQuizQuestions = course.modules.reduce((sum, module) => {
      return sum + module.lessons.reduce((lessonSum, lesson) => {
        if (lesson.type === 'quiz' && lesson.content && Array.isArray(lesson.content.questions)) {
          return lessonSum + lesson.content.questions.length;
        }
        return lessonSum;
      }, 0);
    }, 0);
  }

  if (!courseSummary && moduleScores.length === 0) {
    return null; // Don't show anything if no scores exist for this course
  }

  return (
    <div className="space-y-6 score-display-stable">
      {/* Database Status Indicator */}
      {!dbAvailable && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 card-stable">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-300 text-sm">
              <HardDrive className="w-4 h-4" />
              Offline Mode
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-amber-600 dark:text-amber-400 text-sm">
              Scores are being saved locally. They will sync when the database connection is restored.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {lastError && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800 card-stable">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300 text-sm">
              <Database className="w-4 h-4" />
              Database Error
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-red-600 dark:text-red-400 text-sm">
              {lastError}. Using local storage as fallback.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Modern Course Completion Tracker */}
      {courseSummary && (
        <Card className="border-2 border-primary/20 shadow-lg card-stable">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Trophy className="h-6 w-6 text-yellow-600" />
              Course Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
              {/* Animated Circular Progress */}
              <div className="relative w-[160px] h-[160px] flex-shrink-0">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 160 160">
                  <circle cx="80" cy="80" r="70" fill="#f3f4f6" />
                  <circle
                    cx="80" cy="80" r="70" fill="none"
                    stroke="url(#course-progress-gradient)"
                    strokeWidth="14"
                    strokeDasharray={2 * Math.PI * 70}
                    strokeDashoffset={2 * Math.PI * 70 * (1 - (courseSummary.average_percentage / 100))}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-in-out"
                    style={{ filter: 'drop-shadow(0 0 8px #a5b4fc)' }}
                  />
                  <defs>
                    <linearGradient id="course-progress-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#a21caf" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 animate-pulse">
                    {Math.round(courseSummary.average_percentage)}%
                  </span>
                  <span className="text-base font-semibold text-gray-700 dark:text-gray-200 mt-1 text-stable">Avg. Score</span>
                </div>
              </div>
              {/* Stats */}
              <div className="flex flex-col items-center md:items-start gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary">
                    {courseSummary.completed_modules}
                  </span>
                  <span className="text-lg text-gray-600">/ modules completed</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xl py-1 px-4 font-bold transition-transform duration-200 group-hover:scale-110 group-hover:shadow-lg ${getGradeColor(courseSummary.overall_grade)}`}
                  >
                    {courseSummary.overall_grade}
                  </Badge>
                  <span className="text-base text-gray-600">Grade</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Module Scores Summary */}
      {moduleAverages.length > 0 && (
        <Card className="card-stable">
          <CardHeader>
            <CardTitle>Module Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moduleAverages.map((mod, idx) => (
                <div
                  key={mod.moduleId}
                  className="flex items-center justify-between p-5 rounded-2xl bg-white/70 dark:bg-gray-800/80 shadow-xl border border-blue-200/40 dark:border-blue-900/40 glassmorphism-card transition-all duration-300 hover:scale-[1.015] hover:shadow-2xl group relative overflow-hidden card-stable"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  {/* Shine effect on hover */}
                  <span className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-r from-white/60 via-blue-100/30 to-transparent blur-sm" />
                  <div className="flex-1">
                    <div className="font-medium text-lg text-stable">
                      Module {mod.moduleId}{course && course.modules[mod.moduleId-1] ? `: ${course.modules[mod.moduleId-1].title}` : ''}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-semibold text-xl text-stable">
                      {mod.score}/{mod.totalPoints} ({mod.percentage}%)
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-base py-1 px-4 font-bold transition-transform duration-200 group-hover:scale-110 group-hover:shadow-lg ${getGradeColor(mod.grade)}`}
                    >
                      {mod.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ScoreDisplay;