import type { Module } from '@/types/course';
import lesson1 from './lesson1-recognizing-illness';
import lesson2 from './lesson2-first-aid';
import lesson3 from './lesson3-veterinary-referral';
import lesson4 from './lesson4-nutrition';
import quiz from './quiz';

const module8: Module = {
  id: 8,
  title: '🏥 Module 8: Canine Health & First Aid',
  description: 'Learn to recognize signs of illness during grooming or training, administer basic first aid for cuts and overheating, know when to refer to a veterinarian, and understand nutrition and its effects on coat, health, and behavior.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module8;

