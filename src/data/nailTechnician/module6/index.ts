import { Module } from '@/types/course';
import { lesson6_1 } from './lesson6_1';
import { lesson6_2 } from './lesson6_2';
import { lesson6_3 } from './lesson6_3';
import { quiz6 } from './quiz6';

export const module6: Module = {
  id: 6,
  title: 'Building a Career as a Nail Technician',
  description: 'Learn professional salon management, marketing strategies, and how to stay current with industry trends to build a successful nail technician career',
  lessons: [
    lesson6_1,
    lesson6_2,
    lesson6_3,
    {
      id: quiz6.id,
      title: quiz6.title,
      duration: '0:00',
      type: 'quiz',
      content: { questions: quiz6.questions }
    }
  ]
}; 