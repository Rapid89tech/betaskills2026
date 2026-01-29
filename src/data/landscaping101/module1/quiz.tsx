import type { Quiz } from '@/types/course';

export const module1Quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Landscaping',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of landscaping?',
        options: [
          'To cover soil with plants for decoration only',
          'To design, arrange, and maintain outdoor spaces for beauty, function, and environmental harmony',
          'To create urban structures in rural settings',
          'To remove natural elements from human environments'
        ],
        correct: 1,
        explanation: 'Landscaping is primarily about designing, arranging, and maintaining outdoor spaces to achieve beauty, functionality, and environmental harmony, not just decoration.'
      },
      {
        question: 'Which of the following best describes hardscape elements in landscaping?',
        options: [
          'Trees, shrubs, and flowers',
          'Soil and fertilizers',
          'Pathways, patios, and water features',
          'Compost and mulch'
        ],
        correct: 2,
        explanation: 'Hardscape elements refer to the non-living, structural components of a landscape such as pathways, patios, and water features, as opposed to softscape (plants).'
      },
      {
        question: 'Which ancient civilization is associated with the Hanging Gardens, one of the earliest examples of landscaping?',
        options: [
          'Ancient Egypt',
          'Mesopotamia',
          'Ancient Greece',
          'Ancient China'
        ],
        correct: 1,
        explanation: 'The Hanging Gardens of Babylon in Mesopotamia, dating to around 3000 BCE, are one of the Seven Wonders of the Ancient World and among the earliest known landscapes.'
      },
      {
        question: 'What feature was central to Ancient Egyptian gardens, symbolizing order and divine connection?',
        options: [
          'Rock gardens',
          'Date palm groves',
          'Lotus ponds and irrigation channels',
          'Stone fountains'
        ],
        correct: 2,
        explanation: 'Ancient Egyptian gardens featured lotus ponds and irrigation channels that symbolized order and divine connection, reflecting the Nile\'s life-giving role.'
      },
      {
        question: 'Which ancient culture emphasized harmony with nature in garden design, inspiring Taoist landscaping principles?',
        options: [
          'Roman',
          'Chinese',
          'Greek',
          'Indian'
        ],
        correct: 1,
        explanation: 'Ancient Chinese culture emphasized harmony with nature in garden design, creating miniature landscapes that laid the foundation for Taoist-inspired landscaping principles.'
      },
      {
        question: 'What was the key characteristic of French formal gardens during the 17th century?',
        options: [
          'Naturalistic, asymmetrical design',
          'Grand symmetry, geometric parterres, and ornamental pools',
          'Minimalist Zen-style elements',
          'Use of only native plant species'
        ],
        correct: 1,
        explanation: 'French formal gardens of the 17th century, epitomized by Versailles, featured grand symmetry, geometric parterres, clipped hedges, and ornamental pools, symbolizing royal authority.'
      },
      {
        question: 'Who is considered the father of American landscape architecture and designed Central Park?',
        options: [
          'Capability Brown',
          'Roberto Burle Marx',
          'Frederick Law Olmsted',
          'Thomas Church'
        ],
        correct: 2,
        explanation: 'Frederick Law Olmsted is considered the father of American landscape architecture and designed New York\'s Central Park in 1858, blending natural beauty with urban utility.'
      },
      {
        question: 'Which landscaping movement of the 18th century emphasized natural beauty over geometric precision?',
        options: [
          'Baroque Gardens',
          'English Landscape Garden',
          'French Formal Garden',
          'Italian Renaissance Garden'
        ],
        correct: 1,
        explanation: 'The English Landscape Garden movement of the 18th century rejected formality for rolling lawns, serpentine lakes, and groves, mimicking idealized natural landscapes.'
      },
      {
        question: 'What is a modern trend in landscaping focusing on low-water usage and sustainability?',
        options: [
          'Permaculture',
          'Xeriscaping',
          'Minimalist landscaping',
          'Floral gardening'
        ],
        correct: 1,
        explanation: 'Xeriscaping is a modern landscaping trend that focuses on low-water designs using drought-tolerant plants and efficient irrigation to address ecological concerns and water conservation.'
      },
      {
        question: 'Which modern landscape designer is known for naturalistic plantings with year-round appeal?',
        options: [
          'André Le Nôtre',
          'Roberto Burle Marx',
          'Piet Oudolf',
          'Capability Brown'
        ],
        correct: 2,
        explanation: 'Piet Oudolf is a contemporary landscape designer known for naturalistic plantings with year-round appeal, emphasizing sustainability and seasonal interest.'
      }
    ]
  }
};

