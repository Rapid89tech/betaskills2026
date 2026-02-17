import type { Module } from '@/types/course';
import { lesson1ChemicalProcesses } from './lesson1-chemical-processes';
import { module11Quiz } from './quiz11';

const module11: Module = {
  id: 11,
  title: '🧪 Module 11: Chemical Processes in Hairdressing',
  description: 'Master perming and relaxing techniques, keratin treatments, smoothing systems, and color correction methods',
  lessons: [
    lesson1ChemicalProcesses,
    module11Quiz
  ]
};

export default module11;
