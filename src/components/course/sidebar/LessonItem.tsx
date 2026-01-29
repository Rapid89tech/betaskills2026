import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, CheckCircle, FileText, Award, Clock } from 'lucide-react';
import type { Lesson } from '@/types/course';
import { useModuleScores } from '@/hooks/useModuleScores';

interface LessonItemProps {
  lesson: Lesson;
  lessonIndex: number;
  isCompleted: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

const LessonItem = ({ lesson, lessonIndex, isCompleted, isCurrent, onClick }: LessonItemProps) => {
  const { scores, getScore, getGradeColor } = useModuleScores();
  let quizScore = null;
  if (lesson.type === 'quiz') {
    // Find the latest score for this lesson
    quizScore = scores.find(s => s.lesson_id === lesson.id || s.lesson_id === lessonIndex);
  }

  const getLessonIcon = () => {
    switch (lesson.type) {
      case 'video': return <PlayCircle className="h-4 w-4" />;
      case 'quiz': return <FileText className="h-4 w-4" />;
      case 'assignment': return <Award className="h-4 w-4" />;
      default: return <PlayCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = () => {
    if (isCompleted) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
    return null;
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-left transition-all duration-300 border-l-4 group relative overflow-hidden animate-fade-in-up
        ${isCurrent ? 'border-l-primary bg-gradient-to-r from-blue-100/80 to-purple-100/60 dark:from-blue-900/40 dark:to-purple-900/30 shadow-xl scale-[1.03] ring-2 ring-primary/30 z-10' : 'border-l-transparent'}
        ${isCompleted ? 'bg-green-50 dark:bg-green-900/10' : 'bg-white/60 dark:bg-gray-800/60'}
        hover:scale-[1.01] hover:shadow-lg active:scale-100 focus:outline-none glassmorphism-card`}
      style={{ borderRadius: '1rem', marginBottom: '0.5rem' }}
    >
      {/* Shine effect on hover */}
      <span className="pointer-events-none absolute left-0 top-0 h-full w-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-r from-white/60 via-blue-100/30 to-transparent blur-sm" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-primary/10 transition-colors">
            {getLessonIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`font-medium text-sm mb-1 line-clamp-2 ${
              isCurrent 
                ? 'text-primary drop-shadow-md'
                : 'text-gray-900 dark:text-white'
            }`}>
              {lesson.title}
            </h4>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs px-2 py-0.5">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.duration}
              </Badge>
              <Badge variant="outline" className="text-xs px-2 py-0.5 capitalize">
                {lesson.type}
              </Badge>
              {/* Quiz Score Badge */}
              {quizScore && (
                <span className="ml-2 flex items-center gap-1 animate-fade-in">
                  <svg width="28" height="28" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="12" fill="#f3f4f6" />
                    <circle
                      cx="14" cy="14" r="12" fill="none" stroke="#a5b4fc" strokeWidth="3"
                      strokeDasharray={2 * Math.PI * 12}
                      strokeDashoffset={2 * Math.PI * 12 * (1 - (quizScore.percentage / 100))}
                      strokeLinecap="round"
                      className="transition-all duration-700"
                    />
                  </svg>
                  <span className="text-xs font-bold text-blue-700">{Math.round(quizScore.percentage)}%</span>
                  <span className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold border ${getGradeColor(quizScore.grade)}`}>{quizScore.grade}</span>
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-2">
          {getStatusIcon()}
          {isCurrent && (
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          )}
        </div>
      </div>
    </button>
  );
};

export default LessonItem;
