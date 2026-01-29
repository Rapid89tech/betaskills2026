import { Module } from '@/types/course';
import { lesson11_1 } from './lesson11_1';
import { quiz11 } from './quiz11';

export const module11: Module = {
  id: 11,
  title: 'Chemical Processes in Hairdressing',
  description: 'Master chemical processes including perming, relaxing, keratin treatments, and color correction techniques for professional hair styling.',
  lessons: [
    lesson11_1,
    quiz11
  ]
}; 