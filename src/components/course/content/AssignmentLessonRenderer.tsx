
import React from 'react';
import AssignmentUpload from '../AssignmentUpload';
import type { AssignmentLesson } from '@/types/course';

interface AssignmentLessonRendererProps {
  lesson: AssignmentLesson;
  isCompleted: boolean;
  onMarkComplete: () => void;
}

const AssignmentLessonRenderer = ({ lesson, isCompleted, onMarkComplete }: AssignmentLessonRendererProps) => {
  return (
    <AssignmentUpload
      assignmentTitle={lesson.content.title}
      requirements={lesson.content.requirements}
      deliverables={lesson.content.deliverables}
      rubric={lesson.content.rubric}
      isCompleted={isCompleted}
      onComplete={onMarkComplete}
    />
  );
};

export default AssignmentLessonRenderer;
