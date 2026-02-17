import type { QuizLesson } from '@/types/course';

export const module6Quiz: QuizLesson = {
  id: 6,
  title: "Module 6 Quiz: Men's Haircuts and Grooming",
  duration: "20 min",
  type: "quiz",
  content: {
    questions: [
      {
        question: "What is the main difference between a fade and a taper?",
        options: [
          "A fade blends down to the skin, while a taper is a gradual shortening of hair.",
          "A taper is shorter than a fade.",
          "A fade leaves more length than a taper.",
          "There is no difference."
        ],
        correct: 0,
        explanation: "A fade blends down to the skin or very short, while a taper gradually shortens hair without going to the skin."
      },
      {
        question: "Which type of fade starts near the top of the head for a dramatic contrast?",
        options: [
          "Low fade",
          "Mid fade",
          "High fade",
          "Taper fade"
        ],
        correct: 2,
        explanation: "A high fade starts near the top of the head, creating dramatic contrast between the top and sides."
      },
      {
        question: "What is an essential step in beard trimming?",
        options: [
          "Cutting in random directions",
          "Ignoring the neckline",
          "Defining cheek and neckline for a structured shape",
          "Trimming without a guard"
        ],
        correct: 2,
        explanation: "Defining the cheek and neckline creates a structured, polished beard shape."
      },
      {
        question: "Which tool is best for creating sharp beard lines?",
        options: [
          "Clippers",
          "Razor",
          "Scissors",
          "Comb"
        ],
        correct: 1,
        explanation: "A straight razor is best for creating precise, sharp lines in beard shaping."
      },
      {
        question: "What does a #1 clipper guard leave in terms of hair length?",
        options: [
          "1/2 inch",
          "3/8 inch",
          "1/4 inch",
          "1/8 inch"
        ],
        correct: 3,
        explanation: "A #1 guard leaves 1/8 inch of hair, ideal for very short cuts and close fades."
      },
      {
        question: "What is the purpose of the clipper-over-comb technique?",
        options: [
          "To remove all hair",
          "To blend and create smooth transitions",
          "To cut hair evenly without blending",
          "To outline the hairline"
        ],
        correct: 1,
        explanation: "Clipper-over-comb allows for precise blending and smooth transitions between different lengths."
      },
      {
        question: "Which beard style is best for defining a strong jawline?",
        options: [
          "Stubble",
          "Rounded beard",
          "Square beard",
          "Unshaped beard"
        ],
        correct: 2,
        explanation: "A square beard creates a strong, defined jawline by keeping sides shorter and the chin fuller."
      },
      {
        question: "What should be done before using a clipper?",
        options: [
          "Start cutting immediately",
          "Clean and oil the blades",
          "Use it with the highest guard only",
          "Apply gel directly to the clipper"
        ],
        correct: 1,
        explanation: "Cleaning and oiling clipper blades ensures smooth operation and prevents pulling or damage."
      },
      {
        question: "How can you ensure a well-blended fade?",
        options: [
          "Using only one guard size",
          "Using a flicking motion while blending",
          "Cutting all hair to the same length",
          "Avoiding different guard sizes"
        ],
        correct: 1,
        explanation: "Using a flicking motion while blending creates smooth transitions between different guard lengths."
      },
      {
        question: "What is the best way to shape a beard?",
        options: [
          "Trim randomly",
          "Use a guide and follow natural hair growth",
          "Cut against the hair grain only",
          "Ignore symmetry"
        ],
        correct: 1,
        explanation: "Using a guide and following natural hair growth ensures even, symmetrical beard shaping."
      }
    ]
  }
};