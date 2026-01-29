import { QuizLesson } from '@/types/course';

const quiz8: QuizLesson = {
  id: 4,
  title: 'Quiz: Testing and Diagnostic Tools',
  type: 'quiz',
  duration: '15 minutes',
  content: {
    questions: [
      {
        id: 1,
        question: 'What does a compression tester measure?',
        options: [
          'Fuel injector flow rate',
          'Intake manifold pressure',
          'Cylinder pressure during the compression stroke',
          'Spark plug voltage'
        ],
        correctAnswer: 2,
        explanation: 'Compression testing measures cylinder pressure during the compression stroke, assessing the mechanical health of pistons, rings, valves, and head gaskets.'
      },
      {
        id: 2,
        question: 'What should you do before cranking the engine during a compression test?',
        options: [
          'Remove all spark plugs and disable the ignition system',
          'Add extra oil to each cylinder',
          'Disconnect the exhaust system',
          'Adjust the valve clearance'
        ],
        correctAnswer: 0,
        explanation: 'Preparation involves disabling the fuel system (remove fuel pump fuse or relay) and ignition (disconnect coils or wires) to prevent starting or fuel spray, and removing all spark plugs to reduce cranking resistance.'
      },
      {
        id: 3,
        question: 'What does a consistent low compression reading in one cylinder often indicate?',
        options: [
          'Faulty ignition coil',
          'Worn piston ring or damaged valve',
          'Overfilled fuel tank',
          'Clogged air filter'
        ],
        correctAnswer: 1,
        explanation: 'A single low cylinder suggests a localized issue like a burned valve or head gasket leak, while uniformly low readings indicate timing issues or widespread wear.'
      },
      {
        id: 4,
        question: 'What is the main purpose of an OBD-II scanner?',
        options: [
          'To measure fuel economy',
          'To retrieve and interpret diagnostic trouble codes',
          'To perform compression testing',
          'To clean fuel injectors'
        ],
        correctAnswer: 1,
        explanation: 'OBD-II (On-Board Diagnostics II) monitors vehicle systems like engine performance, emissions, and sensors, storing diagnostic trouble codes (DTCs) when faults occur.'
      },
      {
        id: 5,
        question: 'Which code indicates a cylinder misfire?',
        options: [
          'P0420',
          'P0300',
          'P0171',
          'P0455'
        ],
        correctAnswer: 1,
        explanation: 'P0300 indicates a random misfire, while P0301 would indicate a cylinder 1 misfire specifically.'
      },
      {
        id: 6,
        question: 'What is a vacuum gauge used to measure?',
        options: [
          'Oil pressure in the crankcase',
          'Air pressure in the intake manifold',
          'Cylinder compression during a power stroke',
          'Voltage of the ignition coil'
        ],
        correctAnswer: 1,
        explanation: 'Vacuum gauges measure intake manifold pressure (60–75 kPa at idle), diagnosing engine breathing issues like vacuum leaks, valve problems, or exhaust restrictions.'
      },
      {
        id: 7,
        question: 'What does a fluctuating vacuum gauge needle at idle suggest?',
        options: [
          'Failing oxygen sensor',
          'Vacuum leak or sticking valve',
          'Clogged fuel injector',
          'Low battery voltage'
        ],
        correctAnswer: 1,
        explanation: 'Rapid fluctuations point to sticking valves or weak springs, common in South African vehicles after 100,000 km due to heat-induced wear.'
      },
      {
        id: 8,
        question: 'What is the primary purpose of a fuel pressure tester?',
        options: [
          'To check the compression ratio of the engine',
          'To measure fuel delivered by injectors',
          'To ensure the fuel pump and pressure regulator function correctly',
          'To clean fuel lines'
        ],
        correctAnswer: 2,
        explanation: 'Fuel pressure testers measure fuel system pressure (3–4 bar for petrol engines), ensuring the pump, regulator, and injectors deliver fuel correctly.'
      },
      {
        id: 9,
        question: 'What does a rapid pressure drop after engine shutdown in a fuel pressure test indicate?',
        options: [
          'Healthy fuel system',
          'Leaking injector or faulty check valve',
          'Clogged air filter',
          'Worn piston rings'
        ],
        correctAnswer: 1,
        explanation: 'A rapid post-shutdown drop points to leaking injectors or a faulty check valve, causing hard starts.'
      },
      {
        id: 10,
        question: 'What should compression readings across cylinders typically be within?',
        options: [
          '25–30% of each other',
          '10–15% of each other',
          '50% of each other',
          'Exactly the same'
        ],
        correctAnswer: 1,
        explanation: 'A healthy engine shows consistent pressures within 10–15%; for example, if cylinder 1 reads 1241 kPa, others should be 1055–1427 kPa.'
      },
      {
        id: 11,
        question: 'What OBD-II data helps diagnose intermittent faults?',
        options: [
          'Readiness monitors',
          'Freeze-frame data',
          'Fuel pressure readings',
          'Compression test results'
        ],
        correctAnswer: 1,
        explanation: 'Freeze-frame data captures conditions when a code was set, like RPM or throttle position during a misfire, helping identify intermittent faults.'
      },
      {
        id: 12,
        question: 'What does a low, steady vacuum reading suggest?',
        options: [
          'Healthy engine',
          'Late ignition timing or intake leak',
          'Clogged fuel filter',
          'Normal throttle response'
        ],
        correctAnswer: 1,
        explanation: 'Low, steady vacuum indicates late ignition timing or intake leaks, while a drop under acceleration that doesn\'t recover suggests a clogged catalytic converter.'
      }
    ]
  }
};

export default quiz8;
