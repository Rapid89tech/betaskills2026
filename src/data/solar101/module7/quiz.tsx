import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Safety and Compliance',
  questions: [
    {
      id: 1,
      question: 'What percentage of solar installation incidents are attributed to falls from height?',
      options: ['25%', '40%', '50%', '70%'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'Which PPE item is rated for electrical hazard protection up to 20kV?',
      options: ['Safety Glasses', 'Harness', 'Hard Hat (Class E)', 'Boots'],
      correctAnswer: 2
    },
    {
      id: 3,
      question: 'What is the minimum arc thermal performance value (ATPV) recommended for FR clothing in solar PV tasks?',
      options: ['4 cal/cm²', '6 cal/cm²', '8 cal/cm²', '12 cal/cm²'],
      correctAnswer: 2
    },
    {
      id: 4,
      question: 'Which glove type is best suited for handling 1000V DC systems?',
      options: ['Leather work gloves only', 'ASTM D120 Class 0-2 rubber gloves', 'Mechanic\'s gloves', 'Disposable nitrile gloves'],
      correctAnswer: 1
    },
    {
      id: 5,
      question: 'Which standard mandates fall protection on rooftops in construction settings?',
      options: ['NFPA 70E', 'SANS 10142-1', 'OSHA 1926.501', 'NEC 690.12'],
      correctAnswer: 2
    },
    {
      id: 6,
      question: 'What is the required grounding resistance for solar PV systems?',
      options: ['<0.5Ω', '<1Ω', '<5Ω', '<10Ω'],
      correctAnswer: 1
    },
    {
      id: 7,
      question: 'How quickly must DC AFCIs detect arc faults?',
      options: ['Within 1 second', 'Within 2 seconds', 'Within 5 seconds', 'Within 10 seconds'],
      correctAnswer: 1
    },
    {
      id: 8,
      question: 'What is the timeline reduction benefit of federal permitting reforms in 2025?',
      options: ['1-3 months', '3-6 months', '6-12 months', '12-24 months'],
      correctAnswer: 2
    },
    {
      id: 9,
      question: 'Which IEC standard covers crystalline silicon module design qualification?',
      options: ['IEC 60617', 'IEC 61215:2021', 'IEC 62109', 'IEC 61850'],
      correctAnswer: 1
    },
    {
      id: 10,
      question: 'What percentage of material recovery is achievable through solar panel recycling?',
      options: ['50%', '70%', '80%', '90%'],
      correctAnswer: 3
    }
  ]
};

export default quiz;

