import type { Quiz } from '@/types/course';

export const module5Quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Advanced Hair Cutting Techniques',
  duration: '20 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'What is the primary purpose of texturizing in a haircut?',
        options: [
          'To make the hair shorter',
          'To add bulk and weight',
          'To create movement and remove bulk',
          'To make the haircut symmetrical'
        ],
        correct: 2,
        explanation: 'Texturizing is used to create movement, remove bulk, and add visual interest to the hair.'
      },
      {
        question: 'Which cutting technique uses angled cuts to create a soft, blended look?',
        options: [
          'Blunt cutting',
          'Point cutting',
          'Chipping',
          'Clipper cutting'
        ],
        correct: 1,
        explanation: 'Point cutting involves holding scissors vertically and cutting at an angle to create soft, feathered ends.'
      },
      {
        question: 'What tool is commonly used for razor cutting?',
        options: [
          'Thinning shears',
          'Straight scissors',
          'Straight razor',
          'Electric clippers'
        ],
        correct: 2,
        explanation: 'A straight razor (or feather razor) is the primary tool used for razor cutting techniques.'
      },
      {
        question: 'Which hair type benefits most from razor cutting?',
        options: [
          'Fine and fragile hair',
          'Extremely thick and curly hair',
          'Thick or coarse hair needing movement',
          'Hair that is already layered'
        ],
        correct: 2,
        explanation: 'Thick or coarse hair benefits most from razor cutting as it reduces weight and enhances natural movement.'
      },
      {
        question: 'What is a key characteristic of precision cutting?',
        options: [
          'Freehand styling',
          'Random texturizing',
          'Clean, sharp lines and symmetrical shaping',
          'Using only thinning shears'
        ],
        correct: 2,
        explanation: 'Precision cutting is characterized by clean, sharp lines and perfectly balanced, symmetrical shapes.'
      },
      {
        question: 'Which technique helps blend layers seamlessly?',
        options: [
          'Blunt cutting',
          'Razor slashing',
          'Slide cutting',
          'Notching'
        ],
        correct: 2,
        explanation: 'Slide cutting glides down the hair shaft to create tapered, blended effects and seamless transitions.'
      },
      {
        question: 'Why is freehand cutting useful for curly hair?',
        options: [
          'It straightens the curls',
          'It removes all texture',
          'It enhances the natural shape and movement',
          'It makes the hair heavier'
        ],
        correct: 2,
        explanation: 'Freehand cutting works with the natural curl pattern to enhance shape and movement without disrupting texture.'
      },
      {
        question: 'What is a disadvantage of using a razor for cutting?',
        options: [
          'It creates too much volume',
          'It is only suitable for short hair',
          'It can cause excessive thinning if not used correctly',
          'It does not blend well with layers'
        ],
        correct: 2,
        explanation: 'Razors can cause excessive thinning, frizz, or damage if not used correctly, especially on fine or fragile hair.'
      },
      {
        question: 'What is the purpose of using thinning shears?',
        options: [
          'To cut the hair to an even length',
          'To create precise, sharp lines',
          'To remove bulk without changing the overall shape',
          'To add weight to the hair'
        ],
        correct: 2,
        explanation: 'Thinning shears remove bulk and blend layers without altering the overall length or shape of the haircut.'
      },
      {
        question: 'When performing a precision cut, what is an essential step?',
        options: [
          'Cutting random sections freehand',
          'Avoiding sectioning the hair',
          'Using a guide to ensure symmetry',
          'Only using thinning shears'
        ],
        correct: 2,
        explanation: 'Using guides and proper sectioning ensures symmetry and balance in precision cutting.'
      }
    ]
  }
};
