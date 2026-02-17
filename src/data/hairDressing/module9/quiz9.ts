import type { Quiz } from '@/types/course';

export const module9Quiz: Quiz = {
  id: 9,
  title: 'Module 9 Quiz: Curling and Straightening Techniques',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is a primary benefit of using a curling wand over a curling iron?',
        options: [
          'It\'s faster to heat up',
          'It\'s easier to create natural-looking curls',
          'It\'s gentler on hair than a curling iron'
        ],
        correct: 1,
        explanation: 'Curling wands create more natural-looking curls because they don\'t have a clamp that can flatten the hair.'
      },
      {
        question: 'Which tool is best for creating smooth, sleek straight hair?',
        options: [
          'A flat iron',
          'A curling wand',
          'Velcro rollers'
        ],
        correct: 0,
        explanation: 'Flat irons are the go-to tool for achieving pin-straight, glass-like hair with a smooth finish.'
      },
      {
        question: 'What is the key difference between temporary and permanent styling?',
        options: [
          'Temporary styles last until the hair is washed, while permanent styles require professional treatment to reverse',
          'Temporary styles use heat tools, while permanent styles use heatless methods',
          'Temporary styles are always less damaging than permanent styles'
        ],
        correct: 0,
        explanation: 'Temporary styles last until washing, while permanent styles alter hair structure and require professional treatment to reverse.'
      },
      {
        question: 'How can you protect your hair from heat damage when curling or straightening?',
        options: [
          'Always use the highest heat setting',
          'Apply a heat protectant spray before styling',
          'Rely on cool air alone without any styling tools'
        ],
        correct: 1,
        explanation: 'Heat protectant spray creates a barrier against high temperatures and helps prevent moisture loss and damage.'
      },
      {
        question: 'Which of the following is NOT a type of roller commonly used to curl hair?',
        options: [
          'Foam rollers',
          'Heated rollers',
          'Paddle rollers'
        ],
        correct: 2,
        explanation: 'Paddle rollers don\'t exist - paddle brushes are used for straightening, not curling. Common rollers include foam, Velcro, and heated rollers.'
      },
      {
        question: 'What factor determines the type of curls a curling wand or iron can produce?',
        options: [
          'The length of the hair',
          'The size of the barrel',
          'The type of heat protectant used'
        ],
        correct: 1,
        explanation: 'The barrel size determines curl type - smaller barrels create tight curls, while larger barrels create loose waves.'
      },
      {
        question: 'Why might someone choose a chemical relaxer over temporary straightening methods?',
        options: [
          'It\'s more affordable',
          'It provides longer-lasting straight hair',
          'It\'s quicker to apply at home'
        ],
        correct: 1,
        explanation: 'Chemical relaxers permanently alter hair structure, providing long-lasting straightness that doesn\'t require daily styling.'
      },
      {
        question: 'What is the primary purpose of using a paddle brush while blow-drying?',
        options: [
          'To create tight, defined curls',
          'To reduce frizz and achieve a smooth finish',
          'To cool the hair down after styling'
        ],
        correct: 1,
        explanation: 'Paddle brushes pull hair taut while blow-drying, smoothing the cuticle and reducing frizz for a sleek finish.'
      },
      {
        question: 'How often should you deep condition your hair when frequently using heat tools?',
        options: [
          'Once every two weeks',
          'Every wash',
          'Once a year'
        ],
        correct: 0,
        explanation: 'Deep conditioning at least once every two weeks helps restore moisture and elasticity for frequently heat-styled hair.'
      },
      {
        question: 'What is the recommended way to maintain curls throughout the day?',
        options: [
          'Avoid using any products',
          'Use a light hairspray or curl-enhancing cream',
          'Re-curl the hair every hour'
        ],
        correct: 1,
        explanation: 'Light hairspray or curl-enhancing cream helps maintain curl shape and reduce frizz without weighing hair down.'
      }
    ]
  }
};
