import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 9,
  title: 'Module 9 Quiz: Client Consultation and Communication',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is essential for effective client consultation?',
        options: [
          'Only skin analysis',
          'Medical history, skin analysis, lifestyle factors, and treatment goals',
          'Only treatment goals',
          'Only medical history'
        ],
        correct: 1,
        explanation: 'Effective consultation requires comprehensive assessment including medical history, skin analysis, lifestyle factors, and understanding treatment goals.'
      },
      {
        question: 'What is active listening?',
        options: [
          'Only hearing',
          'Full attention, understanding, appropriate response, and clarification',
          'Only responding',
          'Only asking questions'
        ],
        correct: 1,
        explanation: 'Active listening involves giving full attention, understanding the message, providing appropriate response, and asking clarifying questions.'
      },
      {
        question: 'What should be included in aftercare instructions?',
        options: [
          'Only product recommendations',
          'Immediate care, ongoing care, product recommendations, and follow-up',
          'Only immediate care',
          'Only ongoing care'
        ],
        correct: 1,
        explanation: 'Comprehensive aftercare includes immediate care instructions, ongoing care guidelines, product recommendations, and follow-up support.'
      },
      {
        question: 'Why is documentation important in consultations?',
        options: [
          'Only for records',
          'Client safety, treatment history, progress tracking, and legal protection',
          'Only for legal protection',
          'Only for progress tracking'
        ],
        correct: 1,
        explanation: 'Documentation is essential for client safety, maintaining treatment history, tracking progress, and legal protection.'
      },
      {
        question: 'What should be checked during treatment planning?',
        options: [
          'Only client preferences',
          'Skin analysis, client goals, contraindications, and available resources',
          'Only contraindications',
          'Only skin analysis'
        ],
        correct: 1,
        explanation: 'Treatment planning requires comprehensive assessment including skin analysis, understanding client goals, identifying contraindications, and considering available resources.'
      }
    ]
  }
};

export default quiz;

