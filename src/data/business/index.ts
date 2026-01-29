import { Course } from '@/types/course';
import { module1 } from './module1';
import { module2 } from './module2';
import { module4 } from './module4';
import { module5 } from './module5';
import { module6 } from './module6';
import { module7 } from './module7';

export const businessCourse: Course = {
  id: 'b9c8d7e6-f5a4-9382-c1d0-e9f8a7b6c5d4',
  title: 'Business: Creating Your Business',
  description: `"Business: Creating Your Business" is a comprehensive online course designed to empower aspiring entrepreneurs with the skills, mindset, and strategies needed to launch and sustain a successful business. This course covers the entrepreneurial journey from ideation to execution, exploring critical topics such as identifying market opportunities, conducting effective market research, crafting business models, and implementing targeted marketing strategies. Learners will gain practical insights into the planning and development processes, understand the business ecosystem, and discover how to create a unique value proposition that resonates with customers. Delivered entirely online, this course is accessible globally and combines engaging content with actionable tools to help you turn your business ideas into reality, whether you're starting a local service or a scalable tech venture.

The course emphasizes real-world application, guiding learners through hands-on exercises like conducting a Community Scan to identify market needs and developing a business plan tailored to their target audience. Its relevance lies in equipping individuals with the knowledge to navigate today's dynamic economy, where entrepreneurship drives innovation and growth. With flexible, self-paced learning and support from an AI-powered voice tutor, this course is ideal for anyone looking to build a business with confidence and clarity.`,
  instructor: {
    name: 'Sarah Mitchell',
    title: 'Business Development Specialist & Entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Experienced entrepreneur and business consultant with 10+ years helping startups and small businesses succeed.'
  },
  level: 'beginner',
  duration: '10 weeks',
  students: 1247,
  rating: 4.8,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  category: 'Business & Entrepreneurship',
  learningObjectives: [
    'Identify and articulate the mindset and common characteristics of successful entrepreneurs, applying these traits to their own ventures.',
    'Conduct a Community Scan to evaluate market needs and validate business opportunities using observational and interview techniques.',
    'Perform targeted market research to define customer segments, analyze demand, and develop a unique value proposition.',
    'Explain and apply the development and planning processes involved in launching a new product or service, including creating a business plan.',
    'Analyze the business ecosystem and evaluate successful business models to select the most suitable for their venture.',
    'Design effective marketing strategies that focus on specific customer segments to maximize impact and resource efficiency.',
    'Develop a comprehensive business pitch tailored to attract investors, partners, or customers.',
    'Understand legal considerations, business structures, and compliance requirements for successful business operations.',
    'Master financial planning and funding strategies to ensure sustainable business growth.',
    'Implement branding and marketing strategies to build a strong market presence.'
  ],
  modules: [
    module1,
    module2,
    module4,
    module5,
    module6,
    module7
  ]
}; 