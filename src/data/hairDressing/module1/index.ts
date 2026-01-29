import { Module } from '../../../types/course';
import { lesson1_1 } from './lesson1_1';
import { quiz1 } from './quiz1';

export const module1: Module = {
  id: 1,
  title: "Introduction to Hairdressing",
  description: "This foundational module provides essential knowledge of hair structure, types, and characteristics. Students will learn about the three main layers of hair (cuticle, cortex, medulla), understand different hair types from straight to coily, and master concepts of porosity and elasticity. This knowledge forms the basis for all advanced hair dressing techniques.",
  duration: 120, // 2 hours
  objectives: [
    "Understand the three main layers of hair structure and their functions",
    "Identify and work with different hair types (straight, wavy, curly, coily)",
    "Master concepts of hair porosity and elasticity",
    "Apply hair science knowledge to practical styling decisions",
    "Develop foundational understanding for advanced techniques"
  ],
  lessons: [lesson1_1],
  quiz: quiz1
}; 