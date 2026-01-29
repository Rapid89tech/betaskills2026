import type { Module } from '@/types/course';
import lesson1 from './lesson1-cost-estimation';
import lesson2 from './lesson2-client-communication';
import lesson3 from './lesson3-legal-insurance';
import lesson4 from './lesson4-entrepreneurship';
import quiz from './quiz';

const module9: Module = {
  id: 9,
  title: 'Professional & Business Skills',
  description: 'Develop essential business skills including cost estimation, budgeting, client communication, legal compliance, insurance, and entrepreneurship for a successful carpentry business.',
  lessons: [lesson1, lesson2, lesson3, lesson4],
  quiz
};

export default module9;

