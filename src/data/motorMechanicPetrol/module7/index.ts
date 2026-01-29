import { Module } from '../../../types/course';
import { lesson7_1 } from './lesson7_1';
import { lesson7_2 } from './lesson7_2';
import { quiz7 } from './quiz7';

export const module7: Module = {
  id: 7,
  title: "Diagnosing and Repairing Common Engine Issues",
  description: "This module equips learners with essential skills to diagnose and repair common petrol engine issues, including misfiring, poor fuel economy, rough idling, stalling, unusual noises, and exhaust smoke. Through engaging video lectures, interactive virtual simulations, and practical assignments, participants will master symptom identification, understand underlying causes, and prioritize repairs effectively. Designed for online delivery, the module is accessible globally, including for South African learners, with on-demand resources accommodating diverse schedules. The 24/7 AI voice tutor provides real-time guidance on tasks like interpreting OBD2 codes, analyzing smoke colors, or conducting compression tests, ensuring practical workshop applications.",
  duration: 180, // 3 hours
  objectives: [
    "Recognize and diagnose common engine symptoms and issues",
    "Master systematic diagnostic procedures and prioritization",
    "Understand the relationship between symptoms and underlying causes",
    "Apply proper diagnostic tools and techniques",
    "Develop effective repair strategies and planning"
  ],
  lessons: [lesson7_1, lesson7_2],
  quiz: quiz7
};