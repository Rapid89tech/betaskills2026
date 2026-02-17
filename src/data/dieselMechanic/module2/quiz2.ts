import type { Lesson } from '@/types/course';

export const quiz2: Lesson = {
  id: 4,
  title: '📝 Module 2 Quiz: Diesel Fuel Injection Systems',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What pressure range do modern common rail diesel systems typically operate at?',
        options: [
          '2,000-5,000 psi',
          '5,000-10,000 psi',
          '10,000-15,000 psi',
          '15,000-30,000 psi'
        ],
        correct: 3,
        explanation: 'Modern common rail diesel systems operate at 15,000-30,000 psi to achieve optimal fuel atomization, combustion efficiency, and emissions control.'
      },
      {
        question: 'What temperature does compressed air reach in a diesel engine before fuel injection?',
        options: [
          '300-400°F',
          '500-600°F',
          '700-900°F',
          '1,000-1,200°F'
        ],
        correct: 2,
        explanation: 'Compressed air in a diesel engine reaches 700-900°F, which is sufficient for spontaneous ignition of diesel fuel without a spark plug.'
      },
      {
        question: 'What is the main advantage of mechanical fuel injectors?',
        options: [
          'Lower emissions than electronic systems',
          'Better fuel economy than common rail',
          'Simplicity, durability, and low cost',
          'Precise electronic control'
        ],
        correct: 2,
        explanation: 'Mechanical fuel injectors are valued for their simplicity, durability in harsh conditions, and low cost, making them ideal for older equipment despite higher emissions.'
      },
      {
        question: 'How many injections per cycle can common rail systems perform?',
        options: [
          'One injection only',
          'Two injections maximum',
          'Up to three injections',
          'Up to five injections'
        ],
        correct: 3,
        explanation: 'Common rail systems can perform up to five injections per cycle (pilot, main, post, etc.), optimizing combustion, reducing noise, and lowering emissions.'
      },
      {
        question: 'What component controls injection timing in common rail systems?',
        options: [
          'Mechanical spring tension',
          'Fuel pump pressure',
          'Engine Control Module (ECM)',
          'Crankshaft position only'
        ],
        correct: 2,
        explanation: 'The Engine Control Module (ECM) electronically controls injection timing and volume in common rail systems, adjusting dynamically based on engine conditions.'
      },
      {
        question: 'What is the typical pressure range for mechanical fuel injectors?',
        options: [
          '500-1,000 psi',
          '2,000-5,000 psi',
          '10,000-15,000 psi',
          '20,000-30,000 psi'
        ],
        correct: 1,
        explanation: 'Mechanical fuel injectors operate at 2,000-5,000 psi, which is significantly lower than modern common rail systems but sufficient for older diesel engines.'
      },
      {
        question: 'What is the primary disadvantage of mechanical fuel injectors?',
        options: [
          'Too expensive to maintain',
          'Cannot withstand harsh conditions',
          'Imprecise timing and higher emissions',
          'Require constant electronic monitoring'
        ],
        correct: 2,
        explanation: 'Mechanical injectors have imprecise timing that cannot adjust dynamically, leading to higher emissions (10-20% more NOx and PM) and reduced efficiency compared to electronic systems.'
      },
      {
        question: 'How much better fuel economy do common rail systems achieve compared to mechanical injectors?',
        options: [
          '5% better',
          '10% better',
          '20% better',
          '50% better'
        ],
        correct: 2,
        explanation: 'Common rail systems achieve approximately 20% better fuel economy than mechanical injectors (e.g., 25 MPG vs. 20 MPG) due to precise fuel delivery and optimized combustion.'
      },
      {
        question: 'What happens when fuel injection timing is advanced (before TDC)?',
        options: [
          'Reduces power and emissions',
          'Increases power but raises NOx emissions',
          'Improves fuel economy with no drawbacks',
          'Decreases combustion temperature'
        ],
        correct: 1,
        explanation: 'Advanced timing (injecting before TDC) increases power output by 5-10% but raises NOx emissions by 10-20% due to higher combustion temperatures.'
      },
      {
        question: 'How often should fuel filters be changed in modern diesel systems?',
        options: [
          'Every 5,000 miles',
          'Every 15,000 miles',
          'Every 30,000 miles',
          'Every 50,000 miles'
        ],
        correct: 1,
        explanation: 'Fuel filters should be changed every 15,000 miles in modern diesel systems to prevent injector fouling and maintain optimal fuel delivery and system longevity.'
      }
    ]
  }
};
