import { Module } from '../../../types/course';
import Lesson1 from './lesson1-ai-voice-acting';
import Lesson2 from './lesson2-animation-tools';
import Lesson3 from './lesson3-motion-animation';
import Lesson4 from './lesson4-music-sound';
import { quiz4 } from './quiz4';

export const module4: Module = {
  id: 'ai-cartoon-movies-module4',
  title: 'Module 4: Animation Production',
  description: 'Master AI-powered animation production techniques including voice acting, motion capture, frame interpolation, and music composition for professional cartoon movie making.',
  lessons: [
    {
      id: 'lesson1',
      title: 'AI Voice Acting & Dialogue Generation',
      content: Lesson1,
      duration: '35 minutes'
    },
    {
      id: 'lesson2',
      title: 'AI Animation Tools and Techniques',
      content: Lesson2,
      duration: '30 minutes'
    },
    {
      id: 'lesson3',
      title: 'Motion & Animation with AI',
      content: Lesson3,
      duration: '40 minutes'
    },
    {
      id: 'lesson4',
      title: 'Music & Sound Effects with AI',
      content: Lesson4,
      duration: '35 minutes'
    }
  ],
  quiz: quiz4
};
