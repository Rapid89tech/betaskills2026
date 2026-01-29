import React, { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, BookOpen, Play, CheckCircle, Clock, X, Award, Download } from 'lucide-react';
import type { Course } from '@/types/course';
// Import mobile styles for responsive utilities
import '@/styles/mobile.css';

interface CourseSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  course: Course;
  progress: number;
  currentLesson: number;
  setCurrentLesson: (lesson: number) => void;
  completedLessons: number[];
}

const CourseSidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  course, 
  progress, 
  currentLesson, 
  setCurrentLesson, 
  completedLessons 
}: CourseSidebarProps) => {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Swipe gesture state for mobile - Requirements 2.1
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isSwiping = useRef<boolean>(false);

  // Handle swipe gesture to close sidebar on mobile - Requirements 2.1
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.innerWidth >= 768) return; // Only on mobile
    
    const touch = e.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
      touchStartY.current = touch.clientY;
      isSwiping.current = false;
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (window.innerWidth >= 768) return; // Only on mobile
    if (touchStartX.current === null || touchStartY.current === null) return;
    
    const touch = e.touches[0];
    if (!touch) return;
    
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;
    
    // Detect horizontal swipe (left swipe to close)
    // Only trigger if horizontal movement is greater than vertical (to avoid interfering with scroll)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      isSwiping.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (window.innerWidth >= 768) return; // Only on mobile
    if (touchStartX.current === null) return;
    
    const touch = e.changedTouches[0];
    if (!touch) return;
    
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touchStartY.current !== null ? touch.clientY - touchStartY.current : 0;
    
    // Swipe left to close (negative deltaX) with threshold of 50px
    // Only close if horizontal movement is dominant
    if (isSwiping.current && deltaX < -50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      setSidebarOpen(false);
    }
    
    // Reset touch state
    touchStartX.current = null;
    touchStartY.current = null;
    isSwiping.current = false;
  }, [setSidebarOpen]);

  // Attach swipe gesture listeners to sidebar
  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar || !sidebarOpen) return;
    
    sidebar.addEventListener('touchstart', handleTouchStart, { passive: true });
    sidebar.addEventListener('touchmove', handleTouchMove, { passive: true });
    sidebar.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      sidebar.removeEventListener('touchstart', handleTouchStart);
      sidebar.removeEventListener('touchmove', handleTouchMove);
      sidebar.removeEventListener('touchend', handleTouchEnd);
    };
  }, [sidebarOpen, handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        if (window.innerWidth < 768) {
          setSidebarOpen(false);
        }
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen, setSidebarOpen]);

  const totalLessons = course.modules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedCount = completedLessons.length;

  return (
    <>
      {/* Mobile Overlay - Only show on mobile when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Now uses flex layout with width transitions */}
      <div
        ref={sidebarRef}
        className={`h-full transition-all duration-300 ease-out bg-[linear-gradient(135deg,_rgba(239,68,68,0.8)_0%,_rgba(244,63,94,0.8)_100%)] border-r border-gray-200 dark:border-gray-800 shadow-2xl flex flex-col overflow-hidden z-50
          ${sidebarOpen ? 'w-[320px] md:w-[380px]' : 'w-0'} 
          ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          md:relative md:opacity-100 md:pointer-events-auto
          ${sidebarOpen ? 'fixed md:relative' : 'fixed md:relative'} top-0 left-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 min-w-[320px] md:min-w-[380px]">
          <div className="flex items-center gap-3 animate-fade-in-down">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500/80 to-pink-500/80 rounded-xl flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-transparent text-base leading-tight line-clamp-2 bg-gradient-to-r from-red-500 via-pink-500 to-red-400 bg-clip-text animate-gradient-x">{course.title}</h2>
              {/* Removed 'Navigation' subtitle */}
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none group"
            style={{ boxShadow: '0 0 0 0 rgba(239,68,68,0.2)' }}
          >
            <span className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-br from-red-500 via-pink-500 to-red-400 opacity-60 group-hover:opacity-80 animate-pulse-slow" />
            <X className="w-6 h-6 z-10 text-white group-hover:scale-110 group-active:scale-90 transition-transform duration-150" />
          </button>
        </div>

        {/* Progress Section */}
        <div className="p-6 bg-[linear-gradient(135deg,_rgba(239,68,68,0.16)_0%,_rgba(244,63,94,0.16)_100%)] border-b border-gray-200 dark:border-gray-700 animate-fade-in-up min-w-[320px] md:min-w-[380px]">
          <div className="text-center mb-4">
            <div className="relative inline-block mb-3 animate-scale-in">
              <svg width="100" height="100" viewBox="0 0 100 100" className="drop-shadow-lg">
                <defs>
                  <linearGradient id="progressRedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ef4444" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#ef4444" floodOpacity="0.3"/>
                  </filter>
                </defs>
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(239,68,68,0.2)"
                  strokeWidth="8"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#progressRedGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                  transform="rotate(-90 50 50)"
                  filter="url(#shadow)"
                  style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-white drop-shadow-lg">{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-white mb-1">{completedCount} of {totalLessons} lessons completed</p>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-white/80">
                <span>{completedCount} lessons completed</span>
                <span>{totalLessons} total lessons</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-w-[320px] md:min-w-[380px]">
          {course.modules.map((module, moduleIndex) => {
            const moduleStartIndex = course.modules
              .slice(0, moduleIndex)
              .reduce((acc, m) => acc + m.lessons.length, 0);
            
            const completedInModule = module.lessons.filter((_, lessonIndex) => 
              completedLessons.includes(moduleStartIndex + lessonIndex)
            ).length;
            
            const totalModuleLessons = module.lessons.length;
            const moduleProgress = totalModuleLessons > 0 ? (completedInModule / totalModuleLessons) * 100 : 0;

            return (
              <ModuleCard
                key={module.id}
                module={module}
                moduleIndex={moduleIndex}
                moduleStartIndex={moduleStartIndex}
                completedInModule={completedInModule}
                totalModuleLessons={totalModuleLessons}
                moduleProgress={moduleProgress}
                completedLessons={completedLessons}
                currentLesson={currentLesson}
                setCurrentLesson={setCurrentLesson}
              />
            );
          })}
          
          {/* Certificate Button - Shows when course is 100% complete */}
          {progress >= 100 && (
            <div className="mt-4 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl shadow-lg animate-fade-in">
              <div className="text-center text-white mb-3">
                <Award className="w-10 h-10 mx-auto mb-2" />
                <h3 className="font-bold text-lg">🎉 Course Complete!</h3>
                <p className="text-sm opacity-90">Congratulations! Download your certificate.</p>
              </div>
              <Button
                onClick={() => navigate(`/course/${course.id}/certificate`)}
                className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold py-3 rounded-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Get Certificate Now
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Module Card Component
const ModuleCard = ({ 
  module, 
  moduleIndex, 
  moduleStartIndex, 
  completedInModule, 
  totalModuleLessons, 
  moduleProgress,
  completedLessons, 
  currentLesson, 
  setCurrentLesson 
}: any) => {
  const [isExpanded, setIsExpanded] = React.useState(moduleIndex === 0);

  return (
    <div className="bg-white/20 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-fade-in-up group" style={{ animationDelay: `${moduleIndex * 80}ms` }}>
      {/* Module Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between transition-colors group-hover:bg-white/30 group-hover:shadow-lg"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-red-500/80 to-pink-500/80 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white text-xs font-bold">{moduleIndex + 1}</span>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-white text-sm group-hover:text-red-600">
                Module {moduleIndex + 1}
              </h3>
              <Badge variant={moduleProgress === 100 ? "default" : "secondary"} className="text-xs bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white border-0 shadow-md group-hover:bg-white group-hover:text-red-600">
                {completedInModule}/{totalModuleLessons}
              </Badge>
            </div>
            <p className="text-xs text-white/80 line-clamp-1 md:line-clamp-1 mobile-no-truncate group-hover:text-red-500">
              {module.title}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-white/40 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500/80 to-pink-500/80 transition-all duration-300"
              style={{ width: `${moduleProgress}%` }}
            />
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Module Lessons */}
      {isExpanded && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          {module.lessons.map((lesson: any, lessonIndex: number) => {
            const lessonGlobalIndex = moduleStartIndex + lessonIndex;
            const isCompleted = completedLessons.includes(lessonGlobalIndex);
            const isCurrent = currentLesson === lessonGlobalIndex;

            return (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lessonGlobalIndex)}
                className={`w-full p-3 flex items-center gap-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  isCurrent ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500' : ''
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      isCurrent 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium line-clamp-1 md:line-clamp-1 mobile-no-truncate ${
                    isCurrent 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : isCompleted 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {lesson.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {lesson.duration || '5 min'}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {lesson.type || 'lesson'}
                    </span>
                  </div>
                </div>
                {isCurrent && (
                  <Play className="w-4 h-4 text-blue-500" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseSidebar;
