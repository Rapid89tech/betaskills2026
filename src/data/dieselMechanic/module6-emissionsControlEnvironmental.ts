import type { Module } from '@/types/course';
import { lesson6_1 } from './module6/lesson6_1';
import { lesson6_2 } from './module6/lesson6_2';
import { lesson6_3 } from './module6/lesson6_3';
import { quiz6 } from './module6/quiz6';

export const module6: Module = {
  id: 6,
  title: '🌍 Module 6: Emissions Control and Environmental Considerations',
  description: 'Master diesel emissions control systems including DPF, SCR, and EGR. Learn to diagnose emissions-related issues, maintain emissions equipment for compliance, and apply environmental best practices to reduce harmful emissions and meet regulatory standards.',
  lessons: [
    lesson6_1,
    lesson6_2,
    lesson6_3,
    quiz6
  ]
};
