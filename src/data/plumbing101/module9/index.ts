import type { Module } from '@/types/course';
import { lesson1UnderstandingPlumbingDrawingsAndSymbols } from './lesson1-understanding-plumbing-drawings-and-symbols';
import { lesson2MeasuringMaterialsAndEstimatingCosts } from './lesson2-measuring-materials-and-estimating-costs';
import { lesson3ProjectPlanningAndSiteLayout } from './lesson3-project-planning-and-site-layout';
import { module9Quiz } from './quiz';

const module9: Module = {
  id: 9,
  title: '📐 Module 9: Reading Plumbing Blueprints and Estimation',
  description: 'Master interpreting plumbing drawings and symbols, measuring materials, estimating costs, and project planning and site layout',
  lessons: [
    lesson1UnderstandingPlumbingDrawingsAndSymbols,
    lesson2MeasuringMaterialsAndEstimatingCosts,
    lesson3ProjectPlanningAndSiteLayout,
    module9Quiz
  ]
};

export default module9; 