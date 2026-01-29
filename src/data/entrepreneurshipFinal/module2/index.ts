import type { Module } from '@/types/course';
import { lesson1BusinessPlanComponents } from './lesson1-business-plan-components';
import { lesson2ExecutiveSummary } from './lesson2-executive-summary';
import { lesson3BusinessDescription } from './lesson3-business-description';
import { lesson4MarketAnalysis } from './lesson4-market-analysis';
import { lesson5OperationalPlan } from './lesson5-operational-plan';
import { lesson6FinancialPlan } from './lesson6-financial-plan';
import { lesson7SmartGoals } from './lesson7-smart-goals';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: 'Developing a Business Plan',
  description: 'A business plan is a strategic roadmap that outlines your startup\'s goals, operations, and financial projections. It serves as a blueprint for launching and growing your business, providing clarity for you and credibility for investors or partners. This module covers the key components of a business plan—Executive Summary, Business Description, Market Analysis, Operational Plan, and Financial Plan—along with the importance of setting SMART goals to ensure your objectives are clear, trackable, and aligned with your vision.',
  lessons: [
    lesson1BusinessPlanComponents,
    lesson2ExecutiveSummary,
    lesson3BusinessDescription,
    lesson4MarketAnalysis,
    lesson5OperationalPlan,
    lesson6FinancialPlan,
    lesson7SmartGoals,
    module2Quiz
  ]
};

export default module2; 