import type { Module } from '@/types/course';
import { lesson1_1 } from './module1/lesson1_1';
import { lesson1_2 } from './module1/lesson1_2';
import { lesson1_3 } from './module1/lesson1_3';
import { quiz1 } from './module1/quiz1';

export const module1: Module = {
  id: 1,
  title: '🔧 Module 1: Introduction to Petrol Engines',
  description: 'Explore the four-stroke engine cycle, critical engine components, and key differences between petrol and diesel engines through engaging lectures and interactive simulations.',
  lessons: [
    lesson1_1,
    lesson1_2,
    lesson1_3,
    quiz1
  ]
};
