import type { Module } from '@/types/course';
import { lesson1WhatIsSocialMediaMarketing } from './lesson1-what-is-social-media-marketing';
import { lesson2ImportanceOfSocialMediaMarketing } from './lesson2-importance-of-social-media-marketing';
import { lesson3EvolutionOfSocialMedia } from './lesson3-evolution-of-social-media';
import { lesson4SocialMediaVsTraditionalMarketing } from './lesson4-social-media-vs-traditional-marketing';
import { lesson5BenefitsForBusinesses } from './lesson5-benefits-for-businesses';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: '📱 Module 1: Introduction to Social Media Marketing',
  description: 'Learn the fundamentals of social media marketing, its importance, evolution, and how it compares to traditional marketing methods',
  lessons: [
    lesson1WhatIsSocialMediaMarketing,
    lesson2ImportanceOfSocialMediaMarketing,
    lesson3EvolutionOfSocialMedia,
    lesson4SocialMediaVsTraditionalMarketing,
    lesson5BenefitsForBusinesses,
    module1Quiz
  ]
};

export default module1;

