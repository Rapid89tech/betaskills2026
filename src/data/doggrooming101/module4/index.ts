import type { Module } from '@/types/course';
import lesson1 from './lesson1-bathing-drying-methods';
import lesson2 from './lesson2-brushing-dematting';
import lesson3 from './lesson3-nail-paw-ear-care';
import lesson4 from './lesson4-clipping-scissoring-cuts';
import lesson5 from './lesson5-styling-finishing';
import quiz from './quiz';

const module4: Module = {
  id: 4,
  title: '💧 Module 4: Basic Grooming Techniques',
  description: 'Learn bathing and drying methods for different coat types, brushing and dematting techniques, nail, paw, and ear care, clipping and scissoring, and styling and finishing touches.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    quiz
  ]
};

export default module4;

