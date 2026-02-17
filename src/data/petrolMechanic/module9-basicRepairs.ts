import type { Module } from '@/types/course';
import { lesson9_1 } from './module9/lesson9_1';
import { lesson9_2 } from './module9/lesson9_2';
import { lesson9_3 } from './module9/lesson9_3';
import { quiz9 } from './module9/quiz9';

export const module9: Module = {
  id: 9,
  title: '🔨 Module 9: Basic Repairs',
  description: 'Master practical skills to perform essential petrol engine repairs, focusing on replacing faulty spark plugs or ignition coils, addressing minor gasket leaks, and repairing damaged wiring or connectors to prevent issues and save costly repairs.',
  lessons: [
    lesson9_1,
    lesson9_2,
    lesson9_3,
    quiz9
  ]
};
