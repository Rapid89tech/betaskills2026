import type { Module } from '@/types/course';
import lesson1 from './lesson1-advanced-obedience';
import lesson2 from './lesson2-socialization';
import lesson3 from './lesson3-behavioral-problems';
import lesson4 from './lesson4-clicker-trick-training';
import quiz from './quiz';

const module7: Module = {
  id: 7,
  title: '🎓 Module 7: Advanced Training & Behavior Management',
  description: 'Master advanced obedience and off-leash reliability, socialization techniques for puppies and adult dogs, correcting behavioral problems (aggression, separation anxiety, resource guarding), and clicker training and trick training.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module7;

