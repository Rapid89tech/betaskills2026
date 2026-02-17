import type { Module } from '@/types/course';
import { lesson10_1 } from './module10/lesson10_1';
import { lesson10_2 } from './module10/lesson10_2';
import { lesson10_3 } from './module10/lesson10_3';
import { quiz10 } from './module10/quiz10';

export const module10: Module = {
  id: 10,
  title: '❄️ Module 10: Cooling System Overhauls',
  description: 'Master the skills to diagnose and repair common cooling system issues in petrol engines, focusing on overheating causes, replacing thermostats, water pumps, and radiators, and flushing the system to maintain performance.',
  lessons: [
    lesson10_1,
    lesson10_2,
    lesson10_3,
    quiz10
  ]
};
