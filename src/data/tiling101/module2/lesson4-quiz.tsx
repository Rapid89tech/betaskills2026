import { Lesson } from '../../../types/course';

const lesson4Quiz: Lesson = {
  id: 4,
  title: 'Module 2 Quiz: Surface Preparation and Layout',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is proper substrate preparation critical before tile installation?',
        options: [
          'To make tiles look shiny',
          'To ensure good adhesion and prevent future issues',
          'To reduce the amount of adhesive needed',
          'To make cutting easier'
        ],
        correct: 1,
        explanation: 'Proper substrate preparation ensures good adhesion between tiles and substrate, preventing issues like loose tiles, cracking, and water damage.'
      },
      {
        question: 'What is the acceptable flatness tolerance for most wall tile installations?',
        options: [
          '1/8 inch in 10 feet',
          '1/4 inch in 10 feet',
          '1/2 inch in 10 feet',
          '1 inch in 10 feet'
        ],
        correct: 0,
        explanation: '1/8 inch in 10 feet is the standard acceptable flatness tolerance for most wall tile installations to ensure proper alignment.'
      },
      {
        question: 'Which tool is best for checking if a surface is level?',
        options: [
          'Measuring tape',
          'Spirit level',
          'Tile spacers',
          'Notched trowel'
        ],
        correct: 1,
        explanation: 'A spirit level is the essential tool for checking if surfaces are level and plumb before tile installation.'
      },
      {
        question: 'What is the purpose of a chalk line in tile layout?',
        options: [
          'To mark tile cutting lines',
          'To create straight reference lines for tile placement',
          'To mark electrical outlet locations',
          'To outline the room perimeter'
        ],
        correct: 1,
        explanation: 'Chalk lines create straight, visible reference lines that guide accurate tile placement and ensure straight rows.'
      },
      {
        question: 'When planning tile layout, where should you typically start?',
        options: [
          'At the entrance door',
          'In the most visible corner',
          'At the center point of the room',
          'At the longest wall'
        ],
        correct: 2,
        explanation: 'Starting from the center point ensures balanced layout with equal cut tiles on opposite sides, creating the most professional appearance.'
      },
      {
        question: 'What is an expansion joint in tiling?',
        options: [
          'A gap filled with grout',
          'A flexible joint that allows for movement',
          'A decorative border',
          'A structural support beam'
        ],
        correct: 1,
        explanation: 'Expansion joints are flexible joints that accommodate thermal expansion and structural movement, preventing tile cracking.'
      },
      {
        question: 'How often should expansion joints be placed in large tile installations?',
        options: [
          'Every 5 feet',
          'Every 12-25 feet depending on conditions',
          'Every 50 feet',
          'Only at room perimeters'
        ],
        correct: 1,
        explanation: 'Expansion joints should be placed every 12-25 feet depending on tile type, substrate, and environmental conditions.'
      },
      {
        question: 'What should you do if the substrate has minor irregularities?',
        options: [
          'Install tiles directly over them',
          'Use self-leveling compound to correct them',
          'Use extra adhesive to compensate',
          'Ignore them as they will not matter'
        ],
        correct: 1,
        explanation: 'Minor irregularities should be corrected with self-leveling compound to create a proper, flat surface for tile installation.'
      },
      {
        question: 'When checking walls for plumb, what tolerance is typically acceptable?',
        options: [
          '1/16 inch in 8 feet',
          '1/8 inch in 8 feet',
          '1/4 inch in 8 feet',
          '1/2 inch in 8 feet'
        ],
        correct: 1,
        explanation: '1/8 inch in 8 feet is the standard acceptable tolerance for wall plumb measurements in tile installations.'
      },
      {
        question: 'Why is it important to dry-fit tiles before applying adhesive?',
        options: [
          'To check for defects in the tiles',
          'To verify layout and make adjustments',
          'To clean the tiles',
          'To warm up the tiles'
        ],
        correct: 1,
        explanation: 'Dry-fitting allows you to verify the layout, check spacing, and make necessary adjustments before permanently installing tiles.'
      }
    ]
  },
};

export default lesson4Quiz;
