import type { Module } from '@/types/course';
import { lesson1ElectricalTools } from './lesson1-electrical-tools';
import { lesson2WireSizesAndTypes } from './lesson2-wire-sizes-and-types';
import { lesson3MaterialsAndComponents } from './lesson3-materials-and-components';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: '🛠️ Module 4: Tools and Materials',
  description: 'Learn about essential electrical tools, wire sizes and types, materials, and components used in electrical installations',
  lessons: [
    lesson1ElectricalTools,
    lesson2WireSizesAndTypes,
    lesson3MaterialsAndComponents,
    module4Quiz
  ]
};

export default module4;

