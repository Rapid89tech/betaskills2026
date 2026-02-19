
import type { Quiz } from '../../../types/course';

export const quiz1: Quiz = {
  id: 'ai-cartoon-movies-module1-quiz',
  title: 'Module 1 Quiz: Introduction to AI-Assisted Animation',
  duration: '15 minutes',
  questions: [
    {
      question: 'What is a key advantage of using AI in cartoon movie production?',
      options: [
        'It removes the need for storyboarding',
        'It can speed up repetitive tasks and prototyping',
        'It guarantees award-winning results',
        'It eliminates all editing'
      ],
      correctAnswer: 1,
      explanation: 'AI can accelerate repetitive tasks, generate drafts, and help you prototype faster, but it still needs creative direction and review.'
    },
    {
      question: 'Which workflow difference best describes traditional vs AI-assisted animation?',
      options: [
        'Traditional uses no tools at all',
        'AI-assisted can automate or generate drafts while humans refine',
        'AI-assisted requires no human input',
        'Traditional animation cannot be edited'
      ],
      correctAnswer: 1,
      explanation: 'AI-assisted workflows often generate starting points (assets, motion, drafts) that creators refine and direct.'
    },
    {
      question: 'What should you do when using AI-generated content in a project?',
      options: [
        'Publish immediately without review',
        'Review, refine, and ensure it matches your style and goals',
        'Avoid checking quality because AI is always correct',
        'Never combine it with your own work'
      ],
      correctAnswer: 1,
      explanation: 'AI output should be treated as a draft—review for accuracy, quality, brand/style match, and refine as needed.'
    }
  ]
};

