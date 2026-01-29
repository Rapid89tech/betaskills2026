import type { Lesson } from '@/types/course';

export const module10Quiz: Lesson = {
  id: 5,
  title: 'Module 10 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the maximum distance for Cat6 cable at 10 Gbps?',
        options: ['50 meters', '55 meters', '100 meters', '300 meters'],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What does PoE stand for?',
        options: [
          'Power on Equipment',
          'Power over Ethernet',
          'Protocol of Electricity',
          'Panel on Entry'
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'Which standard covers commercial telecommunications cabling?',
        options: ['NEC Article 800', 'TIA/EIA-568', 'NFPA 70E', 'OSHA 1910'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What code governs fire alarm systems?',
        options: ['NEC Article 760', 'NFPA 72', 'OSHA 1910', 'IRC'],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'How often should fire alarm systems be inspected?',
        options: ['Monthly', 'Quarterly', 'Annually', 'Every 5 years'],
        correctAnswer: 2
      }
    ]
  }
};

