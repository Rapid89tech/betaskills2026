import type { Module } from '@/types/course';
import { lesson1UnderstandingHairStructure } from './lesson1-understanding-hair-structure';
import { module1Quiz } from './quiz1';

const module1: Module = {
  id: 1,
  title: '💇 Module 1: Introduction to Hairdressing',
  description: 'Learn hair structure, types, porosity, elasticity, and the foundations of professional hairdressing',
  lessons: [
    lesson1UnderstandingHairStructure,
    module1Quiz
  ]
};

export default module1;
