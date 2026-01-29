import { QuizLesson } from '@/types/course';

const quiz5: QuizLesson = {
  id: 3,
  title: 'Quiz: Inspecting Drive Belts and Timing Belts',
  type: 'quiz',
  duration: '15 minutes',
  content: {
    questions: [
      {
        id: 1,
        question: 'What is the primary function of a drive belt?',
        options: [
          'To synchronize the crankshaft and camshaft',
          'To power accessories like the alternator and power steering pump',
          'To regulate engine temperature',
          'To lubricate engine components'
        ],
        correctAnswer: 1,
        explanation: 'Drive belts, also called serpentine or accessory belts, transfer power from the crankshaft to accessories like the alternator, power steering pump, air conditioning compressor, and water pump.'
      },
      {
        id: 2,
        question: 'What indicates a drive belt needs replacement?',
        options: [
          'A rusty appearance',
          'Cracks, fraying, or glazing on the belt surface',
          'A loose water pump',
          'A shiny camshaft'
        ],
        correctAnswer: 1,
        explanation: 'Drive belts show wear through visible signs like cracks across the ribbed surface, fraying edges, glazing (shiny appearance from heat or slippage), or chunking (missing rubber sections).'
      },
      {
        id: 3,
        question: 'How often should a timing belt typically be replaced?',
        options: [
          'Every 10,000–15,000 kilometres',
          'Every 90,000–150,000 kilometres or 5–7 years',
          'Every 20,000–25,000 kilometres',
          'Only when the engine fails'
        ],
        correctAnswer: 1,
        explanation: 'Timing belts should be replaced every 90,000–150,000 kilometres or 5–7 years, as they become brittle due to heat and age, risking sudden failure.'
      },
      {
        id: 4,
        question: 'What tool is used to check drive belt tension?',
        options: [
          'A torque wrench',
          'A belt tension gauge or manual deflection check',
          'A coolant tester',
          'A spark plug socket'
        ],
        correctAnswer: 1,
        explanation: 'Drive belt tension is checked using a belt tension gauge (100–150 N for most vehicles) or manually by ensuring 1 cm deflection on the belt\'s longest stretch.'
      },
      {
        id: 5,
        question: 'What is a common symptom of a failing timing belt?',
        options: [
          'Increased fuel efficiency',
          'Engine misfires or sudden failure to start',
          'Improved power steering performance',
          'Cleaner exhaust emissions'
        ],
        correctAnswer: 1,
        explanation: 'A failing timing belt can cause ticking noises, engine misfires, or sudden engine failure, especially in interference engines where a snapped belt can bend valves or damage pistons.'
      },
      {
        id: 6,
        question: 'Why should the water pump be replaced with the timing belt?',
        options: [
          'It improves fuel economy',
          'It\'s often driven by the timing belt and can fail, damaging the new belt',
          'It prevents oil leaks',
          'It reduces belt tension'
        ],
        correctAnswer: 1,
        explanation: 'The water pump is often driven by the timing belt, and its failure can damage the new belt within 10,000 kilometres, making it cost-effective to replace both components together.'
      },
      {
        id: 7,
        question: 'What should you check during a drive belt inspection?',
        options: [
          'Coolant levels',
          'Pulleys for wear or debris and belt for cracks or glazing',
          'Spark plug gaps',
          'Oil viscosity'
        ],
        correctAnswer: 1,
        explanation: 'During drive belt inspection, check pulleys for wear, misalignment, or debris, and examine the belt for cracks, fraying, glazing, or chunking.'
      },
      {
        id: 8,
        question: 'What risk does a snapped timing belt pose in an interference engine?',
        options: [
          'Reduced fuel consumption',
          'Minor performance loss',
          'Severe engine damage like bent valves or damaged pistons',
          'Increased accessory performance'
        ],
        correctAnswer: 2,
        explanation: 'In interference engines, a snapped timing belt can cause valves to collide with pistons, leading to severe engine damage requiring expensive repairs costing over R30,000.'
      },
      {
        id: 9,
        question: 'What does a squealing noise from the engine during startup typically indicate?',
        options: [
          'A faulty spark plug',
          'A loose or glazed drive belt or weak tensioner',
          'Low coolant levels',
          'A clogged air filter'
        ],
        correctAnswer: 1,
        explanation: 'Squealing or chirping noises during engine startup often indicate a loose or glazed drive belt, misalignment, or a worn tensioner.'
      },
      {
        id: 10,
        question: 'Why is it important to inspect pulleys during a drive belt replacement?',
        options: [
          'To check for coolant contamination',
          'To ensure they are free of wear or debris that could damage the new belt',
          'To measure their temperature',
          'To adjust their tension'
        ],
        correctAnswer: 1,
        explanation: 'Inspecting pulleys for wear, debris, or misalignment is crucial because a damaged pulley can destroy a new belt quickly, leading to premature failure.'
      },
      {
        id: 11,
        question: 'What should be done before inspecting a timing belt?',
        options: [
          'Run the engine to warm it up',
          'Ensure the engine is cold and off, and remove the timing cover',
          'Check the oil level',
          'Replace the drive belt first'
        ],
        correctAnswer: 1,
        explanation: 'Before inspecting a timing belt, ensure the engine is cold and off, then remove the timing cover using appropriate tools like socket sets and screwdrivers.'
      },
      {
        id: 12,
        question: 'What is the purpose of aligning crankshaft and camshaft timing marks during a timing belt replacement?',
        options: [
          'To increase engine power',
          'To ensure proper valve timing and prevent engine damage',
          'To reduce belt tension',
          'To improve fuel efficiency'
        ],
        correctAnswer: 1,
        explanation: 'Aligning crankshaft and camshaft timing marks ensures proper valve timing, preventing engine damage and ensuring efficient combustion.'
      }
    ]
  }
};

export default quiz5;
