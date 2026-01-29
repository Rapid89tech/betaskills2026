import { Module } from '@/types/course';
import lesson1 from './lesson1-personal-protective-equipment';
import lesson2 from './lesson2-fuel-chemical-handling';
import lesson3 from './lesson3-tool-safety-maintenance';
import quiz3 from './quiz3';

const module3: Module = {
  id: 3,
  title: 'Safety and Workshop Best Practices',
  description: 'This module focuses on creating a safe and efficient workshop environment for petrol engine mechanics. Learners will explore the critical role of personal protective equipment (PPE), safe handling of fuels and chemicals, and proper tool maintenance to prevent accidents and ensure productivity.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz3
  ]
};

export default module3;
