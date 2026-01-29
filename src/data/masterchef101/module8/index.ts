import type { Module } from '@/types/course';
import lesson1 from './lesson1-final-practical-exam';
import lesson2 from './lesson2-written-exam';
import lesson3 from './lesson3-business-plan-presentation';
import lesson4 from './lesson4-graduation-showcase';

const module8: Module = {
  id: 8,
  title: '🎓 Module 8: Capstone & Certification',
  description: 'Complete the capstone and certification requirements including the final practical exam, written exam, business plan presentation, and graduation showcase.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4
  ]
};

export default module8;

