
import type { Lesson } from '@/types/course';

export const quiz2: Lesson = {
  id: 3,
  title: '📝 Module 2 Quiz: Planning and Content Strategy',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main purpose of a podcast content calendar?',
        options: [
          'To replace editing software',
          'To schedule episodes and keep production consistent',
          'To record interviews automatically',
          'To generate podcast artwork'
        ],
        correct: 1,
        explanation: 'A content calendar helps plan topics, recording, editing, and publish dates so you stay consistent.'
      },
      {
        question: 'Which format is best described as a scripted story with characters and sound design?',
        options: [
          'Interview',
          'Solo',
          'Fiction / Audio drama',
          'Panel'
        ],
        correct: 2,
        explanation: 'Fiction/audio drama podcasts are scripted and often include actors, sound effects, and music.'
      },
      {
        question: 'Why should you define a clear target audience for a podcast?',
        options: [
          'So you can publish less often',
          'So episodes can be optimized for the listener’s needs and interests',
          'So you never need guests',
          'So you can avoid using an RSS feed'
        ],
        correct: 1,
        explanation: 'A defined audience helps guide topics, tone, guests, and promotion—leading to better engagement.'
      }
    ]
  }
};
