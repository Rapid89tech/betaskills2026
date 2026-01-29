import { Course } from '@/types/course';
import module1 from './entrepreneurshipFinal/module1';
import module2 from './entrepreneurshipFinal/module2';
import module3 from './entrepreneurshipFinal/module3';
import module4 from './entrepreneurshipFinal/module4';
import module5 from './entrepreneurshipFinal/module5';
import module6 from './entrepreneurshipFinal/module6';

export const entrepreneurshipFinalCourse: Course = {
  id: 'entrepreneurship-final',
  title: 'Entrepreneurship',
  description: '"Entrepreneurship: Creating Your Business" is a comprehensive online course designed to empower aspiring entrepreneurs with the skills, mindset, and strategies needed to launch and sustain a successful business. This course covers the entrepreneurial journey from ideation to execution, exploring critical topics such as identifying market opportunities, conducting effective market research, crafting business models, and implementing targeted marketing strategies. Learners will gain practical insights into the planning and development processes, understand the business ecosystem, and discover how to create a unique value proposition that resonates with customers. Delivered entirely online, this course is accessible globally and combines engaging content with actionable tools to help you turn your business ideas into reality, whether you\'re starting a local service or a scalable tech venture.',
  instructor: {
    name: 'Beta Skill Tutor',
    title: 'Business Development Expert',
    bio: 'Experienced entrepreneur and business consultant with expertise in startup development, market research, and business strategy.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  level: 'intermediate',
  category: 'Business & Entrepreneurship',
  duration: '6 weeks',
  students: 1247,
  rating: 4.8,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: '/placeholder.svg',
  learningObjectives: [
    'Identify and articulate the mindset and common characteristics of successful entrepreneurs, applying these traits to their own ventures.',
    'Conduct a Community Scan to evaluate market needs and validate business opportunities using observational and interview techniques.',
    'Perform targeted market research to define customer segments, analyze demand, and develop a unique value proposition.',
    'Explain and apply the development and planning processes involved in launching a new product or service, including creating a business plan.',
    'Analyze the business ecosystem and evaluate successful business models (e.g., subscription, freemium, or product-based) to select the most suitable for their venture.',
    'Design effective marketing strategies that focus on specific customer segments to maximize impact and resource efficiency.',
    'Develop a comprehensive business pitch tailored to attract investors, partners, or customers.'
  ],
  modules: [
    module1,
    module2,
    module3,
    module4,
    module5,
    module6
  ]
};

export default entrepreneurshipFinalCourse; 