import { Module } from '../../../types/course';
import { lesson1_1 } from './lesson1_1';
import { lesson1_2 } from './lesson1_2';
import { lesson1_3 } from './lesson1_3';
import { lesson1_4 } from './lesson1_4';
import { quiz1 } from './quiz1';

export const module1: Module = {
  id: 1,
  title: "Introduction to Cell Phone Repair",
  description: "This comprehensive module provides an essential foundation for smartphone repair, covering industry overview, career opportunities, safety protocols, basic repair principles across iOS and Android platforms, and must-have tools for beginners. Students will gain practical knowledge of the smartphone repair industry, learn proper safety procedures for handling sensitive components, understand the architectural differences between iOS and Android systems, and master the use of essential repair tools.",
  duration: 120, // 2 hours
  objectives: [
    "Understand the smartphone repair industry landscape and career opportunities",
    "Master safety precautions and proper handling of sensitive electronic components",
    "Learn basic phone repair principles for both iOS and Android architectures",
    "Identify and use must-have repair tools for smartphone maintenance",
    "Apply professional repair practices and workspace organization"
  ],
  lessons: [lesson1_1, lesson1_2, lesson1_3, lesson1_4],
  quiz: quiz1
};