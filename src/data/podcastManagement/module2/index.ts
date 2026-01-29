import type { Module } from '@/types/course';
import { lesson1DevelopingShowConceptsAndFormats } from './lesson1-developing-show-concepts-and-formats';
import { lesson2PlanningContentCalendars } from './lesson2-planning-content-calendars';
import { lesson3IdentifyingAndResearchingGuests } from './lesson3-identifying-and-researching-guests';
import { lesson4ScriptWritingAndShowNotes } from './lesson4-script-writing-and-show-notes';
import { module2Quiz } from './quiz';

const module2: Module = {
  id: 2,
  title: '📋 Module 2: Pre-Production Planning',
  description: 'Master the essential pre-production skills for podcasting, including concept development, content planning, guest management, and script writing. Learn how to create compelling show concepts, build content calendars, identify and research guests, and write effective scripts and show notes.',
  lessons: [
    lesson1DevelopingShowConceptsAndFormats,
    lesson2PlanningContentCalendars,
    lesson3IdentifyingAndResearchingGuests,
    lesson4ScriptWritingAndShowNotes,
    module2Quiz
  ]
};

export default module2;
