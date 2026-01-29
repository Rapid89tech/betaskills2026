import type { Lesson } from '@/types/course';

export const lesson3PracticeExam: Lesson = {
  id: 3,
  title: 'Comprehensive Practice Exam',
  duration: '120 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the maximum spacing for receptacles along a wall in dwelling units per NEC?',
        options: ['6 feet', '12 feet', '15 feet', '20 feet'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is the minimum size conductor for a 20-ampere branch circuit?',
        options: ['14 AWG', '12 AWG', '10 AWG', '8 AWG'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Where must GFCI protection be provided in dwelling units?',
        options: [
          'Only bathrooms',
          'Bathrooms, kitchens, outdoors, garages, and basements',
          'All outlets',
          'Only outdoor outlets'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What is the minimum burial depth for UF cable in residential applications?',
        options: ['6 inches', '12 inches', '18 inches', '24 inches'],
        correctAnswer: 2
      },
      {
        id: 5,
        question: 'How many feet must a ground rod be driven into the earth?',
        options: ['6 feet', '8 feet', '10 feet', '12 feet'],
        correctAnswer: 1
      },
      {
        id: 6,
        question: 'What color is the grounded (neutral) conductor?',
        options: ['Black', 'Red', 'White or gray', 'Green'],
        correctAnswer: 2
      },
      {
        id: 7,
        question: 'What is the standard frequency of AC power in North America?',
        options: ['50 Hz', '60 Hz', '100 Hz', '120 Hz'],
        correctAnswer: 1
      },
      {
        id: 8,
        question: 'Which article of the NEC covers grounding and bonding?',
        options: ['Article 210', 'Article 220', 'Article 250', 'Article 300'],
        correctAnswer: 2
      },
      {
        id: 9,
        question: 'What is the minimum working clearance in front of a residential panel?',
        options: ['1 foot', '2 feet', '3 feet', '4 feet'],
        correctAnswer: 2
      },
      {
        id: 10,
        question: 'What does AFCI stand for?',
        options: [
          'Arc Fault Circuit Interrupter',
          'Automatic Fault Control Indicator',
          'Amp Fault Circuit Indicator',
          'Arc Flash Control Interrupter'
        ],
        correctAnswer: 0
      },
      {
        id: 11,
        question: 'At what temperature is THHN wire rated in dry locations?',
        options: ['60°C', '75°C', '90°C', '105°C'],
        correctAnswer: 2
      },
      {
        id: 12,
        question: 'What NEC article covers motors and motor controllers?',
        options: ['Article 310', 'Article 400', 'Article 430', 'Article 500'],
        correctAnswer: 2
      },
      {
        id: 13,
        question: 'What is the formula for Ohm\'s Law?',
        options: ['P = V × I', 'V = I × R', 'V = P × I', 'I = V × R'],
        correctAnswer: 1
      },
      {
        id: 14,
        question: 'Where should ground and neutral be bonded in an electrical system?',
        options: [
          'At every panel',
          'Only at the service disconnect',
          'At every outlet',
          'Never bonded'
        ],
        correctAnswer: 1
      },
      {
        id: 15,
        question: 'What is the minimum height for a working space in front of electrical equipment?',
        options: ['5 feet', '6 feet', '6.5 feet', '7 feet'],
        correctAnswer: 2
      },
      {
        id: 16,
        question: 'What type of conduit can be directly buried without additional protection?',
        options: ['EMT', 'PVC Schedule 40', 'FMC', 'AC cable'],
        correctAnswer: 1
      },
      {
        id: 17,
        question: 'What does VFD stand for?',
        options: [
          'Voltage Frequency Device',
          'Variable Frequency Drive',
          'Very Fast Device',
          'Volt Free Disconnect'
        ],
        correctAnswer: 1
      },
      {
        id: 18,
        question: 'How often is the NEC updated?',
        options: ['Annually', 'Every 2 years', 'Every 3 years', 'Every 5 years'],
        correctAnswer: 2
      },
      {
        id: 19,
        question: 'What is the maximum temperature of an arc flash?',
        options: ['10,000°F', '20,000°F', '35,000°F', '50,000°F'],
        correctAnswer: 2
      },
      {
        id: 20,
        question: 'What must be done before working on electrical equipment?',
        options: [
          'Put on gloves',
          'De-energize and lockout/tagout',
          'Tell supervisor',
          'Read manual'
        ],
        correctAnswer: 1
      }
    ]
  }
};

