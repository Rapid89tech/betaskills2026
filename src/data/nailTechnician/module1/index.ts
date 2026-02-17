import type { Module } from '@/types/course';
import { lesson1NailAnatomy } from './lesson1-nail-anatomy';
import { module1Quiz } from './quiz1';

const module1: Module = {
  id: 1,
  title: '💅 Module 1: Introduction to Nail Care',
  description: 'Learn nail anatomy, structure, common nail conditions, and essential nail care tools and products',
  lessons: [
    lesson1NailAnatomy,
    module1Quiz
  ]
};

export default module1;
