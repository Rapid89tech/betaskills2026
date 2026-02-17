import type { Module } from '@/types/course';
import { lesson13_1 } from './module13/lesson13_1';
import { lesson13_2 } from './module13/lesson13_2';
import { lesson13_3 } from './module13/lesson13_3';
import { quiz13 } from './module13/quiz13';

export const module13: Module = {
  id: 13,
  title: '🚀 Module 13: Improving Engine Efficiency and Performance',
  description: 'Master the skills to enhance petrol engine efficiency and performance by using high-quality performance parts, selecting optimal fuel grades with additives, and leveraging advanced diagnostic tools to boost power output, improve fuel economy, and enhance reliability.',
  lessons: [
    lesson13_1,
    lesson13_2,
    lesson13_3,
    quiz13
  ]
};
