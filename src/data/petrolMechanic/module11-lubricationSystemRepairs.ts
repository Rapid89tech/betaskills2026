import type { Module } from '@/types/course';
import { lesson11_1 } from './module11/lesson11_1';
import { lesson11_2 } from './module11/lesson11_2';
import { lesson11_3 } from './module11/lesson11_3';
import { quiz11 } from './module11/quiz11';

export const module11: Module = {
  id: 11,
  title: '🛢️ Module 11: Lubrication System Repairs',
  description: 'Master the skills to diagnose and repair lubrication system issues in petrol engines, focusing on oil pressure problems, replacing faulty oil pumps, and cleaning clogged oil passages to prevent engine damage and ensure optimal performance.',
  lessons: [
    lesson11_1,
    lesson11_2,
    lesson11_3,
    quiz11
  ]
};
