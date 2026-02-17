import type { Module } from '@/types/course';
import { lesson12_1 } from './module12/lesson12_1';
import { lesson12_2 } from './module12/lesson12_2';
import { lesson12_3 } from './module12/lesson12_3';
import { quiz12 } from './module12/quiz12';

export const module12: Module = {
  id: 12,
  title: '⚙️ Module 12: Tuning and Performance Optimization',
  description: 'Master the skills to optimize petrol engine performance by adjusting ignition timing, tuning carburetors or recalibrating fuel injectors, and ensuring proper valve clearances to enhance power output, improve fuel efficiency, and ensure reliability.',
  lessons: [
    lesson12_1,
    lesson12_2,
    lesson12_3,
    quiz12
  ]
};
