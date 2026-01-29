import type { Module } from '@/types/course';
import lesson1 from './lesson1-introduction-professional-kitchens';
import lesson2 from './lesson2-kitchen-safety-hygiene';
import lesson3 from './lesson3-tools-equipment-knife-skills';
import lesson4 from './lesson4-food-science-basics';
import lesson5 from './lesson5-ingredient-identification-seasonality';
import quiz from './quiz';

const module1: Module = {
  id: 1,
  title: '🍳 Module 1: Foundations of Culinary Arts',
  description: 'Learn the fundamentals of professional kitchens, safety and hygiene standards, tools and equipment, knife skills, food science basics, and ingredient identification and seasonality.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    quiz
  ]
};

export default module1;

