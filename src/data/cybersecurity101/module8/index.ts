import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-cybersecurity-risk-management';
import lesson2 from './lesson2-components-of-risk-management';
import lesson3 from './lesson3-risk-treatment-strategies';
import lesson4 from './lesson4-cybersecurity-incident-response';
import lesson5 from './lesson5-incident-response-lifecycle';
import quiz from './quiz';

const module8: Module = {
  id: 8,
  title: '⚠️ Module 8: Cybersecurity Risk Management and Incident Response',
  description: 'Learn about risk management processes, risk treatment strategies, incident response planning, and the NIST incident response lifecycle.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    lesson5,
    quiz
  ]
};

export default module8;
