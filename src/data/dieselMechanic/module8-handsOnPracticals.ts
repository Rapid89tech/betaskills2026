import type { Module } from '@/types/course';
import { lesson8_1 } from './module8/lesson8_1';
import { lesson8_2 } from './module8/lesson8_2';
import { lesson8_3 } from './module8/lesson8_3';
import { quiz8 } from './module8/quiz8';

export const module8: Module = {
  id: 8,
  title: '🎓 Module 8: Hands-On Practicals and Final Assessment',
  description: 'Apply your knowledge through virtual simulations, practical diagnostic scenarios, and comprehensive assignments. Create maintenance schedules, solve real-world problems, and prepare for your diesel mechanic certification exam.',
  lessons: [
    lesson8_1,
    lesson8_2,
    lesson8_3,
    quiz8
  ]
};
