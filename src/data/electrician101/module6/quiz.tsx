import type { Lesson } from '@/types/course';

export const module6Quiz: Lesson = {
  id: 4,
  title: 'Module 6 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What does a circle on an electrical blueprint typically represent?',
        options: ['Switch', 'Outlet', 'Light fixture', 'Panel'],
        correctAnswer: 2
      },
      {
        id: 2,
        question: 'What does "S3" represent on a drawing?',
        options: ['Single switch', 'Three switches', '3-way switch', 'Three-pole switch'],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What does AFF mean on blueprints?',
        options: [
          'After Floor Finish',
          'Above Finished Floor',
          'All Floors',
          'Approved For Fabrication'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What type of line shows concealed wiring?',
        options: ['Solid line', 'Dashed line', 'Heavy line', 'Dotted line'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What information is found in the title block?',
        options: [
          'Circuit numbers',
          'Wire sizes',
          'Project information and dates',
          'Load calculations'
        ],
        correctAnswer: 2
      }
    ]
  }
};

