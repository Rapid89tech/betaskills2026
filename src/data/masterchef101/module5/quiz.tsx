import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Balancing Flavors & Textures',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which of the following is NOT one of the five basic tastes essential for flavor harmony?',
        options: [
          'Sweet',
          'Salty',
          'Spicy',
          'Umami'
        ],
        correct: 2,
        explanation: 'Spicy is a sensation, not one of the five basic tastes. The five basic tastes are sweet, sour, salty, bitter, and umami.'
      },
      {
        question: 'Pairing crunchy elements with creamy elements in a dish primarily enhances:',
        options: [
          'Aroma',
          'Texture contrast',
          'Sweetness',
          'Color'
        ],
        correct: 1,
        explanation: 'Pairing crunchy elements with creamy elements primarily enhances texture contrast, creating sensory interest and engagement.'
      },
      {
        question: 'Which ingredient would most likely add umami to a dish?',
        options: [
          'Lemon zest',
          'Parmesan cheese',
          'Honey',
          'Dark chocolate'
        ],
        correct: 1,
        explanation: 'Parmesan cheese is rich in glutamate, which provides umami, the savory fifth taste that adds depth and richness to dishes.'
      },
      {
        question: 'Why is layering flavors important in professional cooking?',
        options: [
          'To simplify recipes',
          'To build depth and complexity',
          'To reduce cooking time',
          'To avoid using spices'
        ],
        correct: 1,
        explanation: 'Layering flavors is important to build depth and complexity, adding flavors at different stages (marinating, cooking, finishing) to create a harmonious dish.'
      },
      {
        question: 'Which of the following is an example of a technique to balance flavors during cooking?',
        options: [
          'Using a mandoline for slicing vegetables',
          'Adjusting seasoning gradually, like adding acid to cut richness',
          'Using a siphon gun to create foam',
          'Serving all elements at the same temperature'
        ],
        correct: 1,
        explanation: 'Adjusting seasoning gradually, like adding acid to cut richness, is a technique to balance flavors during cooking, ensuring harmonious taste profiles.'
      },
      {
        question: 'Which texture would crispy shallots add to a dish?',
        options: [
          'Gelatinous',
          'Creamy',
          'Crunchy',
          'Tender'
        ],
        correct: 2,
        explanation: 'Crispy shallots add a crunchy texture to dishes, providing contrast to softer elements like purées or sauces.'
      },
      {
        question: 'What role do aromatic ingredients like fresh herbs or spices play in balancing flavors?',
        options: [
          'They add color only',
          'They enhance aroma and tie flavors together',
          'They increase bitterness exclusively',
          'They reduce the need for salt'
        ],
        correct: 1,
        explanation: 'Aromatic ingredients like fresh herbs or spices enhance aroma and tie flavors together, creating a cohesive sensory experience.'
      },
      {
        question: 'Combining a hot grilled steak with a cold chimichurri sauce is an example of:',
        options: [
          'Layering flavors',
          'Texture contrast',
          'Temperature play',
          'Using umami boosters'
        ],
        correct: 2,
        explanation: 'Combining a hot grilled steak with a cold chimichurri sauce is an example of temperature play, creating sensory contrast through temperature differences.'
      },
      {
        question: 'Which of the following is a best practice to ensure flavor and texture balance in professional kitchens?',
        options: [
          'Over-season dishes to ensure bold taste',
          'Train staff to taste and evaluate balance during prep and service',
          'Avoid using seasonal ingredients',
          'Use only sweet and salty flavors'
        ],
        correct: 1,
        explanation: 'Training staff to taste and evaluate balance during prep and service is a best practice to ensure flavor and texture balance in professional kitchens.'
      },
      {
        question: 'In which cuisine is balancing sweet, sour, salty, and spicy commonly emphasized?',
        options: [
          'French',
          'Japanese',
          'Thai',
          'Italian'
        ],
        correct: 2,
        explanation: 'Thai cuisine commonly emphasizes balancing sweet, sour, salty, and spicy flavors, creating harmonious and vibrant dishes like tom yum or pad Thai.'
      }
    ]
  }
};

export default quiz;

