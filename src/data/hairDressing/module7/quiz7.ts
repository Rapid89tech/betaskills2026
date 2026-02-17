import type { Quiz } from '@/types/course';

export const module7Quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Hair Styling and Finishing',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the best technique to create volume while blow-drying?',
        options: [
          'Blow-dry in the direction of natural fall',
          'Use a paddle brush only',
          'Over-direct the hair while blow-drying',
          'Use high heat without sectioning'
        ],
        correct: 2,
        explanation: 'Over-directing the hair (blow-drying in the opposite direction of natural fall) lifts roots and creates volume.'
      },
      {
        question: 'How does using a round brush affect styling?',
        options: [
          'Adds shape, curl, and volume',
          'Flattens the hair',
          'Makes the hair frizzy',
          'Creates a polished and smooth finish'
        ],
        correct: 3,
        explanation: 'Round brushes create polished, smooth finishes with shape, curl, and volume depending on technique.'
      },
      {
        question: 'What is the purpose of a diffuser?',
        options: [
          'To straighten hair',
          'To enhance natural curls and reduce frizz',
          'To make hair greasy',
          'To add excessive heat to the scalp'
        ],
        correct: 1,
        explanation: 'Diffusers disperse air to enhance natural curls and waves while minimizing frizz.'
      },
      {
        question: 'Why is a heat protectant important when using styling tools?',
        options: [
          'It speeds up the drying process',
          'It makes hair greasy',
          'It prevents moisture loss and breakage',
          'It increases heat exposure'
        ],
        correct: 2,
        explanation: 'Heat protectants create a barrier that prevents moisture loss and minimizes heat damage.'
      },
      {
        question: 'What is the recommended distance for holding a blow-dryer from the hair?',
        options: [
          '2-3 inches',
          '6-8 inches',
          '10-12 inches',
          'Directly on the scalp'
        ],
        correct: 1,
        explanation: 'Keeping the dryer 6-8 inches away prevents overheating and burning the hair.'
      },
      {
        question: 'What type of brush is best for straight, sleek blow-drying?',
        options: [
          'Round brush',
          'Vent brush',
          'Paddle brush',
          'Teasing brush'
        ],
        correct: 2,
        explanation: 'Paddle brushes are ideal for creating straight, sleek finishes by pulling hair taut.'
      },
      {
        question: 'What should be done to lock in a blow-dry style?',
        options: [
          'Use high heat continuously',
          'Apply hair oil immediately',
          'Finish with a cool shot',
          'Use excessive hair spray'
        ],
        correct: 2,
        explanation: 'The cool shot closes the cuticle, locks in the style, and adds shine.'
      },
      {
        question: 'How does sectioning the hair before blow-drying help?',
        options: [
          'Speeds up the drying process',
          'Allows for even heat distribution',
          'Improves styling control',
          'All of the above'
        ],
        correct: 3,
        explanation: 'Sectioning ensures even heat distribution, better control, and more polished results.'
      },
      {
        question: 'Which product is best for adding texture during heat styling?',
        options: [
          'Hair oil',
          'Heavy conditioner',
          'Mousse or texturizing spray',
          'Deep conditioner'
        ],
        correct: 2,
        explanation: 'Mousse and texturizing sprays add body, texture, and hold during styling.'
      },
      {
        question: 'What is the best way to maintain hair health while using heat tools?',
        options: [
          'Use heat tools daily without protection',
          'Avoid any styling products',
          'Always use heat protectant and avoid excessive heat',
          'Use the highest heat setting on all tools'
        ],
        correct: 2,
        explanation: 'Heat protectants and appropriate heat settings prevent damage and maintain hair health.'
      }
    ]
  }
};
