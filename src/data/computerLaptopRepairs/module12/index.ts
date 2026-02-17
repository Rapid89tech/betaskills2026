import type { Module } from '@/types/course';
import { lesson1 } from './lesson1-final-assessment';
import { quiz12 } from './quiz12';

const module12: Module = {
  id: 12,
  title: '🎓 Module 12: Final Assessment and Certification',
  description: 'Complete comprehensive final assessment including practical repair tasks, written exam, and customer interaction simulation. Prepare for CompTIA A+ certification.',
  lessons: [
    lesson1,
    quiz12
  ]
};

export default module12;
