import type { Module } from '@/types/course';
import lesson1 from './lesson1-setting-up-business';
import lesson2 from './lesson2-pricing-communication-scheduling';
import lesson3 from './lesson3-record-keeping-customer-service';
import lesson4 from './lesson4-ethical-considerations-liability';
import lesson5 from './lesson5-marketing-client-base';
import quiz from './quiz';

const module9: Module = {
  id: 9,
  title: '💼 Module 9: Business & Professional Practice',
  description: 'Learn how to set up a grooming and training business, manage pricing and client communication, maintain records, handle ethical and liability issues, and build a loyal client base through effective marketing.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    quiz
  ]
};

export default module9;

