import type { Module } from '@/types/course';
import { lesson1TeachingMethodsLearningStyles } from './lesson1-teaching-methods-learning-styles';
import { lesson2AgeAppropriateScriptureTeaching } from './lesson2-age-appropriate-scripture-teaching';
import { lesson3BibleStoriesDoctrineApologetics } from './lesson3-bible-stories-doctrine-apologetics';
import { lesson4MemoryVersesDiscussionGuides } from './lesson4-memory-verses-discussion-guides';
import { lesson5CreatingLifelongHungerForGodsWord } from './lesson5-creating-lifelong-hunger-for-gods-word';
import { quiz } from './quiz';

export const module5: Module = {
  id: 5,
  title: 'Teaching Methods and Learning Styles',
  description: 'Using parables, visuals, drama, and storytelling, teaching younger children vs. teens and adults, active learning, group work, reflection, incorporating worship and prayer, and age-appropriate scripture teaching.',
  lessons: [
    lesson1TeachingMethodsLearningStyles,
    lesson2AgeAppropriateScriptureTeaching,
    lesson3BibleStoriesDoctrineApologetics,
    lesson4MemoryVersesDiscussionGuides,
    lesson5CreatingLifelongHungerForGodsWord,
    quiz
  ]
};
