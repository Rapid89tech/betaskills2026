import type { Module } from '@/types/course';
import lesson1 from './lesson1-basic-joints';
import lesson2 from './lesson2-intermediate-joints';
import lesson3 from './lesson3-advanced-joints';
import lesson4 from './lesson4-applications-construction-furniture';
import quiz from './quiz';

const module5: Module = {
  id: 5,
  title: 'Wood Joints & Joinery',
  description: 'Learn fundamental wood joining techniques from basic butt and lap joints to advanced dovetails and mortise-and-tenon connections for strong, durable assemblies.',
  lessons: [lesson1, lesson2, lesson3, lesson4],
  quiz
};

export default module5;

