import type { Module } from '@/types/course';
import { lesson1VoltageCurrentResistance } from './lesson1-voltage-current-resistance';
import { lesson2OhmsLaw } from './lesson2-ohms-law';
import { lesson3SeriesParallelCircuits } from './lesson3-series-parallel-circuits';
import { lesson4ACvsDC } from './lesson4-ac-vs-dc';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: '⚡ Module 3: Electrical Theory Basics',
  description: 'Master fundamental electrical concepts including voltage, current, resistance, Ohm\'s Law, Power Law, series and parallel circuits, and AC vs DC',
  lessons: [
    lesson1VoltageCurrentResistance,
    lesson2OhmsLaw,
    lesson3SeriesParallelCircuits,
    lesson4ACvsDC,
    module3Quiz
  ]
};

export default module3;

