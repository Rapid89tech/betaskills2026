import type { Module } from '@/types/course';
import { lesson1WhatIsAIAssistedDevelopment } from './lesson1-what-is-ai-assisted-development';
import { lesson2OverviewOfAIInCodingAndDesign } from './lesson2-overview-of-ai-in-coding-and-design';
import { lesson3BenefitsAndLimitationsOfAITools } from './lesson3-benefits-and-limitations-of-ai-tools';
import { lesson4AIToolsForWebsiteCreation } from './lesson4-ai-tools-for-website-creation';
import { lesson5CourseRoadmapAndExpectations } from './lesson5-course-roadmap-and-expectations';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: 'Introduction to AI in Web Development',
  description: 'This foundational module introduces the role of AI in coding and design, focusing on its application in website creation. It covers the benefits and limitations of AI tools, explores specific tools like AI code assistants (e.g., ChatGPT, GitHub Copilot) and AI website builders (e.g., Wix AI, Framer AI), and provides a course roadmap with clear expectations for learners. The module aims to equip developers, designers, and beginners with the knowledge and skills to integrate AI tools effectively into their workflows while understanding their capabilities, constraints, and ethical considerations.',
  lessons: [
    lesson1WhatIsAIAssistedDevelopment,
    lesson2OverviewOfAIInCodingAndDesign,
    lesson3BenefitsAndLimitationsOfAITools,
    lesson4AIToolsForWebsiteCreation,
    lesson5CourseRoadmapAndExpectations,
    module1Quiz
  ]
};

export default module1;
