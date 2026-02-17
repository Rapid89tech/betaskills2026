import type { Module } from '@/types/course';
import { lesson1HistoryAndEvolution } from './lesson1-history-and-evolution';
import { quiz1 } from './quiz1';

const module1: Module = {
  id: 1,
  title: '🎙️ Module 1: Introduction to Podcasting',
  description: 'Explore the history, evolution, and fundamentals of podcasting, including podcast formats, creation processes, and the impact of podcasts on media and culture.',
  lessons: [
    lesson1HistoryAndEvolution,
    quiz1
  ]
};

export default module1;
