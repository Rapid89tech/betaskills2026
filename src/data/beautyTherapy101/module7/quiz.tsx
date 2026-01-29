import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Body Treatments and Wellness',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary benefit of body massage?',
        options: [
          'Only relaxation',
          'Improved circulation, muscle relaxation, stress relief, and pain relief',
          'Only pain relief',
          'Only improved circulation'
        ],
        correct: 1,
        explanation: 'Body massage provides multiple benefits including improved circulation, muscle relaxation, stress relief, and pain relief.'
      },
      {
        question: 'What type of body wrap is used for intensive moisturization?',
        options: [
          'Detoxifying wrap',
          'Hydrating wrap',
          'Firming wrap',
          'Cooling wrap'
        ],
        correct: 1,
        explanation: 'Hydrating wraps use ingredients like aloe and hyaluronic acid to provide intensive moisturization for soft, hydrated skin.'
      },
      {
        question: 'What is essential for safe aromatherapy application?',
        options: [
          'Undiluted application',
          'Proper dilution in carrier oil',
          'Direct application to skin',
          'No safety considerations'
        ],
        correct: 1,
        explanation: 'Essential oils must be properly diluted in carrier oils (typically 1-3% concentration) for safe topical application.'
      },
      {
        question: 'What massage technique involves long, gliding strokes?',
        options: [
          'Petrissage',
          'Friction',
          'Effleurage',
          'Tapotement'
        ],
        correct: 2,
        explanation: 'Effleurage involves long, gliding strokes used for relaxation and product distribution, typically used at the beginning of massage.'
      },
      {
        question: 'What should be checked before body treatments?',
        options: [
          'Only client preferences',
          'Contraindications, client health, and skin condition',
          'Only skin condition',
          'Only client preferences'
        ],
        correct: 1,
        explanation: 'Before body treatments, therapists should check for contraindications, assess client health, and evaluate skin condition to ensure safe, appropriate treatment.'
      }
    ]
  }
};

export default quiz;

