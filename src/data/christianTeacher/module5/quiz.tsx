import type { Quiz } from '@/types/course';

export const quiz: Quiz = {
  id: 6,
  title: 'Quiz: Teaching Methods and Learning Styles',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Why did Jesus often teach using parables?',
        options: [
          'To make His teachings entertaining',
          'To confuse everyone deliberately',
          'To reveal spiritual truths in a relatable way',
          'To avoid teaching large crowds'
        ],
        correctAnswer: 2,
        explanation: 'Jesus used parables to reveal spiritual truths in a relatable way, making complex theological concepts easier to grasp and remember.'
      },
      {
        id: 2,
        question: 'According to the Gospels, what was one reason Jesus gave for teaching in parables?',
        options: [
          'To speak in riddles like ancient prophets',
          'To fulfill the prophecy of Isaiah about hearing but not understanding',
          'To show off His intelligence',
          'To avoid conflict with religious leaders'
        ],
        correctAnswer: 1,
        explanation: 'Jesus said He taught in parables to fulfill the prophecy of Isaiah about hearing but not understanding (See Matthew 13:13-15).'
      },
      {
        id: 3,
        question: 'Who was more likely to understand the meaning of Jesus\' parables?',
        options: [
          'The Pharisees and scribes',
          'Those with open hearts and spiritual insight',
          'Only the apostles',
          'Educated Greeks and Romans'
        ],
        correctAnswer: 1,
        explanation: 'Those with open hearts and spiritual insight were more likely to understand the meaning of Jesus\' parables.'
      },
      {
        id: 4,
        question: 'What did Jesus say His disciples were given that others were not?',
        options: [
          'The ability to perform miracles',
          'Political power',
          'The knowledge of the secrets of the kingdom of heaven',
          'The right to judge others'
        ],
        correctAnswer: 2,
        explanation: 'Jesus said His disciples were given the knowledge of the secrets of the kingdom of heaven (See Matthew 13:11).'
      },
      {
        id: 5,
        question: 'How did parables help Jesus\' audience understand His message?',
        options: [
          'They used familiar situations and imagery',
          'They contained coded messages only Jews understood',
          'They required no interpretation',
          'They were told only to confuse people'
        ],
        correctAnswer: 0,
        explanation: 'Parables helped Jesus\' audience understand His message by using familiar situations and imagery that they could relate to.'
      },
      {
        id: 6,
        question: 'Which of the following is NOT one of the main types of learning styles in the VARK model?',
        options: [
          'Visual',
          'Auditory',
          'Reading/Writing',
          'Physical Strength'
        ],
        correctAnswer: 3,
        explanation: 'Physical Strength is not one of the main types of learning styles in the VARK model. The four main types are Visual, Auditory, Reading/Writing, and Kinesthetic.'
      },
      {
        id: 7,
        question: 'A learner who prefers charts, diagrams, and color-coded notes most likely has which learning style?',
        options: [
          'Kinesthetic',
          'Visual',
          'Auditory',
          'Reading/Writing'
        ],
        correctAnswer: 1,
        explanation: 'A learner who prefers charts, diagrams, and color-coded notes most likely has a Visual learning style.'
      },
      {
        id: 8,
        question: 'Which learning style benefits most from listening to lectures, discussions, and audio recordings?',
        options: [
          'Reading/Writing',
          'Visual',
          'Auditory',
          'Kinesthetic'
        ],
        correctAnswer: 2,
        explanation: 'Auditory learners benefit most from listening to lectures, discussions, and audio recordings.'
      },
      {
        id: 9,
        question: 'Kinesthetic learners learn best through which method?',
        options: [
          'Watching videos',
          'Reading textbooks',
          'Physical activity and hands-on experience',
          'Listening to podcasts'
        ],
        correctAnswer: 2,
        explanation: 'Kinesthetic learners learn best through physical activity and hands-on experience.'
      },
      {
        id: 10,
        question: 'A person who prefers to learn by writing notes and reading textbooks would most likely be a:',
        options: [
          'Visual learner',
          'Reading/Writing learner',
          'Auditory learner',
          'Kinesthetic learner'
        ],
        correctAnswer: 1,
        explanation: 'A person who prefers to learn by writing notes and reading textbooks would most likely be a Reading/Writing learner.'
      }
    ]
  }
};
