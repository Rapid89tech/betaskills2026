import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';

interface LessonActionsProps {
  contentCompleted: boolean;
  isCompleted: boolean;
  onMarkComplete: () => void;
  onNext: () => void;
}

const LessonActions = ({ contentCompleted, isCompleted, onMarkComplete, onNext }: LessonActionsProps) => {
  if (!contentCompleted) return null;

  return (
    <div className="flex items-center justify-between mt-6 animate-fade-in bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl p-4 shadow-lg border border-blue-200/50 dark:border-blue-700/30" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center gap-4">
        {!isCompleted && (
          <Button 
            onClick={onMarkComplete} 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover-scale transition-all duration-300 shadow-lg hover:shadow-xl text-white font-semibold px-5 py-2.5 rounded-lg transform hover:scale-105"
          >
            <CheckCircle className="h-4 w-4 mr-2 animate-pulse" />
            ✨ Mark as Complete & Continue
          </Button>
        )}
        {isCompleted && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-green-700 dark:text-green-400 font-semibold">
              <CheckCircle className="h-4 w-4 text-green-600 animate-bounce" />
              🎉 Lesson Completed!
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold animate-scale-in">
              ✨ 100% Complete
            </div>
          </div>
        )}
      </div>
      {isCompleted && (
        <Button 
          onClick={onNext} 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale transition-all duration-300 shadow-lg hover:shadow-xl text-white font-semibold px-5 py-2.5 rounded-lg transform hover:scale-105"
        >
          🚀 Next Lesson
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default LessonActions;