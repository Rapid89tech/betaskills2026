import { Module } from '../../../types/course';
import lesson1ChoosingMixingGrout from './lesson1-choosing-mixing-grout';
import lesson2GroutApplicationCleanup from './lesson2-grout-application-cleanup';
import lesson3Quiz from './lesson3-quiz';

export const module4: Module = {
  id: 4,
  title: 'Grouting and Finishing',
  description: 'This comprehensive module covers grout selection, mixing techniques, application methods, and finishing procedures. Students will learn to choose the right grout type for various applications, achieve proper consistency through correct mixing, apply grout evenly using professional techniques, and complete installations with proper sealing for long-lasting durability.',
  lessons: [
    lesson1ChoosingMixingGrout,
    lesson2GroutApplicationCleanup,
    lesson3Quiz,
  ],
};