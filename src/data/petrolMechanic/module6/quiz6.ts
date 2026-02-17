import type { Lesson } from '@/types/course';

export const quiz6: Lesson = {
  id: 4,
  title: '📝 Module 6 Quiz: Ensuring Fuel System Health',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of a fuel filter?',
        options: [
          'To increase fuel pressure in the fuel pump',
          'To remove dirt, debris, and rust particles from the fuel',
          'To control the timing of fuel injectors',
          'To boost the octane level of the fuel'
        ],
        correct: 1,
        explanation: 'The fuel filter removes contaminants like dirt, rust, and debris from fuel before it reaches the engine, protecting fuel injectors and ensuring clean fuel delivery for optimal combustion.'
      },
      {
        question: 'Which symptom indicates a clogged fuel filter?',
        options: [
          'Increased engine power at high speeds',
          'Difficulty starting the engine or reduced fuel efficiency',
          'Smooth acceleration and idle',
          'Higher oil pressure readings'
        ],
        correct: 1,
        explanation: 'A clogged fuel filter restricts fuel flow, causing difficulty starting, reduced fuel efficiency (10-15% drop), hesitation during acceleration, and loss of power at high speeds.'
      },
      {
        question: 'What is the first step before replacing a fuel filter?',
        options: [
          'Disconnect the spark plugs',
          'Drain all of the engine oil',
          'Relieve the pressure in the fuel system',
          'Remove the radiator cap'
        ],
        correct: 2,
        explanation: 'Before replacing a fuel filter, you must relieve fuel system pressure by removing the fuel pump fuse and running the engine until it stalls, preventing dangerous fuel sprays.'
      },
      {
        question: 'How often should a fuel filter typically be replaced in a petrol engine?',
        options: [
          'Every 1,000 kilometres',
          'Every 30,000–50,000 kilometres or as recommended by the vehicle\'s manual',
          'Every 100,000 kilometres',
          'Only when the engine stops running'
        ],
        correct: 1,
        explanation: 'Fuel filters should be replaced every 30,000–50,000 kilometres or according to manufacturer guidelines to maintain optimal fuel flow and prevent engine issues.'
      },
      {
        question: 'What is a common cause of fuel line leaks?',
        options: [
          'Using high-quality fuel',
          'Age, wear, or damage from road debris',
          'Regular maintenance of the fuel filter',
          'Properly tightened fittings and connectors'
        ],
        correct: 1,
        explanation: 'Fuel line leaks commonly result from age, wear, corrosion, physical damage from road debris, deteriorated rubber hoses, or loose fittings over time.'
      },
      {
        question: 'How can you safely identify a fuel line leak?',
        options: [
          'By removing the fuel pump and examining it',
          'By looking for wet spots, stains, or strong gasoline odour',
          'By checking the oil dipstick for discoloration',
          'By examining the radiator for coolant levels'
        ],
        correct: 1,
        explanation: 'Fuel line leaks are identified through visual inspection for wet spots, stains, or drips along fuel lines, and by detecting strong gasoline odours, which are key indicators of leaks.'
      },
      {
        question: 'What is the purpose of a fuel system cleaner?',
        options: [
          'To increase the viscosity of the fuel',
          'To remove carbon deposits and varnish from injectors and combustion chambers',
          'To lower the octane rating of the fuel',
          'To lubricate the timing chain'
        ],
        correct: 1,
        explanation: 'Fuel system cleaners dissolve carbon deposits, varnish, and gum in fuel injectors, intake valves, and combustion chambers, restoring efficient fuel delivery and combustion.'
      },
      {
        question: 'When is a good time to use a fuel system cleaner?',
        options: [
          'Every time you change your oil',
          'Every 5,000–10,000 kilometres or after vehicle storage',
          'Only after a breakdown occurs',
          'Never, as fuel system cleaners are not needed'
        ],
        correct: 1,
        explanation: 'Fuel system cleaners should be used every 5,000–10,000 kilometres, before emissions tests, long trips, or after vehicle storage to maintain optimal fuel system performance.'
      },
      {
        question: 'What tool helps diagnose fuel system issues by detecting pressure drops?',
        options: [
          'OBD2 scanner',
          'Fuel pressure gauge',
          'Belt tension gauge',
          'Spark plug socket'
        ],
        correct: 1,
        explanation: 'A fuel pressure gauge measures fuel system pressure (typically 3–4 bar for petrol engines) and detects pressure drops that indicate leaks, clogged filters, or pump issues.'
      },
      {
        question: 'What is a risk of neglecting a fuel line leak?',
        options: [
          'Improved fuel efficiency',
          'Fire hazard or engine damage due to fuel loss',
          'Cleaner exhaust emissions',
          'Increased throttle response'
        ],
        correct: 1,
        explanation: 'Neglecting fuel line leaks poses serious fire hazards, especially near hot exhausts, and causes fuel loss, reduced pressure, and potential engine damage costing thousands in repairs.'
      },
      {
        question: 'Which fuel system cleaner type is best for preventing ethanol-related corrosion?',
        options: [
          'Octane booster',
          'Fuel stabilizer',
          'Injector cleaner',
          'Complete system cleaner'
        ],
        correct: 1,
        explanation: 'Fuel stabilizers (e.g., STA-BIL) prevent ethanol-related corrosion and gumming, especially important in South Africa where ethanol blends can degrade fuel systems faster.'
      },
      {
        question: 'Why is it important to use fuel-rated materials for fuel line repairs?',
        options: [
          'To reduce fuel pressure',
          'To ensure durability and prevent leaks under high pressure',
          'To improve combustion efficiency',
          'To lower emissions'
        ],
        correct: 1,
        explanation: 'Fuel-rated materials (e.g., SAE J30R9 hoses) are designed to withstand fuel system pressures and resist degradation from fuel and heat, preventing dangerous leaks and fires.'
      }
    ]
  }
};
