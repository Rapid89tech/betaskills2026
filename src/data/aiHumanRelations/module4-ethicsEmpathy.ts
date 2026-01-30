import type { Module } from '@/types/course';
import { lesson4_1 } from './module4/lesson4_1';
import { lesson4_2 } from './module4/lesson4_2';
import { lesson4_3 } from './module4/lesson4_3';
import { quiz4 } from './module4/quiz4';

export const module4: Module = {
  id: 4,
  title: '🤔 Module 4: Ethics and Empathy in AI Systems',
  description: 'Covers bias, fairness, and transparency in AI, ethical dilemmas in decision-making, AI empathy, and designing AI with human values',
  lessons: [
    lesson4_1,
    lesson4_2,
    lesson4_3,
    quiz4
  ]
};
