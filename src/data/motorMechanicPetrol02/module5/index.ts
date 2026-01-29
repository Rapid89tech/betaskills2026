import { Module } from '@/types/course';
import lesson1 from './lesson1-identifying-wear-tear';
import lesson2 from './lesson2-adjusting-tension-replacing-belts';
import quiz5 from './quiz5';

const module5: Module = {
  id: 5,
  title: 'Inspecting Drive Belts and Timing Belts',
  description: 'This module equips learners with critical skills for inspecting and maintaining drive and timing belts, essential for petrol engine performance and longevity. Participants will learn to identify wear and tear, check belt tension, and execute replacements to prevent breakdowns and costly engine damage.',
  lessons: [
    lesson1,
    lesson2,
    quiz5
  ]
};

export default module5;
