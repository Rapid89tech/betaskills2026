import type { Module } from '@/types/course';
import { lesson1VisualBranding } from './lesson1-visual-branding';
import { lesson2CopyAndCaptions } from './lesson2-copy-and-captions';
import { lesson3VideoContent } from './lesson3-video-content';
import { lesson4DesignTools } from './lesson4-design-tools';
import { lesson5UgcInfluencer } from './lesson5-ugc-influencer';
import { module4Quiz } from './quiz';

const module4: Module = {
  id: 4,
  title: '🎨 Module 4: Content Creation & Branding',
  description: 'Master visual branding, copywriting, video content creation, design tools, and user-generated content strategies for social media',
  lessons: [
    lesson1VisualBranding,
    lesson2CopyAndCaptions,
    lesson3VideoContent,
    lesson4DesignTools,
    lesson5UgcInfluencer,
    module4Quiz
  ]
};

export default module4;

