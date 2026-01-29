import { Course } from '@/types/course';
import module1 from './socialMediaMarketing101/module1';
import module2 from './socialMediaMarketing101/module2';
import module3 from './socialMediaMarketing101/module3';
import module4 from './socialMediaMarketing101/module4';
import module5 from './socialMediaMarketing101/module5';
import module6 from './socialMediaMarketing101/module6';
import module7 from './socialMediaMarketing101/module7';
import module8 from './socialMediaMarketing101/module8';
import module9 from './socialMediaMarketing101/module9';
import module10 from './socialMediaMarketing101/module10';
import module11 from './socialMediaMarketing101/module11';
import module12 from './socialMediaMarketing101/module12';

export const socialMediaMarketing101Course: Course = {
  id: 'social-media-marketing-101',
  title: 'Social Media Marketing 101',
  description: 'Comprehensive online course covering social media marketing fundamentals, platform strategies, content creation, paid advertising, analytics, and advanced tactics. Master Instagram, TikTok, LinkedIn, and emerging platforms to drive engagement and conversions. Learn from real-world case studies and apply concepts in a hands-on capstone project.',
  instructor: {
    name: 'Digital Marketing Experts',
    title: 'Social Media Marketing Specialist',
    bio: 'Experienced digital marketing professionals with expertise in social media strategy, content creation, and data-driven campaign optimization across major platforms.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  },
  level: 'beginner',
  category: 'Digital Marketing',
  duration: '10-12 weeks',
  students: 850,
  rating: 4.8,
  price: 599,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1611926653670-f1cdb09ff2aa?w=400&h=300&fit=crop',
  learningObjectives: [
    'Master social media marketing fundamentals and platform-specific strategies for Instagram, TikTok, LinkedIn, and emerging platforms.',
    'Create compelling content and build strong visual brand identity across social media channels.',
    'Design and execute data-driven social media strategies with SMART goals and audience research.',
    'Leverage paid advertising on Facebook, Instagram, TikTok, and LinkedIn to drive conversions.',
    'Build authentic communities and drive organic growth through engagement strategies and social listening.',
    'Analyze campaign performance using platform analytics and Google Analytics 4 for data-driven optimization.',
    'Manage social media tools for scheduling, automation, collaboration, and crisis management.',
    'Develop influencer partnerships, track campaign ROI, and learn from successful case studies.',
    'Navigate legal, ethical, and crisis management challenges including copyrights and disclosure requirements.',
    'Implement advanced strategies including social commerce, AI tools, gamification, and AR filters.',
    'Identify and leverage emerging platforms and future trends to stay ahead of the competition.',
    'Apply all concepts in a real-world capstone project: EcoTrend Apparel Marketing Strategy 2025.'
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
    module9,
    module10,
    module11,
    module12
  ]
};

export default socialMediaMarketing101Course;

