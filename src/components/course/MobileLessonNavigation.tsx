/**
 * MobileLessonNavigation Component
 * 
 * Fixed bottom navigation bar for mobile course navigation with:
 * - Prev/Next buttons with 44x44px minimum touch targets
 * - Current lesson indicator
 * - Swipe gesture support for navigation
 * 
 * Requirements: 2.2, 2.4
 */

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Lesson } from '@/types/course';

export interface MobileLessonNavigationProps {
  currentLesson: Lesson | undefined;
  currentLessonIndex: number;
  totalLessons: number;
  previousLesson: Lesson | null;
  nextLesson: Lesson | null;
  onNavigatePrev: () => void;
  onNavigateNext: () => void;
  onToggleSidebar?: () => void;
  progress: number;
  canNavigateNext: boolean;
  canNavigatePrev: boolean;
}

const MobileLessonNavigation: React.FC<MobileLessonNavigationProps> = ({
  currentLesson,
  currentLessonIndex,
  totalLessons,
  previousLesson,
  nextLesson,
  onNavigatePrev,
  onNavigateNext,
  onToggleSidebar,
  progress,
  canNavigateNext,
  canNavigatePrev,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance to trigger navigation (in pixels)
  const minSwipeDistance = 50;

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0]?.clientX ?? null);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0]?.clientX ?? null);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && canNavigateNext) {
      // Swipe left = go to next lesson
      onNavigateNext();
    } else if (isRightSwipe && canNavigatePrev) {
      // Swipe right = go to previous lesson
      onNavigatePrev();
    }

    // Reset touch state
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, canNavigateNext, canNavigatePrev, onNavigateNext, onNavigatePrev]);

  // Attach swipe gesture listeners to the document for broader swipe detection
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add listeners to the navigation container
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Calculate lesson position for display
  const lessonPosition = currentLessonIndex + 1;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg md:hidden"
      role="navigation"
      aria-label="Lesson navigation"
    >
      {/* Progress bar at top of navigation */}
      <div className="px-4 pt-2">
        <Progress value={progress} className="h-1" />
      </div>

      {/* Navigation content */}
      <div className="flex items-center justify-between px-4 py-2 min-h-[60px]">
        {/* Previous button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNavigatePrev}
          disabled={!canNavigatePrev}
          className="touch-target-icon flex-shrink-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40"
          aria-label={previousLesson ? `Previous: ${previousLesson.title}` : 'No previous lesson'}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        {/* Current lesson indicator */}
        <div className="flex-1 mx-3 text-center min-w-0">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
            Lesson {lessonPosition} of {totalLessons}
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {currentLesson?.title || 'Loading...'}
          </p>
        </div>

        {/* Next button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onNavigateNext}
          disabled={!canNavigateNext}
          className="touch-target-icon flex-shrink-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40"
          aria-label={nextLesson ? `Next: ${nextLesson.title}` : 'No next lesson'}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Sidebar toggle button (optional) */}
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="touch-target-icon flex-shrink-0 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 ml-2"
            aria-label="Toggle course menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Swipe hint indicator (shows briefly on first render) */}
      <SwipeHint />
    </div>
  );
};

/**
 * SwipeHint Component
 * Shows a brief visual hint about swipe navigation on first render
 */
const SwipeHint: React.FC = () => {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    // Check if user has seen the hint before
    const hasSeenHint = localStorage.getItem('mobile-lesson-nav-hint-seen');
    
    if (!hasSeenHint) {
      setShowHint(true);
      // Hide hint after 3 seconds
      const timer = setTimeout(() => {
        setShowHint(false);
        localStorage.setItem('mobile-lesson-nav-hint-seen', 'true');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (!showHint) return null;

  return (
    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-full animate-pulse">
      Swipe left/right to navigate
    </div>
  );
};

export default MobileLessonNavigation;
