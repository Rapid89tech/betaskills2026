import type { Module } from '@/types/course';
import { lesson1PavingEdging } from './lesson1-paving-edging';
import { lesson2DecksPatiosWalls } from './lesson2-decks-patios-walls';
import { lesson3WaterFeatures } from './lesson3-water-features';
import { lesson4LightingDesign } from './lesson4-lighting-design';
import { lesson5DrainageErosion } from './lesson5-drainage-erosion';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: '🏗️ Module 4: Hardscaping and Construction',
  description: 'Learn about the construction and installation of non-plant features',
  lessons: [
    lesson1PavingEdging,
    lesson2DecksPatiosWalls,
    lesson3WaterFeatures,
    lesson4LightingDesign,
    lesson5DrainageErosion,
    module4Quiz
  ]
};

export default module4;

