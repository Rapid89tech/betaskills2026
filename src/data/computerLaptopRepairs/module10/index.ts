import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-data-recovery';
import { quiz10 } from './quiz10';

const module10: Module = {
  id: 10,
  title: '💾 Module 10: Data Recovery and Backup',
  description: 'Master data recovery techniques and implement robust backup strategies using the 3-2-1 rule to prevent data loss.',
  lessons: [
    lesson1,
    quiz10
  ]
};

export default module10;
