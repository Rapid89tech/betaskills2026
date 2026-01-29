import React, { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseSidebar from './CourseSidebar';
import CourseHeader from './CourseHeader';
import LessonContent from './LessonContent';
import CourseControls from './CourseControls';
import ScoreDisplay from './ScoreDisplay';
import MobileLessonNavigation from './MobileLessonNavigation';
import { Menu, BookOpen, AlertCircle, Play, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Course, Lesson } from '@/types/course';
import { getLessonPosition } from '@/utils/lessonMapping';
import { useModuleScores } from '@/hooks/useModuleScores';
import { useCourseCompletion } from '@/hooks/useCourseCompletion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Download } from 'lucide-react';
// Import markdown exports for legacy courses that still use markdown content
import { computerRepairsMarkdown } from '@/data/computerRepairs';
import { cellphoneRepairsMarkdown } from '@/data/cellphoneRepairs';
// Import mobile styles
import '@/styles/mobile.css';

interface CoursePlayerViewProps {
  course: Course;
  enrollment: any;
  progress: number;
  allLessons: Lesson[];
  currentLesson: number;
  currentLessonData: Lesson | undefined;
  completedLessons: number[];
  quizAttempts: Record<number, boolean>;
  canAccessLesson: (lessonIndex: number) => boolean;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setCurrentLesson: (lesson: number) => void;
  nextLesson: () => void;
  prevLesson: () => void;
  markComplete: () => void;
}

const sidebarVariants = {
  open: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 18 } },
  closed: { x: '-100%', opacity: 0, transition: { type: 'spring', stiffness: 80, damping: 18 } },
};

const contentVariants = {
  open: { marginLeft: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 18 } },
  closed: { marginLeft: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 18 } },
};

const buttonVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

