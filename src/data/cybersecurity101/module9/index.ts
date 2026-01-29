import type { Module } from '@/types/course';
import lesson1 from './lesson1-what-is-cloud-security';
import lesson2 from './lesson2-cloud-deployment-models';
import lesson3 from './lesson3-shared-responsibility-model';
import quiz from './quiz';

const module9: Module = {
  id: 9,
  title: '☁️ Module 9: Cloud Security Essentials',
  description: 'Learn about cloud security fundamentals, cloud deployment models, the shared responsibility model, and best practices for securing cloud environments.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz
  ]
};

export default module9;
