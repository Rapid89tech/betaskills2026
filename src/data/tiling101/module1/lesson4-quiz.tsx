import { Lesson } from '../../../types/course';

const lesson4Quiz: Lesson = {
  id: 4,
  title: 'Module 1 Quiz: Introduction to Tiling',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main advantage of porcelain tiles over ceramic tiles?',
        options: [
          'Lower cost',
          'Easier to cut',
          'Higher durability and lower water absorption',
          'More color options'
        ],
        correct: 2,
        explanation: 'Porcelain tiles have higher durability and lower water absorption than ceramic tiles, making them suitable for more demanding applications.'
      },
      {
        question: 'Which tile type is best suited for outdoor applications?',
        options: [
          'Glazed ceramic',
          'Natural stone',
          'Porcelain',
          'Glass mosaic'
        ],
        correct: 2,
        explanation: 'Porcelain tiles are best for outdoor applications due to their low water absorption and resistance to freeze-thaw cycles.'
      },
      {
        question: 'What does the PEI rating indicate for tiles?',
        options: [
          'Water absorption rate',
          'Color fastness',
          'Wear resistance and durability',
          'Slip resistance'
        ],
        correct: 2,
        explanation: 'The PEI (Porcelain Enamel Institute) rating indicates the wear resistance and durability of tile surfaces.'
      },
      {
        question: 'Which tool is essential for cutting straight lines in tiles?',
        options: [
          'Tile nippers',
          'Wet saw',
          'Angle grinder',
          'Manual tile cutter'
        ],
        correct: 3,
        explanation: 'A manual tile cutter (score-and-snap) is the most common tool for making straight cuts in tiles.'
      },
      {
        question: 'What is the purpose of tile spacers?',
        options: [
          'To level tiles',
          'To maintain consistent grout line width',
          'To prevent tile cracking',
          'To improve adhesion'
        ],
        correct: 1,
        explanation: 'Tile spacers maintain consistent grout line width between tiles for a professional, uniform appearance.'
      },
      {
        question: 'Which adhesive type is recommended for wet areas?',
        options: [
          'Standard thinset',
          'Mastic',
          'Modified thinset',
          'Epoxy adhesive'
        ],
        correct: 2,
        explanation: 'Modified thinset with polymer additives provides better water resistance and flexibility for wet area installations.'
      },
      {
        question: 'What is the recommended substrate for heavy tile installations?',
        options: [
          'Drywall',
          'Plywood',
          'Cement backer board',
          'Particle board'
        ],
        correct: 2,
        explanation: 'Cement backer board provides the strongest, most stable substrate for heavy tile installations.'
      },
      {
        question: 'How should natural stone tiles be sealed?',
        options: [
          'Before installation only',
          'After installation only',
          'Both before and after installation',
          'Sealing is not necessary'
        ],
        correct: 2,
        explanation: 'Natural stone should be sealed both before installation (to prevent staining during grouting) and after installation for long-term protection.'
      },
      {
        question: 'What is the minimum grout joint width for rectified tiles?',
        options: [
          '1/32 inch',
          '1/16 inch',
          '1/8 inch',
          '1/4 inch'
        ],
        correct: 1,
        explanation: '1/16 inch is the minimum recommended grout joint width for rectified tiles to allow for proper grout penetration.'
      },
      {
        question: 'Which factor is most important when selecting tiles for a kitchen backsplash?',
        options: [
          'Color coordination',
          'Ease of cleaning and stain resistance',
          'Cost',
          'Installation speed'
        ],
        correct: 1,
        explanation: 'Ease of cleaning and stain resistance are most important for kitchen backsplashes due to exposure to cooking oils and food stains.'
      }
    ]
  },
};

export default lesson4Quiz;
