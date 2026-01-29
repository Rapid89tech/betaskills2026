import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-solar-energy';
import lesson2 from './lesson2-advantages-limitations';
import lesson3 from './lesson3-pv-vs-thermal';
import lesson4 from './lesson4-global-trends';
import lesson5 from './lesson5-environmental-economic-benefits';
import quiz from './quiz';

const module1: Module = {
  id: 1,
  title: 'Introduction to Solar Energy',
  description: 'Explore the fundamentals of solar energy, its history, technologies, global trends, and environmental and economic benefits.',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
  quiz
};

export default module1;

