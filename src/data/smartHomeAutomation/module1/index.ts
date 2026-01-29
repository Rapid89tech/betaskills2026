import type { Module } from '@/types/course';
import { lesson1SmartHomeTechnology } from './lesson1-smart-home-technology';
import { lesson2KeyComponents } from './lesson2-key-components';
import { lesson3BenefitsOfHomeAutomation } from './lesson3-benefits-of-home-automation';
import { lesson4MarketOverviewAndTrends } from './lesson4-market-overview-and-trends';
import { quiz } from './quiz';

export const module1: Module = {
  id: 1,
  title: 'Introduction to Smart Home Automation',
  description: 'Understanding smart home technology, key components, benefits of home automation, market overview and trends, and practical implementation guide.',
  lessons: [
    lesson1SmartHomeTechnology,
    lesson2KeyComponents,
    lesson3BenefitsOfHomeAutomation,
    lesson4MarketOverviewAndTrends,
    quiz
  ]
};
