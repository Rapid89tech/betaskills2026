import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 8,
  title: 'Module 8 Quiz: Advanced Facial Treatments',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary benefit of red LED light therapy?',
        options: [
          'Acne treatment',
          'Anti-aging and collagen production',
          'Healing only',
          'Circulation only'
        ],
        correct: 1,
        explanation: 'Red LED light therapy (630-700nm) primarily benefits anti-aging by stimulating collagen production and improving skin texture.'
      },
      {
        question: 'What type of chemical peel has minimal downtime?',
        options: [
          'Deep peel',
          'Medium peel',
          'Superficial peel',
          'All peels have the same downtime'
        ],
        correct: 2,
        explanation: 'Superficial peels only affect the epidermis and have minimal downtime, making them suitable for regular treatments.'
      },
      {
        question: 'What is microdermabrasion?',
        options: [
          'Chemical exfoliation',
          'Mechanical exfoliation using crystals or diamond tips',
          'Light therapy',
          'Massage technique'
        ],
        correct: 1,
        explanation: 'Microdermabrasion is a mechanical exfoliation treatment that uses crystals or diamond-coated tips with vacuum suction to remove dead skin cells.'
      },
      {
        question: 'What is essential for LED light therapy safety?',
        options: [
          'No safety measures needed',
          'Eye protection for client and therapist',
          'Only client eye protection',
          'Only therapist eye protection'
        ],
        correct: 1,
        explanation: 'Eye protection is essential for both client and therapist during LED light therapy to protect eyes from light exposure.'
      },
      {
        question: 'What acid type is best for acne-prone skin?',
        options: [
          'Glycolic acid (AHA)',
          'Salicylic acid (BHA)',
          'Lactic acid (AHA)',
          'All acids work the same'
        ],
        correct: 1,
        explanation: 'Salicylic acid (BHA) is oil-soluble and penetrates pores effectively, making it ideal for acne-prone skin treatment.'
      }
    ]
  }
};

export default quiz;

