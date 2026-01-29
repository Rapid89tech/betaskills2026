import type { Course, Module } from '@/types/course';

export interface LessonPosition {
  moduleId: number;
  lessonId: number;
  moduleIndex: number;
  lessonIndex: number;
}

/**
 * Maps a global lesson index to its module and lesson position
 */
export const getLessonPosition = (course: Course, globalLessonIndex: number): LessonPosition | null => {
  let currentIndex = 0;
  
  for (let moduleIndex = 0; moduleIndex < course.modules.length; moduleIndex++) {
    const module = course.modules[moduleIndex];
    
    for (let lessonIndex = 0; lessonIndex < module.lessons.length; lessonIndex++) {
      if (currentIndex === globalLessonIndex) {
        return {
          moduleId: module.id,
          lessonId: module.lessons[lessonIndex].id,
          moduleIndex,
          lessonIndex
        };
      }
      currentIndex++;
    }
  }
  
  return null;
};

/**
 * Gets the global lesson index from module and lesson position
 */
export const getGlobalLessonIndex = (course: Course, moduleId: number, lessonId: number): number => {
  let currentIndex = 0;
  
  for (let moduleIndex = 0; moduleIndex < course.modules.length; moduleIndex++) {
    const module = course.modules[moduleIndex];
    
    if (module.id === moduleId) {
      for (let lessonIndex = 0; lessonIndex < module.lessons.length; lessonIndex++) {
        if (module.lessons[lessonIndex].id === lessonId) {
          return currentIndex;
        }
        currentIndex++;
      }
    } else {
      currentIndex += module.lessons.length;
    }
  }
  
  return -1;
};