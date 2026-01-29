import type { Module } from '@/types/course';
import { lesson1DesignPrinciples } from './lesson1-design-principles';
import { lesson2DesignElements } from './lesson2-design-elements';
import { lesson3SiteAnalysis } from './lesson3-site-analysis';
import { lesson4DrawingPlans } from './lesson4-drawing-plans';
import { lesson5DesignSoftware } from './lesson5-design-software';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: '📐 Module 2: Landscape Design Principles',
  description: 'Learn how to plan and design effective landscape layouts',
  lessons: [
    lesson1DesignPrinciples,
    lesson2DesignElements,
    lesson3SiteAnalysis,
    lesson4DrawingPlans,
    lesson5DesignSoftware,
    module2Quiz
  ]
};

export default module2;

