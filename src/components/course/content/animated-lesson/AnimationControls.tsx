import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, CheckCircle, Scroll } from 'lucide-react';

interface AnimationControlsProps {
  isAnimating: boolean;
  isPaused: boolean;
  animationComplete: boolean;
  displayedContent: string;
  lessonTitle?: string;
  onStart: () => void;
  onScrollStart: () => void;
  onTogglePause: () => void;
  onReset: () => void;
  onComplete: () => void;
}

const AnimationControls = ({ 
  isAnimating, 
  isPaused, 
  animationComplete, 
  displayedContent, 
  lessonTitle,
  onStart, 
  onScrollStart,
  onTogglePause, 
  onReset, 
  onComplete 
}: AnimationControlsProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-gray-800 dark:via-blue-900/30 dark:to-purple-900/30 p-6 border border-blue-200/50 shadow-xl backdrop-blur-sm">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-2 right-2 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full animate-bounce [animation-delay:1s]"></div>
      </div>

      <div className="relative z-10 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          {!displayedContent && (
            <Button 
              onClick={onScrollStart}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white shadow-2xl hover:shadow-purple-500/25 transform transition-all duration-300 hover:scale-105 rounded-xl px-6 py-3 font-semibold"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <Scroll className="w-5 h-5 mr-3 animate-bounce" />
              🚀 Continue with {lessonTitle || "Learning Journey"}
            </Button>
          )}
          
          {isAnimating && (
            <Button
              onClick={onTogglePause}
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-amber-500/25 border-0 transform transition-all duration-200 hover:scale-105 rounded-xl px-5 py-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              {isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
              {isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </Button>
          )}
          
          {displayedContent && (
            <Button
              onClick={onReset}
              className="group relative overflow-hidden bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white shadow-lg hover:shadow-gray-500/25 border-0 transform transition-all duration-200 hover:scale-105 rounded-xl px-5 py-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <RotateCcw className="w-4 h-4 mr-2" />
              🔄 Reset
            </Button>
          )}
        </div>
        

      </div>
    </div>
  );
};

export default AnimationControls;