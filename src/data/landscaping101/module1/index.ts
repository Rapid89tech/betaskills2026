import type { Module } from '@/types/course';
import { lesson1DefinitionHistory } from './lesson1-definition-history';
import { lesson2TypesOfLandscapes } from './lesson2-types-of-landscapes';
import { lesson3Benefits } from './lesson3-benefits';
import { lesson4ToolsEquipment } from './lesson4-tools-equipment';
import { lesson5RolesResponsibilities } from './lesson5-roles-responsibilities';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: '🌿 Module 1: Introduction to Landscaping',
  description: 'Understand the fundamentals, importance, and scope of landscaping',
  lessons: [
    lesson1DefinitionHistory,
    lesson2TypesOfLandscapes,
    lesson3Benefits,
    lesson4ToolsEquipment,
    lesson5RolesResponsibilities,
    module1Quiz
  ]
};

export default module1;

