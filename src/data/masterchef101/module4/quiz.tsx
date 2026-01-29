import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 4,
  title: 'Module 4 Quiz: Plating & Presentation – The Art of Aesthetics',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which principle of plating focuses on leaving empty areas on the plate to emphasize key components?',
        options: [
          'Balance',
          'Contrast',
          'Negative Space',
          'Focal Point'
        ],
        correct: 2,
        explanation: 'Negative space is the principle of plating that focuses on leaving empty areas on the plate to emphasize key components and avoid clutter.'
      },
      {
        question: 'What is the main purpose of creating a focal point in plating?',
        options: [
          'To add height to the dish',
          'To guide the diner\'s eye to the main element',
          'To make the plate colorful',
          'To increase the number of garnishes'
        ],
        correct: 1,
        explanation: 'The main purpose of creating a focal point in plating is to guide the diner\'s eye to the main element, creating visual hierarchy.'
      },
      {
        question: 'Which plating style involves arranging components like the numbers on a clock, with the main item at 6 o\'clock from the diner\'s perspective?',
        options: [
          'Linear Plating',
          'Clock Method',
          'Centered Plating',
          'Deconstructed Plating'
        ],
        correct: 1,
        explanation: 'The Clock Method involves arranging components like the numbers on a clock, with the main item at 6 o\'clock from the diner\'s perspective.'
      },
      {
        question: 'Which of the following is NOT considered a modernist plating technique?',
        options: [
          'Foams',
          'Spherification',
          'Pooled Sauce',
          'Gels'
        ],
        correct: 2,
        explanation: 'Pooled Sauce is a classic saucing technique, not a modernist plating technique. Foams, spherification, and gels are modernist techniques.'
      },
      {
        question: 'Which tool is most useful for the precise placement of microgreens or small garnishes?',
        options: [
          'Squeeze Bottle',
          'Tweezers',
          'Offset Spatula',
          'Ring Mold'
        ],
        correct: 1,
        explanation: 'Tweezers are most useful for the precise placement of microgreens or small garnishes, allowing for delicate and accurate positioning.'
      },
      {
        question: 'Why is balance important in plating?',
        options: [
          'It ensures all sauces are the same color',
          'It creates a cohesive plate combining colors, textures, and shapes',
          'It reduces the number of garnishes needed',
          'It makes the dish cook faster'
        ],
        correct: 1,
        explanation: 'Balance is important in plating because it creates a cohesive plate combining colors, textures, and shapes without overwhelming the eye.'
      }
    ]
  }
};

export default quiz;

