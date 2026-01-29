import type { Module } from '@/types/course';
import lesson1 from './lesson1-introduction';
import lesson2 from './lesson2-common-types-of-cyber-threats';
import lesson3 from './lesson3-emerging-threats';
import lesson4 from './lesson4-summary-of-threat-categories';
import quiz from './quiz';

const module2: Module = {
  id: 2,
  title: '🛡️ Module 2: Types of Cyber Threats',
  description: 'Learn about common cyber threats including malware, phishing, social engineering, DDoS attacks, zero-day exploits, and emerging threats like IoT attacks and AI-powered malware.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    lesson4,
    quiz
  ]
};

export default module2;

