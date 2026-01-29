import type { Module } from '@/types/course';
import lesson1 from './lesson1-stocks-sauces-soups';
import lesson2 from './lesson2-cooking-methods';
import lesson3 from './lesson3-pasta-rice-grains';
import lesson4 from './lesson4-baking-pastry-fundamentals';
import lesson5 from './lesson5-eggs-dairy';
import quiz from './quiz';

const module2: Module = {
  id: 2,
  title: '👨‍🍳 Module 2: Essential Cooking Techniques',
  description: 'Master essential cooking techniques including stocks, sauces, soups, cooking methods, pasta and grains, baking and pastry, and eggs and dairy preparations.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    quiz
  ]
};

export default module2;

