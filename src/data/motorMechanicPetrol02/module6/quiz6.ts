import { QuizLesson } from '@/types/course';

const quiz6: QuizLesson = {
  id: 4,
  title: 'Quiz: Ensuring Fuel System Health',
  type: 'quiz',
  duration: '15 minutes',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary function of a fuel filter?',
        options: [
          'To increase fuel pressure in the fuel pump',
          'To remove dirt, debris, and rust particles from the fuel',
          'To control the timing of fuel injectors',
          'To boost the octane level of the fuel'
        ],
        correctAnswer: 1,
        explanation: 'The fuel filter is a critical component that removes dirt, rust, and debris from fuel before it reaches the engine, ensuring clean fuel delivery for optimal combustion.'
      },
      {
        id: 2,
        question: 'Which symptom indicates a clogged fuel filter?',
        options: [
          'Increased engine power at high speeds',
          'Difficulty starting the engine or reduced fuel efficiency',
          'Smooth acceleration and idle',
          'Higher oil pressure readings'
        ],
        correctAnswer: 1,
        explanation: 'A clogged fuel filter manifests through symptoms like difficulty starting, reduced fuel efficiency (10–15% mileage drop), hesitation or stalling during acceleration, and loss of power at high speeds.'
      },
      {
        id: 3,
        question: 'What is the first step before replacing a fuel filter?',
        options: [
          'Disconnect the spark plugs',
          'Drain all of the engine oil',
          'Relieve the pressure in the fuel system',
          'Remove the radiator cap'
        ],
        correctAnswer: 2,
        explanation: 'The process involves relieving system pressure by removing the fuel pump fuse and running the engine until it stalls before replacing the filter.'
      },
      {
        id: 4,
        question: 'How often should a fuel filter typically be replaced in a petrol engine?',
        options: [
          'Every 1,000 kilometres',
          'Every 30,000–50,000 kilometres or as recommended by the vehicle\'s manual',
          'Every 100,000 kilometres',
          'Only when the engine stops running'
        ],
        correctAnswer: 1,
        explanation: 'Fuel filters should be replaced every 30,000–50,000 kilometres for petrol engines, or sooner if symptoms like stalling or misfires occur.'
      },
      {
        id: 5,
        question: 'What is a common cause of fuel line leaks?',
        options: [
          'Using high-quality fuel',
          'Age, wear, or damage from road debris',
          'Regular maintenance of the fuel filter',
          'Properly tightened fittings and connectors'
        ],
        correctAnswer: 1,
        explanation: 'Fuel line leaks result from corrosion, physical damage (e.g., road debris punctures), loose fittings, deteriorated rubber hoses, excessive pressure, or improper repairs.'
      },
      {
        id: 6,
        question: 'How can you safely identify a fuel line leak?',
        options: [
          'By removing the fuel pump and examining it',
          'By looking for wet spots, stains, or strong gasoline odour',
          'By checking the oil dipstick for discoloration',
          'By examining the radiator for coolant levels'
        ],
        correctAnswer: 1,
        explanation: 'Identifying fuel line leaks involves visual inspections for wet spots, stains, or drips along lines, and detecting strong gasoline odours, a key indicator of leaks.'
      },
      {
        id: 7,
        question: 'What is the purpose of a fuel system cleaner?',
        options: [
          'To increase the viscosity of the fuel',
          'To remove carbon deposits and varnish from injectors and combustion chambers',
          'To lower the octane rating of the fuel',
          'To lubricate the timing chain'
        ],
        correctAnswer: 1,
        explanation: 'Fuel system cleaners are chemical additives that dissolve carbon deposits, varnish, and gum in fuel injectors, intake valves, and combustion chambers, restoring efficient fuel delivery and combustion.'
      },
      {
        id: 8,
        question: 'When is a good time to use a fuel system cleaner?',
        options: [
          'Every time you change your oil',
          'Every 5,000–10,000 kilometres or after vehicle storage',
          'Only after a breakdown occurs',
          'Never, as fuel system cleaners are not needed'
        ],
        correctAnswer: 1,
        explanation: 'Fuel system cleaners should be used every 5,000–10,000 kilometres or before emissions tests, long trips, or after vehicle storage.'
      },
      {
        id: 9,
        question: 'What tool helps diagnose fuel system issues by detecting pressure drops?',
        options: [
          'OBD2 scanner',
          'Fuel pressure gauge',
          'Belt tension gauge',
          'Spark plug socket'
        ],
        correctAnswer: 1,
        explanation: 'Fuel pressure gauges are essential for fuel system health, verifying 3–4 bar pressure and detecting pressure drops that indicate system issues.'
      },
      {
        id: 10,
        question: 'What is a risk of neglecting a fuel line leak?',
        options: [
          'Improved fuel efficiency',
          'Fire hazard or engine damage due to fuel loss',
          'Cleaner exhaust emissions',
          'Increased throttle response'
        ],
        correctAnswer: 1,
        explanation: 'Leaks waste fuel, reduce pressure, and pose fire risks, especially near hot exhausts, potentially causing catastrophic vehicle damage costing R50,000+.'
      },
      {
        id: 11,
        question: 'Which fuel system cleaner type is best for preventing ethanol-related corrosion?',
        options: [
          'Octane booster',
          'Fuel stabilizer',
          'Injector cleaner',
          'Complete system cleaner'
        ],
        correctAnswer: 1,
        explanation: 'Fuel stabilizers (e.g., STA-BIL) are specifically designed to prevent ethanol corrosion and gumming in stored vehicles.'
      },
      {
        id: 12,
        question: 'Why is it important to use fuel-rated materials for fuel line repairs?',
        options: [
          'To reduce fuel pressure',
          'To ensure durability and prevent leaks under high pressure',
          'To improve combustion efficiency',
          'To lower emissions'
        ],
        correctAnswer: 1,
        explanation: 'Repairs must use fuel-rated tubing, as regular plumbing pipe fails under pressure, risking leaks or fires. Fuel-rated materials ensure durability and prevent leaks under high pressure.'
      }
    ]
  }
};

export default quiz6;
