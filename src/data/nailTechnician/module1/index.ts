import { Module } from '@/types/course';
import { lesson1_1 } from './lesson1_1';
import { lesson1_2 } from './lesson1_2';
import { quiz1 } from './quiz1';

export const module1: Module = {
  id: 1,
  title: 'Introduction to Nail Care',
  description: 'Learn the fundamentals of nail anatomy, common nail conditions, essential tools and products, and proper sanitation procedures.',
  lessons: [
    lesson1_1,
    lesson1_2,
    {
      id: quiz1.id,
      title: quiz1.title,
      duration: '0:00',
      type: 'quiz',
      content: { questions: quiz1.questions }
    }
  ]
}; 