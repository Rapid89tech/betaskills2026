import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: International Cuisines',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Who is credited with codifying French haute cuisine and developing the brigade system?',
        options: [
          'François Pierre La Varenne',
          'Paul Bocuse',
          'Auguste Escoffier',
          'Alain Ducasse'
        ],
        correct: 2,
        explanation: 'Auguste Escoffier is credited with codifying French haute cuisine and developing the brigade system in the 19th century.'
      },
      {
        question: 'Which of the following is not one of the five mother sauces of French haute cuisine?',
        options: [
          'Béchamel',
          'Hollandaise',
          'Demi-glace',
          'Velouté'
        ],
        correct: 2,
        explanation: 'Demi-glace is a derivative of espagnole (brown sauce), not one of the five mother sauces. The five mother sauces are béchamel, velouté, espagnole, hollandaise, and tomato sauce.'
      },
      {
        question: 'What culinary movement in the 20th century emphasized lighter dishes, fresher ingredients, and artistic presentation?',
        options: [
          'Nouvelle Cuisine',
          'Classical Cuisine',
          'Global Fusion',
          'Rustic Cuisine'
        ],
        correct: 0,
        explanation: 'Nouvelle cuisine, led by chefs like Paul Bocuse, emphasized lighter dishes, fresher ingredients, and artistic presentation in the 20th century.'
      },
      {
        question: 'What principle of haute cuisine ensures harmonious combinations of flavors, textures, and colors?',
        options: [
          'Innovation',
          'Precision',
          'Balance',
          'Presentation'
        ],
        correct: 2,
        explanation: 'Balance is a core principle of haute cuisine, ensuring harmonious combinations of flavors, textures, and colors in every dish.'
      },
      {
        question: 'The technique of cooking meat slowly in its own fat, often used for duck, is known as:',
        options: [
          'Braising',
          'Confit',
          'Poaching',
          'Sous-Vide'
        ],
        correct: 1,
        explanation: 'Confit is the technique of cooking meat slowly in its own fat at low temperatures, commonly used for duck in French cuisine.'
      },
      {
        question: 'Which French haute cuisine cooking method involves vacuum-sealing food and cooking it at precise low temperatures?',
        options: [
          'Braising',
          'Poaching',
          'Sous-Vide',
          'Sautéing'
        ],
        correct: 2,
        explanation: 'Sous-vide is a modern technique that involves vacuum-sealing food and cooking it at precise low temperatures for consistent results.'
      },
      {
        question: 'What is the purpose of techniques like julienne, brunoise, and tourne in haute cuisine?',
        options: [
          'To speed up cooking time',
          'To enhance flavor',
          'To ensure uniform cuts and elegant presentation',
          'To tenderize proteins'
        ],
        correct: 2,
        explanation: 'Knife skills like julienne, brunoise, and tourne ensure uniform cuts for even cooking and elegant presentation in haute cuisine.'
      },
      {
        question: 'Which ingredient is considered a luxurious hallmark of haute cuisine?',
        options: [
          'Potatoes',
          'Truffles',
          'Carrots',
          'Onions'
        ],
        correct: 1,
        explanation: 'Truffles are considered a luxurious hallmark of haute cuisine, prized for their intense aroma and flavor.'
      },
      {
        question: 'Which of the following is a classic French haute cuisine dessert?',
        options: [
          'Baklava',
          'Crème Brûlée',
          'Tiramisu',
          'Mochi'
        ],
        correct: 1,
        explanation: 'Crème brûlée is a classic French haute cuisine dessert, featuring a rich custard base with a caramelized sugar top.'
      },
      {
        question: 'In professional kitchens, which practice is essential to maintain the high standards of French haute cuisine?',
        options: [
          'Avoiding seasonal ingredients',
          'Strict staff training and standardized recipes',
          'Using inexpensive substitutes for premium ingredients',
          'Eliminating wine-based sauces'
        ],
        correct: 1,
        explanation: 'Strict staff training and standardized recipes are essential to maintain the high standards of French haute cuisine in professional kitchens.'
      }
    ]
  }
};

export default quiz;

