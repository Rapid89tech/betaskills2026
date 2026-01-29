import type { Quiz } from '@/types/course';

const quiz: Quiz = {
  id: 5,
  title: 'Module 5 Quiz: Principles of Positive Reinforcement in Dog Training and Grooming',
  description: 'Test your knowledge of positive reinforcement principles, core commands, leash training, crate training, housebreaking, and behavior management',
  questions: [
    {
      id: 1,
      question: 'What is the primary goal of positive reinforcement in dog training and grooming?',
      options: [
        'To punish undesired behaviors',
        'To reward desired behaviors and encourage repetition',
        'To eliminate the need for grooming tools',
        'To train dogs without using any rewards'
      ],
      correctAnswer: 1,
      explanation: 'Positive reinforcement focuses on rewarding desired behaviors to encourage their repetition, building trust and cooperation.'
    },
    {
      id: 2,
      question: 'Why is timing critical when using positive reinforcement?',
      options: [
        'It ensures the dog eats treats quickly',
        'Rewards must be delivered within 1–2 seconds for clear association',
        'To prevent the handler from forgetting',
        'To increase the number of treats given'
      ],
      correctAnswer: 1,
      explanation: 'Rewards must be delivered within 1–2 seconds of the desired behavior to ensure the dog associates the action with the reward.'
    },
    {
      id: 3,
      question: 'Which of the following is an example of using high-value rewards?',
      options: [
        'Giving a Border Collie a piece of chicken for tolerating ear cleaning',
        'Allowing a dog to bark at strangers',
        'Using the same toy for all dogs regardless of preference',
        'Giving a dog water after a grooming session'
      ],
      correctAnswer: 0,
      explanation: 'High-value rewards like chicken are used for high-stress tasks to motivate the dog effectively.'
    },
    {
      id: 4,
      question: 'Consistency in positive reinforcement helps to:',
      options: [
        'Confuse the dog so it learns faster',
        'Reinforce learning and build trust',
        'Reduce the need for grooming',
        'Allow different handlers to use different cues'
      ],
      correctAnswer: 1,
      explanation: 'Consistency in applying rewards for the same behavior reinforces learning and builds trust between dog and handler.'
    },
    {
      id: 5,
      question: 'What is an example of gradual progression (shaping)?',
      options: [
        'Rewarding a dog for sitting only after a full grooming session',
        'Teaching a Shih Tzu to allow a clipper by rewarding each step toward tolerance',
        'Waiting until the dog stops barking before giving attention',
        'Ignoring the dog until it performs the perfect behavior'
      ],
      correctAnswer: 1,
      explanation: 'Shaping involves rewarding incremental steps toward a goal, such as rewarding each step toward allowing a clipper.'
    },
    {
      id: 6,
      question: 'Why should punishment be avoided in positive reinforcement training?',
      options: [
        'It saves money on treats',
        'It increases fear and aggression in dogs',
        'It makes training faster',
        'It eliminates the need for grooming'
      ],
      correctAnswer: 1,
      explanation: 'Punishment can increase fear and aggression, undermining trust and making training less effective.'
    },
    {
      id: 7,
      question: 'What does "fading rewards" mean?',
      options: [
        'Gradually stopping training sessions',
        'Giving fewer treats as behavior becomes reliable',
        'Switching from high-value to low-value treats immediately',
        'Ignoring the dog\'s progress'
      ],
      correctAnswer: 1,
      explanation: 'Fading rewards means gradually reducing the frequency of treats as the behavior becomes consistent, transitioning to intermittent reinforcement.'
    },
    {
      id: 8,
      question: 'Which tool is commonly used to precisely mark the moment of correct behavior?',
      options: [
        'Grooming brush',
        'Clicker',
        'Leash',
        'Nail clipper'
      ],
      correctAnswer: 1,
      explanation: 'A clicker is used to mark precise behaviors, providing clear feedback to the dog.'
    },
    {
      id: 9,
      question: 'Breed-specific consideration: Which type of reward works best for high-energy terrier breeds like Schnauzers?',
      options: [
        'Soft treats only',
        'Tug toys or play-based rewards',
        'Long grooming sessions',
        'Ignoring their behavior until they calm down'
      ],
      correctAnswer: 1,
      explanation: 'High-energy terrier breeds respond well to play-based rewards like tug toys to channel their energy.'
    },
    {
      id: 10,
      question: 'What is the ethical foundation of positive reinforcement?',
      options: [
        'Using aversive tools for faster results',
        'Aligning with humane, force-free training standards',
        'Training dogs with minimal interaction',
        'Reducing grooming to avoid stress'
      ],
      correctAnswer: 1,
      explanation: 'Positive reinforcement aligns with humane, force-free training standards endorsed by organizations like the CCPDT and AVSAB.'
    }
  ]
};

export default quiz;

