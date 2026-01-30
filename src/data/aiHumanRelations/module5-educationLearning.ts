import type { Module } from '@/types/course';
import { lesson5_1 } from './module5/lesson5_1';
import { lesson5_2 } from './module5/lesson5_2';
import { lesson5_3 } from './module5/lesson5_3';
import { lesson5_4 } from './module5/lesson5_4';
import { lesson5_5 } from './module5/lesson5_5';
import { quiz5 } from './module5/quiz5';

export const module5: Module = {
  id: 5,
  title: '📚 Module 5: Education, Learning & AI',
  description: 'Explores AI tutors and adaptive learning systems, impact on teacher-student relationships, and humanizing digital education',
  lessons: [
    lesson5_1,
    lesson5_2,
    lesson5_3,
    lesson5_4,
    lesson5_5,
    quiz5
  ]
};
