import type { Module } from '@/types/course';
import lesson1 from './lesson1-facial-treatments';
import lesson2 from './lesson2-facial-massage';
import lesson3 from './lesson3-exfoliation';
import lesson4 from './lesson4-masks-treatments';
import quiz from './quiz';

const module3: Module = {
  id: 3,
  title: '💆 Module 3: Facial Treatments and Techniques',
  description: 'Master professional facial treatment techniques including facial massage, exfoliation methods, mask application, and comprehensive facial treatment protocols.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module3;

