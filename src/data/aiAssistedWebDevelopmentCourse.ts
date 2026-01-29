import { Course } from '@/types/course';
import module1 from './aiAssistedWebDevelopment/module1';
import module2 from './aiAssistedWebDevelopment/module2';
import module3 from './aiAssistedWebDevelopment/module3';
import module4 from './aiAssistedWebDevelopment/module4';
import module5 from './aiAssistedWebDevelopment/module5';
import module6 from './aiAssistedWebDevelopment/module6';
import module7 from './aiAssistedWebDevelopment/module7';
import module8 from './aiAssistedWebDevelopment/module8';
import module9 from './aiAssistedWebDevelopment/module9';

export const aiAssistedWebDevelopmentCourse: Course = {
  id: 'ai-assisted-web-development',
  title: 'AI-Assisted Web Development',
  description: 'AI-Assisted Website Development leverages artificial intelligence to enhance and accelerate coding, design, and project management processes, particularly in web development. This comprehensive course introduces the role of AI in coding and design, focusing on its application in website creation. It covers the benefits and limitations of AI tools, explores specific tools like AI code assistants (e.g., ChatGPT, GitHub Copilot) and AI website builders (e.g., Wix AI, Framer AI), and provides a structured learning path with clear expectations for learners. The course aims to equip developers, designers, and beginners with the knowledge and skills to integrate AI tools effectively into their workflows while understanding their capabilities, constraints, and ethical considerations.',
  instructor: {
    name: 'Beta Skill Tutor',
    title: 'AI & Web Development Expert',
    bio: 'Experienced web developer and AI specialist with expertise in modern web technologies, AI integration, and full-stack development.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  level: 'intermediate',
  category: 'Technology & Programming',
  duration: '10 weeks',
  students: 2156,
  rating: 4.9,
  price: 750,
  currency: 'ZAR',
  is_free: false,
  thumbnail: '/placeholder.svg',
  learningObjectives: [
    'Understand how AI transforms coding and design processes by automating repetitive tasks, generating code, and enhancing creative workflows.',
    'Master AI code assistants like GitHub Copilot, Cursor, and Claude for web development tasks including JavaScript, React, and Python Flask.',
    'Create and customize websites using AI builders like Wix AI, Framer AI, and Durable for rapid site creation.',
    'Build dynamic, interactive web applications with AI assistance, including form handling, validation, and responsive design.',
    'Develop full-stack applications with AI-powered backend scaffolding, database integration, and AI API connections.',
    'Deploy and optimize websites using AI tools for performance, SEO, and security on platforms like Netlify, Vercel, and GitHub Pages.',
    'Apply ethical considerations and best practices for responsible AI use in web development projects.'
  ],
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

export default aiAssistedWebDevelopmentCourse;
