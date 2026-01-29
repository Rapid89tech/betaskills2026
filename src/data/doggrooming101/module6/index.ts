import type { Module } from '@/types/course';
import lesson1 from './lesson1-hand-stripping';
import lesson2 from './lesson2-creative-grooming';
import lesson3 from './lesson3-senior-special-needs';
import lesson4 from './lesson4-show-preparation';
import quiz from './quiz';

const module6: Module = {
  id: 6,
  title: '🎨 Module 6: Advanced Grooming & Styling',
  description: 'Master hand-stripping, advanced coat maintenance, creative grooming techniques, handling senior dogs and special needs dogs, and preparing dogs for shows and competitions.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module6;

