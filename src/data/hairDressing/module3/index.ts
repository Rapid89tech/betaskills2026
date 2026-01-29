import { Module } from '@/types/course';
import { lesson3_1 } from './lesson3_1';
import { lesson3_2 } from './lesson3_2';
import { lesson3_3 } from './lesson3_3';
import { quiz3 } from './quiz3';

export const module3: Module = {
  id: 3,
  title: 'Salon Safety and Hygiene',
  description: 'Learn the importance of sanitation and sterilization, proper handling of chemicals and tools, and maintaining a clean and organized workspace',
  lessons: [
    lesson3_1,
    lesson3_2,
    lesson3_3,
    quiz3
  ]
}; 