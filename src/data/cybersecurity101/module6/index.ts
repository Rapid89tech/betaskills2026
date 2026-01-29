import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-web-application-security';
import lesson2 from './lesson2-common-web-application-vulnerabilities';
import lesson3 from './lesson3-owasp-top-10';
import quiz from './quiz';

const module6: Module = {
  id: 6,
  title: '🌐 Module 6: Web Application Security',
  description: 'Learn web application security fundamentals, common vulnerabilities (SQL injection, XSS, CSRF), and the OWASP Top 10 security risks.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz
  ]
};

export default module6;

