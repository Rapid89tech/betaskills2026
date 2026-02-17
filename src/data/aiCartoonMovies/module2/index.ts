import { Module } from '../../../types/course';
import Lesson1 from './lesson1-story-ideas-themes';
import Lesson2 from './lesson2-mood-boards';
import Lesson3 from './lesson3-script-drafts';
import Lesson4 from './lesson4-iterative-editing';
import { quiz2 } from './quiz2';

export const module2: Module = {
  id: 'ai-cartoon-movies-module2',
  title: 'Module 2: Pre-Production with AI',
  description: 'Learn how to leverage AI tools for story development, mood board creation, scriptwriting, and iterative refinement in animation pre-production.',
  lessons: [
    {
      id: 'lesson1',
      title: 'Generating Story Ideas and Themes with AI',
      content: Lesson1,
      duration: '25 minutes'
    },
    {
      id: 'lesson2',
      title: 'AI-Powered Mood Boards for Animation',
      content: Lesson2,
      duration: '30 minutes'
    },
    {
      id: 'lesson3',
      title: 'Using AI for Script Drafts and Dialogue Generation',
      content: Lesson3,
      duration: '35 minutes'
    },
    {
      id: 'lesson4',
      title: 'Iterative Editing and Refinement with AI Feedback',
      content: Lesson4,
      duration: '30 minutes'
    }
  ],
  quiz: quiz2
};
