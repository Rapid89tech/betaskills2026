import type { Module } from '@/types/course';
import { lesson9_1 } from './module9/lesson9_1';
import { lesson9_2 } from './module9/lesson9_2';
import { lesson9_3 } from './module9/lesson9_3';
import { quiz9 } from './module9/quiz9';

export const module9: Module = {
  id: 9,
  title: '🚀 Module 9: The Future of Human-AI Relations',
  description: 'Examines the co-evolution of humans and machines, emerging trends, and future scenarios for human-AI interaction',
  lessons: [
    lesson9_1,
    lesson9_2,
    lesson9_3,
    quiz9
  ]
};
