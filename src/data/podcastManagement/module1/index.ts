import type { Module } from '@/types/course';
import { lesson1HistoryAndEvolutionOfPodcasting } from './lesson1-history-and-evolution-of-podcasting';
import { module1Quiz } from './quiz';

const module1: Module = {
  id: 1,
  title: '🎙️ Module 1: Introduction to Podcasting',
  description: 'Learn the fundamentals of podcasting, including its history, evolution, types, and impact on modern media. Understand what makes podcasts unique and how they are created and distributed.',
  lessons: [
    lesson1HistoryAndEvolutionOfPodcasting,
    module1Quiz
  ]
};

export default module1;
