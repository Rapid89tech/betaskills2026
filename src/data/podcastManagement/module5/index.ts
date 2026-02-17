import { Module } from '@/types/course';
import { lesson1 } from './lesson1-selecting-hosting-platform';
import { lesson2 } from './lesson2-setting-up-rss-feeds';
import { quiz5 } from './quiz5';

const module5: Module = {
  id: 5,
  title: 'Hosting & Distribution',
  description: 'Learn how to select the right podcast hosting platform, set up RSS feeds, and distribute your podcast to major directories for maximum reach and accessibility.',
  lessons: [
    lesson1,
    lesson2,
    quiz5
  ]
};

export default module5;