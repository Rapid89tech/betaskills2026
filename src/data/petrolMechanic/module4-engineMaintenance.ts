import type { Module } from '@/types/course';
import { lesson4_1 } from './module4/lesson4_1';
import { lesson4_2 } from './module4/lesson4_2';
import { lesson4_3 } from './module4/lesson4_3';
import { lesson4_4 } from './module4/lesson4_4';
import { quiz4 } from './module4/quiz4';

export const module4: Module = {
  id: 4,
  title: '🔧 Module 4: Engine Maintenance and Routine Services',
  description: 'Master essential skills for maintaining petrol engines through routine tasks like checking and changing engine oil, inspecting air filters, replacing spark plugs, and verifying coolant levels to enhance engine longevity and performance.',
  lessons: [
    lesson4_1,
    lesson4_2,
    lesson4_3,
    lesson4_4,
    quiz4
  ]
};
