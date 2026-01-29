import type { Module } from '@/types/course';
import lesson1 from './lesson1-restaurant-kitchen-management';
import lesson2 from './lesson2-cost-estimation-menu-pricing';
import lesson3 from './lesson3-supply-chain-inventory';
import lesson4 from './lesson4-food-entrepreneurship-marketing';
import quiz from './quiz';

const module7: Module = {
  id: 7,
  title: '💼 Module 7: Culinary Business & Leadership',
  description: 'Master culinary business and leadership skills including restaurant and kitchen management, cost estimation and menu pricing, supply chain and inventory control, and food entrepreneurship and marketing.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module7;

