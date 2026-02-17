import type { Module } from '@/types/course';
import { lesson7_1 } from './module7/lesson7_1';
import { lesson7_2 } from './module7/lesson7_2';
import { lesson7_3 } from './module7/lesson7_3';
import { quiz7 } from './module7/quiz7';

export const module7: Module = {
  id: 7,
  title: '🔧 Module 7: Diesel Engine Maintenance and Preventative Care',
  description: 'Master maintenance intervals, fleet management best practices, and predictive maintenance strategies. Learn to establish proper service schedules, implement effective recordkeeping, use maintenance data to prevent failures, and extend the life of diesel engine components.',
  lessons: [
    lesson7_1,
    lesson7_2,
    lesson7_3,
    quiz7
  ]
};
