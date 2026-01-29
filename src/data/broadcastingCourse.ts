import { Course } from '@/types/course';
import broadcastingModule1 from './broadcasting/module1-introduction';
import broadcastingModule2 from './broadcasting/module2-planning';
import broadcastingModule3 from './broadcasting/module3-recording';
import broadcastingModule4 from './broadcasting/module4-editing';
import broadcastingModule5 from './broadcasting/module5-publishing';
import broadcastingModule6 from './broadcasting/module6-marketing';
import broadcastingModule7 from './broadcasting/module7-monetization';
import broadcastingModule8 from './broadcasting/module8-analytics';

const broadcastingCourse: Course = {
  id: 'broadcasting',
  title: 'Broadcasting: Podcast Management Mastery',
  description: 'Unlock the secrets to creating, managing, and growing a successful podcast with this comprehensive online course, designed to guide you from concept to chart-topping production. Covering ideation, recording, editing, publishing, and marketing, this course equips you with the tools and strategies to build a professional podcast that captivates audiences. Delivered entirely online with flexible, interactive learning, it\'s perfect for aspiring podcasters, content creators, or marketers looking to leverage the power of audio storytelling. With hands-on projects and expert insights, you\'ll gain the skills to manage every aspect of a podcast, ensuring it stands out in a crowded digital landscape.',
  instructor: {
    name: 'Beta Skill Tutor',
    title: 'Senior Podcast Management Instructor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Certified podcast management instructor with 10+ years of experience in audio production, content creation, and digital media strategy.'
  },
  level: 'intermediate',
  duration: '8 weeks',
  students: 0,
  rating: 4.9,
  price: 500,
  currency: 'ZAR',
  is_free: false,
  thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop',
  category: 'Information Communication and technology',
  learningObjectives: [
    'Develop a compelling podcast concept, including defining niche, audience, and format',
    'Master audio recording and editing software, such as Audacity and Adobe Audition, to produce high-quality episodes',
    'Implement effective microphone and recording techniques to achieve professional-grade audio',
    'Create and execute a content plan, including episode scripting, guest management, and scheduling',
    'Publish podcasts on major platforms (e.g., Spotify, Apple Podcasts) with optimized metadata and RSS feeds',
    'Apply marketing strategies, including social media promotion and audience engagement, to grow listenership',
    'Analyze podcast performance metrics using analytics tools to refine content and increase reach'
  ],
  modules: [
    broadcastingModule1,
    broadcastingModule2,
    broadcastingModule3,
    broadcastingModule4,
    broadcastingModule5,
    broadcastingModule6,
    broadcastingModule7,
    broadcastingModule8
  ]
};

export default broadcastingCourse; 