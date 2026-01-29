import type { Lesson } from '@/types/course';

const quiz: Lesson = {
  id: 6,
  title: 'Quiz: Basic Grooming Techniques',
  duration: '15 minutes',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Why is it important to tailor bathing and drying methods to a dog\'s coat type?',
        options: [
          'To save time during grooming',
          'To prevent matting, irritation, and stress',
          'To make dogs smell better only',
          'To use fewer grooming products'
        ],
        correct: 1,
        explanation: 'Tailoring bathing and drying methods to a dog\'s coat type prevents matting, irritation, and stress by using appropriate techniques and products suited to the specific coat characteristics.'
      },
      {
        question: 'How often should short, smooth-coated dogs (e.g., Beagle) typically be bathed?',
        options: [
          'Every week',
          'Every 2–3 days',
          'Every 6–8 weeks',
          'Only once a year'
        ],
        correct: 2,
        explanation: 'Short, smooth-coated dogs like Beagles typically need bathing every 6–8 weeks, as their coats require less frequent washing compared to long or curly-coated breeds.'
      },
      {
        question: 'What is the best drying method for a long-coated dog like a Golden Retriever?',
        options: [
          'Rubbing vigorously with a towel',
          'Air drying outdoors',
          'High-velocity dryer with brushing',
          'Using no drying at all'
        ],
        correct: 2,
        explanation: 'High-velocity dryers with brushing are ideal for long-coated dogs like Golden Retrievers, as they efficiently remove moisture while preventing matting and promoting coat health.'
      },
      {
        question: 'Which shampoo type is most suitable for curly-coated dogs (e.g., Poodle)?',
        options: [
          'Texturizing shampoo',
          'Moisturizing or hypoallergenic shampoo',
          'Flea and tick shampoo',
          'Whitening shampoo'
        ],
        correct: 1,
        explanation: 'Moisturizing or hypoallergenic shampoos are best for curly-coated dogs like Poodles, as they maintain coat health and prevent dryness without stripping natural oils.'
      },
      {
        question: 'Why should double-coated breeds (e.g., Husky, German Shepherd) not be shaved?',
        options: [
          'It ruins their color',
          'It prevents their hair from growing back',
          'Their coats insulate against both heat and cold',
          'It makes them shed more'
        ],
        correct: 2,
        explanation: 'Double-coated breeds like Huskies and German Shepherds should not be shaved because their coats provide essential insulation against both heat and cold, and shaving can damage this natural protection.'
      },
      {
        question: 'Which drying tool is best for curly coats to maintain curl shape and prevent matting?',
        options: [
          'Cage dryer on high heat',
          'Stand dryer on cool setting with brushing',
          'Air drying naturally',
          'Towel rubbing only'
        ],
        correct: 1,
        explanation: 'Stand dryers on cool settings with brushing are ideal for curly coats, as they maintain curl shape while preventing matting without damaging the hair structure.'
      },
      {
        question: 'For wire-coated breeds like Schnauzers, why should conditioners generally be avoided?',
        options: [
          'They cause excessive shedding',
          'They soften the wiry coat texture',
          'They make the coat grow faster',
          'They dry out the skin'
        ],
        correct: 1,
        explanation: 'Conditioners should be avoided for wire-coated breeds like Schnauzers because they soften the wiry coat texture, which is undesirable for maintaining the breed\'s characteristic appearance.'
      },
      {
        question: 'How should hairless breeds like the Chinese Crested be cared for after bathing?',
        options: [
          'Leave the skin to dry naturally',
          'Apply a dog-safe moisturizer',
          'Use a high-heat dryer',
          'Brush with a slicker brush'
        ],
        correct: 1,
        explanation: 'Hairless breeds like the Chinese Crested require a dog-safe moisturizer after bathing to protect their sensitive skin and prevent dryness or irritation.'
      },
      {
        question: 'What is the main risk of leaving a double coat damp after bathing?',
        options: [
          'Excessive shine',
          'Hot spots and skin infections',
          'Matting of guard hairs',
          'Coat color fading'
        ],
        correct: 1,
        explanation: 'Leaving a double coat damp after bathing can lead to hot spots and skin infections, as trapped moisture creates an ideal environment for bacteria and fungal growth.'
      },
      {
        question: 'Which breed-specific example is correct?',
        options: [
          'Bathe a Beagle every 6 weeks with flea shampoo if outdoors',
          'Bathe a Husky weekly to control odor',
          'Use whitening shampoo on a Bulldog\'s folds',
          'Air dry a Poodle to maintain curl shape'
        ],
        correct: 0,
        explanation: 'Bathing a Beagle every 6 weeks with flea shampoo if outdoors is appropriate for this breed, as it addresses outdoor exposure while maintaining proper bathing frequency for short-coated dogs.'
      }
    ]
  }
};

export default quiz;

