import type { Quiz } from '@/types/course';

export const module9Quiz: Quiz = {
  id: 9,
  title: 'Module 9 Quiz: Material Take-Off and Waste Calculation',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the main purpose of a Material Take-Off (MTO)?',
        options: [
          'To decorate blueprints',
          'To analyze labor productivity',
          'To list and quantify materials needed for a project',
          'To design structural layouts'
        ],
        correct: 2,
        explanation: 'MTO quantifies materials from plans and specs to ensure accurate procurement and budgeting.'
      },
      {
        question: 'Which of the following is NOT typically a source of take-off information?',
        options: [
          'Specifications',
          'Elevation schedules',
          'Site measurements',
          'Advertising brochures'
        ],
        correct: 3,
        explanation: 'MTO relies on technical documents like blueprints, specs, and site measurements, not marketing materials.'
      },
      {
        question: 'If a roofing area is 1,300 sq ft and one square of shingles covers 100 sq ft, how many squares are needed with 10% waste added?',
        options: [
          '13',
          '14',
          '15',
          '16'
        ],
        correct: 2,
        explanation: '1,300 ÷ 100 = 13 squares; 13 × 1.10 = 14.3 → round up to 15 squares.'
      },
      {
        question: 'Which unit is used to measure electrical wire during take-off?',
        options: [
          'Cubic yards',
          'Board feet',
          'Linear feet',
          'Pounds'
        ],
        correct: 2,
        explanation: 'Electrical wire is measured in linear feet to account for run lengths and bends.'
      },
      {
        question: 'What is the purpose of applying a waste factor during material take-off?',
        options: [
          'To increase contractor profit',
          'To account for potential material losses and cuts',
          'To reduce material cost',
          'To estimate labor hours'
        ],
        correct: 1,
        explanation: 'Waste factors cover losses from cuts, overlaps, breakage, or errors, ensuring sufficient materials.'
      },
      {
        question: 'Which of the following materials typically has the highest waste factor?',
        options: [
          'Asphalt shingles',
          'Wire',
          'Drywall',
          'Concrete'
        ],
        correct: 2,
        explanation: 'Drywall has a 10–15% waste factor due to extensive cutting and fitting, higher than shingles or wire (5–10%).'
      },
      {
        question: 'Digital take-off tools can improve accuracy and reduce manual errors in quantity estimation.',
        options: [
          'True',
          'False'
        ],
        correct: 0,
        explanation: 'Tools like PlanSwift or Bluebeam automate measurements, reducing human error in take-offs.'
      },
      {
        question: 'You should guess measurements when drawings are unclear, as it speeds up the estimation process.',
        options: [
          'True',
          'False'
        ],
        correct: 1,
        explanation: 'Guessing leads to errors; always verify measurements with site checks or architect clarification.'
      },
      {
        question: 'List two reasons why accurate material take-off is important for budgeting.',
        options: [
          'Prevents over-ordering or shortages, ensuring efficient resource use and avoiding delays.',
          'Supports accurate cost estimates, enabling realistic budgets and competitive bids.',
          'Makes the project look more professional',
          'Helps with marketing materials'
        ],
        correct: 0,
        explanation: 'Accurate MTO prevents over-ordering or shortages and supports accurate cost estimates.'
      },
      {
        question: 'What are two factors that affect waste percentage during take-off calculations?',
        options: [
          'Roof complexity and installer skill level',
          'Weather and time of day',
          'Marketing budget and office location',
          'Client preferences and color choices'
        ],
        correct: 0,
        explanation: 'Roof complexity (multiple hips, valleys, dormers) and installer skill level affect waste percentages through required cuts and potential errors.'
      }
    ]
  }
};
