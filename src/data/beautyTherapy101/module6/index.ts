import type { Module } from '@/types/course';
import lesson1 from './lesson1-makeup-fundamentals';
import lesson2 from './lesson2-color-theory';
import lesson3 from './lesson3-face-shapes';
import lesson4 from './lesson4-makeup-application';
import quiz from './quiz';

const module6: Module = {
  id: 6,
  title: '💄 Module 6: Makeup Artistry',
  description: 'Learn professional makeup application including color theory, face shapes, and various makeup techniques for different occasions.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module6;

