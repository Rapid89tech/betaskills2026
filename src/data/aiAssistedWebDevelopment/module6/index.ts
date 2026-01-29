import type { Module } from '@/types/course';
import { lesson1HostingAndDeployment } from './lesson1-hosting-and-deployment';
import { lesson2AIAssistedPerformanceOptimization } from './lesson2-ai-assisted-performance-optimization';
import { lesson3SecurityConsiderationsWithAIRecommendations } from './lesson3-security-considerations-with-ai-recommendations';
import { lesson4HandsOnProjectDeployAIAssistedPortfolioSite } from './lesson4-hands-on-project-deploy-ai-assisted-portfolio-site';
import { module6Quiz } from './quiz';

const module6: Module = {
  id: 6,
  title: 'Deployment & Optimization with AI',
  description: 'This module focuses on hosting and deploying web applications using Netlify, Vercel, and GitHub Pages, with an emphasis on leveraging AI to optimize performance, enhance SEO, and ensure security. It covers AI-assisted techniques for improving page speed, generating content and meta descriptions, and applying security best practices, culminating in a hands-on project to deploy an AI-assisted portfolio site. Aimed at developers and designers with basic web development knowledge (HTML, CSS, JavaScript), this module equips learners with the skills to deploy professional, optimized, and secure websites while integrating AI tools effectively. It includes practical applications, best practices, and ethical considerations for responsible AI use in deployment workflows.',
  lessons: [
    lesson1HostingAndDeployment,
    lesson2AIAssistedPerformanceOptimization,
    lesson3SecurityConsiderationsWithAIRecommendations,
    lesson4HandsOnProjectDeployAIAssistedPortfolioSite,
    module6Quiz
  ]
};

export default module6;
