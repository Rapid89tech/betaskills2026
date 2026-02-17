import type { Lesson } from '@/types/course';

export const quiz1: Lesson = {
  id: 4,
  title: '📝 Module 1 Quiz: Introduction to Diesel Engines',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is drawn into the cylinder during the intake stroke of a diesel engine?',
        options: [
          'Air-fuel mixture',
          'Only air',
          'Only fuel',
          'Exhaust gases'
        ],
        correct: 1,
        explanation: 'Unlike gasoline engines, diesel engines draw only air (not a fuel-air mixture) during the intake stroke. Fuel is injected later during the compression stroke.'
      },
      {
        question: 'What is the typical compression ratio range for a diesel engine?',
        options: [
          '8:1 to 12:1',
          '10:1 to 14:1',
          '14:1 to 22:1',
          '22:1 to 30:1'
        ],
        correct: 2,
        explanation: 'Diesel engines have compression ratios between 14:1 and 22:1, which is higher than gasoline engines (8:1 to 12:1). This high compression generates the heat needed for spontaneous fuel ignition.'
      },
      {
        question: 'During which stroke does fuel injection occur in a diesel engine?',
        options: [
          'Intake stroke',
          'Compression stroke (near TDC)',
          'Exhaust stroke',
          'Before the intake stroke'
        ],
        correct: 1,
        explanation: 'Fuel is injected near the end of the compression stroke (near top dead center) when the air is hot enough (700-900°F) to cause spontaneous ignition of the diesel fuel.'
      },
      {
        question: 'What is the primary advantage of a turbocharger in a diesel engine?',
        options: [
          'Reduces fuel consumption by 50%',
          'Increases air density, boosting power output by 30-50%',
          'Eliminates the need for an air filter',
          'Reduces compression ratio requirements'
        ],
        correct: 1,
        explanation: 'Turbochargers increase air density by compressing intake air, allowing more fuel to be burned and boosting power output by 30-50% compared to naturally aspirated engines.'
      },
      {
        question: 'How many strokes does it take for a 2-stroke diesel engine to complete one power cycle?',
        options: [
          'One stroke',
          'Two strokes',
          'Three strokes',
          'Four strokes'
        ],
        correct: 1,
        explanation: 'A 2-stroke diesel engine completes a full power cycle in two strokes (one crankshaft revolution), compared to four strokes (two crankshaft revolutions) in a 4-stroke engine.'
      },
      {
        question: 'What is scavenging in a 2-stroke diesel engine?',
        options: [
          'The process of cleaning fuel injectors',
          'The process where fresh air pushes out exhaust gases',
          'The removal of carbon deposits from cylinders',
          'The compression of air before combustion'
        ],
        correct: 1,
        explanation: 'Scavenging is the process where pressurized fresh air enters through intake ports and pushes exhaust gases out through exhaust ports, combining intake and exhaust in one motion.'
      },
      {
        question: 'What emission control system uses DEF (Diesel Exhaust Fluid) to reduce NOx emissions?',
        options: [
          'DPF (Diesel Particulate Filter)',
          'EGR (Exhaust Gas Recirculation)',
          'SCR (Selective Catalytic Reduction)',
          'VVT (Variable Valve Timing)'
        ],
        correct: 2,
        explanation: 'SCR (Selective Catalytic Reduction) systems use DEF to neutralize NOx emissions, helping diesel engines meet stringent 2025 EPA and IMO emission standards.'
      },
      {
        question: 'Which type of diesel engine is more fuel-efficient?',
        options: [
          '2-stroke diesel engines',
          '4-stroke diesel engines',
          'Both are equally efficient',
          'Neither, gasoline engines are more efficient'
        ],
        correct: 1,
        explanation: '4-stroke diesel engines are more fuel-efficient due to precise combustion control and distinct phases. They offer 20-30% better fuel economy than gasoline engines and are more efficient than 2-stroke diesels.'
      },
      {
        question: 'What is the typical pressure reached during the compression stroke of a 4-stroke diesel engine?',
        options: [
          '100-200 psi',
          '300-400 psi',
          '500-600 psi',
          '800-1000 psi'
        ],
        correct: 2,
        explanation: 'During the compression stroke, a 4-stroke diesel engine compresses air to 500-600 psi, heating it to 700-900°F, which is sufficient for spontaneous diesel fuel ignition.'
      },
      {
        question: 'Which application is most suitable for 2-stroke diesel engines?',
        options: [
          'Passenger cars and light trucks',
          'Small generators and lawn equipment',
          'Large marine vessels and industrial power generation',
          'Motorcycles and scooters'
        ],
        correct: 2,
        explanation: '2-stroke diesel engines are ideal for large marine vessels, industrial power generation, and heavy machinery due to their high power-to-weight ratio and compact design, despite higher fuel consumption and maintenance needs.'
      }
    ]
  }
};
