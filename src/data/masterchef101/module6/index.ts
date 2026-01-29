import type { Module } from '@/types/course';
import lesson1 from './lesson1-fundamentals-nutrition';
import lesson2 from './lesson2-vegetarian-vegan-cuisine';
import lesson3 from './lesson3-special-diets';
import lesson4 from './lesson4-allergen-awareness';
import quiz from './quiz';

const module6: Module = {
  id: 6,
  title: '🥗 Module 6: Nutrition & Dietary Requirements',
  description: 'Learn the fundamentals of nutrition, vegetarian and vegan cuisine, gluten-free and keto diets, and allergen awareness and adaptation in recipes.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module6;

