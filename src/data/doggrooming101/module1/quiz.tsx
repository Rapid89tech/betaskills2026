import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 1,
  title: 'Module 1 Quiz: Roles and Responsibilities of a Professional Dog Groomer and Trainer',
  description: 'Test your knowledge of professional dog grooming and training roles',
  questions: [
    {
      id: 1,
      question: 'What is the primary role of a professional dog groomer?',
      options: [
        'Teach dogs obedience commands',
        'Maintain a dog\'s physical appearance, hygiene, and overall health',
        'Sell dog food and accessories',
        'Diagnose medical conditions'
      ],
      correctAnswer: 1,
      explanation: 'Professional dog groomers are responsible for maintaining a dog\'s physical appearance, hygiene, and overall health through grooming services.'
    },
    {
      id: 2,
      question: 'Which of the following is NOT typically a responsibility of a dog groomer?',
      options: [
        'Bathing dogs using appropriate shampoos',
        'Trimming nails safely',
        'Conducting behavioral assessments',
        'Cleaning ears and brushing teeth'
      ],
      correctAnswer: 2,
      explanation: 'Conducting behavioral assessments is primarily the responsibility of dog trainers, not groomers.'
    },
    {
      id: 3,
      question: 'Why is client communication important for a professional groomer?',
      options: [
        'To educate owners on home grooming practices',
        'To negotiate prices without explaining services',
        'To teach dogs advanced tricks',
        'To avoid interacting with dog owners'
      ],
      correctAnswer: 0,
      explanation: 'Client communication is essential for educating owners on home grooming practices and understanding their dog\'s specific needs.'
    },
    {
      id: 4,
      question: 'Which skill is most essential for managing aggressive or anxious dogs?',
      options: [
        'Observation of body language',
        'Ability to lift heavy objects',
        'Marketing skills',
        'Graphic design knowledge'
      ],
      correctAnswer: 0,
      explanation: 'Observation of body language is crucial for recognizing stress signs and adjusting handling techniques to keep dogs comfortable and safe.'
    },
    {
      id: 5,
      question: 'What is the main role of a professional dog trainer?',
      options: [
        'Maintain a dog\'s physical health',
        'Teach dogs behaviors, commands, and skills to improve obedience and socialization',
        'Groom dogs for show competitions',
        'Administer vaccines'
      ],
      correctAnswer: 1,
      explanation: 'Professional dog trainers teach behaviors, commands, and skills to improve a dog\'s obedience and socialization.'
    },
    {
      id: 6,
      question: 'Which of the following is a responsibility of a dog trainer?',
      options: [
        'Bathing dogs weekly',
        'Developing structured training plans tailored to the dog',
        'Applying dog-safe nail polish',
        'Selling grooming products'
      ],
      correctAnswer: 1,
      explanation: 'Dog trainers develop structured, customized training plans based on each dog\'s temperament, age, and behavioral needs.'
    },
    {
      id: 7,
      question: 'How do groomers and trainers overlap in their responsibilities?',
      options: [
        'Both focus only on marketing their services',
        'Both prioritize dog welfare and educate owners',
        'Both perform medical procedures',
        'Both manage dog competitions'
      ],
      correctAnswer: 1,
      explanation: 'Both groomers and trainers prioritize dog welfare, use humane practices, and educate owners on maintaining care at home.'
    },
    {
      id: 8,
      question: 'Which organization provides certifications for professional dog groomers in the U.S.?',
      options: [
        'Association of Professional Dog Trainers (APDT)',
        'National Dog Groomers Association of America (NDGAA)',
        'American Kennel Club (AKC)',
        'Certification Council for Professional Dog Trainers (CCPDT)'
      ],
      correctAnswer: 1,
      explanation: 'The National Dog Groomers Association of America (NDGAA) provides certifications and standards for professional dog groomers.'
    },
    {
      id: 9,
      question: 'What is a key ethical consideration for dog trainers?',
      options: [
        'Using shock collars for faster results',
        'Avoiding humane, science-based training methods',
        'Using force-free techniques endorsed by veterinary behavior organizations',
        'Guaranteeing quick fixes for behavioral issues'
      ],
      correctAnswer: 2,
      explanation: 'Ethical dog trainers use force-free, science-based techniques endorsed by organizations like the American Veterinary Society of Animal Behavior.'
    },
    {
      id: 10,
      question: 'Why is it important for professional groomers and trainers to stay updated on best practices?',
      options: [
        'To increase the price of services',
        'To maintain professional credibility and ensure animal welfare',
        'To avoid working with difficult dogs',
        'To reduce the number of clients'
      ],
      correctAnswer: 1,
      explanation: 'Staying updated through certifications and continuous education ensures professionals maintain credibility, use humane techniques, and prioritize animal welfare.'
    }
  ]
};

export default quiz;

