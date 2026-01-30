import type { Module } from '@/types/course';
import { lesson2_1 } from './module2/lesson2_1';
import { lesson2_2 } from './module2/lesson2_2';
import { lesson2_3 } from './module2/lesson2_3';
import { lesson2_4 } from './module2/lesson2_4';
import { quiz2 } from './module2/quiz2';

export const module2: Module = {
  id: 2,
  title: '🌐 Module 2: Communication and Emotional Intelligence',
  description: 'Explores the transformative role of AI in communication and emotional intelligence, focusing on conversational interfaces, affective computing, and their applications in human-centered contexts',
  lessons: [
    lesson2_1,
    lesson2_2,
    lesson2_3,
    lesson2_4,
    quiz2
  ]
};
