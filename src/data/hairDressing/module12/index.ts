import { Module } from '@/types/course';
import { lesson12_1 } from './lesson12_1';
import { quiz12 } from './quiz12';

export const module12: Module = {
  id: 12,
  title: 'Client Consultation and Business Skills',
  description: 'Master professional client consultation techniques, understanding client needs, recommending suitable styles and treatments, and managing client concerns effectively.',
  lessons: [
    lesson12_1,
    quiz12
  ]
}; 