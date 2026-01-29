import { Module } from '@/types/course';
import lesson1 from './lesson1-compression-testing';
import lesson2 from './lesson2-obd-ii-scanners';
import lesson3 from './lesson3-vacuum-fuel-pressure-testers';
import quiz8 from './quiz8';

const module8: Module = {
  id: 8,
  title: 'Testing and Diagnostic Tools',
  description: 'This module equips learners with the skills to use essential diagnostic tools—compression testers, OBD-II scanners, vacuum gauges, and fuel pressure testers—to evaluate petrol engine health and pinpoint issues like misfires, vacuum leaks, or fuel delivery problems.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz8
  ]
};

export default module8;
