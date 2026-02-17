import { Module } from '../../../types/course';
import Lesson1 from './lesson1-editing-software';
import Lesson2 from './lesson2-color-transitions';
import Lesson3 from './lesson3-special-effects';
import Lesson4 from './lesson4-rendering-optimization';
import { quiz5 } from './quiz5';

export const module5: Module = {
  id: 'ai-cartoon-movies-module5',
  title: 'Module 5: Post-Production',
  description: 'Master AI-powered post-production techniques including editing software, color correction, special effects, and rendering optimization for professional cartoon movie finishing.',
  lessons: [
    {
      id: 'lesson1',
      title: 'AI-Powered Editing Software: Runway and Pika Labs',
      content: Lesson1,
      duration: '35 minutes'
    },
    {
      id: 'lesson2',
      title: 'Automatic Color Correction and Scene Transitions',
      content: Lesson2,
      duration: '30 minutes'
    },
    {
      id: 'lesson3',
      title: 'Special Effects with AI Generators',
      content: Lesson3,
      duration: '30 minutes'
    },
    {
      id: 'lesson4',
      title: 'Final Rendering Optimization with AI',
      content: Lesson4,
      duration: '35 minutes'
    }
  ],
  quiz: quiz5
};
