import type { Module } from '@/types/course';
import lesson1 from './lesson1-client-consultation';
import lesson2 from './lesson2-treatment-planning';
import lesson3 from './lesson3-client-communication';
import lesson4 from './lesson4-aftercare-instructions';
import quiz from './quiz';

const module9: Module = {
  id: 9,
  title: '💬 Module 9: Client Consultation and Communication',
  description: 'Master professional client consultation, treatment planning, communication skills, and aftercare instruction protocols.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module9;

