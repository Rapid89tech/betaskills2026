import type { Module } from '@/types/course';
import lesson1 from './lesson1-solar-potential-shading';
import lesson2 from './lesson2-load-requirements';
import lesson3 from './lesson3-sizing-arrays-batteries';
import lesson4 from './lesson4-system-configuration';
import lesson5 from './lesson5-panel-orientation-tilt';
import lesson6 from './lesson6-design-software';
import quiz from './quiz';

const module3: Module = {
  id: 3,
  title: 'Site Assessment and System Design',
  description: 'Master the skills of site assessment, load calculation, system sizing, configuration selection, and using professional solar design software.',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6],
  quiz
};

export default module3;

