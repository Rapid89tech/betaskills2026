import type { Module } from '@/types/course';
import { lesson1_1 } from './module1/lesson1_1';
import { quiz1 } from './module1/quiz1';

export const module1: Module = {
  id: 1,
  title: '🌐 Module 1: Foundations of AI and Human Interaction',
  description: 'Comprehensive foundation for understanding Artificial Intelligence (AI) and its profound impact on human relations, exploring AI\'s definitions, historical evolution, types, capabilities, and practical applications in human-centered contexts',
  lessons: [
    lesson1_1,
    quiz1
  ]
};
