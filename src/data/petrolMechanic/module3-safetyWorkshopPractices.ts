import type { Module } from '@/types/course';
import { lesson3_1 } from './module3/lesson3_1';
import { lesson3_2 } from './module3/lesson3_2';
import { lesson3_3 } from './module3/lesson3_3';
import { quiz3 } from './module3/quiz3';

export const module3: Module = {
  id: 3,
  title: '🦺 Module 3: Safety and Workshop Best Practices',
  description: 'Focus on creating a safe and efficient workshop environment. Explore the critical role of personal protective equipment (PPE), safe handling of fuels and chemicals, and proper tool maintenance to prevent accidents and ensure productivity.',
  lessons: [
    lesson3_1,
    lesson3_2,
    lesson3_3,
    quiz3
  ]
};
