import type { Quiz } from '@/types/course';

export const module5Quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Landscape Installation and Maintenance',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of site preparation in landscaping?',
        options: [
          'To add decorative elements',
          'To clear obstacles, assess conditions, and create a stable base',
          'To plant as many trees as possible',
          'To avoid testing soil'
        ],
        correct: 1,
        explanation: 'Site preparation involves clearing obstacles, assessing soil and site conditions, and creating a stable base to support landscaping features like lawns, patios, and plantings.'
      },
      {
        question: 'What slope percentage is recommended for drainage on lawns or hardscapes?',
        options: [
          '0% (completely flat)',
          '1–2%',
          '5–10%',
          '15–20%'
        ],
        correct: 1,
        explanation: 'A 1–2% slope (1–2 inches drop per 10 feet) is recommended for drainage on lawns and hardscapes to prevent water pooling while maintaining usability.'
      },
      {
        question: 'When planting trees, how wide should the hole be relative to the root ball?',
        options: [
          'Same width as the root ball',
          'Twice the width of the root ball',
          'Half the width of the root ball',
          'Three times the width of the root ball'
        ],
        correct: 1,
        explanation: 'Planting holes should be twice the width and equal to the depth of the root ball to allow for proper root expansion and establishment.'
      },
      {
        question: 'Which turf installation method provides an instant lawn?',
        options: [
          'Seeding',
          'Sodding',
          'Sprigging',
          'Plugging'
        ],
        correct: 1,
        explanation: 'Sodding involves laying pre-grown grass rolls for an instant lawn with faster establishment (2–3 weeks) compared to seeding or sprigging.'
      },
      {
        question: 'What is the recommended mowing height for tall fescue grass?',
        options: [
          '1–2 inches',
          '2.5–3.5 inches',
          '4–5 inches',
          '0.5–1 inch'
        ],
        correct: 1,
        explanation: 'Tall fescue should be mowed to 2.5–3.5 inches to promote deep roots, shade out weeds, and maintain a healthy, drought-resistant lawn.'
      },
      {
        question: 'Which pruning type involves removing spent flowers to encourage reblooming?',
        options: [
          'Thinning',
          'Heading back',
          'Deadheading',
          'Shearing'
        ],
        correct: 2,
        explanation: 'Deadheading is the removal of spent flowers to encourage plants to produce more blooms and improve overall appearance.'
      },
      {
        question: 'When is the best time to prune deciduous trees like red maple?',
        options: [
          'Mid-summer',
          'Late winter/early spring during dormancy',
          'Late fall',
          'Throughout the year'
        ],
        correct: 1,
        explanation: 'Deciduous trees should be pruned in late winter or early spring during dormancy to minimize stress and prevent excessive sap loss.'
      },
      {
        question: 'What is integrated pest management (IPM)?',
        options: [
          'Using only chemical pesticides',
          'A sustainable approach combining monitoring, prevention, and targeted treatments',
          'Ignoring all pests',
          'Applying pesticides weekly'
        ],
        correct: 1,
        explanation: 'IPM is a sustainable pest management approach that combines monitoring, prevention, cultural/mechanical controls, biological controls, and targeted chemical treatments as a last resort.'
      },
      {
        question: 'What should be done with grass clippings during mowing for nutrient recycling?',
        options: [
          'Always bag and dispose of them',
          'Leave them on the lawn to return nutrients',
          'Burn them',
          'Throw them away immediately'
        ],
        correct: 1,
        explanation: 'Leaving grass clippings on the lawn returns nutrients to the soil, reducing the need for fertilizer and supporting a healthier lawn.'
      },
      {
        question: 'What is the ideal carbon-to-nitrogen ratio for composting?',
        options: [
          '1:1',
          '2:1 or 3:1',
          '10:1',
          '1:2'
        ],
        correct: 1,
        explanation: 'A carbon-to-nitrogen ratio of 2:1 or 3:1 (e.g., 2 parts dry leaves to 1 part grass clippings) ensures proper decomposition and nutrient-rich compost.'
      }
    ]
  }
};

