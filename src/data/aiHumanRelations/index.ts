import { Course } from '@/types/course';
import { module1 } from './module1-foundationsOfAI';
import { module2 } from './module2-communicationEmotionalIntelligence';
import { module3 } from './module3-aiInWorkplace';
import { module4 } from './module4-ethicsEmpathy';
import { module5 } from './module5-educationLearning';
import { module6 } from './module6-legalPsychological';
import { module7 } from './module7-designingHumanCenteredAI';
import { module8 } from './module8-principlesHumanCenteredDesign';
import { module9 } from './module9-futureHumanAIRelations';

export const aiHumanRelationsCourse: Course = {
  id: 'ai-human-relations',
  title: 'AI & Human Relations',
  description: 'This comprehensive online course delves into the intricate interplay between Artificial Intelligence (AI) and Human Relations, exploring how AI shapes communication, emotional intelligence, workplace dynamics, ethical considerations, and societal structures.',
  instructor: {
    id: 'ai-human-relations-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '36 weeks',
  level: 'Beginner',
  category: 'Technology & Society',
  is_free: true,
  price: 500,
  currency: 'ZAR',
  students: 1247,
  rating: 4.8,
  thumbnail: '/images/generation-8dea647f-b6de-42c7-8708-d6e68a0fe5d1.png',
  learningObjectives: [
    'Analyze the impact of AI on human communication, including virtual assistants, chatbots, and social media algorithms',
    'Evaluate ethical dilemmas in AI applications, such as bias in decision-making systems and privacy concerns',
    'Apply frameworks for designing human-centered AI systems that prioritize empathy, inclusivity, and fairness',
    'Assess the role of AI in workplace dynamics, including automation, collaboration tools, and emotional intelligence augmentation',
    'Develop strategies for fostering ethical AI integration in organizations, communities, and personal interactions',
    'Critically interpret societal shifts driven by AI, such as changes in trust, relationships, and cultural norms',
    'Utilize online tools to simulate AI-driven interactions and analyze their impact on human behavior'
  ],
  status: 'published',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  available: true,
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7,
    module8,
    module9
  ]
};
