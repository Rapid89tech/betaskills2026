import { Module } from '@/types/course';
import { lesson1 } from './lesson1-podcast-branding';
import { lesson2 } from './lesson2-titles-descriptions';
import { lesson3 } from './lesson3-promotion-strategies';
import { quiz6 } from './quiz6';

const module6: Module = {
  id: 6,
  title: 'Marketing and Promotion',
  description: 'Master podcast branding, craft compelling titles and descriptions, and learn effective promotion strategies through social media, newsletters, collaborations, and community building.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz6
  ]
};

export default module6;
