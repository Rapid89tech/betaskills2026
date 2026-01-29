import type { Module } from '@/types/course';
import { lesson1ProjectTypesOverview } from './lesson1-project-types-overview';
import { lesson2PlanWithAI } from './lesson2-plan-with-ai';
import { lesson3BuildFullSiteWithAIAssistance } from './lesson3-build-full-site-with-ai-assistance';
import { lesson4DeployAndPresentFinalProject } from './lesson4-deploy-and-present-final-project';
import { lesson5ProjectSpecificConsiderations } from './lesson5-project-specific-considerations';
import { module8Quiz } from './quiz';

const module8: Module = {
  id: 8,
  title: 'Capstone Project',
  description: 'This module serves as a comprehensive capstone project that brings together all the skills and knowledge acquired throughout the course. It focuses on building complete web applications using AI assistance, covering project planning, development, deployment, and presentation. The module includes different project types (portfolio websites, e-commerce stores, business landing pages, and web apps with AI features), each with specific requirements and AI integration strategies. Students will learn to plan projects with AI-generated wireframes and content, build full sites with AI assistance, deploy and present final projects, and consider project-specific requirements for different types of web applications.',
  lessons: [
    lesson1ProjectTypesOverview,
    lesson2PlanWithAI,
    lesson3BuildFullSiteWithAIAssistance,
    lesson4DeployAndPresentFinalProject,
    lesson5ProjectSpecificConsiderations,
    module8Quiz
  ]
};

export default module8;
