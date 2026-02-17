import type { Module } from '@/types/course';
import { lesson3_1 } from './module3/lesson3_1';
import { lesson3_2 } from './module3/lesson3_2';
import { lesson3_3 } from './module3/lesson3_3';
import { lesson3_4 } from './module3/lesson3_4';
import { quiz3 } from './module3/quiz3';

export const module3: Module = {
  id: 3,
  title: '🏢 Module 3: AI in the Workplace',
  description: 'Examines AI\'s transformative impact on workplace dynamics, focusing on integration into HR, collaboration with humans, emotional labor automation, and management of human-AI teams',
  lessons: [
    lesson3_1,
    lesson3_2,
    lesson3_3,
    lesson3_4,
    quiz3
  ]
};
