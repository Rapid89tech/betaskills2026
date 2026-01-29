import { Module } from '@/types/course';
import { lesson4_1 } from './lesson4_1';
import { lesson4_2 } from './lesson4_2';
import { lesson4_3 } from './lesson4_3';
import { quiz4 } from './quiz4';

export const module4: Module = {
  id: 4,
  title: 'Nail Art and Creative Techniques',
  description: 'Master professional nail art tools, techniques, and stay current with industry trends',
  lessons: [
    lesson4_1,
    lesson4_2,
    lesson4_3,
    {
      id: quiz4.id,
      title: quiz4.title,
      duration: '0:00',
      type: 'quiz',
      content: { questions: quiz4.questions }
    }
  ]
}; 