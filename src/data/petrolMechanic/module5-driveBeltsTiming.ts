import type { Module } from '@/types/course';
import { lesson5_1 } from './module5/lesson5_1';
import { lesson5_2 } from './module5/lesson5_2';
import { quiz5 } from './module5/quiz5';

export const module5: Module = {
  id: 5,
  title: '🔗 Module 5: Inspecting Drive Belts and Timing Belts',
  description: 'Master critical skills for inspecting and maintaining drive and timing belts, essential for petrol engine performance and longevity. Learn to identify wear and tear, check belt tension, and execute replacements to prevent breakdowns and costly engine damage.',
  lessons: [
    lesson5_1,
    lesson5_2,
    quiz5
  ]
};
