import { Module } from '@/types/course';
import { lesson1 } from './lesson1-project-management';
import { lesson2 } from './lesson2-automation-guests';
import { lesson3 } from './lesson3-sops-reporting';
import { quiz9 } from './quiz9';

const module9: Module = {
  id: 9,
  title: 'Project and Team Management',
  description: 'Master project management tools, workflow automation, guest management, SOPs, and client reporting to streamline podcast production and ensure consistent, professional results.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz9
  ]
};

export default module9;
