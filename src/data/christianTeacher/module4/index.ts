import type { Module } from '@/types/course';
import { lesson1GraceFilledLearningEnvironment } from './lesson1-grace-filled-learning-environment';
import { lesson2FosteringRespectKindnessCollaboration } from './lesson2-fostering-respect-kindness-collaboration';
import { quiz } from './quiz';

export const module4: Module = {
  id: 4,
  title: 'Christian Classroom Management',
  description: 'Building a grace-filled learning environment, fostering respect, kindness, and collaboration in ministry, and creating supportive classroom communities.',
  lessons: [
    lesson1GraceFilledLearningEnvironment,
    lesson2FosteringRespectKindnessCollaboration,
    quiz
  ]
};
