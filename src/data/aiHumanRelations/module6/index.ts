import { Module } from '@/types/course';
import { lesson6_1 } from './lesson6_1';
import { lesson6_2 } from './lesson6_2';
import { lesson6_3 } from './lesson6_3';
import { quiz6 } from './quiz6';

export const module6: Module = {
  id: 6,
  title: 'Legal and Psychological Implications of AI',
  description: 'Examine the legal frameworks surrounding AI responsibility, trust dynamics in human-AI interaction, and the psychological effects of AI on human identity and behavior.',
  lessons: [
    lesson6_1,
    lesson6_2,
    lesson6_3,
    quiz6
  ]
};
