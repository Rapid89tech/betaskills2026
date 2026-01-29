import type { Module } from '@/types/course';
import { lesson1UnderstandingPodcastMonetization } from './lesson1-understanding-podcast-monetization';
import { lesson2AdvertisingAndSponsorshipStrategies } from './lesson2-advertising-and-sponsorship-strategies';
import { lesson3PremiumContentAndSubscriptionModels } from './lesson3-premium-content-and-subscription-models';
import { lesson4DiversifiedRevenueStreams } from './lesson4-diversified-revenue-streams';
import { module7Quiz } from './quiz';

const module7: Module = {
  id: 7,
  title: '💰 Module 7: Monetization Strategies',
  description: 'Master the essential monetization strategies for podcast success. Learn how to understand podcast monetization, develop advertising and sponsorship strategies, create premium content and subscription models, and build diversified revenue streams for sustainable income.',
  lessons: [
    lesson1UnderstandingPodcastMonetization,
    lesson2AdvertisingAndSponsorshipStrategies,
    lesson3PremiumContentAndSubscriptionModels,
    lesson4DiversifiedRevenueStreams,
    module7Quiz
  ]
};

export default module7;
