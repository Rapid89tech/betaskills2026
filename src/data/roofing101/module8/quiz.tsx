import type { Quiz } from '@/types/course';

export const module8Quiz: Quiz = {
  id: 8,
  title: 'Module 8 Quiz: Roofing Safety and Regulations',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the most effective fall protection control per OSHA\'s Hierarchy of Controls?',
        options: [
          'Personal Protective Equipment',
          'Elimination',
          'Administrative Controls',
          'Guardrail Systems'
        ],
        correct: 1,
        explanation: 'Eliminating the need to work at heights removes fall risks entirely.'
      },
      {
        question: 'What is the minimum anchor point strength for a personal fall arrest system?',
        options: [
          '2,000 lbs',
          '3,000 lbs',
          '5,000 lbs',
          '7,000 lbs'
        ],
        correct: 2,
        explanation: 'OSHA 1926.502 requires anchors to support 5,000 lbs per worker.'
      },
      {
        question: 'Which OSHA standard covers scaffolding requirements?',
        options: [
          '29 CFR 1926 Subpart X',
          '29 CFR 1926 Subpart L',
          '29 CFR 1926 Subpart M',
          '29 CFR 1910 Subpart D'
        ],
        correct: 1,
        explanation: 'Subpart L governs scaffold safety and load requirements.'
      },
      {
        question: 'At what wind speed should roofing work generally stop for safety?',
        options: [
          '10 mph',
          '18 mph',
          '24 mph',
          '30 mph'
        ],
        correct: 2,
        explanation: 'Winds >24 mph increase fall risks and material displacement.'
      },
      {
        question: 'Metal ladders should not be used near electrical sources.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'Metal conducts electricity, posing electrocution risks near power lines.'
      },
      {
        question: 'Scaffolds must support at least 3 times the intended load.',
        options: [
          'True',
          'False'
        ],
        correct: 1,
        explanation: 'OSHA 1926.451 requires scaffolds to support 4x the intended load.'
      },
      {
        question: 'Name two components of a personal fall arrest system.',
        options: [
          'Full-body harness and shock-absorbing lanyard',
          'Guardrail and toe board',
          'Ladder and scaffold',
          'Hard hat and safety glasses'
        ],
        correct: 0,
        explanation: 'A personal fall arrest system consists of a full-body harness and shock-absorbing lanyard as key components.'
      },
      {
        question: 'What is one precaution for working in rainy conditions on a roof?',
        options: [
          'Work faster to finish quickly',
          'Use slip-resistant boots and cover materials with waterproof tarps',
          'Ignore the weather conditions',
          'Use metal tools for better grip'
        ],
        correct: 1,
        explanation: 'Use slip-resistant boots and cover materials with waterproof tarps to prevent falls and material damage.'
      },
      {
        question: 'Why is a 4:1 angle important for ladder setup?',
        options: [
          'It looks more professional',
          'It ensures stability, reducing fall risk by maintaining proper balance',
          'It saves space',
          'It allows for faster climbing'
        ],
        correct: 1,
        explanation: 'A 4:1 angle ensures stability, reducing fall risk by maintaining proper balance between the ladder and support surface.'
      },
      {
        question: 'What is one requirement for OSHA-compliant guardrails on scaffolds?',
        options: [
          'Top rail must be 42 ± 3 inches high and withstand 200 lbs of force',
          'Top rail must be 36 inches high',
          'Only mid-rail is required',
          'Height doesn\'t matter as long as it\'s visible'
        ],
        correct: 0,
        explanation: 'Top rail must be 42 ± 3 inches high and withstand 200 lbs of force per OSHA requirements.'
      }
    ]
  }
};
