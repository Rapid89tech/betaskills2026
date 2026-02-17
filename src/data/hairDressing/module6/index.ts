import type { Module } from '@/types/course';
import { lesson1MensHaircutsGrooming } from './lesson1-mens-haircuts-grooming';
import { module6Quiz } from './quiz6';

const module6: Module = {
  id: 6,
  title: '💈 Module 6: Men\'s Haircuts and Grooming',
  description: 'Master fades, tapers, beard shaping, trimming techniques, and professional clipper work for men\'s grooming',
  lessons: [
    lesson1MensHaircutsGrooming,
    module6Quiz
  ]
};

export default module6;
