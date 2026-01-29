import type { Module } from '@/types/course';
import { lesson1LivingWhatYouTeach } from './lesson1-living-what-you-teach';
import { lesson2HonestyPatienceHumilityCompassion } from './lesson2-honesty-patience-humility-compassion';
import { lesson3AvoidingFavoritismBurnoutEmotionalCompromise } from './lesson3-avoiding-favoritism-burnout-emotional-compromise';
import { lesson4LegalMoralSpiritualResponsibilities } from './lesson4-legal-moral-spiritual-responsibilities';
import { quiz } from './quiz';

export const module7: Module = {
  id: 7,
  title: 'Teaching Ethics and Christian Integrity',
  description: 'Living what you teach, honesty, patience, humility, and compassion, avoiding favoritism, burnout, and emotional compromise, and legal, moral, and spiritual responsibilities.',
  lessons: [
    lesson1LivingWhatYouTeach,
    lesson2HonestyPatienceHumilityCompassion,
    lesson3AvoidingFavoritismBurnoutEmotionalCompromise,
    lesson4LegalMoralSpiritualResponsibilities,
    quiz
  ]
};
