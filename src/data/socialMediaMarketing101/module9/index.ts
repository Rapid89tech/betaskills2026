import type { Module } from '@/types/course';
import { lesson1IdentifyingInfluencers } from './lesson1-identifying-influencers';
import { lesson2OutreachPartnerships } from './lesson2-outreach-partnerships';
import { lesson3TrackingSuccess } from './lesson3-tracking-success';
import { lesson4CaseStudies } from './lesson4-case-studies';
import { module9Quiz } from './quiz';

const module9: Module = {
  id: 9,
  title: '🤝 Module 9: Influencer Marketing & Collaborations',
  description: 'Master influencer identification, outreach strategies, campaign tracking, and learn from successful case studies',
  lessons: [
    lesson1IdentifyingInfluencers,
    lesson2OutreachPartnerships,
    lesson3TrackingSuccess,
    lesson4CaseStudies,
    module9Quiz
  ]
};

export default module9;

