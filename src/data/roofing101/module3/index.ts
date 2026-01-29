import type { Module } from '@/types/course';
import { lesson1MetalRoofing } from './lesson1-metal-roofing';
import { lesson2ClayAndConcreteTilesRoofing } from './lesson2-clay-and-concrete-tiles-roofing';
import { lesson3SlateRoofing } from './lesson3-slate-roofing';
import { lesson4WoodShinglesAndShakes } from './lesson4-wood-shingles-and-shakes';
import { lesson5FlatRoofingMembranes } from './lesson5-flat-roofing-membranes';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: '🧱 Module 3: Roofing Materials',
  description: 'Master metal, clay, concrete, slate, wood, and membrane roofing materials with installation and maintenance techniques',
  lessons: [
    lesson1MetalRoofing,
    lesson2ClayAndConcreteTilesRoofing,
    lesson3SlateRoofing,
    lesson4WoodShinglesAndShakes,
    lesson5FlatRoofingMembranes,
    module3Quiz
  ]
};

export default module3; 