import type { Module } from '@/types/course';
import { lesson1AdvancedCuttingTechniques } from './lesson1-advanced-cutting-techniques';
import { module5Quiz } from './quiz5';

const module5: Module = {
  id: 5,
  title: '✂️ Module 5: Advanced Hair Cutting Techniques',
  description: 'Master texturizing, thinning, razor cutting, precision cutting, and freehand techniques for professional results',
  lessons: [
    lesson1AdvancedCuttingTechniques,
    module5Quiz
  ]
};

export default module5;
