import type { Module } from '@/types/course';
import { lesson1ClientRelationshipsAndContracts } from './lesson1-client-relationships-and-contracts';
import { lesson2PricingStrategies } from './lesson2-pricing-strategies';
import { lesson3MultiShowManagement } from './lesson3-multi-show-management';
import { lesson4CaseStudiesAndMockProjects } from './lesson4-case-studies-and-mock-projects';
import { module10Quiz } from './quiz';

const module10: Module = {
  id: 10,
  title: '🚀 Module 10: Launching and Managing Client Shows',
  description: 'Master the art of launching and managing client podcast shows. Learn how to build strong client relationships, develop effective pricing strategies, manage multiple shows, and create case studies and mock projects for professional podcast management.',
  lessons: [
    lesson1ClientRelationshipsAndContracts,
    lesson2PricingStrategies,
    lesson3MultiShowManagement,
    lesson4CaseStudiesAndMockProjects,
    module10Quiz
  ]
};

export default module10;
