import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 2,
  title: 'Module 2 Quiz: Anatomy and Physiology for Beauty Therapy',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the outermost layer of the skin?',
        options: [
          'Dermis',
          'Epidermis',
          'Hypodermis',
          'Stratum basale'
        ],
        correct: 1,
        explanation: 'The epidermis is the outermost layer of the skin, providing protection and barrier function.'
      },
      {
        question: 'Which layer of the skin contains collagen and elastin?',
        options: [
          'Epidermis',
          'Dermis',
          'Hypodermis',
          'Stratum corneum'
        ],
        correct: 1,
        explanation: 'The dermis contains collagen and elastin fibers that provide strength and elasticity to the skin.'
      },
      {
        question: 'What is the active growth phase of hair called?',
        options: [
          'Telogen',
          'Catagen',
          'Anagen',
          'Exogen'
        ],
        correct: 2,
        explanation: 'The anagen phase is the active growth phase of hair, lasting 2-7 years for scalp hair.'
      },
      {
        question: 'Where does nail growth originate?',
        options: [
          'Nail bed',
          'Nail plate',
          'Nail matrix',
          'Cuticle'
        ],
        correct: 2,
        explanation: 'Nail growth originates from the nail matrix, which is located under the cuticle and extends under the nail plate.'
      },
      {
        question: 'Which skin condition requires immediate medical referral?',
        options: [
          'Mild acne',
          'Dry skin',
          'Suspected skin cancer',
          'Minor hyperpigmentation'
        ],
        correct: 2,
        explanation: 'Suspected skin cancer requires immediate medical referral. Beauty therapists should recognize warning signs and refer clients to medical professionals.'
      }
    ]
  }
};

export default quiz;

