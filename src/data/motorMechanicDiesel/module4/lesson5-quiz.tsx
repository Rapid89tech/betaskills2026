import type { Lesson } from '../../../types/course';

const lesson5Quiz: Lesson = {
  id: 5,
  title: 'Module 4 Quiz: Turbochargers and Air Management',
  duration: '25 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of a turbocharger in a diesel engine?',
        options: [
          'To reduce engine noise',
          'To increase air intake pressure and improve power output',
          'To cool the engine coolant',
          'To filter exhaust gases'
        ],
        correct: 1,
        explanation: 'A turbocharger increases air intake pressure by using exhaust gases to drive a turbine, which compresses incoming air, allowing more fuel to be burned and significantly increasing power output.'
      },
      {
        question: 'Which component of the turbocharger is driven by exhaust gases?',
        options: [
          'Compressor wheel',
          'Intercooler',
          'Turbine wheel',
          'Wastegate'
        ],
        correct: 2,
        explanation: 'The turbine wheel is driven by exhaust gases flowing through the turbine housing. This turbine wheel is connected to the compressor wheel via a shaft, transferring rotational energy.'
      },
      {
        question: 'What is "turbo lag" and what causes it?',
        options: [
          'A delay in turbocharger response due to time needed to build exhaust pressure',
          'A malfunction that causes permanent turbocharger damage',
          'The normal operating sound of a turbocharger',
          'A type of turbocharger bearing failure'
        ],
        correct: 0,
        explanation: 'Turbo lag is the delay between throttle input and turbocharger response, caused by the time needed for exhaust flow to build up enough pressure to spin the turbine wheel and create boost pressure.'
      },
      {
        question: 'What is the function of an intercooler (charge air cooler)?',
        options: [
          'To heat compressed air before it enters the engine',
          'To cool compressed air to increase its density and oxygen content',
          'To filter particles from compressed air',
          'To measure air pressure in the intake system'
        ],
        correct: 1,
        explanation: 'An intercooler cools the compressed air from the turbocharger, making it denser and increasing its oxygen content, which allows for more efficient combustion and increased power.'
      },
      {
        question: 'What are common symptoms of turbocharger failure?',
        options: [
          'Increased fuel efficiency and quieter operation',
          'Blue or white smoke, loss of power, and unusual noises',
          'Improved acceleration and better emissions',
          'Lower operating temperatures'
        ],
        correct: 1,
        explanation: 'Common turbocharger failure symptoms include blue or white smoke (oil burning), significant loss of power, unusual whining or grinding noises, and reduced engine performance.'
      },
      {
        question: 'Why is proper lubrication critical for turbocharger operation?',
        options: [
          'Turbochargers don\'t require lubrication',
          'The turbine spins at extremely high speeds (up to 200,000 RPM) requiring constant oil flow',
          'Oil is only needed when the turbocharger is cold',
          'Lubrication only affects the compressor side'
        ],
        correct: 1,
        explanation: 'Turbochargers spin at extremely high speeds (often 100,000-200,000 RPM), requiring constant oil flow for lubrication and cooling. Oil starvation can cause catastrophic bearing failure within seconds.'
      },
      {
        question: 'What is the purpose of a wastegate in a turbocharged system?',
        options: [
          'To increase boost pressure beyond safe limits',
          'To control and limit maximum boost pressure',
          'To filter exhaust gases before they reach the turbine',
          'To cool the turbocharger housing'
        ],
        correct: 1,
        explanation: 'A wastegate controls boost pressure by allowing some exhaust gases to bypass the turbine wheel when maximum desired boost is reached, preventing overboost and potential engine damage.'
      },
      {
        question: 'How often should air filters be replaced in a turbocharged diesel engine?',
        options: [
          'Only when completely blocked',
          'Every 50,000 miles regardless of condition',
          'According to manufacturer schedule or when dirty/restricted',
          'Air filters never need replacement'
        ],
        correct: 2,
        explanation: 'Air filters should be replaced according to manufacturer recommendations or when they become dirty or restricted. Clean air is critical for turbocharger longevity and performance.'
      },
      {
        question: 'What damage can occur if a turbocharger ingests foreign objects?',
        options: [
          'No damage will occur',
          'Improved turbocharger performance',
          'Compressor or turbine wheel damage, potentially causing catastrophic failure',
          'Only minor scratches that don\'t affect operation'
        ],
        correct: 2,
        explanation: 'Foreign object ingestion can cause severe damage to compressor or turbine wheels, potentially leading to wheel imbalance, bearing failure, and catastrophic turbocharger destruction.'
      },
      {
        question: 'What maintenance practice helps extend turbocharger life?',
        options: [
          'Immediate engine shutdown after high-load operation',
          'Allowing proper cool-down time and maintaining clean oil',
          'Running the engine at maximum RPM constantly',
          'Never changing the engine oil'
        ],
        correct: 1,
        explanation: 'Allowing proper cool-down time after high-load operation and maintaining clean oil are crucial for turbocharger longevity. Immediate shutdown can cause oil coking and bearing damage.'
      }
    ]
  }
};

export default lesson5Quiz;
