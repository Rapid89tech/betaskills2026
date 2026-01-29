import { Module } from '@/types/course';
import { lesson1_1 } from './lesson1_1';
import { quiz1 } from './quiz1';

export const module1: Module = {
  id: 1,
  title: 'Foundations of AI and Human Interaction 🌐',
  description: 'This module provides a comprehensive foundation for understanding Artificial Intelligence (AI) and its profound impact on human relations, offering an in-depth exploration of AI\'s definitions, historical evolution, types, capabilities, and practical applications in human-centered contexts.',
  lessons: [
    lesson1_1,
    quiz1
  ]
}; 