import type { Module } from '@/types/course';
import { lesson1BusinessSalonManagement } from './lesson1-business-salon-management';
import { module6Quiz } from './quiz6';

const module6: Module = {
  id: 6,
  title: '💼 Module 6: Building Your Nail Business',
  description: 'Learn business fundamentals, marketing strategies, pricing, client management, and salon operations to build a successful nail career',
  lessons: [
    lesson1BusinessSalonManagement,
    module6Quiz
  ]
};

export default module6;
