import { Module } from '@/types/course';
import lesson1 from './lesson1-four-stroke-cycle';
import lesson2 from './lesson2-engine-components';
import lesson3 from './lesson3-petrol-diesel-differences';
import quiz1 from './quiz1';

const module1: Module = {
  id: 1,
  title: 'Introduction to Petrol Engines',
  description: 'This module lays the groundwork for mastering petrol engine mechanics by exploring the four-stroke engine cycle, critical engine components, and key differences between petrol and diesel engines.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz1
  ]
};

export default module1;
