import { Module } from '@/types/course';
import { lesson1 } from './lesson1-scaling-growth';
import { quiz8 } from './quiz8';

const module8: Module = {
  id: 8,
  title: 'Scaling and Growth',
  description: 'Learn how to scale your podcast strategically by increasing listenership, improving content quality, expanding revenue streams, and building brand authority through sustainable growth practices.',
  lessons: [
    lesson1,
    quiz8
  ]
};

export default module8;
