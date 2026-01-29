import type { Course } from '@/types/course';
import module1 from './module1';
import module2 from './module2';
import module3 from './module3';
import module4 from './module4';
import module5 from './module5';
import module6 from './module6';
import module7 from './module7';
import module8 from './module8';
import module9 from './module9';
import module10 from './module10';
import module11 from './module11';
import module12 from './module12';

const socialMediaMarketing101: Course = {
  id: 'socialMediaMarketing101',
  title: 'Social Media Marketing 101',
  description: 'Comprehensive online course covering social media marketing fundamentals, platform strategies, content creation, paid advertising, analytics, and advanced tactics. Master Instagram, TikTok, LinkedIn, and emerging platforms to drive engagement and conversions.',
  thumbnail: '/src/assets/social-media-marketing-course.jpg',
    instructor: {
    id: 'socialMediaMarketing101-instructor',
    first_name: 'Beta Skill',
    last_name: 'Tutor',
    email: 'betaskilltraining@gmail.com'
  },
  duration: '10-12 weeks',
  level: 'Beginner to Advanced',
  students: 850,
  rating: 4.8,
  price: 599,
  currency: 'ZAR',
  is_free: false,
  category: 'Digital Marketing',
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
  ],
  learningObjectives: [
    'Master social media marketing fundamentals and platform-specific strategies',
    'Create compelling content and build strong visual brand identity across platforms',
    'Design and execute data-driven social media strategies with SMART goals',
    'Leverage paid advertising on Facebook, Instagram, TikTok, and LinkedIn',
    'Build authentic communities and drive organic growth through engagement',
    'Analyze campaign performance using platform analytics and Google Analytics 4',
    'Manage social media tools for scheduling, automation, and collaboration',
    'Develop influencer partnerships and track campaign ROI',
    'Navigate legal, ethical, and crisis management challenges',
    'Implement advanced strategies including social commerce, AI tools, and AR filters',
    'Identify and leverage emerging platforms and future trends',
    'Apply all concepts in real-world capstone project scenarios'
  ],
  targetAudience: [
    'Beginners with no prior social media marketing experience',
    'Small business owners seeking to grow their online presence',
    'Marketing professionals transitioning to digital channels',
    'Content creators and influencers building their brands',
    'Entrepreneurs and startups looking to leverage social media for growth',
    'Career switchers entering digital marketing roles'
  ]
};

export default socialMediaMarketing101;



