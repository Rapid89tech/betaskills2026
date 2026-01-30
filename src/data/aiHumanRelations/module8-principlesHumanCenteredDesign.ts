import type { Module } from '@/types/course';
import { lesson8_1 } from './module8/lesson8_1';
import { lesson8_2 } from './module8/lesson8_2';
import { quiz8 } from './module8/quiz8';

export const module8: Module = {
  id: 8,
  title: '💡 Module 8: Principles of Human-Centered Design and AI for Well-Being',
  description: 'Explores design principles that ensure AI systems support human well-being, mental health, and quality of life',
  lessons: [
    lesson8_1,
    lesson8_2,
    quiz8
  ]
};
