import { Lesson } from '../../../types/course';

const lesson3Quiz: Lesson = {
  id: 3,
  title: 'Module 4 Quiz: Grouting and Finishing',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'How long should you typically wait before grouting after tile installation?',
        options: [
          'Immediately',
          '2-4 hours',
          '24 hours',
          '48-72 hours'
        ],
        correct: 2,
        explanation: 'Waiting 24 hours allows the tile adhesive to cure properly before applying grout, ensuring strong installation.'
      },
      {
        question: 'What is the purpose of removing excess grout during application?',
        options: [
          'To save money on grout',
          'To prevent staining and ensure proper joint depth',
          'To make cleanup easier',
          'To speed up the process'
        ],
        correct: 1,
        explanation: 'Removing excess grout prevents staining of tile surfaces and ensures proper joint depth for optimal appearance and performance.'
      },
      {
        question: 'What tool is best for removing grout haze from tile surfaces?',
        options: [
          'Wet sponge',
          'Dry cloth',
          'Rubber float',
          'Wire brush'
        ],
        correct: 0,
        explanation: 'A clean, damp sponge is the best tool for removing grout haze without damaging the grout joints or tile surface.'
      },
      {
        question: 'When should grout be sealed?',
        options: [
          'Immediately after application',
          'After 24 hours',
          'After 48-72 hours of curing',
          'Never'
        ],
        correct: 2,
        explanation: 'Grout should be sealed after 48-72 hours of curing to ensure the sealer penetrates properly and provides maximum protection.'
      },
      {
        question: 'What is the recommended grout joint width for most wall tiles?',
        options: [
          '1/16 inch',
          '1/8 inch',
          '1/4 inch',
          '1/2 inch'
        ],
        correct: 1,
        explanation: '1/8 inch is the standard recommended grout joint width for most wall tile installations.'
      },
      {
        question: 'What angle should you hold the float when applying grout?',
        options: [
          '30 degrees',
          '45 degrees',
          '60 degrees',
          '90 degrees'
        ],
        correct: 1,
        explanation: 'Holding the float at a 45-degree angle allows for proper grout application and joint filling.'
      },
      {
        question: 'What causes grout to crack after installation?',
        options: [
          'Too much water in the mix',
          'Substrate movement',
          'Rapid drying',
          'All of the above'
        ],
        correct: 3,
        explanation: 'Grout cracking can result from excess water, substrate movement, rapid drying, or inadequate curing conditions.'
      },
      {
        question: 'How should you clean grout tools after use?',
        options: [
          'Let them air dry',
          'Clean immediately with water',
          'Soak in adhesive remover',
          'Use a wire brush'
        ],
        correct: 1,
        explanation: 'Grout tools should be cleaned immediately with water before the grout hardens and becomes difficult to remove.'
      },
      {
        question: 'What is the purpose of caulking around tile edges?',
        options: [
          'To provide flexibility and prevent water penetration',
          'To hold tiles in place',
          'To improve appearance only',
          'To save grout material'
        ],
        correct: 0,
        explanation: 'Caulking provides flexibility at tile edges and prevents water penetration in areas subject to movement.'
      },
      {
        question: 'How often should you rinse your sponge when cleaning grout haze?',
        options: [
          'Once at the end',
          'Every few tiles',
          'After each tile',
          'Never'
        ],
        correct: 1,
        explanation: 'Rinsing the sponge every few tiles prevents redistributing grout residue and ensures effective cleaning.'
      }
    ]
  },
};

export default lesson3Quiz;
