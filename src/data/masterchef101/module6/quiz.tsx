import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Fundamentals of Nutrition',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which principle of nutrition emphasizes providing a mix of macronutrients and micronutrients for overall health?',
        options: [
          'Variety',
          'Balance',
          'Moderation',
          'Bioavailability'
        ],
        correct: 1,
        explanation: 'Balance is the principle of nutrition that emphasizes providing a mix of macronutrients and micronutrients for overall health.'
      },
      {
        question: 'Which macronutrient is the body\'s primary source of energy, especially for the brain and muscles?',
        options: [
          'Proteins',
          'Fats',
          'Carbohydrates',
          'Fiber'
        ],
        correct: 2,
        explanation: 'Carbohydrates are the body\'s primary source of energy, especially for the brain and muscles, providing fuel through simple and complex forms.'
      },
      {
        question: 'Which type of fat is considered heart-healthy and should be emphasized in cooking?',
        options: [
          'Saturated fat',
          'Trans fat',
          'Unsaturated fat',
          'Hydrogenated fat'
        ],
        correct: 2,
        explanation: 'Unsaturated fat (e.g., olive oil, avocados) is considered heart-healthy and should be emphasized in cooking for optimal health.'
      },
      {
        question: 'Which micronutrient is essential for immunity and can be found in citrus fruits and peppers?',
        options: [
          'Vitamin D',
          'Vitamin C',
          'Calcium',
          'Iron'
        ],
        correct: 1,
        explanation: 'Vitamin C is essential for immunity and can be found in citrus fruits and peppers, supporting immune function and overall health.'
      },
      {
        question: 'Which principle involves tailoring dishes to meet individual dietary needs, preferences, or restrictions?',
        options: [
          'Sustainability',
          'Customization',
          'Moderation',
          'Variety'
        ],
        correct: 1,
        explanation: 'Customization is the principle that involves tailoring dishes to meet individual dietary needs, preferences, or restrictions.'
      },
      {
        question: 'What is the main role of dietary fiber?',
        options: [
          'Build muscle tissue',
          'Provide energy quickly',
          'Promote digestive health and regulate blood sugar',
          'Enhance flavor'
        ],
        correct: 2,
        explanation: 'Dietary fiber promotes digestive health, regulates blood sugar, and enhances satiety, supporting overall wellness.'
      },
      {
        question: 'Which cooking technique best preserves nutrients in vegetables?',
        options: [
          'Boiling for long periods',
          'Deep frying',
          'Steaming or sous-vide',
          'Microwaving without water'
        ],
        correct: 2,
        explanation: 'Steaming or sous-vide best preserves nutrients in vegetables by using gentle heat and minimal water, retaining vitamins and minerals.'
      },
      {
        question: 'Which combination enhances iron absorption from plant-based foods?',
        options: [
          'Spinach and orange slices',
          'Rice and beans',
          'Cheese and bread',
          'Fish and butter'
        ],
        correct: 0,
        explanation: 'Spinach and orange slices enhance iron absorption because vitamin C (from oranges) increases the bioavailability of iron from plant sources.'
      },
      {
        question: 'Which principle encourages using whole, minimally processed ingredients for better nutrition and environmental impact?',
        options: [
          'Flavor synergy',
          'Sustainability',
          'Moderation',
          'Bioavailability'
        ],
        correct: 1,
        explanation: 'Sustainability is the principle that encourages using whole, minimally processed ingredients for better nutrition and environmental impact.'
      },
      {
        question: 'Why is water considered a key component of nutrition?',
        options: [
          'It provides high energy for muscles',
          'It aids in hydration, nutrient transport, and temperature regulation',
          'It is a source of protein',
          'It enhances flavor of dishes'
        ],
        correct: 1,
        explanation: 'Water is considered a key component of nutrition because it aids in hydration, nutrient transport, and temperature regulation, essential for bodily functions.'
      }
    ]
  }
};

export default quiz;

