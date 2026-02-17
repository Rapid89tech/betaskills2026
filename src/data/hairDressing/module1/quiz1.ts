import type { Quiz } from '@/types/course';

export const module1Quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Hairdressing',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the outermost layer of the hair called?',
        options: [
          'Cortex',
          'Medulla',
          'Cuticle',
          'Keratin'
        ],
        correct: 2,
        explanation: 'The cuticle is the outermost layer of the hair that protects the inner layers.'
      },
      {
        question: 'Which layer of the hair contains keratin and melanin?',
        options: [
          'Cuticle',
          'Cortex',
          'Medulla',
          'Follicle'
        ],
        correct: 1,
        explanation: 'The cortex is the middle layer that contains keratin proteins and melanin pigments.'
      },
      {
        question: 'Which hair type is naturally the most resistant to curling?',
        options: [
          'Wavy',
          'Straight',
          'Curly',
          'Coily'
        ],
        correct: 1,
        explanation: 'Straight hair (Type 1) is naturally the most resistant to curling without heat or products.'
      },
      {
        question: 'What type of hair porosity absorbs and retains moisture well?',
        options: [
          'Low Porosity',
          'Medium Porosity',
          'High Porosity',
          'No Porosity'
        ],
        correct: 1,
        explanation: 'Medium porosity hair strikes a balance, absorbing and retaining moisture effectively.'
      },
      {
        question: 'What is a common characteristic of coily hair?',
        options: [
          'Lies flat and smooth',
          'Forms an S-shaped wave',
          'Naturally dry and fragile',
          'Resistant to breakage'
        ],
        correct: 2,
        explanation: 'Coily hair (Type 4) is naturally dry and fragile due to the follicle shape impeding oil distribution.'
      },
      {
        question: 'What is the primary role of the cuticle in hair structure?',
        options: [
          'Determines hair color',
          'Protects the inner layers',
          'Provides moisture to the scalp',
          'Affects hair elasticity'
        ],
        correct: 1,
        explanation: 'The cuticle acts as a protective barrier against environmental damage and mechanical stress.'
      },
      {
        question: 'Which of the following describes low porosity hair?',
        options: [
          'Quickly absorbs moisture',
          'Retains moisture but resists absorption',
          'Lacks elasticity',
          'Becomes greasy within minutes'
        ],
        correct: 1,
        explanation: 'Low porosity hair has tightly bound cuticles that resist moisture absorption but retain it well once absorbed.'
      },
      {
        question: 'Which hair type is most prone to dryness due to minimal moisture retention?',
        options: [
          'Straight',
          'Wavy',
          'Curly',
          'Coily'
        ],
        correct: 3,
        explanation: 'Coily hair is most prone to dryness because natural oils have difficulty traveling down the twisted shafts.'
      },
      {
        question: 'What does hair elasticity refer to?',
        options: [
          'The ability of hair to stretch and return to its original shape',
          'The ability of hair to absorb water',
          'The way hair holds color',
          'The level of natural oils in hair'
        ],
        correct: 0,
        explanation: 'Hair elasticity refers to the ability of hair to stretch and return to its original shape without breaking.'
      },
      {
        question: 'How can high porosity hair be best maintained?',
        options: [
          'Avoiding all moisture',
          'Using heavy creams and sealing with oils',
          'Applying heat frequently',
          'Washing hair daily'
        ],
        correct: 1,
        explanation: 'High porosity hair benefits from heavy creams and sealing oils to lock in moisture and prevent frizz.'
      }
    ]
  }
};
