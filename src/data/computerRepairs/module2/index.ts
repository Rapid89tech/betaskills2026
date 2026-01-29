
import type { Module } from '@/types/course';
import { lesson2LaptopParts } from './lesson2-laptop-parts';
import { lesson12Quiz } from './lesson12-quiz';

export const module2Disassembly: Module = {
  id: 2,
  title: 'Module 2: Laptop Disassembly, Tools, and ESD Safety',
  description: 'Master essential laptop disassembly techniques, proper tool usage, and critical ESD safety protocols to prevent damage to sensitive electronic components during repair work.',
  learningObjectives: [
    'Identify and use essential laptop repair tools safely and effectively',
    'Implement proper ESD (Electrostatic Discharge) safety measures',
    'Perform systematic laptop disassembly following best practices',
    'Handle sensitive electronic components without causing damage',
    'Troubleshoot common disassembly issues and challenges',
    'Document repair procedures accurately for reassembly',
    'Apply quality control measures throughout the repair process'
  ],
  lessons: [
    lesson2LaptopParts,
    lesson12Quiz
  ]
};
