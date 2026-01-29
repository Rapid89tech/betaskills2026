import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 3,
  title: 'Module 3 Quiz: Facial Treatments and Techniques',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary benefit of facial massage?',
        options: [
          'Only relaxation',
          'Improved circulation, lymphatic drainage, muscle relaxation, and product penetration',
          'Only product penetration',
          'Only muscle relaxation'
        ],
        correct: 1,
        explanation: 'Facial massage provides multiple benefits including improved circulation, lymphatic drainage, muscle relaxation, and enhanced product penetration.'
      },
      {
        question: 'Which exfoliation method uses acids to dissolve dead skin cells?',
        options: [
          'Mechanical exfoliation',
          'Chemical exfoliation',
          'Physical exfoliation',
          'Manual exfoliation'
        ],
        correct: 1,
        explanation: 'Chemical exfoliation uses acids (AHAs, BHAs) or enzymes to chemically break down dead skin cells, while mechanical exfoliation uses physical friction.'
      },
      {
        question: 'What type of mask is best for oily, acne-prone skin?',
        options: [
          'Hydrating mask',
          'Clay mask',
          'Gel mask',
          'Sheet mask'
        ],
        correct: 1,
        explanation: 'Clay masks are ideal for oily, acne-prone skin as they absorb excess oil, remove impurities, and refine pores.'
      },
      {
        question: 'What is the recommended frequency for mechanical exfoliation for normal skin?',
        options: [
          'Daily',
          '2-3 times per week',
          'Once per month',
          'Never'
        ],
        correct: 1,
        explanation: 'Normal skin typically benefits from mechanical exfoliation 2-3 times per week to maintain smooth texture without over-exfoliating.'
      },
      {
        question: 'Which massage technique involves long, gliding strokes?',
        options: [
          'Petrissage',
          'Tapotement',
          'Effleurage',
          'Friction'
        ],
        correct: 2,
        explanation: 'Effleurage involves long, gliding strokes used for relaxation and product distribution, typically used at the beginning and throughout facial massage.'
      }
    ]
  }
};

export default quiz;

