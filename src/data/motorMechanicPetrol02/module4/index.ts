import { Module } from '@/types/course';
import lesson1 from './lesson1-checking-changing-engine-oil';
import lesson2 from './lesson2-inspecting-replacing-air-filters';
import lesson3 from './lesson3-examining-replacing-spark-plugs';
import lesson4 from './lesson4-verifying-coolant-levels';
import quiz4 from './quiz4';

const module4: Module = {
  id: 4,
  title: 'Engine Maintenance and Routine Services',
  description: 'This module equips learners with essential skills for maintaining petrol engines through routine tasks like checking and changing engine oil, inspecting air filters, replacing spark plugs, and verifying coolant levels. Delivered via engaging video lectures, interactive simulations, and hands-on assignments, the module ensures practical mastery of maintenance techniques to enhance engine longevity and performance.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz4
  ]
};

export default module4;
