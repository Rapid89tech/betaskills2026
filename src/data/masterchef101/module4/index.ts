import type { Module } from '@/types/course';
import lesson1 from './lesson1-plating-presentation';
import lesson2 from './lesson2-butchery';
import lesson3 from './lesson3-charcuterie-curing';
import lesson4 from './lesson4-modernist-cuisine';
import lesson5 from './lesson5-advanced-pastry';
import quiz from './quiz';

const module4: Module = {
  id: 4,
  title: '🎨 Module 4: Advanced Culinary Techniques',
  description: 'Master advanced culinary techniques including plating and presentation, butchery, charcuterie and curing, modernist cuisine, and advanced pastry skills.',
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

