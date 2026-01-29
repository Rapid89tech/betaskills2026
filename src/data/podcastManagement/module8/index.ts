import type { Module } from '@/types/course';
import { lesson1UnderstandingPodcastAnalytics } from './lesson1-understanding-podcast-analytics';
import { lesson2AudienceGrowthStrategies } from './lesson2-audience-growth-strategies';
import { lesson3PerformanceOptimization } from './lesson3-performance-optimization';
import { lesson4LongTermSuccessStrategies } from './lesson4-long-term-success-strategies';
import { module8Quiz } from './quiz';

const module8: Module = {
  id: 8,
  title: '📊 Module 8: Podcast Analytics & Growth',
  description: 'Master podcast analytics and growth strategies. Learn how to understand podcast analytics, implement audience growth strategies, optimize performance, and develop long-term success strategies for sustainable podcast growth.',
  lessons: [
    lesson1UnderstandingPodcastAnalytics,
    lesson2AudienceGrowthStrategies,
    lesson3PerformanceOptimization,
    lesson4LongTermSuccessStrategies,
    module8Quiz
  ]
};

export default module8;
