import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Tools and Equipment',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which comb is best for detangling wet hair?',
        options: [
          'Tail Comb',
          'Barber Comb',
          'Wide-Tooth Comb',
          'Cutting Comb'
        ],
        correct: 2,
        explanation: 'Wide-tooth combs are designed to gently detangle wet or curly hair without causing breakage.'
      },
      {
        question: 'What is the primary use of a paddle brush?',
        options: [
          'Creating curls',
          'Detangling and straightening hair',
          'Adding volume at the roots',
          'Backcombing for texture'
        ],
        correct: 1,
        explanation: 'Paddle brushes are perfect for detangling and smoothing long, straight hair.'
      },
      {
        question: 'What type of scissors is used for reducing bulk in thick hair?',
        options: [
          'Straight Scissors',
          'Thinning Scissors',
          'Curved Scissors',
          'Barber Scissors'
        ],
        correct: 1,
        explanation: 'Thinning shears have notched blades that remove bulk and blend layers without altering overall length.'
      },
      {
        question: 'Which heat styling tool is used to create defined curls?',
        options: [
          'Flat Iron',
          'Blow Dryer',
          'Curling Iron',
          'Vent Brush'
        ],
        correct: 2,
        explanation: 'Curling irons with clamps create structured, spiral curls and are easy to use.'
      },
      {
        question: 'What is the purpose of a diffuser attachment on a blow dryer?',
        options: [
          'To enhance and define curls',
          'To straighten hair faster',
          'To increase heat levels',
          'To cut down on drying time'
        ],
        correct: 0,
        explanation: 'Diffusers disperse heat gently, enhancing natural curls and waves without causing frizz.'
      },
      {
        question: 'What is the role of a face mask in hairdressing?',
        options: [
          'To make the stylist look professional',
          'To protect the stylist from hair clippings',
          'To prevent inhalation of chemicals and airborne particles',
          'To create a fashionable appearance'
        ],
        correct: 2,
        explanation: 'Face masks protect stylists from inhaling chemicals and airborne particles during treatments.'
      },
      {
        question: 'Which hygiene essential is used to sterilize combs and scissors?',
        options: [
          'Hand Sanitizer',
          'Face Mask',
          'Barbicide',
          'Styling Gel'
        ],
        correct: 2,
        explanation: 'Barbicide is a powerful disinfectant used to sanitize tools between clients.'
      },
      {
        question: 'What is the primary function of a cutting comb?',
        options: [
          'Ensuring even distribution and tension while cutting',
          'Creating volume at the roots',
          'Sectioning hair for braiding',
          'Blow-drying hair faster'
        ],
        correct: 0,
        explanation: 'Cutting combs have both wide and fine teeth for controlling tension and achieving precise cuts.'
      },
      {
        question: 'Which type of brush is best for blow-drying to create volume?',
        options: [
          'Paddle Brush',
          'Vent Brush',
          'Round Brush',
          'Teasing Brush'
        ],
        correct: 2,
        explanation: 'Round brushes are used with blow dryers to create volume, curls, and bends in the hair.'
      },
      {
        question: 'What protective gear is essential when applying hair dye?',
        options: [
          'Face Mask',
          'Gloves',
          'Cutting Apron',
          'Round Brush'
        ],
        correct: 1,
        explanation: 'Gloves protect the stylist\'s hands from harsh chemicals, dyes, and potential allergens.'
      }
    ]
  }
};
