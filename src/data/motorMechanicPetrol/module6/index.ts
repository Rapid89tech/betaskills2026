import { Module } from '../../../types/course';
import { lesson6_1 } from './lesson6_1';
import { lesson6_2 } from './lesson6_2';
import { lesson6_3 } from './lesson6_3';
import { quiz6 } from './quiz6';

export const module6: Module = {
  id: 6,
  title: "Ensuring Fuel System Health",
  description: "This module focuses on maintaining a healthy fuel system in petrol vehicles, critical for efficient combustion and engine performance. Learners will master cleaning or replacing fuel filters, identifying and repairing fuel line leaks, and using fuel system cleaners to optimize engine efficiency. Delivered through engaging video lectures, interactive virtual simulations, and practical assignments, the module is accessible online with on-demand resources, catering to global learners, including those in South Africa. The smart AI voice tutor provides 24/7 support, guiding learners through tasks like diagnosing clogged filters, spotting leaks, or selecting cleaners, ensuring practical skills for workshop applications.",
  duration: 180, // 3 hours
  objectives: [
    "Master fuel filter cleaning and replacement procedures",
    "Identify and repair fuel line leaks safely and effectively",
    "Apply fuel system cleaners to optimize engine performance",
    "Understand fuel system health maintenance practices",
    "Implement proper safety procedures for fuel system work"
  ],
  lessons: [lesson6_1, lesson6_2, lesson6_3],
  quiz: quiz6
};