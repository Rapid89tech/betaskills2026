import React from 'react';
import { Progress } from '@/components/ui/progress';
import { useStableProgress } from '@/hooks/useStableProgress';

interface CourseCardProgressProps {
  courseId: string;
  enrolled: boolean;
}

const CourseCardProgress = ({ courseId, enrolled }: CourseCardProgressProps) => {
  const { progress } = useStableProgress(courseId);

  // Only show progress if user is enrolled
  if (!enrolled) {
    return null;
  }

  // Ensure progress is a valid number between 0 and 100
  const validProgress = Math.min(100, Math.max(0, progress || 0));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>Progress</span>
        <span className="font-medium">{Math.round(validProgress)}%</span>
      </div>
      <Progress value={validProgress} className="h-2" />
    </div>
  );
};

export default CourseCardProgress;
