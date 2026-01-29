import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-cybersecurity';
import lesson2 from './lesson2-importance-of-cybersecurity';
import lesson3 from './lesson3-cybersecurity-vs-information-security';
import quiz from './quiz';

const module1: Module = {
  id: 1,
  title: '🔒 Module 1: Introduction to Cybersecurity',
  description: 'Learn the fundamentals of cybersecurity, including what cybersecurity is, its importance in personal and organizational contexts, and how it differs from information security.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz
  ]
};

export default module1;

