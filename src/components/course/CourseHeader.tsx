
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu, ArrowLeft, ArrowRight } from 'lucide-react';
import type { Course, Lesson } from '@/types/course';

interface CourseHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  course: Course;
  currentLesson: number;
  allLessons: Lesson[];
  prevLesson: () => void;
  nextLesson: () => void;
}

const CourseHeader = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  course, 
  currentLesson, 
  allLessons, 
  prevLesson, 
  nextLesson 
}: CourseHeaderProps) => {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!sidebarOpen && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="border-slate-300"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-xl font-semibold text-slate-900">{course.title}</h1>
            <p className="text-sm text-slate-600">by {course.instructor.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={prevLesson}
            disabled={currentLesson === 0}
            variant="outline"
            size="sm"
            className="border-slate-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <Button
            onClick={nextLesson}
            disabled={currentLesson === allLessons.length - 1}
            className="bg-primary hover:bg-primary-dark"
            size="sm"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;
