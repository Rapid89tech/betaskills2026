import type { Module } from '@/types/course';
import { lesson1BraidingUpdos } from './lesson1-braiding-updos';
import { module8Quiz } from './quiz8';

const module8: Module = {
  id: 8,
  title: '💐 Module 8: Braiding and Updos',
  description: 'Master French, Dutch, and fishtail braids, create elegant bridal and event updos, and learn to secure styles with pins and accessories',
  lessons: [
    lesson1BraidingUpdos,
    module8Quiz
  ]
};

export default module8;
