import type { Module } from '@/types/course';
import lesson1 from './lesson1-building-trust-rapport';
import lesson2 from './lesson2-grooming-tools';
import lesson3 from './lesson3-sanitation-hygiene';
import lesson4 from './lesson4-handling-anxious-aggressive';
import lesson5 from './lesson5-personal-canine-safety';
import quiz from './quiz';

const module3: Module = {
  id: 3,
  title: '🛠️ Module 3: Tools, Equipment & Safety',
  description: 'Learn about grooming tools, sanitation practices, handling techniques for anxious or aggressive dogs, and personal and canine safety practices.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    quiz
  ]
};

export default module3;

