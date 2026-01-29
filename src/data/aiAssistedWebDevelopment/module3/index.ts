import type { Module } from '@/types/course';
import { lesson1GitHubCopilotDeepDive } from './lesson1-github-copilot-deep-dive';
import { lesson2CursorAIPoweredIDE } from './lesson2-cursor-ai-powered-ide';
import { lesson3ClaudeForWebDevelopment } from './lesson3-claude-for-web-development';
import { lesson4AdvancedPromptingTechniques } from './lesson4-advanced-prompting-techniques';
import { lesson5IntegratingMultipleAITools } from './lesson5-integrating-multiple-ai-tools';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: 'AI Code Assistants',
  description: 'This module provides an in-depth exploration of AI code assistants, focusing on GitHub Copilot, Cursor, and Claude. It covers advanced prompting techniques, integration strategies, and practical applications for web development. Learners will master the use of these tools for code generation, debugging, and project management, while understanding their strengths, limitations, and best practices for effective collaboration between human developers and AI assistants.',
  lessons: [
    lesson1GitHubCopilotDeepDive,
    lesson2CursorAIPoweredIDE,
    lesson3ClaudeForWebDevelopment,
    lesson4AdvancedPromptingTechniques,
    lesson5IntegratingMultipleAITools,
    module3Quiz
  ]
};

export default module3;
