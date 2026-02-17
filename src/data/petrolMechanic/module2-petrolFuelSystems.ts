import type { Module } from '@/types/course';
import { lesson2_1 } from './module2/lesson2_1';
import { lesson2_2 } from './module2/lesson2_2';
import { quiz2 } from './module2/quiz2';

export const module2: Module = {
  id: 2,
  title: '⛽ Module 2: Petrol Fuel Systems Overview',
  description: 'Delve into the critical role of fuel delivery systems in petrol engines, focusing on the differences between carbureted and fuel-injected systems and the impact of the air-fuel mixture on combustion efficiency.',
  lessons: [
    lesson2_1,
    lesson2_2,
    quiz2
  ]
};
