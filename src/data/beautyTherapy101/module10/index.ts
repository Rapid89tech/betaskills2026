import type { Module } from '@/types/course';
import lesson1 from './lesson1-business-fundamentals';
import lesson2 from './lesson2-marketing-sales';
import lesson3 from './lesson3-client-retention';
import lesson4 from './lesson4-professional-development';
import quiz from './quiz';

const module10: Module = {
  id: 10,
  title: '💼 Module 10: Business and Professional Development',
  description: 'Learn business fundamentals, marketing strategies, client retention techniques, and professional development for a successful beauty therapy career.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module10;

