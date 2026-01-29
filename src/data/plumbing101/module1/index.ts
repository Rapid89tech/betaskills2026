import type { Module } from '@/types/course';
import { lesson1PlumbingIndustryAndCareers } from './lesson1-plumbing-industry-and-careers';
import { lesson2HistoryAndImportance } from './lesson2-history-and-importance';
import { lesson3BasicPrinciplesAndMechanics } from './lesson3-basic-principles-and-mechanics';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: '🚰 Module 1: Introduction to Plumbing',
  description: 'Learn the fundamentals of plumbing, industry overview, career opportunities, and basic principles of water flow mechanics',
  lessons: [
    lesson1PlumbingIndustryAndCareers,
    lesson2HistoryAndImportance,
    lesson3BasicPrinciplesAndMechanics,
    module1Quiz
  ]
};

export default module1; 