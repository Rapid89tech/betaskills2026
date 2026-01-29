import { lesson1MarketResearch } from './lesson1-market-research';
import { lesson2TargetCustomers } from './lesson2-target-customers';
import { lesson3Quiz } from './lesson3-quiz';
import type { Module } from '@/types/course';

export const module2: Module = {
  id: 2,
  title: 'Market Research',
  description: 'Learn how to conduct effective market research, identify business opportunities, and validate your business ideas through systematic analysis.',
  lessons: [
    lesson1MarketResearch,
    lesson2TargetCustomers,
    lesson3Quiz
  ]
}; 