import type { Lesson } from '@/types/course';

export const module3Quiz: Lesson = {
  id: 5,
  title: 'Module 3 Quiz',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the formula for Ohm\'s Law?',
        options: [
          'P = V × I',
          'V = I × R',
          'V = I / R',
          'R = V × I'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is the unit of measurement for resistance?',
        options: [
          'Volts',
          'Amperes',
          'Ohms',
          'Watts'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'In a series circuit, what is the same for all components?',
        options: [
          'Voltage',
          'Current',
          'Resistance',
          'Power'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What happens to total resistance when resistors are added in parallel?',
        options: [
          'Increases',
          'Decreases',
          'Stays the same',
          'Becomes zero'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is the power formula?',
        options: [
          'P = V / I',
          'P = V × R',
          'P = V × I',
          'P = I / V'
        ],
        correctAnswer: 2
      },
      {
        id: 6,
        question: 'What type of current flows in one direction only?',
        options: [
          'Alternating Current (AC)',
          'Direct Current (DC)',
          'Pulsating Current',
          'Variable Current'
        ],
        correctAnswer: 1
      },
      {
        id: 7,
        question: 'What is the standard frequency of AC power in North America?',
        options: [
          '50 Hz',
          '60 Hz',
          '100 Hz',
          '120 Hz'
        ],
        correctAnswer: 1
      },
      {
        id: 8,
        question: 'At what current level can humans experience ventricular fibrillation?',
        options: [
          '1-5 mA',
          '10-20 mA',
          '50+ mA',
          '100+ mA'
        ],
        correctAnswer: 2
      },
      {
        id: 9,
        question: 'What happens to resistance in a conductor when temperature increases?',
        options: [
          'Decreases',
          'Increases',
          'Stays the same',
          'Becomes zero'
        ],
        correctAnswer: 1
      },
      {
        id: 10,
        question: 'If voltage is doubled and resistance stays the same, what happens to current?',
        options: [
          'Halves',
          'Stays the same',
          'Doubles',
          'Quadruples'
        ],
        correctAnswer: 2
      }
    ]
  }
};

