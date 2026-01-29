import { lesson1WhatIsEntrepreneurship } from './lesson1-what-is-entrepreneurship';
import { lesson2Quiz } from './lesson2-quiz';
import type { Module } from '@/types/course';

export const module1: Module = {
  id: 1,
  title: 'What is Entrepreneurship?',
  description: 'Understand the fundamentals of entrepreneurship, develop the entrepreneurial mindset, and learn what it takes to become a successful entrepreneur.',
  lessons: [
    lesson1WhatIsEntrepreneurship,
    lesson2Quiz
  ]
}; 