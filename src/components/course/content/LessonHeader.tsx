
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, FileText, Award, BookOpen, Star } from 'lucide-react';
import type { Lesson } from '@/types/course';

interface LessonHeaderProps {
  lesson: Lesson;
  isCompleted: boolean;
  hasAttempted?: boolean;
}

const LessonHeader = ({ lesson, isCompleted, hasAttempted = false }: LessonHeaderProps) => {
  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-5 w-5" />;
      case 'quiz': return <FileText className="h-5 w-5" />;
      case 'assignment': return <Award className="h-5 w-5" />;
      case 'certificate': return <Star className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  return (
    <div className="flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center hover-scale transition-all duration-300">
          {getLessonIcon(lesson.type)}
        </div>
        <div className="animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-medium story-link">{lesson.title}</h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 hover-scale">
              <Clock className="h-4 w-4" />
              {lesson.duration}
            </span>
            <Badge 
              variant={isCompleted ? "default" : "secondary"} 
              className={`animate-scale-in hover-scale transition-all duration-200 ${
                isCompleted ? 'bg-green-600' : ''
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              {isCompleted ? "Completed" : lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1)}
            </Badge>
            {hasAttempted && lesson.type === 'quiz' && (
              <Badge 
                variant="outline" 
                className="animate-scale-in hover-scale"
                style={{ animationDelay: '0.3s' }}
              >
                Attempted
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonHeader;
