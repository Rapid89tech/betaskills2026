import { Module } from '@/types/course';
import { lesson3_1 } from './lesson3_1';
import { lesson3_2 } from './lesson3_2';
import { lesson3_3 } from './lesson3_3';
import { lesson3_4 } from './lesson3_4';
import { quiz3 } from './quiz3';

export const module3: Module = {
  id: 3,
  title: 'AI in the Workplace',
  description: 'Examine AI\'s transformative impact on workplace dynamics, focusing on its integration into human resources (HR), collaboration with humans, emotional labor automation, and the management of human-AI teams.',
  lessons: [
    lesson3_1,
    lesson3_2,
    lesson3_3,
    lesson3_4,
    quiz3
  ]
}; 