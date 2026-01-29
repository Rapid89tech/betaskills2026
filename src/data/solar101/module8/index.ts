import type { Module } from '@/types/course';
import lesson1 from './lesson1-starting-business';
import lesson2 from './lesson2-licenses-certifications';
import lesson3 from './lesson3-working-providers-utilities';
import lesson4 from './lesson4-marketing-services';
import lesson5 from './lesson5-scaling-staying-updated';
import quiz from './quiz';

const module8: Module = {
  id: 8,
  title: 'Business and Career Opportunities',
  description: 'Explore entrepreneurial opportunities in the solar industry, from starting your own installation business to marketing services, obtaining certifications, and scaling operations.',
  lessons: [lesson1, lesson2, lesson3, lesson4, lesson5],
  quiz
};

export default module8;

