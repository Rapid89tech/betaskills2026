import type { Module } from '@/types/course';
import { lesson1SettingUpBackendFrameworks } from './lesson1-setting-up-backend-frameworks';
import { lesson2DatabasesAndAIQueryAssistance } from './lesson2-databases-and-ai-query-assistance';
import { lesson3ConnectingAIAPIs } from './lesson3-connecting-ai-apis';
import { lesson4HandsOnProjectAIAssistedFullStackApp } from './lesson4-hands-on-project-ai-assisted-full-stack-app';
import { module5Quiz } from './quiz';

const module5: Module = {
  id: 5,
  title: 'Backend & AI Integration',
  description: 'This module focuses on leveraging AI to streamline backend development, covering the setup of Node.js, Django, and Flask environments with AI guidance, crafting SQL/NoSQL database queries with AI assistance, and integrating AI APIs (e.g., OpenAI, HuggingFace) to add advanced functionalities like chatbots or recommendation systems. It includes a hands-on project to build an AI-assisted full-stack application, combining backend and frontend technologies. Aimed at developers with basic JavaScript or Python knowledge, this module equips learners with the skills to create scalable, AI-enhanced web applications while ensuring security, performance, and maintainability. It includes practical applications, best practices, and ethical considerations for responsible AI use in backend development.',
  lessons: [
    lesson1SettingUpBackendFrameworks,
    lesson2DatabasesAndAIQueryAssistance,
    lesson3ConnectingAIAPIs,
    lesson4HandsOnProjectAIAssistedFullStackApp,
    module5Quiz
  ]
};

export default module5;
