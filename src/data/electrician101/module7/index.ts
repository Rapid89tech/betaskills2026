import type { Module } from '@/types/course';
import { lesson1IntroToNEC } from './lesson1-intro-to-nec';
import { lesson2NECRequirements } from './lesson2-nec-requirements';
import { lesson3CodeCompliance } from './lesson3-code-compliance';
import { module7Quiz } from './quiz';

const module7: Module = {
  id: 7,
  title: '📖 Module 7: National Electrical Code (NEC)',
  description: 'Master NEC standards, requirements, code compliance, and electrical inspection procedures',
  lessons: [
    lesson1IntroToNEC,
    lesson2NECRequirements,
    lesson3CodeCompliance,
    module7Quiz
  ]
};

export default module7;

