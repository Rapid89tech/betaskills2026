import type { Module } from '@/types/course';
import { lesson1DiscipleshipThroughTeaching } from './lesson1-discipleship-through-teaching';
import { lesson2TeachingPrayerObedienceGodlyLiving } from './lesson2-teaching-prayer-obedience-godly-living';
import { lesson3MentorshipPastoralCare } from './lesson3-mentorship-pastoral-care';
import { lesson4EncouragingServiceMissionsLeadership } from './lesson4-encouraging-service-missions-leadership';
import { quiz } from './quiz';

export const module6: Module = {
  id: 6,
  title: 'Discipleship Through Teaching',
  description: 'Beyond academics: forming spiritual lives, teaching prayer, obedience, and godly living, mentorship and pastoral care in the classroom, and encouraging service, missions, and leadership.',
  lessons: [
    lesson1DiscipleshipThroughTeaching,
    lesson2TeachingPrayerObedienceGodlyLiving,
    lesson3MentorshipPastoralCare,
    lesson4EncouragingServiceMissionsLeadership,
    quiz
  ]
};
