import type { Module } from '@/types/course';
import { lesson1SalonSafetyHygiene } from './lesson1-salon-safety-hygiene';
import { module3Quiz } from './quiz3';

const module3: Module = {
  id: 3,
  title: '🧼 Module 3: Salon Safety and Hygiene',
  description: 'Learn sanitation, sterilization, chemical handling, and maintaining a clean workspace for professional salon operations',
  lessons: [
    lesson1SalonSafetyHygiene,
    module3Quiz
  ]
};

export default module3;
