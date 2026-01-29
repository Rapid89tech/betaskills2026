import type { Module } from '@/types/course';
import lesson1 from './lesson1-solar-panels';
import lesson2 from './lesson2-inverters';
import lesson3 from './lesson3-batteries';
import lesson4 from './lesson4-charge-controllers';
import lesson5 from './lesson5-mounting-cabling';
import lesson6 from './lesson6-balance-of-system';
import quiz from './quiz';

const module2: Module = {
  id: 2,
  title: 'Components of a Solar PV System',
  description: 'Learn about the essential components that make up a solar PV system, including panels, inverters, batteries, charge controllers, mounting structures, and balance of system components.',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6],
  quiz
};

export default module2;

