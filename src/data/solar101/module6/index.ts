import type { Module } from '@/types/course';
import lesson1 from './lesson1-routine-inspection';
import lesson2 from './lesson2-cleaning-panels';
import lesson3 from './lesson3-diagnosing-issues';
import lesson4 from './lesson4-monitoring-performance';
import lesson5 from './lesson5-replacing-components';
import lesson6 from './lesson6-troubleshooting-guide';
import quiz from './quiz';

const module6: Module = {
  id: 6,
  title: 'Maintenance and Troubleshooting',
  description: 'Learn essential maintenance procedures, cleaning techniques, diagnostic methods, performance monitoring, component replacement, and comprehensive troubleshooting strategies.',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6],
  quiz
};

export default module6;

