import type { QuizLesson } from '@/types/course';

export const module10Quiz: QuizLesson = {
  id: 10,
  title: 'Module 10 Quiz: Hair Coloring and Treatments',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What do hair color levels indicate?',
        options: [
          'The brightness of the hair color',
          'The lightness or darkness of the hair color',
          'The type of product used'
        ],
        correct: 1,
        explanation: 'Levels (1–10) describe how light or dark the hair is, guiding colorists in selecting products and predicting outcomes.'
      },
      {
        question: 'What are the three main tone categories in hair color?',
        options: [
          'Warm, neutral, cool',
          'Bright, medium, dark',
          'Gold, red, blue'
        ],
        correct: 0,
        explanation: 'Tones determine the warmth or coolness of a color, influencing its compatibility with skin undertones.'
      },
      {
        question: 'What is a key characteristic of permanent hair color?',
        options: [
          'It washes out after one shampoo',
          'It doesn\'t require touch-ups',
          'It alters the natural pigment and lasts until new hair grows'
        ],
        correct: 2,
        explanation: 'Permanent color\'s chemical process ensures long-lasting results, requiring maintenance as hair grows.'
      },
      {
        question: 'Which type of hair color is best for experimenting with a new tone without long-term commitment?',
        options: [
          'Permanent',
          'Semi-permanent',
          'Temporary'
        ],
        correct: 2,
        explanation: 'Temporary color washes out quickly, making it ideal for short-term experiments with minimal risk.'
      },
      {
        question: 'What is balayage?',
        options: [
          'A method of isolating hair sections with foils',
          'A freehand painting technique for a natural, sun-kissed effect',
          'A process that involves gradually lightening the ends of the hair'
        ],
        correct: 1,
        explanation: 'Balayage\'s freehand application creates soft, low-maintenance highlights with seamless regrowth.'
      },
      {
        question: 'Which technique uses foils to separate hair sections?',
        options: [
          'Ombre',
          'Balayage',
          'Traditional highlighting'
        ],
        correct: 2,
        explanation: 'Foiling ensures precise color placement, commonly used for structured highlights or lowlights.'
      },
      {
        question: 'What is the primary benefit of ombre hair coloring?',
        options: [
          'It is completely maintenance-free',
          'It creates a seamless blend of colors from root to tip',
          'It provides a striking contrast from roots to ends'
        ],
        correct: 2,
        explanation: 'Ombre\'s gradient effect creates a bold, customizable look with varying maintenance needs.'
      },
      {
        question: 'What is the purpose of hair color tones (warm, cool, neutral)?',
        options: [
          'To determine how long the color will last',
          'To control the intensity of the color result',
          'To customize the final color appearance and match skin undertones'
        ],
        correct: 2,
        explanation: 'Tones enhance or neutralize undertones for a flattering, harmonious result.'
      },
      {
        question: 'What is a common maintenance tip for permanent hair color?',
        options: [
          'Use color-safe shampoo and conditioner',
          'Avoid sunlight completely',
          'Shampoo twice as often'
        ],
        correct: 0,
        explanation: 'Color-safe products preserve vibrancy and prevent premature fading.'
      },
      {
        question: 'Why might someone choose semi-permanent hair color?',
        options: [
          'To cover gray hair permanently',
          'To refresh their existing color without long-term commitment',
          'To drastically lighten their natural hair color'
        ],
        correct: 1,
        explanation: 'Semi-permanent color enhances or refreshes without permanent alteration, fading naturally.'
      }
    ]
  }
};
