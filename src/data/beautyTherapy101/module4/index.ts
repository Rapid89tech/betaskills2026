import type { Module } from '@/types/course';
import lesson1 from './lesson1-hair-removal-methods';
import lesson2 from './lesson2-waxing-techniques';
import lesson3 from './lesson3-sugaring-epilation';
import lesson4 from './lesson4-laser-ipl';
import quiz from './quiz';

const module4: Module = {
  id: 4,
  title: '💇 Module 4: Hair Removal Techniques',
  description: 'Master professional hair removal methods including waxing, sugaring, threading, and advanced techniques like laser and IPL hair removal.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module4;

