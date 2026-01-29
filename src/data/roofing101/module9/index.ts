import type { Module } from '@/types/course';
import { lesson1ReadingBlueprintsAndRoofPlans } from './lesson1-reading-blueprints-and-roof-plans';
import { lesson2CalculatingRoofPitchAndArea } from './lesson2-calculating-roof-pitch-and-area';
import { lesson3MaterialTakeOffsAndWasteCalculations } from './lesson3-material-takeoffs-and-waste-calculations';
import { lesson4CostEstimationAndBudgeting } from './lesson4-cost-estimation-and-budgeting';
import { module9Quiz } from './quiz';

const module9: Module = {
  id: 9,
  title: '📐 Module 9: Reading Plans and Estimating Materials',
  description: 'Master blueprint interpretation, material calculations, and cost estimation for successful roofing projects',
  lessons: [
    lesson1ReadingBlueprintsAndRoofPlans,
    lesson2CalculatingRoofPitchAndArea,
    lesson3MaterialTakeOffsAndWasteCalculations,
    lesson4CostEstimationAndBudgeting,
    module9Quiz
  ]
};

export default module9;