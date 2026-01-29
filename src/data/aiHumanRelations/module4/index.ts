import { Module } from '@/types/course';
import { lesson4_1 } from './lesson4_1';
import { lesson4_2 } from './lesson4_2';
import { lesson4_3 } from './lesson4_3';
import { quiz4 } from './quiz4';

export const module4: Module = {
  id: 4,
  title: 'Ethics and Empathy in AI Systems',
  description: 'Explore bias, fairness, and transparency in AI, ethical dilemmas in decision-making, and the question of whether AI can be empathetic.',
  lessons: [
    lesson4_1,
    lesson4_2,
    lesson4_3,
    quiz4
  ]
}; 