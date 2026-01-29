import type { Module } from '@/types/course';
import lesson1 from './lesson1-nail-anatomy';
import lesson2 from './lesson2-manicure-techniques';
import lesson3 from './lesson3-pedicure-techniques';
import lesson4 from './lesson4-nail-art';
import quiz from './quiz';

const module5: Module = {
  id: 5,
  title: '💅 Module 5: Nail Technology',
  description: 'Master professional nail care including manicure and pedicure techniques, nail art, and nail health maintenance.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module5;

