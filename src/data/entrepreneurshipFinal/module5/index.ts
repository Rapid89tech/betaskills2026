import type { Module } from '@/types/course';
import { lesson1BrandIdentity } from './lesson1-brand-identity';
import { lesson2MarketingStrategies } from './lesson2-marketing-strategies';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: 'Branding and Marketing Strategies',
  description: 'Creating a strong brand and effective marketing plan is essential for attracting customers, building loyalty, and driving sales in competitive markets. This module explores the foundations of branding—crafting a unique value proposition, designing a compelling visual identity, establishing a consistent brand voice, and developing a memorable tagline. It also covers marketing strategies, including social media and digital marketing, networking and partnerships, customer engagement, loyalty programs, content marketing, and influencer marketing. These strategies ensure startups stand out, connect with audiences, and achieve sustainable growth.',
  lessons: [
    lesson1BrandIdentity,
    lesson2MarketingStrategies,
    module5Quiz
  ]
};

export default module5; 