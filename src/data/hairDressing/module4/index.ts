import type { Module } from '@/types/course';
import { lesson1HairCuttingTechniques } from './lesson1-hair-cutting-techniques';
import { module4Quiz } from './quiz4';

const module4: Module = {
  id: 4,
  title: '✂️ Module 4: Hair Cutting Techniques',
  description: 'Master basic hair cutting styles including one-length cuts, layered cuts, bobs, and pixie cuts',
  lessons: [
    lesson1HairCuttingTechniques,
    module4Quiz
  ]
};

export default module4;
