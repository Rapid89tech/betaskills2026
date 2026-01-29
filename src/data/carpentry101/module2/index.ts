import type { Module } from '@/types/course';
import lesson1 from './lesson1-hand-tools';
import lesson2 from './lesson2-power-tools';
import lesson3 from './lesson3-tool-care-maintenance';
import lesson4 from './lesson4-measuring-calibration';
import quiz from './quiz';

const module2: Module = {
  id: 2,
  title: 'Tools & Equipment',
  description: 'Master the essential hand tools and power tools used in carpentry, along with proper care, maintenance, and measuring instruments for precision work.',
  lessons: [lesson1, lesson2, lesson3, lesson4],
  quiz
};

export default module2;

