import type { Module } from '@/types/course';
import { lesson14_1 } from './module14/lesson14_1';
import { lesson14_2 } from './module14/lesson14_2';
import { quiz14 } from './module14/quiz14';

export const module14: Module = {
  id: 14,
  title: '🌍 Module 14: Emissions and Environmental Considerations',
  description: 'Master the skills to ensure compliance with emissions standards, diagnose issues with catalytic converters and oxygen sensors, and understand the environmental benefits of proper emissions control to reduce harmful pollutants and improve vehicle reliability.',
  lessons: [
    lesson14_1,
    lesson14_2,
    quiz14
  ]
};
