import React from 'react';

interface ProgressIndicatorProps {
  isAnimating: boolean;
  currentIndex: number;
  totalSections: number;
}

const ProgressIndicator = ({ isAnimating, currentIndex, totalSections }: ProgressIndicatorProps) => {
  if (!isAnimating) return null;

  const progress = (currentIndex / totalSections) * 100;

  return (
    <div className="relative bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-purple-900/20 dark:to-indigo-900/20 px-8 py-6 border-t border-indigo-200/50">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 animate-pulse"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          <span className="flex items-center gap-2">
            📚 Learning Progress 
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 animate-pulse">
              Active
            </span>
          </span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">
            {currentIndex} of {totalSections} sections ✨
          </span>
        </div>
        
        {/* Ultra-Modern Progress Bar */}
        <div className="relative w-full h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-full overflow-hidden shadow-inner">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-200/50 via-purple-200/50 to-indigo-200/50 animate-pulse"></div>
          
          {/* Progress Fill */}
          <div 
            className="relative h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full transition-all duration-500 ease-out shadow-lg"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 rounded-full animate-pulse opacity-75"></div>
            
            {/* Moving Highlight */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[shimmer_2s_ease-in-out_infinite] rounded-full"></div>
          </div>
          
          {/* Progress Indicator Dot */}
          {progress > 0 && (
            <div 
              className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-indigo-500 animate-bounce transition-all duration-500"
              style={{ left: `calc(${progress}% - 8px)` }}
            >
              <div className="absolute inset-1 bg-indigo-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;