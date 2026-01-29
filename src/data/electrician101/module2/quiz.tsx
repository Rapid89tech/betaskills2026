import type { Lesson } from '@/types/course';

export const module2Quiz: Lesson = {
  id: 6,
  title: 'Module 2 Quiz',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What does PPE stand for?',
        options: [
          'Power Panel Equipment',
          'Personal Protective Equipment',
          'Portable Power Equipment',
          'Professional Practice Experience'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'What is the maximum temperature of an arc flash?',
        options: [
          '1,000°F',
          '10,000°F',
          '35,000°F',
          '50,000°F'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What does LOTO stand for?',
        options: [
          'Lock Out, Tag Out',
          'Live Output, Test Output',
          'Load On, Turn Off',
          'Line Out, Terminal Open'
        ],
        correctAnswer: 0
      },
      {
        id: 4,
        question: 'Which OSHA standard covers lockout/tagout procedures?',
        options: [
          '29 CFR 1910.132',
          '29 CFR 1910.147',
          '29 CFR 1910.269',
          '29 CFR 1910.333'
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: 'What is the minimum arc rating for Category 2 PPE?',
        options: [
          '4 cal/cm²',
          '8 cal/cm²',
          '25 cal/cm²',
          '40 cal/cm²'
        ],
        correctAnswer: 1
      },
      {
        id: 6,
        question: 'Class E hard hats protect against voltages up to:',
        options: [
          '1,000 volts',
          '2,200 volts',
          '20,000 volts',
          '50,000 volts'
        ],
        correctAnswer: 2
      },
      {
        id: 7,
        question: 'What should you do FIRST before working on electrical equipment?',
        options: [
          'Put on gloves',
          'Call supervisor',
          'De-energize and lockout',
          'Read the manual'
        ],
        correctAnswer: 2
      },
      {
        id: 8,
        question: 'What is the arc flash boundary?',
        options: [
          'Distance where arc can occur',
          'Distance at which incident energy equals 1.2 cal/cm²',
          'Maximum reach of electrician',
          'Distance to nearest exit'
        ],
        correctAnswer: 1
      },
      {
        id: 9,
        question: 'Can you remove another worker\'s lockout device?',
        options: [
          'Yes, if they forgot',
          'Yes, with supervisor approval',
          'No, never',
          'Yes, in emergencies'
        ],
        correctAnswer: 2
      },
      {
        id: 10,
        question: 'What standard governs electrical safety in the workplace?',
        options: [
          'NEC 2020',
          'NFPA 70E',
          'OSHA 1910',
          'ANSI Z87.1'
        ],
        correctAnswer: 1
      }
    ]
  }
};

