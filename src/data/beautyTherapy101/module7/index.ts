import type { Module } from '@/types/course';
import lesson1 from './lesson1-body-treatments';
import lesson2 from './lesson2-massage-techniques';
import lesson3 from './lesson3-body-wraps';
import lesson4 from './lesson4-aromatherapy';
import quiz from './quiz';

const module7: Module = {
  id: 7,
  title: '🧘 Module 7: Body Treatments and Wellness',
  description: 'Learn professional body treatment techniques including massage, body wraps, aromatherapy, and wellness therapies.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module7;

