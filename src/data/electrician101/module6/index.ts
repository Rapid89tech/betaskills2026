import type { Module } from '@/types/course';
import { lesson1ReadingBlueprints } from './lesson1-reading-blueprints';
import { lesson2ElectricalSymbols } from './lesson2-electrical-symbols';
import { lesson3CreatingDrawings } from './lesson3-creating-drawings';
import { module6Quiz } from './quiz';

const module6: Module = {
  id: 6,
  title: '📐 Module 6: Reading and Creating Electrical Drawings',
  description: 'Learn to read blueprints, understand electrical symbols, and create electrical drawings and schematics',
  lessons: [
    lesson1ReadingBlueprints,
    lesson2ElectricalSymbols,
    lesson3CreatingDrawings,
    module6Quiz
  ]
};

export default module6;

