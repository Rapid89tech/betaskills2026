import { Module } from '../../../types/course';

// Import all lessons
import { lesson1_1 } from './lesson1_1';
import { lesson1_2 } from './lesson1_2';
import { lesson1_3 } from './lesson1_3';
import { lesson1_4 } from './lesson1_4';

// Import quiz
import { quiz1 } from './quiz1';

export const module1: Module = {
  id: 'introduction-to-petrol-engines',
  title: 'Module 1: Introduction to Petrol Engines',
  description: 'This module lays the groundwork for mastering petrol engine mechanics by exploring the four-stroke engine cycle, critical engine components, and key differences between petrol and diesel engines.',
  duration: '4 hours',
  objectives: [
    'Understand the four-stroke engine cycle (intake, compression, power, exhaust)',
    'Identify key engine components and their functions',
    'Differentiate between petrol and diesel engines',
    'Explain petrol fuel systems overview',
    'Recognize the importance of air-fuel mixture in combustion efficiency'
  ],
  lessons: [
    lesson1_1,
    lesson1_2,
    lesson1_3,
    lesson1_4
  ],
  quiz: quiz1,
  estimatedTime: '4 hours',
  difficulty: 'Beginner'
};