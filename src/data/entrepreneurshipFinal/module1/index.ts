import type { Module } from '@/types/course';
import { lesson1WhatIsEntrepreneurship } from './lesson1-what-is-entrepreneurship';
import { lesson2CharacteristicsOfEntrepreneurs } from './lesson2-characteristics-of-entrepreneurs';
import { lesson3BenefitsOfEntrepreneurship } from './lesson3-benefits-of-entrepreneurship';
import { lesson4IdentifyingBusinessOpportunities } from './lesson4-identifying-business-opportunities';
import { lesson5CommunityScan } from './lesson5-community-scan';
import { lesson6MarketResearchBasics } from './lesson6-market-research-basics';
import { lesson7TargetCustomers } from './lesson7-target-customers';
import { lesson8CustomerNeeds } from './lesson8-customer-needs';
import { lesson9ResearchMethods } from './lesson9-research-methods';
import { lesson10CustomerPersonas } from './lesson10-customer-personas';
import { lesson11UsingNeedsToShapeBusiness } from './lesson11-using-needs-to-shape-business';
import { lesson12CompetitorAnalysis } from './lesson12-competitor-analysis';
import { lesson13IndustryTrends } from './lesson13-industry-trends';
import { lesson14AssessingDemand } from './lesson14-assessing-demand';
import { lesson15IdeaValidation } from './lesson15-idea-validation';
import { lesson16CreatingMVP } from './lesson16-creating-mvp';
import { lesson17GatheringFeedback } from './lesson17-gathering-feedback';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: 'Introduction to Entrepreneurship and Market Research',
  description: 'This foundational module introduces the core concepts of entrepreneurship and the essential market research skills needed to identify viable business opportunities. You\'ll learn what entrepreneurship truly means, the characteristics of successful entrepreneurs, and how to systematically research your market to validate business ideas. Through practical tools like community scanning, customer interviews, and MVP creation, you\'ll develop the skills to identify real problems and create solutions that people actually want to buy.',
  lessons: [
    lesson1WhatIsEntrepreneurship,
    lesson2CharacteristicsOfEntrepreneurs,
    lesson3BenefitsOfEntrepreneurship,
    lesson4IdentifyingBusinessOpportunities,
    lesson5CommunityScan,
    lesson6MarketResearchBasics,
    lesson7TargetCustomers,
    lesson8CustomerNeeds,
    lesson9ResearchMethods,
    lesson10CustomerPersonas,
    lesson11UsingNeedsToShapeBusiness,
    lesson12CompetitorAnalysis,
    lesson13IndustryTrends,
    lesson14AssessingDemand,
    lesson15IdeaValidation,
    lesson16CreatingMVP,
    lesson17GatheringFeedback,
    module1Quiz
  ]
};

export default module1; 