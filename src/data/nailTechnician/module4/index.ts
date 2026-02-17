import type { Module } from '@/types/course';
import { lesson1NailArtDesign } from './lesson1-nail-art-design';
import { module4Quiz } from './quiz4';

const module4: Module = {
  id: 4,
  title: '🎨 Module 4: Nail Art and Creative Design',
  description: 'Explore creative nail art techniques including dotting, stamping, gradients, florals, geometric patterns, and advanced 3D designs',
  lessons: [
    lesson1NailArtDesign,
    module4Quiz
  ]
};

export default module4;
