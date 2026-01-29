import type { Module } from '@/types/course';
import lesson1 from './lesson1-clamping-squaring';
import lesson2 from './lesson2-fastening-methods';
import lesson3 from './lesson3-frame-panel-construction';
import lesson4 from './lesson4-small-projects';
import quiz from './quiz';

const module6: Module = {
  id: 6,
  title: 'Assembly & Construction',
  description: 'Master assembly techniques including clamping, squaring, fastening methods, frame and panel construction, and complete small project builds.',
  lessons: [lesson1, lesson2, lesson3, lesson4],
  quiz
};

export default module6;

