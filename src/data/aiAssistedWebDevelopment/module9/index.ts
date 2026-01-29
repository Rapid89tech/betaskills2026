import type { Module } from '@/types/course';
import { lesson1EmergingAITechnologiesAndTrends } from './lesson1-emerging-ai-technologies-and-trends';
import { lesson2EthicalConsiderationsAndResponsibleAIUse } from './lesson2-ethical-considerations-and-responsible-ai-use';
import { lesson3CareerOpportunitiesInAIAssistedDevelopment } from './lesson3-career-opportunities-in-ai-assisted-development';
import { module9Quiz } from './quiz';

const module9: Module = {
  id: 9,
  title: 'The Future of AI in Web Development',
  description: 'This module explores the latest advancements in Artificial Intelligence (AI), focusing on emerging technologies and trends, ethical considerations and responsible AI use, and career opportunities in AI-assisted development. The goal is to provide a comprehensive understanding of how AI is shaping industries, the ethical challenges it poses, and the growing career landscape for professionals in this field. By leveraging AI responsibly, organizations and individuals can drive innovation while addressing societal impacts.',
  lessons: [
    lesson1EmergingAITechnologiesAndTrends,
    lesson2EthicalConsiderationsAndResponsibleAIUse,
    lesson3CareerOpportunitiesInAIAssistedDevelopment,
    module9Quiz
  ]
};

export default module9;
