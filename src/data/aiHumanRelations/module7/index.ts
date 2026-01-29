import { Module } from '@/types/course';
import { lesson7_1 } from './lesson7_1';
import { lesson7_2 } from './lesson7_2';
import { lesson7_3 } from './lesson7_3';
import { quiz7 } from './quiz7';

export const module7: Module = {
  id: 7,
  title: 'Designing Human-Centered AI',
  description: 'Learn the principles of UX/UI design for AI applications, human-centered design methodologies, and how AI can enhance well-being and social connection.',
  lessons: [
    lesson7_1,
    lesson7_2,
    lesson7_3,
    quiz7
  ]
};
