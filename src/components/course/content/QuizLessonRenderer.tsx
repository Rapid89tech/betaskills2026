
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import QuizComponent from '../QuizComponent';
import type { QuizLesson } from '@/types/course';

interface QuizLessonRendererProps {
  lesson: QuizLesson;
  isCompleted: boolean;
  hasAttempted: boolean;
  onMarkComplete: () => void;
  onNext: () => void;
  moduleId: number;
  lessonId: number;
  courseId?: string;
}

const QuizLessonRenderer = ({ lesson, isCompleted, hasAttempted, onMarkComplete, onNext, moduleId, lessonId, courseId: propCourseId }: QuizLessonRendererProps) => {
  const { courseId: paramCourseId } = useParams<{ courseId: string }>();
  const courseId = propCourseId || paramCourseId;
  const handleContinueToNext = () => {
    // If quiz was attempted but not passed, we still need to mark it complete to proceed
    if (hasAttempted && !isCompleted) {
      onMarkComplete(); // Mark current lesson as complete
    }
    // Then navigate to next lesson
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onNext();
    }, 100);
  };

  if (hasAttempted && !isCompleted) {
    return (
      <Card className="border-amber-200 bg-amber-50 animate-fade-in hover-scale transition-all duration-300">
        <CardContent className="p-6 text-center">
          <div className="space-y-4 animate-scale-in">
            <div className="mx-auto w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold text-amber-800">Quiz Already Attempted</h3>
              <p className="text-amber-700">
                You have already taken this quiz. You can only attempt each quiz once. Please proceed to the next lesson.
              </p>
            </div>
            <Button 
              onClick={handleContinueToNext} 
              className="bg-amber-600 hover:bg-amber-700 hover-scale transition-all duration-200 animate-fade-in"
              style={{ animationDelay: '0.4s' }}
            >
              Continue to Next Lesson
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="animate-fade-in">
      <QuizComponent 
        lesson={lesson}
        onComplete={onMarkComplete}
        onNext={onNext}
        moduleId={moduleId}
        lessonId={lessonId}
        courseId={courseId}
      />
    </div>
  );
};

export default QuizLessonRenderer;
