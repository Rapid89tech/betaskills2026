import type { Module } from '@/types/course';
import { lesson1NativePlants } from './lesson1-native-plants';
import { lesson2Xeriscaping } from './lesson2-xeriscaping';
import { lesson3OrganicFertilizers } from './lesson3-organic-fertilizers';
import { lesson4EnergyEfficientLighting } from './lesson4-energy-efficient-lighting';
import { lesson5ClimateAdaptive } from './lesson5-climate-adaptive';
import { module6Quiz } from './quiz';

const module6: Module = {
  id: 6,
  title: '♻️ Module 6: Sustainable and Eco-Friendly Landscaping',
  description: 'Promote environmentally responsible landscaping techniques',
  lessons: [
    lesson1NativePlants,
    lesson2Xeriscaping,
    lesson3OrganicFertilizers,
    lesson4EnergyEfficientLighting,
    lesson5ClimateAdaptive,
    module6Quiz
  ]
};

export default module6;

