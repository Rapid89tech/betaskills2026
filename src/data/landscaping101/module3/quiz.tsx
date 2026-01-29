import type { Quiz } from '@/types/course';

export const module3Quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Soil, Plants, and Turf Management',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which soil type has large particles, drains quickly, and is low in nutrient retention?',
        options: [
          'Clay',
          'Sandy',
          'Loam',
          'Peaty'
        ],
        correct: 1,
        explanation: 'Sandy soil has large particles, gritty texture, and drains quickly with low water and nutrient retention.'
      },
      {
        question: 'What is the ideal pH range for most plants in landscaping?',
        options: [
          '4.0 – 5.0',
          '5.0 – 6.0',
          '6.0 – 7.0',
          '7.5 – 8.5'
        ],
        correct: 2,
        explanation: 'Most plants prefer a pH range of 6.0–7.0, which is slightly acidic to neutral, supporting optimal nutrient availability.'
      },
      {
        question: 'Which soil improvement method is recommended to raise the pH of acidic soil?',
        options: [
          'Apply sulfur',
          'Add lime (calcium carbonate)',
          'Incorporate peat moss',
          'Use organic mulch'
        ],
        correct: 1,
        explanation: 'Adding lime (calcium carbonate) raises soil pH by neutralizing acidity, making it suitable for plants that prefer neutral to slightly alkaline conditions.'
      },
      {
        question: 'During a drainage test, you dig a 12-inch hole and the water drains in less than 1 hour. Which soil type does this indicate?',
        options: [
          'Clay',
          'Sandy',
          'Silt',
          'Peaty'
        ],
        correct: 1,
        explanation: 'Sandy soil drains very quickly (typically less than 1 hour), while clay soil drains slowly (over 24 hours).'
      },
      {
        question: 'Which of the following soils is best for acid-loving plants like blueberries and rhododendrons?',
        options: [
          'Chalky',
          'Peaty',
          'Loam',
          'Silt'
        ],
        correct: 1,
        explanation: 'Peaty soil is high in organic matter and naturally acidic, making it ideal for acid-loving plants like blueberries and rhododendrons.'
      },
      {
        question: 'What is the main purpose of adding compost to soil?',
        options: [
          'To make soil more alkaline',
          'To improve soil fertility, structure, and water retention',
          'To kill pests and weeds',
          'To reduce sunlight exposure'
        ],
        correct: 1,
        explanation: 'Compost improves soil fertility, structure, and water retention, while also enhancing microbial activity and overall soil health.'
      },
      {
        question: 'If a soil test shows low nitrogen and potassium in a backyard, which improvement should be applied?',
        options: [
          'Sand and lime',
          'Balanced fertilizer (e.g., 10-10-10)',
          'Only mulch',
          'Peat moss only'
        ],
        correct: 1,
        explanation: 'A balanced fertilizer like 10-10-10 provides equal parts nitrogen, phosphorus, and potassium to address nutrient deficiencies.'
      },
      {
        question: 'Which method of soil testing is most accurate and provides detailed nutrient recommendations?',
        options: [
          'Home soil testing kit',
          'Field observation',
          'Laboratory testing',
          'Drainage test'
        ],
        correct: 2,
        explanation: 'Laboratory testing provides highly accurate, comprehensive analysis of pH, nutrients, organic matter, and texture with detailed amendment recommendations.'
      },
      {
        question: 'What is the main disadvantage of clay soil in landscaping?',
        options: [
          'Poor water retention',
          'Drains too quickly',
          'Compacts easily and drains slowly',
          'Too sandy for root crops'
        ],
        correct: 2,
        explanation: 'Clay soil has small, tightly packed particles that compact easily and drain slowly, which can lead to waterlogging and make it difficult to work with.'
      },
      {
        question: 'Which sustainable practice helps improve soil structure and fertility naturally?',
        options: [
          'Continuous tilling',
          'Planting cover crops like clover or rye',
          'Over-fertilization',
          'Using chemical herbicides frequently'
        ],
        correct: 1,
        explanation: 'Planting cover crops like clover or rye improves soil structure, adds nutrients naturally, and promotes microbial activity while reducing the need for chemical fertilizers.'
      }
    ]
  }
};

