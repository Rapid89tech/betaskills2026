
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowLeft, ArrowRight, HelpCircle } from 'lucide-react';

interface CourseControlsProps {
  markComplete: () => void;
  completedLessons: number[];
  currentLesson: number;
  prevLesson: () => void;
  nextLesson: () => void;
  allLessons: any[];
  currentLessonType?: string; // Add lesson type to determine if it's a quiz
}

const CourseControls = ({ 
  markComplete, 
  completedLessons, 
  currentLesson, 
  prevLesson, 
  nextLesson, 
  allLessons,
  currentLessonType 
}: CourseControlsProps) => {
  return (
    <div className="flex items-center justify-between mt-4 animate-fade-in bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-lg p-3 shadow-md border border-blue-200/50 dark:border-blue-700/30" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-center gap-4">
        {/* Only show Mark as Complete button for non-quiz lessons */}
        {!completedLessons.includes(currentLesson) && currentLessonType !== 'quiz' && (
          <Button 
            onClick={markComplete} 
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover-scale transition-all duration-300 shadow-lg hover:shadow-xl text-white font-semibold px-5 py-2.5 rounded-lg transform hover:scale-105"
          >
            <CheckCircle className="h-4 w-4 mr-2 animate-pulse" />
            ✨ Mark as Complete & Continue
          </Button>
        )}
        {completedLessons.includes(currentLesson) && currentLessonType !== 'quiz' && (
          <div className="flex items-center gap-3 text-green-700 dark:text-green-400 font-semibold">
            <CheckCircle className="h-4 w-4 text-green-600 animate-bounce" />
            🎉 Lesson Completed!
          </div>
        )}
        {/* For quiz lessons, show a different message */}
        {currentLessonType === 'quiz' && (
          <div className="flex items-center gap-3 text-blue-700 dark:text-blue-400 font-semibold">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            📝 Quiz Lesson - Complete the quiz to proceed
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={prevLesson}
          disabled={currentLesson === 0}
          variant="outline"
          className="border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          ⬅️ Previous
        </Button>
        {completedLessons.includes(currentLesson) && (
          <Button 
            onClick={nextLesson} 
            disabled={currentLesson === allLessons.length - 1}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-scale transition-all duration-300 shadow-lg hover:shadow-xl text-white font-semibold px-5 py-2.5 rounded-lg transform hover:scale-105"
          >
            🚀 Next Lesson
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseControls;
