import { Module } from '../../../types/course';
import { lesson3_1 } from './lesson3_1';
import { lesson3_2 } from './lesson3_2';
import { lesson3_3 } from './lesson3_3';
import { quiz3 } from './quiz3';

export const module3: Module = {
  id: 3,
  title: "Hardware Components and Functions",
  description: "This essential module provides comprehensive knowledge of smartphone hardware components and their functions. Students will learn to identify internal parts including motherboards, batteries, screens, and buttons, understand the role of key components like processors and memory chips, and recognize variations in hardware between different brands and models. This foundational knowledge is critical for effective diagnosis and repair.",
  duration: 180, // 3 hours
  objectives: [
    "Identify and understand the function of internal smartphone components",
    "Master motherboard, battery, screen, and button diagnosis techniques",
    "Learn the role of processors, memory chips, and display modules",
    "Recognize hardware variations across different brands and models",
    "Apply component knowledge to repair scenarios and troubleshooting"
  ],
  lessons: [lesson3_1, lesson3_2, lesson3_3],
  quiz: quiz3
};