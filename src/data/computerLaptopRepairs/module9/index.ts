import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-virus-optimization';
import { quiz9 } from './quiz9';

const module9: Module = {
  id: 9,
  title: '🛡️ Module 9: Virus Removal and System Optimization',
  description: 'Master identifying and removing viruses and malware, and optimize system performance through cleaning, updates, and configuration.',
  lessons: [
    lesson1,
    quiz9
  ]
};

export default module9;
