
import { Module } from '@/types/course';
import { lesson5_1 } from './lesson5_1';
import { lesson5_2 } from './lesson5_2';
import { lesson5_3 } from './lesson5_3';
import { lesson5_4 } from './lesson5_4';
import { lesson5_5 } from './lesson5_5';
import { quiz5 } from './quiz5';

export const module5: Module = {
  id: 5,
  title: 'Education, Learning & AI',
  description: 'Explore how AI is transforming education through tutors, adaptive learning systems, assessment tools, teacher-student relationships, humanizing digital education, and the future of learning.',
  lessons: [
    lesson5_1,
    lesson5_2,
    lesson5_3,
    lesson5_4,
    lesson5_5,
    quiz5
  ]
};
