import { QuizContent } from '../../../types/course';

export const quiz4: QuizContent = {
  id: '4-quiz',
  title: 'Engine Maintenance and Routine Services Quiz',
  questions: [
    {
      question: "What are the three main functions of engine oil in a petrol engine?",
      options: [
        "Cleaning, inflating tires, and cooling",
        "Lubrication, heat transfer, contaminant suspension",
        "Lubrication, engine mounting, and tire traction",
        "Fuel combustion, starting, and oil filtering"
      ],
      correct: 1
    },
    {
      question: "How can you tell if engine oil is contaminated or needs changing during a dipstick check?",
      options: [
        "It's clear and thin",
        "It appears dark, gritty, or milky",
        "It's foamy and green",
        "It smells like petrol"
      ],
      correct: 1
    },
    {
      question: "What could metal shavings in engine oil indicate?",
      options: [
        "Low oil pressure",
        "Contaminated air filter",
        "Internal engine damage",
        "Worn brake pads"
      ],
      correct: 2
    },
    {
      question: "At what intervals should engine oil typically be changed?",
      options: [
        "Every 20,000 km",
        "Every 5,000 km",
        "Every 8,000–12,000 km",
        "Once per year only"
      ],
      correct: 2
    },
    {
      question: "Why is it important to lubricate the gasket of a new oil filter before installation?",
      options: [
        "To improve fuel economy",
        "To prevent over-tightening",
        "To ensure a tight seal and prevent leaks",
        "To keep it from melting"
      ],
      correct: 2
    },
    {
      question: "What happens when an air filter is clogged?",
      options: [
        "Reduced engine power",
        "Increased fuel consumption",
        "Possible check engine light",
        "All of the above"
      ],
      correct: 3
    },
    {
      question: "How can you check if an air filter needs replacing?",
      options: [
        "Shake it to see if dust falls out",
        "Smell it",
        "Hold it up to the light and check for blockages",
        "Pour water on it"
      ],
      correct: 2
    },
    {
      question: "Which type of air filter is best suited for dusty off-road environments?",
      options: [
        "Paper filter",
        "Foam filter",
        "Cotton gauze filter",
        "None of the above"
      ],
      correct: 1
    },
    {
      question: "What is the function of a spark plug?",
      options: [
        "Filter air",
        "Measure engine temperature",
        "Ignite the air-fuel mixture",
        "Pump fuel"
      ],
      correct: 2
    },
    {
      question: "What condition on a spark plug indicates oil contamination?",
      options: [
        "Sooty black deposits",
        "White chalky tips",
        "Blistered insulator",
        "Oily deposits on the electrode"
      ],
      correct: 3
    },
    {
      question: "How often should spark plugs be replaced, depending on type?",
      options: [
        "Every 10,000 km",
        "Every 30,000–40,000 km",
        "Every 50,000–160,000 km",
        "Only when misfires occur"
      ],
      correct: 2
    },
    {
      question: "Why should the radiator cap only be opened when the engine is cool?",
      options: [
        "To prevent water loss",
        "To avoid breaking the cap",
        "To prevent burns from hot steam or coolant",
        "To keep coolant flowing"
      ],
      correct: 2
    }
  ]
};