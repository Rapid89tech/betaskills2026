import type { Module } from '@/types/course';
import { lesson1PersonalDevotionsFastingBibleStudy } from './lesson1-personal-devotions-fasting-bible-study';
import { lesson2AccountabilityAndMentorship } from './lesson2-accountability-and-mentorship';
import { lesson3SelfCarePrayerRetreatsBurnout } from './lesson3-self-care-prayer-retreats-burnout';
import { lesson4SeekingHolySpiritGuidance } from './lesson4-seeking-holy-spirit-guidance';
import { quiz } from './quiz';

export const module10: Module = {
  id: 10,
  title: 'Spiritual Growth and Teacher Renewal',
  description: 'Personal devotions, fasting, and Bible study, accountability and mentorship for teachers, self-care, prayer retreats, and guarding against burnout, and seeking the guidance of the Holy Spirit in teaching.',
  lessons: [
    lesson1PersonalDevotionsFastingBibleStudy,
    lesson2AccountabilityAndMentorship,
    lesson3SelfCarePrayerRetreatsBurnout,
    lesson4SeekingHolySpiritGuidance,
    quiz
  ]
};
