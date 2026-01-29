import { Module } from '@/types/course';
import { lesson14_1 } from './lesson14_1';
import { lesson14_2 } from './lesson14_2';
import { lesson14_3 } from './lesson14_3';
import { quiz14 } from './quiz14';

export const module14: Module = {
  id: 14,
  title: 'Building a Career in Hairdressing',
  description: 'Learn essential skills for building a successful career in hairdressing, including portfolio creation, marketing strategies, and salon management.',
  lessons: [
    lesson14_1,
    lesson14_2,
    lesson14_3,
    quiz14
  ]
}; 