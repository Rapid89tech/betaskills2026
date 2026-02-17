import type { Module } from '@/types/course';
import { lesson4_1 } from './module4/lesson4_1';
import { lesson4_2 } from './module4/lesson4_2';
import { lesson4_3 } from './module4/lesson4_3';
import { quiz4 } from './module4/quiz4';

export const module4: Module = {
  id: 4,
  title: '🚀 Module 4: Turbochargers and Air Management',
  description: 'Master turbocharger operation and air management systems. Learn how turbochargers enhance performance, diagnose common issues like oil consumption and power loss, and maintain air filters and intake systems for optimal engine efficiency and turbocharger longevity.',
  lessons: [
    lesson4_1,
    lesson4_2,
    lesson4_3,
    quiz4
  ]
};
