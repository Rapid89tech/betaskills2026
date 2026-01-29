import { Module } from '@/types/course';
import { lesson10_1 } from './lesson10_1';
import { quiz10 } from './quiz10';

export const module10: Module = {
  id: 10,
  title: 'Hair Coloring and Treatments',
  description: 'Master hair coloring fundamentals including color levels, tones, application techniques like foiling, balayage, and ombre, plus hair treatment and care principles',
  lessons: [
    lesson10_1,
    quiz10
  ]
}; 