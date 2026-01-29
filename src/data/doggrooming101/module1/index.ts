import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-dog-grooming-training';
import lesson2 from './lesson2-importance-grooming-training';
import lesson3 from './lesson3-roles-responsibilities';
import lesson4 from './lesson4-breeds-coats-temperaments';
import lesson5 from './lesson5-safety-ethics-welfare';
import quiz from './quiz';

export const module1: Module = {
  id: 1,
  title: 'Introduction to Dog Grooming & Training',
  description: 'Understand the fundamentals of dog grooming and training, including professional roles, breed characteristics, and ethical animal welfare practices.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    quiz
  ]
};

export default module1;

