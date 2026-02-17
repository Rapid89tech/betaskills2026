import type { Module } from '@/types/course';
import { lesson1_1 } from './module1/lesson1_1';
import { lesson1_2 } from './module1/lesson1_2';
import { lesson1_3 } from './module1/lesson1_3';
import { quiz1 } from './module1/quiz1';

export const module1: Module = {
  id: 1,
  title: '🚜 Module 1: Introduction to Diesel Engines',
  description: 'Master the fundamentals of diesel engine operation, focusing on the 4-stroke and 2-stroke cycles. Understand the mechanics, efficiency, and applications of these engines in automotive, industrial, and marine settings.',
  lessons: [
    lesson1_1,
    lesson1_2,
    lesson1_3,
    quiz1
  ]
};
