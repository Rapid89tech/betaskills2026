import type { Module } from '@/types/course';
import { lesson1ChristCenteredLessonPlans } from './lesson1-christ-centered-lesson-plans';
import { lesson2IntegratingValuesAcrossSubjects } from './lesson2-integrating-values-across-subjects';
import { lesson3MemoryVerseRoutines } from './lesson3-memory-verse-routines';
import { lesson4AdaptingLessonsForDifferentGroups } from './lesson4-adapting-lessons-for-different-groups';
import { quiz } from './quiz';

export const module3: Module = {
  id: 3,
  title: 'Developing Christ-Centered Lesson Plans',
  description: 'Creating effective lesson plans with objectives, scripture references, learning activities, integrating biblical themes across subjects, memory verse routines, and adapting lessons for different age groups.',
  lessons: [
    lesson1ChristCenteredLessonPlans,
    lesson2IntegratingValuesAcrossSubjects,
    lesson3MemoryVerseRoutines,
    lesson4AdaptingLessonsForDifferentGroups,
    quiz
  ]
};
