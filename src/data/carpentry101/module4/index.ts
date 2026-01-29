import type { Module } from '@/types/course';
import lesson1 from './lesson1-reading-dimensions';
import lesson2 from './lesson2-measuring-marking';
import lesson3 from './lesson3-cutting-methods';
import lesson4 from './lesson4-tool-selection';
import quiz from './quiz';

const module4: Module = {
  id: 4,
  title: 'Measuring, Marking & Cutting',
  description: 'Master accurate measuring and marking techniques, learn to interpret technical drawings, and understand different cutting methods and tool selection.',
  lessons: [lesson1, lesson2, lesson3, lesson4],
  quiz
};

export default module4;

