import type { Module } from '@/types/course';
import { lesson6_1 } from './module6/lesson6_1';
import { lesson6_2 } from './module6/lesson6_2';
import { lesson6_3 } from './module6/lesson6_3';

export const module6: Module = {
  id: 6,
  title: '⚖️ Module 6: Legal and Psychological Implications of AI',
  description: 'Examines legal responsibility and AI behavior, psychological impacts of AI on human identity and relationships',
  lessons: [
    lesson6_1,
    lesson6_2,
    lesson6_3
  ]
};
