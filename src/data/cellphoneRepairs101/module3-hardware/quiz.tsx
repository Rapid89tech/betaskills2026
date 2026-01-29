import type { Quiz } from '@/types/course';

export const module3Quiz: Quiz = {
  id: 4,
  title: 'Quiz: Module 3 – Hardware Components and Functions',
  duration: '15-20 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Which component serves as the main circuit board and central hub for all connections in a smartphone?',
        type: 'multiple-choice',
        options: [
          'Battery',
          'Screen',
          'Motherboard',
          'SIM tray'
        ],
        correctAnswer: 2,
        explanation: 'The motherboard serves as the main circuit board and central hub for all connections in a smartphone.'
      },
      {
        id: 2,
        question: 'What is the primary function of the battery in a smartphone?',
        type: 'multiple-choice',
        options: [
          'Store apps',
          'Power the device',
          'Cool the system',
          'Control the touchscreen'
        ],
        correctAnswer: 1,
        explanation: 'The primary function of the battery in a smartphone is to power the device.'
      },
      {
        id: 3,
        question: 'Which hardware component is responsible for processing data and executing commands?',
        type: 'multiple-choice',
        options: [
          'Display module',
          'Button',
          'Memory chip',
          'Processor'
        ],
        correctAnswer: 3,
        explanation: 'The processor is responsible for processing data and executing commands in a smartphone.'
      },
      {
        id: 4,
        question: 'What role do memory chips play in a smartphone?',
        type: 'multiple-choice',
        options: [
          'Power the screen',
          'Store and retrieve data',
          'Transmit signals',
          'Convert voltage'
        ],
        correctAnswer: 1,
        explanation: 'Memory chips play the role of storing and retrieving data in a smartphone.'
      },
      {
        id: 5,
        question: 'What does the display module primarily do?',
        type: 'multiple-choice',
        options: [
          'Run applications',
          'Charge the device',
          'Output visuals and user interface',
          'Store data'
        ],
        correctAnswer: 2,
        explanation: 'The display module primarily outputs visuals and user interface in a smartphone.'
      },
      {
        id: 6,
        question: 'Which component allows physical interaction such as volume control or power on/off?',
        type: 'multiple-choice',
        options: [
          'Touchscreen',
          'Button',
          'Microphone',
          'Vibration motor'
        ],
        correctAnswer: 1,
        explanation: 'Buttons allow physical interaction such as volume control or power on/off.'
      },
      {
        id: 7,
        question: 'A cracked screen most commonly affects which part of the phone?',
        type: 'multiple-choice',
        options: [
          'Processor',
          'Battery',
          'Display module',
          'Speaker'
        ],
        correctAnswer: 2,
        explanation: 'A cracked screen most commonly affects the display module of the phone.'
      },
      {
        id: 8,
        question: 'The motherboard connects all major components in a smartphone.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. The motherboard connects all major components in a smartphone.'
      },
      {
        id: 9,
        question: 'All smartphone batteries are removable and replaceable.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Not all smartphone batteries are removable and replaceable, especially in modern devices.'
      },
      {
        id: 10,
        question: 'A malfunctioning processor can cause the phone to freeze or shut down.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. A malfunctioning processor can cause the phone to freeze or shut down.'
      },
      {
        id: 11,
        question: 'The screen is only for touch input and does not display images.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. The screen is for both touch input and displaying images.'
      },
      {
        id: 12,
        question: 'Memory chips can be upgraded easily in most smartphones.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Memory chips cannot be upgraded easily in most smartphones as they are soldered to the motherboard.'
      },
      {
        id: 13,
        question: 'Buttons are usually connected to the motherboard through flex cables.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. Buttons are usually connected to the motherboard through flex cables.'
      },
      {
        id: 14,
        question: 'The display module includes both the LCD and the digitizer.',
        type: 'true-false',
        correctAnswer: true,
        explanation: 'True. The display module includes both the LCD and the digitizer.'
      },
      {
        id: 15,
        question: 'Hardware components are generally the same in all phone brands and models.',
        type: 'true-false',
        correctAnswer: false,
        explanation: 'False. Hardware components vary significantly between different phone brands and models.'
      }
    ]
  }
};
