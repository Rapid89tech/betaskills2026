import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-post-diagnostics';
import { quiz3 } from './quiz3';

const module3: Module = {
  id: 3,
  title: '🔍 Module 3: Troubleshooting & Diagnostics',
  description: 'Master diagnosing POST errors, interpreting beep codes, and using diagnostic tools like multimeters and software to pinpoint hardware faults efficiently.',
  lessons: [
    lesson1,
    quiz3
  ]
};

export default module3;
