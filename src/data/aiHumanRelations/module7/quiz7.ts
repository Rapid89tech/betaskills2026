import type { Lesson } from '@/types/course';

export const quiz7: Lesson = {
  id: 2,
  title: '📝 Quiz: Designing Human-Centered AI',
  duration: '25 min',
  type: 'quiz',
  content: {
    questions: [
      {
        id: 1,
        question: 'Why is UX/UI design critical for AI applications?',
        options: [
          'To reduce AI processing speed',
          'To ensure usability, trust, and adoption',
          'To eliminate AI functionality',
          'To simplify AI algorithms'
        ],
        correctAnswer: 1,
        explanation: 'UX/UI design is critical for ensuring usability, fostering trust, and promoting widespread adoption of AI applications.'
      },
      {
        id: 2,
        question: 'What makes AI UX/UI design more challenging than traditional software design?',
        options: [
          'AI\'s static behavior',
          'AI\'s complex, dynamic, and probabilistic outputs',
          'Lack of user interaction',
          'Absence of data inputs'
        ],
        correctAnswer: 1,
        explanation: 'AI\'s complex, dynamic, and probabilistic outputs make UX/UI design more challenging than traditional software.'
      },
      {
        id: 3,
        question: 'Which principle ensures users understand how AI makes decisions?',
        options: [
          'Feedback',
          'Transparency',
          'Consistency',
          'Control'
        ],
        correctAnswer: 1,
        explanation: 'Transparency ensures users understand how AI makes decisions, such as why a recommendation was made.'
      },
      {
        id: 4,
        question: 'How does explainable AI (XAI) contribute to UX/UI design?',
        options: [
          'By hiding AI processes',
          'By providing clear insights into AI outputs',
          'By reducing user control',
          'By increasing AI errors'
        ],
        correctAnswer: 1,
        explanation: 'XAI provides clear insights into AI outputs, helping users understand decisions and fostering trust.'
      },
      {
        id: 5,
        question: 'What is a key feature of conversational interfaces in AI UX/UI?',
        options: [
          'Fixed, non-interactive responses',
          'Natural, clear dialogue design',
          'Elimination of user feedback',
          'Static content delivery'
        ],
        correctAnswer: 1,
        explanation: 'Conversational interfaces require natural, clear dialogue design that mimics human communication.'
      },
      {
        id: 6,
        question: 'How can interfaces handle AI uncertainty effectively?',
        options: [
          'By ignoring confidence scores',
          'By communicating probabilities clearly',
          'By hiding AI outputs',
          'By removing user control'
        ],
        correctAnswer: 1,
        explanation: 'Interfaces should communicate probabilities and confidence scores clearly to help users understand AI uncertainty.'
      },
      {
        id: 7,
        question: 'What is a challenge in AI UX/UI related to error management?',
        options: [
          'Preventing any AI mistakes',
          'Designing graceful handling of AI errors',
          'Eliminating user feedback',
          'Ignoring AI limitations'
        ],
        correctAnswer: 1,
        explanation: 'Designing graceful handling of AI errors, such as fallback responses or human escalation, is a key challenge.'
      },
      {
        id: 8,
        question: 'Which tool helps designers test AI UX before full implementation?',
        options: [
          'User testing',
          'Prototyping AI behavior',
          'Feedback loops',
          'Explainability visualizations'
        ],
        correctAnswer: 1,
        explanation: 'Prototyping AI behavior allows designers to test responses and interactions before full implementation.'
      },
      {
        id: 9,
        question: 'What is an example of an AI application with effective UX/UI design?',
        options: [
          'A chatbot without human escalation options',
          'Google\'s Smart Compose with suggestions and undo options',
          'A recommendation system with no user feedback',
          'An autonomous vehicle with no user interface'
        ],
        correctAnswer: 1,
        explanation: 'Google\'s Smart Compose demonstrates effective UX/UI with clear suggestions and undo options, balancing automation with control.'
      },
      {
        id: 10,
        question: 'Why is avoiding deceptive design an ethical consideration in AI UX/UI?',
        options: [
          'To hide AI involvement',
          'To ensure users know they\'re interacting with AI',
          'To reduce interface clarity',
          'To limit user autonomy'
        ],
        correctAnswer: 1,
        explanation: 'Avoiding deceptive design ensures users know they\'re interacting with AI, fostering trust and transparency.'
      },
      {
        id: 11,
        question: 'How do adaptive interfaces enhance AI UX/UI?',
        options: [
          'By maintaining static designs',
          'By adjusting based on user behavior or context',
          'By removing user control',
          'By ignoring user preferences'
        ],
        correctAnswer: 1,
        explanation: 'Adaptive interfaces enhance UX/UI by adjusting dynamically based on user behavior or context.'
      },
      {
        id: 12,
        question: 'What is a benefit of providing feedback in AI UX/UI?',
        options: [
          'Increasing AI errors',
          'Delivering timely updates on AI status or errors',
          'Reducing transparency',
          'Limiting user interaction'
        ],
        correctAnswer: 1,
        explanation: 'Providing feedback delivers timely updates on AI status or errors, helping users understand system behavior.'
      },
      {
        id: 13,
        question: 'How does designing for inclusivity improve AI UX/UI?',
        options: [
          'By excluding diverse users',
          'By considering diverse backgrounds and abilities',
          'By standardizing interfaces for all users',
          'By reducing accessibility features'
        ],
        correctAnswer: 1,
        explanation: 'Designing for inclusivity considers diverse backgrounds and abilities, ensuring accessibility for all users.'
      },
      {
        id: 14,
        question: 'What is a future direction for AI UX/UI design?',
        options: [
          'Reducing explainability techniques',
          'Integrating emotional AI for responsive designs',
          'Eliminating user feedback',
          'Ignoring ethical considerations'
        ],
        correctAnswer: 1,
        explanation: 'Integrating emotional AI for responsive designs is a future direction, creating interfaces that adapt to user affect.'
      },
      {
        id: 15,
        question: 'Why is cross-disciplinary collaboration important in AI UX/UI design?',
        options: [
          'To limit designer input',
          'To ensure holistic designs balancing innovation and ethics',
          'To reduce user-centric approaches',
          'To simplify AI complexity'
        ],
        correctAnswer: 1,
        explanation: 'Cross-disciplinary collaboration ensures holistic designs that balance innovation with ethical considerations.'
      }
    ]
  }
};
