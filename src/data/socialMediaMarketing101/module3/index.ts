import type { Module } from '@/types/course';
import { lesson1SmartGoals } from './lesson1-smart-goals';
import { lesson2AudienceResearch } from './lesson2-audience-research';
import { lesson3CompetitiveAnalysis } from './lesson3-competitive-analysis';
import { lesson4ContentStrategy } from './lesson4-content-strategy';
import { lesson5EditorialCalendar } from './lesson5-editorial-calendar';
import { module3Quiz } from './quiz';

const module3: Module = {
  id: 3,
  title: '🎯 Module 3: Social Media Strategy & Planning',
  description: 'Master SMART goal setting, audience research, competitive analysis, content strategy, and editorial calendar creation for effective social media marketing',
  lessons: [
    lesson1SmartGoals,
    lesson2AudienceResearch,
    lesson3CompetitiveAnalysis,
    lesson4ContentStrategy,
    lesson5EditorialCalendar,
    module3Quiz
  ]
};

export default module3;

