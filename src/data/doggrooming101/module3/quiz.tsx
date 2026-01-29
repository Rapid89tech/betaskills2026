import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 1,
  title: 'Module 3 Quiz: Tools, Equipment & Safety',
  questions: [
    {
      id: 1,
      question: 'Why is building trust with dogs essential during grooming and training?',
      options: [
        'It makes dogs look better',
        'It reduces stress and improves cooperation',
        'It teaches dogs new tricks faster only',
        'It eliminates the need for treats'
      ],
      correctAnswer: 1,
      explanation: 'Building trust reduces stress and improves cooperation, making grooming and training sessions safer, more efficient, and more positive for both the dog and handler.'
    },
    {
      id: 2,
      question: 'What does a tucked tail in a Chihuahua usually indicate?',
      options: [
        'Excitement',
        'Happiness',
        'Anxiety or fear',
        'Curiosity'
      ],
      correctAnswer: 2,
      explanation: 'A tucked tail is a stress cue indicating anxiety or fear, especially in sensitive breeds like Chihuahuas. Handlers should pause and offer reassurance.'
    },
    {
      id: 3,
      question: 'Which method best supports building trust with dogs during grooming?',
      options: [
        'Forcing them to stay still',
        'Using positive reinforcement with treats and praise',
        'Ignoring stress signals',
        'Grooming as quickly as possible'
      ],
      correctAnswer: 1,
      explanation: 'Positive reinforcement with treats and praise creates positive associations, building trust and reducing stress during grooming sessions.'
    },
    {
      id: 4,
      question: 'What should you do if a dog shows stress signals like lip licking or yawning?',
      options: [
        'Continue grooming quickly',
        'Scold the dog for misbehaving',
        'Pause and reassess the situation',
        'Ignore the behavior'
      ],
      correctAnswer: 2,
      explanation: 'Stress signals like lip licking or yawning indicate discomfort. Handlers should pause, reassess the situation, and adjust techniques to reduce stress.'
    },
    {
      id: 5,
      question: 'Which environment helps reduce canine stress during grooming or training?',
      options: [
        'A noisy, crowded room',
        'A calm space with soothing music',
        'Outdoors with distractions',
        'A room with sudden movements'
      ],
      correctAnswer: 1,
      explanation: 'A calm, quiet environment with soothing music reduces stress, especially for sensitive breeds like Greyhounds or Chihuahuas.'
    },
    {
      id: 6,
      question: 'What is the best time frame for grooming or training sessions, especially for puppies?',
      options: [
        '30–60 minutes',
        '1–2 hours',
        '5–15 minutes',
        'As long as the dog can stay awake'
      ],
      correctAnswer: 2,
      explanation: 'Short sessions (5–15 minutes) prevent overwhelming puppies or toy breeds, maintaining positive associations and preventing fatigue.'
    },
    {
      id: 7,
      question: 'Which activity can strengthen rapport between owners and their dogs?',
      options: [
        'Ignoring them during playtime',
        'Engaging in games like fetch or tug-of-war',
        'Forcing them to socialize with all dogs',
        'Skipping training sessions'
      ],
      correctAnswer: 1,
      explanation: 'Engaging in games like fetch or tug-of-war builds rapport through fun, positive interactions, strengthening the bond between dog and owner.'
    },
    {
      id: 8,
      question: 'Which breed typically requires gentle handling due to sensitivity?',
      options: [
        'Border Collie',
        'Chihuahua',
        'Labrador Retriever',
        'Jack Russell Terrier'
      ],
      correctAnswer: 1,
      explanation: 'Chihuahuas are sensitive breeds prone to anxiety, requiring gentle handling, light touch, and frequent rewards to build trust.'
    },
    {
      id: 9,
      question: 'What strategy is recommended for fearful or aggressive dogs?',
      options: [
        'Punishment for resistance',
        'Desensitization and gradual exposure',
        'Grooming as fast as possible',
        'Avoiding grooming altogether'
      ],
      correctAnswer: 1,
      explanation: 'Desensitization and gradual exposure, paired with positive reinforcement, build trust and reduce fear or aggression in challenging dogs.'
    },
    {
      id: 10,
      question: 'How can consistency help in building trust with dogs?',
      options: [
        'Dogs become bored with routines',
        'It makes grooming less important',
        'It reinforces trust through predictable interactions',
        'It eliminates the need for rewards'
      ],
      correctAnswer: 2,
      explanation: 'Consistency reinforces trust through predictable interactions, creating a sense of security and reducing anxiety in dogs.'
    }
  ]
};

export default quiz;

