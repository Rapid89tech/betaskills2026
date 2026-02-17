import type { Module } from '@/types/course';
import { lesson6_1 } from './module6/lesson6_1';
import { lesson6_2 } from './module6/lesson6_2';
import { lesson6_3 } from './module6/lesson6_3';
import { quiz6 } from './module6/quiz6';

export const module6: Module = {
  id: 6,
  title: '⛽ Module 6: Ensuring Fuel System Health',
  description: 'Focus on maintaining a healthy fuel system in petrol vehicles, critical for efficient combustion and engine performance. Master cleaning or replacing fuel filters, identifying and repairing fuel line leaks, and using fuel system cleaners to optimize engine efficiency.',
  lessons: [
    lesson6_1,
    lesson6_2,
    lesson6_3,
    quiz6
  ]
};
