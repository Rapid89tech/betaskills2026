import { Module } from '@/types/course';
import { lesson3_1 } from './lesson3_1';
import { lesson3_2 } from './lesson3_2';
import { lesson3_3 } from './lesson3_3';
import { quiz3_1 } from './quiz3_1';

export const module3: Module = {
  id: 3,
  title: 'Nail Enhancements',
  description: 'Master acrylic, gel, and dip powder nail enhancement techniques for creating durable, beautiful nail extensions and overlays.',
  lessons: [
    lesson3_1,
    lesson3_2,
    lesson3_3,
    {
      id: quiz3_1.id,
      title: quiz3_1.title,
      duration: '0:00',
      type: 'quiz',
      content: { questions: quiz3_1.questions }
    }
  ]
}; 