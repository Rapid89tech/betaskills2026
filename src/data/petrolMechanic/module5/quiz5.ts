import type { Lesson } from '@/types/course';

export const quiz5: Lesson = {
  id: 3,
  title: '📝 Module 5 Quiz: Inspecting Drive Belts and Timing Belts',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary function of a drive belt?',
        options: [
          'To synchronize the crankshaft and camshaft',
          'To power accessories like the alternator and power steering pump',
          'To regulate engine temperature',
          'To lubricate engine components'
        ],
        correct: 1,
        explanation: 'Drive belts transfer power from the crankshaft to accessories like the alternator, power steering pump, air conditioning compressor, and water pump, ensuring these systems function properly.'
      },
      {
        question: 'What indicates a drive belt needs replacement?',
        options: [
          'A rusty appearance',
          'Cracks, fraying, or glazing on the belt surface',
          'A loose water pump',
          'A shiny camshaft'
        ],
        correct: 1,
        explanation: 'Visible signs like cracks, fraying, or glazing (shiny, slippery surface) indicate belt wear and the need for replacement to prevent failure and accessory malfunction.'
      },
      {
        question: 'How often should a timing belt typically be replaced?',
        options: [
          'Every 10,000–15,000 kilometres',
          'Every 90,000–150,000 kilometres or 5–7 years',
          'Every 20,000–25,000 kilometres',
          'Only when the engine fails'
        ],
        correct: 1,
        explanation: 'Timing belts should be replaced every 90,000–150,000 kilometres or 5–7 years to prevent sudden failure, which can cause catastrophic engine damage in interference engines.'
      },
      {
        question: 'What tool is used to check drive belt tension?',
        options: [
          'A torque wrench',
          'A belt tension gauge or manual deflection check',
          'A coolant tester',
          'A spark plug socket'
        ],
        correct: 1,
        explanation: 'Belt tension is checked using a belt tension gauge (measuring 100–150 N for most vehicles) or manually by checking for 1 cm deflection on the belt\'s longest stretch.'
      },
      {
        question: 'What is a common symptom of a failing timing belt?',
        options: [
          'Increased fuel efficiency',
          'Engine misfires or sudden failure to start',
          'Improved power steering performance',
          'Cleaner exhaust emissions'
        ],
        correct: 1,
        explanation: 'A failing timing belt causes engine misfires, ticking noises, or sudden failure to start. In interference engines, a snapped belt can cause severe engine damage.'
      },
      {
        question: 'Why should the water pump be replaced with the timing belt?',
        options: [
          'It improves fuel economy',
          'It\'s often driven by the timing belt and can fail, damaging the new belt',
          'It prevents oil leaks',
          'It reduces belt tension'
        ],
        correct: 1,
        explanation: 'The water pump is often driven by the timing belt. If it fails after belt replacement, it can damage the new belt within 10,000 kilometres, requiring costly repeat repairs.'
      },
      {
        question: 'What should you check during a drive belt inspection?',
        options: [
          'Coolant levels',
          'Pulleys for wear or debris and belt for cracks or glazing',
          'Spark plug gaps',
          'Oil viscosity'
        ],
        correct: 1,
        explanation: 'During drive belt inspection, check pulleys for wear, misalignment, or debris, and examine the belt for cracks, fraying, or glazing to ensure proper function and prevent premature failure.'
      },
      {
        question: 'What risk does a snapped timing belt pose in an interference engine?',
        options: [
          'Reduced fuel consumption',
          'Minor performance loss',
          'Severe engine damage like bent valves or damaged pistons',
          'Increased accessory performance'
        ],
        correct: 2,
        explanation: 'In interference engines, a snapped timing belt causes valves to collide with pistons, resulting in bent valves, damaged pistons, and engine rebuilds costing R25,000–R40,000.'
      },
      {
        question: 'What does a squealing noise from the engine during startup typically indicate?',
        options: [
          'A faulty spark plug',
          'A loose or glazed drive belt or weak tensioner',
          'Low coolant levels',
          'A clogged air filter'
        ],
        correct: 1,
        explanation: 'Squealing noises during startup indicate a loose or glazed drive belt, weak tensioner, or belt slippage, requiring tension adjustment or belt replacement.'
      },
      {
        question: 'Why is it important to inspect pulleys during a drive belt replacement?',
        options: [
          'To check for coolant contamination',
          'To ensure they are free of wear or debris that could damage the new belt',
          'To measure their temperature',
          'To adjust their tension'
        ],
        correct: 1,
        explanation: 'Worn or debris-contaminated pulleys can shred a new belt within 5,000 kilometres. Inspecting and cleaning pulleys ensures the new belt functions properly and lasts its full lifespan.'
      },
      {
        question: 'What should be done before inspecting a timing belt?',
        options: [
          'Run the engine to warm it up',
          'Ensure the engine is cold and off, and remove the timing cover',
          'Check the oil level',
          'Replace the drive belt first'
        ],
        correct: 1,
        explanation: 'Before inspecting a timing belt, ensure the engine is cold and off for safety, then remove the timing cover using appropriate tools to access the belt for inspection.'
      },
      {
        question: 'What is the purpose of aligning crankshaft and camshaft timing marks during a timing belt replacement?',
        options: [
          'To increase engine power',
          'To ensure proper valve timing and prevent engine damage',
          'To reduce belt tension',
          'To improve fuel efficiency'
        ],
        correct: 1,
        explanation: 'Aligning crankshaft and camshaft timing marks ensures proper valve timing, preventing valves from colliding with pistons and avoiding catastrophic engine damage.'
      }
    ]
  }
};
