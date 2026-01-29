import type { Quiz } from '@/types/course';

export const module2Quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Landscape Design Principles',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What design principle ensures all elements work together cohesively to convey a unified theme?',
        options: [
          'Balance',
          'Unity',
          'Rhythm',
          'Proportion'
        ],
        correct: 1,
        explanation: 'Unity ensures that plants, hardscapes, and other features work together to convey a single, coherent design theme or style, creating a sense of wholeness and consistency.'
      },
      {
        question: 'Which type of balance uses identical elements on either side of a central axis?',
        options: [
          'Asymmetrical balance',
          'Symmetrical balance',
          'Radial balance',
          'Dynamic balance'
        ],
        correct: 1,
        explanation: 'Symmetrical balance uses identical elements on either side of a central axis, such as matching shrubs flanking a pathway, creating a formal, mirror-image arrangement.'
      },
      {
        question: 'What does the design element "line" primarily accomplish in a landscape?',
        options: [
          'Adds color to the design',
          'Guides the viewer\'s eye and defines structure',
          'Provides texture',
          'Determines plant size'
        ],
        correct: 1,
        explanation: 'Line guides the viewer\'s eye through a landscape and defines structure and movement, using elements like pathways, plant arrangements, or hardscape edges.'
      },
      {
        question: 'Which design element refers to the three-dimensional shape or structure of landscape features?',
        options: [
          'Line',
          'Texture',
          'Form',
          'Scale'
        ],
        correct: 2,
        explanation: 'Form refers to the three-dimensional shape or structure of elements in a landscape, ranging from geometric to organic shapes, contributing to the overall aesthetic.'
      },
      {
        question: 'Coarse textures in landscaping are best described as:',
        options: [
          'Smooth and delicate like grasses',
          'Rough and bold like large-leafed plants or rugged stone',
          'Invisible to the viewer',
          'Only used in formal gardens'
        ],
        correct: 1,
        explanation: 'Coarse textures are rough and bold, like large-leafed plants (hostas) or rugged stone, appearing heavier and more prominent in the design.'
      },
      {
        question: 'Warm colors (reds, oranges, yellows) are best used for:',
        options: [
          'Creating calm and depth in backgrounds',
          'Drawing energy and attention to focal points',
          'Minimizing visual impact',
          'Only in winter landscapes'
        ],
        correct: 1,
        explanation: 'Warm colors like reds, oranges, and yellows create energy and draw attention, making them ideal for focal points such as flower beds or accent plants.'
      },
      {
        question: 'What does "scale" ensure in landscape design?',
        options: [
          'Plants are the same color',
          'Elements are appropriately sized for the site and human use',
          'All features are symmetrical',
          'Paths are curved'
        ],
        correct: 1,
        explanation: 'Scale ensures that elements like plants, hardscapes, and structures are appropriately sized in relation to each other, the site, and human users, ensuring harmony and functionality.'
      },
      {
        question: 'Which design principle creates movement through repetition or progression of elements?',
        options: [
          'Unity',
          'Balance',
          'Rhythm',
          'Focal point'
        ],
        correct: 2,
        explanation: 'Rhythm creates a sense of movement and flow through the repetition or progression of elements like plants, colors, or hardscapes at regular intervals.'
      },
      {
        question: 'A focal point in landscape design serves what primary purpose?',
        options: [
          'To fill empty space',
          'To draw attention and anchor the design as a visual centerpiece',
          'To provide shade',
          'To define property boundaries'
        ],
        correct: 1,
        explanation: 'A focal point is a standout feature (e.g., sculpture, tree, or water feature) that draws attention and anchors the design, providing a visual centerpiece.'
      },
      {
        question: 'When creating a 2D landscape plan, what should be included to ensure accurate implementation?',
        options: [
          'Only plant names',
          'A legend, scale, north arrow, and measurements',
          'Just colors and textures',
          'Only hardscape features'
        ],
        correct: 1,
        explanation: 'A complete 2D landscape plan should include a legend for symbols, a scale, a north arrow for orientation, and measurements for hardscapes and plant spacing to ensure accurate implementation.'
      }
    ]
  }
};

