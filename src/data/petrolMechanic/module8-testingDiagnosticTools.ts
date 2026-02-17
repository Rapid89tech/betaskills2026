import type { Module } from '@/types/course';
import { lesson8_1 } from './module8/lesson8_1';
import { lesson8_2 } from './module8/lesson8_2';
import { lesson8_3 } from './module8/lesson8_3';
import { quiz8 } from './module8/quiz8';

export const module8: Module = {
  id: 8,
  title: '🔧 Module 8: Testing and Diagnostic Tools',
  description: 'Master the skills to use essential diagnostic tools—compression testers, OBD-II scanners, vacuum gauges, and fuel pressure testers—to evaluate petrol engine health and pinpoint issues like misfires, vacuum leaks, or fuel delivery problems.',
  lessons: [
    lesson8_1,
    lesson8_2,
    lesson8_3,
    quiz8
  ]
};
