import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-network-security';
import lesson2 from './lesson2-components-of-network-security';
import lesson3 from './lesson3-network-security-technologies';
import lesson4 from './lesson4-network-attacks-and-threats';
import lesson5 from './lesson5-network-security-best-practices';
import lesson6 from './lesson6-secure-network-design-principles';
import quiz from './quiz';

const module4: Module = {
  id: 4,
  title: '🌐 Module 4: Network Security Fundamentals',
  description: 'Learn network security fundamentals including components, technologies (VPNs, firewalls, IDS/IPS), network attacks and threats, best practices, and secure network design principles.',
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

export default module4;

