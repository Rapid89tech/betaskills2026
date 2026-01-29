import type { Module } from '@/types/course';
import lesson1 from './lesson1-hands-on-grooming-practice';
import quiz from './quiz';

const module10: Module = {
  id: 10,
  title: '🎓 Module 10: Practical Workshop & Assessment',
  description: 'Apply hands-on grooming techniques with different breeds and coat types, practice professional skills, and complete the final assessment.',
  lessons: [
    lesson1,
    quiz
  ]
};

export default module10;

