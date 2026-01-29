import type { Module } from '@/types/course';
import { lesson1BuildingCommunity } from './lesson1-building-community';
import { lesson2EngagementStrategies } from './lesson2-engagement-strategies';
import { lesson3HashtagsTrends } from './lesson3-hashtags-trends';
import { lesson4SocialListening } from './lesson4-social-listening';
import { module6Quiz } from './quiz';

const module6: Module = {
  id: 6,
  title: '🌱 Module 6: Organic Growth & Engagement',
  description: 'Learn to build authentic communities, drive engagement through likes/comments/shares, leverage hashtags and trends, and manage brand reputation',
  lessons: [
    lesson1BuildingCommunity,
    lesson2EngagementStrategies,
    lesson3HashtagsTrends,
    lesson4SocialListening,
    module6Quiz
  ]
};

export default module6;

