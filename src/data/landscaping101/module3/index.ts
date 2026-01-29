import type { Module } from '@/types/course';
import { lesson1SoilTypes } from './lesson1-soil-types';
import { lesson2SelectingPlants } from './lesson2-selecting-plants';
import { lesson3TurfTypes } from './lesson3-turf-types';
import { lesson4FertilizationComposting } from './lesson4-fertilization-composting';
import { lesson5WateringIrrigation } from './lesson5-watering-irrigation';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: '🌱 Module 3: Soil, Plants, and Turf Management',
  description: 'Understand how to choose and care for plants suited to different environments',
  lessons: [
    lesson1SoilTypes,
    lesson2SelectingPlants,
    lesson3TurfTypes,
    lesson4FertilizationComposting,
    lesson5WateringIrrigation,
    module3Quiz
  ]
};

export default module3;

