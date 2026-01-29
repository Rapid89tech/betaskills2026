import type { Quiz } from '@/types/course';

export const module7Quiz: Quiz = {
  id: 7,
  title: 'Module 7 Quiz: Roof Inspection',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main goal of routine roof inspections?',
        options: [
          'Prepare for reroofing',
          'Detect defects after damage occurs',
          'Identify problems early and guide maintenance',
          'Estimate building value'
        ],
        correct: 2,
        explanation: 'Routine inspections aim to catch issues early, enabling proactive maintenance to prevent costly repairs and extend roof life.'
      },
      {
        question: 'When should post-event roof inspections be conducted?',
        options: [
          'After routine cleaning',
          'After sunny days',
          'After extreme weather like hail, windstorms, or fire',
          'During financial audits'
        ],
        correct: 2,
        explanation: 'Post-event inspections assess damage from severe weather or incidents to prioritize repairs and prevent further deterioration.'
      },
      {
        question: 'Which is typically included in a detailed or comprehensive inspection?',
        options: [
          'Visual inspection from ground level',
          'Core sampling and moisture detection',
          'Drone flyover only',
          'Gutter cleaning only'
        ],
        correct: 1,
        explanation: 'Detailed inspections use advanced tools like core sampling and moisture meters to assess hidden issues in roofing systems.'
      },
      {
        question: 'What safety equipment is necessary before starting a roof inspection?',
        options: [
          'Paintbrush and measuring tape',
          'Shovel and dustpan',
          'Harnesses, ladders, and PPE',
          'Screwdrivers and glue'
        ],
        correct: 2,
        explanation: 'Harnesses, ladders, and PPE (gloves, safety glasses) ensure safe rooftop access and compliance with OSHA guidelines.'
      },
      {
        question: 'What is a sign of drainage problems on a roof during inspection?',
        options: [
          'Smooth shingles',
          'Standing or ponding water',
          'Warm air in the attic',
          'Faded paint on walls'
        ],
        correct: 1,
        explanation: 'Ponding water indicates inadequate slope or clogged drains, leading to potential leaks or structural damage.'
      },
      {
        question: 'When inspecting roofing materials, what should be checked?',
        options: [
          'Window tint and wall color',
          'Shingle cracks, missing tiles, and membrane tears',
          'Floor tiles and electrical wiring',
          'Light fixtures and door alignment'
        ],
        correct: 1,
        explanation: 'Inspecting roofing materials focuses on identifying damage like cracks, tears, or missing pieces that compromise waterproofing.'
      },
      {
        question: 'Which tool is used to detect hidden moisture or dampness in roofing systems?',
        options: [
          'Flashlight',
          'Thermometer',
          'Moisture meter or infrared camera',
          'Pressure washer'
        ],
        correct: 2,
        explanation: 'Moisture meters and infrared cameras detect hidden moisture in roofing materials or insulation, identifying potential leak sources.'
      },
      {
        question: 'Why is documentation of inspection findings important?',
        options: [
          'To report inspector\'s salary',
          'To fulfill warranty and insurance requirements',
          'To decorate office walls',
          'To track lunch breaks'
        ],
        correct: 1,
        explanation: 'Detailed documentation supports warranty claims, insurance processes, and maintenance planning.'
      },
      {
        question: 'What should be inspected in the interior during a roof inspection?',
        options: [
          'Color of carpets',
          'Ceiling stains, ventilation, and signs of mold',
          'Lightbulbs and fans',
          'Furniture position'
        ],
        correct: 1,
        explanation: 'Interior inspections focus on signs of leaks, poor ventilation, or mold, indicating roofing or moisture issues.'
      },
      {
        question: 'How often should roof inspections be performed under normal conditions?',
        options: [
          'Every 10 years',
          'Only after rain',
          'Twice a year, plus after major weather events',
          'Once in building\'s lifetime'
        ],
        correct: 2,
        explanation: 'Biannual inspections (spring/fall) and post-event checks ensure early detection of issues under normal conditions.'
      }
    ]
  }
};
