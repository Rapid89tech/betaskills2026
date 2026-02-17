import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-customer-service';
import { quiz11 } from './quiz11';

const module11: Module = {
  id: 11,
  title: '🤝 Module 11: Customer Service and Communication Skills',
  description: 'Master professional customer service, effective communication, handling difficult situations, and building customer loyalty in the repair business.',
  lessons: [
    lesson1,
    quiz11
  ]
};

export default module11;
