import { Module } from '@/types/course';
import { lesson6_1 } from './lesson6_1';
import { quiz6 } from './quiz6';

export const module6: Module = {
  id: 6,
  title: 'Men\'s Haircuts and Grooming',
  description: 'Master men\'s haircut styles including fades, tapers, beard shaping, and professional clipper techniques',
  lessons: [
    lesson6_1,
    quiz6
  ]
}; 