import type { Module } from '@/types/course';
import { lesson1BibleAsCurriculum } from './lesson1-bible-as-curriculum';
import { lesson2KingdomPerspective } from './lesson2-kingdom-perspective';
import { lesson3CreationFallRedemption } from './lesson3-creation-fall-redemption';
import { lesson4DefendingFaith } from './lesson4-defending-faith';
import { quiz } from './quiz';

export const module2: Module = {
  id: 2,
  title: 'Biblical Foundations and Christian Worldview',
  description: 'Understanding the Bible as the ultimate curriculum, teaching from a Kingdom perspective, the Creation-Fall-Redemption-Restoration framework, and defending the faith with truth.',
  lessons: [
    lesson1BibleAsCurriculum,
    lesson2KingdomPerspective,
    lesson3CreationFallRedemption,
    lesson4DefendingFaith,
    quiz
  ]
};
