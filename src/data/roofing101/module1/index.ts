import type { Module } from '@/types/course';
import { lesson1DefinitionAndImportanceOfRoofing } from './lesson1-definition-and-importance-of-roofing';
import { lesson2TypesOfRoofingSystems } from './lesson2-types-of-roofing-systems';
import { lesson3RolesAndResponsibilitiesOfARoofer } from './lesson3-roles-and-responsibilities-of-a-roofer';
import { lesson4CareerOpportunitiesInRoofing } from './lesson4-career-opportunities-in-roofing';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: '🏠 Module 1: Introduction to Roofing',
  description: 'Learn roofing fundamentals, system components, types, roofer roles, and career opportunities in the roofing industry',
  lessons: [
    lesson1DefinitionAndImportanceOfRoofing,
    lesson2TypesOfRoofingSystems,
    lesson3RolesAndResponsibilitiesOfARoofer,
    lesson4CareerOpportunitiesInRoofing,
    module1Quiz
  ]
};

export default module1; 