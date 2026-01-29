import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Professional Kitchens',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of a professional kitchen compared to a home kitchen?',
        options: [
          'Comfort and convenience',
          'High-volume food production with safety and efficiency',
          'Experimentation and casual dining',
          'To showcase personal cooking styles'
        ],
        correct: 1,
        explanation: 'Professional kitchens are designed for high-volume food production with safety and efficiency, unlike home kitchens which focus on comfort and convenience.'
      },
      {
        question: 'Which kitchen layout is most commonly used in high-volume restaurants to streamline service?',
        options: [
          'Zone Kitchen',
          'Line or Assembly Kitchen',
          'Open Kitchen',
          'Circular Kitchen'
        ],
        correct: 1,
        explanation: 'Line or Assembly Kitchen is most commonly used in high-volume restaurants, where stations are arranged in a linear fashion for streamlined food preparation and service.'
      },
      {
        question: 'In the kitchen brigade system, who is responsible for overall menu creation and kitchen operations?',
        options: [
          'Sous Chef',
          'Commis Chef',
          'Executive Chef',
          'Expediter'
        ],
        correct: 2,
        explanation: 'The Executive Chef is the head of the kitchen, responsible for menu creation, staff management, and overall kitchen operations.'
      },
      {
        question: 'Which role in a professional kitchen typically manages a specific cooking station like grill or pastry?',
        options: [
          'Kitchen Porter',
          'Chef de Partie',
          'Expediter',
          'Sous Chef'
        ],
        correct: 1,
        explanation: 'Chef de Partie (Station Chef) manages a specific station, such as sauté, grill, or pastry.'
      },
      {
        question: 'What is the main responsibility of the kitchen porter?',
        options: [
          'Supervising cooking stations',
          'Managing inventory and suppliers',
          'Cleaning, dishwashing, and basic prep tasks',
          'Preparing sauces and soups'
        ],
        correct: 2,
        explanation: 'The kitchen porter handles cleaning, dishwashing, and basic prep tasks to keep the kitchen running smoothly.'
      },
      {
        question: 'Which of the following is an example of industrial-grade equipment unique to professional kitchens?',
        options: [
          'Microwave oven',
          'Blast chiller',
          'Toaster oven',
          'Coffee maker'
        ],
        correct: 1,
        explanation: 'Blast chillers are industrial-grade equipment unique to professional kitchens, used to rapidly cool food to safe storage temperatures.'
      },
      {
        question: 'Which skill ensures consistency and efficiency when preparing multiple dishes under pressure?',
        options: [
          'Creativity',
          'Time Management',
          'Adaptability',
          'Knife Skills'
        ],
        correct: 1,
        explanation: 'Time Management is essential for preparing multiple dishes simultaneously while meeting service deadlines in a professional kitchen.'
      },
      {
        question: 'HACCP in food safety stands for:',
        options: [
          'Hazard Analysis and Critical Control Points',
          'Health and Culinary Cooking Practices',
          'Hygiene and Clean Cooking Program',
          'High-Accuracy Cooking Procedure'
        ],
        correct: 0,
        explanation: 'HACCP stands for Hazard Analysis and Critical Control Points, a systematic approach to food safety that identifies and controls potential hazards.'
      },
      {
        question: 'What type of kitchen layout allows diners to observe the cooking process directly?',
        options: [
          'Zone Kitchen',
          'Open Kitchen',
          'Line Kitchen',
          'Brigade Kitchen'
        ],
        correct: 1,
        explanation: 'Open Kitchen layout allows diners to observe the cooking process directly, which adds pressure on staff to maintain professionalism and cleanliness.'
      },
      {
        question: 'Which of the following is a common challenge in professional kitchens?',
        options: [
          'Lack of teamwork',
          'Long hours and high pressure',
          'Limited use of equipment',
          'Excessive focus on creativity'
        ],
        correct: 1,
        explanation: 'Long hours and high pressure are common challenges in professional kitchens, which are high-pressure environments with tight deadlines.'
      }
    ]
  }
};

export default quiz;

