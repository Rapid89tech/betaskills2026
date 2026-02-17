import type { Module } from '@/types/course';
import { lesson1FinalAssessment } from './lesson1-final-assessment';
import { module7Quiz } from './quiz7';

const module7: Module = {
  id: 7,
  title: '🎓 Module 7: Final Assessment and Certification',
  description: 'Complete your comprehensive final assessment covering all course modules and earn your Professional Nail Technician Certificate',
  lessons: [
    lesson1FinalAssessment,
    module7Quiz
  ]
};

export default module7;
