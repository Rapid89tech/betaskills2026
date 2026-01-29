import type { Quiz } from '@/types/course';

export const module9Quiz: Quiz = {
  id: 9,
  title: 'Module 9 Quiz: Reading Plumbing Blueprints and Estimation',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of a plumbing blueprint?',
        options: [
          'To estimate labor costs',
          'To show the layout of plumbing systems and ensure code compliance',
          'To list all fixtures available in a store',
          'To provide electrical system details'
        ],
        correct: 1,
        explanation: 'The primary purpose of a plumbing blueprint is to show the layout of plumbing systems and ensure code compliance.'
      },
      {
        question: 'What does a dashed line typically represent in a plumbing blueprint?',
        options: [
          'Electrical wiring',
          'Drainage or waste pipes',
          'Hot water supply lines',
          'Structural walls'
        ],
        correct: 1,
        explanation: 'A dashed line typically represents drainage or waste pipes in a plumbing blueprint.'
      },
      {
        question: 'What tool is used to measure distances accurately on a scaled blueprint?',
        options: [
          'Tape measure',
          'Scale ruler',
          'Pipe cutter',
          'Level'
        ],
        correct: 1,
        explanation: 'A scale ruler is used to measure distances accurately on a scaled blueprint.'
      },
      {
        question: 'When estimating material quantities, what should be included for pipe fittings?',
        options: [
          'Only the pipe length',
          'Extra length for joint overlaps and fittings',
          'Only the number of fixtures',
          'Insulation costs only'
        ],
        correct: 1,
        explanation: 'When estimating material quantities, extra length for joint overlaps and fittings should be included.'
      },
      {
        question: 'What is a key factor in labor cost estimation for plumbing projects?',
        options: [
          'The number of blueprints provided',
          'Time required for each installation step',
          'The cost of permits',
          'The type of fixtures used'
        ],
        correct: 1,
        explanation: 'Time required for each installation step is a key factor in labor cost estimation for plumbing projects.'
      },
      {
        question: 'What should be considered when planning pipe runs in a site layout?',
        options: [
          'Maximizing the number of bends',
          'Minimizing bends to maintain pressure and reduce costs',
          'Using only vertical pipe runs',
          'Ignoring fixture locations'
        ],
        correct: 1,
        explanation: 'When planning pipe runs in a site layout, minimizing bends to maintain pressure and reduce costs should be considered.'
      },
      {
        question: 'What is the first phase of a plumbing installation project?',
        options: [
          'Installing fixtures',
          'Underground work for main water and sewer lines',
          'Pressure testing the system',
          'Coordinating with electricians'
        ],
        correct: 1,
        explanation: 'The first phase of a plumbing installation project is underground work for main water and sewer lines.'
      },
      {
        question: 'Why is it important to update as-built drawings?',
        options: [
          'To increase material costs',
          'To reflect on-site changes for future maintenance',
          'To change the project scope',
          'To reduce inspection times'
        ],
        correct: 1,
        explanation: 'It is important to update as-built drawings to reflect on-site changes for future maintenance.'
      },
      {
        question: 'What does a legend in a plumbing blueprint provide?',
        options: [
          'A list of labor rates',
          'Explanations of symbols and abbreviations',
          'The project timeline',
          'Fixture installation instructions'
        ],
        correct: 1,
        explanation: 'A legend in a plumbing blueprint provides explanations of symbols and abbreviations.'
      },
      {
        question: 'What is a key consideration for large commercial plumbing projects?',
        options: [
          'Using only residential-grade fixtures',
          'Accounting for complex risers and high-capacity fixtures',
          'Ignoring venting requirements',
          'Avoiding coordination with other trades'
        ],
        correct: 1,
        explanation: 'A key consideration for large commercial plumbing projects is accounting for complex risers and high-capacity fixtures.'
      }
    ]
  }
}; 
