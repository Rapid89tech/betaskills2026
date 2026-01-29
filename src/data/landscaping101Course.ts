import { Course } from '@/types/course';
import module1 from './landscaping101/module1';
import module2 from './landscaping101/module2';
import module3 from './landscaping101/module3';
import module4 from './landscaping101/module4';
import module5 from './landscaping101/module5';
import module6 from './landscaping101/module6';
import module7 from './landscaping101/module7';
import module8 from './landscaping101/module8';

export const landscaping101Course: Course = {
  id: 'landscaping101',
  title: 'Landscaping',
  description: 'Comprehensive online course covering landscaping fundamentals, design principles, plant and soil management, hardscaping, installation techniques, sustainable practices, and business operations. Master residential and commercial landscaping systems, ecological design, and professional landscape management.',
  instructor: {
    name: 'Professional Landscaping Experts',
    title: 'Master Landscaper',
    bio: 'Experienced landscaping professionals with decades of industry expertise in sustainable design, ecological landscaping, and professional landscape management.',
    avatar: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=150&h=150&fit=crop&crop=face'
  },
  level: 'beginner',
  category: 'Construction and Trades',
  duration: '8-10 weeks',
  students: 1150,
  rating: 4.8,
  price: 7500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=400&h=300&fit=crop',
  learningObjectives: [
    'Understand and apply landscaping fundamentals, including design principles, plant selection, and hardscaping techniques.',
    'Design and install sustainable landscapes that comply with environmental regulations and water conservation standards.',
    'Diagnose and manage soil conditions, select appropriate plants for climate and soil types using scientific analysis.',
    'Implement eco-friendly practices including native plant selection, xeriscaping, and organic fertilization methods.',
    'Utilize design software and mapping tools to create professional 2D and 3D landscape plans.',
    'Install and maintain irrigation systems, drainage solutions, and hardscape features for optimal functionality.',
    'Demonstrate safe working practices with tools and machinery while adhering to OSHA health and safety standards.',
    'Develop business skills for estimating, pricing, marketing, and managing a successful landscaping enterprise.'
  ],
  targetAudience: [
    'Beginners with no prior landscaping experience',
    'Aspiring landscapers seeking career foundation',
    'Homeowners and DIY enthusiasts',
    'Property managers and facility maintenance professionals',
    'Construction professionals integrating landscaping knowledge'
  ],
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6,
    module7,
    module8
  ]
};

export default landscaping101Course;

