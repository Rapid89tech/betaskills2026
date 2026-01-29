
import React from 'react';
import { useParams } from 'react-router-dom';
import QuizComponent from './QuizComponent';
import VideoLessonContent from './content/VideoLessonContent';
import type { Lesson, QuizLesson, VideoLesson } from '@/types/course';

interface InteractiveContentProps {
  lesson: Lesson;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onNext: () => void;
  moduleId: number;
  lessonId: number;
  courseId?: string;
}

const InteractiveContent = ({ lesson, isCompleted, onMarkComplete, onNext, moduleId, lessonId, courseId: propCourseId }: InteractiveContentProps) => {
  const { courseId: paramCourseId } = useParams<{ courseId: string }>();
  const courseId = propCourseId || paramCourseId;
  
  if (lesson.type === 'quiz') {
    return (
      <QuizComponent 
        lesson={lesson as QuizLesson}
        onComplete={onMarkComplete}
        onNext={onNext}
        moduleId={moduleId}
        lessonId={lessonId}
        courseId={courseId}
      />
    );
  }

  if (lesson.type === 'video') {
    return (
      <VideoLessonContent
        lesson={lesson as VideoLesson}
        isCompleted={isCompleted}
        onMarkComplete={onMarkComplete}
        onNext={onNext}
      />
    );
  }

  return null;
};

export default InteractiveContent;
