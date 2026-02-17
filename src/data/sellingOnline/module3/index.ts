import type { Module } from '@/types/course';
import { lesson1TargetAudience } from './lesson1-target-audience';
import { lesson2BuyerPersonas } from './lesson2-buyer-personas';
import { lesson3PainPointsMotivations } from './lesson3-pain-points-motivations';
import { lesson4CustomerJourney } from './lesson4-customer-journey';
import { lesson5TrustCredibility } from './lesson5-trust-credibility';
import { quiz3 } from './quiz3';

export const module3: Module = {
  id: 3,
  title: 'Understanding Your Customer',
  description: 'Learn how to identify your target audience, create buyer personas, understand customer pain points and motivations, map customer journeys, and build trust and credibility online.',
  lessons: [
    lesson1TargetAudience,
    lesson2BuyerPersonas,
    lesson3PainPointsMotivations,
    lesson4CustomerJourney,
    lesson5TrustCredibility
  ],
  quiz: quiz3
};
