import type { Module } from '@/types/course';
import { lesson1OverviewOfMajorPlatforms } from './lesson1-overview-of-major-platforms';
import { lesson2ChoosingRightPlatforms } from './lesson2-choosing-right-platforms';
import { lesson3PlatformDemographics } from './lesson3-platform-demographics';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: '🌐 Module 2: Understanding Social Media Platforms',
  description: 'Explore major social media platforms, their unique features, audiences, and how to choose the right platforms for your business goals',
  lessons: [
    lesson1OverviewOfMajorPlatforms,
    lesson2ChoosingRightPlatforms,
    lesson3PlatformDemographics,
    module2Quiz
  ]
};

export default module2;

