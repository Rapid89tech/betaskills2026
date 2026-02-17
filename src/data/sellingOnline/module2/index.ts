import type { Module } from '@/types/course';
import { lesson1PhysicalDigitalServices } from './lesson1-physical-digital-services';
import { lesson2FulfillmentModels } from './lesson2-fulfillment-models';
import { lesson3MarketResearch } from './lesson3-market-research';
import { lesson4CustomerProblems } from './lesson4-customer-problems';
import { lesson5ProductValidation } from './lesson5-product-validation';
import { lesson6CompetitiveAnalysis } from './lesson6-competitive-analysis';
import { module2Quiz } from './quiz2';

const module2: Module = {
  id: 2,
  title: '🎯 Module 2: Choosing What to Sell',
  description: 'Learn how to select profitable products, understand fulfillment models, conduct market research, and validate your ideas before investing',
  lessons: [
    lesson1PhysicalDigitalServices,
    lesson2FulfillmentModels,
    lesson3MarketResearch,
    lesson4CustomerProblems,
    lesson5ProductValidation,
    lesson6CompetitiveAnalysis,
    module2Quiz
  ]
};

export default module2;
