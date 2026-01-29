import type { Module } from '@/types/course';
import { lesson1ScreenDiagnosis } from './lesson1-screen-diagnosis';
import { lesson2ScreenRemoval } from './lesson2-screen-removal';
import { lesson3ScreenInstallation } from './lesson3-screen-installation';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: 'Module 4: Common Repairs',
  description: 'Diagnosing and repairing common smartphone issues including screen problems, safe removal techniques, and proper installation procedures.',
  lessons: [
    lesson1ScreenDiagnosis,
    lesson2ScreenRemoval,
    lesson3ScreenInstallation,
    module4Quiz
  ]
};

export default module4;
