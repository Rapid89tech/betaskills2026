import { Module } from '@/types/course';
import { lesson1 } from './lesson1-sponsorships-ads';
import { lesson2 } from './lesson2-listener-support-premium';
import { lesson3 } from './lesson3-affiliate-analytics';
import { quiz7 } from './quiz7';

const module7: Module = {
  id: 7,
  title: 'Monetization Strategies',
  description: 'Learn how to monetize your podcast through sponsorships, ads, listener support, premium content, affiliate marketing, and analytics tracking to build sustainable revenue streams.',
  lessons: [
    lesson1,
    lesson2,
    lesson3,
    quiz7
  ]
};

export default module7;
