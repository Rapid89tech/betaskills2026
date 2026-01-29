import type { Lesson } from '@/types/course';

export const module1Quiz: Lesson = {
  id: 6,
  title: 'Module 1 Quiz',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary role of an electrician?',
        options: [
          'Only install new wiring',
          'Installation, maintenance, and repair of electrical power systems',
          'Manage construction projects',
          'Design electrical grids'
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: 'Which type of electrician works primarily in homes and apartments?',
        options: [
          'Industrial Electrician',
          'Commercial Electrician',
          'Residential Electrician',
          'Construction Electrician'
        ],
        correctAnswer: 2
      },
      {
        id: 3,
        question: 'What does NEC stand for?',
        options: [
          'National Energy Code',
          'National Electrical Code',
          'New Electrical Circuit',
          'National Engineering Council'
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: 'What tool is used to measure voltage, current, and resistance?',
        options: [
          'Screwdriver',
          'Wire stripper',
          'Multimeter',
          'Conduit bender'
        ],
        correctAnswer: 2
      },
      {
        id: 5,
        question: 'How long does a typical electrician apprenticeship last?',
        options: [
          '1-2 years',
          '2-3 years',
          '4-5 years',
          '6-7 years'
        ],
        correctAnswer: 2
      },
      {
        id: 6,
        question: 'What is PPE in electrical work?',
        options: [
          'Power Panel Equipment',
          'Personal Protective Equipment',
          'Portable Power Equipment',
          'Professional Practice Experience'
        ],
        correctAnswer: 1
      },
      {
        id: 7,
        question: 'Which type of electrician works with PLCs and SCADA systems?',
        options: [
          'Residential Electrician',
          'Commercial Electrician',
          'Industrial Electrician',
          'Maintenance Electrician'
        ],
        correctAnswer: 2
      },
      {
        id: 8,
        question: 'What is the highest level of electrician certification?',
        options: [
          'Apprentice',
          'Journeyman',
          'Master Electrician',
          'Senior Electrician'
        ],
        correctAnswer: 2
      },
      {
        id: 9,
        question: 'What safety organization sets guidelines for electricians in the workplace?',
        options: [
          'OSHA',
          'NASA',
          'FDA',
          'EPA'
        ],
        correctAnswer: 0
      },
      {
        id: 10,
        question: 'Which tool is used to pull wires through conduits?',
        options: [
          'Hammer',
          'Fish tape',
          'Wrench',
          'Level'
        ],
        correctAnswer: 1
      }
    ]
  }
};

