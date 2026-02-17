import type { Module } from '@/types/course';
import { lesson1ShowConcepts } from './lesson1-show-concepts';
import { lesson2ContentCalendars } from './lesson2-content-calendars';
import { quiz2 } from './quiz2';

const module2: Module = {
  id: 2,
  title: '🎧 Module 2: Planning and Content Strategy',
  description: 'Develop strong podcast show concepts, formats, and content plans using calendars and repeatable production workflows.',
  lessons: [
    lesson1ShowConcepts,
    lesson2ContentCalendars,
    quiz2
  ]
};

export default module2;
