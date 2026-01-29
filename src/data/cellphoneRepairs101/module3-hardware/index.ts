import type { Module } from '@/types/course';
import { lesson1InternalParts } from './lesson1-internal-parts';
import { lesson2KeyComponents } from './lesson2-key-components';
import { lesson3HardwareVariations } from './lesson3-hardware-variations';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: 'Module 3: Hardware Components and Functions',
  description: 'Understanding smartphone hardware components, their functions, and variations between different brands and models.',
  lessons: [
    lesson1InternalParts,
    lesson2KeyComponents,
    lesson3HardwareVariations,
    module3Quiz
  ]
};

export default module3;
