import type { Module } from '@/types/course';
import { lesson1IntroToPaidAds } from './lesson1-intro-to-paid-ads';
import { lesson2MetaLinkedInManagers } from './lesson2-meta-linkedin-managers';
import { lesson3Targeting } from './lesson3-targeting';
import { lesson4BudgetingBidding } from './lesson4-budgeting-bidding';
import { lesson5AbTesting } from './lesson5-ab-testing';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: '💰 Module 5: Paid Social Media Advertising',
  description: 'Master paid advertising strategies including PPC, boosted posts, platform ad managers, targeting, budgeting, and A/B testing',
  lessons: [
    lesson1IntroToPaidAds,
    lesson2MetaLinkedInManagers,
    lesson3Targeting,
    lesson4BudgetingBidding,
    lesson5AbTesting,
    module5Quiz
  ]
};

export default module5;

