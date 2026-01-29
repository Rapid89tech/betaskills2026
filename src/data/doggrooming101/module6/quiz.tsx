import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 6,
  title: 'Module 6 Quiz: Advanced Grooming & Styling',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of hand-stripping in wire-coated breeds?',
        options: [
          'To shorten the coat quickly',
          'To remove dead hair and preserve coat texture',
          'To make grooming faster and easier',
          'To prevent shedding altogether'
        ],
        correct: 1,
        explanation: 'Hand-stripping removes dead hair to preserve the wiry coat texture, which is essential for maintaining breed-specific appearance and coat health.'
      },
      {
        question: 'How often should hand-stripping typically be performed for pet dogs (non-show)?',
        options: [
          'Every 2–4 weeks',
          'Every 6–8 weeks',
          'Every 8–12 weeks',
          'Only once a year'
        ],
        correct: 2,
        explanation: 'Hand-stripping for pet dogs should be performed every 8–12 weeks, depending on coat growth and breed, to maintain texture without over-stripping.'
      },
      {
        question: 'Which tool is commonly used for blending stripped areas with furnishings?',
        options: [
          'Stripping knife',
          'Slicker brush',
          'Thinning shears',
          'Undercoat rake'
        ],
        correct: 2,
        explanation: 'Thinning shears are used to blend stripped areas with furnishings (like beards or skirts) for a natural, seamless look.'
      },
      {
        question: 'When hand-stripping, in which direction should you pull the dead hair?',
        options: [
          'Opposite of hair growth',
          'Straight up from the coat',
          'Sideways to loosen the hair',
          'In the direction of hair growth'
        ],
        correct: 3,
        explanation: 'Dead hair should be pulled gently in the direction of hair growth to avoid damaging live hair and causing skin irritation.'
      },
      {
        question: 'Which type of coat requires daily brushing and frequent trimming every 4–6 weeks?',
        options: [
          'Wiry coats',
          'Curly coats',
          'Double coats',
          'Long coats'
        ],
        correct: 1,
        explanation: 'Curly coats (like Poodles) require daily brushing to prevent matting and professional trimming every 4–6 weeks to maintain shape.'
      },
      {
        question: 'What grooming tool is best suited for managing heavy shedding in double-coated breeds?',
        options: [
          'Curved shears',
          'Stripping stone',
          'De-shedding tool (e.g., Furminator)',
          'Pin brush'
        ],
        correct: 2,
        explanation: 'De-shedding tools like the Furminator are specifically designed to remove loose undercoat from double-coated breeds during shedding seasons.'
      },
      {
        question: 'Which of the following is a key welfare consideration during hand-stripping sessions?',
        options: [
          'Keep sessions short and use positive reinforcement',
          'Use force if the dog resists',
          'Always strip the entire coat in one sitting',
          'Avoid using rewards to save time'
        ],
        correct: 0,
        explanation: 'Keeping sessions short and using positive reinforcement ensures dog comfort and prevents stress during hand-stripping procedures.'
      },
      {
        question: 'What is the main risk of over-stripping a dog\'s coat?',
        options: [
          'The coat becomes too shiny',
          'Damage to live hair and skin irritation',
          'The coat grows back faster than usual',
          'It eliminates shedding permanently'
        ],
        correct: 1,
        explanation: 'Over-stripping can damage live hair and cause skin irritation, which is why it should only be done when the coat is "ready" (dead hair pulls easily).'
      },
      {
        question: 'Which breed type typically requires hand-stripping every 6–12 weeks to preserve coat texture?',
        options: [
          'Toy breeds (e.g., Shih Tzu)',
          'Terrier breeds (e.g., Schnauzer)',
          'Herding breeds (e.g., Border Collie)',
          'Sporting breeds (e.g., Labrador Retriever)'
        ],
        correct: 1,
        explanation: 'Terrier breeds with wiry coats (like Schnauzers and Wire Fox Terriers) require hand-stripping every 6–12 weeks to maintain their characteristic texture.'
      },
      {
        question: 'What is one practical tip for maintaining grooming tools used in hand-stripping?',
        options: [
          'Leave them uncleaned to preserve coat oils',
          'Sharpen and disinfect tools regularly',
          'Store them outdoors for ventilation',
          'Use human shampoos to clean them'
        ],
        correct: 1,
        explanation: 'Regularly sharpening and disinfecting tools ensures effective, safe grooming and prevents the spread of infections between dogs.'
      }
    ]
  }
};

export default quiz;

