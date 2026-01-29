import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-endpoint-security';
import lesson2 from './lesson2-why-endpoint-security-matters';
import lesson3 from './lesson3-operating-system-security-fundamentals';
import lesson4 from './lesson4-types-of-endpoint-security-solutions';
import lesson5 from './lesson5-endpoint-threats';
import lesson6 from './lesson6-best-practices-for-endpoint-protection';
import quiz from './quiz';

const module5: Module = {
  id: 5,
  title: '💻 Module 5: Operating System and Endpoint Security',
  description: 'Learn endpoint security fundamentals, operating system security features, types of endpoint security solutions, endpoint threats, and best practices for endpoint protection.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    lesson6,
    quiz
  ]
};

export default module5;

