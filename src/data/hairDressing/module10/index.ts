import type { Module } from '@/types/course';
import { lesson1HairColoringTreatments } from './lesson1-hair-coloring-treatments';
import { module10Quiz } from './quiz10';

const module10: Module = {
  id: 10,
  title: '🎨 Module 10: Hair Coloring and Treatments',
  description: 'Master hair color levels and tones, types of hair color, application techniques (foiling, balayage, ombre), and deep conditioning treatments',
  lessons: [
    lesson1HairColoringTreatments,
    module10Quiz
  ]
};

export default module10;
