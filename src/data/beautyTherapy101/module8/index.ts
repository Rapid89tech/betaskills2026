import type { Module } from '@/types/course';
import lesson1 from './lesson1-advanced-facials';
import lesson2 from './lesson2-chemical-peels';
import lesson3 from './lesson3-microdermabrasion';
import lesson4 from './lesson4-led-light-therapy';
import quiz from './quiz';

const module8: Module = {
  id: 8,
  title: '✨ Module 8: Advanced Facial Treatments',
  description: 'Master advanced facial treatment techniques including chemical peels, microdermabrasion, LED light therapy, and advanced skincare protocols.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module8;

