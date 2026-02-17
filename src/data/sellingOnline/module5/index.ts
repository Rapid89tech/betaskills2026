import type { Module } from '@/types/course';
import { lesson1StoreBranding } from './lesson1-store-branding';
import { lesson2DomainHosting } from './lesson2-domain-hosting';
import { lesson3ProductListingStructure } from './lesson3-product-listing-structure';
import { lesson4TitlesDescriptionsSpecs } from './lesson4-titles-descriptions-specs';
import { lesson5PricingStrategies } from './lesson5-pricing-strategies';
import { quiz5 } from './quiz5';

export const module5: Module = {
  id: 5,
  title: 'Store & Listing Setup',
  description: 'Learn how to set up your online store with strong branding, create effective product listings, write compelling titles and descriptions, and implement smart pricing strategies.',
  lessons: [
    lesson1StoreBranding,
    lesson2DomainHosting,
    lesson3ProductListingStructure,
    lesson4TitlesDescriptionsSpecs,
    lesson5PricingStrategies
  ],
  quiz: quiz5
};
