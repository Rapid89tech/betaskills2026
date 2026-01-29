import type { QuizLesson } from '@/types/course';

export const module11Quiz: QuizLesson = {
  id: 11,
  title: 'Module 11 Quiz: Simulated Installations of Various Roof Types',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of conducting simulated roofing installations?',
        options: [
          'To increase project costs',
          'To provide hands-on training in a safe environment',
          'To replace on-site projects entirely',
          'To test roofing materials in extreme weather'
        ],
        correct: 1,
        explanation: 'Simulations allow practice of installation techniques in a risk-free setting before on-site work.'
      },
          {
        question: 'Which roofing system simulation involves panel alignment, seam locking, and managing expansion gaps?',
        options: [
          'Asphalt shingle roofs',
          'Metal roofs',
          'Flat roof membranes',
          'Tile roofs'
        ],
        correct: 1,
        explanation: 'Metal roof simulations focus on aligning panels, locking seams, and accommodating thermal expansion.'
      },
      {
        question: 'In flat roof membrane simulations, what are two critical focus areas for ensuring durability?',
        options: [
          'Shingle overlap and nailing patterns',
          'Seam integrity and proper drainage slopes',
          'Tile alignment and batten installation',
          'Plant selection and irrigation setup'
        ],
        correct: 1,
        explanation: 'Strong seams and correct slopes (1/4 inch per foot) prevent leaks and ensure membrane durability.'
      },
      {
        question: 'During a simulated tile roof installation, what two aspects are particularly important?',
        options: [
          'Weight support and tile overlap',
          'Seam welding and panel alignment',
          'Growing medium and root barriers',
          'Nailing patterns and ventilation setup'
        ],
        correct: 0,
        explanation: 'Tile roofs require structural support for weight (8–12 lbs/sq ft) and proper overlap for waterproofing.'
      },
      {
        question: 'Which of the following is NOT a common roof type used in simulated installations?',
        options: [
          'Asphalt shingle roofs',
          'Metal roofs',
          'Flat roof membranes',
          'Solar panel roofs'
        ],
        correct: 3,
        explanation: 'Asphalt shingle roofs, metal roofs, and flat roof membranes are the most common types practiced in lab-based simulations.'
      },
      {
        question: 'What is the most important skill emphasized when simulating an asphalt shingle roof installation?',
        options: [
          'Proper overlap techniques (5–6 inches)',
          'Color coordination',
          'Speed of installation',
          'Cost estimation'
        ],
        correct: 0,
        explanation: 'Proper overlap techniques ensure watertightness and wind resistance for asphalt shingle roofs.'
      },
      {
        question: 'Which safety practice is most critical during simulated roofing installations?',
        options: [
          'Wearing fashionable clothing',
          'Using fall protection (harnesses, guardrails)',
          'Working quickly to finish early',
          'Skipping safety checks'
        ],
        correct: 1,
        explanation: 'Safety practices are critical even in controlled lab environments, especially fall protection.'
      },
      {
        question: 'What is the primary purpose of flashing installation in simulated roofing projects?',
        options: [
          'To improve aesthetics',
          'To seal joints and penetrations',
          'To reduce material costs',
          'To speed up installation'
        ],
        correct: 1,
        explanation: 'Flashing seals joints and penetrations (e.g., vents, chimneys), preventing water leaks and ensuring roof integrity.'
      },
      {
        question: 'What is the most common issue encountered in simulated installations?',
        options: [
          'Weather delays',
          'Improper overlap leading to potential leaks',
          'Material shortages',
          'Equipment failures'
        ],
        correct: 1,
        explanation: 'Improper overlap is a common mistake that trainees learn to avoid through practice.'
      },
      {
        question: 'What is the key benefit of repeating simulated roofing exercises?',
        options: [
          'Reducing material costs',
          'Improving proficiency through error correction',
          'Faster completion times',
          'Better weather resistance'
        ],
        correct: 1,
        explanation: 'Practice builds muscle memory and confidence for on-site applications.'
             }
    ]
  }
}; 
