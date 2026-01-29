import React from 'react';
import { Progress } from '@/components/ui/progress';
import type { Course } from '@/types/course';

interface SidebarProgressProps {
  progress: number;
  completedLessons: number[];
  course: Course;
}

const SidebarProgress = ({ progress, completedLessons, course }: SidebarProgressProps) => {
  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600 dark:text-gray-400 font-medium">Overall Progress</span>
        <div className="flex items-center gap-2">
          <span className="text-green-600 font-bold text-lg animate-scale-in">{Math.round(progress)}%</span>
          {progress > 0 && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span className="font-medium">
          <span className="text-green-600 font-bold">{completedLessons.length}</span> lessons completed
        </span>
        <span>{totalLessons} total lessons</span>
      </div>
      
      {progress === 100 && (
        <div className="text-center p-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg animate-scale-in">
          <span className="text-green-700 font-bold text-sm">🎉 Course Complete!</span>
        </div>
      )}
    </div>
  );
};

export default SidebarProgress;
