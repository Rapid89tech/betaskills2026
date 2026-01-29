import { Module } from '@/types/course';
import { lesson7_1 } from './lesson7_1';
import { quiz7 } from './quiz7';

export const module7: Module = {
  id: 7,
  title: 'Hair Styling and Finishing',
  description: 'Master blow-drying and heat styling techniques for volume and smoothness, including proper tool usage and heat protection',
  lessons: [
    lesson7_1,
    quiz7
  ]
}; 