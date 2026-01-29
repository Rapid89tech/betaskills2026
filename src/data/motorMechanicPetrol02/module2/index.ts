import { Module } from '@/types/course';
import lesson1 from './lesson1-carbureted-fuel-injected';
import lesson2 from './lesson2-air-fuel-mixture';
import quiz2 from './quiz2';

const module2: Module = {
  id: 2,
  title: 'Petrol Fuel Systems Overview',
  description: 'This module delves into the critical role of fuel delivery systems in petrol engines, focusing on the differences between carbureted and fuel-injected systems and the impact of the air-fuel mixture on combustion efficiency.',
  lessons: [
    lesson1,
    lesson2,
    quiz2
  ]
};

export default module2;
