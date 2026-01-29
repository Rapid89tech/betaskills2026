import { Module } from '@/types/course';
import { lesson4_1 } from './lesson4_1';
import { quiz4 } from './quiz4';

export const module4: Module = {
  id: 4,
  title: 'Hair Cutting Techniques',
  description: 'Master basic hair cutting styles including one-length cuts, layered cuts, bob and pixie cuts with proper technique and precision',
  lessons: [
    lesson4_1,
    quiz4
  ]
}; 