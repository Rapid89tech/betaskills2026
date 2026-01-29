import type { Module } from '@/types/course';
import { lesson1CodeGenerationPipelines } from './lesson1-code-generation-pipelines';
import { lesson2AIInCICDAndTesting } from './lesson2-ai-in-cicd-and-testing';
import { lesson3AIForPersonalizationAndAnalytics } from './lesson3-ai-for-personalization-and-analytics';
import { lesson4AIAndNoCodeLowCodeDevelopment } from './lesson4-ai-and-no-code-low-code-development';
import { module7Quiz } from './quiz';

const module7: Module = {
  id: 7,
  title: 'Advanced Applications of AI in Web Development',
  description: 'This module explores how Artificial Intelligence (AI) can streamline and enhance workflows across various domains, focusing on code generation pipelines, AI integration in Continuous Integration/Continuous Deployment (CI/CD) and testing, personalization and analytics, and no-code/low-code development. The goal is to provide a comprehensive understanding of how AI can automate repetitive tasks, improve efficiency, and enable smarter decision-making in software development and beyond. It covers practical applications, best practices, and ethical considerations for responsible AI use in advanced web development workflows.',
  lessons: [
    lesson1CodeGenerationPipelines,
    lesson2AIInCICDAndTesting,
    lesson3AIForPersonalizationAndAnalytics,
    lesson4AIAndNoCodeLowCodeDevelopment,
    module7Quiz
  ]
};

export default module7;
