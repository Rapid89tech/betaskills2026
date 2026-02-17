import type { Module } from '@/types/course';
import { lesson1OnlineSelling } from './lesson1-online-selling';
import { lesson2TypesOfSellers } from './lesson2-types-of-sellers';
import { lesson3BenefitsChallenges } from './lesson3-benefits-challenges';
import { lesson4EcommerceTrends } from './lesson4-ecommerce-trends';
import { lesson5CaseStudies } from './lesson5-case-studies';
import { quiz1 } from './quiz1';

export const module1: Module = {
  id: 1,
  title: 'Introduction to Online Selling',
  description: 'Learn the fundamentals of online selling, different business models, current trends, and real-world success stories from South African entrepreneurs.',
  lessons: [
    lesson1OnlineSelling,
    lesson2TypesOfSellers,
    lesson3BenefitsChallenges,
    lesson4EcommerceTrends,
    lesson5CaseStudies
  ],
  quiz: quiz1
};
