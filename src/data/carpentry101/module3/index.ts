import type { Module } from '@/types/course';
import lesson1 from './lesson1-wood-properties';
import lesson2 from './lesson2-engineered-materials';
import lesson3 from './lesson3-fasteners-adhesives';
import lesson4 from './lesson4-sustainability-timber';
import quiz from './quiz';

const module3: Module = {
  id: 3,
  title: 'Materials in Carpentry',
  description: 'Learn about wood properties, engineered materials, fasteners, adhesives, and sustainable timber sourcing practices for responsible carpentry.',
  lessons: [lesson1, lesson2, lesson3, lesson4],
  quiz
};

export default module3;

