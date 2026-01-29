import { Module } from '../../../types/course';

// Import all lessons
import { lesson2_1 } from './lesson2_1';
import { lesson2_2 } from './lesson2_2';

// Import quiz
import { quiz2 } from './quiz2';

export const module2: Module = {
  id: 'petrol-fuel-systems-overview',
  title: 'Module 2: Petrol Fuel Systems Overview',
  description: 'This module delves into the critical role of fuel delivery systems in petrol engines, focusing on the differences between carbureted and fuel-injected systems and the impact of the air-fuel mixture on combustion efficiency.',
  duration: '3 hours',
  objectives: [
    'Compare and contrast carbureted and fuel-injected engines',
    'Understand the role of air-fuel mixture in combustion efficiency',
    'Identify advantages and disadvantages of each fuel system type',
    'Learn maintenance requirements for optimal fuel system performance',
    'Apply diagnostic skills to fuel system troubleshooting'
  ],
  lessons: [
    lesson2_1,
    lesson2_2
  ],
  quiz: quiz2,
  estimatedTime: '3 hours',
  difficulty: 'Beginner'
};