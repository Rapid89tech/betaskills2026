import { Module } from '../../../types/course';
import { quiz9 } from './quiz9';

export const module9: Module = {
  id: 'module9',
  title: 'Conversion Optimization & Sales Psychology',
  description: 'Master sales funnels and buyer psychology, craft effective CTAs, leverage social proof and urgency, implement upselling and cross-selling, recover abandoned carts, and use A/B testing to optimize conversions.',
  lessons: [
    {
      id: 'lesson1',
      title: 'Sales Funnels and Buyer Psychology',
      description: 'Understand how customers move from awareness to advocacy, exploring the emotions and decision-making processes at each stage of the buyer journey.',
      duration: '50 minutes',
      content: () => import('./lesson1-sales-funnels-psychology')
    },
    {
      id: 'lesson2',
      title: 'Calls-to-Action (CTAs)',
      description: 'Create clear, compelling CTAs that guide audiences toward action through prominent placement, action-oriented language, urgency, personalisation, and benefit-driven messaging.',
      duration: '40 minutes',
      content: () => import('./lesson2-calls-to-action')
    },
    {
      id: 'lesson3',
      title: 'Social Proof and Urgency',
      description: 'Leverage customer reviews, user-generated content, social numbers, scarcity, and time-limited offers to influence buyer decisions authentically.',
      duration: '40 minutes',
      content: () => import('./lesson3-social-proof-urgency')
    },
    {
      id: 'lesson4',
      title: 'Upselling and Cross-Selling',
      description: 'Increase order value through thoughtful product recommendations, bundles, personalisation, and post-purchase follow-ups that enhance customer satisfaction.',
      duration: '40 minutes',
      content: () => import('./lesson4-upselling-cross-selling')
    },
    {
      id: 'lesson5',
      title: 'Cart Abandonment Strategies',
      description: 'Recover lost sales through timely emails, retargeting ads, exit-intent popups, checkout optimisation, live support, and multi-channel follow-ups.',
      duration: '45 minutes',
      content: () => import('./lesson5-cart-abandonment')
    },
    {
      id: 'lesson6',
      title: 'A/B Testing Basics',
      description: 'Use data-driven testing to compare variations, measure performance, and continuously optimize your content, ads, and strategies for better results.',
      duration: '35 minutes',
      content: () => import('./lesson6-ab-testing')
    }
  ],
  quiz: quiz9,
  order: 9
};
