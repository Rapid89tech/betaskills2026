import type { Module } from '@/types/course';
import { lesson1RoofShapesAndDesigns } from './lesson1-roof-shapes-and-designs';
import { lesson2DeckingSheathing } from './lesson2-decking-sheathing';
import { lesson3UnderlaymentInRoofing } from './lesson3-underlayment-in-roofing';
import { lesson4FlashingAndDripEdgesInRoofing } from './lesson4-flashing-and-drip-edges-in-roofing';
import { lesson5RoofVentilationSystems } from './lesson5-roof-ventilation-systems';
import { lesson6GuttersAndDownspouts } from './lesson6-gutters-and-downspouts';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: '🏠 Module 4: Roof Structures and Components',
  description: 'Master roof shapes, decking, underlayment, flashing, ventilation, and drainage systems for effective design and installation',
  lessons: [
    lesson1RoofShapesAndDesigns,
    lesson2DeckingSheathing,
    lesson3UnderlaymentInRoofing,
    lesson4FlashingAndDripEdgesInRoofing,
    lesson5RoofVentilationSystems,
    lesson6GuttersAndDownspouts,
    module4Quiz
  ]
};

export default module4; 