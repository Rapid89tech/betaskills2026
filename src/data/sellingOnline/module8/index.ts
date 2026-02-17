import { Module } from '../../../types/course';
import { quiz8 } from './quiz8';

export const module8: Module = {
  id: 'module8',
  title: 'Traffic Generation & Advertising',
  description: 'Master organic traffic strategies through SEO and social media, paid advertising on Google, Meta, and TikTok, ad creative fundamentals, budgeting, ROI tracking, and retargeting techniques.',
  lessons: [
    {
      id: 'lesson1',
      title: 'Organic Traffic (SEO Basics, Content, Social Media)',
      description: 'Learn keyword research, on-page and technical SEO, evergreen content creation, blogging strategies, social media reach, backlinks, and performance monitoring.',
      duration: '50 minutes',
      content: () => import('./lesson1-organic-traffic')
    },
    {
      id: 'lesson2',
      title: 'Paid Advertising Overview (Google, Meta, TikTok)',
      description: 'Explore Google Ads search and display campaigns, Meta audience targeting and carousel ads, TikTok creative approaches, budget management, and performance tracking.',
      duration: '45 minutes',
      content: () => import('./lesson2-paid-advertising')
    },
    {
      id: 'lesson3',
      title: 'Ad Creatives and Copy Fundamentals',
      description: 'Craft compelling ad visuals and copy with strong hooks, benefit-focused messaging, relatable imagery, clear CTAs, brand consistency, and A/B testing.',
      duration: '40 minutes',
      content: () => import('./lesson3-ad-creatives-copy')
    },
    {
      id: 'lesson4',
      title: 'Budgeting and ROI',
      description: 'Set realistic budgets, track expenses meticulously, prioritise high-ROI activities, calculate returns, balance short and long-term investments, and adjust dynamically.',
      duration: '40 minutes',
      content: () => import('./lesson4-budgeting-roi')
    },
    {
      id: 'lesson5',
      title: 'Retargeting Strategies',
      description: 'Re-engage warm leads through audience segmentation, dynamic product ads, sequence-based campaigns, social proof, time-sensitive incentives, and performance optimisation.',
      duration: '35 minutes',
      content: () => import('./lesson5-retargeting')
    }
  ],
  quiz: quiz8,
  order: 8
};
