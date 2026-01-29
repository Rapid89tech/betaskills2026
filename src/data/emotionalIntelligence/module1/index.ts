import type { Module } from '@/types/course';
import lesson1 from './lesson1-ei-definition-history-comparison';
import lesson2 from './lesson2-five-key-components';
import quiz from './quiz';

const module1: Module = {
  id: 1,
  title: '🧠 Module 1: Introduction to Emotional Intelligence',
  description: 'Explore the fundamentals of Emotional Intelligence, including its definition, history, and comparison with IQ. Learn about the five key components of EI: self-awareness, self-regulation, motivation, empathy, and social skills.',
  lessons: [
    lesson1,
    lesson2,
    quiz
  ]
};

export default module1;
