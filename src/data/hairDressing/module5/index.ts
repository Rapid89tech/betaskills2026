import { Module } from '@/types/course';
import { lesson5_1 } from './lesson5_1';
import { quiz5 } from './quiz5';

export const module5: Module = {
  id: 5,
  title: 'Advanced Hair Cutting Techniques',
  description: 'Master advanced cutting techniques including texturizing, thinning, razor cutting, and precision/freehand cutting methods',
  lessons: [
    lesson5_1,
    quiz5
  ]
}; 