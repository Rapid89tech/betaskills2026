import type { Lesson } from '@/types/course';

export const module4Quiz: Lesson = {
  id: 4,
  title: 'Module 4 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Which wire gauge is typically used for 20A circuits?',
        options: ['14 AWG', '12 AWG', '10 AWG', '8 AWG'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What color wire is used for ground in US installations?',
        options: ['Black', 'White', 'Red', 'Green or Bare'],
        correctAnswer: 3
      },
      {
        id: 3,
        question: 'What tool measures voltage, current, and resistance?',
        options: ['Multimeter', 'Wire stripper', 'Fish tape', 'Conduit bender'],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'What is the purpose of a GFCI receptacle?',
        options: [
          'Increase voltage',
          'Protect against ground faults',
          'Reduce power consumption',
          'Control lighting'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What does AWG stand for?',
        options: [
          'American Wire Group',
          'American Wire Gauge',
          'Automatic Wire Generator',
          'Advanced Wiring Guide'
        ],
        correctAnswer: 1
      }
    ]
  }
};

