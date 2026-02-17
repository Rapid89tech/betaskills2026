import type { Lesson } from '@/types/course';

export const quiz8: Lesson = {
  id: 3,
  title: 'Module 8 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary goal of human-centered AI design?',
        options: ['Maximize efficiency', 'Prioritize human needs and values', 'Reduce costs', 'Increase autonomy'],
        correct: 1,
        explanation: 'Human-centered AI design prioritizes human needs, values, and experiences.'
      },
      {
        question: 'What is a key risk of over-reliance on AI for emotional support?',
        options: ['Improved health', 'Erosion of human relationships', 'Increased empathy', 'Better communication'],
        correct: 1,
        explanation: 'Over-reliance on AI may erode human relationships and social skills.'
      }
    ]
  }
};
