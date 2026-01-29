import { Module } from '../../../types/course';
import lesson1PreparingSubstrates from './lesson1-preparing-substrates';
import lesson2PlanningTileLayouts from './lesson2-planning-tile-layouts';
import lesson3ManagingExpansionJoints from './lesson3-managing-expansion-joints';
import lesson4Quiz from './lesson4-quiz';

export const module2: Module = {
  id: 2,
  title: 'Surface Preparation and Layout',
  description: 'This comprehensive module covers proper substrate preparation, effective tile layout planning, and managing expansion and movement joints. Students will learn to clean, level, and waterproof surfaces, create professional layout plans that minimize waste, and implement expansion joints for durable installations.',
  lessons: [
    lesson1PreparingSubstrates,
    lesson2PlanningTileLayouts,
    lesson3ManagingExpansionJoints,
    lesson4Quiz,
  ],
};