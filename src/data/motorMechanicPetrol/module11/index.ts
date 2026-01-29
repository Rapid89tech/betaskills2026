import { Module } from '../../../types/course';
import { lesson11_1 } from './lesson11_1';
import { lesson11_2 } from './lesson11_2';
import { lesson11_3 } from './lesson11_3';
import { quiz11 } from './quiz11';

export const module11: Module = {
  id: 11,
  title: "Lubrication System Repairs",
  description: "This module equips learners with skills to diagnose and repair lubrication system issues in petrol engines, focusing on oil pressure problems, replacing faulty oil pumps, and cleaning clogged oil passages. Delivered through engaging video lectures, interactive virtual simulations, and practical assignments, the module is accessible online for global learners, including those in South Africa. The 24/7 AI voice tutor provides real-time guidance on tasks like testing oil pressure, installing pumps, or flushing passages, ensuring workshop-ready skills. Mastering these repairs prevents engine damage (e.g., R50,000+ for a seized engine) and ensures optimal performance in South Africa's demanding conditions, enhancing mechanic efficiency and client trust.",
  duration: 210, // 3.5 hours
  objectives: [
    "Identify and diagnose oil pressure problems and their causes",
    "Master oil pump replacement procedures and techniques",
    "Learn to clean clogged oil passages and maintain flow",
    "Apply proper oil system diagnostic procedures",
    "Understand lubrication system maintenance in extreme conditions"
  ],
  lessons: [lesson11_1, lesson11_2, lesson11_3],
  quiz: quiz11
};