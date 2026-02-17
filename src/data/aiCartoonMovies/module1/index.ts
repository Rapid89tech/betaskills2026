import { Module } from '../../../types/course';
import Lesson1 from './lesson1-what-is-ai-assisted';
import Lesson2 from './lesson2-traditional-vs-ai';
import Lesson3 from './lesson3-benefits-of-ai';
import Lesson4 from './lesson4-ai-tools-overview';
import { quiz1 } from './quiz1';

export const module1: Module = {
  id: 'ai-cartoon-movies-module1',
  title: 'Module 1: Introduction to AI-Assisted Animation',
  description: 'Discover the fundamentals of AI-assisted cartoon movie making, compare traditional and AI-driven workflows, and explore the benefits and tools available for modern animation.',
  lessons: [
    {
      id: 'lesson1',
      title: 'What Is AI-Assisted Cartoon Movie Making?',
      content: Lesson1,
      duration: '25 minutes'
    },
    {
      id: 'lesson2',
      title: 'Traditional vs. AI-Driven Animation Workflows',
      content: Lesson2,
      duration: '30 minutes'
    },
    {
      id: 'lesson3',
      title: 'Benefits of Using AI in Animation',
      content: Lesson3,
      duration: '20 minutes'
    },
    {
      id: 'lesson4',
      title: 'Overview of Available AI Tools for Animation',
      content: Lesson4,
      duration: '35 minutes'
    }
  ],
  quiz: quiz1
};
