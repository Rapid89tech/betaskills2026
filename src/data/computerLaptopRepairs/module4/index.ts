import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-power-battery';
import { quiz4 } from './quiz4';

const module4: Module = {
  id: 4,
  title: '🔋 Module 4: Power Supply & Battery Repair',
  description: 'Diagnose and resolve power-related issues including battery failures, DC jack problems, and adapter testing using multimeters and diagnostic tools.',
  lessons: [
    lesson1,
    quiz4
  ]
};

export default module4;
