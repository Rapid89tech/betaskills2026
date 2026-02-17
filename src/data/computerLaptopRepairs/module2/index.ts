import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-laptop-parts';
import { quiz2 } from './quiz2';

const module2: Module = {
  id: 2,
  title: '🔧 Module 2: Laptop Disassembly and Identification',
  description: 'Master safe laptop disassembly techniques, identify key components like battery, cooling fan, keyboard, and screen. Learn proper tool usage and ESD safety precautions.',
  lessons: [
    lesson1,
    quiz2
  ]
};

export default module2;
