import { Module } from '@/types/course';
import { lesson1 } from './lesson1-editing-tools';
import { lesson2 } from './lesson2-basic-editing';
import { lesson3 } from './lesson3-music-intros-outros';
import { lesson4 } from './lesson4-exporting-files';
import { quiz4 } from './quiz4';

const module4: Module = {
  id: 4,
  title: 'Audio Editing Essentials',
  description: 'Master the fundamentals of podcast audio editing, from choosing the right tools to exporting professional-quality episodes ready for distribution.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz4
  ]
};

export default module4;