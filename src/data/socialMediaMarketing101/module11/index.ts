import type { Module } from '@/types/course';
import { lesson1SocialCommerce } from './lesson1-social-commerce';
import { lesson2AiTools } from './lesson2-ai-tools';
import { lesson3GamificationAr } from './lesson3-gamification-ar';
import { lesson4FutureTrends } from './lesson4-future-trends';
import { module11Quiz } from './quiz';

const module11: Module = {
  id: 11,
  title: '🚀 Module 11: Advanced Strategies & Trends',
  description: 'Master social commerce, AI tools, gamification with AR filters, and emerging platform strategies',
  lessons: [
    lesson1SocialCommerce,
    lesson2AiTools,
    lesson3GamificationAr,
    lesson4FutureTrends,
    module11Quiz
  ]
};

export default module11;

