import type { Module } from '@/types/course';
import { lesson1EssentialHandTools } from './lesson1-essential-hand-tools';
import { lesson2PowerTools } from './lesson2-power-tools';
import { lesson3TypesOfPipesAndFittings } from './lesson3-types-of-pipes-and-fittings';
import { lesson4CommonPlumbingMaterials } from './lesson4-common-plumbing-materials';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: '🛠️ Module 2: Plumbing Tools and Materials',
  description: 'Master essential hand tools, power tools, pipe types, fittings, and materials for professional plumbing work',
  lessons: [
    lesson1EssentialHandTools,
    lesson2PowerTools,
    lesson3TypesOfPipesAndFittings,
    lesson4CommonPlumbingMaterials,
    module2Quiz
  ]
};

export default module2; 