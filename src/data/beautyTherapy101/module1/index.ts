import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-beauty-therapy';
import lesson2 from './lesson2-role-responsibilities';
import lesson3 from './lesson3-professional-ethics-client-care';
import lesson4 from './lesson4-salon-hygiene-safety-sterilization';
import quiz from './quiz';

const module1: Module = {
  id: 1,
  title: '💆 Module 1: Introduction to Beauty Therapy',
  description: 'Learn the fundamentals of beauty therapy, understand the role and responsibilities of beauty therapists, explore professional ethics and client care, and master salon hygiene, safety, and sterilization practices.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module1;
