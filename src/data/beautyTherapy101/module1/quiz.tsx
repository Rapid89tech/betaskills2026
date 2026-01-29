import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Introduction to Beauty Therapy',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of beauty therapy?',
        options: [
          'To perform medical procedures',
          'To enhance physical appearance, promote skin health, and provide relaxation and wellness services',
          'To sell beauty products only',
          'To replace dermatological treatments'
        ],
        correct: 1,
        explanation: 'Beauty therapy focuses on enhancing physical appearance, promoting skin health, and providing relaxation and wellness services through professional treatments.'
      },
      {
        question: 'Which of the following is a core ethical principle in beauty therapy?',
        options: [
          'Maximizing profits at all costs',
          'Integrity, confidentiality, competence, and respect',
          'Avoiding client consultations',
          'Using any products available'
        ],
        correct: 1,
        explanation: 'Core ethical principles include integrity and honesty, confidentiality and privacy, competence and professional development, and respect and non-discrimination.'
      },
      {
        question: 'What is the typical salary range for an entry-level spa therapist in ZAR?',
        options: [
          'R2,000–R5,000 per month',
          'R8,000–R12,000 per month',
          'R20,000–R30,000 per month',
          'R40,000–R60,000 per month'
        ],
        correct: 1,
        explanation: 'Entry-level spa therapists typically earn R8,000–R12,000 per month, with potential for growth based on experience and specialization.'
      },
      {
        question: 'Which organization is considered the international gold standard for beauty therapy education?',
        options: [
          'NCEA',
          'CIDESCO',
          'ASC',
          'IAOM'
        ],
        correct: 1,
        explanation: 'CIDESCO (Comité International d\'Esthétique et de Cosmétologie) is recognized as the international gold standard for beauty therapy education and certification.'
      },
      {
        question: 'What is essential for maintaining professional competence in beauty therapy?',
        options: [
          'Working long hours',
          'Continuing education, skill maintenance, and staying current with industry advancements',
          'Avoiding new techniques',
          'Only working with familiar clients'
        ],
        correct: 1,
        explanation: 'Professional competence requires continuing education, regular skill practice, staying current with industry advancements, and honest self-assessment of limitations.'
      }
    ]
  }
};

export default quiz;


