import type { Module } from '@/types/course';
import { lesson1GelAcrylicNails } from './lesson1-gel-acrylic-nails';
import { module3Quiz } from './quiz3';

const module3: Module = {
  id: 3,
  title: '💎 Module 3: Gel and Acrylic Nail Applications',
  description: 'Learn professional gel and acrylic nail enhancement techniques, including application, shaping, troubleshooting, and safety practices',
  lessons: [
    lesson1GelAcrylicNails,
    module3Quiz
  ]
};

export default module3;
