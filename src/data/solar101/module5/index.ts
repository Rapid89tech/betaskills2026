import type { Module } from '@/types/course';
import lesson1 from './lesson1-electrical-theory';
import lesson2 from './lesson2-dc-ac-current';
import lesson3 from './lesson3-sizing-cables-conduits';
import lesson4 from './lesson4-fuses-breakers-disconnects';
import lesson5 from './lesson5-reading-diagrams';
import quiz from './quiz';

const module5: Module = {
  id: 5,
  title: 'Electrical Concepts and Wiring',
  description: 'Understand fundamental electrical principles, DC and AC current, cable sizing, protective devices, and how to read electrical diagrams for solar PV systems.',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
  quiz
};

export default module5;

