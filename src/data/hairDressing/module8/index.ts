import { Module } from '@/types/course';
import { lesson8_1 } from './lesson8_1';
import { quiz8 } from './quiz8';

export const module8: Module = {
  id: 8,
  title: 'Braiding and Updos',
  description: 'Master essential braiding techniques including French, Dutch, and fishtail braids, plus elegant bridal and event updos with proper securing methods',
  lessons: [
    lesson8_1,
    quiz8
  ]
}; 