import type { Module } from '@/types/course';
import { lesson2_1 } from './module2/lesson2_1';
import { lesson2_2 } from './module2/lesson2_2';
import { lesson2_3 } from './module2/lesson2_3';
import { quiz2 } from './module2/quiz2';

export const module2: Module = {
  id: 2,
  title: '⛽ Module 2: Diesel Fuel Injection Systems',
  description: 'Master diesel fuel injection systems, from basic combustion principles to advanced common rail technology. Learn about mechanical and electronic injectors, injection timing, pressure control, and maintenance procedures for optimal engine performance and emissions compliance.',
  lessons: [
    lesson2_1,
    lesson2_2,
    lesson2_3,
    quiz2
  ]
};
