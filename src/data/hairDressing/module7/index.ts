import type { Module } from '@/types/course';
import { lesson1HairStylingFinishing } from './lesson1-hair-styling-finishing';
import { module7Quiz } from './quiz7';

const module7: Module = {
  id: 7,
  title: '💨 Module 7: Hair Styling and Finishing',
  description: 'Master blow-drying, heat styling, diffusers, round brushes, and heat protection for professional finishing',
  lessons: [
    lesson1HairStylingFinishing,
    module7Quiz
  ]
};

export default module7;
