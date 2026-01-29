import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import LessonItem from './LessonItem';
import type { Module } from '@/types/course';

interface ModuleSectionProps {
  module: Module;
  moduleIndex: number;
  moduleStartIndex: number;
  completedLessons: number[];
  currentLesson: number;
  setCurrentLesson: (lesson: number) => void;
}

const ModuleSection = ({
  module,
  moduleIndex,
  moduleStartIndex,
  completedLessons,
  currentLesson,
  setCurrentLesson
}: ModuleSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const completedInModule = module.lessons.filter((_, lessonIndex) => 
    completedLessons.includes(moduleStartIndex + lessonIndex)
  ).length;
  
  const totalLessons = module.lessons.length;
  const isModuleComplete = completedInModule === totalLessons;

  return (
    <div className="rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-800/80 shadow-xl border border-blue-200/40 dark:border-blue-900/40 glassmorphism-card transition-all duration-300 animate-fade-in-up mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-4 flex items-center justify-between bg-gradient-to-r from-white/80 to-blue-50/60 dark:from-gray-900/80 dark:to-blue-900/30 transition-colors duration-200 hover:shadow-lg hover:scale-[1.01] active:scale-100 focus:outline-none group ${isExpanded ? 'rounded-t-2xl' : 'rounded-2xl'}`}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-900 dark:text-white">
                MODULE {moduleIndex + 1}
              </span>
              <Badge variant={isModuleComplete ? "default" : "secondary"} className="animate-scale-in">
                {completedInModule}/{totalLessons}
              </Badge>
            </div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 line-clamp-2">
              {module.title}
            </h3>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
        )}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden bg-gradient-to-r from-gray-50/80 to-blue-50/40 dark:from-gray-900/60 dark:to-blue-900/20 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ willChange: 'max-height, opacity' }}
      >
        {isExpanded && (
          <div className="border-t border-gray-200 dark:border-gray-700">
            {module.lessons.map((lesson, lessonIndex) => {
              const lessonGlobalIndex = moduleStartIndex + lessonIndex;
              return (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  lessonIndex={lessonGlobalIndex}
                  isCompleted={completedLessons.includes(lessonGlobalIndex)}
                  isCurrent={currentLesson === lessonGlobalIndex}
                  onClick={() => setCurrentLesson(lessonGlobalIndex)}
                />
              );
            })}
            {/* Add quiz as a lesson item if present */}
            {module.quiz && (
              <LessonItem
                key="quiz"
                lesson={{
                  id: 'quiz',
                  title: module.quiz.title || 'Quiz',
                  type: 'quiz',
                  duration: '',
                }}
                lessonIndex={moduleStartIndex + module.lessons.length}
                isCompleted={completedLessons.includes(moduleStartIndex + module.lessons.length)}
                isCurrent={currentLesson === moduleStartIndex + module.lessons.length}
                onClick={() => setCurrentLesson(moduleStartIndex + module.lessons.length)}
                isQuiz={true}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleSection;
