import { Module } from '../../../types/course';
import Lesson1 from './lesson1-character-concepts';
import Lesson2 from './lesson2-blending-ai-human';
import Lesson3 from './lesson3-world-environments';
import Lesson4 from './lesson4-consistency-style';
import { quiz3 } from './quiz3';

export const module3: Module = {
  id: 'ai-cartoon-movies-module3',
  title: 'Module 3: Character & World Design',
  description: 'Master AI-powered character creation, world building, and techniques for maintaining visual consistency across your animated projects.',
  lessons: [
    {
      id: 'lesson1',
      title: 'AI-Generated Character Concepts for Animation',
      content: Lesson1,
      duration: '30 minutes'
    },
    {
      id: 'lesson2',
      title: 'Blending AI with Human Touch-Up (Photoshop/Illustrator)',
      content: Lesson2,
      duration: '35 minutes'
    },
    {
      id: 'lesson3',
      title: 'Creating Worlds and Environments with AI',
      content: Lesson3,
      duration: '30 minutes'
    },
    {
      id: 'lesson4',
      title: 'Maintaining Consistency and Style Across Designs',
      content: Lesson4,
      duration: '35 minutes'
    }
  ],
  quiz: quiz3
};
