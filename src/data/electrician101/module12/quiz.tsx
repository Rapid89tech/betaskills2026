import type { Lesson } from '@/types/course';

export const module12Quiz: Lesson = {
  id: 5,
  title: 'Module 12 Quiz',
  duration: '15 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What does a solar inverter do?',
        options: [
          'Stores energy',
          'Converts DC to AC',
          'Tracks the sun',
          'Cleans the panels'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which NEC article covers solar PV systems?',
        options: ['Article 625', 'Article 690', 'Article 430', 'Article 800'],
        correctAnswer: 1
      },
      {
        id: 3,
        question: 'What is the typical charging power for a Level 2 EV charger?',
        options: ['120V 15A', '240V 40-50A', '480V 100A', '600V 200A'],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'Which protocol is commonly used for smart home mesh networks?',
        options: ['WiFi only', 'Bluetooth only', 'Zigbee or Z-Wave', 'Ethernet'],
        correctAnswer: 2
      },
      {
        id: 5,
        question: 'How much more efficient are LED lights compared to incandescent?',
        options: ['25%', '50%', '75-80%', '90%'],
        correctAnswer: 2
      }
    ]
  }
};

