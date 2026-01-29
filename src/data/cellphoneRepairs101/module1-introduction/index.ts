import type { Module } from '@/types/course';
import { lesson1IndustryOverview } from './lesson1-industry-overview';
import { lesson2SafetyPrecautions } from './lesson2-safety-precautions';
import { lesson3BasicPrinciples } from './lesson3-basic-principles';
import { lesson4EssentialTools } from './lesson4-essential-tools';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: 'Module 1: Introduction to Cell Phone Repair',
  description: 'Introduction to the smartphone repair industry, safety protocols, basic repair principles, and essential tools for beginners.',
  lessons: [
    lesson1IndustryOverview,
    lesson2SafetyPrecautions,
    lesson3BasicPrinciples,
    lesson4EssentialTools,
    module1Quiz
  ]
};

export default module1;
