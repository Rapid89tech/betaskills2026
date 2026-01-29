import { Module } from '@/types/course';
import { lesson13_1 } from './lesson13_1';
import { lesson13_2 } from './lesson13_2';
import { lesson13_3 } from './lesson13_3';
import { quiz13 } from './quiz13';

export const module13: Module = {
  id: 13,
  title: 'Salon Management and Customer Service',
  description: 'Master effective communication, appointment scheduling, and professional client management skills essential for salon success.',
  lessons: [
    lesson13_1,
    lesson13_2,
    lesson13_3,
    quiz13
  ]
}; 