import type { Quiz } from '@/types/course';

export const module1Quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Roofing',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of a roof in a building?',
        options: [
          'To provide space for solar panels',
          'To enhance building aesthetics',
          'To support the walls of the building',
          'To protect the interior from weather elements'
        ],
        correct: 3,
        explanation: 'The primary function of a roof in a building is to protect the interior from weather elements.'
      },
      {
        question: 'Which of the following best defines a roofing system?',
        options: [
          'A structure made entirely of tiles',
          'A flat surface placed on top of walls',
          'All components involved in the structure and weatherproofing of a roof',
          'A decorative cover for homes'
        ],
        correct: 2,
        explanation: 'A roofing system is defined as all components involved in the structure and weatherproofing of a roof.'
      },
      {
        question: 'What component of a roofing system lies directly on the structural framework and supports the roof covering?',
        options: [
          'Truss',
          'Decking or sheathing',
          'Flashing',
          'Underlayment'
        ],
        correct: 1,
        explanation: 'Decking or sheathing lies directly on the structural framework and supports the roof covering.'
      },
      {
        question: 'What is the role of underlayment in a roofing system?',
        options: [
          'Acts as a decorative layer',
          'Holds the tiles in place',
          'Provides insulation',
          'Offers a water-resistant barrier beneath the roof covering'
        ],
        correct: 3,
        explanation: 'The role of underlayment is to offer a water-resistant barrier beneath the roof covering.'
      },
      {
        question: 'Which component directs water away from seams, joints, and valleys in the roofing system?',
        options: [
          'Underlayment',
          'Decking',
          'Flashing and drainage systems',
          'Roof covering'
        ],
        correct: 2,
        explanation: 'Flashing and drainage systems direct water away from seams, joints, and valleys in the roofing system.'
      },
      {
        question: 'How does roofing contribute to energy efficiency?',
        options: [
          'It blocks solar energy',
          'It absorbs heat to keep buildings warm',
          'It provides shade for gardens',
          'It helps insulate the building and reduces heating/cooling costs'
        ],
        correct: 3,
        explanation: 'Roofing contributes to energy efficiency by helping insulate the building and reducing heating/cooling costs.'
      },
      {
        question: 'Which of the following is NOT a function of a good roofing system?',
        options: [
          'Prevents animal intrusion',
          'Enhances structural stability',
          'Reduces indoor air pollution',
          'Increases property value'
        ],
        correct: 2,
        explanation: 'Reducing indoor air pollution is NOT a function of a good roofing system.'
      },
      {
        question: 'What is one way roofing adds aesthetic value to a building?',
        options: [
          'By reducing energy use',
          'By offering various colors and styles to match architecture',
          'By allowing for rainwater harvesting',
          'By supporting HVAC systems'
        ],
        correct: 1,
        explanation: 'Roofing adds aesthetic value by offering various colors and styles to match architecture.'
      },
      {
        question: 'What type of roofing system would be most beneficial for sustainable building practices?',
        options: [
          'Thatched roofing',
          'Insulated metal roofing',
          'Green or solar roofing systems',
          'Asphalt shingles'
        ],
        correct: 2,
        explanation: 'Green or solar roofing systems would be most beneficial for sustainable building practices.'
      },
      {
        question: 'Why is it important to choose the right roofing system for a structure?',
        options: [
          'To match the neighborhood',
          'For fashion purposes',
          'To ensure safety, durability, and performance',
          'To meet city decoration standards'
        ],
        correct: 2,
        explanation: 'It is important to choose the right roofing system to ensure safety, durability, and performance.'
      }
    ]
  }
}; 
