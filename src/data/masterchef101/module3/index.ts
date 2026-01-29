import type { Module } from '@/types/course';
import lesson1 from './lesson1-french-haute-cuisine';
import lesson2 from './lesson2-italian-regional-cooking';
import lesson3 from './lesson3-asian-culinary-traditions';
import lesson4 from './lesson4-african-middle-eastern-flavors';
import lesson5 from './lesson5-latin-american-gastronomy';
import lesson6 from './lesson6-fusion-contemporary-global-trends';
import quiz from './quiz';

const module3: Module = {
  id: 3,
  title: '🌍 Module 3: International Cuisines',
  description: 'Explore French haute cuisine, Italian regional cooking, Asian culinary traditions, African and Middle Eastern flavors, Latin American gastronomy, and fusion and contemporary global trends.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    lesson6,
    quiz
  ]
};

export default module3;

