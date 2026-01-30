import type { Module } from '@/types/course';
import { lesson7_1 } from './module7/lesson7_1';
import { lesson7_2 } from './module7/lesson7_2';
import { lesson7_3 } from './module7/lesson7_3';
import { quiz7 } from './module7/quiz7';

export const module7: Module = {
  id: 7,
  title: '🎨 Module 7: Designing Human-Centered AI',
  description: 'Focuses on principles and practices for designing AI systems that prioritize human needs, values, and experiences',
  lessons: [
    lesson7_1,
    lesson7_2,
    lesson7_3,
    quiz7
  ]
};
