import { Module } from '../../../types/course';
import { quiz7 } from './quiz7';

export const module7: Module = {
  id: 'module7',
  title: 'Marketing and Promotion',
  description: 'Master digital marketing fundamentals, branding, content marketing, email campaigns, influencer partnerships, and promotional strategies to drive traffic and sales.',
  lessons: [
    {
      id: 'lesson1',
      title: 'Digital Marketing Fundamentals',
      description: 'Learn the core principles of digital marketing including SEO, content marketing, social media, email marketing, PPC, analytics, and mobile-first strategies.',
      duration: '45 minutes',
      content: () => import('./lesson1-digital-marketing-fundamentals')
    },
    {
      id: 'lesson2',
      title: 'Branding and Positioning',
      description: 'Develop a strong brand identity, craft your unique value proposition, maintain consistent visuals and voice, and position your brand effectively in the market.',
      duration: '40 minutes',
      content: () => import('./lesson2-branding-positioning')
    },
    {
      id: 'lesson3',
      title: 'Content Marketing',
      description: 'Create high-value content, diversify formats, optimise for SEO, distribute strategically, and measure performance to build authority and drive organic traffic.',
      duration: '45 minutes',
      content: () => import('./lesson3-content-marketing')
    },
    {
      id: 'lesson4',
      title: 'Email Marketing Basics',
      description: 'Build permission-based lists, segment audiences, write compelling subject lines, design mobile-friendly emails, and set up automation workflows.',
      duration: '40 minutes',
      content: () => import('./lesson4-email-marketing')
    },
    {
      id: 'lesson5',
      title: 'Influencer and Affiliate Marketing',
      description: 'Identify the right partners, set up affiliate programs, craft collaboration agreements, track performance, and build long-term relationships.',
      duration: '40 minutes',
      content: () => import('./lesson5-influencer-affiliate')
    },
    {
      id: 'lesson6',
      title: 'Promotions, Discounts, and Launches',
      description: 'Create effective limited-time offers, flash sales, bundles, loyalty programs, seasonal campaigns, and product launches that drive urgency and sales.',
      duration: '40 minutes',
      content: () => import('./lesson6-promotions-launches')
    }
  ],
  quiz: quiz7,
  order: 7
};
