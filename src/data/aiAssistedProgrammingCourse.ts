import { Course } from '@/types/course';
import module1 from './aiAssistedProgramming/module1';
import module2 from './aiAssistedProgramming/module2';
import module3 from './aiAssistedProgramming/module3';
import module4 from './aiAssistedProgramming/module4';
import module5 from './aiAssistedProgramming/module5';
import module6 from './aiAssistedProgramming/module6';
import module7 from './aiAssistedProgramming/module7';
import module8 from './aiAssistedProgramming/module8';
import module9 from './aiAssistedProgramming/module9';
import module10 from './aiAssistedProgramming/module10';

export const aiAssistedProgrammingCourse: Course = {
  id: 'ai-assisted-programming',
  title: 'AI Assisted Programming',
  description: 'The AI Assisted Programming Training Course is designed to equip learners with the knowledge and practical skills to integrate Artificial Intelligence tools into their software development workflow. This course explores how AI-powered coding assistants—such as ChatGPT, GitHub Copilot, and other generative AI tools—can accelerate coding, improve code quality, assist with debugging, and support innovation. Learners will gain hands-on experience using AI to generate, review, and optimize code in multiple programming languages, while also understanding best practices, limitations, and ethical considerations of AI-assisted development.',
  instructor: {
    name: 'Beta Skill Tutor',
    title: 'AI & Programming Expert',
    bio: 'Experienced AI specialist and programming instructor with expertise in machine learning, software development, and AI-assisted programming tools.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  level: 'intermediate',
  category: 'Technology & Programming',
  duration: '10 weeks',
  students: 1850,
  rating: 4.8,
  price: 750,
  currency: 'ZAR',
  is_free: false,
  thumbnail: '/placeholder.svg',
  learningObjectives: [
    'Understand the fundamentals of AI programming and how AI systems simulate human intelligence.',
    'Master Python programming for AI development with key libraries like NumPy, Pandas, and TensorFlow.',
    'Learn machine learning fundamentals including supervised, unsupervised, and reinforcement learning.',
    'Develop skills in data preprocessing, feature engineering, and model building.',
    'Build and deploy machine learning models using various algorithms and frameworks.',
    'Explore deep learning and neural networks for complex pattern recognition.',
    'Master natural language processing techniques and applications.',
    'Implement computer vision and image processing solutions.',
    'Evaluate, tune, and deploy AI models in production environments.',
    'Complete a comprehensive capstone project building a full AI application.'
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
    module10
  ]
};

export default aiAssistedProgrammingCourse;
