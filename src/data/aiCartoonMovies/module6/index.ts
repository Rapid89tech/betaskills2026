import { Module } from '../../../types/course';
import Lesson1 from './lesson1-trailers-teasers';
import Lesson2 from './lesson2-social-media';
import Lesson3 from './lesson3-analytics-marketing';
import { quiz6 } from './quiz6';

export const module6: Module = {
  id: 'ai-cartoon-movies-module6',
  title: 'Module 6: Distribution & Marketing',
  description: 'Learn AI-powered distribution and marketing strategies including trailer creation, social media promotion, and analytics-driven campaigns for successful cartoon movie launches.',
  lessons: [
    {
      id: 'lesson1',
      title: 'Creating AI-Generated Trailers and Teasers',
      content: Lesson1,
      duration: '35 minutes'
    },
    {
      id: 'lesson2',
      title: 'Social Media Promotion with AI Content Creators',
      content: Lesson2,
      duration: '30 minutes'
    },
    {
      id: 'lesson3',
      title: 'Analytics-Driven Marketing Strategies',
      content: Lesson3,
      duration: '35 minutes'
    }
  ],
  quiz: quiz6
};
