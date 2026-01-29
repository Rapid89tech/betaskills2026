import type { Module } from '@/types/course';
import { lesson1SafeHandling } from './lesson1-safe-handling';
import { lesson2PPE } from './lesson2-ppe';
import { lesson3EnvironmentalLaws } from './lesson3-environmental-laws';
import { lesson4RiskAssessment } from './lesson4-risk-assessment';
import { lesson5FirstAid } from './lesson5-first-aid';
import { module7Quiz } from './quiz';

const module7: Module = {
  id: 7,
  title: '⚠️ Module 7: Health, Safety, and Environmental Regulations',
  description: 'Understand workplace safety and compliance in landscaping projects',
  lessons: [
    lesson1SafeHandling,
    lesson2PPE,
    lesson3EnvironmentalLaws,
    lesson4RiskAssessment,
    lesson5FirstAid,
    module7Quiz
  ]
};

export default module7;

