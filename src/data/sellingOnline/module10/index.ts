import type { Module } from '@/types/course';
import Lesson1 from './lesson1-customer-support-channels';
import Lesson2 from './lesson2-managing-reviews-feedback';
import Lesson3 from './lesson3-handling-complaints-refunds';
import Lesson4 from './lesson4-building-loyalty';
import Lesson5 from './lesson5-community-building';
import { quiz10 } from './quiz10';

export const module10: Module = {
  id: 'module10',
  title: 'Customer Service & Relationship Building',
  description: 'Learn how to provide excellent customer support, manage reviews and feedback, handle complaints professionally, build loyalty through repeat customers, and create engaged communities around your brand.',
  order: 10,
  lessons: [
    {
      id: 'lesson1',
      title: 'Customer Support Channels',
      description: 'Explore various customer support channels including email, social media, live chat, WhatsApp, FAQs, phone support, and community forums to provide accessible and responsive service.',
      order: 1,
      content: Lesson1,
      duration: '25 minutes',
      videoUrl: 'https://www.youtube.com/embed/Eq7Z2i7m57Y'
    },
    {
      id: 'lesson2',
      title: 'Managing Reviews and Feedback',
      description: 'Learn how to encourage honest reviews, respond personally to all feedback, use negative feedback constructively, display reviews prominently, and turn satisfied customers into active reviewers.',
      order: 2,
      content: Lesson2,
      duration: '25 minutes',
      videoUrl: 'https://www.youtube.com/embed/_9Gr4cE4S0I'
    },
    {
      id: 'lesson3',
      title: 'Handling Complaints and Refunds',
      description: 'Master the art of handling complaints with empathy, processing refunds quickly and transparently, offering fair solutions, and learning from patterns to improve your business.',
      order: 3,
      content: Lesson3,
      duration: '25 minutes',
      videoUrl: 'https://www.youtube.com/embed/pc7V8e8cAdU'
    },
    {
      id: 'lesson4',
      title: 'Building Loyalty and Repeat Customers',
      description: 'Discover strategies for building customer loyalty through exceptional quality, personalised follow-ups, meaningful perks, exclusive content, and creating a sense of community.',
      order: 4,
      content: Lesson4,
      duration: '25 minutes',
      videoUrl: 'https://www.youtube.com/embed/FPP5h8ELNXs'
    },
    {
      id: 'lesson5',
      title: 'Community Building',
      description: 'Learn how to create an engaged community through consistent personal engagement, interactive content, celebrating customer stories, hosting events, and providing ongoing value beyond sales.',
      order: 5,
      content: Lesson5,
      duration: '20 minutes'
    }
  ],
  quiz: quiz10
};
