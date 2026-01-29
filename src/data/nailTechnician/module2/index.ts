import { Module } from '@/types/course';
import { lesson2_1 } from './lesson2_1';
import { lesson2_2 } from './lesson2_2';
import { lesson2_3 } from './lesson2_3';
import { quiz2_1 } from './quiz2_1';

export const module2: Module = {
  id: 2,
  title: 'Manicures and Pedicures',
  description: 'Master professional manicure and pedicure techniques, including basic procedures, advanced services, and specialized treatments for different client needs.',
  lessons: [
    lesson2_1,
    lesson2_2,
    lesson2_3,
    {
      id: quiz2_1.id,
      title: quiz2_1.title,
      duration: '0:00',
      type: 'quiz',
      content: { questions: quiz2_1.questions }
    }
  ]
}; 