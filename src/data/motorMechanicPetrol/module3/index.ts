import { Module } from '../../../types/course';
import { lesson3_1 } from './lesson3_1';
import { lesson3_2 } from './lesson3_2';
import { lesson3_3 } from './lesson3_3';
import { quiz3 } from './quiz3';

export const module3: Module = {
  id: 3,
  title: "Safety and Workshop Best Practices",
  description: "This module focuses on creating a safe and efficient workshop environment for petrol engine mechanics. Learners will explore the critical role of personal protective equipment (PPE), safe handling of fuels and chemicals, and proper tool maintenance to prevent accidents and ensure productivity. Delivered through engaging video lectures, interactive simulations, and practical assignments, this module emphasizes online accessibility with on-demand resources, catering to global learners. The smart AI voice tutor provides 24/7 support, guiding participants through safety protocols, chemical handling, and tool maintenance with real-time advice.",
  duration: 180, // 3 hours
  objectives: [
    "Understand and apply proper personal protective equipment (PPE) in automotive workshops",
    "Master safe handling procedures for fuels and chemicals, including safety data sheets (SDS)",
    "Implement proper tool safety, inspection, and maintenance practices",
    "Apply spill containment and cleanup procedures for hazardous materials",
    "Ensure compliance with safety regulations and best practices in workshop environments"
  ],
  lessons: [lesson3_1, lesson3_2, lesson3_3],
  quiz: quiz3
};