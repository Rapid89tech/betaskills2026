import type { Course } from '@/types/course';
import { module1 } from './smartHomeAutomation/module1';

export const smartHomeAutomationCourse: Course = {
  id: 'smart-home-automation',
  title: 'Smart Home Automation: Design, Installation & Maintenance',
  description: 'This course provides a step-by-step introduction to the world of smart home automation. It equips learners with the knowledge and skills to plan, install, configure, troubleshoot, and maintain smart home systems including lighting, security, climate control, voice assistants, and connected appliances.',
  instructor: 'Beta Skill Tutor',
  level: 'Intermediate',
  category: 'Technology',
  duration: '10 weeks',
  students: 1850,
  rating: 4.7,
  price: 750,
  currency: 'ZAR',
  is_free: false,
  thumbnail: '/images/courses/smart-home-automation.jpg',
  learningObjectives: [
    'Understand the fundamentals of smart home systems and Internet of Things (IoT)',
    'Learn how to install, integrate, and configure smart devices and systems',
    'Gain knowledge of home networks, connectivity protocols, and automation platforms',
    'Apply security and privacy best practices in smart home environments',
    'Develop the skills to troubleshoot and maintain a fully functional smart home'
  ],
  modules: [module1]
};
