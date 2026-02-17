import type { Module } from '@/types/course';
import { lesson7_1 } from './module7/lesson7_1';
import { lesson7_2 } from './module7/lesson7_2';
import { quiz7 } from './module7/quiz7';

export const module7: Module = {
  id: 7,
  title: '🔍 Module 7: Diagnosing and Repairing Common Engine Issues',
  description: 'Master essential skills to diagnose and repair common petrol engine issues, including misfiring, poor fuel economy, rough idling, stalling, unusual noises, and exhaust smoke. Learn symptom identification, understand underlying causes, and prioritize repairs effectively.',
  lessons: [
    lesson7_1,
    lesson7_2,
    quiz7
  ]
};
