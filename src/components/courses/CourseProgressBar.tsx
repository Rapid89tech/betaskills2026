import React, { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { useStableProgress } from '@/hooks/useStableProgress';
import { useAuth } from '@/hooks/AuthContext';
import { getCourseProgress } from '@/utils/enrollmentPersistence';

interface CourseProgressBarProps {
  courseId: string;
  enrolled: boolean;
  className?: string;
}

const CourseProgressBar = ({ courseId, enrolled, className }: CourseProgressBarProps) => {
  const { user } = useAuth();
  const { progress: stableProgress } = useStableProgress(courseId);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!courseId) return;

    // Get progress from multiple sources with fallback
    const getProgressValue = () => {
      // 1. Try stable progress hook first
      if (stableProgress !== undefined && stableProgress >= 0) {
        return stableProgress;
      }

      // 2. Try persistence utility
      const userId = user?.id || user?.email;
      const persistedProgress = getCourseProgress(courseId, userId);
      if (persistedProgress > 0) {
        return persistedProgress;
      }

      return 0;
    };

    const currentProgress = getProgressValue();
    setProgress(currentProgress);

    // Listen for progress updates
    const handleProgressUpdate = (event: CustomEvent) => {
      if (event.detail.courseId === courseId) {
        setProgress(Math.round(event.detail.progress || 0));
      }
    };

    window.addEventListener('progress-updated', handleProgressUpdate as EventListener);
    
    return () => {
      window.removeEventListener('progress-updated', handleProgressUpdate as EventListener);
    };
  }, [courseId, stableProgress, user]);

  // Only show progress bar if user is enrolled
  if (!enrolled) {
    return null;
  }

  // Ensure progress is a valid number between 0 and 100
  const validProgress = Math.min(100, Math.max(0, progress || 0));

  return (
    <div className={`flex-1 flex flex-col gap-1 ${className}`}>
      <Progress 
        value={validProgress} 
        className="h-2 bg-neutral-700"
      />
      <span className="text-[10px] text-gray-400 mt-1">
        Progress: {Math.round(validProgress)}%
      </span>
    </div>
  );
};

export default CourseProgressBar;
