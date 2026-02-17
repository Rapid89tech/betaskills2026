import type { Lesson } from '@/types/course';

export const quiz8: Lesson = {
  id: 4,
  title: '📝 Module 8 Quiz: Testing and Diagnostic Tools',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What does a compression tester measure?',
        options: [
          'Fuel injector flow rate',
          'Intake manifold pressure',
          'Cylinder pressure during the compression stroke',
          'Spark plug voltage'
        ],
        correct: 2,
        explanation: 'A compression tester measures cylinder pressure during the compression stroke, assessing the mechanical health of pistons, rings, valves, and head gaskets.'
      },
      {
        question: 'What should you do before cranking the engine during a compression test?',
        options: [
          'Remove all spark plugs and disable the ignition system',
          'Add extra oil to each cylinder',
          'Disconnect the exhaust system',
          'Adjust the valve clearance'
        ],
        correct: 0,
        explanation: 'Before cranking, remove all spark plugs to reduce resistance and disable the ignition system to prevent starting and ensure safety during the test.'
      },
      {
        question: 'What does a consistent low compression reading in one cylinder often indicate?',
        options: [
          'Faulty ignition coil',
          'Worn piston ring or damaged valve',
          'Overfilled fuel tank',
          'Clogged air filter'
        ],
        correct: 1,
        explanation: 'A single low cylinder reading typically indicates a localized issue like worn piston rings, a damaged valve, or a head gasket leak in that specific cylinder.'
      },
      {
        question: 'What is the main purpose of an OBD-II scanner?',
        options: [
          'To measure fuel economy',
          'To retrieve and interpret diagnostic trouble codes',
          'To perform compression testing',
          'To clean fuel injectors'
        ],
        correct: 1,
        explanation: 'OBD-II scanners retrieve and interpret diagnostic trouble codes (DTCs), view live data, and check readiness monitors for emissions compliance and engine diagnostics.'
      },
      {
        question: 'Which code indicates a cylinder misfire?',
        options: [
          'P0420',
          'P0300',
          'P0171',
          'P0455'
        ],
        correct: 1,
        explanation: 'P0300 indicates a random misfire, while P030X codes (P0301-P0308) indicate specific cylinder misfires (e.g., P0301 for cylinder 1).'
      },
      {
        question: 'What is a vacuum gauge used to measure?',
        options: [
          'Oil pressure in the crankcase',
          'Air pressure in the intake manifold',
          'Cylinder compression during a power stroke',
          'Voltage of the ignition coil'
        ],
        correct: 1,
        explanation: 'A vacuum gauge measures intake manifold pressure (vacuum), diagnosing engine breathing issues like vacuum leaks, valve problems, or exhaust restrictions.'
      },
      {
        question: 'What does a fluctuating vacuum gauge needle at idle suggest?',
        options: [
          'Failing oxygen sensor',
          'Vacuum leak or sticking valve',
          'Clogged fuel injector',
          'Low battery voltage'
        ],
        correct: 1,
        explanation: 'Rapid vacuum gauge fluctuations (3–5 kPa swings) at idle indicate vacuum leaks or sticking valves, which disrupt normal intake manifold pressure.'
      },
      {
        question: 'What is the primary purpose of a fuel pressure tester?',
        options: [
          'To check the compression ratio of the engine',
          'To measure fuel delivered by injectors',
          'To ensure the fuel pump and pressure regulator function correctly',
          'To clean fuel lines'
        ],
        correct: 2,
        explanation: 'A fuel pressure tester verifies that the fuel pump and pressure regulator deliver consistent pressure (3–4 bar for petrol engines) to ensure proper fuel delivery.'
      },
      {
        question: 'What does a rapid pressure drop after engine shutdown in a fuel pressure test indicate?',
        options: [
          'Healthy fuel system',
          'Leaking injector or faulty check valve',
          'Clogged air filter',
          'Worn piston rings'
        ],
        correct: 1,
        explanation: 'A rapid pressure drop after shutdown indicates leaking injectors or a failed check valve, allowing fuel to drain back and causing hard starting.'
      },
      {
        question: 'What should compression readings across cylinders typically be within?',
        options: [
          '25–30% of each other',
          '10–15% of each other',
          '50% of each other',
          'Exactly the same'
        ],
        correct: 1,
        explanation: 'Healthy cylinders show compression readings within 10–15% of each other. Greater variance indicates issues like worn rings, damaged valves, or gasket leaks.'
      },
      {
        question: 'What OBD-II data helps diagnose intermittent faults?',
        options: [
          'Readiness monitors',
          'Freeze-frame data',
          'Fuel pressure readings',
          'Compression test results'
        ],
        correct: 1,
        explanation: 'Freeze-frame data captures engine conditions (RPM, throttle position, etc.) when a code was set, helping diagnose intermittent faults like misfires during acceleration.'
      },
      {
        question: 'What does a low, steady vacuum reading suggest?',
        options: [
          'Healthy engine',
          'Late ignition timing or intake leak',
          'Clogged fuel filter',
          'Normal throttle response'
        ],
        correct: 1,
        explanation: 'A low, steady vacuum reading (below 57 kPa) suggests late ignition timing or intake leaks, both of which reduce manifold vacuum and affect engine performance.'
      }
    ]
  }
};
