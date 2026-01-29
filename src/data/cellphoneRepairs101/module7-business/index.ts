import type { Module } from '@/types/course';
import { lesson1SourcingQualityParts } from './lesson1-sourcing-quality-parts';
import { lesson2PricingStrategies } from './lesson2-pricing-strategies';
import { lesson3BuildingTrust } from './lesson3-building-trust';
import { lesson4SocialMediaMarketing } from './lesson4-social-media-marketing';
import { module7Quiz } from './quiz';

const module7: Module = {
  id: 7,
  title: 'Module 7: Setting Up a Repair Business (Optional)',
  description: 'Essential business strategies for phone repair entrepreneurs including sourcing quality parts, pricing strategies, customer service, and marketing techniques.',
  lessons: [
    lesson1SourcingQualityParts,
    lesson2PricingStrategies,
    lesson3BuildingTrust,
    lesson4SocialMediaMarketing,
    module7Quiz
  ]
};

export default module7;