const CoursePlayerView = ({
  course,
  enrollment,
  progress,
  allLessons,
  currentLesson,
  currentLessonData,
  completedLessons,
  quizAttempts,
  canAccessLesson,
  isPlaying,
  setIsPlaying,
  sidebarOpen,
  setSidebarOpen,
  setCurrentLesson,
  nextLesson,
  prevLesson,
  markComplete
}: CoursePlayerViewProps) => {
  const navigate = useNavigate();
  const isCurrentLessonCompleted = completedLessons.includes(currentLesson);
  const { scores, courseSummary, getGradeColor, dbAvailable, lastError } = useModuleScores(course.id);
  const { isCompleted, certificateGenerated } = useCourseCompletion(course);
  const lessonPosition = getLessonPosition(course, currentLesson);
  
  // Mobile detection for responsive layout
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get previous and next lesson data for mobile navigation
  const previousLessonData = currentLesson > 0 ? allLessons[currentLesson - 1] : null;
  const nextLessonData = currentLesson < allLessons.length - 1 ? allLessons[currentLesson + 1] : null;
  
  // Navigation handlers for mobile
  const handleNavigatePrev = () => {
    if (currentLesson > 0) {
      prevLesson();
    }
  };
  
  const handleNavigateNext = () => {
    if (currentLesson < allLessons.length - 1 && isCurrentLessonCompleted) {
      nextLesson();
    }
  };

  // Ensure enrolled users always see course content
  console.log('🎯 CoursePlayerView: Rendering for enrolled user', {
    courseId: course.id,
    courseTitle: course.title,
    allLessonsCount: allLessons.length,
    currentLesson,
    currentLessonData: !!currentLessonData,
    enrollment: !!enrollment,
    progress
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row">
      {/* Mobile Fixed Progress Indicator - Requirements 2.4 */}
      {isMobile && (
        <div className="mobile-progress-fixed bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              Course Progress
            </span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {Math.round(progress)}%
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      )}
      
      {/* Course Completion Notification */}
      {isCompleted && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 w-full max-w-lg">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 md:px-6 py-3 md:py-4 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <Trophy className="w-6 h-6 text-yellow-300 flex-shrink-0" />
            <div className="text-center md:text-left flex-1">
              <div className="font-bold text-base md:text-lg">🎉 Course Completed!</div>
              <div className="text-xs md:text-sm opacity-90">Congratulations! You've successfully completed {course.title}</div>
            </div>
            <button
              onClick={() => navigate(`/course/${course.id}/certificate`)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm w-full md:w-auto justify-center touch-target-btn"
            >
              <Download className="w-4 h-4" />
              Get Certificate
            </button>
          </div>
        </div>
      )}
      
      {/* Sidebar - Animated slide in/out */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            key="sidebar"
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="h-full"
            style={{ position: 'relative', zIndex: 50 }}
          >
            <CourseSidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              course={course}
              progress={progress}
              currentLesson={currentLesson}
              setCurrentLesson={setCurrentLesson}
              completedLessons={completedLessons}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Animated slide/fade */}
      <motion.div
        key="main-content"
        className={`flex-1 overflow-y-auto bg-white dark:bg-gray-900 transition-all duration-300 ease-out relative ${isMobile ? 'pt-16' : ''}`}
        animate={sidebarOpen ? 'open' : 'closed'}
        variants={contentVariants}
      >
        {/* Animated Floating Toggle Button - Only show when sidebar is closed */}
        <AnimatePresence>
          {!sidebarOpen && (
            <motion.button
              key="sidebar-toggle"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={buttonVariants}
              onClick={() => setSidebarOpen(true)}
              className={`fixed ${isMobile ? 'top-28' : 'top-16 sm:top-20'} left-3 sm:left-6 z-40 flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 border-0 rounded-full px-3 sm:px-4 py-2 sm:py-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 group backdrop-blur-sm touch-target`}
              aria-label="Open Course Navigation"
              style={{
                boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.4), 0 10px 10px -5px rgba(236, 72, 153, 0.3)',
              }}
            >
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition-opacity duration-500 animate-pulse-slow" />
              {/* Icon container */}
              <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:scale-110 group-active:scale-90 transition-transform duration-200" />
              </div>
              {/* Text - Hidden on mobile */}
              <span className="relative text-white font-semibold text-xs sm:text-sm hidden md:block group-hover:text-white/90 transition-colors duration-200">
                Course Content
              </span>
              {/* Arrow indicator - Hidden on mobile */}
              <div className="relative hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-all duration-300">
                <Menu className="w-3 h-3 text-white group-hover:scale-110 transition-transform duration-200" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main content container with mobile-first padding - Requirements 2.3 */}
        <div className={`py-4 sm:py-6 md:py-8 ${isMobile ? 'pb-24' : 'pb-20 sm:pb-24'}`}>
          {/* Lesson Content with Error Handling - Mobile single-column layout with 16px padding (Requirements 2.3) */}
          {currentLessonData ? (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="animate-fade-in mobile-px md:px-0"
              data-lesson-content
            >
              <LessonContent
                lesson={currentLessonData}
                course={course}
                isCompleted={isCurrentLessonCompleted}
                hasAttempted={quizAttempts[currentLesson] || false}
                onMarkComplete={markComplete}
                onNext={nextLesson}
                progress={progress}
                moduleId={lessonPosition?.moduleId || 1}
                lessonId={lessonPosition?.lessonId || 1}
                markdownContent={
                  course.id === 'computer-repairs' ? computerRepairsMarkdown :
                  course.id === 'cellphone-repairs' ? cellphoneRepairsMarkdown :
                  undefined
                }
              />
            </motion.div>
          ) : (
            /* Fallback UI for missing lesson content */
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center justify-center min-h-[400px] mobile-px md:px-4"
            >
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-center">
                    {allLessons.length === 0 ? (
                      <>
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                        Course Content Loading
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 text-blue-600" />
                        Ready to Start Learning
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  {allLessons.length === 0 ? (
                    <>
                      <p className="text-gray-600">
                        Course lessons are being prepared. Please check back shortly.
                      </p>
                      <Button 
                        onClick={() => window.location.reload()} 
                        variant="outline"
                        className="w-full"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Refresh Course
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600">
                        Welcome to {course.title}! You have access to {allLessons.length} lessons.
                      </p>
                      <p className="text-sm text-gray-500">
                        Use the course navigation to select a lesson to begin.
                      </p>
                      <Button 
                        onClick={() => setSidebarOpen(true)} 
                        className="w-full"
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Open Course Navigation
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
          {/* Show ScoreDisplay after lesson content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="mt-12 animate-fade-in mobile-px md:px-0"
          >
            <ScoreDisplay
              courseSummary={courseSummary}
              moduleScores={scores}
              getGradeColor={getGradeColor}
              courseTitle={course.title}
              dbAvailable={dbAvailable}
              lastError={lastError}
            />
          </motion.div>
        </div>
        {/* Bottom Controls - Hidden on mobile, shown on tablet/desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          className="px-4 md:px-6 hidden md:block"
        >
          <CourseControls
            markComplete={markComplete}
            completedLessons={completedLessons}
            currentLesson={currentLesson}
            prevLesson={prevLesson}
            nextLesson={nextLesson}
            allLessons={allLessons}
            currentLessonType={currentLessonData?.type}
          />
        </motion.div>
      </motion.div>
      
      {/* Mobile Lesson Navigation - Fixed bottom bar (Requirements 2.2, 2.4) */}
      {isMobile && (
        <MobileLessonNavigation
          currentLesson={currentLessonData}
          currentLessonIndex={currentLesson}
          totalLessons={allLessons.length}
          previousLesson={previousLessonData}
          nextLesson={nextLessonData}
          onNavigatePrev={handleNavigatePrev}
          onNavigateNext={handleNavigateNext}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          progress={progress}
          canNavigateNext={isCurrentLessonCompleted && currentLesson < allLessons.length - 1}
          canNavigatePrev={currentLesson > 0}
        />
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(CoursePlayerView, (prevProps, nextProps) => {
  // Only re-render if essential props change
  return (
    prevProps.course?.id === nextProps.course?.id &&
    prevProps.currentLesson === nextProps.currentLesson &&
    prevProps.progress === nextProps.progress &&
    prevProps.completedLessons.length === nextProps.completedLessons.length &&
    prevProps.isPlaying === nextProps.isPlaying &&
    prevProps.sidebarOpen === nextProps.sidebarOpen
  );
});
