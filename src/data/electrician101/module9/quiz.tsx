import type { Lesson } from '@/types/course';

export const module9Quiz: Lesson = {
  id: 5,
  title: 'Module 9 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What does VFD stand for?',
        options: [
          'Variable Flow Device',
          'Variable Frequency Drive',
          'Voltage Frequency Display',
          'Very Fast Device'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is FLA on a motor nameplate?',
        options: [
          'Full Load Amps',
          'Fast Loading Amp',
          'Final Load Assessment',
          'Frequency Load Amp'
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: 'Where must the motor disconnect be located?',
        options: [
          'In the panel',
          'Within sight of motor',
          'In control room',
          'At building entrance'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What protects a motor from running overload?',
        options: [
          'Circuit breaker',
          'Fuse',
          'Overload relay',
          'Ground wire'
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: 'What NEC article covers motors?',
        options: ['Article 210', 'Article 250', 'Article 310', 'Article 430'],
        correctAnswer: 3
      }
    ]
  }
};

