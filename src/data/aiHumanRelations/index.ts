
import { Course, Module } from '@/types/course';
import { module1 } from './module1';
import { module2 } from './module2';
import { module3 } from './module3';
import { module4 } from './module4';
import { module5 } from './module5';
import { module6 } from './module6';
import { module7 } from './module7';

export const aiHumanRelationsCourse: Course = {
  id: 'ai-human-relations',
  title: 'AI & Human Relations 101',
  description: 'This comprehensive online course delves into the intricate interplay between Artificial Intelligence (AI) and Human Relations, exploring how AI shapes communication, emotional intelligence, workplace dynamics, ethical considerations, and societal structures.',
  instructor: {
    name: 'Dr. Sarah Chen',
    title: 'AI Ethics Researcher & Human-Computer Interaction Expert',
    bio: 'With over 15 years of experience in AI research and human-computer interaction, Dr. Chen has published extensively on AI ethics, emotional intelligence in technology, and the future of human-AI collaboration.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  duration: '36 weeks',
  level: 'Beginner',
  category: 'Technology & Society',
  is_free: false,
  price: 500,
  currency: 'ZAR',
  students: 1247,
  rating: 4.8,
  thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
  learningObjectives: [
    'Analyze the impact of AI on human communication, including virtual assistants, chatbots, and social media algorithms',
    'Evaluate ethical dilemmas in AI applications, such as bias in decision-making systems and privacy concerns',
    'Apply frameworks for designing human-centered AI systems that prioritize empathy, inclusivity, and fairness',
    'Assess the role of AI in workplace dynamics, including automation, collaboration tools, and emotional intelligence augmentation',
    'Develop strategies for fostering ethical AI integration in organizations, communities, and personal interactions',
    'Critically interpret societal shifts driven by AI, such as changes in trust, relationships, and cultural norms',
    'Utilize online tools to simulate AI-driven interactions and analyze their impact on human behavior'
  ],
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7
  ]
};
