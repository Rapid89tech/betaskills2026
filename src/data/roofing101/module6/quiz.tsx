import type { QuizLesson } from '@/types/course';

export const module6Quiz: QuizLesson = {
  id: 6,
  title: 'Module 6 Quiz: Proper Drainage, Waterproofing & Common Roofing Problems',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the minimum slope recommended for low-slope roofs to ensure proper drainage?',
        options: [
          '1 inch per foot',
          '1/4 inch per foot',
          'Flat with no slope',
          '1 inch per 10 feet'
        ],
        correct: 1,
        explanation: 'A 1/4 inch per foot (2%) slope ensures water flows to drains/scuppers, preventing ponding.'
      },
      {
        question: 'Which roofing drainage component is typically used on flat roofs to direct water internally?',
        options: [
          'Gutters',
          'Scuppers',
          'Interior roof drains',
          'Downspouts'
        ],
        correct: 2,
        explanation: 'Interior drains channel water through internal piping on flat/low-slope roofs.'
      },
      {
        question: 'What is the primary purpose of flashing in roofing systems?',
        options: [
          'Improve roof aesthetics',
          'Direct water away from joints and penetrations',
          'Increase roof insulation',
          'Support roofing materials'
        ],
        correct: 1,
        explanation: 'Flashing prevents water intrusion at vulnerable areas like valleys and vents.'
      },
      {
        question: 'Which is a common cause of ponding water on flat roofs?',
        options: [
          'Excessive slope',
          'Clogged drains or inadequate slope',
          'Over-insulated decking',
          'Heavy shingles'
        ],
        correct: 1,
        explanation: 'Ponding occurs due to poor slope or blocked drains, causing water accumulation.'
      },
      {
        question: 'What is one key method to prevent ice dams in cold climates?',
        options: [
          'Reduce attic ventilation',
          'Improve attic insulation and ventilation',
          'Use darker shingles',
          'Eliminate roof slope'
        ],
        correct: 1,
        explanation: 'Proper insulation/ventilation keeps the roof cold, preventing ice dams at eaves.'
      },
      {
        question: 'Which roofing problem is often caused by poor ventilation and moisture trapped beneath the membrane?',
        options: [
          'Cracked shingles',
          'Blistering and bubbling',
          'Sagging deck',
          'Ice dams'
        ],
        correct: 1,
        explanation: 'Trapped moisture from poor ventilation causes blisters under membranes.'
      },
      {
        question: 'What maintenance practice helps prevent blockages and ponding on roofs?',
        options: [
          'Painting the roof surface',
          'Cleaning gutters, scuppers, and drains twice per year',
          'Adding more insulation',
          'Sealing shingle edges'
        ],
        correct: 1,
        explanation: 'Regular cleaning prevents debris buildup, ensuring proper water flow.'
      },
      {
        question: 'When installing flashing, what is an important practice to ensure water runoff?',
        options: [
          'Overlap materials in the direction of water flow',
          'Use non-corrosive nails only',
          'Install flashing under the decking',
          'Avoid sealing joints'
        ],
        correct: 0,
        explanation: 'Overlapping with water flow prevents seepage under flashing joints.'
      },
      {
        question: 'Which is NOT a function of proper roof drainage?',
        options: [
          'Preventing ponding',
          'Protecting the foundation',
          'Increasing roof weight',
          'Reducing ice dam formation'
        ],
        correct: 2,
        explanation: 'Drainage reduces weight by removing water, not increasing it.'
      },
      {
        question: 'What is the recommended slope for gutters to ensure proper water flow?',
        options: [
          '1/4 inch per 10 feet',
          '1 inch per foot',
          '1/2 inch per foot',
          'Flat with no slope'
        ],
        correct: 0,
        explanation: 'A 1/4 inch per 10 feet slope ensures effective gutter drainage to downspouts.'
      }
    ]
  }
};
