
import { lesson1HardwareFundamentals } from './lesson1-hardware-fundamentals';
import { lesson11Quiz } from './lesson11-quiz';
import type { Module } from '@/types/course';

export const module1Hardware: Module = {
  id: 1,
  title: 'Introduction to Computer Hardware',
  description: 'Basics of CPUs, RAM, storage devices, and I/O ports',
  lessons: [
    lesson1HardwareFundamentals,
    lesson11Quiz
  ]
};
