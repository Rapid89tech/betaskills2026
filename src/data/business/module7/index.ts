import { lesson1LaunchingScaling } from './lesson1-launching-scaling';
import { lesson2Quiz } from './lesson2-quiz';
import type { Module } from '@/types/course';

export const module7: Module = {
  id: 7,
  title: 'Launching and Scaling the Business',
  description: 'Learn the critical steps of launching your business through soft launches and full launches, and discover scaling strategies including expanding product lines, entering new markets, automating operations, building strategic partnerships, and leveraging data analytics.',
  lessons: [
    lesson1LaunchingScaling,
    lesson2Quiz
  ]
}; 