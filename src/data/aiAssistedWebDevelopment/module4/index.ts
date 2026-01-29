import type { Module } from '@/types/course';
import { lesson1PerformanceOptimization } from './lesson1-performance-optimization';
import { lesson2CodeRefactoring } from './lesson2-code-refactoring';
import { lesson3SecurityEnhancement } from './lesson3-security-enhancement';
import { lesson4AccessibilityImprovements } from './lesson4-accessibility-improvements';
import { lesson5BestPracticesImplementation } from './lesson5-best-practices-implementation';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: 'AI for Code Optimization',
  description: 'This module focuses on using AI tools to optimize web development code for performance, maintainability, security, and accessibility. Learners will explore how AI can assist in identifying performance bottlenecks, refactoring code for better structure, implementing security best practices, enhancing accessibility, and ensuring code follows industry standards. The module provides practical techniques for leveraging AI to improve code quality while maintaining functionality and user experience.',
  lessons: [
    lesson1PerformanceOptimization,
    lesson2CodeRefactoring,
    lesson3SecurityEnhancement,
    lesson4AccessibilityImprovements,
    lesson5BestPracticesImplementation,
    module4Quiz
  ]
};

export default module4;
