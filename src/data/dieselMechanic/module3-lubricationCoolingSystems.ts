import type { Module } from '@/types/course';
import { lesson3_1 } from './module3/lesson3_1';
import { lesson3_2 } from './module3/lesson3_2';
import { lesson3_3 } from './module3/lesson3_3';
import { quiz3 } from './module3/quiz3';

export const module3: Module = {
  id: 3,
  title: '🛢️ Module 3: Engine Lubrication and Cooling Systems',
  description: 'Master diesel engine lubrication and cooling systems. Learn about oil pumps, galleries, and coolers, diagnose common lubrication problems like leaks and low pressure, and understand cooling system components including radiators, water pumps, and thermostats for optimal engine performance.',
  lessons: [
    lesson3_1,
    lesson3_2,
    lesson3_3,
    quiz3
  ]
};
