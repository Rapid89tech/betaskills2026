import type { Module } from '@/types/course';
import { lesson1DevelopingAMarketingStrategy } from './lesson1-developing-a-marketing-strategy';
import { lesson2SocialMediaPromotion } from './lesson2-social-media-promotion';
import { lesson3EmailMarketingAndNewsletters } from './lesson3-email-marketing-and-newsletters';
import { lesson4CollaborationsAndPartnerships } from './lesson4-collaborations-and-partnerships';
import { module6Quiz } from './quiz';

const module6: Module = {
  id: 6,
  title: '📢 Module 6: Marketing and Promotion',
  description: 'Master the essential marketing and promotion strategies for podcast growth and audience engagement. Learn how to develop comprehensive marketing strategies, leverage social media platforms, build email marketing campaigns, and create successful collaborations and partnerships.',
  lessons: [
    lesson1DevelopingAMarketingStrategy,
    lesson2SocialMediaPromotion,
    lesson3EmailMarketingAndNewsletters,
    lesson4CollaborationsAndPartnerships,
    module6Quiz
  ]
};

export default module6;
