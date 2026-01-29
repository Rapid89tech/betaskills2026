import type { Lesson } from '@/types/course';

export const module11Quiz: Lesson = {
  id: 5,
  title: 'Module 11 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the first step in systematic troubleshooting?',
        options: [
          'Replace parts',
          'Gather information',
          'Test voltage',
          'Call supervisor'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What tool detects hot spots in electrical systems?',
        options: [
          'Multimeter',
          'Voltage tester',
          'Thermal imaging camera',
          'Clamp meter'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'How should all wire splices be made?',
        options: [
          'Twist and tape',
          'In accessible junction boxes with approved methods',
          'Inside walls',
          'Any convenient location'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What indicates a circuit breaker may be failing?',
        options: [
          'Normal operation',
          'Nuisance tripping or won\'t reset',
          'Clicks when toggled',
          'Has label'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is preventive maintenance?',
        options: [
          'Fixing things when they break',
          'Scheduled maintenance to prevent failures',
          'Emergency repairs',
          'Replacing everything annually'
        ],
        correctAnswer: 1
      }
    ]
  }
};

